---
name: dahlei-plana
description: Turn a product or software feature idea into a detailed, ready-to-paste implementation prompt and recommend a suitable current model from xAI, OpenAI, or Anthropic. Use when planning a feature or deciding which model should build it.
---

# Dahlei Plana

Help the user turn a feature they want to build into a clear assignment for a coding agent, then recommend which current model family—xAI/Grok, OpenAI, or Anthropic/Claude—is the best fit.

## Workflow

1. Understand the requested feature and its intended users, outcome, and constraints. If a repository or product context is available, inspect the relevant files before drafting. Do not invent existing architecture, APIs, or requirements.
2. Resolve gaps from available context. Ask a concise question only when an unknown would materially change the prompt or recommendation. Otherwise state a reasonable assumption inside the prompt so the user can correct it. When the feature's shape is still an open design decision, pull [Astra Grilling](../astra-grilling/SKILL.md) before drafting the prompt.
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
4. Recommend one primary model and one alternative from the three requested providers. Explain the fit using the actual feature requirements (for example, coding and tool use, long-context repository work, multimodal input, structured reasoning, speed, or cost when relevant). Do not imply one provider is universally best.
5. For multi-part work, say whether one agent or several agents make sense. If several help, provide distinct, non-overlapping prompts and explain the integration boundary. Do not claim that agents were actually dispatched unless tools available in the current environment were used to dispatch them.

## Model comparison

Model availability, names, capabilities, context limits, and pricing change. When naming a specific current model or making a capability, availability, or cost claim, browse current primary sources from xAI, OpenAI, and Anthropic. Prefer official model documentation and pricing pages; use published evaluations only when directly relevant and explain their limits. Cite claims with direct links. If current information cannot be verified, compare the provider families at a high level and say that the exact model choice needs checking.

Choose based on the feature's actual needs, not brand preference. Separate verified facts from judgment. Mention cost or latency only when those constraints matter or reliable current data is available. Avoid false precision, invented benchmarks, and unsupported claims that a model will perform best.

## Default response format

Keep the response practical and use these sections:

1. **Feature brief** — short restatement and any explicit assumptions.
2. **Recommended model** — provider and current model if verified, why it fits, and one alternative with its tradeoff.
3. **Prompt to give the agent** — a complete copyable prompt in a fenced block.
4. **Agent split** — include only when multiple agents would materially help; define each assignment and the integration point.

The prompt should ask the coding agent to inspect the project and report relevant findings before changing code when the repository is available. If the user only asks for a prompt or plan, do not implement the feature. If the user asks to build it too, treat that as authorization to proceed with implementation after planning.
