# Behavior evaluation

The [cases](behavior-cases.json) contain sanitized contexts and requests, plus evaluator-only acceptance observations. They are a behavioral test set, not evidence that a test has passed.

For an old/revised comparison:

1. Pin the baseline and candidate revisions. Prepare separate skill copies and disposable output directories. Keep private profiles absent for generic trials; opt in explicitly for profile-specific trials.
2. Use the same provider, model, effort/options, raw context, request, and tools for each pair. Give each trial a fresh context. Load its named skill and follow references relevant to that request.
3. Give the acting agent only the raw context/request and skill location. Keep the expected observations and implementation rationale with the evaluator. Ask it to complete the actual request, writing artifacts only to its disposable directory. No production access, publishing, credential use, application installs, or real deployment is required.
4. Retain the agent output, artifact paths, actual model/options, revision, and unavailable tools. A no-tool reasoning trial establishes response/decision behavior only. For visual work, inspect the actual generated options; do not infer fidelity from an agent saying it matched the brief.
5. An independent evaluator scores each expected observation as pass, fail, or not exercised, citing the output or artifact. Compare the pairs and record regressions as well as improvements. Do not compute a success rate that counts not-exercised criteria as passing.

The structural validator and installer tests exercise deterministic package properties. They do not replace these trials or prove behavior on every provider. Keep public reports limited to sanitized requests and outcomes; raw personal history and installation manifests remain local.
