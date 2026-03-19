# Persona Audit — S12-S17 Catch-Up
**Date:** 2026-03-18
**Auditor:** Subagent (Sasha + Jules + Riley personas)
**Scope:** S12-S17 — all pages reviewed from source code. Production state only.

---

## Sasha (UX Designer)
*"Does this flow make sense? Can the user accomplish their goal without thinking?"*

---

### 🔴 Broken Flows

**1. Sign-up page is a completely different product**
The sign-up page (`sign-up/[[...sign-up]]/page.tsx`) uses a **black background with gold `#FFD700` accents** — a completely different visual world from every other page. The Clerk component is styled for a dark SaaS product, while the rest of the app is navy + orange + warm white. This isn't a polish gap. This is a jarring context rupture. A user who clicks "Start Free →" from the checker page lands in what looks like a different company's product. Conversion will suffer.

**2. Onboarding disconnected from the /check flow**
A user who runs a scan on `/check`, enters their email, unlocks the report, and clicks "Start Free →" hits the sign-up page and then onboarding. **There is no continuity.** Onboarding Step 1 asks them to re-enter business name, city, state — information that was never carried forward from the check flow. If the user scanned `bobsplumbing.com`, that should pre-populate onboarding. It doesn't. Zero handoff.

**3. Plan selection at Step 3 triggers checkout without confirmation**
In `onboarding/page.tsx`, clicking any plan card calls `handleStep3Continue(plan)` directly — there is no "Are you sure?" or plan confirmation step. For the `dfy` plan at $499/month, a misclick on the card or button immediately redirects to Stripe checkout. No warning, no confirmation modal, no "Here's what you're signing up for." This is a UX failure and potential chargeback risk.

**4. llms-txt tool is stateless — context not saved from onboarding**
The `/dashboard/llms-txt` page has 12 manual input fields (name, category, city, state, phone, address, website, hours, services, service areas, description, reviews). If the user completed onboarding, **none of this data is pre-populated** from their business profile, even though `useBusinessContext()` is available in the dashboard. The user who already told us everything in onboarding must type it all again. Same issue on the FAQ Builder page.

---

### 🟡 Friction Points

**5. Client-side rate limiting on the /check tool is easily bypassed and poorly communicated**
The rate limiter (3 scans/hour) uses `localStorage` — cleared on incognito, easily bypassed. But worse: when the limit is hit, the error message ("You've reached the scan limit (3 per hour). Try again later.") appears inside the input card, not in a prominent position. Users on mobile who have already scrolled past the input see nothing. The error renders below the fold.

**6. Onboarding Step 2 (Service Areas) has no entry on mobile**
Adding a service area requires pressing `Enter` or clicking the "Add" button. The button is outside the input on the same line, but on narrow mobile screens the layout may stack awkwardly. More importantly: no placeholder shows existing areas on initial load, and the empty state message ("No service areas added yet. We'll default to {city}") appears *under* the input — users may miss it and skip Step 2 entirely, resulting in single-location accounts that never get full value.

**7. Dashboard "Getting Started" steps are non-actionable**
When a user has no business set up, the activity feed shows hardcoded "Step 1, Step 2, Step 3, Step 4" cards. These are text links that go to `/onboarding`, `/dashboard/posts`, etc. But the links are inside a `<Link href>` on the `→` ghost button AND on the row item itself — clicking the row does nothing (no `onClick`), only the button navigates. Users will click the card and nothing will happen, then click the arrow. Confusing.

**8. AI Readiness scan has no "scan my own site" pre-fill**
The suggestion buttons at the bottom of the empty state in `/dashboard/ai-readiness` include "Your business website" but clicking it does nothing (`suggestion === 'localbeacon.ai'` is the only wired case). The button for "Your business website" has an `onClick` that's a no-op. Dead UI.

**9. No mobile sidebar / navigation for the dashboard**
The sidebar is a fixed `w-64` aside with no responsive collapse. On mobile, the dashboard renders with a 256px sidebar crammed next to content — it's not usable. There is no hamburger menu, no mobile nav drawer, no `lg:hidden` responsive breakpoint. This is a confirmed mobile-breakage. The sidebar is pure desktop-only UI.

**10. Pricing page uses `#FFD700` gold — onboarding uses `#FF6B35` orange for same plan**
The pricing page CTAs, highlights, and "Most Popular" badge use gold. The onboarding plan selection page uses orange for "Most Popular." These are the same plans, shown in the same onboarding flow, with different brand colors. The user can see pricing at `/pricing` before onboarding and inside onboarding Step 3, and they look like different products.

---

### 🟢 Polish Suggestions

**11. The `/check` page "How it works" and "What we check" sections add scroll before the form**
Consider moving the form to the very top (above the fold) with the explainer sections below. The emotional hook ("Can ChatGPT find you?") is strong enough to get a URL entered immediately. Users scrolling down before inputting lose momentum.

**12. The teaser state (score circle visible, report gated by email) is smart — but the email field should auto-focus**
After scan completes, the view transitions to the teaser. The email input inside the gated CTA section is not auto-focused. Users have to manually click into it. Given the high-conversion moment, auto-focus would reduce friction.

**13. Onboarding Step 4 ("First Post") CTA only says "Go to Dashboard →"**
After generating the first post, the user is told to "copy it and paste it into your Google Business Profile." The step doesn't link to GBP or open instructions. A "How to post this" help text or expandable guide would reduce support burden and improve activation.

---

## Jules (Visual Designer)
*"Does this look intentional? Is it consistent? Does it feel like one product?"*

---

### 🔴 Broken (inconsistent/accessibility)

**1. Two completely different color palettes exist simultaneously**
The design tokens file correctly defines `NAVY=#1B2A4A`, `ORANGE=#FF6B35`, `WARM_WHITE=#FAFAF7`. But the sign-up and pricing pages use `bg-black` and `#FFD700` (gold) as primary accent, forming an entirely different brand identity. The product literally has two visual personalities:
- **Marketing/Dashboard face:** Navy + Orange + Warm White (clean, professional SaaS)
- **Sign-up + Pricing face:** Black + Gold (crypto/fintech/dark mode)

Neither is wrong on its own. Both existing simultaneously is brand incoherence. This is a `🔴` because it affects the most critical conversion pages.

**2. `text-black` on orange buttons in the dashboard — wrong**
In `ai-readiness/page.tsx` and `llms-txt/page.tsx`, primary buttons use `text-black` on the `#FF6B35` orange background: `className="bg-[#FF6B35] text-black"`. The check page and onboarding correctly use `text-white` on the same orange. Inconsistent. Black text on `#FF6B35` fails WCAG AA contrast ratio (approximately 2.5:1 — minimum is 4.5:1 for normal text).

**3. Design tokens file exists but is not imported anywhere in the app components**
`app/lib/design-tokens.ts` exports the correct brand palette, but a global search for `design-tokens` imports in the component/app directories returns zero hits. Every component hardcodes hex strings inline (`#1B2A4A`, `#FF6B35`, etc.). The token system is aspirational infrastructure that provides zero consistency enforcement. Colors drift because there's no canonical usage — just documentation of intent.

**4. `globals.css` defines `--lb-*` CSS custom properties that are unused**
The globals file correctly defines `--lb-navy: #1B2A4A`, `--lb-orange: #FF6B35`, etc. as CSS variables. But components use hardcoded hex strings instead of `var(--lb-navy)`. The CSS variables are never consumed. Same problem as the tokens file — defined but ignored.

---

### 🟡 Generic (AI-slop risk)

**5. Dashboard page structure is stock shadcn template energy**
The dashboard overview is: badge → welcome heading → stat cards in a 4-grid → activity feed list → card CTA blocks. This is the exact layout of approximately 2,000 SaaS admin templates on GitHub. The individual stat cards use `rounded-xl`, `border`, `hover:shadow-md`, `hover:-translate-y-0.5` — which is the default shadcn card hover pattern. The only brand differentiation is the orange accent color. Without the brand color, this page is indistinguishable from any Next.js starter kit. Risk: low-trust, no-personality, "looks AI-generated" reaction.

**6. The /check page is visually stronger than the dashboard — but the homepage (via landing-content.tsx) is doing too much**
The check page is clean and focused. The landing page (`landing-content.tsx`) has outcomes, a with/without table, social proof, pricing, blog section, FAQs, and a CTA — all on one page. There's no visual breathing room or hierarchy between sections. Every section uses the same visual weight. Without visual pacing (section alternating backgrounds, stronger dividers, generous padding variation), it reads as one continuous wall of content.

**7. Emoji-as-icon pattern is inconsistent**
The check page uses emoji (📄, 🤖, 🏷️) in the "What we check" grid. The dashboard uses Lucide icons (FileText, Globe, Star). The sidebar uses Lucide exclusively. The landing page mixes both. Some nav items have Lucide. The onboarding step "icons" are just step numbers. No consistent iconography system exists.

**8. The "Google preview" in schema markup is a fake render using hardcoded HTML/CSS in a white card**
The Google SERP preview in `schema/page.tsx` uses inline HTML with `text-[#1a0dab]` (Google blue), `text-[#006621]` (Google green), `text-gray-500`. This is fine for demo purposes — but it's a static hardcoded stub that doesn't actually reflect how Google would render the schema, and it's styled with literal Google brand colors in the product UI, which looks off. It should be clearly labeled as an approximation, or use a more stylized "preview" treatment.

---

### 🟢 Polish

**9. Sidebar active state has border-left — but the transparent `border-left: 2px solid transparent` on inactive items is correct thinking**
Good: maintaining consistent indentation with `border-left: 2px solid transparent` on inactive items prevents layout shift on activation. This is intentional and right. Worth keeping.

**10. Score ring animation in ai-readiness uses `transition-all duration-1000 ease-out`**
Nice touch. The ring draws in smoothly. The `ScoreRing` component is the strongest UI element in the product.

**11. The onboarding progress bar using step numbers + labels (hidden on mobile via `hidden sm:block`) is a solid pattern**
Good responsive thinking. The full-width step indicator doesn't break on mobile because labels hide gracefully.

---

## Riley (Product Analyst)
*"How do we know this is working? What metric proves value?"*

---

### Missing Metrics

**1. Zero product analytics instrumentation — none**
A comprehensive grep for `posthog`, `mixpanel`, `gtag`, `GA4`, `amplitude`, `heap`, `plausible`, `fathom`, `segment` across all source files returns **zero hits**. There is no product analytics anywhere in the codebase. We have no idea:
- How many users reach the /check page
- How many complete the scan
- How many provide an email (email gate conversion)
- How many click "Start Free →" from the report
- How many complete onboarding vs drop off at which step
- Which dashboard features are actually used
- Whether users who run AI Readiness scans convert to paid at higher rates

This is the single most critical gap in the entire product.

**2. Event logging exists only in server logs — unusable for product decisions**
The codebase uses `console.log(JSON.stringify({ event: 'aeo_scan_complete', ... }))` in route handlers. These events are logged to Railway/server stdout. They are:
- Not queryable without log tooling
- Not persisted to a queryable database
- Not visible to the product team for analysis
- Not correlated with user sessions or journeys

Server events are ops-level instrumentation (availability, errors). They're not product analytics. We can't answer "what % of scans convert to sign-ups" from stdout.

**3. No retention signal exists**
There's no tracking of whether a user returns to run a second scan, generate a second post, or check their score again. We can't compute DAU, WAU, retention at any time horizon. The `HistoryScan[]` table in Supabase proves a user scanned multiple times — but there's no dashboard for this in the product or in any analytics tool.

**4. Checkout funnel is unmeasured**
The checkout flow (pricing → Stripe) has no funnel tracking. We don't know:
- What % of pricing page visitors click a paid plan CTA
- What % who click reach Stripe checkout
- What % who open Stripe complete the purchase
- Whether the $49/mo or $499/mo is converting better

The `handleCheckout` function has a `console.error("Checkout error:", data.error)` — that's it for instrumentation.

**5. The email capture on /check is the only tracked conversion event — and it's not being measured**
The `/api/leads` route correctly logs `event: 'lead_captured'` to stdout and saves to Supabase. But there is no dashboard showing total leads captured over time, lead-to-signup rate, lead score distribution, or email open/click rates from the follow-up report email.

---

### Recommended Instrumentation

**Priority 1 — Install PostHog immediately (free tier covers our volume)**
```
npm install posthog-js
```
Add to `app/layout.tsx`. This gives: pageviews, sessions, user identity (via Clerk user ID), and a SDK for event tracking. Estimated setup time: 2 hours.

**Priority 2 — Key events to instrument (in order of value)**

| Event | Where | Why |
|---|---|---|
| `check_scan_started` | checker-form.tsx:runScan | Top of funnel — how many URLs entered |
| `check_scan_completed` | checker-form.tsx after result | Scan success rate |
| `check_email_submitted` | checker-form.tsx:handleEmailSubmit | Primary lead conversion |
| `check_cta_clicked` | checker-form.tsx full-report CTA | Bottom-of-funnel signal |
| `onboarding_step_completed` | onboarding/page.tsx each step | Onboarding funnel by step |
| `plan_selected` | onboarding step 3 | Plan selection intent |
| `checkout_started` | pricing/page.tsx handleCheckout | Paid intent |
| `ai_readiness_scan_run` | dashboard/ai-readiness | Feature engagement |
| `tool_used` | llms-txt, schema, faq pages | Feature engagement breadth |
| `content_generated` | posts, pages, blog | Core value delivery |

**Priority 3 — Supabase metrics queries**
Monthly queries to build a simple internal dashboard:
- New users per week (from Clerk webhooks → Supabase)
- Onboarding completion rate (businesses created / signups)
- Feature usage: which tools are being used per user
- Scan-to-signup conversion: leads table joined with users

**Priority 4 — Google Search Console + Vercel Analytics**
Zero-cost baseline that should already be wired. Vercel Analytics is one `npm install @vercel/analytics` away and provides Web Vitals + pageview data without any privacy concerns or consent requirements.

---

### 30-Day Success Criteria

**If LocalBeacon is working at 30 days, the numbers look like:**

| Metric | Target | Red Flag |
|---|---|---|
| /check page visitors | 200+/week | < 50/week |
| Scan completion rate | > 70% of arrivals | < 40% |
| Email gate conversion | > 25% of completed scans | < 10% |
| Lead-to-signup rate | > 15% | < 5% |
| Onboarding completion (to Step 4) | > 60% of signups | < 30% |
| Businesses created per week | 5+ | < 2 |
| Free → Solo upgrade rate | > 8% within 30 days | < 3% |
| AI Readiness scans per active user | ≥ 2 scans/user | 1 scan only (no re-engagement) |
| Content generated per active user | ≥ 3 pieces | 0–1 (non-activated) |

**The single metric that proves value:**
> **"% of signups who generate at least 1 piece of content (post, page, FAQ) within 7 days"**

If this is > 50%, the product is activating users. Below 30%, the onboarding is failing even if signups look healthy. This is the only number that matters in month one.

---

## Priority Actions for S19
*Top 10 findings ranked by revenue/retention impact*

| # | Finding | Persona | Impact | Effort |
|---|---|---|---|---|
| 1 | **Install PostHog** — zero analytics means zero learning loop. Every decision is a guess. | Riley | 🔴 Critical | Low (2h) |
| 2 | **Fix sign-up page brand mismatch** — black/gold vs white/orange breaks conversion trust at the hardest moment. | Jules + Sasha | 🔴 Critical | Medium (4h) |
| 3 | **Pre-populate onboarding from /check context** — carry forward URL, email, and any inferred business data. | Sasha | 🔴 High | Medium (6h) |
| 4 | **Fix `text-black` on orange buttons** — WCAG contrast failure. Accessibility and visual consistency. | Jules | 🔴 High | Low (30min) |
| 5 | **Add mobile navigation to dashboard** — the sidebar is completely broken on mobile. All dashboard pages are unreachable on phones. | Sasha | 🔴 High | High (8h) |
| 6 | **Add confirmation step before $499/mo DFY checkout** — misclick → Stripe redirect is a chargeback risk. | Sasha | 🟡 High | Low (2h) |
| 7 | **Pre-fill llms-txt and FAQ Builder from business profile** — `useBusinessContext()` already provides this data. Massive onboarding friction reduction. | Sasha | 🟡 Medium | Low (3h) |
| 8 | **Align pricing page to orange brand** — replace `#FFD700` with `#FF6B35` on pricing, or deliberately commit to dark theme + document it. Either is fine. Both is not. | Jules | 🟡 Medium | Medium (4h) |
| 9 | **Wire "Your business website" suggestion button** in AI Readiness empty state — it's a dead no-op. | Sasha | 🟡 Low | Low (30min) |
| 10 | **Start tracking 30-day success criteria** — pick the 5 key events, instrument them, set up a PostHog dashboard before S19 ships anything new. | Riley | 🟡 High | Medium (4h) |

---

*Audit completed 2026-03-18. Based on source code review of S12-S17 production state. No user interviews conducted — recommend validating top findings with 3-5 actual users before S20.*
