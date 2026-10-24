# Substantial UI and workflow audits

Read for a requested audit spanning multiple screens, states or business steps. Apply only to the requested scope; a local UI fix, code review or verification-guide edit does not become a whole-product audit. This guide grants no permission to fix, publish, create tracker items, launch agents or change services.

## Establish the audit contract

Record the target source/build, environment, authorized actions, requested coverage, evidence destination and finish boundary. Identify existing work and services that must remain untouched. Preserve the current visual identity and business rules unless the user requests changes: name the relevant layout, palette, header, component and data-consistency constraints from the actual brief or project decisions. Missing evidence of a rule is not a new requirement.

Map the in-scope process before partitioning screens. For each step, record its entry point, input, actor capabilities, required information, action, output and next-state condition. Include important correction, cancellation and recovery paths. Separate source-derived expectations from paths actually walked. Keep a small audit small; do not invent extra roles, viewports or branches to fill a template.

The contract is ready when each requested outcome maps to a surface or process step and has an observable acceptance check.

## Track coverage and evidence

Use one coverage row per required check, with stable IDs:

```text
Check ID | process step/surface | state + fixture | viewport/theme/role when relevant |
check type | source/build | status | result | evidence | inspected by
```

Statuses distinguish **pending**, **inspected** (a person/agent actually examined the rendered evidence), **exercised** (the action and resulting behavior were checked), **blocked** (with the missing prerequisite), and **outside scope** (with its scope basis). Record separate rows when both visual inspection and interaction are required. Keep pass/fail/unresolved in the result field: a reproduced defect can be a completed check. Source inspection is useful supporting evidence, but does not complete a requested visual or interaction check.

A captured screenshot, automated overflow result or completed worker is not proof of visual inspection. A screenshot of a button is not proof that its action works. Inspect the actual assigned evidence before accepting worker coverage; correct gaps in the affected slice. If every requested combination is required, representative samples remain gaps unless the user changes that requirement. A missing fixture or unreachable state is blocked, not silently outside scope.

If showing completion numbers, state the denominator, check types and exclusions. Separate coverage from pass rate; never count blocked checks as passes. Link the uncovered rows and preserve evidence after temporary environments are removed.

## Record and challenge findings

Give each finding an ID, affected task/surface/state, reproducible steps, expected versus actual behavior, the requirement or rationale, source/build identity and evidence. A suspected cause stays a hypothesis until demonstrated. Explain severity through user impact; effort estimates remain estimates.

Keep three outputs distinct:

- **Defect:** observed behavior conflicts with an applicable requirement or necessary task outcome.
- **Improvement:** an opportunity with a proposed benefit; not proof that current behavior is wrong.
- **Owner decision:** a material unresolved choice. Give options, a recommendation and what depends on it.

For severe/high findings, obtain an independent challenge when delegation is available and authorized: check the cited rule and reproduce the important failure on isolated resources, or label the conclusion source-only/unverified. If independence cannot run, report that limit instead of claiming verification. Give the challenger the original claim and evidence, without prescribing its verdict. A second opinion is evidence to inspect; resolve a concrete disagreement against the source or real path rather than accepting a vote.

Retain original IDs, claim and severity alongside the final verdict: confirmed, adjusted, rejected or unresolved, with reasons and evidence. Consolidate genuine duplicates under one canonical ID while preserving their origins. Keep distinct failures and conflicting verdicts visible. This product-audit consolidation does not replace or blend a code review's separate Standards and Spec axes.

## Make the result decision-ready

Present the important defects, coverage limits, improvements and owner decisions separately. Trace proposals back to findings or process gaps. When mockups are requested, preserve the named design constraints and use stable option IDs; show what each option changes and the recommended option. A mockup is a proposal, not implemented behavior.

Propose a build order with dependencies only when useful to the request. Keep proposed backlog items separate from approved work. Finish at the authorized report or decision boundary; selection, ticket creation and implementation each follow the user's actual instruction.

## Coordinate and recover proportionately

For delegated audits, use bounded slices, explicit resource ownership, isolated mutable state and a canonical registry of task IDs, source identities, attempts, output paths, coverage and acceptance. Choose concurrency and effort for the work; extra agents, maximum effort and persistent monitors are not defaults.

When a worker appears stalled, inspect actual task state and recent artifacts before retrying. Confirm its current output location and whether the old writer has stopped. Preserve usable results, bound retries, and follow the runtime's authorized model-replacement policy. Rate limits are blockers to handle, not reasons for an unbounded restart loop.

Use a recurring monitor only when explicitly requested or already authorized for the run. Give it the same registry and a stopping state; suspend restarts before cleanup. A stale heartbeat or old output path alone does not authorize duplicate work. End by stopping task-owned agents, schedules and temporary resources, retaining proof and checking that protected services and user work remain intact. Report incomplete checks and remaining resources plainly.
