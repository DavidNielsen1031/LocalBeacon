"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.generateMetadata = generateMetadata;
exports.default = IndustryPage;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var industry_data_1 = require("@/lib/industry-data");
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var CREAM = "#FFF8F0";
var WARM_WHITE = "#FAFAF7";
var CHARCOAL = "#2D3436";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
function generateStaticParams() {
    return industry_data_1.industrySlugs.map(function (industry) { return ({ industry: industry }); });
}
function generateMetadata(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var slug, data;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, params];
                case 1:
                    slug = (_c.sent()).industry;
                    data = industry_data_1.industries[slug];
                    if (!data)
                        return [2 /*return*/, {}];
                    return [2 /*return*/, {
                            title: "LocalBeacon for ".concat(data.plural, " \u2014 ").concat(data.headline),
                            description: data.description,
                            openGraph: {
                                title: "LocalBeacon for ".concat(data.plural, " \u2014 Local Marketing on Autopilot"),
                                description: data.description,
                                url: "https://localbeacon.ai/for/".concat(data.slug),
                                siteName: "LocalBeacon.ai",
                                type: "website",
                            },
                            alternates: {
                                canonical: "https://localbeacon.ai/for/".concat(data.slug),
                            },
                        }];
            }
        });
    });
}
function IndustryPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var slug, data, faqSchema;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, params];
                case 1:
                    slug = (_c.sent()).industry;
                    data = industry_data_1.industries[slug];
                    if (!data)
                        (0, navigation_1.notFound)();
                    faqSchema = {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: data.faqs.map(function (faq) { return ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        }); }),
                    };
                    return [2 /*return*/, (<div style={{ backgroundColor: WARM_WHITE, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>

      {/* ── Nav ── */}
      <nav style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 50,
                                backgroundColor: "rgba(250,250,247,0.95)",
                                backdropFilter: "blur(12px)",
                                borderBottom: "1px solid ".concat(MIST),
                                padding: "12px 24px",
                            }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="flex items-center justify-between">
          <link_1.default href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "40px", width: "40px" }}/>
            <span style={{
                                fontWeight: 800,
                                fontSize: "1.125rem",
                                color: NAVY,
                                letterSpacing: "-0.02em",
                            }}>
              Local<span style={{ color: ORANGE }}>Beacon</span>.ai
            </span>
          </link_1.default>
          <div className="flex items-center gap-4">
            <link_1.default href="/check" style={{
                                color: SLATE,
                                fontSize: "0.875rem",
                                textDecoration: "none",
                                fontWeight: 500,
                            }}>
              Free AI Check
            </link_1.default>
            <link_1.default href="/#pricing" style={{
                                color: SLATE,
                                fontSize: "0.875rem",
                                textDecoration: "none",
                                fontWeight: 500,
                            }}>
              Pricing
            </link_1.default>
            <link_1.default href="/sign-up" style={{
                                backgroundColor: ORANGE,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                padding: "8px 20px",
                                borderRadius: "8px",
                                textDecoration: "none",
                            }}>
              Get Started Free
            </link_1.default>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{
                                display: "inline-block",
                                backgroundColor: "".concat(ORANGE, "15"),
                                color: ORANGE,
                                fontWeight: 700,
                                fontSize: "0.8125rem",
                                padding: "6px 16px",
                                borderRadius: "9999px",
                                marginBottom: "24px",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}>
            For {data.plural}
          </span>
          <h1 style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                                lineHeight: 1.1,
                                color: NAVY,
                                letterSpacing: "-0.03em",
                                margin: "0 0 20px",
                            }}>
            {data.headline}
          </h1>
          <p style={{
                                fontSize: "1.125rem",
                                lineHeight: 1.6,
                                color: CHARCOAL,
                                maxWidth: "640px",
                                margin: "0 auto 32px",
                            }}>
            {data.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <link_1.default href="/check" style={{
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
                            }}>
              Check Your AI Readiness — Free
            </link_1.default>
            <link_1.default href="/sign-up" style={{
                                border: "2px solid ".concat(MIST),
                                color: NAVY,
                                fontWeight: 600,
                                fontSize: "1rem",
                                padding: "12px 28px",
                                borderRadius: "10px",
                                textDecoration: "none",
                            }}>
              Start Free
            </link_1.default>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{
                                backgroundColor: NAVY,
                                padding: "32px 24px",
                            }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }} className="flex flex-wrap items-center justify-center gap-12">
          {data.stats.map(function (stat) { return (<div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{
                                    color: ORANGE,
                                    fontWeight: 800,
                                    fontSize: "1.75rem",
                                    letterSpacing: "-0.02em",
                                }}>
                {stat.value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>
                {stat.label}
              </div>
            </div>); })}
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section style={{ padding: "80px 24px", backgroundColor: CREAM }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.75rem",
                                color: NAVY,
                                textAlign: "center",
                                marginBottom: "48px",
                                letterSpacing: "-0.02em",
                            }}>
            The marketing challenges {data.plural.toLowerCase()} face
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.painPoints.map(function (point) { return (<div key={point.title} style={{
                                    backgroundColor: "#fff",
                                    borderRadius: "16px",
                                    padding: "32px 24px",
                                    border: "1px solid ".concat(MIST),
                                }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>
                  {point.icon}
                </div>
                <h3 style={{
                                    fontWeight: 700,
                                    fontSize: "1.0625rem",
                                    color: NAVY,
                                    marginBottom: "8px",
                                }}>
                  {point.title}
                </h3>
                <p style={{
                                    color: CHARCOAL,
                                    fontSize: "0.9375rem",
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}>
                  {point.text}
                </p>
              </div>); })}
          </div>
        </div>
      </section>

      {/* ── How LocalBeacon Helps ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.75rem",
                                color: NAVY,
                                textAlign: "center",
                                marginBottom: "16px",
                                letterSpacing: "-0.02em",
                            }}>
            How LocalBeacon works for {data.plural.toLowerCase()}
          </h2>
          <p style={{
                                textAlign: "center",
                                color: SLATE,
                                fontSize: "1rem",
                                maxWidth: "600px",
                                margin: "0 auto 48px",
                            }}>
            Everything your {data.name.toLowerCase()} business needs to get
            found locally — on autopilot.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map(function (feature, i) { return (<div key={feature.title} style={{
                                    backgroundColor: i % 2 === 0 ? CREAM : "#fff",
                                    borderRadius: "16px",
                                    padding: "32px",
                                    border: "1px solid ".concat(MIST),
                                }}>
                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: "".concat(ORANGE, "15"),
                                    color: ORANGE,
                                    fontWeight: 800,
                                    fontSize: "0.875rem",
                                    marginBottom: "16px",
                                }}>
                  {i + 1}
                </div>
                <h3 style={{
                                    fontWeight: 700,
                                    fontSize: "1.0625rem",
                                    color: NAVY,
                                    marginBottom: "8px",
                                }}>
                  {feature.title}
                </h3>
                <p style={{
                                    color: CHARCOAL,
                                    fontSize: "0.9375rem",
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}>
                  {feature.text}
                </p>
              </div>); })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{
                                backgroundColor: NAVY,
                                padding: "64px 24px",
                                textAlign: "center",
                            }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.5rem",
                                color: "#fff",
                                marginBottom: "12px",
                            }}>
            See how AI-ready your {data.name.toLowerCase()} business is
          </h2>
          <p style={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "1rem",
                                marginBottom: "24px",
                            }}>
            Free 14-signal scan. No signup required. Takes 30 seconds.
          </p>
          <link_1.default href="/check" style={{
                                display: "inline-block",
                                backgroundColor: ORANGE,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1rem",
                                padding: "14px 32px",
                                borderRadius: "10px",
                                textDecoration: "none",
                            }}>
            Run Free AI Check →
          </link_1.default>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 24px", backgroundColor: CREAM }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.75rem",
                                color: NAVY,
                                textAlign: "center",
                                marginBottom: "48px",
                                letterSpacing: "-0.02em",
                            }}>
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.faqs.map(function (faq) { return (<details key={faq.question} style={{
                                    backgroundColor: "#fff",
                                    borderRadius: "12px",
                                    border: "1px solid ".concat(MIST),
                                    overflow: "hidden",
                                }}>
                <summary style={{
                                    padding: "20px 24px",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    color: NAVY,
                                    cursor: "pointer",
                                    listStyle: "none",
                                }}>
                  {faq.question}
                </summary>
                <div style={{
                                    padding: "0 24px 20px",
                                    color: CHARCOAL,
                                    fontSize: "0.9375rem",
                                    lineHeight: 1.7,
                                }}>
                  {faq.answer}
                </div>
              </details>); })}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section style={{ padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.5rem",
                                color: NAVY,
                                marginBottom: "16px",
                            }}>
            Simple pricing. Start free.
          </h2>
          <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "24px" }}>
            {[
                                { plan: "Free", price: "$0", note: "1 location" },
                                { plan: "Solo", price: "$49/mo", note: "3 locations" },
                                { plan: "Agency", price: "$99/mo", note: "Unlimited" },
                            ].map(function (tier) { return (<div key={tier.plan} style={{
                                    backgroundColor: CREAM,
                                    borderRadius: "12px",
                                    padding: "20px 16px",
                                    border: "1px solid ".concat(MIST),
                                }}>
                <div style={{
                                    fontWeight: 600,
                                    fontSize: "0.8125rem",
                                    color: SLATE,
                                    marginBottom: "4px",
                                }}>
                  {tier.plan}
                </div>
                <div style={{
                                    fontWeight: 800,
                                    fontSize: "1.25rem",
                                    color: NAVY,
                                }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: "0.75rem", color: SLATE }}>
                  {tier.note}
                </div>
              </div>); })}
          </div>
          <link_1.default href="/#pricing" style={{
                                color: ORANGE,
                                fontWeight: 600,
                                fontSize: "0.9375rem",
                                textDecoration: "none",
                            }}>
            See full pricing details →
          </link_1.default>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
                                backgroundColor: NAVY,
                                padding: "64px 24px",
                                textAlign: "center",
                            }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "1.75rem",
                                color: "#fff",
                                marginBottom: "12px",
                            }}>
            Ready to grow your {data.name.toLowerCase()} business?
          </h2>
          <p style={{
                                color: "rgba(255,255,255,0.6)",
                                marginBottom: "24px",
                                fontSize: "1rem",
                            }}>
            Join {data.plural.toLowerCase()} who are getting more calls with
            less effort.
          </p>
          <link_1.default href="/sign-up" style={{
                                display: "inline-block",
                                backgroundColor: ORANGE,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1rem",
                                padding: "14px 32px",
                                borderRadius: "10px",
                                textDecoration: "none",
                            }}>
            Get Started Free →
          </link_1.default>
          <p style={{
                                color: "rgba(255,255,255,0.35)",
                                fontSize: "0.8125rem",
                                marginTop: "12px",
                            }}>
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
                                { href: "/#pricing", label: "Pricing" },
                                { href: "mailto:hello@localbeacon.ai", label: "Contact" },
                                { href: "/privacy", label: "Privacy" },
                                { href: "/terms", label: "Terms" },
                            ].map(function (_a) {
                                var href = _a.href, label = _a.label;
                                return (<link_1.default key={href} href={href} style={{
                                        color: SLATE,
                                        fontSize: "0.875rem",
                                        textDecoration: "none",
                                    }}>
                {label}
              </link_1.default>);
                            })}
          </div>

          <p style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            © {new Date().getFullYear()} LocalBeacon
          </p>
        </div>
      </footer>
    </div>)];
            }
        });
    });
}
