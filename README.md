# Astra Engineering

A reusable Codex skill for ambitious, evidence-driven engineering work. Astra Engineering is designed to carry difficult repository tasks beyond superficial fixes and into finished, verified outcomes.

It guides an agent to inspect the real implementation and its history, challenge unnecessary complexity, make substantial changes when the evidence supports them, and verify claims with the right kind of evidence.

## What it is used for

- Codebase cleanup and "slop" audits
- Root-cause investigation and coherent simplification
- Measured performance optimization
- Improving agent setup and verification loops
- Auditing pull requests and issues
- Preparing or performing authorized merges
- Recovering and finishing stalled engineering work

The skill shapes engineering behavior. It does not select a model, change reasoning settings, grant permissions, or override repository instructions.

## What's included

```text
astra-engineering/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── code-improvement.md
    └── delivery-and-recovery.md
```

### `SKILL.md`

The main operating workflow. It explains how to infer scope and acceptance criteria, investigate before changing code, choose proportionate verification, use existing authorization correctly, and finish with concrete evidence.

### `references/code-improvement.md`

Detailed guidance for:

- Identifying unjustified wrappers, duplicated state, dead paths, obsolete compatibility code, weak tests, and other accidental complexity
- Establishing meaningful performance baselines and comparing results under equivalent conditions
- Repairing developer and agent workflows with repeatable setup, isolation, useful logs, and trustworthy smoke or end-to-end checks

### `references/delivery-and-recovery.md`

Detailed guidance for:

- Evidence-based PR and issue triage
- Safe, authorized merges with current-head and required-check verification
- Taking over stalled work by recovering the original outcome, identifying why the effort stalled, and choosing whether to salvage, simplify, or replace it

### `agents/openai.yaml`

Display metadata and a default prompt for exposing the skill in compatible Codex interfaces.

## Installation

Copy this repository into your Codex skills directory so the final path contains `SKILL.md`:

```text
~/.codex/skills/astra-engineering/SKILL.md
```

For example:

```bash
git clone https://github.com/Dytschgo/astra-engineering-skill.git ~/.codex/skills/astra-engineering
```

Restart or reload Codex if the skill is not detected immediately.

## Usage

Invoke the skill explicitly:

```text
Use $astra-engineering to audit this codebase for unnecessary complexity, implement the highest-value cleanup, and verify preserved behavior.
```

```text
Use $astra-engineering to find the actual performance bottleneck, measure a baseline, implement a justified improvement, and compare the result.
```

```text
Use $astra-engineering to take over this stalled implementation, recover the original acceptance criteria, and finish it with evidence.
```

The skill loads only the reference relevant to the requested work, keeping its working context focused.

## Safety and authority

Astra Engineering does not independently authorize merges, deployments, contributor messages, force-pushes, destructive changes, or deletion of user work. Those actions still require permission from the user and must follow repository protections.

## License

[MIT](LICENSE)
