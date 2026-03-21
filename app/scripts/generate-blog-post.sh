#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# LocalBeacon.ai — SEO Blog Post Generator
# Uses Claude Sonnet to generate high-quality local marketing blog posts
# Usage: ./scripts/generate-blog-post.sh [--keyword "topic"] [--category aeo|seo|local-marketing|industry-tips|case-studies] [--from-queue]
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BLOG_DIR="$PROJECT_DIR/content/blog"
QUEUE_FILE="$SCRIPT_DIR/blog-keyword-queue.json"

# Load API key
source ~/.config/env/global.env 2>/dev/null || true
ANTHROPIC_API_KEY="${REFINE_BACKLOG_ANTHROPIC_KEY:-${ANTHROPIC_API_KEY:-}}"

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ No Anthropic API key found" >&2
  exit 1
fi

# Parse args
KEYWORD=""
CATEGORY="aeo"
FROM_QUEUE=false
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --keyword) KEYWORD="$2"; shift 2 ;;
    --category) CATEGORY="$2"; shift 2 ;;
    --from-queue) FROM_QUEUE=true; shift ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

# If --from-queue, pop the next keyword from the queue
if $FROM_QUEUE; then
  if [ ! -f "$QUEUE_FILE" ]; then
    echo "❌ No queue file at $QUEUE_FILE" >&2
    exit 1
  fi
  # Pop next unprocessed entry
  ENTRY=$(python3 -c "
import json, sys
with open('$QUEUE_FILE') as f:
    q = json.load(f)
for item in q:
    if not item.get('processed'):
        print(json.dumps(item))
        break
else:
    print('EMPTY')
")
  if [ "$ENTRY" = "EMPTY" ]; then
    echo "✅ Queue is empty — no posts to generate"
    exit 0
  fi
  KEYWORD=$(echo "$ENTRY" | python3 -c "import json,sys; print(json.load(sys.stdin)['keyword'])")
  CATEGORY=$(echo "$ENTRY" | python3 -c "import json,sys; print(json.load(sys.stdin).get('category','aeo'))")
  echo "📝 From queue: \"$KEYWORD\" (category: $CATEGORY)"
fi

if [ -z "$KEYWORD" ]; then
  echo "❌ No keyword provided. Use --keyword \"topic\" or --from-queue" >&2
  exit 1
fi

TODAY=$(date +%Y-%m-%d)

# Get existing post slugs to avoid duplication and to generate internal links
EXISTING_POSTS=$(ls "$BLOG_DIR"/*.md 2>/dev/null | xargs -I{} basename {} .md | tr '\n' ', ')

echo "🤖 Generating blog post for: \"$KEYWORD\" (category: $CATEGORY)"

# Build the prompt
PROMPT=$(cat <<'PROMPT_EOF'
You are an expert SEO content writer for LocalBeacon.ai, an AI-powered local marketing platform for small businesses. Write a blog post targeting the keyword/topic provided.

RULES:
1. Write 1,200-1,800 words. Quality over quantity.
2. Write like a knowledgeable human, NOT like an AI. No "In today's digital landscape" or "Let's dive in" or "In conclusion." No exclamation marks in headers.
3. Use concrete examples with specific numbers, cities, and business types. Mention real tools (Google Business Profile, ChatGPT, Perplexity, Claude) by name.
4. Include 4-6 H2 headings and 2-3 H3 subheadings. First H2 should appear within the first 200 words.
5. Include a FAQ section at the end with 3-4 questions in H3 tags.
6. Naturally mention LocalBeacon.ai 2-3 times (not in every section). Link to /check for the free scan and /pricing for plans.
7. Include at least one statistic or data point (cite source if possible).
8. Write for a 7th-grade reading level. Short paragraphs (2-3 sentences max). No jargon without explanation.
9. The meta description must be 150-160 characters and include the primary keyword.
10. The slug should be lowercase, hyphenated, 3-6 words.
11. Internal links: reference 2-3 of these existing posts where relevant (use relative /blog/slug format):
EXISTING_POSTS_PLACEHOLDER

OUTPUT FORMAT (exactly this, no code fences):
---
title: "Your Title Here — Include Primary Keyword"
slug: "your-slug-here"
date: "DATE_PLACEHOLDER"
description: "150-160 char meta description with keyword"
category: "CATEGORY_PLACEHOLDER"
industry: "general"
author: "LocalBeacon Team"
---

[Post content in markdown here]

## Frequently Asked Questions

### Question 1?

Answer...

### Question 2?

Answer...

### Question 3?

Answer...
PROMPT_EOF
)

# Replace placeholders
PROMPT="${PROMPT//EXISTING_POSTS_PLACEHOLDER/$EXISTING_POSTS}"
PROMPT="${PROMPT//DATE_PLACEHOLDER/$TODAY}"
PROMPT="${PROMPT//CATEGORY_PLACEHOLDER/$CATEGORY}"

if $DRY_RUN; then
  echo "--- DRY RUN ---"
  echo "Keyword: $KEYWORD"
  echo "Category: $CATEGORY"
  echo "Prompt length: ${#PROMPT} chars"
  exit 0
fi

# Call Claude Sonnet
RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d "$(python3 -c "
import json, sys
prompt = '''$PROMPT'''
keyword = '''$KEYWORD'''
print(json.dumps({
    'model': 'claude-sonnet-4-20250514',
    'max_tokens': 4096,
    'messages': [
        {'role': 'user', 'content': f'Write a blog post about: {keyword}\n\n{prompt}'}
    ]
}))
")")

# Extract text content
CONTENT=$(echo "$RESPONSE" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    if 'content' in data:
        for block in data['content']:
            if block.get('type') == 'text':
                print(block['text'])
                break
    elif 'error' in data:
        print(f'ERROR: {data[\"error\"][\"message\"]}', file=sys.stderr)
        sys.exit(1)
except Exception as e:
    print(f'ERROR: {e}', file=sys.stderr)
    sys.exit(1)
")

if [ -z "$CONTENT" ]; then
  echo "❌ Empty response from API" >&2
  exit 1
fi

# Extract slug from frontmatter
SLUG=$(echo "$CONTENT" | grep '^slug:' | head -1 | sed 's/slug: *"\{0,1\}//' | sed 's/"\{0,1\} *$//')

if [ -z "$SLUG" ]; then
  # Generate slug from keyword
  SLUG=$(echo "$KEYWORD" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g' | head -c 50)
fi

OUTPUT_FILE="$BLOG_DIR/$SLUG.md"

if [ -f "$OUTPUT_FILE" ]; then
  echo "⚠️  File already exists: $OUTPUT_FILE — appending -new" >&2
  SLUG="${SLUG}-new"
  OUTPUT_FILE="$BLOG_DIR/$SLUG.md"
fi

# Strip any code fences the model might have added
CLEAN_CONTENT=$(echo "$CONTENT" | sed '/^```\(markdown\)\{0,1\}$/d')

echo "$CLEAN_CONTENT" > "$OUTPUT_FILE"

echo "✅ Blog post generated: $OUTPUT_FILE"
echo "   Slug: $SLUG"
echo "   Words: $(wc -w < "$OUTPUT_FILE" | tr -d ' ')"

# Mark as processed in queue if from queue
if $FROM_QUEUE; then
  python3 -c "
import json
with open('$QUEUE_FILE') as f:
    q = json.load(f)
for item in q:
    if item['keyword'] == '''$KEYWORD''' and not item.get('processed'):
        item['processed'] = True
        item['slug'] = '$SLUG'
        item['generated_date'] = '$TODAY'
        break
with open('$QUEUE_FILE', 'w') as f:
    json.dump(q, f, indent=2)
print('📋 Queue updated')
"
fi

echo "🎯 Done! Preview at: https://localbeacon.ai/blog/$SLUG"
