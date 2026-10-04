---
page: production
description: Where the effort and the cost of an AI project go after the prototype: evaluation, data, gateways and capacity.
---

Hasan Savran (W41) estimated that the prototype is 10% of the effort in an LLM project. Teams expect 70%. [C701]

::diagram effort-split

## What the sessions said

- Hasan Savran (W41) put the rest at 30% evaluation, 40% data preparation and RAG, and 20% infrastructure. This is his estimate. The slide gave no data source. [C701]
- Leon Gordon (TH14) said that you pay for each attempt, not for each answer. His cost figures come from a fictional workload. [C706]
- Hasan Savran said that an agent can loop on a failed tool call and spend money each time. Use budget guards, rate limits for each session, and cost alerts. [C703]
- Leon Gordon showed that queries that the agent generates are interactive, and they throttle first. [C707]

## Go deeper

<details id="cost"><summary>Cost for each useful answer, on a fictional workload</summary>

In Leon Gordon's (TH14) fictional workload, a useful answer cost about GBP 0.15 on Fabric capacity and about GBP 0.064 on a customer model deployment. [C706]

The figures are not like for like. The second figure does not include Fabric capacity for the data. Fabric capacity is at the one-year reservation rate for UK South. Other lines are at public list prices of 15 September 2026. Copilot credits were unknown and are not included. These are not real costs.

</details>

<details id="capacity"><summary>Capacity: smoothing and throttling</summary>

Leon Gordon (TH14) showed that Fabric smooths AI work across 24 hours. Throttling starts as a delay of 20 seconds. [C707]

This is the default policy from Microsoft Learn. The speaker verified it on 17 September 2026.

</details>

<details id="gateway"><summary>The AI gateway, and retrieval</summary>

Hasan Savran (W41) said that applications must talk to an AI gateway, not to a model directly. The gateway gives model routing, cost tracking, token logging, access control, one API standard, and governance and audit. Models become replaceable. The slide named LiteLLM as the example. [C702]

He said that most RAG failures happen at the retrieval stage. RAG latency is one of the biggest adoption killers in the enterprise. You must have a method to find vector data that is out of sync with the source. [C704]

</details>

## For practice

These points are our reading.

- Plan evaluation and data work as the main effort.
- Measure the cost for each useful answer. Include retries.
- Put a gateway between applications and models: routing, logging, limits, cost.

## Not confirmed

What does Copilot Studio cost for each request? The speaker said that the quantity of Copilot credits for each request is not published. [C955]

See [Open questions](/open-questions/#C955).
