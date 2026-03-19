# Sprint 20 — Close Backend Gaps

**Goal:** Every pricing page promise has working code behind it. No free leaks, no dead references.

---

## S20-01: Enforce plan limits on ungated routes (Size S)

**Problem:** `/api/ai-readiness` (dashboard scan) and `/api/generate/llms-txt` have no plan enforcement. Free users get unlimited access.

**Fix:**
- `/api/ai-readiness` POST handler: add `enforceLimits(userId, 'aeo_scan')`. Free = 1/mo, Solo = unlimited.
- `/api/generate/llms-txt` POST handler: add `enforceLimits(userId, 'llms_txt')`. Free = 0 (preview only via UpgradeGate), Solo = unlimited.
- Add `'llms_txt'` to the ContentType union and PLAN_LIMITS in `lib/plan-limits.ts` (free: 0, solo: null, agency: null).

**Files:** `app/api/ai-readiness/route.ts`, `app/api/generate/llms-txt/route.ts`, `lib/plan-limits.ts`

---

## S20-02: Fix competitor limit (Size S)

**Problem:** Competitor page hardcodes `competitors.length >= 3`. Should respect plan limits (free=1, solo=5).

**Fix:**
- In `app/dashboard/competitors/page.tsx`, fetch the user's plan and read the competitor limit from plan-limits.
- Replace hardcoded `>= 3` with dynamic limit.
- Show usage counter: "1 of 1 competitors (Free)" or "2 of 5 competitors (Solo)".

**Files:** `app/dashboard/competitors/page.tsx`

---

## S20-03: DFY webhook — auto-upgrade to Solo for 30 days (Size M)

**Problem:** After DFY $499 payment, user stays on Free. We promise "1 month of Solo included."

**Fix:**
- In `app/api/webhook/route.ts`, handle `checkout.session.completed` where `metadata.plan === 'DFY'`.
- On DFY purchase: set user's plan to `solo` and add `plan_expires_at` = now + 30 days in the `users` table.
- Add `plan_expires_at` column to users table (nullable timestamp). Create a Supabase migration.
- In `getUserPlan()` in `lib/plan-limits.ts`: if plan is 'solo' and `plan_expires_at` is in the past, downgrade to 'free'.

**Files:** `app/api/webhook/route.ts`, `lib/plan-limits.ts`, new migration file

---

## S20-04: Monthly report cron (Size S)

**Problem:** Monthly report email route exists but nothing triggers it. We promise "Monthly progress report emailed to you" for Solo.

**Fix:**
- Create `app/api/cron/monthly-report/route.ts` — a GET endpoint protected by CRON_SECRET.
- It queries all Solo/Agency users, calls the existing `sendMonthlyReportEmail` for each.
- Add a `vercel.json` cron entry: runs 1st of every month at 9am CST.

**Files:** new `app/api/cron/monthly-report/route.ts`, `vercel.json`

---

## S20-05: Clean up dead AGENCY references (Size S)

**Problem:** AGENCY plan still exists in stripe.ts, plan-limits.ts, and checkout route but no pricing tier uses it.

**Fix:**
- Keep the AGENCY entry in stripe.ts (the Stripe product exists, no harm keeping the mapping).
- Keep `agency` in plan-limits.ts (it's the internal name for any future high-tier plan).
- Remove `"AGENCY"` from the checkout route's accepted plan types so nobody can accidentally check out with it.
- Audit: grep for any UI that references "Agency" and remove/update.

**Files:** `app/api/checkout/route.ts`, grep across dashboard pages
