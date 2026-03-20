# Persona Feedback — Sprint 22

> Reviewed by Alexander (manual) after 3 sub-agent failures

## 🔴 Must Fix Before Ship

1. **Weights summed to 103, not 100** (Morgan/QA) — Fixed: schema_markup 8→7, faq_content 8→7, https 6→5. Now exactly 100.
2. **Stale "Checking 15 AI visibility signals" loading text** (Riley/QA) — Fixed: → "19"

## 🟡 Should Fix

3. **Bob wouldn't understand "Citability & Quality"** — The category name is jargon. Consider "Content Quality" or "How Quotable You Are" for the public scanner. Dashboard is fine (power users).
4. **No E-E-A-T pass/fail explanation in check result** — The about page check works, but if a site has no /about, the fix text should say exactly what to create.
5. **ai-index.json deployment instructions reuse llms.txt instructions** — The `.replace('llms.txt', 'ai-index.json')` hack works but is fragile. If llms.txt instructions mention "plain text format" that doesn't apply to JSON.

## 🟢 Nice to Have

6. Citability passage detail panel could have a "show/hide" toggle — 15 passages is a lot of screen real estate.
7. ai-index.json doesn't have its own API route — generates client-side. Fine for now, but if we want to pre-fill from business profile we'll need one.
8. Category progress bars could use tooltips showing which checks are in each category.

## Security (Sasha)

- ✅ SSRF guard covers all new fetch calls — ai-index.json check uses the same `baseUrl` that went through `isPrivateUrl()` validation
- ✅ Citability extracts from already-fetched HTML — no additional fetch calls
- ✅ E-E-A-T about page check uses `fetchWithRetry()` which inherits the same URL validation
- No new attack surface identified
