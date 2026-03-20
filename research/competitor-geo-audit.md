# GEO/AEO Competitor Audit — March 19, 2026

## Competitor 1: geo-seo-claude (Zubair Trabzada)
**GitHub:** github.com/zubair-trabzada/geo-seo-claude
**Type:** Claude Code skill (not a product — a free tool)
**License:** MIT
**Monetization:** Skool community ($?) teaching people to sell GEO services ($2K-$12K/mo)

### What it does
- Full GEO + SEO audit via Claude Code slash commands (`/geo audit <url>`)
- 11 specialized sub-skills running as parallel subagents
- Citability scoring (optimal AI-cited passages: 134-167 words)
- AI crawler access analysis (14+ crawlers: GPTBot, ClaudeBot, etc.)
- Brand mention scanning (YouTube, Reddit, Wikipedia, LinkedIn, 7+ platforms)
- llms.txt generation and validation
- JSON-LD schema templates (6 types: Organization, LocalBusiness, Article, SaaS, Product, WebSite)
- PDF report generation with charts (ReportLab)
- Platform-specific optimization (ChatGPT, Perplexity, Google AIO)

### GEO Score Breakdown
- AI Citability & Visibility: 25%
- Brand Authority Signals: 20%
- Content Quality & E-E-A-T: 20%
- Technical Foundations: 15%
- Structured Data: 10%
- Platform Optimization: 10%

### Strengths (steal these)
1. **Citability scoring** — analyzes content blocks for AI citation readiness. We don't do this.
2. **Brand mention scanning** — checks if business is mentioned on platforms AI cites. We don't do this.
3. **Platform-specific optimization** — tailored recs per AI engine. We score generically.
4. **14 AI crawlers checked** — we only check robots.txt generically.
5. **PDF report generation** — client-ready deliverable. We don't have this.
6. **E-E-A-T assessment** — content quality scoring. We don't do this.
7. **Parallel subagent architecture** — fast audits. We run sequentially.

### Weaknesses (our advantage)
1. **Requires Claude Code CLI** — technical users only. We're a dashboard.
2. **No SaaS/recurring revenue** — it's a free tool. Money comes from community.
3. **No business management** — one-shot audits, no ongoing tracking.
4. **No GBP integration** — doesn't manage posts, reviews, or local presence.
5. **No multi-location support** — agencies need to run audits manually per client.

---

## Competitor 2: seo-agi (Greg Bessoni)
**GitHub:** github.com/gbessoni/seo-agi
**Type:** Claude Code / OpenClaw / Codex skill
**License:** MIT
**Background:** 20+ years SEO in ground transportation, 1M+ bookings

### What it does
- Full SERP → page generation pipeline (one command = published page)
- Pulls top 10 SERP results via DataForSEO
- Analyzes competitor content (word count, headings, topics)
- Extracts People Also Ask questions
- Detects search intent (informational/commercial/transactional)
- Writes complete pages with YAML frontmatter
- Generates JSON-LD schema by page type
- Content quality checklist (80% pass = publish, <60% = rewrite)
- GBP optimization (holiday hours, Q&A, service items)
- Integrates DataForSEO, Google Search Console, Ahrefs, SEMRush

### GEO-specific strategies
- Entity-rich writing for LLM extraction
- RAG targeting: zero-volume long-tail queries that "train" AI to cite your domain
- Reddit subdomain indexing for entity consensus
- Topical circle enforcement (stay in your lane)
- Off-page sequencing: establish third-party presence before on-page

### Strengths (steal these)
1. **Content generation, not just auditing** — writes full pages. We could do this for city pages.
2. **DataForSEO integration** — live SERP data, keyword volumes, PAA. Massive competitive intelligence.
3. **Competitive gap analysis** — finds what top-rankers have that you don't.
4. **Intent detection** — tailors content to search intent. Smart.
5. **Content refresh workflow** — point at underperforming URL, get rewrite with change log.
6. **Location page generation** — `/seoagi "plumber in [city]" x 50 cities`. Direct competitor to our pSEO.
7. **GBP-as-AEO** — treats GBP fields as AEO markup, not just admin work. Smart framing.
8. **Quality checklist with scoring** — automated pass/fail before publish.

### Weaknesses (our advantage)
1. **Requires DataForSEO API ($0.002/query)** — adds cost for SMBs.
2. **CLI-only** — no dashboard, no visualizations.
3. **No ongoing management** — generates pages, doesn't maintain them.
4. **No review management** — doesn't handle review responses.
5. **No automated posting** — doesn't auto-post to GBP.

---

## Competitor 3: aeo.js (Ruben Marcus)
**Website:** aeojs.org / check.aeojs.org
**Type:** npm package (developer tool)
**License:** Unknown (likely MIT)
**Frameworks:** Astro, Next.js, Vite, Nuxt, Angular, Webpack

### What it does
- Auto-generates AEO files: robots.txt, llms.txt, llms-full.txt, sitemap.xml, schema.json, ai-index.json
- GEO Readiness Score (0-100) with 5 categories:
  - AI Access (20pts)
  - Content Structure (20pts)
  - Schema Presence (20pts)
  - Meta Quality (20pts)
  - Citability (20pts)
- Human/AI toggle widget — visitors see markdown version of page
- check.aeojs.org — free web scanner
- Framework integrations (plug-and-play)

### Strengths (steal these)
1. **Auto-file generation** — one command generates all AEO files. We generate llms.txt but not ai-index.json.
2. **Scoring categories are cleaner** — 5 equal-weight categories vs our 14 mixed-weight rules.
3. **Human/AI toggle widget** — clever marketing tool. Shows clients what AI sees.
4. **check.aeojs.org scanner** — free web tool drives traffic. We could build this.
5. **ai-index.json** — new standard we're not supporting yet.

### Weaknesses (our advantage)
1. **Developer-only** — requires npm, config files, build pipeline.
2. **No local SEO** — no GBP, no reviews, no city pages.
3. **No business management** — tool, not platform.
4. **No content creation** — generates meta-files, not actual content.

---

## Feature Gap Analysis: What We Should Steal

### 🔴 Critical (build next sprint)
1. **Citability scoring** — Score content blocks for AI citation readiness (134-167 word passages, fact-rich, self-contained). Source: geo-seo-claude.
2. **AI crawler detection** — Check robots.txt for all 14 AI crawlers individually, not just generic check. Source: geo-seo-claude.
3. **ai-index.json generation** — New standard for AI content discovery. Source: aeo.js.

### 🟡 High value (build soon)
4. **Brand mention scanning** — Check if business appears on platforms AI cites (YouTube, Reddit, Yelp, Wikipedia). Source: geo-seo-claude.
5. **PDF/client report** — Generate downloadable audit report. Source: geo-seo-claude.
6. **Free public scanner** — check.localbeacon.ai — scan any URL, no signup. Lead gen magnet. Source: aeo.js pattern.
7. **Content gap analysis** — Compare business site against top competitors for same keywords. Source: seo-agi.
8. **E-E-A-T scoring** — Content quality, expertise signals, author authority. Source: geo-seo-claude.

### 🟢 Nice to have (backlog)
9. **Human/AI toggle widget** — Show clients what AI sees. Cool demo but niche. Source: aeo.js.
10. **Platform-specific scores** — Separate scores for ChatGPT vs Perplexity vs Google AIO. Source: geo-seo-claude.
11. **DataForSEO integration** — Live SERP data for competitive analysis. Source: seo-agi.
12. **Automated page generation from SERP gaps** — Full content creation from competitive data. Source: seo-agi.

---

## Our Competitive Advantage (what NONE of them have)

1. **Full-stack local marketing platform** — GBP posts + city pages + reviews + AI readiness in one dashboard
2. **Non-technical users** — Dashboard, not CLI. SMB owners can use it
3. **Ongoing management** — Not one-shot audits. Continuous posting, monitoring, improving
4. **Multi-business support** — Agencies manage all clients in one place
5. **Automated content pipeline** — Blog cron, city page generation, review responses
6. **pSEO at scale** — 60+ industry pages, expanding to 300+
7. **Pricing for SMBs** — $49/mo Solo, $99/mo Agency. Competitors are either free tools or $2K-$12K agency services

## Summary

None of these are direct competitors — they're developer tools masquerading as products. Our real competition is BrightLocal, Yext, and Moz Local. But these tools have smart IDEAS we should steal, especially citability scoring, AI crawler enumeration, and the free public scanner as a lead gen magnet.

The biggest gap: **we audit but don't explain WHY in AI terms.** Our 14-rule check says "pass/fail" but doesn't teach the business owner what "AI citability" means or why it matters. geo-seo-claude's explanation layer is better than ours.
