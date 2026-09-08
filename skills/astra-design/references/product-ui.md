# Product interfaces

## Organize around the task

Map the principal flow with its entry, decision, action, feedback, and recovery. Make current location and available next actions clear. Retain familiar navigation, control semantics, and platform expectations; brand expression should not increase the time needed to recognize Save, Search, or Back.

Choose density from workload. A frequent operator may need compact rows and visible comparison; occasional setup may need explanation and fewer simultaneous choices. Avoid replacing useful data with oversized summary cards or adding charts merely to make a screen resemble a dashboard.

## Interaction contracts

Prefer a native control when it meets the need; use the existing accessible primitive for complex behavior. For a custom control, explicitly cover its keyboard contract, accessible name and state, focus management, and pointer behavior. Focus trapping applies to modal contexts, not every popover.

Keep popovers and menus visible outside clipping ancestors. Check escape and dismissal behavior, scroll position, focus return, touch input, and whether an overlay actually needs to interrupt the task. Preserve native browser and platform affordances unless a custom version has a clear benefit.

Forms need persistent labels, useful input types, and recoverable validation. Explain errors beside the field and provide a summary when a long form benefits. Preserve entered values after failures. Associate errors with controls and move or announce focus appropriately without disrupting typing.

Represent asynchronous state honestly. Prevent accidental duplicate submissions, preserve a route to retry, and distinguish failure from an empty result. Use optimistic updates only when failures can be reconciled and the operation permits them. A loading indicator, skeleton, or retained previous result should fit the wait; no single treatment suits every request.

Use plain, consistent action names and outcome messages. Empty states explain what belongs here and the useful next action. Distinguish first use, no search matches, missing permission, and unavailable data. Avoid exposing backend details when they do not help recovery.

## Data and complex surfaces

Choose charts by the question: compare categories, show a trend, inspect distribution, reveal relationships, or report an exact value. Make units, time windows, scale, missing data, and selection visible. Use labels or symbols alongside color, and provide a readable summary or tabular alternative when needed.

For tables, preserve comparison and row identity across filtering, sorting, selection, pagination, and resizing. Use scoped horizontal scrolling when the data requires two-dimensional reading; do not hide essential columns solely to eliminate overflow. Label the region and make its controls reachable.

Virtualization can help large collections, but verify keyboard navigation, accessible semantics, scroll anchoring, and any required browser search or export behavior. Measure the bottleneck before adding it.

## Responsive and native behavior

Adapt the structure to the available space rather than shrinking a desktop screenshot. Decide what collapses, reorders, becomes scrollable, or moves behind a clearly named action. Keep primary tasks reachable and preserve meaningful reading order.

For native or cross-platform apps, inspect the target framework and shipped device classes first. Respect safe areas, system back navigation, text scaling, keyboard insets, platform menus, input conventions, and assistive technology. Use platform components and current platform guidance when web patterns would mislead. Browser-only checks cannot establish native accessibility.

Verify long and translated labels, mixed-direction content when relevant, high-contrast modes, changed permissions, unsaved changes, empty collections, delayed responses, and interrupted operations according to the surface's real risks. Do not invent every possible state for a static component.
