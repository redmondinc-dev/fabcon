---
page: production
description: Where the effort and the cost of an AI project go after the prototype: evaluation, data, gateways and capacity.
---

Hasan Savran (W41) said that teams plan for the prototype. In the speaker's estimate, most of the effort is in evaluation, data preparation and infrastructure. [C701]

::diagram effort-split

## What the sessions said

- Hasan Savran (W41) estimated that the prototype is 10% of the effort, while teams expect 70%. [C701]
- Leon Gordon (TH14) said that you pay for each attempt, not for each answer. [C706]
- Hasan Savran said that applications must talk to an AI gateway, not to a model directly. [C702]
- He said that most retrieval-augmented generation (RAG) failures happen at the retrieval stage. Latency is one of the biggest adoption killers. [C704]

## Go deeper

<details id="effort"><summary>The effort split, and its limit</summary>

Hasan Savran (W41) gave this split: 10% prototype, 30% evaluation, 40% data preparation and RAG, and 20% infrastructure. [C701]

This is the speaker's estimate. The slide gave no data source.

</details>

<details id="cost"><summary>Cost: each useful answer, agent loops and budget guards</summary>

Leon Gordon (TH14) said that you pay for each attempt, not for each answer. In the speaker's fictional workload, a useful answer cost about GBP 0.15 on Fabric capacity. On a customer model deployment, it cost about GBP 0.064. [C706]

The workload is fictional. The prices are public list prices of 15 September 2026. Copilot credits were unknown and are not included. These are not real costs.

Hasan Savran (W41) said that an agent can loop on a failed tool call and spend money each time. Use budget guards, rate limits for each session, and cost alerts. [C703]

Technology that works is not enough. If back-end costs grow faster than the time saved, the result is a net loss. Hasan Savran's slide gave agentic workloads as 5 to 30 times more tokens. [C709]

The slide gave no data source for this figure.

</details>

<details id="capacity"><summary>Capacity: smoothing and throttling</summary>

Leon Gordon (TH14) showed that Fabric smooths AI work across 24 hours. Queries that the agent generates are interactive, and they throttle first. Throttling starts as a delay of 20 seconds. [C707]

This is the default policy from Microsoft Learn. The speaker verified it on 17 September 2026.

</details>

<details id="gateway"><summary>The AI gateway, and 3 layers of responsible AI</summary>

Hasan Savran (W41) said that the gateway gives model routing, cost tracking, token logging, access control, one API standard, and governance and audit. Models become replaceable. [C702]

The slide named LiteLLM as the example.

The speaker also showed 3 layers of responsible AI: [C705]

- Operational governance: gateways, logging, cost.
- Platform governance: safety filters, evaluations, guardrails.
- Organizational governance: policies, approvals, accountability, human in the loop.

</details>

<details id="rag"><summary>RAG: retrieval, latency and stale vectors</summary>

Hasan Savran (W41) said that most RAG failures happen at the retrieval stage. RAG latency is one of the biggest adoption killers in the enterprise. You must have a method to find vector data that is out of sync with the source. [C704]

</details>

<details id="advice"><summary>The speaker's 6 points of advice for AI development</summary>

Hasan Savran (W41) gave 6 points: [C708]

- Walk before you run.
- Control the prompts.
- Put technical guardrails in place.
- Have a plan for data poisoning.
- Set a caching strategy.
- Plan for generated data.

</details>

<details id="old-statistics"><summary>A note on old statistics</summary>

The session "Purview and data security protections" opened with adoption and risk statistics. Their sources are dated 2023 and 2024. [C710]

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
