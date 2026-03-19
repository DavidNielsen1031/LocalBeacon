"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { posthog } from "@/lib/posthog";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const WARM_WHITE = "#FAFAF7";
const SLATE = "#636E72";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "See how visible your business is to AI — in 10 seconds.",
    outcomes: [
      "1 AI Readiness scan per month",
      "5 Google post drafts per month",
      "3 review response drafts per month",
      "1 business location",
      "Schema & llms.txt preview",
    ],
    cta: "Check Your Score Free",
    href: "/sign-up",
    highlight: false,
    plan: null,
  },
  {
    name: "Solo",
    price: "$49",
    period: "/month",
    tagline: "AI-written content for your local business, every week.",
    outcomes: [
      "Unlimited AI Readiness scans — track your progress",
      "Unlimited Google post drafts — fresh content every week",
      "Unlimited review response drafts",
      "10 new city/service area pages per month",
      "4 blog posts per month",
      "Schema & llms.txt generator — create, monitor, alerts if missing",
      "1 competitor comparison",
      "Monthly progress report emailed to you",
      "Up to 3 business locations",
    ],
    cta: "Start Solo — $49/mo",
    href: null,
    highlight: true,
    plan: "SOLO" as const,
  },
  {
    name: "DFY Setup",
    price: "$499",
    period: "one-time",
    tagline: "We set up your entire AI visibility foundation — you just approve.",
    outcomes: [
      "30-minute live onboarding call — we learn your business",
      "15-25 custom FAQs written for your services & area",
      "Schema markup generated + live installation walkthrough",
      "llms.txt generated + live deployment walkthrough",
      "Full AEO audit with prioritized fix list",
      "Platform-specific guides (WordPress, Squarespace, Webflow, Wix)",
      "1 month of Solo included",
    ],
    cta: "Get DFY Setup — $499",
    href: null,
    highlight: false,
    premium: true,
    plan: "DFY" as const,
  },
  {
    name: "Managed",
    price: "$99",
    period: "/month",
    tagline: "Ongoing AI visibility management — we handle the content, you run your business.",
    outcomes: [
      "Everything in Solo — unlimited",
      "Unlimited blog posts per month",
      "Unlimited city/service pages",
      "Unlimited business locations",
      "Schema & llms.txt monitored — regenerated quarterly, alerts if removed",
      "5 competitor comparisons",
      "Monthly progress report with score trends",
      "Priority email support (24-hour response)",
    ],
    cta: "Start Managed — $99/mo",
    href: null,
    highlight: false,
    managed: true,
    plan: "AGENCY" as const,
  },
];

const faqs = [
  {
    q: "What if I don't have a Google listing yet?",
    a: "No problem! We'll help you set one up during onboarding. It's free through Google and takes about 5 minutes. LocalBeacon works best with a Google Business Profile, but you can start building content immediately.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no contracts, no cancellation fees. Cancel from your dashboard anytime and your subscription ends at the end of the billing period.",
  },
  {
    q: "Will this work for my type of business?",
    a: "LocalBeacon works for any local service business — plumbers, HVAC technicians, dentists, roofers, lawyers, electricians, landscapers, chiropractors, and more. If people search Google to find businesses like yours, LocalBeacon helps.",
  },
  {
    q: "How is this different from hiring an SEO agency?",
    a: "An agency charges $800-1,500/month and you wait weeks to see anything happen. LocalBeacon writes your Google posts, builds local pages, and drafts review replies — for $49/month. Your first content is generated within minutes of signing up.",
  },
  {
    q: "Who writes the content? Will it sound generic?",
    a: "Every piece of content is written specifically about your business, your services, and your local area — not generic templates. You can review and edit everything before it goes live. Most customers find it sounds better than what they'd write themselves.",
  },
  {
    q: "What does 'Done-For-You Setup' include?",
    a: "A 30-minute live call where we learn your business, generate your schema markup, llms.txt file, and 15-25 custom FAQs — then walk you through installing everything on your specific platform (WordPress, Squarespace, Webflow, or Wix). You also get a full AEO audit with a prioritized list of fixes, plus 1 month of Solo included so you can keep generating content right away.",
  },
  {
    q: "Do I need DFY Setup before Managed?",
    a: "Not required, but recommended. DFY Setup gets your foundation in place (schema, llms.txt, FAQs) in one call. Managed then keeps everything running — unlimited content, quarterly refreshes, monitoring, and priority support. You can also start with Solo and upgrade to Managed anytime.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [showDfyConfirm, setShowDfyConfirm] = useState(false);

  const handleCheckout = async (plan: "SOLO" | "AGENCY" | "DFY") => {
    // Analytics: checkout clicked
    try { posthog.capture('checkout_clicked', { plan }) } catch {}
    setLoading(plan);
    try {
      const mode = plan === "DFY" ? "payment" : "subscription";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === "Unauthorized") {
        window.location.href = "/sign-up";
      } else {
        console.error("Checkout error:", data.error);
        window.location.href = "/sign-up";
      }
    } catch {
      window.location.href = "/sign-up";
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: WARM_WHITE, color: NAVY }}>
      <SiteNav />

      {/* Header */}
      <section className="px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: NAVY }}>
          More calls for less than <span style={{ color: ORANGE }}>$2/day</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: SLATE }}>
          Start free. Upgrade when you see the results. No contracts, cancel anytime.
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

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isDfy = (plan as { premium?: boolean }).premium;
            const isManaged = (plan as { managed?: boolean }).managed;

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
                {isManaged && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className="font-medium px-4"
                      style={{ background: "#F0EDE8", color: SLATE, border: "1px solid #DFE6E9" }}
                    >
                      After DFY setup
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8 flex-1 flex flex-col">
                  <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: SLATE }}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mt-2 mb-1">
                    <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: SLATE }}>{plan.period}</span>
                  </div>
                  <p className="text-sm mb-6" style={{ color: SLATE }}>{plan.tagline}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm" style={{ color: "#2D3436" }}>
                        <span
                          className="mt-0.5 shrink-0 font-bold"
                          style={{ color: isDfy ? "#B8860B" : ORANGE }}
                        >
                          ✓
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>

                  {plan.name === "Free" ? (
                    <Link href={plan.href!}>
                      <Button
                        className="w-full font-semibold h-12 text-base"
                        variant="outline"
                        style={{ border: `1px solid #DFE6E9`, color: NAVY }}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        if (!plan.plan) return;
                        if ((plan as { premium?: boolean }).premium) {
                          setShowDfyConfirm(true);
                        } else {
                          handleCheckout(plan.plan);
                        }
                      }}
                      disabled={loading !== null}
                      className="w-full font-semibold h-12 text-base text-white"
                      style={{
                        background: plan.highlight
                          ? ORANGE
                          : isDfy
                          ? "linear-gradient(90deg, #B8860B, #D4A017)"
                          : NAVY,
                      }}
                    >
                      {loading === plan.plan ? "Redirecting to checkout..." : plan.cta}
                    </Button>
                  )}
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
              { emoji: "📝", label: "AI-written Google posts" },
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
            {faqs.map((faq) => (
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
            Connect your Google listing and see your first posts in under 2 minutes.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="font-bold text-lg px-10 py-6 text-white"
              style={{ background: ORANGE }}
            >
              Connect Your Google Listing — Free
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* DFY Confirmation Dialog */}
      <Dialog open={showDfyConfirm} onOpenChange={setShowDfyConfirm}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1B2A4A] text-xl font-bold">Confirm DFY Setup Purchase</DialogTitle>
            <DialogDescription className="text-[#636E72] mt-2">
              You&apos;re about to purchase the Done-For-You Setup for $499 (one-time payment).
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-semibold text-[#1B2A4A] mb-3">What&apos;s included:</p>
            <ul className="space-y-2">
              {[
                "Schema markup generator — copy & paste ready",
                "AI Discovery File generator — ready to deploy",
                "15-25 localized FAQs written for your business",
                "Platform-specific implementation guide",
                "Full AEO audit with prioritized fixes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#2D3436]">
                  <span className="text-[#FF6B35] font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDfyConfirm(false)}
              className="flex-1 border-[#DFE6E9] text-[#636E72]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowDfyConfirm(false);
                handleCheckout("DFY");
              }}
              className="flex-1 font-semibold text-white"
              style={{ background: ORANGE }}
            >
              Continue to Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
