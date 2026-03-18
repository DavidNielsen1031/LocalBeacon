# Sprint 13 Persona Feedback — "Outbound Engine"

**Product:** LocalBeacon.ai
**Date:** 2026-03-18
**Run by:** Alexander (post-sprint, retroactive)
**Note:** Personas were NOT run during the sprint (process violation). This is a retroactive review.

---

## 🔍 Teresa (Discovery) — "You automated before you validated"

**Core challenge:** Sprint 13 built a full outbound engine (CRM, PDF, prospecting, cold email, Stripe) — but LocalBeacon has 0 paying customers and 0 validated demand. We automated a hypothesis that has never been tested in a single real conversation.

**Concern #1: Cold email is terrible as a FIRST channel for SMBs.**
- B2B cold email to SMBs converts at 0.5–2% open-to-reply
- "AEO" isn't a term SMBs know — we're selling a new category cold, which requires education and trust
- Expected outcome: 500 emails → 5-10 replies (mostly "remove me")

**Concern #2: Pricing is pure guesswork.**
- $49/$99/$499 looks like standard SaaS anchoring, not validated price points
- No conversation where a prospect said "I'd pay X for that"
- Don't know if SMBs think in monthly subscriptions or one-time fixes

**Riskiest assumption:** That local businesses care about AI search visibility. The urgency is felt by marketers, not the plumber in Des Moines whose referrals come from Nextdoor and Google Maps.

**Recommendation:** 5 manual conversations with real business owners before touching the outbound engine again. Show them their AEO scan. Watch their reaction. Ask "Would this worry you?" and "What would you pay to fix it?"

---

## 🧪 Quinn (QA) — "Don't run this against real prospects yet"

| # | Finding | Severity | Blocks Launch? |
|---|---------|----------|----------------|
| 1 | DFY Stripe checkout `|| null` — will silently fail on $499 tier | 🔴 Critical | Yes |
| 2 | Cold email + prospect script never tested with real data (1,000+ lines untested) | 🔴 Critical | Yes |
| 3 | Duplicate `send-outreach.ts` with 7-line divergence — no canonical version | 🟠 High | No, but urgent |
| 4 | PDF generator only tested on 100/100 site — never tested with a FAILING site (the actual use case) | 🟠 High | Yes |
| 5 | No automated unsubscribe / suppression list — CAN-SPAM exposure | 🟡 Medium | Depends on volume |
| 6 | Sprint branch not merged to main — production has none of S13 | 🟡 Medium | Yes for deploy |
| 7 | Zero test coverage on 1,700+ lines | 🟢 Low | Accumulating debt |

---

## 🔒 Sasha (Security) — "The pipeline has real legal exposure"

### Critical
- **C1: No functional unsubscribe mechanism** — CAN-SPAM penalty up to $51,744 per email. "Reply unsubscribe" with no automated handling doesn't meet the legal bar.
- **C2: No "advertisement" identification** — Cold commercial emails must be clearly identified as ads.

### High
- **H1: Email scraping legality** — CFAA exposure from scraping business sites for contacts. GDPR risk if any are EU residents.
- **H2: Stripe price IDs hardcoded** — If repo is public/semi-public, exposes pricing architecture. DFY `|| null` is a crash vector.
- **H3: PDF attachments = spam filter death** — Unknown-sender PDFs are phishing signals. Deliverability will crater. Replace with tracked links.

### Medium
- **M1: PII in unencrypted Google Sheets** — Accidental public sharing = data breach.
- **M2: Sending from primary domain** — Cold volume risks blacklisting perpetualagility.com for ALL communications (invoices, transactional, etc.). Use a subdomain.
- **M3: No suppression list** — Re-scraping + re-emailing opt-outs = CAN-SPAM violation on second send.

**Sasha's verdict:** Stop. Don't send another batch until C1 and C2 are fixed.

---

## 🏗️ Morgan (Tech Lead) — "Three things will break on day one"

### P0 — Will break on first real use
1. **Stripe DFY `|| null`** — Any DFY checkout crashes at runtime. Need startup env validation.
2. **Path alias `@/lib/` breaks standalone script execution** — Scripts called via `npx tsx` outside Next.js build context won't resolve imports. Silent or cryptic failures.

### P1 — Data integrity under any real load
3. **Google Sheets CRM — no concurrency protection** — spawnSync + no locking = race conditions on concurrent runs. Duplicate leads, skipped rows.
4. **prospect.ts hardcoded to production API** — Local dev/CI runs hit production. One bad run floods prod logs.
5. **string.replace() template "engine" — no escaping** — Company names with special characters will break substitution. Swap to real template engine (Handlebars/Mustache).

### P2 — Accumulating debt
6. **Duplicate send-outreach.ts** — Pick one, delete the other, add lint rule.
7. **Branch divergence** — 10+ failed deploy commits = the root cause (SWC/lockfile) is unresolved. Dedicate day 1 of S14 to clean merge.

---

## 👷 Bob (Customer — Non-Technical SMB Owner) — "I almost deleted it"

**Would he open it?** Almost deleted it — looked like spam. Opened because competitor name was in subject line.

**Does he understand AEO?** Not a clue. "AI Visibility Score" makes some sense. "AEO" is alphabet soup.

**Competitor comparison?** Gut punch (motivated) BUT suspicious. "How do I know these numbers are real? I've had guys call me saying my Google listing was broken and charge $300 to fix nothing."

**Would he click the CTA?** Looked for phone number first. No phone number = red flag. "I don't trust companies that hide behind a website."

**Pricing reaction:** Free first, obviously. $49/mo is a maybe — "That's not nothing for me." $499 DFY is what he actually wants but "$500/mo is a hard conversation with my wife." Agency plan? "I'm not an agency. Skip."

**What would build trust:**
- A real phone number
- One local testimonial from a Twin Cities plumber/HVAC guy
- Prove the score is real — walk me through how you got 28
- "Try free for 30 days, cancel anytime"

**What's missing:** "You told me my score is 28. What happens if I sign up and you fix it? Do I get more calls? How many? In how long? You never told me the OUTCOME."

**Best line:** "The email felt like it was written by a robot. If you scanned my site, mention my drain cleaning service, my 24-hour emergency line — something that proves you actually looked."

---

## 🎨 Riley (UX) — "Trust signals are the biggest gap"

| Area | Status | Priority |
|---|---|---|
| Mobile email card stacking | 🔴 Side-by-side score cards will break on mobile | Fix before launch |
| CTA copy clarity | 🔴 "See your full report" when report is ATTACHED as PDF = confusing | Fix before launch |
| /sign-up flow | 🟢 Correct approach (don't go direct to Stripe) | Verify plan param carries through |
| Info hierarchy | 🟡 Functional but cold — no human voice, no named sender | Add sender name |
| Trust signals | 🔴 Zero social proof, zero testimonials, zero case studies | Add before first send |
| Email → pricing continuity | 🟡 Personalized email lands on generic pricing page — context lost | Add contextual bridge |

**Key insights:**
- Replace PDF attachment with tracked link to hosted report (better deliverability + tracking)
- CTA should say "Run a free audit on your other locations →" (not redundant with attachment)
- Add "Cancel anytime" and "No credit card" notes under pricing tiers
- Pass plan param through URL so sign-up page reflects the selected tier
- Add one named sender ("— Marcus at LocalBeacon") to humanize the email

---

*Filed retroactively. Personas should run during Step 5 of Sprint Starter checklist, not after.*
