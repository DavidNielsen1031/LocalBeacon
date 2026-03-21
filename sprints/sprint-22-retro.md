# Sprint 22 Retro — Scanner 2.0: Beat the Competition

**Date:** 2026-03-19–20
**Commits:** b659b2b, 3520096, 801cb87, 820ec5f, 830ceb5, 262bf1c, 1b43d68, 855a123, 8e571de

## What Shipped
- **S22-01:** Scanner expanded from 14 → 19 checks (AI crawlers: GPTBot/ClaudeBot/PerplexityBot/Applebot/GoogleOther, ai-index.json detection, citability scoring, E-E-A-T signals, brand social links)
- **S22-02:** ai-index.json generator — new dashboard tool, Solo-gated
- **S22-03:** Public scanner UI grouped into categories with sub-scores
- **S22-04:** All surfaces synced — homepage, pricing, dashboard, email templates updated from "14" to "19"
- **S22-05:** Citability detail view — expandable panel showing which passages are AI-citable
- **Bonus:** AEO report email redesigned (table layout, severity badges, branded)
- **Bonus:** Resend webhook endpoint for email tracking (opens, clicks, bounces)
- **Bonus:** PostHog upgraded with session replays + proper funnel events

**Completion:** 5/5 + 3 bonus items (160%)

## What Went Well
- Scanner now competitive with aeo.js and geo-seo-claude — we check more signals
- Category grouping made 19 checks digestible instead of overwhelming
- Email redesign was overdue — now looks like a real product, not a text dump
- Resend webhooks give us deliverability data for the first time

## What Didn't Go Well
- Weight rebalancing needed a hotfix (801cb87) — weights didn't sum to 100 after adding new checks
- Category grouping initially used camelCase IDs but scanner returns snake_case — mismatch caught post-deploy (820ec5f)
- Stale "15 signals" text survived in dashboard despite S22-04 being specifically about this

## Lessons
- When adding new checks to a weighted system, rebalance weights in the SAME commit. Don't ship partial.
- ID format consistency (camelCase vs snake_case) must be verified at the interface boundary, not discovered in prod.
- "Sync all surfaces" specs need a grep verification step — human review misses stale copy.
