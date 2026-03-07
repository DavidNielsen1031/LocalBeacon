export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: businessId } = await params
  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Verify ownership: user must own this business
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

  // Get content counts
  const { count: postsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'gbp_post')

  const { count: pagesCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'city_page')

  const { count: reviewsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'review_reply')

  // Get recent content items
  const { data: recentItems } = await supabase
    .from('content_items')
    .select('type, title, created_at')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get latest AEO scan
  const { data: aeoScans } = await supabase
    .from('aeo_scans')
    .select('score')
    .eq('business_id', businessId)
    .order('scanned_at', { ascending: false })
    .limit(1)

  const aeoScore = aeoScans?.[0]?.score ?? null

  // Get freshness — find most recent gbp_post
  const { data: latestPost } = await supabase
    .from('content_items')
    .select('created_at')
    .eq('business_id', businessId)
    .eq('type', 'gbp_post')
    .order('created_at', { ascending: false })
    .limit(1)

  let freshness = null
  if (latestPost && latestPost.length > 0) {
    const lastPostDate = latestPost[0].created_at
    const daysSince = Math.floor(
      (Date.now() - new Date(lastPostDate).getTime()) / (1000 * 60 * 60 * 24)
    )
    freshness = {
      daysSinceLastPost: daysSince,
      status: daysSince <= 7 ? 'fresh' : daysSince <= 14 ? 'stale' : 'critical',
      lastPostDate,
    }
  } else {
    freshness = {
      daysSinceLastPost: null,
      status: 'none' as const,
      lastPostDate: null,
    }
  }

  return NextResponse.json({
    postsCount: postsCount ?? 0,
    pagesCount: pagesCount ?? 0,
    reviewsCount: reviewsCount ?? 0,
    aeoScore,
    recentItems: recentItems ?? [],
    freshness,
  })
}
