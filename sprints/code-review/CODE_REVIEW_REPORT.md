# LocalBeacon.ai — Production Code Review Report

> **Date:** 2026-03-18 | **Reviewer:** Alexander 🦊 | **Method:** 7-phase review + 4 persona audits
> **Codebase:** `products/localbeacon/app/` — 108 source files, Next.js 16 + Clerk + Stripe + Supabase + PostHog + Anthropic

---

## Executive Summary

**Overall Grade: C+ (Not production-ready for paying customers)**

The product works for demos and has impressive feature breadth for its age (built in 7 sprints over ~2 weeks). But it has **critical security holes**, **inconsistent plan enforcement**, **zero RLS protection**, and **several trust-killing UX gaps**. These need to be fixed before any real customer pays $49-499.

**By the numbers:**
- 🔴 **16 Critical** — Must fix before any customer
- 🟡 **19 Important** — Fix within next sprint
- 🟢 **14 Nice-to-have** — Backlog

---

## 🔴 CRITICAL (Fix Before Any Customer)

### Security

| # | Issue | Source | Fix |
|---|-------|--------|-----|
| C1 | **Cron email endpoints have zero auth** — `/api/email/weekly-content` and `/api/email/monthly-report` can be hit by anyone, triggering mass email to all users | Phase 1-3 | Add `CRON_SECRET` header check |
| C2 | **RLS is bypassed** — all routes use service role key. 4 RLS policies in migration are dead code. Auth depends entirely on per-route `.eq('user_id')` filters being correct | Phase 4 | Either enforce RLS with anon key OR audit every route's ownership check |
| C3 | **Content queue has no ownership check** — any logged-in user can PATCH any queue item by ID | Phase 1-3 | Add business→user ownership join |
| C4 | **3 generate routes don't verify business_id ownership** — `gbp-post`, `service-page`, `weekly-content` accept any business_id | Phase 1-3 | Verify business belongs to user before writing |
| C5 | **SSRF in `/api/ai-readiness`** — fetches any user-supplied URL with no private IP filtering | Phase 1-3 | Block loopback/RFC1918/metadata IPs |
| C6 | **No rate limiting on public endpoints** — `/api/leads` and `/api/ai-readiness` are wide open | Phase 1-3 | Add IP-based rate limiting |
| C7 | **jsPDF critical vulnerability** — HTML + PDF Object Injection (GHSA-wfv2-pwc8-crg5) | Phase 1-3 | `npm audit fix` |
| C8 | **Real Clerk secret key in `.env.local` on disk** — verify gitignored, rotate if ever committed | Phase 4 | Check git history, rotate key |
| C9 | **`leads` table has no migration and no RLS** — referenced but never defined in schema | Phase 4 | Add migration + RLS policy |

### Product / Trust

| # | Issue | Source | Fix |
|---|-------|--------|-----|
| C10 | **DFY pricing mismatch** — homepage says $499/month, pricing page says $499 one-time, onboarding shows both | Bob + Riley | Pick one, make consistent everywhere |
| C11 | **Zero testimonials** — single biggest conversion killer for SMBs | Bob | Add friend's salon testimonial ASAP |
| C12 | **FROM email is `@perpetualagility.com`** not `@localbeacon.ai` — looks like phishing | Riley | Change FROM in `lib/email.ts` |

### Code Quality

| # | Issue | Source | Fix |
|---|-------|--------|-----|
| C13 | **Silent error swallowing** — 8+ dashboard pages use `catch(() => {})` with zero user feedback | Phase 5 | Add error states to every page |
| C14 | **`landing-content.tsx` is 1,455-line client monolith** — entire homepage ships to browser | Phase 6-7 | Split into server shell + client islands |
| C15 | **Form labels not associated to inputs** — screen readers can't use tool pages | Phase 5 | Add `htmlFor`/`id` attributes |
| C16 | **`bg-white0` typo** in llms-txt and blog inputs — invalid Tailwind, no background renders | Phase 5 | Fix to `bg-white` |

---

## 🟡 IMPORTANT (Fix This Sprint)

### Security & Auth

| # | Issue | Source |
|---|-------|--------|
| I1 | `STRIPE_WEBHOOK_SECRET!` non-null assertion — crashes unhelpfully if missing | Phase 1-3 |
| I2 | Email injection risk in `/api/leads` — client-supplied `checks` rendered in HTML email | Phase 1-3 |
| I3 | `past_due`/`unpaid` webhook does nothing — users keep access after failed payment | Phase 1-3 |
| I4 | API routes rely on per-handler auth — no middleware protection for `/api/generate/*` | Phase 4 |

### Plan Enforcement

| # | Issue | Source |
|---|-------|--------|
| I5 | Plan limits only enforced on 2 of 7 AI routes — FAQ, review-response, blog-post all ungated | Phase 1-3 |
| I6 | FAQ `count` parameter unbounded — user can request 1000 FAQs, burning massive tokens | Phase 1-3 |
| I7 | Features promised but not built — "schema installed on your site," "dedicated onboarding call" | Riley |

### UX & Design

| # | Issue | Source |
|---|-------|--------|
| I8 | Onboarding Step 3 DFY redirects to Stripe with no confirmation (pricing page HAS this, onboarding doesn't) | Sasha |
| I9 | Schema demo "Copy Code" has no warning — users could paste demo data into their site | Sasha |
| I10 | Orange button text inconsistent — `text-black` in dashboard, `text-white` on marketing | Jules |
| I11 | Design tokens file exists but nothing imports it — every component hardcodes hex values | Jules |
| I12 | Color contrast failures — `#636E72` on `#FAFAF7` ≈ 3.5:1, fails WCAG AA | Phase 5 + Jules |
| I13 | Mobile nav missing on marketing pages — hamburger only exists in dashboard | Phase 5 |
| I14 | 4 different nav implementations, 4 different footers — no shared components | Phase 5 |

### Performance

| # | Issue | Source |
|---|-------|--------|
| I15 | Dashboard makes 8 sequential DB queries — should `Promise.all()` | Phase 6-7 |
| I16 | `/api/businesses` fetched 4× independently by different components | Phase 6-7 |
| I17 | Zero `next/image` usage — 4 raw `<img>` tags, no optimization | Phase 6-7 |
| I18 | No welcome email after onboarding — zero re-engagement loop | Riley |
| I19 | Onboarding ends cold — "copy this post" then nothing. No checklist, no next steps | Riley + Sasha |

---

## 🟢 NICE TO HAVE (Backlog)

| # | Issue | Source |
|---|-------|--------|
| N1 | Unify error response format across all API routes | Phase 1-3 |
| N2 | Add token/cost tracking to Anthropic client | Phase 1-3 |
| N3 | Move `shadcn` and `tsx` to devDependencies | Phase 1-3 |
| N4 | Remove unused `@stripe/stripe-js` from bundle | Phase 1-3 |
| N5 | Delete ghost `next.config.js` (duplicate of `.ts`) | Phase 6-7 |
| N6 | Clean up 5 stale git branches (s12, s13, s15, s16, content) | Phase 6-7 |
| N7 | 14 `as any` casts — mostly pricing plan types, fix with discriminated union | Phase 6-7 |
| N8 | Consolidate PostHog imports — used in 7 files, should be a hook | Phase 6-7 |
| N9 | Add bundle analyzer to `next.config.ts` | Phase 6-7 |
| N10 | Parallelize dashboard Supabase queries with `Promise.all` | Phase 6-7 |
| N11 | Add Zod runtime validation to API inputs | Phase 1-3 |
| N12 | Placeholder opacity at 30% (~1.5:1 contrast) — fails WCAG | Jules |
| N13 | Hardcoded "Minnesota" in FAQ fallback | Phase 1-3 |
| N14 | Add idempotency to Stripe webhook handlers | Phase 1-3 |

---

## Recommended Fix Order

**Day 1 — Security (C1-C9)**
These are exploitable today. One script kiddie finding the cron endpoints = mass email blast.

**Day 2 — Trust & Product (C10-C12, I7, I18-I19)**
DFY pricing mismatch is a legal risk. Missing testimonials kills conversion. Email FROM domain looks like phishing.

**Day 3 — Code Quality (C13-C16, I5-I6)**
Silent errors, plan enforcement, accessibility. These affect every user interaction.

**Day 4 — UX Polish (I8-I14)**
Design consistency, mobile nav, contrast fixes. Makes it feel like one product.

**Day 5 — Performance (I15-I17, N10)**
Sequential queries, duplicate fetches, image optimization. Makes it feel fast.

---

## Source Reports

All detailed findings with line numbers and code snippets:
- `round1-phases1-3.md` — 37K, 30 findings (structural + foundation + API routes)
- `phase4-security.md` — Middleware, RLS, secrets, XSS, CSRF
- `phase5-components.md` — 19K, client/server split, a11y, mobile, states
- `phase6-7-perf-quality.md` — 14K, bundle, caching, TypeScript, lint
- `personas-ux-visual.md` — 21K, Sasha (UX) + Jules (Visual)
- `personas-customer-product.md` — 18K, Bob (Customer) + Riley (Product)

**Total review coverage: ~130K of analysis across 108 source files.**
