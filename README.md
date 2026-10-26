# Dytschgo Skills

20 reusable workflows for coding agents: plan a feature, build an interface, fix a bug, review a change, or explain the result.

Install the whole collection or choose the skills you need. They work with agents that support [Agent Skills](https://agentskills.io), including Codex, Claude Code, Cursor, and Gemini CLI.

## Install

You need [Node.js 22.20+](https://nodejs.org/) and a compatible coding agent. Run these commands in your terminal.

**Install all 20 skills:**

```sh
npx skills add Dytschgo/dytschgo-skills --skill '*' -g
```

Choose which agents to install to when prompted. `-g` makes the skills available across your projects.

**Install just one:**

```sh
npx skills add Dytschgo/dytschgo-skills --skill dytschgo-design -g
```

**Install a few:**

```sh
npx skills add Dytschgo/dytschgo-skills --skill dytschgo-design dytschgo-review dytschgo-retro -g
```

For a team or project-only installation, run the command from your project directory and leave out `-g`. To target an agent directly, add `-a codex`, `-a claude-code`, `-a cursor`, or `-a gemini-cli`.

Browse before installing:

```sh
npx skills add Dytschgo/dytschgo-skills --list
```

The [skills CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md) covers other options and supported agents. Without that CLI, copy the desired folders from [skills/](skills/) into your agent's supported skill directory, including their contents.

## Use them in your project

Open your coding agent in the project you want to work on, then name the skill and describe the outcome. These examples use Codex's `$skill-name` syntax; use your agent's skill picker or invocation syntax elsewhere.

```text
Use $dytschgo-design to show me three dashboard directions.
Keep the same sample data in each. Stop at the mockups.
```

```text
Use $dytschgo-engineering to implement the agreed feature.
Follow this repository's patterns, verify the changed behavior,
and stop at a local change. Don't push or deploy.
```

```text
Use $dytschgo-retro to explain these changes and their evidence
in a simple interactive HTML overview.
```

For a broader product audit:

```text
Use $dytschgo-design to audit these screens and the full checkout flow.
Track checked and blocked states, preserve the current visual style,
and stop at findings. Use $dytschgo-retro to show the evidence,
improvement options and decisions I need to make.
```

Design, Verify Setup and Coordinate include a shared audit guide for substantial reviews. It tracks coverage and challenges important findings. Retro includes a matching report template. These tools do not turn small edits into audits or start an agent team automatically.

No application dependency or import is needed. Skills are instructions your agent loads when relevant. They use the tools and permissions your agent already has.

## How they connect

![Three example Dytschgo routes: plan with Grill, Spec, Tickets, then Engineering or Coordinate; create interfaces with Design; fix bugs with Engineering, Debug, then Review before merging. Retro can present completed review evidence as HTML.](docs/images/workflow-overview.svg)

These are example routes, not mandatory pipelines:

- **An open idea:** Grill settles decisions. Spec records them. Tickets splits larger work. Engineering or Coordinate builds when requested.
- **A website or interface:** Design can explore options or implement the selected direction. You can start here directly.
- **A hard or unclear bug:** Engineering brings in Debug to reproduce and fix it. Review checks the resulting diff before a merge.
- **Ship a change:** say "ship it". Ship builds, proves, runs a Review loop, opens a problem-first PR with File PR, and watches it with Babysit. It stops at the merge gate. An explicit merge instruction continues through the authorized merge procedure.
- **Independent opinions:** say "council". Council runs three read-only reviewers from three providers and reports their scores; fixes and PR-description updates need existing authorization.
- **An HTML explanation:** Retro presents the supplied work and evidence. A technical assessment is only added when the request needs one.

Each stage stops at your requested outcome. Installing one skill does not automatically install every skill it refers to; add a helper if your workflow needs it, or install the full collection.

For every skill and conditional connection, download [the interactive route atlas](https://raw.githubusercontent.com/Dytschgo/dytschgo-skills/main/docs/skill-atlas.html) and open it in a browser. Its [source](docs/skill-atlas.html) and [machine-readable map](docs/skill-map.json) are in this repository.

## Choose a skill

All names start with `dytschgo-`.

| Skill | Say | Use it for |
| --- | --- | --- |
| [design](skills/dytschgo-design/SKILL.md) | show me options · mock this up · redesign | UI options, websites, implementation, and visual refinement. |
| [engineering](skills/dytschgo-engineering/SKILL.md) | build it · clean this up · make it faster | Substantial cleanup, performance, implementation, and stalled work. |
| [ship](skills/dytschgo-ship/SKILL.md) | ship it | A reviewed, green PR, stopped before merge. |
| [babysit](skills/dytschgo-babysit/SKILL.md) | babysit this PR · keep it green | Watching one PR through CI and review. |
| [file-pr](skills/dytschgo-file-pr/SKILL.md) | open a PR · write the PR description | Problem-first PR bodies with before/after and the door. |
| [debug](skills/dytschgo-debug/SKILL.md) | debug this · why is this flaky | Reproducing a hard bug and proving the fix. |
| [review](skills/dytschgo-review/SKILL.md) | review this · review loop | Checking a branch, PR, or WIP against standards and the requested behavior. |
| [council](skills/dytschgo-council/SKILL.md) | council | Three-provider review with scored rounds. |
| [retro](skills/dytschgo-retro/SKILL.md) | make a retro · explain this in HTML | Interactive retro HTML explanations, reviews, and maps. |
| [brief](skills/dytschgo-brief/SKILL.md) | write me a prompt · which model | A copyable implementation prompt from a feature idea. |
| [grill](skills/dytschgo-grill/SKILL.md) | grill me · poke holes in this | Stress-testing an idea and settling open decisions. |
| [spec](skills/dytschgo-spec/SKILL.md) | write the spec | Writing an already-settled spec as a draft or authorized tracker item. |
| [tickets](skills/dytschgo-tickets/SKILL.md) | break this into tickets | Splitting work into ordered, verifiable slices. |
| [coordinate](skills/dytschgo-coordinate/SKILL.md) | coordinate this · use agents | Useful agent delegation, integration, and final acceptance. |
| [triage](skills/dytschgo-triage/SKILL.md) | triage this · is this a real bug | Qualifying incoming issues and external PRs. |
| [impact](skills/dytschgo-impact/SKILL.md) | blast radius · what could this break | Checking what a change could break beyond its diff. |
| [verify-setup](skills/dytschgo-verify-setup/SKILL.md) | set up verification | Creating or repairing a project's verification guide. |
| [wayfinder](skills/dytschgo-wayfinder/SKILL.md) | map this out | Mapping decisions across a large, multi-session effort. |
| [handoff](skills/dytschgo-handoff/SKILL.md) | hand this off · new thread | Moving work to a fresh agent without losing decisions. |
| [agent-docs](skills/dytschgo-agent-docs/SKILL.md) | write a skill · fix our AGENTS.md | Writing skills, AGENTS.md, and other agent instructions. |

A small, clear edit can stay direct. You do not need a planning session or an agent team for every task.

## Update

For installations managed by the skills CLI, update all globally installed skills it tracks, including those from other collections:

```sh
npx skills update -g
```

Or update only selected skills:

```sh
npx skills update dytschgo-design dytschgo-retro -g
```

To refresh this collection and include newly added skills, rerun its install-all command. Use `npx skills update -p` for project installations. Restart your agent or use its skill-reload command if changes do not appear.

For manually copied installations, replace the same skill folders from the latest repository version, keeping a backup of local edits. The [maintenance guide](docs/maintenance.md) covers the Windows backup/sync script, migration from old Astra names, and optional personal profiles. It is a separate update method from the skills CLI.

## More information

- [Maintenance and contributor guide](docs/maintenance.md): backups, profiles, checks, and atlas generation.
- [Sources and attribution](SOURCES.md): upstream work and adaptations.
- [MIT license](LICENSE); bundled components retain their [upstream notices](UPSTREAM-LICENSE-PSTACK.txt) and [design-library license](skills/dytschgo-design/library/ui-ux-pro-max/LICENSE).

Installing skills does not grant permission to merge, deploy, or change accounts. Your request, project rules, and the agent's available tools still determine what it can do.
