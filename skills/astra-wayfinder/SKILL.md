---
name: astra-wayfinder
description: Chart an effort too big for one grilling pass as a map of decision tickets, then resolve one ticket per session until the route is clear. Use when the frontier will not close in this session. Do not build the destination here.
---

# Astra Wayfinder

A loose idea has arrived, too big for one agent session, and the way to the destination is still fog. Chart that way as a shared map of decision tickets, then resolve them until nothing is left to decide before someone does the thing. Behavior follows Matt Pocock's wayfinder skill (MIT): https://github.com/mattpocock/skills/blob/v1.3.1/skills/engineering/wayfinder/SKILL.md

Naming the destination is the first act. It might be a spec to hand off, a decision to lock before planning, or a change made in place. The destination shapes every ticket.

## Plan, do not build

Each ticket resolves a decision. The map is done when the way is clear and nothing is left to decide before someone goes and does the thing. The pull to just build is usually the signal that you have reached the edge of the map and should hand off. An effort can override that in its Notes and carry execution onto the map. Absent that override, produce decisions, not deliverables.

## Refer by name

Every map and ticket has a title. In anything a person reads, use that title, never a bare id, number, or slug. The id and URL ride inside the linked name. They do not stand in for it.

## The map

The map is one issue labelled `wayfinder:map`. Its tickets are child issues. The map is an index, not a store. It lists decisions and points at the tickets that hold the detail. A decision lives in exactly one place, its ticket. The map gists it and links. It does not restate it.

Open tickets are not listed in the body. They are open children, found by query.

Use the tracker this repo already documents. If none is documented, use GitHub issues when `gh` can see the current repo. Otherwise use local markdown: `.scratch/<map-slug>/map.md` plus one file per ticket at `.scratch/<map-slug>/tickets/<NN>-<slug>.md`, with blockers named in the body. Say which you used.

```markdown
## Destination

What reaching the end of this map looks like. One or two lines. Every session reads this before choosing a ticket.

## Notes

Domain, skills every session should pull, and standing preferences for this effort.

## Decisions so far

- [Closed ticket title](https://tracker.example/ticket): one-line gist of the answer

## Not yet specified

In-scope fog you cannot ticket yet. It graduates as the frontier advances.

## Out of scope

Work ruled beyond the destination. Closed. It does not graduate.
```

### Tickets

Each ticket is a child of the map. Its body is one question, sized to a single agent session of about 100K tokens:

```markdown
## Question

The decision or investigation this ticket resolves.
```

Each ticket carries one type label: `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`. Local files use a **Type** line with the same word.

Claim a ticket by assigning it to the person driving the map, before any work, so a concurrent session skips it. An open unassigned ticket is unclaimed.

Blocking uses the tracker's native dependency when it has one, so the frontier shows up in the tracker's own UI. Only a tracker with no native blocking falls back to a body line. A ticket is unblocked when every ticket blocking it is closed. The frontier is the open, unblocked, unclaimed children.

The answer is not part of the body. It is recorded when the ticket resolves. Link assets created along the way. Do not paste them in.

## Ticket types

A ticket is either HITL, worked with a person who speaks for themselves, or AFK, driven by the agent alone. A HITL ticket resolves only through that live exchange. Do not answer the human's side for them.

- **Research** (AFK). Read documentation, a third-party API, or a local knowledge base to surface a fact a decision is waiting on. Record the finding on the ticket. Do not pull a separate research skill.
- **Prototype** (HITL). Make a cheap, rough artifact to react to: an outline, a stub, or a small UI or logic sketch. Link it. Do not pull a separate prototype skill. Use this when the question is how it should look or behave.
- **Grilling** (HITL). The default. Pull [Astra Grilling](../astra-grilling/SKILL.md). Where the repo has a glossary or ADRs, use those terms and update them when a decision changes a term.
- **Task** (HITL or AFK). Manual work that must happen before a decision can be made: sign up for a service, provision access, move data so its shape can be seen. It earns a place by unblocking a decision, not by delivering the destination. Drive it alone when you can. Otherwise hand the person a precise checklist. The answer records what was done and the facts later tickets need.

## Fog of war

Do not chart what you cannot yet see. Fog is the dim view of decisions you can tell are coming but cannot pin down because they hang on open questions. Resolving a ticket clears the fog ahead and graduates whatever is now specifiable into fresh tickets, until the way to the destination is clear and no tickets remain.

**Not yet specified** holds that dim view: the suspected question, the area to revisit. It is in scope, just not sharp enough to ticket. Write it as loosely or as fully as the view allows.

Ticket when you can state the question precisely now, even if it is blocked and you cannot act yet. Leave it in Not yet specified when you cannot phrase it that sharply. Do not pre-slice fog into ticket-sized pieces. One patch may become several tickets, or none.

Not yet specified excludes what is already decided, what is already a live ticket, and what is out of scope.

## Out of scope

Fog only gathers toward the destination. Work beyond the destination is not fog. It goes in **Out of scope**: consciously ruled out of this effort. It does not graduate unless the destination is redrawn, and then as a fresh effort, not a resumption.

Ruling something out is a scoping act, not a step on the route. If a ticket that already exists sits past the destination, close it and leave one line in Out of scope: the gist, why it is out, and a link to the closed ticket. Do not put it in Decisions so far. A scope boundary is not a step on the route.

## Chart the map

The user invokes with a loose idea. [Astra Grilling](../astra-grilling/SKILL.md) pulls this skill when one interview cannot close the frontier. Do this, then stop. Charting resolves nothing by hand.

1. Name the destination with [Astra Grilling](../astra-grilling/SKILL.md). The destination fixes the scope, so it is settled first. Use the glossary and ADRs when they exist.
2. Map the frontier with another grilling pass, breadth-first. Fan across the space. Surface the open decisions and the first steps that are takeable now. If this surfaces no fog, the way is already clear and the journey fits one session. Stop and ask how the user wants to proceed. Do not create a map.
3. Create the map (`wayfinder:map`). Fill Destination and Notes. Leave Decisions so far empty. Sketch the fog into Not yet specified.
4. Create the tickets you can specify now as children, then wire blocking edges in a second pass. Issues need ids before they can name each other. What you cannot yet specify stays in Not yet specified.
5. For each research ticket you just created, start a subagent that resolves it in parallel and records the finding where the ticket can point at it.
6. Stop.

## Work one ticket

The user invokes with a map (URL or number). A ticket is optional. Without one, you pick the next decision.

Never resolve more than one ticket in a session, except research tickets, which may run alongside.

1. Load the map, the low-resolution view, not every ticket body.
2. If the user named a ticket, use it. Otherwise take the first frontier ticket. Claim it before any work.
3. Resolve it. Fetch the full body of a related or closed ticket when you need it. Pull whichever skills the Notes name. If in doubt, pull [Astra Grilling](../astra-grilling/SKILL.md).
4. Post the answer as a resolution comment, close the issue, and append a one-line pointer to Decisions so far.
5. Add tickets the answer surfaced (create, then wire). Graduate fog the answer made specifiable, and delete that patch from Not yet specified so it lives only as the new ticket. If the answer shows a ticket sits beyond the destination, rule it out of scope instead of resolving it on the route. If the decision invalidates other tickets, update or close them.

Other sessions may be editing the tracker at the same time. Expect that.

When the route is clear, stop. Do not start the build. If the destination was a spec, pull [Astra To Spec](../astra-to-spec/SKILL.md). When this session should continue in a fresh agent, pull [Astra Handoff](../astra-handoff/SKILL.md).
