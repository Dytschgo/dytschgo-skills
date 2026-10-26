---
name: dytschgo-council
description: "Get independent reviews from three model providers when the user asks for a council. Reconcile findings and scores; a review request grants no edits or external writes."
---

# Dytschgo Council

Seat three delegates, one per provider, so blind spots of one model family do not decide the outcome. Usually for code review or a design call.

## Seat the council

- Use the seats and effort from [worker routing](../dytschgo-coordinate/references/routing.md#council-seats); named user choices win.
- Read the live model catalog first. Report unavailable seats and run the available members by default. Stop only if the user explicitly requires every seat. Never substitute another model for an unavailable member.

## Run a round

Start the three delegates in parallel:

- **T3 Code:** resolve models with the orchestrator capability tool, then start one delegated task per member.
- **Other harnesses:** use the harness's subagent or task tool with an explicit model per member.

Give each the same request, the pinned diff or artifact, the spec or acceptance criteria, and repo standards. Keep them read-only. Do not pass your own conclusions or the other members' answers.

For a code review, ask each for findings tagged blocker, should, or nit, and a score out of 10. One pass by the available members is one round; record missing seats as unavailable. A fresh pass after fixes is a new round.

## Reconcile

Summarize agreement, disagreement, and proposed fixes. Check each finding against the code; a majority is not proof. A review-only request ends with findings and scores. Fix accepted in-scope issues and run another round only when existing user authorization covers edits. Use the [review-loop budget and ledger](../dytschgo-review/SKILL.md#review-loop-mode); exhaustion with open blocker/should items does not establish readiness. Bring unresolved disputes to the user.

Guard the scope. New feature ideas from members become follow-up notes, not more diff.

## Record scores

Put scores in the final reply by default. Update a task PR's description only when the session authorizes that write and this run owns its delivery. Replace only the Council section, preserving the remaining description; if absent, append it. Do not post a comment just to record scores.

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
