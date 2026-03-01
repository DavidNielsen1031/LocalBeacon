import { Plan } from './types'

export const PLAN_LIMITS: Record<Plan, {
  gbp_posts_per_month: number
  service_pages: number
  locations: number
  blog_posts: number
}> = {
  free: { gbp_posts_per_month: 5, service_pages: 3, locations: 1, blog_posts: 0 },
  solo: { gbp_posts_per_month: Infinity, service_pages: 10, locations: 3, blog_posts: 1 },
  agency: { gbp_posts_per_month: Infinity, service_pages: Infinity, locations: Infinity, blog_posts: Infinity },
}

export function isAtLimit(plan: Plan, resource: keyof typeof PLAN_LIMITS['free'], currentCount: number): boolean {
  const limit = PLAN_LIMITS[plan][resource]
  return limit !== Infinity && currentCount >= limit
}

export const PLAN_NAMES: Record<Plan, string> = {
  free: 'Free',
  solo: 'Solo',
  agency: 'Agency',
}

export const PLAN_PRICES: Record<Plan, string> = {
  free: '$0',
  solo: '$29/mo',
  agency: '$79/mo',
}
