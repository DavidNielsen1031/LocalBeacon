# Sprint 17 — Design Polish (P2 + P3)

**Product:** LocalBeacon.ai
**Theme:** Visual quality upgrades, micro-interactions, empty states
**Co-planned with David:** 2026-03-18

---

## S17-01: Redesign Feature Tiles (Size M)

### Problem
"What LocalBeacon does for you" tiles on homepage are plain white cards with tiny icons. They need more visual punch — gradients, illustrations, or hover effects.

### Where
- `components/landing-content.tsx` — the features section

### What to do
- Add subtle hover effects (scale, shadow lift, border color change)
- Add gradient or colored top borders to each card
- Make icons larger and more prominent
- Add subtle background patterns or gradient fills
- Consider an icon background circle (colored)

---

## S17-02: Dashboard Stat Cards (Size M)

### Problem
Dashboard overview page has basic stat displays. Need polished cards with visual indicators.

### Where
- `app/dashboard/page.tsx` — the overview/stats section

### What to do
- Redesign stat cards with: large number, label, trend indicator (up/down arrow)
- Add subtle gradient or icon backgrounds
- Use orange accent for positive trends, muted for neutral
- Add hover state (slight lift)
- Consider sparkline or progress bar for scores

---

## S17-03: Add shadcn Components (Size S)

### Problem
Dashboard could use more polished UI components.

### Where
- Install: separator, avatar, dropdown-menu, tooltip
- Use separator between dashboard sections
- Use tooltip on info icons and truncated text
- Use avatar for user profile in sidebar

---

## S17-04: Dashboard Empty States (Size M)

### Problem
New users with no data see blank sections. Should see helpful CTAs.

### Where
- All dashboard pages that show "no data" states

### What to do
- Create a reusable EmptyState component (icon, title, description, CTA button)
- Add to: GBP Posts (no posts), Reviews (no reviews), Blog (no posts), Competitors (none added), etc.
- Each empty state should have a specific CTA ("Generate your first post →")
- Use Lucide icons for illustrations (matching the sidebar icon)

---

## S17-05: Hover States + Micro-interactions (Size S)

### Problem
Cards and buttons feel static. Need life.

### Where
- All dashboard cards, sidebar items, buttons
- Homepage feature tiles, pricing cards

### What to do
- Add `transition-all duration-200` to all cards
- Hover: subtle shadow increase + slight translateY(-2px) lift
- Sidebar items: smooth background transition on hover
- Buttons: scale(0.98) on active/press
- Cards: border-color transition on hover

---

## S17-06: Logo/Icon Redesign (Size S)

### Problem
Lighthouse favicon is too detailed at small sizes.

### Where
- `public/favicon.png`
- Logo rendering in site-nav and sidebar

### What to do
- Create a simplified beacon SVG mark (just the light/beam portion)
- Export as favicon.png (32x32, 16x16)
- If image generation isn't possible, create an SVG inline icon component

---

## Priority Order
1. S17-04 (Empty states) — critical for first-time user experience
2. S17-01 (Feature tiles) — homepage visual impact
3. S17-02 (Stat cards) — dashboard visual impact
4. S17-05 (Micro-interactions) — polish across everything
5. S17-03 (shadcn components) — incremental improvement
6. S17-06 (Logo) — hardest without image tools

---
*Part of: [[products/localbeacon/BACKLOG|localbeacon Backlog]] · [[MEMORY|Memory]]*
