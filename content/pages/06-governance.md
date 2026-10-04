---
page: governance
description: Why a correct answer from an agent is not proof, which records show what the agent did, and how governance moves into Git and pull requests.
---

In our reading, three sessions ask for the same thing: evidence of what the agent did. Permission alone is not enough. [C514]

::diagram evidence-questions

## What the sessions said

- Leon Gordon (TH14) showed a Copilot Studio capture. The outcome was "Resolved", and the reader got no figures. AI assigns the "Resolved implied" outcome after the session ends. [C504]
- He said that rules validate figures, and models review wording. A model judge cannot prove arithmetic or identity. [C503]
- He said that Copilot Studio has no documented join between a chat turn and the Fabric query. Thus you must design the identifier in. [C505]
- Purview Data Security Posture Management (DSPM) for AI can record prompts and responses. Microsoft Learn says that you must first turn on Purview Audit, a collection policy and a tenant setting. [C507]

## Governance moves into the development loop

::diagram governance-loop

The session "Data Governance for Trust, Scale, and AI" said: keep shared context, MCP servers and skills in one governed mono-repo, and review each change. [C604] In its live demo, a governance agent proposes fixes as pull requests, and a human reviews each one. [C605]

## Go deeper

<details id="gates"><summary>The test, the gates and the record</summary>

The session "Purview and data security protections" gave the test in the diagram. [C501] The record under each question is our reading.

Leon Gordon's (TH14) design gates each answer: meaning, access, retrieval, calculation and response. [C502] He tested the design in a local simulation, not on a Microsoft workload. The product enforces only the access gate.

He said: keep an evidence record for each answer. When a prompt, tool, model or permission changes, repeat the same question, and repeat the test with two readers who have different access. [C506]

In a separate test on synthetic data, 4 answers matched the reference and the caller was established at Fabric in 0 of 4. See [Access and identity](/access/#routes).

Leon Gordon said that Foundry documents one trace for each turn: the agent run, the tool call and the model call. He verified on 17 September 2026 that Foundry tracing was generally available for prompt and hosted agents. Trace Replay was in preview. [C505]

</details>

<details id="purview"><summary>Purview: records, labels and licences</summary>

The session "Purview and data security protections" showed these controls as built into Fabric: the Govern tab, OneLake security, domains, endorsement, lineage and monitoring. Sensitivity labels, data loss prevention, audit, insider risk and DSPM for AI need a Microsoft Purview licence. [C610]

The same session said that Insider Risk Management for Fabric is generally available. It is billed pay-as-you-go and needs a separate Purview purchase. [C508]

Microsoft Learn says that without the collection policy, Purview records the event but not the prompt and response. Learn now calls this version "DSPM for AI (classic)", and a new version replaces it. [C507]

The session "Purview security solutions" gave this advice: start with sensitivity labels. Set a default label at the domain level. Make labels mandatory on save. Use programmatic labelling to start. Labels pass to downstream items. [C608]

</details>

<details id="repository"><summary>The governance agent</summary>

In the demo of "Data Governance for Trust, Scale, and AI", each fix reaches development, test or production only after human review. The demo used a tool with the name "onelake-catalog-govern-cli". [C605]

</details>

<details id="risks-and-controls"><summary>The 8 risks and the 8 controls</summary>

The session "Data Governance for Trust, Scale, and AI" paired 8 AI risks with 8 controls. [C601]

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

Entra Agent ID was one line on one slide. No session showed how to use it with Fabric. [C210]

</details>

<details id="obligation"><summary>A metric needs an obligation</summary>

Luise Freese (INSPIRE01) said that "100% approved" counts clicks. It does not show that the reviewer had time, evidence or authority. [C509]

She said that a metric needs an obligation: alert, owner, threshold, action, review. An alert without an obligation is decoration. [C510]

She said that contestability needs infrastructure: decision, pause, appeal, review, change. The question is whether disagreement can change the outcome. [C511]

</details>

## For practice

These points are our reading.

- For each answer, keep the question, the generated query, the caller and the result. Add a correlation identifier before go-live.
- Use rules for numbers. Use a model judge for wording only.
- Map each control to "built into Fabric" or "needs Purview" before a licence discussion.

## Not confirmed

How does Purview see a custom agent that is built outside Foundry and Copilot Studio? [C953]

See [Open questions](/open-questions/#C953).
