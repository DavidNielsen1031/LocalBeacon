import { createServerClient } from './supabase'

export type FreshnessStatus = 'fresh' | 'stale' | 'critical' | 'none'

export interface FreshnessResult {
  daysSinceLastPost: number | null
  status: FreshnessStatus
  lastPostDate: string | null
}

/**
 * Returns how recently this user's business has posted content.
 * Checks both content_items and content_queue for the latest created_at.
 *
 * Thresholds:
 *   fresh    = 0–7 days
 *   stale    = 8–14 days
 *   critical = 15+ days
 *   none     = no posts ever
 */
export async function getFreshness(clerkUserId: string): Promise<FreshnessResult> {
  const supabase = createServerClient()
  if (!supabase) return { daysSinceLastPost: null, status: 'none', lastPostDate: null }

  // Step 1: resolve internal user ID from Clerk ID
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', clerkUserId)
    .single()

  if (!user) return { daysSinceLastPost: null, status: 'none', lastPostDate: null }

  // Step 2: get business
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!business) return { daysSinceLastPost: null, status: 'none', lastPostDate: null }

  // Step 3: latest created_at from content_items
  const { data: latestItem } = await supabase
    .from('content_items')
    .select('created_at')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Step 4: latest created_at from content_queue
  const { data: latestQueued } = await supabase
    .from('content_queue')
    .select('created_at')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Step 5: pick the most recent across both tables
  const dates: Date[] = []
  if (latestItem?.created_at) dates.push(new Date(latestItem.created_at))
  if (latestQueued?.created_at) dates.push(new Date(latestQueued.created_at))

  if (dates.length === 0) {
    return { daysSinceLastPost: null, status: 'none', lastPostDate: null }
  }

  const mostRecent = dates.reduce((a, b) => (a > b ? a : b))
  const now = new Date()
  const diffMs = now.getTime() - mostRecent.getTime()
  const daysSinceLastPost = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const lastPostDate = mostRecent.toISOString()

  let status: FreshnessStatus
  if (daysSinceLastPost <= 7) {
    status = 'fresh'
  } else if (daysSinceLastPost <= 14) {
    status = 'stale'
  } else {
    status = 'critical'
  }

  return { daysSinceLastPost, status, lastPostDate }
}
