# Sprint 31 — Review & Retro

**Theme:** Cold Outreach Engine + Checker UX Fix
**Dates:** 2026-03-25 (single session)
**PR:** #15 (merged)

---

## What Shipped

### ✅ S31-01: Fix Checker → Pricing Flow
- Replaced broken 3-column post-scan pricing (Free/Autopilot/DFY) with score-aware 2-card layout
- Dynamic headline messaging based on score range (4 tiers: 90+, 60-89, 30-59, <30)
- Personalized "What Pro fixes for you" section based on actual failing checks
- Working checkout buttons for Pro monthly ($99), Pro annual ($899), and Beacon Launch ($499)
- Removed dead Free tier card

### ✅ S31-02: Batch Scanner Script
- `scripts/batch-scan.ts` — standalone, no Next.js deps
- 19 AEO checks, 1.5s rate limit between scans
- JSON output with score, grade, checks, timestamp
- Tested: localbeacon.ai → 96/100, robinsplumbing.com → 78/100

### ✅ S31-03: Prospect Discovery + Pipeline
- `scripts/find-prospects.ts` — Brave Search, 4 query variations, directory filtering, dedup
- `scripts/outreach-pipeline.sh` — full pipeline: find → scan → rank → outreach JSON
- Tested: 22 plumber websites found in Burnsville MN

### ⏸️ Deferred to S32
- S31-04: Cold outreach email system (templates + send + tracking)
- S31-05: Research engine v1 (signal scanner + intelligence feed)
- S31-06: Website updates (reflect new capabilities)

---

## Also Shipped (Pre-Sprint, same session)

These were done before S31 was formally started but during the same work session:

- **CSP fix for Clerk** — sign-in page was completely broken in production (clerk.localbeacon.ai blocked by Content-Security-Policy). Fixed by adding clerk.localbeacon.ai + PostHog to CSP.
- **Review reply copy fix** — changed misleading "AI-written replies for new Google reviews" to honest "paste any review, get a professional response to copy back"
- **Google Ads pricing comparison** — added to both homepage and pricing page comparison bars
- **Savings badges moved to cards** — "Save $289" on Pro, "Save $389" on Beacon Launch

---

## Metrics

- **Files changed:** 5 (in PR), ~10 total including pre-sprint fixes
- **Lines added:** 884 (in PR)
- **Tests:** 32 passing
- **Build:** Clean
- **Time:** ~2.5 hours (planning + execution + review)

---

## What Went Well

1. **Batch scanner works first try** — clean standalone script, no Next.js dependency headaches
2. **Pipeline architecture** — find → scan → rank is a solid foundation for multiple outreach strategies
3. **Score-aware messaging** — the checker now tells different stories to a 98-scorer vs a 25-scorer
4. **CSP debugging** — browser console logs immediately revealed the root cause (not DNS, not keys — just CSP)

## What Could Improve

1. **Deployed copy changes without screenshot** — pushed review reply + Google Ads comparison to production without sending David a preview. He caught it. Rule: always screenshot before deploying user-facing copy changes.
2. **Sprint branch discipline** — accidentally committed to main once, had to reset. The pre-commit warning hook works but has a 3-second abort window that doesn't help in automated commits.
3. **3 items shipped out of 6 planned** — scope was ambitious for one session. The shipped items are the infrastructure foundation; the email system and research engine are implementation that builds on top.

## Lessons

- **CSP is invisible until it breaks everything** — Clerk "never used" key was a red herring. The real blocker was script-src not including the production domain. Always check browser console errors first.
- **Batch scanning needs browser-like UA** — some sites block non-browser User-Agents. Using a Mozilla-compatible UA string fixed most failures.
- **Pipeline first, emails second** — building the scanning infrastructure before the email system was the right call. You can't send personalized outreach without scored prospect data.

## Action Items

- [ ] **S32:** Build cold email system (Template A + B, CAN-SPAM, Supabase tracking)
- [ ] **S32:** Research engine v1 (RSS + X signal scanner, weekly digest)
- [ ] **S32:** Website updates (intelligence badge, changelog)
- [ ] **Rule:** Always screenshot before deploying copy changes to production

---

*Sprint 31 CLOSED — 2026-03-25*
