"use client"

import Link from "next/link"
import { useState } from "react"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const SLATE = "#636E72"
const MIST = "#DFE6E9"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/check", label: "Check Your Score" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/sign-in", label: "Sign In" },
]

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
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
        className="flex items-center justify-between h-16 md:h-20"
      >
        <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "36px", width: "36px" }} className="md:w-14 md:h-14" />
          <span
            style={{
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
            className="text-base md:text-xl"
          >
            Local<span style={{ color: ORANGE }}>Beacon</span>.ai
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
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

        <div className="flex items-center gap-3">
          <Link href="/check" style={{ textDecoration: "none" }} className="shrink-0 hidden md:block">
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,107,53,0.3)",
                transition: "opacity 0.15s",
              }}
              className="text-xs md:text-[0.9375rem] px-3 py-1.5 md:px-[22px] md:py-[10px]"
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            >
              Get Started Free
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: NAVY,
                transform: mobileOpen ? "translateY(8px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: NAVY,
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: NAVY,
                transform: mobileOpen ? "translateY(-8px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: MIST, backgroundColor: "#fff" }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: SLATE, fontWeight: 500, textDecoration: "none", fontSize: "1rem" }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/check" onClick={() => setMobileOpen(false)}>
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                padding: "12px 0",
                fontSize: "1rem",
              }}
            >
              Get Started Free
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}
