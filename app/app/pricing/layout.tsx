import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — LocalBeacon.ai | Local Marketing from $49/mo',
  description: 'Compare LocalBeacon plans: Free AI readiness scan, $49/mo autopilot local marketing, or $499 done-for-you. No contracts, cancel anytime.',
  openGraph: {
    title: 'Pricing — LocalBeacon.ai | Local Marketing from $49/mo',
    description: 'Compare LocalBeacon plans: Free AI readiness scan, $49/mo autopilot local marketing, or $499 done-for-you.',
    url: 'https://localbeacon.ai/pricing',
    siteName: 'LocalBeacon.ai',
    type: 'website',
  },
  alternates: { canonical: 'https://localbeacon.ai/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
