/**
 * Single source of truth for LocalBeacon plan definitions.
 * ALL pricing references across the codebase MUST import from here.
 * If you update plan features or prices, do it HERE — nowhere else.
 *
 * Exported constants (for emails, meta, non-component files):
 *   AUTOPILOT_MONTHLY_PRICE, AUTOPILOT_ANNUAL_PRICE, LAUNCH_PACKAGE_PRICE
 */

// ─── Price Constants (importable from anywhere) ─────────────────────
export const AUTOPILOT_MONTHLY_PRICE = '$99'
export const AUTOPILOT_MONTHLY_AMOUNT = 99
export const AUTOPILOT_ANNUAL_PRICE = '$899'
export const AUTOPILOT_ANNUAL_AMOUNT = 899
export const AUTOPILOT_ANNUAL_SAVINGS = '$289'
export const LAUNCH_PACKAGE_PRICE = '$499'
export const LAUNCH_PACKAGE_AMOUNT = 499
export const LAUNCH_PACKAGE_ANNUAL_PRICE = '$399'
export const LAUNCH_PACKAGE_ANNUAL_AMOUNT = 399
export const LAUNCH_PACKAGE_ANNUAL_SAVINGS = '$100'

// ─── Types ──────────────────────────────────────────────────────────

export type FeatureTag = 'automated' | 'we-host' | 'you-post' | 'auto-gen' | 'you-install' | 'we-install' | 'included'

export interface PlanFeature {
  label: string
  description?: string
  tag?: FeatureTag
  /** Secondary tag (e.g., "We host" + "Automated") */
  tag2?: FeatureTag
  /** Sub-items for grouped features */
  subItems?: string[]
  /** @deprecated Legacy mode for existing pricing/landing pages. Use tag/tag2 instead. */
  mode?: FeatureMode
}

export interface PlanDefinition {
  name: string
  price: string
  period: string
  annualPrice?: string
  annualPeriod?: string
  tagline: string
  features: PlanFeature[]
  cta: string
  ctaAnnual?: string
  /** If set, the CTA links here (free plan). If null, triggers checkout. */
  href: string | null
  /** Highlighted card (border + badge) */
  highlight: boolean
  /** Add-on card styling */
  addon?: boolean
  /** Stripe plan key for checkout. null = no checkout (free plan). */
  stripePlan: 'SOLO' | 'SOLO_ANNUAL' | 'DFY' | null
  annualStripePlan?: 'SOLO_ANNUAL'
}

/** Badge config for feature tags */
export const TAG_BADGES: Record<FeatureTag, { label: string; bg: string; color: string }> = {
  automated:    { label: 'Automated',      bg: '#EDE9FE', color: '#7C3AED' },
  'we-host':    { label: 'We host',        bg: '#ECFDF5', color: '#059669' },
  'you-post':   { label: 'You post',       bg: '#FEF9C3', color: '#A16207' },
  'auto-gen':   { label: 'Auto-generated', bg: '#EDE9FE', color: '#7C3AED' },
  'you-install':{ label: 'You install',    bg: '#F5F0E8', color: '#636E72' },
  'we-install': { label: 'We install',     bg: '#ECFDF5', color: '#059669' },
  included:     { label: 'Included',       bg: '#FFF1EB', color: '#FF6B35' },
}

// ─── Legacy compat (remove after Phase 2 UI rewrite) ───────────────
export type FeatureMode = 'diy' | 'self-setup' | 'auto' | 'done'
export const MODE_BADGES: Record<FeatureMode, { label: string; bg: string; color: string }> = {
  diy:         { label: 'Self-Service', bg: '#F0F0F0', color: '#636E72' },
  'self-setup': { label: 'Self-Setup',  bg: '#FFF8E1', color: '#B8860B' },
  auto:        { label: 'Automated',   bg: '#ECFDF5', color: '#059669' },
  done:        { label: 'Done for you', bg: '#EFF6FF', color: '#2563EB' },
}

// ─── Plan Definitions ───────────────────────────────────────────────

export const PLANS: PlanDefinition[] = [
  {
    name: 'LocalBeacon Pro',
    price: AUTOPILOT_MONTHLY_PRICE,
    period: '/month',
    annualPrice: AUTOPILOT_ANNUAL_PRICE,
    annualPeriod: '/year',
    tagline: 'AI keeps your business visible — every week, automatically.',
    features: [
      {
        label: 'Google Business Profile content',
        description: 'Keep your GBP listing active and engaging — we create the content, you copy & post',
        mode: 'auto' as FeatureMode,
        tag: 'automated',
        tag2: 'you-post',
        subItems: [
          'Weekly GBP posts — fresh, seasonal content delivered to your inbox',
          'Review response drafts — AI-written replies for new Google reviews',
        ],
      },
      {
        label: '2 blog posts/month',
        description: 'Locally-optimized articles published automatically on your LocalBeacon page',
        mode: 'auto' as FeatureMode,
        tag: 'automated',
        tag2: 'we-host',
      },
      {
        label: '3 city/service area pages/month',
        description: 'New pages for surrounding cities, then seasonal refreshes to keep them ranking',
        mode: 'auto' as FeatureMode,
        tag: 'automated',
        tag2: 'we-host',
      },
      {
        label: 'Schema markup & llms.txt generation',
        description: 'Structured data that tells AI engines what your business does — we generate, you add to your site',
        mode: 'self-setup' as FeatureMode,
        tag: 'auto-gen',
        tag2: 'you-install',
      },
      {
        label: 'Monthly Intelligence Report (email)',
        description: 'One report, everything you need to know — delivered to your inbox',
        mode: 'auto' as FeatureMode,
        tag: 'automated',
        subItems: [
          'AI Readiness re-scan — how your score changed',
          'Competitor tracking — who\'s gaining, who\'s falling behind',
          'Progress summary — what we published, what\'s working',
          'AI search landscape changes — new updates & what to do',
        ],
      },
    ],
    cta: `Start Pro — ${AUTOPILOT_MONTHLY_PRICE}/mo`,
    ctaAnnual: `Start Pro — ${AUTOPILOT_ANNUAL_PRICE}/yr`,
    href: null,
    highlight: true,
    stripePlan: 'SOLO',
    annualStripePlan: 'SOLO_ANNUAL',
  },
  {
    name: 'Beacon Launch',
    price: LAUNCH_PACKAGE_PRICE,
    period: 'one-time',
    annualPrice: LAUNCH_PACKAGE_ANNUAL_PRICE,
    annualPeriod: 'one-time',
    tagline: 'We set everything up so you\'re optimized from day one.',
    features: [
      { label: '30-minute strategy call', description: 'We learn your business, service areas, and goals', mode: 'done' as FeatureMode },
      { label: 'Google Business Profile audit', description: 'We review and optimize categories, description, and attributes for AI discovery', mode: 'done' as FeatureMode },
      { label: 'Competitor deep-dive report', description: 'Detailed analysis of your top 3 local competitors — their AI presence, gaps, and your opportunities', mode: 'done' as FeatureMode },
      {
        label: 'We install everything on your platform',
        description: 'WordPress, Squarespace, Wix, or custom — you add us as a temporary admin, we handle the rest',
        mode: 'done' as FeatureMode,
        tag: 'we-install',
        subItems: [
          '15–25 custom FAQs — real questions your customers ask, optimized for AI',
          'Schema markup — structured data installed directly on your site',
          'llms.txt — the file AI engines look for, deployed to your domain',
          'All service area pages — every city you serve, built and published on launch day',
        ],
      },
      { label: 'Custom brand voice profile', description: 'We capture your tone, language, and style — Pro uses it for every piece of content', mode: 'done' as FeatureMode },
      { label: 'Before & after AI readiness report', description: 'Baseline scan before setup, rescan after — see exactly what improved', mode: 'done' as FeatureMode },
      {
        label: 'First month of Pro included',
        description: 'Your subscription starts immediately — content publishing begins the week we finish setup',
        mode: 'auto' as FeatureMode,
        tag: 'included',
      },
    ],
    cta: `Get Beacon Launch — ${LAUNCH_PACKAGE_PRICE}`,
    ctaAnnual: `Get Beacon Launch — ${LAUNCH_PACKAGE_ANNUAL_PRICE}`,
    href: null,
    highlight: false,
    addon: true,
    stripePlan: 'DFY',
  },
]

// ─── FAQs ───────────────────────────────────────────────────────────

export const PRICING_FAQS = [
  {
    q: "What if I don't have a Google listing yet?",
    a: "No problem! We'll help you set one up during onboarding. It's free through Google and takes about 5 minutes. LocalBeacon works best with a Google Business Profile, but you can start building content immediately.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes — no contracts, no cancellation fees. Cancel from your dashboard anytime and your subscription ends at the end of the billing period.",
  },
  {
    q: 'Will this work for my type of business?',
    a: "LocalBeacon works for any local service business — plumbers, HVAC technicians, dentists, roofers, lawyers, electricians, landscapers, chiropractors, and more. If people search Google to find businesses like yours, LocalBeacon helps.",
  },
  {
    q: 'How is this different from hiring an SEO agency?',
    a: `An agency charges $800–1,500/month and you wait weeks to see anything happen. LocalBeacon handles your Google posts, builds local pages, and drafts review replies — for ${AUTOPILOT_MONTHLY_PRICE}/month, starting immediately.`,
  },
  {
    q: 'Who writes the content? Will it sound generic?',
    a: "Every piece of content is written specifically about your business, your services, and your local area — not generic templates. You can review and edit everything before it goes live. It mentions your city, your services, and the neighborhoods you actually serve.",
  },
  {
    q: "What's Beacon Launch?",
    a: `It's a one-time ${LAUNCH_PACKAGE_PRICE} setup service (${LAUNCH_PACKAGE_ANNUAL_PRICE} when bundled with annual). We do a 30-minute strategy call, install schema markup, llms.txt, and 15–25 custom FAQs on your website, plus build all your service area pages. Your first month of Pro is included. After that, Pro continues at ${AUTOPILOT_MONTHLY_PRICE}/mo.`,
  },
  {
    q: 'Is there an annual plan?',
    a: `Yes! LocalBeacon Pro is ${AUTOPILOT_ANNUAL_PRICE}/year — that saves you ${AUTOPILOT_ANNUAL_SAVINGS} compared to monthly billing.`,
  },
  {
    q: "What happens when I buy Beacon Launch?",
    a: `After checkout, you'll get an email to book your strategy call. We build everything in 5–7 business days. Your Pro subscription (${AUTOPILOT_MONTHLY_PRICE}/mo) starts automatically after your included first month.`,
  },
]
