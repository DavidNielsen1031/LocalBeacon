export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { createServerClient } from '@/lib/supabase'
import { getBusinessContext, buildPromptContext } from '@/lib/prompt-context'
import { NextRequest, NextResponse } from 'next/server'

function getNextMonday9AMCST(): Date {
  const now = new Date()
  // Convert to CST (UTC-6 standard, UTC-5 daylight)
  const cstOffset = -6 * 60 // use standard time offset
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

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { business_id } = body

  if (!business_id) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Fetch business
  const { data: business, error: bizError } = await supabase
    .from('businesses')
    .select('id, name, category, primary_city')
    .eq('id', business_id)
    .single()

  if (bizError || !business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  const businessName = business.name || 'Your Business'
  const category = business.category || 'Service Provider'
  const city = business.primary_city || 'Your City'

  // Enrich with full business context from Settings if available
  const bizCtx = await getBusinessContext(userId)
  const contextBlock = bizCtx
    ? `You are writing content for the following business:\n${buildPromptContext(bizCtx)}\n\n`
    : ''

  const prompt = `${contextBlock}Generate a Google Business Profile post for the upcoming week.

Business: ${bizCtx?.name || businessName}
Category: ${bizCtx?.category || category}
City: ${bizCtx?.primary_city || city}
${bizCtx?.specialties?.length ? `Specialties: ${bizCtx.specialties.join(', ')}` : ''}

Requirements:
- Title: max 58 characters, upbeat, mentions the city or a key service
- Content: 150-200 words, friendly and professional
- Reference the current week and local community
- Include 3 ✅ bullet points listing key benefits
- End with a clear call to action (call, book, or visit)

Respond in JSON only:
{"title":"...","content":"..."}`

  const aiResult = await generateText(prompt, { maxTokens: 500 })

  let post: { title: string; content: string }
  if (aiResult.success && aiResult.text) {
    try {
      const jsonMatch = aiResult.text.match(/\{[\s\S]*\}/)
      post = jsonMatch ? JSON.parse(jsonMatch[0]) : mockWeeklyPost(businessName, category, city)
    } catch {
      post = mockWeeklyPost(businessName, category, city)
    }
  } else {
    post = mockWeeklyPost(businessName, category, city)
  }

  const scheduledFor = getNextMonday9AMCST()

  const { data: inserted, error: insertError } = await supabase
    .from('content_queue')
    .insert({
      business_id,
      type: 'gbp_post',
      title: post.title,
      content: post.content,
      scheduled_for: scheduledFor.toISOString(),
      status: 'ready',
    })
    .select()
    .single()

  if (insertError) {
    console.error('content_queue insert error:', insertError)
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 })
  }

  return NextResponse.json({ ...inserted, isDegraded: aiResult.isDegraded })
}
