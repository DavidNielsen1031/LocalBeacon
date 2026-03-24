# Sprint 29 — SEO Truth + Brand Fix

**Product:** LocalBeacon.ai
**Theme:** Fix what we sell — eat our own dog food
**Est:** 90 min

---

## S29-01: Fix all favicon/logo assets
Replace favicon.png (32x32), logo-48.png (48x48), and favicon.svg in `app/public/` with the cross-light lighthouse design from logo-192.png. Generate apple-touch-icon.png (180x180) and a multi-size favicon.ico. All assets in `public/` should match the new brand.

## S29-02: Fix pricing page meta + canonical
`app/app/pricing/page.tsx` inherits the homepage title/description/canonical. Add unique metadata: title about pricing/plans, description mentioning $49/mo and DFY $499, and canonical = https://localbeacon.ai/pricing.

## S29-03: Fix /check canonical
`app/app/check/page.tsx` has correct unique title but canonical points to / instead of /check. Fix canonical to https://localbeacon.ai/check.

## S29-04: Create OG image + add to all pages
Generate a branded 1200x630 OG image for social sharing. Add og:image meta to homepage, /pricing, /check, and /blog in their respective page metadata. Save image to `app/public/og-image.png`.

## S29-05: Fix stale schema + llms.txt
Homepage JSON-LD in `app/app/layout.tsx` still shows Agency $99. Update to Free/$0, Solo/$49, DFY/$499. Update `app/public/llms.txt` pricing to match current tiers.

## S29-06: Fix grammar in SEO block
Homepage hidden SEO div says "is an local marketing platform." Fix to "is a local marketing platform." In `app/app/page.tsx`.

## S29-07: Add www redirect
Add www.localbeacon.ai as a domain in the Vercel project. Add DNS CNAME for www → cname.vercel-dns.com. Vercel handles the redirect to non-www automatically.

## S29-08: Add 5 SEO hygiene checks to AI Readiness checker
The checker in `app/lib/aeo-checks.ts` tests AEO signals but misses basic SEO. Add checks for: og_image (og:image meta present), canonical_match (canonical URL matches page URL), favicon_complete (favicon.png or .ico exists), www_redirect (www resolves), schema_pricing (schema offers match visible pricing). Each needs id, label, weight, check function, and fix text matching existing check format.

---

## Why our checker missed this
Layer 1 (basic SEO hygiene) wasn't in scope when we built the AEO checker. S29-08 adds it.
