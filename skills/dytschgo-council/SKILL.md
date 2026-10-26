---
name: dytschgo-council
description: "Get three independent reviews from three different model providers and reconcile them. Use when the user says 'council', 'ask the council', or 'get a second and third opinion'."
---

# Dytschgo Council

Seat three delegates, one per provider, so blind spots of one model family do not decide the outcome. Usually for code review or a design call.

## Seat the council

- Members the user names win. Otherwise take the current flagship from three different providers: the Sol worker from [worker routing](../dytschgo-coordinate/references/routing.md) for OpenAI, the latest Claude Opus for Anthropic, and the latest Gemini Pro for Google.
- Run every member at high reasoning effort.
- Read the live model catalog first. If a provider or named member is unavailable, say so and run with the members you have, or stop if the user needs all three. Never swap in a different model and call it the council.

## Run a round

Start the three delegates in parallel:

- **T3 Code:** resolve models with the orchestrator capability tool, then start one delegated task per member.
- **Other harnesses:** use the harness's subagent or task tool with an explicit model per member.

Give each the same request, the pinned diff or artifact, the spec or acceptance criteria, and repo standards. Keep them read-only. Do not pass your own conclusions or the other members' answers.

For a code review, ask each for findings tagged blocker, should, or nit, and a score out of 10. One full pass by all members is one round. A fresh pass after fixes is a new round.

## Reconcile

Summarize agreement, disagreement, and the fixes you accept. Check each finding against the code before acting; a majority is not proof. Make accepted in-scope fixes, then run another round. Stop when no member reports a blocker or should-fix, or after the [review-loop budget](../dytschgo-review/SKILL.md#review-loop-mode). Bring unresolved disputes to the user.

Guard the scope. New feature ideas from members become follow-up notes, not more diff.

## Record scores

If the work has a PR, put the table in the PR description (edit it; do not add a comment). Otherwise put it in the final reply.

```markdown
## Council

Rounds: 2

| Member | Round 1 | Round 2 |
| --- | --- | --- |
| OpenAI (model id) | 6/10 | 9/10 |
| Anthropic (model id) | 7/10 | 9/10 |
| Google (model id) | 7/10 | unavailable |
```

Use the real model IDs. Write `no score` when a member gave none and `unavailable` when it could not run. Never invent a score. A council grants no merge permission.
