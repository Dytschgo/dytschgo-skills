# Worker routing

This is the single source of the collection's preferred worker IDs. These are author preferences, not availability, price, or capability guarantees. The primary session keeps its current model. Explicit task choices override these defaults.

| Role | Preferred model ID | Work |
| --- | --- | --- |
| Luna | `gpt-6-luna` | Bounded context gathering, extraction, summaries, simple checks |
| Sol | `gpt-6.1-sol` | Implementation, integration, tests, debugging, architecture, security, independent technical review |
| Coordinator | Existing primary session | Scope, decisions, integration, final acceptance |

## Effort and speed

Match each worker's setting to its assignment; the maximum is not a default. Spend tokens where judgment changes the outcome.

- Low effort: mechanical or already-decided work, such as extraction, renames, formatting, applying a settled plan, or simple checks.
- Medium or high effort: judgment calls, such as implementation with open choices, debugging, integration, and technical review.
- Top effort: only when stakes or difficulty justify it, such as high-risk review, security, migrations, or a problem that resisted lower settings.
- Fast variants or fast service tiers: not by default. Use them only for trivial, latency-bound work when the user explicitly asks for speed.

Record the chosen effort with each assignment. Raise it after a failed attempt rather than starting at the top.

Read the live catalog before delegation. Pass the actual provider instance, model ID, and supported options in tool arguments; a role name or prompt sentence does not select them. Record the returned selection. Honor inherited options according to the runtime; do not silently map unsupported effort or service settings to different values.

If a requested/default model is unavailable, continue useful independent work and disclose the limitation. Use a replacement only within explicit session authorization; ask when a necessary assignment has no authorized replacement. Do not silently use an older-generation fallback. A bounded support worker does not replace consequential technical review. Never claim independent review when no independent reviewer ran.
