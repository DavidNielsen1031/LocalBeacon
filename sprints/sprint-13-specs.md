# Sprint 13 Specs — Outbound Engine

**Product:** LocalBeacon.ai
**Theme:** Revenue generation — build the machine that finds, pitches, and converts customers
**Co-planned with David:** 2026-03-18

---

## S13-01: Google Sheets CRM Pipeline — Size S

### Problem
We have no way to track prospects, outreach, or customers. Need a central pipeline David can see and Alexander can automate.

### Solution
Create a Google Sheet (David's workspace account) with 3 tabs: Prospects, Customers, Outreach Log. Wire it into the batch scanner and email pipeline so data flows automatically.

### Where
- Google Sheets via `gws` CLI (david@perpetualagility.com or davidnielsen1031@gmail.com)
- Shared with David for manual viewing/editing

### Verification
- [ ] Sheet created with 3 tabs and correct columns
- [ ] Alexander can read/write via `gws` CLI
- [ ] David can view and edit in browser

### Measurable Outcome
Single source of truth for every prospect and customer interaction.

---

## S13-02: Standalone AEO PDF Report Generator — Size M

### Problem
The existing PDF report route requires Clerk auth + Supabase + paid plan. For outreach, we need to generate branded PDF reports for ANY business without authentication.

### Solution
Standalone script that takes a URL, runs the AEO scan, and outputs a branded PDF report showing the score breakdown, failed checks with explanations, and a CTA to localbeacon.ai. Also support a competitor comparison mode: scan two URLs and show scores side by side.

### Where
- `products/localbeacon/scripts/generate-report.ts` (or `.py`)
- Reuse the existing AEO scan logic from `/api/ai-readiness/route.ts`
- Output PDFs to a local directory

### Verification
- [ ] `./generate-report.ts "https://example.com"` → produces a branded PDF
- [ ] `./generate-report.ts "https://target.com" --competitor "https://rival.com"` → side-by-side PDF
- [ ] PDF looks professional (logo, brand colors, clear score visualization)
- [ ] No auth, no Supabase, no Clerk required

### Measurable Outcome
Can generate a cold-outreach-ready PDF for any business in under 30 seconds.

---

## S13-03: Lead Prospecting Script — Size M

### Problem
Finding businesses to pitch is manual. We need automated discovery: given a city + industry, find local businesses with poor AEO scores.

### Solution
Script that takes an industry and city, finds local businesses (web search), extracts their website URLs and contact emails, runs AEO scans, and writes results to the Google Sheets CRM (Tab 1: Prospects) ranked by worst score first. Worst score = best prospect.

### Where
- `products/localbeacon/scripts/prospect.sh` (or `.ts`)
- Writes to Google Sheets CRM from S13-01
- Uses web search + web fetch for discovery, AEO scan API for scoring

### Verification
- [ ] `./prospect.sh "plumber" "Burnsville, MN"` → finds 10+ businesses with URLs + contact emails
- [ ] Runs AEO scans on all found businesses
- [ ] Writes results to Prospects tab in Google Sheet, sorted by score ascending
- [ ] Handles rate limits and failures gracefully

### Measurable Outcome
David can target any city + industry and get a ranked prospect list in under 10 minutes.

---

## S13-04: Cold Email Pipeline — Size L

### Problem
We need to send personalized cold emails at scale with PDF reports attached, CAN-SPAM compliant, tracked in the CRM.

### Solution
Script that reads prospects from the Google Sheet (or a CSV), generates personalized cold emails using a template with dynamic fields (business name, score, top failures, competitor name/score), attaches the PDF report, sends via Resend, and logs to Outreach Log tab. Must include: physical address (Perpetual Agility LLC), unsubscribe link, honest subject line.

### Where
- `products/localbeacon/scripts/send-outreach.ts` (or `.py`)
- Uses Resend API (RESEND_API_KEY already in Vercel, add to local env)
- Reads from Google Sheet Prospects tab, writes to Outreach Log tab
- Email template in `products/localbeacon/scripts/templates/outreach-email.html`

### Verification
- [ ] Sends test email to David's inbox with PDF attached
- [ ] CAN-SPAM compliant (physical address, unsubscribe, honest subject)
- [ ] Logs each send to Outreach Log tab with timestamp
- [ ] Updates prospect status from "Not Contacted" to "Emailed"
- [ ] Rate-limited (max 50/hour to protect sender reputation)

### Measurable Outcome
Can send 100 personalized cold emails per day with PDF reports attached, fully tracked.

---

## S13-05: Stripe Checkout Integration — Size M

### Problem
The onboarding flow has a `// TODO: Stripe checkout` comment. We literally cannot accept money.

### Solution
Wire Stripe checkout into the onboarding flow and pricing page. Three tiers: Solo ($49/mo), Agency ($99/mo), Done-For-You ($499/mo). Create Stripe products + prices if they don't exist. Webhook to update user plan in Supabase on successful payment.

### Where
- `products/localbeacon/app/app/api/checkout/route.ts` (exists, needs price IDs)
- `products/localbeacon/app/app/api/webhook/route.ts` (exists, verify Stripe webhook handling)
- `products/localbeacon/app/app/onboarding/page.tsx` (wire plan selection to checkout)
- `products/localbeacon/app/app/pricing/page.tsx` (add checkout buttons)
- Stripe dashboard: create products + prices under Perpetual Agility LLC account
- Vercel env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, price IDs

### Verification
- [ ] Clicking "Start Solo" on pricing page → redirects to Stripe Checkout
- [ ] Successful payment → redirects to dashboard with plan updated
- [ ] Webhook updates user's plan in Supabase
- [ ] All 3 tiers work (Solo, Agency, Done-For-You)
- [ ] Test mode works end-to-end before going live

### Measurable Outcome
A customer can go from localbeacon.ai → pricing → pay → dashboard with an active subscription.

---

## Sprint 13 Acceptance Criteria
- [ ] CRM pipeline exists and is being written to by scripts
- [ ] Can generate PDF reports for any URL without auth
- [ ] Can discover and score prospects for any city + industry
- [ ] Can send cold emails with reports attached at scale
- [ ] Can accept payment for all 3 tiers
- [ ] First batch of 20 real prospects identified and scored for Twin Cities area

---

## Sprint 13 Priority Order
1. S13-01 (CRM Sheet) — everything else writes to this
2. S13-02 (PDF Generator) — needed for outreach emails
3. S13-05 (Stripe) — needed to accept money
4. S13-03 (Prospecting) — find the targets
5. S13-04 (Email Pipeline) — send the pitches

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
