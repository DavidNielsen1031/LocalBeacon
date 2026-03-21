# E2E Flow Test — Sprint 25

**Date:** 2026-03-21
**Tested by:** Alexander

## API Health

- ✅ `/api/health` — returns `{"status":"ok"}`, Anthropic configured, not degraded
- ✅ `/api/businesses` — returns 401 when unauthenticated (correct)
- ✅ `/api/user/init` — returns 401 when unauthenticated (correct)
- ✅ `/api/generate/gbp-post` — returns 401 when unauthenticated (correct)
- ✅ `/api/checkout` — returns 401 when unauthenticated (correct), plan intent stored in localStorage
- ✅ `/api/ai-readiness` — returns scan results for valid URLs (tested with dankbot.ai, localbeacon.ai, vitallens.ai)

## Infrastructure

- ✅ Supabase configured (URL + anon key + service role key) for both preview and production
- ✅ Stripe configured (secret key + Solo/DFY/Agency price IDs) for both preview and production
- ✅ Clerk configured (publishable + secret keys) for all environments
- ✅ Clerk `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` updated to `/onboarding` on Vercel

## Flow Analysis

### Sign-Up → Onboarding Flow
1. User visits `/sign-up` → Clerk handles auth
2. After sign-up → redirects to `/onboarding` (fixed in S25-01: `forceRedirectUrl="/onboarding"`)
3. Onboarding checks `localStorage` for `lb_pending_plan` (checkout resume)
4. Onboarding checks `localStorage` for `lb_scan_data` (pre-fill from /check)
5. User completes 4 steps: business info → service areas → first post → what's next

### Checkout Flow (fixed in S25-01)
1. Unauthenticated user clicks Solo/DFY on /pricing
2. `handleCheckout()` → API returns 401 → stores plan intent in localStorage
3. Redirects to `/sign-up`
4. After sign-up → `/onboarding` → useEffect detects plan intent
5. Waits 1.5s for Clerk auth cookie → calls `/api/checkout` with retry (3 attempts)
6. On success → redirects to Stripe checkout

### Scan → Sign-Up Flow
1. User visits `/check` → enters business URL → sees score + top issues
2. Clicks "Get Full Report" → email gate → Clerk redirect to `/sign-up`
3. Scan data stored in localStorage → pre-fills onboarding step 1

## Manual Test Required

- [ ] David to test: go to localbeacon.ai/pricing → click "Start Solo" → complete sign-up → verify Stripe checkout opens
- [ ] David to test: go to localbeacon.ai/check → scan a URL → enter email → sign up → verify onboarding pre-fills business info
- [ ] David to test: complete onboarding → verify business appears in dashboard → generate a post

## Known Issues

- Clerk test keys in `.env.local` vs production keys on Vercel — local dev uses test Clerk instance
- DFY confirmation dialog may not persist plan intent if user closes dialog before clicking Continue
