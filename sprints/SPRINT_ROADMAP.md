# LocalBeacon.ai — Sprint Roadmap

**Source:** Pre-Sprint 8 Analysis (competitive diff, reality check, persona walkthroughs, visual analysis)  
**Created:** 2026-03-03  
**Sprints Planned:** 8 through 12  
**Philosophy:** Fix the lies first, then build the moat, then scale.

---

## The Strategic Arc

```
Sprint 8:  HONESTY          — Fix every false claim, remove fake data, earn trust to charge money
Sprint 9:  AUTOMATION        — GBP auto-posting (if API approved) + real data pipeline
Sprint 10: DIFFERENTIATION   — Double down on AEO moat + content engine superiority
Sprint 11: AGENCY LAYER      — Multi-client, white-label, the features agencies actually pay for
Sprint 12: DISTRIBUTION      — Expo, Show HN, outbound, partnerships, first paying customers
```

**Governing principle:** We don't sell Sprint 11 features on the pricing page until Sprint 11 ships. Every sprint, the website matches reality.

---

## Sprint 8 — HONESTY

*"Stop lying to people before we ask them to pay us."*

**Theme:** Remove every false claim, replace fake social proof, make the website match the product exactly. Also fix the S7 forensics carry-forward gaps.

**Duration:** ~1 day  
**Delegation target:** 30%+ (standalone lib files, copy changes)

### Items

| ID | Item | Priority | Delegatable? | Notes |
|----|------|----------|-------------|-------|
| LB-S8-01 | **Pricing page truth audit** | 🔴 CRITICAL | Yes | Remove from pricing page: "auto-scheduled weekly" (Solo), "monthly visibility report" (Solo), "multi-client dashboard" (Agency), "white-label reports" (Agency), "competitor monitoring & alerts" (Agency), "priority support" (Agency), "3 business locations" (Solo). Replace with what actually exists. Add "Manual posting — auto-publish coming soon" note. |
| LB-S8-02 | **Landing page truth audit** | 🔴 CRITICAL | Yes | Remove/soften: "We handle everything" → "We create everything." Remove "posts to your Google listing every week" → "creates posts for your Google listing every week." Remove "Trusted by local businesses across the US" (zero customers). Soften "Your phone starts ringing" to "Your visibility grows." |
| LB-S8-03 | **Kill fake testimonial** | 🔴 CRITICAL | Yes | Remove "Mike R., Owner, Mike's Plumbing" testimonial entirely. Replace with either: (a) "Be one of our first success stories" CTA, or (b) founder quote from David. The hero dashboard mockup can stay (it's clearly a demo) but the testimonial section must be real or removed. |
| LB-S8-04 | **Overview page — kill mock data** | 🟡 HIGH | Partial | Replace `// TODO: Fetch real data` with real Supabase queries. Show actual content_items count, actual business info, actual recent activity. If user has no data yet, show an empty state with "Generate your first post →" CTA (not fake numbers). |
| LB-S8-05 | **Settings page → Supabase persistence** | 🟡 HIGH | Yes | Settings form currently doesn't save. Wire form fields to `businesses` table in Supabase. This is the foundation for all personalized content generation. |
| LB-S8-06 | **Dead code cleanup** | 🟢 LOW | Yes | Delete `lib/anthropic.ts` (legacy, replaced by `lib/anthropic-client.ts` in S7-03). Verify no imports reference it. |
| LB-S8-07 | **S7 carry-forward: Degraded mode UI banner** | 🟡 HIGH | Yes | When Anthropic API is down (detected by `anthropic-client.ts` failure counter), show a yellow banner: "Some AI features are temporarily unavailable. Content you've already generated is unaffected." |
| LB-S8-08 | **S7 carry-forward: Recreate missing healthcheck crons** | 🟡 HIGH | No | LocalBeacon healthcheck cron `0e239da4` was lost. Recreate it. Also verify Speclint healthcheck cron exists. |
| LB-S8-09 | **S7 carry-forward: Cron staleness detection + Discord alerts** | 🟢 MEDIUM | Yes | Enhance `scripts/cron-health.sh` to detect stale crons (>2x expected interval) and post alerts to Discord `#alerts` channel. |

### Sprint 8 Acceptance Criteria
- [ ] Every feature listed on pricing page exists in the codebase and works
- [ ] Zero fabricated testimonials or social proof
- [ ] Overview dashboard shows real data (or honest empty state)
- [ ] Settings persist to Supabase
- [ ] A stranger could sign up, use the product, and never encounter a promise that doesn't match reality

### Sprint 8 Delegation Plan
- **Delegate:** S8-01 (pricing copy), S8-02 (landing copy), S8-03 (testimonial), S8-06 (dead code), S8-07 (banner component), S8-09 (cron script)
- **Self-execute:** S8-04 (overview Supabase queries), S8-05 (settings persistence), S8-08 (cron recreation)

---

## Sprint 9 — AUTOMATION

*"Make the product do what it says."*

**Theme:** Real data flowing through the system. Auto-posting if GBP API is approved. Monthly report generation. The product should feel alive, not like a content generator with a copy button.

**Prerequisite:** GBP API approval (Case 1-4494000040327). If not approved by Sprint 9, substitute with enhanced manual workflow + email reminders.

**Duration:** ~2 days

### Items

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| LB-S9-01 | **GBP OAuth + auto-posting** (if approved) | 🔴 CRITICAL | Connect Google OAuth → fetch GBP profile → auto-publish posts. This is the #1 feature gap across all 3 personas. If API not approved: build "Post for me" email workflow where we remind users weekly to paste their generated post. |
| LB-S9-02 | **Monthly content summary report** | 🔴 HIGH | Generate a PDF/email report: posts created this month, city pages generated, reviews replied, AI readiness score change. NOT a "visibility report" (we can't track rankings). Honest name: "Monthly Content Summary." |
| LB-S9-03 | **Content scheduling system** | 🟡 HIGH | Queue posts with dates. Even without auto-posting, let users schedule when content is generated. Cron generates content on schedule → notifies user to post. Foundation for auto-posting when API lands. |
| LB-S9-04 | **Review monitoring (manual import)** | 🟡 MEDIUM | Let users paste multiple reviews at once (bulk import). Track review history in Supabase. Show review response rate and average rating over time. Foundation for auto-monitoring when GBP API lands. |
| LB-S9-05 | **Plan limits enforcement** | 🟡 HIGH | Actually enforce: Free = 5 posts/mo + 3 city pages + 1 location. Solo = unlimited posts + 10 pages + 3 locations. Track usage in Supabase. Show usage meters on dashboard. |
| LB-S9-06 | **Pricing page update** | 🟢 LOW | After S9-01 through S9-05 ship, update pricing page to reflect new capabilities. Add back features that now actually work. |

### Sprint 9 Acceptance Criteria
- [ ] Users receive something (email, notification, or auto-post) weekly without logging in
- [ ] Monthly report generates with real data
- [ ] Plan limits are enforced (free users hit walls, upgrade prompts appear)
- [ ] Content scheduling works end-to-end

### Sprint 9 — GBP API Contingency Plan
If GBP API is NOT approved by Sprint 9:
- Build "Weekly Content Reminder" email (Resend.com): generates content, emails user with copy-paste instructions
- Build "Post Queue" view: scheduled content with "Copy to Google" buttons and "Mark as Posted" tracking
- Add "Auto-publish coming soon — we'll post directly to Google once connected" messaging
- This makes the product feel automated even without API access

---

## Sprint 10 — DIFFERENTIATION

*"Nobody else has what we have. Make it impossible to ignore."*

**Theme:** Double down on AEO (our genuine moat). Make the AI Readiness Checker a public free tool. Enhance content generation quality. Build the features BrightLocal doesn't have.

**Duration:** ~2 days

### Items

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| LB-S10-01 | **Public AI Readiness Checker** (no login required) | 🔴 CRITICAL | Move AI Readiness Checker to a public `/check` route. Enter any URL → get a free AEO score. This becomes our top-of-funnel growth engine. BrightLocal has free tools (Search Results Checker, RankFlux) — this is our equivalent. Capture email before showing full results. |
| LB-S10-02 | **Enhanced content generation** | 🟡 HIGH | Upgrade prompts: include actual business details from Settings (service areas, specialties, tone). Currently generators use generic prompts. Personalized content = 10x better output = retention. |
| LB-S10-03 | **AEO recommendations engine** | 🟡 HIGH | After AI Readiness scan, generate specific actionable recommendations with one-click fixes. "Your site is missing FAQ schema → [Generate FAQs Now]". "No llms.txt found → [Create One Now]". Cross-sell between dashboard tools. |
| LB-S10-04 | **Content freshness scoring** | 🟢 MEDIUM | Track when users last generated/posted content. Show freshness indicators: "Last Google post: 12 days ago ⚠️". Drive engagement and return visits. |
| LB-S10-05 | **Competitor AEO comparison** | 🟢 MEDIUM | Enter a competitor URL → compare AI Readiness scores side by side. "You: 72/100. Competitor: 41/100. You're winning on 8/14 signals." Powerful for agencies pitching clients. |
| LB-S10-06 | **Blog + newsletter foundation** | 🟢 LOW | Create `/blog` with 3-5 AEO-focused articles. "What is AEO?", "Why Google Posts Matter", "llms.txt Explained". SEO traffic + thought leadership. Newsletter signup in footer. |

### Sprint 10 Acceptance Criteria
- [ ] Public AI Readiness Checker drives traffic without requiring login
- [ ] Content generation uses actual business data from Settings
- [ ] AEO scan → actionable recommendations → one-click fixes (cross-tool loop)
- [ ] At least 3 blog posts live

---

## Sprint 11 — AGENCY LAYER

*"The features agencies will actually pay $99/month for."*

**Theme:** Multi-client management, white-label reports, the agency dashboard. Only promise these on the pricing page AFTER this sprint ships.

**Duration:** ~3 days

### Items

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| LB-S11-01 | **Multi-client dashboard** | 🔴 CRITICAL | Agency users can add/switch between client businesses. Each client has their own content, settings, AEO history. Sidebar shows client list. This is the Agency plan's core value. |
| LB-S11-02 | **White-label PDF reports** | 🔴 HIGH | Generate branded PDF reports per client: content summary, AEO score, recommendations. Agency uploads their logo → report uses their branding. Monthly auto-generation. |
| LB-S11-03 | **Competitor monitoring** | 🟡 MEDIUM | Track 1-3 competitors per client. Weekly AEO score comparison. Alert when competitor improves. Foundation: reuse AI Readiness scanner on competitor URLs on a schedule. |
| LB-S11-04 | **Client onboarding flow** | 🟡 MEDIUM | Streamlined "Add a client" wizard: business name, address, service areas, Google listing URL. Pre-populate from Google if possible. |
| LB-S11-05 | **Agency pricing page update** | 🟢 LOW | NOW add back: multi-client dashboard, white-label reports, competitor monitoring to Agency plan on pricing page. Because they actually exist. |

### Sprint 11 Acceptance Criteria
- [ ] Agency user can manage 5+ clients from one dashboard
- [ ] PDF report generates with custom branding
- [ ] Competitor AEO tracking runs on schedule
- [ ] Pricing page Agency tier matches reality (again)

---

## Sprint 12 — DISTRIBUTION

*"Get the product in front of people who will pay for it."*

**Theme:** First paying customers. Expo prep. Outreach. Show HN. Every distribution channel we've been building toward.

**Duration:** ~2 days + ongoing

### Items

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| LB-S12-01 | **Ramsey EDA Business Expo** (Apr 25) | 🔴 CRITICAL | Register ($75 non-Ramsey). Finalize booth banner (33"x80"). Print 100 one-pagers. QR codes to public AI Readiness Checker (from S10-01). Demo script for Bob persona. |
| LB-S12-02 | **Show HN post** | 🔴 HIGH | Post the public AI Readiness Checker as a free tool. "Show HN: Free AI Readiness Checker for Local Businesses." AEO angle is HN-friendly (novel, technical, useful). Drive traffic → email capture → conversion. |
| LB-S12-03 | **Agency outreach** | 🟡 HIGH | Direct outreach to 20 web design agencies in MN. Offer free Agency trial. Use LinkedIn + email. Target: 3-5 trial signups. |
| LB-S12-04 | **G2/Capterra listings** | 🟡 MEDIUM | Create profiles on G2 and Capterra. Even empty listings build SEO and credibility. Ask early users for reviews. |
| LB-S12-05 | **Real testimonials** | 🟡 MEDIUM | Get 2-3 real testimonials from expo attendees or trial users. Replace the "Be our first success story" CTA with actual quotes. Photos if possible. |
| LB-S12-06 | **Social media setup** | 🟢 LOW | Create LocalBeacon accounts on LinkedIn (primary for agencies) and X (for Show HN amplification). 2-3 posts/week about AEO, local SEO tips. |
| LB-S12-07 | **AI directory submissions** | 🟢 LOW | Submit to: There's An AI For That, AI Tools Directory, Product Hunt. AEO angle is genuinely novel. |

### Sprint 12 Acceptance Criteria
- [ ] Expo registration complete, materials printed
- [ ] Show HN posted, traffic tracked
- [ ] At least 3 agency trial signups from outreach
- [ ] At least 1 real testimonial on the site

---

## Dependency Map

```
Sprint 8 (Honesty) ──→ Sprint 9 (Automation) ──→ Sprint 10 (Differentiation)
                                                         │
                                                         ├──→ Sprint 11 (Agency Layer)
                                                         │
                                                         └──→ Sprint 12 (Distribution)
                                                              [Expo Apr 25 deadline]
```

- **Sprint 8 has no external dependencies** — can start immediately
- **Sprint 9 depends on GBP API** — has contingency plan if not approved
- **Sprint 10 depends on Sprint 8** (Settings persistence) and **Sprint 9** (content scheduling)
- **Sprint 11 depends on Sprint 10** (AEO scanner reuse for competitor monitoring)
- **Sprint 12 depends on Sprint 10** (public AI Readiness Checker is the distribution hook)
- **Expo deadline (Apr 25) is a hard external constraint** — registration by Apr 10

---

## Revenue Timeline

| Milestone | Sprint | When | Revenue |
|-----------|--------|------|---------|
| Product matches website claims | 8 | Week 1 | $0 (but we can ethically charge) |
| First automation (reports + scheduling) | 9 | Week 1-2 | $0 (but retention mechanism exists) |
| Public free tool drives traffic | 10 | Week 2-3 | First email captures |
| Agency features ship | 11 | Week 3-4 | First agency trial signups |
| Expo + Show HN + outreach | 12 | Apr 25+ | **First paying customers** |

**Conservative target:** 3 paying customers (2 Solo + 1 Agency) = **$197/mo MRR** by end of April.  
**Stretch target:** 10 paying customers = **$590/mo MRR** by end of May.

---

## What We're NOT Building (Intentional Scope Cuts)

| Feature | Why Not |
|---------|---------|
| Rank tracking | Requires SERP API ($$$), not our moat, BrightLocal does it better |
| Citation tracking/building | Requires data partnerships, not our moat |
| Review monitoring (80+ sites) | Requires API integrations we can't afford pre-revenue |
| Google Analytics integration | Nice-to-have, not a buying trigger |
| Mobile app | Web-first, mobile later when revenue justifies |
| API / MCP server | Agent-native layer deferred until paying customers exist |

These are BrightLocal's strengths. We don't compete on their turf. Our moat is **AI content generation + AEO** — features BrightLocal doesn't have and can't easily build.

---

*This roadmap is a living document. Review after each sprint. Adjust based on GBP API status, expo timeline, and customer feedback.*

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
