---
page: sql
description: Which new SQL Server 2025 and Azure SQL features are generally available on-premises, the new AI tools for the database, and Database Hub.
---

SQL Server 2025 and Azure SQL added locking, index and AI features. Some are in Azure only, and some are off by default. [C764, C765]

::diagram sql-where

## What the sessions said

- Bob Ward and Borko Novakovic (TH15) listed features under "Faster and Smarter, By Default": optimized locking, ZSTD backup compression and query processing feedback. [C760]
- Bob Ward and Borko Novakovic (TH15): if data must stay on-premises, stay on SQL Server and mirror the data into Fabric. [C762]
- Erin Stellato and Anna Hoffman (TH02): automatic index compaction is generally available. Proactive automatic plan correction is new. [C768]
- Patrick LeBlanc and Charles Webb (T14): Database Hub works only if Azure Arc is on for the server. [C774]

## Go deeper

<details id="on-premises"><summary>Check each feature on-premises</summary>

In SQL Server 2025, optimized locking is generally available but off by default. It needs accelerated database recovery. [C765]

Automatic index compaction is for Azure SQL Database, Managed Instance and SQL database in Fabric. SQL Server 2025 does not have it. [C764]

In SQL Server 2025, the vector index is in preview. [C767]

Change event streaming is in preview. It cannot run on a database that also uses Fabric mirroring. [C766]

</details>

<details id="ai-for-the-database"><summary>AI tools for the database</summary>

Database instructions are extended properties named AGENTS.md. A constitution is one extended property named CONSTITUTION.md, with the highest priority. [C771]

The Query Store hint ABORT_QUERY_EXECUTION blocks future runs of a query. [C772]

SQL MCP Server is part of Data API builder. It has 7 tools. It does not change natural language into SQL. [C773]

Erin Stellato and Anna Hoffman (TH02): a tool is a callable function. There is no standard way to discover tools. [C770]

</details>

<details id="database-hub"><summary>Database Hub</summary>

Database Hub is in public preview and is free. It reads SQL Server through Azure Arc, and also Azure SQL, PostgreSQL and Cosmos DB. [C776]

For SQL Server performance data, the hub needs SQL Server 2016 SP1 or later, on Windows. The license must be Software Assurance or pay-as-you-go. [C777]

The hub does not support Fabric capacities in North Europe or West Europe. [C778]

Patrick LeBlanc and Charles Webb (T14) showed part 1 of a roadmap: configuration gaps, monitoring for many databases, and saved views. [C775]

</details>

<details id="troubleshooting-and-hyperscale"><summary>Troubleshooting and Hyperscale</summary>

Erin Stellato and Anna Hoffman (TH02): identify the problem, capture data, analyze it, test a hypothesis, and repeat. [C769]

Hyperscale separates compute from storage. Storage grows to 128 TB. It is for Azure SQL Database only. [C779]

</details>

## For practice

These points are our reading.

- Check the on-premises status of each feature before you plan an upgrade.
- Turn on accelerated database recovery before optimized locking. Then measure the version store.
- For each database, choose change event streaming or Fabric mirroring. You cannot have both.

## Not confirmed

We found no documentation that uses the word "proactive" for automatic plan correction. See [Open questions](/open-questions/).
