# Sprint 9 Spec — Automation

**Sprint:** 9  
**Theme:** Make the product feel alive without the user logging in every day.  
**Status:** Draft  
**Speclint Score:** TBD (will run before execution)  

---

## Persona Feedback on Sprint 9 Decisions

### Q2: Monthly Report Format

**Alex (Agency):** "I need PDF reports I can white-label and send to clients. A dashboard page is nice for me, but my clients need a downloadable artifact. Email delivery is a bonus — but PDF first."

**Taylor (SMB):** "An email summary would be perfect. Something that hits my inbox monthly saying 'Here's what we did for your business this month: 4 posts created, 2 reviews replied, AI Readiness score went from 62 to 71.' I don't want to log in to see it."

**Bob (Plumber):** "Just email me. Keep it simple. 'We posted 4 times on your Google listing this month. 2 reviews replied. Here's your number.' I'm not downloading PDFs."

**Decision:** Dashboard page (foundation) + email summary (monthly via Resend). PDF export deferred to Sprint 11 (Agency Layer). Email is the primary delivery for Solo/Bob personas.

### Q3: Content Scheduling

**Alex:** "I need a content calendar. Show me what's going out for each client, by week. Let me approve or edit before it publishes. Even without auto-posting, a queue I can copy from on Monday morning saves me time."

**Taylor:** "Send me an email when my weekly content is ready. I'll copy-paste it to Google in 2 minutes. That's way better than me having to come up with something to post."

**Bob:** "I don't want to schedule anything. Just tell me when to post and give me the text. Email me on Monday: 'Here's your post for this week. Copy it to Google.'"

**Decision:** Weekly email notification with generated content + a Post Queue dashboard page. User gets an email "Your weekly post is ready" with the content inline and a "Copy to Google" link. Queue page shows history of generated → posted status.

### Q4: Plan Limits — Hard Block or Soft Warning?

**Alex:** "Hard block is fine. I know what I'm paying for. Just make the upgrade path clear — don't make me hunt for a pricing page."

**Taylor:** "Hard block makes sense. But show me what I'd get if I upgrade — like a preview of what the 6th post would look like, then block it."

**Bob:** "If I'm on free and I try to do something I can't, just tell me. Don't be sneaky about it. 'You've used your 5 posts this month. Upgrade to get more.' Done."

**Decision:** Hard block (option C) on the generation API. UI shows a clear upgrade prompt with usage meter. "You've generated 5/5 posts this month. Upgrade to Solo for unlimited." No soft honor system — that undermines the paid plans.

---

## Sprint 9 Items

### LB-S9-01 · Supabase Schema Fix
**Problem:** Sprint 8 added Settings fields (address, zip, description, specialties) but the `businesses` table lacks these columns. Data silently drops on save.

**Scope:**
- Run ALTER TABLE to add 4 columns: `address TEXT`, `zip TEXT`, `description TEXT`, `specialties TEXT`
- Verify Settings page round-trips data (save → refresh → data persists)

**Verification:**
1. `curl` Supabase REST API to confirm column exists: `GET /businesses?select=address,zip,description,specialties&limit=0` returns 200
2. Open Settings in browser, enter test data, save, refresh — data persists

**Estimate:** S (Small)  
**Delegatable:** No (requires Supabase management API or dashboard SQL)

---

### LB-S9-02 · Post Queue + Weekly Content Generation
**Problem:** Users generate posts manually one at a time. No scheduled content. No "what's coming next" view.

**Scope:**
- New Supabase table: `content_queue` (id, business_id, type, content, scheduled_for, status [draft/ready/posted], created_at)
- New API route: `POST /api/generate/weekly-content` — generates 1 GBP post draft for the business, inserts into queue with status "ready" and scheduled_for = next Monday
- New dashboard page: `/dashboard/queue` — shows upcoming and past content with status badges (Ready → Posted). "Copy to Google" button + "Mark as Posted" toggle.
- Sidebar nav: add "Post Queue" item between "GBP Posts" and "Page Builder"

**Verification:**
1. Call `POST /api/generate/weekly-content` with a valid business_id → returns 200, inserts row in `content_queue`
2. Visit `/dashboard/queue` → see the generated post with "Ready" badge
3. Click "Mark as Posted" → status changes to "Posted"
4. `next build` passes

**Estimate:** L (Large)  
**Delegatable:** Yes — standalone page + API route + table, no entanglement with existing code

---

### LB-S9-03 · Weekly Email Notification (Resend)
**Problem:** Users have to remember to log in. No proactive outreach. Product feels dead between visits.

**Scope:**
- Set up Resend.com account (free tier: 100 emails/day)
- New API route: `POST /api/email/weekly-content` — sends email to user with their latest queued content inline
- Email template: plain HTML, branded header, content preview, "Copy to Google" CTA button linking to dashboard
- OpenClaw cron: `localbeacon-weekly-email` — runs Monday 9 AM CST, calls the email API for all users with queued content
- Env vars: `RESEND_API_KEY` in Vercel + .env.local

**Verification:**
1. Call `POST /api/email/weekly-content` with test user → email arrives in inbox
2. Email contains correct business name, post content, and dashboard link
3. Cron exists in `openclaw cron list` and is enabled
4. Resend dashboard shows successful delivery

**Estimate:** L (Large)  
**Delegatable:** Yes — email template + API route are standalone

---

### LB-S9-04 · Plan Limits Enforcement
**Problem:** Free plan claims "5 Google posts per month" but no enforcement exists. Any user can generate unlimited content.

**Scope:**
- New utility: `lib/plan-limits.ts` — checks user's plan (from Supabase `users` table) and counts usage this month (from `content_items` or `content_queue`)
- Limits: Free = 5 posts/mo + 3 city pages. Solo = unlimited. Agency = unlimited.
- API routes (`/api/generate/*`) check limits before generating. Return 403 with `{ error: "limit_reached", limit: 5, used: 5, plan: "free", upgrade_url: "/pricing" }` when exceeded.
- Dashboard UI: usage meter component showing "3/5 posts used this month" on Free plan. Upgrade prompt when limit hit.

**Verification:**
1. Create test free user → generate 5 posts → 6th returns 403 with correct error body
2. Upgrade user plan to "solo" → 6th post succeeds
3. Usage meter on dashboard shows correct count
4. `next build` passes

**Estimate:** M (Medium)  
**Delegatable:** Yes — `lib/plan-limits.ts` is a standalone utility, API changes are mechanical

---

### LB-S9-05 · Monthly Content Summary (Dashboard + Email)
**Problem:** No monthly report exists. Users can't see what LocalBeacon did for them this month. Persona feedback says email is the primary format.

**Scope:**
- New dashboard page: `/dashboard/reports` — shows current month summary: posts generated, city pages created, reviews replied, AI Readiness score (latest), content queue items
- Data source: aggregate queries on `content_items` and `content_queue` filtered by current month
- Monthly email: extend Resend integration to send monthly summary on 1st of each month
- OpenClaw cron: `localbeacon-monthly-report` — runs 1st of month 9 AM CST

**Verification:**
1. Visit `/dashboard/reports` → shows correct counts for current month
2. Counts match actual Supabase data (`SELECT COUNT(*) FROM content_items WHERE created_at >= '2026-03-01'`)
3. Monthly email sends with correct data
4. `next build` passes

**Estimate:** M (Medium)  
**Delegatable:** Partial — dashboard page yes, email integration shares S9-03 Resend setup

---

## Scope Summary

| ID | Item | Size | Delegatable | Dependencies |
|----|------|------|------------|-------------|
| S9-01 | Supabase schema fix | S | No | None |
| S9-02 | Post Queue + weekly generation | L | Yes | S9-01 (needs business data) |
| S9-03 | Weekly email (Resend) | L | Yes | S9-02 (needs queued content) |
| S9-04 | Plan limits enforcement | M | Yes | None |
| S9-05 | Monthly content summary | M | Partial | S9-03 (shares Resend) |

**Total:** 5 items (1S + 1M + 1M + 1L + 1L)  
**Estimated effort:** ~4-6 hours  
**Delegation target:** S9-02 and S9-04 via Phase 2A substrate (2/5 = 40%)

## Execution Order

1. **S9-01** (schema fix) — unblocks everything, 5 min
2. **S9-04** (plan limits) — standalone, delegate immediately
3. **S9-02** (post queue) — delegate immediately after S9-01
4. **S9-03** (weekly email) — after S9-02 completes (depends on queue)
5. **S9-05** (monthly report) — after S9-03 (shares Resend setup)

## What's NOT in Sprint 9

- GBP auto-posting (blocked on API approval, listed as "coming soon")
- Review monitoring / bulk import (deferred to Sprint 10)
- Pricing page update (only after features are verified)
- PDF report export (Sprint 11 — Agency Layer)

---

*Draft spec. Pending: Speclint validation, David approval, then open sprint.*
