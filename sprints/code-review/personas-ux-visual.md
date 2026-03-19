# LocalBeacon Persona Review — UX + Visual

**Reviewers:** Sasha (UX Designer) · Jules (Visual Designer)  
**Date:** 2026-03-18  
**Scope:** `products/localbeacon/app/` — all user-facing pages and flows

---

## Sasha — UX Designer

### 1. Homepage → /check CTA Flow 🟢

**What I read:** `app/page.tsx` → delegates to `components/landing-content.tsx`. `/check` page (`app/check/page.tsx`) wraps `CheckerForm` in a Suspense boundary.

**Findings:**
- 🟢 The `/check` page is clean and focused. Hero → form → "how it works" → "what we check" → upsell CTA. Logical flow.
- 🟢 Pre-fill from `?url=` query param works (`useEffect` on `searchParams`). Landing page CTA can pass URL through.
- 🟡 The primary homepage CTA (in `landing-content.tsx`) wasn't directly audited here, but the `/check` page itself has a clear nav "Sign in →" and no confusion about the tool's purpose.
- 🟡 There's no back-navigation breadcrumb from `/check` to the landing page — users who arrive directly may not know where "home" is.

---

### 2. Scan → Email Gate → Full Report 🟡

**What I read:** `app/check/checker-form.tsx` — full state machine: `idle` → `scanning` → `teaser` → `email-gate` → `full-report`

**Findings:**
- 🟢 The score teaser (the circle SVG + grade badge) appears immediately after scan — users get value before the gate. This is the right pattern.
- 🟢 Competitor comparison appears in the teaser, giving another reason to stay before hitting the gate.
- 🟡 **Email gate UX:** The gate is embedded *inside* the teaser card rather than a separate step. It's labeled "See your full breakdown" with "No spam" copy. Low friction framing is good. However, the form has no progress indication — there's no "Step 2 of 2" or similar cue, so users who submitted may wonder what happened.
- 🟡 **After submit:** The code calls `setViewState('full-report')` directly — there's no loading state shown between email submission and full report reveal. Email saving shows a spinner but report transitions instantly. This is fine functionally but could feel abrupt.
- 🔴 **Silent email failure:** If the `/api/leads` call throws, the code still sets `viewState('full-report')` — this is intentional (don't punish user) but means the user gets the report without their email being captured. No feedback is shown for the failure either. If this matters for lead gen, the silent failure is invisible.
- 🟢 Rate limiting (3 scans/hour via localStorage) is in place, with a clear error message shown on the form.
- 🟡 **Scan another button:** Present and functional, resets all state. Good. But its position at the bottom of both teaser and full-report is easy to miss on mobile (need to scroll past everything).

---

### 3. Sign-up → Onboarding 🟡

**What I read:** `app/onboarding/page.tsx` — 4 steps: Business Info → Service Areas → Choose Plan → First Post

**Findings:**
- 🟢 **4-step flow** is lean and well-sequenced. Progress indicator is visual (circles + labels, hidden text on mobile).
- 🟢 **Pre-fill from `/check`:** Website URL and score are passed via `?url=&score=` query params. The score is shown as a badge on Step 1 ("Score: 47/100"), which is a nice continuity touch.
- 🟡 **Step 1 validation:** Required fields (name, category, city, state) are enforced with `disabled` on Continue. But phone is optional with no validation — users could enter anything. Not blocking, but worth noting.
- 🟡 **Step 2 (Service Areas):** Empty state has helpful copy ("We'll default to [city]"), so skipping is safe. But the add flow requires clicking "Add" or pressing Enter — there's no placeholder guidance that Enter works. Add a "(or press Enter)" hint.
- 🟡 **Step 3 (Plan Selection):** Clicking a plan card calls `handleStep3Continue(plan)` immediately — **no confirmation dialog for the $499 DFY or $49/mo plans**. Users could accidentally click and get redirected to Stripe checkout. The card is fully clickable with no "confirm" step. Consider at minimum a confirmation for DFY (which the separate `/pricing` page handles correctly with a Dialog, but onboarding doesn't).
- 🔴 **Drop-off risk on Step 3:** The plan cards are clickable and immediately trigger checkout redirect. If a user's Stripe session fails, they're redirected to `/dashboard` via the `free` fallback — but there's no error message shown. User lands in dashboard and doesn't know what happened.
- 🟢 **Step 4 (First Post):** Delight step. The generated GBP post with copy button is a great activation moment. Instructions for how to post to Google are clear.
- 🟡 **Mobile progress bar:** Step labels are `hidden sm:block` — on small screens, users only see numbered circles, not what each step is. Fine, but slightly reduces orientation.

---

### 4. Dashboard Navigation 🟡

**What I read:** `components/dashboard/sidebar.tsx` — 14 nav items, client switcher, mobile Sheet

**Findings:**
- 🟡 **14 items is a lot.** The full list: Overview, GBP Posts, Upcoming Posts, Page Builder, Reviews, Blog Posts, AI Readiness, FAQ Builder, AI Discovery File, Listing Health, Schema Markup, Competitors, Monthly Report, Settings. This is cognitively heavy.
  - Could benefit from grouping (e.g., "Content" → Posts/Queue/Blog/Pages; "Optimization" → AI Readiness/FAQ/llms-txt/Schema/Audit; "Insights" → Competitors/Reports).
  - Currently all items are flat, with only subtle visual separation.
- 🟢 Active state is clear: left border + orange background tint + orange text.
- 🟢 **Mobile implementation looks solid:** Uses Radix `Sheet` with `side="left"`, triggered by hamburger. `onLinkClick` prop closes the sheet on nav. No custom state hacks.
- 🟡 **Client switcher:** Dropdown with business list is present and functional. The "Add Client" upsell is well-placed. But the dropdown doesn't close on outside click — it closes only when a business is selected or the chevron is clicked again. This can feel sticky.
- 🟢 User section at bottom with Clerk `UserButton` is compact and unobtrusive.
- 🟡 No visual separation between tool groups — all 14 items render in a flat `ul`. First time users will scan every item to find what they need.

---

### 5. Tool Pages — Empty States & Error States 🟢

**What I read:** `dashboard/llms-txt/page.tsx`, `dashboard/schema/page.tsx`, `dashboard/faq/page.tsx`, `dashboard/ai-readiness/page.tsx`

**Findings:**
- 🟢 **Empty states are handled across all tool pages:**
  - llms-txt: Large emoji + explanatory copy + what the tool does
  - schema: Demo mode banner + pre-populated demo business data
  - faq: Large emoji + context copy about AI-optimized questions
  - ai-readiness: Empty state with suggestion chips ("Try: Your business website")
- 🟢 **Loading states:** Spinner/animation shown during generation/scanning on all pages. Loading button text changes ("Generating...", "Scanning...").
- 🟡 **Error handling is thin:** 
  - llms-txt: `catch {}` — silently fails, no error UI shown to user
  - faq: Same `catch {}` pattern — silent failure
  - ai-readiness: Shows `setError(data.error)` in the URL input area — this is the only page with explicit error display
- 🔴 **Schema page:** Uses `DEMO_BUSINESS` fallback when no business is connected. The demo notice is shown, which is good. But if the user clicks "Copy Code" on demo data and pastes it into their site, they get Thompson Plumbing's data. Should add a stronger warning before the copy action.
- 🟢 **UpgradeGate** is consistently applied across llms-txt, schema, faq, and ai-readiness for plan-gated features. Blur/limit modes are used appropriately.

---

### 6. Pricing → Checkout 🟢

**What I read:** `app/pricing/page.tsx`

**Findings:**
- 🟢 **4-plan layout** (Free, Solo, DFY, Managed) is clear. Visual hierarchy distinguishes plans well (highlight border, "Most Popular" badge, DFY gold gradient).
- 🟢 **DFY Confirmation Dialog** is implemented correctly — clicking "DFY Setup" opens a `Dialog` with itemized benefits and Cancel/Continue. This prevents accidental $499 charges. Well done.
- 🟡 **"Managed" plan positioning:** The "After DFY Setup" badge and the dependency note in FAQs is easy to miss. Users comparing plans might not realize Managed requires DFY first — this could cause confusion or failed checkouts.
- 🟡 **Free plan CTA is "Connect Your Google Listing"** but links to `/sign-up`. For users who are already signed in, this could be confusing. Should conditionally route to `/dashboard` or `/onboarding`.
- 🟡 **Checkout error handling:** If the API returns an error other than "Unauthorized", the code falls through to `window.location.href = "/sign-up"` — user gets redirected away from pricing with no explanation.
- 🟢 FAQs inline on the page are comprehensive and address real objections (DFY explanation, cancel policy, BrightLocal comparison).

---

### 7. Mobile UX 🟢

**What I read:** sidebar.tsx, check/page.tsx, dashboard/layout.tsx

**Findings:**
- 🟢 **Hamburger + Sheet:** Correctly implemented in sidebar. `md:hidden` shows the sticky top bar; `hidden md:flex` shows the desktop sidebar. Clean separation.
- 🟢 **Dashboard layout:** `flex flex-col md:flex-row` — mobile stacks content below the top bar. `min-w-0` prevents flex overflow.
- 🟡 **Tool forms on mobile:** llms-txt and faq forms use `grid-cols-1 md:grid-cols-2` — correct. But the llms-txt form has 14 input fields — on mobile this is a very long scroll before hitting the Generate button. Consider sticky/floating CTA on mobile.
- 🟡 **Pricing page 4-column grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. On small tablets (md), 2 plans per row is fine, but the plan cards have variable height due to different feature counts — some rows may look unbalanced.
- 🟢 **Check page:** Simple centered layout with max-width container — looks clean on mobile. No horizontal overflow risk.
- 🟡 **Onboarding step labels** are hidden on small screens (progress bar shows numbers only). Acceptable trade-off but adds disorientation.

---

### Sasha's Priority Fix List

| # | Issue | Severity |
|---|-------|----------|
| 1 | DFY plan on onboarding (Step 3) has no confirmation — immediate Stripe redirect | 🔴 Critical |
| 2 | Schema demo mode: "Copy Code" with no strong warning about demo data | 🔴 Critical |
| 3 | Silent failures on llms-txt and faq generation — no error UI | 🟡 Medium |
| 4 | 14-item flat sidebar — needs visual grouping | 🟡 Medium |
| 5 | "Managed" plan dependency on DFY not surfaced clearly | 🟡 Medium |
| 6 | Free plan CTA on pricing should route logged-in users to dashboard | 🟡 Medium |
| 7 | Email gate submit → full report transition has no loading state | 🟡 Low |
| 8 | llms-txt mobile: 14 inputs before CTA, no sticky button | 🟢 Enhancement |

---

## Jules — Visual Designer

### 1. Design System Consistency 🟡

**What I read:** `app/globals.css`, `app/lib/design-tokens.ts`

**Findings:**
- 🟢 **Design tokens exist and are correct:** `lib/design-tokens.ts` exports a clean `colors` object: NAVY `#1B2A4A`, ORANGE `#FF6B35`, WARM_WHITE `#FAFAF7`, CREAM `#F5F0E8`, CHARCOAL `#2D3436`, SLATE `#636E72`, MIST `#DFE6E9`.
- 🟢 **CSS custom properties** in `globals.css` mirror these tokens as `--lb-*` variables: `--lb-navy`, `--lb-orange`, `--lb-warm-white`, etc. The foundation is solid.
- 🔴 **Tokens are not actually used in components.** The design tokens file exists as documentation but components hardcode hex values directly (`text-[#1B2A4A]`, `bg-[#FF6B35]`, etc.). If you ever need to change a color, it means find-replacing hex strings across 20+ files. The token abstraction provides zero actual protection.
- 🟡 **ShadCN/Radix tokens diverge from brand:** The shadcn `--primary` maps to `oklch(0.205 0 0)` (near-black), not to LocalBeacon's orange. This means any shadcn Button using the default `primary` variant will render incorrect brand color. Components work around this by applying inline `style={{ background: "#FF6B35" }}` or `className="bg-[#FF6B35]"` overrides everywhere — brittle.

---

### 2. Two Palettes Problem 🟡

**What I read:** All dashboard and marketing pages

**Findings:**
- 🟡 **The two-palette problem persists, but it's intentional.** The sidebar is dark navy (`#1B2A4A` background), while all dashboard content areas are light (`#FAFAF7` or white). This is a standard sidebar pattern and looks reasonable if consistent.
- 🔴 **Button text color inconsistency:** Orange CTA buttons (`bg-[#FF6B35]`) use `text-black` in dashboard pages but `text-white` on the marketing/check pages and pricing page. This is a real inconsistency — the same orange button renders with different text colors depending on where you are:
  - Dashboard (llms-txt, schema, faq, posts, pages, ai-readiness): `bg-[#FF6B35] text-black`
  - Check page, pricing page CTA, onboarding: `bg-[#FF6B35] text-white`
  - This creates visual inconsistency users will notice subconsciously.
- 🟡 **Background inconsistency:** `app/dashboard/ai-readiness/page.tsx` uses a dark-themed card for failed checks: `bg-red-500/5 border-red-500/20` with text colors like `text-red-400`, `text-green-400` — these have a slightly different visual language than the brighter red/green used in the public checker (`bg-red-50 border-red-100 text-red-700`). Not unified.

---

### 3. Brand Coherence 🟡

**Findings:**
- 🟢 **Homepage → /check:** Highly coherent. Both use `#FAFAF7` background, `#1B2A4A` navy text, `#FF6B35` orange CTAs, and Fraunces serif for headings.
- 🟡 **Onboarding → Dashboard:** Onboarding uses a light `#FAFAF7` background with no sidebar. Dashboard uses navy sidebar + light content area. The visual "bump" when transitioning post-signup is noticeable — there's no bridge UI.
- 🟡 **Dashboard vs. Marketing:** The dashboard tool pages use plain `text-[#2D3436]` for headings (shadcn Card context), while marketing pages use `text-[#1B2A4A]`. Both are dark but different — the dashboard reads as slightly warmer/lighter. Headings lose the brand navy tone inside the dashboard.
- 🟢 **Pricing page:** Well aligned with marketing aesthetic. Uses the same 4-color language (navy, orange, warm white, slate). The DFY gold gradient is a tasteful differentiator.
- 🟡 **Internal tool pages have no nav/header context.** The sidebar is the only navigation — tool pages have no breadcrumbs or section headers that ground the user in "LocalBeacon Dashboard > FAQ Builder." The h1 headings are styled consistently but there's no page-level wayfinding.

---

### 4. Accessibility 🔴

**Findings:**
- 🔴 **Orange on white contrast:** `#FF6B35` on `white` background = ~3.1:1 contrast ratio. WCAG AA requires 4.5:1 for normal text, 3:1 for large/bold text (18px+ or 14px bold). Small text links (e.g., "+ Compare with a competitor", "← Scan another website") at 14px regular weight fail WCAG AA.
- 🔴 **Placeholder text is invisible:** `placeholder:text-[#1B2A4A]/30` (30% opacity navy on white) is extremely low contrast — approximately 1.5:1. Users with vision impairments will struggle to read input placeholders.
- 🟡 **`text-[#636E72]` (slate) on `#FAFAF7`** = approximately 4.1:1 — borderline AA pass for normal text, fails at small sizes (11px, 12px). Several captions and meta text use `text-xs` (12px) at this color — likely failing.
- 🟡 **Touch targets:** Most buttons appear to be `h-11` (44px) or `py-3` equivalents — acceptable. But small action links like "← Scan another website" (plain text, `text-sm`) have no padding and very small click/tap targets.
- 🟡 **Focus states:** Inputs use `focus:ring-2 focus:ring-[#FF6B35]/30` — the orange ring at 30% opacity is quite faint. Keyboard users navigating the form may struggle to track focus.
- 🟢 **Aria labels:** The hamburger menu button has `aria-label="Open menu"` — correct. Semantic HTML appears well-structured with proper `<nav>`, `<main>`, `<header>` usage.

---

### 5. Icon Consistency 🟢

**Findings:**
- 🟢 **All icons are lucide-react.** The sidebar imports: `LayoutDashboard`, `FileText`, `Calendar`, `Globe`, `Star`, `BookOpen`, `Zap`, `HelpCircle`, `FileCode`, `Activity`, `Code`, `Users`, `BarChart3`, `Settings`, `Building2`, `ChevronDown`, `Plus`, `Menu` — all from `lucide-react`.
- 🟢 Dashboard page imports: `FileText`, `Globe`, `Star`, `Zap`, `Link`, `PenLine`, `BarChart3`, `FileDown` — all lucide-react.
- 🟢 No mixed icon systems detected (no heroicons, no font-awesome, no SVG one-offs outside of the branded `BeaconIcon` component and emoji usage).
- 🟡 **Emoji usage alongside lucide icons:** Several pages mix emoji (📄, 💬, 🔍, 🎉, 💡) with lucide icons. This is intentional for empty states and callouts but creates a slight visual inconsistency in tone — lucide is clean/geometric; emoji is playful/platform-specific.

---

### 6. Whitespace and Typography 🟡

**Findings:**
- 🟢 **Font stack:** DM Sans (body, via next/font) + Fraunces (serif display, via next/font). Clean, distinctive pairing. Fraunces is used correctly on marketing pages for h1/h2 headings via `font-[var(--font-fraunces)]`.
- 🔴 **Dashboard pages lose the Fraunces brand voice.** Tool page headings (`h1` tags in dashboard) use `text-2xl font-bold text-[#2D3436]` — the default DM Sans. The Fraunces serif never appears inside the dashboard. The marketing-to-dashboard transition is a typography cliff — you go from editorial serif to corporate sans instantly.
- 🟡 **Heading hierarchy is mostly consistent:** h1 (text-2xl/3xl), h2 (text-lg/xl), h3 (font-semibold text-sm/base). But a few pages deviate — schema page uses `text-lg font-semibold` for h2 but `font-medium` for section h3s. Minor.
- 🟡 **Spacing inconsistency:** Some tool pages use `space-y-8` as the outer wrapper (llms-txt, faq) while dashboard main page uses `px-6 py-8 max-w-6xl`. Schema page uses `p-6 md:p-8 max-w-5xl` directly on the outer div. The content area max-width varies (5xl vs 6xl) creating slightly different line lengths across pages.
- 🟡 **`bg-white0` typo:** In both `llms-txt/page.tsx` and `faq/page.tsx`, the code block background is `className="bg-white0 rounded-lg..."` — `bg-white0` is not a valid Tailwind class. The pre block likely falls back to transparent/inherited background rather than intended white. This may explain why code previews display green text floating without a card background.
- 🟢 **Line heights and text-sm/text-xs usage** are appropriately graduated — labels at `text-xs`, body at `text-sm`, headings at `text-2xl`. The scale is readable.

---

### Jules's Priority Fix List

| # | Issue | Severity |
|---|-------|----------|
| 1 | Orange button text is `text-black` in dashboard but `text-white` on marketing — pick one | 🔴 Critical |
| 2 | Placeholder text at 30% opacity fails contrast (≈1.5:1) | 🔴 Critical |
| 3 | `bg-white0` typo on code blocks — invalid Tailwind class | 🔴 Critical |
| 4 | Small orange-on-white text links fail WCAG AA (3.1:1 ratio) | 🔴 Accessibility |
| 5 | Design tokens file exists but nothing imports it — token abstraction is unused | 🟡 Medium |
| 6 | Fraunces serif disappears entirely inside the dashboard — brand voice drops off | 🟡 Medium |
| 7 | ShadCN `--primary` not mapped to brand orange — manual overrides everywhere | 🟡 Medium |
| 8 | Dashboard tool page max-widths vary (5xl vs 6xl) — content alignment inconsistency | 🟡 Low |
| 9 | Emoji + lucide mixed in same UI — tone inconsistency, especially in empty states | 🟢 Enhancement |

---

## Summary Scorecard

| Area | Sasha (UX) | Jules (Visual) |
|------|------------|----------------|
| Homepage → Check flow | 🟢 | 🟢 |
| Email gate experience | 🟡 | — |
| Onboarding flow | 🟡 | 🟡 |
| Dashboard navigation | 🟡 | — |
| Tool empty/error states | 🟡 | — |
| Pricing + checkout | 🟢 | 🟢 |
| Mobile responsiveness | 🟢 | 🟡 |
| Design token system | — | 🔴 |
| Color/palette consistency | — | 🟡 |
| Accessibility | — | 🔴 |
| Icon system | — | 🟢 |
| Typography + whitespace | — | 🟡 |

**Overall:** The product is functional and mostly well-designed. The biggest risks are (1) the `text-black` vs `text-white` button split creating a jarring inconsistency, (2) `bg-white0` typo breaking code block rendering, (3) accessibility gaps in placeholder and orange text contrast, and (4) onboarding Step 3 missing a DFY confirmation dialog. Fix these 4 and the product feels polished.
