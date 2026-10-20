# Style guide

This site uses writing rules that come from ASD-STE100 (Simplified Technical English).
The site is **STE-inspired, not STE-compliant**. Full compliance needs the licensed STE dictionary. Do not claim compliance.

Simple wins. If a rule and clarity disagree, choose clarity.

## 1. The page pattern

Each thread page has the same parts, in this order:

1. **Message.** 12 words maximum for each sentence. A reader who reads only this line must get the idea. A message does not state a speaker's estimate or our reading as a fact.
2. **Lead.** 1 or 2 sentences, 30 words maximum, with its claims. It is correct without the rest of the page.
3. **Diagram.** One, directly after the lead. It shows the mechanism, not decoration.
4. **What the sessions said.** About 4 short points. Each point names its presenter and has a source marker. The best example goes here, with the limit that changes its meaning in the same point (for example "on synthetic data, with maker credentials").
5. **Go deeper.** Collapsed by default. 6 blocks maximum; 3 is the usual number. Evidence, tables, speaker limits, product status. A block does not repeat a point from part 4.
6. **For practice.** The line "These points are our reading." and then 3 points maximum.
7. **Not confirmed.** 1 or 2 sentences and a link to the Open questions page.

The visible text of a thread page is about 250 words. The detail that does not fit is on the All findings page: each claim is public there, so a thread page does not need to hold each claim.

The two pages that came from a merge (Access and identity, Evidence and governance) have a second diagram. It is lower on the page, below its own heading that states its point.

A reader must understand the page from parts 1 to 3 alone.

When a result comes from a demo, give its date and its route. Different runs of one demo are different results.

## 2. Sentence rules

- One topic in each sentence.
- 20 words maximum in an instruction. 25 words maximum in a description.
- 6 sentences maximum in a paragraph.
- Use the active voice. Write "The agent reads the table", not "The table is read by the agent".
- Use simple tenses: present, past, future.
- Write instructions as commands. "Prove the caller."
- Put the condition first. "If the route uses maker credentials, all readers see the maker's data."
- Use a vertical list for 3 or more items.
- Keep the article ("the", "a"). Do not write telegraphic text in body copy.
- No noun clusters longer than 3 words. Write "security for the data plane", not "data plane security role evaluation".
- Avoid the -ing form as a noun or a modifier where a simple verb works.
- No idioms, no metaphors, no jokes that need culture to decode. Speaker quotes are the exception and stay verbatim.
- Do not use these words as filler: leverage, robust, seamless, powerful, unlock, journey, landscape, game-changer.
- Use digits for numbers.

## 3. One word, one meaning

Use each term below with one meaning only. Do not use a synonym for it.

| Term | Meaning on this site |
|---|---|
| agent | Software that uses a language model to choose and run actions. |
| caller | The identity that Fabric sees when a query runs. |
| maker | The person who built the agent. "Maker credentials" are the builder's credentials. |
| reader | The person who asks the agent a question. |
| route | One path from the reader to the data, through one product stack. |
| identity | A user, group, service principal or agent identity in Microsoft Entra. |
| service principal | An application identity. Write it in full first, then "SPN" is allowed. |
| permission | A right that is granted on one object. |
| effective access | What an identity can reach in fact, through all paths. |
| path | The chain of memberships, roles and relationships from an identity to data. |
| semantic model | The Power BI or Fabric model that holds measures and relationships. |
| ontology | The Fabric IQ item that holds business entities and their relationships. |
| context | The business meaning that an agent needs to give a correct answer. |
| passthrough | The engine or shortcut uses the reader's identity. |
| delegated | The engine or shortcut uses a fixed identity. |
| row-level security (RLS) | Rules that limit which rows an identity sees. |
| evidence | A record that shows what happened. |
| control | A setting or process that limits or records what an agent does. |
| generally available (GA) | Microsoft supports the feature for production. |
| preview | Microsoft released the feature for test. It can change. |
| claim | One statement in `content/claims.json`. |

Product names keep the vendor's spelling: Microsoft Fabric, OneLake, Fabric IQ, Microsoft Purview, Microsoft Entra, Copilot Studio, Microsoft Foundry.

## 4. Evidence labels

The label comes from the `evidence` field of the claim. In the HTML, a statement from a slide has no label, and each other statement shows its label. The home page and the For agents page state this rule. The Markdown twins, `claims.json` and the All findings page give a label for each claim, also "Slide". In one list or one paragraph, the same label shows one time only.

| Label on the site | Claim value | Meaning |
|---|---|---|
| Slide | `slide` | A speaker showed it. It is the speaker's statement. |
| Notes | `notes` | From the attendee's notes. No slide is held. |
| Microsoft | `docs` | From Microsoft documentation or a Microsoft blog. |
| Third party | `third-party` | From an independent article or a vendor. |
| Research | `research` | From an academic paper. |
| Attendee account | `account` | The second attendee's report of a session. Not checked against a slide. |
| Our reading | `inference` | A conclusion that we made. |

Product status shows as a second chip where it applies: **GA**, **Preview**, **Announced**, **Roadmap**, **Not available**.
Each status chip carries the date "as of 1 October 2026" in its tooltip and in the Markdown twin.

Rules:

- Do not turn a speaker statement into a fact. Write "The speaker showed…" or "The slide said…".
- Keep the speaker's own limits. If a caveat changes the meaning of a statement, put it in the same sentence or the next one. The All findings page shows each caveat.
- Do not write an absolute statement about what a source does not have. Write "We found no…".
- Fictional or synthetic numbers stay labelled as fictional or synthetic each time they appear.
- An account statement is the report of the second attendee. Give the speaker and the session as he gave them. It is not checked against a slide or a transcript.
- Nothing on the site was tested in our own tenant. The home page and the Open questions page say this.

## 5. Credit and quotation

- Credit a speaker by name where `content/sources.json` has the name. If it has no name, cite the session title and "FabCon Europe 2026".
- Do not write "Microsoft said" for a community speaker.
- Do not publish a slide image, a slide photo or a redrawn copy of a slide illustration. Draw new diagrams.
- A direct quote is 25 words maximum, in quotation marks, with a source marker.
- A diagram that follows a speaker's idea carries a credit line: "After <speaker>, <session>".

## 6. Source markers

- A source marker is a number (a session) or a letter (a web source) in the text. It links to a line at the foot of the page.
- "Sessions on this page" is collapsed. Each line gives the presenter, the session code and the slides or photos used, and links to the Sources page.
- "Documentation links" is visible. Each line gives the publisher and the title, with the public link.
- The Sources entry links back to each place that cites it.
- The Markdown twin keeps the full numbered notes for each claim: speaker or session title, session code if known, date, and the slide number or "photo".

## 7. Diagrams

- One idea in each diagram. 7 labelled parts maximum.
- Labels use glossary terms.
- Each diagram has a text alternative that states the same idea in 1 to 3 sentences. The text alternative also goes in the Markdown twin.
- Colour is not the only signal. Use a label, a line style or a shape as well.
- Inline SVG. It must work in a light theme and a dark theme.

## 8. Tone

- Direct. State the point, then stop.
- No sales language about Microsoft or about the attendee.
- State limits and open questions plainly.
- The attendee's focus is stated once, on the home page and on the Sessions page. Do not repeat it on each page.
