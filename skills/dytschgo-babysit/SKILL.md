---
name: dytschgo-babysit
description: "Watch an open PR through CI and review until it is ready or needs the user. Use when the user says 'babysit this PR', 'watch the PR', or 'keep it green'. Never merges."
---

# Dytschgo Babysit

Keep one open PR moving: react to failing checks, review bots, human comments, and conflicts, and stop when it is ready or stuck.

## One watcher

Run exactly one watcher per PR, owned by the thread that owns the PR.

- In T3 Code, use its PR watch tool and end your turn; it wakes you on events. Unwatch before you stop or ask a question.
- Elsewhere, use one long-running wait command, such as `gh pr checks <pr> --watch` or a `pr-wait`-style helper if the harness provides one.
- Never write your own sleep or polling loop. Never stack two watchers on one PR. Delegated children (reviewers, council members) never watch.
- If the watcher stops on a rate limit, check `gh api rate_limit` and wait for the reset with one background command.

## Each wake

1. Read the PR's current head. Ignore checks, comments, and reviews older than your latest push; they describe old code.
2. Failing check: open the log, reproduce locally when you can, fix in scope, push. Classify a flake only with evidence from base or sibling runs.
3. Bot finding: verify the claim against the code before acting. Fix real ones. Dismiss wrong ones with a one-line reason in the thread, signed per the [attribution format](../dytschgo-coordinate/references/github-and-review.md#attribution-for-agent-comments).
4. Human change request: fix it if it is in scope; otherwise reply with the trade-off and leave it for the user.
5. Conflict: rebase or merge the base in, rerun affected proof, push with `--force-with-lease` on this branch only.
6. Re-check the [merge gate](../dytschgo-coordinate/references/github-and-review.md#merge-gate). Passed: stop and report Ready. Otherwise watch again.

Keep the PR small. A review comment asking for new features becomes a follow-up note, not more diff.

## Limits

Never merge, enable auto-merge, or enter a merge queue unless the user separately said "merge". Three failed fixes on the same check means stop and report Blocked with the evidence. Do not resolve human threads for the reviewer.

Report the verdict (Ready, Waiting, Blocked), PR link, head SHA, what you fixed, what you dismissed and why, and "Not merged."
