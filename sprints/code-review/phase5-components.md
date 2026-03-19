# Phase 5: Components & Pages Code Review

**Reviewed:** 2026-03-18  
**Scope:** All `app/**/*.tsx` pages and `components/**/*.tsx`  
**Files reviewed:** 45 TSX files (15 dashboard pages, 8 marketing pages, 22 components)

---

## 1. Client vs. Server Split

### Summary
Most dashboard pages are `'use client'` — some unnecessarily so. Several pages do data fetching client-side via `useEffect + fetch` that could be server components.

### Pages using `'use client'`
| Page/Component | Justified? | Notes |
|---|---|---|
| `dashboard/page.tsx` | ✅ Yes | Uses `useUser`, `useState`, `useEffect` for async fetch |
| `dashboard/posts/page.tsx` | ✅ Yes | Full interactive UI, edit states |
| `dashboard/pages/page.tsx` | ✅ Yes | Dialog, generation, preview |
| `dashboard/reviews/page.tsx` | ✅ Yes | Form, real-time state |
| `dashboard/ai-readiness/page.tsx` | ✅ Yes | Scan input, dynamic results |
| `dashboard/blog/page.tsx` | ✅ Yes | Generator, expand state |
| `dashboard/faq/page.tsx` | ✅ Yes | Form + results |
| `dashboard/llms-txt/page.tsx` | ✅ Yes | Form + download |
| `dashboard/audit/page.tsx` | ✅ Yes | Checkbox toggles |
| `dashboard/schema/page.tsx` | ✅ Yes | Tab state, copy |
| `dashboard/competitors/page.tsx` | ✅ Yes | Async scans |
| `dashboard/settings/page.tsx` | ✅ Yes | Form, save |
| `components/landing-content.tsx` | ⚠️ Partially | FAQ accordion needs state; everything else is static. Could split into Server component + thin `FAQSection` client component. At ~700 lines this is a large client bundle. |
| `pricing/page.tsx` | ⚠️ Partially | Only checkout handler and dialog need state. Could be server + small client island. |
| `onboarding/page.tsx` | ✅ Yes | Multi-step wizard, router |
| `check/checker-form.tsx` | ✅ Yes | Scan state machine |
| `components/site-nav.tsx` | ❌ Unnecessary | No state used! Just renders static links. Uses inline `dangerouslySetInnerHTML` for a scroll shadow — that JS is better as CSS `box-shadow` on scroll. Should be a Server Component. |
| `components/business-context.tsx` | ✅ Yes | Context provider |
| `components/dashboard/sidebar.tsx` | ✅ Yes | Mobile sheet state |
| `components/degraded-banner.tsx` | Check needed | Not reviewed in detail |
| `components/add-client-wizard.tsx` | ✅ Yes | Dialog wizard |

### Server Components (correct)
- `app/layout.tsx` — Server ✅
- `app/dashboard/layout.tsx` — Server ✅ (fetches businesses server-side, good)
- `app/dashboard/queue/page.tsx` — Server ✅ (reads from Supabase, correct)
- `app/dashboard/reports/page.tsx` — Server ✅
- `app/blog/page.tsx` — Server ✅
- `app/for/[industry]/page.tsx` — Server ✅
- `app/check/page.tsx` — Server ✅ (with Suspense boundary for CheckerForm)
- `components/empty-state.tsx` — Server ✅ (no client directive)

### Recommendations
1. **`site-nav.tsx`** — Remove `'use client'`. Replace the scroll shadow JS with CSS `transition`/`@supports`. This ships unnecessary JS on every page.
2. **`landing-content.tsx`** — Split: keep it as a Server component, extract only `FAQItem` as a client component. This is a ~700-line client bundle loaded on the landing page.
3. **`pricing/page.tsx`** — Extract checkout buttons into a `PricingCTA` client component. Rest can be static.

---

## 2. Shared Component Consolidation

### Duplicate UI Patterns Found

#### A. Button/CTA patterns (5+ different implementations)
The codebase has a mix of the `Button` shadcn/ui component AND raw `<button>` elements styled inline. This creates inconsistency:

```tsx
// landing-content.tsx — raw button with inline styles
<button style={{ backgroundColor: ORANGE, color: "#fff", ... }}>

// dashboard/page.tsx — shadcn Button component
<Button className="... text-white" style={{ backgroundColor: "#FF6B35" }}>

// check/page.tsx — raw anchor styled like a button
<a className="inline-block px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg">
```

**Affected files:** `landing-content.tsx`, `pricing/page.tsx`, `check/page.tsx`, `for/[industry]/page.tsx`, `onboarding/page.tsx`, `check/checker-form.tsx`

**Fix:** Standardize on shadcn `Button` everywhere. Create `variant="primary"` as default, `variant="outline"` for secondary. Kill inline `style={{ backgroundColor: '#FF6B35' }}` on buttons.

#### B. Nav duplicated 3 times
| File | Type |
|---|---|
| `components/landing-content.tsx` | Inline nav (sticky, with scroll shadow JS) |
| `components/site-nav.tsx` | Separate nav component (slightly different links) |
| `check/page.tsx` | Inline nav (different logo size, "Sign in →" link) |
| `for/[industry]/page.tsx` | Inline nav (yet another variant) |

`SiteNav` exists as a component but isn't used by `landing-content.tsx` or the industry pages. Four different nav implementations.

**Fix:** Use `SiteNav` everywhere. Add a `variant` prop if slight differences are needed.

#### C. Footer duplicated 4 times
`landing-content.tsx`, `pricing/page.tsx`, `check/page.tsx`, `for/[industry]/page.tsx` all have inline footers. `SiteFooter` component exists but is only used by `blog/page.tsx` and `blog/[slug]/page.tsx`.

**Fix:** Replace all inline footers with `<SiteFooter />`.

#### D. Color constants re-declared in every file
`ORANGE`, `NAVY`, `SLATE`, `MIST`, `WARM_WHITE` are declared as `const` at the top of every marketing file (~15 files). `app/lib/design-tokens.ts` exists but appears to not be imported by most files.

**Fix:** Import from `app/lib/design-tokens.ts` instead of re-declaring.

#### E. Plan upgrade CTA patterns (~3 implementations)
- `UpgradeGate` component (reusable, good)
- `reports/page.tsx` has a hardcoded lock screen that duplicates `UpgradeGate` logic
- `pages/page.tsx` has a hardcoded inline banner at page bottom ("upgrade to Solo for 10 pages")

**Fix:** Use `UpgradeGate` consistently.

---

## 3. Accessibility

### Critical Issues

#### A. Images without `alt` text — LOW CONTRAST / NO FALLBACK
All `<img src="/logo-192.png">` in `landing-content.tsx`, `for/[industry]/page.tsx`, `site-nav.tsx` have `alt="LocalBeacon"` ✅. However:

#### B. `<button>` elements without accessible labels
```tsx
// dashboard/page.tsx
<button onClick={() => setUpgradeBannerDismissed(true)} className="text-xs shrink-0">
  ✕
</button>
```
The dismiss button is just `✕` — no `aria-label`. Screen readers will say "X button".

```tsx
// posts/page.tsx — action buttons
<Button size="sm" variant="ghost" className="text-xs">
  →  ← just an arrow, no aria-label
</Button>
```

```tsx
// dashboard/sidebar.tsx (mobile hamburger)
<button aria-label="Open menu"> ✅  // This one is fine
```

#### C. Form inputs without `<label>` association
```tsx
// ai-readiness/page.tsx
<label className="block text-sm font-medium text-[#2D3436] mb-2">
  Enter your website URL  // Not linked to input via htmlFor/id
</label>
<input type="text" ... />
```
The `<label>` and `<input>` have no `id`/`htmlFor` link — screen readers can't associate them.

Same issue in:
- `dashboard/competitors/page.tsx` — URL inputs have no labels at all
- `blog/page.tsx` — "City or neighborhood" and "Topic" inputs use `<label>` tags but without `htmlFor`
- `llms-txt/page.tsx` — all inputs use `<label>` without `htmlFor`
- `check/checker-form.tsx` — URL input has no label

#### D. Star rating buttons in reviews page
```tsx
{STAR_RATINGS.map(star => (
  <button key={star} onClick={() => setRating(star)} className="text-2xl ...">
    ⭐
  </button>
))}
```
No `aria-label` on these buttons. Screen reader says "button, button, button, button, button". Should be `aria-label={`${star} star${star !== 1 ? 's' : ''}`}` + `aria-pressed={star <= rating}`.

#### E. Post type selector buttons (posts/page.tsx, blog/page.tsx)
```tsx
<button onClick={() => setPostType(type.value)} className="p-3 rounded-lg border ...">
  <div className="text-2xl mb-1">{type.emoji}</div>
  <div>{type.label}</div>
</button>
```
Missing `role="radio"` / `aria-pressed` or `aria-selected` for the active state. The visual highlight doesn't communicate selection to screen readers.

#### F. Missing `aria-expanded` on collapsible elements
- `dashboard/sidebar.tsx` — business switcher dropdown toggle has no `aria-expanded`
- `blog/page.tsx` (blog post expand/collapse) — no `aria-expanded` on the expand toggle

#### G. FAQ `<details>` element (for/[industry]/page.tsx)
Uses native `<details>/<summary>` — accessible by default ✅. However the `summary` has `listStyle: "none"` which hides the default disclosure triangle but doesn't add a replacement — not ideal visually.

#### H. FAQItem component (landing-content.tsx)
```tsx
<button aria-expanded={open}> ✅  // Has aria-expanded
```
But missing `aria-controls` pointing to the answer panel, and the answer panel has no `id` or `role="region"`. The `aria-expanded` is there but not fully wired.

#### I. Color contrast
- `text-[#636E72]` on `#FAFAF7` background = ~3.5:1 contrast ratio. Fails WCAG AA (4.5:1 required for normal text). Used pervasively.
- `text-[#B2BEC3]` (pricing notes) = ~2.4:1 — fails even WCAG AA large text (3:1).
- `rgba(255,255,255,0.35)` on dark navy background = ~1.8:1 — fails all levels. Used in landing CTA section footer text.

---

## 4. Mobile Responsiveness

### Generally Good
Most pages use responsive Tailwind classes properly. The dashboard layout (`flex-col md:flex-row`) correctly stacks on mobile.

### Issues Found

#### A. `landing-content.tsx` — Center nav hidden on mobile, but no hamburger
```tsx
<div className="hidden md:flex items-center gap-8">
  {/* nav links */}
</div>
```
On mobile, the center nav links (How It Works, Pricing, Sign In) disappear with no hamburger menu. Only the CTA button remains. Users have no way to navigate to those sections on mobile.

**Same issue in `site-nav.tsx`** — center links hidden on mobile, no mobile menu.

#### B. Pricing page — 4-column grid on small screens
```tsx
<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```
At `md` (768px), this becomes 2-column. The "Most Popular" badge is `absolute -top-3` with negative margin — could overflow on small viewports if not clipped by parent.

#### C. Competitor comparison table — no horizontal scroll wrapper
```tsx
// competitors/page.tsx
<table className="w-full text-sm">
```
The comparison table has no `overflow-x-auto` wrapper. On narrow screens, a 3-competitor table will overflow the viewport without scrolling.

**Same issue in `check/checker-form.tsx`** comparison table.

#### D. Dashboard main area — no max-height overflow
```tsx
// ai-readiness/page.tsx
<div className="space-y-8">  // No px-6 py-8 padding
```
AI Readiness and a few other dashboard pages use `space-y-8` as the root but no horizontal padding — content may bleed to viewport edges on mobile.

#### E. Queue page — items layout
The queue items have `flex items-start justify-between` with multiple elements that may not wrap gracefully on very small screens (< 375px).

---

## 5. Loading / Error / Empty States

### Summary Table
| Page | Loading | Error | Empty |
|---|---|---|---|
| `dashboard/page.tsx` | ✅ "Loading dashboard..." | ❌ Silent (`catch(() => setData(null))`) | ✅ "Welcome, let's get set up" |
| `dashboard/posts/page.tsx` | ✅ Spinner in button | ❌ `catch` silently swallowed | ✅ EmptyState component |
| `dashboard/pages/page.tsx` | ✅ Spinner in button | ❌ `catch` silently swallowed | ✅ EmptyState component |
| `dashboard/reviews/page.tsx` | ✅ Spinner in button | ❌ Silent catch | ✅ EmptyState when no response yet |
| `dashboard/ai-readiness/page.tsx` | ✅ Full spinner + text | ✅ `setError(...)` shown | ✅ "Check Your AI Visibility" empty |
| `dashboard/blog/page.tsx` | ✅ Spinner + message | ✅ `setError(...)` shown | ✅ EmptyState |
| `dashboard/faq/page.tsx` | ✅ Button state | ❌ Silent catch | ✅ Empty state section |
| `dashboard/llms-txt/page.tsx` | ✅ Button state | ❌ Silent catch | ✅ Empty state section |
| `dashboard/audit/page.tsx` | ❌ No loading state (static data) | N/A | N/A (always has data) |
| `dashboard/schema/page.tsx` | N/A (computed, not async) | N/A | ⚠️ Demo mode banner shown instead |
| `dashboard/competitors/page.tsx` | ✅ Per-item loading skeleton | ❌ Silent null on scan failure | ✅ EmptyState |
| `dashboard/reports/page.tsx` | ❌ No loading indicator (server component) | ❌ No error state if DB fails | ✅ EmptyState |
| `dashboard/queue/page.tsx` | N/A (server component) | ❌ No error state if DB fails | ✅ EmptyState |
| `dashboard/settings/page.tsx` | ✅ `disabled={loading}` | ❌ Silent catch on load AND save | ⚠️ No empty state for missing business |

### Key Issues

#### A. Silent error swallowing is pervasive
At least 8 dashboard pages use `catch(() => {})` or `catch(() => setData(null))` without surfacing any error to the user. When the API fails, pages silently show empty state or stale data with no explanation.

**Affected:** posts, pages, reviews, faq, llms-txt, settings (load AND save), competitors.

**Fix:** Add a minimal error state: `setError('Failed to generate. Please try again.')` with a visible `<p className="text-red-400">` below the action.

#### B. Settings page — silent save failure
```tsx
const handleSave = async () => {
  ...
  try {
    const res = await fetch("/api/businesses", { method: "POST", ... })
    if (res.ok) { setSaved(true) }
  } catch {
    // Silently fail — form stays as-is
  }
```
If save fails (network error, auth issue), the user sees nothing. They think they saved but they didn't.

#### C. Reports page — no loading state
The server component fetches from Supabase and renders synchronously. If the DB is slow, Next.js streaming will show a blank page with no skeleton. Consider adding a `loading.tsx` at the reports route.

#### D. Dashboard loading covers only `hasBusiness` case
```tsx
{loading && hasBusiness && (
  <div>Loading dashboard...</div>
)}
```
If `loading` is true but `!hasBusiness`, no loading indicator shows — the page shows the "set up" empty state immediately, which can flicker before the actual business data loads.

---

## 6. Dead JSX / TODO Comments / Commented Code

### Issues Found

#### A. Duplicate "Monthly Report" card in dashboard
`dashboard/page.tsx` renders the Monthly Visibility Report CTA **twice**:
- Once in the stats area (line ~180): "Download Report" → `/api/reports/pdf`
- Again at the bottom: "View Monthly Progress Report" → `/dashboard/reports`

These are two different CTAs but they're both rendered unconditionally when `hasBusiness`. The top one is a PDF download, the bottom one links to the in-app report. This is confusing — a user sees two "report" buttons.

#### B. `publishedPostCount` computed but redundant
```tsx
// posts/page.tsx
const publishedPostCount = posts.filter(p => p.status === 'published').length
```
`published` is already computed 2 lines earlier as:
```tsx
const published = posts.filter(p => p.status === 'published').length
```
`publishedPostCount` duplicates `published`. Dead variable.

#### C. `export const dynamic = 'force-dynamic'` on client components
Several pages have both `'use client'` AND `export const dynamic = 'force-dynamic'`:
- `posts/page.tsx`
- `pages/page.tsx`
- `reviews/page.tsx`
- `blog/page.tsx`
- etc.

`force-dynamic` has no effect on client components — it's a server-side directive. These can be removed without any behavior change.

#### D. `bg-white0` typo in blog.tsx and llms-txt.tsx
```tsx
className="w-full bg-white0 border border-[#DFE6E9] ..."
```
`bg-white0` is not a valid Tailwind class (should be `bg-white`). This silently fails — element gets no background. Appears in:
- `blog/page.tsx` (two inputs)
- `llms-txt/page.tsx` (pre block): `bg-white0 rounded-lg p-4`

#### E. `check/page.tsx` — inline nav could use `SiteNav`
The `/check` page builds its own nav inline with slightly different markup (emoji logo, "Sign in →" instead of "Get Started Free"). Given `SiteNav` exists, this should use it.

#### F. Empty `catch` blocks masking errors
```tsx
try { posthog.capture(...) } catch {}  // Analytics — acceptable
try { ... } catch { /* handle silently */ }  // API calls — not acceptable
```
The posthog catches are fine. API `catch` blocks that swallow errors should at minimum `console.error` in dev.

#### G. `add-client-wizard.tsx` — `showCloseButton` prop not in Dialog spec
```tsx
<DialogContent showCloseButton={!loading}>
```
The shadcn `DialogContent` doesn't have a `showCloseButton` prop by default. This either does nothing or requires a custom extension of the component. Worth verifying this actually works.

---

## Summary: Priority Matrix

### 🔴 Critical (Fix Before Launch)
1. **Silent error swallowing** — 8+ pages swallow API errors silently. Users have no feedback on failure.
2. **Form inputs without labels** — Accessibility failure across all tool pages. `htmlFor`/`id` links missing.
3. **`bg-white0` typo** — Inputs in blog and llms-txt have invisible backgrounds in some environments.
4. **Star rating buttons** — No `aria-label` on interactive star buttons in reviews page.

### 🟡 Important (Sprint Backlog)
5. **`site-nav.tsx` as server component** — Remove `'use client'`, eliminate scroll shadow JS.
6. **Mobile nav menu** — No hamburger on mobile for marketing pages. Users can't access Pricing/How It Works links.
7. **Comparison tables** — Missing `overflow-x-auto` wrapper in competitors and check pages.
8. **Duplicate nav/footer** — 4 nav implementations, 4 footer implementations. Consolidate to `SiteNav`/`SiteFooter`.
9. **Color contrast** — `#636E72` on `#FAFAF7` fails WCAG AA. Consider darkening to `#4A5568`.
10. **Reports/Queue no loading.tsx** — Add skeleton loading states for server-rendered pages.

### 🔵 Nice to Have (Future)
11. **Split landing-content.tsx** — Extract FAQ as client component, rest as server. Reduces client bundle.
12. **Split pricing.tsx** — Extract checkout button island. 
13. **Remove `force-dynamic` from client pages** — Cleanup, no behavior change.
14. **Remove `publishedPostCount` duplicate** — Dead code.
15. **Deduplicate report CTAs** on dashboard — Two "monthly report" cards is confusing.
16. **Import design tokens** — Replace per-file color constants with imports from `app/lib/design-tokens.ts`.
17. **`aria-controls`/`aria-selected` on post type selectors** — Full keyboard navigation for interactive widgets.
18. **`aria-expanded` on sidebar business switcher** — Missing but not critical.
