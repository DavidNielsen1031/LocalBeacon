"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
var link_1 = require("next/link");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var blog_shared_1 = require("@/lib/blog-shared");
// ─── Data ────────────────────────────────────────────────────────────────────
var outcomes = [
    {
        Icon: lucide_react_1.MapPin,
        title: "Stop losing jobs to competitors who post more",
        description: "Weekly posts keep your listing fresh and active. An active listing signals to Google that your business is open and engaged.",
    },
    {
        Icon: lucide_react_1.Search,
        title: "Get found in cities you serve but don't rank for",
        description: "We build a local page for each neighborhood and city. More pages targeting local keywords means more chances to appear in search results.",
    },
    {
        Icon: lucide_react_1.Bot,
        title: "Be the business Siri and ChatGPT recommend",
        description: "We optimize your content so AI assistants like ChatGPT, Perplexity, and Google AI are more likely to recommend your business.",
    },
    {
        Icon: lucide_react_1.Star,
        title: "Stop scaring off customers with unanswered reviews",
        description: "Unanswered reviews scare off customers. We draft professional replies you can post — keeping your reputation strong.",
    },
    {
        Icon: lucide_react_1.BarChart3,
        title: "Know exactly what's bringing in calls",
        description: "See exactly how visible your business is to AI search engines with a 15-point audit and actionable recommendations.",
    },
];
var withoutVsWith = {
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
var plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        tagline: "Try it out — see what LocalBeacon can do.",
        features: [
            "5 Google post drafts per month",
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
        tagline: "AI-written content for your local business, every week.",
        features: [
            "Unlimited Google post drafts — generated weekly",
            "10 local city pages with SEO optimization",
            "AI-written review replies",
            "Blog post generator",
            "AI Readiness score & recommendations",
            "Schema markup & llms.txt generator",
        ],
        cta: "Start Solo — $49/mo",
        href: "/sign-up",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$99",
        period: "/month",
        tagline: "Everything in Solo — built for agencies managing clients.",
        features: [
            "Everything in Solo — unlimited",
            "Unlimited content generation",
            "Multi-client dashboard — manage all your clients",
            "White-label PDF reports for each client",
            "Client onboarding wizard",
            "FAQ builder with schema markup",
            "Priority email support",
        ],
        cta: "Start Agency — $99/mo",
        href: "/sign-up",
        highlight: false,
    },
];
var faqs = [
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
var steps = [
    {
        num: "1",
        Icon: lucide_react_1.Phone,
        title: "Connect your Google listing",
        desc: "Link your Google Business Profile in under 2 minutes. We pull in your info automatically.",
    },
    {
        num: "2",
        Icon: lucide_react_1.FileText,
        title: "We write your content",
        desc: "LocalBeacon writes posts, city pages, and review replies — tailored to your business and location.",
    },
    {
        num: "3",
        Icon: lucide_react_1.ThumbsUp,
        title: "Review, post, grow",
        desc: "Review what we wrote, post it to Google, and watch your visibility grow. Auto-publishing coming soon.",
    },
];
// ─── Styles (inline for isolation — Tailwind v4 inline is fine) ──────────────
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var CREAM = "#FFF8F0";
var WARM_WHITE = "#FAFAF7";
var CHARCOAL = "#2D3436";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
// ─── Sub-components ───────────────────────────────────────────────────────────
function FAQItem(_a) {
    var q = _a.q, a = _a.a;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    return (<div style={{ borderBottom: "1px solid ".concat(MIST) }} className="py-5">
      <button onClick={function () { return setOpen(function (v) { return !v; }); }} className="w-full flex items-center justify-between text-left gap-4 group" aria-expanded={open}>
        <span style={{ color: NAVY, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5" }}>
          {q}
        </span>
        <lucide_react_1.ChevronDown size={20} style={{
            color: ORANGE,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
        }}/>
      </button>
      <div style={{
            maxHeight: open ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
        }}>
        <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: "1.65", paddingTop: "12px" }}>
          {a}
        </p>
      </div>
    </div>);
}
// ─── Main page ────────────────────────────────────────────────────────────────
function LandingPage(_a) {
    var _b = _a.latestPosts, latestPosts = _b === void 0 ? [] : _b;
    return (<div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* ── Sticky Nav ── */}
      <nav id="main-nav" style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "#fff",
            borderBottom: "1px solid ".concat(MIST),
        }}>
        <script dangerouslySetInnerHTML={{
            __html: "\n              (function(){\n                var nav = document.getElementById('main-nav');\n                window.addEventListener('scroll', function(){\n                  if(window.scrollY > 8){\n                    nav.style.boxShadow = '0 2px 16px rgba(27,42,74,0.08)';\n                  } else {\n                    nav.style.boxShadow = 'none';\n                  }\n                });\n              })();\n            ",
        }}/>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }} className="flex items-center justify-between h-20">
          {/* Logo */}
          <link_1.default href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "56px", width: "56px" }}/>
            <span style={{
            fontWeight: 800,
            fontSize: "1.25rem",
            color: NAVY,
            letterSpacing: "-0.02em",
        }}>
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </link_1.default>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
            { href: "/check", label: "Free AI Check" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#pricing", label: "Pricing" },
            { href: "/sign-in", label: "Sign In" },
        ].map(function (_a) {
            var href = _a.href, label = _a.label;
            return (<link_1.default key={href} href={href} style={{
                    color: SLATE,
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.15s",
                }} onMouseEnter={function (e) { return (e.target.style.color = NAVY); }} onMouseLeave={function (e) { return (e.target.style.color = SLATE); }}>
                {label}
              </link_1.default>);
        })}
          </div>

          {/* CTA */}
          <link_1.default href="/sign-up" style={{ textDecoration: "none" }}>
            <button style={{
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
        }} onMouseEnter={function (e) { return (e.target.style.opacity = "0.88"); }} onMouseLeave={function (e) { return (e.target.style.opacity = "1"); }}>
              Get Started Free
            </button>
          </link_1.default>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
            backgroundColor: WARM_WHITE,
            padding: "80px 24px 96px",
        }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 lg:max-w-[52%]">
            <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "".concat(ORANGE, "15"),
            border: "1px solid ".concat(ORANGE, "30"),
            borderRadius: "9999px",
            padding: "6px 14px",
            marginBottom: "24px",
        }}>
              <span style={{ color: ORANGE, fontWeight: 600, fontSize: "0.8125rem" }}>
                For plumbers, roofers, dentists & more
              </span>
            </div>

            <p style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#E17055",
            marginBottom: "16px",
            maxWidth: "520px",
        }}>
              Your competitors are getting the calls you should be getting.
            </p>

            <h1 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: NAVY,
            marginBottom: "24px",
        }}>
              Your phone rings more.{" "}
              <span style={{ color: ORANGE }}>Without you lifting a finger.</span>
            </h1>

            <p style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: SLATE,
            marginBottom: "36px",
            maxWidth: "520px",
        }}>
              They post on Google every week. They reply to every review. They show up when someone asks ChatGPT for a plumber. You don&apos;t. LocalBeacon fixes that — automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <link_1.default href="/sign-up" style={{ textDecoration: "none" }}>
                <button style={{
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
        }}>
                  Connect Your Google Listing — Free
                  <lucide_react_1.ArrowRight size={18}/>
                </button>
              </link_1.default>
            </div>
            <p style={{ color: SLATE, fontSize: "0.8125rem", marginTop: "12px" }}>
              No credit card required · Set up in under 2 minutes
            </p>
          </div>

          {/* Right: fake dashboard mockup */}
          <div className="flex-1 w-full lg:max-w-[48%]">
            <div style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            border: "1px solid ".concat(MIST),
            boxShadow: "0 10px 40px rgba(27,42,74,0.10)",
            padding: "24px",
            maxWidth: "480px",
            margin: "0 auto",
        }}>
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p style={{ fontWeight: 700, color: NAVY, fontSize: "0.9375rem" }}>
                    Mike&apos;s Plumbing — Denver, CO
                  </p>
                  <p style={{ color: SLATE, fontSize: "0.8125rem" }}>This month&apos;s activity</p>
                </div>
                <div style={{
            backgroundColor: "#00B89415",
            color: "#00B894",
            borderRadius: "9999px",
            padding: "4px 12px",
            fontSize: "0.75rem",
            fontWeight: 700,
        }}>
                  Active
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
            { label: "Google Views", val: "1,284", delta: "+23%" },
            { label: "Phone Clicks", val: "47", delta: "+18%" },
            { label: "Reviews Replied", val: "12", delta: "100%" },
        ].map(function (_a) {
            var label = _a.label, val = _a.val, delta = _a.delta;
            return (<div key={label} style={{
                    backgroundColor: CREAM,
                    borderRadius: "10px",
                    padding: "12px",
                    textAlign: "center",
                }}>
                    <p style={{ fontWeight: 800, color: NAVY, fontSize: "1.25rem" }}>{val}</p>
                    <p style={{ color: SLATE, fontSize: "0.6875rem", marginBottom: "2px" }}>{label}</p>
                    <p style={{ color: "#00B894", fontSize: "0.6875rem", fontWeight: 700 }}>{delta}</p>
                  </div>);
        })}
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
        ].map(function (_a) {
            var title = _a.title, date = _a.date;
            return (<div key={title} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    backgroundColor: WARM_WHITE,
                    borderRadius: "8px",
                    border: "1px solid ".concat(MIST),
                }}>
                    <span style={{ color: CHARCOAL, fontSize: "0.8125rem" }}>{title}</span>
                    <span style={{ color: SLATE, fontSize: "0.75rem", flexShrink: 0, marginLeft: "8px" }}>{date}</span>
                  </div>);
        })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section style={{
            backgroundColor: CREAM,
            borderTop: "1px solid ".concat(MIST),
            borderBottom: "1px solid ".concat(MIST),
            padding: "20px 24px",
        }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="flex flex-wrap items-center justify-center gap-6">
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
        ].map(function (industry) { return (<link_1.default key={industry.label} href={industry.href} style={{
                backgroundColor: "#fff",
                border: "1px solid ".concat(MIST),
                borderRadius: "9999px",
                padding: "6px 16px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: NAVY,
                textDecoration: "none",
            }}>
              {industry.label}
            </link_1.default>); })}
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section id="how-it-works" style={{ backgroundColor: CREAM, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
              What LocalBeacon does{" "}
              <span style={{ color: ORANGE }}>for you</span>
            </h2>
            <p style={{ color: SLATE, fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              Five things that bring in more customers. All run weekly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map(function (_a, i) {
            var Icon = _a.Icon, title = _a.title, description = _a.description;
            return (<div key={title} style={__assign({ backgroundColor: "#fff", borderRadius: "12px", padding: "28px 28px 28px 32px", borderLeft: "4px solid ".concat(ORANGE), boxShadow: "0 1px 3px rgba(27,42,74,0.06), 0 1px 2px rgba(27,42,74,0.04)" }, (i === 4 ? { gridColumn: "span 1" } : {}))}>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    backgroundColor: "".concat(ORANGE, "15"),
                    borderRadius: "10px",
                    marginBottom: "16px",
                }}>
                  <Icon size={22} style={{ color: ORANGE }}/>
                </div>
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.0625rem", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {description}
                </p>
              </div>);
        })}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "48px",
        }}>
            <span style={{ color: "#E17055" }}>Without LocalBeacon</span>
            <span style={{ color: SLATE }}> vs </span>
            <span style={{ color: "#00B894" }}>With LocalBeacon</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without */}
            <div style={{
            backgroundColor: "#FFF5F3",
            border: "1px solid #F5C6BC",
            borderRadius: "12px",
            padding: "28px",
        }}>
              <h3 style={{
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "#C0392B",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}>
                <lucide_react_1.XCircle size={20} style={{ color: "#E17055" }}/>
                Without LocalBeacon
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {withoutVsWith.without.map(function (item) { return (<li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <lucide_react_1.XCircle size={16} style={{ color: "#E17055", flexShrink: 0, marginTop: "3px" }}/>
                    <span style={{ color: "#5D4037", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>); })}
              </ul>
            </div>

            {/* With */}
            <div style={{
            backgroundColor: "#F0FDF8",
            border: "1px solid #A7E8D1",
            borderRadius: "12px",
            padding: "28px",
        }}>
              <h3 style={{
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "#00795C",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}>
                <lucide_react_1.CheckCircle2 size={20} style={{ color: "#00B894" }}/>
                With LocalBeacon
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {withoutVsWith.with.map(function (item) { return (<li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <lucide_react_1.CheckCircle2 size={16} style={{ color: "#00B894", flexShrink: 0, marginTop: "3px" }}/>
                    <span style={{ color: "#1B4332", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>); })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Checker CTA ── */}
      <section style={{ backgroundColor: NAVY, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
            How visible is your business to ChatGPT?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "28px" }}>
            Find out in 10 seconds. Free — no signup required.
          </p>
          <link_1.default href="/check" style={{ textDecoration: "none" }}>
            <button style={{
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
        }}>
              Check Your AI Score — Free →
              <lucide_react_1.ArrowRight size={18}/>
            </button>
          </link_1.default>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", marginTop: "16px" }}>
            We scan 14 signals that AI search engines look for
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ backgroundColor: CREAM, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "56px",
        }}>
            Up and running in <span style={{ color: ORANGE }}>2 minutes</span>
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0 relative">
            {/* connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px" style={{ backgroundColor: MIST, zIndex: 0 }}/>

            {steps.map(function (_a, idx) {
            var num = _a.num, Icon = _a.Icon, title = _a.title, desc = _a.desc;
            return (<div key={num} className="flex-1 flex flex-col items-center text-center px-4" style={{ position: "relative", zIndex: 1 }}>
                <div style={{
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
                }}>
                  {num}
                </div>
                <Icon size={28} style={{ color: NAVY, marginBottom: "12px", opacity: 0.7 }}/>
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.0625rem", marginBottom: "10px" }}>
                  {title}
                </h3>
                <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>);
        })}
          </div>
        </div>
      </section>

      {/* ── AEO Explainer ── */}
      <section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
            Google isn&apos;t the only search engine anymore.
          </h2>
          <p style={{
            color: SLATE,
            fontSize: "1.0625rem",
            lineHeight: 1.65,
            maxWidth: "600px",
            margin: "0 auto 48px",
        }}>
            When someone asks ChatGPT, Perplexity, or Google AI for a recommendation, will they mention your business?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "40px" }}>
            {/* The old way */}
            <div style={{
            backgroundColor: "#FFF5F3",
            border: "1px solid #F5C6BC",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "left",
        }}>
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
        ].map(function (item) { return (<li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <lucide_react_1.XCircle size={16} style={{ color: "#E17055", flexShrink: 0, marginTop: "3px" }}/>
                    <span style={{ color: "#5D4037", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>); })}
              </ul>
            </div>

            {/* The new way */}
            <div style={{
            backgroundColor: "#F0FDF8",
            border: "1px solid #A7E8D1",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "left",
        }}>
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
        ].map(function (item) { return (<li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <lucide_react_1.CheckCircle2 size={16} style={{ color: "#00B894", flexShrink: 0, marginTop: "3px" }}/>
                    <span style={{ color: "#1B4332", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
                  </li>); })}
              </ul>
            </div>
          </div>

          <p style={{ color: NAVY, fontWeight: 700, fontSize: "1.0625rem" }}>
            LocalBeacon optimizes for both — so you show up everywhere people search.
          </p>
        </div>
      </section>

      {/* ── Agency Section ── */}
      <section style={{ backgroundColor: CREAM, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "".concat(ORANGE, "15"),
            borderRadius: "9999px",
            padding: "6px 16px",
            marginBottom: "20px",
        }}>
            <span style={{ color: ORANGE, fontWeight: 600, fontSize: "0.8125rem" }}>
              For agencies &amp; freelancers
            </span>
          </div>
          <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
            Managing multiple clients?
          </h2>
          <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "640px", margin: "0 auto 40px" }}>
            One dashboard for all your clients. Generate content, download branded reports, and onboard new clients in 60 seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: "36px" }}>
            {[
            {
                emoji: "🏢",
                title: "Multi-Client Dashboard",
                desc: "Switch between clients instantly. Each gets their own content, settings, and AI readiness history.",
            },
            {
                emoji: "📄",
                title: "White-Label Reports",
                desc: "Download branded PDF reports with your logo. Send to clients monthly — no extra work.",
            },
            {
                emoji: "⚡",
                title: "60-Second Onboarding",
                desc: "Add a new client in 3 steps. We pre-populate their services based on industry.",
            },
        ].map(function (_a) {
            var emoji = _a.emoji, title = _a.title, desc = _a.desc;
            return (<div key={title} style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "28px 28px 28px 32px",
                    borderLeft: "4px solid ".concat(ORANGE),
                    boxShadow: "0 1px 3px rgba(27,42,74,0.06)",
                    textAlign: "left",
                }}>
                <p style={{ fontSize: "1.75rem", marginBottom: "12px" }}>{emoji}</p>
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.0625rem", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p style={{ color: SLATE, fontSize: "0.9375rem", lineHeight: 1.65 }}>{desc}</p>
              </div>);
        })}
          </div>

          <link_1.default href="/sign-up" style={{ textDecoration: "none" }}>
            <button style={{
            backgroundColor: ORANGE,
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.0625rem",
            padding: "14px 28px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(255,107,53,0.3)",
        }}>
              Start Agency — $99/mo
            </button>
          </link_1.default>
        </div>
      </section>

      {/* ── Why We Built This ── */}
      <section style={{ backgroundColor: CREAM, padding: "80px 24px", borderTop: "1px solid ".concat(MIST) }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            color: NAVY,
            lineHeight: 1.5,
            marginBottom: "32px",
        }}>
            &ldquo;Local businesses shouldn&apos;t need a marketing degree to show up on Google.
            We built LocalBeacon so business owners can focus on what they do best — while we
            handle the content that gets them found.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "9999px",
            backgroundColor: "".concat(ORANGE, "20"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: ORANGE,
            fontSize: "1.125rem",
        }}>
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
            <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
        }}>
              Simple pricing.{" "}
              <span style={{ color: ORANGE }}>No surprises.</span>
            </h2>
            <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.6 }}>
              Start free, upgrade anytime. No contracts.
            </p>
          </div>

          {/* Comparison callout */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            backgroundColor: CREAM,
            border: "1px solid ".concat(MIST),
            borderRadius: "9999px",
            padding: "10px 24px",
            fontSize: "0.875rem",
            color: SLATE,
        }}>
              <span style={{ fontWeight: 600, color: NAVY }}>Compared to:</span>
              <span>Hiring an agency <s style={{ opacity: 0.5 }}>$800–1,500/mo</s></span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>BrightLocal <s style={{ opacity: 0.5 }}>$39–59/mo</s> (fewer features)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(function (plan) { return (<div key={plan.name} style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "32px",
                border: plan.highlight ? "2px solid ".concat(ORANGE) : "1px solid ".concat(MIST),
                boxShadow: plan.highlight
                    ? "0 10px 30px rgba(255,107,53,0.12)"
                    : "0 1px 3px rgba(27,42,74,0.06)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}>
                {plan.highlight && (<div style={{
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
                }}>
                    Most Popular
                  </div>)}

                <p style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: SLATE,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
            }}>
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
                  {plan.features.map(function (f) { return (<li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <lucide_react_1.CheckCircle2 size={16} style={{ color: ORANGE, flexShrink: 0, marginTop: "3px" }}/>
                      <span style={{ color: CHARCOAL, fontSize: "0.9375rem" }}>{f}</span>
                    </li>); })}
                </ul>

                <link_1.default href={plan.href} style={{ textDecoration: "none" }}>
                  <button style={{
                width: "100%",
                padding: "13px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.9375rem",
                cursor: "pointer",
                border: plan.highlight ? "none" : "2px solid ".concat(NAVY),
                backgroundColor: plan.highlight ? ORANGE : "transparent",
                color: plan.highlight ? "#fff" : NAVY,
                boxShadow: plan.highlight ? "0 4px 14px rgba(255,107,53,0.3)" : "none",
                transition: "opacity 0.15s",
            }}>
                    {plan.cta}
                  </button>
                </link_1.default>
              </div>); })}
          </div>
        </div>
      </section>

      {/* ── Latest from the Blog ── */}
      {latestPosts.length > 0 && (<section style={{ backgroundColor: WARM_WHITE, padding: "96px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
            }}>
                <lucide_react_1.BookOpen size={20} style={{ color: ORANGE }}/>
                <span style={{ color: ORANGE, fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  From the blog
                </span>
              </div>
              <h2 style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
            }}>
                Latest guides for local businesses
              </h2>
              <p style={{ color: SLATE, fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
                Actionable advice on getting found by customers — and AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map(function (post) {
                var _a;
                var categoryLabel = (_a = blog_shared_1.CATEGORY_LABELS[post.category]) !== null && _a !== void 0 ? _a : post.category;
                return (<link_1.default key={post.slug} href={"/blog/".concat(post.slug)} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        border: "1px solid ".concat(MIST),
                        padding: "28px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                    }} onMouseEnter={function (e) {
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(27,42,74,0.08)";
                        e.currentTarget.style.borderColor = "".concat(ORANGE, "40");
                    }} onMouseLeave={function (e) {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = MIST;
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <span style={{
                        backgroundColor: "".concat(ORANGE, "15"),
                        color: ORANGE,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "9999px",
                    }}>
                          {categoryLabel}
                        </span>
                        <span style={{ color: SLATE, fontSize: "0.8125rem" }}>
                          {post.readingTime} min read
                        </span>
                      </div>
                      <h3 style={{
                        color: NAVY,
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        lineHeight: 1.35,
                        marginBottom: "10px",
                        letterSpacing: "-0.01em",
                    }}>
                        {post.title}
                      </h3>
                      <p style={{
                        color: SLATE,
                        fontSize: "0.9375rem",
                        lineHeight: 1.55,
                        flex: 1,
                        marginBottom: "16px",
                    }}>
                        {post.description}
                      </p>
                      <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>
                        Read more →
                      </span>
                    </div>
                  </link_1.default>);
            })}
            </div>
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <link_1.default href="/blog" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: NAVY,
                fontWeight: 700,
                fontSize: "0.9375rem",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "2px solid ".concat(NAVY),
                transition: "background-color 0.15s",
            }}>
                View all posts
                <lucide_react_1.ArrowRight size={16}/>
              </link_1.default>
            </div>
          </div>
        </section>)}

      {/* ── FAQ ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(function (faq) { return ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a,
                    },
                }); }),
            }),
        }}/>
      <section style={{ backgroundColor: CREAM, padding: "96px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "48px",
        }}>
            Common questions
          </h2>
          <div>
            {faqs.map(function (faq) { return (<FAQItem key={faq.q} q={faq.q} a={faq.a}/>); })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
            backgroundColor: NAVY,
            padding: "96px 24px",
            textAlign: "center",
        }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
            Connect your Google listing. First posts written in minutes.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "36px" }}>
            Takes 2 minutes. No credit card. Cancel whenever.
          </p>
          <link_1.default href="/sign-up" style={{ textDecoration: "none" }}>
            <button style={{
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
        }}>
              Connect Your Google Listing — Free
              <lucide_react_1.ArrowRight size={18}/>
            </button>
          </link_1.default>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem", marginTop: "12px" }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
            backgroundColor: WARM_WHITE,
            borderTop: "1px solid ".concat(MIST),
            padding: "40px 24px",
        }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="flex flex-col md:flex-row items-center justify-between gap-5">
          <link_1.default href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "48px", width: "48px" }}/>
            <span style={{ fontWeight: 800, fontSize: "1.125rem", color: NAVY }}>
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </link_1.default>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
            { href: "/check", label: "Free AI Check" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#pricing", label: "Pricing" },
            { href: "/blog", label: "Blog" },
            { href: "mailto:hello@localbeacon.ai", label: "Contact" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/sign-in", label: "Sign In" },
        ].map(function (_a) {
            var href = _a.href, label = _a.label;
            return (<link_1.default key={href} href={href} style={{ color: SLATE, fontSize: "0.875rem", textDecoration: "none" }}>
                {label}
              </link_1.default>);
        })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4" style={{ marginTop: "8px" }}>
            <span style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.5 }}>Industries:</span>
            {[
            { href: "/for/plumbers", label: "Plumbers" },
            { href: "/for/hvac", label: "HVAC" },
            { href: "/for/dental", label: "Dentists" },
            { href: "/for/roofers", label: "Roofers" },
            { href: "/for/landscapers", label: "Landscapers" },
            { href: "/for/electricians", label: "Electricians" },
        ].map(function (_a) {
            var href = _a.href, label = _a.label;
            return (<link_1.default key={href} href={href} style={{ color: SLATE, fontSize: "0.8125rem", textDecoration: "none", opacity: 0.6 }}>
                {label}
              </link_1.default>);
        })}
          </div>

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <p style={{ color: SLATE, fontSize: "0.8125rem", margin: "0 0 4px" }}>
              <a href="tel:+16512636612" style={{ color: SLATE, textDecoration: "none" }}>(651) 263-6612</a>
              {" · "}Burnsville, MN 55337
            </p>
            <p style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7, margin: 0 }}>
              © {new Date().getFullYear()} LocalBeacon
            </p>
          </div>
        </div>
      </footer>
    </div>);
}
