---
name: astra-writing-for-agents
description: Write or edit a skill, AGENTS.md, or CLAUDE.md so an agent follows it. Use when adding a skill to this collection or changing a doc an agent loads by a pointer.
---

# Astra Writing for Agents

How to write a document an agent consumes: a skill, an `AGENTS.md` or `CLAUDE.md`, or a doc reached by a pointer. The packaging differs. The writing does not. The agent should take the same process every run, not emit the same output. Behavior follows Matt Pocock's writing-for-agents skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/writing-for-agents/SKILL.md

In this collection a skill is `skills/<name>/SKILL.md` plus `agents/openai.yaml`. Frontmatter is `name` and `description` only. The description is what the agent sees when it decides to pull the skill.

## Context pointers

A context pointer is a line in the agent's context that names material kept out of context, and states when to reach it. A skill description is one. A line in `AGENTS.md` that names a doc is the same object. The pointer's wording decides when the agent reaches the material. A must-have target behind a weak pointer is a variance bug. Sharpen the wording first. Inline the material only if sharpening fails.

A pointer does two jobs: say what the material is, and list the branches that should trigger it. A branch is a distinct case, so different runs take different paths. Every word of an always-loaded pointer costs on every turn.

- Front-load the word that does the triggering.
- One trigger per branch. Synonyms for the same branch are one branch written twice. Collapse them.
- Cut identity the body already carries.

## Two loads

Every document and pointer spends one of two budgets.

- **Context load** is the cost of always-loaded material: an `AGENTS.md` line, a skill description, anything in context every turn whether or not it fires.
- **Cognitive load** is the cost on the human: which documents exist, and when to reach for each. The human is the index. Do not minimise it blindly. Spend it where human judgement matters. Remove it where it does not.

Material reached only through a pointer escapes context load at the price of the pointer's line. Material with no pointer at all rides entirely on the human remembering it.

## Where a piece sits

A document is steps (ordered actions) and reference (definitions, rules, facts read on demand). They mix. The decision is how soon the agent needs each piece:

1. An in-file step is what the agent does, in order.
2. In-file reference is consulted on demand. A flat set of peers, such as every rule of a review, is fine.
3. Disclosed reference lives in another file, reached by a pointer, loaded only when the pointer fires.

Push too little down and the top bloats. Push too much and you hide what the agent actually needs. Inline what every branch needs. Put behind a pointer what only some branches reach. When a document has steps, reference that should have been disclosed buries them, and attending to them becomes a coin-flip.

Keep a concept's definition, rules, and caveats under one heading. The document should read like documentation written for the agent. A document that is simply too long, even when every line is live, thins attention. Disclose reference, and split by branch or sequence so each path carries only what it needs.

## Steps end on a check

Every step ends on a completion criterion the agent can use to tell done from not-done. A vague bound ("understanding reached") invites stopping early. Sharpen the bound first. Only if it stays fuzzy and you still see the rush, hide the later steps by splitting the sequence. Hiding works across a real context boundary, a handoff or a subagent. An inline call leaves the later steps in context and clears nothing.

Demand is how much the criterion requires. "Every modified model accounted for" forces digging that "produce a change list" does not. The strongest criteria are both checkable and exhaustive.

## Leading words, said in the positive

A leading word is a compact idea the model already knows (*lesson*, *fog of war*, *tracer bullet*). Repeated as a token, not as a sentence, it anchors a region of behavior. Prefer a word the model already has. A coined word recruits nothing. You pay definition tokens for what a known word gives free.

Use one when a phrase keeps restating the same idea. "Fast, deterministic, low-overhead" can become *tight*. A loop you trust can become *red*: it goes red on the bug, or it does not.

Say what to do, not what to avoid. A prohibition drags the forbidden behavior into context and makes it more available. "Write one-line comments" beats "do not write essays". Keep a prohibition only as a hard guardrail you cannot phrase as a target, and pair it with the positive so attention lands on what to do.

## Prune

- One meaning, one place. Duplication costs maintenance and inflates a line's rank. Repeating a leading word on purpose is not duplication. Repeating the meaning is.
- The environment is a source of truth too (`package.json` scripts, config, the directory layout, `--help`). A document that restates a one-file lookup is a cache, and it goes stale. Cache only what the agent cannot find by looking: the unwritten convention, the reason, the gotcha no config confesses.
- Drop a line that never bears on the task, or that has gone stale. Shorter documents stay relevant. Adding feels safe and removing feels risky. That is how sediment builds.
- Delete a sentence the model already obeys by default. The test is whether it changes behavior versus that default, which you settle by running the document, not by debate. When it fails, delete the whole sentence. A leading word too weak to beat the default (*be thorough* when the agent is already fairly thorough) is the same failure. Use a stronger word (*relentless*), not a longer sentence.

## Split only when the cut earns a load

- By sequence, when the steps after the current one tempt the agent to rush the one in front. Keeping them out of view drives more work on the current task. Merging sequences does the reverse.
- By invocation, when two skills fire on different requests. Give each its own description pointer rather than one skill with a hidden mode.

## Done

The draft is done when each step has a checkable completion criterion, always-loaded pointers name one trigger per branch, and a prohibition that could have been a positive instruction has been rewritten.
