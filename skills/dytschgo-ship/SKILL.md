---
name: dytschgo-ship
description: "Take a settled change all the way to a reviewed, green, unmerged PR. Use when the user says 'ship it', 'full stop', 'take this to a PR', or 'get this PR-ready'. Never merges."
---

# Dytschgo Ship

Carry one agreed change from working tree to a PR that is ready for the user to merge, then stop. The user presses merge, not you.

## What saying "ship it" grants

A ship request is standing permission, for this task only, to:

- create a task branch, commit, push it, rebase it, resolve its conflicts, and `--force-with-lease` that branch;
- open one PR against the real base branch and edit its description;
- run the proof methods [Dytschgo Verify Setup](../dytschgo-verify-setup/SKILL.md) and [Dytschgo Impact](../dytschgo-impact/SKILL.md) need, including local app launch and browser checks, even where a project note says to ask first for those checks;
- watch the PR with [Dytschgo Babysit](../dytschgo-babysit/SKILL.md) and push fixes for its findings.

It does not grant: merge, auto-merge, merge queue, pushes to the default branch, bypassing protection, deploys, closing other people's PRs, or messaging people. Only a separate, explicit "merge it" from the user unlocks merge. If auto-merge is already on, turn it off and say so. If you cannot stop an automatic merge, report that before pushing.

## The run

1. **Build.** Do the work with [Dytschgo Engineering](../dytschgo-engineering/SKILL.md), or [Dytschgo Design](../dytschgo-design/SKILL.md) for UI. Keep the scope the user agreed. One outcome, one PR.
2. **Prove.** Capture a before and an after for the changed behavior. Use the project's verification guide when it exists; pull Impact when the diff can break things it does not touch.
3. **Review.** Run [Dytschgo Review](../dytschgo-review/SKILL.md) on the committed diff in loop mode. Fix blockers and should-fix items that are in scope. Pull [Dytschgo Council](../dytschgo-council/SKILL.md) only when the user asks for a council or the change is high risk and the providers exist.
4. **File.** Push the branch and open the PR with [Dytschgo File PR](../dytschgo-file-pr/SKILL.md): problem first, before/after, door.
5. **Watch.** Hand the PR to Babysit until the merge gate passes or something needs the user.
6. **Stop.** Check the [merge gate](../dytschgo-coordinate/references/github-and-review.md#merge-gate) against the live PR head. Do not merge.

Proof and review must cover the final head. A conflict fix or behavior change after review reopens the affected proof.

## When to ask

Keep working without check-ins. Ask only when one of the [ask-gate](../dytschgo-coordinate/references/github-and-review.md#ask-gate) situations comes up. Before asking, finish every reversible step you can.

## Report

End with exactly one verdict:

- **Ready** — the merge gate passes on the current head. The PR stays open and unmerged.
- **Waiting** — only a human approval or a required human reviewer remains. Name who.
- **Blocked** — say what stops readiness, what you tried, and the one thing you need.

Include the PR link, head SHA, proof, review outcome, checks, door, remaining risk, and the line "Not merged."
