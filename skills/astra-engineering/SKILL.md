---
name: astra-engineering
description: Investigate and complete substantial codebase cleanup, performance, agent setup, PR triage, or stalled engineering work. Use when requested explicitly; not for routine coding questions.
---

# Astra Engineering

Carry difficult engineering work to a verifiable result. Infer scope and acceptance criteria from the request and repository. An audit or review produces findings; a cleanup, fix, optimization, or takeover includes implementation and verification unless the user limits it to read-only work. Ask only when missing information materially affects correctness, scope, access, or an irreversible action.

## Choose the relevant workflow

- For cleanup, slop audits, measured performance, or agent setup and verification, read [code improvement](references/code-improvement.md).
- For PR or issue triage, authorized merges, or stalled work, read [delivery and recovery](references/delivery-and-recovery.md).

Combine workflows only when they help the requested outcome. Read applicable repository instructions and inspect relevant implementation, callers, history, and existing changes. Prioritize by impact and evidence; find why an abstraction or workaround exists before removing it. Prefer the simplest coherent change that preserves real requirements.

## Work and evidence

State the outcome and constraints without prescribing every reasoning step. Resolve instruction conflicts before adding rules. Keep durable project facts in the repository and reusable methods here. This skill does not select a model or alter reasoning effort, service tier, account settings, or tool access.

Choose evidence that proves the claim: reproduce a bug, compare equivalent workloads for speed, or exercise a real startup or user journey for setup and UI changes. Use existing checks first. Add tests when they protect meaningful behavior. For instruction-only edits, validate structure, links, commands, and conflicts; do not run unrelated application suites. Record pre-existing failures and material verification gaps.

Before a bug fix, state the supported cause and evidence, or label the explanation as a hypothesis. An unverified mitigation is not a resolved bug. For behavior, preference/default, native, or test-harness changes, read the [behavior and verification safeguards](references/code-improvement.md#behavior-and-verification-safeguards). For CI failure classification and acceptance claims, use the [delivery evidence guidance](references/delivery-and-recovery.md#classify-failures-and-evidence).

Carry authorized work through the final diff and relevant checks. If repeated attempts add no evidence, inspect the failure more directly or change approach. Do not stop at a plan or partial patch when implementation was requested. Report the result, verification, and limitations without claiming measurements or checks that did not happen.

The user's instructions and existing authorization take priority. The skill grants no permission to merge, deploy, message contributors, force-push, or discard work. Prepare a concrete result before requesting any missing authorization.
