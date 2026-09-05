# Code improvement

Use the section matching the requested outcome. Treat the examples as search directions, not a checklist that every repository must satisfy.

## Slop audits and cleanup

Hunt for complexity that has no distinct responsibility: pass-through wrappers, duplicate state or conversions, dead paths, speculative options, obsolete compatibility code, unnecessary dependencies, and abstractions whose indirection exceeds their value.

For each candidate, identify the concrete maintenance cost and the behavior it currently protects. Trace callers, public exports, dynamic registration, and relevant history. An absence of direct references alone does not establish that a public or dynamically loaded API is unused. A short wrapper may enforce a useful boundary, normalization rule, or instrumentation contract.

Evaluate tests by the failure they can catch. Duplicated assertions, snapshots with no useful contract, and mocks that simply replay implementation are candidates for consolidation. Preserve meaningful regression, security, compatibility, and boundary coverage. Test length, inconvenience, or failure is not evidence that a test is useless.

For an audit, return prioritized findings with locations, rationale, a concrete simplification, and an appropriate verification method. For cleanup, implement justified cuts in coherent groups and verify preserved behavior. Do not replace removed complexity with a new generic framework or mix unrelated style churn into the change. It is valid to find no justified removal.

## Performance wins

Choose a metric connected to the user's problem, such as request latency, startup time, build time, peak memory, query count, or bundle size. Establish a representative workload and baseline before claiming an optimization.

Locate the bottleneck with available profiles, traces, query plans, or focused measurements. Look for avoided work: repeated I/O, N+1 queries, unnecessary serialization, redundant rendering, repeated parsing, overfetching, or a poor algorithm. Consider larger cuts when they remove the actual bottleneck.

Compare before and after on the same workload and environment. Account for warmup, caching, data size, and measurement variation where they matter. Record units, run conditions, and enough samples to distinguish a real effect from noise. Check output correctness and relevant tradeoffs such as memory, startup cost, or tail latency.

Keep a change on its demonstrated merits. If results are inconclusive, say so and avoid a numerical improvement claim. When a representative environment is unavailable, separate local proxy measurements from production expectations and state what remains unverified.

## Agent DX and verification loops

Identify the concrete obstacle between a fresh checkout or worktree and a trustworthy result. Useful targets include broken bootstrap commands, undocumented prerequisites, shared ports or state between worktrees, unavailable logs, unreliable fixtures, inaccessible test accounts, and unclear preview or end-to-end test entry points.

Choose the smallest durable fix: a repeatable setup or smoke command, isolated test data, worktree-specific configuration, better failure output, or concise repository guidance. Reuse the project's tools. Add only operationally useful facts to agent instructions, such as working commands, required services, and known constraints.

Run the improved path from a fresh worktree or equivalent clean state when practical; otherwise disclose the narrower validation. Verify the relevant startup, test, or user journey. Do not call missing credentials or a skipped end-to-end run successful verification, and do not weaken checks to make the loop green.
