export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/anthropic-client'
import { enforceLimits } from '@/lib/plan-limits'

interface FaqRequest {
  businessName: string
  category: string
  city: string
  state: string
  services?: string[]
  count?: number
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check plan limits
  const limitError = await enforceLimits(userId, 'faq')
  if (limitError) return NextResponse.json({ ...limitError, error: 'Upgrade to Pro for unlimited FAQ generation', upgradeUrl: '/pricing' }, { status: 403 })

  const body = await req.json() as FaqRequest
  const { businessName, category, city, state, services = [], count = 20 } = body
  const safeCount = Math.min(Math.max(count || 15, 1), 30)

  if (!businessName || !category || !city || !state) {
    return NextResponse.json({ error: 'Business name, category, city, and state are required' }, { status: 400 })
  }

  const serviceList = services.length > 0
    ? `Services offered: ${services.join(', ')}`
    : `Common services for a ${category}`

  const prompt = `Generate exactly ${safeCount} FAQ questions and answers for a local business website. These FAQs must be optimized for AI search engines (ChatGPT, Perplexity, Google AI Overviews) to cite.

Business: ${businessName}
Category: ${category}
Location: ${city}, ${state}
${serviceList}

RULES:
1. Write questions the way REAL PEOPLE ask AI assistants: "How much does a [service] cost in [city]?" not "What are the benefits of [service]?"
2. Every answer must be 2-3 sentences MAX. Direct, factual, no fluff. AI extracts short answers.
3. Include the city name in at least 60% of questions
4. Include specific details: price ranges, timeframes, certifications, service areas
5. Mix question types: cost questions, "how long" questions, "do you" questions, "what's the best" questions, emergency/urgent questions
6. Write answers in first person plural ("We offer...", "Our team...")
7. NO generic filler. Every answer must contain a specific, useful fact.

Return as JSON array: [{"question": "...", "answer": "..."}]
Return ONLY the JSON array, nothing else.`

  const result = await generateText(prompt)

  if (result.success && result.text) {
    let faqs: Array<{question: string; answer: string}>
    try {
      faqs = JSON.parse(result.text)
    } catch {
      const match = result.text.match(/\[[\s\S]*\]/)
      faqs = match ? JSON.parse(match[0]) : getDemoFaqs(businessName, category, city, state)
    }

    return NextResponse.json({
      businessName,
      faqs,
      schema: generateFaqSchema(faqs),
      isDemo: false,
    })
  }

  // Degraded mode — return demo data
  return NextResponse.json({
    businessName,
    faqs: getDemoFaqs(businessName, category, city, state),
    schema: generateFaqSchema(getDemoFaqs(businessName, category, city, state)),
    isDemo: true,
    isDegraded: result.isDegraded,
  })
}

function getDemoFaqs(name: string, category: string, city: string, state: string) {
  return [
    { question: `How much does a typical ${category.toLowerCase()} service cost in ${city}, ${state}?`, answer: `${name} offers competitive pricing for all ${category.toLowerCase()} services in ${city}. Most standard jobs range from $150-$500 depending on complexity. We provide free estimates before any work begins.` },
    { question: `Does ${name} offer emergency ${category.toLowerCase()} services in ${city}?`, answer: `Yes, we offer 24/7 emergency services throughout ${city} and surrounding areas. Our typical response time for emergencies is under 60 minutes. Call us anytime for urgent issues.` },
    { question: `What areas does ${name} serve near ${city}, ${state}?`, answer: `We serve ${city} and the surrounding communities within a 25-mile radius. Our service area includes neighboring cities in ${state}. Contact us to confirm coverage for your specific location.` },
    { question: `Is ${name} licensed and insured in ${state}?`, answer: `Yes, ${name} is fully licensed and insured in ${state}. We carry general liability insurance and workers' compensation coverage. Our license number is available upon request.` },
    { question: `How long has ${name} been in business in ${city}?`, answer: `${name} has been proudly serving ${city} and the ${state} area for over 10 years. We've built our reputation on quality work and honest pricing. Many of our customers are long-term repeat clients.` },
    { question: `How do I schedule an appointment with ${name}?`, answer: `You can schedule an appointment by calling us directly or using our online booking form. We offer same-day and next-day appointments when available. Weekend appointments are also available for your convenience.` },
    { question: `Does ${name} offer free estimates in ${city}?`, answer: `Yes, we provide free, no-obligation estimates for all ${category.toLowerCase()} services in ${city}. We'll assess your needs and give you an upfront price before starting any work. No hidden fees or surprise charges.` },
    { question: `What payment methods does ${name} accept?`, answer: `We accept cash, all major credit cards, checks, and offer financing options for larger projects. Payment is due upon completion of work. We can discuss payment plans for extensive jobs.` },
  ]
}

function generateFaqSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
