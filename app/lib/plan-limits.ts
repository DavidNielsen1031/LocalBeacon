import { createServerClient } from './supabase'

export type PlanTier = 'free' | 'solo' | 'agency'

export interface PlanLimits {
  postsPerMonth: number | null  // null = unlimited
  cityPages: number | null
  locations: number | null
}

export interface UsageCheck {
  allowed: boolean
  plan: PlanTier
  limit: number | null
  used: number
  remaining: number | null
  upgradeUrl: string
}

const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
  free: { postsPerMonth: 5, cityPages: 3, locations: 1 },
  solo: { postsPerMonth: null, cityPages: 10, locations: 3 },
  agency: { postsPerMonth: null, cityPages: null, locations: null },
}

/**
 * Get the user's current plan tier from Supabase.
 * Falls back to 'free' if not found.
 */
export async function getUserPlan(clerkUserId: string): Promise<PlanTier> {
  const supabase = createServerClient()
  if (!supabase) return 'free'

  const { data: user } = await supabase
    .from('users')
    .select('plan')
    .eq('clerk_id', clerkUserId)
    .single()

  if (!user?.plan) return 'free'
  
  const plan = user.plan.toLowerCase()
  if (plan === 'solo' || plan === 'agency') return plan
  return 'free'
}

/**
 * Count how many items of a given type the user has generated this month.
 */
async function getMonthlyUsage(
  userId: string,
  type: 'gbp_post' | 'city_page' | 'review_reply' | 'blog_post' | 'faq'
): Promise<number> {
  const supabase = createServerClient()
  if (!supabase) return 0

  // Get the user's internal ID
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()
  
  if (!user) return 0

  // Get business ID
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!business) return 0

  // Count this month's content items
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', type)
    .gte('created_at', startOfMonth.toISOString())

  return count ?? 0
}

/**
 * Check if the user can generate a specific content type.
 * Returns usage info including whether the action is allowed.
 */
export async function checkUsage(
  clerkUserId: string,
  contentType: 'gbp_post' | 'city_page'
): Promise<UsageCheck> {
  const plan = await getUserPlan(clerkUserId)
  const limits = PLAN_LIMITS[plan]
  
  const limitKey = contentType === 'gbp_post' ? 'postsPerMonth' : 'cityPages'
  const limit = limits[limitKey]

  // Unlimited plan
  if (limit === null) {
    return {
      allowed: true,
      plan,
      limit: null,
      used: 0,
      remaining: null,
      upgradeUrl: '/pricing',
    }
  }

  const used = await getMonthlyUsage(clerkUserId, contentType)
  const remaining = Math.max(0, limit - used)

  return {
    allowed: used < limit,
    plan,
    limit,
    used,
    remaining,
    upgradeUrl: '/pricing',
  }
}

/**
 * Enforce limits — call this at the top of generation API routes.
 * Returns null if allowed, or an error response object if blocked.
 */
export async function enforceLimits(
  clerkUserId: string,
  contentType: 'gbp_post' | 'city_page'
): Promise<{ error: string; limit: number; used: number; plan: string; upgrade_url: string } | null> {
  const usage = await checkUsage(clerkUserId, contentType)
  
  if (usage.allowed) return null

  return {
    error: 'limit_reached',
    limit: usage.limit!,
    used: usage.used,
    plan: usage.plan,
    upgrade_url: usage.upgradeUrl,
  }
}
