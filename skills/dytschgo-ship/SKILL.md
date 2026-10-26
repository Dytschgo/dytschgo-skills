---
name: dytschgo-ship
description: "Take a settled change to a reviewed, green PR when the user asks to ship it. Stops unmerged; an explicit merge instruction continues through the authorized merge procedure."
---

# Dytschgo Ship

Carry one agreed change from working tree to a merge-ready PR. Ship ends at that boundary. If the user explicitly authorized merging, including in the same request, continue outside Ship through [Merge when authorized](../dytschgo-engineering/references/delivery-and-recovery.md#merge-when-authorized) without asking again.

## What saying "ship it" grants

A ship request is standing permission, for this task only, to:

- create a task branch, commit, push it, rebase it, resolve its conflicts, and `--force-with-lease` that task-owned, unshared branch;
- open one PR against the real base branch and edit its description;
- run the proof methods [Dytschgo Verify Setup](../dytschgo-verify-setup/SKILL.md) and [Dytschgo Impact](../dytschgo-impact/SKILL.md) need, including local app launch and browser checks within project constraints and existing authorization;
- watch the PR with [Dytschgo Babysit](../dytschgo-babysit/SKILL.md), push in-scope fixes, and post factual replies in that task PR's review threads, using the [agent attribution](../dytschgo-coordinate/references/github-and-review.md#attribution-for-agent-comments).

Ship alone grants no merge, auto-merge, merge queue, default-branch push, protection bypass, deploy, closure of other people's PRs, or communication outside the task PR. Preserve explicit task restrictions and project ask-first requirements unless existing user authorization covers the action. Apply the shared [existing merge authority](../dytschgo-coordinate/references/github-and-review.md#existing-merge-authority) rule before repair pushes.

## The run

1. **Build.** Do the work with [Dytschgo Engineering](../dytschgo-engineering/SKILL.md), or [Dytschgo Design](../dytschgo-design/SKILL.md) for UI. Keep the scope the user agreed. One outcome, one PR.
2. **Prove.** Capture a before and an after for the changed behavior. Use the project's verification guide when it exists; pull Impact when the diff can break things it does not touch.
3. **Review.** Run [Dytschgo Review](../dytschgo-review/SKILL.md) on the committed diff in loop mode. Fix blockers and should-fix items that are in scope. Pull [Dytschgo Council](../dytschgo-council/SKILL.md) only when the user asks for a council or the change is high risk and the providers exist.
4. **File.** Push the branch and open the PR with [Dytschgo File PR](../dytschgo-file-pr/SKILL.md): problem first, before/after, door.
5. **Watch.** Hand the PR to Babysit until the merge gate passes or something needs the user.
6. **Delivery boundary.** Check the [merge gate](../dytschgo-coordinate/references/github-and-review.md#merge-gate) against the live PR head. Stop unmerged unless an existing explicit merge grant continues through the authorized merge procedure outside Ship.

Proof and review must cover the final head. A conflict fix or behavior change after review reopens the affected proof.

## When to ask

Keep working without check-ins. Ask only when one of the [ask-gate](../dytschgo-coordinate/references/github-and-review.md#ask-gate) situations comes up. Before asking, finish every reversible step you can.

## Report

When ending unmerged, use the shared [PR verdicts](../dytschgo-coordinate/references/github-and-review.md#pr-verdicts). Include the PR link, head SHA, proof, review outcome, checks, door, remaining risk, and "Not merged." If an authorized merge follows, report its verified outcome after the merge procedure instead of ending at this intermediate verdict.
