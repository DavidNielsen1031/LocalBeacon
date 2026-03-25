import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — LocalBeacon.ai | Local Marketing from $99/mo',
  description: 'Compare LocalBeacon plans: Free AI readiness scan, $99/mo autopilot local marketing, or $499 done-for-you setup. No contracts, cancel anytime.',
  openGraph: {
    title: 'Pricing — LocalBeacon.ai | Local Marketing from $99/mo',
    description: 'Compare LocalBeacon plans: Free AI readiness scan, $99/mo autopilot local marketing, or $499 done-for-you setup.',
    url: 'https://localbeacon.ai/pricing',
    siteName: 'LocalBeacon.ai',
    type: 'website',
  },
  alternates: { canonical: 'https://localbeacon.ai/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
