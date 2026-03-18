# Sprint 14 — Make It Demoable

**Goal:** Get localbeacon.ai into a state where David can demo it to a prospect and they can sign up + see a working dashboard.

---

## S14-01: Clean Merge & Production Deploy (Size M)

**Problem:** Sprint 13 code (CRM scripts, email templates, Stripe checkout, env fixes) lives on `sprint/localbeacon/s13` branch. Production is running old `main` code. `/dashboard` returns 404 on production. The SWC/lockfile issue caused repeated Vercel deploy failures.

**Solution:** Merge S13 branch to main. Fix the SWC lockfile issue (delete lockfile, let Vercel do clean install, or pin SWC platform deps). Deploy to production via `scripts/deploy.sh localbeacon prod` (skip persona gate — S13 personas already ran). Verify `/dashboard`, `/check`, `/pricing`, `/sign-in` all return 200.

**Verification:** `curl -s -o /dev/null -w "%{http_code}" https://localbeacon.ai/dashboard` returns 200 (or 302 redirect to sign-in). All 4 core routes respond.

**Measurable Outcome:** Production deploy succeeds. Dashboard accessible after sign-in.

---

## S14-02: Stripe Env Validation + DFY Fix (Size S)

**Problem:** The DFY plan's Stripe price ID can be `undefined` if env var is missing, causing `|| null` crash at checkout. No startup validation catches missing Stripe vars.

**Solution:** Add startup env validation in `lib/stripe.ts` — log warnings for missing price IDs, don't crash. Make checkout route return a clear error ("Plan not available") instead of 500. Verify all 3 plan price IDs are set in Vercel production env.

**Verification:** `curl -X POST https://localbeacon.ai/api/checkout -H 'Content-Type: application/json' -d '{"plan":"DFY"}'` returns 401 (auth required) not 500. Build passes with 0 errors.

**Measurable Outcome:** No 500 errors from checkout route regardless of env config state.
