---
page: production
description: Where the effort and the cost of an AI project go after the prototype: evaluation, data, gateways and capacity.
---

Teams plan for the prototype. In the speaker's estimate, most of the effort is in evaluation, data preparation and infrastructure. [C701]

::diagram effort-split

## What the sessions said

- Hasan Savran estimated that the prototype is 10% of the effort. Teams expect 70%. [C701]
- Leon Gordon said that you pay for each attempt, not for each answer. [C706]
- Applications must talk to an AI gateway, not to a model directly. [C702]
- Most RAG failures happen at the retrieval stage. Latency is one of the biggest adoption killers. [C704]

## Go deeper

<details id="effort"><summary>The effort split, and its limit</summary>

The speaker's split is 10% prototype, 30% evaluation, 40% data preparation and RAG, and 20% infrastructure. [C701]

This is the speaker's estimate. The slide gave no data source.

</details>

<details id="cost"><summary>Cost for each useful answer, on a fictional workload</summary>

You pay for each attempt, not for each answer. In the speaker's fictional workload, a useful answer cost about GBP 0.15 on Fabric capacity. On a customer model deployment, it cost about GBP 0.064. [C706]

The workload is fictional. The prices are public list prices of 15 September 2026. Copilot credits were unknown and are not included. These are not real costs.

</details>

<details id="capacity"><summary>Capacity: smoothing and throttling</summary>

Fabric smooths AI work across 24 hours. Queries that the agent generates are interactive, and they throttle first. Throttling starts as a delay of 20 seconds. [C707]

This is the default policy from Microsoft Learn. The speaker verified it on 17 September 2026.

</details>

<details id="loops"><summary>Agent loops, budget guards and cost alerts</summary>

An agent can loop on a failed tool call and spend money each time. Use budget guards, rate limits for each session, and cost alerts. [C703]

Technology that works is not enough. If back-end costs grow faster than the time saved, the result is a net loss. The slide gave agentic workloads as 5 to 30 times more tokens. [C709]

The slide gave no data source for this figure.

</details>

<details id="gateway"><summary>What an AI gateway gives</summary>

The gateway gives model routing, cost tracking, token logging, access control, one API standard, and governance and audit. Models become replaceable. [C702]

The slide named LiteLLM as the example.

</details>

<details id="rag"><summary>RAG: retrieval, latency and stale vectors</summary>

Most RAG failures happen at the retrieval stage. RAG latency is one of the biggest adoption killers in the enterprise. You must have a method to find vector data that is out of sync with the source. [C704]

</details>

<details id="responsible-ai"><summary>Three layers of responsible AI</summary>

The speaker showed 3 layers: [C705]

- Operational governance: gateways, logging, cost.
- Platform governance: safety filters, evaluations, guardrails.
- Organizational governance: policies, approvals, accountability, human in the loop.

</details>

<details id="advice"><summary>The speaker's 6 points of advice for AI development</summary>

Hasan Savran gave 6 points: [C708]

- Walk before you run.
- Control the prompts.
- Put technical guardrails in place.
- Have a plan for data poisoning.
- Set a caching strategy.
- Plan for generated data.

</details>

<details id="old-statistics"><summary>A note on old statistics</summary>

The Purview session opened with adoption and risk statistics. Their sources are dated 2023 and 2024. [C710]

This site does not quote these numbers as current.

</details>

## For practice

These points are our reading of the statements above.

- Plan evaluation and data work as the main effort.
- Measure the cost for each useful answer. Include retries.
- Put a gateway between applications and models: routing, logging, limits, cost.

## Not confirmed

What does Copilot Studio cost for each request? The speaker said that the quantity of Copilot credits for each request is not published. [C955]

See [Open questions](/open-questions/#C955).
