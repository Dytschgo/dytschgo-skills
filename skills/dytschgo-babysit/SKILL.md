---
name: dytschgo-babysit
description: "Monitor an open PR through CI and review. Babysitting permits bounded repair on an owned task branch; a plain watch request stays read-only. Stops at readiness."
---

# Dytschgo Babysit

Keep one open PR moving: react to failing checks, review bots, human comments, and conflicts, and stop when it is ready or stuck.

## Authority

A plain watch, monitor, or report request grants read-only observation. A request to babysit or keep the PR green permits in-scope edits, commits, pushes, and factual replies in that task PR's review threads when the PR and branch are confirmed task-owned. This also applies when Ship hands over its repair authority. Attribute replies using the [agent comment format](../dytschgo-coordinate/references/github-and-review.md#attribution-for-agent-comments).

Shared or contributor branches need explicit repair authorization; rewriting their history needs its own grant. Without it, report the proposed change. Never resolve a human review thread for the reviewer. Preserve narrower user restrictions.

## One watcher

Read the full current PR state before the first wait and after every resume, including after a question. Process existing findings first. Keep exactly one watcher per PR, owned by its coordinating thread; delegated children never watch. Follow the [runtime watcher guidance](../dytschgo-coordinate/references/runtime.md#pr-watching) and its limits. Finish each iteration with a shared verdict or a supported event wait.

## Each wake

1. Record the current head. Use check results for that revision. Carry every unresolved human, bot, and agent finding forward across pushes; verify it against current code before marking it fixed, stale, or dismissed. Honor the host's rules for approvals on new revisions.
2. Failing check: read the log and reproduce when possible. In repair mode, fix in scope and push; in observation mode, report the failure. Call it a flake only with evidence from base or sibling runs.
3. Review finding: verify the claim. In repair mode, fix real in-scope issues and explain dismissed bot findings in-thread. Prepare out-of-scope replies for the user unless commenting is already authorized. In observation mode, report findings without posting or editing.
4. Conflict: repair only with branch authority. Merge the base or rebase as the repository permits; use `--force-with-lease` only on a task-owned, unshared branch or with explicit history-rewrite authorization. Refresh affected proof and review after changes.
5. Apply the [merge gate and PR verdicts](../dytschgo-coordinate/references/github-and-review.md#merge-gate). Stop at Ready or Blocked. For outstanding checks or reviews, report Waiting and use a supported watcher when available; otherwise report the coverage limit and return.

Keep the PR small. A review comment asking for new features becomes a follow-up note, not more diff.

## Limits

Babysitting alone grants no merge, auto-merge, or merge queue. If already authorized, hand off to [Merge when authorized](../dytschgo-engineering/references/delivery-and-recovery.md#merge-when-authorized) outside Babysit; do not ask again. Without merge authorization, stop existing auto-merge before repair pushes or report that it cannot be stopped. Three failed fixes on the same check means Blocked with evidence.

Report one shared verdict, PR link, head SHA, fixes, dismissals and reasons, watcher limitations, and "Not merged." An authorized merge handoff ends with its verified outcome instead.
