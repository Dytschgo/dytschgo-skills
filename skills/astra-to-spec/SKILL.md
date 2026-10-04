---
name: astra-to-spec
description: Publish the current conversation as a tracker spec. Use when the decision is already settled and should become an issue; not for interviewing, splitting tickets, or implementing.
---

# Astra To Spec

Turn what this conversation already decided into a spec and publish it. Do not interview. Behavior follows Matt Pocock's to-spec skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/to-spec/SKILL.md

## Process

1. Explore the repo if you have not already. Use the project's glossary when one exists, and respect ADRs in the area you are touching.

2. Sketch the seams where this will be tested. Prefer a seam that already exists, and the highest seam that can still see the behavior. Propose a new seam only at the highest point that works. Fewer seams are better; one is the ideal. Check with the user that those seams match what they expect. That check is about the seams, not a fresh interview about the feature.

3. Write the spec from the template and publish it. Mark it `ready-for-agent` using the roles in [Astra Triage](../astra-triage/SKILL.md). It does not need another triage pass.

## Where to publish

Use the issue tracker this repo already documents. If none is documented, publish a GitHub issue on the current repo when `gh` can see it. Otherwise write `.scratch/<feature-slug>/spec.md` and say that you did. Do not invent a setup workflow.

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

Do not split the spec or start the build in this skill. When the published spec should become tracer-bullet tickets, pull [Astra To Tickets](../astra-to-tickets/SKILL.md).
