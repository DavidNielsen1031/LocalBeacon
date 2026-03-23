# LocalBeacon.ai — Product Backlog

**Domain:** localbeacon.ai ✅ | **Stack:** Next.js + Vercel + Stripe + Anthropic + Supabase + Clerk
**Pricing:** Free ($0) | Local Autopilot ($49/mo) | DFY Setup ($499 one-time)
**GitHub:** DavidNielsen1031/LocalBeacon | **Vercel:** localbeacon-ai

---

## Current State (as of Sprint 28, Mar 22 2026)

**Users:** Zero. **Revenue:** Zero. **Checkout:** Fixed tonight (was broken 22 days).

The product is feature-complete for an MVP — 14 dashboard tools, 8 Vercel crons, scan-first funnel, personalized plan cards, Stripe checkout. The gap is **distribution**, not features.

---

## Product Objectives (Problem-Oriented)

- **First paying customer within 60 days of expo (by Jun 24)**
  - KR1: 6 evangelist conversations by Expo day (Apr 25)
  - KR2: 3 complete the onboarding flow
  - KR3: 1 converts to paid plan

- **Validate the AEO value prop with real SMBs**
  - KR1: AI Readiness score improves after 30 days on Autopilot
  - KR2: 1 business cited in an AI assistant answer
  - KR3: "AI search visibility" cited as buying reason by 2+ users

- **Expo is our first GTM event** (Apr 25, Ramsey EDA)
  - KR1: Booth materials printed and tested
  - KR2: 20+ scans from live prospects
  - KR3: 5+ email sign-ups from expo

---

## ✅ What's Built (Sprints 1-27)

**Core Product:**
- AI Readiness Scanner (21 signals, score 0-100, competitor comparison)
- Google Post Generator (4 types, AI-powered)
- City Page Builder (service area pages)
- Review Response Drafter (5-star levels, save + copy)
- Schema Markup Generator (JSON-LD)
- FAQ Builder, Blog Generator, AI Index, llms.txt Generator
- Competitor comparison tool
- Content queue (draft → scheduled → published)
- Reports dashboard

**Automation Crons (Vercel):**
- Weekly Google posts (Mon)
- Weekly blog posts (Wed)
- Weekly AI Readiness scans (Sun)
- Weekly visibility monitor — all 21 signals (Mon)
- Monthly city page generation (1st)
- Monthly progress reports (1st)
- Weekly review response nudge (Fri)
- Daily checkout health check (daily)

**Infrastructure:**
- Clerk auth (live keys, Google OAuth)
- Stripe checkout (Solo $49/mo + DFY $499, webhook → Supabase plan sync)
- Supabase (users, businesses, content_items, aeo_scans, leads)
- Resend email (AEO reports, weekly content, nudges)
- 60+ industry landing pages (/for/plumbers, /for/hvac, etc.)
- Blog engine with auto-generation
- GSC OAuth integration

**Funnel:**
- Scan-first: every CTA → /check → scan → personalized plan cards → Stripe checkout
- Pre-auth checkout (pay before sign-up, claimed after)
- AEO report emailed after scan (lead capture)

---

## 🏃 Active Sprint

### Sprint 28 — Revenue Readiness (Mar 22)
See `sprints/sprint-28-specs.md`

### Sprint 29 — Trust & Social Proof (planned)
- Social proof on landing page
- Dashboard preview for free users
- Mobile funnel test
- About Us page

### Sprint 30 — Expo & Outbound (planned, Apr)
- Expo booth materials (banner, one-pager, QR tracking)
- Demo script (scan prospect's site live)
- LinkedIn outbound (20 MN web designers)
- Reddit/Facebook seeding
- GSC sitemap verification

### Sprint 31 — Post-Expo Learning (after Apr 25)
- Expo debrief
- Follow up with leads
- Implement top feedback items
- Signal difficulty badges (GH #12) — if validated by expo feedback
- First customer success story

---

## 📋 Backlog (Prioritized by Revenue Impact)

**P0 — Revenue Blockers**
- [ ] Expo vendor registration (deadline Apr 10) — GH #10
- [ ] Outbound pipeline research — GH #9
- [ ] Directory submissions — GH #8

**P1 — Trust & Conversion**
- [ ] Signal difficulty badges (GH #12) — post-expo validation
- [ ] Free trial (7-day, no CC) — if expo conversations confirm need
- [ ] Customer testimonials / case studies
- [ ] "About Us" page with real founder info

**P2 — Product Enhancement (ONLY after paying customers validate)**
- [ ] GBP API integration (pending Google approval, Case 1-4494000040327)
- [ ] GBP auto-posting (blocked on API)
- [ ] Multi-location management
- [ ] White-label reports
- [ ] Review velocity monitor
- [ ] "Near me" keyword rank tracker

**Parking Lot:**
- Google OAuth onboarding (needs GBP API)
- Agent-native layer (openapi.yaml, MCP server)
- GSC deep integration

---

## 💰 Revenue Model

- **Free:** $0 — 1 scan/mo, 5 posts/mo, 3 review drafts/mo, schema preview
- **Local Autopilot:** $49/mo — unlimited scans, weekly posts, city pages, blog, monitoring
- **DFY Setup:** $499 one-time — 30-min call, full audit, custom FAQs, schema install, 1 month Autopilot

**Stripe Price IDs:**
- Solo: `price_1T6LhxB0OqzCjZpvnGc84VN7` ($49/mo recurring)
- DFY: `price_1TCRxpB0OqzCjZpvVebA66dn` ($499/mo recurring — used in subscription mode)

---

## 🧠 Key Decisions (Locked)

- No new features until paying customers validate existing ones
- Scan-first funnel (every CTA → /check)
- Pre-auth Stripe checkout (pay before signing up)
- Labels update AFTER features ship (no aspirational labeling)
- "What and where, not how" for delegation specs
- Anti-spam by design (unique signals per page)
- Agency tier REMOVED — only Free / Autopilot / DFY

---

*Updated: Mar 22, 2026 (Sprint 28)*
