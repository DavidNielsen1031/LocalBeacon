"use client"

import { useState } from "react"
import Link from "next/link"
import { CATEGORY_LABELS, type BlogPostMeta } from "@/lib/blog-shared"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const SLATE = "#636E72"
const MIST = "#DFE6E9"

const POSTS_PER_PAGE = 12

const ALL_CATEGORIES = [
  { key: "all" as const, label: "All" },
  ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key: key as keyof typeof CATEGORY_LABELS, label })),
]

export function BlogFilters({ posts }: { posts: BlogPostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [page, setPage] = useState(1)

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleCategory(key: string) {
    setActiveCategory(key)
    setPage(1)
  }

  return (
    <>
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        {ALL_CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCategory(key)}
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              backgroundColor: activeCategory === key ? ORANGE : `${MIST}`,
              color: activeCategory === key ? "#fff" : SLATE,
              transition: "background-color 0.15s, color 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {paginated.length === 0 ? (
        <p style={{ textAlign: "center", color: SLATE, padding: "48px 0" }}>
          No posts in this category yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((post) => (
            <PostCardClient key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "48px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: page === p ? "none" : `1px solid ${MIST}`,
                backgroundColor: page === p ? ORANGE : "#fff",
                color: page === p ? "#fff" : SLATE,
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function PostCardClient({ post }: { post: BlogPostMeta }) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
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
          <span style={{ color: SLATE, fontSize: "0.8125rem" }}>{post.readingTime} min read</span>
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
          <time dateTime={post.date} style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Read more →</span>
        </div>
      </article>
    </Link>
  )
}
