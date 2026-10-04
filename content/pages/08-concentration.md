---
page: concentration
description: Why the benefits of one platform and the dependency on it grow together, and the questions that test what you can still choose.
---

Usefulness can become dependency. This is a design choice to make with full knowledge, not a reason to stop. [C803]

::diagram benefit-and-cost

## What the sessions said

- Luise Freese (INSPIRE01) said that both things are true. Benefits and concentration can grow together. [C801]
- The speaker gave 6 questions that test what you can still choose. [C802]
- Usefulness can become dependency: useful, adopt, depend, lock-in. [C803]
- Microsoft's answer to lock-in is open formats and open engines. [C805]

## Go deeper

<details id="both-true"><summary>Both things are true</summary>

Luise Freese (INSPIRE01) showed that OneLake gives less fragmentation and more data gravity. Semantic models give shared meaning and fixed assumptions. Copilots give wider access and assumptions at scale. Integrated governance gives more visibility and more control. [C801]

The speaker showed this slide in the session, and the attendee holds a photo of it. It is not in the deck of 70 slides that the speaker shared.

</details>

<details id="six-questions"><summary>The 6 questions</summary>

Luise Freese (INSPIRE01) gave 6 questions that test what you can still choose: [C802]

- Can we export data, definitions and history?
- Does knowledge exist outside one vendor interface?
- Can people challenge a metric or an automated decision?
- Are model assumptions documented?
- Who receives the time supposedly saved?
- Can someone refuse without paying a career penalty?

This slide is in the attendee's photo. It is not in the shared deck.

</details>

<details id="model-change"><summary>When the vendor changes the model</summary>

Luise Freese (INSPIRE01) gave 2 questions for when the vendor changes the model. Is there a change log? Who noticed? [C804]

</details>

<details id="open-formats"><summary>Open formats and open engines, and what they do not cover</summary>

The opening keynote showed many engines that can read OneLake data, such as Databricks, Snowflake, Spark, Trino and DuckDB. OneLake stores tables as Delta or Iceberg. [C805]

Open data formats do not make ontologies, AI instructions or agent definitions portable. No session covered export of those.

</details>

<details id="security-apis"><summary>OneLake security APIs for any engine</summary>

Aaron Merrill and Cristian Petculescu presented "OneLake security – deep dive and what's new". They showed that OneLake security has APIs that let any engine read and enforce its rules. Microsoft plans open-source security interoperability. [C806]

</details>

<details id="sovereign"><summary>Sovereign private cloud</summary>

The opening keynote showed a "Sovereign Private Cloud": Foundry Local, data platform services and customer applications on Azure Local. [C807]

</details>

<details id="custom-agents"><summary>Custom agents and Purview coverage</summary>

No session showed how Purview covers a custom agent that is built outside Foundry and Copilot Studio. [C808]

This is an open question. One of the sources is from a vendor with a competing product.

</details>

## For practice

These points are our reading of the statements above.

- Keep definitions, instructions and history in a form that you can export.
- Keep agent context in a repository that you own, not only in a vendor interface.
- Record model changes and platform changes, and name who checks them.

## Not confirmed

Can you export an ontology, AI instructions and agent definitions to a different platform? [C956]

See [Open questions](/open-questions/#C956).
