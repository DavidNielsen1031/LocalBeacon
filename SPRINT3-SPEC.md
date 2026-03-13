# LocalBeacon.ai — Sprint 3 Spec: UX Redesign Through Persona Lenses

## Context & Intent

Sprint 2 shipped working features (GBP post generator, service area pages, review response drafter) but the UX was built without personas. User testing revealed:
- Onboarding uses manual forms instead of Google OAuth auto-population
- "Copy to clipboard" feels like a ChatGPT wrapper, not a product
- Pricing page doesn't educate or excite
- Dashboard is empty on first visit — no immediate value
- UI copy uses jargon ("GBP", "service areas") that our tech-averse persona (Bob) won't understand

**Sprint 3 Goal:** Redesign the entire user journey so all 3 personas (Agency Alex, Tech-Savvy Taylor, Tech-Averse Bob) feel value within 60 seconds of signing up.

## Personas (Reference: products/localbeacon/research/personas.md)

- **Alex (Agency):** Manages 10-30 clients. Needs multi-client, bulk import, white-label. Says "GBP", "citations", "local pack."
- **Taylor (Tech-Savvy SMB):** Single location, does own marketing. Needs set-and-forget automation. Says "Google Business Profile", "rankings."  
- **Bob (Tech-Averse Plumber):** Just wants more calls. Needs giant buttons, zero jargon. Says "Google listing", "more calls", "reviews."

## What We're Building

### 1. Google OAuth Onboarding (replaces manual form)

**User story:** As any persona, I sign up and connect my Google account. LocalBeacon auto-detects my Google Business Profile(s) and pre-fills my business name, category, address, phone, hours, and service areas. I confirm and I'm done.

**Flow:**
1. Landing page → "Connect Your Google Listing" (big yellow button)
2. Google OAuth consent screen (requesting GBP read access)
3. LocalBeacon pulls their GBP data via API
4. Show pre-filled profile: "Is this your business?" with business name, category, city, phone
5. User confirms → first 4 posts auto-generated → dashboard with content ready

**Fallback:** If no GBP found (or user declines OAuth), show simplified manual form (current flow, but streamlined to 1 step instead of 4).

**For Alex (agency):** After connecting, show "Add another client" button. Allow connecting multiple Google accounts.

**Acceptance Criteria:**
- [ ] Google OAuth flow works end-to-end (consent → GBP data pull → profile creation)
- [ ] Business name, category, city, phone, service areas auto-populated from GBP
- [ ] User sees pre-filled profile and confirms with 1 click
- [ ] If no GBP found, falls back to streamlined manual form (1 page, not 4 steps)
- [ ] After confirmation, 4 weekly posts are auto-generated immediately
- [ ] User lands on dashboard with posts visible within 60 seconds of signup

### 2. Landing Page Redesign (outcome-led, not feature-led)

**User story:** As Bob, I land on localbeacon.ai and immediately understand what this does for me in plain English — more calls, less work.

**Structure:**
- Hero: "Your phone rings more. We handle everything." + "Connect Your Google Listing" button
- Social proof bar: "Trusted by X local businesses" (placeholder for now)
- 5 outcome cards (not features):
  1. "More calls from Google Maps" — we post weekly so you stay visible
  2. "More calls from local searches" — we create pages for every area you serve  
  3. "Found by AI assistants" — when people ask Siri or ChatGPT, you show up
  4. "Reviews work harder" — we reply to every review so customers trust you
  5. "See what's working" — monthly report proves your ROI
- Before/After section: "Without LocalBeacon" (manual posting, missed reviews, invisible) vs "With LocalBeacon" (automated, responsive, ranking)
- Pricing section (redesigned — see below)
- FAQ section with plain-language answers
- Footer CTA: "Connect Your Google Listing — Free"

**Language rules:**
- Never say "GBP" — say "Google listing" or "Google Business Profile" (spelled out)
- Never say "service area pages" — say "local pages" or "city pages"
- Never say "AEO" or "answer engine optimization" — say "found by AI assistants"
- Never say "schema markup" — invisible, just happens
- CTA is always "Connect Your Google Listing" not "Get Started"

**Acceptance Criteria:**
- [ ] Hero section with outcome-focused headline + single CTA button
- [ ] 5 outcome cards with icons, plain language, 1-sentence explanations
- [ ] Before/After visual comparison section
- [ ] Redesigned pricing section (see spec below)
- [ ] FAQ section (5+ questions in Bob's language)
- [ ] Zero jargon — passes the "would Bob understand every word?" test
- [ ] Mobile responsive, dark theme, yellow (#FFD700) accents

### 3. Pricing Page Redesign (educate + excite)

**User story:** As Taylor, I'm comparing LocalBeacon to BrightLocal ($39/mo) and want to understand exactly what I get and why it's worth it.

**Design:**
- 3 columns: Free / Solo $29/mo / Agency $79/mo
- Each plan shows OUTCOMES not features:
  - Free: "Try it out — 5 Google posts/month, 3 city pages"
  - Solo: "Hands-free local marketing — unlimited posts, 10 city pages, review replies, monthly report"
  - Agency: "Run your clients' local marketing — unlimited everything, multi-client dashboard, white-label reports"
- Comparison row: "vs. hiring an agency: $800-1,500/mo" and "vs. BrightLocal: $39-59/mo with fewer features"
- FAQ below pricing: "What if I don't have a Google listing?", "Can I cancel anytime?", "Will this work for my [industry]?"

**Acceptance Criteria:**
- [ ] 3-column pricing with outcome-focused descriptions
- [ ] Competitive comparison callout (vs. agency cost, vs. BrightLocal)
- [ ] FAQ section below pricing
- [ ] Solo plan visually highlighted as recommended
- [ ] "Start Free" doesn't require credit card
- [ ] Solo/Agency go to Stripe Checkout

### 4. Dashboard Redesign (never empty)

**User story:** As Bob, I log in for the first time and immediately see that LocalBeacon is working for me — posts scheduled, things happening.

**Design:**
- Top banner: "Welcome, [name]! Here's what LocalBeacon is doing for [Business Name] this week."
- Activity feed (never empty — show generated content even if not published yet):
  - "✅ 4 Google posts generated for this week"
  - "📄 City page ready for [city]"  
  - "⭐ 2 reviews waiting for your response"
- Stats cards with real numbers OR helpful prompts (never "0" with no context)
- Quick actions: "Review this week's posts" / "Add a city page" / "Respond to reviews"

**For Alex (agency):** Show client switcher dropdown at top. Each client has their own activity feed.

**Acceptance Criteria:**
- [ ] Dashboard is never blank — always shows activity or next steps
- [ ] Activity feed shows auto-generated content immediately after onboarding
- [ ] Stats cards show numbers with context (not just "0")
- [ ] Business name displayed prominently
- [ ] Quick actions lead directly to useful pages
- [ ] Mobile responsive

### 5. Auto-Post Pipeline (kills the "ChatGPT wrapper" perception)

**User story:** As Taylor, posts are auto-generated and scheduled weekly. I can review them if I want, but they go out automatically if I don't. I never have to copy-paste anything.

**Design:**
- After onboarding, 4 posts auto-generated for the week
- Posts enter a queue: Draft → Scheduled → Published
- Default: auto-publish after 24h review window (user can change to manual-approve)
- **MVP (pre-GBP API approval):** Posts go to "Ready to Post" status with prominent "Copy & Post to Google" button + link directly to their GBP posting page. NOT buried — make the manual step as frictionless as possible.
- **Post-GBP API:** Toggle to full auto-post. One click to enable.
- Email notification: "Your weekly Google posts are ready to review" (links to dashboard)

**Acceptance Criteria:**
- [ ] 4 posts auto-generated weekly per business
- [ ] Queue view: Draft → Scheduled → Published pipeline
- [ ] Auto-publish toggle (default ON with 24h review window)
- [ ] MVP mode: "Copy & Post" with direct link to Google posting interface
- [ ] Weekly email digest of upcoming posts
- [ ] User can edit any post before it goes out

## Constraints & What NOT To Do

- Do NOT add new features (no blog posts, no competitor alerts yet). Sprint 3 is UX only.
- Do NOT change the API routes — they work. Only change the frontend.
- Do NOT use jargon anywhere in the UI. Every label must pass the Bob test.
- Do NOT show empty states with just "0" — always show context or next steps.
- Do NOT require manual data entry if Google OAuth can provide the data.
- Do NOT build full multi-client management yet — just add a client switcher dropdown for agencies.

## Success Criteria

1. **Bob test:** A non-technical person can go from localbeacon.ai → signed up → seeing 4 generated posts in under 2 minutes
2. **Alex test:** An agency owner can connect 3 client GBPs and see content generated for each within 5 minutes
3. **Taylor test:** A tech-savvy SMB owner can evaluate the product's value in under 60 seconds from the landing page
4. **Zero jargon:** No instance of "GBP" (abbreviated), "AEO", "schema", "NAP", or "citations" in any user-facing text
5. **Build passes:** `npm run build` clean, deployed to localbeacon.ai

## Verification Steps

- [ ] Screen recording: new user signup → Google OAuth → dashboard with posts in <2 min
- [ ] Landing page reviewed by someone unfamiliar with SEO — do they understand what the product does?
- [ ] Pricing page compared side-by-side with BrightLocal and Localo — is our value prop clear?
- [ ] Dashboard screenshot after first login — is it blank? If yes, fail.
- [ ] Mobile test on iPhone: full flow works, nothing broken

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
