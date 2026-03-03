# SPRINT 7 — STRUCTURAL DEPTH

**Sprint:** 7
**Theme:** Structural Depth
**Type:** Hardening / Observability / Governance
**Predecessor:** Sprint 6 — AEO Surface Expansion
**Primary Goal:** Convert Sprint 6 surface expansion into measurable, observable, resilient infrastructure.

**Hard Rule:** No new feature surface area unless it increases reliability, observability, leverage, or entropy reduction.

---

## 1. Strategic Objective

**Why Sprint 6 created structural risk:**

Sprint 6 added 17 new artifacts (3 dashboard pages, 3 API routes, 4 research docs, 1 cron, cross-repo changes) with 1 reliability improvement and 1 metric improvement. The forensics audit classified it as pure surface area expansion. Specific risks:

- The AI Readiness Checker runs scans but discards results. No historical data. No trend visibility. A client's score could regress and nobody would know.
- The FAQ Builder depends on Anthropic's API with no error handling, no degraded mode indicator, and no failure logging. If Anthropic goes down, the user sees a silent fallback to demo data with no explanation.
- The AEO monitor cron runs weekly with no failure detection. If it stops running, nothing alerts. The Sprint 4 healthcheck cron (`0e239da4`) already disappeared from the cron registry — proof this happens.
- All 14 AEO scoring rules are hardcoded in a 403-line route file. Updating weights or adding checks requires a full redeploy.
- Client deployment instructions are generic. WordPress, Squarespace, and Webflow each need different steps, but we give everyone the same wall of text.

**Why depth now compounds leverage:**

Every scan that persists becomes a sales artifact (Alex's PDF export request). Every monitored dependency prevents a silent outage. Every externalized rule lets us iterate scoring without deploys. Depth converts Sprint 6's expansion from liability to asset.

**Definition of "depth" in this context:**

A feature has depth when it: logs its execution, detects its own failure, persists its output, and can be observed without opening the codebase.

---

## 2. Scope (Sprint 7 Work Items)

### LB-S7-01 — AEO Scan Persistence Layer

**Deliverables:**
- Create `aeo_scans` table in Supabase:
  - `id` (uuid, PK)
  - `user_id` (uuid, FK → users)
  - `url` (text)
  - `score` (integer, 0-100)
  - `passed` (integer)
  - `failed` (integer)
  - `checks` (jsonb — full check results array)
  - `scanned_at` (timestamptz)
- Update `/api/ai-readiness` to write scan results after every scan (authenticated users only; anonymous scans still work but don't persist)
- Add `GET /api/ai-readiness/history?url=<url>` endpoint — returns last 30 scans for a URL
- Add score trend chart to `/dashboard/ai-readiness` below the results — simple line graph showing score over time using last 10 scans

**Acceptance Criteria:**
- Scan stored on every authenticated run
- `GET /api/ai-readiness/history?url=localbeacon.ai` returns array of past scans
- Score delta visible on dashboard ("+5 since last scan" or "−3 since last scan")
- No scan silently lost (verify with Supabase query after 3 test scans)

**Non-Goals:**
- Advanced analytics or reporting
- Multi-user tenancy / team scans
- PDF export (Sprint 8 candidate)

---

### LB-S7-02 — Cron Integrity & Failure Detection

**Deliverables:**
- Create `scripts/cron-health.sh` — cron registry validation script:
  - Define expected crons in a manifest array: `aeo-monitor`, `localbeacon-healthcheck`, `speclint-healthcheck`
  - Query `openclaw cron list` and diff against manifest
  - Detect: missing expected cron, cron disabled, last run >2x expected interval (stale)
- Create OpenClaw cron job `cron-health` — runs daily at 7 AM CST, model `ollama/llama3.2:3b`
- On failure detection: send alert to `#alerts` Discord channel (or Telegram fallback)
- **Immediate action:** Investigate and restore missing LocalBeacon healthcheck cron `0e239da4` from Sprint 4

**Acceptance Criteria:**
- Simulated missing cron (remove `aeo-monitor` from manifest, run script) triggers alert
- Stale cron (last run >48h for a daily job) triggers alert
- Missing `0e239da4` healthcheck either restored or replaced with new cron
- Cron list reconciled against expected registry — all present and running

---

### LB-S7-03 — LLM Dependency Monitoring

**Deliverables:**
- Create `lib/anthropic-client.ts` — structured wrapper around Anthropic SDK:
  - Wraps `messages.create()` with try/catch
  - Logs failures: timestamp, error code, error message, endpoint, model
  - Logs to structured format (JSON lines to `/tmp/lb-anthropic-errors.log` or Supabase `api_errors` table)
  - Tracks failure rate (simple counter in memory, logged per-request)
  - Returns `{ success: boolean, data?, error?, isDegraded: boolean }`
- Update FAQ Builder (`/api/generate/faq`) to use wrapper
- Update GBP Post generator (`/api/generate/gbp-post`) to use wrapper
- Update Review Response generator (`/api/generate/review-response`) to use wrapper
- Update Service Page generator (`/api/generate/service-page`) to use wrapper
- Surface degraded mode banner: when last Anthropic call failed, show yellow banner at top of any generator page: "⚠️ AI generation is temporarily using sample data. Your content will be generic until service recovers."

**Acceptance Criteria:**
- Failed Anthropic call logged with timestamp + error code + model
- Degraded mode banner visible when API key is removed (simulated failure)
- Failure count accessible via `GET /api/health` response (add `anthropic.lastFailure` and `anthropic.failureCount` fields)
- All 4 generator routes use the wrapper (no raw Anthropic calls remain)

---

### LB-S7-04 — AEO Scanner Resilience Upgrade

**Deliverables:**
- Update `fetchWithTimeout` in `/api/ai-readiness/route.ts`:
  - Add retry: max 1 retry on timeout or 5xx (2 attempts total)
  - Backoff: 1 second between attempts
- Classify error types in check results:
  - `dns_error` — hostname resolution failed
  - `timeout` — exceeded timeout threshold
  - `http_4xx` — client error (404, 403, etc.)
  - `http_5xx` — server error
  - `parse_error` — response received but unparseable
  - `success` — check completed normally
- Add `errorType` field to each check result in API response
- Log structured errors: `{ url, check_id, errorType, statusCode, timestamp }`
- Add partial scan handling: if homepage fetch fails entirely, return structured error with `score: null` and `error` field instead of 400

**Acceptance Criteria:**
- Simulated 404 on robots.txt properly classified as `http_4xx`
- Simulated timeout on llms.txt properly classified as `timeout`
- Errors logged to console with structured format
- Retry logic verified: timeout on first attempt → retry → success on second = check passes
- No silent failure — every check returns a classification

---

### LB-S7-05 — AEO Rules Engine Externalization

**Deliverables:**
- Create `lib/aeo-rules.json`:
  ```json
  {
    "version": "1.0.0",
    "rules": [
      {
        "id": "llms_txt",
        "label": "llms.txt file exists",
        "description": "...",
        "weight": 10,
        "severity": "high",
        "category": "ai_discovery"
      }
    ]
  }
  ```
- Extract all 14 check definitions (id, label, description, weight, fix text) from hardcoded route into config
- Scanner reads rules from config at runtime
- API response includes `rulesVersion` field
- Check functions remain in route (logic stays in code), but metadata (weights, labels, descriptions, fix text) comes from config

**Acceptance Criteria:**
- Changing a weight in `aeo-rules.json` changes the score without modifying scanner logic
- Adding a new rule to config (with a matching check function) adds it to the scan
- `rulesVersion` field present in API response: `"rulesVersion": "1.0.0"`
- All 14 existing rules migrated to config — zero hardcoded metadata remaining in route

**Non-Goals:**
- Admin UI for editing rules
- Dynamic rule loading without deploy (config is still bundled)

---

### LB-S7-06 — Client Deployment Instruction Engine

**Deliverables:**
- Create `lib/deployment-instructions.ts` — platform-specific instruction templates for:
  - **WordPress** — FTP/file manager upload for llms.txt; Code Snippets plugin or header.php for schema; shortcode or page builder for FAQ HTML
  - **Webflow** — Custom code embed in site settings for schema; CMS collection or rich text for FAQ; static file hosting limitation noted for llms.txt
  - **Squarespace** — Code injection for schema; page content block for FAQ; llms.txt via URL slug workaround
  - **Static HTML** — Direct file placement and `<head>` editing
- Update FAQ Builder to show platform selector dropdown after generation
- Update llms.txt Generator to show platform selector dropdown after generation
- Each instruction set includes: step-by-step, copy-paste snippets, common pitfalls for that platform

**Acceptance Criteria:**
- Selecting "WordPress" in FAQ Builder shows WordPress-specific instructions with plugin names
- Selecting "Squarespace" in llms.txt Generator shows the URL slug workaround
- Instructions validated manually against WordPress (most common client platform)
- Generic instructions remain as default if no platform selected

---

### LB-S7-07 — Sprint Lifecycle Enforcement

**Deliverables:**
- Create `sprints/SPRINT_STATE.md` — sprint state tracker:
  ```markdown
  # Sprint State
  | Sprint | State | Opened | Closed | Review Artifact |
  |--------|-------|--------|--------|-----------------|
  | 5 | Closed | 2026-03-01 | 2026-03-02 | sprints/sprint-5-review.md |
  | 6 | Closed | 2026-03-02 | 2026-03-02 | sprints/sprint-6-forensics.md |
  | 7 | Active | 2026-03-02 | — | — |
  ```
- Define sprint states: `Draft` → `Active` → `Pending Review` → `Closed`
- Rules (enforced by convention + Alexander's governance, not automation):
  - Cannot open Sprint N+1 if Sprint N is not `Closed`
  - Sprint transitions to `Pending Review` when all spec items are marked complete
  - Sprint cannot transition to `Closed` without a review/forensics artifact committed
  - Review artifact must exist on disk (verified with `ls`)
- Alexander checks `SPRINT_STATE.md` before starting any new sprint work

**Acceptance Criteria:**
- `SPRINT_STATE.md` exists with accurate history for Sprints 5-7
- Attempting to start Sprint 8 work → Alexander checks state file → blocks if Sprint 7 not Closed
- Sprint 7 closure requires a forensics/review artifact committed to `sprints/`

**Implementation note:** This is lightweight governance via file convention, not a CI gate. The enforcement agent is Alexander. If this proves valuable, Sprint 8+ can add automation.

---

## 3. Observability Matrix

| Feature | Has Metric | Has Logging | Has Alerting | Has Failure Detection |
|---------|-----------|-------------|--------------|----------------------|
| **Sprint 6 features** | | | | |
| AI Readiness Checker | Yes (score) | No → **S7-01** | No | No → **S7-04** |
| FAQ Builder | No | No → **S7-03** | No | No → **S7-03** |
| llms.txt Generator | No | No | No | No |
| FAQPage schema (landing) | No | N/A (static) | No | No |
| Org schema (landing) | No | N/A (static) | No | No |
| AEO monitor cron | Yes (scores) | Yes (log file) | No → **S7-02** | No → **S7-02** |
| AEO knowledge base | No | N/A (static docs) | N/A | N/A |
| **Sprint 7 additions** | | | | |
| Scan persistence | Yes (history) | Yes | No | Yes (write failure) |
| Cron health check | Yes (registry diff) | Yes | Yes (Discord) | Yes |
| LLM dependency monitor | Yes (failure rate) | Yes | Yes (banner) | Yes |
| Scanner resilience | Yes (error types) | Yes | No | Yes (classification) |
| Rules engine | Yes (version) | No | No | No |
| Deployment instructions | No | No | No | No |
| Sprint lifecycle | No | N/A (file-based) | N/A | N/A |

**Post-Sprint 7 target:** Every row with user-facing functionality has at minimum: logging + failure detection.

---

## 4. Risk Reduction Targets

| Risk | Status Pre-Sprint 7 | Target Post-Sprint 7 |
|------|---------------------|---------------------|
| Silent automation failure | AEO cron can fail with no alert; healthcheck cron already missing | Cron health check detects missing/failed crons within 24h |
| Dependency opacity | Anthropic failures invisible; demo fallback indistinguishable from real | Failures logged; degraded mode banner visible; failure count in health endpoint |
| Scoring rigidity | 14 rules hardcoded in 403-line file; weight change = full deploy | Rules externalized to config; weight changes without logic changes |
| Governance drift | No sprint state tracking; no enforcement of review before next sprint | Sprint state file; review artifact required; Alexander enforces |
| Data loss | Every scan result discarded after display | Scans persisted; history retrievable; trend visible |

---

## 5. Out of Scope

- New dashboard tools
- New content generators
- Monetization / pricing changes
- UI redesign or theme changes
- Performance optimization
- PDF export (Sprint 8 candidate — depends on S7-01 persistence)
- Multi-user tenancy
- Automated competitive AEO scanning
- DankBot or VitalLens AEO improvements

---

## 6. Definition of Done

Sprint 7 is complete when:

- [ ] No automation runs without logging
- [ ] No external dependency (Anthropic) is unmonitored
- [ ] AEO scores persist over time with history retrieval
- [ ] Cron integrity is verifiable and alerting on failure
- [ ] Sprint lifecycle enforcement is operational
- [ ] All 4 generator routes use the Anthropic wrapper (no raw calls)
- [ ] AEO scanner handles errors gracefully with classification
- [ ] Scoring rules are externalized and versioned
- [ ] Deployment instructions are platform-specific
- [ ] Forensics audit for Sprint 7 committed before Sprint 8 opens

---

## 7. Surface Area Constraint

**Target: Surface area increase ≤ 5 new elements.**

| New Element | Justification |
|-------------|---------------|
| `aeo_scans` Supabase table | Persistence for existing feature (not new surface) |
| `GET /api/ai-readiness/history` | Retrieval endpoint for persisted data |
| `lib/anthropic-client.ts` | Internal wrapper (not user-facing) |
| `lib/aeo-rules.json` | Config extraction (not user-facing) |
| `lib/deployment-instructions.ts` | Template library (not user-facing) |
| `scripts/cron-health.sh` | Internal automation |
| `sprints/SPRINT_STATE.md` | Governance artifact |

**Count: 2 user-facing elements** (history endpoint, platform selector dropdown)
**Count: 5 internal elements** (table, wrapper, config, templates, script)
**Total: 7 new elements — exceeds target by 2.**

**Justification:** 5 of 7 are internal infrastructure with no user-facing surface. The 2 user-facing additions (history endpoint, platform selector) are enhancements to existing pages, not new pages. No new dashboard pages. No new sidebar items. Acceptable given the depth-to-surface ratio.

---

*Created: March 2, 2026*
*Informed by: Sprint 6 Forensics Audit (`sprints/sprint-6-forensics.md`)*
