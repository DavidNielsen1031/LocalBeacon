# Sprint 16 — Design Refresh

**Product:** LocalBeacon.ai
**Theme:** Unify homepage + dashboard design, fix mobile issues
**Co-planned with David:** 2026-03-18

---

## S16-01: Fix Mobile Nav (Size S)

### Problem
"Get Started Free" CTA button dominates mobile nav, pushing logo text to clip ("LocalBeacon." — ".ai" gets cut). 

### Where
- `components/site-nav.tsx` and/or `components/landing-content.tsx` — wherever the top nav is rendered
- Mobile breakpoints (< 768px)

### Verification
- Logo "LocalBeacon.ai" fully visible at 375px width (iPhone SE)
- CTA button proportional, not dominating the nav bar
- Desktop nav unchanged

---

## S16-02: Fix Feature Tile Grid (Size S)

### Problem
"What LocalBeacon does for you" section has 5 tiles in a 3+2 grid, leaving an empty gap. Looks unfinished.

### Where
- `components/landing-content.tsx` — the features/tiles section

### Verification
- No awkward empty gap in any viewport
- Either 6 tiles (add "Monthly Progress Reports" or "Competitor Tracking") or a layout that works with 5

---

## S16-03: Design Tokens + Shared Palette (Size M)

### Problem
Homepage uses orange (#FF6B35) + navy (#1B2A4A) + warm white. Dashboard uses gold (#FFD700) + black + emoji. Two different visual languages.

### Where
- Create `app/lib/design-tokens.ts` (or CSS variables in `app/globals.css`)
- Colors: navy (#1B2A4A), orange (#FF6B35), warm white (#FAFAF7), cream (#F5F0E8), charcoal (#2D3436), slate (#636E72), mist (#DFE6E9)
- Import and use in both homepage and dashboard components

### Verification
- Single source of truth for all colors
- No hardcoded hex values outside the token file
- Both homepage and dashboard reference the same tokens

---

## S16-04: Retheme Dashboard (Size L)

### Problem
Dashboard looks like a completely different app from the homepage. Dark mode with gold accents vs warm light with orange accents.

### Where
- `app/dashboard/layout.tsx` — sidebar + main area backgrounds
- `components/dashboard/sidebar.tsx` — nav items, icons
- All dashboard pages — card styles, text colors, accent colors
- Replace emoji icons (📍🌐⭐🤖) with Lucide icons throughout

### Verification
- Dashboard background: warm white/cream (not black)
- Sidebar: navy background with white text (not black with gold)
- Accent color: orange (#FF6B35), not gold (#FFD700)
- All emoji icons replaced with Lucide SVG icons
- Cards: white with subtle borders (matching homepage card style)
- Feels like the same product as the homepage

---

## S16-05: Logo/Icon Fix (Size S)

### Problem
Lighthouse icon becomes unrecognizable at small sizes (favicon, mobile nav). Too much detail in the full building.

### Where
- `public/favicon.png` and wherever the logo is rendered
- Simplify to just the beacon/light portion or create a geometric mark

### Verification
- Icon reads clearly at 16px (favicon) and 32px (mobile nav)
- Still recognizable as a beacon/lighthouse concept

---

## Priority Order
1. S16-03 (Design tokens) — foundation for everything else
2. S16-01 (Mobile nav fix) — quick win
3. S16-02 (Feature tile grid) — quick win  
4. S16-04 (Dashboard retheme) — biggest impact
5. S16-05 (Logo fix) — polish

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
