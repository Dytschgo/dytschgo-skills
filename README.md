# Dytschgo Skills

Reusable agent skills by Dylan Ferraro (Dytschgo) for engineering, interface design, feature planning, coordinated implementation, and verified delivery.

Each skill has its own folder and can be installed independently. The collection contains sixteen focused Dytschgo skills.

The short skill descriptions are what Codex sees during skill selection. Each `SKILL.md` keeps shared decisions and routes to task-specific references, so using one workflow does not load the others. This reduces initial and selected-skill context; it does not guarantee an API prompt-cache hit. Prompt caching depends on an unchanged prompt prefix and the model/runtime's cache behavior. See [OpenAI's prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching) and [Codex skill loading guidance](https://learn.chatgpt.com/docs/build-skills).

## Choose a skill

| Skill | What it does | When to use it |
| --- | --- | --- |
| [Dytschgo Retro](skills/dytschgo-retro/SKILL.md) | Presents evidence as an interactive retro HTML review, map, explanation, or comparison. | A requested HTML report or useful visual overview; product UI stays with Design. |
| [Dytschgo Design](skills/dytschgo-design/SKILL.md) | Explores visual alternatives, preserves selected directions, and unifies product UI, websites, motion, and verification. | Comparable mockups, new interfaces, redesigns, scoped UI fixes, design reviews, and visual polish. |
| [Dytschgo Engineering](skills/dytschgo-engineering/SKILL.md) | Guides deep investigation, useful code changes, and evidence-based verification. | Cleanup, performance, agent DX, PR and issue review, authorized merges, and stalled work. |
| [Dytschgo Coordinate](skills/dytschgo-coordinate/SKILL.md) | Coordinates specialist assignments, shared task state, implementation, independent review, and final acceptance. | Larger engineering tasks that benefit from agents with distinct responsibilities. |
| [Dytschgo Verify Setup](skills/dytschgo-verify-setup/SKILL.md) | Creates a project-local verification workflow and maintains its feature map against source and live behavior. | A project lacks a reliable way to prove user-facing behavior, or an existing verification guide may have drifted. |
| [Dytschgo Impact](skills/dytschgo-impact/SKILL.md) | Finds consequential effects beyond a diff and tests the key assumption that makes the change safe. | Reviewing a risky change or asking what a small-looking change could break elsewhere. |
| [Dytschgo Brief](skills/dytschgo-brief/SKILL.md) | Turns a feature idea into a detailed coding-agent prompt and recommends a current model from xAI, OpenAI, or Anthropic. | Feature planning, prompt preparation, or choosing a model for a specific build. |
| [Dytschgo Grill](skills/dytschgo-grill/SKILL.md) | Interviews an open plan as a design tree, one frontier round at a time, and stops before any action. | Stress-testing a decision, or an unset design before design, planning, implementation, or orchestration. |
| [Dytschgo Spec](skills/dytschgo-spec/SKILL.md) | Publishes the settled conversation as a tracker spec. No interview. | A confirmed decision that should become an issue before anyone slices or builds it. |
| [Dytschgo Tickets](skills/dytschgo-tickets/SKILL.md) | Splits a spec into vertical tracer-bullet tickets with blocking edges. | The spec exists and the build needs an order. It does not implement the tickets. |
| [Dytschgo Review](skills/dytschgo-review/SKILL.md) | Reviews `git diff <fixed-point>...HEAD` on separate repo-standards and originating-spec axes, with review independence matched to risk. | Before a merge, or a review of a branch since a fixed point. The PR still needs a before, an after, and a door. |
| [Dytschgo Debug](skills/dytschgo-debug/SKILL.md) | Builds a tight pass/fail loop before any hypothesis, then minimises, tests, and locks the fix. | A hard bug or a performance regression. |
| [Dytschgo Triage](skills/dytschgo-triage/SKILL.md) | Moves an issue or external PR through triage roles, reproduces the claim, then writes an agent brief. | A bug report or incoming request, before anyone grills it. |
| [Dytschgo Wayfinder](skills/dytschgo-wayfinder/SKILL.md) | Charts an effort too big for one grilling pass as decision tickets, and stops when the route is clear. | The frontier will not close in this session. It does not build the destination. |
| [Dytschgo Handoff](skills/dytschgo-handoff/SKILL.md) | Compacts the thread for a fresh agent, with suggested skills and pointers instead of copied artifacts. | The thread should move. This is not a list of fix tickets for people. |
| [Dytschgo Agent Docs](skills/dytschgo-agent-docs/SKILL.md) | Writes a skill or AGENTS.md an agent can follow: pointers, completion checks, positive wording. | Adding or editing a skill, or a doc an agent loads by a pointer. |

Design supplies the interface workflow. Engineering supplies investigation and implementation methods. Orchestrator supplies coordination. Verification establishes a repeatable proof path for a project. Blast Radius examines cross-system effects before a change ships. Dytschgo Brief prepares feature prompts and model recommendations. Grilling settles an open design and does not implement. After that confirmation, To Spec publishes the decision, To Tickets slices it, and Orchestrator or Engineering builds it. Wayfinder charts an effort too big for one grilling pass. Triage reproduces a report before anyone grills it. Diagnosing Bugs builds a loop before a hypothesis. Code Review checks standards and spec before a merge. Handoff compacts a thread for a fresh agent. Writing for Agents is how a new skill or AGENTS.md is written. Use them independently or combine them when the task benefits.

## Review and verification improvements

The skills now include safeguards drawn from reviewing real agent-written PRs:

- **Preserve UI behavior:** check moved controls across content types, loading/error states, collapsed panels, and keyboard focus transitions. Search renamed labels through native menus, error messages, tests, and current docs.
- **Investigate before claiming a fix:** distinguish demonstrated causes from hypotheses, test meaningful regressions, and preserve the capability protected by any changed or removed test.
- **Verify state and compatibility:** synchronize native/recovery checks on fixture identity and expected state; cover new preferences, missing legacy fields, and explicitly saved values.
- **Make evidence traceable:** inspect the actual changed screen, keep baseline filenames and provenance consistent, and tie claims to the revision, platform, and run step that supports them.
- **Review the integrated result:** compare CI history before labeling failures, refresh dependent PRs after parent changes, and use independent review according to impact.

These checks scale with the change. A small visual fix can use direct rendered evidence; older verification remains useful when its source and applicability are clear. See the [design review guidance](skills/dytschgo-design/references/review.md), [engineering safeguards](skills/dytschgo-engineering/references/code-improvement.md), and [acceptance workflow](skills/dytschgo-coordinate/references/github-and-review.md).

## Install

Use the [skills CLI](https://github.com/vercel-labs/skills) to install the skill you want:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-design
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-engineering
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-coordinate
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-verify-setup dytschgo-impact
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-brief
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-grill
```

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-spec dytschgo-tickets dytschgo-review dytschgo-debug dytschgo-triage dytschgo-wayfinder dytschgo-handoff dytschgo-agent-docs
```

Install all sixteen globally for Codex:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill dytschgo-design dytschgo-engineering dytschgo-coordinate dytschgo-verify-setup dytschgo-impact dytschgo-brief dytschgo-grill dytschgo-spec dytschgo-tickets dytschgo-review dytschgo-debug dytschgo-triage dytschgo-wayfinder dytschgo-handoff dytschgo-agent-docs dytschgo-retro --agent codex -g
```

List available skills without installing:

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --list
```

For manual installation, copy each desired folder from `skills/` into your agent's skill directory, including its references, metadata, and any library directory. For an existing Codex setup using `~/.codex/skills`, Dytschgo Design's entrypoint is `~/.codex/skills/dytschgo-design/SKILL.md`, and Dytschgo Brief's is `~/.codex/skills/dytschgo-brief/SKILL.md`.

### Existing Dytschgo Engineering installations

This repository was previously named `astra-engineering-skill`. Its original `astra-engineering` skill is now `dytschgo-engineering`, under `skills/dytschgo-engineering/`. Existing local copies are unchanged until updated. If you installed by cloning the old repository directly into your skill directory, use the new installation instructions when updating; the repository root is now a collection, not an individual skill.

## Dytschgo Design

A single design skill for websites and product interfaces. It distinguishes a new design from a narrow refinement or a review, then loads only the relevant guidance. It covers art direction, typography and tokens, operational UI, content and imagery, motion architecture, realistic states, responsive behavior, accessibility, and rendered verification.

The optional bundled UI/UX Pro Max lookup preserves searchable palettes, typography, charts, UX patterns, and framework guidance. It requires Python 3 with no external packages; ordinary design work does not require the lookup. Catalog suggestions are reviewed against the actual brief and current implementation rather than applied automatically.

Examples:

```text
Use $dytschgo-design to build this product homepage around the supplied content and brand. Implement the responsive page and verify the primary flow.
```

```text
Use $dytschgo-design to fix the settings panel's cramped layout and wrapping labels. Preserve its current identity and behavior.
```

```text
Use $dytschgo-design to review this dashboard's hierarchy and accessibility. Give prioritized findings without editing files.
```

### Consolidating older design skills

Dytschgo Design replaces the general guidance previously spread across `web-design`, `interface-design`, `frontend-design`, `triumphoid-anti-slop-frontend`, `impeccable`, `animated-websites`, and `ui-ux-pro-max`. Personal website branding is intentionally excluded. See [source and consolidation notes](skills/dytschgo-design/SOURCES.md).

Install and verify Dytschgo Design first, then archive redundant personal skill folders outside the agent's skill-discovery directories. Disable duplicate plugin-provided design skills through plugin settings; do not edit their cached package files. Installing this repository alone does not remove or disable anything. Preserve unrelated writing, engineering, document, asset-generation, and hosting skills.

## Dytschgo Engineering

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
Use $dytschgo-engineering to find and fix the most valuable problems in this codebase. Remove unnecessary complexity, investigate performance bottlenecks, improve verification where needed, and prove the results.
```

For an audit without edits:

```text
Use $dytschgo-engineering to audit this module for unnecessary complexity. Give prioritized findings and verification suggestions. Leave the files untouched.
```

## Dytschgo Coordinate

The primary agent owns the task, divides useful independent work, assigns clear boundaries, reviews results, and accepts the finished outcome. Workers return evidence and blockers. Concurrent writers need explicit file ownership or isolated worktrees.

The [worker-routing reference](skills/dytschgo-coordinate/references/routing.md) is the single source of preferred model IDs and replacement rules. Explicit task choices take precedence. Orchestrator checks the live runtime, passes supported selections and options in tool arguments, and records the actual result. Skills retain the primary session's model. If delegation is unavailable, suitable work can continue locally, but the agent must not claim independent review occurred.

Example:

```text
Use $dytschgo-coordinate to implement this feature. Define acceptance criteria, delegate independent work where useful, review the combined changes, and verify the result.
```

Combine the skills:

```text
Use $dytschgo-coordinate and $dytschgo-engineering to investigate this slow application, delegate independent bottleneck investigations, implement justified improvements, and report measured results.
```

## Dytschgo Verify Setup

Builds or audits a repository-specific skill that can launch the real application, check that the instance is healthy, exercise user paths, preserve evidence, and clean up what it started. It also keeps a feature map aligned with current source and live behavior. The generated workflow follows the repository's conventions and avoids real external side effects.

Example:

```text
Use $dytschgo-verify-setup to create a local verification skill for this app. Discover its primary user surfaces, use the existing harness, map the main features, then run one end-to-end proof and preserve the evidence.
```

## Dytschgo Impact

Traces a change beyond direct callers to affected data, lifecycle behavior, public contracts, flags, and downstream consumers. It prioritizes concrete risks, names what evidence cleared or confirmed them, and tries to exercise the key safety assumption with the real code.

Example:

```text
Use $dytschgo-impact to review this change. Find the most consequential way it could break another path and prove or clearly mark the key safety assumption.
```

## Dytschgo Brief

Dytschgo Brief turns a feature idea into a self-contained prompt for a coding agent. It uses available project context, calls out assumptions, and makes acceptance criteria concrete. It also recommends a suitable model from xAI, OpenAI, or Anthropic based on the feature's needs. Since model availability and capabilities change, it checks current primary vendor sources before making specific model claims. For independent parts of larger work, it can propose separate agent assignments and define how they fit together; it does not claim to dispatch agents unless the current environment actually supports that.

Example:

```text
Use $dytschgo-brief to plan a saved-search feature for this app. Inspect the existing search flow, write a detailed implementation prompt with acceptance criteria, and recommend the best current model from xAI, OpenAI, or Anthropic with a source-backed alternative.
```

## Files and their purpose

### Conversational work and personal defaults

Short follow-ups retain the accepted outcome, selected design, and delivery boundary. Optional suggestions remain separate. Design exploration is a complete deliverable: requested alternatives use comparable content and stable option names, and implementation is compared with the selected artifact. Verification distinguishes mockups, local behavior, and release checks, including the running app's relationship to the source being discussed.

[Dytschgo's working profile](profiles/dytschgo.md) is optional and contains only scoped, sanitized preferences. Select it explicitly in a session or agent instruction; other users and unrelated tasks do not load it. Keep writing voice in a separately selected writing skill. Explicit current instructions override profile defaults.

To update copies on Windows, use [the synchronization script](scripts/sync-installed-skills.ps1). It accepts discovered user skill directories rather than guessing which CLIs are installed. Dry-run is the default; `-Apply` replaces only this collection's skill folders, backs up replaced files outside skill discovery, verifies copied hashes, and records a manifest. Unrelated skills and plugin caches remain untouched. Check each CLI's current discovery documentation before choosing roots.

```powershell
# Example roots; pass only locations supported by your installed agents.
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills", "$env:USERPROFILE/.claude/skills"
# Add -Apply after inspecting the plan. Profile activation is a separate opt-in:
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills" -EnableProfile -Apply
```

Profile activation adds `references/active-profile.md` to each installed skill. Each entrypoint loads that file only when it exists, so normal installs remain generic. The canonical public-safe profile stays in `profiles/dytschgo.md`; the installer copies it on opt-in and preserves activation on later updates. `-DisableProfile` explicitly returns those installations to generic behavior. Global agent instructions and settings are unchanged. Restart sessions or use the CLI's supported skill reload after installation; running conversations may retain previously loaded instructions.

Each applied run writes `recovery.json` with target, staging, and backup paths before the first move, and flushes progress around replacements. Ordinary failures roll back automatically. If the process is interrupted, inspect that record and the actual paths: restore a saved folder when its target is missing, and preserve any unexpected target for review instead of overwriting it. `moving-previous` or `installing` can mean the move completed just before interruption; filesystem state resolves that uncertainty. Successful runs also retain a per-file hash manifest. Keep backups outside every skill-discovery directory.

### Maintainer checks

Use Node's built-in tools, with no package installation:

Collection frontmatter uses unquoted hyphen-case `name` values and double-quoted JSON-compatible `description` strings. UI metadata likewise quotes its interface strings. This explicit subset avoids depending on a partial YAML parser; consumer compatibility is also checked with the built-in skill validator.

```sh
node scripts/check-skills.mjs
node --test tests/check-skills.test.mjs
```

On Windows, also run `node --test tests/sync-installed-skills.test.mjs`. These lightweight checks run directly or in normal CI; they do not need a Windows test VM. Websites and browser checks likewise use the normal local/browser workflow. Use a designated platform runner when testing native apps, installers, or platform-specific compatibility. The structural validator checks the collection's frontmatter/metadata conventions, local Markdown references and anchors, and centralized routing. It does not prove agent behavior. [Behavior cases](evals/behavior-cases.json) and the [evaluation protocol](evals/README.md) define separate old/revised trials with retained outputs and scored evidence.

```text
skills/
  dytschgo-design/
    SKILL.md
    agents/openai.yaml
    references/
    library/ui-ux-pro-max/
    SOURCES.md
  dytschgo-engineering/
    SKILL.md
    agents/openai.yaml
    references/code-improvement.md
    references/delivery-and-recovery.md
  dytschgo-coordinate/
    SKILL.md
    agents/openai.yaml
    references/runtime.md
    references/contracts-and-state.md
    references/github-and-review.md
  dytschgo-verify-setup/
    SKILL.md
    agents/openai.yaml
  dytschgo-impact/
    SKILL.md
    agents/openai.yaml
  dytschgo-brief/
    SKILL.md
    agents/openai.yaml
  dytschgo-grill/
    SKILL.md
    agents/openai.yaml
  dytschgo-spec/
    SKILL.md
    agents/openai.yaml
  dytschgo-tickets/
    SKILL.md
    agents/openai.yaml
  dytschgo-review/
    SKILL.md
    agents/openai.yaml
  dytschgo-debug/
    SKILL.md
    agents/openai.yaml
    scripts/hitl-loop.template.sh
  dytschgo-triage/
    SKILL.md
    agents/openai.yaml
  dytschgo-wayfinder/
    SKILL.md
    agents/openai.yaml
  dytschgo-handoff/
    SKILL.md
    agents/openai.yaml
  dytschgo-agent-docs/
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
| Dytschgo Brief: `SKILL.md` | Feature brief, copyable agent prompt, and current model recommendation workflow. |
| Grilling: `SKILL.md` | Design-tree interview that stops until the user confirms a shared understanding. |
| To Spec: `SKILL.md` | Publishes a settled conversation as a tracker spec. No interview. |
| To Tickets: `SKILL.md` | Splits a spec into vertical tickets with blocking edges. |
| Code Review: `SKILL.md` | Two-axis review of `git diff <fixed-point>...HEAD`. |
| Diagnosing Bugs: `SKILL.md` | Tight loop before a hypothesis. `scripts/hitl-loop.template.sh` is the last-resort human loop. |
| Triage: `SKILL.md` | Label state machine, reproduce before grilling, agent brief. |
| Wayfinder: `SKILL.md` | Decision-ticket map for an effort too big for one grilling pass. |
| Handoff: `SKILL.md` | Thread compact for a fresh agent. Not a list of fix tickets. |
| Writing for Agents: `SKILL.md` | How to write a skill or AGENTS.md. |
| `UPSTREAM-LICENSE-PSTACK.txt` | Retained MIT notice for the P stack work that inspired the verification and blast-radius workflows. |
| `SOURCES.md` | Names the P stack workflows that informed each new skill and summarizes the adaptations. |

## Compatibility and permissions

These are instruction packages for compatible coding agents. Installing them does not provide model access, tools, credentials, or extra concurrency. Orchestrator's runtime reference describes the authoring environment and requires adaptation to the tools actually available.

All skills preserve the user's scope and existing authorization. Installing a skill does not grant permission to merge, deploy, delete work, change account settings, or message contributors. Repository protections and tool permissions still apply. Delegation can increase usage; use task budgets appropriate to your environment.

## Adding more skills

Add each skill under `skills/<skill-name>/` with its `SKILL.md` and required supporting files, then add it to the table above. When you are writing that skill, or an `AGENTS.md`, pull [Dytschgo Agent Docs](skills/dytschgo-agent-docs/SKILL.md) before drafting. Include only material you have permission to redistribute, retain applicable attribution and license notices, and remove machine-specific credentials or private project context before publishing.

## License

[MIT](LICENSE). The bundled UI/UX Pro Max library retains its [upstream MIT notice](skills/dytschgo-design/library/ui-ux-pro-max/LICENSE); see [design source notes](skills/dytschgo-design/SOURCES.md). Dytschgo Verify Setup and Dytschgo Impact were written for this collection using ideas from Cursor's [P stack](https://github.com/cursor/plugins/tree/main/pstack); the specific source flows and adaptations are recorded in [SOURCES.md](SOURCES.md), and its MIT notice is retained in [UPSTREAM-LICENSE-PSTACK.txt](UPSTREAM-LICENSE-PSTACK.txt). Dytschgo Grill and the spec, ticket, review, diagnosis, triage, wayfinder, handoff, and writing skills adapt Matt Pocock's skills at tag v1.3.1 (MIT); each skill names its source file, and [SOURCES.md](SOURCES.md) lists them.

## Dytschgo naming, routes, and retro reports

The collection uses the `dytschgo-*` namespace. The [migration map](migrations/renames.json) records the old names and published LF-normalized ownership fingerprints. Synchronization first installs and verifies the new names, then backs up and retires recognized old folders in the same journaled transaction. Modified legacy entrypoints or metadata stop preflight for review. Ownership matching accepts LF and CRLF line endings; backup/copy verification remains byte-exact. New-name collisions are not silently adopted. Old names remain documented in this map rather than installed as duplicate discoverable skills.

Open the self-contained [interactive skill atlas](docs/skill-atlas.html) in a browser, or inspect the [machine-readable map](docs/skill-map.json). Generate both with `node scripts/build-atlas.mjs`; `node scripts/build-atlas.mjs --check` rejects stale outputs. Nodes and source links come from the skill Markdown. [Link classifications](workflows/link-roles.json) distinguish shared guidance and inbound mentions; [journeys](workflows/journeys.json) are suggested project routes, not an execution engine. Their human labels do not override skill instructions. The generated fingerprint identifies the input snapshot, while source URLs follow published main.

Use `$dytschgo-retro` for an interactive HTML explanation, map, comparison, or review presentation. It preserves source/evidence uncertainty, offers a reusable console shell, checks rendered controls and narrow layouts, uses T3 inline rendering when available, and saves standalone HTML elsewhere. A request to present existing evidence does not automatically start another formal code review or product build.

Selection-only trials start from the full metadata catalog without loading a named skill: `node scripts/prepare-routing-trial.mjs retro-explanation`. The payload deliberately excludes evaluator expectations. Run each in a fresh context; assess the result against [routing cases](evals/routing-cases.json). Selection evidence is separate from full task execution and structural tests. See the [research decisions](docs/research-20261024.md) and [accepted upgrade scope](docs/dytschgo-upgrade-spec.md).
