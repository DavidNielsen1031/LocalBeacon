"use client"

import { useState } from "react"
import { Link2, Twitter } from "lucide-react"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const MIST = "#DFE6E9"
const SLATE = "#636E72"

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://localbeacon.ai/blog/${slug}`

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={copyLink}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderRadius: "8px",
          border: `1px solid ${MIST}`,
          backgroundColor: "#fff",
          color: copied ? ORANGE : SLATE,
          fontSize: "0.8125rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "color 0.15s, border-color 0.15s",
        }}
      >
        <Link2 size={14} />
        {copied ? "Copied!" : "Copy link"}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderRadius: "8px",
          border: `1px solid ${MIST}`,
          backgroundColor: "#fff",
          color: SLATE,
          fontSize: "0.8125rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "color 0.15s",
        }}
      >
        <Twitter size={14} />
        Tweet
      </a>
    </div>
  )
}
