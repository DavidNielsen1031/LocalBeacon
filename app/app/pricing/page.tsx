"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  PLANS,
  PRICING_FAQS,
  AUTOPILOT_MONTHLY_PRICE,
} from "@/lib/plans";
import { BillingToggle, AutopilotCard, LaunchPackageCard } from "@/components/pricing-cards";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const WARM_WHITE = "#FAFAF7";
const SLATE = "#636E72";
const MIST = "#DFE6E9";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const proPlan = PLANS.find((p) => p.name === "LocalBeacon Pro")!;
  const launchPlan = PLANS.find((p) => p.name === "Beacon Launch")!;

  return (
    <div className="min-h-screen" style={{ background: WARM_WHITE, color: NAVY }}>
      <SiteNav />

      {/* Header */}
      <section className="px-6 pt-20 pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: NAVY }}>
          Simple pricing. <span style={{ color: ORANGE }}>Real results.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-6" style={{ color: SLATE }}>
          Get found by more local customers — in AI search, Google, and everywhere that matters.
        </p>

        {/* Comparison callout */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-6 py-3 text-sm mb-8"
          style={{ background: "white", border: `1px solid ${MIST}` }}
        >
          <span style={{ color: SLATE }}>Compare:</span>
          <div className="flex items-center gap-1.5">
            <span style={{ color: SLATE }}>SEO Agency</span>
            <span className="line-through" style={{ color: "#B2BEC3" }}>
              $800–1,500/mo
            </span>
          </div>
          <span style={{ color: MIST }}>|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold" style={{ color: ORANGE }}>
              LocalBeacon
            </span>
            <span className="font-bold" style={{ color: ORANGE }}>
              {AUTOPILOT_MONTHLY_PRICE}/mo
            </span>
          </div>
        </div>
      </section>

      {/* Free scan banner */}
      <section className="px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "white", border: `1px solid ${MIST}` }}
          >
            <div>
              <p className="font-bold text-base" style={{ color: NAVY }}>
                🔍 Free AI Readiness Scan
              </p>
              <p className="text-sm" style={{ color: SLATE }}>
                See how your business appears in ChatGPT, Google AI, and Perplexity — no account needed.
              </p>
            </div>
            <Link href="/check">
              <Button
                className="font-semibold text-sm px-6 shrink-0"
                style={{ background: NAVY, color: "white" }}
              >
                Check Your Score — Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Billing toggle */}
      <section className="px-6 pt-4">
        <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />
      </section>

      {/* Plans — two cards */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <AutopilotCard plan={proPlan} isAnnual={isAnnual} />
          <LaunchPackageCard plan={launchPlan} isAnnual={isAnnual} />
        </div>
      </section>

      {/* Retention value banner */}
      <section className="px-6 py-12" style={{ background: "white", borderTop: `1px solid ${MIST}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
            Why businesses stay on Pro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {[
              {
                emoji: "📈",
                title: "AI search evolves monthly",
                desc: "We track every update from Google AI, ChatGPT, and Perplexity — and adjust your strategy automatically.",
              },
              {
                emoji: "📝",
                title: "Fresh content, every week",
                desc: "Google rewards businesses that post regularly. We never let your listing go stale.",
              },
              {
                emoji: "🏆",
                title: "Competitors don't stop",
                desc: "Your monthly report shows exactly who's gaining on you — and what we're doing about it.",
              },
            ].map((item) => (
              <div key={item.title} className="text-left p-4 rounded-xl" style={{ background: WARM_WHITE }}>
                <span className="text-2xl">{item.emoji}</span>
                <p className="font-bold text-sm mt-2 mb-1" style={{ color: NAVY }}>
                  {item.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: SLATE }}>
                  {item.desc}
                </p>
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
              <div key={faq.q} className="pb-6" style={{ borderBottom: `1px solid ${MIST}` }}>
                <h3 className="font-semibold text-base mb-2" style={{ color: NAVY }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: SLATE }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16" style={{ background: "white", borderTop: `1px solid ${MIST}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
            Ready to get more calls?
          </h2>
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
            Already have an account?{" "}
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
