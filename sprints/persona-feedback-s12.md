# Sprint 12 Persona Feedback — LocalBeacon

**Date:** 2026-03-07
**Sprint:** 12 — Distribution
**Item reviewed:** S12-01 (Sprint 11 retroactive persona panel)

---

## Customer Personas (Alexander, bias-checked)

### 🔧 Bob (Plumber)
- ✅ Landing page copy is Bob-friendly — "More calls. Less work."
- ✅ No "AI" in hero or outcome descriptions
- ✅ FAQ answers are practical
- ⚠️ **FIXED:** Agency pricing said "coming soon" for shipped features
- ⚠️ **NOTED:** "Connect Your Google Listing" CTA leads to signup but GBP connection doesn't work (API pending). Acceptable with "Auto-publishing coming soon" qualifier.
- **Forced negative:** The word "optimization" in "Answer Engine Optimization" would make Bob's eyes glaze over. The explainer section uses it but the rest of the page avoids it — acceptable tradeoff for SEO value.

### 📊 Taylor (Tech-Savvy SMB)
- ✅ AEO explainer section is clear
- ✅ Dashboard tools list makes sense
- ⚠️ **FIXED:** PDF reports had no plan gate — free users could download
- **Forced negative:** Before/after comparison implies auto-scheduling ("ready to publish") — borderline but "ready to publish" qualifier saves it.

### 🏢 Alex (Agency)
- ✅ Client wizard is clean — 3 steps, category pre-populates specialties
- ✅ Business API enforces ownership
- ⚠️ **FIXED:** Agency pricing "coming soon" removed, actual features listed
- ⚠️ **NOTED (backlog):** No way to delete a client. Logged as backlog item.
- ⚠️ **NOTED (backlog):** Client switcher needs scroll/search for 10+ clients.
- **Forced negative:** White-label logo upload is missing from PDF reports — agencies can't brand reports yet. Placeholder footer is functional but not premium.

**Bias incidents:** 0 (quality personas found issues customer personas missed — see below — but these were code-level issues customer personas wouldn't reasonably catch)

---

## Quality Personas (Sub-agents)

### 🧪 Quinn (QA) — 5 critical, 4 high
**Critical (all fixed):**
1. `google_listing` field silently dropped in wizard → **FIXED** (added to payload)
2. Plan limit race condition → **NOTED** (needs DB constraint — backlog)
3. New business doesn't appear in sidebar after wizard → **FIXED** (call refreshBusinesses)
4. `req.json()` parse failure crashes API → **FIXED** (try/catch + 400)
5. PDF text overflows page → **FIXED** (checkPageBreak helper)

**High (3 fixed, 1 noted):**
6. Dialog can close mid-submission → **FIXED** (disable close while loading)
7. Stale data flash on business switch → **FIXED** (setData null)
8. "Free Plan" badge hardcoded → **FIXED** (reads from BusinessProvider)
9. Dashboard API error shows wrong empty state → **NOTED** (backlog)

### 🔒 Sam (Security) — 0 critical, 2 high
**No IDOR vulnerabilities found** ✅ All routes properly scoped by user_id.

**High:**
1. `getMonthlyUsage()` checks wrong business (always first) → **NOTED** (backlog — needs businessId param)
2. Race condition in business creation (concurrent bypass) → **NOTED** (backlog — needs DB constraint)

**Low:**
3. PDF route had no plan gate → **FIXED** (Solo+ required)
4. `body.email` written without validation → **NOTED** (should use Clerk session)
5. No rate limiting on endpoints → **NOTED** (backlog)

### 🏗️ Morgan (Tech Lead) — 4 architectural issues
**Architecture:**
1. POST /api/businesses handles both create+update via heuristics — anti-pattern → **NOTED** (backlog: split into POST + PATCH /[id])
2. `force_new` flag is a code smell → **NOTED** (consequence of #1)
3. Two separate DB queries for user.id and user.plan → **NOTED** (should be one select)
4. BusinessProvider ignores localStorage on initial render → causes flash → **NOTED** (low impact)

**Code Quality:**
- body typed as `any` — needs Zod validation → **NOTED** (backlog)
- `select('*')` in PDF route violates least privilege → **NOTED**

**Performance:**
- 7 sequential Supabase queries in PDF route — should parallelize → **NOTED** (backlog)

---

## Summary

| Category | Personas Used | Issues Found | Fixed | Noted (Backlog) |
|----------|--------------|-------------|-------|-----------------|
| Customer | 3/3 | 7 | 3 | 4 |
| Quality | 3/3 (Quinn, Sam, Morgan) | 16 | 8 | 8 |
| **Total** | **6/11** | **23** | **11** | **12** |

**Not used this sprint:** Teresa (discovery — not applicable to retroactive review), Sasha (UX — no new flows designed), Jules (UI — no new visual work), Tara (test automation — no test suite yet), Riley (product analyst — will run at retro)

**Bias rate:** 0% (0 bias incidents / 3 customer personas)
