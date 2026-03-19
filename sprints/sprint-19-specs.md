# Sprint 19 Specs — Analytics + Onboarding Polish

## S19-01: PostHog Analytics (Size S)

**Problem:** Zero product analytics. No idea which pages get traffic, which features get used, or where users drop off. Every product decision is a guess.

**Solution:** Install PostHog (free tier, 1M events/mo). Add `<PostHogProvider>` to layout. Auto-capture page views + clicks. Add explicit events for: scan completed, email submitted, upgrade clicked, onboarding step reached, tool used (schema/llms-txt/faq/blog).

**Where:** `app/app/layout.tsx`, new `app/lib/posthog.ts`

**Verification:** Visit localbeacon.ai, check PostHog dashboard shows page view event within 60s.

**Measurable Outcome:** Within 7 days we can answer "how many people scan, how many submit email, how many sign up."

---

## S19-02: /check → Onboarding Data Continuity (Size S)

**Problem:** User scans a URL on /check, enters their email, sees results — then clicks "Sign Up" and has to re-enter everything from scratch in onboarding. The scan data is lost.

**Solution:** After scan + email capture on /check, store URL + score + business name (if detected) + email in URL params or sessionStorage. Onboarding page reads these and pre-fills Step 1 fields. User sees their data carried forward.

**Where:** `app/app/check/checker-form.tsx`, `app/app/onboarding/page.tsx`

**Verification:** Scan a URL on /check → enter email → click sign up CTA → onboarding shows pre-filled business URL and name.

**Measurable Outcome:** Onboarding Step 1 abandonment drops (measurable once PostHog is live).

---

## S19-03: Mobile Navigation (Size S)

**Problem:** Dashboard sidebar is desktop-only. Mobile users see no navigation at all — they're stuck on whatever page they landed on.

**Solution:** Add hamburger menu icon (top-left on mobile). Opens sidebar as a slide-over sheet. Uses shadcn Sheet component. Closes on navigation.

**Where:** `app/components/dashboard/sidebar.tsx`, `app/app/dashboard/layout.tsx`

**Verification:** Open dashboard on mobile viewport (375px). Hamburger visible. Tap → sidebar slides in. Tap a link → navigates + closes.

**Measurable Outcome:** Dashboard is fully navigable on mobile.

---

## S19-04: DFY Checkout Confirmation (Size S)

**Problem:** One click on "Get DFY Setup — $499" goes straight to Stripe checkout with no confirmation. Accidental clicks = $499 charge + refund hassle.

**Solution:** Add confirmation dialog before Stripe redirect. Shows: "You're about to purchase DFY Setup for $499 (one-time). This includes: [bullet list of what's included]. Continue to checkout?" with Cancel and "Yes, continue" buttons.

**Where:** `app/app/pricing/page.tsx`

**Verification:** Click DFY button → dialog appears → Cancel returns to pricing → Confirm goes to Stripe.

**Measurable Outcome:** Zero accidental DFY purchases.

---

## S19-05: Phone Number on Pricing + DFY (Size S)

**Problem:** Bob (plumber persona) said "No phone number? That's a red flag." DFY buyers spending $499 want to talk to a human first. No phone number anywhere on the site.

**Solution:** Add David's business phone or a Google Voice number to: pricing page (near DFY card), footer, and DFY upsell cards. Format: "Questions? Call us: (XXX) XXX-XXXX" or "Book a call" link.

**Where:** `app/app/pricing/page.tsx`, `app/components/site-footer.tsx`, `app/components/dfy-upsell-card.tsx`

**Verification:** Phone number visible on pricing page near DFY tier. Clickable tel: link on mobile.

**Measurable Outcome:** DFY inquiries have a voice channel. Trust signal for premium buyers.

**⚠️ BLOCKER:** Need David to confirm which phone number to use. Personal cell? Google Voice? New number?
