---
page: evidence
description: Why a correct answer from an agent is not proof, and which records show what the agent did.
---

An agent can give the correct number with the incorrect identity. A status of "Resolved" can hide an empty answer. [C203, C504]

::diagram evidence-questions

## What the sessions said

- The Purview session gave a test: "Can you explain what data AI used, whether it was allowed, and what happened next?" [C501]
- Leon Gordon's design gates each answer: meaning, access, retrieval, calculation and response. [C502]
- The speaker said that rules validate figures, and models review wording. [C503]
- "Resolved" is not a correct answer. In the speaker's capture, the session was "Resolved" and the reader got no figures. [C504]
- Luise Freese said that "100% approved" counts clicks, not judgment. [C509]

## Go deeper

<details id="ai-ready"><summary>The Purview test for AI-ready data</summary>

The slide said that AI-ready data is identified, authorized, protected and observable. [C501]

</details>

<details id="gates"><summary>The 5 gates, and the limits of the design</summary>

Gate each answer before it reaches the reader. The speaker's 5 gates are meaning, access, retrieval, calculation and response. Each gate records a decision and a reason. [C502]

This is a design. The speaker tested it in a local simulation, not on a Microsoft workload. The product enforces only the access gate.

Rules validate figures. Models review wording. A model judge cannot prove arithmetic or identity. [C503]

</details>

<details id="resolved"><summary>"Resolved" in Copilot Studio</summary>

In Copilot Studio, AI assigns the "Resolved implied" outcome after the session ends. In the speaker's capture, the session was "Resolved" and the reader got no figures. [C504]

In the speaker's demo on synthetic data, 4 of 4 answers matched the reference figure. The caller was established at Fabric in 0 of 4. [C203]

</details>

<details id="tracing"><summary>Tracing: one trace in Foundry, a designed identifier in Copilot Studio</summary>

Foundry documents one trace for each turn: the agent run, the tool call and the model call. Copilot Studio has no documented join between a chat turn and the Fabric query. Thus you must design the identifier in. [C505]

The speaker verified the status on 17 September 2026. Foundry tracing was generally available for prompt agents and hosted agents. Trace Replay was in preview.

</details>

<details id="evidence-record"><summary>The evidence record, and when to repeat a test</summary>

Keep an evidence record for each answer. When a prompt, tool, model or permission changes, repeat the same question and the restricted pair. [C506]

An isolation claim needs an allowed test and a denied test. Configure the control, test both, keep the evidence and name the gap. [C512]

A release is a version, its checks, an owner and a rehearsed recovery. [C513]

</details>

<details id="purview"><summary>Purview: DSPM for AI, audit and insider risk</summary>

Purview DSPM for AI can record prompts and responses for Fabric data agents and Copilot in Fabric. You must turn on Purview Audit, a collection policy and a Fabric tenant setting. Without the policy, Purview records the event but not the prompt and response. [C507]

Insider Risk Management for Fabric is generally available. It reads Fabric audit logs with other signals to find malicious or accidental activity. It is billed pay-as-you-go and needs a separate Purview purchase. [C508]

</details>

<details id="obligation"><summary>A metric needs an obligation</summary>

Luise Freese said that "100% approved" counts clicks. It does not show that the reviewer had time, evidence or authority. [C509]

A metric needs an obligation: alert, owner, threshold, action, review. An alert without an obligation is decoration. [C510]

Contestability needs infrastructure: decision, pause, appeal, review, change. The question is whether disagreement can change the outcome. [C511]

</details>

<details id="one-demand"><summary>Three sessions, one demand</summary>

Three sessions ask for the same thing in different words: evidence of what the agent did. Permission alone is not enough. [C514]

This is a synthesis by the attendee and the assistant.

</details>

## For practice

These points are our reading of the statements above.

- For each answer, keep 4 fields: the question, the generated query, the caller and the result. Add a correlation identifier before go-live.
- Use rules for numbers. Use a model judge for wording only.
- Make human review real. Give the reviewer time, evidence and the authority to stop.

## Not confirmed

How does Purview see a custom agent that is built outside Foundry and Copilot Studio? [C953]

See [Open questions](/open-questions/#C953).
