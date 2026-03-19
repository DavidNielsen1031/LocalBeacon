export const dynamic = 'force-dynamic'
import { createServerClient } from '@/lib/supabase'
import { sendWeeklyContentEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

/**
 * Send weekly content emails to all users with queued content.
 * Called by OpenClaw cron every Monday 9 AM CST.
 * Also callable manually for testing.
 */
export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  // Get all ready content from the queue
  const { data: queueItems } = await supabase
    .from('content_queue')
    .select(`
      id, title, content, business_id,
      businesses!inner(id, name, user_id, users!inner(clerk_id, email))
    `)
    .eq('status', 'ready')
    .order('created_at', { ascending: false })

  if (!queueItems || queueItems.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No ready content to send' })
  }

  // Group by business (send one email per business with latest post)
  const byBusiness = new Map<string, typeof queueItems[0]>()
  for (const item of queueItems) {
    if (!byBusiness.has(item.business_id)) {
      byBusiness.set(item.business_id, item)
    }
  }

  let sent = 0
  const errors: string[] = []

  for (const [, item] of byBusiness) {
    // Supabase infers a complex union type for nested joins; cast via unknown to access nested fields
    const business = item.businesses as unknown as { name: string; user_id: string; users: { clerk_id: string; email: string } | null } | null
    const user = business?.users
    const email = user?.email

    if (!email || !business) continue

    const result = await sendWeeklyContentEmail({
      to: email,
      businessName: business.name || 'Your Business',
      postTitle: item.title || 'Your Weekly Google Post',
      postContent: item.content,
      dashboardUrl: 'https://localbeacon.ai',
    })

    if (result.success) {
      sent++
    } else {
      errors.push(`${email}: ${result.error}`)
    }
  }

  return NextResponse.json({ sent, total: byBusiness.size, errors })
}
