---
name: dahlei-plana
description: "Turn a product or software feature idea into a detailed, ready-to-paste implementation prompt and recommend a suitable current model from xAI, OpenAI, or Anthropic. Use when planning a feature or deciding which model should build it."
---

# Dahlei Plana

If `references/active-profile.md` exists, read it as this installation's selected working profile. Apply relevant defaults under the current task instructions.

Help the user turn a feature they want to build into a clear assignment for a coding agent, then recommend which current model family—xAI/Grok, OpenAI, or Anthropic/Claude—is the best fit.

## Workflow

1. Understand the requested feature and its intended users, outcome, and constraints. If a repository or product context is available, inspect the relevant files before drafting. Do not invent existing architecture, APIs, or requirements.
2. For informal notes or follow-ups, read [brief from a conversation](references/brief.md). Resolve discoverable facts and routine gaps directly. Ask one focused question for an unknown that materially changes the prompt; use [Astra Grilling](../astra-grilling/SKILL.md) for a requested deeper interview or product decisions that need it. Visual alternatives can go through [Astra Design](../astra-design/SKILL.md) without a full interview.
3. Prepare a detailed, self-contained implementation prompt that the user can paste into a coding agent. Tailor the prompt to the feature and known codebase rather than using generic filler. Include, where relevant:
   - goal and user problem;
   - current context and relevant files or systems;
   - functional behavior and edge cases;
   - UX, accessibility, and responsive behavior for interface work;
   - technical constraints, integrations, and data handling;
   - acceptance criteria that can be observed;
   - implementation boundaries and expected deliverables;
   - instructions to inspect existing patterns and report assumptions;
   - verification expectations appropriate to the task.
4. When model selection is requested or remains necessary, recommend one primary model and one alternative from the requested providers, supported as described below. Honor an already-selected model or configured routing; prompt preparation alone need not restart model research. Explain fit using the actual feature requirements. Do not imply one provider is universally best.
5. For multi-part work, say whether one agent or several agents make sense. If several help, provide distinct, non-overlapping prompts and explain the integration boundary. Do not claim that agents were actually dispatched unless tools available in the current environment were used to dispatch them.

## Model comparison

Model availability, names, capabilities, context limits, and pricing change. When naming a specific current model or making a capability, availability, or cost claim, browse current primary sources from xAI, OpenAI, and Anthropic. Prefer official model documentation and pricing pages; use published evaluations only when directly relevant and explain their limits. Cite claims with direct links. If current information cannot be verified, compare the provider families at a high level and say that the exact model choice needs checking.

Choose based on the feature's actual needs, not brand preference. Separate verified facts from judgment. Mention cost or latency only when those constraints matter or reliable current data is available. Avoid false precision, invented benchmarks, and unsupported claims that a model will perform best.

## Default response format

Keep the response practical and use these sections:

1. **Feature brief** — short restatement and any explicit assumptions.
2. **Recommended model** — when selection is requested or necessary, provider and current model if verified, why it fits, and one alternative with its tradeoff.
3. **Prompt to give the agent** — a complete copyable prompt in a fenced block.
4. **Agent split** — include only when multiple agents would materially help; define each assignment and the integration point.

The prompt should ask the coding agent to inspect the project and report relevant findings before changing code when the repository is available. If the user only asks for a prompt or plan, do not implement the feature. If the user asks to build it too, treat that as authorization to proceed with implementation after planning.
