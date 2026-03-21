export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { createServerClient } from '@/lib/supabase'
import { enforceLimits } from '@/lib/plan-limits'
import { getBusinessContext, buildPromptContext } from '@/lib/prompt-context'
import { NextRequest, NextResponse } from 'next/server'

/** HTML-escape user-controlled values to prevent stored XSS */
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function mockPage(businessName: string, category: string, city: string, phone: string) {
  const bn = escapeHtml(businessName), cat = escapeHtml(category), ct = escapeHtml(city), ph = escapeHtml(phone)
  return {
    html: `<h1>${cat} in ${ct} | ${bn}</h1>
<!-- META: Professional ${category.toLowerCase()} services in ${ct}. ${bn} serves all of ${ct} and surrounding areas. Call ${phone || 'today'} for a free estimate. -->

<p>When you need dependable ${category.toLowerCase()} services in ${ct}, ${bn} is the team locals trust. We've built our reputation on honest work, fair pricing, and showing up when we say we will.</p>

<h2>Our ${cat} Services in ${ct}</h2>
<ul>
  <li>Emergency repairs and same-day service</li>
  <li>Routine maintenance and inspections</li>
  <li>New installations and upgrades</li>
  <li>Free estimates and consultations</li>
</ul>

<h2>Why ${ct} Residents Choose ${bn}</h2>
<ul>
  <li>Licensed, insured, and background-checked professionals</li>
  <li>Transparent pricing — no surprise fees</li>
  <li>Fast response times across all of ${ct}</li>
</ul>

<h2>Serving All of ${ct}</h2>
<p>We proudly serve homeowners and businesses throughout ${ct} and the surrounding area. No matter where you are in ${ct}, our team can be there quickly.</p>

<h2>Frequently Asked Questions</h2>

<h3>How quickly can you respond to calls in ${ct}?</h3>
<p>We offer same-day service for most ${ct} customers, with emergency response available 24/7 for urgent situations.</p>

<h3>Are you licensed and insured to work in ${ct}?</h3>
<p>Yes — ${bn} is fully licensed and insured, meeting all local requirements for ${category.toLowerCase()} work in ${ct}.</p>

<h3>Do you offer free estimates for ${ct} customers?</h3>
<p>Absolutely. We provide free, no-obligation estimates for all ${category.toLowerCase()} projects in ${ct} and surrounding areas.</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "${bn}",
      "telephone": "${phone || ''}",
      "areaServed": "${ct}"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly can you respond to calls in ${ct}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer same-day service for most ${ct} customers, with emergency response available 24/7 for urgent situations."
          }
        },
        {
          "@type": "Question",
          "name": "Are you licensed and insured to work in ${ct}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${bn} is fully licensed and insured, meeting all local requirements for ${category.toLowerCase()} work in ${ct}."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer free estimates for ${ct} customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide free, no-obligation estimates for all ${category.toLowerCase()} projects in ${ct} and surrounding areas."
          }
        }
      ]
    }
  ]
}
</script>

<div class="cta">
  <p>Ready to get started? Call us today: <strong>${phone || 'Contact Us'}</strong></p>
</div>`,
    title: `${cat} in ${ct}`,
    word_count: 280,
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check plan limits
  const limitError = await enforceLimits(userId, 'city_page')
  if (limitError) return NextResponse.json(limitError, { status: 403 })

  const body = await req.json()
  const {
    business_id,
    target_city,
    business_name = 'Your Business',
    business_category = 'Service Provider',
    primary_city = '',
    phone = '',
  } = body

  if (!target_city) return NextResponse.json({ error: 'target_city is required' }, { status: 400 })

  // Verify business ownership if business_id provided
  if (business_id) {
    const supabase = createServerClient()
    if (supabase) {
      const { data: biz, error: bizErr } = await supabase
        .from('businesses')
        .select('user_id')
        .eq('id', business_id)
        .single()
      if (bizErr || !biz) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
      }
      if (biz.user_id !== userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }
  }

  // Enrich prompt with business context from Settings if available
  const bizCtx = await getBusinessContext(userId)
  const contextBlock = bizCtx
    ? `You are writing content for the following business:\n${buildPromptContext(bizCtx)}\n\n`
    : ''

  const effectiveName = bizCtx?.name || business_name
  const effectiveCategory = bizCtx?.category || business_category
  const effectiveHQ = bizCtx?.primary_city || primary_city

  const prompt = `${contextBlock}Generate a complete service area landing page for a local business targeting "${effectiveCategory} in ${target_city}" searches.

Business: ${effectiveName}
Category: ${effectiveCategory}
Target city: ${target_city}
HQ city: ${effectiveHQ}
Phone: ${phone || 'Contact us'}

Generate HTML body content (not a full HTML page, just the content) with:
1. H1: "[Category] in [City] | [Business Name]"
2. HTML comment with meta description: <!-- META: 155 chars max, city+service+phone -->
3. Intro paragraph (80-100 words, city-specific references, professional tone)
4. H2 "Our [Category] Services in [City]" with 4 list items
5. H2 "Why [City] Residents Choose [Business Name]" with 3 differentiators
6. H2 "Serving All of [City]" paragraph about area coverage
7. H2 "Frequently Asked Questions" with exactly 3 Q&As:
   <h3>[Question about ${target_city}?]</h3>
   <p>[Direct 20-25 word answer. Self-contained. No links.]</p>
8. JSON-LD script tag with LocalBusiness + FAQPage schema
9. CTA div with phone/contact

CRITICAL: Content must be unique to ${target_city}. AEO-optimized FAQ answers (self-contained, 20-25 words each).

Return only HTML content.`

  const result = await generateText(prompt, { maxTokens: 2000 })

  if (!result.success || !result.text) {
    return NextResponse.json({ ...mockPage(effectiveName, effectiveCategory, target_city, phone), isDegraded: result.isDegraded })
  }

  const html = result.text
  const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length

  if (business_id) {
    const supabase = createServerClient()
    if (supabase) {
      await supabase.from('content_items').insert({
        business_id,
        type: 'service_page',
        status: 'draft',
        title: `${effectiveCategory} in ${target_city}`,
        body: html,
        metadata: { target_city, word_count: wordCount },
      })
    }
  }

  return NextResponse.json({ html, title: `${effectiveCategory} in ${target_city}`, word_count: wordCount })
}
