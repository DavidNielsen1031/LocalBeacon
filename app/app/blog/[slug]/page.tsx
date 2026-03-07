import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllSlugs, getPostBySlug, getRelatedPosts, CATEGORY_LABELS } from "@/lib/blog"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ShareButtons } from "./share-buttons"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const CREAM = "#FFF8F0"
const WARM_WHITE = "#FAFAF7"
const CHARCOAL = "#2D3436"
const SLATE = "#636E72"
const MIST = "#DFE6E9"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — LocalBeacon.ai`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://localbeacon.ai/blog/${post.slug}`,
      siteName: "LocalBeacon.ai",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: { canonical: `https://localbeacon.ai/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.category, 3)
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category
  const publishDate = new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://localbeacon.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "LocalBeacon.ai",
      url: "https://localbeacon.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://localbeacon.ai/logo-192.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://localbeacon.ai/blog/${post.slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
    articleSection: categoryLabel,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://localbeacon.ai" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://localbeacon.ai/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://localbeacon.ai/blog/${post.slug}` },
    ],
  }

  return (
    <div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "100vh" }}>
      <SiteNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-content h2 { color: ${NAVY}; font-weight: 700; font-size: 1.5rem; margin: 2.5rem 0 1rem; letter-spacing: -0.01em; line-height: 1.3; }
            .blog-content h3 { color: ${NAVY}; font-weight: 700; font-size: 1.2rem; margin: 2rem 0 0.75rem; line-height: 1.35; }
            .blog-content p { color: ${CHARCOAL}; font-size: 1.0625rem; line-height: 1.75; margin: 0 0 1.25rem; }
            .blog-content ul, .blog-content ol { color: ${CHARCOAL}; font-size: 1.0625rem; line-height: 1.75; margin: 0 0 1.25rem; padding-left: 1.5rem; }
            .blog-content li { margin-bottom: 0.5rem; }
            .blog-content strong { color: ${NAVY}; font-weight: 700; }
            .blog-content a { color: ${ORANGE}; text-decoration: underline; text-underline-offset: 2px; }
            .blog-content a:hover { opacity: 0.8; }
            .blog-content blockquote { border-left: 3px solid ${ORANGE}; padding: 1rem 1.25rem; margin: 1.5rem 0; background: ${CREAM}; border-radius: 0 8px 8px 0; }
            .blog-content blockquote p { margin: 0; color: ${NAVY}; }
            .blog-content hr { border: none; border-top: 1px solid ${MIST}; margin: 2.5rem 0; }
            .blog-content code { background: ${CREAM}; padding: 2px 6px; border-radius: 4px; font-size: 0.9375rem; }
            .blog-content pre { background: ${NAVY}; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
            .blog-content pre code { background: transparent; padding: 0; color: inherit; }
            .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9375rem; }
            .blog-content th { text-align: left; padding: 12px 16px; background: ${CREAM}; color: ${NAVY}; font-weight: 700; border-bottom: 2px solid ${MIST}; }
            .blog-content td { padding: 12px 16px; border-bottom: 1px solid ${MIST}; color: ${CHARCOAL}; }
            .related-card:hover { box-shadow: 0 8px 24px rgba(27,42,74,0.08) !important; border-color: ${ORANGE}40 !important; }
          `,
        }}
      />

      <article style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <nav style={{ marginBottom: "24px", fontSize: "0.875rem" }}>
            <Link href="/" style={{ color: SLATE, textDecoration: "none" }}>Home</Link>
            <span style={{ color: MIST, margin: "0 8px" }}>/</span>
            <Link href="/blog" style={{ color: SLATE, textDecoration: "none" }}>Blog</Link>
            <span style={{ color: MIST, margin: "0 8px" }}>/</span>
            <span style={{ color: CHARCOAL }}>{post.title}</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
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

            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              {post.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: SLATE, fontSize: "0.9375rem" }}>
              <span>{post.author}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <time dateTime={post.date}>{publishDate}</time>
            </div>
          </header>

          {/* Body */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div
            style={{
              borderTop: `1px solid ${MIST}`,
              borderBottom: `1px solid ${MIST}`,
              padding: "24px 0",
              margin: "40px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <span style={{ color: NAVY, fontWeight: 600, fontSize: "0.9375rem" }}>
              Share this article
            </span>
            <ShareButtons slug={post.slug} title={post.title} />
          </div>
        </div>
      </article>

      {/* CTA Banner */}
      <section
        style={{
          backgroundColor: NAVY,
          padding: "56px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
              color: "#fff",
              letterSpacing: "-0.01em",
              marginBottom: "12px",
            }}
          >
            Check your AI readiness score — free
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "24px" }}>
            See how visible your business is to AI search engines. Takes 2 minutes.
          </p>
          <Link href="/check" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: ORANGE,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "13px 28px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
              }}
            >
              Run Free AI Check →
            </button>
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section style={{ padding: "72px 24px", backgroundColor: CREAM }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
                marginBottom: "36px",
                textAlign: "center",
              }}
            >
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => {
                const rpCategory = CATEGORY_LABELS[rp.category] ?? rp.category
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      className="related-card"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        border: `1px solid ${MIST}`,
                        padding: "24px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: `${ORANGE}15`,
                          color: ORANGE,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          alignSelf: "flex-start",
                          marginBottom: "12px",
                        }}
                      >
                        {rpCategory}
                      </span>
                      <h3
                        style={{
                          color: NAVY,
                          fontSize: "1.0625rem",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          marginBottom: "8px",
                        }}
                      >
                        {rp.title}
                      </h3>
                      <p style={{ color: SLATE, fontSize: "0.875rem", lineHeight: 1.5, flex: 1 }}>
                        {rp.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}
