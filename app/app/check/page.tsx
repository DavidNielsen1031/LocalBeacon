import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckerForm } from './checker-form'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Free AI Readiness Checker — How Visible Is Your Business to ChatGPT & Google AI?',
  description: 'Scan any website in 10 seconds. See your AI Readiness Score — how well AI search engines like ChatGPT, Google AI, and Perplexity can find and recommend your business.',
  openGraph: {
    title: 'Free AI Readiness Checker — LocalBeacon.ai',
    description: 'How visible is your business to AI search engines? Find out in 10 seconds.',
    url: 'https://localbeacon.ai/check',
    siteName: 'LocalBeacon.ai',
    type: 'website',
  },
}

export default function CheckPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold mb-6">
          FREE TOOL — NO SIGNUP REQUIRED
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight mb-4 font-[var(--font-fraunces)]">
          Can ChatGPT and Google AI <br className="hidden md:block" />
          find your business?
        </h1>
        <p className="text-lg text-[#1B2A4A]/60 max-w-xl mx-auto mb-10">
          When people ask ChatGPT, Google AI, or Perplexity for a recommendation,
          will they mention you? Find out in 10 seconds.
        </p>
      </section>

      {/* Checker Form */}
      <Suspense fallback={<div className="max-w-2xl mx-auto px-6 pb-8"><div className="bg-white rounded-2xl shadow-lg border border-black/5 p-6 animate-pulse h-20" /></div>}>
        <CheckerForm />
      </Suspense>

      {/* How It Works */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#1B2A4A] text-center mb-10 font-[var(--font-fraunces)]">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Enter your website', desc: 'Paste any URL — yours or a competitor\'s.' },
            { step: '2', title: 'We scan 19 signals', desc: 'From AI discovery files to review content, we check what matters.' },
            { step: '3', title: 'Get your score', desc: 'See your grade instantly. Get the full breakdown via email.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-[#1B2A4A] mb-1">{item.title}</h3>
              <p className="text-sm text-[#1B2A4A]/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Check */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-[#1B2A4A] text-center mb-10 font-[var(--font-fraunces)]">
            What we check
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📄', label: 'AI discovery file (llms.txt)' },
              { icon: '🤖', label: 'AI crawler access' },
              { icon: '🏷️', label: 'Structured data / schema' },
              { icon: '❓', label: 'FAQ content' },
              { icon: '🔒', label: 'HTTPS security' },
              { icon: '📱', label: 'Mobile-friendliness' },
              { icon: '🗺️', label: 'Sitemap presence' },
              { icon: '📐', label: 'Heading structure' },
              { icon: '🏙️', label: 'City-specific pages' },
              { icon: '📅', label: 'Content freshness' },
              { icon: '⭐', label: 'Reviews & testimonials' },
              { icon: '🎯', label: 'Answer-first content' },
              { icon: '📍', label: 'Business info consistency' },
              { icon: '🖼️', label: 'Social preview tags' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAF7]">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-[#1B2A4A]/80">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-3 font-[var(--font-fraunces)]">
          Want to improve your score?
        </h2>
        <p className="text-[#1B2A4A]/50 mb-6 max-w-md mx-auto">
          LocalBeacon handles your local marketing — weekly Google posts, city pages, review replies, and more. All on autopilot.
        </p>
        <a
          href="/sign-up"
          className="inline-block px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors"
        >
          Start Free →
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
