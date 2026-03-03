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
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const outcomes = [
  {
    Icon: MapPin,
    title: "Show up on Google Maps",
    description:
      "Weekly posts keep your listing active. Google rewards that with higher placement when locals search.",
  },
  {
    Icon: Search,
    title: 'Rank in every city you serve',
    description:
      "We build a local page for each neighborhood and city. More pages, more search results, more calls.",
  },
  {
    Icon: Bot,
    title: "Visible to AI assistants",
    description:
      "When someone asks Siri, ChatGPT, or Google AI for a local recommendation, your business shows up.",
  },
  {
    Icon: Star,
    title: "Every review gets a reply",
    description:
      "Unanswered reviews scare off customers. We write professional replies so your reputation stays strong.",
  },
  {
    Icon: BarChart3,
    title: "Monthly proof it's working",
    description:
      "A report that shows exactly how many people found you, clicked, and called. No guesswork.",
  },
];

const withoutVsWith = {
  without: [
    "You forget to post for weeks — Google thinks you're inactive",
    "Competitors show up above you in search results",
    "Bad reviews sit unanswered — scaring away new customers",
    "You have no idea if anything you're doing is working",
    "You spend hours on marketing instead of running your business",
  ],
  with: [
    "Fresh posts go out every week. You don't touch a thing.",
    "Local pages put you in search results across every city you serve",
    "Every review gets a professional reply within 24 hours",
    "Monthly report shows calls, views, and search ranking changes",
    "You run your business. Marketing runs itself.",
  ],
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Try it out — see what LocalBeacon can do.",
    features: [
      "5 Google posts per month",
      "3 local city pages",
      "1 business location",
      "Copy & post to Google yourself",
    ],
    cta: "Connect Your Google Listing",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Solo",
    price: "$49",
    period: "/month",
    tagline: "Weekly posts, review replies, city pages. Done for you.",
    features: [
      "Unlimited Google posts — auto-scheduled weekly",
      "10 local city pages with SEO optimization",
      "3 business locations",
      "Professional review replies",
      "1 blog post per month",
      "Monthly visibility report",
    ],
    cta: "Start Solo — $49/mo",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/month",
    tagline: "Run local marketing for all your clients.",
    features: [
      "Everything in Solo — unlimited",
      "Unlimited client locations",
      "Multi-client dashboard",
      "White-label reports with your branding",
      "Competitor monitoring & alerts",
      "Priority support",
    ],
    cta: "Start Agency — $99/mo",
    href: "/sign-up",
    highlight: false,
  },
];

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
    a: "An agency charges $800-1,500/month and you wait weeks for results. LocalBeacon does the same work — Google posts, local pages, review replies, rank tracking — for $49/month, starting immediately.",
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
    title: "We generate your content",
    desc: "LocalBeacon writes posts, city pages, and review replies — tailored to your business and location.",
  },
  {
    num: "3",
    Icon: ThumbsUp,
    title: "Your phone starts ringing",
    desc: "Fresh content goes live every week. More visibility, more calls. You don't do anything.",
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
        className="w-full flex items-center justify-between text-left gap-4 group"
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

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* ── Sticky Nav ── */}
      <nav
        id="main-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#fff",
          borderBottom: `1px solid ${MIST}`,
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var nav = document.getElementById('main-nav');
                window.addEventListener('scroll', function(){
                  if(window.scrollY > 8){
                    nav.style.boxShadow = '0 2px 16px rgba(27,42,74,0.08)';
                  } else {
                    nav.style.boxShadow = 'none';
                  }
                });
              })();
            `,
          }}
        />
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
          className="flex items-center justify-between h-20"
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "56px", width: "56px" }} />
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.25rem",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#pricing", label: "Pricing" },
              { href: "/sign-in", label: "Sign In" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: SLATE,
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = NAVY)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = SLATE)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link href="/sign-up" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "10px 22px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,107,53,0.3)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            >
              Get Started Free
            </button>
          </Link>
        </div>
      </nav>

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
              <span style={{ color: ORANGE }}>We handle everything.</span>
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
              LocalBeacon posts to your Google listing every week, builds local pages for
              every city you serve, and replies to your reviews. More visibility, more calls.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/sign-up" style={{ textDecoration: "none" }}>
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
                  Connect Your Google Listing — Free
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
            Trusted by local businesses across the US:
          </span>
          {["Plumbers", "HVAC", "Dentists", "Roofers", "Lawyers", "Landscapers"].map((industry) => (
            <span
              key={industry}
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${MIST}`,
                borderRadius: "9999px",
                padding: "6px 16px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: NAVY,
              }}
            >
              {industry}
            </span>
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
              Five things that bring in more customers. All run weekly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map(({ Icon, title, description }, i) => (
              <div
                key={title}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "28px 28px 28px 32px",
                  borderLeft: `4px solid ${ORANGE}`,
                  boxShadow: "0 1px 3px rgba(27,42,74,0.06), 0 1px 2px rgba(27,42,74,0.04)",
                  ...(i === 4 ? { gridColumn: "span 1" } : {}),
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    backgroundColor: `${ORANGE}15`,
                    borderRadius: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={22} style={{ color: ORANGE }} />
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

      {/* ── Testimonial ── */}
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
            &ldquo;I used to spend Sunday evenings trying to come up with things to post on Google. Now it
            just happens. My calls are up and I haven&apos;t thought about marketing in months.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            {/* Placeholder avatar */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "9999px",
                backgroundColor: `${NAVY}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: NAVY,
                fontSize: "1.125rem",
              }}
            >
              M
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontWeight: 700, color: NAVY, fontSize: "0.9375rem" }}>Mike R.</p>
              <p style={{ color: SLATE, fontSize: "0.875rem" }}>Owner, Mike&apos;s Plumbing — Denver, CO</p>
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
              Simple pricing.{" "}
              <span style={{ color: ORANGE }}>No surprises.</span>
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
                  border: plan.highlight ? `2px solid ${ORANGE}` : `1px solid ${MIST}`,
                  boxShadow: plan.highlight
                    ? "0 10px 30px rgba(255,107,53,0.12)"
                    : "0 1px 3px rgba(27,42,74,0.06)",
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

                <p style={{ color: SLATE, fontSize: "0.9375rem", marginBottom: "24px", lineHeight: 1.5 }}>
                  {plan.tagline}
                </p>

                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <CheckCircle2 size={16} style={{ color: ORANGE, flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ color: CHARCOAL, fontSize: "0.9375rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      cursor: "pointer",
                      border: plan.highlight ? "none" : `2px solid ${NAVY}`,
                      backgroundColor: plan.highlight ? ORANGE : "transparent",
                      color: plan.highlight ? "#fff" : NAVY,
                      boxShadow: plan.highlight ? "0 4px 14px rgba(255,107,53,0.3)" : "none",
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
            Connect your Google listing. First posts go out today.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "36px" }}>
            Takes 2 minutes. No credit card. Cancel whenever.
          </p>
          <Link href="/sign-up" style={{ textDecoration: "none" }}>
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
              Connect Your Google Listing — Free
              <ArrowRight size={18} />
            </button>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", marginTop: "12px" }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: WARM_WHITE,
          borderTop: `1px solid ${MIST}`,
          padding: "40px 24px",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto" }}
          className="flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "48px", width: "48px" }} />
            <span style={{ fontWeight: 800, fontSize: "1.125rem", color: NAVY }}>
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#pricing", label: "Pricing" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/sign-in", label: "Sign In" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ color: SLATE, fontSize: "0.875rem", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <p style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            © {new Date().getFullYear()} Perpetual Agility LLC
          </p>
        </div>
      </footer>
    </div>
  );
}
