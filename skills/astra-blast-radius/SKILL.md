---
name: astra-blast-radius
description: Trace what a code change could break beyond its direct diff and test the key assumption that makes it safe. Use for risky changes, small diffs with uncertain side effects, or explicit blast-radius reviews.
---

# Astra Blast Radius

Find plausible effects of a change outside the lines it edits. Explain which risks are supported by evidence, which were checked and cleared, and what remains uncertain. This is a focused review; it does not grant permission to edit, merge, deploy, or contact anyone.

## Trace effects

1. Read the full diff and identify changed behavior, data shape, timing, lifecycle, defaults, and public contracts. Check relevant history and caller context when available.
2. Follow paths that a simple symbol search can miss: serialized values, database fields, network payloads, generated files, feature flags, shared state, teardown, callbacks, and consumers in other packages or languages.
3. For each plausible effect, state a concrete failure path and its likely impact. Link it to a real file and line or mark it as a hypothesis. Do not turn an unsearched possibility into a finding.
4. Prioritize the one or two assumptions on which safety most depends. Prefer a narrow behavioral check against the real implementation over a broad list of speculative concerns.

## Gather evidence

Use the cheapest reliable evidence available and say where it stops:

1. Assertion without support.
2. Source or contract evidence with a location.
3. A step-by-step path showing why a failure is or is not reachable.
4. A focused check that calls the real code and fails if the assumption is false.
5. A reproduction through the running application when the behavior depends on runtime integration.

Use existing checks where they answer the question. Add a focused temporary probe only when it is safe, proportionate, and does not leave unrelated files behind. Do not claim a test, build, or runtime path passed unless it was actually run. Avoid testing against production accounts or data.

## Report

Return:

- **Change:** the consequential behavior introduced, removed, or shifted.
- **Key safety assumption:** the claim, strongest evidence reached, and result. Mark it unproven if evidence is insufficient.
- **Risks:** concrete failure path, location, likelihood and impact, plus an economical check.
- **Cleared:** material risks investigated and the evidence that ruled them out.
- **Before shipping:** the smallest relevant check still needed, if any.

Keep the report proportional to the change. A confirmed absence of meaningful downstream risk is a valid result. Do not present a long list of imagined failure modes as rigor.
