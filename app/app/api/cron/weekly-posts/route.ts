export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { generateText } from '@/lib/anthropic-client'
import { buildPromptContext, getToneForCategory, BusinessContext } from '@/lib/prompt-context'
import { sendWeeklyContentEmail } from '@/lib/email'

function getNextMonday9AMCST(): Date {
  const now = new Date()
  // Convert to CST (UTC-6 standard)
  const cstOffset = -6 * 60
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  const cstMs = utcMs + cstOffset * 60 * 1000
  const cstNow = new Date(cstMs)

  // Find next Monday
  const dayOfWeek = cstNow.getDay() // 0=Sun, 1=Mon, ...
  const daysUntilMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7 || 7

  const nextMonday = new Date(cstNow)
  nextMonday.setDate(cstNow.getDate() + daysUntilMonday)
  nextMonday.setHours(9, 0, 0, 0)

  // Convert back to UTC for storage
  const utcNextMonday = new Date(nextMonday.getTime() - cstOffset * 60 * 1000)
  return utcNextMonday
}

function mockWeeklyPost(businessName: string, category: string, city: string) {
  return {
    title: `${businessName} — Your Trusted ${category} in ${city}`,
    content: `This week at ${businessName}, we're focused on serving ${city} with reliable ${category.toLowerCase()} services.\n\nWhether you need a quick check-up or a full service, our team is ready to help — fast, affordable, and friendly.\n\n✅ Licensed & fully insured\n✅ Same-day appointments available\n✅ Serving ${city} and surrounding areas`,
  }
}

async function generateWeeklyPost(biz: {
  name: string
  category: string
  primary_city: string
  service_areas: string[] | null
  specialties: string[] | null
  description: string | null
}): Promise<{ title: string; content: string }> {
  const businessName = biz.name || 'Your Business'
  const category = biz.category || 'Service Provider'
  const city = biz.primary_city || 'Your City'

  const ctx: BusinessContext = {
    name: businessName,
    category,
    primary_city: city,
    service_areas: Array.isArray(biz.service_areas) ? biz.service_areas : [],
    specialties: Array.isArray(biz.specialties) ? biz.specialties : [],
    description: biz.description || '',
  }

  const contextBlock = `You are writing content for the following business:\n${buildPromptContext(ctx)}\n\n`

  const prompt = `${contextBlock}Generate a Google Business Profile post for the upcoming week.

Business: ${businessName}
Category: ${category}
City: ${city}
${ctx.specialties.length ? `Specialties: ${ctx.specialties.join(', ')}` : ''}

Requirements:
- Title: max 58 characters, upbeat, mentions the city or a key service
- Content: 150-200 words, friendly and professional
- Reference the current week and local community
- Include 3 ✅ bullet points listing key benefits
- End with a clear call to action (call, book, or visit)

Respond in JSON only:
{"title":"...","content":"..."}`

  const aiResult = await generateText(prompt, { maxTokens: 500 })

  if (aiResult.success && aiResult.text) {
    try {
      const jsonMatch = aiResult.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) return JSON.parse(jsonMatch[0])
    } catch {
      // fall through to mock
    }
  }

  return mockWeeklyPost(businessName, category, city)
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Get all paying users
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, clerk_id, plan, email')
    .in('plan', ['solo', 'agency'])

  if (usersError) {
    console.error('[weekly-posts] Failed to fetch users:', usersError)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }

  if (!users?.length) return NextResponse.json({ generated: 0 })

  const scheduledFor = getNextMonday9AMCST()
  let generated = 0

  for (const user of users) {
    try {
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id, name, category, primary_city, service_areas, specialties, description, contact_email')
        .eq('user_id', user.id)

      for (const biz of businesses || []) {
        // Skip businesses without a contact email
        if (!biz.contact_email) {
          console.log(`[weekly-posts] Skipping business ${biz.id} — no contact_email`)
          continue
        }

        try {
          // Generate the weekly GBP post
          const post = await generateWeeklyPost(biz)

          // Save to content_queue
          const { error: insertError } = await supabase
            .from('content_queue')
            .insert({
              business_id: biz.id,
              type: 'gbp_post',
              title: post.title,
              content: post.content,
              scheduled_for: scheduledFor.toISOString(),
              status: 'ready',
            })

          if (insertError) {
            console.error(`[weekly-posts] Insert failed for business ${biz.id}:`, insertError)
            continue
          }

          // Email the business contact
          await sendWeeklyContentEmail({
            to: biz.contact_email,
            businessName: biz.name || 'Your Business',
            postTitle: post.title,
            postContent: post.content,
            dashboardUrl: 'https://localbeacon.ai',
          })

          generated++
        } catch (bizErr) {
          console.error(`[weekly-posts] Failed for business ${biz.id}:`, bizErr)
        }
      }
    } catch (userErr) {
      console.error(`[weekly-posts] Failed for user ${user.id}:`, userErr)
    }
  }

  return NextResponse.json({ generated })
}
