#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# LocalBeacon Blog Cron — Generate, commit, and push a new blog post
# Runs 2x/week (Tue + Thu 6am CST) via launchd
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_PREFIX="[blog-cron $(date '+%Y-%m-%d %H:%M')]"

cd "$PROJECT_DIR"

echo "$LOG_PREFIX Starting blog generation..."

# Generate one post from queue
python3 scripts/generate-blog-post.py --from-queue --count 1

# Check if any new files were created
NEW_FILES=$(git status --porcelain content/blog/ | grep '^?' | awk '{print $2}')

if [ -z "$NEW_FILES" ]; then
  echo "$LOG_PREFIX No new posts generated (queue might be empty)"
  exit 0
fi

# Commit and push to content branch
# Content goes to 'content' branch for preview, then gets merged to main
git checkout -B content 2>/dev/null || git checkout content 2>/dev/null || git checkout -b content
git add content/blog/ scripts/blog-keyword-queue.json
git commit -m "content: new blog post (auto-generated $(date +%Y-%m-%d))" --author="David Nielsen <davidnielsen1031@gmail.com>"
git push github content 2>/dev/null || git push origin content 2>/dev/null

# Also push to main for auto-deploy
git checkout main
git merge content --no-edit
git push github main 2>/dev/null || git push origin main 2>/dev/null

echo "$LOG_PREFIX ✅ Blog post published and deployed"
