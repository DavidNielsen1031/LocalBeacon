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

  // Get all solo/agency users
  const { data: users } = await supabase
    .from('users')
    .select('id, clerk_id, plan')
    .in('plan', ['solo', 'agency'])

  if (!users?.length) return NextResponse.json({ generated: 0 })

  let generated = 0
  for (const user of users) {
    try {
      const { data: businesses } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)

      for (const biz of businesses || []) {
        // Skip businesses with no contact email
        if (!biz.contact_email) continue

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
          continue
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
          continue
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

        generated++
      }
    } catch (err) {
      console.error(`[weekly-blog] Cron failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ generated })
}
