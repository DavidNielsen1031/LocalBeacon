# Sprint 26 Retro — Funnel Redesign

**Date:** 2026-03-21
**Duration:** ~3 hours (within same session as S25 retro)
**Items:** 6 planned, 6 completed (S26-04 was already done)

## What Went Well
- **Scan-first funnel is a massive simplification** — every CTA → /check eliminates decision paralysis
- **Personalized plan cards** (S26-02) are the best conversion feature we've built — "Fixes 8 of 11 issues found in YOUR scan" is compelling
- **Dead code deletion** — removed ~195 lines of checkout logic from pricing page, entire What's Next step. Simpler = fewer bugs
- **Quality gate caught real issues** — Quinn found a stored XSS via dangerouslySetInnerHTML that was pre-existing but expanded by this sprint

## What Could Improve
- **Bob's payment-before-setup concern is valid** — blue-collar SMB owners expect to configure before paying. Consider 7-day free trial in future sprint
- **No browser testing this sprint** — relied on code review + build verification. Need to test the actual deployed funnel on mobile
- **DFY scope confusion will resurface** — even with the FAQ fix, "Done-For-You" as a name implies ongoing. Watch support tickets

## Action Items
- [ ] Test deployed funnel end-to-end on mobile after Vercel deploy
- [ ] Consider 7-day trial for future sprint (addresses Bob's payment trust gap)
- [ ] Monitor DFY support tickets for scope confusion
- [ ] Add sprint-26 lessons to LESSONS.md

## Velocity
- 5 effective items (S26-04 was pre-done) in ~3 hours
- All quality gates passed on first attempt
- Security fixes added ~30 min to sprint
