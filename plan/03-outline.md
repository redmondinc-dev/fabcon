# Page outlines

Each outline gives the message, the diagram and the claims for one page, as the page is now.
Claim ids refer to `content/claims.json`. Source ids refer to `content/sources.json`.
The page text is in `content/pages/`. The titles, messages and page order are in `content/site.json`.

Page pattern and writing rules: `plan/02-style-guide.md`.

A thread page shows the main points only. Each claim is on the All findings page (`/findings/`), with its label, sources and caveat. A claim that is not in an outline below is on that page only.

History: the first version had eight threads. On 4 October 2026, Identity joined Access, and Evidence joined Governance. The paths `/identity/` and `/evidence/` are redirect stubs.

---

## 0. Home

**Message:** Fabric gives agents context. Control and proof are a work in progress.

**Order of the page:**

1. **Thread map** (the main diagram and the main navigation), directly below the message. Four groups, six threads. Each node is a link.
2. **Our reading.** Six points. Each point is a bold line, one sentence, and links to its threads. A line below links to All findings (C001, C002).
3. **Where to start, by role.** IT and security, governance, data and analytics.
4. **About this site.** The scope (two attendees, one main focus, and the data engineer's additions with the label "Attendee account"), "Nothing here was tested in our own tenant", and the label rule. This block stays at the foot of the page.
5. **More.** Where Fabric goes next, Open questions, All findings, For agents.

| Group | Thread | Message |
|---|---|---|
| **Context** | 1. Context | An agent can use only the context that you give it. |
| **Limits** | 2. Access and identity | Access is a path, not a permission. |
| | 3. Untrusted input | The model cannot fully separate instructions from data. |
| **Proof** | 4. Evidence and governance | A correct answer is not proof. |
| **Reality check** | 5. Production reality | In one speaker's estimate, the prototype is 10% of the work. |
| | 6. Concentration | Benefits and concentration can grow together. |

Diagram: an agent in the centre. Three things point at it: Context (what it knows), Limits (what it can reach and do), Proof (what it leaves behind). A band below, "Reality check", holds cost and dependency.

The six points of "Our reading": data is still the base (understand your data first); context is now a product layer; limits; proof; reality; it is early.

---

## 1. Context

**Message:** An agent can use only the context that you give it.

**Lead:** Fabric IQ adds an ontology, bound to data in OneLake. The ontology item is in preview. (C103, C108)

**Diagram:** `context-stack`. A stack, bottom to top: Data in OneLake → Semantic model (measures) → Ontology (preview; entities and relationships) → Agent. "Each translation removes some context." At the side: "What the model excludes: exceptions, dissent". Credit: after Luise Freese, INSPIRE01.

**What the sessions said:** C104, C106, C110, C111, C107.

**Go deeper:**
- `ontology-status`: what the ontology does, and its preview limits. The limits are dated 18 September 2026. Microsoft Learn changed on 1 October 2026. (C103, C108, C106)
- `prep-data-for-ai`: Prep data for AI and "Approved for Copilot". (C107)
- `readiness`: readiness is organizational work. (C113, C112)

**For practice:** "Understand your data first." is the first point. It is our reading, with no speaker and no claim.

**Not confirmed:** row-level security through an ontology. Learn documents it; we did not test it. (C951)

---

## 2. Access and identity

**Message:** Access is a path, not a permission.

**Lead:** A user can reach the same data through different paths. (C301, C302)

**Diagram 1 (interactive):** `access-paths`. Alice → Finance Users (group) → Finance Workspace → Semantic model → Lakehouse → Customer data, and a direct path through Finance Report. The reader selects a path. Static fallback: both paths visible. Credit: after Cristian Urbina Guerra, TH30.

**What the sessions said:** C301, C302, C201, C204 with C202, C308, C206. The London answer carries its limits in the same point: 24 September, synthetic data, maker credentials.

**Second section, "Each route runs as an identity":** diagram 2, `identity-routes`. One reader, four routes, and the identity that each route runs as. Credit: after Leon Gordon, TH14. (C201)

**Go deeper:**
- `six-layers`: build the security graph. (C306, C303, C304)
- `onelake-roles`: OneLake roles and shortcuts, the permissions view, and the Learn exception for workspace roles. From the second attendee: where the roles are set, and the access mode of the SQL endpoint. (C307, C308, C309, C310, C311, C316, C317, C907)
- `routes`: the route table, the tests and the customer case. The 4-of-4 result is stated here only: 15 September, Fabric IQ route in Teams. (C201, C203, C205)
- `prove-the-caller`: the operation log and the PIM test. (C207, C211)

**Not confirmed:** an identity for an unattended agent. (C214, C952)

---

## 3. Untrusted input

**Message:** The model cannot fully separate instructions from data.

**Lead:** There is no "sanitized" natural language. (C402)

**Diagram:** `injection-channels`. Left, "SQL": code and data in two channels. Right, "LLM": instructions and data in one channel. Below: the controls that sit outside the model. Credit: after Mariusz Wójcik and Piotr Balik, W21.

**What the sessions said:** C401, C403, C404, C406. "Limit what the agent can do" is our summary of the defence list.

**Go deeper:**
- `defences`: the 9 defences. (C406)
- `attack-types`: the 5 attack types, and the point on compacted conversations from the second attendee. (C405, C409)
- `sql-agent`: Copilot agent mode in SQL Server Management Studio, generally available. (C407)

**Not confirmed:** the database constitution. (C954)

---

## 4. Evidence and governance

**Message:** A correct answer is not proof.

**Lead:** In our reading, three sessions ask for evidence of what the agent did. (C514)

**Diagram 1:** `evidence-questions`. One answer, three questions from the Purview session, and the record that answers each question. The records are our reading.

**What the sessions said:** C504, C503, C505, C507. The "Resolved" capture is a session of 14 September on an older route (the "Standard route"), which is not in the route table.

**Second section, "Governance moves into the development loop":** diagram 2, `governance-loop`. Shared repository → development agent → pull request → human review → dev, test, production → governance agent → new pull request. Credit: after "Data Governance for Trust, Scale, and AI". (C604, C605)

**Go deeper:**
- `gates`: the test, the 5 gates (a design) and the evidence record. (C501, C502, C506, C505)
- `purview`: records, labels and licences. (C610, C508, C507, C608)
- `risks-and-controls`: the 8 risks and the 8 controls, with Entra Agent ID. (C601, C210)
- `obligation`: a metric needs an obligation, and contestability. Luise Freese. (C509, C510, C511)

**Not confirmed:** how Purview sees a custom agent. (C953)

---

## 5. Production reality

**Message:** In one speaker's estimate, the prototype is 10% of the work.

**Lead:** the estimate, with the speaker's name in the sentence. (C701)

**Diagram:** `effort-split`. Expected and actual effort for four categories. Credit: after Hasan Savran, W41. The caption says that it is the speaker's estimate and that the slide gave no data source.

**What the sessions said:** C701, C706, C703, C707, and the GPU-accelerated warehouse from the second attendee (C711, C713).

**Go deeper:**
- `cost`: cost for each useful answer, on a fictional workload. The two figures are not like for like. (C706)
- `capacity`: smoothing and throttling. (C707)
- `gateway`: the AI gateway, and retrieval. (C702, C704)
- `gpu-warehouse`: faster reads, at a higher rate. From the second attendee. (C711, C712, C713, C714, C715)
- `table-health`: check table health before you pay for speed. From the second attendee. (C716)

**Not confirmed:** the cost of Copilot Studio for each request. (C955)

---

## 6. Concentration

**Message:** Benefits and concentration can grow together.

**Lead:** usefulness can become dependency, and then lock-in. (C801, C803)

**Diagram:** `benefit-and-cost`. Four rows with a benefit and a cost: OneLake, semantic models, Copilots, integrated governance. Credit: after Luise Freese, INSPIRE01.

**What the sessions said:** C801, C802, C805, C806.

**Go deeper:**
- `both-true`: both things are true. (C801)
- `six-questions`: the 6 questions, and when the vendor changes the model. (C802, C804)
- `open-formats`: open engines, and what they do not cover. "This is how Microsoft answers the lock-in question" is our reading. (C805, C806)

**Not confirmed:** export of AI instructions and agent definitions. Learn documents an export for the ontology only. (C956)

---

## 7. Where Fabric goes next

**Message:** Fabric becomes the place where agents get context.

**Lead:** the announcements point one way. Our reading, with the press quote. (C914, C913)

**Main element:** a status table that the reader can filter by status. Each status is "as of 1 October 2026".

| Area | Item | Claim |
|---|---|---|
| Context | Fabric IQ and the ontology | C108, C103 |
| Context | Fabric IQ for agents outside Fabric | C910 |
| Agents | Fabric data agents and operations agents | C908 |
| Agents | Data engineering agent | C905 |
| Agents | Database agents | C902 |
| Agents | Database Hub | C909, C915 |
| Security | OneLake security | C312 |
| Security | Table Read API for agents | C906 |
| Security | Dynamic row-level security | C907 |
| Security | Data masking | C313 |
| Governance | Column metadata search | C314 |
| Governance | Insider risk for Fabric | C508 |
| Governance | AI-guided governance in the OneLake catalog | C912 |
| Governance | Fabric Atlas (community tool) | C606 |
| SQL | Live vector index | C901 |
| SQL | Developer tools | C903 |
| SQL | Automatic index compaction | C911 |
| SQL | GPU query acceleration | C711, C713 |
| Skills | DP-800 certification | C904 |
| Sovereignty | Sovereign private cloud | C807 |

**Go deeper:** the limits of these statements, and more detail on some rows. The detail holds the second attendee's points on the Database Hub and dynamic row-level security (C915, C916, C917, C918).

---

## 8. Open questions

**Message:** These are the things that we could not confirm.

- The questions: C951 to C956. For each: the question, why it matters, and what would answer it. State that nothing was tested in our own tenant (C957).
- **First tests:** the tests that can answer each question in our own tenant. Our reading.
- A status that the sources disagree on (C108). OneLake security is not in this list: Learn and the speakers agree (C312).
- Research that does not agree (C613).
- Statements that rest on notes only (C115, C408, C614, C912, C954), with links to All findings.

---

## 9. All findings

**Message:** Each claim, with its label, source and caveat.

Generated from `content/claims.json` by the `::findings-list` directive. One group for each thread page, then Where Fabric goes next, Open questions and Home. Each claim has the anchor `#C###`, each evidence label (also "Slide"), the status, the caveat, the sources, and the pages that cite it.

---

## 10. Sessions and focus

**Message:** One focus: applied AI, security and governance.

- The focus statement: two attendees, one main focus, and what the second attendee added.
- A table of the 14 sessions from `content/sources.json`: title, speaker where known ("Not named" where not), date, and the pages that use it.
- What this site does not cover: Power BI authoring, Real-Time Intelligence, data engineering practice, most SQL sessions.
- The evidence base in numbers. Keep the count of web sources equal to `content/sources.json`.

---

## 11. Sources

Generated from `content/sources.json` by the `::sources-list` directive. Groups: sessions, Microsoft, third party, research.
Each entry lists the pages and the claims that cite it. If no thread page cites it, the entry links to All findings.
State: "Slide content is paraphrased. Short quotes are marked. Slide images are not published."

---

## 12. For agents

See `plan/01-site-spec.md`, section 6.
