# Sprint 12 Specs — Distribution

**Product:** LocalBeacon.ai
**Theme:** Distribution
**Co-planned with David:** 2026-03-07

---

## S12-01: Sprint 11 Persona Panel (Retroactive) — Size M

### Problem
Sprint 11 shipped 5 features (multi-client dashboard, client wizard, PDF reports, landing page overhaul, pricing update) without any persona review. 11 personas were defined but zero were consulted. There could be UX bugs, copy issues, security gaps, or product mismatches live on localbeacon.ai right now.

### Solution
Run the full persona panel against the currently deployed code:

**Customer Personas (Alexander, bias-checked):**
- 🔧 Bob: Review landing page copy (AEO explainer, "Free AI Check" CTA), wizard UX, pricing clarity
- 📊 Taylor: Review dashboard overview, PDF report content, AEO section
- 🏢 Alex: Review multi-client switcher, client wizard flow, agency landing section, pricing accuracy

**Quality Personas (sub-agents):**
- 🔍 Teresa: Were these the right things to build? What evidence supports them?
- 🎨 Sasha: Does the multi-client flow make sense? Can users accomplish their goal?
- 🧪 Quinn: Edge cases — empty states, 0 clients, plan limit boundaries, PDF with missing data
- 🏗️ Morgan: business-context.tsx architecture, SSR→CSR migration, API route design
- 🔒 Sam: Business ownership verification in new APIs, PDF route auth, plan limit bypass
- 📊 Riley: Success metrics — what should we be measuring for agency features?

Fix all issues found. Commit fixes to sprint branch.

### Verification
- [ ] All 11 personas consulted (or justified exclusion)
- [ ] Each customer persona includes ≥1 forced negative
- [ ] All critical/high issues fixed
- [ ] Build passes after fixes
- [ ] Persona feedback saved to `persona-feedback-s12.md`

### Measurable Outcome
- 11/11 personas used (vs 0/11 in Sprint 11)
- Issue count by severity logged
- Bias incidents tracked (quality persona catches vs customer persona misses)

---

## S12-02: Public AI Readiness Checker Polish — Size M

### Problem
The `/check` page is our #1 top-of-funnel growth tool but has never been persona-reviewed or tested end-to-end. Email capture via the `leads` table hasn't been verified in production. If `/check` doesn't work well, the expo QR codes and Show HN post will drive traffic to a broken funnel.

### Solution
1. **End-to-end test:** Enter a real URL on production → verify scan completes → verify teaser score shows → verify email gate works → verify lead saved to Supabase `leads` table
2. **Persona review:**
   - Bob: Is "AI Readiness Score" clear? Does the teaser make him want to enter his email?
   - Alex: Can he use `/check?url=clientsite.com` to pre-fill for agency prospecting?
   - Quinn: Edge cases — invalid URLs, timeouts, sites that block scanning, rate limiting
3. **Fix issues found**
4. **Polish:** Loading states, error messages, mobile responsiveness, copy clarity

### Verification
- [ ] End-to-end flow verified on production (scan → score → email → lead in DB)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Rate limiting works (3/hr per client)
- [ ] Error handling for invalid URLs, timeouts, blocked sites
- [ ] `/check?url=example.com` pre-fill works

### Measurable Outcome
- Zero broken steps in the scan → email → lead pipeline
- All edge cases handled gracefully (no white screens, no unhandled errors)

---

## S12-03: Expo Prep — Vendor Registration + Booth Materials — Size L

### Problem
Ramsey EDA Business Expo is April 25, 2026. Registration deadline is April 10. We need: vendor registration ($75 non-Ramsey), a 33"x80" retractable banner, 100 one-pagers on cardstock, and QR codes pointing to `/check`. This is our first real-world distribution channel and our best shot at getting Bob (actual plumbers, HVAC techs, roofers) to try the product.

### Solution
1. **Registration:** Prepare registration info for David to submit (ST19 form, $75 check to City of Ramsey)
2. **Banner design:** 33"x80" retractable banner. Black/gold brand colors. Logo P (lighthouse). Headline: "Is Your Business Visible to AI?" Subhead: "Free AI Readiness Check — scan the QR code." QR code to `localbeacon.ai/check`. No "AI" in product description per brand guidelines — describe what it does.
3. **One-pager:** Print-ready PDF. Front: problem statement + 3 benefits + QR code. Back: pricing tiers + "how it works" in 3 steps. Bob-friendly language throughout.
4. **QR codes:** Generate QR codes pointing to `localbeacon.ai/check` with UTM parameters (`?utm_source=expo&utm_medium=print&utm_campaign=ramsey-eda-2026`)
5. **Demo script:** 60-second walkthrough for Bob persona at the booth

### Verification
- [ ] Registration info compiled (form details, payment instructions)
- [ ] Banner design as print-ready PDF or high-res PNG (33"x80", 150 DPI minimum)
- [ ] One-pager as print-ready PDF (letter size, front+back)
- [ ] QR codes generated and tested (scan → `/check` with UTM params)
- [ ] Demo script written and Bob-tested
- [ ] All materials reviewed by Bob persona: zero jargon, zero "AI" language

### Measurable Outcome
- David can register and order prints after reviewing materials
- QR code scans lead to working `/check` page with UTM tracking
- Demo script takes ≤60 seconds

---

## S12-04: Show HN Draft + Submission Plan — Size S

### Problem
Show HN is a high-leverage distribution channel for developer-adjacent tools. Our free AI Readiness Checker has a genuine HN-friendly angle: it's technically novel (AEO/Answer Engine Optimization), useful, and free. But a bad Show HN post gets zero traction. It needs to be crafted carefully.

### Solution
1. **Draft the Show HN post:**
   - Title: "Show HN: Free AI Readiness Checker for Local Businesses"
   - Body: What it does, why we built it, what AEO is, technical details (14-signal scan), what we learned
   - No marketing speak — HN hates that. Technical, honest, useful.
2. **Submission timing plan:** Best times for HN visibility (weekday mornings ET)
3. **Engagement plan:** How David should respond to comments (technical depth, honest about what's manual vs automated)
4. **Save to `products/localbeacon/distribution/show-hn-draft.md`**

### Verification
- [ ] Post draft reviewed by Alex persona (technical audience)
- [ ] Post follows HN guidelines (no clickbait, genuine Show HN)
- [ ] Timing recommendation documented
- [ ] Engagement guidelines written

### Measurable Outcome
- Ready-to-post draft that David can submit with one click
- Post is honest about MVP state (manual posting, no auto-publish yet)

---

## S12-05: Agency Outreach Kit — Size M

### Problem
Our GTM is B2B2B — sell to web designers and agencies managing SMB clients. We need a cold outreach kit: a 1-page PDF pitch and email template targeting MN web design agencies. Without outreach materials, we can't start the sales pipeline.

### Solution
1. **Agency pitch PDF (1 page):**
   - Problem: "Your clients are invisible to AI assistants"
   - Solution: LocalBeacon dashboard for agencies (multi-client, reports, AEO tools)
   - Proof: AI Readiness score comparison (your client vs competitors)
   - CTA: "Try free for 14 days — manage up to 3 clients"
   - Include `/check?url=` pre-fill feature for prospecting
2. **Cold email template (3 versions):**
   - Version A: "I ran your client's AI readiness score..."
   - Version B: "Do your clients show up when people ask ChatGPT?"
   - Version C: "Free tool for your agency — manage client visibility in one dashboard"
3. **Target list criteria:** MN-based, <20 employees, manages SMB websites, active online presence
4. **Save to `products/localbeacon/distribution/`**

### Verification
- [ ] Pitch PDF reviewed by Alex persona (agency owner)
- [ ] Email templates reviewed by Bob persona (does it make sense if forwarded to the SMB?)
- [ ] No "AI" in customer-facing copy (per brand guidelines)
- [ ] CTA leads to working signup flow
- [ ] PDF is print-ready and email-attachable

### Measurable Outcome
- David can start outreach to 20 agencies immediately after sprint
- Materials are professional enough to not embarrass the brand
- Each email version has a clear hypothesis about what resonates
