---
name: astra-to-tickets
description: Split a spec, plan, or settled conversation into vertical tracer-bullet tickets with blocking edges. Use when the work is specified and needs a build order; not for interviewing the design or implementing the tickets.
---

# Astra To Tickets

Break a plan, spec, or conversation into tracer-bullet tickets. Each ticket declares the tickets that block it. Behavior follows Matt Pocock's to-tickets skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/to-tickets/SKILL.md

## Process

1. Work from the conversation. If the user passes a spec path, issue number, or URL, read its full body and comments first.

2. Explore the codebase if you have not. Title and describe tickets in the project's glossary, and respect ADRs in the area. Look for a prefactor that makes the change easy before the change itself.

3. Draft vertical slices:

- Each slice cuts a narrow but complete path through every layer it needs (schema, API, UI, tests). It is not a horizontal slice of one layer.
- A finished slice is demoable or verifiable on its own.
- Each slice fits in one fresh context window.
- Prefactoring lands first.

Give every ticket its blocking edges: the other tickets that must finish before it starts. A ticket with no blockers can start immediately.

A wide refactor is the exception. That is one mechanical change, such as renaming a column or retyping a shared symbol, whose blast radius breaks so many call sites that no vertical slice can land green. Do not force it into a tracer bullet. Sequence it as expand, then contract. Expand: add the new form beside the old so nothing breaks. Migrate call sites in batches sized by blast radius (per package, per directory). Each batch is its own ticket, blocked by the expand, and stays green because the old form still exists. Contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. If the batches cannot stay green alone, keep that sequence on a shared integration branch and let them all block one final integrate-and-verify ticket. Green is promised only there.

4. Show the breakdown as a numbered list before publishing. For each ticket: title, blocked by, and the end-to-end behavior it makes work. Ask whether the grain is right, whether each edge is a real gate, and whether any ticket should merge or split. Change the list until the user approves it.

5. Publish in dependency order so blockers exist before the tickets that name them. Do not close or edit a parent issue.

- Local files: one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, blockers first. Never one combined file.
- GitHub, Linear, or another tracker this repo already uses: one issue per ticket. Use the tracker's native blocking or sub-issue link when it has one. Otherwise write the blockers in the body. Apply `ready-for-agent` from [Astra Triage](../astra-triage/SKILL.md) unless the user says otherwise. These tickets are agent-ready by construction.

If no tracker is documented, use GitHub issues when `gh` can see the current repo, and local files otherwise. Say which you used.

Work the frontier: any ticket whose blockers are all done. A linear chain runs top to bottom. This skill publishes that frontier. It does not implement it.

Avoid file paths and code snippets. They go stale. Exception: a prototype snippet that states a decision more precisely than prose (a state machine, reducer, schema, or type shape) may be inlined, trimmed to the decision, and marked as coming from a prototype.

## Local ticket

```markdown
# <NN>: <Ticket title>

**What to build:** the end-to-end behavior this ticket makes work, from the user's side, not a layer-by-layer plan.

**Blocked by:** numbers and titles of the tickets that gate this one, or "None (can start immediately)".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2
```

## Tracker issue

```markdown
## Parent

The parent issue, if the source was an existing issue. Omit this section otherwise.

## What to build

The end-to-end behavior, from the user's side, not a layer-by-layer plan.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- Each blocking ticket, or "None (can start immediately)".
```

## Hand off

Do not implement inside this skill. When a person should build the frontier, pull [Astra Engineering](../astra-engineering/SKILL.md). When coordinated agents should build it, pull [Astra Orchestrator](../astra-orchestrator/SKILL.md).
