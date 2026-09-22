---
name: astra-design
description: Design, build, or review websites and product interfaces. Use for UI creation, redesign, visual refinement, responsive fixes, accessibility, or motion; not for backend-only work or standalone images and documents.
---

# Astra Design

Make the interface fit its audience, task, brand, and working product. Match the requested mode: a review produces findings, a plan produces a plan, and implementation includes rendered verification.

## Scope and direction

Inspect relevant repository instructions, source, assets, and the current rendered surface or supplied reference. For a narrow fix, preserve existing identity and behavior. For a new interface or redesign, choose a coherent direction within the user's content, brand, and technical constraints. Ask only when a missing answer would materially change the result.

For substantial work, decide the audience and primary task, visual idea, composition, type and color roles, content and assets, responsive behavior, and motion. Share material decisions briefly, then implement. The user's brief and established brand take priority over generic style preferences.

## Load guidance when needed

Read only the reference relevant to the next decision:

| Task | Reference |
| --- | --- |
| Direction, typography, palette, spacing, tokens | [Foundations](references/foundations.md) |
| Dashboards, editors, forms, navigation, tables, native UI | [Product interfaces](references/product-ui.md) |
| Marketing, portfolios, case studies, reading surfaces | [Websites and content](references/websites.md) |
| Animation, scroll stories, cinematic or complex interactions | [Motion](references/motion.md) |
| Critique, polish, responsive or performance work; final checks | [Review and verification](references/review.md) |
| A specific design or stack question needs catalog research | [Optional design lookup](references/design-lookup.md) |

Do not load the full catalog for ordinary work or create a new design system for a narrow fix.

## Implement and verify

Reuse the project's stack and design system. Build semantic structure, real content, working navigation, and the primary flow before effects. Keep static and reduced-motion presentations usable. Cover relevant loading, empty, error, success, disabled, and permission states. Choose assets deliberately and keep interface text editable. Check narrow widths, long labels, keyboard and touch use, and zoom. Consult current official documentation when framework or browser details matter.

When moving or removing controls, follow the [interaction-preservation checks](references/review.md#preserve-interactions-through-ui-changes): verify reachability across affected content types and loading/error states, navigation state, and keyboard focus. Evidence must show the actual changed surface and state.

Use available tools within their own permissions. This skill does not require another design skill, agent team, or deployment. For implementation, inspect the rendered result, exercise affected flows and states, run relevant project checks, fix meaningful issues, and stop when the requested result is met. Report what changed and what was actually verified; distinguish rendered evidence from source inspection.
