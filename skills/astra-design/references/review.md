# Review and verification

## Match the requested operation

| Request | Focus |
| --- | --- |
| Critique or UX review | Task clarity, hierarchy, information structure, credibility, and friction |
| Technical audit | Reproducible accessibility, responsive, state, and performance defects |
| Polish | Alignment, type, rhythm, consistency, and affected states within the existing identity |
| Bolder or quieter | Adjust emphasis and visual intensity while retaining product truth and scope |
| Distill or clarify | Remove redundant choices or wording; preserve necessary function and information |
| Harden or adapt | Recoverable errors, content extremes, permissions, input methods, and target devices |
| Optimize | Find a measured bottleneck and compare the same workload before and after |
| Extract a system | Consolidate actual repeated tokens and components into the existing conventions |

Translate natural language directly into the relevant operation. Do not require a command menu or chain into another skill after completing the requested work. A review alone does not authorize edits.

## Review against evidence

Start from the actual surface, task, and visual brief. For a reference-driven implementation, compare structure, reading order, focal proportions, type character, imagery/material, density, and primary actions. Explain adaptations needed for accessibility or responsive use; do not substitute a new aesthetic and call it fidelity.

Make findings actionable: location, observable problem, affected task or user, severity, and a specific correction. Distinguish broken behavior and accessibility barriers from taste preferences. Prioritize task-blocking defects, then comprehension and consistency, then decoration. Avoid invented numerical quality scores.

## Rendered acceptance

For material UI work, inspect the shipped surface classes and exercise the affected flow. On the web, use desktop, a narrow mobile width, and intermediate widths where the layout changes. On native platforms, use the actual target window/device classes. For a localized fix, keep checks focused on that component and nearby regressions.

Check what applies:

- Primary action, links, navigation, and meaningful feedback work with realistic data.
- Text remains legible after font loading, wrapping, zoom, long labels, and supported locale changes. No unintended page overflow, clipping, or hidden controls.
- Keyboard order follows the task; focus is visible, unobscured, and restored sensibly after overlays. Controls have correct semantics and accessible names.
- Form labels and errors are associated with their controls. Relevant status changes are announced without interrupting routine interaction.
- Contrast is measured for text and meaningful control/state boundaries in supported themes. Do not infer accessibility from a palette name or appearance alone.
- Touch input works without hover; targets have usable size and separation. Aim for generous targets, roughly 44 CSS px where practical, while checking applicable platform or conformance requirements separately.
- Loading, empty, error, permission, and success states remain useful where the change affects them. Verify retries and interrupted actions when meaningful.
- Reduced motion preserves all information and actions. Animated or moving content remains readable and controllable.
- Images, fonts, and media load; dimensions prevent avoidable shifts; console and network output show no relevant runtime failures.

Use automated accessibility checks when available, complemented by manual keyboard and interaction testing. A clean automated report does not establish full conformance; a visual review does not establish screen-reader behavior.

Batch the first inspection and corrections, then confirm the affected areas. Repeat only for new changes, unresolved defects, or failed checks. Do not stop with a known material defect because a fixed number of passes elapsed, and do not keep polishing after the criteria are met.

## Preserve interactions through UI changes

Before moving, consolidating, or deleting a control, identify every affected entry point and content type. Verify that the capability remains reachable for each relevant selection, empty/loading/error state, collapsed panel, and supported viewport. A replacement toolbar visible only for screenshots does not preserve an action previously available for drawings and text. Keep recovery and inspector controls available when an editor fails to load.

Exercise opening and closing panels with the keyboard. If the trigger unmounts, restore focus to its replacement or another deliberate target; do not rely on a detached node or silently leave focus on the page body. Test navigation away and back when a change moves related settings across pages. Observe state preservation before any test setup reselects or rewrites the value.

For display-name normalization, compare the displayed label with stored data, rename inputs, accessible names, and nearby disambiguating information. Check names that become identical after normalization. For renamed labels or settings locations, search active renderer, native menu/tray, error-message, test, and documentation paths. Preserve useful guidance for other supported input methods when simplifying tooltips. Exercise new keyboard navigation, including Tab entry/exit and arrow-key selection, against the control's semantics.

When styling a third-party component through internal classes, inspect the installed markup and rendered result rather than assuming selectors work. Prefer supported styling hooks when available and keep version-sensitive overrides localized. Treat possible future library changes as maintenance risk, not proof of a current defect.

## Performance work

Measure the user's actual problem: initial useful content, input latency, list scrolling, filtering, media decoding, or interaction with a large document. Record workload, device, network assumptions, and measurement method so the before/after comparison means something.

Fix the dominant cause before micro-optimizing. Common candidates include excessive media, blocking font loads, long main-thread tasks, repeated layout reads and writes, oversized rendering work, and unnecessary client code. Memoization, virtualization, workers, and GPU rendering are tools to justify with evidence, not a mandatory package.

Keep initial important content prioritized, reserve asset space, and defer expensive offscreen work. Verify usability and accessibility after the optimization. Synthetic measurements and device emulation have limits; report them instead of inventing field performance or frame-rate guarantees.

## Completion evidence

Run the repository's relevant format, lint, type, test, and build commands according to its requirements and the changed scope. Add behavioral tests when they protect meaningful interaction or state contracts; do not add brittle tests for arbitrary styling values.

State what changed and why, what was actually inspected or exercised, and any material uncertainty. If the app could not be rendered, explicitly say the review was based on source or static artifacts. Identify the concrete blocker without implying a browser pass occurred.

For visual baselines, inspect every changed capture and difference image in the actual affected surface/state. Record the source revision, platform, viewport/scale, run or artifact, and the outcome it demonstrates. Keep manifest keys consistent with artifact filenames and update stale provenance. Distinguish inspected prior evidence from checks executed now, and a passed step from the overall job result. Repeated wording or an image from another editor does not establish the requested outcome.
