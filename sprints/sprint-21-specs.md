# Sprint 21 — Deliver the Monitoring Promise

---

## S21-01: Scan History + Trend Chart (Size M)

Save every dashboard AI Readiness scan to `aeo_scans` (already exists — check if it stores per-check results, add columns if needed). Show score history as a line chart on `/dashboard/ai-readiness`. Free users see latest scan only. Solo sees full history.

**Where:** `app/api/ai-readiness/route.ts` (save results), `app/dashboard/ai-readiness/page.tsx` (display history + chart)

---

## S21-02: Schema & llms.txt Monitoring Cron (Size M)

Weekly cron that checks each Solo user's website for schema markup and llms.txt presence. If either was detected previously but is now missing, send an alert email. Add status badges to the dashboard.

**Where:** New `app/api/cron/monitor-visibility/route.ts`, update `vercel.json` (Monday 9am CST = `0 15 * * 1`), `app/dashboard/ai-readiness/page.tsx` (status badges)

---

## S21-03: DFY Success Page + Booking Link (Size S)

After DFY checkout, show a success state on `/dashboard` with a booking CTA. Use env var `NEXT_PUBLIC_BOOKING_URL` for the Calendly/Quo link. Fallback message if not set.

**Where:** `app/dashboard/page.tsx` (detect `?upgraded=dfy` query param)

---

## S21-04: Welcome Email on First Sign-Up (Size S)

Send a branded welcome email on first dashboard visit (check if user exists in `users` table — if not, create + send email). Different copy for free vs paid.

**Where:** `app/dashboard/page.tsx` or `app/api/businesses/route.ts` (wherever user record is first created), `lib/email.ts` (new `sendWelcomeEmail` function)

---

**Build + commit after all changes. Push to `main`.**
