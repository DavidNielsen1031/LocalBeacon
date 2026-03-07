import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, CATEGORY_LABELS, type BlogPostMeta } from "@/lib/blog"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { BlogFilters } from "./blog-filters"

export const metadata: Metadata = {
  title: "Blog — LocalBeacon.ai",
  description:
    "Actionable guides on AEO, local SEO, and AI search optimization for small businesses. Learn how to get found by customers and AI assistants.",
  openGraph: {
    title: "Blog — LocalBeacon.ai",
    description:
      "Actionable guides on AEO, local SEO, and AI search optimization for small businesses.",
    url: "https://localbeacon.ai/blog",
    siteName: "LocalBeacon.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — LocalBeacon.ai",
    description:
      "Actionable guides on AEO, local SEO, and AI search optimization for small businesses.",
  },
  alternates: { canonical: "https://localbeacon.ai/blog" },
}

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const WARM_WHITE = "#FAFAF7"
const CHARCOAL = "#2D3436"
const SLATE = "#636E72"
const MIST = "#DFE6E9"

function PostCard({ post }: { post: BlogPostMeta }) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
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
        className="hover-card"
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

        <h2
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
        </h2>

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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <time
            dateTime={post.date}
            style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}
          >
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span
            style={{
              color: ORANGE,
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Read more →
          </span>
        </div>
      </article>
    </Link>
  )
}

export default function BlogListingPage() {
  const posts = getAllPosts()

  return (
    <div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "100vh" }}>
      <SiteNav />

      <style
        dangerouslySetInnerHTML={{
          __html: `.hover-card:hover { box-shadow: 0 8px 24px rgba(27,42,74,0.08) !important; border-color: ${ORANGE}40 !important; }`,
        }}
      />

      {/* Hero */}
      <section style={{ padding: "64px 24px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            The LocalBeacon Blog
          </h1>
          <p
            style={{
              color: SLATE,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Practical guides on local SEO, answer engine optimization, and getting found by customers — and AI.
          </p>
        </div>
      </section>

      {/* Posts grid with filters */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <BlogFilters posts={posts} />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
