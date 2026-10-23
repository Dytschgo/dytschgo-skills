# Worker routing

This is the single source of the collection's preferred worker IDs. These are author preferences, not availability, price, or capability guarantees. The primary session keeps its current model. Explicit task choices override these defaults.

| Role | Preferred model ID | Work |
| --- | --- | --- |
| Luna | `gpt-6-luna` | Bounded context gathering, extraction, summaries, simple checks |
| Sol | `gpt-6.1-sol` | Implementation, integration, tests, debugging, architecture, security, independent technical review |
| Coordinator | Existing primary session | Scope, decisions, integration, final acceptance |

Read the live catalog before delegation. Pass the actual provider instance, model ID, and supported options in tool arguments; a role name or prompt sentence does not select them. Record the returned selection. Honor inherited options according to the runtime; do not silently map unsupported effort or service settings to different values.

If a requested/default model is unavailable, continue useful independent work and disclose the limitation. Use a replacement only within explicit session authorization; ask when a necessary assignment has no authorized replacement. Do not silently use an older-generation fallback. A bounded support worker does not replace consequential technical review. Never claim independent review when no independent reviewer ran.
