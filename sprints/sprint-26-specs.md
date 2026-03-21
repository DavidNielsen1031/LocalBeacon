# Sprint 26 Specs — Funnel Redesign + Rebrand

## S26-01: Rename + Rebrand Copy (Size S)

**Problem:** "Solo" plan name is meaningless to customers. "AI-generated" messaging makes Bob distrust the content and Taylor worry about quality. Persona testing confirmed both issues unanimously.

**Solution:**
- Rename "Solo" → "Local Autopilot" in plans.ts, landing-content.tsx, pricing page, onboarding, dashboard, emails, blog CTAs
- Rewrite all "AI-generated/powered" copy to outcome-led language:
  - "AI-generated Google posts" → "Weekly Google posts, handled for you"
  - "AI-powered review responses" → "Review responses, drafted automatically"
  - "AI-powered city pages" → "City pages for every area you serve"
- Keep "AI Readiness Score" as-is (it's a named product feature)
- Update plan CTA: "Start Solo" → "Start Local Autopilot"

**Verification:** `grep -ri "solo\|ai-generated\|ai-powered" app/ components/ lib/` returns 0 hits (except "AI Readiness"). Build passes.

**Measurable Outcome:** All user-facing copy uses outcome-led language. Zero instances of "Solo" plan name or "AI-generated" feature descriptions.

---

## S26-02: Personalized Results Page (Size L)

**Problem:** After scanning, users see a generic score + top 3 issues, then hit an email gate, then get dumped to sign-up with no connection between their scan results and the plans. The plan comparison on the landing/pricing page is static and doesn't relate to the user's specific issues.

**Solution:**
- After scan + email capture → render full results page at /check (same page, expanded view):
  - Score badge + 3 headline issues (exists today)
  - Full checklist: every check with pass/fail, plain-English explanation, and fix description
  - Plan comparison section at bottom, personalized to their results:
    - 3 plan cards (Free / Local Autopilot / DFY Setup)
    - Each shows: plan name, price, "Fixes X of your Y issues", top 3 specific fixes from THEIR scan
    - CTA buttons: Free → /sign-up, Local Autopilot → Stripe checkout, DFY → confirmation dialog → Stripe
- Plan cards dynamically generated from scan results + plan feature mapping

**Verification:** 
1. Scan localbeacon.ai → see full results + plan cards with accurate fix counts
2. Scan a site that fails many checks → plan cards show different fix counts
3. Build passes with 0 errors

**Measurable Outcome:** Results page shows personalized plan comparison. Each plan card displays correct count of issues it would fix based on the user's actual scan data.

---

## S26-03: Checkout Before Onboarding (Size M)

**Problem:** Currently paid users must complete 4-5 onboarding steps BEFORE paying. Post-payment onboarding completion is 85-95% vs 30-50% pre-payment. Users also enter their website twice (scan + onboarding).

**Solution:**
- Paid plan CTA on results page → Stripe checkout (no sign-up wall first)
- Stripe checkout success → redirect to /onboarding with plan confirmed via query param + webhook
- Business profile pre-filled from scan data stored in localStorage (website URL, business name, city)
- Remove freebie post step for paid users (they expect real value, not a demo)
- Remove "What's Next" step entirely
- Paid onboarding: Business Info (pre-filled) → Service Areas → Dashboard (3 steps)
- Free onboarding: Business Info → Service Areas → First Post → Dashboard (4 steps)

**Verification:**
1. Click "Start Local Autopilot" on results page → Stripe checkout opens
2. Complete payment → redirected to /onboarding with fields pre-filled from scan
3. No "What's Next" page exists
4. Free flow still includes first post step
5. Build passes

**Measurable Outcome:** Paid users reach Stripe checkout in 3 clicks from homepage (scan → select plan → pay). Onboarding fields pre-filled from scan data.

---

## S26-04: Stripe Webhook (Size M)

**Problem:** After Stripe payment, plan status isn't synced to Supabase. No way to know a user is paid without checking Stripe directly. Cancellations aren't handled.

**Solution:**
- POST /api/webhooks/stripe route
- Handle events: checkout.session.completed → set plan in Supabase, customer.subscription.deleted → downgrade to Free
- Verify Stripe webhook signature (STRIPE_WEBHOOK_SECRET env var)
- Set webhook URL in Stripe dashboard: https://localbeacon.ai/api/webhooks/stripe

**Verification:**
1. Stripe CLI: `stripe trigger checkout.session.completed` → Supabase user record shows plan = "local_autopilot"
2. Webhook signature verification rejects invalid signatures
3. Build passes

**Measurable Outcome:** Plan status in Supabase matches Stripe subscription status within 30 seconds of payment.

---

## S26-05: Simplify /pricing (Size S)

**Problem:** /pricing page currently has its own checkout flow that bypasses the scan. This creates a second conversion path that skips the value demonstration.

**Solution:**
- Keep /pricing as a standalone page (SEO: people Google "localbeacon pricing")
- All CTA buttons on /pricing → /check (not direct checkout)
- Add messaging: "Start with a free scan to see exactly what we'll fix for you"
- /pricing becomes informational + educational, not transactional
- Update plan names and copy to match S26-01 rebrand

**Verification:** Click every button on /pricing → all route to /check. No direct checkout from /pricing. Build passes.

**Measurable Outcome:** /pricing has zero direct checkout triggers. All paths route through /check.

---

## S26-06: Kill Dead Steps (Size S)

**Problem:** Onboarding has 2 unnecessary steps: plan selection (user already chose on results page) and "What's Next" (upsell to someone who already picked a plan).

**Solution:**
- Remove plan selection step from onboarding flow
- Remove "What's Next" step
- Remove phone field (already done in S23, verify)
- Adjust step counter and progress bar
- Paid flow: Business Info → Service Areas → Dashboard
- Free flow: Business Info → Service Areas → First Post → Dashboard

**Verification:** Walk through both flows. No plan selection step. No "What's Next" step. Progress bar shows correct step count. Build passes.

**Measurable Outcome:** Onboarding is 3 steps for paid users, 4 for free. Zero redundant steps.
