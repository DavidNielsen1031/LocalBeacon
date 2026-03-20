# Sprint 23 — Conversion Optimization

**Source:** Conversion Architect persona audit (2026-03-20)
**Goal:** Fix the top 5 conversion killers identified in the funnel audit
**Persona file:** `personas/conversion-architect.yaml`

---

## S23-01: Pre-fill onboarding from /check scan data (Size L)

**Problem:** User enters URL + email on /check → signs up → onboarding starts completely blank. They already gave us their website and email, and we threw both away. Feels like starting over = drop-off.

**Solution:**
1. After scan, pass URL + email + detected business info via query params or localStorage to /sign-up
2. On /onboarding Step 1, auto-fill: website URL, email, and attempt to extract business name + city from the scanned page (parse `<title>`, schema.org, meta tags)
3. If business info is detected, pre-fill and let user confirm/edit rather than type from scratch

**Where:** `app/check/checker-form.tsx`, `app/onboarding/page.tsx`, `app/api/ai-readiness/route.ts` (add business info extraction)

**Verification:** Run a scan on /check → enter email → click sign-up CTA → onboarding Step 1 has website, email, and detected business name pre-filled.

**Measurable Outcome:** Onboarding Step 1 fields pre-filled for users coming from /check. Zero blank-slate starts for scan→signup flow.

---

## S23-02: Remove plan selection from onboarding (Size M)

**Problem:** Showing pricing mid-onboarding (Step 3) creates a "do I want to pay?" decision that kills momentum. Users arrived expecting free value. The plan step is the #1 drop-off risk in the entire funnel.

**Solution:**
1. Remove Step 3 (Choose Plan) from onboarding entirely
2. All new users start on Free automatically
3. Reduce onboarding from 5 steps to 4: Business Info → Service Areas → First Post → What's Next
4. Add upgrade prompts inside the dashboard after users have seen value (e.g., after generating 3 posts, hitting Free limits)
5. Update step numbering and progress indicators

**Where:** `app/onboarding/page.tsx`, dashboard upgrade prompts (new component)

**Verification:** Complete onboarding flow — no plan selection step appears. User lands in dashboard on Free plan. Upgrade CTA visible in dashboard after using tools.

**Measurable Outcome:** Onboarding steps reduced from 5 to 4. No pricing decision during first-time setup.

---

## S23-03: Route all CTAs through /check, not /sign-up (Size S)

**Problem:** Homepage has competing CTAs — "Get Started Free" goes to /sign-up (cold, no context) while "Free AI Check" goes to /check (warm, value-first). Users who hit /sign-up directly skip the scan and have zero motivation to complete onboarding.

**Solution:**
1. Change ALL "Get Started Free" buttons on homepage to point to /check instead of /sign-up
2. Change nav "Get Started" button to /check
3. On /check results page, make the sign-up CTA more compelling: "Your score is {score}. We can get you to 80+ in 30 days. → Start fixing these"
4. Remove or hide direct /sign-up links from public-facing pages (keep the route for Clerk, just don't link to it)

**Where:** `components/landing-content.tsx`, `components/site-nav.tsx`, `app/check/checker-form.tsx`

**Verification:** Click every CTA on homepage — all go to /check. No public link goes directly to /sign-up.

**Measurable Outcome:** 100% of homepage CTAs route through /check first.

---

## S23-04: Streamline onboarding Step 1 — fewer fields, better copy (Size M)

**Problem:** Step 1 has 6 fields (too many), generic headline ("Tell us about your business"), state is free-text instead of dropdown, no escape hatch (logo doesn't link home), and optional fields look required.

**Solution:**
1. Reduce to 4 required fields: Business Name, Business Type (dropdown), City + State (state as dropdown), Website
2. Move Phone to dashboard settings (it's optional and adds friction)
3. Change headline to "2 minutes to your first AI-optimized Google post"
4. State field → dropdown of US states
5. Make logo clickable → links to homepage
6. Clearly mark optional fields with "(optional)" label
7. Add progress text: "Step 1 of 4" with motivational subtext

**Where:** `app/onboarding/page.tsx`

**Verification:** Onboarding Step 1 shows 4 fields. State is a dropdown. Logo links home. Headline matches new copy.

**Measurable Outcome:** Form fields reduced from 6 to 4. State input is structured (dropdown).

---

## S23-05: Fix email gate — make email the real deliverable (Size M)

**Problem:** The full report shows everything on-page immediately after scan. The email becomes optional fluff — users get all the value without checking their inbox, so the email capture has no teeth.

**Solution:**
1. Show teaser on-page: overall score + top 3 issues only (not all 22 checks)
2. Full detailed breakdown with fix instructions → email only
3. Update email CTA copy: "Where should we send your full report?" (not just "Your email address")
4. Add microcopy: "We'll email the complete breakdown with fix instructions. No spam."
5. After email submit, show confirmation: "Check your inbox — your full report is on the way"

**Where:** `app/check/checker-form.tsx`, `app/api/ai-readiness/route.ts`, email template in `lib/email.ts`

**Verification:** Run scan without email → see score + top 3 only. Enter email → see confirmation. Check inbox → full report with all checks and fix instructions.

**Measurable Outcome:** On-page report limited to teaser. Full report exclusive to email recipients.

---

## S23-06: Quick fixes — bugs and polish (Size S)

**Problem:** Several small issues identified in the audit that erode trust and polish.

**Fixes:**
1. **City truncation bug** — "Burns" instead of "Burnsville" in generated posts. Find and fix the truncation.
2. **"CTA: CALL" label** — Remove or humanize to "Suggested action: Call Now" in generated posts
3. **Auto-add primary city** as first service area chip in Step 2
4. **"What's Next" step** — Make AI Readiness scan the primary CTA (big orange button), other actions secondary
5. **Sync plan copy** between onboarding and /pricing page (if plan step is kept as fallback)

**Where:** Post generation logic, `app/onboarding/page.tsx`

**Verification:** Generate a post for "Burnsville" — full city name appears. No "CTA: CALL" in output. Service areas pre-populated with primary city.

**Measurable Outcome:** Zero cosmetic bugs in onboarding flow.

---

## Sprint Priority Order

1. **S23-03** (S) — Route CTAs through /check. Quick win, high impact, <1 hour.
2. **S23-06** (S) — Bug fixes. Quick wins, trust builders.
3. **S23-02** (M) — Remove plan step. Biggest drop-off killer.
4. **S23-04** (M) — Streamline Step 1. Reduce friction.
5. **S23-05** (M) — Email gate fix. Better lead capture.
6. **S23-01** (L) — Pre-fill from scan. Highest effort but highest conversion lift.

---

## A/B Test Ideas (for when traffic supports it)

- /check CTA: "Get Your Free Report" vs "See Your Score"
- Onboarding with vs without plan selection step
- Email gate: "Get Report" vs "Email me the full breakdown"
- Step 1 headline: current vs "2 minutes to your first Google post"
- Service areas: skip button for single-location vs always show
