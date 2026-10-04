---
page: context
description: Business context is now a product layer in Fabric. What the ontology is, what the agent cannot see, and what you can use today.
---

Fabric IQ adds an ontology: business entities and their relationships, bound to data in OneLake. The ontology item is in preview. [C103, C108]

::diagram context-stack

## What the sessions said

- Leon Gordon (TH14) gave a design rule: keep measures in the semantic model. Add an ontology when agents must navigate related concepts. [C104]
- Leon Gordon (TH14) read the ontology preview limits from Microsoft Learn on 18 September 2026. Row-level security through bindings was not documented. Learn changed on 1 October 2026. [C106]
- Luise Freese (INSPIRE01) showed that each translation from people to model removes some context. The agent cannot see what the model excludes, such as exceptions and dissent. [C110, C111]
- Our notes from "Data Governance for Trust, Scale, and AI" name semantic model prep for AI and the "Approved for Copilot" setting. Microsoft Learn describes both. [C107]

## Go deeper

<details id="ontology-status"><summary>The ontology: what it does, and its preview limits</summary>

The ontology is not a query engine. Agents use it as context and run each query against the bound data source. Microsoft Learn changed this description on 1 October 2026. Earlier sources said that the ontology sends each query to an engine. [C103]

Microsoft announced Fabric IQ as generally available at Build 2026. The ontology item stayed in preview. The sources disagree on the label for the full workload, so this site states a status for the ontology only. [C108]

On 18 September 2026, Microsoft Learn listed these preview limits:

- The graph refresh was manual.
- A user needed the Workspace Contributor role, not Viewer.
- Row-level security through bindings was not documented.

Since 1 October 2026, Learn says that querying respects OneLake security and row-level security at the source, and that the graph is optional. We did not test this.

</details>

<details id="prep-data-for-ai"><summary>Prep data for AI and "Approved for Copilot"</summary>

Microsoft Learn says that "Prep data for AI" lets a model author set an AI data schema, verified answers and AI instructions. The "Approved for Copilot" setting removes the warning that Copilot shows for unprepared models. [C107]

The setting had the name "prepped for AI" before.

</details>

<details id="readiness"><summary>Readiness is organizational work</summary>

Luise Freese (INSPIRE01) said that people teach the system the business. Readiness needs shared definitions, access rules, exceptions, context and people who notice. [C113]

A report shows. An agent recommends. A system acts. AI-ready data makes assumptions executable. [C112]

</details>

## For practice

These points are our reading.

- Understand your data first.
- Treat semantic model prep as a control. Give each definition an owner, and set AI instructions and verified answers.
- Do not put an ontology in a production plan while it is in preview.

## Not confirmed

Since 1 October 2026, Microsoft Learn says that ontology queries respect row-level security at the source. We did not test it. [C951] See [Open questions](/open-questions/#C951).
