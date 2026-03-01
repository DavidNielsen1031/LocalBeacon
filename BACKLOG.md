# LocalBeacon.ai — Product Backlog & Go-Live Plan

**Tagline:** "More calls. Less work. LocalBeacon handles your local visibility so you don't have to."
**Domain:** localbeacon.ai ✅ (registered Feb 28, 2026)
**Logo:** V4 (dramatic black/lighthouse/yellow beacon) ✅
**Stack:** Next.js + Vercel + Stripe + Anthropic + Google Business Profile API
**Pricing:** Free | Solo $29/mo | Agency $79/mo

---

## 🎯 Product Vision

LocalBeacon is a **Local Visibility Engine** — not a content generator. It runs automatically so the business owner never has to think about SEO.

**The 5 outcomes we sell (in customer language):**
1. **More calls from Google Maps** — weekly GBP posts keep you at the top of the map
2. **More calls from "near me" searches** — local pages for every neighborhood you serve
3. **More calls from AI assistants** — when someone asks ChatGPT "best plumber near me," you show up
4. **More 5-star reviews working for you** — we reply to every review so Google knows you're active
5. **Know exactly what's working** — monthly report shows how many people found you and where

**The mechanism (invisible to customers):**
- Weekly AI-written GBP posts (auto-scheduled + published)
- AI service area page builder (city/neighborhood landing pages)
- Review response drafting (AI drafts, 1-click publish)
- Monthly local blog post (AEO-optimized for AI search citations)
- GBP audit score + weekly health check
- Schema markup generator (LocalBusiness, FAQ, Service)
- Review velocity monitoring + competitor pulse
- "Near me" keyword rank tracker
- Monthly visibility report (proves ROI, drives retention)

**Go-to-market:** B2B2B — sell to web designers/marketing freelancers managing 10-50 SMB clients (Agency $79/mo, white-label), NOT direct to plumbers.

---

## 📋 Milestones

### ✅ DONE
- [x] Deep competitive research + red team analysis
- [x] Product pivot: content generator → visibility engine
- [x] Domain registered: localbeacon.ai
- [x] Logo direction selected (V4)
- [x] Channel renamed: #localbeacon-ai
- [x] Google Workspace planned (hello@, support@, david@)

---

## 🏃 Now — Sprint 1: Foundation (Target: Week 1-2)

### LB-001 · Infrastructure Setup
- [ ] Google Workspace activated + DNS verified on GoDaddy
- [ ] Email addresses created: hello@, support@, david@localbeacon.ai
- [x] GitHub repo created: `DavidNielsen1031/LocalBeacon`
- [x] Vercel project created, linked to repo
- [x] Domain DNS pointed: localbeacon.ai → Vercel
- [ ] Upstash Redis provisioned (session/queue management)
- [ ] Stripe account configured: Free / Solo $29 / Agency $79 products
- [ ] Anthropic API key provisioned (separate from Alexander's key)

### LB-002 · GBP API Application
- [ ] Apply for Google Business Profile API access (agency platform application)
- [ ] Document use case: automated posting on behalf of authorized clients
- [ ] Set up OAuth 2.0 flow for client GBP authorization
- [ ] Test posting to a personal GBP account
- **Note:** Approval takes 2-4 weeks. MVP can ship with manual-paste mode while awaiting approval.

### LB-003 · Next.js App Scaffold
- [ ] Init Next.js app with Tailwind + shadcn/ui
- [ ] Auth: NextAuth or Clerk (user accounts required — no accounts = data loss)
- [ ] Database: Supabase (user data, client profiles, generated content)
- [ ] Stripe webhook handler
- [ ] Deploy to Vercel, verify CI/CD pipeline
- [ ] Domain live: https://localbeacon.ai

---

## 🏃 Now — Sprint 2: Core Product (Target: Week 2-4)

### LB-004 · Onboarding Flow
- [ ] Sign up / sign in
- [ ] Connect Google Business Profile (OAuth)
- [ ] Business profile setup: name, category, service areas, primary city
- [ ] Plan selection + Stripe checkout
- [ ] Welcome email (via hello@localbeacon.ai)

### LB-005 · GBP Post Generator (Core Feature)
- [ ] AI generates 4 weekly GBP posts per business (1/week)
- [ ] Post types: What's New, Offer, Event, Product
- [ ] User reviews + approves OR auto-posts (toggle)
- [ ] Scheduling queue: posts go out Mon/Wed/Fri/Sun
- [ ] Manual paste mode (while awaiting GBP API approval)
- [ ] Auto-post mode (post-API-approval)

### LB-006 · Service Area Page Builder
- [ ] Input: business type, primary city, target service areas (up to 10 for Solo, unlimited for Agency)
- [ ] Output: SEO-optimized landing page copy for each city/neighborhood
- [ ] Includes: H1, meta description, body copy, FAQs, schema markup suggestions
- [ ] Export: copy to clipboard, PDF export (Solo+)
- [ ] Anti-spam safeguards: unique signals per page, NOT cloned content

### LB-007 · Review Response Drafter
- [ ] Connect to GBP reviews feed
- [ ] AI drafts response for each new review (tone: professional/warm)
- [ ] 1-click publish to GBP or edit before posting
- [ ] Templates for 5-star, 4-star, negative review scenarios

### LB-008 · Dashboard MVP
- [ ] Overview: GBP posts scheduled, pages generated, reviews pending
- [ ] Activity feed: what LocalBeacon did this week
- [ ] Simple monthly rank snapshot (manual entry or GSC integration v2)
- [ ] Plan usage meter (Free: shows limits, Solo/Agency: shows activity)

---

## 📅 Next — Sprint 3: Agency Layer (Target: Week 4-6)

### LB-009 · Multi-Client Management
- [ ] Agency dashboard: list of all client accounts
- [ ] Add/remove clients
- [ ] Per-client GBP connection
- [ ] Bulk content generation across all clients

### LB-010 · White-Label Reports
- [ ] Monthly PDF report: posts published, reviews responded, pages created
- [ ] Agency branding: upload logo, set company name
- [ ] Auto-send to client email on 1st of month
- [ ] "Powered by LocalBeacon" optional footer (free) vs hidden (Agency)

### LB-011 · Competitor Gap Alerts
- [ ] Weekly scan: compare client GBP post frequency vs top 3 competitors
- [ ] Alert: "Your competitor posted 3 times this week. You posted 1."
- [ ] Opportunity detection: keywords competitors rank for that client doesn't

---

## 📅 Next — Sprint 3.5: Beefed-Up Offering (Added Mar 1, 2026)

### LB-017 · Monthly Local Blog Post (AEO-Optimized)
- [ ] AI generates 1 blog post/month per location (not daily — quality over quantity)
- [ ] Locally customized: neighborhoods, landmarks, service radius, real city names
- [ ] AEO-structured: answer capsules after every H2, FAQ schema, owned insights framing
- [ ] Targets "best [service] in [city]" + "near me" keywords
- [ ] Export to HTML (paste into WordPress/Squarespace/Wix)
- [ ] Available on Solo ($29) and Agency ($79)

### LB-018 · GBP Audit Score
- [ ] On signup + weekly: auto-scan GBP for completeness
- [ ] Score: 0-100 with specific missing items (photos, holiday hours, products, Q&A)
- [ ] To-do list format: "Add 8 more photos to reach top 10% in your category"
- [ ] Drives ongoing engagement and login frequency

### LB-019 · Schema Markup Generator
- [ ] Generates LocalBusiness, Service, FAQ, and Review schema (JSON-LD)
- [ ] Customer copies one `<script>` tag, pastes into site footer
- [ ] Massive perceived value vs. agency ($500+ to install manually)
- [ ] Available on Solo+

### LB-020 · Review Velocity Monitor
- [ ] Shows: "You have 47 reviews. Top competitor has 89."
- [ ] Calculates months to catch up at current velocity
- [ ] One-click "request review" email template for customers to send
- [ ] Available on Agency

### LB-021 · Competitor Pulse
- [ ] Weekly: "Your top competitor posted 4x to GBP this week. You posted 1x."
- [ ] Creates urgency, drives logins, justifies subscription
- [ ] Shows competitor review count, photo count, last post date
- [ ] Available on Agency

### LB-022 · "Near Me" Keyword Rank Tracker
- [ ] Monthly snapshot: where they rank for "[service] near me" + "[service] in [city]"
- [ ] Simple visual (up/down arrows, position number)
- [ ] The #1 thing agencies use to justify retainers — we need this for retention
- [ ] Available on Solo+

## 🔮 Later — Sprint 4: Growth & Retention (Target: Month 2+)

### LB-012 · Auto-Posting (GBP API Live)
- [ ] Full GBP API auto-scheduling once approved
- [ ] No manual approval required (optional toggle)
- [ ] Post performance tracking (views, clicks from GBP insights)

### LB-013 · Rank Tracking Integration
- [ ] Google Search Console OAuth integration
- [ ] Monthly local keyword rank snapshot
- [ ] "You moved up 3 positions for 'plumber in [City]'" notifications

### LB-014 · Citation Audit
- [ ] Basic NAP consistency check (Name, Address, Phone)
- [ ] Top 20 directory scan
- [ ] Fix recommendations

### LB-015 · Agent-Native Layer
- [ ] llms.txt
- [ ] openapi.yaml
- [ ] MCP server (localbeacon-mcp on npm)

### LB-016 · Healthcheck Cron
- [ ] Daily: verify GBP API connection live
- [ ] Daily: verify Stripe webhooks firing
- [ ] Alert to #localbeacon-ai Discord on any failure

---

## 💰 Revenue Model

| Plan | Price | Limits | Target |
|------|-------|--------|--------|
| Free | $0 | 1 location, 5 posts/mo, 3 pages | Try before buy |
| Solo | $29/mo | 3 locations, unlimited posts, PDF export | DIY hustlers |
| Agency | $79/mo | Unlimited locations, white-label, multi-client | Web designers/freelancers |

**Break-even math:**
- 10 Agency customers = $790/mo (covers ops + Anthropic API)
- 50 Solo customers = $1,450/mo
- Target Month 3: 5 Agency + 20 Solo = $975/mo

---

## 🚀 Go-Live Checklist

- [ ] localbeacon.ai live on Vercel ✅ DNS
- [ ] Google Workspace email live
- [ ] Stripe payments tested (all 3 plans)
- [ ] GBP OAuth flow working (at least manual-paste mode)
- [ ] Core features: post generator + page builder + review drafter
- [ ] Dashboard functional
- [ ] Onboarding flow: sign up → connect GBP → first post generated < 5 min
- [ ] Privacy policy + Terms of Service pages
- [ ] /pricing page live
- [ ] llms.txt + basic SEO meta
- [ ] Healthcheck cron running
- [ ] 1 real beta user (web designer) onboarded before public launch

---

## 📁 Files

- Logo: `products/localbeacon/2026-02-28-logo-v4-dramatic.png`
- Research: stored in Discord #localbeacon-ai channel history
- This backlog: `products/localbeacon/BACKLOG.md`

---

## 🧠 Key Decisions (Locked)

- **No "grooming" language anywhere** — always "refine/refinement"
- **Distribution wedge: agencies first, not direct SMB**
- **Manual-paste MVP** then auto-post after GBP API approval
- **Accounts required from day 1** — no anonymous usage (data loss risk)
- **One Stripe account** (Perpetual Agility LLC) — same as Refine Backlog
- **Anti-spam by design** — unique signals per page, human review toggle

---

*Created: February 28, 2026 | Stack: Next.js + Vercel + Stripe + Anthropic + Supabase + GBP API*
