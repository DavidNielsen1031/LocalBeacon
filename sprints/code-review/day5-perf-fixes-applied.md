# Day 5: Performance & Code Cleanup — Applied Fixes

**Date:** 2026-03-19
**Branch:** main
**Commit:** 9ac79e0

---

## Summary

All Day 5 performance and cleanup items completed. Build compiles clean. 4 stale branches deleted.

---

## Fixes Applied

### I15 ✅ Dashboard sequential DB queries → Promise.all
**File:** `app/app/api/businesses/[id]/dashboard/route.ts`

The dashboard API route had 6 sequential Supabase queries after business ownership verification. All 6 independent queries (postsCount, pagesCount, reviewsCount, recentItems, aeoScans, latestPost) were wrapped in a single `Promise.all()` call. This reduces the dashboard load from ~6 serial DB round trips to ~1 (plus the ownership check which is sequential by necessity).

**Before:** 6 sequential awaits
**After:** `const [...] = await Promise.all([...6 queries...])`

### I16 ✅ /api/businesses fetch deduplication — no issue found
**Grep result:** `app/dashboard/settings/page.tsx` fetches `/api/businesses` for settings (list of businesses). `app/dashboard/page.tsx` fetches `/api/businesses/${id}/dashboard` (specific business stats). These are different endpoints serving different purposes. No duplication — no change needed.

### I17 ✅ next/image optimization — no raw `<img>` tags found
**Grep result:** Zero `<img>` tags in `app/**/*.tsx`. Already using `next/image` throughout. No change needed.

### N1 ✅ Unified API error helper created
**New file:** `app/lib/api-helpers.ts`
- Created `apiError(message, status)` helper that returns `NextResponse.json({ error: message }, { status })`
- Used immediately in the dashboard route (replacing inline `NextResponse.json` error calls)
- Ready for adoption in other routes as they're touched in future sprints

### N3 ✅ Dev dependencies — already correct
`shadcn` and `tsx` were already in `devDependencies`. No change needed.

### N4 ✅ Removed unused @stripe/stripe-js
**Command:** `npm uninstall @stripe/stripe-js`
- Confirmed: no `@stripe/stripe-js` imports found anywhere in `app/` source files
- Package removed from `package.json` and `package-lock.json`
- Note: `stripe` (server SDK) is still in dependencies and is used

### N5 ✅ Deleted ghost next.config.js
- Both `next.config.js` (compiled JS) and `next.config.ts` existed
- Deleted `next.config.js` — keeping `next.config.ts` as canonical config
- Both had identical `turbopack.root` configuration

### N6 ✅ Cleaned up stale git branches
All 4 stale branches were already merged into main:
- `content` → deleted
- `sprint/localbeacon/s13` → deleted
- `sprint/localbeacon/s15` → deleted
- `sprint/localbeacon/s16` → deleted

Repo is now clean with only `main`.

### N7 ✅ Fixed `as any` casts
Fixed 5 occurrences across 3 files + pricing page:

| File | Fix |
|------|-----|
| `app/api/content-queue/[id]/route.ts` | `as any` → `as unknown as { user_id: string } \| null` |
| `app/api/email/weekly-content/route.ts` | `as any` → `as unknown as { name, user_id, users } \| null` + added null guard |
| `app/api/email/monthly-report/route.ts` | `(business as any).users` → `(business as unknown as { users: ... }).users` |
| `app/pricing/page.tsx` | 3× `(plan as any).property` → `(plan as { property?: boolean }).property` |

All casts use typed interfaces with a `unknown` intermediary where TypeScript requires it (Supabase join return types are complex unions).

---

## Build Status

```
✓ Compiled successfully
✓ TypeScript clean (no errors)
✓ 162 static pages generated
```

**Warning (pre-existing):** `middleware` file convention deprecated — use `proxy` instead. Not a Day 5 issue.

---

## Files Changed

- `app/app/api/businesses/[id]/dashboard/route.ts` — Promise.all + apiError helper
- `app/app/api/content-queue/[id]/route.ts` — typed cast
- `app/app/api/email/monthly-report/route.ts` — typed cast
- `app/app/api/email/weekly-content/route.ts` — typed cast + null guard
- `app/app/pricing/page.tsx` — typed casts (3 locations)
- `app/lib/api-helpers.ts` — NEW: shared error helper
- `app/next.config.js` — DELETED (ghost file)
- `app/package.json` — removed @stripe/stripe-js
- `app/package-lock.json` — updated lockfile
