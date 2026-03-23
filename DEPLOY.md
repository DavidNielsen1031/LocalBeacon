# LocalBeacon — Deploy Guide

## How Deployment Works

LocalBeacon uses **Vercel GitHub Integration** for all deployments. No CLI deploys.

**Production:** Push/merge to `main` → Vercel auto-deploys to `localbeacon.ai`
**Preview:** Push any branch → Vercel auto-deploys a preview URL (behind Vercel auth)

## Why CLI Deploys Don't Work

The Vercel project (`localbeacon-ai`) has `rootDirectory: "app"` configured in the dashboard. The `.vercel/project.json` inside `app/` also has `rootDirectory: "app"`, causing double-nesting (`app/app/`) when deploying from the `app/` directory via CLI. The GitHub integration uses the dashboard setting correctly.

**Do not run:** `vercel` or `vercel --prod` from the CLI.
**Do:** Push to GitHub and let Vercel auto-deploy.

## Deploy Flow

1. Work on sprint branch: `sprint/localbeacon/s<N>`
2. Push branch: `git push github sprint/localbeacon/s<N>` → preview auto-deploys
3. Create PR: `gh pr create --base main --head sprint/localbeacon/s<N>`
4. Merge: `gh pr merge <N> --squash --delete-branch`
5. Production auto-deploys from `main`
6. Verify: `curl -s -o /dev/null -w "%{http_code}" https://localbeacon.ai`

## Environment Variables

Managed in Vercel dashboard or via CLI:
```bash
# Add: echo -n "value" | vercel env add NAME production
# Remove: vercel env rm NAME production
# List: vercel env ls
```

**⚠️ Always use `echo -n`** — without it, a trailing newline corrupts the value.

## Crons

Defined in `app/vercel.json`. Auto-registered on production deploy. All crons require `CRON_SECRET` auth header.

## Rollback

Use Vercel dashboard → Deployments → promote a previous deployment.

---

*Created: 2026-03-22 (Sprint 28 retro action item)*
