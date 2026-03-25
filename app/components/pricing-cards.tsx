"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PLANS,
  TAG_BADGES,
  AUTOPILOT_MONTHLY_PRICE,
  AUTOPILOT_ANNUAL_PRICE,
  AUTOPILOT_ANNUAL_SAVINGS,
  LAUNCH_PACKAGE_ANNUAL_SAVINGS,
  type PlanDefinition,
  type FeatureTag,
} from "@/lib/plans";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
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
        className="text-sm font-semibold cursor-pointer select-none"
        style={{ color: isAnnual ? SLATE : NAVY }}
        onClick={() => isAnnual && onToggle()}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shrink-0"
        style={{
          width: "44px",
          height: "24px",
          background: isAnnual ? ORANGE : MIST,
        }}
        aria-label="Toggle annual billing"
      >
        <span
          className="absolute bg-white rounded-full shadow-md transition-transform duration-200"
          style={{
            width: "20px",
            height: "20px",
            top: "2px",
            left: "2px",
            transform: isAnnual ? "translateX(20px)" : "translateX(0px)",
          }}
        />
      </button>
      <span
        className="text-sm font-semibold cursor-pointer select-none"
        style={{ color: isAnnual ? NAVY : SLATE }}
        onClick={() => !isAnnual && onToggle()}
      >
        Annual
      </span>
      {isAnnual && (
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap"
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

function LaunchPackageCard({ plan, isAnnual = false }: { plan: PlanDefinition; isAnnual?: boolean }) {
  const setupPrice = isAnnual && plan.annualPrice ? plan.annualPrice : plan.price;
  const bundleTotal = isAnnual ? "$1,298" : null; // $399 setup + $899 annual
  const ctaText = isAnnual && plan.ctaAnnual ? plan.ctaAnnual : plan.cta;

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
        {isAnnual ? (
          <>
            <div className="flex items-baseline gap-1 mt-2 mb-1">
              <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
                {bundleTotal}
              </span>
              <span className="text-sm" style={{ color: SLATE }}>
                /first year
              </span>
            </div>
            <p className="text-xs mb-2" style={{ color: "#B8860B" }}>
              {setupPrice} setup + {AUTOPILOT_ANNUAL_PRICE} annual Pro — save {LAUNCH_PACKAGE_ANNUAL_SAVINGS} on setup
            </p>
          </>
        ) : (
          <div className="flex items-baseline gap-1 mt-2 mb-1">
            <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
              {setupPrice}
            </span>
            <span className="text-sm" style={{ color: SLATE }}>
              one-time
            </span>
          </div>
        )}
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
              { step: "3", text: `Pro starts — ${AUTOPILOT_MONTHLY_PRICE}/mo after your included first month` },
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

        <Link href={isAnnual ? "/check?plan=dfy_annual" : "/check?plan=dfy"}>
          <Button
            className="w-full font-semibold h-12 text-base text-white"
            style={{ background: `linear-gradient(90deg, #B8860B, ${GOLD})` }}
          >
            {ctaText}
          </Button>
        </Link>
        <p className="text-xs text-center mt-2" style={{ color: "#B2BEC3" }}>
          One-time payment — includes first month of Pro
        </p>
      </CardContent>
    </Card>
  );
}

/**
 * Full pricing section with free banner, billing toggle, and two cards.
 * Used on both /pricing and the homepage.
 */
export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const proPlan = PLANS.find((p) => p.name === "LocalBeacon Pro")!;
  const launchPlan = PLANS.find((p) => p.name === "Beacon Launch")!;

  return (
    <>
      {/* Billing toggle */}
      <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />

      {/* Two-card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AutopilotCard plan={proPlan} isAnnual={isAnnual} />
        <LaunchPackageCard plan={launchPlan} isAnnual={isAnnual} />
      </div>
    </>
  );
}

// Re-export individual pieces for the pricing page to use directly
export { TagBadge, FeatureItem, BillingToggle, AutopilotCard, LaunchPackageCard };
