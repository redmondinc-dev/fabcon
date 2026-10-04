---
page: signals
description: A status table of the Fabric and SQL announcements from the conference, with the evidence and the status of each one.
---

The announcements point one way: agents in each layer, with one layer for security and governance below them. [C914]

A press report gave a statement from a Microsoft executive. "Fabric is becoming the center point for everything data at Microsoft and everything that's context based on data." [C913]

## The status table

Each status is as of 1 October 2026. Check it again before you use it.

<fieldset class="status-filter">
<legend>Show</legend>
<label><input type="radio" name="status" value="all" checked> All</label>
<label><input type="radio" name="status" value="ga"> GA</label>
<label><input type="radio" name="status" value="preview"> Preview</label>
<label><input type="radio" name="status" value="announced"> Announced</label>
<label><input type="radio" name="status" value="roadmap"> Roadmap</label>
<label><input type="radio" name="status" value="not-available"> Not available</label>
</fieldset>

| Area | Item | What the source says |
|---|---|---|
| Context | Fabric IQ and the ontology | Microsoft announced Fabric IQ as generally available. The ontology item stayed in preview. [C108, C103] |
| Context | Fabric IQ for agents outside Fabric | Fabric IQ context is available to Foundry, Copilot Studio, Microsoft 365 Copilot and MCP clients. [C910] |
| Agents | Fabric data agents and operations agents | Fabric data agents are generally available. Operations agents monitor real-time data and act. [C908] |
| Agents | Data engineering agent | Microsoft acquired Osmos in January 2026. Its technology is now a data engineering agent in Fabric. [C905] |
| Agents | Database agents | Database agents work across Azure SQL, SQL Server, Azure HorizonDB and Azure Database for PostgreSQL. [C902] |
| Agents | Database Hub | The Database Hub gives one view of databases across edge, cloud and Fabric, with a human in the loop. [C909] |
| Security | OneLake security | The speakers said that OneLake security is generally available. Eventhouse and external engines are in preview. [C312] |
| Security | Table Read API for agents | An agent reads a Delta or Iceberg table without SQL. OneLake applies table, column and row security on each read. [C906] |
| Security | Dynamic row-level security | Rules can use the name of the user and can join other tables. The estimate is the first quarter of 2027. [C907] |
| Security | Data masking | Data masking is not available. [C313] |
| Governance | Insider risk for Fabric | Insider Risk Management for Fabric is generally available. It needs a separate Purview purchase. [C508] |
| Governance | AI-guided governance in the OneLake catalog | The keynote covered AI-guided, policy-based governance in the OneLake catalog. No slide is held. [C912] |
| SQL | Live vector index | Azure SQL Database has vector compression and a live vector index. [C901] |
| SQL | Developer tools | Copilot chat in SQL Server Management Studio, Schema Compare, SQL Projects and a SQL formatter. [C903] |
| SQL | Automatic index compaction | It removes the need for scheduled index maintenance jobs. [C911] |
| Skills | DP-800 certification | A new certification: SQL AI Database Developer Associate. [C904] |
| Sovereignty | Sovereign private cloud | The keynote showed Foundry Local, data platform services and customer applications on Azure Local. [C807] |

Two rows have no status chip, because their sources state no status. They show only when the filter is "All".

## Go deeper

<details id="limits"><summary>The limits of these statements</summary>

- **Fabric IQ.** The sources disagree on the label of the workload. This site states a status for the ontology only. [C108]
- **OneLake security.** Microsoft Learn pages still used the word "preview" on 4 October 2026. [C312]
- **Live vector index.** Microsoft Learn says that index maintenance runs in the background. [C901]
- **Table Read API.** Billing is by rows scanned. [C906]
- **Dynamic row-level security.** The slide had the mark "NOT available yet". [C907]
- **DP-800.** Conference attendees get a free exam and 3 vouchers to share. The slide gave no expiry date. [C904]
- **AI-guided governance.** This is from the attendee's notes only. It is not confirmed in documentation. [C912]
- **The press quote.** It is a press report of a spoken statement. [C913]

</details>

<details id="more-detail"><summary>More detail on some rows</summary>

Database agents follow 5 steps: detect, understand, verify, learn, automate. They have skills, tools and connectors. [C902]

The Table Read API returns Apache Arrow. [C906]

The data engineering agent was announced in preview at this conference. [C905]

The DP-800 certification covers AI-augmented SQL development, AI-first applications, and security, governance and responsible AI. [C904]

The keynote notes also name mirroring of SharePoint and OneDrive. [C912]

The developer tools also include vector and JSON data in Data API builder. [C903]

</details>

## Not confirmed

See [Open questions](/open-questions/) for the statuses that the sources disagree on.
