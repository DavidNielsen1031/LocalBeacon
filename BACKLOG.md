# LocalBeacon.ai — Product Backlog

**Domain:** localbeacon.ai ✅
**Stack:** Next.js + Vercel + Stripe + Anthropic + Supabase + GBP API
**Pricing:** Free | Solo $29/mo | Agency $79/mo
**GitHub:** DavidNielsen1031/LocalBeacon
**Vercel:** localbeacon-ai

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

## 🏃 Now — Sprint 4: Polish & Credibility

### LB-S4-01 · Supabase Migration ✅
- [x] Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor
- [x] 4 tables created: users, businesses, content_items, reviews
- [x] Vercel env vars updated with real keys
- [ ] Test end-to-end: sign up → create business → generate post → saved in DB

### LB-S4-02 · Email Setup Complete ✅
- [x] MX records added
- [x] Gmail activated for david@localbeacon.ai
- [x] Aliases: hello@, support@ configured
- [x] SPF/DKIM/DMARC verified

### LB-S4-03 · Privacy Policy + Terms of Service ✅
- [x] Create /privacy and /terms pages
- [ ] Cover: data collection, GBP OAuth scope, AI content generation, Stripe billing
- [ ] Link from footer on all pages
- [ ] Required before any real user signups

### LB-S4-04 · Healthcheck Cron ✅
- [x] `localbeacon-healthcheck` cron: 7am/1pm/7pm CST, Ollama
- [x] Checks: site 200, /api/health 200, /pricing 200, /llms.txt 200
- [x] Alerts to #localbeacon-ai Discord on failure

### LB-S4-05 · Reviews + City Pages UX Polish ✅
- [x] Reviews page: 3 demo responses pre-populated (never blank)
- [x] City Pages: 2 demo cities, jargon removed ("City Pages", "Optimized for local search")

### LB-S4-06 · SEO & Discoverability Basics ✅
- [x] Meta tags: og:title, og:description, twitter card, canonical, keywords
- [x] /robots.txt (blocks /api/ and /dashboard/)
- [x] /sitemap.xml (4 pages)
- [x] /llms.txt (agent-native layer)
- [ ] Submit sitemap to Google Search Console (next session)

### LB-S4-07 · QR Code + Tracking for Expo
- [ ] Generate QR code pointing to localbeacon.ai?ref=ramsey-expo-2026
- [ ] Add ref tracking to signup flow (store in user metadata)
- [ ] Print QR code for one-pager and booth banner

---

## 🏃 Now — Sprint 5: Make It Real

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
