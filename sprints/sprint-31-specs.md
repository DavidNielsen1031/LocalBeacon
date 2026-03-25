# Sprint 31 — Cold Outreach Engine + Checker UX Fix

**Theme:** Revenue infrastructure — build the pipeline that finds, scores, and converts prospects
**Started:** 2026-03-25
**ETA:** 2-3 sessions

---

## S31-01: Fix Checker → Pricing Flow (Critical UX Bug)

**Problem:** After scanning a URL, the results page shows old 3-column pricing (Free/Autopilot/Launch Package) with broken buttons and stale copy. Says "Fixes 0 of 1 issue" / "Scan tools only — no automated fixes" which is wrong. Doesn't match the new 2-card pricing or brand names (Pro/Beacon Launch).

**Solution:**
- Replace the post-scan pricing cards with the shared `PricingSection` component (same one pricing page and homepage use)
- Add contextual messaging based on score:
  - **90-100:** "Your site is already well-optimized. Pro keeps it that way automatically."
  - **60-89:** "You're ahead of most competitors, but [X] gaps could cost you visibility. Pro fixes them."
  - **30-59:** "Your competitors are more visible to AI search. Pro closes the gap fast."
  - **0-29:** "AI search engines can barely find your business. This is urgent — Pro fixes everything."
- Fix the CTA buttons to actually work (link to `/check?plan=solo` checkout flow or sign-up)
- Remove the Free tier card entirely (the scan IS the free tier)

**Verification:** Run scanner on localbeacon.ai (high score), a random plumber site (likely low score), and verify both render correctly with appropriate messaging and working buttons.

**Measurable Outcome:** Checkout flow from scanner → pricing → sign-up works end to end.

---

## S31-02: Batch Scanner Script

**Problem:** Cold outreach requires scanning many URLs at once. Current checker is single-URL, browser-only, rate-limited.

**Solution:**
- Create `scripts/batch-scan.ts` — takes a CSV/JSON of URLs, runs all 26 AEO checks server-side
- Output: JSON with URL, score, passed/failed checks, timestamp
- Rate limiting: 2 concurrent, 1s delay between scans (don't hammer target sites)
- Can be run locally or as a cron
- Stores results in `data/scan-results/YYYY-MM-DD-{industry}-{city}.json`

**Verification:** Scan 10 plumber websites in Minneapolis, get valid scores for all.

**Measurable Outcome:** Can produce a scored prospect list in <5 minutes.

---

## S31-03: Prospect Discovery Pipeline

**Problem:** Need to find local business websites by industry + city to feed the batch scanner.

**Solution:**
- Create `scripts/find-prospects.ts` — uses Google Maps search (via web scraping or Places API if we get the key)
- Input: industry + city (e.g., "plumber", "Burnsville MN")
- Output: business name, website URL, address, phone
- Fallback: Brave Search API with queries like "plumber Burnsville MN" + filter for business sites
- Store results in `data/prospects/YYYY-MM-DD-{industry}-{city}.json`

**Verification:** Find 15+ plumber websites in the south metro Minneapolis area.

**Measurable Outcome:** Automated prospect list generation for any industry + city.

---

## S31-04: Cold Outreach Email System

**Problem:** No way to send personalized cold emails with scan results and competitor comparisons.

**Solution:**
- Create email templates in `lib/email.ts`:
  - **Template A: "Your Competitor is Winning"** — shows prospect's score vs a named competitor's higher score
  - **Template B: "You're Invisible to AI"** — shows their low score + what ChatGPT says when asked about their industry in their city
- CAN-SPAM compliance: physical address (Burnsville, MN 55337), unsubscribe link, honest subject lines
- Tracking table in Supabase: `outreach_emails` (prospect_email, business_name, template, sent_at, opened_at, clicked_at)
- Send via Resend (separate from transactional — use a different "from" like outreach@localbeacon.ai or david@localbeacon.ai)
- Script: `scripts/send-outreach.ts` — takes scan results + template, generates and sends

**Verification:** Send test email to David's email, verify formatting, links, unsubscribe works.

**Measurable Outcome:** Can send 20 personalized cold emails per batch with score comparisons.

---

## S31-05: Research Engine v1 (Signal Scanner)

**Problem:** We advertise "AI search landscape changes" in the monthly report, but have no system to actually track these changes. The checker has 26 static rules. Competitors' tools are also static — being dynamic is our edge.

**Solution:**
- Create `scripts/research/signal-scanner.ts` — daily cron that:
  1. Pulls RSS feeds: Google Search Central, Bing Webmaster, Moz, Ahrefs, SEMrush
  2. Searches X for: "AI search ranking", "llms.txt", "AEO", "AI overviews update", "schema markup"
  3. Searches Brave for recent articles on AI search optimization
  4. Claude evaluates each finding: Is this actionable for local businesses? Priority: high/medium/low
  5. Stores in `data/research/signals.json` with date, source, summary, priority, actionable (bool)
- Weekly digest posted to #local-beacon Discord channel
- Monthly: top findings included in subscriber intelligence report
- Website: add "Powered by 26+ signals, updated weekly" badge on checker page

**Verification:** Run scanner, get at least 5 relevant signals from the past week.

**Measurable Outcome:** Automated weekly intelligence feed, path to expanding checker rules.

---

## S31-06: Website Updates

**Problem:** Website doesn't reflect the outreach/intelligence capabilities we're building.

**Solution:**
- Add to landing page "How It Works" section: "Powered by [N] AI readiness signals — updated weekly as AI search evolves"
- Add Google Ads to competitor comparison (already done ✅)
- Update homepage SEO content to mention the research engine / intelligence report
- Add a "What's New" or changelog section showing recently added signals

**Verification:** Visual review of updated pages.

**Measurable Outcome:** Website communicates the dynamic, research-backed nature of the product.

---

## Priority Order

1. **S31-01** — Fix checker → pricing flow (broken UX, losing conversions NOW)
2. **S31-02** — Batch scanner (everything else depends on it)
3. **S31-03** — Prospect discovery (find targets)
4. **S31-04** — Cold outreach emails (start converting)
5. **S31-05** — Research engine v1 (intelligence flywheel)
6. **S31-06** — Website updates (reflect new capabilities)

---

## Teresa Gate

- **S31-01:** Evidence = David found the bug, buttons don't work, losing conversions. Ship it.
- **S31-02-04:** Evidence = zero revenue, zero customers, need outbound pipeline. Cold outreach is the #1 acquisition channel for local SaaS pre-product-market-fit.
- **S31-05:** Evidence = we're already selling "AI search landscape changes" in the monthly report. Need to deliver what we promise. Also creates content marketing flywheel.
- **S31-06:** Evidence = website should reflect product capabilities. Standard.

---

*Sprint plan posted for David's approval. No code until "approved" / "go" / "proceed".*
