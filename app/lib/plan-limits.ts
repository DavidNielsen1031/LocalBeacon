import { createServerClient } from './supabase'

export type PlanTier = 'free' | 'solo' | 'agency'

export interface PlanLimits {
  postsPerMonth: number | null  // null = unlimited
  cityPages: number | null
  locations: number | null
  scansPerMonth: number | null
  faqGenerations: number | null
  reviewResponses: number | null
  competitors: number | null
  blogPosts: number | null
  monthlyReports: boolean
  llmsTxt: number | null
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
  free: {
    postsPerMonth: 5,
    cityPages: 3,
    locations: 1,
    scansPerMonth: 1,
    faqGenerations: 1,
    reviewResponses: 3,
    competitors: 1,
    blogPosts: 0,
    monthlyReports: false,
    llmsTxt: 0,
  },
  solo: {
    postsPerMonth: null,
    cityPages: 10,
    locations: 3,
    scansPerMonth: null,
    faqGenerations: null,
    reviewResponses: null,
    competitors: 5,
    blogPosts: 4,
    monthlyReports: true,
    llmsTxt: null,
  },
  agency: {
    postsPerMonth: null,
    cityPages: null,
    locations: null,
    scansPerMonth: null,
    faqGenerations: null,
    reviewResponses: null,
    competitors: 10,
    blogPosts: null,
    monthlyReports: true,
    llmsTxt: null,
  },
}

export type ContentType =
  | 'gbp_post'
  | 'city_page'
  | 'review_reply'
  | 'blog_post'
  | 'faq'
  | 'aeo_scan'
  | 'competitor_scan'
  | 'llms_txt'

/**
 * Get the user's current plan tier from Supabase.
 * Falls back to 'free' if not found.
 */
export async function getUserPlan(clerkUserId: string): Promise<PlanTier> {
  const supabase = createServerClient()
  if (!supabase) return 'free'

  const { data: user } = await supabase
    .from('users')
    .select('plan, plan_expires_at')
    .eq('clerk_id', clerkUserId)
    .single()

  if (!user?.plan) return 'free'

  // Check if the plan has expired (used for DFY 30-day Solo access)
  if (user.plan_expires_at && new Date(user.plan_expires_at) < new Date()) {
    // TODO: Plan downgrades should NOT happen here. This is a pure read function.
    // Downgrade writes should be triggered by a Stripe webhook handler (e.g. POST /api/webhooks/stripe)
    // or a scheduled cron job that sweeps expired plans. Doing it inline here causes hidden
    // side effects every time the plan is checked (e.g. during usage checks, dashboard loads).
    return 'free'
  }

  const plan = user.plan.toLowerCase()
  if (plan === 'solo' || plan === 'agency') return plan
  return 'free'
}

/**
 * Count how many items of a given type the user has generated this month.
 */
async function getMonthlyUsage(
  userId: string,
  type: ContentType
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

  // Get first business ID (for backward compat — callers should pass businessId directly)
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  const business = businesses?.[0]
  if (!business) return 0

  // Count this month's content items
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // AEO scans live in a separate table
  if (type === 'aeo_scan') {
    const { count } = await supabase
      .from('aeo_scans')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .gte('created_at', startOfMonth.toISOString())
    return count ?? 0
  }

  const { count } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', type)
    .gte('created_at', startOfMonth.toISOString())

  return count ?? 0
}

/**
 * Map a ContentType to the relevant PlanLimits key.
 */
function getLimitKey(contentType: ContentType): keyof PlanLimits | null {
  switch (contentType) {
    case 'gbp_post':      return 'postsPerMonth'
    case 'city_page':     return 'cityPages'
    case 'review_reply':  return 'reviewResponses'
    case 'blog_post':     return 'blogPosts'
    case 'faq':           return 'faqGenerations'
    case 'aeo_scan':      return 'scansPerMonth'
    case 'competitor_scan': return 'competitors'
    case 'llms_txt':      return 'llmsTxt'
    default:              return null
  }
}

/**
 * Check if the user can generate a specific content type.
 * Returns usage info including whether the action is allowed.
 */
export async function checkUsage(
  clerkUserId: string,
  contentType: ContentType
): Promise<UsageCheck> {
  const plan = await getUserPlan(clerkUserId)
  const limits = PLAN_LIMITS[plan]
  
  const limitKey = getLimitKey(contentType)
  if (!limitKey) {
    return { allowed: true, plan, limit: null, used: 0, remaining: null, upgradeUrl: '/pricing' }
  }

  const limitValue = limits[limitKey]

  // Boolean limits (monthlyReports)
  if (typeof limitValue === 'boolean') {
    return {
      allowed: limitValue,
      plan,
      limit: limitValue ? null : 0,
      used: 0,
      remaining: null,
      upgradeUrl: '/pricing',
    }
  }

  // Unlimited plan
  if (limitValue === null) {
    return {
      allowed: true,
      plan,
      limit: null,
      used: 0,
      remaining: null,
      upgradeUrl: '/pricing',
    }
  }

  // Zero limit (feature not available on this plan at all)
  if (limitValue === 0) {
    return {
      allowed: false,
      plan,
      limit: 0,
      used: 0,
      remaining: 0,
      upgradeUrl: '/pricing',
    }
  }

  const used = await getMonthlyUsage(clerkUserId, contentType)
  const remaining = Math.max(0, limitValue - used)

  return {
    allowed: used < limitValue,
    plan,
    limit: limitValue,
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
  contentType: ContentType
): Promise<{ error: string; limit: number; used: number; plan: string; upgrade_url: string } | null> {
  const usage = await checkUsage(clerkUserId, contentType)
  
  if (usage.allowed) return null

  return {
    error: 'limit_reached',
    limit: usage.limit ?? 0,
    used: usage.used,
    plan: usage.plan,
    upgrade_url: usage.upgradeUrl,
  }
}

/**
 * Get the plan limits object for a given tier.
 * Useful for client-side display of limits.
 */
export function getPlanLimits(plan: PlanTier): PlanLimits {
  return PLAN_LIMITS[plan]
}
