# Dytschgo Skills

Reusable agent skills by Dylan Ferraro (Dytschgo) for engineering, interface design, coordinated implementation, and verified delivery.

Each skill has its own folder and can be installed independently. The collection contains three Astra skills.

The short skill descriptions are what Codex sees during skill selection. Each `SKILL.md` keeps shared decisions and routes to task-specific references, so using one workflow does not load the others. This reduces initial and selected-skill context; it does not guarantee an API prompt-cache hit. Prompt caching depends on an unchanged prompt prefix and the model/runtime's cache behavior. See [OpenAI's prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching) and [Codex skill loading guidance](https://learn.chatgpt.com/docs/build-skills).

## Choose a skill

| Skill | What it does | When to use it |
| --- | --- | --- |
| [Astra Design](skills/astra-design/SKILL.md) | Unifies art direction, product UI, websites, motion, accessibility, and rendered verification. | New interfaces, redesigns, scoped UI fixes, design reviews, and visual polish. |
| [Astra Engineering](skills/astra-engineering/SKILL.md) | Guides deep investigation, useful code changes, and evidence-based verification. | Cleanup, performance, agent DX, PR and issue review, authorized merges, and stalled work. |
| [Astra Orchestrator](skills/astra-orchestrator/SKILL.md) | Coordinates specialist assignments, shared task state, implementation, independent review, and final acceptance. | Larger engineering tasks that benefit from agents with distinct responsibilities. |

Design supplies the interface workflow. Engineering supplies investigation and implementation methods. Orchestrator supplies coordination. Use them independently or combine them when the task benefits.

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills) to install the skill you want:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-design
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-engineering
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-orchestrator
```

Install all three globally for Codex:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-design astra-engineering astra-orchestrator --agent codex -g
```

List available skills without installing:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --list
```

For manual installation, copy each desired folder from `skills/` into your agent's skill directory, including its references, metadata, and any library directory. For an existing Codex setup using `~/.codex/skills`, Astra Design's entrypoint would be `~/.codex/skills/astra-design/SKILL.md`.

### Existing Astra Engineering installations

This repository was previously named `astra-engineering-skill`. The skill's name remains `astra-engineering`, but its files now live under `skills/astra-engineering/`. Existing local copies are unchanged until updated. If you installed by cloning the old repository directly into your skill directory, use the new installation instructions when updating; the repository root is now a collection, not an individual skill.

## Astra Design

A single design skill for websites and product interfaces. It distinguishes a new design from a narrow refinement or a review, then loads only the relevant guidance. It covers art direction, typography and tokens, operational UI, content and imagery, motion architecture, realistic states, responsive behavior, accessibility, and rendered verification.

The optional bundled UI/UX Pro Max lookup preserves searchable palettes, typography, charts, UX patterns, and framework guidance. It requires Python 3 with no external packages; ordinary design work does not require the lookup. Catalog suggestions are reviewed against the actual brief and current implementation rather than applied automatically.

Examples:

```text
Use $astra-design to build this product homepage around the supplied content and brand. Implement the responsive page and verify the primary flow.
```

```text
Use $astra-design to fix the settings panel's cramped layout and wrapping labels. Preserve its current identity and behavior.
```

```text
Use $astra-design to review this dashboard's hierarchy and accessibility. Give prioritized findings without editing files.
```

### Consolidating older design skills

Astra Design replaces the general guidance previously spread across `web-design`, `interface-design`, `frontend-design`, `triumphoid-anti-slop-frontend`, `impeccable`, `animated-websites`, and `ui-ux-pro-max`. Personal website branding is intentionally excluded. See [source and consolidation notes](skills/astra-design/SOURCES.md).

Install and verify Astra Design first, then archive redundant personal skill folders outside the agent's skill-discovery directories. Disable duplicate plugin-provided design skills through plugin settings; do not edit their cached package files. Installing this repository alone does not remove or disable anything. Preserve unrelated writing, engineering, document, asset-generation, and hosting skills.

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
  astra-design/
    SKILL.md
    agents/openai.yaml
    references/
    library/ui-ux-pro-max/
    SOURCES.md
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
| Design: `references/` | Focused foundations, product UI, websites, motion, review, and optional lookup guidance. |
| Design: `library/ui-ux-pro-max/` | Optional search scripts, integrity validator, catalog data, and upstream license. |
| Engineering: `code-improvement.md` | Cleanup, performance measurement, and agent DX methods. |
| Engineering: `delivery-and-recovery.md` | PR/issue triage, merge checks, and stalled-work recovery. |
| Orchestrator: `runtime.md` | Tool availability, model fallbacks, worktree isolation, context synchronization, and budgets. |
| Orchestrator: `contracts-and-state.md` | Assignment/result contracts, lifecycle states, and decision records. |
| Orchestrator: `github-and-review.md` | Branch and PR ownership, review evidence, corrections, and final delivery. |

## Compatibility and permissions

These are instruction packages for compatible coding agents. Installing them does not provide model access, tools, credentials, or extra concurrency. Orchestrator's runtime reference describes the authoring environment and requires adaptation to the tools actually available.

All skills preserve the user's scope and existing authorization. Installing a skill does not grant permission to merge, deploy, delete work, change account settings, or message contributors. Repository protections and tool permissions still apply. Delegation can increase usage; use task budgets appropriate to your environment.

## Adding more skills

Add each skill under `skills/<skill-name>/` with its `SKILL.md` and required supporting files, then add it to the table above. Include only material you have permission to redistribute, retain applicable attribution and license notices, and remove machine-specific credentials or private project context before publishing.

## License

[MIT](LICENSE). The bundled UI/UX Pro Max library retains its [upstream MIT notice](skills/astra-design/library/ui-ux-pro-max/LICENSE); see [source notes](skills/astra-design/SOURCES.md).
