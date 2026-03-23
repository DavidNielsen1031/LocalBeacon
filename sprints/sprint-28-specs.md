# Sprint 28 — Revenue Readiness

**Theme:** Make sure money can actually flow in and the first humans can use the product without hitting broken infrastructure.
**Trigger:** Stripe key was "placeholder" for 22 days. Clerk DNS on test mode. Zero paying customers after 27 sprints. Expo is 34 days away.

---

## S28-01: Full E2E Checkout Test (Size S)

Test the complete flow: scan site → see plan cards → click paid plan → Stripe Checkout → sign up → claim checkout → dashboard shows paid plan. Test both Solo ($49) and DFY ($499). Verify Stripe webhook fires and updates user plan in Supabase. Test on mobile Safari and Chrome. Document any failures.

## S28-02: Fix Clerk Production Auth (Size M)

Clerk is running on test keys (`amused-ox-11.clerk.accounts.dev` → Cloudflare 1016 for custom domain). Fix DNS or switch to production Clerk instance. Sign-in/sign-up pages should show `localbeacon.ai` domain, not a Clerk subdomain. This is a trust-killer for Taylor and Bob.

## S28-03: Checkout Monitoring (Size S)

Add a simple healthcheck: if any `/api/checkout` or `/api/checkout-public` call returns 500 in the last hour, alert #alerts on Discord. Can be a Vercel cron that checks recent logs, or instrument the routes themselves to log errors and check via a monitoring endpoint.

## S28-04: Housekeeping — Branches + Backlog (Size M)

Delete stale sprint branches (s22-s27). Update SPRINT_STATE.md to reflect reality (close sprints 12-27). Rewrite BACKLOG.md to match current product state — current pricing ($0/$49/$499), current features, current objectives, current sprint plan (28-31). Remove all references to Agency $99 tier.

## S28-05: Email Deliverability Audit (Size S)

Test that AEO report emails from `hello@localbeacon.ai` via Resend don't land in Gmail/Outlook spam. Check SPF, DKIM, DMARC alignment. Send test emails to 3 providers (Gmail, Outlook, Yahoo). Document results. If spam rate is high, fix DNS records.

---

## Acceptance Criteria (Sprint-Level)

- [ ] A real credit card can complete checkout for Solo and DFY
- [ ] Stripe webhook creates/updates user plan in Supabase
- [ ] Clerk auth pages show localbeacon.ai domain (not Clerk subdomain)
- [ ] Checkout errors trigger Discord alerts
- [ ] Sprint state and backlog reflect reality
- [ ] Report emails land in inbox (not spam) for Gmail/Outlook
