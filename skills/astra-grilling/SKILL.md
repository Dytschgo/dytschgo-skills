---
name: astra-grilling
description: Grill a plan, decision, or idea until the design tree is settled. Use when the user wants to stress-test thinking, says grill, or another skill hits an open design decision; not for implementing, filing tickets, or writing files.
---

# Astra Grilling

Interview until you and the user share an understanding. Map the work as a design tree: every decision branches into the decisions that hang off it. Behavior follows Matt Pocock's grilling skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/grilling/SKILL.md

If the subject is a bug report, external issue, or pull request that has not been triaged, pull [Astra Triage](../astra-triage/SKILL.md) first. Do not interview until the claim has been reproduced.

If the effort is too big for one pass, and the frontier keeps opening branches this session cannot close, pull [Astra Wayfinder](../astra-wayfinder/SKILL.md) and stop this interview.

## Rounds

Work the tree in rounds. The frontier is every decision whose prerequisites are already settled: the questions you can ask now without guessing at answers you have not heard. Ask the whole frontier in one round. Number each question and give a recommended answer. Then wait for the user's answers before the next round.

Format a round like this:

```text
❓ **Q1** - **<question title>**: <question body, which may run several paragraphs and include choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body>

➡️ <your recommended answer>
```

Each round reshapes the tree. Settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a later round, not this one.

## Facts and decisions

Finding facts is your job, never the user's. When a frontier question needs a fact from the environment, look it up or dispatch a sub-agent. Do not ask the user for anything you could look up yourself. Do not block the round on that lookup. A running exploration is an unsettled prerequisite, so only the questions downstream of it wait. Ask the rest of the frontier now.

The decisions stay with the user. Put each one to them and wait.

## Stop and hand off

The session is done when the frontier is empty: every branch visited, nothing left silently assumed. Do not write code, open tickets, edit files, or start a build until the user confirms you have reached a shared understanding.

After that confirmation, pull the skill the settled decision calls for, and only that one:

- A settled decision that should become a tracker spec: [Astra To Spec](../astra-to-spec/SKILL.md).
- Interface direction or UI still to design or build: [Astra Design](../astra-design/SKILL.md).
- A feature idea that should become an implementation prompt: [Dahlei Plana](../dahlei-plana/SKILL.md).
- A build whose shape is now settled and needs coordinated agents: [Astra Orchestrator](../astra-orchestrator/SKILL.md).
- Implementation, cleanup, or a fix against a now-clear outcome: [Astra Engineering](../astra-engineering/SKILL.md).

Do not start that work inside this skill.
