# Sprint 20 Retro — Close Backend Gaps

**Date:** 2026-03-19
**Duration:** ~15 minutes total
**Velocity:** 5/5 shipped + 2/3 action items implemented

## What shipped
- S20-01: Plan enforcement on AI Readiness + llms.txt routes
- S20-02: Dynamic competitor limits (1 free, 5 solo)
- S20-03: DFY webhook auto-upgrades to Solo for 30 days + expiry
- S20-04: Monthly report cron (vercel.json, 1st of month 9am CST)
- S20-05: AGENCY removed from checkout, UI cleanup
- Migration: `plan_expires_at` column added to users table

## Action Items

- [x] **Rule: Plan features live in ONE place.** Created `lib/plans.ts` — both homepage and /pricing import from it. (commit `8b58dfc`)
- [x] **Rule: Every new feature promise gets a corresponding `enforceLimits` call in the same PR.** Documented in sprint specs going forward.
- [ ] Run `plan_expires_at` migration on DankBot if needed — N/A for now, DankBot uses RevenueCat not Stripe directly.

## Lessons
- Copy and code diverged for 5 sprints without anyone noticing. Single source of truth prevents this.
- "Managed" tier survived 5 sprints with zero real differentiation. Kill phantom tiers earlier.
- Cross-referencing pricing copy vs actual code should be standard before every launch.
