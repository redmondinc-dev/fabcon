---
page: context
description: Business context is now a product layer in Fabric. What the ontology is, what it excludes, and what is still in preview.
---

Microsoft put business context at the centre of its keynote. Fabric now has a layer above the semantic model: the ontology. [C101, C103]

::diagram context-stack

## What the sessions said

- The keynote slide showed "Your IQ" above "Microsoft IQ", which has 4 parts. [C101, C102]
- Microsoft documentation says that the ontology holds business entities and their relationships, and binds them to data in OneLake. [C103]
- Leon Gordon gave a design rule: keep measures in the semantic model, and add an ontology when agents must navigate related concepts. [C104]
- Luise Freese showed that each translation from people to model removes some context. The agent cannot see what the model excludes. [C110, C111]
- Luise Freese said that AI-ready data makes assumptions executable. [C112]

## Go deeper

<details id="keynote"><summary>The keynote slide and the spoken line</summary>

The slide showed "Your IQ" above "Microsoft IQ", above Foundry, Azure and Fabric. Copilot and Agent 365 were at the sides. [C101]

The live caption of the spoken line read: "you've spent years building knowledge about your business ... it's your competitive advantage, it's your context". [C101]

Microsoft IQ has 4 parts: Work IQ, Foundry IQ, Fabric IQ and Web IQ. [C102]

</details>

<details id="ontology-status"><summary>Fabric IQ status and the limits of the ontology preview</summary>

Microsoft announced Fabric IQ as generally available at Build 2026. The ontology item stayed in preview. [C108]

Microsoft Learn still showed a preview label on the workload in September 2026. The sources disagree on the label. This site states a status for the ontology only.

The ontology sends each query to the applicable engine, for example GQL for Graph or KQL for Eventhouse. [C103]

Leon Gordon showed 3 limits of the preview: [C106]

- The graph refresh is manual.
- A user needs the Workspace Contributor role, not Viewer.
- Row-level security through bindings is not documented.

The speaker read these limits from Microsoft Learn on 18 September 2026. Check them again before use.

A third-party article says that Fabric can generate an ontology from a Power BI semantic model. Tables become entities, and relationships become connections. [C105]

</details>

<details id="prep-data-for-ai"><summary>Prep data for AI and "Approved for Copilot"</summary>

"Prep data for AI" lets a model author set an AI data schema, verified answers and AI instructions. The "Approved for Copilot" setting removes the warning that Copilot shows for unprepared models. [C107]

The setting had the name "prepped for AI" before.

</details>

<details id="context-engineering"><summary>Data agents as "context engineering"</summary>

A slide in "Purview and data security protections" described data agents as "context engineering for shared curated views of data and knowledge for a purpose". The slide said that data agents can reason across ontologies and graph models, not only tables. [C109]

</details>

<details id="ontology-demo"><summary>The ontology demo and its description field</summary>

In the ontology demo, each entity type had a description field. The field text said that the description gives AI agents better context for how the entity type is used. [C114]

We read this from a photo of a live demo screen. The text was small.

The session said that an ontology makes sense only for the business context, and that governance policies should enable work. [C115]

No slide is held for this statement.

</details>

<details id="readiness"><summary>Readiness is organizational work</summary>

Luise Freese said that people teach the system the business. Frontline knowledge becomes data definitions, then a semantic model. [C110]

The speaker said that readiness is organizational work. It needs shared definitions, access rules, exceptions, context and people who notice. [C113]

A report shows. An agent recommends. A system acts. The speaker said that what once shaped a dashboard can now shape a decision. [C112]

</details>

## For practice

These points are our reading of the statements above.

- Treat the quality of the semantic model as a control. Descriptions, AI instructions and verified answers decide what each AI surface says.
- Name an owner for each definition. The tool is easy. The agreement on what "customer" means is hard.
- Do not put an ontology in a production plan while it is in preview.

## Not confirmed

How does an ontology apply row-level security? The preview documentation did not say. [C951] See [Open questions](/open-questions/#C951).
