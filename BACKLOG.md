# LocalBeacon.ai — Product Backlog

**Domain:** localbeacon.ai ✅
**Stack:** Next.js + Vercel + Stripe + Anthropic + Supabase + GBP API
**Pricing:** Free | Solo $49/mo | Agency $99/mo
**GitHub:** DavidNielsen1031/LocalBeacon
**Vercel:** localbeacon-ai

---

## Product Objectives (Problem-Oriented)

> Framing: SVPG-style outcome objectives. Features ladder up to these. Measure results, not output.

| Objective | Key Results | Status |
|-----------|------------|--------|
| **Agencies save ≥5 hrs/week managing local visibility for their clients** | KR1: 3 agency evangelists confirm time savings in interviews · KR2: Average session time >10 min (engaged, not bouncing) · KR3: 1 agency uses dashboard for ≥3 clients | 🔴 Not started — need customer discovery |
| **SMBs become findable by AI assistants (AEO)** | KR1: AI Readiness score improves after using tools · KR2: 1 business appears in ChatGPT/Perplexity answer after optimization · KR3: "AI Readiness" is cited as buying reason by 2+ users | 🔴 Not validated |
| **First paying customer within 60 days of evangelist recruitment** | KR1: 6 evangelists recruited · KR2: 3 complete the onboarding flow · KR3: 1 converts to Solo or Agency plan | 🔴 Not started |
| **LocalBeacon is the go-to tool for local AEO** | KR1: Top 3 Google result for "AI readiness checker local business" · KR2: Listed in 3+ AI/marketing directories · KR3: 1 inbound referral from an existing user | 🔴 Not started |

---

## ✅ Completed

### Sprint 1 — Foundation (Done Feb 28)
- [x] LB-001: Infrastructure (GitHub, Vercel, DNS, Supabase, Stripe, Upstash Redis, Anthropic key)
- [x] LB-003: Next.js scaffold (Clerk auth, Tailwind, shadcn/ui, 17 routes)
- [x] Landing page + pricing + auth + dashboard skeleton deployed

### Sprint 2 — Core Product (Done Mar 1)
- [x] LB-004: Onboarding flow (4-step: business info → service areas → plan → first post)
- [x] LB-005: GBP post generator (4 types, AI-powered via claude-haiku-4-5, mock fallback)
- [x] LB-006: Service area page builder (city cards, HTML copy, preview)
- [x] LB-007: Review response drafter (5 star levels, tone-matched)
- [x] LB-008: Dashboard MVP (overview, activity feed, plan usage)
- [x] Stripe products created (Solo $29, Agency $79)
- [x] All env vars deployed to Vercel

### Sprint 3 — UX Redesign (Done Mar 1)
- [x] Landing page redesign (outcome-led, before/after, FAQ, zero jargon)
- [x] Pricing page redesign (competitive comparison, dedicated /pricing route)
- [x] Dashboard redesign (never blank, activity feed, setup CTA, contextual stats)
- [x] Auto-post pipeline (queue view, Draft→Scheduled→Published, inline edit, approve flow)
- [x] GBP API application submitted (Case 1-4494000040327, GCP Project localbeacon #667608435377)
- [x] GCP project created for LocalBeacon
- [x] Google Workspace created (david@localbeacon.ai)

---

### Sprint 4 — Polish & Credibility (Done Mar 2)
- [x] LB-S4-01: Supabase Migration (tables created, env vars updated)
- [x] LB-S4-02: Email Setup (MX, Gmail, aliases, SPF/DKIM/DMARC)
- [x] LB-S4-03: Privacy Policy + Terms pages created
- [x] LB-S4-04: Healthcheck Cron (7am/1pm/7pm CST)
- [x] LB-S4-05: Reviews + City Pages UX Polish
- [x] LB-S4-06: SEO & Discoverability Basics (meta tags, robots.txt, sitemap, llms.txt)
- *Carried to Sprint 5:* LB-S4-01 e2e test, LB-S4-03 content coverage, LB-S4-06 GSC submission, LB-S4-07 QR/Expo tracking

---

## 🏃 Now — Sprint 5: Make It Real

*Active Sprint: See GitHub Milestone "Sprint 5 — Make It Real"*

### Carried from Sprint 4
- [ ] Test end-to-end: sign up → create business → generate post → saved in DB (from LB-S4-01)
- [ ] Privacy policy content: data collection, GBP OAuth scope, AI content generation, Stripe billing + footer links (from LB-S4-03)
- [ ] Submit sitemap to Google Search Console (from LB-S4-06)
- [ ] QR Code + Tracking for Expo (from LB-S4-07)

### LB-S5-01 · End-to-End Flow Test
- [ ] Sign up → create business → generate post → verify saved in Supabase
- [ ] Fix any broken connections between Clerk auth, Supabase, and API routes
- [ ] Verify service_role key works for server-side DB operations

### LB-S5-02 · Stripe Checkout Integration
- [ ] Wire Solo upgrade button to Stripe checkout ($49/mo)
- [ ] Wire Agency upgrade to Stripe checkout ($99/mo)
- [ ] Handle successful payment → update user plan in Supabase
- [ ] Stripe webhook: subscription created/cancelled → plan sync

### LB-S5-03 · Blog Post Generator (LB-017)
- [ ] New dashboard page: /dashboard/blog
- [ ] AI generates 1 blog post/month per location
- [ ] Locally customized: neighborhoods, landmarks, city names
- [ ] FAQ section with schema markup
- [ ] Export to HTML (copy/paste into WordPress/Squarespace/Wix)
- [ ] Available on Solo ($49) and Agency ($99)

### LB-S5-04 · GBP Audit Score (LB-018)
- [ ] New dashboard widget: "Google Listing Health Score: 62/100"
- [ ] Checklist: photos, hours, description, categories, products, Q&A
- [ ] Manual input for now (user checks boxes), auto-scan after GBP API
- [ ] Drives return visits and engagement

### LB-S5-05 · Schema Markup Generator (LB-019)
- [ ] New dashboard page or section: /dashboard/schema
- [ ] Generates LocalBusiness, Service, FAQ JSON-LD from business info
- [ ] One `<script>` tag user copies into site footer
- [ ] Preview what Google will see
- [ ] Available on Solo+

---

## 📋 Next — Backlog (Prioritized)

### High Priority
- [ ] **Expo Vendor Registration** — Register for Ramsey EDA Business Expo (Apr 25). ST19 form + $75 check. Deadline: Apr 10. Booth plan: `expo/BOOTH-PLAN.md`
- [ ] **Booth Banner Design** — 33"x80" retractable banner for expo. Black/gold, QR code, tagline.
- [ ] **One-Pager Finalize** — Print-ready PDF from `expo/one-pager.html`. 100 copies on cardstock.

### Medium Priority
- [ ] LB-009: Multi-client management (Agency dashboard)
- [ ] LB-010: White-label reports
- [ ] LB-017: Monthly local blog post (AEO-optimized)
- [ ] LB-018: GBP audit score (0-100 completeness check)
- [ ] LB-019: Schema markup generator (JSON-LD)
- [ ] LB-011: Competitor gap alerts
- [ ] Price evaluation: $29 → $39? Competitive analysis says underpriced.

### Lower Priority
- [ ] LB-020: Review velocity monitor
- [ ] LB-021: Competitor pulse
- [ ] LB-022: "Near me" keyword rank tracker
- [ ] LB-013: Google Search Console integration
- [ ] LB-014: Citation/NAP audit
- [ ] LB-015: Agent-native layer (openapi.yaml, MCP server)

---

## 🅿️ Parking Lot

- **Google OAuth Onboarding (Sprint 3 Spec 4)** — Blocked on GBP API approval. Case `1-4494000040327`. Will unblock automatically when Google approves. ~2-4 weeks from Mar 1.
- **GBP Auto-Posting (LB-012)** — Same blocker. Once API is approved, this becomes top priority.
- **Automated email (Resend.com)** — Deferred, not needed pre-launch.

---

## 💰 Revenue Model (Updated Mar 1 — price increase)

| Plan | Price | Limits | Target |
|------|-------|--------|--------|
| Free | $0 | 1 location, 5 posts/mo, 3 pages | Try before buy |
| Solo | **$49/mo** | 3 locations, unlimited posts, 10 city pages | DIY business owners |
| Agency | **$99/mo** | Unlimited everything, white-label, multi-client | Web designers/freelancers |

**Stripe Price IDs (current):**
- Solo: `price_1T6LhxB0OqzCjZpvnGc84VN7` ($49/mo)
- Agency: `price_1T6LhxB0OqzCjZpvcNk2NQUO` ($99/mo)
- Old $29/$79 prices: ARCHIVED

---

## 🎨 Design System

- **Canonical doc:** `design-system/SKILL.md` (created Mar 4, 2026)
- **Delegation rule:** All standalone UI pages (new dashboard tools, landing sections) are mandatory delegation candidates. Spawn sub-agent with design system skill + spec.
- **Minimum delegation target:** 2 UI tasks per sprint delegated to sub-agents

## 🧠 Key Decisions (Locked)

- Distribution wedge: agencies first, not direct SMB
- Manual-paste MVP, auto-post after GBP API approval
- Accounts required from day 1
- One Stripe account (Perpetual Agility LLC)
- Anti-spam by design (unique signals per page)
- "Bob test" for all UI copy — zero jargon
- CTA always "Connect Your Google Listing"
- Dashboard must never be blank

---

*Created: Feb 28, 2026 | Updated: Mar 1, 2026*
