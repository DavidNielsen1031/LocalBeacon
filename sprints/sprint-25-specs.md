# Sprint 25 — Prove ROI

**Theme:** Customer-facing GSC integration + checkout completion + content engine
**Branch:** `sprint/localbeacon/s25`
**Started:** 2026-03-21

---

## LB-S25-01: Fix Checkout Flow (M)

**Problem:** Unauthenticated users clicking "Start Solo — $49/mo" or "Get DFY Setup — $499" get redirected to /sign-up but their plan intent is lost. After signing up, they land on /onboarding with no checkout triggered.

**Solution:**
- Store selected plan in URL param or localStorage before redirect
- After Clerk auth completes, check for pending plan intent
- If plan intent exists, redirect to Stripe checkout instead of onboarding
- DFY confirmation dialog must also work for unauthenticated users

**Verification:**
- Incognito → /pricing → click Solo → sign up → Stripe checkout opens
- Incognito → /pricing → click DFY → confirm dialog → sign up → Stripe checkout opens
- Already signed in → /pricing → click Solo → Stripe checkout opens immediately
- Test with Stripe test mode keys

**Measurable Outcome:** 100% of plan button clicks result in either Stripe checkout (authenticated) or sign-up → Stripe checkout (unauthenticated)

---

## LB-S25-02: Customer GSC OAuth (L)

**Problem:** Customers have no way to prove LocalBeacon is working for them. We can't show before/after data without access to their search performance.

**Solution:**
- Add Google OAuth with `webmasters.readonly` scope to the dashboard
- "Connect Google Search Console" button on dashboard overview
- OAuth popup → Google consent → store refresh token in Supabase
- Pull search data weekly via cron (clicks, impressions, queries, pages, position)
- Store in `gsc_data` Supabase table (user_id, site_url, date, metrics JSON)

**Verification:**
- Dashboard shows "Connect GSC" button when not connected
- OAuth flow completes and token is stored
- Weekly pull populates data
- Dashboard card renders real data after connection

**Measurable Outcome:** Connected users see their search performance data in dashboard within 7 days of connecting

---

## LB-S25-03: GSC Dashboard Card (M)

**Problem:** Even with GSC data, there's no UI to show it. Customers need a simple "your visibility is improving" signal.

**Solution:**
- Dashboard card: "Search Performance" with period selector (7d/28d/3mo)
- Metrics: total clicks, total impressions, avg position, CTR
- Top 5 queries table (query, clicks, impressions, position)
- Trend arrow (up/down vs previous period)
- Solo+ feature (gated behind plan check)

**Verification:**
- Card renders with mock data when no GSC connected (with "Connect GSC" CTA)
- Card renders with real data after GSC connected
- Period selector switches data correctly
- Free users see card preview with upgrade CTA

**Measurable Outcome:** GSC card loads in <2s, shows correct data vs raw GSC API

---

## LB-S25-04: GSC Checks in AI Readiness Scanner (S)

**Problem:** Our AI readiness scanner doesn't check if a site is actually indexed by Google — the most fundamental SEO requirement.

**Solution:**
- Add 2 new checks to `/api/ai-readiness`:
  1. "Sitemap submitted" — check if `/sitemap.xml` exists AND is referenced in `robots.txt`
  2. "Google indexing signals" — check for canonical tags, meta robots allowing indexing, no noindex directives
- Use public signals only (no auth required from scanned site)

**Verification:**
- localbeacon.ai scores pass on both new checks
- A site with no sitemap fails the sitemap check
- A site with `<meta name="robots" content="noindex">` fails the indexing check
- Total check count goes from 19 to 21

**Measurable Outcome:** Scanner now evaluates 21 signals (up from 19)

---

## LB-S25-05: Blog Content Cron (S)

**Problem:** Blog posts are generated manually. Need automated content flywheel.

**Solution:**
- Cron job: 2 posts/week (Monday + Thursday 6am CST)
- Pulls next topic from `scripts/blog-keyword-queue.json`
- Generates via `scripts/generate-blog-post.py`
- Auto-commits to `content` branch
- Auto-submits new URL to GSC for indexing via API
- Posts summary to #local-beacon Discord channel

**Verification:**
- Cron runs and generates a post without manual intervention
- Post appears on localbeacon.ai/blog after merge
- URL submitted to GSC API
- Discord notification sent

**Measurable Outcome:** 8 blog posts/month generated automatically

---

## LB-S25-06: End-to-End Flow Test (M)

**Problem:** Nobody has verified the full flow works: sign up → create business → generate post → saved in DB. Carried from Sprint 4.

**Solution:**
- Manually test full flow in Vercel preview:
  1. Create new Clerk account
  2. Complete onboarding (all 4 steps)
  3. Generate a GBP post from dashboard
  4. Verify business + post saved in Supabase
- Fix any broken connections between Clerk auth, Supabase, and API routes
- Document what works and what doesn't

**Verification:**
- Screenshot of completed onboarding
- Screenshot of generated post in dashboard
- Supabase query showing business + post records
- List of bugs found and fixed

**Measurable Outcome:** Full flow works end-to-end with 0 errors

---

## Priority Order

1. **S25-01: Fix Checkout** — revenue blocker, must work before anything else
2. **S25-06: E2E Flow Test** — trust in the core flow
3. **S25-04: GSC Scanner Checks** — quick win, enhances product value
4. **S25-05: Blog Cron** — content flywheel
5. **S25-02: Customer GSC OAuth** — the big ROI feature
6. **S25-03: GSC Dashboard Card** — depends on S25-02
