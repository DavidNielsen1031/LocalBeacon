/**
 * Single source of truth for LocalBeacon plan definitions.
 * Both the homepage (landing-content.tsx) and /pricing page import from here.
 * If you update plan features, do it HERE — nowhere else.
 */

export type FeatureMode = 'diy' | 'self-setup' | 'auto' | 'done'

export interface PlanFeature {
  label: string
  mode: FeatureMode
}

export interface PlanDefinition {
  name: string
  price: string
  period: string
  tagline: string
  features: PlanFeature[]
  cta: string
  /** If set, the CTA links here (free plan). If null, triggers checkout. */
  href: string | null
  /** Orange border + "Most Popular" badge */
  highlight: boolean
  /** Gold gradient + "White Glove" badge */
  premium?: boolean
  /** Stripe plan key for checkout. null = no checkout (free plan). */
  stripePlan: 'SOLO' | 'DFY' | null
}

/** Badge config for each feature mode */
export const MODE_BADGES: Record<FeatureMode, { label: string; bg: string; color: string }> = {
  diy:         { label: 'Self-Service', bg: '#F0F0F0', color: '#636E72' },
  'self-setup': { label: 'Self-Setup',  bg: '#FFF8E1', color: '#B8860B' },
  auto:        { label: 'Automated',   bg: '#ECFDF5', color: '#059669' },
  done:        { label: 'Done for you', bg: '#EFF6FF', color: '#2563EB' },
}

export const PLANS: PlanDefinition[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'See how visible your business is online — in 10 seconds.',
    features: [
      { label: '1 AI Readiness scan per month (all 21 signals)', mode: 'diy' },
      { label: '5 Google post drafts per month', mode: 'diy' },
      { label: '3 review response drafts per month', mode: 'diy' },
      { label: 'Schema markup preview (read-only)', mode: 'diy' },
    ],
    cta: 'Check Your Score Free',
    href: '/check',
    highlight: false,
    stripePlan: null,
  },
  {
    name: 'Local Autopilot',
    price: '$49',
    period: '/month',
    tagline: 'Your local marketing, handled — you just approve.',
    features: [
      { label: 'Unlimited AI Readiness scans (21 signals)', mode: 'auto' },
      { label: 'Weekly Google posts, written and scheduled', mode: 'auto' },
      { label: 'Review responses, drafted automatically', mode: 'self-setup' },
      { label: '10 new city pages per month', mode: 'auto' },
      { label: '4 blog posts per month, locally customized', mode: 'auto' },
      { label: 'Schema & llms.txt — generated and monitored', mode: 'self-setup' },
      { label: 'AI search changes tracked — your listing stays current', mode: 'auto' },
      { label: '1 competitor comparison', mode: 'self-setup' },
      { label: 'Monthly progress report', mode: 'auto' },
      { label: 'Up to 3 business locations', mode: 'self-setup' },
    ],
    cta: 'Start Local Autopilot — $49/mo',
    href: null,
    highlight: true,
    stripePlan: 'SOLO',
  },
  {
    name: 'DFY Setup',
    price: '$499',
    period: 'one-time',
    tagline: 'We build your local visibility foundation — then Autopilot keeps it running.',
    features: [
      { label: '30-minute live onboarding call', mode: 'done' },
      { label: '15-25 custom FAQs written for your business', mode: 'done' },
      { label: 'Schema markup installed on your site', mode: 'done' },
      { label: 'llms.txt deployed to your site', mode: 'done' },
      { label: 'Full AEO audit with prioritized fix list', mode: 'done' },
      { label: 'Platform-specific install (WordPress, Squarespace, Webflow, Wix)', mode: 'done' },
      { label: '1 month of Local Autopilot included', mode: 'auto' },
    ],
    cta: 'Get DFY Setup — $499',
    href: null,
    highlight: false,
    premium: true,
    stripePlan: 'DFY',
  },
]

/** Pricing page FAQs — also single source of truth */
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
    a: "An agency charges $800-1,500/month and you wait weeks to see anything happen. LocalBeacon handles your Google posts, builds local pages, and drafts review replies — for $49/month. Your first content is ready within minutes of signing up.",
  },
  {
    q: 'Who writes the content? Will it sound generic?',
    a: "Every piece of content is written specifically about your business, your services, and your local area — not generic templates. You can review and edit everything before it goes live. It mentions your city, your services, and the neighborhoods you actually serve.",
  },
  {
    q: "What does 'Done-For-You' mean exactly?",
    a: "DFY is a one-time setup engagement, not ongoing management. We do a 30-minute live call, build your schema markup, llms.txt, and 15-25 custom FAQs, then walk you through installing everything on your platform. You also get a full AEO audit + 1 month of Local Autopilot. After setup, you can maintain things yourself (Free) or keep Local Autopilot running at $49/mo — your call.",
  },
]
