#!/usr/bin/env bash
# LocalBeacon E2E Integration Tests
# Tests production endpoints without requiring authentication
# Usage: bash e2e-test.sh

set -euo pipefail

BASE_URL="https://localbeacon.ai"
PASS=0
FAIL=0
TOTAL=0

GREEN='\033[0;32m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

pass() {
  echo -e "  ${GREEN}✓ PASS${RESET} — $1"
  ((PASS++)) || true
  ((TOTAL++)) || true
}

fail() {
  echo -e "  ${RED}✗ FAIL${RESET} — $1"
  ((FAIL++)) || true
  ((TOTAL++)) || true
}

echo ""
echo -e "${BOLD}LocalBeacon E2E Integration Tests${RESET}"
echo -e "Target: ${BASE_URL}"
echo -e "$(date)"
echo "────────────────────────────────────────"

# ── Test 1: Health check ──────────────────────────────────────────────────────
echo ""
echo "1. Health check"
HEALTH_BODY=$(curl -sf --max-time 10 "${BASE_URL}/api/health" 2>/dev/null || true)
HEALTH_STATUS=$(curl -o /dev/null -sw "%{http_code}" --max-time 10 "${BASE_URL}/api/health" 2>/dev/null || echo "000")

if [[ "$HEALTH_STATUS" == "200" ]] && echo "$HEALTH_BODY" | grep -q '"status"' && echo "$HEALTH_BODY" | grep -q '"ok"'; then
  pass "GET /api/health → 200 + {\"status\":\"ok\"} (got: $HEALTH_BODY)"
else
  fail "GET /api/health → expected 200 + {\"status\":\"ok\"}, got HTTP $HEALTH_STATUS body=$HEALTH_BODY"
fi

# ── Test 2: Landing page loads ────────────────────────────────────────────────
echo ""
echo "2. Landing page"
LANDING_STATUS=$(curl -o /tmp/lb_landing.html -sw "%{http_code}" --max-time 10 -L "${BASE_URL}/" 2>/dev/null || echo "000")
LANDING_CONTAINS=""
if [[ -f /tmp/lb_landing.html ]]; then
  LANDING_CONTAINS=$(grep -i "LocalBeacon" /tmp/lb_landing.html | head -1 || true)
fi

if [[ "$LANDING_STATUS" == "200" ]] && [[ -n "$LANDING_CONTAINS" ]]; then
  pass "GET / → 200 + HTML contains 'LocalBeacon'"
else
  fail "GET / → expected 200 + 'LocalBeacon' in body, got HTTP $LANDING_STATUS (contains: $([ -n "$LANDING_CONTAINS" ] && echo yes || echo no))"
fi
rm -f /tmp/lb_landing.html

# ── Test 3: Pricing page ──────────────────────────────────────────────────────
echo ""
echo "3. Pricing page"
PRICING_STATUS=$(curl -o /dev/null -sw "%{http_code}" --max-time 10 -L "${BASE_URL}/pricing" 2>/dev/null || echo "000")

if [[ "$PRICING_STATUS" == "200" ]]; then
  pass "GET /pricing → 200"
else
  fail "GET /pricing → expected 200, got HTTP $PRICING_STATUS"
fi

# ── Test 4: Checkout API rejects unauthenticated ──────────────────────────────
echo ""
echo "4. Checkout API (unauthenticated)"
CHECKOUT_STATUS=$(curl -o /dev/null -sw "%{http_code}" --max-time 10 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{}' \
  "${BASE_URL}/api/checkout" 2>/dev/null || echo "000")

if [[ "$CHECKOUT_STATUS" == "401" ]]; then
  pass "POST /api/checkout (no auth) → 401 Unauthorized"
else
  fail "POST /api/checkout (no auth) → expected 401, got HTTP $CHECKOUT_STATUS"
fi

# ── Test 5: AI readiness API rejects unauthenticated ─────────────────────────
echo ""
echo "5. AI readiness API (unauthenticated)"
AIREADY_STATUS=$(curl -o /dev/null -sw "%{http_code}" --max-time 10 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{}' \
  "${BASE_URL}/api/ai-readiness" 2>/dev/null || echo "000")

# ai-readiness is a PUBLIC endpoint (no auth required) — rate-limited by IP
# Empty body returns 400 (URL is required), which is correct behavior
if [[ "$AIREADY_STATUS" == "400" ]] || [[ "$AIREADY_STATUS" == "429" ]]; then
  pass "POST /api/ai-readiness (empty body) → $AIREADY_STATUS (public endpoint, correct validation)"
else
  fail "POST /api/ai-readiness (empty body) → expected 400 (URL required) or 429 (rate limit), got HTTP $AIREADY_STATUS"
fi

# ── Test 6: Sitemap exists ────────────────────────────────────────────────────
echo ""
echo "6. Sitemap"
SITEMAP_STATUS=$(curl -o /dev/null -sw "%{http_code}" --max-time 10 "${BASE_URL}/sitemap.xml" 2>/dev/null || echo "000")

if [[ "$SITEMAP_STATUS" == "200" ]]; then
  pass "GET /sitemap.xml → 200"
else
  fail "GET /sitemap.xml → expected 200, got HTTP $SITEMAP_STATUS"
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "────────────────────────────────────────"
if [[ $FAIL -eq 0 ]]; then
  echo -e "${GREEN}${BOLD}${PASS}/${TOTAL} tests passed${RESET}"
  exit 0
else
  echo -e "${RED}${BOLD}${PASS}/${TOTAL} tests passed${RESET} (${FAIL} failed)"
  exit 1
fi
