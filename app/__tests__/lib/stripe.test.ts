import { describe, it, expect } from 'vitest'
import { STRIPE_PLANS } from '@/lib/stripe'

describe('Stripe plan config', () => {
  it('has FREE, SOLO, SOLO_ANNUAL, and DFY plans', () => {
    expect(STRIPE_PLANS.FREE).toBeDefined()
    expect(STRIPE_PLANS.SOLO).toBeDefined()
    expect(STRIPE_PLANS.SOLO_ANNUAL).toBeDefined()
    expect(STRIPE_PLANS.DFY).toBeDefined()
  })

  it('does NOT have an AGENCY plan', () => {
    expect((STRIPE_PLANS as Record<string, unknown>)['AGENCY']).toBeUndefined()
  })

  it('FREE plan has no priceId', () => {
    expect(STRIPE_PLANS.FREE.priceId).toBeNull()
    expect(STRIPE_PLANS.FREE.price).toBe(0)
  })

  it('SOLO plan is $99', () => {
    expect(STRIPE_PLANS.SOLO.price).toBe(99)
    expect(STRIPE_PLANS.SOLO.name).toContain('Autopilot')
  })

  it('SOLO_ANNUAL plan is $899', () => {
    expect(STRIPE_PLANS.SOLO_ANNUAL.price).toBe(899)
    expect(STRIPE_PLANS.SOLO_ANNUAL.name).toContain('Annual')
  })

  it('DFY plan is $499', () => {
    expect(STRIPE_PLANS.DFY.price).toBe(499)
    expect(STRIPE_PLANS.DFY.name).toContain('Launch')
  })
})
