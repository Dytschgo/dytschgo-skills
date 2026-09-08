---
name: astra-design
description: Design, build, review, and refine websites and product interfaces with deliberate art direction, usable interactions, and verified implementation. Use for landing pages, portfolios, dashboards, app UI, design systems, responsive fixes, accessibility, and purposeful motion. Excludes backend-only work and standalone image or document creation.
---

# Astra Design

Make the interface serve its actual audience and give its visual choices a reason. Carry design through working implementation and rendered verification when implementation is requested. A review request produces findings; a planning request produces a plan.

## Establish the scope

Inspect the repository instructions, relevant routes, components, tokens, assets, dependencies, and documented preview/check commands. Read existing design records when present. Inspect the current rendered surface or supplied reference before proposing a visual change; if only screenshots are available, check their relevance against the current source.

Distinguish the assignment:

- **Refine or fix:** preserve the current identity, content, behavior, and surrounding UI; repair the requested problem.
- **Create or redesign:** establish a coherent direction within the user's brand, product truth, functionality, and technical constraints. A redesign can replace the old visual language; an absent design document does not make an existing product a blank slate.
- **Review or plan:** investigate and give concrete findings or an implementation brief without editing unless requested.

Infer the audience, main task, primary action, and constraints from evidence. Ask only when a missing answer materially changes the outcome; otherwise state a useful assumption and proceed. Do not add approval checkpoints, features, deployment, or mandatory tooling as a side effect of design work.

## Choose the relevant guidance

Choose by the surface's purpose, not the company's category. A developer tool's homepage and its settings panel need different treatment. Read only the references needed for the next decision.

| Work | Reference |
| --- | --- |
| Establishing direction, typography, palette, spacing, or tokens | [Foundations](references/foundations.md) |
| Dashboards, editors, forms, navigation, tables, native app UI | [Product interfaces](references/product-ui.md) |
| Marketing, portfolios, case studies, reading and gallery surfaces | [Websites and content](references/websites.md) |
| Animation, scroll stories, cinematic media, ambitious interactions | [Motion](references/motion.md) |
| Critique, audit, polish, hardening, responsive or performance work; final verification | [Review and verification](references/review.md) |
| A specific palette, font, chart, UX pattern, or stack needs research | [Optional design lookup](references/design-lookup.md) |

For a narrow fix, inspect its context and load the relevant reference directly. Do not generate a new design system, brainstorm unrelated concepts, or load the full catalog.

## Commit to a direction

For substantial new work or redesign, form a compact working brief: audience and task; one-sentence visual thesis; composition and focal element; type and color roles; content and asset needs; responsive and motion strategy. Share the material decisions briefly, then implement within the authorized scope.

Tune three independent axes when useful: **expression** (familiar to experimental), **motion** (still to choreographed), and **density** (open to compact). Words or a 1–10 scale are enough. Infer them from the task; there is no universal preset. A dense operational tool can have low motion and a distinctive identity.

Derive character from the product's content, materials, vocabulary, and usage scene. Check whether the direction could fit any unrelated product unchanged. Give expressive work a memorable focal idea; give operational work recognizable controls and efficient task flow. Do not make every component novel.

The user's visual brief and established brand take priority over style warnings. Cards, gradients, familiar fonts, serif accents, or muted palettes are legitimate when they fit. Avoid selecting them by habit or banning them regardless of context.

## Build a complete interface

- Reuse the existing design system and stack. Prefer native controls and the project's accessible primitives for complex behavior. Aesthetic inspiration is not a reason to install a new component library.
- Establish semantic structure, real content, working navigation, and the primary flow before effects. Keep the static and reduced-motion presentation complete.
- Use coherent tokens for surfaces, text, actions, status, spacing, type, geometry, and motion. Extract repeated components when real reuse appears; avoid speculative abstraction.
- Design relevant loading, empty, error, success, disabled, and permission states along with the happy path. Keep action names and feedback consistent.
- Choose assets deliberately: inspect existing assets first; use code-native graphics for precise structure and data, raster imagery for photographic or illustrative content. Keep interface text editable. Verify asset rights and avoid invented product screenshots or claims.
- Account for narrow widths, long labels, zoom, keyboard input, touch, themes, and interrupted actions. Accessibility and functionality constrain the implementation, including ambitious visual work.
- Check installed versions before using framework APIs. Consult current official documentation when API details, browser support, or standards matter. Bundled examples are dated guidance, not compatibility guarantees.

Use the tools actually available. Browser inspection, image generation, and deployment retain their own tool requirements; this skill grants no capabilities or permissions. Do not require a separate design skill, background engine, network download, or agent team to begin work.

## Verify and finish

Use [review and verification](references/review.md) for checks proportional to the change. Inspect the rendered result, exercise the primary flow and affected states, and run the repository's relevant checks. Batch visual findings, fix the meaningful issues, then confirm. Continue when defects remain; stop when acceptance is met rather than opening an indefinite aesthetic revision loop.

Preserve useful decisions in the project's existing design record when a system changed materially. Do not create competing design documents or ask to save patterns after every small edit.

Report the concrete result, the important design choice, verification performed, and any material limitation. Distinguish rendered evidence from source inspection and assumptions. Never claim mobile, accessibility, performance, or browser verification that was not performed.
