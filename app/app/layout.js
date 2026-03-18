"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
var nextjs_1 = require("@clerk/nextjs");
require("./globals.css");
var dmSans = (0, google_1.DM_Sans)({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});
var fraunces = (0, google_1.Fraunces)({
    variable: "--font-fraunces",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
});
exports.metadata = {
    title: "LocalBeacon.ai — More calls. Less work. We handle your local marketing.",
    description: "LocalBeacon posts to your Google listing every week, creates local pages for every city you serve, and replies to your reviews — so you get found by more customers without lifting a finger. Start free.",
    keywords: ["local SEO", "Google Business Profile", "local marketing automation", "small business marketing", "GBP posts", "local visibility"],
    openGraph: {
        title: "LocalBeacon.ai — Your phone rings more. We handle everything.",
        description: "We handle your local marketing. Weekly Google posts, city pages, review replies — all on autopilot. $49/mo.",
        url: "https://localbeacon.ai",
        siteName: "LocalBeacon.ai",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "LocalBeacon.ai — More calls. Less work.",
        description: "We handle your local marketing. Weekly Google posts, city pages, review replies — all on autopilot.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://localbeacon.ai",
    },
};
function RootLayout(_a) {
    var children = _a.children;
    var publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    var content = (<html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "LocalBeacon.ai",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "url": "https://localbeacon.ai",
                "description": "AI-powered local visibility engine. Automates Google Business Profile posts, city pages, review responses, and AI search optimization for local businesses.",
                "offers": [
                    { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free" },
                    { "@type": "Offer", "price": "49", "priceCurrency": "USD", "name": "Solo", "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" } },
                    { "@type": "Offer", "price": "99", "priceCurrency": "USD", "name": "Agency", "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" } }
                ],
                "provider": {
                    "@type": "Organization",
                    "@id": "https://localbeacon.ai/#organization",
                    "name": "LocalBeacon",
                    "url": "https://localbeacon.ai",
                    "email": "support@localbeacon.ai",
                    "telephone": "+16512636612",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Burnsville",
                        "addressRegion": "MN",
                        "postalCode": "55337",
                        "addressCountry": "US"
                    },
                    "sameAs": [
                        "https://github.com/DavidNielsen1031/LocalBeacon"
                    ]
                }
            })
        }}/>
      </head>
      <body className={"".concat(dmSans.variable, " ").concat(fraunces.variable, " antialiased")} style={{ backgroundColor: "#FAFAF7", color: "#2D3436", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {children}
      </body>
    </html>);
    if (!publishableKey || publishableKey === "pk_test_placeholder") {
        return content;
    }
    return <nextjs_1.ClerkProvider publishableKey={publishableKey}>{content}</nextjs_1.ClerkProvider>;
}
