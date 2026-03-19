# Security Fixes Applied — Day 1

**Date:** 2026-03-18  
**Branch:** main  
**Commit:** 619dc19  
**Build:** ✅ Passes clean (`npx next build`)

---

## Summary

All 9 critical security items from the code review have been addressed. 13 files modified, 2 new files created, 0 vulnerabilities remaining.

---

## C1 — CRON_SECRET auth on email endpoints ✅

**Files:**
- `app/app/api/email/weekly-content/route.ts`
- `app/app/api/email/monthly-report/route.ts`

Both POST handlers now require `Authorization: Bearer <CRON_SECRET>` header. Returns 401 if the header is missing, CRON_SECRET is not set, or the token doesn't match. The function signatures were updated to accept `req: Request` to read headers.

---

## C2 — STRIPE_WEBHOOK_SECRET assertion fix ✅

**File:** `app/app/api/webhook/route.ts`

Replaced `process.env.STRIPE_WEBHOOK_SECRET!` non-null assertion with a proper guard. Now returns 500 with a clear error message if the env var is not configured, rather than crashing at runtime with a confusing error.

---

## C3 — Ownership check on content-queue PATCH ✅

**File:** `app/app/api/content-queue/[id]/route.ts`

Before updating a content queue item, the route now fetches the item and joins to the `businesses` table to verify `business.user_id` matches the authenticated Clerk user. Returns 404 if item not found, 403 if the user doesn't own the business.

---

## C4 — Business ownership check in generate routes ✅

**Files:**
- `app/app/api/generate/gbp-post/route.ts`
- `app/app/api/generate/service-page/route.ts`
- `app/app/api/generate/weekly-content/route.ts`

After auth check, if `business_id` is provided, each route now queries the `businesses` table to verify `user_id` matches the authenticated user. Returns 404 if not found, 403 if unauthorized. For `weekly-content`, `user_id` was added to the existing `SELECT` query (since `business_id` is required there) so the check is done in a single DB round-trip.

---

## C5 — SSRF mitigation in ai-readiness ✅

**File:** `app/app/api/ai-readiness/route.ts`

Added `isPrivateUrl(url: string): boolean` helper that blocks:
- Non-http(s) protocols
- `localhost`, `127.0.0.1`, `0.0.0.0`, `::1`, `[::1]`
- RFC1918 private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- Link-local / cloud metadata: `169.254.0.0/16`

The URL is checked immediately after normalization, before any fetch is attempted. Unparseable URLs also return blocked.

---

## C6 — Rate limiting on public endpoints ✅

**New file:** `app/lib/rate-limit.ts`

Created a shared in-memory rate limiter using a `Map<string, number[]>` of IP → timestamps.

**Applied to:**
- `/api/ai-readiness`: 10 requests per minute per IP → returns 429 if exceeded
- `/api/leads`: 5 requests per minute per IP → returns 429 if exceeded

IP is extracted from `x-forwarded-for` (first entry) or `x-real-ip` headers, falling back to `'unknown'`.

---

## C7 — jsPDF vulnerability fix ✅

**Command:** `npm audit fix`

Result: `changed 3 packages, found 0 vulnerabilities`

Before: 3 vulnerabilities (1 moderate, 1 high, 1 critical — all in jsPDF ≤4.2.0).  
After: 0 vulnerabilities. `package-lock.json` updated.

---

## C8 — Clerk secret in git history ✅

**Check:** `git log --all --full-history -p -- "app/.env.local"`

Result: **No output** — `.env.local` has never been committed to git history. Safe.

**`.gitignore` verification:** `.env.local` is covered by two patterns:
- Line 34: `.env*`
- Line 43: `.env*.local`

**Action required:** None. No secrets to rotate.

---

## C9 — Leads table migration ✅

**New file:** `app/supabase/migrations/002_leads_table.sql`

Creates the `leads` table with:
- `id` (uuid PK)
- `email` (text, NOT NULL)
- `url_scanned` (text)
- `score` (integer)
- `created_at` (timestamptz, default now())

RLS enabled with service-role-only INSERT and SELECT policies. The `/api/leads` route was already writing to this table — this migration makes it official.

---

## Additional Fixes (bonus items from review)

### HTML sanitization in /api/leads email ✅
Added `escapeHtml()` helper that escapes `&`, `<`, `>`, `"`. Applied to `checks` array (label, details, fix fields) before passing to `sendAeoReportEmail()`. Prevents XSS if a malicious site returns crafted check content.

### try/catch on per-business loop in monthly-report ✅
Wrapped the entire `for (const business of businesses)` loop body in try/catch. One failing business (DB error, email bounce, etc.) no longer aborts the entire batch. Errors are collected and returned in the response `errors` array.

### FAQ count parameter capped ✅
`app/app/api/generate/faq/route.ts`: Added `const safeCount = Math.min(Math.max(count || 15, 1), 30)` — caps between 1 and 30. Prompt now uses `safeCount` instead of raw `count`. Prevents abuse (e.g., requesting 10,000 FAQs to drive up AI token costs).

---

## Files Changed

| File | Change |
|------|--------|
| `app/app/api/email/weekly-content/route.ts` | C1: CRON_SECRET auth |
| `app/app/api/email/monthly-report/route.ts` | C1: CRON_SECRET auth + try/catch loop |
| `app/app/api/webhook/route.ts` | C2: STRIPE_WEBHOOK_SECRET guard |
| `app/app/api/content-queue/[id]/route.ts` | C3: ownership check |
| `app/app/api/generate/gbp-post/route.ts` | C4: business_id ownership check |
| `app/app/api/generate/service-page/route.ts` | C4: business_id ownership check |
| `app/app/api/generate/weekly-content/route.ts` | C4: business_id ownership check |
| `app/app/api/ai-readiness/route.ts` | C5: SSRF protection + C6: rate limiting |
| `app/app/api/leads/route.ts` | C6: rate limiting + XSS sanitization |
| `app/app/api/generate/faq/route.ts` | count cap |
| `app/lib/rate-limit.ts` | **NEW** — shared rate limiter |
| `app/supabase/migrations/002_leads_table.sql` | **NEW** — leads table migration |
| `app/package-lock.json` | C7: jsPDF updated |

---

## Notes for David

1. **Add `CRON_SECRET` to Vercel env vars** — the email endpoints will return 401 until this is set. Update your OpenClaw cron job to pass `Authorization: Bearer <CRON_SECRET>` header.
2. **Run the migration** — `002_leads_table.sql` needs to be applied to Supabase production. Go to Supabase Dashboard → SQL Editor → run the file.
3. **Rate limiter is in-memory** — it resets on each server restart/deploy and is per-instance (not shared across Vercel edge nodes). Sufficient for MVP; upgrade to Upstash Redis rate limiting before high-traffic launch.
4. **No push** — commit is local on `main`. Staged for review before remote push.
