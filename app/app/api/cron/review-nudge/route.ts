export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendReviewNudgeEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Get all paying users (solo + agency)
  const { data: users } = await supabase
    .from('users')
    .select('id, clerk_id, plan, email')
    .in('plan', ['solo', 'agency'])

  if (!users?.length) return NextResponse.json({ sent: 0 })

  // Look back 7 days for recent review response activity
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  let sent = 0
  let skipped = 0

  for (const user of users) {
    try {
      // Get user's businesses
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id, name, contact_email')
        .eq('user_id', user.id)

      for (const biz of businesses || []) {
        // Check if they've generated any review responses in the last 7 days
        const { count } = await supabase
          .from('content_items')
          .select('*', { count: 'exact', head: true })
          .eq('business_id', biz.id)
          .eq('type', 'review_response')
          .gte('created_at', sevenDaysAgo.toISOString())

        if ((count ?? 0) > 0) {
          // Already active — no nudge needed
          skipped++
          continue
        }

        // Send nudge to the business contact email or user email
        const emailTo = biz.contact_email || user.email
        if (!emailTo) {
          console.log(`[review-nudge] No email for biz ${biz.id}, skipping`)
          continue
        }

        await sendReviewNudgeEmail({
          to: emailTo,
          businessName: biz.name,
          dashboardUrl: 'https://localbeacon.ai',
        })
        sent++
      }
    } catch (err) {
      console.error(`[review-nudge] Failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ sent, skipped })
}
