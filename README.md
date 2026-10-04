# Dytschgo Skills

Reusable agent skills by Dylan Ferraro (Dytschgo) for engineering, interface design, feature planning, coordinated implementation, and verified delivery.

Each skill has its own folder and can be installed independently. The collection contains six Astra skills and Dahlei Plana, a feature-planning skill.

The short skill descriptions are what Codex sees during skill selection. Each `SKILL.md` keeps shared decisions and routes to task-specific references, so using one workflow does not load the others. This reduces initial and selected-skill context; it does not guarantee an API prompt-cache hit. Prompt caching depends on an unchanged prompt prefix and the model/runtime's cache behavior. See [OpenAI's prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching) and [Codex skill loading guidance](https://learn.chatgpt.com/docs/build-skills).

## Choose a skill

| Skill | What it does | When to use it |
| --- | --- | --- |
| [Astra Design](skills/astra-design/SKILL.md) | Unifies art direction, product UI, websites, motion, accessibility, and rendered verification. | New interfaces, redesigns, scoped UI fixes, design reviews, and visual polish. |
| [Astra Engineering](skills/astra-engineering/SKILL.md) | Guides deep investigation, useful code changes, and evidence-based verification. | Cleanup, performance, agent DX, PR and issue review, authorized merges, and stalled work. |
| [Astra Orchestrator](skills/astra-orchestrator/SKILL.md) | Coordinates specialist assignments, shared task state, implementation, independent review, and final acceptance. | Larger engineering tasks that benefit from agents with distinct responsibilities. |
| [Astra Verification](skills/astra-verification/SKILL.md) | Creates a project-local verification workflow and maintains its feature map against source and live behavior. | A project lacks a reliable way to prove user-facing behavior, or an existing verification guide may have drifted. |
| [Astra Blast Radius](skills/astra-blast-radius/SKILL.md) | Finds consequential effects beyond a diff and tests the key assumption that makes the change safe. | Reviewing a risky change or asking what a small-looking change could break elsewhere. |
| [Dahlei Plana](skills/dahlei-plana/SKILL.md) | Turns a feature idea into a detailed coding-agent prompt and recommends a current model from xAI, OpenAI, or Anthropic. | Feature planning, prompt preparation, or choosing a model for a specific build. |
| [Astra Grilling](skills/astra-grilling/SKILL.md) | Interviews an open plan as a design tree, one frontier round at a time, and stops before any action. | Stress-testing a decision, or an unset design before design, planning, implementation, or orchestration. |

Design supplies the interface workflow. Engineering supplies investigation and implementation methods. Orchestrator supplies coordination. Verification establishes a repeatable proof path for a project. Blast Radius examines cross-system effects before a change ships. Dahlei Plana prepares feature prompts and model recommendations. Grilling settles an open design and does not implement. Use them independently or combine them when the task benefits.

## Review and verification improvements

The skills now include safeguards drawn from reviewing real agent-written PRs:

- **Preserve UI behavior:** check moved controls across content types, loading/error states, collapsed panels, and keyboard focus transitions. Search renamed labels through native menus, error messages, tests, and current docs.
- **Investigate before claiming a fix:** distinguish demonstrated causes from hypotheses, test meaningful regressions, and preserve the capability protected by any changed or removed test.
- **Verify state and compatibility:** synchronize native/recovery checks on fixture identity and expected state; cover new preferences, missing legacy fields, and explicitly saved values.
- **Make evidence traceable:** inspect the actual changed screen, keep baseline filenames and provenance consistent, and tie claims to the revision, platform, and run step that supports them.
- **Review the integrated result:** compare CI history before labeling failures, refresh dependent PRs after parent changes, and use independent review according to impact.

These checks scale with the change. A small visual fix can use direct rendered evidence; older verification remains useful when its source and applicability are clear. See the [design review guidance](skills/astra-design/references/review.md), [engineering safeguards](skills/astra-engineering/references/code-improvement.md), and [acceptance workflow](skills/astra-orchestrator/references/github-and-review.md).

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

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-verification astra-blast-radius
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dahlei-plana
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-grilling
```

Install all seven globally for Codex:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill astra-design astra-engineering astra-orchestrator astra-verification astra-blast-radius dahlei-plana astra-grilling --agent codex -g
```

List available skills without installing:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --list
```

For manual installation, copy each desired folder from `skills/` into your agent's skill directory, including its references, metadata, and any library directory. For an existing Codex setup using `~/.codex/skills`, Astra Design's entrypoint is `~/.codex/skills/astra-design/SKILL.md`, and Dahlei Plana's is `~/.codex/skills/dahlei-plana/SKILL.md`.

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
| Luna | `gpt-6-luna` | Bounded context gathering, extraction, summaries, and simple checks. |
| Sol | `gpt-6.1-sol` | Default implementation, integration, tests, debugging, and independent technical review. |
| Astra | The existing primary session | Coordination, scope, conflict resolution, final review, and acceptance. |

GPT-6.1 Sol and Luna replace the previous worker defaults. The exact runtime IDs are `gpt-6.1-sol` and `gpt-6-luna`. Availability depends on the account and runtime. Orchestrator passes the selected ID explicitly when spawning a worker and checks that the runtime supports it. It does not fall back to an older model without explicit user authorization. If delegation is unavailable, suitable work can continue locally, but the agent must not claim that independent review occurred. Skills do not change the primary session's model; Design and Engineering used alone retain that session's model.

Example:

```text
Use $astra-orchestrator to implement this feature. Define acceptance criteria, delegate independent work where useful, review the combined changes, and verify the result.
```

Combine the skills:

```text
Use $astra-orchestrator and $astra-engineering to investigate this slow application, delegate independent bottleneck investigations, implement justified improvements, and report measured results.
```

## Astra Verification

Builds or audits a repository-specific skill that can launch the real application, check that the instance is healthy, exercise user paths, preserve evidence, and clean up what it started. It also keeps a feature map aligned with current source and live behavior. The generated workflow follows the repository's conventions and avoids real external side effects.

Example:

```text
Use $astra-verification to create a local verification skill for this app. Discover its primary user surfaces, use the existing harness, map the main features, then run one end-to-end proof and preserve the evidence.
```

## Astra Blast Radius

Traces a change beyond direct callers to affected data, lifecycle behavior, public contracts, flags, and downstream consumers. It prioritizes concrete risks, names what evidence cleared or confirmed them, and tries to exercise the key safety assumption with the real code.

Example:

```text
Use $astra-blast-radius to review this change. Find the most consequential way it could break another path and prove or clearly mark the key safety assumption.
```

## Dahlei Plana

Dahlei Plana turns a feature idea into a self-contained prompt for a coding agent. It uses available project context, calls out assumptions, and makes acceptance criteria concrete. It also recommends a suitable model from xAI, OpenAI, or Anthropic based on the feature's needs. Since model availability and capabilities change, it checks current primary vendor sources before making specific model claims. For independent parts of larger work, it can propose separate agent assignments and define how they fit together; it does not claim to dispatch agents unless the current environment actually supports that.

Example:

```text
Use $dahlei-plana to plan a saved-search feature for this app. Inspect the existing search flow, write a detailed implementation prompt with acceptance criteria, and recommend the best current model from xAI, OpenAI, or Anthropic with a source-backed alternative.
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
  astra-verification/
    SKILL.md
    agents/openai.yaml
  astra-blast-radius/
    SKILL.md
    agents/openai.yaml
  dahlei-plana/
    SKILL.md
    agents/openai.yaml
  astra-grilling/
    SKILL.md
    agents/openai.yaml
SOURCES.md
UPSTREAM-LICENSE-PSTACK.txt
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
| Verification | Portable project-local verification skill generation and maintenance. |
| Blast Radius | Evidence-led impact tracing and validation of key safety assumptions. |
| Dahlei Plana: `SKILL.md` | Feature brief, copyable agent prompt, and current model recommendation workflow. |
| Grilling: `SKILL.md` | Design-tree interview that stops until the user confirms a shared understanding. |
| `UPSTREAM-LICENSE-PSTACK.txt` | Retained MIT notice for the P stack work that inspired the verification and blast-radius workflows. |
| `SOURCES.md` | Names the P stack workflows that informed each new skill and summarizes the adaptations. |

## Compatibility and permissions

These are instruction packages for compatible coding agents. Installing them does not provide model access, tools, credentials, or extra concurrency. Orchestrator's runtime reference describes the authoring environment and requires adaptation to the tools actually available.

All skills preserve the user's scope and existing authorization. Installing a skill does not grant permission to merge, deploy, delete work, change account settings, or message contributors. Repository protections and tool permissions still apply. Delegation can increase usage; use task budgets appropriate to your environment.

## Adding more skills

Add each skill under `skills/<skill-name>/` with its `SKILL.md` and required supporting files, then add it to the table above. Include only material you have permission to redistribute, retain applicable attribution and license notices, and remove machine-specific credentials or private project context before publishing.

## License

[MIT](LICENSE). The bundled UI/UX Pro Max library retains its [upstream MIT notice](skills/astra-design/library/ui-ux-pro-max/LICENSE); see [design source notes](skills/astra-design/SOURCES.md). Astra Verification and Astra Blast Radius were written for this collection using ideas from Cursor's [P stack](https://github.com/cursor/plugins/tree/main/pstack); the specific source flows and adaptations are recorded in [SOURCES.md](SOURCES.md), and its MIT notice is retained in [UPSTREAM-LICENSE-PSTACK.txt](UPSTREAM-LICENSE-PSTACK.txt).
