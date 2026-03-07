#!/usr/bin/env bash
#
# generate-blog-post.sh — Generate a new blog post using the Claude API
#
# Usage:
#   ./scripts/generate-blog-post.sh "Your Blog Post Title Here"
#   ./scripts/generate-blog-post.sh "Your Blog Post Title Here" --category aeo --industry plumbers
#
# Environment:
#   ANTHROPIC_API_KEY — Required. Your Anthropic API key.
#
# This script can be called from an OpenClaw cron job.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BLOG_DIR="$PROJECT_DIR/content/blog"

# ── Parse arguments ──────────────────────────────────────────────────────────

TITLE="${1:-}"
CATEGORY="seo"
INDUSTRY="general"

if [ -z "$TITLE" ]; then
  echo "Usage: $0 \"Blog Post Title\" [--category aeo|seo|local-marketing|industry-tips|case-studies] [--industry plumbers|general|etc]"
  exit 1
fi

shift
while [[ $# -gt 0 ]]; do
  case "$1" in
    --category) CATEGORY="$2"; shift 2 ;;
    --industry) INDUSTRY="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Validate environment ────────────────────────────────────────────────────

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "Error: ANTHROPIC_API_KEY environment variable is not set."
  exit 1
fi

# ── Generate slug ────────────────────────────────────────────────────────────

SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
DATE=$(date +%Y-%m-%d)
FILENAME="$BLOG_DIR/$SLUG.md"

if [ -f "$FILENAME" ]; then
  echo "Error: File already exists: $FILENAME"
  exit 1
fi

mkdir -p "$BLOG_DIR"

echo "Generating blog post: $TITLE"
echo "  Slug: $SLUG"
echo "  Category: $CATEGORY"
echo "  Industry: $INDUSTRY"
echo ""

# ── Call Claude API ──────────────────────────────────────────────────────────

SYSTEM_PROMPT="You are a blog writer for LocalBeacon.ai, an AI-powered local visibility engine for small businesses. Write blog posts that are genuinely helpful, actionable, and written in a friendly but knowledgeable tone — like a smart friend explaining something, not a corporate blog.

Target audience: local business owners (plumbers, dentists, HVAC companies, roofers, landscapers, electricians, etc).

Rules:
- Write 800-1200 words
- Use ## for section headings, ### for subsections
- Include a FAQ section at the end with 3-5 questions (using **bold** for questions)
- Be specific and actionable — give real advice, not vague platitudes
- Mention LocalBeacon naturally when relevant (not forced)
- Write in second person (you/your)
- No fluff, no filler, no corporate jargon
- Include practical examples when possible

Output ONLY the markdown body content (no frontmatter — that will be added separately). Start with a compelling opening paragraph."

USER_PROMPT="Write a blog post titled: \"$TITLE\"

Category: $CATEGORY
Industry focus: $INDUSTRY

Write the full article body in markdown."

RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d "$(jq -n \
    --arg system "$SYSTEM_PROMPT" \
    --arg user "$USER_PROMPT" \
    '{
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: $system,
      messages: [{ role: "user", content: $user }]
    }')")

# Extract the text content
BODY=$(echo "$RESPONSE" | jq -r '.content[0].text // empty')

if [ -z "$BODY" ]; then
  echo "Error: Failed to generate content. API response:"
  echo "$RESPONSE" | jq '.'
  exit 1
fi

# ── Generate meta description ───────────────────────────────────────────────

DESC_RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d "$(jq -n \
    --arg user "Write a single SEO meta description (max 155 characters) for a blog post titled \"$TITLE\". Output ONLY the description text, nothing else." \
    '{
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: $user }]
    }')")

DESCRIPTION=$(echo "$DESC_RESPONSE" | jq -r '.content[0].text // empty' | head -1)

if [ -z "$DESCRIPTION" ]; then
  DESCRIPTION="Learn about $TITLE — actionable insights for local businesses from LocalBeacon.ai."
fi

# ── Write the markdown file ─────────────────────────────────────────────────

cat > "$FILENAME" <<FRONTMATTER
---
title: "$TITLE"
slug: "$SLUG"
date: "$DATE"
description: "$DESCRIPTION"
category: "$CATEGORY"
industry: "$INDUSTRY"
author: "LocalBeacon Team"
---

$BODY
FRONTMATTER

echo ""
echo "Blog post generated successfully!"
echo "  File: $FILENAME"
echo "  Words: $(echo "$BODY" | wc -w | tr -d ' ')"
echo ""
echo "Preview the first 5 lines:"
head -15 "$FILENAME"
