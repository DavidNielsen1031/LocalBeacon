# LocalBeacon Code Review — Phase 6 & 7: Performance & Code Quality

**Reviewed:** 2026-03-18  
**Branch:** `main` (be8a8da — S19)  
**Scope:** `products/localbeacon/app/`

---

## Phase 6: Performance

### 6.1 Bundle Analysis

**`next.config.ts`** — No bundle analyzer configured. Only setting is `turbopack.root`. Bonus: no `@next/bundle-analyzer` in devDependencies either. Flying blind on bundle size.

**Largest client components (by LOC):**
| File | Lines | Notes |
|------|-------|-------|
| `components/landing-content.tsx` | 1,455 | `"use client"` — entire homepage is client-side |
| `app/pricing/page.tsx` | 477 | `"use client"` — pricing page fully client |
| `app/check/checker-form.tsx` | 466 | `"use client"` — scan form |
| `app/onboarding/page.tsx` | 451 | Mixed — has `useState` + `useEffect + fetch` |
| `app/dashboard/page.tsx` | 431 | `"use client"` — dashboard home |

**Heavy client-side imports:**
- **`posthog-js`** imported directly into client components (checker-form, pricing, onboarding, ai-readiness, faq, schema, llms-txt pages). PostHog is initialized server-side in `posthog-provider.tsx` but also directly imported in 7+ client components. Could consolidate to a single hook.
- **`jspdf`** (~400KB) is only used in `app/api/reports/pdf/route.ts` (a server-side API route) — ✅ safe, never ships to browser.
- **`lucide-react`** — fine, tree-shakeable.
- **`@anthropic-ai/sdk`** — only imported in `lib/anthropic-client.ts` (server-only) — ✅ safe.

**🚨 Critical:** `landing-content.tsx` is a 1,455-line `"use client"` component that renders the entire homepage. The homepage `app/page.tsx` imports it as a server component but it opts into the client bundle immediately. All 1,455 lines ship to the browser. This should be split into a server shell + isolated client islands (FAQ accordion, dialog toggle).

### 6.2 Image Optimization

**❌ No `next/image` usage anywhere.** Zero imports found.

**Raw `<img>` tags in use:**
```
components/site-footer.tsx:23      <img src="/logo-192.png" ...>
components/landing-content.tsx:288 <img src="/logo-192.png" ...>
components/landing-content.tsx:1395 <img src="/logo-192.png" ...>
components/site-nav.tsx:43         <img src="/logo-192.png" ...>
```

All four use the same `/logo-192.png` (6.5KB). No lazy loading, no size hints, no WebP conversion, no `srcset`.

**Unoptimized assets in project root (not `public/`):**
- `logo-lighthouse.png` — **595KB** — in repo root, not served publicly but should be cleaned up
- `logo-square.png` — 99KB — same

**`public/` assets are reasonable:** logo-512.png (31KB), logo-192.png (6.5KB), logo-48.png (1.1KB).

**Action:** Replace 4x `<img>` with `<Image>` from `next/image`. Saves LCP optimization and eliminates CLS risk.

### 6.3 Caching — Static vs Dynamic

**`force-dynamic` everywhere:** 28 routes are marked `force-dynamic` — nearly the entire app.

Routes that **could be static** (no user-specific data):
- `app/api/businesses/route.ts` — `force-dynamic` is correct (reads auth + DB)
- Dashboard API routes — correct (auth-gated)
- Generate API routes — correct (AI calls)

**Routes that probably DON'T need `force-dynamic`:**
- `app/blog/[slug]/page.tsx` — already has `generateStaticParams()` ✅ (correctly static)
- `app/for/[industry]/page.tsx` — already has `generateStaticParams()` ✅ (correctly static)
- `app/page.tsx` (homepage) — no `force-dynamic`, but imports `"use client"` landing-content. Without explicit `dynamic`, Next.js may partially pre-render. No `revalidate` set.

**`revalidate` settings:** None found anywhere. The blog and industry pages use `generateStaticParams` for full static generation — appropriate. No ISR configured.

**Dashboard layout** (`app/dashboard/layout.tsx`) has `force-dynamic` at the top level, which cascades — all dashboard child pages inherit dynamic rendering. This is correct for auth.

**Summary:** Caching strategy is mostly correct. The one miss is homepage (no explicit `revalidate`), which probably defaults to static since it only calls `getAllPosts()` (filesystem). No real issue.

### 6.4 N+1 Queries

**Dashboard route** (`app/api/businesses/[id]/dashboard/route.ts`): **6 sequential Supabase queries:**
1. `users` — get user ID
2. `businesses` — verify ownership
3. `content_items` — count `gbp_post`
4. `content_items` — count `city_page`
5. `content_items` — count `review_reply`
6. `content_items` — get recent items
7. `aeo_scans` — latest score
8. `content_items` — most recent gbp_post for freshness

That's **8 sequential DB round-trips** for a single page load. The 3 count queries (#3–5) could be collapsed into a single aggregate query using Supabase's `group by` or a single query with in-memory count. The 2 gbp_post queries (#3 and #8) overlap and could be merged.

**No loop-based N+1s found** — no `for` loop with a `supabase.from()` inside. The issue is parallel-able sequential queries, not N+1.

**`app/api/businesses/route.ts` (GET):** Also hits `users` twice (once to upsert, once to get plan). Minor redundancy.

### 6.5 Client-Side Data Fetching That Could Be Server Components

**Components doing `useEffect + fetch` that could be server components:**

| Component | Pattern | Convertible? |
|-----------|---------|--------------|
| `app/dashboard/page.tsx` | `useEffect + fetch(/api/businesses/[id]/dashboard)` | ⚠️ Partially — needs `activeBusinessId` from context |
| `app/dashboard/settings/page.tsx` | `useEffect + fetch(/api/businesses)` | ⚠️ Could be server component with Clerk + Supabase direct |
| `components/usage-meter.tsx` | `useEffect + fetch(/api/businesses?include=usage)` | ✅ Could be async server component |
| `components/business-context.tsx` | `useEffect + fetch(/api/businesses)` | ❌ Context provider must be client |
| `components/add-client-wizard.tsx` | `useEffect` for pre-fill from context | ❌ Wizard requires client interactivity |
| `components/degraded-banner.tsx` | `useEffect + fetch(/api/health)` | ✅ Could be server component |

The `usage-meter` and `degraded-banner` are prime candidates for server component conversion — they have no user interaction, just display data.

**Multiple components fetch `/api/businesses` independently:** `business-context.tsx`, `usage-meter.tsx`, `settings/page.tsx`, `add-client-wizard.tsx` — 4 different places fetching the same endpoint. This causes duplicate network requests on page load.

---

## Phase 7: Code Quality

### 7.1 TypeScript Strictness

**`tsconfig.json`:** `"strict": true` ✅ — strict mode is enabled.

**`as any` usage:** 14 instances total.

```
app/api/email/monthly-report/route.ts:35  — (business as any).users
app/api/email/weekly-content/route.ts:43  — item.businesses as any
app/pricing/page.tsx:218,219,311          — (plan as any).premium, (plan as any).managed
components/landing-content.tsx:1049,1052,1055,1080,1140,1141,1142,1143,1144 — (plan as any).premium (9 instances)
```

**Root cause:** The `plan` type in `landing-content.tsx` and `pricing/page.tsx` doesn't have a `premium` or `managed` field defined in the type, so they cast to `any`. This is a missing discriminated union — the `PLANS` array has heterogeneous shape but a shared type.

**`@ts-ignore` / `@ts-expect-error` / `as unknown`:** **Zero found** ✅

**Verdict:** TypeScript health is decent. The 14 `as any` instances are concentrated in plan/pricing types — one proper union type fix would eliminate most of them.

### 7.2 Lint Config

**`eslint.config.mjs`:**
```js
defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
```

- Uses `eslint-config-next/core-web-vitals` + TypeScript rules ✅
- **No disabled rules** — no `// eslint-disable` comments found
- **No `rules: {}` overrides** — using defaults entirely
- Flat config (ESLint 9) ✅
- **No `lint` script verified in `package.json`** — will check separately

**Concern:** No custom rules for `no-console`, `no-unused-vars` beyond TypeScript defaults, or import ordering. These are common additions that would catch some of the issues below.

### 7.3 Dead Code

**No TODO/FIXME/HACK comments found** — clean.

**Commented-out code:** None found in grep scan.

**One silent error suppression:**
```ts
// app/dashboard/posts/page.tsx:123
// handle error silently
```
— the `catch` block after this comment does nothing, swallowing errors.

**Potential dead code:**
- `app/dashboard/posts/page.tsx` — `DEMO_POSTS` hardcoded array initialized with `useState` — this appears to be demo/placeholder data that was never replaced with real API data. Posts pipeline tab shows hardcoded demo data.
- `app/dashboard/audit/page.tsx` — `AUDIT_ITEMS` is a hardcoded static array, never fetched from DB.

**`app/dashboard/reports/page.tsx`** — only has `force-dynamic` declared at top, likely thin page wrapping the PDF download button.

### 7.4 Console.log Statements

**Total `console.*` calls: 28**
- `console.log`: 12
- `console.error`: 12
- `console.warn`: 2
- `console.error` (content-queue): 1 unstructured — `'content_queue update error:', error`
- `console.error` (pricing client): 1 unstructured — `"Checkout error:", data.error`
- `console.warn` (stripe.ts): 2 unstructured warnings — `"[stripe] STRIPE_SECRET_KEY not set"`
- `console.error` (email.ts): 3 unstructured

**Structured (JSON) logging in:** `app/api/ai-readiness/route.ts`, `app/api/leads/route.ts`, `lib/anthropic-client.ts`, `app/api/webhook/route.ts` — ✅ good practice.

**Unstructured debug-style logs in:**
- `app/api/content-queue/[id]/route.ts` — `console.error('content_queue update error:', error)` — should be JSON
- `app/pricing/page.tsx` — `console.error("Checkout error:", data.error)` — client-side, visible in browser console
- `lib/email.ts` — mixed: some structured, some `[email] text:` prefix style
- `lib/stripe.ts` — startup warnings are acceptable

**Overall:** Logging discipline is decent on server routes (mostly structured JSON). Client-side `console.error` in `pricing/page.tsx` should be removed or sent to PostHog instead.

### 7.5 Git Cleanup

**Branches:**
| Branch | Last Commit | Status |
|--------|-------------|--------|
| `main` | Today (S19) | ✅ Active |
| `content` | Today | ⚠️ Likely stale — AEO self-scan cron script |
| `sprint/localbeacon/s16` | Today | ⚠️ Merged, delete |
| `sprint/localbeacon/s15` | Today | ⚠️ Merged, delete |
| `sprint/localbeacon/s13` | Today | ⚠️ Merged, delete |

Remote: `github/sprint/localbeacon/s12` — also stale, delete from remote.

**Action:** Delete merged sprint branches locally and remotely:
```bash
git branch -d sprint/localbeacon/s13 sprint/localbeacon/s15 sprint/localbeacon/s16
git push github --delete sprint/localbeacon/s12 sprint/localbeacon/s13
```

`content` branch needs review — if the AEO cron script was shipped, merge and delete.

### 7.6 Code Consistency

**Import patterns:** ✅ Consistent — all use `@/` alias (`@/lib/`, `@/components/`, `@/app/`). No relative deep imports.

**Naming conventions:**
- Files: `kebab-case` for files ✅ (`site-nav.tsx`, `usage-meter.tsx`)
- Components: `PascalCase` exports ✅
- API routes: `camelCase` function exports (`GET`, `POST`) ✅
- Inconsistency: `app/dashboard/queue/queue-actions.tsx` uses `queue-actions` (compound) vs single-word pattern elsewhere — minor.

**"use client" placement:** All correct — top of file before imports ✅

**File organization:**
- Dashboard pages live under `app/dashboard/[feature]/page.tsx` — consistent ✅
- API routes under `app/api/[feature]/route.ts` — consistent ✅
- Shared lib under `lib/` — consistent ✅
- Industry data split into `lib/industry-data/[vertical].ts` files — well-organized ✅

**Two `next.config` files exist:** `next.config.ts` AND `next.config.js` both present in root. Next.js will use `next.config.ts` (TypeScript takes precedence in newer versions), but `next.config.js` is a ghost file that could cause confusion. **Delete `next.config.js`.**

---

## Summary: Priority Findings

### 🔴 Critical
1. **`landing-content.tsx` is a 1,455-line `"use client"` component** — entire homepage ships to browser. Split into server shell + client islands.
2. **Dashboard makes 8 sequential DB queries** — parallelize with `Promise.all()` or merge the 3 count queries into one.

### 🟡 Warning
3. **No `next/image` used anywhere** — 4 raw `<img>` tags, no lazy loading or size optimization.
4. **`/api/businesses` fetched 4× independently** — `business-context`, `usage-meter`, `settings`, `add-client-wizard` all fire separately. Consider passing data down from context or using SWR deduplication.
5. **14 `as any` casts** — concentrated in pricing plan types. One discriminated union type fix cleans most.
6. **Two `next.config` files** — `next.config.js` is a ghost, delete it.
7. **`content` branch** — stale, needs merge or delete.
8. **Merged sprint branches** (`s13`, `s15`, `s16`) — delete locally and remotely.

### 🟢 Info
9. **No bundle analyzer** — add `@next/bundle-analyzer` to devDependencies for CI insight.
10. **`DEMO_POSTS` and `AUDIT_ITEMS`** are hardcoded placeholder arrays — should be tracked as backlog items to replace with real data.
11. **Client-side `console.error`** in `pricing/page.tsx` — send to PostHog instead.
12. **`posthog-js` imported in 7+ files** — consolidate to a single `usePostHog` hook.
13. **No custom lint rules** for `no-console` or import ordering — worth adding.
