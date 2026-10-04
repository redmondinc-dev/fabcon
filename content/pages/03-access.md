---
page: access
description: Why a permission is not effective access in Fabric, how to compute the paths, and what OneLake security covers.
---

A user can reach the same data through different paths. To know what an agent can reach, you must compute the paths. [C302]

::diagram access-paths

## What the sessions said

- Cristian Urbina Guerra said that access in Fabric comes from 6 layers. A permission is not the same as effective access. [C301, C302]
- The speaker said that no single source of truth exists. You collect the picture from 4 API families. [C303]
- The OneLake session showed that a OneLake security role has 3 parts: who, what and target. A user in more than one role gets the union. [C307]
- Workspace Admins, Members and Contributors can read all data in OneLake. Only Viewers are limited by OneLake security roles. [C308]
- The consumer roles on a delegated shortcut can narrow access. They cannot widen it. [C309]

## Go deeper

<details id="six-layers"><summary>The 6 layers of access</summary>

The speaker named 6 layers: identity, workspace, item, data, inheritance and relationships. [C301]

The speaker said that security is a graph, not a list. [C302]

</details>

<details id="method"><summary>The method: capture, normalize, relate, query, explain</summary>

The speaker's method has 5 steps: capture, normalize, relate, query and explain. A Fabric data agent then answers questions such as "Why can Alice see this?" [C306]

</details>

<details id="collect"><summary>What to collect, and the limit of 200 requests each hour</summary>

The complete picture comes from 4 API families: the Fabric REST APIs, the Power BI REST APIs, the OneLake APIs and the Microsoft Graph APIs. [C303]

Start with Microsoft Graph. Collect users, service principals, managed identities, groups and group members. Flatten nested groups so that each user links to each group. [C304]

The Fabric admin APIs list workspaces, items and workspace access. The endpoints for item access and OneLake roles are limited to 200 requests each hour. [C305]

The tenant-level endpoints need Fabric admin rights.

</details>

<details id="roles"><summary>OneLake security roles and workspace roles</summary>

A OneLake security role has 3 parts: who (members), what (permission) and target. The target is a schema, table, column, row or folder. [C307]

Workspace Admins, Members and Contributors can read all data in OneLake. Only Viewers get their data access from OneLake security roles. [C308]

The roadmap on the slide listed "Restrict Admin/Member/Contributor access" as committed.

</details>

<details id="shortcuts"><summary>Shortcuts: passthrough, delegated, external, cross-tenant</summary>

A passthrough shortcut checks the user at the target. A delegated shortcut reads the target with a fixed identity. Then the consumer roles narrow the result. [C309]

The slide gave the rule as A ∩ (C ∪ D).

Shortcuts to external storage, such as S3 or ADLS Gen2, always use a delegated identity. Delegated OneLake shortcuts also work across tenants. [C310]

</details>

<details id="permissions-view"><summary>The new permissions view</summary>

A new permissions view in OneLake answers 2 questions: "Who has access to this table?" and "What data can this user see?" [C311]

The view covers OneLake security roles. It does not cover semantic model security or group paths.

</details>

<details id="status-by-engine"><summary>OneLake security status for each engine</summary>

The speakers said that OneLake security is generally available. It filters data for Lakehouse, Spark notebooks, the SQL analytics endpoint, semantic models and Fabric Graph. Eventhouse and external engines are in preview. [C312]

Microsoft Learn pages still used the word "preview" on 4 October 2026.

</details>

<details id="columns"><summary>Column-level security, and no data masking</summary>

Column-level security removes hidden columns in Spark and Power BI. In SQL, the query must leave out the hidden columns. Data masking is not available. [C313]

</details>

<details id="metadata"><summary>Column metadata becomes searchable</summary>

Column metadata will become searchable in the OneLake catalog by default. A user with Read permission on an item will see its table names, column names and descriptions. A tenant setting controls this. [C314]

</details>

<details id="engine-choice"><summary>The choice of engine is a security decision</summary>

An independent article says that Direct Lake over SQL and the SQL endpoint in delegated mode do not pass the user identity to OneLake. [C315]

Check this against Microsoft Learn before you rely on it.

</details>

## For practice

These points are our reading of the statements above.

- Build the security graph first. Collect identities and groups, then workspaces, items and roles.
- Review who holds an editor role. Editors are outside the limits of row-level security and OneLake roles.
- Check each engine and each shortcut for the identity that it uses.

## Not confirmed

An independent article says that some engine modes do not pass the user identity to OneLake. We did not check this against Microsoft Learn. [C315]

See [Open questions](/open-questions/).
