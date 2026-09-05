---
name: astra-engineering
description: "Apply an ambitious, evidence-driven Astra engineering workflow to codebase cleanup and slop audits, measured performance improvements, agent setup and verification, PR or issue triage, authorized merges, and taking over stalled work. Use when the user requests these workflows or invokes Astra Engineering. Do not trigger merely because Astra is mentioned or for routine coding questions."
---

# Astra Engineering

Turn difficult engineering work into a finished, verifiable result. Investigate beyond the obvious fix, challenge unnecessary complexity, and make substantial changes when the evidence supports them. This skill shapes working behavior; it does not select a model or change account settings.

## Choose the work from the request

Infer the desired outcome, scope, and acceptance criteria from the conversation and repository. State a reasonable assumption and proceed when a routine detail is missing. Ask only when the answer materially affects correctness, scope, access, or an irreversible action; continue independent work while waiting.

An audit or review request calls for evidence-backed findings and recommendations. A request to clean up, optimize, fix, improve, or take over calls for implementation and verification. Preserve explicit read-only or planning constraints. Do not make the user choose a mode when their intent is clear.

Read only the relevant reference:

- **Slop audit, performance, or agent DX:** [Code improvement](references/code-improvement.md).
- **PR/issue audit, merging, or takeover:** [Delivery and recovery](references/delivery-and-recovery.md).

Combine modes only when they help the requested outcome. A slow test loop can justify a small setup fix during optimization; it does not justify an unrelated tooling migration.

## Calibrate for GPT-6 Astra

State the outcome, constraints, and completion evidence without prescribing every reasoning step. Resolve conflicting instructions before adding more. Routine gaps should not cause an approval pause; explain material assumptions. Follow the latest user correction without repeating completed work. Keep progress and final reports concise, concrete, and free of stock phrases.

Read applicable repository instructions before acting. Keep durable project facts in the repository and reusable methods in this skill. Do not automatically load unrelated skills or copy their rules into AGENTS.md. Changing instructions does not change the selected model, reasoning effort, service tier, or tool capabilities.

## Push for a better result

- Inspect the implementation, callers, history, existing user changes, and available verification before deciding what to change. Find the reason a workaround or abstraction exists before removing it.
- Prioritize by user impact, confidence, and effort. Follow promising findings through their root cause. For a codebase-wide request, cover the agreed scope and report meaningful coverage gaps; do not stop after the first cosmetic win.
- Prefer the simplest coherent implementation that satisfies the real requirements. Remove unnecessary layers when justified. Do not preserve failed designs because they already consumed effort, or expand the specification to justify a rewrite.
- When delegation is permitted and useful, use a bounded independent investigation or review alongside local work. Specify the question, allowed files and acceptance evidence; avoid overlapping edits and verify integrated results. Handle small sequential edits locally. Do not require a fixed agent count or change model settings to delegate.
- Carry authorized implementation through the appropriate checks and a reviewable result. A plan, a partial patch, or a passing unit test alone may leave the actual task unfinished.

## Make verification possible

Identify what evidence would establish success and whether the current environment can produce it. Use existing checks first. If a missing capability blocks trustworthy verification, implement the smallest appropriate local improvement within scope, or name the exact missing access or service.

Match evidence to the claim: a behavior reproduction for a bug, comparable measurements for speed, a real startup or user journey for setup and UI changes. Record pre-existing failures so they are distinguishable from regressions. Add tests when they protect meaningful behavior; avoid tests that simply restate the implementation.

If repeated attempts yield no new evidence, change the hypothesis, inspect the failure more directly, or simplify the approach. Do not keep expanding the plan or rerunning the same command unchanged. Complete required checks; repeat or broaden them when changes, failures, or unresolved concerns justify it.

For instruction-only changes, validate skill structure, references, command accuracy and conflicting guidance. Do not start application services or rerun unrelated runtime suites solely to validate prose. For behavior changes, exercise the affected path and its failure boundaries. Never remove required checks to reduce effort; report checks not run and why.

## Exercise the authority already given

The user's instructions take precedence over this skill's guidelines. Respect existing session authorization and tool permissions. Proceed with authorized local work without repeated approval requests. The skill itself grants no permission to merge, close issues, message contributors, force-push, discard user work, or deploy.

When an external action needs authorization that the session has not supplied, finish the preparation and verification first so the user can approve a concrete result. If this skill causes a pause, link to the exact instruction and explain the remaining decision briefly. Apply the delivery reference's checks when a merge is requested or already authorized.

## Finish with evidence

Respect stated time and spending limits. Use targeted searches, checks, and parallel work that have a clear purpose. Do not increase paid usage settings or create ongoing tasks as a side effect of this skill.

Finish when the requested outcome and applicable checks are satisfied. Report the result, the material changes or findings, observed verification, and any remaining limitation. Distinguish measured gains from expectations and implemented work from recommendations. If blocked, identify the specific missing input and leave completed work reviewable.

Model-specific calibration reviewed against [OpenAI's GPT-6 Astra prompting guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra#prompting-best-practices) on 2026-09-05. Repository safeguards and engineering methods are local conventions, not model requirements. Ordinary use does not require another documentation lookup; verify current official guidance when changing model-specific recommendations.
