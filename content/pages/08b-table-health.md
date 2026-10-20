---
page: table-health
description: Why the SQL analytics endpoint slows down on lakehouse tables, how to find the problem table, and the cost of GPU acceleration.
---

Lakehouse tables get no automatic maintenance. A procedure on the SQL analytics endpoint reports the worst problem of each table. [C740, C742]

::diagram table-health

## What the sessions said

- Filip Popović and Maraki Ketema (W29): lakehouse tables degrade silently. A slow SQL endpoint can be a table problem. [C740]
- Filip Popović and Maraki Ketema (W29) matched 3 symptoms to 3 actions: small files, deleted rows and an old checkpoint. [C741]
- Filip Popović and Maraki Ketema (W29): the warehouse has a SQL front end, a query processor and a pool of compute nodes over OneLake. [C748]
- Filip Popović and Maraki Ketema (W29): GPU acceleration applies to all queries after you turn it on. It is for SELECT queries on the gold layer. [C749]

## Go deeper

<details id="health-check"><summary>Find the problem table</summary>

The procedure sys.sp_get_table_health_metrics reports the most severe problem of one table. It also gives histograms of file sizes and row counts. [C742]

For many deleted rows, the documentation recommends OPTIMIZE first. REORG TABLE APPLY (PURGE) forces the removal. [C743]

OPTIMIZE, REORG and VACUUM do not run on the SQL analytics endpoint. Run them from Spark. [C744]

The target is about 2 million rows for each file, and most files between 1 and 16 GiB. [C745]

</details>

<details id="write-and-sync"><summary>Write settings and metadata sync</summary>

V-Order mainly helps Direct Lake. It is generally not required for the SQL analytics endpoint. [C746]

Metadata sync is usually less than 1 minute behind. It stops after 15 minutes with no queries. [C747]

A new metadata sync is in preview. It applies only to endpoints that you create after you turn it on. [C753]

</details>

<details id="gpu"><summary>GPU acceleration and its cost</summary>

GPU query acceleration is in limited preview. One workspace setting turns it on for all warehouses and endpoints. A change of the setting cancels running queries. [C711, C714]

With acceleration on, a warehouse core uses 3.446 capacity units, against 0.538 without it. All queries in the workspace use the accelerated meter. [C713, C714]

Acceleration helps reads only. It is available in 5 regions. [C711, C715]

</details>

## For practice

These points are our reading.

- Run the health procedure on your largest lakehouse tables on a schedule.
- If it reports a problem, run OPTIMIZE from a notebook. Then run the procedure again.
- Test the cost of GPU acceleration in one workspace before you turn it on in more workspaces.

## Not confirmed

The notes name an upgrade to "SQL analytics endpoint 2.0". We found no Microsoft page that uses the name. See [Open questions](/open-questions/#C959).
