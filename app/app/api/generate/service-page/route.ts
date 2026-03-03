export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { createServerClient } from '@/lib/supabase'
import { enforceLimits } from '@/lib/plan-limits'
import { NextRequest, NextResponse } from 'next/server'

function mockPage(businessName: string, category: string, city: string, phone: string) {
  return {
    html: `<h1>${category} in ${city} | ${businessName}</h1>
<!-- META: Professional ${category.toLowerCase()} services in ${city}. ${businessName} serves all of ${city} and surrounding areas. Call ${phone || 'today'} for a free estimate. -->

<p>When you need dependable ${category.toLowerCase()} services in ${city}, ${businessName} is the team locals trust. We've built our reputation on honest work, fair pricing, and showing up when we say we will.</p>

<h2>Our ${category} Services in ${city}</h2>
<ul>
  <li>Emergency repairs and same-day service</li>
  <li>Routine maintenance and inspections</li>
  <li>New installations and upgrades</li>
  <li>Free estimates and consultations</li>
</ul>

<h2>Why ${city} Residents Choose ${businessName}</h2>
<ul>
  <li>Licensed, insured, and background-checked professionals</li>
  <li>Transparent pricing — no surprise fees</li>
  <li>Fast response times across all of ${city}</li>
</ul>

<h2>Serving All of ${city}</h2>
<p>We proudly serve homeowners and businesses throughout ${city} and the surrounding area. No matter where you are in ${city}, our team can be there quickly.</p>

<h2>Frequently Asked Questions</h2>

<h3>How quickly can you respond to calls in ${city}?</h3>
<p>We offer same-day service for most ${city} customers, with emergency response available 24/7 for urgent situations.</p>

<h3>Are you licensed and insured to work in ${city}?</h3>
<p>Yes — ${businessName} is fully licensed and insured, meeting all local requirements for ${category.toLowerCase()} work in ${city}.</p>

<h3>Do you offer free estimates for ${city} customers?</h3>
<p>Absolutely. We provide free, no-obligation estimates for all ${category.toLowerCase()} projects in ${city} and surrounding areas.</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "${businessName}",
      "telephone": "${phone || ''}",
      "areaServed": "${city}"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly can you respond to calls in ${city}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer same-day service for most ${city} customers, with emergency response available 24/7 for urgent situations."
          }
        },
        {
          "@type": "Question",
          "name": "Are you licensed and insured to work in ${city}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${businessName} is fully licensed and insured, meeting all local requirements for ${category.toLowerCase()} work in ${city}."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer free estimates for ${city} customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide free, no-obligation estimates for all ${category.toLowerCase()} projects in ${city} and surrounding areas."
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
    title: `${category} in ${city}`,
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

  const prompt = `Generate a complete service area landing page for a local business targeting "${business_category} in ${target_city}" searches.

Business: ${business_name}
Category: ${business_category}
Target city: ${target_city}
HQ city: ${primary_city}
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
    return NextResponse.json({ ...mockPage(business_name, business_category, target_city, phone), isDegraded: result.isDegraded })
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
        title: `${business_category} in ${target_city}`,
        body: html,
        metadata: { target_city, word_count: wordCount },
      })
    }
  }

  return NextResponse.json({ html, title: `${business_category} in ${target_city}`, word_count: wordCount })
}
