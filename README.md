# Dytschgo Skills

Reusable agent skills by Dylan Ferraro (Dytschgo) for investigating engineering problems, implementing improvements, coordinating agents, and verifying finished work.

Each skill has its own folder and can be installed independently. The collection currently contains two Astra skills.

## Choose a skill

| Skill | What it does | When to use it |
| --- | --- | --- |
| [Astra Engineering](skills/astra-engineering/SKILL.md) | Guides deep investigation, useful code changes, and evidence-based verification. | Cleanup, performance, agent DX, PR and issue review, authorized merges, and stalled work. |
| [Astra Orchestrator](skills/astra-orchestrator/SKILL.md) | Coordinates specialist assignments, shared task state, implementation, independent review, and final acceptance. | Larger engineering tasks that benefit from agents with distinct responsibilities. |

Engineering supplies the working methods. Orchestrator supplies the coordination process. Use either independently, or combine them when a task needs both.

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills) to install the skill you want:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-engineering
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-orchestrator
```

Install both globally for Codex:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-engineering astra-orchestrator --agent codex -g
```

List available skills without installing:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --list
```

For manual installation, copy each desired folder from `skills/` into your agent's skill directory, including its references and metadata. For an existing Codex setup using `~/.codex/skills`, the final paths would be `~/.codex/skills/astra-engineering/SKILL.md` and `~/.codex/skills/astra-orchestrator/SKILL.md`.

### Existing Astra Engineering installations

This repository was previously named `astra-engineering-skill`. The skill's name remains `astra-engineering`, but its files now live under `skills/astra-engineering/`. Existing local copies are unchanged until updated. If you installed by cloning the old repository directly into your skill directory, use the new installation instructions when updating; the repository root is now a collection, not an individual skill.

## Astra Engineering

The skill encourages the agent to understand the implementation, challenge unnecessary complexity, make justified changes, and produce evidence that the requested outcome was achieved.

It covers six workflows:

1. **Slop audits and cleanup:** investigate wrappers, duplicate state, dead paths, obsolete compatibility code, and weak tests while preserving useful behavior and public contracts.
2. **Performance:** locate a bottleneck, establish a representative baseline, make an improvement, and compare equivalent workloads.
3. **Agent DX and verification:** improve setup, worktree isolation, logs, test data, preview startup, and reliable end-to-end checks.
4. **PR and issue triage:** identify merge-ready changes, useful work needing repair, duplicates, and resolved issues using current evidence.
5. **Authorized merges:** verify the current revision, required CI and reviews, target branch, and release boundary.
6. **Stalled-work takeover:** recover the requirements, identify the failed assumption, and decide whether to salvage, simplify, or replace the implementation.

Example:

```text
Use $astra-engineering to find and fix the most valuable problems in this codebase. Remove unnecessary complexity, investigate performance bottlenecks, improve verification where needed, and prove the results.
```

For an audit without edits:

```text
Use $astra-engineering to audit this module for unnecessary complexity. Give prioritized findings and verification suggestions. Leave the files untouched.
```

## Astra Orchestrator

The primary agent owns the task, divides useful independent work, assigns clear boundaries, reviews results, and accepts the finished outcome. Workers return evidence and blockers. Concurrent writers need explicit file ownership or isolated worktrees.

The included routing preferences are:

| Role | Preferred model | Responsibility |
| --- | --- | --- |
| Luna | `gpt-5.6-luna` | Context gathering, extraction, summaries, and simple checks. |
| Terra | `gpt-5.6-terra` | Implementation, integration, tests, and ordinary diff reviews. |
| Sol | `gpt-5.6-sol` | Difficult debugging, architecture-sensitive work, and consequential reviews. |
| Astra | The existing primary session | Coordination, scope, conflict resolution, final review, and acceptance. |

These are the author's preferences. Availability depends on the account and runtime. The skill checks supported tools and models, discloses fallbacks, and does not silently change the primary session's model. If delegation is unavailable, suitable work can continue locally, but the agent must not claim that independent review occurred.

Example:

```text
Use $astra-orchestrator to implement this feature. Define acceptance criteria, delegate independent work where useful, review the combined changes, and verify the result.
```

Combine the skills:

```text
Use $astra-orchestrator and $astra-engineering to investigate this slow application, delegate independent bottleneck investigations, implement justified improvements, and report measured results.
```

## Files and their purpose

```text
skills/
  astra-engineering/
    SKILL.md
    agents/openai.yaml
    references/code-improvement.md
    references/delivery-and-recovery.md
  astra-orchestrator/
    SKILL.md
    agents/openai.yaml
    references/runtime.md
    references/contracts-and-state.md
    references/github-and-review.md
```

| File | Purpose |
| --- | --- |
| Each `SKILL.md` | Discovery, scope, core instructions, and reference routing. |
| Each `agents/openai.yaml` | Display metadata and a default invocation prompt. |
| Engineering: `code-improvement.md` | Cleanup, performance measurement, and agent DX methods. |
| Engineering: `delivery-and-recovery.md` | PR/issue triage, merge checks, and stalled-work recovery. |
| Orchestrator: `runtime.md` | Tool availability, model fallbacks, worktree isolation, context synchronization, and budgets. |
| Orchestrator: `contracts-and-state.md` | Assignment/result contracts, lifecycle states, and decision records. |
| Orchestrator: `github-and-review.md` | Branch and PR ownership, review evidence, corrections, and final delivery. |

## Compatibility and permissions

These are instruction packages for compatible coding agents. Installing them does not provide model access, tools, credentials, or extra concurrency. Orchestrator's runtime reference describes the authoring environment and requires adaptation to the tools actually available.

Both skills preserve the user's scope and existing authorization. Installing a skill does not grant permission to merge, deploy, delete work, change account settings, or message contributors. Repository protections and tool permissions still apply. Delegation can increase usage; use task budgets appropriate to your environment.

## Adding more skills

Add each skill under `skills/<skill-name>/` with its `SKILL.md` and required supporting files, then add it to the table above. Include only material you have permission to redistribute, retain applicable attribution and license notices, and remove machine-specific credentials or private project context before publishing.

## License

[MIT](LICENSE)
