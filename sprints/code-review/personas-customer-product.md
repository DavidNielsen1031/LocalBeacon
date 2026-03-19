# LocalBeacon Persona Review
**Date:** 2026-03-18  
**Sprint:** Code Review  
**Reviewers:** Bob (small business customer) + Riley (product analyst)

---

## 🔧 BOB — Plumber, Burnsville MN, first-time visitor

*"I fix pipes. I'm not a marketing guy."*

### 1. Homepage — Do I understand what this does?

**Verdict: ✅ Mostly yes — but a few things confused me.**

The hero copy is *really* good. "Your phone rings more. Without you lifting a finger." That's exactly what I want to hear. I don't care about SEO or AI — I just want calls.

What works:
- They mention plumbers, HVAC, roofers right in the badge at the top. I feel seen.
- The fake "Mike's Plumbing — Denver, CO" dashboard screenshot clicked immediately. I thought: "That's what I want — phone clicks up 18%."
- The before/after section is crystal clear. Zero ambiguity.
- The FAQs actually answer my real questions. "Will it sound like a robot?" — yes, I was worried about that.
- The founder quote + name (David Nielsen, Burnsville MN) builds trust. He's local-ish. That matters.

What confused me:
- **"AEO" and "Answer Engine Optimization" are mentioned before they're explained.** The AEO explainer section is buried mid-page. First mention is in the outcomes block ("AI Readiness score"). A plumber has no idea what that means at first glance.
- The "15-point audit" changed to "14 signals" between sections (outcomes vs. the /check CTA). Which is it?
- No pricing on the homepage hero. I have to scroll all the way down to find out what this costs.

### 2. AEO Scanner (`/check`) — Would I know what "AEO" means? Is the email gate worth it?

**Verdict: ⚠️ The scanner itself is great. The email gate will kill 60%+ of completions.**

The page title should explain itself before I scan. I land on `/check` and it just says "Check My Score" — score for what? The page doesn't have visible context for someone who typed the URL directly or clicked from an ad.

AEO is never spelled out on the scanner page itself. The placeholder text "Enter your website URL (e.g. bobsplumbing.com)" is good. But the word "AEO" in the URL and the check header is jargon I don't know.

The email gate experience:
- I get a score (great!) but it's blurred/gated behind my email.
- The ask ("See which of the 14 signals passed or failed") is reasonable.
- But as a plumber, if I don't get my full results immediately, I'm probably bouncing. I don't trust that this isn't just another lead capture with no payoff.
- The "No spam. Unsubscribe anytime." micro-copy helps. Not enough.

The competitor comparison feature is a brilliant idea. I'd absolutely type in my biggest competitor's URL to see if I'm beating them.

**What would make me enter my email:** If I could see my score AND one failed item before the gate. Show me the pain, then ask for the email.

### 3. Pricing — Which plan would I pick? Is $49/mo worth it?

**Verdict: ✅ Price is defensible. Plan structure is confusing.**

The pricing page has FOUR plans (Free, Solo, DFY Setup at $499 one-time, Managed at $99/mo) but the homepage shows THREE plans (Free, Solo, Done-For-You at $499/month). **The homepage says $499/month for DFY but the pricing page says $499 one-time + $99/mo Managed.** That's a real mismatch that would make me distrust the site.

If I'm a plumber:
- **Free:** 5 posts, 3 city pages. I'd try this first. But "copy & post to Google yourself" means more work for me, which defeats the purpose.
- **Solo $49/mo:** This is the one I'd pick after trying free. It's less than $2/day. An agency costs $800-1500/mo. The FAQ comparison nails that.
- **DFY $499:** I don't fully understand what "schema markup" and "llms.txt" are. This plan would only make sense to me if someone explained what it means for my business in plain language.
- **Managed $99/mo:** Feels like the right answer but requires DFY first, so it's $598 to start. That's a bigger ask for a skeptical plumber.

**Missing:** No money-back guarantee. No trial period. The competitor BrightLocal is called out as "fewer features" which invites me to Google BrightLocal and compare myself — risky.

### 4. Onboarding — Can I fill it out without help?

**Verdict: ✅ Yes, easily — this is one of the best parts of the product.**

The 4-step flow is clear:
1. Business Info — straightforward fields, good placeholders (e.g. "Johnson Plumbing & Heating")
2. Service Areas — tag-based input, very intuitive
3. Choose Plan — presented again cleanly, fair
4. First Post — this is the magic moment

Step 4 is genuinely impressive: I get an actual draft Google post about my business. It even has a "Copy to Clipboard" button and instructions: *"Open Google Maps → find your business → Add post → paste this content."* That's the kind of handholding I need.

One issue: **Step 3 (Choose Plan) during onboarding shows "Done-For-You - $499/mo" but the pricing page says it's a one-time payment.** Another inconsistency that would make me nervous.

### 5. Dashboard — Do I understand what to do next?

**Verdict: ✅ Yes for new users. Slightly confusing once set up.**

The new user state is well done — the "Getting Started" steps (Connect listing → Generate first post → Build city pages → Check AI Readiness) are clear and actionable.

Once I have a business connected, the 4 stat cards (Google Posts, City Pages, Reviews, AI Readiness) are easy to understand. The "Quick Actions" section is helpful.

**What's unclear:**
- The "AI Readiness" score card shows "—" until I run a scan. But it doesn't tell me what AI Readiness IS. I might click it just to find out.
- The "Monthly Visibility Report" download button appears even on the free plan UI (the button is there, it's just actually gated server-side). That inconsistency is confusing.
- The sidebar links to pages I haven't heard of: "Schema," "llms.txt," "Audit," "Competitors." As a plumber, I don't know what most of these are.

### 6. Trust Signals — What's there, what's missing?

**What's there ✅:**
- Founder name and photo (David Nielsen)
- Physical address in footer (Burnsville, MN 55337) 
- Phone number in footer ((651) 263-6612)
- Email: hello@localbeacon.ai
- Privacy policy + Terms of Service links
- FAQ with "can I cancel anytime" = yes answer
- "No credit card required" copy on free CTA

**What's missing ❌:**
- **Zero customer testimonials.** Not a single real quote from a plumber, roofer, or dentist. The homepage mockup uses fictional "Mike's Plumbing — Denver, CO" — that's not a testimonial.
- **No star ratings or review count.** Even a badge like "⭐ 4.8 on Google" would help.
- **No money-back guarantee.** "Cancel anytime" isn't the same. A 30-day guarantee would close more trials.
- **No SSL badge or security mention.** I'm handing over my Google account info. That's scary without a trust signal.
- **No case studies or before/after numbers from real customers.** "Businesses that post weekly rank higher" is generic. Show me Bob's Plumbing went from page 3 to page 1.
- **No logo strip or press mentions.** Even "As seen in..." or a Google Partner badge would help.

### 7. What Would Make Me Pay?

1. **One real testimonial from someone like me** — "Jim's Plumbing, Burnsville MN — we got 3 new calls in the first month." That one thing would do more than all the copy.
2. **30-day money-back guarantee** — eliminates the risk. I'll try it.
3. **Show me actual results before the email gate** — even 2-3 of my failed scan items before asking for my email.
4. **Consistent pricing** — the homepage/pricing/onboarding mismatch on DFY cost makes me feel like I might get surprised later.
5. **Explain what I'm actually doing** — "Connect your Google listing" CTA is confusing. Does that mean I'm giving you my Google login? How does that work? A 30-second explainer video would eliminate this fear entirely.

---

## 📊 RILEY — Product Analyst

### 1. Feature Parity: Pricing Promises vs. Actual Functionality

**Critical mismatches found:**

| Feature Promised | Where Promised | Actual Status |
|---|---|---|
| "Weekly blog posts published" | Homepage DFY plan | Agency plan only per `plan-limits.ts` (`blogPosts: null`). Solo gets 4/month. **Homepage promises weekly for DFY ($499 one-time) which has no ongoing billing** |
| "15-25 localized FAQs with schema" | Homepage DFY | FAQ generator exists but installs nothing — it generates text you copy. No deployment. |
| "Schema markup installed on your site" | Homepage/Pricing DFY | Schema generator is UI-only (copy/paste). No deployment pipeline exists in the codebase. |
| "llms.txt file deployed to your domain" | Homepage/Pricing DFY | llms.txt generator exists but produces a text file — no deployment mechanism in codebase. |
| "Monthly progress report with score tracking" | Homepage Solo | Reports page exists. Score tracking is there. But the monthly _email_ report (`sendMonthlyReportEmail`) needs to be triggered via cron — no evidence of that cron in reviewed files. |
| "Unlimited Google post drafts — generated weekly" | Landing Solo | Post generation works. "Generated weekly" implies automation — current state requires manual generation or cron setup. |
| "Dedicated onboarding call" | Homepage/Pricing DFY | No scheduling integration, no Calendly link, nothing in onboarding flow. Pure manual process. |
| "Auto-publishing coming soon" | Onboarding step 3 note | Mentioned but no feature flag or ETA visible. |

**DFY plan pricing inconsistency (Bob also caught this):**
- **Homepage** (`landing-content.tsx`): DFY is `$499/month`
- **Pricing page** (`pricing/page.tsx`): DFY Setup is `$499 one-time` + Managed at `$99/mo` is a separate plan
- **Onboarding** (`onboarding/page.tsx`): DFY is shown as `$499/mo` in plan selector

This is a real trust and legal problem. A customer could argue they were shown `$499/month` and signed up expecting ongoing service.

### 2. Analytics Coverage

**Events currently captured:**

| Event | Location | Properties |
|---|---|---|
| `scan_completed` | `/check/checker-form.tsx` | url, score |
| `email_submitted` | `/check/checker-form.tsx` | url, score |
| `checkout_clicked` | `/pricing/page.tsx` | plan |
| `onboarding_step` | `/onboarding/page.tsx` | step |
| `tool_used` | ai-readiness, faq, schema, llms-txt pages | tool name |

**PostHog auto-captures:** pageview, pageleave (configured in `posthog.ts`)

**Critical gaps — no events tracked for:**
- Onboarding completion (`onboarding_completed` / step 4 reached)
- Post generated (which plan, which post type)
- Post copied to clipboard
- Post published (no publish functionality exists, but copy action isn't tracked on the dashboard)
- City page created
- Review reply drafted
- Upgrade banner dismissed (free plan banner in dashboard)
- Sign-up completed (Clerk handles auth — no PostHog event on account creation)
- Blog post generated
- Report downloaded
- Competitor scan run
- Plan upgrade / subscription started (Stripe webhook fires but no PostHog event in webhook handler)
- Scan-to-signup conversion (user scanned → signed up → tied together)
- AEO score improvement over time

**The funnel is essentially blind after `checkout_clicked`.** We know people click checkout but we don't know if they convert, what they do post-signup, or what drives upgrades.

### 3. Plan Gating Audit

**Correctly gated features:**
- Google Posts: Free limited to 5/month via `UpgradeGate` with `previewMode="limit"` + server-side enforcement via `enforceLimits`
- Review Responses: Free limited to 3/month — UI + server gating
- FAQ Generator: Free limited to 1/month — UI + server gating  
- Schema Markup Generator: Free locked — blur overlay
- llms.txt Generator: Free locked
- AI Readiness in dashboard: Free limited to 1 scan/month
- Reports page: Entirely locked for free plan (server-side check in page)
- Blog posts: Free plan has `blogPosts: 0` in `plan-limits.ts` — correctly blocked

**Gating issues found:**

1. **City Pages: UI gating mismatch.** `plan-limits.ts` correctly limits free to 3 city pages and solo to 10. But the dashboard City Pages section (`/dashboard/pages`) doesn't have a visible `UpgradeGate` wrapper per grep results. Server-side enforcement via `enforceLimits` may catch it at the API level, but the user won't know why they're blocked.

2. **Competitors page:** `UpgradeGate` present, `requiredPlan="solo"`. Correct. But `plan-limits.ts` shows free gets `competitors: 1` (not zero), so a free user should be able to run 1 competitor scan — unclear if this is working as intended or if the gate blocks all access.

3. **Monthly Reports download (PDF):** The "Download Report" button appears on the main dashboard for all users with a business (`hasBusiness` check only), but the `/api/reports/pdf` route presumably checks plan. The UI shouldn't show the button to free users. Mismatch between UI and intent.

4. **Queue page (`/dashboard/queue`):** No `UpgradeGate` found. Queue likely shows all drafted posts regardless of plan. Unclear if this is intentional.

5. **Blog page (`/dashboard/blog`):** No `UpgradeGate` component used — gating is done inline with an error message when limit is hit. Inconsistent UX pattern vs. other pages.

6. **Audit page:** `UpgradeGate` present, `requiredPlan="solo"`. But the landing page free plan description mentions "1 AI Readiness scan/month" — the audit page is the full AEO audit. Conflating "scan" with "audit" in messaging.

### 4. Onboarding Completion — Path to Value

**What happens after onboarding:**

The flow is: Business Info → Service Areas → Choose Plan → First Post (step 4). 

Step 4 generates a Google post draft and shows copy instructions. Then: "Go to Dashboard →" button.

**Issues:**
- After clicking "Go to Dashboard", the user lands on the dashboard main page. No onboarding checklist, no "next steps" guide, no progress indicator.
- The dashboard shows empty state stats (all "—") and "Getting Started" steps, but these are the same steps they just completed. They should see their actual data.
- There's a race condition: the business is saved in `saveBusiness()` during step 3, but the dashboard might load before the data populates (no loading state account for this).
- For free users choosing paid plans: if `checkout` fails silently, the code falls through to the free flow — user gets a post draft but ends up on the wrong plan without knowing it.
- **No confirmation email sent after onboarding.** The `email.ts` module has `sendWeeklyContentEmail` and `sendMonthlyReportEmail` but no welcome/confirmation email. Critical onboarding touchpoint missing.
- The first post is generated in onboarding but not saved to the content queue with a clear status. The user copies it and that's it — no record of what they got.

**Verdict:** The onboarding completion experience drops off sharply after step 4. Getting to "first value" (post drafted) is excellent. The transition to "sustained value" (dashboard habituation) is underdeveloped.

### 5. Email Deliverability

**Sender address issue (high priority):**
```typescript
const FROM_EMAIL = 'LocalBeacon <hello@perpetualagility.com>'
```

Emails are sent from `hello@perpetualagility.com` but the product is `localbeacon.ai`. This is a significant trust and deliverability problem:
- Users see "LocalBeacon" in the sender name but `@perpetualagility.com` in the full address — will look like spoofing or phishing to spam filters
- SPF/DKIM records on `perpetualagility.com` may not be configured to allow Resend as an authorized sender for this domain
- Users who check the From address will be confused and may mark as spam
- The AEO report email footer says "Questions? Reply to this email or contact hello@localbeacon.ai" — but the reply-to would go to `@perpetualagility.com`

**Recommendation:** Add `localbeacon.ai` as a verified sending domain in Resend, update `FROM_EMAIL` to `hello@localbeacon.ai`, and verify SPF/DKIM records for that domain.

**Email completeness:**
- ✅ Weekly content email exists and is well-designed
- ✅ AEO report email (triggered by `/check` email gate) — good format, has CTA
- ✅ Monthly summary email exists
- ❌ Welcome/onboarding confirmation email — missing
- ❌ Upgrade confirmation email — missing
- ❌ Trial expiry / plan downgrade warning — missing
- ❌ Re-engagement email for inactive users — missing

**HTML email quality:** All three email templates are reasonable HTML with inline styles. They render acceptably. The AEO report email is the most sophisticated. All have unsubscribe links (pointing to `/dashboard/settings` which presumably has that functionality).

**Resend guard:** The `if (!resend)` check silently skips email sends when `RESEND_API_KEY` is not set. This is appropriate for dev environments but means email failures are logged only (no alerting). In production, a failed AEO report email after a user enters their email is a silent conversion killer.

---

## Summary: Top 10 Issues by Priority

| # | Issue | Type | Severity |
|---|---|---|---|
| 1 | DFY pricing mismatch ($499/mo vs one-time) across 3 pages | Trust/Legal | 🔴 Critical |
| 2 | FROM_EMAIL uses `@perpetualagility.com` not `@localbeacon.ai` | Deliverability | 🔴 Critical |
| 3 | No customer testimonials anywhere | Conversion | 🔴 Critical |
| 4 | "Schema installed" + "llms.txt deployed" + "dedicated onboarding call" promised but not implemented | Feature parity | 🔴 Critical |
| 5 | No analytics after checkout (funnel blind post-conversion) | Analytics | 🟡 High |
| 6 | No welcome email after onboarding | Retention | 🟡 High |
| 7 | Email gate shows score only — no failed items — before asking for email | Conversion | 🟡 High |
| 8 | PDF report download button visible to free users in dashboard | Gating | 🟡 High |
| 9 | No money-back guarantee | Conversion | 🟡 High |
| 10 | Onboarding ends at "copy this post" with no clear next step | Retention | 🟡 High |
