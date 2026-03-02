# LocalBeacon.ai — Design System v2

**Goal:** Break out of shadcn sameness. Warm, trustworthy, local. NOT cold SaaS.

---

## Design Philosophy

LocalBeacon serves plumbers, roofers, dentists — real people who distrust tech.
The design must feel **warm, grounded, human** — like a trusted neighbor, not a Silicon Valley SaaS.

**Anti-patterns to avoid:**
- ❌ Dark mode (scares non-tech users — Bob the plumber won't trust a dark site)
- ❌ Rounded shadcn cards everywhere
- ❌ Geist/Inter font (screams "developer tool")
- ❌ Generic emoji as section icons
- ❌ Gold/black color scheme (feels crypto, not local business)

**Inspirations:**
- Mailchimp — warm, playful, approachable
- Squarespace — premium but simple
- Jobber.com — targets same ICP (trades/service businesses), warm and credible
- HoneyBook — friendly B2B, not intimidating

---

## Color Palette

### Primary
- **Beacon Orange:** `#FF6B35` — warm, energetic, stands out (replaces gold)
- **Deep Navy:** `#1B2A4A` — trustworthy, professional (replaces black)

### Secondary
- **Sky Blue:** `#4DABF7` — friendly accent, links
- **Warm White:** `#FAFAF7` — background (NOT pure white — warmer)
- **Cream:** `#FFF8F0` — section alternating bg

### Neutrals
- **Charcoal:** `#2D3436` — body text
- **Slate:** `#636E72` — secondary text
- **Mist:** `#DFE6E9` — borders, dividers
- **Cloud:** `#F1F3F5` — card backgrounds

### Semantic
- **Success:** `#00B894`
- **Warning:** `#FDCB6E`
- **Error:** `#E17055`

---

## Typography

**Primary:** `DM Sans` — geometric, modern, friendly. NOT cold like Inter/Geist.
- Headlines: DM Sans Bold/ExtraBold
- Body: DM Sans Regular/Medium

**Accent (optional):** `Fraunces` — serif for taglines/quotes, adds warmth and character

### Scale
- Hero: 64px / 72px line / -1.5% tracking (mobile: 40px)
- H1: 48px / 56px line / -1% tracking (mobile: 32px)
- H2: 36px / 44px line / -0.5% tracking (mobile: 28px)
- H3: 24px / 32px line
- Body Large: 18px / 28px line
- Body: 16px / 26px line
- Small: 14px / 22px line
- Caption: 12px / 18px line

---

## Spacing

Base unit: 4px

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px
- 5xl: 128px

Section padding: 96px vertical (desktop), 64px (mobile)
Max content width: 1200px
Card padding: 32px

---

## Border Radius

- Small (buttons, badges): 8px
- Medium (cards): 12px
- Large (hero cards, CTAs): 16px
- Full (pills, avatars): 9999px

---

## Shadows

- Card: `0 1px 3px rgba(27, 42, 74, 0.06), 0 1px 2px rgba(27, 42, 74, 0.04)`
- Card Hover: `0 10px 25px rgba(27, 42, 74, 0.08), 0 4px 10px rgba(27, 42, 74, 0.04)`
- CTA: `0 4px 14px rgba(255, 107, 53, 0.3)`

---

## Component Signatures (what makes LocalBeacon NOT look like shadcn)

### Buttons
- Primary: Beacon Orange bg, white text, 8px radius, bold shadow on hover
- Secondary: Deep Navy outline, transparent bg
- Ghost: text-only with underline on hover
- **NO rounded-full pill buttons** (too generic)

### Cards
- White bg on cream sections, cream bg on white sections
- Subtle left border accent (4px Beacon Orange) instead of full border
- NO hover:border-color change (shadcn pattern)

### Navigation
- Sticky, white bg with subtle bottom shadow on scroll
- Logo LEFT, nav CENTER, CTA RIGHT
- Mobile: slide-in drawer from right (not hamburger dropdown)

### Hero
- Light background (Warm White or Cream)
- Left-aligned text (not centered — more editorial, less SaaS)
- Right side: product screenshot or illustration
- Beacon Orange CTA button with shadow

### Social Proof
- Real photos (not avatars), real names, real businesses
- Star ratings inline
- Location badges ("Denver, CO" / "Austin, TX")

### Icons
- Custom illustrated icons (Phosphor Icons library — warm, rounded style)
- NOT emoji (too casual for B2B trust)

---

## Page Structure — Landing Page

1. **Nav** — Logo + "How It Works" / "Pricing" / "Sign In" + orange CTA
2. **Hero** — Split layout. Left: headline + sub + CTA. Right: dashboard screenshot/mockup
3. **Logo bar** — "Trusted by businesses in 12 states" + industry icons
4. **Outcomes** — 3 cards with illustrated icons, left-accent border
5. **Before/After** — Side-by-side, warm green vs muted red (not harsh)
6. **How It Works** — 3-step horizontal with numbered circles and connecting line
7. **Testimonial** — Full-width quote, photo, name, business, location
8. **Pricing** — 3 columns on cream bg, orange highlight on Solo
9. **FAQ** — Accordion style, clean
10. **Bottom CTA** — Deep Navy bg, white text, orange button
11. **Footer** — Simple, warm

---

## Figma File Structure

### Pages
1. 🎨 Design Tokens — Colors, typography, spacing, shadows
2. 🧩 Components — Button, Card, Nav, Footer, PricingCard, TestimonialCard, FAQ
3. 📱 Screens — Landing, Pricing, Dashboard, Onboarding
4. 🖼️ Assets — Logo variations, illustrations, icons

### Frame Sizes
- Desktop: 1440 x auto
- Tablet: 768 x auto
- Mobile: 375 x auto
