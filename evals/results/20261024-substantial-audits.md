# Substantial audit support: retained evidence

Source scope: `8d6bf12` → `0dad0c5`; [accepted implementation](../../docs/substantial-audits.md). Candidate-only trials used synthetic records, not a live product or private project artifacts. They demonstrate selected behavior, not improvement rates or universal provider behavior.

## Package and source checks

- All 33 existing Node/PowerShell regressions passed on Windows, with no skips or failures.
- All 16 built-in skill validators passed with Python UTF-8 mode. The initial locale-default invocation stopped on an existing non-ASCII character; UTF-8 mode resolved the validator decoding issue.
- Repository metadata/link checks, atlas regeneration/drift, shared-guide drift and `git diff --check` passed.
- A disposable packaging probe rejected missing and changed copies, regenerated them successfully and verified all three standalone skill directories contained their local guide.
- Independent GPT-6.1 Sol Standards and Spec reviews found no missing feature requirements. One P3 duplication of effort guidance was removed to respect repository policy. A fresh Standards closure review verified the correction; no findings remained. Unaffected Spec coverage was retained.

## Audit report forward trial

A fresh GPT-6.1 Sol agent, high reasoning/default service tier, received Design, Retro and a raw synthetic audit handoff, without the evaluator's answers. It produced a local HTML report. The coordinator inspected the actual artifact and its evidence distinctions:

- The worker's claimed eight visual passes were not accepted: capture logs and overflow checks did not prove visual inspection. All eight unavailable visual checks remained blocked.
- A high claim against explicitly permitted corrections was rejected against the supplied rule. A separate data-consistency failure was retained with its worker-reported evidence and independent-reproduction limit. An unsupported mandatory-field claim remained unresolved, outside the confirmed-defect count.
- A proposed coloured product banner was rejected against the supplied neutral-header constraint. Textual feedback options had stable IDs, a recommendation and an unanswered decision, without invented mockups or implementation.
- Process, visual coverage and behavior evidence stayed distinct. A generic second-reviewer endorsement did not become independent confirmation.

The coordinator rendered the saved report at 728px and 390px and inspected its screenshots. At each width, 23 report checks passed, including filter/reset, empty state, option detail, disclosure state, internal anchors and overflow. These DOM checks do not establish keyboard, screen-reader or full accessibility behavior. Preview capture was limited to the first 4,000px; full-document geometry was checked. Application screenshots and an app endpoint were intentionally unavailable. Report QA did not complete any blocked product check.

## Recovery response trial

A fresh GPT-6.1 Sol agent, medium reasoning/default tier, received Coordinate and a synthetic checkpoint conflict. It identified the old-path alert as stale, preserved completed work for acceptance, avoided consuming a retry, required monitor restarts to stop and writers to finish before cleanup, and protected the owner's preview. It stated the live facts it could not verify. This was response-only: no actual recovery, scheduling, cleanup or service checks ran.

Raw fixtures, generated report/limits and installation verification stay in local operator records. No whole-catalog run, live product audit, rate-limit recovery test or fresh session on every CLI is claimed.
