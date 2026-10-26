---
name: dytschgo-file-pr
description: "Write or open a PR whose body leads with the problem, then before/after proof and the door. Use when the user says 'open a PR', 'file the PR', or 'write the PR description'."
---

# Dytschgo File PR

A reviewer should know from the first two lines what was broken or missing and what is different now. Lead with the problem, not the diff.

## Body shape

1. **Problem** — one or two sentences a user of the product would recognize. Name the symptom or gap.
2. **Change** — what behaves differently now, then the approach in a few bullets. Name files only when they help review.
3. **Before / After** — a screenshot, output, or failing-then-passing test. Required on every PR.
4. **Door** — one-way (hard to undo, destructive) or two-way (can be walked back). Required on every PR.
5. **Checks** — what ran, what failed, what was skipped and why.
6. **Review focus** — where a reviewer should look hardest. Skip if obvious.

Scale it to risk. A one-line fix gets a short body; a migration gets rollback notes. Leave empty sections out. Follow the repository template when one exists and fit these parts into it.

## Bad and good

Bad:

> Updated `auth.ts` and `session.ts`. Refactored token handling. Added tests.

Good:

> Problem: users who sign in on two tabs get logged out of the first one after ten minutes.
> Change: sessions refresh one shared token instead of one per tab.
> Before: second-tab sign-in, wait 10 min, first tab 401s (test `session.multi-tab` failing).
> After: same steps, both tabs stay signed in (test passing).
> Door: two-way; reverting restores per-tab tokens.

## Filing

Use the host's structured PR tool, or `gh pr create --body-file <tmp>` so newlines survive. Before retrying after an unclear result, check whether the PR already exists. Return the real URL. Opening a PR does not grant merge. Full field list: [PR content and handover](../dytschgo-coordinate/references/github-and-review.md#pr-content-and-handover).
