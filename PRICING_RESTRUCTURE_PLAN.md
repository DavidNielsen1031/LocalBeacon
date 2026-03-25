# LocalBeacon Pricing Restructure — Multi-Phase Plan

**Created:** 2026-03-24
**Status:** DRAFT — awaiting David's approval
**Goal:** Restructure pricing ($49→$99/mo, add $899/yr), simplify dashboard, add Launch Package checkout bundling, add annual toggle, clean up tech debt, build test coverage.

---

## Pre-Work: What Changes

**Pricing changes:**
- Free: unchanged (AI readiness check, email capture, no account required)
- Autopilot: $49/mo → $99/mo (+ $899/yr annual option)
- Launch Package: $499 one-time → $499 + auto-starts $99/mo subscription (first month included)
- Agency tier: fully removed from code and DB

**Feature changes (from our V2h mockup):**
- Autopilot: 2 blogs/mo (was 4), 3 city pages/mo (was 10), no location limit mentioned
- GBP content grouped (weekly posts + review drafts)
- Schema & llms.txt = "auto-generated, you install"
- Monthly Intelligence Report = grouped (AI rescan + competitor + progress + landscape)
- Launch Package: strategy call, GBP audit, competitor deep-dive, platform install (FAQs, schema, llms.txt, service area pages), custom brand voice profile, before/after AI readiness report, first month of Autopilot

**Dashboard simplification:**
- Replace 15-page sidebar with a single-page "command center" 
- Customer sees: status cards, this week's content (copy/post), monthly report, settings
- Power features (FAQ builder, schema editor, page builder) become sections within the main view or are removed from customer-facing UI entirely — the automation handles them

---

## Phase 1: Foundation (Pricing Infrastructure)

**Goal:** All pricing references point to one source of truth, new Stripe products created, annual billing wired.

### 1.1 — Centralize pricing constants
- **Update `lib/plans.ts`** — single source of truth for all plan definitions
  - Autopilot: $99/mo, $899/yr
  - Launch Package: $499 one-time (bundles first month of Autopilot subscription)
  - Remove Agency tier entirely
  - Add `annualPrice` and `annualStripePlan` fields
  - Update all feature lists to match V2h mockup
  - Update `PRICING_FAQS` to reflect new pricing and structure

### 1.2 — Hunt and kill hardcoded prices
Files with hardcoded `$49` that need to reference `lib/plans.ts` instead:
- `app/layout.tsx` (meta description)
- `app/pricing/layout.tsx` (meta title)
- `app/pricing/page.tsx` (comparison callout — already uses PLANS but has hardcoded comparison text)
- `app/dashboard/page.tsx` (upgrade banner says "$49/mo →")
- `app/dashboard/settings/page.tsx`
- `app/dashboard/queue/queue-actions.tsx`
- `app/dashboard/reports/page.tsx`
- `app/for/[industry]/page.tsx` (industry landing pages)
- `app/check/checker-form.tsx`
- `app/terms/page.tsx`
- `components/landing-content.tsx` (FAQ + comparison)
- `components/dfy-upsell-card.tsx`
- `components/upgrade-gate.tsx`
- `components/gsc-card.tsx`
- `components/homepage-seo-content.tsx`
- `lib/email.ts` (email templates)
- `lib/industry-data/*.ts` (6 files)

### 1.3 — Stripe configuration
- Create new Stripe price: Autopilot Monthly ($99/mo recurring)
- Create new Stripe price: Autopilot Annual ($899/yr recurring)
- Keep existing DFY price ($499 one-time) OR recreate if needed
- Update Vercel env vars: `STRIPE_SOLO_PRICE_ID`, add `STRIPE_SOLO_ANNUAL_PRICE_ID`
- Verify webhook handles annual subscriptions correctly (same `plan: solo` in metadata)

### 1.4 — DB schema cleanup
- Migration 009: `ALTER TABLE users DROP CONSTRAINT IF EXISTS users_plan_check; ALTER TABLE users ADD CONSTRAINT users_plan_check CHECK (plan IN ('free', 'solo'));`
- Add `billing_period` column: `ALTER TABLE users ADD COLUMN IF NOT EXISTS billing_period text DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'annual'));`

### 1.5 — Checkout flow update
- **`app/api/checkout/route.ts`**: Add 'SOLO_ANNUAL' plan key, remove 'AGENCY'
- **`app/api/checkout-public/route.ts`**: Same changes
- **`app/api/webhook/route.ts`**: Handle annual subscriptions, set `billing_period`
- **Launch Package checkout**: $499 one-time creates a Stripe checkout in `payment` mode. On `checkout.session.completed`, webhook ALSO creates a $99/mo subscription for the customer (first month free via `trial_period_days: 30` or coupon). This keeps it as a single checkout for the customer.

### 1.6 — Tests (Phase 1)
- `__tests__/lib/plans.test.ts` — validate plan definitions, no hardcoded prices outside plans.ts
- `__tests__/api/checkout.test.ts` — unit test checkout route (mock Stripe)
- `__tests__/api/webhook.test.ts` — unit test webhook handler for all event types
- `__tests__/hardcoded-prices.test.ts` — grep-based test that fails if `$49` or `$99` appears outside `lib/plans.ts` (catches future regressions)

### Phase 1 Forensic Checklist
- [ ] `grep -rn '\$49' --include="*.ts" --include="*.tsx"` returns ONLY `lib/plans.ts` and `node_modules`
- [ ] `grep -rn 'agency' --include="*.ts" --include="*.tsx" -i` returns no plan references
- [ ] Stripe dashboard shows correct prices
- [ ] Vercel env vars updated
- [ ] All tests pass
- [ ] Build succeeds locally (`npm run build`)

---

## Phase 2: Pricing Page & Landing Page

**Goal:** New pricing UI matches V2h mockup. Annual/monthly toggle. Launch Package presented as add-on.

### 2.1 — Pricing page rewrite (`app/pricing/page.tsx`)
- Two-card layout (Autopilot + Launch Package), not three columns
- Free AI Readiness Check banner at top
- Monthly/Annual toggle (saves $289/yr messaging)
- Autopilot card: all features from V2h with Automated/We host/You post/You install tags
- Launch Package card: strategy call, GBP audit, competitor report, platform install group, brand voice, before/after report, first month included
- Timeline visual on Launch Package
- Retention banner at bottom
- Updated FAQ section from `lib/plans.ts`

### 2.2 — Landing page update (`components/landing-content.tsx`)
- Update pricing section to match new structure (imports from `lib/plans.ts`)
- Update comparison callout ($99/mo vs agency $800-1,500/mo — even stronger value prop now)
- Update FAQ answers

### 2.3 — Industry pages (`app/for/[industry]/page.tsx`)
- Pull pricing from `lib/plans.ts` instead of hardcoded strings
- Update any industry-specific pricing copy

### 2.4 — SEO metadata
- `app/layout.tsx`, `app/pricing/layout.tsx` — update meta descriptions/titles
- `app/terms/page.tsx` — update pricing references in legal copy

### 2.5 — Tests (Phase 2)
- `__tests__/pricing-page.test.tsx` — render test, verify prices match `lib/plans.ts`
- `__tests__/landing-content.test.tsx` — render test, verify pricing section
- E2E: Playwright test for pricing page → click Autopilot → verify Stripe checkout URL contains correct price ID

### Phase 2 Forensic Checklist
- [ ] Pricing page renders correctly at `/pricing`
- [ ] Annual toggle switches prices and CTA text
- [ ] All CTAs route to correct checkout (monthly vs annual)
- [ ] Launch Package CTA routes to correct checkout
- [ ] Mobile responsive — both cards stack properly
- [ ] Landing page pricing section matches
- [ ] Industry pages show correct pricing
- [ ] Lighthouse score ≥ 90 on pricing page
- [ ] Screenshots captured (before/after)

---

## Phase 3: Dashboard Simplification

**Goal:** Replace the 15-page cognitive nightmare with a single "command center" that a plumber checks once a week for 30 seconds.

### 3.1 — Design the new dashboard
The plumber's weekly experience should be:
1. Open dashboard → see "Your AI visibility score is 74 (+3 from last month)" 
2. See "This week's content" → 1 GBP post ready, 1 review response ready → click "Copy" button
3. See "Published this month" → 2 blog posts, 1 city page → links to view them
4. Done. Close tab. Go fix a pipe.

**New single-page dashboard layout:**
- **Hero card:** AI Readiness score (big number) + trend arrow + "Next scan: Sunday"
- **Action card:** "Ready for you" — GBP post to copy/paste, review responses to copy/paste. Big "Copy" buttons. Nothing else.
- **Progress card:** What Autopilot published this month (blog posts, city pages, with links)
- **Report card:** Link to latest monthly report PDF + "View online"
- **Settings link** (small, bottom) — business info, billing

### 3.2 — Sidebar simplification
Replace 15 nav items with 4:
- Dashboard (home)
- Content (view published posts, pages, blogs — read-only gallery)
- Reports (monthly reports archive)  
- Settings (business info, billing, schema/llms.txt install instructions)

### 3.3 — Move power tools
- FAQ Builder, Schema Editor, AI Index, llms.txt editor, Page Builder, Audit → either:
  - **Option A:** Remove from dashboard entirely (Autopilot generates everything, customer doesn't need to touch it)
  - **Option B:** Put behind a "Power Tools" expandable section for technical users
- Recommend Option A for now. The whole point of Autopilot is "we handle it."

### 3.4 — "Install on your site" page
- New dedicated page: `/dashboard/install`
- Shows schema markup code block with "Copy" button
- Shows llms.txt content with "Copy" button  
- Step-by-step instructions per platform (WordPress, Squarespace, Wix)
- Or: "Want us to do this? → Launch Package CTA"

### 3.5 — Tests (Phase 3)
- `__tests__/dashboard/page.test.tsx` — render test with mock data
- `__tests__/dashboard/sidebar.test.tsx` — verify only 4 nav items render
- E2E: Playwright test — login → dashboard → verify score card, action card, progress card render

### Phase 3 Forensic Checklist
- [ ] Dashboard loads in < 2 seconds
- [ ] Only 4 sidebar nav items visible
- [ ] "Copy" buttons work for GBP posts and review responses
- [ ] Published content links resolve correctly
- [ ] Mobile responsive — cards stack
- [ ] Old dashboard routes redirect to new dashboard (no 404s)
- [ ] Screenshots captured (before/after)

---

## Phase 4: Email & Conversion Funnel

**Goal:** Emails reflect new pricing. Free → paid conversion flow is tight. Lead nurture sequence works.

### 4.1 — Email template updates (`lib/email.ts`)
- Update all pricing references ($49→$99)
- Update plan name references (remove Agency mentions)
- Update CTA links

### 4.2 — Free user conversion flow
Current: User enters email on AI Readiness checker → gets result → ... nothing?
New flow:
1. Enter email + business URL → get AI readiness score (no account)
2. Immediately: email with full report + "Here's what Autopilot would fix for you" + CTA
3. Day 3: "Your competitors are doing X and you're not" email (if we have competitor data)
4. Day 7: "Your AI readiness score hasn't changed" email + pricing CTA
5. Day 14: Final nudge

### 4.3 — Checkout success flow
- Autopilot: checkout → Clerk sign-up (if not logged in) → onboarding wizard → dashboard
- Launch Package: checkout → Clerk sign-up → "We'll reach out within 1 business day" + booking link email
- Annual: same as Autopilot monthly

### 4.4 — Upgrade banners
- `app/dashboard/page.tsx` — update upgrade banner text ($99/mo)
- `components/upgrade-gate.tsx` — update
- `components/dfy-upsell-card.tsx` — update to match new Launch Package positioning

### 4.5 — Tests (Phase 4)
- `__tests__/lib/email.test.ts` — verify no hardcoded prices in email templates
- `__tests__/api/leads.test.ts` — verify lead capture works
- E2E: Playwright test — AI readiness check → enter email → verify lead saved in DB

### Phase 4 Forensic Checklist
- [ ] Welcome email sends on sign-up with correct pricing
- [ ] Weekly content email shows correct plan name
- [ ] Monthly report email renders correctly  
- [ ] Lead capture stores email in DB
- [ ] No `$49` appears in any email
- [ ] Checkout success redirects work for all 3 paths (monthly, annual, launch package)

---

## Phase 5: Cron & Automation Alignment

**Goal:** Crons match the new plan features (2 blogs/mo, 3 city pages/mo, weekly posts).

### 5.1 — Cron adjustments
- `api/cron/weekly-blog` — currently generates blogs weekly (4/mo). Change to bi-weekly (2/mo). Update `vercel.json` schedule.
- `api/cron/city-pages` — verify it generates 3 pages/mo (currently runs monthly, check if count is configurable). Update if it generates 10.
- `api/cron/weekly-posts` — no change (weekly is correct)
- `api/cron/weekly-scan` — no change
- `api/cron/monthly-report` — update email content to match new Intelligence Report format (include competitor tracking, landscape changes)
- `api/cron/review-nudge` — no change
- `api/cron/checkout-health` — update for new price IDs

### 5.2 — Plan limit enforcement
- Verify all crons check `plan === 'solo'` before generating content
- Verify free plan limits are enforced (currently: 1 scan/mo, 5 posts/mo, 3 review drafts/mo)

### 5.3 — Tests (Phase 5)
- `__tests__/api/cron/weekly-blog.test.ts` — verify generates 2/mo max
- `__tests__/api/cron/city-pages.test.ts` — verify generates 3/mo max
- `__tests__/api/cron/weekly-posts.test.ts` — verify runs for solo plan users only

### Phase 5 Forensic Checklist
- [ ] Blog cron generates exactly 2 posts/month
- [ ] City pages cron generates exactly 3 pages/month
- [ ] Weekly posts cron fires every Monday
- [ ] Free users don't receive automated content
- [ ] `vercel.json` cron schedules are correct
- [ ] Monthly report includes all 4 intelligence sections

---

## Phase 6: E2E Testing & Final QA

**Goal:** Full end-to-end coverage. Production-ready.

### 6.1 — E2E test suite (Playwright)
- `e2e/homepage.spec.ts` — landing page loads, pricing section visible
- `e2e/ai-readiness-check.spec.ts` — enter URL → get score → email capture
- `e2e/pricing-page.spec.ts` — toggle annual/monthly, CTA links correct
- `e2e/checkout-flow.spec.ts` — click CTA → Stripe checkout (mock or test mode)
- `e2e/dashboard.spec.ts` — authenticated user sees simplified dashboard
- `e2e/mobile-responsive.spec.ts` — key pages render correctly on mobile viewports

### 6.2 — Final forensic audit
- Full `grep` sweep for old pricing ($49, agency, "10 city pages", "4 blog posts")
- Lighthouse audit on all key pages (home, pricing, dashboard, check)
- Broken link check across all pages
- Stripe test mode end-to-end: create checkout → complete → verify webhook → verify DB → verify dashboard

### 6.3 — Deploy
- Merge to `main`
- Verify Vercel auto-deploy
- Smoke test production: homepage, pricing, AI checker, checkout
- Update Stripe to live mode prices (if test mode was used)

---

## Summary

| Phase | What | Key Risk | Est. Effort |
|-------|------|----------|-------------|
| 1 | Pricing infrastructure | Stripe misconfiguration | Medium |
| 2 | Pricing & landing pages | Visual regressions | Medium |
| 3 | Dashboard simplification | Breaking existing features | High |
| 4 | Email & conversion | Email deliverability | Medium |
| 5 | Cron alignment | Content generation bugs | Low |
| 6 | E2E testing & QA | Edge cases | Medium |

**Total:** 6 phases, each with its own test suite and forensic checklist.

**Deployment strategy:** Each phase merges to `main` independently. No big-bang deploy. Phase 1 must go first (pricing infrastructure), then 2-5 can be somewhat parallel but recommended in order. Phase 6 is the final gate.

---

*This plan will be converted to GitHub Issues before execution begins.*
