"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PLANS, PRICING_FAQS, MODE_BADGES } from "@/lib/plans";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const WARM_WHITE = "#FAFAF7";
const SLATE = "#636E72";

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: WARM_WHITE, color: NAVY }}>
      <SiteNav />

      {/* Header */}
      <section className="px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: NAVY }}>
          More calls for less than <span style={{ color: ORANGE }}>$2/day</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-4" style={{ color: SLATE }}>
          Start with a free scan to see exactly what we&apos;ll fix for you. No contracts, cancel anytime.
        </p>

        {/* Comparison callout */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-6 py-3 text-sm mb-4"
          style={{ background: "white", border: "1px solid #DFE6E9" }}
        >
          <span style={{ color: SLATE }}>Compare:</span>
          <div className="flex items-center gap-1.5">
            <span style={{ color: SLATE }}>SEO Agency</span>
            <span className="line-through" style={{ color: "#B2BEC3" }}>$800–1,500/mo</span>
          </div>
          <span style={{ color: "#DFE6E9" }}>|</span>
          <div className="flex items-center gap-1.5">
            <span style={{ color: SLATE }}>BrightLocal</span>
            <span className="line-through" style={{ color: "#B2BEC3" }}>$39–59/mo</span>
          </div>
          <span style={{ color: "#DFE6E9" }}>|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold" style={{ color: ORANGE }}>LocalBeacon</span>
            <span className="font-bold" style={{ color: ORANGE }}>$49/mo</span>
          </div>
        </div>
      </section>

      {/* Plans — all CTAs route to /check */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isDfy = plan.premium;

            return (
              <Card
                key={plan.name}
                id={isDfy ? "dfy" : undefined}
                className="relative flex flex-col"
                style={{
                  background: isDfy
                    ? "linear-gradient(180deg, #FFFDF5, #FFF8E7)"
                    : "white",
                  border: plan.highlight
                    ? `2px solid ${ORANGE}`
                    : isDfy
                    ? "2px solid #D4A017"
                    : "1px solid #DFE6E9",
                  boxShadow: plan.highlight
                    ? `0 4px 24px ${ORANGE}20`
                    : isDfy
                    ? "0 4px 24px #D4A01720"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className="font-bold px-4 text-white"
                      style={{ background: ORANGE }}
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}
                {isDfy && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className="font-bold px-4 text-white"
                      style={{ background: "linear-gradient(90deg, #B8860B, #D4A017)" }}
                    >
                      White Glove
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6 pt-8 flex-1 flex flex-col">
                  <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: SLATE }}>
                    {plan.name}
                  </p>
                  {isDfy && (
                    <p className="text-xs mt-0.5" style={{ color: SLATE }}>Done-For-You — we handle everything</p>
                  )}
                  <div className="flex items-baseline gap-1 mt-2 mb-1">
                    <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: SLATE }}>{plan.period}</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: SLATE }}>{plan.tagline}</p>

                  {/* Automation count headline */}
                  {(() => {
                    const autoCount = plan.features.filter(f => f.mode === 'auto').length
                    const doneCount = plan.features.filter(f => f.mode === 'done').length
                    const handledCount = autoCount + doneCount
                    if (handledCount === 0) return null
                    return (
                      <div
                        className="rounded-lg px-3 py-2 mb-4 text-center"
                        style={{ background: isDfy ? 'rgba(184,134,11,0.08)' : 'rgba(5,150,105,0.08)' }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: isDfy ? '#92400E' : '#059669' }}
                        >
                          {handledCount} of {plan.features.length} features handled for you
                        </span>
                      </div>
                    )
                  })()}

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((o) => (
                      <li key={o.label} className="flex items-start gap-2 text-sm" style={{ color: "#2D3436" }}>
                        <span
                          className="mt-0.5 shrink-0 font-bold"
                          style={{ color: isDfy ? "#B8860B" : ORANGE }}
                        >
                          ✓
                        </span>
                        <span>
                          {o.label}
                          <span
                            className="inline-block ml-1.5 px-1.5 py-px rounded-full text-[0.6875rem] font-semibold align-middle"
                            style={{ backgroundColor: MODE_BADGES[o.mode].bg, color: MODE_BADGES[o.mode].color }}
                          >
                            {MODE_BADGES[o.mode].label}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/check">
                    <Button
                      className="w-full font-semibold h-12 text-base text-white"
                      style={{
                        background: plan.highlight
                          ? ORANGE
                          : isDfy
                          ? "linear-gradient(90deg, #B8860B, #D4A017)"
                          : NAVY,
                      }}
                    >
                      {plan.name === "Free" ? "Check Your Score Free" : `Start with a Free Scan`}
                    </Button>
                  </Link>
                  {plan.name === "Free" && (
                    <p className="text-xs text-center mt-2" style={{ color: "#B2BEC3" }}>
                      No credit card required
                    </p>
                  )}
                  {isDfy && (
                    <p className="text-xs text-center mt-2" style={{ color: "#B2BEC3" }}>
                      One-time payment, not a subscription
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* What you get section */}
      <section className="px-6 py-16" style={{ background: "white", borderTop: "1px solid #DFE6E9" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ color: NAVY }}>
            Everything included — no hidden fees
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              { emoji: "📝", label: "Weekly Google posts, handled for you" },
              { emoji: "🌐", label: "Local city pages" },
              { emoji: "⭐", label: "Review reply drafts" },
              { emoji: "🤖", label: "AI Readiness scoring" },
              { emoji: "📄", label: "FAQ & blog generation" },
              { emoji: "🏷️", label: "Schema markup generator" },
              { emoji: "📋", label: "llms.txt generator" },
              { emoji: "📱", label: "Works on mobile" },
              { emoji: "🔍", label: "Listing health audit" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: WARM_WHITE }}
              >
                <span className="text-xl">{f.emoji}</span>
                <span className="text-sm" style={{ color: "#2D3436" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20" style={{ background: WARM_WHITE }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: NAVY }}>
            Frequently asked <span style={{ color: ORANGE }}>questions</span>
          </h2>
          <div className="space-y-6">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.q} className="pb-6" style={{ borderBottom: "1px solid #DFE6E9" }}>
                <h3 className="font-semibold text-base mb-2" style={{ color: NAVY }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: SLATE }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16" style={{ background: "white", borderTop: "1px solid #DFE6E9" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>Ready to get more calls?</h2>
          <p className="mb-6" style={{ color: SLATE }}>
            See exactly what&apos;s holding your business back — in 10 seconds.
          </p>
          <Link href="/check">
            <Button
              size="lg"
              className="font-bold text-lg px-10 py-6 text-white"
              style={{ background: ORANGE }}
            >
              Check Your Score — Free
            </Button>
          </Link>
          <p className="mt-4 text-sm" style={{ color: SLATE }}>
            Already have an account?{' '}
            <Link href="/sign-in" className="underline font-semibold" style={{ color: NAVY }}>
              Log in to manage your plan
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
