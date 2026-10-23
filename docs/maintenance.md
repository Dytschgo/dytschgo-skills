# Maintenance and contributor guide

For normal installation, use the [README](../README.md#install). This guide covers repository maintenance and the separate Windows copy/sync workflow.

## Windows copies and legacy migration

Clone or update this repository, then run the synchronization script from its root. Pass only skill directories supported by your installed agent versions. These are example paths, not automatic discovery:

```powershell
git clone https://github.com/Dytschgo/dytschgo-skills.git
cd dytschgo-skills
# On later visits, update this checkout with: git pull --ff-only

# Preview the changes first.
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills", "$env:USERPROFILE/.claude/skills"

# Apply the same plan after inspecting it.
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills", "$env:USERPROFILE/.claude/skills" -Apply
```

This script synchronizes the whole collection. It replaces only collection-owned folders, checks copied hashes, and saves previous folders and a manifest outside skill discovery. Unrelated skills and plugin caches are preserved. It rejects linked paths and needs ordinary copied installations; use the skills CLI to update installations managed through that CLI or its symlinks.

The [rename map](../migrations/renames.json) recognizes the published Astra names and Dahlei Plana, installs their Dytschgo replacements, then retires the old folders into backups in the same transaction. Ownership checks accept LF/CRLF variants; substantive entrypoint or metadata changes stop preflight for review. Back up and reconcile those local changes before retrying. Do not retain duplicate old and new folders in discovery.

The original single-skill repository was named `astra-engineering-skill`. Its repository root is now a collection; copy from `skills/dytschgo-engineering/`, not the repository root.

### Recovery

Each applied run persists `recovery.json` before moving installations and records progress. Ordinary failures roll back automatically. An interrupted process can need manual recovery: inspect the journal and actual paths, restore a saved folder if its target is missing, and preserve an unexpected target for review instead of overwriting it. The journal may record a move as pending even if it completed just before interruption. Successful runs retain a per-file hash manifest and previous folders. Keep backups outside skill-discovery directories.

## Optional working profile

Default installations are generic. [Dytschgo's working profile](../profiles/dytschgo.md) contains scoped, sanitized personal preferences; select it only when wanted. Current task instructions and project requirements take precedence.

```powershell
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills" -EnableProfile -Apply
# Return this installation to generic behavior:
./scripts/sync-installed-skills.ps1 -SkillRoot "$env:USERPROFILE/.codex/skills" -DisableProfile -Apply
```

Activation copies `references/active-profile.md` into each installed skill. Later syncs preserve activation unless explicitly disabled. Global provider settings and credentials are unchanged. Keep personal writing voice in its separately selected writing skill.

## Checks and contributions

Add skills under `skills/<name>/` with a matching `SKILL.md` and `agents/openai.yaml`. Use [Dytschgo Agent Docs](../skills/dytschgo-agent-docs/SKILL.md) when editing agent-loaded instructions. Keep descriptions concise and skill boundaries clear. Frontmatter descriptions and UI metadata use JSON-compatible double-quoted strings. Preserve upstream licenses and attribution; exclude private project data and credentials.

Run the lightweight checks locally or in normal CI:

```sh
node scripts/check-skills.mjs
node scripts/build-atlas.mjs --check
node --test tests/*.test.mjs
```

Installer tests exercise PowerShell on Windows and skip on other platforms. This instruction repository and normal website/browser checks do not need a Windows test VM. Native Windows applications, installers, or actual platform compatibility work use the appropriate platform runner. See [AGENTS.md](../AGENTS.md).

Structural and installer tests do not prove model behavior. Use the [behavior evaluation protocol](../evals/README.md), [routing cases](../evals/routing-cases.json), and [retained trial summary](../evals/results/20261024.md) for that separate evidence. Prepare metadata-only selection trials with `node scripts/prepare-routing-trial.mjs <case-id>`; keep evaluator expectations out of acting-agent payloads.

## Generated atlas

```sh
node scripts/build-atlas.mjs
```

This regenerates [the HTML atlas](skill-atlas.html) and [JSON map](skill-map.json). Skill names, descriptions, and cross-links come from current source. [Link roles](../workflows/link-roles.json) classify shared references and inbound mentions; [journeys](../workflows/journeys.json) supply illustrative routes. Keep these aligned with skill behavior. Suggested journeys are not automatic execution. The generated fingerprint identifies the input snapshot; online source links follow published main.

The README's smaller [route illustration](images/workflow-overview.svg) shows common paths only. Update it when those examples change. Its dashed connections are optional transitions, not permission to start the next phase.
