---
page: governance
description: Why a correct answer from an agent is not proof, which records show what the agent did, and how governance moves into domains, labels, Git and pull requests.
---

Governance moves into the development loop. Three sessions ask for the same thing in different words: evidence of what the agent did. Permission alone is not enough. This is a synthesis by the attendee and the assistant. [C514]

::diagram evidence-questions

::diagram governance-loop

## What the sessions said

- The session "Purview and data security protections" gave a test: "Can you explain what data AI used, whether it was allowed, and what happened next?" [C501]
- The same session said that some controls are in Fabric at no added cost. Other controls need a Microsoft Purview licence. [C610]
- Leon Gordon (TH14) gates each answer: meaning, access, retrieval, calculation and response. [C502]
- He said that rules validate figures, and models review wording. [C503]
- "Resolved" is not a correct answer. In his capture, the session was "Resolved" and the reader got no figures. [C504]
- Luise Freese (INSPIRE01) said that "100% approved" counts clicks, not judgment. [C509]
- The session "Data Governance for Trust, Scale, and AI" paired 8 AI risks with 8 controls. [C601]
- It said: keep one governed repository for what agents know and can do. [C604]
- In its demo, a governance agent can propose fixes as pull requests. A human reviews each one. [C605]
- The session "Purview security solutions" said: start with sensitivity labels. Set a default label at the domain level. [C608]

## Go deeper

<details id="ai-ready"><summary>The Purview test, and the three records</summary>

The slide said that AI-ready data is identified, authorized, protected and observable. [C501]

The diagram on this page gives each question of the test a record: the query, the caller, and the audit and outcome. The records are our reading.

Keep an evidence record for each answer. When a prompt, tool, model or permission changes, repeat the same question and the restricted pair. [C506]

An isolation claim needs an allowed test and a denied test. Configure the control, test both, keep the evidence and name the gap. [C512]

A release is a version, its checks, an owner and a rehearsed recovery. [C513]

</details>

<details id="gates"><summary>The 5 gates, "Resolved", and tracing</summary>

Gate each answer before it reaches the reader. Each gate records a decision and a reason. [C502]

This is a design. The speaker tested it in a local simulation, not on a Microsoft workload. The product enforces only the access gate.

Rules validate figures. Models review wording. A model judge cannot prove arithmetic or identity. [C503]

In Copilot Studio, AI assigns the "Resolved implied" outcome after the session ends. Thus "Resolved" can hide an empty answer. [C504]

The same demo showed correct answers with no established caller. See [Access and identity](/access/#C203).

Foundry documents one trace for each turn: the agent run, the tool call and the model call. Copilot Studio has no documented join between a chat turn and the Fabric query. Thus you must design the identifier in. [C505]

The speaker verified the status on 17 September 2026. Foundry tracing was generally available for prompt agents and hosted agents. Trace Replay was in preview.

</details>

<details id="purview"><summary>Purview: what it records and contains, and what needs a licence</summary>

Purview Data Security Posture Management (DSPM) for AI can record prompts and responses for Fabric data agents and Copilot in Fabric. You must turn on Purview Audit, a collection policy and a Fabric tenant setting. Without the policy, Purview records the event but not the prompt and response. [C507]

The slide said that Purview data loss prevention can now restrict access to a Fabric item when a rule matches. The steps are detect, contain, investigate, resolve. [C609]

The slide did not show a status label.

Insider Risk Management for Fabric is generally available. It reads Fabric audit logs with other signals to find malicious or accidental activity. It is billed pay-as-you-go and needs a separate Purview purchase. [C508]

These controls are in Fabric at no added cost: the Govern tab, OneLake security, domains, endorsement, lineage and monitoring. [C610]

These controls need a Microsoft Purview licence: sensitivity labels, data loss prevention, audit, insider risk and DSPM for AI.

Purview has 5 tools for data security: information protection, data loss prevention, audit, insider risk management and data security posture management. They work across the full Microsoft estate, not only Fabric. [C611]

The Govern tab in the OneLake catalog shows governance insights and recommended actions. It works without Purview. Its tenant-wide semantic model is read-only, and a Fabric data agent cannot use it. [C612]

</details>

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
| Shadow AI | One governed mono-repo for context, Model Context Protocol (MCP) servers and skills |

</details>

<details id="repository"><summary>Governance in the repository</summary>

For scale, keep one governed source of truth for what agents know and can do. One mono-repo holds shared context, MCP servers and skills. Development agents use it. Each change goes through a pull request with human review. [C604]

A governance agent can review the Fabric tenant and propose fixes as pull requests. A human reviews each one before it reaches development, test or production. [C605]

The session showed this as a live demo. The demo used a tool with the name "onelake-catalog-govern-cli".

The session said that domains give real ownership. Self-service happens in the workspace, inside domain guardrails. Workspaces connect to Git. [C607]

Start with sensitivity labels. Set a default label at the domain level. Make labels mandatory on save. Use programmatic labelling to start. Labels pass to downstream items. [C608]

The attendee's notes add: "Keep it small but specific".

The session split AI use into 2 modes: conversational analytics, and agentic development with LLMs, MCP servers, skills and tools. [C602]

Its 4 maturity steps go from manual development to autonomous AI teams, and step 3 needs context and governance for the full organization. [C603]

The attendee's notes give the closing statement of the session: architecture and governance are what will make AI work. [C614]

No slide is held for this statement.

</details>

<details id="obligation"><summary>A metric needs an obligation, and contestability</summary>

Luise Freese said that "100% approved" counts clicks. It does not show that the reviewer had time, evidence or authority. [C509]

A metric needs an obligation: alert, owner, threshold, action, review. An alert without an obligation is decoration. [C510]

Contestability needs infrastructure: decision, pause, appeal, review, change. The question is whether disagreement can change the outcome. [C511]

</details>

## For practice

These points are our reading of the statements above.

- For each answer, keep 4 fields: the question, the generated query, the caller and the result. Add a correlation identifier before go-live.
- Use rules for numbers. Use a model judge for wording only.
- Make human review real. Give the reviewer time, evidence and the authority to stop.
- Put agent context, MCP servers and skills in one reviewed repository. Use pull requests as the control point for agent work.
- Map each control to "in Fabric" or "needs Purview" before a licence discussion.

## Not confirmed

How does Purview see a custom agent that is built outside Foundry and Copilot Studio? [C953]

See [Open questions](/open-questions/#C953).

The status of data loss prevention with "restrict access" for Fabric is not known. The slide did not show a status label. [C609]

See [Open questions](/open-questions/).
