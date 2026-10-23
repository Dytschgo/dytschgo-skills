# Brief from a conversation

Read when preparing an agent assignment from informal notes, follow-ups, or a settled conversation.

Recover the goal and accepted decisions from the user and the named artifacts. Separate user-authored instructions from generated suggestions. A supplied implementation spec can be authoritative for the task without being evidence of the user's general writing style.

Keep the brief as small as the work permits:

```text
Outcome for this run:
Source: checkout/branch and page, artifact, or selected option:
Accepted changes:
Constraints and retained behavior:
Authorized delivery boundary: local / commit / PR / merge / deployment target:
Done when: observable behavior or artifact criteria:
Evidence: affected flows, captures, and relevant existing checks:
Further ideas: separate from this run:
```

Use existing authorization and discoverable facts. Infer routine reversible details and state material assumptions briefly. Ask one focused question when competing interpretations would change the result. A compact brief is a working aid, not a form the user must approve before every action.

“Do all of them” selects the agreed list in context. Keep optional, rejected, and superseded ideas out of that list. “Continue” preserves the objective while incorporating later steering. An explicit new requirement can expand or replace the affected part; update the brief and affected assignments. If the request is unbounded, propose a concrete first usable outcome and its finish criteria; settle the material scope before building.

Carry exact option names and artifact references into the assignment. For a selected design, preserve the comparison target and note requested combinations. Do not silently replace an earlier selection with the agent's recommendation.

Done: another agent can identify what to deliver, how to demonstrate it, and where to stop without reconstructing the conversation. Do not make the assignment longer merely to sound comprehensive.
