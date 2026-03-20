# Sprint 22 — Scanner 2.0: Beat the Competition

---

## S22-01: Expand AEO Scanner — 14 → 22 checks (Size L)

**Problem:** Competitors (geo-seo-claude, aeo.js) check individual AI crawlers, citability, and ai-index.json. Our scanner doesn't. A prospect comparing our /check output to check.aeojs.org sees fewer checks from us.

**Solution:** Add 8 new checks to `app/api/ai-readiness/route.ts`. Rebalance weights so total = 100. Update `lib/aeo-recommendations.ts` with fix recommendations for each new check.

New checks: individual AI crawler access (GPTBot, ClaudeBot, PerplexityBot, Applebot, GoogleOther, Bytespider, CCBot — parse robots.txt Disallow rules per-bot), ai-index.json detection (fetch `/ai-index.json`), citability scoring (measure extractable 100-200 word passages with clear topic sentences), E-E-A-T signals (about page, author bios, credential mentions), brand mention hints (social profile links in schema, review aggregation markup).

**Where:** `app/api/ai-readiness/route.ts`, `lib/aeo-recommendations.ts`

**Verification:** `curl -X POST localbeacon.ai/api/ai-readiness -d '{"url":"https://example.com"}' | jq '.checks | length'` returns 22. Build passes.

**Measurable Outcome:** Scanner checks count goes from 14 to 22. All new checks return pass/fail with fix recommendations.

---

## S22-02: ai-index.json Generator (Size M)

**Problem:** ai-index.json is a new standard alongside llms.txt. We check for it but don't help users create one. Competitors (aeo.js) auto-generate it.

**Solution:** New dashboard tool page at `/dashboard/ai-index`. Same pattern as llms.txt page — fill in business details, generate file, download button, platform-specific install instructions.

**Where:** New `app/dashboard/ai-index/page.tsx`, add nav item to `components/dashboard/sidebar.tsx`, gate behind Solo plan.

**Verification:** Navigate to `/dashboard/ai-index`, fill form, click generate, download file. File is valid JSON matching ai-index.json spec.

**Measurable Outcome:** New dashboard section visible in sidebar. Solo users can generate and download ai-index.json.

---

## S22-03: Update /check Public Scanner UI (Size S)

**Problem:** Public scanner shows 22 checks as a flat list. That's overwhelming. Competitors group checks into categories with sub-scores.

**Solution:** Group checks into 5 categories in `app/check/checker-form.tsx`: AI Access, Content Structure, Schema & Data, Citability & Quality, Meta & Technical. Show category scores as a visual breakdown (bar or ring per category). Individual checks expand under each category.

**Where:** `app/check/checker-form.tsx`, `app/check/page.tsx` (update intro copy)

**Verification:** Run a scan on /check. Results display in 5 grouped categories with sub-scores. All 22 checks visible.

**Measurable Outcome:** Public scanner shows categorized results instead of flat list.

---

## S22-04: Sync All Frontend Surfaces (Size M)

**Problem:** Homepage, pricing, dashboard, emails, and meta tags reference "14 checks" or outdated feature descriptions. After S22-01 we have 22 checks and new tools.

**Solution:** `grep -rn "14" across the codebase` + manual review. Update:
- `lib/plans.ts` — feature descriptions ("22-point AI scan")
- `components/landing-content.tsx` — hero copy, how-it-works, any check count references
- `app/check/page.tsx` — intro copy, step descriptions
- `app/dashboard/ai-readiness/page.tsx` — section headers, empty states
- Homepage metadata — meta description, schema.org JSON-LD
- `components/dashboard/sidebar.tsx` — add ai-index.json nav item
- `lib/email.ts` — AEO report email shows grouped categories

Use brand palette: bg `#FAFAF7`, text `#1B2A4A`, accent `#FF6B35`.

**Where:** Files listed above.

**Verification:** `grep -rn '"14' app/ components/ lib/` returns 0 references to old check count. All surface copy matches new scanner capabilities.

**Measurable Outcome:** Zero copy/code drift across all surfaces. Every mention of check count, features, or capabilities reflects the 22-check scanner.

---

## S22-05: Citability Score Detail View (Size S)

**Problem:** Citability is a new, differentiating metric. But a pass/fail score without detail isn't actionable. Users need to see which passages are citable and which aren't.

**Solution:** On the dashboard AI Readiness page, expand citability check to show detail: which passages on the site are "citable" by AI (100-200 word passages with clear topic sentences) and which are too long/short/vague.

**Where:** `app/dashboard/ai-readiness/page.tsx` (expandable detail panel for citability check)

**Verification:** Run dashboard scan. Citability check has an expandable section showing extracted passages with citable/not-citable labels and reasons.

**Measurable Outcome:** Users can see exactly which content passages AI models would excerpt and which need rewriting.

---

**Priority:** 01 → 04 → 03 → 02 → 05
**Build + commit to sprint branch + push to GitHub.**
