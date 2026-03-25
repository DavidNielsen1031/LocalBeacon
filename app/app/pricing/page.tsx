"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  PLANS,
  PRICING_FAQS,
  TAG_BADGES,
  AUTOPILOT_MONTHLY_PRICE,
  AUTOPILOT_ANNUAL_PRICE,
  AUTOPILOT_ANNUAL_SAVINGS,
  type PlanDefinition,
  type FeatureTag,
} from "@/lib/plans";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const WARM_WHITE = "#FAFAF7";
const SLATE = "#636E72";
const MIST = "#DFE6E9";
const GOLD = "#D4A017";

function TagBadge({ tag }: { tag: FeatureTag }) {
  const badge = TAG_BADGES[tag];
  return (
    <span
      className="inline-block ml-1.5 px-1.5 py-px rounded-full text-[0.6875rem] font-semibold align-middle whitespace-nowrap"
      style={{ backgroundColor: badge.bg, color: badge.color }}
    >
      {badge.label}
    </span>
  );
}

function FeatureItem({
  feature,
  accentColor,
}: {
  feature: { label: string; description?: string; tag?: FeatureTag; tag2?: FeatureTag; subItems?: string[] };
  accentColor: string;
}) {
  return (
    <li className="text-sm" style={{ color: "#2D3436" }}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 font-bold" style={{ color: accentColor }}>
          ✓
        </span>
        <div className="flex-1">
          <span className="font-medium">{feature.label}</span>
          {feature.tag && <TagBadge tag={feature.tag} />}
          {feature.tag2 && <TagBadge tag={feature.tag2} />}
          {feature.description && (
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: SLATE }}>
              {feature.description}
            </p>
          )}
          {feature.subItems && feature.subItems.length > 0 && (
            <ul className="mt-1.5 space-y-1 pl-1">
              {feature.subItems.map((sub) => (
                <li key={sub} className="flex items-start gap-1.5 text-xs" style={{ color: SLATE }}>
                  <span className="mt-0.5 shrink-0" style={{ color: accentColor }}>
                    ›
                  </span>
                  {sub}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

function BillingToggle({
  isAnnual,
  onToggle,
}: {
  isAnnual: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span
        className="text-sm font-semibold cursor-pointer"
        style={{ color: isAnnual ? SLATE : NAVY }}
        onClick={() => isAnnual && onToggle()}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: isAnnual ? ORANGE : MIST,
        }}
        aria-label="Toggle annual billing"
      >
        <span
          className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200"
          style={{ transform: isAnnual ? "translateX(30px)" : "translateX(2px)" }}
        />
      </button>
      <span
        className="text-sm font-semibold cursor-pointer"
        style={{ color: isAnnual ? NAVY : SLATE }}
        onClick={() => !isAnnual && onToggle()}
      >
        Annual
      </span>
      {isAnnual && (
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: "#FFF1EB", color: ORANGE }}
        >
          Save {AUTOPILOT_ANNUAL_SAVINGS}
        </span>
      )}
    </div>
  );
}

function AutopilotCard({
  plan,
  isAnnual,
}: {
  plan: PlanDefinition;
  isAnnual: boolean;
}) {
  const displayPrice = isAnnual ? plan.annualPrice : plan.price;
  const displayPeriod = isAnnual ? plan.annualPeriod : plan.period;
  const ctaText = isAnnual ? plan.ctaAnnual : plan.cta;
  const checkoutPlan = isAnnual ? "solo_annual" : "solo";

  return (
    <Card
      className="relative flex flex-col"
      style={{
        background: "white",
        border: `2px solid ${ORANGE}`,
        boxShadow: `0 4px 24px ${ORANGE}20`,
      }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge className="font-bold px-4 text-white" style={{ background: ORANGE }}>
          Most Popular
        </Badge>
      </div>

      <CardContent className="p-6 pt-8 flex-1 flex flex-col">
        <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: SLATE }}>
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1 mt-2 mb-1">
          <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
            {displayPrice}
          </span>
          <span className="text-sm" style={{ color: SLATE }}>
            {displayPeriod}
          </span>
        </div>
        {isAnnual && (
          <p className="text-xs mb-2" style={{ color: ORANGE }}>
            {AUTOPILOT_ANNUAL_SAVINGS} savings vs monthly
          </p>
        )}
        <p className="text-sm mb-5" style={{ color: SLATE }}>
          {plan.tagline}
        </p>

        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feature) => (
            <FeatureItem key={feature.label} feature={feature} accentColor={ORANGE} />
          ))}
        </ul>

        <Link href={`/check?plan=${checkoutPlan}`}>
          <Button
            className="w-full font-semibold h-12 text-base text-white"
            style={{ background: ORANGE }}
          >
            {ctaText || "Start with a Free Scan"}
          </Button>
        </Link>
        <p className="text-xs text-center mt-2" style={{ color: "#B2BEC3" }}>
          No contracts — cancel anytime
        </p>
      </CardContent>
    </Card>
  );
}

function LaunchPackageCard({ plan }: { plan: PlanDefinition }) {
  return (
    <Card
      id="dfy"
      className="relative flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FFFDF5, #FFF8E7)",
        border: `2px solid ${GOLD}`,
        boxShadow: `0 4px 24px ${GOLD}20`,
      }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge
          className="font-bold px-4 text-white"
          style={{ background: `linear-gradient(90deg, #B8860B, ${GOLD})` }}
        >
          White Glove
        </Badge>
      </div>

      <CardContent className="p-6 pt-8 flex-1 flex flex-col">
        <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: SLATE }}>
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1 mt-2 mb-1">
          <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
            {plan.price}
          </span>
          <span className="text-sm" style={{ color: SLATE }}>
            {plan.period}
          </span>
        </div>
        <p className="text-sm mb-5" style={{ color: SLATE }}>
          {plan.tagline}
        </p>

        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feature) => (
            <FeatureItem key={feature.label} feature={feature} accentColor="#B8860B" />
          ))}
        </ul>

        {/* Timeline visual */}
        <div
          className="rounded-lg p-4 mb-4"
          style={{ background: "rgba(184,134,11,0.06)", border: `1px solid rgba(184,134,11,0.15)` }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#92400E" }}>
            How it works:
          </p>
          <div className="space-y-2">
            {[
              { step: "1", text: "Purchase → book your strategy call" },
              { step: "2", text: "We build everything (5–7 business days)" },
              { step: "3", text: `Autopilot starts — ${AUTOPILOT_MONTHLY_PRICE}/mo after your included first month` },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-2 text-xs" style={{ color: "#2D3436" }}>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: GOLD }}
                >
                  {s.step}
                </span>
                {s.text}
              </div>
            ))}
          </div>
        </div>

        <Link href="/check?plan=dfy">
          <Button
            className="w-full font-semibold h-12 text-base text-white"
            style={{ background: `linear-gradient(90deg, #B8860B, ${GOLD})` }}
          >
            {plan.cta}
          </Button>
        </Link>
        <p className="text-xs text-center mt-2" style={{ color: "#B2BEC3" }}>
          One-time payment — includes first month of Autopilot
        </p>
      </CardContent>
    </Card>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const freePlan = PLANS.find((p) => p.name === "Free")!;
  const autopilotPlan = PLANS.find((p) => p.name === "Autopilot")!;
  const launchPlan = PLANS.find((p) => p.name === "Launch Package")!;

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
                {freePlan.features[0]?.description || "See how your business appears in AI search — no account needed."}
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
          <AutopilotCard plan={autopilotPlan} isAnnual={isAnnual} />
          <LaunchPackageCard plan={launchPlan} />
        </div>
      </section>

      {/* Retention value banner */}
      <section className="px-6 py-12" style={{ background: "white", borderTop: `1px solid ${MIST}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
            Why businesses stay on Autopilot
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
