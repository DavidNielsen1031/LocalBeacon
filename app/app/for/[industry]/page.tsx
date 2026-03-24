import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industrySlugs } from "@/lib/industry-data";
import type { IndustryData } from "@/lib/industry-data";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const CREAM = "#FFF8F0";
const WARM_WHITE = "#FAFAF7";
const CHARCOAL = "#2D3436";
const SLATE = "#636E72";
const MIST = "#DFE6E9";

export function generateStaticParams() {
  return industrySlugs.map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const data = industries[slug];
  if (!data) return {};

  return {
    title: `LocalBeacon for ${data.plural} — ${data.headline}`,
    description: data.description,
    openGraph: {
      title: `LocalBeacon for ${data.plural} — Local Marketing on Autopilot`,
      description: data.description,
      url: `https://localbeacon.ai/for/${data.slug}`,
      siteName: "LocalBeacon.ai",
      type: "website",
    },
    alternates: {
      canonical: `https://localbeacon.ai/for/${data.slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const data = industries[slug];
  if (!data) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div style={{ backgroundColor: WARM_WHITE, minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Nav ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(250,250,247,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${MIST}`,
          padding: "12px 24px",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto" }}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2"
          >
            <img
              src="/logo-192.png?v=3"
              alt="LocalBeacon"
              style={{ height: "40px", width: "40px" }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.125rem",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/check"
              style={{
                color: SLATE,
                fontSize: "0.875rem",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Free AI Check
            </Link>
            <Link
              href="/#pricing"
              style={{
                color: SLATE,
                fontSize: "0.875rem",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Pricing
            </Link>
            <Link
              href="/sign-up"
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "8px 20px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: `${ORANGE}15`,
              color: ORANGE,
              fontWeight: 700,
              fontSize: "0.8125rem",
              padding: "6px 16px",
              borderRadius: "9999px",
              marginBottom: "24px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            For {data.plural}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.1,
              color: NAVY,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}
          >
            {data.headline}
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: CHARCOAL,
              maxWidth: "640px",
              margin: "0 auto 32px",
            }}
          >
            {data.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/check"
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Check Your AI Readiness — Free
            </Link>
            <Link
              href="/sign-up"
              style={{
                border: `2px solid ${MIST}`,
                color: NAVY,
                fontWeight: 600,
                fontSize: "1rem",
                padding: "12px 28px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Start Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        style={{
          backgroundColor: NAVY,
          padding: "32px 24px",
        }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto" }}
          className="flex flex-wrap items-center justify-center gap-12"
        >
          {data.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  color: ORANGE,
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section style={{ padding: "80px 24px", backgroundColor: CREAM }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.75rem",
              color: NAVY,
              textAlign: "center",
              marginBottom: "48px",
              letterSpacing: "-0.02em",
            }}
          >
            The marketing challenges {data.plural.toLowerCase()} face
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.painPoints.map((point) => (
              <div
                key={point.title}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "32px 24px",
                  border: `1px solid ${MIST}`,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>
                  {point.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: NAVY,
                    marginBottom: "8px",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    color: CHARCOAL,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How LocalBeacon Helps ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.75rem",
              color: NAVY,
              textAlign: "center",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            How LocalBeacon works for {data.plural.toLowerCase()}
          </h2>
          <p
            style={{
              textAlign: "center",
              color: SLATE,
              fontSize: "1rem",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            Everything your {data.name.toLowerCase()} business needs to get
            found locally — on autopilot.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map((feature, i) => (
              <div
                key={feature.title}
                style={{
                  backgroundColor: i % 2 === 0 ? CREAM : "#fff",
                  borderRadius: "16px",
                  padding: "32px",
                  border: `1px solid ${MIST}`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: `${ORANGE}15`,
                    color: ORANGE,
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    marginBottom: "16px",
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: NAVY,
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: CHARCOAL,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          backgroundColor: NAVY,
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            See how AI-ready your {data.name.toLowerCase()} business is
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1rem",
              marginBottom: "24px",
            }}
          >
            Free 19-signal scan. No signup required. Takes 30 seconds.
          </p>
          <Link
            href="/check"
            style={{
              display: "inline-block",
              backgroundColor: ORANGE,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 32px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Run Free AI Check →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 24px", backgroundColor: CREAM }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.75rem",
              color: NAVY,
              textAlign: "center",
              marginBottom: "48px",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.faqs.map((faq) => (
              <details
                key={faq.question}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: `1px solid ${MIST}`,
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "20px 24px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: NAVY,
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  {faq.question}
                </summary>
                <div
                  style={{
                    padding: "0 24px 20px",
                    color: CHARCOAL,
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section style={{ padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: NAVY,
              marginBottom: "16px",
            }}
          >
            Simple pricing. Start free.
          </h2>
          <div
            className="grid grid-cols-3 gap-4"
            style={{ marginBottom: "24px" }}
          >
            {[
              { plan: "Free", price: "$0", note: "1 location" },
              { plan: "Local Autopilot", price: "$49/mo", note: "3 locations" },
              { plan: "Agency", price: "$99/mo", note: "Unlimited" },
            ].map((tier) => (
              <div
                key={tier.plan}
                style={{
                  backgroundColor: CREAM,
                  borderRadius: "12px",
                  padding: "20px 16px",
                  border: `1px solid ${MIST}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    color: SLATE,
                    marginBottom: "4px",
                  }}
                >
                  {tier.plan}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: NAVY,
                  }}
                >
                  {tier.price}
                </div>
                <div style={{ fontSize: "0.75rem", color: SLATE }}>
                  {tier.note}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/#pricing"
            style={{
              color: ORANGE,
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
            }}
          >
            See full pricing details →
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          backgroundColor: NAVY,
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Ready to grow your {data.name.toLowerCase()} business?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              marginBottom: "24px",
              fontSize: "1rem",
            }}
          >
            Join {data.plural.toLowerCase()} who are getting more calls with
            less effort.
          </p>
          <Link
            href="/sign-up"
            style={{
              display: "inline-block",
              backgroundColor: ORANGE,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 32px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Get Started Free →
          </Link>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.8125rem",
              marginTop: "12px",
            }}
          >
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
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2"
          >
            <img
              src="/logo-192.png?v=3"
              alt="LocalBeacon"
              style={{ height: "48px", width: "48px" }}
            />
            <span
              style={{ fontWeight: 800, fontSize: "1.125rem", color: NAVY }}
            >
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "/check", label: "Free AI Check" },
              { href: "/#pricing", label: "Pricing" },
              { href: "mailto:hello@localbeacon.ai", label: "Contact" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: SLATE,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          <p style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            © {new Date().getFullYear()} LocalBeacon
          </p>
        </div>
      </footer>
    </div>
  );
}
