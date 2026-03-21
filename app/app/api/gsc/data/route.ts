export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/**
 * GET /api/gsc/data?period=7d|28d|3mo
 * Returns search performance data from Google Search Console
 */
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Get user
  const { data: user } = await supabase.from('users').select('id, plan').eq('clerk_id', userId).single()
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Check plan (Solo+ only)
  if (!user.plan || user.plan === 'free') {
    return NextResponse.json({ error: 'GSC data requires a Solo or higher plan', upgrade: true }, { status: 403 })
  }

  // Get GSC connection
  const { data: gsc } = await supabase
    .from('gsc_connections')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!gsc) {
    return NextResponse.json({ connected: false, error: 'No Google Search Console connected' }, { status: 200 })
  }

  // Refresh token if expired
  let accessToken = gsc.access_token
  if (new Date(gsc.token_expiry) < new Date()) {
    const clientId = process.env.GOOGLE_GSC_CLIENT_ID
    const clientSecret = process.env.GOOGLE_GSC_CLIENT_SECRET
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'GSC not configured' }, { status: 503 })
    }

    const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: gsc.refresh_token,
        grant_type: 'refresh_token',
      }),
    })
    const refreshData = await refreshRes.json()
    if (!refreshRes.ok) {
      return NextResponse.json({ error: 'Failed to refresh GSC token', connected: false }, { status: 401 })
    }
    accessToken = refreshData.access_token
    await supabase.from('gsc_connections').update({
      access_token: accessToken,
      token_expiry: new Date(Date.now() + (refreshData.expires_in || 3600) * 1000).toISOString(),
    }).eq('user_id', user.id)
  }

  // Determine date range
  const period = req.nextUrl.searchParams.get('period') || '28d'
  const now = new Date()
  let startDate: Date
  switch (period) {
    case '7d': startDate = new Date(now.getTime() - 7 * 86400000); break
    case '3mo': startDate = new Date(now.getTime() - 90 * 86400000); break
    default: startDate = new Date(now.getTime() - 28 * 86400000); break
  }
  // GSC data is delayed ~3 days
  const endDate = new Date(now.getTime() - 3 * 86400000)
  if (startDate >= endDate) startDate = new Date(endDate.getTime() - 7 * 86400000)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]
  const siteUrl = gsc.sites?.[0]
  if (!siteUrl) {
    return NextResponse.json({ connected: true, error: 'No site found in GSC', sites: gsc.sites }, { status: 200 })
  }

  // Fetch search analytics
  try {
    const analyticsRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['query'],
          rowLimit: 10,
        }),
      }
    )
    const analytics = await analyticsRes.json()

    // Also get totals (no dimensions)
    const totalsRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        }),
      }
    )
    const totals = await totalsRes.json()

    // Get previous period for comparison
    const prevEnd = new Date(startDate.getTime() - 86400000)
    const periodMs = endDate.getTime() - startDate.getTime()
    const prevStart = new Date(prevEnd.getTime() - periodMs)

    const prevRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formatDate(prevStart),
          endDate: formatDate(prevEnd),
        }),
      }
    )
    const prevData = await prevRes.json()

    const currentRow = totals.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 }
    const prevRow = prevData.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 }

    return NextResponse.json({
      connected: true,
      siteUrl,
      period,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      totals: {
        clicks: currentRow.clicks || 0,
        impressions: currentRow.impressions || 0,
        ctr: Math.round((currentRow.ctr || 0) * 1000) / 10,
        position: Math.round((currentRow.position || 0) * 10) / 10,
      },
      previous: {
        clicks: prevRow.clicks || 0,
        impressions: prevRow.impressions || 0,
        ctr: Math.round((prevRow.ctr || 0) * 1000) / 10,
        position: Math.round((prevRow.position || 0) * 10) / 10,
      },
      topQueries: (analytics.rows || []).map((r: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Math.round(r.ctr * 1000) / 10,
        position: Math.round(r.position * 10) / 10,
      })),
    })
  } catch (err) {
    console.error('[gsc/data] Error:', err)
    return NextResponse.json({ connected: true, error: 'Failed to fetch GSC data' }, { status: 500 })
  }
}
