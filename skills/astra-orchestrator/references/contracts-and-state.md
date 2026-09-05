# Contracts and shared state

Read when planning nontrivial delegated work or preparing a worker assignment. Keep records proportional: concise fields are enough, and inapplicable fields can be omitted except ownership, authorization, acceptance, and evidence requirements.

## Canonical working record

```text
Task ID / record revision / updated at:
Request and intended outcome:
Current environment and repository/component:
Canonical record location:
Requirements and acceptance criteria (stable IDs):
Constraints and approved scope:
Authorized actions (source, target, conditions):
Risk classification and impact:
Rollback/recovery approach when applicable:
Phase:
Plan / packages / dependencies / integration order:
Task and thread table:
  ID | parent | objective | model | directory/branch | owned files/systems |
  lifecycle state | blocker/dependency | attempts | evidence | next action
Decision register:
Assumption register:
Progress and open issues:
Validation (criterion -> evidence -> revision -> result):
PRs / CI / deployment status, if applicable:
Pending user decisions or approvals:
Next checkpoint:
Astra acceptance and remaining actions:
```

Do not confuse runtime agent status with task status. A worker may be idle/completed in the runtime while its result is still Reviewing in the task record.

## State machine

Track one overall phase and one lifecycle state per task/thread. The two vocabularies serve different purposes; they are not competing state fields.

```text
INTAKE -> CONTEXT -> PLAN -> READY -> DELEGATED -> RUNNING -> REVIEWING
REVIEWING -- accepted for validation --> VALIDATING
REVIEWING -- correction needed -------> DELEGATED
REVIEWING -- missing context ---------> CONTEXT
REVIEWING -- structural change -------> PLAN
REVIEWING -- required user decision --> BLOCKED
VALIDATING -- passed, Astra accepts --> COMPLETED
VALIDATING -- failed -----------------> REVIEWING
BLOCKED -- resolved ------------------> appropriate earlier phase
```

Lifecycle states: Pending, Gathering context, Planning, Ready, Running, Waiting, Reviewing, Blocked, Failed, Validating, Completed, Cancelled. Record the reason and next action for Waiting, Blocked, and Failed. Waiting means a dependency is progressing; Blocked means a missing decision/resource prevents progress. Cancelled is not Completed. A reported worker success transitions to Reviewing, not overall Completed.

For phase mapping, INTAKE corresponds to Pending; CONTEXT to Gathering context; PLAN to Planning; READY and DELEGATED to Ready until execution starts; RUNNING to Running; REVIEWING to Reviewing; VALIDATING to Validating; BLOCKED to Blocked; COMPLETED to Completed. Pauses and terminal failures use the lifecycle reason rather than inventing progress.

These are local workflow states. Runtime tools such as persistent goal status have their own constraints; follow their schemas and do not mechanically copy local states into them.

## Assignment contract

```text
Thread ID / parent task ID / record revision:
Role / assigned model / reasoning effort:
Risk level / execution mode:
Objective:
Relevant context and instruction paths:
Current project state / base commit:
Requirements and acceptance criteria:
Decisions already made:
Known assumptions:
Scope / owned files or systems:
Out of scope:
Repository / absolute working directory / branch / base branch:
Constraints / dependencies / integration order:
Authorized actions and evidence of authorization:
Required validation and expected evidence:
Expected output / result contract:
Known risks and rollback if relevant:
Maximum correction attempts (normally 3 per issue):
Time, token, or cost budget / checkpoint:
Permission to create Luna child thread: yes | no
Escalation conditions:
Actions that must not be taken:
```

Default prohibited actions include scope expansion, unauthorized external writes, secret exposure, default/protected-branch pushes, merging any PR, destructive operations outside authorization, and spawning children without permission. A worker may propose a decision but cannot silently override an approved one.

## Result contract

```text
Thread ID / parent task ID / record revision used:
Status: completed | ready for review | blocked | failed | needs clarification
Execution mode used / actual model if known:
Summary and findings:
Changes made / files changed:
Commands executed (directory, relevant command, exit status):
Commits created / branch / base and head SHA:
Validation performed and results:
Evidence (paths, symbols, logs, test output, URLs, revisions):
Claims marked implemented | inspected | tested | inferred | not verified:
Assumptions / decisions proposed:
Unresolved issues / known risks:
Recommended next action:
```

`completed` here describes only the bounded worker assignment; implementation destined for PR review returns `ready for review`. Do not claim the user's overall task is complete. Redact sensitive output and preserve enough non-sensitive evidence to assess the result. Summaries must identify failed, skipped, and unavailable checks explicitly.

## Decision register

```text
Decision ID:
Decision and reason:
Source or owner:
Task stage / affected work:
Status: proposed | approved | superseded
May agents change it: yes | no
```

## Assumption register

```text
Assumption ID:
Assumption and reason:
Potential impact / dependent work:
Validation method:
Status: active | confirmed | disproved
```

When an assumption is disproved, trace and revisit dependent work. Do not quietly rewrite history; mark decisions superseded and point to replacements.

## Out-of-scope proposal

```text
Proposed follow-up:
Reason / expected benefit:
Estimated impact / risk:
Required decision:
```

## Review finding and correction

```text
Finding ID / severity:
Affected requirement and file/symbol or behavior:
Evidence / reproduction:
Expected behavior or correction:
Required validation:
Owner / attempt count / disposition:
```

Require actionable findings; distinguish demonstrable defects, missing evidence, and optional suggestions. Do not treat reviewer consensus as proof or make style preferences into blockers without a requirement.
