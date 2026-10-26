---
name: dytschgo-grill
description: "Stress-test a plan or settle open product decisions with a deeper interview. Use when the user says 'grill me', 'poke holes in this', or material product choices are unresolved."
---

# Dytschgo Grill

If `references/active-profile.md` exists, read it as this installation's selected working profile. Apply relevant defaults under the current task instructions.

Interview until you and the user share an understanding. Map the work as a design tree: every decision branches into the decisions that hang off it. Behavior follows Matt Pocock's grilling skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/productivity/grilling/SKILL.md

Use the full interview when the user invokes Grilling or materially unresolved product choices need it. Routine implementation details, discoverable facts, an accepted design, and requests for visual options do not by themselves require an interview. If another skill referred here for one ambiguity, ask the focused material question and return to that task once settled. An explicit Grilling request retains the design-tree rounds and confirmation below. Honor a request to ask one question at a time.

If the subject is a bug report, external issue, or pull request that has not been triaged, pull [Dytschgo Triage](../dytschgo-triage/SKILL.md) first. Do not interview until the claim has been reproduced.

If the effort is too big for one pass, and the frontier keeps opening branches this session cannot close, pull [Dytschgo Wayfinder](../dytschgo-wayfinder/SKILL.md) and stop this interview.

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

- A settled decision that should become a tracker spec: [Dytschgo Spec](../dytschgo-spec/SKILL.md).
- Interface direction or UI still to design or build: [Dytschgo Design](../dytschgo-design/SKILL.md).
- A feature idea that should become an implementation prompt: [Dytschgo Brief](../dytschgo-brief/SKILL.md).
- A build whose shape is now settled and needs coordinated agents: [Dytschgo Coordinate](../dytschgo-coordinate/SKILL.md).
- Implementation, cleanup, or a fix against a now-clear outcome: [Dytschgo Engineering](../dytschgo-engineering/SKILL.md).

Do not start that work inside this skill.
