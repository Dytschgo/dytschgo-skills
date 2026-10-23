---
name: dytschgo-spec
description: "Write a settled conversation as a spec, locally for a draft or to an authorized tracker. Use when decisions are settled and a spec is requested; not interviewing, splitting tickets, or implementation."
---

# Dytschgo Spec

If `references/active-profile.md` exists, read it as this installation's selected working profile. Apply relevant defaults under the current task instructions.

Turn what this conversation already decided into the requested spec. Preserve its draft or publication boundary. Do not restart the product interview. Behavior follows Matt Pocock's to-spec skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/to-spec/SKILL.md

## Process

1. Explore the repo if you have not already. Use the project's glossary when one exists, and respect ADRs in the area you are touching.

2. Sketch the seams where this will be tested. Prefer a seam that already exists, and the highest seam that can still see the behavior. Propose a new seam only at the highest point that works. Fewer seams are better; one is the ideal. Reuse accepted testing decisions and discover existing seams. Ask one focused question only if a material testing decision remains unresolved, and wait for that answer before publishing. This does not require a new confirmation for already-settled decisions.

3. Write the spec from the template and deliver it within the requested boundary. For an authorized tracker item, mark it `ready-for-agent` using the label meaning in [Dytschgo Triage](../dytschgo-triage/SKILL.md): specified enough for an agent to act. This is a shared definition, not another triage pass.

## Where to publish

For a draft or local-only request, write `.scratch/<feature-slug>/spec.md` and report its path. For publication, resolve the exact tracker/repository and visibility from the request, project conventions, and remote context, including forks. Use existing authorization for that destination; access through `gh` alone is not publication authorization. Ask one focused question before the write only if a material target or required decision remains unresolved. Otherwise proceed without duplicate confirmation. If publication is not authorized or no tracker is available, use the local artifact rather than inventing a setup workflow.

## Spec

```markdown
## Problem Statement

The problem from the user's side.

## Solution

The solution from the user's side.

## User Stories

A long numbered list. Cover the feature, not a sample. Each story is:

1. As an <actor>, I want <feature>, so that <benefit>

## Implementation Decisions

Decisions already made: modules and the interfaces that change, technical clarifications, architecture, schema, API contracts, and specific interactions.

Do not name file paths or paste code. They go stale. Exception: if a prototype produced a snippet that states a decision more precisely than prose (a state machine, reducer, schema, or type shape), inline the decision-rich part, not a demo, and note that it came from a prototype.

## Testing Decisions

What a good test is here (external behavior, not implementation details), which modules get tests, and prior art already in the codebase.

## Out of Scope

What this spec does not cover.

## Further Notes

Anything else the implementer needs.
```

## Hand off

Do not split the spec or start the build in this skill. When the published spec should become tracer-bullet tickets, pull [Dytschgo Tickets](../dytschgo-tickets/SKILL.md).
