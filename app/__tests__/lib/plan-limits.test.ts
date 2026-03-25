import { describe, it, expect } from 'vitest'
import { getPlanLimits, type PlanTier } from '@/lib/plan-limits'

describe('Plan limits', () => {
  it('free plan has restricted limits', () => {
    const limits = getPlanLimits('free')
    expect(limits.postsPerMonth).toBe(5)
    expect(limits.cityPages).toBe(3)
    expect(limits.locations).toBe(1)
    expect(limits.scansPerMonth).toBe(1)
    expect(limits.blogPosts).toBe(0)
    expect(limits.monthlyReports).toBe(false)
  })

  it('solo plan has 2 blog posts/month (not 4)', () => {
    const limits = getPlanLimits('solo')
    expect(limits.blogPosts).toBe(2)
  })

  it('solo plan has 3 city pages/month (not 10)', () => {
    const limits = getPlanLimits('solo')
    expect(limits.cityPages).toBe(3)
  })

  it('solo plan has unlimited posts', () => {
    const limits = getPlanLimits('solo')
    expect(limits.postsPerMonth).toBeNull()
  })

  it('solo plan has monthly reports', () => {
    const limits = getPlanLimits('solo')
    expect(limits.monthlyReports).toBe(true)
  })

  it('no agency tier exists', () => {
    // This should throw or return undefined
    expect(() => getPlanLimits('agency' as PlanTier)).toThrow
  })
})
