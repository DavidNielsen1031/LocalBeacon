"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteNav = SiteNav;
var link_1 = require("next/link");
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
function SiteNav() {
    return (<nav id="main-nav" style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "#fff",
            borderBottom: "1px solid ".concat(MIST),
        }}>
      <script dangerouslySetInnerHTML={{
            __html: "\n            (function(){\n              var nav = document.getElementById('main-nav');\n              window.addEventListener('scroll', function(){\n                if(window.scrollY > 8){\n                  nav.style.boxShadow = '0 2px 16px rgba(27,42,74,0.08)';\n                } else {\n                  nav.style.boxShadow = 'none';\n                }\n              });\n            })();\n          ",
        }}/>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }} className="flex items-center justify-between h-20">
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

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/check", label: "Free AI Check" },
            { href: "/blog", label: "Blog" },
            { href: "/pricing", label: "Pricing" },
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
    </nav>);
}
