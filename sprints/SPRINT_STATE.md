# Sprint State

| Sprint | State | Opened | Closed | Review Artifact |
|--------|-------|--------|--------|-----------------|
| 1 | Closed | 2026-02-28 | 2026-02-28 | — (pre-governance) |
| 2 | Closed | 2026-02-28 | 2026-03-01 | — (pre-governance) |
| 3 | Closed | 2026-03-01 | 2026-03-01 | — (pre-governance) |
| 4 | Closed | 2026-03-01 | 2026-03-01 | — (pre-governance) |
| 5 | Closed | 2026-03-01 | 2026-03-02 | sprints/sprint-5-review.md (informal, in retro) |
| 6 | Closed | 2026-03-02 | 2026-03-02 | sprints/sprint-6-forensics.md |
| 7 | Closed | 2026-03-02 | 2026-03-03 | sprints/sprint-7-forensics.md |

## Sprint State Definitions

- **Draft** — Spec written, not yet approved for work
- **Active** — Work in progress
- **Pending Review** — All spec items complete, awaiting review/forensics artifact
- **Closed** — Review artifact committed, sprint formally closed

## Rules

1. Cannot open Sprint N+1 if Sprint N is not `Closed`
2. Sprint transitions to `Pending Review` when all spec items are marked complete
3. Sprint cannot transition to `Closed` without a review/forensics artifact committed to `sprints/`
4. Alexander checks this file before starting any new sprint work
