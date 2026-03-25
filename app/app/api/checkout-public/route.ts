/**
 * POST /api/checkout-public
 * Unauthenticated Stripe Checkout — called from AI Checker results.
 * Customer goes to Stripe BEFORE signing up with Clerk.
 * After success, they sign up and the checkout is linked to their account.
 *
 * Plan keys: SOLO (monthly), SOLO_ANNUAL, DFY (Launch Package)
 */
export const dynamic = 'force-dynamic'
import { stripe, STRIPE_PLANS, type StripePlanKey } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  // Rate limit: 10 checkout sessions per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  if (!rateLimit(ip, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!stripe) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const body = await req.json()
  const { plan, email, url: scannedUrl, score } = body as {
    plan: string
    email?: string
    url?: string
    score?: number
  }

  // Validate plan key
  if (!['SOLO', 'SOLO_ANNUAL', 'DFY'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const planConfig = STRIPE_PLANS[plan as StripePlanKey]
  if (!planConfig || !planConfig.priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const isDfy = plan === 'DFY'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'
    const successUrl = `${baseUrl}/sign-up?checkout=success&plan=${plan.toLowerCase()}`
    const cancelUrl = `${baseUrl}/check${scannedUrl ? `?url=${encodeURIComponent(scannedUrl)}` : ''}`
    const lineItems = [{ price: planConfig.priceId, quantity: 1 }]
    const meta: Record<string, string> = { plan }
    if (scannedUrl) meta.scanned_url = scannedUrl
    if (score != null) meta.scan_score = String(score)

    if (isDfy) {
      // DFY: one-time payment. Webhook auto-creates subscription after.
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: meta,
        payment_intent_data: {
          setup_future_usage: 'off_session',
          metadata: meta,
        },
        ...(email ? { customer_email: email } : {}),
      })
      return NextResponse.json({ url: session.url })
    } else {
      // SOLO / SOLO_ANNUAL: subscription
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: meta,
        subscription_data: { metadata: meta },
        ...(email ? { customer_email: email } : {}),
      })
      return NextResponse.json({ url: session.url })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error(JSON.stringify({
      event: 'checkout_error',
      route: 'checkout-public',
      plan,
      email: email || null,
      error: message,
      timestamp: new Date().toISOString(),
    }))
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
