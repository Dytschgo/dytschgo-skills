# GitHub ownership, review, and acceptance

Read before branch/commit/push/PR work, independent review, or high-risk execution. Apply only the parts relevant to the deliverable; local tasks need not acquire a GitHub workflow.

## Before implementation

Confirm repository identity and remote, branch/base branch, base commit, status, existing worktrees, applicable instructions, contribution conventions, and unrelated changes. Use supported connectors or an available CLI. Discover the real default/base branch rather than assuming `main`.

Create a dedicated branch in an isolated worktree for parallel writers, or serialize writes. Follow repository naming; otherwise use `feature/<task-id>-<description>`, `fix/...`, `refactor/...`, `docs/...`, or `chore/...`. Never switch the shared checkout beneath other work.

Assignment authorization must distinguish local edits, branch creation, commits, push, PR creation, merge, and deployment. An autonomous worker can own the first six when within the user's authorized scope. Repository write access is only a technical prerequisite, not sufficient authorization. Do not send messages, post comments, or create public/external artifacts beyond session authorization.

## Before pushing and opening a PR

Inspect the intended diff against the recorded base, changed files, generated files, dependency/lockfile changes, staged content, and acceptance criteria. Preserve unrelated changes outside the patch. Run relevant tests/build/type/lint/manual checks and project-required checks; record failures and skipped checks. Inspect for secrets without printing credential values. Never claim a secret scan ran unless it did.

Stage explicit intended paths, review the staged diff, create clear commits, and push only the dedicated branch. Verify actual branch/head and remote result. Inspect for an existing task PR before retrying creation after an uncertain tool response. Return real commit IDs and PR URLs, never guessed links or status.

Workers must not merge any PR, push directly to default/protected branches, alter protection or permissions, bypass checks, disable policies, force-push without specific authorization, rewrite shared history, or delete branches from other work. Follow-up implementation requires Astra's scope decision.

## PR content and handover

Lead with the concrete problem and resulting behavior. Keep simple PRs short; scale detail to actual risk and repository templates. Include applicable information from this list, without boilerplate sections for empty items:

- Specific title; task ID where one exists; what changed and why.
- Implementation approach and affected components/files.
- Intentional exclusions that clarify material scope boundaries.
- Tests, build, lint, type checks, and manual validation, including failures and unavailable checks.
- Material decisions, assumptions, limitations, unresolved issues, and review focus.
- Risks and rollback/recovery for medium/high risk; meaningful follow-up work.

Prefer structured tool arguments for descriptions. With `gh`, write multiline text to a temporary file and use `--body-file`; preserve real newlines and literal text.

```text
Thread ID / task ID:
Status: ready for Astra review
Repository / working directory:
Branch / base branch / base SHA / head SHA:
PR title / URL / number:
Summary / changed files / commits:
Tests executed / validation results / evidence:
CI status and checked revision:
Assumptions / known risks / unresolved issues:
Recommended review focus:
```

Explicitly say the PR is ready for Astra review. CI pending is not passing; record required, optional, skipped, and failed checks distinctly. A PR being open is not proof it is mergeable or approved.

## Independent review

Every implementer self-reviews. Use a fresh Sol (`gpt-6-sol`) thread for standard medium-risk multi-file review when practical and for complex/high-impact review. High-risk independent review is required. A Sol implementer's own review does not replace a separate reviewer thread. Luna (`gpt-6-luna`) can validate simple checklists but does not replace high-impact technical review.

Fresh means independent of the implementer's thread; it does not require repeating a completed qualifying review at every stage. Astra may reuse an existing independent thread's review evidence when it identifies the reviewer/thread, independence, scope and acceptance criteria, exact base/head revisions, findings and their disposition, and covers the current action's risks. Inspect the evidence itself. A deployment also needs its operational plan/configuration reviewed; a code-only review does not automatically cover deployment. Changed revisions, scope, environment, or unresolved findings require review of the affected work. If qualifying evidence already exists, the reviewer being offline is not itself a blocker. Human approval and automated CI can supplement this evidence but do not by themselves establish the independent agent-thread review required by this skill.

Provide the original request, scope, acceptance criteria, approved decisions, diff, stable base/head revisions, changed files, raw validation evidence, and assumptions. Avoid automatically giving the implementer's reasoning/conclusions, so the reviewer can form an independent assessment. Do provide context necessary to evaluate intended behavior.

Default reviewer authority is read-only, with safe validation allowed in an isolated workspace. Ask for actionable defects, requirement gaps, edge cases, failure modes, and unsupported claims; require file/symbol or behavior evidence and reproduction when feasible. A reviewer proposing a fix must not silently edit the implementation. If the reviewer becomes an implementer, subsequent assessment must preserve independent review for the revised high-risk work.

Review evidence at the final revision. A changed head, base, configuration, or relevant generated artifact can invalidate earlier findings/checks. Re-review affected areas and run integrated checks after combining branches. Test output from another revision is historical evidence, not final validation.

For preference/default/schema changes, review new profiles, older profiles missing fields, explicitly saved values, and failure/recovery behavior. For native, persistence, recovery, or smoke synchronization changes, use a reviewer suited to the platform/state complexity and honor repository-specific consequential-change gates. Route by observed risk and failed assumptions, not model price or diff size alone.

Ask reviewers to inspect changed or removed assertions for lost behavioral coverage. Setup that writes a value cannot prove navigation preserved it; an optional DOM check cannot prove an expected recovery occurred. Require state-based synchronization and inspect the original failure evidence before accepting a test-harness fix. A hypothesized cause or mitigation must remain labeled as such until supported.

## Astra final review and correction loop

Astra inspects the request, acceptance criteria, approved scope, assignment, actual diff/files, commits, tests, CI, assumptions, risks, PR description, unrelated changes, repository conventions, and safety. Do not accept a packet without checking underlying work.

For stacked work, track actual parent/head ancestry and refresh dependent branches after relevant parent updates, including visual baselines and generated artifacts. Verify the integrated revision and affected postconditions; a merge-order note alone is insufficient. Split independently deliverable outcomes while keeping coupled implementation and tests together.

Match evidence claims to their exact revision, platform, run/step, and artifact. Distinguish personally executed checks from inspected historical/independent evidence, and step success from overall job success. Inspect whether captures actually show the claimed content type and state, and whether manifest keys match filenames. Compare CI history before calling a failure pre-existing or intermittent; retain uncertainty when the evidence does not establish origin or cause. Reconcile reviewer disagreements against source or reproduction rather than adopting the most confident verdict.

Choose: Accept, Request changes, Request independent review, Reassign, Replan, or Block. For corrections, identify exact issues, evidence, expected behavior, and required validation. Resume the original worker, update the same branch/PR, rerun affected checks, and inspect revised evidence. Create a new PR only when the old branch is unusable, the approach changes substantially, separation is needed for safety, or Astra requests it.

After three failed correction attempts for the same issue, stop repeating the prompt. Improve context, change approach, replan, reassign, or report the actual blocker. Preserve partial work and distinguish a failed attempt from a failed overall task.

## High-risk actions and approval

Explicit user authorization is required for production deployments, production data deletion, database drops, irreversible migrations, infrastructure removal, permission changes, credential rotation, backup removal, rewriting shared Git history, protected-branch merges, or disabling tests/security policies. Never disable controls merely to force success. Honor authorization already given for the specific action; the skill does not demand duplicate confirmation.

Before requesting any missing approval, produce the concrete authorized preparation: reviewed diff or action plan, exact target/environment, impact and failure analysis, available validation, recovery/rollback, and alternatives if meaningful. If rollback is impossible, say so and define recovery/containment. Do not perform the gated mutation while awaiting a reply. Elapsed time is not approval.

Only Astra executes or coordinates final merge/deployment after required authorization and checks. Workers never merge their own or other PRs. Serialize destructive/production operations and migrations. Recheck the target revision, required CI, review status, and authorization immediately before action. Afterwards verify the actual merge/deployment state and appropriate health checks. Do not equate an accepted tool request with successful production operation.

## Final validation and delivery

Use the relevant tests, build, type/lint checks, security/dependency checks, manual validation, final diff, status, commits, CI, configuration, PR state, and rollback guidance to verify the requested outcome. Full available validation means relevant supported/project-required checks, not indiscriminate commands or inventing tests for trivial edits.

State what was implemented, inspected, tested, inferred, and not verified. For missing validation explain why, the material risk, and how to validate later. An unresolved critical issue or an unverified critical acceptance criterion blocks acceptance.

Deliver a concise coordinated result: outcome, component/repository, PR if applicable, material decisions/assumptions, validation, limitations, and remaining actions. If the user's outcome includes an authorized merge or deployment, continue through it; if it ends at a reviewed PR or local artifact, do not expand scope. Astra records final acceptance only after the actual requested outcome is delivered.
