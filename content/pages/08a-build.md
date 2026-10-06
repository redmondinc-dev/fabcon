---
page: build
description: What the data engineering agent in Fabric (Project Osmos) does, how a task runs, what it costs, and what we could not confirm.
---

Project Osmos is a data engineering agent in Fabric, in preview. A task reports complete only after the agent validates the result. [C720, C730, C722]

::diagram osmos-task

## What the sessions said

- Naresh Venkat and Achraf Cherki Elidrissi (W08): the agent runs within your Fabric permissions and guardrails. A task can coordinate more than 100 agent sessions. [C721, C720]
- Naresh Venkat and Achraf Cherki Elidrissi (W08): "A Task reports complete only when the outcome clears the bar." A failed validation goes back to build. [C722]
- Naresh Venkat and Achraf Cherki Elidrissi (W08): people define the contract. The agent decides within policy, and leaves inspectable assets and independent evidence. [C727]
- Naresh Venkat and Achraf Cherki Elidrissi (W08): the agent does not go outside OneLake. It has no internet access. [C728]

## Go deeper

<details id="start-a-task"><summary>How a user starts a task</summary>

A user starts a task from a coding agent: GitHub Copilot CLI, Claude Code, Codex or Cursor. The skills-for-fabric plugin connects it. [C723]

Copilot in the Fabric portal cannot start the agent yet. [C724]

The agent is in preview. Trial capacities are not supported. A user needs the Contributor role or higher. [C730]

Before a run, the user reviews 8 settings, such as the permission boundary and the safety pattern. [C731]

The task inherits the workspace permissions. Other members act on the same task, and the agent asks them for input. [C726]

</details>

<details id="cost"><summary>What the agent costs</summary>

The agent bills to the Fabric capacity, on the Copilot and AI meter. The Spark notebooks that it runs bill separately. [C732]

The capacity use of the agent comes in peaks. The speakers suggested an F0 capacity. Microsoft announced F0 as coming soon. [C729, C915]

</details>

<details id="harness"><summary>Inside the harness</summary>

A root orchestrator sends work to many Spark worker agents and many validation agents. A review step comes last. Process and outcome reward models guide a recursive search. [C725]

The speakers listed target project types, such as more than 2,000 Hadoop tables or 130 ERP systems. [C733]

</details>

## For practice

These points are our reading.

- Start with one pilot task on a lakehouse that is not in production. Choose the staging safety pattern.
- Write the validation that you expect into the task description.
- Watch the "Project Osmos" operation in the capacity metrics before you add more tasks.

## Not confirmed

We found no public documentation for the task REST API. We did not test the agent. See [Open questions](/open-questions/#C958).
