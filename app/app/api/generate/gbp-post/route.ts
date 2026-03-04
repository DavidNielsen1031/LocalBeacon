export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { createServerClient } from '@/lib/supabase'
import { enforceLimits } from '@/lib/plan-limits'
import { getBusinessContext, buildPromptContext } from '@/lib/prompt-context'
import { NextRequest, NextResponse } from 'next/server'

const postTypeDescriptions: Record<string, string> = {
  whats_new: "What's New post — share recent updates, seasonal availability, or a helpful tip",
  offer: 'Special offer or limited-time promotion',
  event: 'Local event or community involvement',
  product: 'Highlight a specific service you offer',
}

function mockPost(businessName: string, category: string, city: string) {
  return {
    title: `${businessName} — Trusted ${category} in ${city}`,
    body: `Looking for a reliable ${category.toLowerCase()} in ${city}? ${businessName} has been proudly serving the ${city} community with professional, dependable service.\n\nWhether it's a routine check or an emergency call, our team is ready to help — fast.\n\n✅ Licensed & fully insured\n✅ Same-day service available\n✅ Transparent, upfront pricing`,
    call_to_action: 'CALL',
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check plan limits
  const limitError = await enforceLimits(userId, 'gbp_post')
  if (limitError) return NextResponse.json(limitError, { status: 403 })

  const body = await req.json()
  const {
    business_id,
    post_type = 'whats_new',
    business_name = 'Your Business',
    business_category = 'Service Provider',
    primary_city = 'Your City',
    service_areas = [],
  } = body

  // Enrich prompt with business context from Settings if available
  const bizCtx = await getBusinessContext(userId)
  const contextBlock = bizCtx
    ? `You are writing content for the following business:\n${buildPromptContext(bizCtx)}\n\n`
    : ''

  const prompt = `${contextBlock}Generate a Google Business Profile post for this local business.

Business: ${bizCtx?.name || business_name}
Category: ${bizCtx?.category || business_category}
Primary city: ${bizCtx?.primary_city || primary_city}
Service areas: ${bizCtx
    ? [bizCtx.primary_city, ...bizCtx.service_areas].join(', ')
    : [primary_city, ...service_areas].join(', ')}
Post type: ${postTypeDescriptions[post_type] || postTypeDescriptions.whats_new}

Requirements:
- Title: max 58 characters, compelling, mentions city or service
- Body: 150-250 words, professional but warm
- Include: city name, specific service reference, clear CTA
- End with 3 ✅ bullet points (key benefits)
- NOT generic — specific to this business and location
- call_to_action: one of CALL, BOOK, LEARN_MORE, SIGN_UP

Respond in JSON only:
{"title":"...","body":"...","call_to_action":"CALL"}`

  const aiResult = await generateText(prompt, { maxTokens: 600 })

  let result
  if (aiResult.success && aiResult.text) {
    try {
      const jsonMatch = aiResult.text.match(/\{[\s\S]*\}/)
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : mockPost(business_name, business_category, primary_city)
    } catch {
      result = mockPost(business_name, business_category, primary_city)
    }
  } else {
    result = mockPost(business_name, business_category, primary_city)
  }

  // Save to DB if business_id provided
  if (business_id) {
    const supabase = createServerClient()
    if (supabase) {
      await supabase.from('content_items').insert({
        business_id,
        type: 'gbp_post',
        status: 'draft',
        title: result.title,
        body: result.body,
        metadata: { post_type, call_to_action: result.call_to_action },
      })
    }
  }

  return NextResponse.json({ ...result, isDegraded: aiResult.isDegraded })
}
