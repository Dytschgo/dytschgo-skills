# Code improvement

Use the section matching the requested outcome. Treat the examples as search directions, not a checklist that every repository must satisfy.

## Slop audits and cleanup

Hunt for complexity that has no distinct responsibility: pass-through wrappers, duplicate state or conversions, dead paths, speculative options, obsolete compatibility code, unnecessary dependencies, and abstractions whose indirection exceeds their value.

For each candidate, identify the concrete maintenance cost and the behavior it currently protects. Trace callers, public exports, dynamic registration, and relevant history. An absence of direct references alone does not establish that a public or dynamically loaded API is unused. A short wrapper may enforce a useful boundary, normalization rule, or instrumentation contract.

Evaluate tests by the failure they can catch. Duplicated assertions, snapshots with no useful contract, and mocks that simply replay implementation are candidates for consolidation. Preserve meaningful regression, security, compatibility, and boundary coverage. Test length, inconvenience, or failure is not evidence that a test is useless.

For an audit, return prioritized findings with locations, rationale, a concrete simplification, and an appropriate verification method. For cleanup, implement justified cuts in coherent groups and verify preserved behavior. Do not replace removed complexity with a new generic framework or mix unrelated style churn into the change. It is valid to find no justified removal.

## Behavior and verification safeguards

Trace a reported problem through its producer, state transitions, and consumers before choosing the fix. State the supported cause and evidence; distinguish a reproduced cause from a hypothesis. A display-only correction can be appropriate when stored user data should remain unchanged, but check collisions, editing, accessible names, and other consumers. Do not raise limits, suppress errors, or add fallbacks as a claimed resolution without evidence connecting them to the failure. When reproduction is unavailable, gather bounded diagnostics within scope or report the unresolved hypothesis; label any justified mitigation accordingly.

Protect changed behavior and meaningful failure boundaries with regression coverage. Prefer a failing-before/passing-after reproduction where feasible. Before deleting or rewriting a test, identify the user capability it protected and where that capability is now exercised. Renaming assertions is not coverage for new behavior; neither is a test that merely mirrors implementation. Small presentation-only changes can use direct visual evidence instead of an arbitrary test per function.

Keep test preconditions distinct from observations. Assigning a control's value and reading it back proves setup, not state preservation across navigation. A conditional assertion must depend on known scenario state, not on whether the expected UI happens to be visible. For native/watch/recovery workflows, establish the active fixture and project identity, then wait for the expected content, revision, save completion, or explicit terminal state. A one-time existence check, arbitrary delay, retry, or optional branch must not turn a missed outcome into a pass. Use isolated fixtures; make editing the displayed fixture deliberate when the scenario requires it.

When changing preference defaults or schemas, distinguish new profiles, older profiles missing the field, and explicitly saved values. Define intended behavior for each affected case and test preservation or migration accordingly. For consequential persistence, recovery, permissions, or native changes, document failure behavior and recovery and obtain the independent review required by repository policy; inspect native filtering, swallowed errors, and platform assumptions before changing enumeration bounds. A cosmetic diff or small line count does not make a behavioral change low risk.

For renamed UI text, settings locations, or actions, search the old wording across active source, native/tray/error paths, tests, and current documentation. Fix relevant occurrences or record why they remain; preserve historical records and stable identifiers where appropriate. For manifests and other structured files, follow the existing schema and key format, check references to real artifacts, and remove conflicting stale entries. A valid JSON parse alone does not verify provenance.

## Performance wins

Choose a metric connected to the user's problem, such as request latency, startup time, build time, peak memory, query count, or bundle size. Establish a representative workload and baseline before claiming an optimization.

Locate the bottleneck with available profiles, traces, query plans, or focused measurements. Look for avoided work: repeated I/O, N+1 queries, unnecessary serialization, redundant rendering, repeated parsing, overfetching, or a poor algorithm. Consider larger cuts when they remove the actual bottleneck.

Compare before and after on the same workload and environment. Account for warmup, caching, data size, and measurement variation where they matter. Record units, run conditions, and enough samples to distinguish a real effect from noise. Check output correctness and relevant tradeoffs such as memory, startup cost, or tail latency.

Keep a change on its demonstrated merits. If results are inconclusive, say so and avoid a numerical improvement claim. When a representative environment is unavailable, separate local proxy measurements from production expectations and state what remains unverified.

## Agent DX and verification loops

Identify the concrete obstacle between a fresh checkout or worktree and a trustworthy result. Useful targets include broken bootstrap commands, undocumented prerequisites, shared ports or state between worktrees, unavailable logs, unreliable fixtures, inaccessible test accounts, and unclear preview or end-to-end test entry points.

Choose the smallest durable fix: a repeatable setup or smoke command, isolated test data, worktree-specific configuration, better failure output, or concise repository guidance. Reuse the project's tools. Add only operationally useful facts to agent instructions, such as working commands, required services, and known constraints.

Run the improved path from a fresh worktree or equivalent clean state when practical; otherwise disclose the narrower validation. Verify the relevant startup, test, or user journey. Do not call missing credentials or a skipped end-to-end run successful verification, and do not weaken checks to make the loop green.
