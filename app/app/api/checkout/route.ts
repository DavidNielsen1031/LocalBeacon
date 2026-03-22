/**
 * POST /api/checkout
 * Called ONLY from: app/onboarding/page.tsx (post-auth resume flow)
 * NOT called from: /pricing (informational only, all CTAs → /check)
 * Auth: Clerk required — returns 401 if not signed in
 * Mode is derived from plan key (DFY=payment, SOLO=subscription)
 */
export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { stripe, PLANS } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!stripe) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const body = await req.json()
  const { plan } = body as { plan: 'SOLO' | 'DFY' }

  // Agency plan has been retired — only Solo and DFY are available
  if ((plan as string) === 'AGENCY') {
    return NextResponse.json({ error: 'Agency plan is no longer available. Please select Local Autopilot.' }, { status: 400 })
  }

  const planConfig = PLANS[plan]
  if (!planConfig) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }
  if (!planConfig.priceId) {
    return NextResponse.json({ error: `${planConfig.name} plan is not yet available. Please contact support@localbeacon.ai` }, { status: 400 })
  }

  try {
    // DFY is a one-time payment; Solo and Managed are subscriptions
    const isDfy = plan === 'DFY'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'
    const successUrl = `${baseUrl}/dashboard?checkout=success`
    const cancelUrl = `${baseUrl}/pricing`
    const lineItems = [{ price: planConfig.priceId, quantity: 1 }]
    const meta = { clerk_user_id: userId, plan }

    let session
    if (isDfy) {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: meta,
      })
    } else {
      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: meta,
        subscription_data: { metadata: meta },
      })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
