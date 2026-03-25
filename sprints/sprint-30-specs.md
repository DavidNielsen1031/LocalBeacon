# Sprint 30 — Pricing Restructure Phase 1: Foundation

**Product:** LocalBeacon.ai
**Theme:** Pricing infrastructure — single source of truth, new Stripe products, annual billing, DB cleanup
**Branch:** `sprint/localbeacon/s30`
**Plan Reference:** `products/localbeacon/PRICING_RESTRUCTURE_PLAN.md`

---

## Context

David approved restructuring LocalBeacon pricing:
- Free: no change (AI readiness check, email capture, no account required)
- Autopilot: $49/mo → $99/mo (+ $899/yr annual option)  
- Launch Package: $499 one-time, auto-starts $99/mo subscription (first month included)
- Agency tier: fully removed from code and DB
- Dashboard simplification: separate sprint (Phase 3)

This sprint is Phase 1 only — pricing infrastructure. No UI changes beyond fixing hardcoded prices.

---

## S30-01: Update `lib/plans.ts` — single source of truth

**Problem:** Plan definitions exist in `lib/plans.ts` but many files hardcode `$49` instead of importing.
**Solution:** 
- Update Autopilot price from $49 to $99, period to /month
- Add `annualPrice: '$899'`, `annualPeriod: '/year'`, `annualStripePlan: 'SOLO_ANNUAL'` fields to PlanDefinition
- Update Launch Package: clarify it includes first month of Autopilot, update features to match V2h mockup
- Remove Agency tier entirely from PLANS array
- Update all feature lists to match approved V2h layout
- Update PRICING_FAQS to reflect new pricing and structure
- Export pricing constants (AUTOPILOT_MONTHLY_PRICE, AUTOPILOT_ANNUAL_PRICE, LAUNCH_PACKAGE_PRICE) for use in non-component files (emails, meta)
**Verification:** `npm run build` passes. `grep -rn "PLANS" --include="*.ts" --include="*.tsx"` shows all consumers still compile.

## S30-02: Hunt and kill all hardcoded `$49` references

**Problem:** `$49` appears in 20+ files as hardcoded strings. Price changes require touching every file.
**Solution:** Replace every hardcoded `$49` with imports from `lib/plans.ts` constants. Files:
- `app/layout.tsx`, `app/pricing/layout.tsx` — meta descriptions
- `app/dashboard/page.tsx` — upgrade banner
- `app/dashboard/settings/page.tsx`, `app/dashboard/queue/queue-actions.tsx`, `app/dashboard/reports/page.tsx`
- `app/for/[industry]/page.tsx`, `app/check/checker-form.tsx`, `app/terms/page.tsx`
- `components/landing-content.tsx`, `components/dfy-upsell-card.tsx`, `components/upgrade-gate.tsx`, `components/gsc-card.tsx`, `components/homepage-seo-content.tsx`
- `lib/email.ts` — email templates
- `lib/industry-data/*.ts` — 6 industry data files
**Verification:** `grep -rn '\$49' --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v plans.ts` returns 0 results.

## S30-03: Remove Agency tier from codebase

**Problem:** Agency tier was retired but still referenced in DB constraint, webhook handler, email templates.
**Solution:**
- Remove all `agency` references from TypeScript code
- Prepare migration 009: update `users.plan` CHECK constraint to `('free', 'solo')` only
- Add `billing_period` column: `text DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'annual'))`
- Update `components/business-context.tsx` if it references agency
- Update email templates that mention "Agency plan"
**Verification:** `grep -rn 'agency' --include="*.ts" --include="*.tsx" -i | grep -v node_modules | grep -v PRICING_RESTRUCTURE | grep -v SPRINT_ROADMAP | grep -v sprint-` returns 0 plan-related results.

## S30-04: Update checkout routes for new pricing

**Problem:** Checkout routes only handle SOLO and DFY. Need SOLO_ANNUAL. DFY doesn't auto-create subscription.
**Solution:**
- `app/api/checkout/route.ts`: Add 'SOLO_ANNUAL' plan key. Map to annual Stripe price ID.
- `app/api/checkout-public/route.ts`: Same changes.
- `app/api/webhook/route.ts`: 
  - Handle annual subscriptions (set `billing_period: 'annual'`)
  - DFY checkout: after one-time payment, auto-create $99/mo subscription with `trial_period_days: 30`
  - Remove agency handling
- `lib/plans.ts` or new `lib/checkout-config.ts`: centralize Stripe price ID mapping
**Verification:** Build passes. Checkout route accepts SOLO, SOLO_ANNUAL, DFY plan keys.

## S30-05: Write test suite

**Problem:** Zero tests exist. Any future change could silently break pricing.
**Solution:**
- `__tests__/lib/plans.test.ts` — validate plan definitions have required fields, no undefined prices
- `__tests__/api/checkout.test.ts` — unit test checkout route with mock Stripe (all 3 plan types)
- `__tests__/api/webhook.test.ts` — unit test webhook for checkout.completed, subscription.updated, subscription.deleted
- `__tests__/hardcoded-prices.test.ts` — grep-based test that fails if `$49` or hardcoded dollar amounts appear outside `lib/plans.ts`
- Configure Jest or Vitest (whichever fits Next.js setup)
**Verification:** `npm test` passes with all tests green.

## S30-06: Forensic audit

**Problem:** Must verify nothing was missed.
**Solution:**
- `grep -rn '\$49' --include="*.ts" --include="*.tsx"` → only node_modules
- `grep -rn 'agency' --include="*.ts" --include="*.tsx" -i` → no plan references  
- `grep -rn '\$499' --include="*.ts" --include="*.tsx"` → only lib/plans.ts
- `npm run build` → 0 errors, 0 warnings
- All tests pass
- Git diff review: every changed file is intentional
**Verification:** All forensic checks pass. Documented in sprint forensics file.

---

## Acceptance Criteria
- [ ] `lib/plans.ts` is the single source of truth for ALL pricing
- [ ] Zero hardcoded `$49` outside `lib/plans.ts`
- [ ] Zero `agency` plan references in code
- [ ] Checkout routes handle SOLO ($99/mo), SOLO_ANNUAL ($899/yr), DFY ($499 + auto-sub)
- [ ] Migration 009 ready (SQL file created, tested on schema)
- [ ] Test suite exists and passes
- [ ] Build succeeds with 0 errors
- [ ] Forensic audit passes
