---
page: open-questions
description: The questions that the sessions did not answer, the statuses that the sources disagree on, and the statements that rest on notes only.
---

Nothing on this site was tested in our own tenant. Each statement is from a speaker, from Microsoft or from a third party. [C957]

## The questions

For each question, "Why it matters" and "What would answer it" are our reading.

### How does an ontology apply row-level security?

On 18 September 2026, the preview documentation did not say. Since 1 October 2026, Microsoft Learn says that querying respects row-level security at the source. We did not test it. [C951]

- **Why it matters.** An agent that reads through an ontology must not see more rows than the reader.
- **What would answer it.** Microsoft documentation for the ontology, or a test with 2 reader accounts.

### How do you give an unattended agent a narrow identity in Fabric?

Service principal access to data agents is in preview. No session showed a pattern. [C952]

- **Why it matters.** An unattended agent has no reader. Its own identity decides what it can reach.
- **What would answer it.** A documented pattern from Microsoft, or a test with a service principal or an Entra Agent ID.

### How does Purview see a custom agent?

The question is about an agent that is built outside Foundry and Copilot Studio. [C953]

- **Why it matters.** The evidence of what an agent did must cover each agent, not only the Microsoft agents.
- **What would answer it.** The Purview documentation on supported AI applications, or a test with audit turned on.

### What do a "database constitution" and database instructions contain?

The attendee's notes name them. No slide is held. The notes also ask how skills and plugins work with coding agents. [C954]

- **Why it matters.** These files set what a coding agent can do in a database.
- **What would answer it.** The documentation for Copilot in SQL Server Management Studio.

### What does Copilot Studio cost for each request?

The speaker said that the quantity of Copilot credits for each request is not published. [C955]

- **Why it matters.** Without this figure, the cost for each useful answer is not complete.
- **What would answer it.** A published rate from Microsoft, or a measured bill.

### Can you export AI instructions and agent definitions?

Ontology export is now documented. Microsoft Learn says that an ontology item can export definitions in RDF or Turtle formats, and can import RDF, Turtle and OWL definitions. We did not test this. Whether AI instructions and agent definitions can move to a different platform is not confirmed. [C956]

- **Why it matters.** Open data formats cover tables, and the ontology now has an export. AI instructions and agent definitions have no documented export.
- **What would answer it.** Export documentation from Microsoft, or a test export.

## First tests

This list is our reading. Each test could answer one question above in our own tenant.

- **A test with 2 reader accounts.** It answers how an ontology applies row-level security.
- **A test with a service principal or an Entra Agent ID.** It answers how to give an unattended agent a narrow identity.
- **A test with Purview audit turned on.** It answers how Purview sees a custom agent.
- **A measured bill.** It answers what Copilot Studio costs for each request.
- **A test export.** It answers whether the ontology export works, and whether AI instructions and agent definitions can move.

## A status that the sources disagree on

- **Fabric IQ.** Microsoft announced Fabric IQ as generally available at Build 2026. Microsoft Learn still showed a preview label on the workload in September 2026. [C108]

Check each status against Microsoft Learn before you use it. We checked OneLake security on 4 October 2026: Learn and the speakers agree. [C312]

## Research that does not agree

Research on agent-written code is mixed. [C613]

- One study found more corrective maintenance and more security weaknesses than in human code.
- A different study found fewer security smells.

Both are preprints. They show that a human review gate needs design. They do not rank agents.

## Statements that rest on notes only

No slide is held for these statements. The detail of each one is on the All findings page.

- An ontology makes sense only for the business context. See [All findings](/findings/#C115). [C115]
- All users are a source of attack surface. See [All findings](/findings/#C408). [C408]
- Architecture and governance are what will make AI work. See [All findings](/findings/#C614). [C614]
- The keynote covered AI-guided governance in the OneLake catalog. See [Where Fabric goes next](/signals/#C912). [C912]
- The notes name a "database constitution". See [All findings](/findings/#C954). [C954]
