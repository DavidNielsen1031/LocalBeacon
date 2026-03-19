# Sprint 18 — Pricing Restructure + Tier Gating + Conversion

**Product:** LocalBeacon.ai
**Theme:** Make Free users feel the wall. Make upgrading irresistible.
**Co-planned with David:** 2026-03-18

---

## Pricing Restructure

### New pricing model:
- **Free** — $0 forever. Taste everything, own nothing.
- **Solo** — $49/mo. Full access, you implement.
- **DFY Setup** — $499 one-time. We install everything for you.
- **Managed** — $99/mo (post-DFY). Ongoing content + monthly re-scans + blog posts.

### What changes:
- DFY becomes a ONE-TIME setup fee, not recurring
- New "Managed" tier at $99/mo for ongoing content
- Stripe products need updating (new price for DFY one-time, new Managed subscription)
- Pricing page, onboarding plan selector, checkout API all need updates

---

## S18-01: Stripe Price Restructure (Size M)

### Where
- `lib/stripe.ts` — plan config + price IDs
- `app/api/checkout/route.ts` — checkout session creation
- Stripe dashboard — create new prices

### What to do
- Create Stripe price: DFY Setup $499 one-time (`mode: 'payment'` not `'subscription'`)
- Create Stripe price: Managed $99/mo subscription
- Update PLANS config in lib/stripe.ts
- Update checkout route to handle one-time vs subscription mode
- Add Vercel env vars for new price IDs

---

## S18-02: Update Pricing Page + Onboarding (Size M)

### Where
- `app/pricing/page.tsx`
- `app/onboarding/page.tsx`
- `components/landing-content.tsx` (homepage pricing section)

### New 4-tier layout:
- **Free** $0 — 5 post drafts/mo, 3 city pages, 1 scan/mo, preview-only generators
- **Solo** $49/mo — Unlimited everything, full code output, 5 competitors, monthly reports
- **DFY Setup** $499 one-time — Everything installed: schema, llms.txt, FAQs, platform guides, onboarding call
- **Managed** $99/mo — Ongoing: weekly blog posts, GBP drafts, review replies, monthly re-scans, score tracking

### Notes
- DFY card should say "One-time setup" not "/month"
- Managed card should say "After DFY setup" or "Ongoing support"
- Homepage can show 3 (Free/Solo/Managed) or all 4
- Onboarding plan selector needs all options

---

## S18-03: Reusable Upgrade Gate Component (Size S)

### Where
- Create `components/upgrade-gate.tsx`

### Component:
```tsx
interface UpgradeGateProps {
  feature: string           // "AI Discovery File generator"
  currentPlan: string       // "free"
  requiredPlan: string      // "solo"
  children: React.ReactNode // The gated content
  previewMode?: 'blur' | 'limit' | 'lock'  // How to show the gate
  usageCount?: number       // Current usage
  usageLimit?: number       // Max for this plan
}
```

### Behavior:
- `blur`: Shows content but blurred with overlay "Upgrade to Solo to access"
- `limit`: Shows usage counter "3 of 5 used" + upgrade CTA when at limit
- `lock`: Shows locked state with feature description + upgrade button
- Upgrade button links to /pricing
- All gates show what the user WOULD get (never completely hide value)

---

## S18-04: Gate All Dashboard Pages (Size L)

Apply tier gating to every ungated page. Plan data comes from business context or Clerk metadata.

### Per-page gating:

**AI Readiness (`ai-readiness`):**
- Free: 1 scan/month (limit mode), show counter
- Solo: Unlimited
- CTA: "Upgrade to Solo for unlimited scans — $49/mo"

**FAQ Builder (`faq`):**
- Free: 1 generation/month (limit mode)
- Solo: Unlimited  
- CTA: "Upgrade to Solo for unlimited FAQ generation"

**AI Discovery File / llms.txt (`llms-txt`):**
- Free: Preview only (blur mode) — show generated content but can't copy
- Solo: Full access + copy button
- CTA: "Upgrade to Solo to generate and copy your AI Discovery File"

**Schema Markup (`schema`):**
- Free: Preview only (blur mode) — show JSON-LD but can't copy
- Solo: Full access + copy button + Google preview
- CTA: "Upgrade to Solo to copy your schema markup"

**Reviews (`reviews`):**
- Free: 3 AI responses/month (limit mode)
- Solo: Unlimited
- CTA: "Upgrade to Solo for unlimited AI review responses"

**Competitors (`competitors`):**
- Free: 1 competitor (limit mode)
- Solo: 5 competitors
- CTA: "Track more competitors — upgrade to Solo"

**Monthly Report (`reports`):**
- Free: Locked (lock mode) — "Monthly progress reports available on Solo"
- Solo: Full access
- CTA: "Upgrade to Solo for monthly progress reports — $49/mo"

**Overview (`dashboard` main):**
- Free: Show a persistent but dismissible upgrade banner at top
- "You're on the Free plan. Upgrade to Solo for unlimited access — $49/mo"

**GBP Posts (`posts`):**
- Free: 5 posts/month (limit mode), show "3 of 5 remaining"
- Solo: Unlimited

**Listing Health / Audit (`audit`):**
- Free: Shows score only
- Solo: Shows score + detailed fix recommendations
- CTA: "Upgrade to see how to fix each issue"

### Plan detection
- Read plan from Supabase `users` table (linked via Clerk user ID)
- If no plan found, default to "free"
- Create a `usePlan()` hook or extend business context with plan info

---

## S18-05: Usage Tracking (Size M)

### Where
- Supabase `usage` table or add columns to `users` table

### Track per user per month:
- `scans_used` (AI Readiness)
- `faq_generations_used`
- `review_responses_used`
- `posts_generated`
- `competitors_added`

### API changes:
- Each gated API route checks usage before executing
- Returns 429 with `{ error: 'limit_reached', upgradeUrl: '/pricing' }` when over limit
- Frontend catches this and shows the upgrade gate

---

## S18-06: DFY Upsell CTAs on Technical Pages (Size S)

### Where
Pages where users see technical output they can't implement alone.

### DFY triggers (add secondary CTA below Solo gate):

**Schema Markup:** "Don't want to touch code? Our team installs this for you. → DFY Setup $499"

**llms.txt:** "We'll deploy this file to your website for you. → DFY Setup $499"

**FAQ Builder:** "Want these installed on your site with proper schema markup? → DFY Setup $499"

**AI Readiness (failing checks):** "Fixing all of this yourself? Or let us handle it. We fix everything in 48 hours. → DFY Setup $499"

**Implementation Guides (wherever shown):** "Skip the DIY. → Get DFY Setup"

**Monthly Reports (Solo users, score stagnant):** "Not seeing results? Let our team implement the fixes. → DFY Setup $499"

### Component: DfyUpsellCard
Create `components/dfy-upsell-card.tsx` — a mini card that appears below the Solo CTA on technical pages. NOT just a text link — a small but rich card:

**Design:**
- Subtle gold/cream background (gradient from #FFFDF5 to #FFF8E7)
- Thin gold border
- Headline: "Or let us do it for you — $499 one-time"
- 4-5 bullet points showing EVERYTHING included in DFY (not just this page's feature):
  - ✓ Schema markup installed on your site
  - ✓ llms.txt deployed to your domain
  - ✓ 15-25 FAQs written + installed with schema
  - ✓ Platform-specific implementation (WordPress, Squarespace, etc.)
  - ✓ Dedicated onboarding call
  - ✓ Full AEO audit with prioritized fixes
- Small CTA button: "Get DFY Setup →" (gold gradient, same style as pricing page)
- Context line at top that's PAGE-SPECIFIC: e.g. on Schema page → "Installing JSON-LD is included in DFY Setup — plus everything else:"

The page-specific context line is what makes each placement feel intentional, not spammy. The bullet list shows the FULL package so they understand the value of $499.

### Integration
Add `suggestDfy?: boolean` and `dfyContext?: string` props to UpgradeGate. When suggestDfy is true, render DfyUpsellCard below the Solo gate with the contextual line.

---

## Priority Order
1. S18-03 (Upgrade gate component) — foundation for everything
2. S18-04 (Gate all pages) — the actual conversion work
3. S18-05 (Usage tracking) — backend enforcement
4. S18-01 (Stripe restructure) — new prices
5. S18-02 (Pricing page update) — reflect new model

---

## Free Tier Limits Summary
| Feature | Free | Solo ($49/mo) | Managed ($99/mo) |
|---------|------|---------------|-------------------|
| AEO Scans | 1/month | Unlimited | Unlimited |
| GBP Post Drafts | 5/month | Unlimited | Unlimited + we post |
| City Pages | 3 | 10 | Unlimited |
| FAQ Generation | 1/month | Unlimited | Unlimited |
| llms.txt | Preview only | Generate + copy | We deploy it |
| Schema Markup | Preview only | Generate + copy | We install it |
| Review Responses | 3/month | Unlimited | Unlimited |
| Competitors | 1 | 5 | 10 |
| Monthly Reports | ❌ | ✅ | ✅ + strategy notes |
| Blog Posts | ❌ | 4/month | Weekly (we write) |

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
