import { describe, it, expect } from 'vitest'
import {
  PLANS,
  AUTOPILOT_MONTHLY_PRICE,
  AUTOPILOT_ANNUAL_PRICE,
  LAUNCH_PACKAGE_PRICE,
  AUTOPILOT_MONTHLY_AMOUNT,
  AUTOPILOT_ANNUAL_AMOUNT,
  LAUNCH_PACKAGE_AMOUNT,
  AUTOPILOT_ANNUAL_SAVINGS,
  PRICING_FAQS,
  TAG_BADGES,
  MODE_BADGES,
} from '@/lib/plans'

describe('Plan definitions', () => {
  it('exports exactly 2 plans: LocalBeacon Pro, Beacon Launch', () => {
    expect(PLANS).toHaveLength(2)
    expect(PLANS.map(p => p.name)).toEqual(['LocalBeacon Pro', 'Beacon Launch'])
  })

  it('does NOT contain an Agency plan', () => {
    const names = PLANS.map(p => p.name.toLowerCase())
    expect(names).not.toContain('agency')
  })

  it('Autopilot is $99/mo', () => {
    const autopilot = PLANS.find(p => p.name === 'LocalBeacon Pro')!
    expect(autopilot.price).toBe('$99')
    expect(autopilot.period).toBe('/month')
  })

  it('Autopilot annual is $899/yr', () => {
    const autopilot = PLANS.find(p => p.name === 'LocalBeacon Pro')!
    expect(autopilot.annualPrice).toBe('$899')
    expect(autopilot.annualPeriod).toBe('/year')
  })

  it('Beacon Launch is $499 one-time', () => {
    const lp = PLANS.find(p => p.name === 'Beacon Launch')!
    expect(lp.price).toBe('$499')
    expect(lp.period).toBe('one-time')
  })

  it('annual savings math is correct', () => {
    const expectedSavings = (AUTOPILOT_MONTHLY_AMOUNT * 12) - AUTOPILOT_ANNUAL_AMOUNT
    expect(expectedSavings).toBe(289)
    expect(AUTOPILOT_ANNUAL_SAVINGS).toBe('$289')
  })

  it('every plan has required fields', () => {
    for (const plan of PLANS) {
      expect(plan.name).toBeTruthy()
      expect(plan.price).toBeTruthy()
      expect(plan.period).toBeTruthy()
      expect(plan.tagline).toBeTruthy()
      expect(plan.features.length).toBeGreaterThan(0)
      expect(plan.cta).toBeTruthy()
      expect(typeof plan.highlight).toBe('boolean')
    }
  })

  it('every feature has a label', () => {
    for (const plan of PLANS) {
      for (const feature of plan.features) {
        expect(feature.label).toBeTruthy()
      }
    }
  })

  it('every feature has a legacy mode field for backwards compat', () => {
    for (const plan of PLANS) {
      for (const feature of plan.features) {
        expect(feature.mode).toBeTruthy()
        expect(Object.keys(MODE_BADGES)).toContain(feature.mode)
      }
    }
  })

  it('Stripe plan keys are valid', () => {
    const validKeys = [null, 'SOLO', 'SOLO_ANNUAL', 'DFY']
    for (const plan of PLANS) {
      expect(validKeys).toContain(plan.stripePlan)
    }
  })

  it('Beacon Launch is marked as addon', () => {
    const lp = PLANS.find(p => p.name === 'Beacon Launch')!
    expect(lp.addon).toBe(true)
  })

  it('Pro is highlighted', () => {
    const autopilot = PLANS.find(p => p.name === 'LocalBeacon Pro')!
    expect(autopilot.highlight).toBe(true)
  })
})

describe('Pricing constants', () => {
  it('price strings match amounts', () => {
    expect(AUTOPILOT_MONTHLY_PRICE).toBe(`$${AUTOPILOT_MONTHLY_AMOUNT}`)
    expect(AUTOPILOT_ANNUAL_PRICE).toBe(`$${AUTOPILOT_ANNUAL_AMOUNT}`)
    expect(LAUNCH_PACKAGE_PRICE).toBe(`$${LAUNCH_PACKAGE_AMOUNT}`)
  })
})

describe('Pricing FAQs', () => {
  it('has at least 5 FAQs', () => {
    expect(PRICING_FAQS.length).toBeGreaterThanOrEqual(5)
  })

  it('every FAQ has a question and answer', () => {
    for (const faq of PRICING_FAQS) {
      expect(faq.q).toBeTruthy()
      expect(faq.a).toBeTruthy()
    }
  })

  it('FAQs reference current pricing', () => {
    const allText = PRICING_FAQS.map(f => f.a).join(' ')
    expect(allText).toContain('$99')
    expect(allText).toContain('$899')
    expect(allText).toContain('$499')
    expect(allText).not.toContain('$49/')
    expect(allText).not.toContain('$49 ')
  })
})

describe('Badge configs', () => {
  it('TAG_BADGES has all required keys', () => {
    const expectedKeys = ['automated', 'we-host', 'you-post', 'auto-gen', 'you-install', 'we-install', 'included']
    for (const key of expectedKeys) {
      expect(TAG_BADGES[key as keyof typeof TAG_BADGES]).toBeDefined()
      expect(TAG_BADGES[key as keyof typeof TAG_BADGES].label).toBeTruthy()
    }
  })
})
