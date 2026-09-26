---
name: astra-verification
description: Create or maintain a repository-specific way to launch an app, exercise its real user paths, and preserve evidence. Use when a project lacks reliable behavior verification or its local verification guide may have drifted.
---

# Astra Verification

Create a repeatable path for an agent to prove the behavior of a real project, then keep that path accurate as the project changes. Work from repository evidence and existing tools. Keep the user's requested scope and existing authorization in force.

## Choose the task

- **Create** when no useful project-local verification guide exists. Identify the main user-facing surface, how it runs, how an agent can drive it, and what evidence demonstrates success.
- **Maintain** when a project-local verification guide or feature map already exists. Check its claims against current source and live behavior, and correct only proven drift.

If the target is ambiguous, inspect repository conventions and existing agent instructions first. Ask only when multiple viable targets remain or an external decision is required.

## Discover the project

Read the relevant repository instructions, README, run scripts, feature routes or commands, test harnesses, and recent changes. Answer from evidence:

- What user-visible surfaces does this project expose?
- What exact command starts or builds the target? How is readiness recognized, and how is it stopped?
- What existing harness drives real user paths? Prefer it over introducing another dependency.
- What observable evidence can be captured: screen state, output, exit code, response, persisted data, logs, or generated files?
- Can parallel instances be isolated by port, profile, account, or data directory?

Do not ask the user to supply facts discoverable in the repository. If the app does not build or start, report the concrete failure before writing instructions that assume it works.

## Create a project-local guide

Follow the repository's established agent-skill location and format. If none exists, use `.agents/skills/verify-<app>/` for a compatible skills layout and explain the choice. Avoid adding a large generic framework. Write instructions for an agent arriving cold, with commands and selectors grounded in this checkout.

Include:

1. **Launch and readiness:** exact commands, prerequisites, ports or environment, readiness signal, and teardown.
2. **Health check:** a read-only check for the expected process or service, build/version, endpoint, and required local auth state.
3. **Drive:** real routes, selectors, commands, or API calls through a user-facing path. Reuse stable accessible names, test IDs, prompt text, and documented command interfaces.
4. **Proof:** what action to perform, the resulting state to inspect, relevant side effects to verify, and where evidence is saved.
5. **Cleanup:** stop only instances and resources this run created. Preserve proof artifacts after teardown.
6. **Feature map:** an index plus one short file per important user-facing feature. Start with the highest-value 3–5 features. For each, state its entry point, user path, observable end state, and known prerequisites or gotchas.

Use local test accounts, fixtures, dry-run modes, or isolated services when available. A dry-run label is not proof that nothing external happens; inspect behavior where it matters. Do not send real messages, charge real payments, modify production data, or otherwise create external effects just to validate the guide.

## Maintain an existing guide

Read its index and every feature file. Compare claimed routes, commands, selectors, prerequisites, outcomes, and helper scripts against current source and recent changes. Then use the documented harness to exercise each mapped feature when the environment and authorization allow it.

Keep source claims distinct from live claims. Confirm likely drift before editing. Repair guide or harness errors within the guide's own scope. If the described product behavior is broken, report the product issue instead of changing the guide to hide it. Add newly discovered features only when a concrete user-facing source path exists.

Run sessions serially unless state is demonstrably isolated. Health-check before driving and after surprising failures. Clean up failed attempts as well as successful ones. Confirm that captured evidence survives cleanup at the documented location.

## Complete the work

For creation, execute the generated instructions end to end for one mapped feature when feasible. For maintenance, report which features received source review and live exercise. Fix what fails and repeat the affected proof. If verification cannot run, name the exact missing prerequisite and leave the unproven claim explicit.

Summarize the guide created or corrected, commands and features actually exercised, evidence location, and any limits. Do not report a draft as a proven workflow.
