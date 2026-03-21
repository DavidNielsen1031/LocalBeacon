#!/bin/bash
# LocalBeacon Blog Content Cron
# Generates a blog post from the keyword queue, commits, and submits to GSC
# Schedule: Mon + Thu at 6am CST
# Usage: bash scripts/blog-cron.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# Lock file — prevent overlapping cron runs
LOCK_FILE="/tmp/localbeacon-blog-cron.lock"
if [ -f "$LOCK_FILE" ]; then
  echo "⚠️ [$(date)] Cron already running (lock: $LOCK_FILE). Exiting."
  exit 0
fi
trap "rm -f '$LOCK_FILE'" EXIT
touch "$LOCK_FILE"

# Source env
if [ -f "$HOME/.config/env/global.env" ]; then
  source "$HOME/.config/env/global.env"
fi

echo "📝 [$(date)] Blog cron starting..."

# Generate one post from queue (5 min timeout)
timeout 300 python3 scripts/generate-blog-post.py --from-queue --count 1 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "❌ Blog generation failed (exit code $EXIT_CODE)"
  exit 1
fi

# Find the most recently modified .md file in content/blog/
NEW_POST=$(find content/blog/ -name "*.md" -mmin -5 -type f | head -1)
if [ -z "$NEW_POST" ]; then
  echo "⚠️ No new post file found in content/blog/"
  exit 0
fi

SLUG=$(basename "$NEW_POST" .md)

# Validate slug is safe (alphanumeric + hyphens only, no injection)
if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "❌ Invalid slug: $SLUG — aborting (possible injection)"
  exit 1
fi

echo "📄 New post: $SLUG"

# Git commit
git config user.email "davidnielsen1031@gmail.com"
git config user.name "David Nielsen"
git add "$NEW_POST" scripts/blog-keyword-queue.json
git commit -m "content: new blog post — $SLUG" || true

# Push to content branch (create if needed)
git push github HEAD:content 2>/dev/null || {
  echo "⚠️ Push to content branch failed, trying main"
  git push github HEAD:main 2>/dev/null || true
}

# Submit URL to GSC for indexing
BLOG_URL="https://localbeacon.ai/blog/$SLUG"
echo "🔍 Submitting to GSC: $BLOG_URL"
python3 - "$BLOG_URL" "$HOME/.openclaw/workspace/secrets/gws-agent-key.json" <<'PYEOF'
import sys, json, urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import Request

blog_url = sys.argv[1]
key_file = sys.argv[2]

try:
    creds = service_account.Credentials.from_service_account_file(
        key_file,
        scopes=['https://www.googleapis.com/auth/indexing'],
        subject='david@perpetualagility.com'
    )
    creds.refresh(Request())
    url = 'https://indexing.googleapis.com/v3/urlNotifications:publish'
    body = json.dumps({'url': blog_url, 'type': 'URL_UPDATED'}).encode()
    req = urllib.request.Request(url, data=body, headers={
        'Authorization': f'Bearer {creds.token}',
        'Content-Type': 'application/json'
    })
    resp = urllib.request.urlopen(req, timeout=15)
    print(f'✅ GSC indexing submitted: {resp.status}')
except Exception as e:
    print(f'⚠️ GSC indexing failed (non-fatal): {e}')
PYEOF

echo "✅ [$(date)] Blog cron complete: $SLUG"
