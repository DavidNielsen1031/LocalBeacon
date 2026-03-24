export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendMonthlyReportEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Single JOIN query — eliminates N+1 pattern
  const { data: bizWithUsers } = await supabase
    .from('businesses')
    .select('*, users!inner(id, clerk_id, plan)')

  // Filter: paid plans only, must have a contact email
  const eligible = (bizWithUsers || []).filter((b: any) =>
    ['solo', 'agency'].includes(b.users?.plan) && b.contact_email
  )

  if (!eligible.length) return NextResponse.json({ sent: 0 })

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  let sent = 0
  const results = await Promise.allSettled(
    eligible.map(async (biz: any) => {
      const user = biz.users

      // Get this month's content count + latest AEO score in parallel
      const [{ count: postsCount }, { data: latestScan }] = await Promise.all([
        supabase
          .from('content_items')
          .select('*', { count: 'exact', head: true })
          .eq('business_id', biz.id)
          .gte('created_at', startOfMonth.toISOString()),
        supabase
          .from('aeo_scans')
          .select('score')
          .eq('business_id', biz.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single(),
      ])

      await sendMonthlyReportEmail({
        to: biz.contact_email,
        businessName: biz.name,
        postsGenerated: postsCount || 0,
        pagesCreated: 0,
        reviewsReplied: 0,
        aeoScore: latestScan?.score ?? null,
        dashboardUrl: 'https://localbeacon.ai/dashboard',
        month,
      })
    })
  )

  for (const result of results) {
    if (result.status === 'fulfilled') sent++
    else console.error('Monthly report failed:', result.reason)
  }

  return NextResponse.json({ sent })
}
