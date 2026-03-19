# Round 1: Structural Audit + Core Foundation + API Routes

> **Reviewed:** 2026-03-18 | **Reviewer:** Alexander 🦊 | **Codebase:** `products/localbeacon/app/`
> **Stack:** Next.js 16, Clerk auth, Stripe, Supabase, PostHog, Anthropic claude-haiku-4-5

---

## Phase 1: Structural Audit

### File Inventory (108 source files total)

| Directory | Count | Notes |
|---|---|---|
| `app/api/` | 18 routes | All production API handlers |
| `app/dashboard/` | 14 pages | Protected dashboard routes |
| `app/blog/` | 3 files | Public blog |
| `app/(other pages)` | 9 pages | Pricing, check, onboarding, etc. |
| `components/` | 19 files | UI components |
| `components/ui/` | 8 files | shadcn primitives |
| `lib/` | 14 files | Core libraries |
| `lib/industry-data/` | 13 files | Industry verticals |
| `scripts/` | 2 files | Outreach/prospecting CLI tools |
| Root config | 5 files | next.config, middleware, eslint, etc. |

**Total: 108 source `.ts` / `.tsx` files** (excluding `.next/`, `node_modules`)

---

### Dead Files (imported nowhere)

All files appear to be used. Key findings:
- `lib/aeo-recommendations.ts` → imported by `components/aeo-recommendations.tsx` and `app/dashboard/ai-readiness/page.tsx` ✅
- `lib/blog-shared.ts` → re-exported via `lib/blog.ts` and used by components ✅
- `lib/deployment-instructions.ts` → imported in FAQ and llms-txt dashboard pages ✅
- `lib/industry-data/` (all 13 files) → barrel export via `lib/industry-data.ts` ✅
- `app/lib/design-tokens.ts` → **⚠️ In wrong location** (see below)
- `scripts/prospect.ts`, `scripts/send-outreach.ts` → CLI scripts, not imported — **intentional** (operational tools)

**No fully dead files found.** All library files are imported somewhere.

---

### Duplicate/Redundant Files

**🔴 CRITICAL: `next.config.js` AND `next.config.ts` both exist at root level**
- `next.config.ts` is the intended TypeScript config
- `next.config.js` appears to be a compiled artifact — content is nearly identical
- Next.js picks one; having both is a silent maintenance footgun
- **Action:** Delete `next.config.js`, keep `next.config.ts`

**🟡 Design Tokens in Wrong Location**
- `app/lib/design-tokens.ts` — lives inside the app router directory
- All other lib files live at `lib/` (root-level)
- No imports found for `app/lib/design-tokens.ts` — this may not be used at all
- **Action:** Move to `lib/design-tokens.ts` or verify it's imported somewhere

---

### Dependency Audit

**Installed packages (31 total):**

| Package | Used? | Notes |
|---|---|---|
| `@anthropic-ai/sdk` | ✅ | `lib/anthropic-client.ts` |
| `@clerk/nextjs` | ✅ | Auth throughout |
| `@stripe/stripe-js` | ⚠️ | **Not found in source — appears unused** (frontend Stripe.js for Elements; server-side uses `stripe` package directly) |
| `@supabase/supabase-js` | ✅ | `lib/supabase.ts` |
| `@tailwindcss/postcss` | ✅ | Build |
| `class-variance-authority` | ✅ | shadcn components |
| `clsx` | ✅ | `lib/utils.ts` |
| `eslint-config-next` | ✅ | Dev |
| `gray-matter` | ✅ | Blog markdown parsing |
| `jspdf` | ✅ | PDF reports — **HAS CRITICAL VULNERABILITY** |
| `lucide-react` | ✅ | Icons |
| `next` | ✅ | Framework |
| `posthog-js` | ✅ | Analytics |
| `radix-ui` | ✅ | shadcn primitives |
| `react` / `react-dom` | ✅ | Framework |
| `remark` + `remark-html` | ✅ | Blog markdown → HTML |
| `resend` | ✅ | Email |
| `shadcn` | ⚠️ | **CLI tool — should be `devDependencies`, not `dependencies`** |
| `stripe` | ✅ | Server-side Stripe |
| `tailwind-merge` | ✅ | `lib/utils.ts` |
| `tailwindcss` | ✅ | Styling |
| `tsx` | ⚠️ | **Should be `devDependencies`** — only used for scripts |
| `tw-animate-css` | ✅ | Animations |
| `typescript` | ✅ | Dev |

**Unused/misclassified dependencies:**
- `@stripe/stripe-js` — no `loadStripe()` or `@stripe/stripe-js` import found anywhere in source. Either unused or dead code path. **Adds bundle weight.**
- `shadcn` — is a code generator CLI tool, not a runtime import. Should be `devDependencies`.
- `tsx` — CLI runner for scripts, should be `devDependencies`.

---

### Vulnerability Audit (`npm audit`)

**3 vulnerabilities found — 1 CRITICAL:**

| Severity | Package | CVE | Issue |
|---|---|---|---|
| 🔴 **Critical** | `jspdf <=4.2.0` | GHSA-wfv2-pwc8-crg5, GHSA-7x6v-j9x4-qf24 | HTML Injection + PDF Object Injection via FreeText color |
| 🟠 **High** | `flatted <3.4.0` | GHSA-25h7-pfq9-p65f | Unbounded recursion DoS in parse() |
| 🟡 **Moderate** | `hono <4.12.7` | GHSA-v8w9-8mx6-g223 | Prototype Pollution via parseBody |

**`npm audit fix` available** — run it before any customer uses PDF reports.

Note: `jspdf` is used in `/api/reports/pdf/route.ts`. The HTML Injection vulnerability is particularly relevant since PDF content is built from user business data. Fix immediately.

---

### Naming Issues

- Files are consistently named in `kebab-case.tsx` — ✅ consistent
- Route files all use `route.ts` — ✅ consistent
- Page files all use `page.tsx` — ✅ consistent
- Component files use `kebab-case.tsx` — ✅ consistent
- **Minor:** `[id]` and `[[...sign-in]]` dynamic routes use Next.js conventions correctly

---

## Phase 2: Core Foundation

### lib/ Quality Assessment

**`lib/supabase.ts`**
- ✅ Defensive: `safeCreateClient()` wraps in try/catch, validates URL starts with `http`
- ✅ Returns `null` on failure — callers check for null
- ✅ `createServerClient()` falls back to anon client if service key missing (graceful degradation)
- ⚠️ **Silent fallback risk:** `createServerClient()` falling back to anon client when `SUPABASE_SERVICE_ROLE_KEY` is missing could expose routes that expect RLS-bypass to fail silently instead of throwing. A caller that expects server-level access gets anon-level access with no error.
- ⚠️ **`supabase` (anon client) is a module-level singleton** initialized at import time. If env vars are missing at startup, it silently becomes `null`. No startup warning logged.

**`lib/stripe.ts`**
- ✅ Guards `stripe` behind env check — payments fail safely with 503
- ✅ Startup warnings logged for missing keys (server-side only)
- ✅ Price IDs have hardcoded fallbacks for dev convenience — **RISK:** if `STRIPE_SOLO_PRICE_ID` is unset in prod, it uses the hardcoded `price_1T6LhxB0OqzCjZpvnGc84VN7` which is likely a test-mode price ID. If the Stripe key is prod but the price IDs are test fallbacks, charges will fail silently.
- ⚠️ `PLANS['FREE'].priceId` is `null` — this is handled in checkout route. OK.
- ⚠️ No validation that price IDs actually exist in Stripe at startup.

**`lib/email.ts`**
- ✅ Guards `resend` behind env check — silently skips email if not configured
- ✅ try/catch on all email sends, returns `{ success, error }` 
- ✅ HTML emails have unsubscribe links at bottom — good for CAN-SPAM
- ⚠️ **FROM address is `hello@perpetualagility.com`**, not `hello@localbeacon.ai`. This will confuse recipients and may hurt deliverability. The AEO report email footer says "contact hello@localbeacon.ai" — inconsistency.
- ⚠️ No email address validation before sending (callers must validate upstream)
- ⚠️ Unsubscribe links point to `/dashboard/settings` — is there actually an unsubscribe toggle? CAN-SPAM requires it to actually work within 10 business days.
- ⚠️ AEO report email has inline `display: flex; gap: 12px` on stat boxes — these CSS features are unreliable in email clients (Outlook, Gmail). Likely renders broken.

**`lib/anthropic-client.ts`**
- ✅ Guards client behind env check — returns degraded mode cleanly
- ✅ Structured JSON logging on all calls/failures
- ✅ In-memory failure tracking for degraded mode detection
- ✅ `generateText()` returns `{ success, text, isDegraded }` — callers can gracefully fallback
- ⚠️ **`LB_ANTHROPIC_API_KEY || ANTHROPIC_API_KEY`** — two env vars for the same thing. `LB_ANTHROPIC_API_KEY` is not documented in any `.env.example`. Risk of confusion in deployment.
- ⚠️ Failure tracking is in-memory on the module. In serverless, each cold start resets it. `isDegraded` window of 5 minutes (300s) is per-instance, not global. Fine for now but means degraded state isn't shared across instances.
- ⚠️ `errorCode` extraction uses loose casting `(err as Record<string, unknown>)` — could silently miss the actual Anthropic SDK error code.
- ⚠️ No token counting or cost tracking — no visibility into spend per route.

**`lib/plan-limits.ts`**
- ✅ Well-structured, `checkUsage()` and `enforceLimits()` are clean
- ✅ All plan tiers handled
- ⚠️ **`getMonthlyUsage()` always queries the user's FIRST business** (`limit(1)` on businesses query). In Agency plan (multi-business), usage is only counted against the first business, not the specific business being used. This could allow Agency users to exceed per-business limits.
- ⚠️ `enforceLimits()` is only called in 2 of 7 AI generation routes (`gbp-post` and `service-page`). Blog post route does a manual plan check but doesn't use `enforceLimits`. FAQ, review-response, weekly-content, and llms-txt routes have NO limit enforcement at all.
- ⚠️ The `city_page` limit counts ALL time, not per-month (no `startOfMonth` filter for city pages in `getMonthlyUsage`). Actually wait — `getMonthlyUsage` applies `startOfMonth` to all content_items. But blog posts are `blogPosts: 4` on solo — is this monthly or total? It appears monthly. That's fine, but needs documentation.

**`lib/posthog.ts`**
- ✅ Guards initialization behind env check
- ✅ Server-side guard (`typeof window === 'undefined'`)
- Fine as-is.

**`lib/freshness.ts`**
- ✅ Defensive against missing supabase
- ✅ Handles the "no business" and "no posts" cases cleanly
- Minor: Queries two tables separately rather than one UNION — fine for now

**`lib/prompt-context.ts`**
- ✅ Clean, defensive, returns null on any failure
- ✅ `buildPromptContext()` is purely functional — easy to test
- Minor: `getToneForCategory()` returns a default for unknown categories — fine

**`app/lib/design-tokens.ts`**
- Located in `app/lib/` instead of `lib/` — wrong directory
- No imports found for this file in any source file (checked grep)
- **This file may be unused.** Needs verification.

---

### Environment Variable Inventory

| Variable | Required? | Used In | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Required | `lib/supabase.ts` | Handled gracefully (null client) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Required | `lib/supabase.ts` | Handled gracefully |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Required | `lib/supabase.ts` (server) | Falls back to anon — **silent risk** |
| `STRIPE_SECRET_KEY` | ✅ Required | `lib/stripe.ts` | Handled (503 if missing) |
| `STRIPE_WEBHOOK_SECRET` | ✅ Required | `api/webhook/route.ts` | Used with `!` non-null assertion — will crash if missing |
| `STRIPE_SOLO_PRICE_ID` | 🟡 Recommended | `lib/stripe.ts` | Falls back to hardcoded test ID |
| `STRIPE_AGENCY_PRICE_ID` | 🟡 Recommended | `lib/stripe.ts` | Falls back to hardcoded test ID |
| `STRIPE_DFY_PRICE_ID` | 🟡 Recommended | `lib/stripe.ts` | Falls back to hardcoded test ID (warning logged) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Required | Clerk (implicit) | Clerk handles this |
| `CLERK_SECRET_KEY` | ✅ Required | Clerk (implicit) | Not directly referenced — Clerk handles |
| `LB_ANTHROPIC_API_KEY` | 🟡 Optional (alias) | `lib/anthropic-client.ts` | Falls through to `ANTHROPIC_API_KEY` |
| `ANTHROPIC_API_KEY` | ✅ Required | `lib/anthropic-client.ts` | Graceful degraded mode if missing |
| `RESEND_API_KEY` | 🟡 Recommended | `lib/email.ts` | Silently skips emails if missing |
| `NEXT_PUBLIC_POSTHOG_KEY` | 🟡 Optional | `lib/posthog.ts` | Silently skips analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | 🟢 Optional | `lib/posthog.ts` | Defaults to `https://app.posthog.com` |
| `NEXT_PUBLIC_APP_URL` | 🟡 Recommended | `api/checkout/route.ts` | Defaults to `https://localbeacon.ai` |

**Missing from inventory:**
- `CLERK_SECRET_KEY` is not directly referenced in source (Clerk SDK reads it automatically) — still required
- `LB_ANTHROPIC_API_KEY` is not documented in `.env.local.example` (needs verification)
- No `CRON_SECRET` or equivalent to protect the email cron routes — **see Phase 3**

---

### Type Safety Issues

- `(business as any).users` in `api/email/monthly-report/route.ts` — **`any` cast on Supabase join result**. Should be typed.
- `body as { plan: 'SOLO' | 'AGENCY' | 'DFY' }` in `api/checkout/route.ts` — type assertion without runtime validation. If `plan` is undefined or something else, `PLANS[plan]` returns undefined and the route correctly handles it. Actually OK — the null check catches it.
- `err as Record<string, unknown>` in `lib/anthropic-client.ts` — loose error casting
- Several routes use `body.field || undefined` to build update objects — `undefined` fields are stripped by Supabase, which is intentional but could mask required field updates
- `(err as Record<string, unknown>)?.status` in anthropic-client — could silently ignore actual Anthropic error status codes
- No Zod or similar runtime validation on any API route inputs — inputs are trusted after basic existence checks

---

### Error Handling Gaps

- ✅ `lib/supabase.ts` — defensive
- ✅ `lib/email.ts` — try/catch, returns `{ success, error }`
- ✅ `lib/anthropic-client.ts` — try/catch, structured errors
- ⚠️ Multiple API routes do NOT wrap Supabase queries in try/catch — rely on Supabase returning `{ data, error }`. If the Supabase SDK throws (network error vs. query error), these routes will throw unhandled exceptions.
- ⚠️ `api/email/monthly-report/route.ts` — no try/catch wrapping the per-business loop. One email failure could propagate if something unexpected throws (not just Resend returning an error object).
- ⚠️ `api/ai-readiness/route.ts` — `getRule()` throws `Error` if a rule ID is not found in `aeo-rules.json`. If the JSON is malformed or a check function uses a bad ID, the entire route crashes with a 500 and no useful client message.

---

## Phase 3: API Routes

### Route-by-Route Assessment

---

#### `GET /api/health` — Health check

| Check | Status |
|---|---|
| Auth | ❌ None (intentional — public health endpoint) |
| Input validation | ✅ None needed |
| Error handling | ✅ |
| Abuse potential | 🟢 Low — read-only |
| Severity | 🟢 Fine |

**Notes:** Exposes internal Anthropic failure count, last failure timestamp, and error message. This is internal diagnostic info. If someone hits this endpoint, they can learn: (a) whether Anthropic is configured, (b) recent error messages. **Recommendation:** Add a secret header check OR move to authenticated-only.

---

#### `POST /api/ai-readiness` — AEO scanner (public)

| Check | Status |
|---|---|
| Auth | ❌ None (intentional — public tool) |
| Input validation | ⚠️ URL required but not sanitized |
| Error handling | ✅ Comprehensive |
| Abuse potential | 🔴 HIGH — no rate limiting, each call fetches external URLs + writes to DB |
| Severity | 🔴 Critical |

**Security findings:**
1. **No rate limiting whatsoever.** Anyone can spam this endpoint, triggering outbound HTTP requests to arbitrary URLs on every call. This is a SSRF-adjacent vector — a user can make the server fetch any URL on the internet.
2. **SSRF risk:** `baseUrl` is user-supplied. Code validates `http` prefix but not the destination. Could be used to probe internal services (`http://localhost:3000/`, `http://169.254.169.254/` AWS metadata). The URL is passed to `fetch()` directly.
3. **No auth required to write to `aeo_scans` table** — anonymous users can insert unlimited rows.
4. **GET history endpoint** also has no auth — anyone can query scan history for any URL.
5. `rulesConfig` is imported as `@/lib/aeo-rules.json` — if this file doesn't exist at build time, the route crashes.

---

#### `GET /api/ai-readiness` — Scan history (public, no auth)

| Check | Status |
|---|---|
| Auth | ❌ None |
| Input validation | ⚠️ `limit` capped at 100, `url` required |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium — can query any URL's scan history |
| Severity | 🟡 Important |

---

#### `POST /api/leads` — Lead capture (public)

| Check | Status |
|---|---|
| Auth | ❌ None (intentional — public form) |
| Input validation | ⚠️ Basic regex email validation |
| Error handling | ✅ |
| Abuse potential | 🔴 HIGH — no rate limiting, can spam leads table + trigger emails |
| Severity | 🔴 Critical |

**Security findings:**
1. **No rate limiting.** Attacker can spam this with valid-looking emails, triggering AEO report emails (via Resend) on every call. This will burn your Resend quota and could get you flagged as spam.
2. **Email regex is basic** — `^[^\s@]+@[^\s@]+\.[^\s@]+$` passes addresses like `a@b.c`. Not a security issue per se, but disposable/fake emails will flood your leads table.
3. **No CAPTCHA or honeypot.** Public form with no bot protection.
4. **`score` is passed in from the client unvalidated** — an attacker can POST any score value (e.g., score: 1) and it goes directly into the DB. Score should be computed server-side, not trusted from client.
5. **`checks` array is passed in from the client** — the email template renders these checks including `c.label`, `c.details`, and `c.fix` from the client payload. If an attacker crafts a `checks` array with HTML in those fields, it goes into the email HTML. **Potential email injection.**

---

#### `POST /api/checkout` — Stripe checkout

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ `plan` type checked but loose cast |
| Error handling | ✅ try/catch |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ Plan validated against `PLANS` object — unknown plan returns 400
3. ✅ Stripe session created with `clerk_user_id` in metadata
4. ⚠️ No check that user doesn't already have an active subscription. Clicking "upgrade" multiple times could theoretically create duplicate Stripe sessions (though Stripe would handle the actual charge correctly, it's messy).
5. ⚠️ `success_url` and `cancel_url` fall back to hardcoded `https://localbeacon.ai` if `NEXT_PUBLIC_APP_URL` is unset. In dev/staging this could redirect to production.
6. ⚠️ Error message from Stripe is passed directly to the client response. This may leak Stripe internal error details.

---

#### `POST /api/webhook` — Stripe webhook

| Check | Status |
|---|---|
| Auth | ✅ Stripe signature verification |
| Input validation | ✅ |
| Error handling | ✅ |
| Abuse potential | 🟢 Low |
| Severity | 🟡 Important (one gap) |

**Security findings:**
1. ✅ `stripe.webhooks.constructEvent()` called with raw body — correct
2. ✅ Signature validated before any processing
3. 🔴 **`process.env.STRIPE_WEBHOOK_SECRET!`** — TypeScript non-null assertion. If `STRIPE_WEBHOOK_SECRET` is undefined, `constructEvent()` will throw with an unhelpful error. Should guard this explicitly.
4. ⚠️ `customer.subscription.updated` handler does nothing when status is `past_due` or `unpaid` — plan stays active. Users who fail to pay keep full access indefinitely until `subscription.deleted` fires (which may take months of retries).
5. ⚠️ No idempotency handling — duplicate webhook events (Stripe retries) will trigger duplicate DB writes. For `checkout.session.completed`, this means upsert is safe, but the `console.log` will fire twice.
6. ⚠️ `invoice.payment_failed` handler only logs — no action taken. Should probably flag the user or send them an email.

---

#### `POST /api/businesses` — Create/update business

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ Partial |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ Ownership verified on updates (`eq('user_id', user.id)`)
3. ✅ Business limit enforced per plan
4. ⚠️ `body.email || ''` in `users.upsert()` — if email is not in the request body, it upserts an empty string as the user's email. This could overwrite a valid email already in the DB.
5. ⚠️ `body.id` allows updating any business by ID — ownership check exists (`.eq('user_id', user.id)`) but if business doesn't belong to user, it silently succeeds with no rows updated and returns null business. Should return 404 explicitly in that case.
6. ⚠️ `body.specialties || undefined` — if specialties is `null` or `0` or `false`, it becomes `undefined` and the field is skipped. Should use explicit null checks.
7. ⚠️ No input sanitization on `name`, `description`, `website` fields — XSS risk if these are ever rendered as raw HTML.

---

#### `GET /api/businesses` — List user's businesses

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ None needed |
| Error handling | ✅ |
| Abuse potential | 🟢 Low |
| Severity | 🟢 Fine |

---

#### `GET /api/businesses/[id]/dashboard` — Dashboard stats

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ |
| Error handling | ✅ |
| Abuse potential | 🟢 Low |
| Severity | 🟢 Fine |

**Notes:** 
- ✅ Ownership verified (user.id → business.user_id check)
- Runs 8 separate Supabase queries sequentially — could be parallelized with `Promise.all` for performance

---

#### `PATCH /api/content-queue/[id]` — Update queue item status

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ Status whitelist |
| Error handling | ✅ |
| Abuse potential | 🔴 HIGH — **no ownership check** |
| Severity | 🔴 Critical |

**Critical security finding:**
- **Any authenticated user can update any content queue item's status by ID.** The route verifies the user is logged in, but does NOT verify the content queue item belongs to their business. An attacker can enumerate queue IDs and mark any item as "posted" or reset it to "draft."
- **Fix:** Add a join/subquery to verify the `business_id` of the queue item belongs to the authenticated user before updating.

---

#### `POST /api/generate/gbp-post` — GBP post generation (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ No required fields enforced |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ `enforceLimits()` called — plan limits checked
3. ⚠️ **`business_id` not validated for ownership.** Content is saved to DB with whatever `business_id` is provided in the body. An attacker could POST with another user's `business_id` and save content to their account.
4. ⚠️ All fields have defaults — request can be completely empty and still runs successfully (wastes AI tokens on "Your Business / Your City" content)

---

#### `POST /api/generate/service-page` — Service page generation (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ `target_city` required, rest optional |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ `enforceLimits()` called
3. ⚠️ **`business_id` not validated for ownership** — same issue as gbp-post above
4. ⚠️ No plan check other than enforceLimits — `city_page` limit tracked but not clear if this is per-business or per-user (see plan-limits bug above)

---

#### `POST /api/generate/blog-post` — Blog post generation (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ No required fields |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ Plan check: `free` plan blocked
3. ❌ **No `enforceLimits()` call** — checks plan tier but does NOT enforce the `blogPosts: 4` monthly limit for solo plan. A solo user can generate unlimited blog posts.
4. ⚠️ `business_id` not validated for ownership
5. ⚠️ `type` parameter not validated against `blogTypeGuide` keys — if unknown type passed, falls through to `how_to` via `blogTypeGuide[type] || blogTypeGuide.how_to`. Fine but sloppy.

---

#### `POST /api/generate/faq` — FAQ generation (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ Required fields checked |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ `businessName`, `category`, `city`, `state` required
3. ❌ **No plan limit enforcement** — FAQ generation has `faqGenerations: 1` limit for free plan but `enforceLimits()` is never called. Free users get unlimited FAQ generation.
4. ⚠️ `count` parameter is passed directly into the prompt (`Generate exactly ${count} FAQs`) with no bounds check. A user can request 1000 FAQs, triggering a massive token spend.
5. ⚠️ JSON parse errors handled with fallback — good. But the fallback `getDemoFaqs` hardcodes "over 10 years" and "Minnesota" which are wrong for most businesses.

---

#### `POST /api/generate/review-response` — Review response (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ⚠️ All fields optional |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ❌ **No plan limit enforcement** — `reviewResponses: 3` limit for free plan, but `enforceLimits()` never called. Free users get unlimited review responses.
3. ⚠️ `rating` is passed unvalidated into prompt — if `rating` is a string or -1, `toneGuide[rating]` returns undefined and falls back to `toneGuide[3]`. Fine but could cause confusing behavior.
4. ⚠️ `review_text` is injected directly into AI prompt — a user could attempt prompt injection via review text.

---

#### `POST /api/generate/llms-txt` — llms.txt generator

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ Required fields checked |
| Error handling | ✅ |
| Abuse potential | 🟢 Low (no AI, no DB write) |
| Severity | 🟢 Fine |

**Notes:** This route doesn't call AI or write to DB — it just generates text client-side. Clean.

---

#### `POST /api/generate/weekly-content` — Weekly content generation (AI)

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ `business_id` required |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ `business_id` required
3. ❌ **`business_id` ownership NOT verified.** Route fetches business from DB by ID only (`.eq('id', business_id)` — no user check). Any authenticated user can generate weekly content for any business by ID and queue it into the `content_queue` table.
4. ⚠️ No plan limit enforcement

---

#### `POST /api/email/weekly-content` — Weekly email cron

| Check | Status |
|---|---|
| Auth | ❌ None — no secret, no auth |
| Input validation | ✅ N/A |
| Error handling | ✅ |
| Abuse potential | 🔴 HIGH — triggers mass email to all users |
| Severity | 🔴 Critical |

**Critical security finding:**
- **This endpoint is completely unauthenticated.** Anyone who knows the URL (`/api/email/weekly-content`) can POST to it and trigger emails to ALL users. This will burn your Resend quota, spam users, and could get your domain blacklisted.
- **Fix:** Add a `CRON_SECRET` check: `Authorization: Bearer <secret>` header verification before processing.

---

#### `POST /api/email/monthly-report` — Monthly report cron

| Check | Status |
|---|---|
| Auth | ❌ None — no secret, no auth |
| Input validation | ✅ N/A |
| Error handling | ⚠️ No try/catch on per-business loop |
| Abuse potential | 🔴 HIGH — triggers mass email to all users |
| Severity | 🔴 Critical |

**Same critical finding as weekly-content above.** Additionally:
- Uses `(business as any).users` — `any` cast on join result
- No protection against concurrent runs (if called twice simultaneously, all users get two emails)

---

#### `GET /api/reports/pdf` — PDF report download

| Check | Status |
|---|---|
| Auth | ✅ Clerk `auth()` |
| Input validation | ✅ `businessId` required |
| Error handling | ✅ |
| Abuse potential | 🟡 Medium |
| Severity | 🟡 Important |

**Security findings:**
1. ✅ Auth required
2. ✅ Plan check: free plan blocked
3. ✅ Ownership verified (business must belong to user)
4. 🔴 **jsPDF has a critical vulnerability** (GHSA-wfv2-pwc8-crg5, GHSA-7x6v-j9x4-qf24) — HTML Injection and PDF Object Injection. Business data (name, city) is embedded in the PDF. Needs immediate update.
5. ⚠️ The `filename` includes the business name with `replace(/[^a-zA-Z0-9]/g, '-')` — this is fine for `Content-Disposition` but the replace could produce `---` style names for non-ASCII business names.

---

### Critical Security Issues

1. **🔴 `/api/email/weekly-content` and `/api/email/monthly-report` — completely unauthenticated cron endpoints.** Anyone can trigger mass email blasts to all users.

2. **🔴 `/api/content-queue/[id]` PATCH — no ownership check.** Any logged-in user can update any other user's queue items.

3. **🔴 `/api/ai-readiness` POST — SSRF risk + no rate limiting.** Server fetches arbitrary user-supplied URLs with no destination validation.

4. **🔴 `/api/leads` POST — no rate limiting + email injection risk.** Client-supplied `checks` array fields are rendered in email HTML without sanitization.

5. **🔴 jsPDF critical vulnerability** in `/api/reports/pdf` — HTML Injection + PDF Object Injection.

6. **🔴 Multiple generate routes don't validate `business_id` ownership** (`gbp-post`, `service-page`, `weekly-content`) — cross-user content injection.

---

### Consistency Problems

1. **Plan limit enforcement is inconsistent across AI routes:**
   - `gbp-post` ✅ uses `enforceLimits()`
   - `service-page` ✅ uses `enforceLimits()`
   - `blog-post` ❌ manual plan check only (monthly limit not enforced)
   - `faq` ❌ no limits at all
   - `review-response` ❌ no limits at all
   - `weekly-content` ❌ no limits at all
   - `llms-txt` ❌ no limits (but no AI cost, so acceptable)

2. **Error response format inconsistency:**
   - Some routes return `{ error: string }`, others return `{ error: string, upgrade_url: string, plan: string }`. No unified error format.
   - `enforceLimits()` returns `{ error, limit, used, plan, upgrade_url }` but checkout returns just `{ error }`.

3. **Supabase query patterns:**
   - Some routes use `try/catch` around Supabase, others rely only on `{ data, error }` destructuring. If Supabase SDK throws (network error), routes without try/catch will crash with unhandled exceptions.

4. **`business_id` ownership:**
   - `businesses/[id]/dashboard` ✅ verifies ownership
   - `content-queue/[id]` ❌ doesn't verify ownership
   - `generate/gbp-post` ❌ doesn't verify business_id ownership
   - `generate/service-page` ❌ doesn't verify business_id ownership
   - `generate/weekly-content` ❌ doesn't verify business_id ownership

5. **Cron endpoints vs. user-facing endpoints** are indistinguishable by route convention — all are under `/api/email/`. Consider namespacing cron routes differently or protecting with a shared secret.

---

## Summary

### 🔴 Critical (fix before any customer touches this)

1. **Add cron secret to `/api/email/weekly-content` and `/api/email/monthly-report`** — these are currently open mass-email triggers. Use `Authorization: Bearer $CRON_SECRET` and verify server-side before processing.

2. **Add ownership check in `/api/content-queue/[id]` PATCH** — join through `content_queue → businesses → users` to verify the queue item belongs to the authenticated user.

3. **Run `npm audit fix`** — jsPDF has a critical vulnerability (GHSA-wfv2-pwc8-crg5) affecting the PDF report route. Also fixes high (flatted) and moderate (hono) vulnerabilities.

4. **SSRF mitigation in `/api/ai-readiness`** — validate that the user-supplied URL is not pointing to internal/private IP ranges (loopback, RFC1918, cloud metadata endpoints) before fetching. Add rate limiting.

5. **Rate limiting on `/api/leads`** — protect against email spam abuse. At minimum, add IP-based rate limiting (1-5 requests/minute per IP). Also sanitize `checks` array fields before rendering in email HTML.

6. **Validate `business_id` ownership in generate routes** — `gbp-post`, `service-page`, `weekly-content` all accept a `business_id` body param and write content to it without verifying ownership. Add: query businesses table to confirm `user_id` matches before inserting.

7. **Guard `STRIPE_WEBHOOK_SECRET` with explicit null check** — remove the `!` non-null assertion in `api/webhook/route.ts` and add a proper guard that returns 500 with a meaningful error rather than crashing.

### 🟡 Important (fix within this sprint)

8. **Enforce plan limits on ALL AI generation routes** — FAQ, review-response, and blog-post don't call `enforceLimits()`. Free users can generate unlimited content. Add `enforceLimits(userId, 'faq')`, `enforceLimits(userId, 'review_reply')`, and the monthly blog limit.

9. **Cap the `count` parameter in `/api/generate/faq`** — unbounded count goes directly into the AI prompt. Add `Math.min(count, 30)` or similar.

10. **Fix `supabase.createServerClient()` fallback behavior** — when `SUPABASE_SERVICE_ROLE_KEY` is missing, it silently falls back to anon client. Routes that need service-role (bypassing RLS) will silently fail or return wrong data. Should log a warning and consider returning `null` so callers know they don't have admin access.

11. **Fix FROM email in `lib/email.ts`** — currently `hello@perpetualagility.com`, should be `hello@localbeacon.ai`. Inconsistent with the email footer.

12. **Add try/catch to cron email loops** — `api/email/monthly-report` iterates businesses with no try/catch. One error kills the entire run.

13. **Fix `SUPABASE_SERVICE_ROLE_KEY` silent fallback** — routes expecting service-role access get anon access with no warning. Add a startup log or throw.

14. **`past_due` / `unpaid` subscription webhook** — users who fail payment keep full access. At minimum, log it. Ideally send them a payment failure email.

15. **Don't pass raw Stripe error messages to client** in `/api/checkout/route.ts` — the catch block returns `err.message` which can include Stripe internal details.

16. **Delete `next.config.js`** — duplicate of `next.config.ts`, will cause confusion.

17. **Move `app/lib/design-tokens.ts` to `lib/`** or remove it if unused.

18. **Investigate `@stripe/stripe-js` usage** — no `loadStripe` calls found in source. If truly unused, remove it to reduce bundle size.

### 🟢 Nice to have (backlog)

19. **Unify error response format** — create a shared `errorResponse(message, status, extras?)` helper used by all routes.

20. **Parallelize dashboard queries** — `/api/businesses/[id]/dashboard` runs 8 sequential Supabase queries. Wrap in `Promise.all()` to reduce latency.

21. **Add token/cost tracking** to `lib/anthropic-client.ts` — log input/output token counts so you can track AI spend per route.

22. **Move `shadcn` and `tsx` to `devDependencies`** in `package.json`.

23. **Move `LB_ANTHROPIC_API_KEY` → document it** in `.env.local.example` or simplify to just `ANTHROPIC_API_KEY`.

24. **Type the Supabase join result** in `api/email/monthly-report/route.ts` instead of casting to `any`.

25. **Add Zod or runtime validation** to API route inputs for belt-and-suspenders type safety.

26. **Fix email CSS** for Outlook/Gmail compatibility — `display: flex` and `gap` don't work in most email clients.

27. **`getMonthlyUsage` uses first business only** — for Agency plan multi-business users, usage limits don't track per business correctly.

28. **Expose `/api/health` only internally** or add a header check — it leaks Anthropic failure details.

29. **Add idempotency to Stripe webhook handlers** — store processed event IDs to handle Stripe retries.

30. **Hardcoded "Minnesota" in FAQ fallback** — `getDemoFaqs()` hardcodes "in Minnesota" in one answer. Should be generic or use the provided `state` param.
