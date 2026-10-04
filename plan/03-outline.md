# Page outlines

Each outline gives the message, the diagram and the claims for one page.
Claim ids refer to `content/claims.json`. Source ids refer to `content/sources.json`.
The outlines are a starting point. Change the wording, keep the evidence.

Page pattern and writing rules: `plan/02-style-guide.md`.

---

## 0. Home

**Main message:** An agent needs context, limits and proof.

**Second line:** Microsoft Fabric now has a feature for each. The work to join them is ours. *(Our reading.)*

**Thread map (the main diagram and the main navigation).** Four groups, eight threads. Each node is a link.

| Group | Thread | One-line message |
|---|---|---|
| **Context** | 1. Context | An agent can use only the context that you give it. |
| **Limits** | 2. Identity | Each route to the data uses a different identity. |
| | 3. Access | Access is a path, not a permission. |
| | 4. Untrusted input | The model cannot separate instructions from data. |
| **Proof** | 5. Evidence | A correct answer is not proof. |
| | 6. Governance in the loop | Governance moves into the development loop. |
| **Reality check** | 7. Production reality | The prototype is 10% of the work. |
| | 8. Concentration | Benefits and lock-in grow together. |

Diagram idea: an agent in the centre. Three things point at it: Context (what it knows), Limits (what it can reach and do), Proof (what it leaves behind). A fourth band below, "Reality check", holds cost and dependency.

**Also on the home page:**

- **The focus.** "I went to FabCon with one focus: applied AI in the Microsoft stack, and the security and governance of it. This site reports that part of the conference. It does not cover the full event." Link to Sessions.
- **The limit.** "Each statement here is from a speaker, from Microsoft or from a third party. We did not test it in our own tenant." (C957)
- **How to read.** Read the message on each page. Open "Go deeper" for the evidence. Each number links to a source.
- Links: Where Fabric goes next, Open questions, For agents.

---

## 1. Context

**Message:** An agent can use only the context that you give it.

**Why it matters:** Microsoft now treats business context as the product. The semantic model was the top layer. Now there is a layer above it.

**Diagram:** A stack, bottom to top: Data in OneLake → Semantic model (measures) → Ontology (entities and relationships) → Agent. At each arrow, show a small loss: "each translation removes some context" (after Luise Freese). At the side, a box "What the model excludes: exceptions, dissent" with a dashed line that does not reach the agent.

**What the sessions said:**
- Microsoft put "your context" at the centre of the keynote. (C101, C102)
- The ontology holds business entities and relationships, and binds them to data. (C103) `Preview`
- Keep measures in the semantic model. Add an ontology when agents must navigate related concepts. (C104)
- Each translation from people to model removes context. The agent cannot see what the model excludes. (C110, C111)
- AI-ready data makes assumptions executable. (C112)

**Go deeper:**
- Fabric IQ status and the preview limits of the ontology. (C108, C106, C105)
- Prep data for AI and "Approved for Copilot". (C107)
- How Microsoft describes data agents: "context engineering". (C109)
- The ontology demo and its description field. (C114, C115)
- Readiness is organizational work. (C113)

**For practice:**
- Treat the quality of the semantic model as a control. Descriptions, AI instructions and verified answers decide what each AI surface says.
- Name an owner for each definition. The tool is easy. The agreement on what "customer" means is hard.
- Do not put an ontology in a production plan while it is in preview.

**Not confirmed:** How the ontology applies row-level security. (C951)

---

## 2. Identity

**Message:** Each route to the data uses a different identity.

**Why it matters:** An agent answers with the access of the identity that runs the query. If that identity is the builder, each reader sees the builder's data.

**Diagram (can be interactive):** One reader on the right, the data on the left. Four routes between them: Foundry data agent tool, Foundry Fabric IQ tool, Copilot Studio, direct MCP client. For each route, show "runs as": the reader, a delegated user, reader **or** maker, reader **or** service principal. Mark the status of each. Credit: after Leon Gordon, TH14.

**What the sessions said:**
- Four routes, four identity contracts. (C201)
- The settings pane shows a choice. It is not proof of the caller. (C202)
- In the demo, 4 of 4 answers were correct. The caller was proved in 0 of 4. (C203)
- A reader with one region received a different region's figure. (C204)
- A tool call that runs as a service principal skips row-level security. (C205)

**Go deeper:**
- The route table with status and dates. (C201)
- Model row-level security does not bind editors. (C206)
- How to prove the caller from the operation log. (C207)
- Passthrough and delegated engine modes in OneLake. (C213)
- Entra Agent ID: what it is, and where the sessions named it. (C209, C210)
- Eligibility is not access: the PIM test. (C211)
- Five isolation controls. (C212)
- Service principals and data agents: the sources and what each says. (C201, C208)

**For practice:**
- For each agent, write down each route and the identity that each tool uses.
- Treat a route as maker access until a log names the reader.
- Decide the identity model for each workload: on behalf of the reader for interactive use, a narrow agent identity for unattended use.

**Not confirmed:** A pattern for unattended agents. (C214, C952) How Entra Agent ID works with Fabric. (C210)

---

## 3. Access

**Message:** Access is a path, not a permission.

**Why it matters:** A user can reach the same data through different paths. To know what an agent can reach, you must compute the paths.

**Diagram (interactive):** A small graph. Alice → Finance Users (group) → Finance Workspace → Finance Report → Semantic Model → Lakehouse → Customer Data. A second, direct path: Alice → Finance Report. The reader selects a path, and the page states the answer to "Why can Alice see this?". Static fallback: both paths visible with labels "direct" and "through a group". Credit: after Cristian Urbina Guerra, TH30.

**What the sessions said:**
- Access comes from six layers. A permission is not effective access. (C301, C302)
- No single source of truth exists. You collect it from four API families. (C303)
- OneLake roles are who, what, target. Multiple roles give the union. (C307)
- Workspace Admins, Members and Contributors read all OneLake data. Only Viewers are limited by roles. (C308)
- A delegated shortcut can narrow access. It cannot widen it. (C309)

**Go deeper:**
- The five-step method: capture, normalize, relate, query, explain. (C306)
- What to collect from Microsoft Graph and from the Fabric APIs, and the 200 requests per hour limit. (C304, C305)
- Shortcuts: passthrough, delegated, external, cross-tenant. A second small diagram for the rule "consumer roles ∩ target roles". (C309, C310)
- The new permissions view. (C311)
- OneLake security status by engine. (C312)
- Column-level security and the lack of data masking. (C313)
- Column metadata becomes searchable. (C314)
- Engine choice as a security decision. (C315) `Third party`

**For practice:**
- Build the security graph first. Collect identities and groups, then workspaces, items and roles.
- Review who holds an editor role. Editors are outside row-level and OneLake role limits.
- Check each engine and each shortcut for the identity that it uses.

**Not confirmed:** C315 needs a check against Microsoft Learn.

---

## 4. Untrusted input

**Message:** The model cannot separate instructions from data.

**Why it matters:** SQL injection has a full fix: parameterised queries. Prompt injection has no full fix. You limit what the agent can do.

**Diagram:** Two columns. Left, "SQL": code and data in two channels (a query with a parameter slot). Right, "LLM": instructions and data in one channel (one stream into the model). Under the right column, the controls that sit outside the model: least privilege, approved actions, server-side authorization, output validation, sandbox. Credit: after Mariusz Wójcik and Piotr Balik, W21.

**What the sessions said:**
- Both attacks use the same fault: no separation of code and data. (C401)
- There is no "sanitized" natural language. (C402)
- Prompt injection is number 1 in the OWASP list for LLM applications. (C403)
- Never execute model output directly. Authorize each action on the server. (C406)

**Go deeper:**
- The SQL injection defence table. (C404)
- The five prompt injection attack types. (C405)
- The full defence list. (C406)
- How Microsoft limits its own SQL agent: a fixed tool set and a constitution file. (C407) `Preview`
- "All users are a source of attack surface." (C408) `Notes`

**For practice:**
- Treat retrieved documents, tool results and user text as untrusted input.
- Give each agent the least access that the task needs. This is the control that still works when the model is fooled.
- Keep parameterised queries for all SQL that an agent generates or triggers.

**Not confirmed:** What a "database constitution" contains in practice. (C954)

---

## 5. Evidence

**Message:** A correct answer is not proof.

**Why it matters:** An agent can give the correct number with the incorrect identity. A status of "Resolved" can hide an empty answer. You need a record of what the agent did.

**Diagram:** One answer in the centre with three questions around it, taken from the Purview test: "What data did the AI use?", "Was it allowed?", "What happened next?". Each question links to the record that answers it: query log, caller log, audit and outcome. A red mark where the record is missing by default.

**What the sessions said:**
- Microsoft's test: "Can you explain what data AI used, whether it was allowed, and what happened next?" (C501)
- Gate each answer: meaning, access, retrieval, calculation, response. (C502)
- Rules validate figures. Models review wording. (C503)
- "Resolved" is not a correct answer. (C504)
- "100% approved" counts clicks, not judgment. (C509)

**Go deeper:**
- The five gates with what each does on failure. Keep the speaker's status for each gate. (C502)
- Tracing: Foundry gives one trace; Copilot Studio needs a designed identifier. (C505)
- The evidence record and when to repeat a test. (C506)
- Allowed and denied tests. (C512)
- A release is a version, checks, an owner and a rehearsed recovery. (C513)
- Purview: DSPM for AI, audit, insider risk. What to turn on. (C507, C508)
- A metric needs an obligation. Contestability needs infrastructure. (C510, C511)
- Three sessions, one demand. (C514) `Our reading`

**For practice:**
- For each agent, keep four fields for each answer: the question, the generated query, the caller, the result.
- Add a correlation identifier before go-live.
- Use rules for numbers. Use a model judge for wording only.
- Make human review real: give the reviewer time, evidence and the authority to stop.

**Not confirmed:** How Purview records a custom agent. (C953)

---

## 6. Governance in the loop

**Message:** Governance moves into the development loop.

**Why it matters:** A committee cannot keep pace with agents. The sessions put governance into domains, labels, Git and pull requests.

**Diagram:** A loop. Shared repository (context, MCP servers, skills) → development agent → pull request → human review → dev, test, production → governance agent reviews the tenant → new pull request. Mark the human review step clearly. Credit: after "Data Governance for Trust, Scale, and AI", FabCon Europe 2026.

**What the sessions said:**
- Eight AI risks, eight controls. Show as a table. (C601)
- One governed repository for what agents know and can do. (C604)
- A governance agent proposes fixes. A human approves. (C605)
- Start with sensitivity labels. Keep the set small. (C608)
- Some controls are in Fabric. Some need a Purview licence. (C610)

**Go deeper:**
- Two modes: conversational analytics and agentic development. (C602)
- Four AI maturity steps. (C603)
- Domains and guardrails. (C607)
- Data loss prevention that contains, not only alerts. (C609)
- The five Purview tools. (C611)
- The Govern tab in the OneLake catalog. (C612)
- Fabric Atlas. (C606)
- What research says about agent-written code. (C613) `Research`
- "Architecture and governance is what will make AI work." (C614) `Notes`

**For practice:**
- Put agent context, MCP servers and skills in one reviewed repository.
- Use pull requests as the control point for agent work.
- Map each control to "in Fabric" or "needs Purview" before a licence discussion.

**Not confirmed:** The status of data loss prevention "restrict access" for Fabric. (C609)

---

## 7. Production reality

**Message:** The prototype is 10% of the work.

**Why it matters:** Teams plan for the prototype. The effort and the cost are in evaluation, data and operations.

**Diagram:** A bar chart with two series, "Expected" and "Actual", for four categories: Prototype 70 / 10, Evaluation 10 / 30, Data preparation and RAG 10 / 40, Infrastructure 10 / 20. Credit: after Hasan Savran, W41. Label it as the speaker's estimate.

**What the sessions said:**
- Expected effort and actual effort. (C701)
- You pay for each attempt, not for each answer. (C706)
- Applications talk to an AI gateway, not to a model. (C702)
- Most RAG failures happen at retrieval. Latency kills adoption. (C704)

**Go deeper:**
- Cost per useful answer, with the speaker's limits. Fictional workload. (C706)
- Capacity: smoothing and throttling. (C707)
- Agent loops, budget guards and cost alerts. (C703, C709)
- Three layers of responsible AI. (C705)
- The speaker's six decisions for AI development. (C708)
- A note on old statistics. (C710)

**For practice:**
- Plan evaluation and data work as the main effort.
- Measure cost per useful answer. Include retries.
- Put a gateway between applications and models: routing, logging, limits, cost.

**Not confirmed:** The cost of Copilot Studio for each request. (C955)

---

## 8. Concentration

**Message:** Benefits and lock-in grow together.

**Why it matters:** The platform that holds your context becomes hard to leave. This is a design choice to make with open eyes, not a reason to stop.

**Diagram:** A table of four rows with a benefit on the left and a cost on the right: OneLake (less fragmentation / more data gravity), semantic models (shared meaning / fixed assumptions), Copilots (wider access / assumptions at scale), integrated governance (more visibility / more control). Draw it new. Credit: after Luise Freese, INSPIRE01.

**What the sessions said:**
- Both things are true. (C801)
- Six questions test what you can still choose. (C802)
- Useful, adopt, depend, lock-in. (C803)
- Microsoft's answer: open formats and open engines. (C805)

**Go deeper:**
- When the vendor changes the model. (C804)
- OneLake security APIs for any engine. (C806) `Preview`
- Sovereign private cloud. (C807)
- What open formats do not cover. (C805 caveat, C956)
- Custom agents and Purview coverage. (C808)

**For practice:**
- Keep definitions, instructions and history in a form that you can export.
- Keep agent context in a repository that you own, not only in a vendor interface.
- Record model and platform changes, and name who checks them.

**Not confirmed:** Export of ontologies, AI instructions and agent definitions. (C956)

---

## 9. Where Fabric goes next

**Message:** Fabric becomes the place where agents get context.

**Why it matters:** The announcements point one way: agents in each layer, with one security and governance layer below them. *(Our reading; see C913 for the press quote.)*

**Main element:** A status table that the reader can filter by status. Each row has an "as of 1 October 2026" date.

| Area | Item | Claim |
|---|---|---|
| Context | Fabric IQ and the ontology | C108, C103 |
| Context | Fabric IQ for agents outside Fabric | C910 |
| Agents | Fabric data agents and operations agents | C908 |
| Agents | Data engineering agent (from Osmos) | C905 |
| Agents | Database agents and the Database Hub | C902, C909 |
| Security | OneLake security | C312 |
| Security | Table Read API for agents | C906 |
| Security | Dynamic row-level security | C907 |
| Security | Data masking | C313 |
| Governance | Insider risk for Fabric | C508 |
| Governance | AI-guided governance in the OneLake catalog | C912 |
| SQL | Live vector index | C901 |
| SQL | Developer tools | C903 |
| SQL | Automatic index compaction | C911 |
| Skills | DP-800 certification | C904 |
| Sovereignty | Sovereign private cloud | C807 |

---

## 10. Open questions

**Message:** These are the things that we could not confirm.

List C951 to C957. For each: the question, why it matters, and what would answer it.
State clearly: nothing here was tested in our own tenant (C957).
Also list the product-status disagreements (C108, C312) and the claims that rest on notes only (C115, C408, C614, C912, C954).

---

## 11. Sessions and focus

**Message:** One attendee, one focus: applied AI, security and governance.

- The focus statement.
- A table of the 12 sessions from `content/sources.json`: title, speaker where known, date, and the threads that it feeds.
- What this debrief does not cover: Power BI authoring, Real-Time Intelligence, data engineering practice, most SQL sessions.
- The evidence base in numbers: 12 sessions across 3 days, 6 slide decks with about 250 slides, 77 photos of slides, and 34 web sources.

---

## 12. Sources

Generate from `content/sources.json`. Group by: sessions, Microsoft, third party, research.
Each entry lists the pages that cite it.
State: "Slide content is paraphrased. Short quotes are marked. Slide images are not published."

---

## 13. For agents

See `plan/01-site-spec.md`, section 6.
