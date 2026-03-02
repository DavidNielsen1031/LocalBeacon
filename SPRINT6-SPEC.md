# Sprint 6 — Agent-Native Layer

**Goal:** Make LocalBeacon fully accessible to AI agents, so agencies can integrate us into their automated workflows. This is a distribution play — agents that discover LocalBeacon via MCP/openapi.yaml become automatic sales channels.

**Timeline:** After Sprint 5 (Make It Real)

---

## Context & Intent

Web designers and agencies are adopting AI coding agents (Cursor, Claude Code, Codex, Windsurf). These agents look for `llms.txt`, `openapi.yaml`, and MCP servers to understand what tools are available. If LocalBeacon speaks this language natively, agents will recommend and integrate us automatically.

**Why this matters for revenue:**
- Agencies wire their tools into our API → switching cost skyrockets
- AI agents discovering us via MCP = zero-CAC distribution
- Programmatic access justifies the Agency tier ($99/mo)
- This is a moat — competitors like Localo and BrightLocal don't have agent layers

---

## Sprint Items

### LB-S6-01 · OpenAPI Specification (`/openapi.yaml`)
Full API spec covering all public endpoints:
- `POST /api/generate` — Generate GBP post
- `POST /api/pages` — Generate city/service area page
- `POST /api/reviews` — Draft review response
- `GET /api/business/:id` — Get business details
- `GET /api/posts` — List generated posts
- `GET /api/health` — Health check

**Spec includes:** Authentication (API key via `X-API-Key` header), request/response schemas, rate limits, error formats.

**Success criteria:** Paste the URL into any OpenAPI viewer and it renders correctly. An AI agent can read it and call our API.

### LB-S6-02 · API Key Management (Dashboard)
New dashboard page: `/dashboard/settings/api`
- Generate API key (one per account, regenerate anytime)
- API key stored in Supabase `users` table (hashed)
- Copy-to-clipboard button
- Show usage stats (calls this month)
- Available on Solo ($49) and Agency ($99) only — Free tier gets no API access

**Auth middleware:** New middleware that checks `X-API-Key` header on `/api/*` routes. Falls back to Clerk session auth for dashboard usage.

**Success criteria:** Generate key → call `/api/generate` with curl → get a real response.

### LB-S6-03 · MCP Server (npm package: `localbeacon-mcp`)
Model Context Protocol server so Claude Desktop / Cursor / Windsurf users can:
- `create_post` — Generate a GBP post for a client
- `create_page` — Generate a city page
- `draft_review_response` — Draft a review reply
- `get_business` — Pull business details
- `list_posts` — See post history
- `get_audit_score` — Check GBP completeness

**Package:** `localbeacon-mcp` on npm
**Config:** User provides API key in MCP config:
```json
{
  "mcpServers": {
    "localbeacon": {
      "command": "npx",
      "args": ["localbeacon-mcp"],
      "env": { "LOCALBEACON_API_KEY": "lb_..." }
    }
  }
}
```

**Success criteria:** Install in Claude Desktop → ask "generate a Google post for my plumbing business" → it works.

### LB-S6-04 · Webhook System
Agencies need push notifications for their automations:
- `post.created` — New post generated
- `post.approved` — Post approved for publishing
- `review.received` — New review detected (future, post-GBP API)
- `page.created` — New city page generated

**Dashboard:** `/dashboard/settings/webhooks`
- Add webhook URL
- Select events to subscribe to
- Test button (sends sample payload)
- Webhook secret for signature verification

**Implementation:** Supabase `webhooks` table + async delivery via edge function or API route.

**Success criteria:** Set up webhook → generate a post → receive POST to webhook URL within 5 seconds.

### LB-S6-05 · Upgrade `llms.txt`
Current `llms.txt` is a basic overview. Upgrade to full capabilities doc:
- All available tools/endpoints with descriptions
- Authentication instructions
- Rate limits and pricing tiers
- Link to `openapi.yaml` and MCP package
- Example workflows ("How an AI agent would onboard a new client")

**Success criteria:** An AI agent reading only `llms.txt` can understand what LocalBeacon does and how to integrate.

### LB-S6-06 · Developer Docs Page (`/docs`)
Human-readable API documentation:
- Getting started guide
- Authentication
- All endpoints with request/response examples
- Webhook setup
- MCP installation guide
- Rate limits by plan
- Code examples (curl, JavaScript, Python)

**Design:** Same warm light theme as main site. Left sidebar nav, code blocks with syntax highlighting.

**Success criteria:** A developer can go from zero to making API calls in under 10 minutes.

---

## Constraints & What NOT To Do
- Don't build a CLI (yet) — API + MCP is enough for Sprint 6
- Don't build OAuth/third-party app platform — just API keys
- Don't over-engineer webhooks — simple HTTP POST, retry 3x, done
- Don't gate `llms.txt` or `openapi.yaml` behind auth — these must be public
- MCP server must work without an account for discovery (returns auth error with clear signup instructions)

---

## Verification Steps
1. `curl https://localbeacon.ai/openapi.yaml` returns valid OpenAPI 3.0 spec
2. Generate API key in dashboard → `curl -H "X-API-Key: lb_..." https://localbeacon.ai/api/generate -d '...'` returns a post
3. Install `localbeacon-mcp` in Claude Desktop → generate a post via natural language
4. Set up webhook → trigger event → receive HTTP POST at configured URL
5. `curl https://localbeacon.ai/llms.txt` returns comprehensive capabilities doc
6. Visit `/docs` → follow "Getting Started" → make first API call in <10 min

---

## Dependencies
- Sprint 5 must be complete (API routes working end-to-end with Supabase)
- API key column added to `users` table in Supabase
- New `webhooks` table in Supabase

---

*Created: March 1, 2026*
