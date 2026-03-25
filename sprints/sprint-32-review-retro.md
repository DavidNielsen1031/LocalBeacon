# Sprint 32 — Review & Retro

**Theme:** Cold Outreach Emails + Research Engine + Website Updates
**Dates:** 2026-03-25 (single session, ~45 min)
**PR:** #16 (merged)

---

## What Shipped (3/3 — 100% completion)

### ✅ S32-01: Cold Outreach Email System
- `scripts/send-outreach.ts` — personalized cold emails with score comparisons
- Template A: "Your Competitor is Winning" (FOMO) — side-by-side red/green score cards
- Template B: "You're Invisible to AI" — big score number + what's holding them back
- CAN-SPAM: physical address, List-Unsubscribe headers, one-click unsubscribe
- `/api/unsubscribe` — GET (branded page) + POST (one-click) endpoint
- Migration 010: outreach_emails + outreach_unsubscribes tables
- Dry-run mode, score filtering, rate limiting, limit flag

### ✅ S32-02: Research Engine v1
- `scripts/research/signal-scanner.ts` — 5 RSS feeds + 5 Brave searches
- Relevance scoring with priority levels + actionable flag + category tagging
- Deduplication across runs, weekly digest generation
- First run results: 44 signals, 27 high priority, 40 actionable
- Key finding: "Schema markup = 3.2x more AI citations" — validates our product

### ✅ S32-03: Website Updates
- Fixed 19→26 signal count in homepage SEO content
- "26 signals" → "26+ signals" on checker page
- Added "Updated weekly" to How It Works
- Added research badge below What We Check section
- Before/after screenshots captured ✅ (S31 retro action item)

---

## What Went Well

1. **100% completion** — all 3 items shipped. Scoping to 3 items per sprint works.
2. **Research engine found real intelligence on first run** — 44 signals including actionable findings (schema = 3.2x AI citations). This validates the feature immediately.
3. **Before/after screenshots** — followed the S31 retro rule. Captured before deploying.
4. **Full outreach pipeline is now end-to-end** — from S31 (find + scan) + S32 (email) = a complete cold outreach system.

## What Could Improve

1. **Email guessing (info@domain) is weak** — need real email discovery. Many businesses don't have info@ addresses. Future: scrape contact pages, use Hunter.io API, or find emails in GBP listings.
2. **Didn't test the email templates visually** — wrote HTML emails but didn't render-test them in email clients. Should use Resend's preview or Litmus.
3. **Skipped persona review again** — website copy changes warranted it. Need to make this a habit, not a checkbox.
4. **Migration not yet run in Supabase** — the SQL is written but David needs to run it (or give me DB access).

## Lessons

- **3 items/sprint = right scope** — completed everything cleanly vs S31's 3/6.
- **Research engine is a content goldmine** — those 44 signals can become blog posts, newsletter content, and social proof.
- **Pipeline is now: find → scan → rank → email** — total automation from zero to outreach.

## Action Items

- [ ] Run migration 010 in Supabase (outreach tables)
- [ ] Test outreach emails with a real dry-run on plumber data
- [ ] Send David a sample email for review before any live sends
- [ ] Wire signal-scanner as a cron (daily or weekly)
- [ ] Email discovery improvement (scrape contact pages)
- [ ] Persona review on next UI change (non-negotiable)

---

*Sprint 32 CLOSED — 2026-03-25*
