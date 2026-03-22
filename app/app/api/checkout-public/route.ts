/**
 * POST /api/checkout-public
 * Unauthenticated Stripe Checkout — called from AI Checker results.
 * Customer goes to Stripe BEFORE signing up with Clerk.
 * After success, they sign up and the checkout is linked to their account.
 */
export const dynamic = 'force-dynamic'
import { stripe, PLANS } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const body = await req.json()
  const { plan, email, url: scannedUrl, score } = body as {
    plan: 'SOLO' | 'DFY'
    email?: string
    url?: string
    score?: number
  }

  const planConfig = PLANS[plan]
  if (!planConfig || !planConfig.priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const isDfy = plan === 'DFY'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'
    // After checkout success → sign up, then onboarding
    const successUrl = `${baseUrl}/sign-up?checkout=success&plan=${plan.toLowerCase()}`
    const cancelUrl = `${baseUrl}/check${scannedUrl ? `?url=${encodeURIComponent(scannedUrl)}` : ''}`
    const lineItems = [{ price: planConfig.priceId, quantity: 1 }]
    const meta: Record<string, string> = { plan }
    if (scannedUrl) meta.scanned_url = scannedUrl
    if (score != null) meta.scan_score = String(score)

    const sessionParams: Record<string, unknown> = {
      mode: isDfy ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: meta,
      // Let Stripe collect email if we don't have it
      ...(email ? { customer_email: email } : {}),
    }

    if (!isDfy) {
      sessionParams.subscription_data = { metadata: meta }
    }

    const session = await stripe.checkout.sessions.create(
      sessionParams as Parameters<typeof stripe.checkout.sessions.create>[0]
    )

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Public checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
