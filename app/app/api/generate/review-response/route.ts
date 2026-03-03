export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { generateText } from '@/lib/anthropic-client'
import { NextRequest, NextResponse } from 'next/server'

const mockResponses: Record<number, (name: string, biz: string) => string> = {
  5: (name, biz) => `Thank you so much, ${name}! We're thrilled you had a great experience with ${biz}. Your kind words mean everything to our team — we'll make sure they hear about this. We look forward to serving you again!`,
  4: (name, biz) => `Thank you for the kind words, ${name}! We're glad ${biz} could help. We'd love to earn that 5th star next time — don't hesitate to reach out if there's anything we can do better!`,
  3: (name, biz) => `Thank you for taking the time to share your experience, ${name}. We always strive to improve at ${biz} and appreciate your honest feedback. Please feel free to reach out directly so we can make it right.`,
  2: (name, biz) => `Thank you for your feedback, ${name}. We're sorry your experience with ${biz} didn't meet expectations. Please reach out to us directly — we take every concern seriously and want to make this right for you.`,
  1: (name, biz) => `Thank you for your feedback, ${name}. We sincerely apologize that your experience with ${biz} fell short. Please contact us directly so we can address your concerns — this is not the standard we hold ourselves to.`,
}

const toneGuide: Record<number, string> = {
  5: 'warm, genuinely grateful, personal — reference a specific detail from their review if possible',
  4: 'grateful and positive, acknowledge what went well, subtly invite them to return',
  3: 'professional and empathetic, acknowledge concern, offer to improve, invite direct contact',
  2: 'calm and professional, empathetic, take the conversation offline (invite direct contact)',
  1: 'calm, professional, empathetic — never defensive, offer to resolve it directly',
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    business_name = 'Our Business',
    reviewer_name = 'Customer',
    rating = 5,
    review_text = '',
    business_category = '',
  } = body

  const prompt = `Write a Google review response for this local business.

Business: ${business_name}${business_category ? ` (${business_category})` : ''}
Reviewer: ${reviewer_name}
Rating: ${rating}/5 stars
Review: "${review_text}"

Tone: ${toneGuide[rating] || toneGuide[3]}

Rules:
- Max 150 words
- Mention the business name once
- NEVER say "we value your feedback" — hollow and generic
- NEVER be defensive
- For 1-2 stars: invite direct contact to resolve
- Sound human, not corporate
- Vary the opening (don't start with "Thank you for your review")

Return only the response text.`

  const result = await generateText(prompt, { maxTokens: 250 })

  if (result.success && result.text) {
    return NextResponse.json({ response: result.text.trim(), isDegraded: false })
  }

  const fn = mockResponses[rating] || mockResponses[3]
  return NextResponse.json({ response: fn(reviewer_name, business_name), isDegraded: result.isDegraded })
}
