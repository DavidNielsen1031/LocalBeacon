# Sprint 11 Specs — Agency Layer + Conversion

## S11-01: Landing Page Conversion Overhaul (L)

### Problem
The landing page has 6 conversion gaps identified in the March 6 audit: no mention of our free AI Readiness Checker (/check), zero social proof, "AI" in the founder quote (violates white glove rule), no agency-specific section, AEO moat buried in one feature card, and a thin footer missing blog/tools links.

### Solution
Add 4 new sections and update 3 existing elements on the landing page:
1. **Free Checker CTA section** between feature cards and comparison — "Check Your AI Score — Free" linking to /check. No signup required messaging.
2. **AEO explainer section** — dedicated section explaining WHY AI visibility matters. "Google isn't the only search engine anymore. ChatGPT, Perplexity, and Google AI answer questions directly. Is your business in those answers?" Use before/after framing.
3. **Agency section** — "Managing multiple clients?" section speaking to Alex/Taylor persona. Highlight multi-client dashboard, white-label reports, single pane of glass.
4. **Trust signals** — "Built on Google Business Profile" badge near footer.
5. **Fix founder quote** — remove "AI" language. Change to "...while we handle the content that gets them found."
6. **Expand footer** — add links: Blog (/blog), Free AI Check (/check), Contact (hello@localbeacon.ai), Privacy, Terms.
7. **Top nav** — add "Free AI Check" link pointing to /check.
8. **Social proof placeholder** — Replace "Be our first success story" with "Join businesses improving their local visibility" (honest, no fake testimonials).

### Verification
1. `cd products/localbeacon/app && npm run build` — 0 errors
2. Visual check: all 4 new sections render correctly on desktop and mobile
3. Bob test: zero jargon, zero "AI" in customer-facing copy (except AEO explainer which explains the concept)
4. All links work: /check, /blog, /pricing, mailto:hello@localbeacon.ai
5. Before/after screenshots captured

### Measurable Outcome
Landing page addresses all 6 gaps from the March 6 audit. A visiting agency sees a dedicated section speaking to their use case. A visiting plumber discovers the free checker tool.

---

## S11-02: Multi-Client Dashboard (XL)

### Problem
Agency users paying $99/mo can only manage one business. The Agency plan's core value proposition — managing multiple clients from one dashboard — doesn't exist. This is the #1 feature gap for the Agency tier.

### Solution
1. **Schema change:** Update `businesses` table to support multiple businesses per user. Current schema already has `user_id` on `businesses` — just need to remove 1:1 assumption in queries. Add `is_active` boolean for client switching.
2. **Client switcher:** Add a dropdown/selector in the sidebar above navigation items. Shows business name + city. "Add Client" button at bottom (Agency only, or if under plan limit).
3. **Dashboard context:** All existing dashboard pages read the active `business_id` from a React context provider. All Supabase queries filter by active business_id. No changes needed to individual page components if context is wired correctly.
4. **Plan limits:** Free = 1 business, Solo = 3 businesses, Agency = unlimited. Enforce on "Add Client" action. Show upgrade prompt when limit reached.
5. **Business context provider:** New `components/business-context.tsx` — wraps dashboard layout. Provides `activeBusiness`, `businesses[]`, `switchBusiness(id)`, `canAddBusiness`.
6. **Supabase queries:** Update all dashboard API routes to accept `business_id` parameter (currently some hardcode the first business found for a user).

### Verification
1. `cd products/localbeacon/app && npm run build` — 0 errors
2. Create a test user with 3 businesses → verify switching works
3. Verify all dashboard pages (posts, queue, AI readiness, competitors, etc.) show data for the ACTIVE business only
4. Verify plan limits: Free user blocked at 1, Solo at 3, Agency unlimited
5. Verify existing single-business users see no UX change (their one business is auto-selected)

### Measurable Outcome
An agency user can add 5 client businesses and switch between them. Each client's dashboard is fully isolated. Plan limits are enforced.

---

## S11-03: Client Onboarding Wizard (M)

### Problem
When an agency user clicks "Add Client," there's no structured flow to collect the required business information. The current settings page is designed for a single business, not for adding new clients quickly.

### Solution
1. **"Add Client" button** in sidebar (visible when plan allows more businesses).
2. **3-step wizard dialog:**
   - Step 1: Business name + category (dropdown: Plumber, HVAC, Dentist, Roofer, Lawyer, Landscaper, Other)
   - Step 2: Address, city, state, zip + service areas (comma-separated cities)
   - Step 3: Website URL + Google listing URL (optional) + phone
3. **Save to Supabase** `businesses` table with the current user's `user_id`.
4. **Auto-switch** to the new client's dashboard after creation.
5. **Pre-populate specialties** based on category selection (e.g., Plumber → "drain cleaning, water heater, leak repair, sewer line").
6. **Component:** `components/add-client-wizard.tsx` — dialog with 3 steps, progress indicator, back/next/finish buttons.

### Verification
1. `cd products/localbeacon/app && npm run build` — 0 errors
2. Complete the wizard → verify business appears in Supabase `businesses` table
3. After wizard completes → dashboard shows the new client's (empty) dashboard
4. Verify client appears in the sidebar client switcher
5. Verify plan limit check: wizard blocked if at limit, shows upgrade prompt

### Measurable Outcome
An agency user can add a new client in under 60 seconds via a guided wizard. The new client appears in the switcher and has an empty dashboard ready for content generation.

---

## S11-04: White-Label PDF Reports (M)

### Problem
Agencies need to show clients what's been done for them. Currently there's no exportable report. Agencies managing clients need branded deliverables they can present in client meetings or send monthly.

### Solution
1. **"Download Report" button** on each client's dashboard overview page.
2. **Report content:** Business name, reporting period, content summary (posts/pages/reviews generated), AEO score + trend, content freshness status, top 3 AEO recommendations, generated date.
3. **White-label:** Agency plan users can upload a logo in Settings → logo appears on the PDF header. If no logo uploaded, LocalBeacon logo is used.
4. **PDF generation:** Use `@react-pdf/renderer` (server-side) or `jspdf` to generate PDFs. Render on the server via API route `app/api/reports/pdf/route.ts`.
5. **Logo upload:** Add logo upload field to Settings page (Agency plan only). Store in Supabase Storage or as base64 in the `users` table.
6. **Data sources:** Pull from existing `content_items`, `aeo_scans`, and `freshness` data. No new data collection needed.

### Verification
1. `cd products/localbeacon/app && npm run build` — 0 errors
2. Click "Download Report" → PDF downloads with correct business data
3. Upload a custom logo → PDF shows custom logo in header
4. Report contains: content count, AEO score, freshness, recommendations
5. PDF renders correctly (no broken layouts, readable fonts)

### Measurable Outcome
An agency user can download a branded PDF report for any client. The report contains real data from the dashboard. Custom logo appears when uploaded.

---

## S11-05: Pricing & Nav Update (S)

### Problem
The pricing page still says "coming soon" for multi-client and white-label features. After S11-02 through S11-04 ship, the pricing page needs to reflect reality (honesty principle). The nav also needs the /check link added in S11-01.

### Solution
1. **Agency tier updates:** Replace "coming soon" with actual feature descriptions — "Multi-client dashboard", "White-label PDF reports", "Unlimited business locations", "Client onboarding wizard".
2. **Solo tier:** Add "Up to 3 business locations" to feature list.
3. **Free tier:** Add "1 business location" to feature list.
4. **Nav consistency:** Ensure "Free AI Check" nav link from S11-01 appears on pricing page header too.
5. **FAQ update:** Update "What if I manage multiple clients?" answer to describe the actual feature instead of "coming soon."

### Verification
1. `cd products/localbeacon/app && npm run build` — 0 errors
2. All 3 pricing tiers accurately describe what exists in the product
3. Zero "coming soon" language for features that now exist
4. FAQ answer matches current reality
5. Nav link to /check works from pricing page

### Measurable Outcome
A visitor to the pricing page sees accurate feature lists. Zero false claims. Agency tier has clear differentiation justifying the $99/mo price.
