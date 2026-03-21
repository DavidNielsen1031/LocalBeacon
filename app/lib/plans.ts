/**
 * Single source of truth for LocalBeacon plan definitions.
 * Both the homepage (landing-content.tsx) and /pricing page import from here.
 * If you update plan features, do it HERE — nowhere else.
 */

export interface PlanDefinition {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
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

export const PLANS: PlanDefinition[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'See how visible your business is online — in 10 seconds.',
    features: [
      '1 AI Readiness scan per month (19 signals)',
      '5 Google post drafts per month',
      '3 review response drafts per month',
      'Schema markup preview (read-only)',
    ],
    cta: 'Check Your Score Free',
    href: '/sign-up',
    highlight: false,
    stripePlan: null,
  },
  {
    name: 'Local Autopilot',
    price: '$49',
    period: '/month',
    tagline: 'Your local marketing, handled for you — done weekly.',
    features: [
      'Unlimited AI Readiness scans (19 signals) — track your progress',
      'Weekly Google posts, written and scheduled for you',
      'Review responses, drafted automatically',
      '10 new city/service area pages per month',
      '4 blog posts per month, locally customized',
      'Schema & llms.txt — generated, monitored, alerts if missing',
      '1 competitor comparison',
      'Monthly progress report emailed to you',
      'Up to 3 business locations',
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
    tagline: 'We set up your entire local visibility foundation — you just approve.',
    features: [
      '30-minute live onboarding call — we learn your business',
      '15-25 custom FAQs written for your services & area',
      'Schema markup generated + live installation walkthrough',
      'llms.txt generated + live deployment walkthrough',
      'Full AEO audit with prioritized fix list',
      'Platform-specific guides (WordPress, Squarespace, Webflow, Wix)',
      '1 month of Solo included',
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
    a: "A 30-minute live call where we learn your business, generate your schema markup, llms.txt file, and 15-25 custom FAQs — then walk you through installing everything on your specific platform (WordPress, Squarespace, Webflow, or Wix). You also get a full AEO audit with a prioritized list of fixes, plus 1 month of Solo included so you can keep generating content right away.",
  },
]
