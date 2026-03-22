/**
 * POST /api/claim-checkout
 * Called after Clerk sign-up to link a pre-auth Stripe checkout to the new user.
 * Searches Stripe for recent completed checkout sessions matching the user's email.
 */
export const dynamic = 'force-dynamic'
import { auth, currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase()
  if (!email || !stripe) return NextResponse.json({ claimed: false })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ claimed: false })

  try {
    // Search Stripe for completed checkout sessions by email
    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email },
      status: 'complete',
      limit: 10,
    })

    // Find the most recent unclaimed session (no client_reference_id and not already claimed)
    const session = sessions.data.find(
      s => !s.client_reference_id && s.metadata?.claimed !== 'true'
    )
    if (!session) return NextResponse.json({ claimed: false })

    const plan = session.metadata?.plan?.toLowerCase() || 'solo'
    const updateData: Record<string, unknown> = {
      plan,
      stripe_customer_id: session.customer as string,
    }

    if (plan === 'dfy') {
      updateData.plan = 'solo'
      updateData.plan_expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    if (session.subscription) {
      const subId = typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription.id
      updateData.stripe_subscription_id = subId

      // Update the subscription metadata with the Clerk user ID
      await stripe.subscriptions.update(subId, {
        metadata: { clerk_user_id: userId, plan: plan.toUpperCase() },
      })
    }

    await supabase
      .from('users')
      .update(updateData)
      .eq('clerk_id', userId)

    // Mark the session as claimed so it won't be claimed again
    await stripe.checkout.sessions.update(session.id, {
      metadata: { ...session.metadata, clerk_user_id: userId, claimed: 'true' },
    } as Parameters<typeof stripe.checkout.sessions.update>[1])

    console.log(`Claimed checkout ${session.id} for ${email} → user ${userId}, plan: ${plan}`)
    return NextResponse.json({ claimed: true, plan })
  } catch (err) {
    console.error('Claim checkout error:', err)
    return NextResponse.json({ claimed: false })
  }
}
