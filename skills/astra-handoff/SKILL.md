---
name: astra-handoff
description: Compact the current conversation into a handoff a fresh agent can continue from. Use when the thread should move. Not the same as filing fix tickets for people.
---

# Astra Handoff

Write a handoff that lets a fresh agent continue the work. Save it in the operating system's temporary directory, not in the workspace. Behavior follows Matt Pocock's handoff skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/handoff/SKILL.md

This is not a list of fix tickets for people. It is a compact of this thread.

Include a suggested-skills section that names which skills the next agent should pull, using the names in this collection (for example Astra Grilling, Astra To Spec, Astra To Tickets, Astra Engineering, Astra Orchestrator). Name only the skills the next session actually needs.

Do not copy content that already lives in another artifact. Specs, plans, ADRs, issues, commits, and diffs get a path or URL.

Redact secrets, passwords, API keys, and personally identifiable information. Write `<REDACTED>` in their place.

If the user passed an argument, treat it as what the next session is for, and tailor the doc to that.

## What to include

- What the next session is for.
- Decisions already made, in a few lines, pointing at the artifact that holds the detail.
- What is in progress, and the exact next action.
- Blockers and anything the next agent must not redo.
- Suggested skills.

## Hand off

Do not keep working the task after the file is written. Tell the user the temp path. [Astra Orchestrator](../astra-orchestrator/SKILL.md) and [Astra Wayfinder](../astra-wayfinder/SKILL.md) pull this skill when a thread should move.
