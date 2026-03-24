export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { apiError } from '@/lib/api-helpers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) return apiError('Unauthorized', 401)

  const { id: businessId } = await params
  const supabase = createServerClient()
  if (!supabase) return apiError('Database not configured', 503)

  // Verify ownership: user must own this business
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!user) return apiError('User not found', 404)

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!business) return apiError('Business not found', 404)

  // I15: Run all independent queries in parallel with Promise.all
  const [
    { count: postsCount },
    { count: pagesCount },
    { count: reviewsCount },
    { data: recentItems },
    { data: aeoScans },
    { data: latestPost },
  ] = await Promise.all([
    supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('type', 'gbp_post'),

    supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('type', 'service_page'),

    supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('type', 'review_response'),

    supabase
      .from('content_items')
      .select('type, title, created_at')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(5),

    supabase
      .from('aeo_scans')
      .select('score')
      .eq('business_id', businessId)
      .order('scanned_at', { ascending: false })
      .limit(1),

    supabase
      .from('content_items')
      .select('created_at')
      .eq('business_id', businessId)
      .eq('type', 'gbp_post')
      .order('created_at', { ascending: false })
      .limit(1),
  ])

  const aeoScore = aeoScans?.[0]?.score ?? null

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
