# Sprint 6 — Answer Engine Optimization (AEO)

**Goal:** Make LocalBeacon clients' businesses discoverable by AI search engines (ChatGPT, Perplexity, Claude, Google AI Overviews, Copilot). Apply the same techniques to our own product sites. Build continuous research into the platform so we're always ahead.

**Timeline:** Immediately after Sprint 5

---

## Context & Why This Matters

Traditional search is declining. Gartner projects a 25% drop in traditional search volume in 2026. ChatGPT has 800M weekly users. Google AI Overviews reach 2B monthly users. Perplexity processes hundreds of millions of queries.

**The shift:** People don't Google "plumber near me" anymore. They ask ChatGPT: *"Who is the most trusted plumber in Burnsville MN that offers same-day service?"* — and get ONE answer. If Bob's Plumbing isn't in that answer, he doesn't exist.

**Why LocalBeacon wins here:** Nobody is doing AEO for local businesses. BrightLocal tracks rankings. Localo writes posts. We make businesses **citable by AI**. This is the moat.

**What the research says works:**
- AI engines cite 2-7 domains per response — you need to be one of them
- FAQ and Q&A format content gets cited at massively higher rates
- Local pages with structured data (Schema.org LocalBusiness) are gold for geo-specific AI queries
- `llms.txt` is the emerging standard — AI crawlers actively look for it
- Content freshness matters — recent dates in titles increase citation likelihood
- Third-party mentions/reviews matter more than self-promotion
- Entity consistency (same NAP everywhere) builds AI trust
- Conversational, answer-first content structure outperforms keyword-stuffed pages

---

## Sprint Items

### LB-S6-01 · AEO Content Generator
Upgrade all content generators to produce AEO-optimized output. Every piece of content we generate should be structured for AI citation, not just traditional SEO.

**Changes to existing generators:**
- **GBP Posts:** Add FAQ-style content options. Start posts with direct answers, not fluff. Include specific service + location in every post ("Same-day water heater repair in Apple Valley, MN").
- **City Pages:** Restructure to answer-first format. Each page opens with a 2-sentence direct answer to "Who is the best [category] in [city]?", followed by structured FAQ section (5-8 Q&As), service list with descriptions, and clear NAP block.
- **Blog Posts:** Add "AI Answer" section at top — a 50-word direct answer that AI can extract verbatim. Use H2/H3 hierarchy that works as standalone passages. Every blog post includes at least one FAQ section.
- **Review Responses:** Make review responses keyword-rich and specific ("Thank you for choosing Thompson Plumbing for your kitchen sink repair in Burnsville!") — AI engines index review responses.

**New generator: FAQ Page Builder**
- Generate a comprehensive FAQ page for the client's website
- 15-25 questions based on their service category + location
- Questions written the way real people ask AI ("How much does a furnace replacement cost in Eagan MN?")
- Answers are direct, factual, 2-3 sentences — exactly what AI engines want to cite
- Schema.org FAQPage markup included in output

**Success criteria:** Generate content for a test business → paste into a page → validate it passes Google Rich Results Test for FAQ schema → content reads as direct answers, not marketing fluff.

### LB-S6-02 · Client `llms.txt` Generator
Generate a ready-to-deploy `llms.txt` file for each client's website that tells AI crawlers exactly what the business does, where it operates, and what content to surface.

**Template structure:**
```markdown
# [Business Name]

> [One-sentence description with location]

## About
[2-3 sentences: what we do, where, how long, specialties]

## Services
- [Service 1]: [brief description + typical cost range if available]
- [Service 2]: ...

## Service Areas
[City 1], [City 2], [City 3]... [State]

## Contact
- Phone: [number]
- Address: [full address]
- Hours: [hours]
- Website: [url]
- Google Business Profile: [url if connected]

## Reviews Summary
[Average rating] stars from [count] reviews on Google
Customers frequently praise: [top themes from reviews]

## FAQ
- Q: [common question]
  A: [direct answer]
```

**Dashboard UI:** "Download Your AI File" button on dashboard → generates `llms.txt` → instructions for where to place it (`yourdomain.com/llms.txt`). Bob gets a one-click download with plain English instructions.

**Success criteria:** Generated llms.txt is valid markdown, under 2KB, contains all business info, downloadable from dashboard.

### LB-S6-03 · Schema Markup Upgrade (AEO-Optimized)
Upgrade Sprint 5's schema generator from basic output to comprehensive AEO-ready markup.

**Expand schema types:**
- `LocalBusiness` (already have — enhance with `areaServed`, `hasOfferCatalog`, `aggregateRating`, `review`)
- `FAQPage` (already have — connect to FAQ generator output)
- `Service` schema for each service offered (new)
- `Organization` with `sameAs` links to all business profiles (new)
- `BreadcrumbList` for site structure (new)
- `HowTo` schema for service process pages (new — "How to prepare for a plumbing inspection")

**Key additions:**
- `areaServed` property with all service cities
- `aggregateRating` from Google reviews
- `sameAs` links to Google Business Profile, Yelp, Facebook, etc.
- Proper `@id` references so entities connect across pages

**Output format:** Full JSON-LD block, copy-pasteable into any website's `<head>` tag. Preview showing how Google/AI will interpret it.

**Success criteria:** Schema passes Google Rich Results Test. Covers LocalBusiness + FAQ + Service + Organization. All entity relationships properly linked.

### LB-S6-04 · AI Crawler Readiness Checker
New audit feature: check if a client's website is configured to be found by AI search engines.

**Checklist items (scored 0-100):**
1. ✅/❌ `llms.txt` exists at root
2. ✅/❌ `robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
3. ✅/❌ Schema.org LocalBusiness markup present
4. ✅/❌ FAQPage schema present
5. ✅/❌ NAP consistency (name/address/phone match across visible elements)
6. ✅/❌ Open Graph tags present (AI engines use these)
7. ✅/❌ Mobile-friendly (AI engines deprioritize non-mobile sites)
8. ✅/❌ SSL/HTTPS active
9. ✅/❌ Page load speed under 3s
10. ✅/❌ Sitemap.xml present
11. ✅/❌ H1/H2 hierarchy is clean (not broken/missing)
12. ✅/❌ FAQ content exists on site
13. ✅/❌ Service area pages exist
14. ✅/❌ Review schema or testimonials present
15. ✅/❌ Content freshness (pages updated within 6 months)

**Dashboard page:** `/dashboard/ai-readiness` — enter client website URL → scan → get scored report with fix-it instructions for each failing item. Bob-friendly language ("Your website is blocking AI from finding you — here's how to fix it").

**Success criteria:** Scan localbeacon.ai → get 90+ score. Scan a random local plumber website → get realistic score with actionable recommendations.

### LB-S6-05 · Apply AEO to Our Own Sites
Eat our own cooking. Apply everything we're building to LocalBeacon.ai, Speclint.ai, VitalLens.ai, and DankBot.ai.

**Per site:**
1. **Upgrade `llms.txt`** — full capabilities, services, pricing, FAQ, structured for AI consumption
2. **Add comprehensive FAQ sections** — answer the questions people would ask AI about our products
3. **Schema markup** — Organization + SoftwareApplication + FAQPage + Service
4. **Ensure AI crawler access** — check robots.txt on all sites, explicitly allow GPTBot, ClaudeBot, PerplexityBot
5. **Answer-first content structure** — every landing page opens with a direct answer to "What is [product]?"
6. **Entity consistency** — same business info (Perpetual Agility LLC) across all sites, proper `sameAs` linking

**Deliverables:**
- `localbeacon.ai/llms.txt` — upgraded
- `speclint.ai/llms.txt` — upgraded
- `vitallens.ai/llms.txt` — created/upgraded
- `dankbot.ai/llms.txt` — created (if web presence exists)
- Schema markup deployed on each site
- FAQ sections added to each landing page
- AI crawler rules verified on each site

**Success criteria:** All 4 sites score 90+ on our own AI Readiness Checker. Each has a comprehensive llms.txt. Schema validates on Google Rich Results Test.

### LB-S6-06 · AEO Research Engine (Continuous)
Build a living research system that keeps LocalBeacon ahead of the AEO curve. This space evolves weekly — we need to track it.

**Components:**

**A) AEO Knowledge Base** (`products/localbeacon/research/aeo/`)
- `aeo-playbook.md` — master document of proven AEO techniques, updated monthly
- `ai-crawler-registry.md` — known AI crawlers, their user-agents, what they look for, how to allow/block
- `schema-catalog.md` — every Schema.org type relevant to local businesses with examples
- `citation-patterns.md` — documented patterns of what gets cited by each AI engine (ChatGPT vs Perplexity vs Claude vs Google AI Overviews)

**B) AEO Monitoring Cron**
- Weekly script that:
  - Checks top AEO/GEO blogs (Search Engine Land, HubSpot, Amsive, CXL) for new articles
  - Searches X for "answer engine optimization" + "local SEO AI" discourse
  - Logs findings to `memory/aeo-research.md`
  - Alerts if a major AI search engine changes its citation behavior
- Model: `ollama/llama3.2:3b` (just RSS fetch + summarize)

**C) Competitive AEO Tracking**
- Monthly check: search each AI engine for queries like "best [category] in [city]" for our clients
- Document which competitors show up, what content they have that earns citations
- Feed insights back into content generator improvements

**Success criteria:** Knowledge base populated with real, current information. Cron running weekly. First competitive scan completed for 3 test queries across ChatGPT and Perplexity.

---

## Constraints & What NOT To Do

- **Don't build an AI citation monitoring SaaS** (yet) — that's a product in itself. Just build the knowledge and tools.
- **Don't auto-publish anything to client websites** — we generate, they deploy. Manual-paste MVP mode continues.
- **Don't scrape AI engines at scale** — targeted manual queries for competitive research only. Respect ToS.
- **Don't promise specific AI citation placement** — we optimize for citability, not guarantee placement. Marketing copy must reflect this.
- **Don't over-engineer the research cron** — RSS + search + summary is enough. No custom crawlers.
- **Don't forget the Bob test** — every dashboard feature needs Bob-friendly language. "AI Readiness Score" not "GEO Audit." "Get Found by AI" not "Answer Engine Optimization."

---

## Persona Validation

**👨‍💼 Alex (Agency):** "This is what I'd actually pay $99/mo for. I can run AI readiness audits for clients, generate their llms.txt files, and position myself as an AEO agency. The research engine keeps me ahead of competitors who don't know this space exists yet."

**👩‍💻 Taylor (Tech-Savvy SMB):** "The AI Readiness Checker is something I'd use immediately. I want to know if ChatGPT recommends my HVAC company. The FAQ generator saves me hours — I know I need FAQ content but never have time to write it."

**🔧 Bob (Plumber):** "I don't know what AEO is, but if you tell me 'when someone asks their phone to find a plumber, your business shows up' — I'm in. The AI readiness score is something I can understand: my score is 45, I want it to be 90. Show me what to fix."

---

## Verification Steps

1. Generate AEO-optimized city page for test business → content starts with direct answer, includes FAQ section with schema, passes Rich Results Test
2. Generate llms.txt for test business → valid markdown, under 2KB, all sections populated
3. Run AI Readiness Checker on localbeacon.ai → scores 90+
4. Run AI Readiness Checker on a random plumber website → returns realistic score with actionable items
5. All 4 product sites have upgraded llms.txt deployed and validating
6. AEO knowledge base has 4 populated reference docs
7. Weekly cron is running and logging to memory

---

## Dependencies

- Sprint 5 complete ✅
- Access to product site codebases (LocalBeacon, Speclint — have; VitalLens — have; DankBot — have)
- Anthropic API for enhanced content generation

---

*Created: March 2, 2026*
*Research sources: Search Engine Land (GEO 2026 guide), HubSpot (AEO trends 2026), Amsive (AEO complete guide), CXL (AEO comprehensive guide), r/localseo (practitioner reports), llmstxt.org (specification)*

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
