# LocalBeacon pSEO 2.0 Expansion Plan

*Inspired by @jakezward's programmatic SEO 2.0 system (13K pages → +466% traffic)*
*Created: Mar 12, 2026*

---

## Current State

- **60 industry pages** at `/for/[industry]` (e.g., `/for/plumbers`, `/for/hvac`)
- Each page uses `IndustryData` JSON schema → React renderer
- Already structured exactly like Jake's system — just at 1/100th the scale
- Blog engine exists with cron-generated content → `content` branch

## The Opportunity

Jake went from 971 → 5,500 weekly organic clicks with 13,000 structured pages.
We have 60 pages. Even going to 600 (10x) should produce meaningful traffic lift.

---

## Phase 1: Niche Sub-Industries (60 → 300 pages)

**Strategy:** Expand each industry into 3-5 sub-specialties. Each gets its own page with tailored pain points, features, and FAQs.

### Example Expansions

**Plumbers (1 page → 5 pages):**
- `/for/plumbers` (existing)
- `/for/emergency-plumbers` — "24/7 Emergency Plumbing — Get Found When Pipes Burst"
- `/for/commercial-plumbers` — "Commercial Plumbing Companies — Win Property Manager Contracts"
- `/for/drain-cleaning` — "Drain Cleaning Services — Rank for the #1 Plumbing Search"
- `/for/water-heater-installers` — "Water Heater Installation — Capture High-Ticket Searches"

**Restaurants (1 → 5):**
- `/for/restaurants` (existing)
- `/for/pizza-shops` — "Pizza Shops — Dominate Local Delivery Searches"
- `/for/food-trucks` — "Food Trucks — Get Found at Every Event and Corner"
- `/for/coffee-shops` — "Coffee Shops — Build a Local Following on Autopilot"
- `/for/fine-dining` — "Fine Dining Restaurants — Attract Reservation-Ready Guests"

**HVAC (1 → 5):**
- `/for/hvac` (existing)
- `/for/ac-repair` — "AC Repair Services — Peak Season Visibility"
- `/for/furnace-repair` — "Furnace Repair — Winter Emergency Searches"
- `/for/duct-cleaning` — "Air Duct Cleaning — High-Margin Service Visibility"
- `/for/hvac-installation` — "HVAC Installation — Capture New Construction Leads"

### Full Sub-Industry List (240 new pages)

Generate from this niche taxonomy JSON schema:

```json
{
  "niche_taxonomy": {
    "home_services": {
      "plumbers": ["emergency-plumbers", "commercial-plumbers", "drain-cleaning", "water-heater-installers"],
      "hvac": ["ac-repair", "furnace-repair", "duct-cleaning", "hvac-installation"],
      "electricians": ["residential-electricians", "commercial-electricians", "ev-charger-installers", "generator-installers"],
      "roofers": ["roof-repair", "roof-replacement", "commercial-roofing", "gutter-installers"],
      "painters": ["house-painters", "commercial-painters", "cabinet-painters"],
      "cleaning-services": ["house-cleaning", "office-cleaning", "move-out-cleaning", "pressure-washing"],
      "pest-control": ["termite-control", "mosquito-control", "wildlife-removal"],
      "movers": ["local-movers", "long-distance-movers", "piano-movers", "junk-removal"],
      "locksmiths": ["emergency-locksmiths", "car-locksmiths", "commercial-locksmiths"],
      "handymen": ["furniture-assembly", "drywall-repair", "home-maintenance"],
      "appliance-repair": ["refrigerator-repair", "washer-dryer-repair", "dishwasher-repair"],
      "garage-door": ["garage-door-repair", "garage-door-installation", "garage-door-openers"],
      "fencing": ["wood-fencing", "vinyl-fencing", "chain-link-fencing"]
    },
    "healthcare": {
      "dental": ["cosmetic-dentists", "pediatric-dentists", "emergency-dentists", "orthodontists"],
      "chiropractors": ["sports-chiropractors", "prenatal-chiropractors"],
      "optometrists": ["eye-exams", "contact-lens-fitting"],
      "veterinarians": ["emergency-vets", "cat-clinics", "mobile-vets"],
      "physical-therapists": ["sports-rehab", "post-surgery-rehab"],
      "dermatologists": ["acne-treatment", "skin-cancer-screening"],
      "pediatricians": ["newborn-care", "pediatric-urgent-care"],
      "mental-health-counselors": ["marriage-counselors", "anxiety-therapists", "teen-counselors"]
    },
    "automotive": {
      "auto-repair": ["brake-repair", "transmission-repair", "oil-change"],
      "car-wash": ["mobile-detailing", "ceramic-coating"],
      "towing": ["roadside-assistance", "flatbed-towing"],
      "auto-detailing": ["paint-correction", "interior-detailing"],
      "tire-shops": ["tire-rotation", "wheel-alignment"]
    },
    "beauty_wellness": {
      "hair-salons": ["mens-haircuts", "hair-coloring", "hair-extensions"],
      "barbershops": ["fade-haircuts", "beard-trims"],
      "spas": ["massage-therapy", "facial-treatments"],
      "nail-salons": ["manicure-pedicure", "nail-art"],
      "med-spas": ["botox", "laser-hair-removal", "microneedling"]
    },
    "food": {
      "restaurants": ["pizza-shops", "food-trucks", "coffee-shops", "fine-dining", "sushi-restaurants"],
      "catering": ["wedding-catering", "corporate-catering"],
      "bakeries": ["custom-cakes", "gluten-free-bakeries"],
      "local-delivery": ["meal-prep-delivery", "grocery-delivery"]
    },
    "professional": {
      "accountants": ["tax-preparation", "small-business-accountants", "bookkeepers"],
      "financial-advisors": ["retirement-planning", "wealth-management"],
      "insurance-agents": ["auto-insurance", "home-insurance", "life-insurance"],
      "real-estate-agents": ["buyers-agents", "listing-agents", "commercial-real-estate"],
      "notaries": ["mobile-notaries", "loan-signing-agents"]
    },
    "outdoor": {
      "landscapers": ["lawn-care", "hardscaping", "irrigation-systems"],
      "tree-service": ["tree-removal", "tree-trimming", "stump-grinding"],
      "pool-service": ["pool-cleaning", "pool-repair", "pool-installation"],
      "snow-removal": ["commercial-snow-removal", "residential-plowing"],
      "window-cleaning": ["commercial-window-cleaning", "high-rise-window-cleaning"]
    },
    "fitness": {
      "gyms": ["crossfit-gyms", "24-hour-gyms", "womens-gyms"],
      "personal-trainers": ["online-personal-trainers", "group-fitness-trainers"],
      "yoga-studios": ["hot-yoga", "prenatal-yoga"],
      "martial-arts": ["kids-martial-arts", "mma-gyms", "boxing-gyms"]
    },
    "other": {
      "tutoring": ["math-tutoring", "sat-prep", "music-lessons"],
      "daycare": ["in-home-daycare", "preschool", "after-school-care"],
      "dry-cleaning": ["laundry-service", "alteration-shops"],
      "pet-grooming": ["mobile-pet-grooming", "cat-grooming"],
      "dog-walking": ["pet-sitting", "dog-daycare"],
      "pet-boarding": ["luxury-pet-boarding", "cat-boarding"],
      "photographers": ["wedding-photographers", "real-estate-photographers", "headshot-photographers"],
      "wedding-planners": ["day-of-coordinators", "destination-wedding-planners"],
      "djs": ["wedding-djs", "corporate-event-djs"],
      "florists": ["wedding-florists", "funeral-florists"]
    }
  }
}
```

**Estimated new pages: ~240 sub-industry pages**

---

## Phase 2: Free Tools (10-20 new page types)

**Strategy:** Build interactive tool pages that serve as both SEO magnets and lead generators. Each tool is a React component + JSON config.

### Tool Ideas

1. **AI Readiness Score** — `/tools/ai-readiness-check` (exists as `/check`)
2. **Google Business Profile Grader** — `/tools/gbp-grader` — paste your GBP URL, get a score
3. **Local SEO Checklist** — `/tools/local-seo-checklist/[industry]` — interactive checklist per industry (240+ pages)
4. **Review Response Generator** — `/tools/review-response` — paste a review, get a professional response
5. **Business Name AI Checker** — `/tools/business-name-check` — does your name work for AI search?
6. **Local Competitor Finder** — `/tools/competitor-scan` — see who ranks for your services in your city
7. **AEO (Answer Engine Optimization) Quiz** — `/tools/aeo-quiz` — 10 questions, get a score
8. **Schema Markup Generator** — `/tools/schema-generator/[type]` — LocalBusiness, FAQPage, etc.
9. **Service Area Page Generator** — `/tools/service-area-preview` — preview what your city pages would look like
10. **Content Calendar Generator** — `/tools/content-calendar/[industry]` — 12-month content plan per industry

### Cross-Multiplied Tool Pages

Some tools × industries = many pages:
- Local SEO Checklist × 60 industries = 60 pages
- Content Calendar × 60 industries = 60 pages
- Schema Generator × 5 types = 5 pages

**Estimated new pages: ~150 tool pages**

---

## Phase 3: City + Industry Cross Pages (future, 1,000+ pages)

**Strategy:** `/for/plumbers/minneapolis`, `/for/hvac/denver` — hyper-local pages. Only if Phase 1+2 show traction.

Start with top 50 US metros × top 20 industries = 1,000 pages. Each page has:
- City-specific stats ("Minneapolis has 342 plumbing businesses on Google")
- Local competition context
- City-relevant pain points (seasonal, climate-based)

**NOT doing this yet** — this is the "13,000 pages" play. Phase 1+2 first.

---

## Generation System

### JSON Schema (extends existing IndustryData)

```typescript
interface SubIndustryData extends IndustryData {
  parentSlug: string;          // links to parent industry
  parentName: string;          // "Plumbing"
  searchVolume?: string;       // estimated monthly searches
  competitionLevel?: string;   // low/medium/high
  seasonality?: string;        // "peaks in winter" / "year-round"
  avgTicket?: string;          // "$150-500 per job"
  targetKeywords: string[];    // ["emergency plumber near me", "24 hour plumber"]
}
```

### Generation Pipeline

1. **Niche Taxonomy** (above JSON) → defines all sub-industries
2. **AI Generation** (Gemini Flash, like Jake) → fills IndustryData schema for each sub-industry
3. **Validation** → Zod schema validation on generated JSON
4. **React Renderer** → existing `[industry]/page.tsx` handles it (no code changes needed!)
5. **Build + Deploy** → `next build` generates static pages, Vercel serves

### Key Insight: Our renderer already works!

The existing `app/for/[industry]/page.tsx` + `IndustryData` type is ALREADY the "React renderer" that Jake describes. We just need to generate more `IndustryData` entries. The page component, SEO metadata, FAQ schema, and all sections work automatically.

---

## Generation Script Design

```
scripts/generate-sub-industries.ts

Input:  niche-taxonomy.json (the taxonomy above)
Output: app/lib/industry-data/generated/*.ts (one file per category)

Process:
1. Read taxonomy
2. For each sub-industry:
   a. Call Gemini Flash with parent industry context + sub-industry name
   b. Get back IndustryData JSON
   c. Validate with Zod
   d. Write to TypeScript file
3. Update index.ts to import generated files
4. Run `next build` to verify all pages compile
```

---

## Implementation Priority

1. **Build generation script** — `scripts/generate-sub-industries.ts`
2. **Generate Phase 1 sub-industries** (240 pages) — takes ~30 min with Gemini Flash
3. **Deploy to preview** (content branch) — verify pages look good
4. **Monitor GSC** — track indexing rate, impressions, clicks
5. **If traction:** Phase 2 tools, then Phase 3 city × industry

## Success Metrics

- **Week 1:** 300 pages live, 50% indexed by Google
- **Week 4:** Organic impressions 2x baseline
- **Week 8:** Organic clicks 3x baseline (Jake's curve)
- **Kill condition:** If <20% indexed after 4 weeks, Google is suppressing them

## Cost

- **Gemini Flash generation:** ~$0.50 for 240 pages (trivial)
- **Vercel hosting:** Static pages, no marginal cost
- **Time:** ~2 hours to build script + generate + deploy

---

*This plan follows Jake Ward's exact playbook: taxonomy first → strict JSON schemas → React renderers → deploy at scale. We already have 2 of 3 pieces (schema + renderer). Just need the generation pipeline.*
