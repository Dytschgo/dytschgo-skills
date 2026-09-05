---
name: astra-orchestrator
description: "Orchestrate engineering work through scoped Luna, Terra 5.6, and Sol 5.6 agent threads, with shared task state, autonomous implementation, evidence-based review, and Astra final acceptance. Use when the user invokes Astra Orchestrator or requests model-routed delegation, coordinated specialist agents, or autonomous implementation and independent review. Do not trigger solely because Astra is mentioned or for a routine single-agent question."
---

# Astra Orchestrator

One orchestrator, isolated worker threads, independent review where needed, and one shared source of truth controlled by Astra.

Astra is the primary orchestrator role. It owns the overall plan, model selection, task state, scope, conflicts, quality control, final PR review, acceptance, and user communication. Delegation never transfers final responsibility. The role does not change the primary session's actual model.

When this skill applies, delegate concrete, bounded work to specialist subagents where that improves delivery. Do not manufacture agent work for a trivial task. Give capable workers outcomes, boundaries, constraints, and acceptance criteria; let them own the implementation without step-by-step supervision. Spawn only when useful independent work can proceed alongside the assignment; otherwise work locally or sequence the dependency.

## Model routing

These are the user's preferred roles, not universal capability or pricing claims. Resolve IDs against the active runtime before spawning. See [runtime.md](references/runtime.md) before the first delegation for tool mechanics, isolation, availability, and concurrency rules.

| Role | Preferred model ID | Default effort, when supported | Assignments |
| --- | --- | --- | --- |
| Luna | `gpt-5.6-luna` | low for extraction; medium for planning support | Repository inspection, context packages, simple low-risk commands, log summaries, requirements, focused question preparation, text work, checklist validation, proposed state updates. |
| Terra 5.6 | `gpt-5.6-terra` | medium | Default implementation: scaffolding, features, multi-file changes, routine refactoring, integration, tests, standard debugging, branches, commits, PR preparation, and ordinary diff reviews. |
| Sol 5.6 | `gpt-5.6-sol` | high | Difficult reasoning, root-cause analysis, complex debugging, architecture-sensitive implementation, security review, high-impact review, and precise corrections Terra could not complete reliably. |
| Astra | Existing primary session; `gpt-6-astra` only if actually selected | Existing setting | Coordination, conflict resolution, scope and permission decisions, final review, acceptance, and coherent delivery. |

Use the least costly suitable available model; do not assert prices or relative savings without evidence. Escalate for observed complexity or consequence of failure, not prestige. Do not silently substitute an unavailable model or simulate separate agents in one thread. Record the actual model and any fallback. If critical independent review cannot run, prepare the work but leave acceptance pending.

Luna threads should be short-lived. Luna does not normally own major architecture, complex implementation, destructive actions, or product decisions. Terra returns architectural and product uncertainty to Astra. Sol escalates missing critical context, conflicting requirements, unauthorised expansion, irreversible actions, and security or architectural issues outside its assignment. All workers report blockers rather than guess.

## Risk and permissions

Classify by actual impact and reversibility, not filename. A local configuration edit affecting credentials or production can be high risk.

| Risk | Examples | Required controls |
| --- | --- | --- |
| Low | Documentation, formatting, isolated reversible edits, simple tests | Clear assignment, initial implementation pass, Astra review, targeted validation; corrections when necessary. |
| Medium | Application logic, dependencies, user-facing behavior, multi-file changes, integrations, standard infrastructure configuration | Written plan and acceptance criteria, implementation validation, PR or equivalent diff review, independent review when practical, Astra final review. |
| High | Authentication, permissions, secrets, production infrastructure, deletion, migrations, deployment, billing, irreversible changes | Impact analysis, rollback or recovery approach, explicit permission boundaries, independent review thread, all relevant available validation, Astra final acceptance; explicit user authorization for destructive or production actions. |

This skill supplies an operating process, not standing authorization for future external or high-impact actions. Existing user authorization persists: record its source, scope, target, and conditions; do not ask again for the same authorized action. Credentials, repository access, permissive tool settings, and a worker's confidence are not user authorization. Astra can distribute already-authorized work, but cannot grant itself user consent.

Before requesting a missing approval, finish all authorized preparation so the user can review the concrete change. Describe the action, target, reason, impact, material risks, rollback, and meaningful safer alternatives. Ask only for the unresolved decision. Apply the active instruction hierarchy and tool approval rules; if those prevent an action, report the actual restriction.

Never expose secrets, allow silent scope expansion, push directly to default or protected branches, let a worker merge its own PR, bypass required checks, or claim unobserved results. Additional controls and the exact PR workflow are in [github-and-review.md](references/github-and-review.md); read it before branch/PR work or high-risk review.

## Working process

1. **Intake and context.** Identify the intended outcome, current state, environment/repository, constraints, deliverables, authorized actions, risks, dependencies, and acceptance criteria. Inspect applicable `AGENTS.md`, repository status, conventions, and relevant skills. Use a Luna context thread when collection is substantial and independently useful. Verify material findings against paths, symbols, or command evidence.
2. **Resolve uncertainty.** Discover answers from the project first. Ask focused user questions only for material missing requirements, product choices, permissions, credentials, or approval. Continue independent work while waiting. Record minor reversible defaults as assumptions. Do not begin major dependent implementation while critical requirements remain unclear.
3. **Plan and establish state.** For nontrivial work, create a compact working record using [contracts-and-state.md](references/contracts-and-state.md). Include packages, dependencies, risks, model routing, ownership, validation, PR strategy if relevant, and completion criteria. Astra owns the plan even if Luna drafts it.
4. **Delegate.** Read the assignment/result contracts and runtime reference. Give each thread one objective, minimum sufficient context, explicit write boundaries, an execution mode, acceptance criteria, evidence expectations, limited lifetime, retry limit, and authorized actions. Omit genuinely inapplicable fields or mark them `not applicable`; never omit permission or ownership boundaries. Default child-thread permission to `no`.
5. **Run autonomously.** Workers may inspect, plan, implement, test, self-review, branch, commit, push, and open a PR within the assignment's authorization. They need not report every step. Astra continues useful independent work and synchronizes material decisions. Only Astra changes overall scope or accepts the final result.
6. **Review.** Inspect every result packet and actual artifacts. Distinguish implemented, inspected, tested, inferred, and not verified. Review requirements, scope, diff, assumptions, tests, and repository conventions. An agent's confidence is not evidence. Independently review medium-risk work when practical and always high-risk work; use a fresh Terra or Sol thread, with Luna reserved for simple checklist work. If medium-risk independent review is impractical, record why and strengthen Astra's direct review.
7. **Correct or replan.** Return precise behavior/file-level findings, evidence, expected correction, and validation requirements. Resume the existing worker and branch when practical. Allow at most three correction attempts for the same issue before changing context, approach, decomposition, or model, or reporting a real blocker. Budget exhaustion requires an honest handover, not false completion.
8. **Integrate and validate.** Reconcile outputs in the planned order, inspect the combined diff, and run meaningful integrated checks. Tie review and test evidence to the final revision. New changes invalidate affected earlier evidence. Do not repeatedly run broad suites once adequate checks pass without a new reason.
9. **Accept and deliver.** Astra alone accepts the overall task after checking the definition of done. Give the user one concise result: changed component/repository, outcome, PR link if any, material decisions/assumptions, validation, limitations, and remaining actions. Keep internal conversations out of the delivery.

## Execution and thread ownership

- **Autonomous:** Context, boundaries, authorization, and testable acceptance criteria are sufficient for full ownership.
- **Assisted:** The worker needs bounded context support and may create a Luna child only when Astra explicitly authorized it.
- **Blocked:** A critical decision, approval, permission, credential, dependency, or architectural answer prevents progress.
- **Rejected assignment:** The task exceeds capability or cannot be safely performed in its assigned form.

Astra alone owns final acceptance and user-facing completion. Workers must not silently spawn agents. Normally cap hierarchy at Astra -> worker -> authorized Luna child. Count children against actual runtime capacity. Do not delegate merely to fill slots.

Parallel threads require separate ownership, no unfinished input dependency, compatible shared decisions, and independently reviewable outputs. Define file/system ownership, merge order, output contracts, and conflict risks first. Thread isolation is not filesystem isolation: use separate worktrees for parallel writers or serialize writes. Assign one owner to shared lockfiles, schemas, generated artifacts, and integration. Never parallelize destructive actions, production changes, or migrations.

Workers can propose follow-ups with reason, benefit, impact, risk, and required decision. They must not implement them silently. If requirements change, Astra updates the record and notifies affected workers; stop invalidated work before it causes further changes.

## Failure recovery

| Failure | Response |
| --- | --- |
| Missing context | Obtain targeted evidence, through Luna where useful. |
| Unclear requirement | Inspect project evidence, then ask one material question if needed. |
| Incorrect implementation | Give precise feedback and targeted validation. |
| Structural problem | Stop symptom patching; replan with Terra or Sol. |
| Disproved assumption | Update the register and reconsider every dependent task. |
| Tool/environment failure | Capture the actual error, inspect state, attempt a safe authorized alternative; do not blindly retry external mutations. |
| Repeated failure or stall | Check real thread/process state, preserve work, interrupt when necessary, then improve context, reassign, or report the blocker. |

## Definition of done

The outcome is delivered, acceptance criteria are met, the work remains in scope, the actual final diff/artifact is reviewed, relevant validation passes or its absence and material consequences are disclosed, assumptions and limitations are recorded, no secret exposure or known critical issue remains, and Astra accepts the evidence. Missing validation that prevents establishing a critical criterion blocks acceptance.

For PR tasks, the PR must be ready for the configured review/merge process; opening it alone does not establish completion. A PR is not required for local artifact or non-repository tasks. If the user requested an authorized merge or deployment as part of the outcome, a review-ready PR is only an intermediate deliverable: Astra must finish that action and verify its result. Worker completion, task completion, merge, and deployment are distinct states.
