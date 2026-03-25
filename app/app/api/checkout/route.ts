/**
 * POST /api/checkout
 * Called from authenticated contexts (dashboard upgrade, onboarding)
 * Auth: Clerk required — returns 401 if not signed in
 *
 * Plan keys: SOLO (monthly), SOLO_ANNUAL, DFY (Launch Package)
 * - SOLO / SOLO_ANNUAL → subscription mode
 * - DFY → payment mode ($499 one-time) + auto-create subscription in webhook
 */
export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { stripe, STRIPE_PLANS, type StripePlanKey } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!stripe) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const body = await req.json()
  const { plan } = body as { plan: string }

  // Reject retired plans
  if (plan === 'AGENCY') {
    return NextResponse.json({ error: 'This plan is no longer available.' }, { status: 400 })
  }

  // Validate plan key
  if (!['SOLO', 'SOLO_ANNUAL', 'DFY'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const planConfig = STRIPE_PLANS[plan as StripePlanKey]
  if (!planConfig || !planConfig.priceId) {
    return NextResponse.json({ error: `${plan} is not yet available. Please contact support@localbeacon.ai` }, { status: 400 })
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'
    const successUrl = `${baseUrl}/dashboard?checkout=success`
    const cancelUrl = `${baseUrl}/pricing`
    const lineItems = [{ price: planConfig.priceId, quantity: 1 }]
    const meta = { clerk_user_id: userId, plan }

    const isDfy = plan === 'DFY'

    if (isDfy) {
      // DFY: one-time payment. Webhook auto-creates subscription after.
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: meta,
        // Collect payment method for future subscription
        payment_intent_data: {
          setup_future_usage: 'off_session',
          metadata: meta,
        },
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
        client_reference_id: userId,
        metadata: meta,
        subscription_data: { metadata: meta },
      })
      return NextResponse.json({ url: session.url })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error(JSON.stringify({
      event: 'checkout_error',
      route: 'checkout',
      plan,
      error: message,
      timestamp: new Date().toISOString(),
    }))
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
