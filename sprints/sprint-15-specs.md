# Sprint 15 — Done-For-You Delivery Pipeline

**Product:** LocalBeacon.ai
**Theme:** Make the $499/mo DFY tier worth paying for
**Recovering:** Original S14 items that got derailed

---

## S15-01: Schema Markup Generator — Verify & Enhance (Size S)

### Problem
Dashboard has a schema page but need to verify it outputs copy-pasteable LocalBusiness JSON-LD with platform-specific instructions.

### Where
- `app/app/dashboard/schema/page.tsx` (or .js)
- Verify output includes: business name, address, phone, hours, service area, reviews aggregate

### Verification
- Generates valid JSON-LD for a scanned business
- Output is copy-pasteable (code block with copy button)
- Validates against Google's Rich Results Test

---

## S15-02: FAQ Generator with FAQPage Schema (Size M)

### Problem
FAQ dashboard page exists but need to verify it generates FAQPage schema markup baked into the HTML output, not just plain text.

### Where
- `app/app/dashboard/faq/page.tsx` (or .js)
- Generate 15-25 localized FAQs based on business industry + service area
- Output: HTML snippet with FAQPage JSON-LD schema ready to paste

### Verification
- Generates industry-specific FAQs (not generic)
- Includes city/neighborhood names in answers
- FAQPage schema validates in Google Rich Results Test

---

## S15-03: Implementation Guide per Platform (Size M)

### Problem
DFY customers get deliverables (schema, llms.txt, FAQs) but no instructions for installing them. This is what makes DFY worth $499 — we tell them exactly where to paste each thing.

### Where
- New component or page section in dashboard
- For each deliverable, generate step-by-step instructions for: WordPress, Wix, Squarespace, custom HTML
- Include screenshots or annotated descriptions of where to click

### Verification
- Each deliverable has platform-specific instructions
- Instructions are plain English (written for a plumber, not a developer)
- Includes "where to paste this" with specific menu paths

---

## S15-04: Monthly Progress Report + Re-scan (Size M)

### Problem
No automated way to show customers their score is improving. "You were 52, now you're 78" is the retention hook.

### Where
- Cron or script that re-scans all active customer URLs monthly
- Stores score history (Supabase or Google Sheet)
- Sends branded email with: current score, previous score, delta, what improved, what's still failing
- Uses the upgraded email template from S13

### Verification
- Re-scan runs for a test business, stores new score
- Email shows score comparison (before/after)
- Score history persists across months

---

## S15-05: DFY Onboarding Package Generator (Size L)

### Problem
When a DFY customer signs up, we need to automatically generate their full fix package: schema markup + llms.txt + FAQs + implementation guides — bundled as one email or PDF.

### Where
- New script: `scripts/generate-dfy-package.ts`
- Takes a business URL + name + industry
- Runs AEO scan, generates all deliverables, bundles into email with attachments
- Could also generate a single comprehensive PDF

### Verification
- Run for a test business → produces complete package
- Package includes: schema JSON-LD, llms.txt content, 15+ FAQs with schema, platform guides
- Email or PDF looks professional and actionable

---

## Sprint 15 Priority Order
1. S15-01 (Schema verify) — quick win, validate what exists
2. S15-02 (FAQ + schema) — high value deliverable
3. S15-03 (Platform guides) — the DFY differentiator
4. S15-04 (Monthly re-scan) — retention hook
5. S15-05 (DFY package) — ties it all together

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
