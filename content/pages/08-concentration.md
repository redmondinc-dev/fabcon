---
page: concentration
description: Why the benefits of one platform and the dependency on it can grow together, and the questions that test what you can still choose.
---

Luise Freese (INSPIRE01) said that benefits and concentration can grow together. Usefulness can become dependency, and then lock-in. [C801, C803]

::diagram benefit-and-cost

## What the sessions said

- Luise Freese (INSPIRE01) showed that OneLake gives less fragmentation and more data gravity. The slide is in the attendee's photo, not in her shared deck. [C801]
- She gave 6 questions that test what you can still choose. The first: can we export data, definitions and history? [C802]
- The opening keynote showed many engines that can read OneLake data, such as Databricks, Snowflake, Spark, Trino and DuckDB. [C805]
- Aaron Merrill and Cristian Petculescu ("OneLake security – deep dive and what's new") showed APIs that let any engine read and enforce OneLake security rules. The APIs are in preview. [C806]

## Go deeper

<details id="both-true"><summary>Both things are true</summary>

Luise Freese (INSPIRE01) paired each benefit with a cost. OneLake: less fragmentation, more data gravity. Semantic models: shared meaning, fixed assumptions. Copilots: wider access, assumptions at scale. Integrated governance: more visibility, more control. [C801]

</details>

<details id="six-questions"><summary>The 6 questions, and when the vendor changes the model</summary>

Luise Freese (INSPIRE01) gave 6 questions that test what you can still choose: [C802]

- Can we export data, definitions and history?
- Does knowledge exist outside one vendor interface?
- Can people challenge a metric or an automated decision?
- Are model assumptions documented?
- Who receives the time supposedly saved?
- Can someone refuse without paying a career penalty?

This slide is in the attendee's photo, not in the shared deck.

When the vendor changes the model, she asked: is there a change log? Who noticed? [C804]

</details>

<details id="open-formats"><summary>Open engines, and what they do not cover</summary>

The OneLake session showed one copy of the data for all compute engines. [C805]

In our reading, this is how Microsoft answers the lock-in question. Open data formats do not make AI instructions or agent definitions portable. No session that we attended covered export of those. Microsoft Learn documents RDF and Turtle export for the ontology only. We did not test this.

Aaron Merrill and Cristian Petculescu said that Microsoft plans open-source security interoperability. [C806]

</details>

## For practice

These points are our reading.

- Keep definitions, instructions and history in a form that you can export.
- Keep agent context in a repository that you own, not only in a vendor interface.
- Record model changes and platform changes, and name who checks them.

## Not confirmed

Can you export AI instructions and agent definitions to a different platform? Microsoft Learn documents an export for the ontology only. [C956]

See [Open questions](/open-questions/#C956).
