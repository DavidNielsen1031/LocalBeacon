export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { createServerClient } from '@/lib/supabase'
import { getUserPlan } from '@/lib/plan-limits'
import { getBusinessContext, buildPromptContext } from '@/lib/prompt-context'
import { NextRequest, NextResponse } from 'next/server'

const blogTypeGuide: Record<string, string> = {
  seasonal: 'Seasonal tips article — timely advice about weather, season changes, or upcoming needs your customers are preparing for',
  faq: 'FAQ-style article — answers the top 5-7 questions your customers actually ask, optimized for AI search and Google featured snippets',
  how_to: 'How-to guide — step-by-step instructions that build trust and establish expertise. Practical, actionable steps numbered clearly',
  local: 'Local neighborhood guide — hyper-local content referencing specific neighborhoods, landmarks, and local context to win near-me searches',
}

function mockBlogPost(businessName: string, category: string, city: string, type: string) {
  const titles: Record<string, string> = {
    seasonal: `5 Things ${city} Homeowners Should Know Before ${new Date().getMonth() < 6 ? 'Summer' : 'Winter'}`,
    faq: `${category} in ${city}: Your Top Questions Answered`,
    how_to: `How to Choose the Right ${category} Company in ${city}`,
    local: `The Complete Guide to ${category} Services in ${city}`,
  }
  const title = titles[type] || titles.local
  const preview = `Whether you're a longtime ${city} resident or just moved to the area, finding a reliable ${category.toLowerCase()} company can feel overwhelming. At ${businessName}, we've helped hundreds of local families and businesses navigate exactly this decision. Here's what you need to know...`

  return {
    title,
    html: `<article>
<h1>${title}</h1>
<p class="intro">${preview}</p>
<h2>What ${city} Customers Ask Most</h2>
<p>Every week, we talk to ${city} homeowners who have the same questions. Here are the honest answers.</p>
<h2>Why Local Experience Matters</h2>
<p>${businessName} has served ${city} and surrounding areas for years. We know the local codes, common issues specific to this area's climate, and what your neighbors are dealing with.</p>
<h2>How to Make the Right Choice</h2>
<ul>
  <li>Check that your contractor is licensed and insured in Minnesota</li>
  <li>Ask for references from ${city} customers specifically</li>
  <li>Get at least two estimates — compare scope, not just price</li>
  <li>Read recent Google reviews to see how they handle problems</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>How much does ${category.toLowerCase()} cost in ${city}?</h3>
<p>Costs vary by project scope, but most ${city} customers spend $150–$500 for standard services. Always get a written estimate before work begins.</p>
<h3>How quickly can I get service in ${city}?</h3>
<p>${businessName} offers same-day service for most ${city} requests. Emergency situations receive priority scheduling, often within 2–4 hours.</p>
<h3>Are you licensed to do ${category.toLowerCase()} work in Minnesota?</h3>
<p>Yes — ${businessName} holds all required Minnesota state licenses and carries full liability insurance on every job in ${city} and surrounding areas.</p>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does ${category.toLowerCase()} cost in ${city}?","acceptedAnswer":{"@type":"Answer","text":"Costs vary by project scope, but most ${city} customers spend $150–$500 for standard services. Always get a written estimate before work begins."}},{"@type":"Question","name":"How quickly can I get service in ${city}?","acceptedAnswer":{"@type":"Answer","text":"${businessName} offers same-day service for most ${city} requests. Emergency situations receive priority scheduling, often within 2–4 hours."}},{"@type":"Question","name":"Are you licensed to do ${category.toLowerCase()} work in Minnesota?","acceptedAnswer":{"@type":"Answer","text":"${businessName} holds all required Minnesota state licenses and carries full liability insurance on every job in ${city} and surrounding areas."}}]}
</script>
</article>`,
    preview,
    word_count: 320,
    faqs: [
      { q: `How much does ${category.toLowerCase()} cost in ${city}?`, a: `Costs vary by project scope, but most ${city} customers spend $150–$500 for standard services. Always get a written estimate before work begins.` },
      { q: `How quickly can I get service in ${city}?`, a: `${businessName} offers same-day service for most ${city} requests. Emergency situations receive priority scheduling, often within 2–4 hours.` },
      { q: `Are you licensed to do ${category.toLowerCase()} work in Minnesota?`, a: `${businessName} holds all required Minnesota state licenses and carries full liability insurance on every job in ${city} and surrounding areas.` },
    ],
  }
}

function extractFaqs(html: string): Array<{ q: string; a: string }> {
  const faqs: Array<{ q: string; a: string }> = []
  const faqRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gi
  let match
  while ((match = faqRegex.exec(html)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, '').trim()
    const a = match[2].replace(/<[^>]*>/g, '').trim()
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

function extractTitle(html: string): string {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : 'Blog Post'
}

function extractPreview(html: string, maxLen = 200): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Blog posts are a Solo+ feature
  const plan = await getUserPlan(userId)
  if (plan === 'free') {
    return NextResponse.json(
      { error: 'limit_reached', plan: 'free', upgrade_url: '/pricing', message: 'Blog post generation is available on the Local Autopilot plan. Upgrade to unlock.' },
      { status: 403 }
    )
  }

  const body = await req.json()
  const {
    business_id,
    type = 'seasonal',
    city = '',
    topic = '',
    business_name = 'Your Business',
    business_category = 'Service Provider',
  } = body

  // Enrich with business context from Settings
  const bizCtx = await getBusinessContext(userId)
  const contextBlock = bizCtx
    ? `You are writing content for the following business:\n${buildPromptContext(bizCtx)}\n\n`
    : ''

  const effectiveName = bizCtx?.name || business_name
  const effectiveCategory = bizCtx?.category || business_category
  const effectiveCity = city || bizCtx?.primary_city || 'your city'

  const topicLine = topic ? `Topic focus: "${topic}"` : `Topic: Choose the most seasonally relevant topic for a ${effectiveCategory.toLowerCase()} company right now`

  const prompt = `${contextBlock}Write a locally-optimized blog post for a local business website.

Business: ${effectiveName}
Category: ${effectiveCategory}
City: ${effectiveCity}
Post type: ${blogTypeGuide[type] || blogTypeGuide.how_to}
${topicLine}

Write a complete HTML blog post (800-1000 words) with this structure:
1. <h1> — compelling, SEO-optimized title mentioning ${effectiveCity} and the service
2. <p class="intro"> — engaging hook paragraph (60-80 words) that draws the reader in
3. 3-4 content sections with <h2> headers and substantial paragraphs (each 80-120 words)
4. <h2>Frequently Asked Questions</h2> with exactly 3 Q&As using <h3>/<p> tags:
   - Each answer: self-contained, 20-30 words, optimized for AI search (direct answer first)
5. <script type="application/ld+json"> with FAQPage schema for all 3 Q&As
6. <div class="cta"> closing call to action

SEO requirements:
- Use "${effectiveCity}" naturally 8-12 times throughout
- Mention ${effectiveCategory.toLowerCase()} keyword 5-8 times
- Write for actual humans first, search engines second
- No fluff, no filler — every paragraph adds value
- FAQ answers must be standalone (AI assistants cite them directly)

Return ONLY the HTML content. No markdown, no explanation.`

  const result = await generateText(prompt, { maxTokens: 2500 })

  if (!result.success || !result.text) {
    const fallback = mockBlogPost(effectiveName, effectiveCategory, effectiveCity, type)
    return NextResponse.json({ ...fallback, isDegraded: result.isDegraded })
  }

  const html = result.text.replace(/^```html\n?/, '').replace(/\n?```$/, '').trim()
  const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  const title = extractTitle(html)
  const preview = extractPreview(html)
  const faqs = extractFaqs(html)

  // Save to content_items if we have a business_id
  if (business_id) {
    const supabase = createServerClient()
    if (supabase) {
      await supabase.from('content_items').insert({
        business_id,
        type: 'blog_post',
        status: 'draft',
        title,
        body: html,
        metadata: { type, city: effectiveCity, word_count: wordCount, topic: topic || null },
      })
    }
  }

  return NextResponse.json({
    title,
    html,
    preview,
    word_count: wordCount,
    faqs,
    isDegraded: false,
  })
}
