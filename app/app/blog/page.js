"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = BlogListingPage;
var link_1 = require("next/link");
var blog_1 = require("@/lib/blog");
var site_nav_1 = require("@/components/site-nav");
var site_footer_1 = require("@/components/site-footer");
var blog_filters_1 = require("./blog-filters");
exports.metadata = {
    title: "Blog — LocalBeacon.ai",
    description: "Actionable guides on AEO, local SEO, and AI search optimization for small businesses. Learn how to get found by customers and AI assistants.",
    openGraph: {
        title: "Blog — LocalBeacon.ai",
        description: "Actionable guides on AEO, local SEO, and AI search optimization for small businesses.",
        url: "https://localbeacon.ai/blog",
        siteName: "LocalBeacon.ai",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog — LocalBeacon.ai",
        description: "Actionable guides on AEO, local SEO, and AI search optimization for small businesses.",
    },
    alternates: { canonical: "https://localbeacon.ai/blog" },
};
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var WARM_WHITE = "#FAFAF7";
var CHARCOAL = "#2D3436";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
function PostCard(_a) {
    var _b;
    var post = _a.post;
    var categoryLabel = (_b = blog_1.CATEGORY_LABELS[post.category]) !== null && _b !== void 0 ? _b : post.category;
    return (<link_1.default href={"/blog/".concat(post.slug)} style={{ textDecoration: "none", display: "block" }}>
      <article style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid ".concat(MIST),
            padding: "28px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.2s, border-color 0.2s",
        }} className="hover-card">
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

        <h2 style={{
            color: NAVY,
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: "10px",
            letterSpacing: "-0.01em",
        }}>
          {post.title}
        </h2>

        <p style={{
            color: SLATE,
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            flex: 1,
            marginBottom: "16px",
        }}>
          {post.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <time dateTime={post.date} style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
          </time>
          <span style={{
            color: ORANGE,
            fontSize: "0.875rem",
            fontWeight: 600,
        }}>
            Read more →
          </span>
        </div>
      </article>
    </link_1.default>);
}
function BlogListingPage() {
    var posts = (0, blog_1.getAllPosts)();
    return (<div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "100vh" }}>
      <site_nav_1.SiteNav />

      <style dangerouslySetInnerHTML={{
            __html: ".hover-card:hover { box-shadow: 0 8px 24px rgba(27,42,74,0.08) !important; border-color: ".concat(ORANGE, "40 !important; }"),
        }}/>

      {/* Hero */}
      <section style={{ padding: "64px 24px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 style={{
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            color: NAVY,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
        }}>
            The LocalBeacon Blog
          </h1>
          <p style={{
            color: SLATE,
            fontSize: "1.125rem",
            lineHeight: 1.6,
            maxWidth: "560px",
            margin: "0 auto",
        }}>
            Practical guides on local SEO, answer engine optimization, and getting found by customers — and AI.
          </p>
        </div>
      </section>

      {/* Posts grid with filters */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <blog_filters_1.BlogFilters posts={posts}/>
        </div>
      </section>

      <site_footer_1.SiteFooter />
    </div>);
}
