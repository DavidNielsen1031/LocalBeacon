# Show HN Draft — LocalBeacon AI Readiness Checker

## Post Title
Show HN: Free AI Readiness Checker — see if local businesses show up in ChatGPT/Perplexity

## Post Body

I built a free tool that scans any local business website and tells you how likely AI assistants are to recommend that business: https://localbeacon.ai/check

**What it does:** Enter a URL and it runs 14 checks that affect whether ChatGPT, Perplexity, Claude, and Google AI Overview will surface that business when someone asks for a local service. Takes about 30 seconds.

**The 14 signals it checks:**
- llms.txt file (the robots.txt for AI crawlers)
- robots.txt AI crawler permissions
- Schema.org structured data (LocalBusiness, Service, FAQ)
- FAQ content
- HTTPS
- Open Graph metadata
- Mobile responsiveness
- Sitemap
- Heading structure
- Service pages
- Content freshness
- Review schema
- Answer-first content structure
- NAP consistency (Name, Address, Phone)

**Why I built it:** I'm a product coach who got curious about Answer Engine Optimization (AEO) — the idea that optimizing for AI assistants is becoming as important as traditional SEO. I couldn't find any free tool that checked whether a local business was "AI-ready," so I built one.

Most local businesses (plumbers, dentists, roofers, etc.) have no idea their website is invisible to AI search. Their sites were built for Google 2015, not ChatGPT 2026. Simple things like adding a llms.txt file, FAQ schema, or service-specific pages can make a meaningful difference.

**Technical details:**
- Built with Next.js, deployed on Vercel
- Scans run server-side with parallel async checks
- Each signal has a weighted score contributing to a 0-100 composite
- No login required for the basic scan
- Rate limited (3 scans/hour client-side)

**What I learned building this:**
- Most local business sites score 20-40 out of 100. The bar is incredibly low.
- The #1 missing signal is structured data — almost no small business sites have LocalBusiness schema.
- llms.txt adoption is near zero for local businesses (even though it's trivial to add).
- AI assistants heavily favor sites with FAQ content and answer-first page structure.

The checker is part of a larger product (LocalBeacon — local visibility tools for small businesses), but the checker itself is completely free, no signup required.

Would love feedback on the scoring methodology and any signals I'm missing.

---

## Submission Plan

**Best time:** Tuesday–Thursday, 9-11 AM ET (highest HN traffic)
**Avoid:** Weekends, Mondays, Fridays

**Day-of checklist:**
1. Submit at ~9:30 AM ET
2. Monitor comments for first 2 hours
3. Respond to every comment within 30 min
4. Be technical and honest — HN hates marketing speak
5. If asked about the paid product, be upfront: "The checker is free. I also built paid tools for managing content/visibility, but the checker will always be free."

**Engagement guidelines:**
- Answer technical questions with depth (scoring methodology, signal weights, implementation)
- Be honest about limitations (manual posting, no auto-publish, GBP API pending)
- Share specific data points ("most local sites score 20-40")
- Don't argue with critics — acknowledge valid points
- If someone suggests a new signal, thank them and consider adding it

**Potential objections and responses:**
- "This is just SEO snake oil" → "Fair concern. The score is based on 14 specific, verifiable signals — you can see exactly what it checks and why. Happy to discuss the methodology."
- "llms.txt doesn't matter" → "It's early, but Anthropic, Perplexity, and others are starting to crawl it. Low effort to add, potential upside."
- "Why not just use Lighthouse?" → "Lighthouse checks web performance. This checks AI discoverability — different signals (schema, FAQ content, llms.txt, answer-first structure)."

---

## David's HN Account
- Username: `dnielsen1031`
- Note: Used previously for Speclint Show HN (https://news.ycombinator.com/item?id=47281933)
