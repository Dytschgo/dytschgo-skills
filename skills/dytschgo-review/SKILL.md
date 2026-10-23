---
name: dytschgo-review
description: "Review the diff since a fixed point on two axes at once, repo standards and the originating spec. Use before a merge, or when the user asks to review a branch, PR, or work in progress."
---

# Dytschgo Review

If `references/active-profile.md` exists, read it as this installation's selected working profile. Apply relevant defaults under the current task instructions.

Review the diff between `HEAD` and a pinned base, on two axes that stay separate:

- **Standards.** Does the code follow this repo's documented coding standards?
- **Spec.** Does the code implement the originating issue or spec?

Keep the axes separate and report them side by side. A bounded low-risk read-only check can inspect both axes directly; label it as a single-agent review. Use independent reviewers for consequential work, when repository policy requires them, and always for high-risk changes. When independent review is needed, run the axes in parallel when tools permit. Never claim independence for self-review. Behavior follows Matt Pocock's code-review skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/code-review/SKILL.md

This review does not replace the pull request body. Before a merge, the PR still needs the before, the after, and the door required in [GitHub ownership, review, and acceptance](../dytschgo-coordinate/references/github-and-review.md).

## Process

### 1. Pin the fixed point

Use the fixed point the user named (a SHA, branch, tag, `main`, `HEAD~5`, or similar). Otherwise inspect the PR base or established repository workflow. When it identifies one unambiguous target, resolve and record that base and the current head without asking the user to repeat it. Ask one focused question when targets compete, especially on stacked branches; do not assume the default branch or the feature branch upstream is the intended base.

Capture one diff command: `git diff <fixed-point>...HEAD` (three dots, so the comparison is against the merge-base). Note commits with `git log <fixed-point>..HEAD --oneline`.

Confirm the ref resolves (`git rev-parse <fixed-point>`) and the diff is non-empty before spawning anyone. A bad ref or an empty diff fails here.

### 2. Find the spec

Look in this order:

1. Issue references in the commit messages (`#123`, `Closes #45`, and the host's equivalent), read from the tracker this repo uses.
2. A path the user passed.
3. A spec under `docs/`, `specs/`, or `.scratch/` that matches the branch or feature.
4. If nothing turns up, ask. If the user says there is no spec, skip the Spec axis and write "no spec available".

### 3. Find the standards, and always add the smell baseline

Collect repo docs that say how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of those, Standards always carries this smell baseline, a fixed set of Fowler code smells (*Refactoring*, chapter 3), even when the repo documents nothing. Two bindings:

- The repo wins. Where a documented standard endorses something the baseline would flag, drop the smell.
- Every smell is a judgement call ("possible Feature Envy"), never a hard violation. Skip anything tooling already enforces.

Match each smell against the diff. The arrow is how to fix it:

- **Mysterious Name**: a function, variable, or type whose name hides what it does or holds. Rename it. If no honest name appears, the design is murky.
- **Duplicated Code**: the same logic shape shows up in more than one hunk or file in the change. Extract the shared shape and call it from both.
- **Feature Envy**: a method uses another object's data more than its own. Move the method onto the data it envies.
- **Data Clumps**: the same few fields or parameters travel together. Bundle them into one type and pass that.
- **Primitive Obsession**: a primitive or string stands in for a domain concept. Give the concept a small type.
- **Repeated Switches**: the same `switch` or `if` cascade on the same type recurs in the change. Replace it with polymorphism, or with one map both sites share.
- **Shotgun Surgery**: one logical change forces scattered edits across many files in the diff. Gather what changes together into one module.
- **Divergent Change**: one file is edited for several unrelated reasons. Split it so each module changes for one reason.
- **Speculative Generality**: an abstraction, parameter, or hook exists for a need the spec does not have. Delete it. Inline until a real need shows up.
- **Message Chains**: a long `a.b().c().d()` walk the caller should not depend on. Hide the walk behind one method on the first object.
- **Middle Man**: a class or function that mostly delegates. Remove it and call the real target.
- **Refused Bequest**: a subclass or implementer ignores or overrides most of what it inherits. Drop the inheritance and use composition.

### 4. Choose the review method

For a direct low-risk review, inspect the same standards and spec criteria below and retain separate findings. For independent review, use distinct reviewers with bounded read-only assignments.

Give the Standards reviewer the diff command, the commit list, the standards files you found, and the smell baseline pasted in full. It has no other copy. Ask it to report, per file or hunk: every place the diff breaks a documented standard, citing the file and the rule, and any baseline smell, named, with the hunk quoted. Documented-standard breaches can be hard. Baseline smells stay judgement calls, and a documented repo standard overrides them. Skip anything tooling enforces. Under 400 words.

Give the Spec reviewer the diff command, the commit list, and the spec path or its contents. Ask it to report: requirements missing or partial, behavior in the diff that was not asked for, and requirements that look implemented but look wrong. Quote the spec line for each finding. Under 400 words.

If the spec is missing, skip that axis and say so in the report.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec`. You may clean wording. Do not merge or rerank findings. The axes are separate so one cannot hide the other.

Close with one line: how many findings each axis has, and the worst issue inside each axis, if any. Do not pick a winner across axes.

For a requested HTML overview of the completed assessment, use [Dytschgo Retro](../dytschgo-retro/SKILL.md) to present the findings and evidence. This is a presentation step, not a new review round.

## Why the axes stay separate

A change can pass one and fail the other. Code can follow every standard and still build the wrong thing. Code can do what the issue asked and still break the repo's conventions. A single blended list lets the pass mask the fail.
