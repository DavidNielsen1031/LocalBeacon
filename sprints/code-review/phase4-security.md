# Phase 4: Security Hardening

> **Reviewed:** 2026-03-18 | **Reviewer:** Alexander 🦊 | **Codebase:** `products/localbeacon/app/`
> **Builds on:** `round1-phases1-3.md` (phases 1–3 catalogued API-level issues)
> **Focus:** Middleware, Supabase RLS, secrets, XSS, CSRF, supply chain

---

## 1. Middleware & Route Protection

**File:** `middleware.ts`

```ts
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### Findings

**🟢 Dashboard routes correctly protected** — `createRouteMatcher(["/dashboard(.*)"])` covers all nested routes: `/dashboard`, `/dashboard/posts`, `/dashboard/settings`, etc. Unauthenticated users are redirected to `/sign-in` with the original URL preserved as `redirect_url`.

**🟢 Matcher config is sound** — The `/(api|trpc)(.*)` pattern ensures middleware runs on all API routes. The static file exclusion pattern correctly skips assets. No obvious bypass via static extension tricks (`.json` is not excluded — `js(?!on)` negative lookahead covers this).

**🟢 No route bypass found** — There's no case-sensitivity issue, path traversal escape, or trailing-slash bypass. Next.js normalizes paths before matching.

**🔴 No CSP headers anywhere** — `next.config.ts` has no `headers()` config. No `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, or `Referrer-Policy` is set at the framework level. These must be added — their absence makes XSS findings below more impactful.

**🟡 No CORS configuration** — No `Access-Control-Allow-Origin` restrictions on API routes. Next.js defaults protect browser-based cross-origin JSON requests (preflight required), but this is not explicitly enforced. The cron routes (`/api/email/*`) being fully public makes this more relevant.

**🟡 API routes have no middleware-level auth backstop** — Middleware guards `/dashboard(.*)` only. All `/api/*` routes rely on per-route `auth()` calls. If a developer adds a new API route and forgets the auth check, there's no safety net at the middleware level. Phases 1–3 showed this already bit us (cron routes, content-queue ownership).

**🟡 `/onboarding` is unprotected** — Public route. Low risk (no sensitive data served), but worth documenting as intentional.

### Recommendations

| # | Severity | Action |
|---|---|---|
| M-1 | 🔴 | Add security headers to `next.config.ts`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, CSP with `script-src 'self' 'nonce-...'` |
| M-2 | 🟡 | Extend `isProtectedRoute` or add a second `isCronRoute` matcher to enforce `Authorization: Bearer` header checks at the middleware level for `/api/email/*` |
| M-3 | 🟢 | Add an explicit comment in `middleware.ts` that API auth is the responsibility of each route handler |

---

## 2. Supabase Row Level Security (RLS)

### Tables & RLS Status

| Table | RLS Enabled? | Policies | Source File |
|---|---|---|---|
| `users` | ✅ Yes | SELECT/UPDATE/INSERT own profile via `clerk_id` | `supabase/migrations/001_initial_schema.sql` |
| `businesses` | ✅ Yes | SELECT/INSERT/UPDATE/DELETE own businesses | `001_initial_schema.sql` |
| `content_items` | ✅ Yes | ALL own content via business→user join | `001_initial_schema.sql` |
| `reviews` | ✅ Yes | ALL own reviews via business→user join | `001_initial_schema.sql` |
| `leads` | ✅ RLS enabled | ⛔ **No policies defined** — service role only by comment, not enforced | `migrations/leads_and_competitor_scans.sql` |
| `competitor_scans` | ✅ Yes | SELECT only (own). **No INSERT/UPDATE/DELETE policy** | `migrations/leads_and_competitor_scans.sql` |
| `content_queue` | ⛔ **RLS NOT ENABLED** | **No RLS, no policies** | `migrations/content_queue.sql` |
| `aeo_scans` | ❓ **Unknown — no migration exists** | No CREATE TABLE found in any `.sql` file | Missing |

### Critical Findings

**🔴 `content_queue` has no RLS** — The migration creates the table but never calls `ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY`. With the Supabase anon key exposed in the client bundle (`NEXT_PUBLIC_SUPABASE_ANON_KEY`), any user who inspects the JS bundle can query or modify ALL content queue rows for ALL users directly via the Supabase REST API — bypassing Next.js API routes entirely.

Combined with Phase 3's finding that `/api/content-queue/[id]` PATCH has no ownership check, this table is doubly unprotected.

**🔴 `aeo_scans` table has no migration** — The table is referenced in 6+ source files but doesn't exist in any migration. It was created manually in the Supabase dashboard. This means:
- RLS status is unknown (likely none, since it wasn't scripted)
- Schema can't be reproduced in a new environment
- If RLS is off, all scan data for all users is readable via anon key

**🟡 `leads` table: RLS enabled, no policies = access depends on key** — With RLS on and no policies, anon key gets zero access (Supabase default-deny). Service role bypasses RLS entirely. This is actually the *intended* behavior (comment in migration says "service role only"), but it's enforced by convention, not by policy. Anyone who gets the service role key can read all leads.

**🟡 `competitor_scans`: SELECT policy only, INSERT unprotected** — There's a SELECT RLS policy so users can only read their own scans. But there's no INSERT `WITH CHECK` policy. Any authenticated user can insert a `competitor_scan` row for any `business_id` via the anon key. UPDATE/DELETE are denied by default (no policy = deny).

**🔴 RLS policies rely on `current_setting('app.clerk_user_id', true)` which is never set** — The initial schema policies use a custom Postgres session variable:
```sql
using (clerk_id = current_setting('app.clerk_user_id', true))
```
Looking at `lib/supabase.ts`, `createServerClient()` creates a plain Supabase client with the service role key — it never sets this session variable. The service role bypasses RLS entirely, so these policies are never actually evaluated in practice. **This means RLS is not functioning as a real security boundary for the main tables** — security relies entirely on application-level ownership checks in API routes.

This is an important architectural truth that must be documented: either (a) accept service-role-only and ensure every route has ownership checks, or (b) switch to user-scoped JWTs that Supabase's `auth.uid()` can validate.

The later `competitor_scans` policy correctly uses `auth.uid()::text` which works with Supabase's native auth — but LocalBeacon uses Clerk, not Supabase Auth, so `auth.uid()` is also likely null in all requests.

### Recommendations

| # | Severity | Action |
|---|---|---|
| R-1 | 🔴 | `ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY` + add ownership policies joining through `businesses` |
| R-2 | 🔴 | Create migration for `aeo_scans`: `CREATE TABLE IF NOT EXISTS aeo_scans (...)` with RLS enabled and appropriate policies |
| R-3 | 🔴 | Document security model explicitly: "Service role key used server-side; RLS policies on main tables are aspirational — real enforcement is via API route ownership checks." Then audit every API route for ownership. |
| R-4 | 🟡 | Add INSERT `WITH CHECK` policy to `competitor_scans` |
| R-5 | 🟡 | Consider migrating to Clerk JWT → Supabase JWT forwarding so `auth.uid()` works properly and RLS becomes a real defense layer |

---

## 3. Secrets Audit

### Hardcoded Values in Source

**🔴 Three Stripe Price IDs hardcoded in `lib/stripe.ts`:**
```ts
priceId: process.env.STRIPE_SOLO_PRICE_ID || "price_1T6LhxB0OqzCjZpvnGc84VN7",
priceId: process.env.STRIPE_AGENCY_PRICE_ID || "price_1T6LhxB0OqzCjZpvcNk2NQUO",
priceId: process.env.STRIPE_DFY_PRICE_ID || "price_1TCRxpB0OqzCjZpvVebA66dn",
```
These are real Stripe price IDs committed to source (and git history). They are test-mode IDs. If a production Stripe key is paired with these IDs when env vars are unset, checkout sessions will silently fail. More importantly: price IDs in git history can't be unscrambled — the fallbacks should be removed entirely.

**🟢 No live API keys, bearer tokens, or passwords hardcoded** — Grep for `sk_live`, `sk_test`, `whsec_`, `password =`, `apikey =`, `Bearer [A-Za-z0-9]{20,}` found nothing sensitive.

**🟢 `.env.local` only contains expected local dev values** — `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `VERCEL_OIDC_TOKEN`. All are expected and appropriate for a local dev file that is (presumably) gitignored.

**🟢 `next.config.ts` exposes no secrets** — Config contains only Turbopack settings. No `env:` block exfiltrates server-side secrets to client bundle.

### NEXT_PUBLIC_ Client Bundle Exposure

| Variable | In Client Bundle | Sensitivity | Risk |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Low | Designed to be public. RLS (when working) is the guard. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Low | Designed to be public — but see content_queue RLS finding above |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | None | Designed to be public |
| `NEXT_PUBLIC_APP_URL` | ✅ | None | Domain only |
| `NEXT_PUBLIC_POSTHOG_KEY` | ✅ | None | Write-only analytics key, public by design |
| `NEXT_PUBLIC_POSTHOG_HOST` | ✅ | None | Hostname only |

**🟢 No server-side secrets in `NEXT_PUBLIC_` vars** — `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, and `CLERK_SECRET_KEY` all stay server-side. No leakage to client bundle.

**🔴 Anon key exposure + missing RLS = direct table access** — The anon key is in the client bundle by design. When `content_queue` has no RLS, anyone can extract `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the bundle and make direct Supabase REST API calls to read/write/delete all content queue rows.

### Recommendations

| # | Severity | Action |
|---|---|---|
| S-1 | 🔴 | Remove hardcoded Stripe price ID fallbacks from `lib/stripe.ts`. Throw at startup if env var is missing: `if (!process.env.STRIPE_SOLO_PRICE_ID) throw new Error('STRIPE_SOLO_PRICE_ID required')` |
| S-2 | 🔴 | Fix `content_queue` RLS — anon key in client bundle + no RLS = full table exposure |
| S-3 | 🟡 | Verify `.env.local` is in `.gitignore` (check `git ls-files --error-unmatch .env.local`) |
| S-4 | 🟡 | Add `.env.local.example` entry for `RESEND_API_KEY` and `STRIPE_DFY_PRICE_ID` — currently missing from the example file |

---

## 4. XSS Vectors

### `dangerouslySetInnerHTML` Usage (all files, excluding node_modules)

| File | Line | Content | Safe? |
|---|---|---|---|
| `app/blog/page.tsx` | 133 | Inline CSS with hardcoded `ORANGE` constant | ✅ Static |
| `app/blog/[slug]/page.tsx` | 113 | `JSON.stringify(articleSchema)` | ✅ JSON.stringify escapes HTML |
| `app/blog/[slug]/page.tsx` | 117 | `JSON.stringify(breadcrumbSchema)` | ✅ Safe |
| `app/blog/[slug]/page.tsx` | 121 | Hardcoded script content | ✅ Static |
| `app/blog/[slug]/page.tsx` | 199 | **`post.content` — markdown→HTML via remark** | ⚠️ See below |
| `app/dashboard/pages/page.tsx` | 121 | **`previewPage.html` — raw AI-generated HTML** | 🔴 **UNSAFE** |
| `app/layout.tsx` | 60 | `JSON.stringify({...})` JSON-LD schema | ✅ Safe |
| `app/for/[industry]/page.tsx` | 70 | `JSON.stringify(faqSchema)` | ✅ Safe |
| `components/landing-content.tsx` | 267 | Hardcoded CSS string | ✅ Static |
| `components/landing-content.tsx` | 1295 | `JSON.stringify({...})` | ✅ Safe |
| `components/site-nav.tsx` | 23 | Hardcoded `<script>` inline CSS | ✅ Static |

### Critical Findings

**🔴 `app/dashboard/pages/page.tsx` renders unsanitized AI-generated HTML:**
```tsx
<div className="p-6 prose prose-sm max-w-none"
  dangerouslySetInnerHTML={{ __html: previewPage.html }} />
```
`previewPage.html` comes from `/api/generate/service-page`, which prompts Claude to return raw HTML. The API response is assigned directly to `previewPage` state and rendered without sanitization.

Attack vectors:
1. **Prompt injection via business data** — Business name, city, phone stored in DB. If an attacker can set `businessName = '<script>alert(1)</script>'`, that goes into the AI prompt and potentially back into the HTML response.
2. **Direct LLM jailbreak** — Claude can be coaxed into including `<script>` tags or `onerror=` event handlers in HTML output.
3. **Stored XSS** — The generated HTML is saved to `content_items.body` in the database. If it's ever rendered elsewhere (future feature, email template, etc.), the XSS persists.

**🟡 Blog `post.content` uses remark-html with default sanitization:**
```ts
const result = await remark().use(html).process(content)
```
`remark-html` defaults to `sanitize: true`. No `{ sanitize: false }` option is passed, so script tags and unsafe attributes are stripped. **This is safe** as long as blog posts come from trusted admin-authored markdown files (confirmed — they're in `content/blog/*.md` on the filesystem, not user-submitted).

**🟡 Service page HTML includes `<script type="application/ld+json">` from Claude** — The `mockPage()` function (fallback) already includes schema.org JSON-LD in a script tag. Claude's real responses likely do the same. These structured data scripts aren't executable JS, but the pattern establishes that `<script>` tags exist in the rendered HTML — dangerous if the sanitization assumption ever breaks.

### Recommendations

| # | Severity | Action |
|---|---|---|
| X-1 | 🔴 | Sanitize `previewPage.html` before rendering. Use `DOMPurify.sanitize(html, { FORCE_BODY: true, FORBID_TAGS: ['script', 'style', 'iframe'], FORBID_ATTR: ['onerror', 'onload', 'onclick'] })` client-side, or `sanitize-html` server-side before the API returns the HTML |
| X-2 | 🔴 | Sanitize AI-generated HTML before inserting into `content_items.body` in the service-page route |
| X-3 | 🟡 | Sanitize business name/city/phone fields before injecting into AI prompts — strip HTML tags from user-controlled input that goes into prompt context |
| X-4 | 🟢 | Make remark-html sanitize option explicit: `use(html, { sanitize: true })` so intent is visible in code |

---

## 5. CSRF Protection

### Analysis

**🟢 Clerk provides CSRF protection for authenticated routes** — Clerk's `__session` cookie is set with `SameSite=Lax` by default. This prevents cross-site POST requests from carrying the session cookie — classic CSRF is blocked for any route that calls `auth()`. Even if an attacker's page triggers a cross-origin `fetch()` to an authenticated route, the request won't have a valid `__session` cookie.

**🟢 Clerk also validates session token integrity** — `auth()` verifies the JWT signature. A forged or replayed session token would fail verification regardless of CSRF.

**🔴 Unauthenticated POST routes have no CSRF protection:**
- `/api/leads` — accepts any cross-origin POST that includes `Content-Type: application/json`. Browser `SameSite` protection only applies to cookie-based auth, not to "is this request from my own origin."
- `/api/ai-readiness` — same issue. Any page on the internet can trigger the AEO scanner against arbitrary URLs.
- `/api/email/weekly-content` — no auth, no CSRF, no origin check. Any cross-site POST triggers mass email to all users.
- `/api/email/monthly-report` — same.

For these routes, there are no cookies to steal, but the routes themselves can be abused cross-site. Rate limiting (absent) and `CRON_SECRET` (absent) are the correct mitigations, not CSRF tokens.

**🟢 Stripe webhook is CSRF-safe** — Stripe webhook uses HMAC signature verification. Cookie-based CSRF is irrelevant.

### Recommendations

| # | Severity | Action |
|---|---|---|
| C-1 | 🔴 | Add `CRON_SECRET` to cron routes (already flagged in Phase 3, re-confirmed here as CSRF-adjacent) |
| C-2 | 🟡 | Add `Origin` header check to `/api/leads` and `/api/ai-readiness` — reject requests where `Origin` header doesn't match `NEXT_PUBLIC_APP_URL` |
| C-3 | 🟢 | Document that CSRF on Clerk-authenticated routes is handled by `SameSite=Lax` — no custom CSRF tokens needed |

---

## 6. Dependency Supply Chain

### Package Inventory Analysis

All 30 packages reviewed for typosquatting risk and legitimacy:

| Package | Publisher | Legitimate? | Notes |
|---|---|---|---|
| `@anthropic-ai/sdk` | Anthropic | ✅ | Official SDK, scoped `@anthropic-ai` |
| `@clerk/nextjs` | Clerk | ✅ | Official SDK, scoped `@clerk` |
| `@stripe/stripe-js` | Stripe | ✅ | Official, scoped `@stripe` |
| `@supabase/supabase-js` | Supabase | ✅ | Official, scoped `@supabase` |
| `@tailwindcss/postcss` | Tailwind Labs | ✅ | Official |
| `class-variance-authority` | Joe Bell | ✅ | Widely used shadcn dependency |
| `clsx` | Luke Edwards | ✅ | 50M+ weekly downloads |
| `gray-matter` | Jon Schlinkert | ✅ | Standard frontmatter parser |
| `jspdf` | MrRio / jsPDF | ✅ | Legitimate, **but has critical vuln** |
| `lucide-react` | Lucide | ✅ | Official icon library |
| `next` | Vercel | ✅ | Official |
| `posthog-js` | PostHog | ✅ | Official SDK |
| `radix-ui` | WorkOS/Radix | ✅ | Official — note: `@radix-ui/*` scoped packages are the old API, bare `radix-ui` is the new unified package |
| `react` / `react-dom` | Meta | ✅ | Official |
| `remark` / `remark-html` | unifiedjs | ✅ | Official ecosystem |
| `resend` | Resend | ✅ | Official SDK |
| `shadcn` | shadcn | ✅ | Official CLI tool |
| `stripe` | Stripe | ✅ | Official server SDK |
| `tailwind-merge` | Joren Broekema | ✅ | 20M+ weekly downloads |
| `tailwindcss` | Tailwind Labs | ✅ | Official |
| `tsx` | privatenumber | ✅ | Legitimate TS executor |
| `tw-animate-css` | Community | ⚠️ | Smaller package (1.4.0), less scrutinized — review if truly needed |

**🟢 No typosquatting candidates found** — All package names match their expected publishers. No `@clrk/nextjs`, `supabase-js`, `stirpe`, etc. All scoped packages use correct organization namespaces.

**🟡 `tw-animate-css` is a lower-scrutiny package** — Small community package, fewer downloads than other deps. Not a known typosquatting vector, but worth verifying it's the canonical package name and checking its source.

**🔴 `jspdf <=4.2.0` has two critical CVEs** (already flagged in Phase 3):
- `GHSA-wfv2-pwc8-crg5` — HTML Injection via jsPDF
- `GHSA-7x6v-j9x4-qf24` — PDF Object Injection via FreeText color

**🟠 `flatted <3.4.0` high severity** — Unbounded recursion DoS (GHSA-25h7-pfq9-p65f). Transitive dependency.

**🟡 `hono <4.7.2` moderate** — Prototype Pollution in `parseBody` (GHSA-v8w9-8mx6-g223). Transitive dependency.

**🟡 `react: 19.2.3` and `next: ^16.1.7` are very new versions** — React 19 and Next 16 are cutting-edge. Next 16 is not yet the stable LTS. Higher probability of unknown bugs. Not a supply chain issue per se, but worth noting for a production app.

**🟡 Semver ranges with `^` allow minor/patch updates** — All dependencies use `^` ranges which permit automatic patch updates. This is standard but means a compromised patch release of any dependency could be pulled in on next `npm install`. Consider `npm ci` with a lockfile in CI/CD.

### Recommendations

| # | Severity | Action |
|---|---|---|
| D-1 | 🔴 | `npm audit fix` — patches jsPDF critical vuln, flatted high, hono moderate. Do this before any customer uses PDF reports. |
| D-2 | 🟡 | Verify `tw-animate-css` is the canonical package (check npm page, github repo, publisher identity) |
| D-3 | 🟡 | Pin `package-lock.json` and use `npm ci` in CI/CD to prevent silent dep updates |
| D-4 | 🟢 | Add `npm audit` to CI pipeline so new vulns block deployment |
| D-5 | 🟢 | Move `shadcn` and `tsx` to `devDependencies` (they're CLI tools, not runtime deps) |

---

## Summary: New Findings This Phase

The following are **net-new** findings not already in phases 1–3:

### 🔴 Critical (fix before customers)

| ID | Finding | File |
|---|---|---|
| SEC-1 | `content_queue` table has NO Row Level Security — anon key in client bundle = full table exposure | `migrations/content_queue.sql` |
| SEC-2 | `aeo_scans` table has no migration file — RLS status unknown, likely unprotected | Missing migration |
| SEC-3 | `dangerouslySetInnerHTML` rendering unsanitized AI-generated HTML in dashboard | `app/dashboard/pages/page.tsx:121` |
| SEC-4 | No CSP, X-Frame-Options, or security headers defined anywhere | `next.config.ts` (missing) |
| SEC-5 | Stripe price IDs hardcoded in source — in git history permanently | `lib/stripe.ts:19,24,29` |

### 🟡 Important (fix this sprint)

| ID | Finding | File |
|---|---|---|
| SEC-6 | RLS policies use `current_setting('app.clerk_user_id')` which is never set — RLS doesn't actually filter in practice | `supabase/migrations/001_initial_schema.sql` |
| SEC-7 | `competitor_scans` INSERT not protected by RLS policy | `migrations/leads_and_competitor_scans.sql` |
| SEC-8 | AI-generated HTML stored to DB without sanitization — potential stored XSS | `app/api/generate/service-page/route.ts` |
| SEC-9 | Business name/city fields injected into AI prompts without sanitizing HTML — prompt injection vector | `lib/prompt-context.ts` |
| SEC-10 | No Origin header check on public POST routes (`/api/leads`, `/api/ai-readiness`) | Route handlers |
| SEC-11 | `tw-animate-css` is a low-scrutiny package — verify publisher identity | `package.json` |

### 🟢 Accepted / Low Risk

| ID | Finding | Rationale |
|---|---|---|
| SEC-12 | `NEXT_PUBLIC_` vars expose anon key + Supabase URL | By design — safe when RLS is properly configured |
| SEC-13 | No CSRF tokens on Clerk-authenticated routes | SameSite=Lax cookie policy is sufficient |
| SEC-14 | `remark-html` in blog without explicit `sanitize: true` | Default is sanitize-on; blog content is admin-authored |

---

## Phase 4 Verdict

**Security posture: 🔴 Not production-ready for public users**

The codebase has a solid authentication foundation (Clerk) and mostly correct server-side auth on protected routes. The core security failures are:
1. **Database layer**: `content_queue` is wide open. `aeo_scans` has no migration. RLS policies exist but don't function as intended with the service-role + Clerk architecture.
2. **XSS**: AI-generated HTML rendered raw in the dashboard is a genuine attack surface.
3. **Missing security headers**: No CSP means XSS findings have higher blast radius.
4. **Known critical vuln in `jspdf`** — needs a one-line `npm audit fix`.

The fixes are tractable. None require architectural changes. The most impactful are: add `content_queue` RLS, add CSP headers, sanitize HTML before rendering, and fix jsPDF.

---

*Phase 5 (Components) and Phase 6–7 (Performance/Quality) already reviewed. See `phase5-components.md` and `phase6-7-perf-quality.md`.*
