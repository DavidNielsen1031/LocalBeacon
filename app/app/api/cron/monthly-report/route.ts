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

  // Get all solo/agency users with businesses
  const { data: users } = await supabase
    .from('users')
    .select('id, clerk_id, plan')
    .in('plan', ['solo', 'agency'])

  if (!users?.length) return NextResponse.json({ sent: 0 })

  let sent = 0
  for (const user of users) {
    try {
      // Get user's businesses
      const { data: businesses } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)

      for (const biz of businesses || []) {
        // Get this month's stats
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: postsCount } = await supabase
          .from('content_items')
          .select('*', { count: 'exact', head: true })
          .eq('business_id', biz.id)
          .gte('created_at', startOfMonth.toISOString())

        // Get latest AEO score
        const { data: latestScan } = await supabase
          .from('aeo_scans')
          .select('score')
          .eq('business_id', biz.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

        await sendMonthlyReportEmail({
          to: biz.contact_email || '',
          businessName: biz.name,
          postsGenerated: postsCount || 0,
          pagesCreated: 0,
          reviewsReplied: 0,
          aeoScore: latestScan?.score ?? null,
          dashboardUrl: `https://localbeacon.ai/dashboard`,
          month,
        })
        sent++
      }
    } catch (err) {
      console.error(`Monthly report failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ sent })
}
