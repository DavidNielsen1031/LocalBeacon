#!/bin/bash
# aeo-self-scan.sh — Daily self-scan of localbeacon.ai
# Runs our own AI readiness checker against our site
# Reports score and any regressions

set -euo pipefail

SITE_URL="https://localbeacon.ai"
API_URL="https://localbeacon.ai/api/ai-readiness"
SCORE_FILE="/Users/clawdbot/.openclaw/workspace/products/localbeacon/aeo-score-history.json"

echo "🔦 Running AEO self-scan on $SITE_URL..."

# Run the scan
RESULT=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$SITE_URL\"}" \
  --max-time 30)

# Parse results
SCORE=$(echo "$RESULT" | jq -r '.score // "null"')
PASSED=$(echo "$RESULT" | jq -r '.passed // "null"')
FAILED=$(echo "$RESULT" | jq -r '.failed // "null"')
TOTAL=$(echo "$RESULT" | jq -r '.total // "null"')

if [ "$SCORE" = "null" ]; then
  echo "❌ Scan failed — could not reach $SITE_URL"
  echo "Error: $(echo "$RESULT" | jq -r '.error // "unknown"')"
  exit 1
fi

# Get failing check names
FAILING=$(echo "$RESULT" | jq -r '[.checks[] | select(.passed == false) | .label] | join(", ")')

echo "Score: $SCORE/100 ($PASSED/$TOTAL passing)"
if [ -n "$FAILING" ] && [ "$FAILING" != "" ]; then
  echo "❌ Failing: $FAILING"
fi

# Load previous score
PREV_SCORE="unknown"
if [ -f "$SCORE_FILE" ]; then
  PREV_SCORE=$(jq -r '.[-1].score // "unknown"' "$SCORE_FILE" 2>/dev/null || echo "unknown")
fi

# Append to history
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
if [ ! -f "$SCORE_FILE" ]; then
  echo "[]" > "$SCORE_FILE"
fi

jq --argjson score "$SCORE" \
   --argjson passed "$PASSED" \
   --argjson failed "$FAILED" \
   --arg date "$DATE" \
   --arg failing "$FAILING" \
   '. + [{"date": $date, "score": $score, "passed": $passed, "failed": $failed, "failing": $failing}]' \
   "$SCORE_FILE" > "${SCORE_FILE}.tmp" && mv "${SCORE_FILE}.tmp" "$SCORE_FILE"

# Report
echo ""
echo "📊 Score history: $SCORE_FILE"
echo "Previous: $PREV_SCORE → Current: $SCORE"

# Alert on regression
if [ "$PREV_SCORE" != "unknown" ] && [ "$SCORE" -lt "$PREV_SCORE" ] 2>/dev/null; then
  DIFF=$((PREV_SCORE - SCORE))
  echo "🚨 REGRESSION: Score dropped by $DIFF points ($PREV_SCORE → $SCORE)"
  echo "Failing checks: $FAILING"
  echo ""
  echo "ALERT: LocalBeacon AEO score regressed from $PREV_SCORE to $SCORE. Failing: $FAILING"
fi

# Alert if not 100
if [ "$SCORE" -lt 100 ] 2>/dev/null; then
  echo "⚠️ Not at 100 yet. Failing: $FAILING"
fi

echo "✅ Self-scan complete"
