#!/usr/bin/env python3
"""
LocalBeacon.ai — SEO Blog Post Generator
Uses Claude Sonnet to generate high-quality local marketing blog posts.

Usage:
  python3 scripts/generate-blog-post.py --keyword "topic"
  python3 scripts/generate-blog-post.py --from-queue
  python3 scripts/generate-blog-post.py --from-queue --count 3
"""

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
BLOG_DIR = PROJECT_DIR / "content" / "blog"
QUEUE_FILE = SCRIPT_DIR / "blog-keyword-queue.json"


def load_api_key() -> str:
    """Load Anthropic API key from environment."""
    # Source global env
    env_file = Path.home() / ".config" / "env" / "global.env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line.startswith("export "):
                line = line[7:]
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip().strip('"').strip("'")

    key = os.environ.get("LB_ANTHROPIC_API_KEY") or os.environ.get("REFINE_BACKLOG_ANTHROPIC_KEY") or os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        print("❌ No Anthropic API key found", file=sys.stderr)
        sys.exit(1)
    return key


def get_existing_posts() -> list[str]:
    """Get list of existing blog post slugs."""
    if not BLOG_DIR.exists():
        return []
    return [f.stem for f in BLOG_DIR.glob("*.md")]


def generate_post(keyword: str, category: str, api_key: str) -> str:
    """Call Claude Sonnet to generate a blog post."""
    import urllib.request

    existing = ", ".join(get_existing_posts())
    today = date.today().isoformat()

    prompt = f"""You are an expert SEO content writer for LocalBeacon.ai, an AI-powered local marketing platform for small businesses. Write a blog post targeting the keyword/topic provided.

RULES:
1. Write 1,200-1,800 words. Quality over quantity.
2. Write like a knowledgeable human, NOT like an AI. No "In today's digital landscape" or "Let's dive in" or "In conclusion." No exclamation marks in headers. No "game-changer" or "revolutionize."
3. Use concrete examples with specific numbers, cities, and business types. Mention real tools (Google Business Profile, ChatGPT, Perplexity, Claude) by name.
4. Include 4-6 H2 headings and 2-3 H3 subheadings. First H2 should appear within the first 200 words.
5. Include a FAQ section at the end with 3-4 questions in H3 tags.
6. Naturally mention LocalBeacon.ai 2-3 times (not in every section). Link to /check for the free scan and /pricing for plans.
7. Include at least one statistic or data point (cite source if possible).
8. Write for a 7th-grade reading level. Short paragraphs (2-3 sentences max). No jargon without explanation.
9. The meta description must be 150-160 characters and include the primary keyword.
10. The slug should be lowercase, hyphenated, 3-6 words.
11. Internal links: reference 2-3 of these existing posts where relevant (use relative /blog/slug format):
{existing}

OUTPUT FORMAT (exactly this, no code fences around the whole output):
---
title: "Your Title Here — Include Primary Keyword"
slug: "your-slug-here"
date: "{today}"
description: "150-160 char meta description with keyword"
category: "{category}"
industry: "general"
author: "LocalBeacon Team"
draft: true
---

[Post content in markdown here]

## Frequently Asked Questions

### Question 1?

Answer...

### Question 2?

Answer...

### Question 3?

Answer...

Write a blog post about: {keyword}"""

    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 4096,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"❌ API error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)

    for block in data.get("content", []):
        if block.get("type") == "text":
            return block["text"]

    print(f"❌ Unexpected response: {json.dumps(data)[:500]}", file=sys.stderr)
    sys.exit(1)


def save_post(content: str) -> tuple[str, Path]:
    """Save the generated post to content/blog/. Returns (slug, path)."""
    # Strip code fences
    content = re.sub(r"^```(?:markdown|md)?\s*\n", "", content)
    content = re.sub(r"\n```\s*$", "", content)

    # Extract slug from frontmatter
    slug_match = re.search(r'^slug:\s*"?([^"\n]+)"?', content, re.MULTILINE)
    if slug_match:
        slug = slug_match.group(1).strip()
    else:
        slug = f"post-{date.today().isoformat()}"

    output = BLOG_DIR / f"{slug}.md"
    if output.exists():
        slug = f"{slug}-{date.today().isoformat()}"
        output = BLOG_DIR / f"{slug}.md"

    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    output.write_text(content)
    return slug, output


def pop_from_queue() -> tuple[str, str] | None:
    """Pop the next unprocessed keyword from the queue."""
    if not QUEUE_FILE.exists():
        return None

    with open(QUEUE_FILE) as f:
        queue = json.load(f)

    for item in queue:
        if not item.get("processed"):
            return item["keyword"], item.get("category", "aeo")

    return None


def mark_processed(keyword: str, slug: str):
    """Mark a queue item as processed."""
    if not QUEUE_FILE.exists():
        return

    with open(QUEUE_FILE) as f:
        queue = json.load(f)

    for item in queue:
        if item["keyword"] == keyword and not item.get("processed"):
            item["processed"] = True
            item["slug"] = slug
            item["generated_date"] = date.today().isoformat()
            break

    with open(QUEUE_FILE, "w") as f:
        json.dump(queue, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Generate SEO blog posts for LocalBeacon.ai")
    parser.add_argument("--keyword", help="Target keyword/topic")
    parser.add_argument("--category", default="aeo", help="Post category")
    parser.add_argument("--from-queue", action="store_true", help="Pop next keyword from queue")
    parser.add_argument("--count", type=int, default=1, help="Number of posts to generate (with --from-queue)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated")
    args = parser.parse_args()

    api_key = load_api_key()
    generated = []

    if args.from_queue:
        for i in range(args.count):
            entry = pop_from_queue()
            if not entry:
                print("✅ Queue is empty — no more posts to generate")
                break
            keyword, category = entry
            print(f"\n📝 [{i+1}/{args.count}] From queue: \"{keyword}\" (category: {category})")

            if args.dry_run:
                print(f"   [DRY RUN] Would generate post for: {keyword}")
                continue

            print(f"🤖 Generating with Claude Sonnet...")
            content = generate_post(keyword, category, api_key)
            slug, path = save_post(content)
            mark_processed(keyword, slug)
            word_count = len(content.split())
            print(f"✅ Generated: {path}")
            print(f"   Slug: {slug} | Words: {word_count}")
            generated.append(slug)

    elif args.keyword:
        if args.dry_run:
            print(f"[DRY RUN] Would generate post for: {args.keyword}")
            return

        print(f"🤖 Generating blog post for: \"{args.keyword}\" (category: {args.category})")
        content = generate_post(args.keyword, args.category, api_key)
        slug, path = save_post(content)
        word_count = len(content.split())
        print(f"✅ Generated: {path}")
        print(f"   Slug: {slug} | Words: {word_count}")
        generated.append(slug)

    else:
        parser.print_help()
        sys.exit(1)

    if generated:
        print(f"\n🎯 Generated {len(generated)} post(s): {', '.join(generated)}")
        print(f"   Preview: https://localbeacon.ai/blog/{generated[0]}")


if __name__ == "__main__":
    main()
