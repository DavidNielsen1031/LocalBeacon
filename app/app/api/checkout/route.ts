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
  const { plan } = body as { plan: 'SOLO' | 'AGENCY' }

  const planConfig = PLANS[plan]
  if (!planConfig || !planConfig.priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'}/dashboard?upgraded=${plan.toLowerCase()}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'}/pricing`,
      metadata: {
        clerk_user_id: userId,
        plan: plan,
      },
      subscription_data: {
        metadata: {
          clerk_user_id: userId,
          plan: plan,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
