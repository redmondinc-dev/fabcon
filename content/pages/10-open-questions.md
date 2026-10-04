---
page: open-questions
description: The questions that the sessions did not answer, the statuses that the sources disagree on, and the statements that rest on notes only.
---

Nothing in this debrief was tested in our own tenant. Each statement is from a speaker, from Microsoft or from a third party. [C957]

## The questions

For each question, "Why it matters" and "What would answer it" are our reading.

### How does an ontology apply row-level security?

The preview documentation did not say. [C951]

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

### Can you export an ontology, AI instructions and agent definitions?

The question is whether these items can move to a different platform. [C956]

- **Why it matters.** Open data formats cover tables. They do not cover these items.
- **What would answer it.** Export documentation from Microsoft, or a test export.

## Statuses that the sources disagree on

- **Fabric IQ.** Microsoft announced Fabric IQ as generally available at Build 2026. Microsoft Learn still showed a preview label on the workload in September 2026. [C108]
- **OneLake security.** The speakers said that OneLake security is generally available. Microsoft Learn pages still used the word "preview" on 4 October 2026. [C312]

Check each status against Microsoft Learn before you use it.

## Statements that rest on notes only

No slide is held for these statements.

- An ontology makes sense only for the business context. See [Context](/context/#C115). [C115]
- All users are a source of attack surface. See [Untrusted input](/untrusted-input/#C408). [C408]
- Architecture and governance are what will make AI work. See [Governance in the loop](/governance/#C614). [C614]
- The keynote covered AI-guided governance in the OneLake catalog. See [Where Fabric goes next](/signals/#C912). [C912]
- The notes name a "database constitution". See [Untrusted input](/untrusted-input/#C954). [C954]
