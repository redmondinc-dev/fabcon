---
page: governance
description: How the sessions put governance into domains, labels, Git and pull requests, and which controls need a Purview licence.
---

The sessions put governance into domains, labels, Git and pull requests. A human reviews each change. [C604, C607, C608]

::diagram governance-loop

## What the sessions said

- The governance session paired 8 AI risks with 8 controls. [C601]
- Keep one governed repository for what agents know and can do. [C604]
- A governance agent can propose fixes as pull requests. A human reviews each one. [C605]
- Start with sensitivity labels. Set a default label at the domain level. [C608]
- Some controls are in Fabric at no added cost. Other controls need a Microsoft Purview licence. [C610]

## Go deeper

<details id="risks-and-controls"><summary>The 8 risks and the 8 controls</summary>

The governance session showed this pairing. [C601]

| AI risk | Control |
|---|---|
| Oversharing | Domains, item permissions, row and column security, access review |
| Bad data | Prep for AI, endorsed items, lineage |
| Regulatory exposure | Purview audit, sensitivity labels, automatic classification |
| Trust | Approved for Copilot, lineage and Git history |
| Agents as a new identity | Entra Agent ID |
| Accountability | Git, pull requests, human review |
| Speed against control | Self-service inside domain guardrails |
| Shadow AI | One governed mono-repo for context, MCP servers and skills |

</details>

<details id="modes-and-maturity"><summary>Two modes of AI use, and 4 maturity steps</summary>

The session split AI use into 2 modes. Conversational analytics is Copilot and agents on business data. Agentic development is LLMs, MCP servers, skills, tools and command-line tools. [C602]

The session showed 4 maturity steps: manual development, chat assisted, agent-assisted development and autonomous AI teams. Step 2 has no shared context. Step 3 needs context and governance for the full organization. [C603]

</details>

<details id="repository"><summary>One repository, and a governance agent</summary>

For scale, keep one governed source of truth for what agents know and can do. One mono-repo holds shared context, MCP servers and skills. Development agents use it. Each change goes through a pull request with human review. [C604]

A governance agent can review the Fabric tenant and propose fixes as pull requests. A human reviews each one before it reaches development, test or production. [C605]

The session showed this as a live demo. The demo used a tool with the name "onelake-catalog-govern-cli".

</details>

<details id="domains"><summary>Domains and guardrails</summary>

The session said that domains give real ownership. Self-service happens in the workspace, inside domain guardrails. Workspaces connect to Git. [C607]

</details>

<details id="labels"><summary>Sensitivity labels first</summary>

Start with sensitivity labels. Set a default label at the domain level. Make labels mandatory on save. Use programmatic labelling to start. Labels pass to downstream items. [C608]

The attendee's notes add: "Keep it small but specific".

</details>

<details id="dlp"><summary>Data loss prevention that contains</summary>

The slide said that Purview data loss prevention can now restrict access to a Fabric item when a rule matches. The steps are detect, contain, investigate, resolve. [C609]

The slide did not show a status label.

</details>

<details id="fabric-or-purview"><summary>In Fabric, or with a Purview licence</summary>

These controls are in Fabric at no added cost: the Govern tab, OneLake security, domains, endorsement, lineage and monitoring. [C610]

These controls need a Microsoft Purview licence: sensitivity labels, data loss prevention, audit, insider risk and DSPM for AI.

Purview has 5 tools for data security: information protection, data loss prevention, audit, insider risk management and data security posture management. They work across the full Microsoft estate, not only Fabric. [C611]

</details>

<details id="govern-tab"><summary>The Govern tab in the OneLake catalog</summary>

The Govern tab shows governance insights and recommended actions. It works without Purview. Its tenant-wide semantic model is read-only, and a Fabric data agent cannot use it. [C612]

</details>

<details id="fabric-atlas"><summary>Fabric Atlas</summary>

Fabric Atlas is a community tool by Frederic Gisbert. It gives one view of the catalog, lineage, governance, access and operations of a Fabric workspace. It stores metadata only. [C606]

It is a community accelerator, not a Microsoft product.

</details>

<details id="research"><summary>What research says about agent-written code</summary>

Research on agent-written code is mixed. One study found more corrective maintenance and more security weaknesses than in human code. A different study found fewer security smells. [C613]

These are 2 preprints. They show that a human review gate needs design. They do not rank agents.

</details>

<details id="closing"><summary>The closing statement</summary>

The attendee's notes give the closing statement of the session: architecture and governance are what will make AI work. [C614]

No slide is held for this statement.

</details>

## For practice

These points are our reading of the statements above.

- Put agent context, MCP servers and skills in one reviewed repository.
- Use pull requests as the control point for agent work.
- Map each control to "in Fabric" or "needs Purview" before a licence discussion.

## Not confirmed

The status of data loss prevention with "restrict access" for Fabric is not known. The slide did not show a status label. [C609]

See [Open questions](/open-questions/).
