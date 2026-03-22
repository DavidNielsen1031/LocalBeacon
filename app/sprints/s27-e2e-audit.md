# S27 E2E Audit — LocalBeacon.ai
**Date:** 2026-03-21  
**Auditor:** Alexander (code-read only, no browser)

---

## Summary

| Flow | Status | Notes |
|------|--------|-------|
| Sign-up redirect | ⚠️ BROKEN | Conflict: `forceRedirectUrl=/onboarding` in component vs `.env.local.example` shows `AFTER_SIGN_UP_URL=/dashboard`. Env var NOT set in `.env.local`. |
| Business creation | ✅ WORKING | Clerk auth, Supabase write, service_role fallback all correct. |
| Post generation | ⚠️ BROKEN | `ANTHROPIC_API_KEY` not set in `.env.local`. Falls back to mock post silently — no user-visible error. |
| Plan limits | ✅ WORKING | Queries Supabase, falls back to `free` on any failure. |
| Checkout resume (`lb_pending_plan`) | ⚠️ BROKEN | `lb_pending_plan` is **never set anywhere in the codebase**. The resume flow can never trigger. |

---

## Flow 1 — Sign-up Redirect

**Status: ⚠️ BROKEN (minor — currently works, but by hardcode not by env)**

### What the code does
- `app/sign-up/[[...sign-up]]/page.tsx` uses `<SignUp forceRedirectUrl="/onboarding" />`.
- `forceRedirectUrl` overrides everything — including Clerk env vars.
- `.env.local` does **not** contain `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`.
- `.env.local.example` defines `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`.

### What happens
After sign-up, user lands on `/onboarding`. This is correct for the current UX.

### The bug
The `.env.local.example` says the env var should be `/dashboard`, but the component hardcodes `/onboarding`. If someone copies `.env.local.example` and adds the env var (as instructed), Clerk env vars are suppressed by `forceRedirectUrl` — so it still works. BUT if `forceRedirectUrl` is ever removed or the component is changed, the env var needs updating.

**Additionally:** `middleware.ts` only protects `/dashboard(.*)`. `/onboarding` is **unprotected** — an unauthenticated user who navigates directly to `/onboarding` will reach it, then the `saveBusiness()` call will fail with 401.

### Fix
1. Either remove `forceRedirectUrl` and set `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding` in `.env.local`, OR keep `forceRedirectUrl` and remove the stale env var from `.env.local.example`.
2. Add `/onboarding` to middleware protected routes:
```ts
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/onboarding'])
```

---

## Flow 2 — Business Creation

**Status: ✅ WORKING**

### What the code does
- `onboarding/page.tsx` → `saveBusiness()` → `POST /api/businesses` with business data.
- `app/api/businesses/route.ts`:
  - Calls `auth()` from Clerk → returns 401 if not signed in ✅
  - Calls `createServerClient()` → tries `SUPABASE_SERVICE_ROLE_KEY` first, falls back to anon client if not set ✅
  - Upserts user record in `users` table ✅
  - Checks plan business limits before inserting ✅
  - Inserts business into `businesses` table ✅
  - Sends welcome email (non-fatal, won't break flow if it fails) ✅

### Supabase client
`lib/supabase.ts` → `createServerClient()`:
- Uses `SUPABASE_SERVICE_ROLE_KEY` (service role, bypasses RLS) if set.
- Falls back to the anon key client if `SUPABASE_SERVICE_ROLE_KEY` is missing.

**`SUPABASE_SERVICE_ROLE_KEY` is NOT in `.env.local`** — it's only in `.env.local.example`. This means in development, the service role client falls back to the anon client. If Supabase RLS policies are set up correctly on the `businesses` table (allowing inserts when authenticated via JWT), this works. If RLS is not configured correctly, inserts will silently fail or return permission errors.

**Potential issue:** The anon client is not passed a Clerk JWT — it's a raw anon key client with no user context. Supabase RLS can't authorize it as a specific user. This means **RLS-protected writes will fail in dev unless `SUPABASE_SERVICE_ROLE_KEY` is set.**

### Fix
Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` for local development.

---

## Flow 3 — Post Generation

**Status: ⚠️ BROKEN (silent degradation — user sees mock post, not an error)**

### What the code does
- `POST /api/generate/gbp-post/route.ts`:
  - Checks Clerk auth → 401 if not signed in ✅
  - Calls `enforceLimits(userId, 'gbp_post')` → blocks if plan limit hit ✅
  - Calls `generateText()` from `lib/anthropic-client.ts`
  - If AI fails or key is missing → falls back to `mockPost()` and returns `isDegraded: true`
  - Saves to `content_items` table if `business_id` is provided ✅

### The bug
`lib/anthropic-client.ts`:
```ts
const apiKey = process.env.LB_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY
const client = apiKey ? new Anthropic({ apiKey }) : null
```

`.env.local` contains **neither** `LB_ANTHROPIC_API_KEY` nor `ANTHROPIC_API_KEY`.

When `client` is null:
- Returns `{ success: false, error: 'API key not configured', isDegraded: true }`
- `gbp-post/route.ts` catches this and returns `mockPost(...)` with `isDegraded: true`
- `onboarding/page.tsx` checks `if (!json.title && !json.body)` — but mock post HAS title/body, so it displays the mock post as if it were AI-generated.

**The user sees a post and thinks it's AI-generated. It's not. No error is shown.**

### Fix
1. Add `ANTHROPIC_API_KEY=sk-ant-...` to `.env.local`.
2. Optionally surface `isDegraded: true` in the UI (show a banner: "Generated using template — AI not configured").

---

## Flow 4 — Plan Limits

**Status: ✅ WORKING**

### What the code does
`lib/plan-limits.ts` → `getUserPlan(clerkUserId)`:
1. Calls `createServerClient()` (service role if available, anon fallback).
2. Queries `users` table for `plan` and `plan_expires_at`.
3. Checks expiry — if expired, downgrades to `free` in DB and returns `'free'`.
4. Falls back to `'free'` if:
   - Supabase client not available (`!supabase`)
   - User not found (`!user?.plan`)
   - Plan string doesn't match `'solo'` or `'agency'`

**Fallback chain is solid.** No way to crash — worst case user gets `free` limits.

`enforceLimits()` correctly returns `null` (allow) or an error object (block), and callers return 403 on block.

### Minor concern
`getMonthlyUsage()` only checks the user's **first business** (`.limit(1)`) for usage. If a user has multiple businesses (Solo plan allows 3), all their monthly usage is counted against the first business only. This could allow over-generation on secondary businesses.

---

## Flow 5 — Checkout Resume (`lb_pending_plan`)

**Status: 🔴 BROKEN (feature is completely non-functional)**

### What the code does
`onboarding/page.tsx` → `useEffect` on mount:
1. Reads `localStorage.getItem('lb_pending_plan')`
2. Parses `{ plan, timestamp }` 
3. If < 1 hour old and plan is `SOLO` or `DFY` → removes key, waits 1500ms, retries checkout up to 3 times
4. If all attempts fail → sets `pendingPlanFallback` state → shows manual checkout banner

### The bug
**`lb_pending_plan` is never set anywhere in the codebase.**

- `app/pricing/page.tsx` — all CTAs link to `/check`. No localStorage writes.
- `app/check/checker-form.tsx` — plan CTAs link to `/sign-up?plan=solo` or `/sign-up?plan=dfy` as `<a href>` links. `saveScanData()` only writes `lb_scan_data` (URL, score, email), NOT `lb_pending_plan`.
- No other file sets `lb_pending_plan`.

The intended flow was presumably:
1. User on pricing/check page clicks a paid plan → `lb_pending_plan` is set → user redirected to sign-up → after sign-up, onboarding reads the key and auto-resumes checkout.

But step 1 was never implemented. The `?plan=solo` / `?plan=dfy` URL params reach the onboarding page via `searchParams`, which correctly sets `isSkipPostFlow = true` (skips the first-post step), but checkout is **never auto-triggered** because `lb_pending_plan` was never written.

### Fix
In `checker-form.tsx`, add `lb_pending_plan` write before redirecting to sign-up for paid plans:

```tsx
// In the plan CTA onClick handler (before navigating):
onClick={() => {
  try {
    localStorage.setItem('lb_pending_plan', JSON.stringify({
      plan: 'SOLO', // or 'DFY'
      timestamp: Date.now(),
    }))
  } catch {}
  saveScanData()
  // then navigate to sign-up
}}
```

Or alternatively in the `<a>` tag's `onClick`:
```tsx
<a
  href={plan.href}
  onClick={() => {
    saveScanData()
    if (plan.name !== 'Free') {
      const planKey = plan.name.includes('DFY') ? 'DFY' : 'SOLO'
      try {
        localStorage.setItem('lb_pending_plan', JSON.stringify({
          plan: planKey,
          timestamp: Date.now(),
        }))
      } catch {}
    }
  }}
>
```

---

## Critical Path Summary

The happy path for a **free user** works:
1. `/check` → scan → click Free CTA → `/sign-up?url=...&score=...`
2. Sign-up → redirected to `/onboarding` ✅
3. Fill business info → Continue → Generate First Post ✅ (but AI is mock in dev, not real)
4. Go to Dashboard ✅

The happy path for a **paid user** is broken:
1. `/check` → scan → click Solo/DFY CTA → `/sign-up?plan=solo`
2. Sign-up → redirected to `/onboarding?plan=solo` ✅ (skips post step)
3. `lb_pending_plan` was never written → checkout never auto-resumes ❌
4. User lands on dashboard without being prompted to pay

---

## Env Vars Missing from `.env.local`

| Variable | Required For | Impact if Missing |
|----------|-------------|-------------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Business creation, plan limits (RLS bypass) | Falls back to anon key — RLS may block writes |
| `ANTHROPIC_API_KEY` | Post generation | Silent degradation — mock posts served |
| `STRIPE_SECRET_KEY` | Checkout | Checkout returns 503 "Payments not configured" |
| `STRIPE_SOLO_PRICE_ID` | Checkout | Returns 400 "plan is not yet available" |
| `STRIPE_AGENCY_PRICE_ID` | (retired) | N/A |

---

## Action Items (Priority Order)

1. **🔴 HIGH** — Add `lb_pending_plan` write in `checker-form.tsx` plan CTA `onClick`. Without this, paid conversion is completely broken.
2. **🔴 HIGH** — Add `ANTHROPIC_API_KEY` to `.env.local` (and Vercel env). Without this, all AI generation is mock.
3. **🟡 MED** — Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`. Without this, writes may fail in dev if RLS is enabled.
4. **🟡 MED** — Add `/onboarding` to middleware protected routes. Currently reachable unauthenticated.
5. **🟢 LOW** — Fix `.env.local.example` to reflect actual redirect (`/onboarding`, not `/dashboard`).
6. **🟢 LOW** — Fix multi-business usage counting in `plan-limits.ts` `getMonthlyUsage()` — currently only counts first business.
