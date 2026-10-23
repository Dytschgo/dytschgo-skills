# Motion

## Give movement a job

Use movement to explain a state change, connect related elements, confirm an action, or tell a spatial story. Functional UI needs prompt feedback and continuity. A cinematic site may justify a dominant hero mechanism and a substantial scroll sequence, with stillness elsewhere. Treat that as a budget to reason about, not a required quota.

Prove the semantic, static layout first. Define the main mechanism's initial, active, and final states; trigger; direction of travel; duration or progress mapping; interruption behavior; and mobile/reduced-motion fallback. Build and verify the riskiest mechanism before extending it throughout the page.

## Choose an engine from the existing stack

| Need | Starting point |
| --- | --- |
| Small hover, focus, state or disclosure transition | CSS or platform animation |
| Component presence and coordinated layout changes | Existing framework animation system |
| Viewport entry | IntersectionObserver or installed equivalent |
| Complex timeline, pinning, or media scrubbing | A timeline engine such as GSAP when justified |
| Essential interactive 3D | An existing 3D renderer, with explicit fallback and resource budget |

Confirm installed versions and current feature support. Native scroll or view-transition APIs can be progressive enhancements when supported. Do not add multiple engines to animate the same element or assume a browser support claim from a catalog is current.

## Implementation invariants

- Keep continuous scroll and pointer input out of component render state. Use the engine's values, refs, or a scheduled rendering loop; reserve application state for discrete changes.
- Give each animated property one owner. Scope selectors, listeners, timelines, and observers; clean them up on unmount and route changes.
- Prefer transform and opacity where they achieve the result. Masks, clipping, filters, and shaders can be expressive but may be expensive; measure them rather than assuming compositor performance.
- Keep essential content visible when initialization fails. Do not trap scroll, disable normal navigation, or hide the reading experience behind an entrance timeline.
- Stop offscreen or hidden-tab rendering. Bound canvas pixel ratio, texture sizes, frame caches, particle counts, and media preloading to a realistic device budget.
- Make rapid toggles, interrupted transitions, resizing, and reverse scrolling converge on the correct state. Animations must not delay acknowledgment of an action.

## Media and scroll stories

Define the trigger region and local progress range, the values it maps to, and what happens when scrolling backwards or jumping with an anchor. Test short viewports and dynamic mobile browser chrome. Prefer normal vertical flow when a pinned scene becomes awkward on mobile.

For video, preserve an appropriately cropped poster until a useful frame is decoded; keep text in HTML above it. Account for unavailable autoplay, failed media, muted inline playback, and seeking behavior. Avoid setting video time on every raw scroll event; test the codec and seek granularity on target devices.

For frame sequences, load a bounded working set rather than decoding every full-resolution frame. For 3D, defer heavy initialization until needed and provide a meaningful static alternative. Do not make the visitor wait for a scene merely to reach navigation or the main action.

## Accessibility and verification

Reduced motion is an alternate complete presentation: replace parallax and scrubbed media with a meaningful static composition, eliminate unnecessary loops and cursor physics, and preserve clear feedback. Merely shortening a large movement is insufficient.

Support keyboard and touch alternatives to hover/pointer effects. Keep animated text understandable to assistive technology and selectable when appropriate. Avoid flashing, unrequested audio, and perpetual motion without suitable controls.

Inspect startup, rapid interaction, reverse scrolling, resize, reduced motion, missing assets, and route cleanup as applicable. Measure stutter and resource use on representative hardware or disclose the limits of emulation. A screenshot establishes composition, not smoothness.
