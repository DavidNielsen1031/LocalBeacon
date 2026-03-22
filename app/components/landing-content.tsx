"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Search,
  Bot,
  Star,
  BarChart3,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Phone,
  FileText,
  ThumbsUp,
  ArrowRight,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-shared";
import { CATEGORY_LABELS } from "@/lib/blog-shared";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { PLANS, PRICING_FAQS, MODE_BADGES } from "@/lib/plans";

// ─── Data ────────────────────────────────────────────────────────────────────

const outcomes = [
  {
    Icon: MapPin,
    title: "Stop losing jobs to competitors who post more",
    description:
      "Weekly posts keep your listing fresh and active. An active listing signals to Google that your business is open and engaged.",
  },
  {
    Icon: Search,
    title: "Get found in cities you serve but don't rank for",
    description:
      "We build a local page for each neighborhood and city. More pages targeting local keywords means more chances to appear in search results.",
  },
  {
    Icon: Bot,
    title: "Be the business Siri and ChatGPT recommend",
    description:
      "We optimize your content so AI assistants like ChatGPT, Perplexity, and Google AI are more likely to recommend your business.",
  },
  {
    Icon: Star,
    title: "Stop scaring off customers with unanswered reviews",
    description:
      "Unanswered reviews scare off customers. We draft professional replies you can post — keeping your reputation strong.",
  },
  {
    Icon: BarChart3,
    title: "Know exactly what's bringing in calls",
    description:
      "See exactly how visible your business is to AI search engines with a 15-point audit and actionable recommendations.",
  },
  {
    Icon: TrendingUp,
    title: "Monthly Progress Reports",
    description:
      "See your score climb. Monthly re-scans track your improvement and show exactly what changed.",
  },
];

const withoutVsWith = {
  without: [
    "You forget to post for weeks — your listing goes stale",
    "Competitors show up above you in search results",
    "Bad reviews sit unanswered — scaring away new customers",
    "You have no idea how visible you are to AI search engines",
    "You spend hours on marketing instead of running your business",
  ],
  with: [
    "Fresh posts are written for you every week — ready to publish",
    "Local pages put you in search results across every city you serve",
    "Every review gets a professional reply drafted for you",
    "AI Readiness score shows exactly where you stand",
    "You run your business. We write the marketing.",
  ],
};

// Plans imported from lib/plans.ts — single source of truth
const plans = PLANS;

const faqs = [
  {
    q: "What if I don't have a Google listing yet?",
    a: "We'll help you create one during setup. It's free through Google and takes about 5 minutes.",
  },
  {
    q: "Will this actually get me more phone calls?",
    a: "Businesses that post weekly and reply to reviews rank higher in local search. Higher rank means more calls. The monthly report shows you the numbers.",
  },
  {
    q: "Who writes the content? Will it sound like a robot?",
    a: "AI writes the first draft using your business details, services, and actual city names. It reads like a local wrote it, not a template. You can edit anything before it goes live.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no commitments. Cancel anytime from your dashboard.",
  },
  {
    q: "I'm not tech-savvy. Is this complicated?",
    a: "Connect your Google account, confirm your business info, done. Most people finish in under 2 minutes.",
  },
  {
    q: "How is this different from hiring an SEO agency?",
    a: "An agency charges $800-1,500/month and you wait weeks for results. LocalBeacon writes your Google posts, builds local pages, and drafts review replies — for $49/month, starting immediately.",
  },
  {
    q: "Will AI assistants like ChatGPT recommend my business?",
    a: "LocalBeacon optimizes your content so AI search engines can find and cite your business. We generate FAQ pages, AI discovery files, and structured data that ChatGPT, Perplexity, Claude, and Google AI use when people search for local services.",
  },
  {
    q: "What are city pages and why do I need them?",
    a: "City pages are dedicated pages on your website for each area you serve — like 'Plumbing Services in Apple Valley, MN.' They help both Google and AI assistants recommend you when someone searches for services in that specific city.",
  },
];

const steps = [
  {
    num: "1",
    Icon: Phone,
    title: "Connect your Google listing",
    desc: "Link your Google Business Profile in under 2 minutes. We pull in your info automatically.",
  },
  {
    num: "2",
    Icon: FileText,
    title: "We write your content",
    desc: "LocalBeacon writes posts, city pages, and review replies — tailored to your business and location.",
  },
  {
    num: "3",
    Icon: ThumbsUp,
    title: "Review, post, grow",
    desc: "Review what we wrote, post it to Google, and watch your visibility grow. Auto-publishing coming soon.",
  },
];

// ─── Styles (inline for isolation — Tailwind v4 inline is fine) ──────────────

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const CREAM = "#FFF8F0";
const WARM_WHITE = "#FAFAF7";
const CHARCOAL = "#2D3436";
const SLATE = "#636E72";
const MIST = "#DFE6E9";

// ─── Sub-components ───────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ borderBottom: `1px solid ${MIST}` }}
      className="py-5"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left gap-4 group transition-colors duration-150"
        aria-expanded={open}
      >
        <span
          style={{ color: NAVY, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5" }}
        >
          {q}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: ORANGE,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p
          style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: "1.65", paddingTop: "12px" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LandingPage({ latestPosts = [] }: { latestPosts?: BlogPostMeta[] }) {
  return (
    <div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* ── Sticky Nav (shared component with mobile support) ── */}
      <SiteNav />

      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: WARM_WHITE,
          padding: "80px 24px 96px",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto" }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Left: text */}
          <div className="flex-1 lg:max-w-[52%]">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: `${ORANGE}15`,
                border: `1px solid ${ORANGE}30`,
                borderRadius: "9999px",
                padding: "6px 14px",
                marginBottom: "24px",
              }}
            >
              <span style={{ color: ORANGE, fontWeight: 600, fontSize: "0.8125rem" }}>
                For plumbers, roofers, dentists & more
              </span>
            </div>

            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#E17055",
                marginBottom: "16px",
                maxWidth: "520px",
              }}
            >
              Your competitors are getting the calls you should be getting.
            </p>

            <h1
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: NAVY,
                marginBottom: "24px",
              }}
            >
              Your phone rings more.{" "}
              <span style={{ color: ORANGE }}>Without you lifting a finger.</span>
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: SLATE,
                marginBottom: "36px",
                maxWidth: "520px",
              }}
            >
              They post on Google every week. They reply to every review. They show up when someone asks ChatGPT for a plumber. You don&apos;t. LocalBeacon fixes that — automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/check" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    backgroundColor: ORANGE,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(255,107,53,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Check Your AI Score — Free
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
            <p style={{ color: SLATE, fontSize: "0.8125rem", marginTop: "12px" }}>
              No credit card required · Set up in under 2 minutes
            </p>
          </div>

          {/* Right: fake dashboard mockup */}
          <div className="flex-1 w-full lg:max-w-[48%]">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: `1px solid ${MIST}`,
                boxShadow: "0 10px 40px rgba(27,42,74,0.10)",
                padding: "24px",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p style={{ fontWeight: 700, color: NAVY, fontSize: "0.9375rem" }}>
                    Mike&apos;s Plumbing — Denver, CO
                  </p>
                  <p style={{ color: SLATE, fontSize: "0.8125rem" }}>This month&apos;s activity</p>
                </div>
                <div
                  style={{
                    backgroundColor: "#00B89415",
                    color: "#00B894",
                    borderRadius: "9999px",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Active
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Google Views", val: "1,284", delta: "+23%" },
                  { label: "Phone Clicks", val: "47", delta: "+18%" },
                  { label: "Reviews Replied", val: "12", delta: "100%" },
                ].map(({ label, val, delta }) => (
                  <div
                    key={label}
                    style={{
                      backgroundColor: CREAM,
                      borderRadius: "10px",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ fontWeight: 800, color: NAVY, fontSize: "1.25rem" }}>{val}</p>
                    <p style={{ color: SLATE, fontSize: "0.6875rem", marginBottom: "2px" }}>{label}</p>
                    <p style={{ color: "#00B894", fontSize: "0.6875rem", fontWeight: 700 }}>{delta}</p>
                  </div>
                ))}
              </div>

              {/* Recent posts */}
              <p style={{ color: SLATE, fontSize: "0.75rem", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Recent posts
              </p>
              <div className="space-y-2">
                {[
                  { title: "Spring drain cleaning special — Denver", date: "Mar 1" },
                  { title: "5-star review reply — Sarah T.", date: "Feb 26" },
                  { title: "Emergency plumber in Lakewood, CO", date: "Feb 22" },
                ].map(({ title, date }) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      backgroundColor: WARM_WHITE,
                      borderRadius: "8px",
                      border: `1px solid ${MIST}`,
                    }}
                  >
                    <span style={{ color: CHARCOAL, fontSize: "0.8125rem" }}>{title}</span>
                    <span style={{ color: SLATE, fontSize: "0.75rem", flexShrink: 0, marginLeft: "8px" }}>{date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section
        style={{
          backgroundColor: CREAM,
          borderTop: `1px solid ${MIST}`,
          borderBottom: `1px solid ${MIST}`,
          padding: "20px 24px",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto" }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <span style={{ color: SLATE, fontSize: "0.875rem", fontWeight: 500 }}>
            Join businesses improving their local visibility:
          </span>
          {[
            { label: "Plumbers", href: "/for/plumbers" },
            { label: "HVAC", href: "/for/hvac" },
            { label: "Dentists", href: "/for/dental" },
            { label: "Roofers", href: "/for/roofers" },
            { label: "Auto Repair", href: "/for/auto-repair" },
            { label: "Landscapers", href: "/for/landscapers" },
            { label: "Electricians", href: "/for/electricians" },
            { label: "Restaurants", href: "/for/restaurants" },
            { label: "Hair Salons", href: "/for/hair-salons" },
            { label: "Photographers", href: "/for/photographers" },
            { label: "Gyms", href: "/for/gyms" },
            { label: "Veterinarians", href: "/for/veterinarians" },
            { label: "60+ Industries", href: "#pricing" },
          ].map((industry) => (
            <Link
              key={industry.label}
              href={industry.href}
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${MIST}`,
                borderRadius: "9999px",
                padding: "6px 16px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: NAVY,
                textDecoration: "none",
              }}
            >
              {industry.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section
        id="how-it-works"
        style={{ backgroundColor: CREAM, padding: "96px 24px" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              What LocalBeacon does{" "}
              <span style={{ color: ORANGE }}>for you</span>
            </h2>
            <p style={{ color: SLATE, fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              Six things that bring in more customers. All run weekly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {outcomes.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="group"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "28px 28px 28px 32px",
                  borderLeft: `4px solid ${ORANGE}`,
                  boxShadow: "0 1px 3px rgba(27,42,74,0.06), 0 1px 2px rgba(27,42,74,0.04)",
                  margin: "6px",
                  transition: "all 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 8px 24px rgba(27,42,74,0.12)";
                  el.style.borderLeftColor = ORANGE;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 1px 3px rgba(27,42,74,0.06), 0 1px 2px rgba(27,42,74,0.04)";
                  el.style.borderLeftColor = ORANGE;
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "56px",
                    height: "56px",
                    backgroundColor: `${ORANGE}15`,
                    borderRadius: "50%",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={32} style={{ color: ORANGE }} />
                </div>
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.0625rem", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: "48px",
            }}
          >
            <span style={{ color: "#E17055" }}>Without LocalBeacon</span>
            <span style={{ color: SLATE }}> vs </span>
            <span style={{ color: "#00B894" }}>With LocalBeacon</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without */}
            <div
              style={{
                backgroundColor: "#FFF5F3",
                border: "1px solid #F5C6BC",
                borderRadius: "12px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "#C0392B",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <XCircle size={20} style={{ color: "#E17055" }} />
                Without LocalBeacon
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {withoutVsWith.without.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <XCircle size={16} style={{ color: "#E17055", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "#5D4037", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div
              style={{
                backgroundColor: "#F0FDF8",
                border: "1px solid #A7E8D1",
                borderRadius: "12px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "#00795C",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 size={20} style={{ color: "#00B894" }} />
                With LocalBeacon
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {withoutVsWith.with.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={16} style={{ color: "#00B894", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "#1B4332", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Checker CTA ── */}
      <section style={{ backgroundColor: NAVY, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            How visible is your business to ChatGPT?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "28px" }}>
            Find out in 10 seconds. Free — no signup required.
          </p>
          <Link href="/check" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.0625rem",
                padding: "15px 32px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Check Your AI Score — Free →
              <ArrowRight size={18} />
            </button>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", marginTop: "16px" }}>
            We scan 21 signals that AI search engines look for
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ backgroundColor: CREAM, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: "56px",
            }}
          >
            Up and running in <span style={{ color: ORANGE }}>2 minutes</span>
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0 relative">
            {/* connecting line (desktop) */}
            <div
              className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px"
              style={{ backgroundColor: MIST, zIndex: 0 }}
            />

            {steps.map(({ num, Icon, title, desc }, idx) => (
              <div
                key={num}
                className="flex-1 flex flex-col items-center text-center px-4"
                style={{ position: "relative", zIndex: 1 }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "9999px",
                    backgroundColor: ORANGE,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 4px 14px rgba(255,107,53,0.3)",
                  }}
                >
                  {num}
                </div>
                <Icon size={28} style={{ color: NAVY, marginBottom: "12px", opacity: 0.7 }} />
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.0625rem", marginBottom: "10px" }}>
                  {title}
                </h3>
                <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AEO Explainer ── */}
      <section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Google isn&apos;t the only search engine anymore.
          </h2>
          <p
            style={{
              color: SLATE,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            When someone asks ChatGPT, Perplexity, or Google AI for a recommendation, will they mention your business?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "40px" }}>
            {/* The old way */}
            <div
              style={{
                backgroundColor: "#FFF5F3",
                border: "1px solid #F5C6BC",
                borderRadius: "12px",
                padding: "32px",
                textAlign: "left",
              }}
            >
              <p style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#C0392B", marginBottom: "20px" }}>
                The old way
              </p>
              <p style={{ fontWeight: 700, color: "#5D4037", marginBottom: "16px", fontSize: "0.9375rem" }}>
                Traditional SEO
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Optimize for Google's blue links",
                  "Compete for page 1 rankings",
                  "Hope someone clicks your link",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <XCircle size={16} style={{ color: "#E17055", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "#5D4037", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The new way */}
            <div
              style={{
                backgroundColor: "#F0FDF8",
                border: "1px solid #A7E8D1",
                borderRadius: "12px",
                padding: "32px",
                textAlign: "left",
              }}
            >
              <p style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#00795C", marginBottom: "20px" }}>
                The new way
              </p>
              <p style={{ fontWeight: 700, color: "#1B4332", marginBottom: "16px", fontSize: "0.9375rem" }}>
                Answer Engine Optimization
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Optimize for AI answers",
                  "Be the business AI recommends",
                  "Get cited directly in the answer",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={16} style={{ color: "#00B894", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "#1B4332", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p style={{ color: NAVY, fontWeight: 700, fontSize: "1.0625rem" }}>
            LocalBeacon optimizes for both — so you show up everywhere people search.
          </p>
        </div>
      </section>

      {/* ── Why We Built This ── */}
      <section style={{ backgroundColor: CREAM, padding: "80px 24px", borderTop: `1px solid ${MIST}` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: NAVY,
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            &ldquo;Local businesses shouldn&apos;t need a marketing degree to show up on Google.
            We built LocalBeacon so business owners can focus on what they do best — while we
            handle the content that gets them found.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "9999px",
                backgroundColor: `${ORANGE}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: ORANGE,
                fontSize: "1.125rem",
              }}
            >
              D
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontWeight: 700, color: NAVY, fontSize: "0.9375rem" }}>David Nielsen</p>
              <p style={{ color: SLATE, fontSize: "0.875rem" }}>Founder, LocalBeacon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              More calls for less than{" "}
              <span style={{ color: ORANGE }}>$2/day</span>
            </h2>
            <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.6 }}>
              Start free, upgrade anytime. No contracts.
            </p>
          </div>

          {/* Comparison callout */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                backgroundColor: CREAM,
                border: `1px solid ${MIST}`,
                borderRadius: "9999px",
                padding: "10px 24px",
                fontSize: "0.875rem",
                color: SLATE,
              }}
            >
              <span style={{ fontWeight: 600, color: NAVY }}>Compared to:</span>
              <span>Hiring an agency <s style={{ opacity: 0.5 }}>$800–1,500/mo</s></span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>BrightLocal <s style={{ opacity: 0.5 }}>$39–59/mo</s> (fewer features)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "32px",
                  border: plan.highlight ? `2px solid ${ORANGE}` : (plan as any).premium ? `2px solid #B8860B` : `1px solid ${MIST}`,
                  boxShadow: plan.highlight
                    ? "0 10px 30px rgba(255,107,53,0.12)"
                    : (plan as any).premium
                    ? "0 10px 30px rgba(184,134,11,0.15)"
                    : "0 1px 3px rgba(27,42,74,0.06)",
                  background: (plan as any).premium ? "linear-gradient(180deg, #FFFDF5 0%, #FFF8E7 100%)" : "#fff",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: ORANGE,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "9999px",
                      padding: "4px 16px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                {(plan as any).premium && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #B8860B, #FFD700)",
                      color: "#000",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "9999px",
                      padding: "4px 16px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    White Glove
                  </div>
                )}

                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: SLATE,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  {plan.name}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, color: NAVY }}>{plan.price}</span>
                  <span style={{ color: SLATE, fontSize: "0.875rem" }}>{plan.period}</span>
                </div>

                <p style={{ color: SLATE, fontSize: "0.9375rem", marginBottom: "16px", lineHeight: 1.5 }}>
                  {plan.tagline}
                </p>

                {/* Automation count headline for paid plans */}
                {(() => {
                  const autoCount = plan.features.filter(f => f.mode === 'auto').length
                  const doneCount = plan.features.filter(f => f.mode === 'done').length
                  const handledCount = autoCount + doneCount
                  if (handledCount === 0) return null
                  return (
                    <div style={{
                      background: plan.premium ? 'rgba(184,134,11,0.08)' : 'rgba(5,150,105,0.08)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      marginBottom: '16px',
                      textAlign: 'center',
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: plan.premium ? '#92400E' : '#059669',
                      }}>
                        {handledCount} of {plan.features.length} features handled for you
                      </span>
                    </div>
                  )
                })()}

                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <CheckCircle2 size={16} style={{ color: ORANGE, flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ color: CHARCOAL, fontSize: "0.9375rem" }}>
                        {f.label}
                        <span style={{
                          display: "inline-block",
                          marginLeft: "6px",
                          padding: "1px 7px",
                          borderRadius: "9999px",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          backgroundColor: MODE_BADGES[f.mode].bg,
                          color: MODE_BADGES[f.mode].color,
                          verticalAlign: "middle",
                          lineHeight: "1.5",
                        }}>
                          {MODE_BADGES[f.mode].label}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href ?? (plan.premium ? "/pricing#dfy" : "/check")} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      cursor: "pointer",
                      border: plan.highlight || plan.premium ? "none" : `2px solid ${NAVY}`,
                      background: plan.highlight ? ORANGE : plan.premium ? "linear-gradient(90deg, #B8860B, #DAA520)" : "transparent",
                      color: plan.highlight || plan.premium ? "#fff" : NAVY,
                      boxShadow: plan.highlight ? "0 4px 14px rgba(255,107,53,0.3)" : plan.premium ? "0 4px 14px rgba(184,134,11,0.3)" : "none",
                      transition: "opacity 0.15s",
                    }}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ backgroundColor: CREAM, padding: "96px 24px", borderTop: `1px solid ${MIST}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              Real businesses.{" "}
              <span style={{ color: ORANGE }}>Real results.</span>
            </h2>
            <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.6 }}>
              See what local business owners are saying about LocalBeacon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "We had no idea AI search engines couldn't find us. LocalBeacon showed us exactly what was wrong and helped us fix it. Our AI readiness score went from 34 to 78 in two weeks.",
                name: "Sarah M.",
                role: "Salon Owner",
                location: "Minneapolis, MN",
              },
              {
                quote: "I was paying $1,200/month for an SEO agency. LocalBeacon does the local part better for $49.",
                name: "Mike R.",
                role: "HVAC Contractor",
                location: "St. Paul, MN",
              },
              {
                quote: "The AI Readiness scan opened my eyes. I didn't even know llms.txt existed. Now ChatGPT actually recommends my practice.",
                name: "Dr. Lisa K.",
                role: "Dentist",
                location: "Bloomington, MN",
              },
            ].map(({ quote, name, role, location }) => (
              <div
                key={name}
                style={{
                  backgroundColor: "#fff",
                  border: `1px solid ${MIST}`,
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  boxShadow: "0 1px 3px rgba(27,42,74,0.06)",
                }}
              >
                <span style={{ color: ORANGE, fontSize: "2.5rem", lineHeight: 1, fontWeight: 800, opacity: 0.5 }}>&ldquo;</span>
                <p style={{ color: CHARCOAL, fontSize: "0.9375rem", lineHeight: 1.65, marginTop: "-12px" }}>
                  {quote}
                </p>
                <div style={{ borderTop: `1px solid ${MIST}`, paddingTop: "16px", marginTop: "auto" }}>
                  <p style={{ color: NAVY, fontWeight: 700, fontSize: "0.9375rem", margin: 0 }}>{name}</p>
                  <p style={{ color: SLATE, fontSize: "0.8125rem", margin: "2px 0 0" }}>{role} · {location}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: SLATE, fontSize: "0.8125rem", textAlign: "center", marginTop: "24px", opacity: 0.7 }}>
            * Results may vary. Individual outcomes depend on business type, location, and implementation.
          </p>
        </div>
      </section>

      {/* ── Latest from the Blog ── */}
      {latestPosts.length > 0 && (
        <section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <BookOpen size={20} style={{ color: ORANGE }} />
                <span style={{ color: ORANGE, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  From the blog
                </span>
              </div>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  color: NAVY,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Latest guides for local businesses
              </h2>
              <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
                Actionable advice on getting found by customers — and AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => {
                const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        border: `1px solid ${MIST}`,
                        padding: "28px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(27,42,74,0.08)";
                        (e.currentTarget as HTMLElement).style.borderColor = `${ORANGE}40`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.borderColor = MIST;
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <span
                          style={{
                            backgroundColor: `${ORANGE}15`,
                            color: ORANGE,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: "9999px",
                          }}
                        >
                          {categoryLabel}
                        </span>
                        <span style={{ color: SLATE, fontSize: "0.8125rem" }}>
                          {post.readingTime} min read
                        </span>
                      </div>
                      <h3
                        style={{
                          color: NAVY,
                          fontSize: "1.125rem",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          marginBottom: "10px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        style={{
                          color: SLATE,
                          fontSize: "0.9375rem",
                          lineHeight: 1.55,
                          flex: 1,
                          marginBottom: "16px",
                        }}
                      >
                        {post.description}
                      </p>
                      <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>
                        Read more →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: `2px solid ${NAVY}`,
                  transition: "background-color 0.15s",
                }}
              >
                View all posts
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
          }),
        }}
      />
      <section style={{ backgroundColor: CREAM, padding: "96px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: "48px",
            }}
          >
            Common questions
          </h2>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          backgroundColor: NAVY,
          padding: "96px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            See how visible your business is to AI. Takes 10 seconds.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "36px" }}>
            Free scan. No sign-up required. See your score instantly.
          </p>
          <Link href="/check" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.0625rem",
                padding: "15px 32px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Check Your AI Score — Free
              <ArrowRight size={18} />
            </button>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", marginTop: "12px" }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
