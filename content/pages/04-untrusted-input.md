---
page: untrusted-input
description: Why prompt injection has no complete fix, how it compares with SQL injection, and the controls that sit outside the model.
---

For SQL injection, parameterised queries are the primary defence. A language model has no such defence, so you limit what the agent can do. [C404, C402, C406]

::diagram injection-channels

## What the sessions said

- Mariusz Wójcik and Piotr Balik (W21) said that SQL injection and prompt injection use the same fault: no separation of code and data. [C401]
- The speakers said that there is no "sanitized" natural language. [C402]
- Prompt injection is number 1 in the OWASP Top 10 for LLM applications (2025). [C403]
- Never execute model output directly. Authorize each action on the server. [C406]

## Go deeper

<details id="one-channel"><summary>Why the model cannot separate instructions from data</summary>

Mariusz Wójcik and Piotr Balik (W21) said that instructions and untrusted data go through the same channel. Thus the model cannot fully separate them. [C402]

The slides gave SQL injection as CWE-89, with about 13,900 CVEs. [C403]

</details>

<details id="sql-defence"><summary>The defences for SQL injection</summary>

Mariusz Wójcik and Piotr Balik (W21) said that parameterised queries are the primary defence. Input validation and a web application firewall are additions, not replacements. Database accounts with least privilege limit all types of attack. [C404]

</details>

<details id="attack-types"><summary>The 5 types of prompt injection attack</summary>

Mariusz Wójcik and Piotr Balik (W21) showed 5 attack types: [C405]

- Direct.
- Indirect: hidden in documents, web pages or retrieved content.
- Obfuscated.
- Agent and multimodal.
- Amplified by many attempts.

Attackers combine them.

</details>

<details id="defences"><summary>The full list of defences for prompt injection</summary>

Mariusz Wójcik and Piotr Balik (W21) said that the defence is to limit what the agent can do: [C406]

- Never execute model output directly.
- Separate trusted instructions, user data and tool output.
- Use approved, parameterised actions.
- Authorize each action on the server.
- Give least privilege.
- Validate output.
- Monitor.
- Run agents in a sandbox.

</details>

<details id="sql-agent"><summary>How Microsoft limits its own SQL agent</summary>

Microsoft Learn says that GitHub Copilot agent mode in SQL Server Management Studio uses a local MCP server with a fixed set of tools. It works only with databases that the user can reach, or with credentials in a database CONSTITUTION.md file. [C407]

</details>

<details id="all-users"><summary>All users are a source of attack surface</summary>

The attendee's notes from the session by Mariusz Wójcik and Piotr Balik (W21) say that all users are a source of attack surface. Do not trust input, from AI or not. [C408]

No slide is held for this statement.

</details>

## For practice

These points are our reading of the statements above.

- Treat retrieved documents, tool results and user text as untrusted input.
- Give each agent the least access that the task needs. This control still works when the model is fooled.
- Keep parameterised queries for all SQL that an agent generates or triggers.

## Not confirmed

What do a "database constitution" and database instructions contain in practice? The attendee's notes name them. No slide is held. [C954]

See [Open questions](/open-questions/#C954).
