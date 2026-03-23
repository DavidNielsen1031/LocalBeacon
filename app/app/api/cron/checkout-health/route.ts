export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS } from '@/lib/stripe'

/**
 * Checkout health check — runs daily at 8am CST.
 * Verifies Stripe is configured and price IDs are valid.
 * Logs structured JSON for monitoring.
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const issues: string[] = []

  // Check Stripe client
  if (!stripe) {
    issues.push('STRIPE_SECRET_KEY not configured — all checkouts will fail')
  }

  // Check price IDs exist and are active in Stripe
  if (stripe) {
    for (const [key, plan] of Object.entries(PLANS)) {
      if (!plan.priceId) continue
      try {
        const price = await stripe.prices.retrieve(plan.priceId)
        if (!price.active) {
          issues.push(`${key} price ${plan.priceId} is INACTIVE in Stripe`)
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown'
        issues.push(`${key} price ${plan.priceId} lookup failed: ${msg}`)
      }
    }
  }

  // Check webhook secret
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    issues.push('STRIPE_WEBHOOK_SECRET not set — webhooks will fail')
  }

  const status = issues.length === 0 ? 'healthy' : 'unhealthy'

  console.log(JSON.stringify({
    event: 'checkout_health',
    status,
    issues,
    timestamp: new Date().toISOString(),
  }))

  if (issues.length > 0) {
    // Could alert to Discord here in the future
    console.error(`🚨 CHECKOUT HEALTH: ${issues.join(' | ')}`)
  }

  return NextResponse.json({ status, issues })
}
