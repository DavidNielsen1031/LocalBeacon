export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { generateText } from '@/lib/anthropic-client'
import { buildPromptContext, type BusinessContext } from '@/lib/prompt-context'
import { sendWeeklyContentEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Single JOIN query — eliminates N+1 pattern
  const { data: bizWithUsers } = await supabase
    .from('businesses')
    .select('*, users!inner(id, clerk_id, plan)')

  // Filter: paid plans only, must have contact email
  const eligible = (bizWithUsers || []).filter((b: any) =>
    ['solo'].includes(b.users?.plan) && b.contact_email
  )

  if (!eligible.length) return NextResponse.json({ generated: 0 })

  const MAX_BLOGS_PER_MONTH = 2

  let generated = 0
  const results = await Promise.allSettled(eligible.map(async (biz: any) => {
    try {
        // Check monthly limit — max 2 blog posts per business per month
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: blogCount } = await supabase
          .from('content_items')
          .select('*', { count: 'exact', head: true })
          .eq('business_id', biz.id)
          .eq('type', 'blog_post')
          .gte('created_at', startOfMonth.toISOString())

        if ((blogCount ?? 0) >= MAX_BLOGS_PER_MONTH) {
          console.log(`[weekly-blog] Business ${biz.id} already has ${blogCount} blogs this month, skipping`)
          return
        }

        const ctx: BusinessContext = {
          name: biz.name || '',
          category: biz.category || '',
          primary_city: biz.primary_city || '',
          service_areas: Array.isArray(biz.service_areas) ? biz.service_areas : [],
          specialties: Array.isArray(biz.specialties) ? biz.specialties : [],
          description: biz.description || '',
        }

        const promptContext = buildPromptContext(ctx)
        const serviceAreasStr = ctx.service_areas.length
          ? ctx.service_areas.join(', ')
          : ctx.primary_city

        const prompt = `You are writing a blog post for a local business. Use the following business context:

${promptContext}

Write a blog post that:
- Is relevant to the business category and serves customers in ${ctx.primary_city} and surrounding areas (${serviceAreasStr})
- Is 400–600 words
- Has a compelling, specific title
- Is written in the business's tone (see Tone above)
- Naturally mentions the city/service areas without keyword stuffing
- Provides genuine value (tips, how-to, FAQ, seasonal advice, or a local guide)
- Ends with a soft call-to-action for the business

Respond ONLY with valid JSON in this exact format:
{"title": "...", "body": "..."}`

        const result = await generateText(prompt, {
          model: 'claude-haiku-4-5-20250414',
          maxTokens: 1200,
          system: 'You are a local SEO content writer. Respond only with the JSON object requested — no markdown fences, no extra text.',
        })

        if (!result.success || !result.text) {
          console.error(`[weekly-blog] AI generation failed for business ${biz.id}:`, result.error)
          return
        }

        let title: string
        let body: string
        try {
          // Strip possible markdown code fences before parsing
          const cleaned = result.text.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim()
          const parsed = JSON.parse(cleaned)
          title = parsed.title || 'Weekly Blog Post'
          body = parsed.body || result.text
        } catch {
          // Fallback: treat first line as title, rest as body
          const lines = result.text.trim().split('\n')
          title = lines[0].replace(/^#+\s*/, '').trim()
          body = lines.slice(1).join('\n').trim()
        }

        // Save as draft in content_items
        const { error: insertError } = await supabase
          .from('content_items')
          .insert({
            business_id: biz.id,
            type: 'blog_post',
            status: 'draft',
            title,
            body,
            metadata: {
              generated_by: 'weekly-blog-cron',
              week: new Date().toISOString().slice(0, 10),
              category: ctx.category,
              primary_city: ctx.primary_city,
            },
          })

        if (insertError) {
          console.error(`[weekly-blog] DB insert failed for business ${biz.id}:`, insertError)
          return
        }

        // Email the user — preview first 500 chars in the email body
        const preview = body.length > 500 ? body.slice(0, 497) + '…' : body

        await sendWeeklyContentEmail({
          to: biz.contact_email,
          businessName: biz.name,
          postTitle: title,
          postContent: preview,
          dashboardUrl: 'https://localbeacon.ai',
          subject: `Your weekly blog post is ready — ${biz.name}`,
        })

    } catch (err) {
      console.error(`[weekly-blog] Cron failed for business ${biz.id}:`, err)
      throw err
    }
  }))

  for (const result of results) {
    if (result.status === 'fulfilled') generated++
  }

  return NextResponse.json({ generated })
}
