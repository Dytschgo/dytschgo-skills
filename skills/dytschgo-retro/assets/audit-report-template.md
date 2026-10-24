# Decision-focused audit report template

Adapt this outline into the self-contained HTML report using the skill's presentation guidance. Omit empty sections; use only supported content. This is a content template, not a requirement to create a server or publish a website. A compact report should remain compact.

## At a glance

- Target, source/build, observation date and requested scope.
- Important user impact and recommended next action, visible without clicking.
- Coverage and limits: distinguish inspected visuals, exercised actions, source-only observations and blocked checks. Any totals name their denominator and exclusions; coverage is separate from pass rate.

## Process and coverage

Show the relevant process steps, their inputs/actions/outputs/transitions and links to actual check rows. Mark source-derived expectations separately from walked behavior. Provide filters only when they help find real information, such as area, state or result. Keep gaps visible when a filter is applied and show an explicit empty result.

## Findings

For each canonical finding:

```text
Finding ID and title / originating IDs:
Task, surface, state and source/build:
Observed problem / expected behavior and its basis:
Steps / evidence links / evidence type:
Impact / severity with reason:
Original claim and severity:
Challenge verdict, reason, evidence and independence limits:
Final disposition / uncertainty:
Suggested correction / estimated effort when supported:
```

Keep rejected or adjusted claims available in a disclosure so the audit's reasoning remains inspectable. Do not count rejected claims as open defects or unresolved claims as confirmed. Preserve separate Standards and Spec sections if the supplied material includes a code review.

## Improvement options

For each useful improvement, show the originating finding or process gap, expected benefit, constraints that stay fixed, stable option IDs, tradeoffs and recommended option with a reason. Link supplied mockups; do not invent completed designs. Distinguish a proposed benefit from measured results. Existing visual identity and accepted business rules remain constraints unless the user authorized a change.

## Decision queue

```text
Decision ID | question | options | recommended option + why |
affected finding/proposal IDs | what waits for this answer | current decision
```

Keep accepted, unanswered and superseded choices distinct. A selector may explore an option locally; label it as report state, not approval or implementation. Report controls do not publish, create tickets or apply changes.

## Proposed next steps and evidence

When useful, group proposed work into a small dependency order. Link each item to its findings and decisions, with an observable acceptance check. Clearly distinguish proposals from authorized work and already shipped results.

Retain source/evidence links, blocked coverage rows, methods and meaningful verification limits. An agent/model/runtime table is optional and uses actual records; costs or tokens are marked estimated unless measured. Verify links and the meaningful report controls at desktop and narrow widths before delivery. If a check cannot run, state that limit rather than implying it passed.
