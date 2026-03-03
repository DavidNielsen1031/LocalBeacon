export const dynamic = 'force-dynamic'
import { createServerClient } from '@/lib/supabase'
import { sendMonthlyReportEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

/**
 * Send monthly content summary emails to all users.
 * Called by OpenClaw cron on 1st of each month 9 AM CST.
 */
export async function POST() {
  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  // Calculate last month's date range
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
  const monthName = lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Get all businesses with their users
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, name, user_id, users!inner(clerk_id, email)')

  if (!businesses || businesses.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No businesses found' })
  }

  let sent = 0
  const errors: string[] = []

  for (const business of businesses) {
    const user = (business as any).users
    const email = user?.email
    if (!email) continue

    // Count content items from last month
    const { count: postsCount } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .eq('type', 'gbp_post')
      .gte('created_at', lastMonth.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    const { count: pagesCount } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .eq('type', 'city_page')
      .gte('created_at', lastMonth.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    const { count: reviewsCount } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .eq('type', 'review_reply')
      .gte('created_at', lastMonth.toISOString())
      .lte('created_at', lastMonthEnd.toISOString())

    // Get latest AEO scan
    const { data: aeoScan } = await supabase
      .from('aeo_scans')
      .select('score')
      .eq('business_id', business.id)
      .order('scanned_at', { ascending: false })
      .limit(1)
      .single()

    const result = await sendMonthlyReportEmail({
      to: email,
      businessName: business.name || 'Your Business',
      postsGenerated: postsCount ?? 0,
      pagesCreated: pagesCount ?? 0,
      reviewsReplied: reviewsCount ?? 0,
      aeoScore: aeoScan?.score ?? null,
      dashboardUrl: 'https://localbeacon.ai',
      month: monthName,
    })

    if (result.success) {
      sent++
    } else {
      errors.push(`${email}: ${result.error}`)
    }
  }

  return NextResponse.json({ sent, total: businesses.length, month: monthName, errors })
}
