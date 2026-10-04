---
page: home
description: Our reading in 6 points, the thread map, where to start by role, and the limit of this site.
---

Two of us went to FabCon Europe 2026. This site covers one focus: applied AI in the Microsoft stack, and its security and governance. Data engineering notes are not in yet. See [Sessions and focus](/sessions/).

Nothing here was tested in our own tenant. Each statement is from a speaker, from Microsoft or from a third party. [C957]

## Our reading

These 6 points are our conclusions from the sessions. [C001, C002]

1. **Data is still the base.** An agent is only as good as the data and the definitions behind it. Understand your data first. Name an owner for each definition. → [Context](/context/), [Production reality](/production/)
2. **Context is now a product layer.** Microsoft Fabric has a new layer above the semantic model: the ontology. It holds the knowledge that you built about your business. Each step from people to model removes some of it. The ontology is still in preview. → [Context](/context/)
3. **Limits: lock down what the agent can reach.** Access is a path, not a permission. Security is a graph, not a list. Each route to the data can use a different identity. A language model cannot separate instructions from data, so you limit what the agent can do. → [Access and identity](/access/), [Untrusted input](/untrusted-input/)
4. **Proof: show what the agent did.** A correct answer is not proof. The controls exist: Entra Agent ID, Privileged Identity Management, Purview and sensitivity labels. Some need a Purview licence. Joining them into one picture is still unsolved. → [Evidence and governance](/governance/)
5. **Reality: the prototype is the easy part.** In one speaker's estimate, most of the effort is in evaluation, data preparation and infrastructure. Benefits and lock-in grow together. Plan for both. → [Production reality](/production/), [Concentration](/concentration/)
6. **It is early.** Many questions are open. Nothing here was tested in our own tenant. The way that we use these tools is still ours to decide. → [Open questions](/open-questions/)

::thread-map

## Where to start, by role

- **IT and security:** [Access and identity](/access/), [Untrusted input](/untrusted-input/)
- **Governance:** [Evidence and governance](/governance/), [Concentration](/concentration/)
- **Data and analytics:** [Context](/context/), [Production reality](/production/)

## How to read

Unmarked statements are from a speaker's slide. Each source number leads to "Sessions on this page" and "Documentation links" at the foot of the page.

## More

- [Where Fabric goes next](/signals/)
- [Open questions](/open-questions/)
- [For agents](/for-agents/)
