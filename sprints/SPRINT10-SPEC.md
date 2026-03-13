# Sprint 10 Spec — Differentiation

**Sprint:** 10  
**Theme:** *"Nobody else has what we have. Make it impossible to ignore."*  
**Status:** Draft  
**Speclint Score:** TBD (will run before execution)  

---

## Persona Feedback on Sprint 10 Plan

### S10-01: Public AI Readiness Checker

**Bob (plumber, 52):** "If I can type in my website and see a score without signing up, I'd probably try it. Especially if you tell me what's wrong and how to fix it. But don't make me give my email just to see a number — I'll leave. Show me something first, THEN ask."

**Taylor (HVAC, 29):** "Love this. I'd share this with my networking group. 'Hey, check your AI readiness score.' The email gate makes sense IF you show the score first. I want the details behind the gate — which signals passed, which failed, what to do about it."

**Alex (agency, 34):** "This is a prospecting tool. I'd send this link to potential clients: 'Hey Bob, I ran your site — you scored 38/100. Want me to fix it?' The competitor comparison is the closer. Show me side-by-side. Email gate the detailed report, not the score."

**Decision:** Show teaser score (number + grade) publicly. Gate the detailed signal breakdown + recommendations behind email capture. No login required for the scan itself.

### S10-02: Enhanced Content Generation

**Bob:** "I don't care how the sausage is made. Just make the posts sound like they're about MY business in MY city, not some generic plumbing company."

**Taylor:** "If I filled in my service areas and specialties, the posts better use them. 'Spring HVAC tune-up in Burnsville' not 'Spring HVAC services in your area.'"

**Alex:** "For my clients, tone matters. A law firm post shouldn't sound like a plumber's post. If I set the business category, the AI should adapt."

**Decision:** Pull all business data (name, city, category, service_areas, specialties, description) into generation prompts. Category-aware tone adjustment.

### S10-03: AEO Recommendations Engine

**Bob:** "Tell me what's wrong and give me a button to fix it. Don't give me a list of jargon I don't understand."

**Taylor:** "I'd love 'Your site is missing FAQ content → Click here to generate FAQs for your business.' That's the kind of thing that makes me stay."

**Alex:** "This is cross-sell gold. Every failed signal is a reason to use another tool. But frame it as 'improve your score' not 'buy more stuff.'"

**Decision:** Each failed signal gets an actionable recommendation with a one-click CTA linking to the relevant dashboard tool. Frame as "Improve your score" journey.

### S10-04: Content Freshness Scoring

**Bob:** "A reminder that I haven't posted in 2 weeks? Sure, that's helpful. Don't nag me daily though."

**Taylor:** "Show it on the dashboard. 'Last post: 14 days ago — time to post!' with a generate button right there."

**Alex:** "Per-client freshness view would be great for my dashboard. But I know that's Sprint 11."

**Decision:** Show freshness badge on dashboard overview + queue page. Warning at 7 days, alert at 14 days. Generate CTA inline.

### S10-05: Competitor AEO Comparison

**Bob:** "I don't really know who my competitors are online. But if you told me 'You're beating Joe's Plumbing on 8 out of 14 things' I'd feel good about that."

**Taylor:** "Competitor comparison is powerful. I'd run this on my top 3 competitors immediately."

**Alex:** "This is my closer. I send a prospect their score vs their competitor, and I say 'I can fix this.' Give me a shareable link or PDF."

**Decision:** Build into the public checker as an optional second URL input. Side-by-side score comparison. Save competitor scans per business in Supabase for historical tracking.

---

## AEO Recommendations Research

Based on our existing 14-signal scanner + AEO research (llmrefs.com, our aeo-playbook.md, citation-patterns.md), here are the recommendations we should generate per signal:

| Signal | If FAILING | Recommendation | Dashboard CTA |
|--------|-----------|----------------|---------------|
| llms.txt | Missing | "AI search engines look for an llms.txt file to understand your business. Create one now." | → /dashboard/llms-txt |
| robots.txt AI crawlers | Blocked | "AI crawlers like GPTBot and PerplexityBot can't access your site. Allow them to index you." | → External guide link |
| Schema markup | Missing | "Search engines and AI can't read structured data about your business. Add schema markup now." | → /dashboard/schema |
| FAQ content | Missing | "AI engines heavily cite FAQ pages. Generate FAQ content for your business." | → /dashboard/faq |
| HTTPS | Missing | "Your site isn't secure. HTTPS is required for AI engine trust." | → External guide link |
| Open Graph | Missing | "Your pages don't have social/AI preview tags. These help AI engines identify your content." | → External guide link |
| Mobile-friendly | Failing | "Your site isn't mobile-friendly. AI engines prefer mobile-optimized sources." | → External guide link |
| Sitemap | Missing | "No sitemap found. AI crawlers use sitemaps to discover your content." | → External guide link |
| Heading structure | Poor | "Your page headings aren't well-structured. Use clear H1 → H2 → H3 hierarchy for AI readability." | → External guide link |
| Service pages | Missing | "You don't have city-specific pages. Create service area pages to get cited for local queries." | → /dashboard/pages |
| Content freshness | Stale | "Your content hasn't been updated recently. AI engines prefer fresh, current sources." | → /dashboard/posts |
| Review content | Missing | "No reviews or testimonials on your site. AI engines cite businesses with social proof." | → /dashboard/reviews |
| Answer-first content | Missing | "Your content doesn't start with direct answers. AI extracts the first relevant passage it finds." | → /dashboard/blog |
| NAP consistency | Inconsistent | "Your contact information isn't clearly visible. Make your name, address, and phone consistent." | → /dashboard/settings |

**Additional signals to consider (future sprint):**
- Structured data for `HowTo` schema (process/guide content)
- `sameAs` links connecting all business profiles
- Page load speed (AI crawlers have timeouts)
- Canonical URL presence

---

## Sprint 10 Items

### LB-S10-01 · Public AI Readiness Checker
**Problem:** No top-of-funnel lead generation tool. The AEO scanner is locked behind login. We need a free, public version that captures emails and drives signups.

**Scope:**
- New public page: `/check` — no auth required
- URL input form → runs the same 14-signal AEO scan
- **Teaser view (no email):** Score number (e.g. "72/100"), letter grade (A-F), and 3-word summary ("Good, needs work")
- **Full view (email required):** Detailed signal breakdown, pass/fail per signal, personalized recommendations with CTAs
- Email capture: Resend integration — store email in Supabase `leads` table (id, email, url_scanned, score, created_at)
- Rate limiting: max 3 scans per IP per hour (prevent abuse)
- Optional: competitor URL field for side-by-side comparison (S10-05)
- SEO: meta tags, OG image with dynamic score, structured data

**Measurable Outcome:** Public checker at `/check` converts anonymous visitors into email leads. Success = scan completes in <10 seconds, email capture rate >0% (any email stored = success), rate limiter blocks 4th scan from same IP within 1 hour. Zero auth required.

**Verification:**
1. Visit `/check` unauthenticated → page loads with URL input
2. Enter a URL → scan runs → teaser score displays (number + grade)
3. Click "See full report" → email capture modal appears
4. Enter email → email stored in Supabase `leads` table → full report renders
5. Enter same URL 4x from same IP → 4th attempt blocked with rate limit message
6. `npx next build` passes with 0 errors

**Definition of Done:** Public checker captures emails, shows real scores, rate limits abuse, builds clean.

**Estimate:** XL (Extra Large)  
**Delegatable:** Yes — standalone page, new table, no entanglement

---

### LB-S10-02 · Enhanced Content Generation
**Problem:** All generators use generic prompts. A plumber and a dentist get identical-sounding content. Business data from Settings isn't used.

**Scope:**
- Modify `generateText()` calls in all 4 generators (GBP post, service page, review reply, blog post) to include business context
- Pull from Supabase `businesses` table: name, category, primary_city, service_areas, specialties, description
- Category-aware tone: professional (law, dental, medical), friendly (restaurants, retail), expert (HVAC, plumbing, electrical)
- New utility: `lib/prompt-context.ts` — builds a business context block from Supabase data for any generator
- Fallback: if no business data, use current generic prompts (backward compatible)

**Measurable Outcome:** Generated content includes actual business name, city, service areas, and category-appropriate tone when business data exists in Settings.

**Verification:**
1. Set up a test business in Settings with name="Bob's Plumbing", city="Burnsville", category="Plumbing", specialties="Emergency repairs, Water heaters"
2. Generate a GBP post → post mentions "Burnsville" and "emergency repairs" (not generic)
3. Generate with empty business data → falls back to generic prompt (no crash)
4. Generate for a law firm category → tone is professional, not casual
5. `npx next build` passes

**Definition of Done:** All 4 generators use business context when available, with category-aware tone.

**Estimate:** M (Medium)  
**Delegatable:** Yes — `lib/prompt-context.ts` is standalone, API route changes are mechanical

---

### LB-S10-03 · AEO Recommendations Engine
**Problem:** AEO scan shows pass/fail but doesn't tell users what to DO. No cross-sell between dashboard tools.

**Scope:**
- New utility: `lib/aeo-recommendations.ts` — maps each of the 14 signals to an actionable recommendation + dashboard CTA URL
- Extend `/api/aeo-scan` response to include `recommendations[]` array
- Update AI Readiness page (`/dashboard/ai-readiness`) to show recommendations below the score
- Each recommendation: icon, title, description, CTA button ("Fix This →") linking to relevant tool
- Group by priority: Critical (weight ≥ 8), Important (5-7), Nice-to-have (< 5)
- Also used on public checker (S10-01) in the gated full report

**Measurable Outcome:** After an AEO scan, 100% of failing signals display a recommendation with a clickable CTA. CTAs for in-app tools (FAQ, schema, llms.txt, posts, reviews, pages, blog, settings) navigate to the correct dashboard route. Recommendations are grouped by priority (Critical/Important/Nice-to-have) based on signal weight.

**Verification:**
1. Run AEO scan on a site with known gaps (e.g. missing llms.txt, no FAQ)
2. API response includes `recommendations` array with entries for each failing signal
3. Dashboard page shows recommendations grouped by priority
4. Click "Fix This →" on FAQ recommendation → navigates to `/dashboard/faq`
5. Site with 14/14 passing → empty recommendations ("You're all set! 🎉")
6. `npx next build` passes

**Definition of Done:** Recommendations render for all failing signals with working CTAs. Empty state for perfect scores.

**Estimate:** M (Medium)  
**Delegatable:** Yes — `lib/aeo-recommendations.ts` is standalone

---

### LB-S10-04 · Content Freshness Scoring
**Problem:** Users forget to post. No visual indicator of when they last generated or published content. Product feels dead between visits.

**Scope:**
- New utility: `lib/freshness.ts` — queries latest content_items and content_queue entries per business
- Returns: days since last post, freshness status (fresh/stale/critical), last post date
- Thresholds: Fresh (0-7 days, green), Stale (8-14 days, yellow ⚠️), Critical (15+ days, red 🔴)
- Dashboard overview: freshness badge showing "Last post: 3 days ago ✅" or "Last post: 12 days ago ⚠️"
- Queue page: same badge + "Time to post!" CTA when stale
- Freshness data also displayed in weekly email

**Measurable Outcome:** Dashboard and queue pages show days since last content generation with color-coded status badges.

**Verification:**
1. Generate content → freshness shows "Today ✅" (green)
2. With no content in 10 days → shows "10 days ago ⚠️" (yellow)
3. With no content ever → shows "No posts yet — generate your first!" with CTA
4. Badge renders on both dashboard overview and queue page
5. `npx next build` passes

**Definition of Done:** Freshness badge renders on dashboard + queue, color-coded by threshold.

**Estimate:** S (Small)  
**Delegatable:** Yes — standalone utility + component

---

### LB-S10-05 · Competitor AEO Comparison
**Problem:** Users can't see how they compare to competitors. Agencies can't demonstrate value to prospects.

**Scope:**
- Extend public checker (S10-01) with optional second URL field: "Compare with a competitor"
- Side-by-side display: Your Score vs Competitor Score, per-signal comparison table
- Visual: green checkmarks where you win, red X where competitor wins, neutral where tied
- New Supabase table: `competitor_scans` (id, business_id, competitor_url, score, signals, scanned_at)
- Dashboard page: `/dashboard/competitors` — save up to 3 competitors, view history
- Sidebar nav: add "Competitors" item

**Measurable Outcome:** Users can compare AEO scores against a competitor URL with side-by-side signal breakdown.

**Verification:**
1. Enter two URLs on `/check` → both scanned → side-by-side comparison renders
2. Your site: 72/100, Competitor: 45/100 → visual shows you winning on specific signals
3. Logged-in user can save competitor → appears on `/dashboard/competitors`
4. Competitor scan persists in Supabase `competitor_scans` table
5. `npx next build` passes

**Definition of Done:** Comparison works on public checker and dashboard, data persists, builds clean.

**Estimate:** L (Large)  
**Delegatable:** Partial — comparison UI depends on S10-01 public checker

---

## Scope Summary

| ID | Item | Size | Delegatable | Dependencies |
|----|------|------|------------|-------------|
| S10-01 | Public AI Readiness Checker | XL | Yes | None |
| S10-02 | Enhanced content generation | M | Yes | None |
| S10-03 | AEO recommendations engine | M | Yes | None (enhances S10-01) |
| S10-04 | Content freshness scoring | S | Yes | None |
| S10-05 | Competitor AEO comparison | L | Partial | S10-01 (extends public checker) |

**Total:** 5 items (1XL + 1L + 2M + 1S)  
**Estimated effort:** ~6-8 hours  
**Delegation target:** 60% (S10-02, S10-03, S10-04 via sessions_spawn)

## Execution Order

1. **S10-04** (freshness scoring, S) — quick win, standalone, warm up
2. **S10-02** (enhanced generation, M) — delegate immediately
3. **S10-03** (AEO recommendations, M) — delegate immediately
4. **S10-01** (public checker, XL) — the big one, self-execute (too complex to delegate)
5. **S10-05** (competitor comparison, L) — extends S10-01, after it ships

**Parallel delegation:** S10-02 and S10-03 run simultaneously while S10-04 is built directly.

## Orchestration Plan

```
Time 0:     Build S10-04 (freshness) directly              [~30 min]
Time 0:     Spawn sub-agent for S10-02 (enhanced gen)      [~45 min]
Time 0:     Spawn sub-agent for S10-03 (AEO recs)          [~45 min]
Time 30m:   S10-04 done → commit, start S10-01 (public checker)
Time 45m:   Merge S10-02 + S10-03 as they complete
Time 2-3h:  S10-01 done → commit
Time 3-4h:  Build S10-05 (extends S10-01) → commit
Time 4h:    Run persona feedback on deliverables
Time 4.5h:  Fix persona issues → final commit
Time 5h:    Sprint review + retro
```

## New Infrastructure Required

- Supabase table: `leads` (id, email, url_scanned, score, created_at)
- Supabase table: `competitor_scans` (id, business_id, competitor_url, score, signals, scanned_at)
- Vercel env: `RESEND_API_KEY` (already deployed from S9)
- Rate limiting: Upstash Redis (already provisioned)

## What's NOT in Sprint 10

- Blog / newsletter (deferred to Sprint 12 alongside Show HN)
- GBP auto-posting (still waiting on API approval)
- Multi-client views (Sprint 11 — Agency Layer)
- PDF export (Sprint 11)

---

*Spec ready for Speclint pre-flight and David's review.*

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
