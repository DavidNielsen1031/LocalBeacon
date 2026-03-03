# AI Crawler Registry

*Last updated: March 2, 2026*

## Known AI Crawlers

| Crawler | Owner | User-Agent String | Purpose |
|---------|-------|-------------------|---------|
| GPTBot | OpenAI | `GPTBot/1.0` | Training + search for ChatGPT |
| ChatGPT-User | OpenAI | `ChatGPT-User` | Real-time browsing for ChatGPT users |
| ClaudeBot | Anthropic | `ClaudeBot/1.0` | Training + search for Claude |
| PerplexityBot | Perplexity | `PerplexityBot` | Real-time search for Perplexity |
| Google-Extended | Google | `Google-Extended` | Training for Gemini/AI Overviews |
| Amazonbot | Amazon | `Amazonbot` | Alexa + Amazon Q search |
| cohere-ai | Cohere | `cohere-ai` | Training for Cohere models |
| Bytespider | ByteDance | `Bytespider` | Training for TikTok AI |
| Applebot-Extended | Apple | `Applebot-Extended` | Training for Apple Intelligence/Siri |
| Meta-ExternalAgent | Meta | `Meta-ExternalAgent/1.0` | Training for Meta AI |
| Timesbot | Perplexity | `Timesbot` | News content for Perplexity |

## Recommended robots.txt Configuration (Allow All AI)

```
# Allow AI crawlers (recommended for maximum AI visibility)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /
```

## What Each Crawler Looks For

1. **llms.txt** — First file many AI crawlers check
2. **robots.txt** — Determines access permissions
3. **Schema.org JSON-LD** — Structured data in `<head>`
4. **Sitemap.xml** — Page discovery
5. **FAQ sections** — Q&A pairs for answer extraction
6. **Meta tags** — Title, description, Open Graph

## Blocking vs Allowing

**Do NOT block AI crawlers if you want AI visibility.** Many businesses block GPTBot thinking it protects their content from being "stolen." In reality:
- Blocking = invisible to ChatGPT/Claude/Perplexity
- Allowing = your content gets cited, driving traffic and trust
- The trade-off is clear for local businesses: visibility > protection

*Next review: April 2, 2026*
