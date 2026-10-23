---
name: dytschgo-handoff
description: "Compact the current conversation into a handoff a fresh agent can continue from. Use when the thread should move. Not the same as filing fix tickets for people."
---

# Dytschgo Handoff

If `references/active-profile.md` exists, read it as this installation's selected working profile. Apply relevant defaults under the current task instructions.

Write a handoff that lets a fresh agent continue the work. For a shared filesystem, save it in the operating system's temporary directory, not in the workspace. If the next agent cannot access that filesystem, also provide the redacted handoff inline or as an artifact accessible to the next session. Behavior follows Matt Pocock's handoff skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/handoff/SKILL.md

This is not a list of fix tickets for people. It is a compact of this thread.

Include a suggested-skills section that names which skills the next agent should pull, using the names in this collection (for example Dytschgo Grill, Dytschgo Spec, Dytschgo Tickets, Dytschgo Engineering, Dytschgo Coordinate). Name only the skills the next session actually needs.

Do not copy content that already lives in another artifact. Specs, plans, ADRs, issues, commits, and diffs get a path or URL.

Redact secrets, passwords, API keys, and personally identifiable information. Write `<REDACTED>` in their place.

If the user passed an argument, treat it as what the next session is for, and tailor the doc to that.

## What to include

- What the next session is for.
- Decisions already made, in a few lines, pointing at the artifact that holds the detail.
- Exact selected design ID/name and artifact, retained behavior, accepted scope and delivery boundary; current checkout/revision/preview relationship when relevant. Carry later steering and superseded choices without reopening settled decisions.
- What is in progress, and the exact next action.
- Blockers and anything the next agent must not redo.
- Suggested skills.

## Hand off

After delivering the redacted handoff, stop working this task. Tell the user its accessible path, attachment, or inline location; a temp path alone is insufficient when the next session cannot read that filesystem. [Dytschgo Coordinate](../dytschgo-coordinate/SKILL.md) and [Dytschgo Wayfinder](../dytschgo-wayfinder/SKILL.md) pull this skill when a thread should move.
