---
page: access
description: Why a permission is not effective access in Fabric, the identity that each route to a data agent uses, and how to prove the caller.
---

A user can reach the same data through different paths. A permission is not the same as effective access. [C301, C302]

::diagram access-paths

## What the sessions said

- Cristian Urbina Guerra (TH30): security is a graph, not a list. Access can come from 6 layers: identity, workspace, item, data, inheritance and relationships. [C301, C302]
- Leon Gordon (TH14) showed 4 routes to a Fabric data agent, each with a different identity contract. [C201]
- In Leon Gordon's (TH14) test of 24 September on synthetic data, a reader limited to one region asked about London and got London's figure. The route used maker credentials, and the log named the maker. The settings pane is not proof of the caller. [C204, C202]
- Aaron Merrill and Cristian Petculescu (OneLake security session): workspace Admins, Members and Contributors read all OneLake data. Leon Gordon (TH14): editors are exempt from model row-level security. [C308, C206]

## Each route runs as an identity

::diagram identity-routes

Only the Copilot Studio route was demonstrated. The other routes are from documentation that the speaker checked. [C201]

## Go deeper

<details id="six-layers"><summary>Build the security graph</summary>

Cristian Urbina Guerra's method has 5 steps: capture, normalize, relate, query and explain. A Fabric data agent then answers questions such as "Why can Alice see this?" [C306]

No single source holds the full picture: collect it from the Fabric REST, Power BI REST, OneLake and Microsoft Graph APIs. Start with Microsoft Graph, and flatten nested groups so that each user links to each group. [C303, C304]

Workspace Admins, Members and Contributors read all OneLake data. Microsoft Learn names one exception: in the user's identity mode of the SQL analytics endpoint, row-level security applies to all users. [C308]

</details>

<details id="onelake-roles"><summary>OneLake roles and shortcuts</summary>

Aaron Merrill and Cristian Petculescu (OneLake security session) showed that a OneLake security role has 3 parts: who (members), what (permission) and target. The target is a schema, table, column, row or folder. A user in more than one role gets the union of the roles. [C307]

A passthrough shortcut checks the user at the target. A delegated shortcut reads the target with a fixed identity. Then the consumer roles narrow the result. They cannot widen it. [C309]

Shortcuts to external storage, such as S3 or ADLS Gen2, always use a delegated identity. Delegated OneLake shortcuts also work across tenants. [C310]

A new permissions view answers 2 questions: "Who has access to this table?" and "What data can this user see?" The slide showed OneLake security roles only. In our reading, the view does not show semantic model security or access through groups. [C311]

</details>

<details id="routes"><summary>The route table, the tests and the customer case</summary>

| Route | The query runs as | Status |
|---|---|---|
| Foundry data agent tool | The signed-in user, on behalf of the reader | Preview |
| Foundry Fabric IQ tool | A delegated user | Preview |
| Copilot Studio, Fabric IQ Data MCP tool | The reader or the maker | Generally available |
| Direct MCP client | A user or service principal token | Service principal access: preview |

The speaker checked the documentation on 15 to 17 September and the status on 23 to 25 September 2026. [C201]

In the speaker's test of 15 September, on the Fabric IQ route in Teams, 4 of 4 answers matched the reference figure. The caller was established at Fabric in 0 of 4. The data was synthetic, in the speaker's own tenant. The speaker states that no accuracy rate comes from 4 answers. [C203]

In the speaker's enterprise case, model questions ran on behalf of the user, so row-level security applied. A tool call ran as a service principal, so it did not. The speaker marks this case "customer reported, not inspected". [C205]

</details>

<details id="prove-the-caller"><summary>How to prove the caller</summary>

In the operation log of the semantic model, the ExecutingUser field must name each reader account. Workspace logging was in preview in the speaker's tenant on 17 September 2026. [C207]

In a Privileged Identity Management test, the same request was denied before activation, allowed during it and denied after. This was a controlled lab with an Azure Reader role, not a Fabric row-level security test. [C211]

</details>

## For practice

These points are our reading.

- Build the security graph first. Collect identities and groups, then workspaces, items and roles.
- For each agent, write down each route and the identity that each tool uses. Treat a route as maker access until a log names the reader.
- Review who holds an editor role or a workspace role above Viewer. Model row-level security and OneLake security roles do not limit them.

## Not confirmed

No session showed how to give an unattended agent a narrow identity in Fabric. Service principal access to data agents is in preview. [C214, C952] See [Open questions](/open-questions/#C952).
