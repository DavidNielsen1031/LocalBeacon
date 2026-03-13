# AEO Playbook — Proven Techniques for AI Search Visibility

*Last updated: March 2, 2026*
*Sources: Search Engine Land, HubSpot, Amsive, CXL, r/localseo, llmstxt.org*

---

## What is AEO?

Answer Engine Optimization (AEO) / Generative Engine Optimization (GEO) is the practice of structuring content so AI-powered search platforms (ChatGPT, Google AI Overviews, Perplexity, Claude, Copilot) retrieve, cite, and recommend your brand when answering user questions.

**Key stat:** AI engines cite only 2-7 domains per response. You must be one of them.

---

## Proven Techniques (ranked by impact)

### 1. Answer-First Content Structure (HIGH)
- Start every page/section with a clear, direct answer (2-3 sentences)
- AI extracts the first relevant passage it finds
- Use TL;DR statements under key headings
- Each section should stand alone as a citable answer

### 2. FAQ Pages with Schema (HIGH)
- FAQPage schema is heavily weighted by all major AI engines
- Write questions the way people ask AI: "How much does X cost in [city]?"
- Answers: 2-3 sentences, direct, factual, no marketing fluff
- Include 15-25 questions per page
- Mix: cost, timeline, comparison, emergency, "do you offer" questions

### 3. llms.txt File (HIGH)
- Emerging standard at llmstxt.org
- Machine-readable Markdown at website root
- Tells AI crawlers: what you do, where, services, contact, FAQ
- Keep under 2KB
- AI crawlers actively look for this file

### 4. Comprehensive Schema Markup (HIGH)
- LocalBusiness with areaServed, hasOfferCatalog, aggregateRating
- FAQPage for every FAQ section
- Service schema for each service
- Organization with sameAs links to all profiles
- BreadcrumbList for site navigation
- HowTo for process/guide content

### 5. Local City Pages (HIGH for local businesses)
- Dedicated page per service area city
- Include: NAP, service descriptions, local FAQ, testimonials
- "Plumbing Services in Apple Valley, MN" format
- Each page answers: "Who is the best [service] in [city]?"
- HubSpot data: local pages drove measurable ChatGPT conversion increases

### 6. Entity Consistency (MEDIUM-HIGH)
- Same NAP (Name, Address, Phone) everywhere
- Consistent brand mentions across the web
- Knowledge panel management
- sameAs links connecting all profiles

### 7. Third-Party Signals (MEDIUM-HIGH)
- AI engines favor earned media over self-promotion (Princeton study)
- Reviews, mentions, industry coverage matter more than own-site content
- Digital PR is now a direct AEO lever
- Encourage customer reviews (they get indexed)

### 8. Content Freshness (MEDIUM)
- Include current year in titles and meta
- "Last updated" timestamps on pages
- Regular content updates (weekly minimum for blog)
- AI deprioritizes stale content

### 9. AI Crawler Access (MEDIUM)
- robots.txt must allow: GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- Don't block AI crawlers thinking it protects content
- Fast load times improve crawlability

### 10. Review Response Optimization (MEDIUM for local)
- Review responses get indexed by AI
- Include service + location keywords naturally
- "Thank you for choosing [Business] for your [service] in [city]!"

---

## What NOT To Do

- Don't keyword-stuff — AI detects this and deprioritizes
- Don't create thin/duplicate city pages — unique content per page
- Don't promise specific AI citation placement — we optimize citability
- Don't block AI crawlers in robots.txt
- Don't ignore freshness — undated content loses to dated content
- Don't rely solely on own-site content — third-party signals matter more

---

## Measurement (emerging)

- **AI Citation Frequency:** How often your brand appears in AI answers
- **Share of Voice:** Your mentions vs competitors across AI platforms
- **Citation Sentiment:** Whether AI presents you accurately/positively
- **AI-Referred Traffic:** Track via GA4 (referrer: chatgpt.com, perplexity.ai, etc.)
- **Manual Spot Checks:** Periodically query AI engines for target phrases

Tools: HubSpot AEO Grader (free), Geoptie, CoreMention, OmniSEO

---

## Platform-Specific Notes

### ChatGPT
- Best with conversational content and comprehensive topic coverage
- Strongly favors FAQ format
- Cites pages with clear, direct answers early in content

### Perplexity
- Requires strong citation practices and factual accuracy
- Values recent, well-sourced content
- Shows source URLs prominently

### Google AI Overviews
- Reaches 2B monthly users
- Pulls from traditional search index (SEO still matters)
- Favors pages with schema markup

### Claude
- Values structured, well-organized content
- llms.txt helps significantly
- Tends to cite authoritative sources

---

*Next review: April 2, 2026*

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
