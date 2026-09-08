# Foundations

## Turn context into visual decisions

Identify what people need to notice, understand, and do. Study the actual domain before choosing a style: a logistics operator needs exceptions and status; a furniture buyer needs material, scale, and useful photography. Translate that difference into structure as well as color.

For a new visual direction, choose a focal element and explain how hierarchy makes it lead. Consider an alternative only when it would resolve a real uncertainty. A small rendered specimen can help compare type, surfaces, or a key interaction; it should advance the actual implementation rather than become a separate mockup project.

Keep familiar patterns where they reduce learning. On an expressive surface, spend visual emphasis where the subject is strongest and let quieter areas support it. On an existing product, follow its current decisions unless changing them is part of the task.

## Typography and text resilience

Choose fonts for brand, reading context, language coverage, density, and loading cost. One good family can carry an application. Two can create meaningful editorial contrast. Reuse established fonts before sourcing new ones; confirm licensing and available weights.

Define a small role-based scale. Product UI generally needs smaller steps than an editorial hero; hierarchy can also come from weight, position, and space. Keep supporting text readable instead of making everything subordinate tiny or low contrast. Use tabular numerals for changing or aligned numerical values.

Test real headlines and labels at intermediate widths, with the actual font loaded. Use sensible text measures for prose, and allow compact UI to follow its content. Fluid display sizing can suit a website; fixed rem-based roles often suit tools.

For wrapping bugs, repair the container before the text: inspect grid minimums, flex shrinking, width constraints, and intrinsic sizing. Let a collection of chips wrap while keeping ordinary short chip labels intact. Give genuinely long content a bounded wrapping or truncation strategy with a usable way to obtain the full value. Avoid blanket nonbreaking spaces, forced line breaks, or overflow hiding to make one screenshot pass. Balanced heading wrapping is an enhancement, not a guaranteed line-break algorithm.

## Color, surfaces, and geometry

Start with roles: canvas, raised surface, primary and secondary text, border, action, focus, selection, and semantic feedback. Tie components to these tokens, with foreground/background pairs that work in the supported themes. Token names should describe stable roles; poetic naming is optional.

Use color to distinguish action, selection, status, and identity. Do not spend all available contrast on secondary decoration. Neutral or colorful directions can both work; a second accent should have a clear purpose. Measure readable contrast, especially muted text, outlined controls, and text over changing imagery.

Define an understandable depth system. Distinguish overlays from their surroundings and preserve control boundaries. Borders, shadows, and tonal surfaces may work together when they express structure. There is no universal requirement for darker inputs, identical sidebar backgrounds, or a particular corner radius.

Choose a small spacing scale and densities appropriate to the work. Group related controls more tightly than unrelated sections. Use radius and padding in proportion to component size, and inspect nested geometry rather than applying one radius to everything. Optical adjustment is legitimate when it improves alignment without fragmenting the system.

## Composition and component reuse

Choose structure from the relationship in the content: comparison, sequence, hierarchy, continuous narrative, or independent objects. A table can outperform cards for repeated-field comparison; cards can be appropriate for individually actionable objects. Numbering belongs to meaningful sequences.

Reuse the project's component vocabulary. For complex widgets, reuse accessible behavior primitives and style them within the current system. If a named design system is explicitly required, inspect its actual implementation and supported packages. A framework choice alone does not require a component-system migration.

Keep one owner for repeated styling and behavior. Add a component or variant when actual repeated use or meaningful state justifies it. Avoid creating a design-system framework for a single page or duplicating long utility strings across every instance.
