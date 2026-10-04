---
name: astra-diagnosing-bugs
description: Diagnose a hard bug or performance regression. Use when something is broken, throwing, failing, or slow. Do not form a hypothesis until a tight pass/fail loop exists.
---

# Astra Diagnosing Bugs

A phased diagnosis. Skip a phase only when you say why. Behavior follows Matt Pocock's diagnosing-bugs skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/diagnosing-bugs/SKILL.md

When you explore the codebase, read `GLOSSARY.md` if it exists, and check ADRs in the area you are touching.

## Redact

You will show commands, output, and captured artifacts. Replace every secret with `<REDACTED>` first. Build loops against environment variables so the credential stays in the environment. Captured artifacts carry auth headers: quote only the lines that carry the signal. If the redacted output is not enough to diagnose, say so and ask the user.

## Phase 1: Build a feedback loop

This is the skill. If you have a tight pass/fail signal that goes red on this bug, you can find the cause. Bisection, hypothesis tests, and instrumentation only consume that signal. Without it, staring at code will not save you. Spend disproportionate effort here. Refuse to stop early.

Construct a loop in roughly this order:

1. A failing test at whatever seam reaches the bug: unit, integration, or end to end.
2. A curl or HTTP script against a running dev server.
3. A CLI invocation with a fixture, diffing stdout against a known-good snapshot.
4. A headless browser script that drives the UI and asserts on DOM, console, or network.
5. Replay a captured trace. Save a real request, payload, or event log and replay it through the code path in isolation.
6. A throwaway harness. One service, mocked dependencies, a single call that hits the bug path.
7. A property or fuzz loop. If the bug is "sometimes wrong", run many random inputs and look for the failure.
8. A bisection harness. If the bug appeared between two known states, automate "boot at state X, check, repeat" so `git bisect run` can drive it.
9. A differential loop. Same input through old versus new (or two configs), then diff the outputs.
10. A human-in-the-loop bash script, last resort. If a person must click, drive them with `scripts/hitl-loop.template.sh` in this skill so the loop stays structured. Captured output comes back to you.

Then tighten the loop you have. Make it faster (cache setup, skip unrelated init, narrow the scope). Make the signal sharper (assert the specific symptom, not "did not crash"). Make it deterministic (pin time, seed RNG, isolate the filesystem, freeze the network). A 30-second flaky loop is barely better than no loop. A 2-second deterministic one is tight.

For a non-deterministic bug, chase a higher reproduction rate, not a clean one-shot repro. Loop the trigger, parallelise, add stress, narrow timing windows, inject sleeps. A bug that fails half the time is debuggable. One that fails one time in a hundred is not. Raise the rate until it is.

If you genuinely cannot build a loop, stop and say so. List what you tried. Ask the user for access to an environment that reproduces it, a redacted captured artifact (HAR, log, core dump, or a timestamped screen recording), or permission to add temporary production instrumentation. Do not go on to a hypothesis without a loop.

Phase 1 is done when you can name one command you have already run at least once (show the invocation and the redacted output) and that command is all of these:

- **Red-capable.** It drives the actual bug path and asserts the user's exact symptom, so it can go red on this bug and green once fixed. "Runs without erroring" does not count.
- **Deterministic.** Same verdict every run. For a flake, a pinned high reproduction rate.
- **Fast.** Seconds, not minutes.
- **Agent-runnable.** You can run it unattended. A human is in the loop only through `scripts/hitl-loop.template.sh`.

If you catch yourself reading code to build a theory before that command exists, stop. No red-capable command, no Phase 2.

## Phase 2: Reproduce and minimise

Run the loop. Watch it go red as the bug appears.

Confirm the loop produces the failure the user described, not a nearby one. Confirm it reproduces across runs, or, for a flake, at a rate high enough to debug. Capture the exact symptom so later phases can tell whether the fix hit it.

Then shrink the repro to the smallest scenario that still goes red. Cut inputs, callers, config, data, and steps one at a time. Re-run after each cut. Keep only what is load-bearing. Done when removing any remaining element makes the loop go green. A minimal repro shrinks the hypothesis space and becomes the regression test later.

Do not continue until you have reproduced and minimised.

## Phase 3: Hypothesise

Only now. Generate 3 to 5 ranked hypotheses before testing any of them. One hypothesis anchors you on the first plausible idea.

Each one must be falsifiable. State the prediction: "If <X> is the cause, then changing <Y> makes the bug disappear, or changing <Z> makes it worse." If you cannot state the prediction, discard it or sharpen it.

Show the ranked list to the user before testing. They often re-rank it, or have already ruled one out. Do not block on them. If they are away, proceed with your ranking.

## Phase 4: Instrument

Each probe maps to one prediction from Phase 3. Change one variable at a time.

Prefer a debugger or REPL inspection when the environment has one. One breakpoint beats ten logs. Otherwise log at the boundaries that distinguish the hypotheses. Do not log everything and grep.

Tag every debug log with a unique prefix, for example `[DEBUG-a4f2]`. Cleanup is then one grep. Untagged logs survive.

For a performance regression, logs are usually the wrong tool. Take a baseline measurement first (a timing harness, `performance.now()`, a profiler, or a query plan), then bisect. Measure, then fix.

## Phase 5: Fix and regression test

Write the regression test before the fix, but only at a correct seam. A correct seam exercises the real bug pattern as it happens at the call site. A seam that is too shallow (a single caller when the bug needs several, or a unit test that cannot replay the chain) gives false confidence.

If no correct seam exists, that is the finding. Say so. The architecture is preventing the bug from being locked down. Flag it. Do not pretend a shallow test covers it.

When a correct seam exists: turn the minimised repro into a failing test there, watch it fail, apply the fix, watch it pass, then re-run the Phase 1 loop against the original un-minimised scenario.

## Phase 6: Cleanup

Done only when all of these are true:

- The original repro no longer reproduces (re-run the Phase 1 loop).
- The regression test passes, or the missing seam is written down.
- Every `[DEBUG-...]` line is gone (grep the prefix).
- Throwaway prototypes are deleted, or moved somewhere clearly marked as debug.
- The hypothesis that was right is stated in the commit or PR message.

## Hand off

Do not start this skill's hypothesis from another skill. [Astra Engineering](../astra-engineering/SKILL.md) pulls this skill before a cause is named. After the fix is in a diff, a merge still goes through [Astra Code Review](../astra-code-review/SKILL.md).
