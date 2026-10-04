# Source notes

## Astra Verification

This skill was written for Dytschgo Skills using ideas from Cursor's P stack [create-verification-skill](https://github.com/cursor/plugins/tree/main/pstack/skills/create-verification-skill) and [maintain-verification-skill](https://github.com/cursor/plugins/tree/main/pstack/skills/maintain-verification-skill). The project interview, real user-path proof, feature map, and upkeep loop informed its workflow. The skill was reorganized and adapted for portable agent repositories, uses the repository's conventions instead of requiring Cursor paths, and adds explicit safeguards against unintended external effects.

## Astra Blast Radius

This skill was written for Dytschgo Skills using ideas from Cursor's P stack [blast-radius](https://github.com/cursor/plugins/tree/main/pstack/skills/blast-radius). The focus on effects beyond direct callers, prioritizing a key safety assumption, and grounding claims in runtime evidence informed its workflow. The instructions here are newly written and adapted to this collection's authorization and evidence standards.

P stack is distributed under the MIT License. Its copyright and license notice is retained in [UPSTREAM-LICENSE-PSTACK.txt](UPSTREAM-LICENSE-PSTACK.txt).

## Matt Pocock skills, tag v1.3.1

These skills adapt behavior from [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.1) (MIT). The instructions were rewritten for this collection. Each skill's source file is named in its `SKILL.md`. Nothing was copied verbatim.

| Skill | Source |
| --- | --- |
| Astra Grilling | [grilling](https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/grilling/SKILL.md) |
| Astra To Spec | [to-spec](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/to-spec/SKILL.md) |
| Astra To Tickets | [to-tickets](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/to-tickets/SKILL.md) |
| Astra Code Review | [code-review](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/code-review/SKILL.md) |
| Astra Diagnosing Bugs | [diagnosing-bugs](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/diagnosing-bugs/SKILL.md) |
| Astra Triage | [triage](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/triage/SKILL.md) |
| Astra Wayfinder | [wayfinder](https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/wayfinder/SKILL.md) |
| Astra Handoff | [handoff](https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/handoff/SKILL.md) |
| Astra Writing for Agents | [writing-for-agents](https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/writing-for-agents/SKILL.md) |

Not brought over from that tag: skills still marked in progress, and skills this collection already covers or does not use (`ask-matt`, `grill-me`, `setup-matt-pocock-skills`, `implement`, `implement-spec`, `prototype`, `tdd`, `domain-modeling`, `grill-with-docs`, `codebase-design`, `improve-codebase-architecture`, `research`, `retro`, `pr`, `wizard`, `teach`, `to-questionnaire`, `wait-what`, `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`). The pull-request door rule lives in Astra Orchestrator's review reference instead of a separate skill.
