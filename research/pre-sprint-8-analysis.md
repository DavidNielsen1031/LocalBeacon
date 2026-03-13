# Pre-Sprint 8 Analysis: Competitive Diff, Reality Check, and Persona Walkthroughs

**Date:** 2026-03-03  
**Purpose:** Three research items required before Sprint 8 begins.  
**Scope:** BrightLocal competitive feature diff, internal feature reality check, persona walkthroughs of both sites.

---

## PART 1 — FEATURE DIFF: BrightLocal vs LocalBeacon

### BrightLocal Feature Set (from live site, March 2026)

**Pricing:** Track $39/mo → Manage $49/mo → Grow $59/mo (per location, annual discount available)

| Category | Feature | BrightLocal | LocalBeacon | Notes |
|----------|---------|-------------|-------------|-------|
| **Rank Tracking** | Local Rank Tracker | ✅ Full — keyword-level, multi-location | ❌ Claimed on marketing pages but NOT built | LB landing page says "rank tracking" and "monthly visibility report" — no actual rank tracking code exists |
| **Rank Tracking** | Local Search Grid (map grid) | ✅ Visual geo-grid rankings | ❌ Not built | BrightLocal's signature feature |
| **Citations** | Citation Tracker | ✅ Audit existing citations | ❌ Not built | Not in our scope |
| **Citations** | Citation Builder | ✅ Pay-as-you-go ($2-3.20/submission) | ❌ Not built | Not in our scope |
| **Citations** | Active Sync (listing management) | ✅ Sync across Google, Bing, Facebook, Apple | ❌ Not built | Requires API partnerships |
| **GBP Management** | GBP Audit | ✅ Comprehensive profile audit | ⚠️ Partial — Listing Health page does basic 0-100 audit | BL checks completeness, photos, categories, hours. LB checks fewer signals |
| **GBP Management** | GBP Post Scheduler | ✅ Direct auto-publish to GBP | ⚠️ Manual copy-paste only | LB generates posts but user must copy/paste. GBP API approval pending |
| **GBP Management** | Advanced GBP Insights | ✅ Views, clicks, calls, directions | ❌ Not built | Requires GBP API |
| **GBP Management** | Bulk GBP posting | ✅ Multi-profile bulk posting | ❌ Not built | Agency feature |
| **Content Generation** | AI post writing | ❌ Not a feature | ✅ AI writes posts, city pages, blog posts, FAQs | **This is our moat** — BL doesn't generate content |
| **Content Generation** | Service area page builder | ❌ Not a feature | ✅ AI generates city-specific landing pages with schema | BL doesn't do this at all |
| **Content Generation** | Blog post generator | ❌ Not a feature | ✅ AI generates local SEO blog posts | BL doesn't do this |
| **Content Generation** | FAQ builder with FAQPage schema | ❌ Not a feature | ✅ 20 Q&As + schema markup | BL doesn't do this |
| **AEO / AI Visibility** | AI Readiness Checker | ❌ Not a feature | ✅ 15-point scan, 0-100 score | Nobody has this |
| **AEO / AI Visibility** | llms.txt generator | ❌ Not a feature | ✅ One-click download | Nobody has this |
| **AEO / AI Visibility** | Schema markup generator | ❌ Not a feature | ✅ LocalBusiness + FAQPage + Organization | BL audits schema but doesn't generate it |
| **Reviews** | Monitor reviews (multi-platform) | ✅ Google, Facebook, Yelp, Tripadvisor, etc. | ❌ Not built | BL monitors ~80+ review sites |
| **Reviews** | Review generation campaigns | ✅ Email/SMS review request workflows | ❌ Not built | BL sends automated review requests |
| **Reviews** | Review response | ⚠️ Available on Grow plan | ✅ AI drafts responses (manual paste to Google) | LB generates replies; BL lets you respond in-platform |
| **Reviews** | Review showcase widget | ✅ Embed widget on website | ❌ Not built | |
| **Reporting** | White-label reports | ✅ Full white-label, PDF export | ❌ Claimed in Agency plan but NOT built | LB landing page promises this but zero code exists |
| **Reporting** | Monthly visibility report | ✅ Comprehensive multi-metric | ⚠️ Claimed but NOT built | LB landing says "monthly visibility report" — no report generation exists |
| **Reporting** | Google Analytics integration | ✅ | ❌ Not built | |
| **Agency** | Multi-location management | ✅ Manage hundreds of locations | ⚠️ Claimed but not functional | Supabase has `businesses` table but no multi-location UI |
| **Agency** | Agency Lead Generator | ✅ Free audit tool to win prospects | ❌ Not built | |
| **SEO Audit** | Local Search Audit (on-site SEO) | ✅ Technical SEO, links, on-page | ⚠️ Listing Health does basic checks | BL's audit is much deeper |
| **Competitor** | Competitor insights | ✅ Compare rankings, reviews, citations | ❌ Claimed in Agency plan but NOT built | |
| **Support** | Academy / learning resources | ✅ Free courses, certifications | ❌ | |
| **Support** | Facebook community (The Local Pack) | ✅ Thousands of members | ❌ | |

### Summary: Where We Win, Where We Lose

**LocalBeacon advantages (BrightLocal doesn't have):**
1. AI content generation (posts, city pages, blogs, FAQs) — this is genuinely unique
2. AI Readiness / AEO tools (readiness checker, llms.txt, schema generator) — nobody has this
3. Review response drafting with AI
4. Simpler UX / faster onboarding (2 minutes vs BrightLocal's learning curve)
5. Lower effective price for content + posting ($49 vs BL's $39-59 PLUS agency content costs)

**BrightLocal advantages (we don't have):**
1. Rank tracking (keyword-level, geo-grid) — the #1 reason agencies pay for BL
2. Citation management (tracking, building, syncing)
3. Direct GBP integration (auto-post, auto-reply, insights data)
4. Review monitoring across 80+ platforms
5. Review generation campaigns (email/SMS)
6. White-label reporting (PDF export, agency branding)
7. Google Analytics integration
8. Multi-location management at scale
9. 10,000+ user base, mature product, established trust
10. Educational content (Academy, community)

---

## PART 2 — INTERNAL REALITY CHECK: What We Think We Have vs What's Actually On The Website

### Claims on localbeacon.ai Landing Page vs Actual Implementation

| What the Website Says | What Actually Exists | Status | Severity |
|----------------------|---------------------|--------|----------|
| **"Posts to your Google listing every week"** | GBP post generator creates drafts. User must manually copy/paste to Google. No auto-posting. GBP API approval pending. | 🔴 MISLEADING | HIGH — implies automation that doesn't exist |
| **"Replies to your reviews"** | Review response AI drafts replies. User must paste into Google Maps manually. Dashboard says "Manual mode · GBP sync coming soon" | 🟡 PARTIALLY TRUE | MEDIUM — generates replies but doesn't auto-post them |
| **"Unlimited Google posts — auto-scheduled weekly" (Solo plan)** | Posts are generated but NOT auto-scheduled or auto-published anywhere. No scheduling system exists. | 🔴 FALSE | HIGH — "auto-scheduled" is not implemented |
| **"10 local city pages with SEO optimization" (Solo plan)** | City page generator exists but pages are generated as HTML for user to deploy. Not hosted or published by LocalBeacon. | 🟡 PARTIALLY TRUE | MEDIUM — generates content but doesn't deploy it |
| **"Monthly visibility report"** | Not implemented. Zero report generation code. Dashboard overview page has `// TODO: Fetch real data` comment. | 🔴 FALSE | HIGH — explicitly promised, doesn't exist |
| **"Rank tracking" (mentioned in pricing comparison FAQ)** | Not implemented. No rank tracking code of any kind. | 🔴 FALSE | HIGH — stated in competitive comparison |
| **"Competitor monitoring & alerts" (Agency plan)** | Not implemented. No competitor monitoring code. | 🔴 FALSE | HIGH — promised in paid plan |
| **"White-label reports with your branding" (Agency plan)** | Not implemented. No white-label or report generation code. | 🔴 FALSE | HIGH — promised in paid plan |
| **"Multi-client dashboard" (Agency plan)** | Not implemented. Single-user dashboard only. Supabase has `businesses` table but no multi-client UI. | 🔴 FALSE | HIGH — core Agency value prop |
| **"1,284 Google Views +23%" (hero section mock data)** | Mock data in the hero section. Not connected to real data. | 🟡 FINE AS DEMO | LOW — clearly a demo visualization |
| **"Trusted by local businesses across the US"** | Zero paying customers. Zero active users. | 🔴 MISLEADING | MEDIUM — implies existing customer base |
| **"Mike R., Owner, Mike's Plumbing — Denver, CO" (testimonial)** | Fabricated testimonial. No real customer named Mike R. exists. | 🔴 FALSE | HIGH — fake social proof |
| **"5 Google posts per month" (Free plan)** | Generator creates posts but user copies them manually. Not auto-posted. "5 per month" limit not enforced in code. | 🟡 PARTIALLY TRUE | MEDIUM — generates but no enforcement |
| **"3 business locations" (Solo plan)** | Not enforced. Single-location UI only. | 🔴 FALSE | MEDIUM — multi-location not built |
| **"Professional review replies" (Solo plan)** | AI generates replies but user must manually paste them. | 🟡 PARTIALLY TRUE | LOW — "professional" is accurate, delivery is manual |
| **"1 blog post per month" (Solo plan)** | Blog generator exists. No monthly automation or scheduling. | 🟡 PARTIALLY TRUE | LOW — generates on-demand, not monthly |
| **"Priority support" (Agency plan)** | No support system exists. No help desk, no chat, no ticket system. | 🔴 FALSE | MEDIUM — no support infrastructure |

### Dashboard Features: What's Real

| Dashboard Page | What It Does | Is It Real? | Connected to Backend? |
|---------------|-------------|-------------|----------------------|
| Overview | Shows placeholder stats | ⚠️ Mock data (`// TODO: Fetch real data`) | No — hardcoded placeholders |
| GBP Posts | Generate post drafts via AI | ✅ Real — Anthropic generates posts | Yes (Anthropic API) |
| Page Builder | Generate city landing pages | ✅ Real — Anthropic generates HTML | Yes (Anthropic API) |
| Reviews | Paste review → get AI response | ✅ Real — Anthropic generates replies | Yes (Anthropic API) |
| Blog Posts | Generate blog post drafts | ✅ Real — Anthropic generates posts | Yes (Anthropic API) |
| AI Readiness | Scan any URL for AI visibility | ✅ Real — 15-point live website scanner | Yes (fetches live URLs) |
| FAQ Builder | Generate FAQs with schema | ✅ Real — Anthropic generates FAQs | Yes (Anthropic API) |
| AI Discovery File | Generate llms.txt | ✅ Real — template-based generator | Yes (generates from inputs) |
| Listing Health | Basic website health audit | ✅ Real — checks basic signals | Yes (fetches live URL) |
| Schema Markup | Generate schema.org JSON-LD | ✅ Real — generates from inputs | Yes |
| Settings | Business profile settings | ⚠️ Exists but not connected | No — form doesn't persist to Supabase |

### The Honest Feature Count

**Actually working features:** 8 AI generators (posts, pages, reviews, blog, FAQ, llms.txt, schema, AI readiness scan)
**Claimed but not built:** 7 features (auto-posting, rank tracking, competitor monitoring, white-label reports, monthly reports, multi-client dashboard, priority support)

---

## PART 3 — PERSONA WALKTHROUGHS

Each persona visits both BrightLocal.com and LocalBeacon.ai as a first-time visitor. Their reactions are based on their documented pain points, language preferences, and buying criteria.

---

### PERSONA 1: Alex Martinez (Agency Owner, 34, manages 10-30 local clients)

#### Alex Visits BrightLocal.com

**First 10 seconds:** "Okay, 10,000+ marketers and agencies use this. That's social proof I trust. 'Save 80% of time on auditing and reporting' — that's exactly what I need."

**Pricing page:** "Track at $39/mo, Manage at $49, Grow at $59. Per location? Let me check... [scrolls] Hmm, it's confusing with the location slider. For 10 clients this could add up fast. But they have everything — rank tracking, citations, GBP scheduling, review monitoring. The Local Search Grid is killer for client reports."

**Feature evaluation:** "Rank Tracker ✅, Geo Grid ✅, Citation Tracker ✅, GBP Audit ✅, White-label Reports ✅, Review Monitoring ✅. This covers most of what I need. The Citation Builder being pay-as-you-go is annoying though — I hate credit systems."

**Objections:** "It's a lot of dashboards and data. Setting up 15 clients will take a full afternoon. And it doesn't write any content — I still need to write GBP posts, city pages, and review replies myself or hire a copywriter. That's the time sink."

**Verdict:** "Solid tool. Industry standard. Expensive at scale. Doesn't solve my content creation problem."

**Score: 7.5/10**

#### Alex Visits LocalBeacon.ai

**First 10 seconds:** "'More calls. Less work.' Clean. The hero section with Mike's Plumbing dashboard looks professional. I like the before/after section — that's a good sales tactic."

**Features section:** "'Show up on Google Maps' — weekly posts, okay. 'Rank in every city you serve' — city pages, nice. 'Visible to AI assistants' — wait, this is AEO? That's forward-thinking. 'Every review gets a reply' — auto-reply to reviews? I need that. 'Monthly proof it's working' — report. Good."

**Pricing page:** "Free / Solo $49/mo / Agency $99/mo. $99 for unlimited clients? That's... significantly cheaper than BrightLocal for 10+ locations. If this does what it says, I'd save $400+/mo easily."

**But then reality hits:** "Wait. Let me sign up and test this..."

**Dashboard evaluation:** "Okay, GBP Posts — I can generate posts. But... it says 'Copy & paste to Google.' This isn't auto-posting? The landing page said 'posts to your Google listing every week.' That's misleading."

"Reviews — 'Manual mode · GBP sync coming soon.' So I have to copy/paste review responses too? That's not what 'we handle everything' means."

"Where's the rank tracking? The pricing page says 'rank tracking' in the comparison. I don't see it anywhere in the dashboard."

"Multi-client dashboard? I'm on the Agency plan page and it says 'unlimited client locations' but the dashboard just shows one business. Where do I add clients?"

"White-label reports? I don't see any report generation at all."

**Critical objections:**
1. "The AI content generation is genuinely impressive — the city pages and FAQ builder are things I'd actually use. BrightLocal doesn't do this."
2. "But at least half the features on the pricing page don't exist yet. This feels like vaporware."
3. "The fake testimonial from 'Mike R.' is a red flag. If I Google this company and find no real users, I'm out."
4. "I can't recommend this to clients until the auto-posting works. Manual copy-paste defeats the entire 'done for you' value prop."
5. "The AEO stuff (AI Readiness Checker) is genuinely differentiated. Nobody else has this. But it's a 'nice to have,' not a buying trigger. I need rank tracking and auto-posting first."

**Verdict:** "Interesting concept. The AI content tools are legit and unique. But the product is maybe 40% built compared to what the website promises. I'd come back in 6 months."

**Score: 4/10 (would be 7/10 if features matched claims)**

---

### PERSONA 2: Taylor Nguyen (Tech-Savvy SMB Owner, 29, one HVAC location)

#### Taylor Visits BrightLocal.com

**First 10 seconds:** "'Local SEO Software, Citations, and Services.' Okay, I know what SEO is. This looks professional but... a lot going on. 'Do-it-yourself' or 'Do-it-for-me'? I want something in between."

**Pricing page:** "$39-59/month. That's in my budget. Let me see what I get... Rank Tracker, Citation Tracker, GBP Audit, Review Monitoring. That's useful but it's all tracking. Where's the part that actually does things for me?"

**Feature evaluation:** "I can track where I rank, audit my citations, monitor reviews. But I still have to write my own Google posts? I still have to respond to reviews myself? I thought I was paying for a tool to save time, not give me more dashboards to check."

**Objections:** "This is built for agencies, not for me. I don't need 'white-label reporting.' I need someone to just post to my Google listing and answer my reviews. The interface looks like it requires SEO knowledge I don't have."

**Verdict:** "Too much tracking, not enough doing. I'd need to hire someone to actually use this data."

**Score: 5/10**

#### Taylor Visits LocalBeacon.ai

**First 10 seconds:** "'Your phone rings more. We handle everything.' YES. That's what I want. The demo dashboard showing Google Views, Phone Clicks, Reviews Replied — this is my language."

**Features section:** "'Show up on Google Maps' — weekly posts, done for me. 'Rank in every city you serve' — I serve 5 cities, this would be great. 'Every review gets a reply' — I hate doing this. 'Monthly proof it's working' — finally, someone shows me if this stuff works."

**Pricing page:** "$49/mo for Solo. Unlimited Google posts, 10 city pages, review replies, blog post, monthly report. That's everything I need for less than my current Google Ads spend."

**Signs up and enters dashboard:** "Okay, this is clean. I can see the tools — Posts, Page Builder, Reviews, Blog... let me try generating a post."

"The post looks great! 'Spring AC tune-up special in Denver' — actually relevant to my business. But... 'Copy & paste to Google'? I have to do it myself? I thought 'we handle everything' meant it was automatic."

"Reviews — oh, I have to paste the review text in. And then copy the response back to Google. This is faster than writing it myself but it's not automated."

"The AI Readiness Checker — this is cool! I scored 42/100. It's telling me exactly what to fix. But I don't know how to implement half of these recommendations."

**Critical objections:**
1. "The content quality is genuinely impressive. Way better than what I'd write."
2. "But 'we handle everything' is a lie. I'm still doing manual copy-paste for every post and every review response."
3. "Where's the monthly report? I don't see any way to generate one."
4. "I love the AEO stuff conceptually, but I don't have a web developer to implement the llms.txt file or schema markup on my website."
5. "The deployment instructions (WordPress/Squarespace) are helpful but I still have to do the work."
6. "'Mike R.' testimonial feels fake. Real testimonials would help me trust this more."

**Verdict:** "The AI writing is the best I've seen for local businesses. If it actually auto-posted and auto-replied, this would be a no-brainer at $49. Right now it's a really good content writer, not a marketing automation tool."

**Score: 6/10 (would be 8.5/10 with auto-posting and real reports)**

---

### PERSONA 3: Bob Thompson (Tech-Averse Plumber, 52, one location)

#### Bob Visits BrightLocal.com

**First 10 seconds:** "'Local SEO Software, Citations, and Services.' What's a citation? [scrolls] 'Rank Tracker, Citation Tracker, GBP Audit...' I don't know what any of this means. This is for marketing people, not plumbers."

**Pricing page:** "$39/month? For what? Tracking my rankings? I just want more calls. I don't need tracking software."

**Feature evaluation:** [Doesn't get past the feature list] "I see words like 'citation monitoring,' 'geo rankings,' 'on-site SEO auditing.' None of this makes sense to me. Where's the part that gets me more phone calls?"

**Objections:** "This is way too complicated. I'm not an SEO expert. I don't want to learn what citations are. I want someone to just handle my Google page so people call me."

**Verdict:** "Not for me. I need to call an actual marketing person, not use software."

**Score: 2/10**

#### Bob Visits LocalBeacon.ai

**First 10 seconds:** "'Your phone rings more. We handle everything.' Okay, I'm listening. 'For plumbers, roofers, dentists & more' — they know my industry. The dashboard shows Google Views, Phone Clicks — those are numbers I understand."

**Features section:** "'Show up on Google Maps' — I want that. 'Rank in every city you serve' — I serve 5 cities around Denver. 'Every review gets a reply' — I have 3 unanswered bad reviews right now. 'Monthly proof it's working' — I like seeing numbers."

**Before/After section:** "'Without LocalBeacon: You forget to post for weeks — Google thinks you're inactive.' That's literally me. 'With LocalBeacon: Fresh posts go out every week. You don't touch a thing.' I want that."

**Pricing page:** "$49/month? My buddy pays his marketing guy $800/month for less than this. And I can try it free first?"

**Signs up:** "Connect my Google listing... okay, I signed in with Google. It pulled in my business info. That was easy."

**Dashboard:** "I see all these tools. Let me try GBP Posts... it wrote a post about spring drain cleaning in Denver! That actually sounds good. But... 'Copy text and paste into Google Maps'? I have to do that part?"

"My wife asked me to respond to that bad review from last week. Let me try Reviews... I paste the review... it wrote a really nice response! But now I have to go to Google and paste it there? Where do I even do that?"

**Critical objections:**
1. "The writing is great — sounds like a local wrote it, not a robot."
2. "But I thought 'we handle everything' means I don't have to do anything. I still have to copy and paste stuff. That's confusing."
3. "I don't understand AI Readiness Checker or llms.txt. What's a 'schema markup'? These tools aren't for me."
4. "The simple stuff (posts, reviews) is really good. The tech stuff (schema, FAQs, AI readiness) goes over my head."
5. "'Mike R., Mike's Plumbing' — is that a real person or made up? If it's real, I'd want to call him and ask if this works."
6. "I'd pay $49/month IF it just did everything automatically. Right now I'm paying $49 to write things I still have to post myself."

**Verdict:** "The writing is better than anything I could do. But 'we handle everything' isn't true — I still have a lot of manual steps. If they fix that, I'm in. Right now it's probably worth $29, not $49."

**Score: 5/10 (would be 9/10 with true automation)**

---

## CROSS-PERSONA SUMMARY

### Universal Praise (All 3 personas agree)
1. **AI content quality is genuinely good** — all three found the generated posts, city pages, and review responses high quality and locally relevant
2. **AEO differentiation is real** — nobody else offers AI Readiness Checker or llms.txt generation
3. **Landing page copy is strong** — "More calls. Less work." resonates with all three
4. **Pricing is competitive** — $49/mo significantly undercuts agencies; $99/mo agency plan is attractive vs BrightLocal at scale

### Universal Criticism (All 3 personas agree)
1. **"We handle everything" is the biggest lie on the site** — manual copy-paste is not "handling everything"
2. **Multiple promised features don't exist** — rank tracking, competitor monitoring, white-label reports, monthly reports, multi-client dashboard
3. **Fake testimonial damages trust** — "Mike R." is fabricated social proof
4. **No auto-posting is the #1 dealbreaker** — GBP API approval is the critical blocker
5. **Free tier value prop is weak** — "Copy & post to Google yourself" for free tier is transparent but underwhelming

### Feature Gaps by Priority (Personas x Impact)

| Gap | Alex (Agency) | Taylor (SMB) | Bob (Plumber) | Priority |
|-----|--------------|-------------|---------------|----------|
| Auto-posting to GBP | CRITICAL | CRITICAL | CRITICAL | 🔴 #1 |
| Monthly visibility report | HIGH | HIGH | MEDIUM | 🔴 #2 |
| Rank tracking | CRITICAL | HIGH | LOW | 🔴 #3 |
| Multi-client dashboard | CRITICAL | N/A | N/A | 🟡 #4 (Agency only) |
| White-label reports | CRITICAL | N/A | N/A | 🟡 #5 (Agency only) |
| Remove fake testimonial | HIGH | HIGH | HIGH | 🔴 #6 |
| Review monitoring (not just response) | HIGH | MEDIUM | MEDIUM | 🟡 #7 |
| Overview page with real data | HIGH | HIGH | MEDIUM | 🟡 #8 |
| Competitor monitoring | MEDIUM | MEDIUM | LOW | 🟢 Later |

### What We Should Fix on the Website BEFORE Charging Money

1. **Remove or caveat "we handle everything"** — change to "we write everything" or "we create everything, you publish it"
2. **Remove the fake Mike R. testimonial** — replace with "Be our first success story" CTA or remove entirely
3. **Remove "auto-scheduled weekly" from Solo plan** — change to "generated weekly, ready to post"
4. **Remove "rank tracking" from competitive comparison** — we don't have it
5. **Remove "competitor monitoring & alerts" from Agency plan** — we don't have it
6. **Remove "white-label reports" from Agency plan** — we don't have it
7. **Remove "multi-client dashboard" from Agency plan** — we don't have it
8. **Add "Manual posting mode — auto-publish coming soon" to pricing page**
9. **Add "Trusted by local businesses" only when we actually have users**
10. **Change "Monthly visibility report" to "Monthly content summary" (which we can actually build)**

---

## APPENDIX: BrightLocal Pricing Detail (March 2026)

- **Track:** $39/mo — rank tracking, citations, GBP audit, SEO audit
- **Manage:** $49/mo — everything in Track + Active Sync (listing management), GBP Post Scheduler, bulk posting
- **Grow:** $59/mo — everything in Manage + review monitoring, review generation, review showcase widget
- **Local SEO Services:** Price on request — done-for-you
- **Citation Builder:** Pay-as-you-go ($2-3.20/submission)
- **Yext Replacement Service:** Price on request
- All plans include white-label reporting and Agency Lead Generator
- 14-day free trial, no credit card required
- Starting at $39/mo is per-location pricing with volume discounts

---

---

## PART 4 — VISUAL SCREENSHOT ANALYSIS

*22 BrightLocal screenshots and 7 LocalBeacon screenshots reviewed from David's captures.*

### LocalBeacon.ai — Visual Issues Found

1. **Hero section** — The dashboard mockup (Mike's Plumbing) is compelling but the same "Mike R." appears as the testimonial later. Combined, it reads as fabricated.
2. **Features grid** — 3+2 card layout leaves the bottom row visually unbalanced. The two bottom cards sit left-aligned rather than centered.
3. **"Google rewards that with higher placement"** — Stated as fact in the features section. Google has not publicly confirmed posting frequency directly improves Maps ranking. This is an overstatement.
4. **"Visible to AI assistants — your business shows up"** — Bold claim with no guaranteed mechanism. AEO is probabilistic, not deterministic.
5. **Pricing cards** — Solo tier properly highlighted with orange border + "Most Popular" badge. Agency tier lists features that don't exist (multi-client dashboard, white-label reports, competitor monitoring).
6. **Overall design quality** — Clean, professional, warm color palette works. Typography hierarchy is good. CTA placement is solid. The site looks like a real product, which makes the feature gaps more jarring when discovered.

### BrightLocal.com — Design Patterns Worth Stealing

1. **Animated hero dashboard** — Alternates between a "good" business (4.59 rating, 102 calls) and "struggling" business (3.11 rating, 32 calls). Brilliant before/after storytelling.
2. **Enterprise logo bar** — Home Depot, Krispy Kreme, wagamama, Nando's. Mixes enterprise with mid-market. We have zero logos.
3. **Audience segmentation cards** — "For Scaling Agencies" and "For Small Businesses" with persona-specific testimonials embedded in each card. Smart routing.
4. **"Choose your path" framework** — DIY vs Done-for-you with "Choose this route if you:" checklists. Helps visitors self-qualify.
5. **Video testimonials** — Three video testimonials with real names, titles, companies, and specific results ("dominant positions of 1st, 2nd, and 3rd"). Dramatically more credible than our text-only fake quote.
6. **Real team photos** — Support section shows actual employees. Humanizes the brand.
7. **Third-party badges** — G2 (4.6/5), Capterra (4.8/5) prominently displayed. We're not listed on either.
8. **Free tools** — Search Results Checker, RankFlux, Review Link Generator. Drives organic traffic and builds trust before purchase.
9. **Pre-footer newsletter** — "Join 55,000+ savvy marketers." Multiple engagement paths for prospects not ready to buy.
10. **"NEW" badges** in footer navigation signal active product development.

### Top 10 Visual/UX Actions for Sprint 8

1. **Remove fake testimonial** — Replace "Mike R." with either a real early user quote or remove entirely
2. **Fix pricing page claims** — Remove features we haven't built from Agency tier
3. **Add "Manual posting mode" disclosure** — Clear expectation setting before sign-up
4. **Center the 2-card bottom row** in features section
5. **Add a "How it works" animation** — Even a simple GIF showing the content generation flow
6. **Get listed on G2 and Capterra** — Even with 0 reviews, having a profile builds credibility
7. **Create a free tool** — The AI Readiness Checker could be a public, no-login tool that drives traffic
8. **Add real team photos** — Even just David's photo with "Founded by David Nielsen"
9. **Add newsletter capture** — Pre-footer email signup
10. **Soften outcome claims** — "helps you get found" not "your business shows up"

---

*Generated: March 3, 2026*  
*Sources: BrightLocal.com (live site fetch + 22 screenshots), LocalBeacon.ai (live site fetch + 7 screenshots), LocalBeacon codebase audit, persona research (personas.md)*

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
