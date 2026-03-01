# LocalBeacon.ai — Sprint 2 Design
**Designed:** March 1, 2026 | **Model:** Claude Opus 4.6
**Target:** Weeks 2-4 | **Goal:** Shippable core product with real user value

---

## Sprint 2 Objective

Ship the minimum product that delivers all 5 customer outcomes:
1. More calls from Google Maps (GBP posts)
2. More calls from near me searches (service area pages)
3. More calls from AI assistants (AEO blog post)
4. More reviews working for you (review responses)
5. Proof it's working (dashboard + activity feed)

A user should be able to sign up, connect their business, and have LocalBeacon generating content within 5 minutes.

---

## Pre-Sprint Dependencies (must complete before coding)

- [ ] **Supabase project** created — get `SUPABASE_URL` + `ANON_KEY`
- [ ] **Stripe products** created — Solo ($29/mo) + Agency ($79/mo) price IDs
- [ ] **Anthropic API key** provisioned — separate from Alexander's (refine-backlog) key
- [ ] **Upstash Redis** provisioned — for job queues
- [ ] **GBP API application** submitted (starts the 2-4 week clock)
- [ ] **Google Workspace** aliases added (hello@, support@)
- [ ] Update Vercel env vars: replace all `placeholder` values with real ones

**Estimated time:** 1-2 hours of setup before coding begins

---

## Database Schema (Supabase)

```sql
-- Users (synced from Clerk)
users (
  id uuid primary key,
  clerk_id text unique,
  email text,
  plan text default 'free', -- free | solo | agency
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
)

-- Business profiles
businesses (
  id uuid primary key,
  user_id uuid references users,
  name text,
  category text,           -- e.g. "Plumber", "HVAC", "Dentist"
  primary_city text,
  service_areas text[],    -- array of cities/neighborhoods
  phone text,
  website text,
  gbp_connected boolean default false,
  gbp_account_id text,     -- from GBP OAuth
  created_at timestamptz default now()
)

-- Generated content
content_items (
  id uuid primary key,
  business_id uuid references businesses,
  type text,               -- gbp_post | service_page | review_response | blog_post
  status text default 'draft', -- draft | approved | published
  title text,
  body text,
  metadata jsonb,          -- post_type, target_city, review_id, schema_markup, etc.
  published_at timestamptz,
  created_at timestamptz default now()
)

-- Reviews (pulled from GBP)
reviews (
  id uuid primary key,
  business_id uuid references businesses,
  gbp_review_id text unique,
  author text,
  rating int,
  comment text,
  responded boolean default false,
  response_draft text,
  created_at timestamptz
)
```

---

## Sprint 2 Tasks — Detailed

### LB-004 · Onboarding Flow (Day 1-2)

**Route:** `/onboarding` — protected, redirects here after first sign-in if no business profile

**Step 1 — Business basics**
- Business name
- Business type (dropdown: Plumber, HVAC, Dentist, Roofer, Lawyer, Other)
- Primary city + state
- Phone number
- Website URL (optional)

**Step 2 — Service areas**
- Add up to 3 cities/neighborhoods (Free), 10 (Solo), unlimited (Agency)
- Simple tag input with suggestions based on primary city

**Step 3 — Plan selection**
- Show 3 plans with feature lists
- Free: no credit card, start immediately
- Solo/Agency: Stripe Checkout redirect
- Skip for now (stays on Free)

**Step 4 — Quick win: generate first GBP post**
- Immediately generate 1 sample GBP post using their info
- Show it in the UI — "Here's your first post, ready to copy"
- CTA: "Connect Google Business Profile to auto-post" (or "Copy to clipboard")
- This is the "aha moment" — they see value in 60 seconds

**Completion:** Redirect to `/dashboard`

---

### LB-005 · GBP Post Generator (Day 2-4)

**Route:** `/dashboard/posts`

**Generation logic:**
```
POST /api/generate/gbp-post

Input:
  business_id: string
  post_type: "whats_new" | "offer" | "event" | "product"
  week_number?: number  (for scheduling context)

Prompt structure:
  - Business: {name}, {category} in {primary_city}
  - Service areas: {service_areas}
  - Post type: {post_type}
  - Generate: engaging GBP post, 150-300 words
  - Include: local city name, specific service reference, CTA (call/book)
  - Tone: professional but approachable
  - NOT: generic, spammy, duplicated across cities
  
Output:
  title: string (max 58 chars)
  body: string (150-300 words)
  call_to_action: "CALL" | "BOOK" | "LEARN_MORE" | "SIGN_UP"
  cta_url?: string
```

**UI — Posts page:**
- Queue: 4 upcoming posts (Mon/Wed/Fri/Sun cadence shown)
- Each post: preview card with approve / edit / regenerate buttons
- Status badges: Draft | Approved | Scheduled | Published
- "Copy to clipboard" for manual paste (MVP mode)
- Auto-post toggle (disabled until GBP API approved, shown with "Coming soon" state)

**Free tier:** 5 posts/month (show counter)
**Solo/Agency:** Unlimited

---

### LB-006 · Service Area Page Builder (Day 3-5)

**Route:** `/dashboard/pages`

**Generation logic:**
```
POST /api/generate/service-page

Input:
  business_id: string
  target_city: string
  service_type: string  (derived from business category)

Prompt structure:
  - Business: {name}, {category}
  - Target city: {target_city}
  - Primary city (HQ): {primary_city}
  
  Generate a complete service area landing page:
  1. H1: "[Service] in [City], [State] | [Business Name]"
  2. Meta description: 155 chars, includes city + service + phone
  3. Intro paragraph: 100 words, city-specific references
  4. Services section: 3-5 bullet points with brief descriptions
  5. Why choose us: 3 differentiators (professional, responsive, local)
  6. Service area paragraph: references specific neighborhoods in target city
  7. FAQ section: 3 Q&As structured as answer capsules (AEO-optimized)
  8. Schema markup: LocalBusiness + Service + FAQ JSON-LD
  9. CTA: Phone number + "Book Now" button
  
  CRITICAL: Every city page must have unique content. No copy-paste.
  Include real local signals: neighborhoods, landmarks if known, "serving X area since" framing.
```

**UI — Pages page:**
- Grid of service area cards (one per city)
- Each card: city name, status, word count, "Copy HTML" button
- Generate new page: city selector + generate button
- Preview mode: renders the page as it would look
- PDF export (Solo+ only)

**Free tier:** 3 pages max
**Solo:** 10 pages
**Agency:** Unlimited

---

### LB-007 · Review Response Drafter (Day 4-6)

**Route:** `/dashboard/reviews`

**MVP mode (no GBP API yet):**
- Manual review entry: paste review text + select star rating
- AI generates response
- Copy to clipboard → paste in Google Maps

**GBP API mode (post-approval):**
- Auto-pulls new reviews
- Badge on nav: "3 reviews need response"
- 1-click publish

**Generation logic:**
```
POST /api/generate/review-response

Input:
  business_name: string
  reviewer_name: string
  rating: 1-5
  review_text: string
  business_category: string

Tone rules:
  5 stars: warm, grateful, personal, mention specific detail from review
  4 stars: grateful, acknowledge the positive, subtle invitation to return
  3 stars: professional, address concern, offer to make it right
  1-2 stars: calm, professional, empathetic, take offline ("please contact us at...")
  NEVER: defensive, apologetic to a fault, generic "we value your feedback"
  ALWAYS: mention business name, keep under 150 words
```

**UI:**
- List of reviews (manual entry in MVP, auto-populated post-API)
- Each review: star rating, text, date, "Draft Response" / "Responded" status
- Response draft shown inline with edit + copy/publish buttons

---

### LB-008 · Dashboard MVP (Day 5-7)

**Route:** `/dashboard` (already scaffolded — fill it in)

**Overview cards:**
- GBP Posts This Week: X scheduled / X published
- Pages Created: X total (Y cities covered)
- Reviews Pending Response: X
- Plan: Free/Solo/Agency + usage meter

**Activity feed (last 7 days):**
- "✅ GBP post generated for {business} — [Mon Mar 2]"
- "📄 Service page created for Minneapolis, MN"
- "⭐ Review response drafted for 5-star review from John D."

**Quick action buttons:**
- Generate GBP Post
- Add Service Area
- Draft Review Response

**Monthly snapshot (manual for now):**
- Simple form: "How many calls this month?" — captures baseline for future comparison
- v2: Google Search Console integration

---

### LB-009 · API Routes Summary

```
POST /api/generate/gbp-post
POST /api/generate/service-page
POST /api/generate/review-response
POST /api/generate/blog-post        (Sprint 3.5)
GET  /api/businesses/:id
PUT  /api/businesses/:id
POST /api/businesses
GET  /api/content/:business_id
POST /api/webhook                   (Stripe — already scaffolded)
GET  /api/health                    (already built)
```

All generation endpoints:
- Auth via Clerk (JWT validation)
- Rate limit by plan tier (Redis)
- Save output to Supabase `content_items`
- Return generated content immediately (no async queuing for MVP)

---

### LB-010 · Plan Enforcement Middleware

```typescript
// lib/plan-limits.ts
export const PLAN_LIMITS = {
  free: {
    gbp_posts_per_month: 5,
    service_pages: 3,
    locations: 1,
    blog_posts: 0,
  },
  solo: {
    gbp_posts_per_month: Infinity,
    service_pages: 10,
    locations: 3,
    blog_posts: 1,
  },
  agency: {
    gbp_posts_per_month: Infinity,
    service_pages: Infinity,
    locations: Infinity,
    blog_posts: Infinity,
  }
}
```

Check usage before every generation call. Return `402` with upgrade prompt if limit reached.

---

## Sprint 2 Success Criteria

Before calling Sprint 2 done, verify:
- [ ] New user can sign up → onboard → see first generated GBP post in < 5 minutes
- [ ] GBP post generator produces unique, locally-relevant content (not generic filler)
- [ ] Service area page builder produces unique content per city (not cloned)
- [ ] Review response drafter handles all 5 star ratings correctly
- [ ] Dashboard shows real activity data
- [ ] Free tier limits enforced (5 posts, 3 pages, 1 location)
- [ ] Stripe checkout works for Solo + Agency upgrades
- [ ] `npm run build` passes clean
- [ ] Deployed to localbeacon.ai

---

## Sprint 2 Build Order

| Day | Focus |
|-----|-------|
| Day 1 | Supabase schema + env vars + Stripe products setup |
| Day 2 | Onboarding flow (steps 1-4) + first GBP post generation |
| Day 3 | GBP Post Generator full UI + API route |
| Day 4 | Service Area Page Builder |
| Day 5 | Review Response Drafter |
| Day 6 | Dashboard wired with real data + plan enforcement |
| Day 7 | Testing, polish, deploy |

---

## Key Design Decisions

1. **No async job queues in MVP** — generate synchronously, show loading state. Add queuing in Sprint 3 when we have auto-scheduling.
2. **Manual GBP paste mode first** — don't wait for API approval to ship. Customers get value immediately.
3. **Onboarding aha moment** — generate the first GBP post during onboarding, before they even connect GBP. They see the product works before any friction.
4. **AEO by default** — every service area page gets FAQ schema and answer capsules automatically. Customers don't configure this — it just happens.
5. **Supabase RLS** — row-level security from day one. Each user can only see their own businesses and content.

---

*Designed March 1, 2026 | Ready to spawn build agent when dependencies are set up*
