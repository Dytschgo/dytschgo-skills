# Presentation and delivery

## Pick the available surface

In T3 Code, use the available `html_preview` to inspect and `html_render` to display the finished document. Discover the actual exposed names and schemas; do not assume another CLI provides them. Follow the renderer's theme, width, background, and height contract. T3 expects a transparent outer page, fluid layout, and content-driven height, without viewport-height units. A console panel may have its own dark surface.

When inline rendering is unavailable, save a standalone HTML file and use an available browser or the project's supported viewer. Report if only source inspection was possible. Do not install a browser/framework, create a server, or deploy merely to show a self-contained report. A regular file link remains a useful deliverable.

## Content and interaction

Use source-backed content instead of invented dashboard numbers. Keep findings, assumptions, recommendations, and passed checks distinguishable. A routing map describes instruction referrals, not automatic function calls. Show conditions and separate actual source links from suggested journeys. A claimed execution trace needs retained evidence of skills actually loaded.

Use real buttons and labeled native inputs, visible focus, and readable contrast. Give each option an exact stable identity; keep selected state in sync with the detail panel. Links open the named source, not a guessed target. Avoid flashing, animated scanlines, and decorative status that implies work is running.

Treat source text as data. Build content with `textContent` or escape HTML. When embedding JSON in a script element, escape `<` as `\u003c` so source text cannot terminate the element. Do not interpolate logs, user text, or filenames into executable JavaScript. Copy/download controls must report failure honestly and must not launch external work.

## Verify the artifact

Render the actual saved content at a desktop/chat width and a narrow phone width; inspect the important alternate states. Exercise selectors and filters, check that all requested items remain reachable, and inspect wrapping and horizontal overflow. Keyboard-test the changed controls when the available browser supports interaction. Automated DOM checks supplement screenshots; neither establishes full accessibility conformance.

Keep reports current by labeling their source revision or content fingerprint and the time of any live observation. Do not attach a confidence percentage without a defined measurement. Preserve downloadable standalone behavior; rebuilding from serialized HTML must not duplicate controls or depend on an injected host theme.
