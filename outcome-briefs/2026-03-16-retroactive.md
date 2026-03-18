# Outcome Brief — LocalBeacon.ai (Retroactive)

*Date: 2026-03-16 | Author: Alexander | Stage: Post-Launch / Validate gate*

> **Retroactive context:** LocalBeacon.ai shipped March 7, 2026. This brief is written 9 days post-launch with zero paying customers. The product is live, the tools work, the pricing is set. The question is no longer "should we build this?" — it's "are the behavioral bets holding up, and what's the fastest way to find out?"

---

## Q1: What behavior change is this product betting on?

*The product has two distinct user types with distinct behavioral bets. Both must be tested.*

**Bet A — Agencies (primary distribution wedge):**

1. **Agencies will replace manual copy-paste workflows with LocalBeacon's AI tools to save time** — We believe freelancers and web designers currently hand-write GBP posts, review responses, and service area pages (or ignore them). LocalBeacon collapses that to minutes. The time savings (≥5 hrs/week) is the purchase justification. *Why we believe:* Agency plan is priced at $99/mo — that's ~3 hours of billable time. If an agency manages 5+ clients, that math works on day one.

2. **Agencies will use LocalBeacon as a client-retention tool, not just a production tool** — White-label reports and multi-client dashboard = something to show clients. This makes LocalBeacon sticky beyond the first month. *Why we believe:* Agencies don't churn tools they've shown to clients — switching cost is social, not just functional.

3. **Agencies at local events (e.g., Ramsey EDA expo) are accessible and decision-ready** — They're not enterprise. A 5-minute demo closes them. *Why we believe:* Small agency owners attend business expos *because* they're shopping for tools.

**Bet B — SMBs (secondary, AEO angle):**

4. **SMBs believe AI assistants (ChatGPT, Perplexity) affect their customer discovery** — If they don't believe this, "AI readiness" is meaningless. They'll only pay if they fear missing out on AI-referred customers. *Why we believe:* AEO anxiety is real but unevenly distributed — restaurant owners hear about it less than e-commerce folks. This is the riskiest assumption.

5. **SMBs will act on an AI Readiness score as a concrete improvement lever** — A score of "42/100 — you're missing schema markup and local citations" feels actionable in a way "improve your SEO" does not. *Why we believe:* Gamification of compliance works (GBP completeness scores, SEO audit tools).

**Primary bet:** **Bet A #1** — Agencies will adopt LocalBeacon as a production tool because it saves billable time. If this doesn't hold, no pricing tier works. The SMB AEO angle is real but longer-cycle.

---

## Q2: What must be true for this to work? (Kill Condition)

*For the primary bet (agencies saving time with LocalBeacon):*

- **Must be true:** Agency owners/freelancers are currently doing GBP/local SEO tasks manually or not at all (not already using a competing tool like BrightLocal, Whitespark, or Vendasta)
- **Must be true:** The output quality of LocalBeacon's AI tools is good enough that the agency would actually send it to a client (or close to it — one edit away)
- **Must be true:** $99/mo is below the agency's pain threshold for the time it replaces (~3 hrs billable time)
- **Must be true:** The GBP API blocker doesn't kill the value prop before we get to demo — manual paste is enough for early adopters
- **Must be true:** Local agencies and SMBs in David's network/geography (Twin Cities → broader MN → national) are actively managing Google Business Profiles

**Kill condition:** 5 agencies all use competing tools AND LocalBeacon output doesn't beat them → kill agency-first, pivot to direct SMB.

*Evidence:* None — no customer interviews yet. Shipped before discovery. Q3 experiment closes this gap.

---

## Q3: What's the cheapest experiment to test the primary bet?

**Experiment: The 6-Evangelist Concierge Test**

*This was already planned (recruit 6 evangelists). Reframe it as a structured behavioral experiment, not just outreach.*

- **What we'll do:**
  1. Identify 6 local business owners or freelance marketing agencies in David's existing network (LinkedIn, Turnberry connections, church, neighborhood). Target mix: 2 marketing freelancers/agencies, 2 local service businesses (plumber, HVAC, restaurant), 2 wild cards.
  2. Offer a 30-day free Agency account + 1 live setup call (30 min, concierge). No pitching — just "I built this, help me make it better."
  3. During setup call: watch them use the GBP post generator and review response drafter live. Note where they hesitate, edit, or ask questions. That's the product map.
  4. At day 14: one-question check-in: "Have you used LocalBeacon for a real client yet? If not, what got in the way?"
  5. At day 30: 15-min debrief. Three questions: (a) Did it save you time? (b) Would you pay $49 or $99/mo for this? (c) Who else should I talk to?

- **Duration:** 14 days to recruit + 30 days of observation = 44 days. First signal at day 14.
- **Cost:** $0 (free accounts) + ~6 hours of David's time
**Go signal:** 3+ of 6 use it for a real client, 2+ say "this saved me time" unprompted, 1+ refers someone.
**Kill signal:** 0 of 6 use it for a real client, or output quality feedback is "I rewrote everything."

**Fast signal (this week):** Post in 2 Facebook groups — "Who manages GBPs for clients?" No link. 5+ replies = demand confirmed.

---

## Q4: How will we measure success? (Three tiers)

**Leading (Week 1-2 — can measure now):**
- Metric: Evangelist recruitment rate (# of "yes, I'll try it" responses / outreach attempts)
- Target: 6 evangelists recruited from ≤20 outreach attempts (30% conversion)
- Tool: Manual tracking (DM thread, spreadsheet, or `products/localbeacon/evangelists.md`)

**Mid (Month 1 — first 30 days post-evangelist onboarding):**
- Metric: Activation rate — evangelists who used a tool for a real client ≥1 time
- Target: 3 of 6 (50%)
- Tool: Supabase query on `posts` and `pages` tables — filter by evangelist user IDs, check `created_at` vs onboarding date
- Bonus metric: Avg session duration >10 min (per backlog KR2) — check Vercel Analytics

**Lagging (Day 60 — 60 days after evangelists onboard):**
- Metric: Paid conversion — evangelists or their referrals who convert to Solo or Agency plan
- Target: 1 paying customer (first dollar validates the model)
- Tool: Stripe dashboard — filter by `created` date
- Secondary: Organic signups from 60 industry pages (pSEO) — Supabase `users` table, filter `source = organic`

---

## Verdict

**TEST FIRST.** Pause Sprint 5 features until evangelist experiment returns signal.

**This week:** Fix Clerk DNS → evangelist outreach → Facebook group post → verify e2e flow → register Ramsey EDA expo (deadline Apr 10).

---

## Notes

- **Lead with time savings**, not AEO — AEO is the premium hook, not the door opener.
- **pSEO is a slow burn** — 90-180 days to compound. Q2 revenue comes from outbound, not organic.
- **Ramsey EDA expo (Apr 25)** = forcing function for clean demo + 1 user story.
- **Related:** `products/localbeacon/BACKLOG.md` · `expo/BOOTH-PLAN.md` (planned)

---

*Template version 1.0 — Based on Nicolas Liatti's 4-question behavioral validation framework.*
*Retroactive brief — product shipped 2026-03-07, brief written 2026-03-16.*
*Related: [[LocalBeacon BACKLOG]] · [[PRODUCT_LIFECYCLE]] · [[Sprint OS]]*
