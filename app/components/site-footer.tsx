import Link from "next/link"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const WARM_WHITE = "#FAFAF7"
const SLATE = "#636E72"
const MIST = "#DFE6E9"

export function SiteFooter() {
  return (
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
          <img src="/logo-192.png?v=2" alt="LocalBeacon" style={{ height: "48px", width: "48px" }} />
          <span style={{ fontWeight: 800, fontSize: "1.125rem", color: NAVY }}>
            Local<span style={{ color: ORANGE }}>Beacon</span>.ai
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { href: "/check", label: "Free AI Check" },
            { href: "/#how-it-works", label: "How It Works" },
            { href: "/pricing", label: "Pricing" },
            { href: "/blog", label: "Blog" },
            { href: "mailto:hello@localbeacon.ai", label: "Contact" },
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

        <div className="flex flex-wrap items-center justify-center gap-4" style={{ marginTop: "8px" }}>
          <span style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.5 }}>Industries:</span>
          {[
            { href: "/for/plumbers", label: "Plumbers" },
            { href: "/for/hvac", label: "HVAC" },
            { href: "/for/dental", label: "Dentists" },
            { href: "/for/roofers", label: "Roofers" },
            { href: "/for/landscapers", label: "Landscapers" },
            { href: "/for/electricians", label: "Electricians" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: SLATE, fontSize: "0.8125rem", textDecoration: "none", opacity: 0.6 }}
            >
              {label}
            </Link>
          ))}
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
  )
}
