---
page: untrusted-input
description: Why prompt injection has no complete fix, how it compares with SQL injection, and the controls that sit outside the model.
---

Mariusz Wójcik and Piotr Balik (W21) said that there is no "sanitized" natural language. Thus a model cannot fully separate instructions from untrusted data. [C402]

::diagram injection-channels

## What the sessions said

- Mariusz Wójcik and Piotr Balik (W21) said that SQL injection and prompt injection use the same fault: no separation of code and data. [C401]
- Their slide put prompt injection at number 1 in the OWASP Top 10 for LLM applications (2025). [C403]
- For SQL injection, they said that parameterised queries are the primary defence. Input validation and a web application firewall are additions, not replacements. [C404]
- For prompt injection, their slide listed 9 defences, such as least privilege and authorization of each action on the server. "Limit what the agent can do" is our summary of the list. [C406]

## Go deeper

<details id="defences"><summary>The 9 defences for prompt injection</summary>

Mariusz Wójcik and Piotr Balik (W21) listed these defences: [C406]

- Never execute model output directly.
- Separate trusted instructions, user data and tool output.
- Use approved, parameterised actions.
- Authorize each action on the server.
- Validate input.
- Give least privilege.
- Validate output.
- Monitor.
- Run agents in a sandbox.

</details>

<details id="attack-types"><summary>The 5 types of prompt injection attack</summary>

Mariusz Wójcik and Piotr Balik showed 5 attack types: direct, indirect, obfuscated, agent and multimodal, and amplified by many attempts. Indirect attacks hide in documents, web pages or retrieved content. Attackers combine them. [C405]

The speakers also said that a conversation can be easier to attack after it is compacted. [C409]

</details>

<details id="sql-agent"><summary>How agent mode in SQL Server Management Studio is limited</summary>

Microsoft Learn says that GitHub Copilot agent mode in SQL Server Management Studio uses a local MCP server with a predefined set of tools. You can add tools with MCP servers and agent skills. Queries run as the user, or as a database user that the CONSTITUTION.md file of the database names. [C407]

Microsoft said on 29 September 2026 that agent mode is generally available.

</details>

## For practice

These points are our reading.

- Treat retrieved documents, tool results and user text as untrusted input.
- Give each agent the least access that the task needs. This control still works when the model is fooled.
- Keep parameterised queries for all SQL that an agent generates or triggers.

## Not confirmed

What are a "database constitution" and database instructions, and how do skills and plugins work with coding agents? [C954]

See [Open questions](/open-questions/#C954).
