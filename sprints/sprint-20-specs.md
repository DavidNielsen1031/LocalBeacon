# Sprint 20 — Make the Pricing Page Truthful

**Goal:** Close every gap between what the pricing page promises and what the code delivers.

---

## S20-01: DFY Fulfillment Flow (Size M)

**What:** When someone pays $499 DFY, trigger fulfillment.

**Where:** `app/api/webhook/route.ts`, new `app/api/dfy-fulfillment/route.ts`

**Build:**
- On `checkout.session.completed` where plan=DFY:
  - Email David (davidnielsen1031@gmail.com) with: customer name, email, business name, URL, plan
  - Set user plan to 'solo' in Supabase (1 month included)
  - Set `dfy_solo_expires_at` field on user record (30 days from now)
  - Show success page with: "Your DFY Setup is confirmed! Book your 30-minute onboarding call:" + Calendly link
- Create Calendly account/event type for "LocalBeacon DFY Onboarding — 30 min"
- On `dfy_solo_expires_at` passing, downgrade to free (add to existing subscription webhook logic)

---

## S20-02: Schema/llms.txt Monitoring Cron (Size M)

**What:** Monthly cron rescans customer sites to verify schema and llms.txt are still present.

**Where:** New `app/api/cron/monitor-assets/route.ts`

**Build:**
- Runs 1st of each month (same pattern as monthly-report cron, protected by CRON_SECRET)
- For each business with a website URL:
  - Fetch the site HTML, check for JSON-LD schema markup (same logic as ai-readiness scanner)
  - Fetch /llms.txt, check if it returns 200
  - If either is missing and was previously present: email the business owner an alert
  - Store check results in a new `asset_checks` table (business_id, check_type, status, checked_at)
- Dashboard: show a small badge on Schema/llms.txt pages: "✅ Detected on your site" or "⚠️ Not found — may have been removed"

---

## S20-03: Schema/llms.txt Quarterly Regeneration (Size S)

**What:** For Managed (agency) plan users, auto-regenerate schema and llms.txt quarterly.

**Where:** New `app/api/cron/quarterly-refresh/route.ts`

**Build:**
- Runs on Jan 1, Apr 1, Jul 1, Oct 1 (or check `last_refresh_at` > 90 days)
- For each agency-plan business:
  - Regenerate schema JSON-LD from current business data
  - Regenerate llms.txt from current business data
  - Email customer: "Your schema and llms.txt have been refreshed for Q2 2026. Here are the updated files:" + attach both
  - Update `last_refresh_at` timestamp

---

## S20-04: Free Plan Schema/llms.txt Gate (Size S)

**What:** Free users see a preview but can't copy/download. Solo+ gets full access.

**Where:** `app/dashboard/schema/page.tsx`, `app/dashboard/llms-txt/page.tsx`

**Build:**
- Fetch user's plan (add plan check to both pages)
- Free: show the generated output but blur/truncate it after first 5 lines. Show upgrade CTA: "Upgrade to Solo to copy this code"
- Solo+: full output + copy/download buttons (current behavior)

---

## S20-05: Competitor Limit from Plan (Size S)

**What:** Competitor page reads limits from plan-limits.ts instead of hardcoded 3.

**Where:** `app/dashboard/competitors/page.tsx`, `lib/plan-limits.ts`

**Build:**
- Fetch user's plan
- Free: 1 competitor
- Solo: 1 competitor (matching pricing page)
- Managed (agency): 5 competitors
- Replace hardcoded `>= 3` and `< 3` checks with dynamic limit
- Show: "1/1 competitors" or "2/5 competitors" based on plan

---

## S20-06: City Pages Monthly Reset Verification (Size XS)

**What:** Verify city page limit resets monthly (not lifetime cap).

**Where:** `lib/plan-limits.ts`

**Build:**
- The `getMonthlyUsage()` function already filters by `created_at >= startOfMonth`
- Verify this works for `city_page` content type
- If it's using a total count instead of monthly, fix it
- This should already work — just verify with a test

---

## S20-07: DFY Stripe Price Configuration (Size XS)

**What:** Ensure the Stripe DFY price is configured as a one-time price, not recurring.

**Where:** Stripe dashboard

**Build:**
- Check Stripe price `price_1TCRxpB0OqzCjZpvVebA66dn` — is it one-time or recurring?
- If recurring, create a new one-time price for $499 and update STRIPE_DFY_PRICE_ID in Vercel
- The checkout route already uses `mode: 'payment'` for DFY (just shipped)

---

## S20-08: Welcome Email for New Signups (Size S)

**What:** Send a welcome email when someone creates an account.

**Where:** `app/api/webhook/route.ts` or Clerk webhook

**Build:**
- On new user signup (Clerk webhook or first business creation):
  - Send welcome email from hello@perpetualagility.com
  - Include: "Welcome to LocalBeacon! Here's how to get started..."
  - For Managed users: add "Priority support: email support@localbeacon.ai — 24-hour response guaranteed."
  - Include unsubscribe link (CAN-SPAM)

---

## Priority Order
1. S20-07 (XS) — DFY Stripe price check (do first, prevents billing disaster)
2. S20-01 (M) — DFY fulfillment (next customer who pays $499 needs this)
3. S20-04 (S) — Schema/llms.txt gate (tighten free tier)
4. S20-05 (S) — Competitor limit
5. S20-06 (XS) — City pages monthly reset verify
6. S20-02 (M) — Monitoring cron
7. S20-03 (S) — Quarterly refresh
8. S20-08 (S) — Welcome email
