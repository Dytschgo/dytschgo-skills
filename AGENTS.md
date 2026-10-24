# Agent instructions

- Use the `dytschgo-agent-docs` skill when adding or editing a skill, `AGENTS.md`, or `CLAUDE.md`.
- Model IDs and effort guidance live only in `skills/dytschgo-coordinate/references/routing.md`.
- Before a PR, run `node scripts/check-skills.mjs`, `node scripts/build-atlas.mjs` (commit regenerated `docs/` files), and `node --test tests/*.test.mjs`.
