# Sprint 32 — Cold Outreach Emails + Research Engine + Website Updates

**Theme:** Complete the outreach engine and intelligence flywheel
**Carried from:** S31-04, S31-05, S31-06
**Action items from S31 retro:** Screenshot before copy deploys, run persona review, scope to 3 items max

---

## S32-01: Cold Outreach Email System (was S31-04)

**Problem:** We can find and score prospects but have no way to send personalized outreach with scan results and competitor comparisons.

**Solution:**
- Email templates in `lib/outreach-emails.ts`:
  - **Template A: "Your Competitor is Winning"** — prospect's score vs named competitor's higher score, top 3 failing checks, CTA to free scan
  - **Template B: "You're Invisible to AI"** — low score + what happens when customers ask AI for their industry in their city, CTA to free scan
- CAN-SPAM compliance: physical address (Burnsville, MN 55337), unsubscribe link, honest subject lines, no deceptive headers
- Supabase table: `outreach_emails` (prospect_email, business_name, city, industry, template, score, competitor_score, sent_at, opened_at, clicked_at)
- Migration file for the new table
- Script: `scripts/send-outreach.ts` — reads pipeline output JSON, generates and sends via Resend
- Separate sender: `david@localbeacon.ai` (not transactional from= address)
- Dry-run mode (--dry-run) that previews emails without sending

**Verification:** Send test emails to David's email, verify formatting, links work, unsubscribe link works. Dry-run on the Burnsville plumber dataset from S31.

**Measurable Outcome:** Can send 20 personalized cold emails per batch with score comparisons.

---

## S32-02: Research Engine v1 — Signal Scanner (was S31-05)

**Problem:** We sell "AI search landscape changes" in the monthly Intelligence Report but have no system to track them. The checker has 26 static rules. Being dynamic is our moat.

**Solution:**
- `scripts/research/signal-scanner.ts` — daily-runnable script that:
  1. Pulls RSS feeds: Google Search Central blog, Bing Webmaster blog, Search Engine Journal, Ahrefs blog
  2. Searches Brave for recent articles: "AI search ranking signals", "llms.txt standard", "AEO optimization", "AI overviews changes", "schema markup update 2026"
  3. Evaluates each finding with a scoring heuristic: Is it about AI/AEO? Is it actionable for local businesses? Priority: high/medium/low
  4. Stores in `data/research/signals.json` — date, source, title, url, summary, priority, actionable (bool)
  5. Deduplicates by URL across runs
- Weekly digest: script generates a markdown summary of top signals, posts to #local-beacon Discord
- `data/research/changelog.md` — human-readable log of when new checker rules were added

**Verification:** Run scanner, get at least 5 relevant signals from the past week. Verify dedup on second run.

**Measurable Outcome:** Automated weekly intelligence feed. Path to expanding checker rules. Content for subscriber reports.

---

## S32-03: Website Updates (was S31-06)

**Problem:** Website doesn't reflect the outreach/intelligence capabilities. Homepage SEO content still says "19 signals" in some places.

**Solution:**
- Update signal count across all pages (currently inconsistent — some say 19, some say 26)
- Add "Powered by 26+ AI readiness signals — updated weekly" badge on checker page
- Add "What's New" section to checker page footer showing recent signal additions
- Update homepage SEO content paragraph to mention intelligence report and research engine
- **Screenshot BEFORE making changes** (S31 retro action item)
- **Screenshot AFTER for David's review before deploy** (S31 retro action item)

**Verification:** Visual review of before/after screenshots. All signal count references consistent.

**Measurable Outcome:** Website communicates dynamic, research-backed product. No stale signal counts.

---

## Priority Order

1. **S32-01** — Cold outreach emails (highest revenue impact — can start sending this week)
2. **S32-02** — Research engine (intelligence flywheel, feeds content + reports + checker)
3. **S32-03** — Website updates (reflect capabilities, fix inconsistencies)

## Process Commitments (from S31 retro)

- [ ] Screenshot before AND after all copy/UI changes
- [ ] Run persona review on checker UX changes before deploy
- [ ] 3 items only — no scope creep

---

*Sprint plan posted for David's approval. No code until "approved" / "go" / "proceed".*
