# Sprint 27 — Automation Truth

**Theme:** Make every "Automated" label on the pricing page honest.
**Trigger:** David ran a scan, never got the email. Audit revealed 8 of 10 "Automated" features are manual.

---

## Phase 1: Foundation

### S27-01: Fix Email Delivery (Size S) 🔴

David scanned localbeacon.ai and never received the AEO report email. Verify the Resend domain is verified, test a real send end-to-end, and surface errors in the checker UI when email delivery fails. Code is in `lib/email.ts` and the leads API at `app/api/leads/`.

### S27-02: Weekly Google Post Cron (Size M) 🔴

Create a Vercel cron that auto-generates a weekly Google Business Profile post for every paying user and emails it to them. Reuse the existing content generation in `/api/generate/weekly-content` and email infrastructure in `lib/email.ts`. Only for `solo`/`agency` plan users with a business configured.

---

## Phase 2: Content Automation

### S27-03: Monthly Blog Post Cron (Size M) 🟡

Create a Vercel cron that generates 1 blog post per week for each paying user's business, using their business context from Settings. Save as drafts in `content_items`. Email the user when a new post is ready. Reuse `/api/generate/blog-post` and `lib/email.ts`.

### S27-04: Recurring AI Readiness Scans (Size M) 🟡

Create a Vercel cron that runs a weekly AI Readiness scan for each paying user's business website. Save results to `aeo_scans`. Email the user if their score changed by ≥5 points. Reuse the scan logic from `/api/ai-readiness` and `lib/email.ts`.

### S27-05: Auto-Generate City Pages (Size M) 🟡

Create a Vercel cron that generates city pages for uncovered service areas each month (up to 3 per business). Check which cities already have pages, generate for the gaps. Save as drafts in `content_items`. Reuse `/api/generate/service-page`.

---

## Phase 3: Monitoring & Intelligence

### S27-06: AI Search Change Tracking (Size M) 🟡

Expand the existing `monitor-visibility` Vercel cron to track all 21 AI Readiness signals (not just schema + llms.txt). Store snapshots for week-over-week comparison. Email users when any signal regresses.

### S27-07: Review Response Inbox (Size M) 🟡

Build a "Review Inbox" in the dashboard where users can paste new reviews. Auto-generate response drafts immediately on submission. Send a weekly email nudge asking "Got any new reviews this week?" with a link to the inbox. GBP API auto-pull is a future phase (pending API approval).

---

## Phase 4: Labels (ships incrementally after each feature)

### S27-08: Update Feature Labels (Size S) 🟢

Add a `setup` mode to the existing badge system in `plans.ts`. Re-tag each Autopilot feature after it's actually automated:
- `diy` → "Self-Service" — Free tier
- `setup` → "Self-Setup" — you configure, then it runs
- `auto` → "Automated" — runs with zero input
- `done` → "Done for you" — we handle everything

Only update labels AFTER the corresponding feature ships.

---

## Phasing

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 (incremental)
```

Phase 2 items are parallel. Phase 3 depends on Phase 1 (email must work). Phase 4 tags update after each feature ships.

## Delegation Plan

- **Delegate:** S27-02, S27-03, S27-04, S27-05 (cron routes — standalone, existing patterns)
- **Self-execute:** S27-01 (email debugging), S27-06 (expand existing cron), S27-08 (label system)
- **Needs David:** S27-07 (review inbox UX decision)
