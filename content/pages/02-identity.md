---
page: identity
description: Four routes from a reader to Fabric data, the identity that each route uses, and how to prove the caller.
---

An agent answers with the access of the identity that runs the query. If that identity is the maker, each reader sees the maker's data. [C202]

::diagram identity-routes

## What the sessions said

- Leon Gordon showed 4 routes to a Fabric data agent. Each route has a different identity contract. [C201]
- The settings pane shows a choice. It is not proof of the caller. [C202]
- In the speaker's demo on synthetic data, 4 of 4 answers matched the reference figure. The caller was established at Fabric in 0 of 4. [C203]
- In the same demo, a reader with access to one region asked about London and received London's figure. [C204]
- In a customer case, a tool call ran as a service principal, so row-level security did not apply. [C205]

## Go deeper

<details id="routes"><summary>The route table, with status</summary>

Each connector route to a Fabric data agent has a different identity contract. [C201]

| Route | The query runs as | Status |
|---|---|---|
| Foundry data agent tool | The signed-in user (on behalf of the reader) | Preview |
| Foundry Fabric IQ tool | A delegated user | Preview |
| Copilot Studio, Fabric IQ Data MCP tool | The reader or the maker | Generally available |
| Direct MCP client | A user token or a service principal token | Service principal access is in preview |

Only the Copilot Studio route was demonstrated. The other rows are from documentation that the speaker checked on 15 to 17 September 2026. The speaker checked the status on 23 to 25 September 2026.

</details>

<details id="credential-mode"><summary>Maker credentials and the London answer</summary>

The credential mode decides whose data the agent sees. "Maker" uses the credentials of the maker. "User" uses the credentials of the reader. [C202]

On 24 September, a reader with access to one region asked about London and received London's figure. The route used maker credentials. The log named the maker's account. [C204]

This was the speaker's demo, on synthetic data.

In the demo, 4 of 4 answers matched the reference figure. The caller was established at Fabric in 0 of 4. [C203]

The data was synthetic and was in the speaker's own tenant. The speaker stated that no accuracy rate comes from 4 answers.

</details>

<details id="facts-and-tools"><summary>Facts and tools can use different identities</summary>

In the speaker's enterprise case, facts and tools used different identities. Questions to the semantic model ran on behalf of the reader, so row-level security applied. A tool call ran as a service principal, so row-level security did not apply. [C205]

The speaker marked this case "customer reported, not inspected".

</details>

<details id="editors"><summary>Row-level security in a model does not bind editors</summary>

The speaker said that row-level security in a semantic model binds Viewers and read-only users. Editors are exempt. SQL and OneLake use separate permissions. [C206]

</details>

<details id="prove-the-caller"><summary>How to prove the caller from the operation log</summary>

To prove the caller, read the operation log of the semantic model. The ExecutingUser field must name each reader account. [C207]

Workspace logging was in preview in the speaker's tenant on 17 September 2026.

</details>

<details id="engine-modes"><summary>Passthrough and delegated engine modes in OneLake</summary>

A Fabric engine reaches OneLake in one of two modes. In passthrough mode, the engine reads data as the reader. [C213]

In delegated mode, the engine reads data as its own fixed identity. Then the engine must apply its own security to tell readers apart.

</details>

<details id="agent-id"><summary>Entra Agent ID</summary>

Microsoft Entra Agent ID gives an agent its own identity. The identity is a special service principal that is made from a blueprint. A human sponsor can request access for the agent. Copilot Studio makes an agent identity for each new agent. [C209]

The governance session named Entra Agent ID, with scoped least-privilege access, as the control for "agents are a new identity to govern". [C210]

This was one line on one slide. No session showed how to use Agent ID with Fabric.

</details>

<details id="eligibility"><summary>Eligibility is not access: the PIM test</summary>

The speaker showed a test with Privileged Identity Management. The same request was denied before activation, allowed during activation and denied after. [C211]

This was a controlled lab with an Azure Reader role. It does not prove row-level security in Fabric.

</details>

<details id="isolation"><summary>Five isolation controls</summary>

The speaker said that a tenant is one of 5 isolation controls. The others are identity, connectors, network and geography. Each control needs its own test. [C212]

The slide said that Private Link is not supported for semantic models and workspace monitoring "currently".

</details>

<details id="service-principals"><summary>Service principals and data agents: what each source says</summary>

The speaker's route table lists a service principal token for the direct MCP client, with that access in preview. [C201]

An independent article says that the Fabric data agent tool in Foundry supports user identity only. It says that service principal authentication is not supported for that tool, and that unattended work must go to the data sources directly. [C208]

The 2 statements are about different routes. A Microsoft slide also lists "SPN support" for data agents.

</details>

## For practice

These points are our reading of the statements above.

- For each agent, write down each route and the identity that each tool uses.
- Treat a route as maker access until a log names the reader.
- Decide the identity model for each workload. Use the reader's identity for interactive use. Use a narrow agent identity for unattended use.

## Not confirmed

No session showed how to give an unattended agent a narrow identity in Fabric. [C214] Service principal access to data agents is in preview, and no session showed a pattern. [C952] No session showed how Entra Agent ID works with Fabric. [C210]

See [Open questions](/open-questions/#C952).
