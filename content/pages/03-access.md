---
page: access
description: The paths from a user to Fabric data, the identity that each route to a data agent uses, and how to prove the caller.
---

Each route to the data can use its own identity. A user can reach the same data through different paths, so you must compute the paths. [C302] An agent answers with the access of the identity that runs the query. [C202]

::diagram access-paths

::diagram identity-routes

## What the sessions said

- Cristian Urbina Guerra (TH30) said that access in Fabric comes from 6 layers. A permission is not the same as effective access. [C301]
- The speaker said that no single source of truth exists. You collect the picture from 4 API families. [C303]
- Leon Gordon (TH14) showed 4 routes to a Fabric data agent. Each route has a different identity contract. [C201]
- The settings pane shows a choice. It is not proof of the caller. [C202]
- In his demo, a reader with access to one region asked about London and received London's figure. [C204]
- In a customer case, a tool call ran as a service principal, so row-level security did not apply. [C205]
- Aaron Merrill and Cristian Petculescu (OneLake security session) showed that a OneLake security role has 3 parts: who, what and target. A user in more than one role gets the union. [C307]
- Workspace Admins, Members and Contributors can read all data in OneLake. OneLake security roles limit only Viewers. [C308]
- The consumer roles on a delegated shortcut can narrow access. They cannot widen it. [C309]

## Go deeper

<details id="six-layers"><summary>The 6 layers of access, and how to compute the paths</summary>

Cristian Urbina Guerra (TH30) named 6 layers: identity, workspace, item, data, inheritance and relationships. [C301]

He said that security is a graph, not a list. [C302]

His method has 5 steps: capture, normalize, relate, query and explain. A Fabric data agent then answers questions such as "Why can Alice see this?" [C306]

The complete picture comes from 4 API families: Fabric REST, Power BI REST, OneLake and Microsoft Graph. [C303]

Start with Microsoft Graph. Collect users, service principals, managed identities, groups and group members. Flatten nested groups so that each user links to each group. [C304]

The Fabric admin APIs list workspaces, items and workspace access. The endpoints for item access and OneLake roles are limited to 200 requests each hour. [C305]

The tenant-level endpoints need Fabric admin rights.

</details>

<details id="routes"><summary>The route table, and the London answer</summary>

Leon Gordon (TH14) showed that each connector route to a Fabric data agent has a different identity contract. [C201]

| Route | The query runs as | Status |
|---|---|---|
| Foundry data agent tool | The signed-in user (on behalf of the reader) | Preview |
| Foundry Fabric IQ tool | A delegated user | Preview |
| Copilot Studio, Fabric IQ Data MCP (Model Context Protocol) tool | The reader or the maker | Generally available |
| Direct MCP client | A user token or a service principal token | Service principal access is in preview |

The speaker demonstrated only the Copilot Studio route. The other rows are from documentation that the speaker checked on 15 to 17 September 2026. The speaker checked the status on 23 to 25 September 2026.

The credential mode decides whose data the agent sees. "Maker" uses the credentials of the maker. "User" uses the credentials of the reader. [C202]

On 24 September, a reader with access to one region asked about London and received London's figure. The route used maker credentials. The log named the maker's account. [C204] This was the speaker's demo, on synthetic data.

In the demo, 4 of 4 answers matched the reference figure. The caller was established at Fabric in 0 of 4. [C203] The data was synthetic and was in the speaker's own tenant. The speaker stated that no accuracy rate comes from 4 answers.

In the speaker's enterprise case, facts and tools used different identities. Questions to the semantic model ran on behalf of the reader, so row-level security applied. A tool call ran as a service principal, so row-level security did not apply. [C205] The speaker marked this case "customer reported, not inspected".

An independent article says that the Fabric data agent tool in Foundry supports user identity only. Service principal authentication is not supported for that tool. Unattended work must go to the data sources directly. [C208] This route is different from the direct MCP client in the table. A Microsoft slide also lists "SPN support" for data agents.

</details>

<details id="roles"><summary>OneLake security roles, workspace roles and editors</summary>

In the OneLake security session, a OneLake security role has 3 parts: who (members), what (permission) and target. The target is a schema, table, column, row or folder. [C307]

Workspace Admins, Members and Contributors can read all data in OneLake. Only Viewers get their data access from OneLake security roles. [C308] The roadmap on the slide listed "Restrict Admin/Member/Contributor access" as committed.

Leon Gordon said that row-level security in a semantic model binds Viewers and read-only users. Editors are exempt. SQL and OneLake use separate permissions. [C206]

A new permissions view in OneLake answers 2 questions: "Who has access to this table?" and "What data can this user see?" [C311]

The view covers OneLake security roles. It does not cover semantic model security or group paths.

The OneLake speakers said that OneLake security is generally available. It filters data for Lakehouse, Spark notebooks, the SQL analytics endpoint, semantic models and Fabric Graph. Eventhouse and external engines are in preview. [C312] Microsoft Learn pages still used the word "preview" on 4 October 2026.

</details>

<details id="shortcuts"><summary>Shortcuts and engine modes: passthrough and delegated</summary>

A Fabric engine reaches OneLake in one of two modes. In passthrough mode, the engine reads data as the reader. [C213] In delegated mode, the engine reads data as its own fixed identity. Then the engine must apply its own security to tell readers apart.

A passthrough shortcut checks the user at the target. A delegated shortcut reads the target with a fixed identity. Then the consumer roles narrow the result. [C309] The slide gave the rule as A ∩ (C ∪ D).

Shortcuts to external storage, such as S3 or ADLS Gen2, always use a delegated identity. Delegated OneLake shortcuts also work across tenants. [C310]

Leon Gordon named 5 isolation controls: tenant, identity, connectors, network and geography. Each needs its own test. [C212] His slide said that Private Link is "currently" not supported for semantic models and workspace monitoring.

</details>

<details id="prove-the-caller"><summary>How to prove the caller from the operation log</summary>

To prove the caller, read the operation log of the semantic model. The ExecutingUser field must name each reader account. [C207]

Workspace logging was in preview in the speaker's tenant on 17 September 2026.

</details>

<details id="agent-id"><summary>Entra Agent ID, and the PIM test</summary>

Microsoft Entra Agent ID gives an agent its own identity. The identity is a special service principal that is made from a blueprint. A human sponsor can request access for the agent. Copilot Studio makes an agent identity for each new agent. [C209]

The governance session named Entra Agent ID, with scoped least-privilege access, as the control for "agents are a new identity to govern". [C210] This was one line on one slide. No session showed how to use Agent ID with Fabric.

Leon Gordon showed a test with Privileged Identity Management (PIM). The same request was denied before activation, allowed during activation and denied after. [C211] This was a controlled lab with an Azure Reader role. It does not prove row-level security in Fabric.

</details>

## For practice

These points are our reading of the statements above.

- Build the security graph first. Collect identities and groups, then workspaces, items and roles.
- For each agent, write down each route and the identity that each tool uses.
- Treat a route as maker access until a log names the reader.
- Review who holds an editor role. Editors are outside the limits of row-level security and OneLake roles.
- Check each engine and each shortcut for the identity that it uses.
- Decide the identity model for each workload. Use the reader's identity for interactive use. Use a narrow agent identity for unattended use.

## Not confirmed

No session showed how to give an unattended agent a narrow identity in Fabric. [C214] Service principal access to data agents is in preview, and no session showed a pattern. [C952] No session showed how Entra Agent ID works with Fabric. [C210]

An independent article says that the choice of engine is a security decision. It says that Direct Lake over SQL and the SQL endpoint in delegated mode do not pass the user identity to OneLake. We did not check this against Microsoft Learn. [C315]

See [Open questions](/open-questions/#C952).
