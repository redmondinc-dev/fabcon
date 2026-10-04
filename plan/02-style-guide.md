# Style guide

This site uses writing rules that come from ASD-STE100 (Simplified Technical English).
The site is **STE-inspired, not STE-compliant**. Full compliance needs the licensed STE dictionary. Do not claim compliance.

Simple wins. If a rule and clarity disagree, choose clarity.

## 1. The page pattern

Each thread page has the same parts, in this order:

1. **Message.** One sentence. 12 words maximum. A reader who reads only this line must get the idea.
2. **Why it matters.** 2 sentences maximum.
3. **Diagram.** One. It shows the mechanism, not decoration.
4. **What the sessions said.** 3 to 5 short points. Each point has an endnote.
5. **Go deeper.** Collapsed by default. Evidence, tables, speaker limits, product status.
6. **For practice.** 2 or 3 points: what an engineering or governance team does with this.
7. **Not confirmed.** What is open. Link to the Open questions page.

A reader must understand the page from parts 1 to 3 alone.

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

Each point in "What the sessions said" and "Go deeper" shows one label. The label comes from the `evidence` field of the claim.

| Label on the site | Claim value | Meaning |
|---|---|---|
| Slide | `slide` | A speaker showed it. It is the speaker's statement. |
| Notes | `notes` | From the attendee's notes. No slide is held. |
| Microsoft | `docs` | From Microsoft documentation or a Microsoft blog. |
| Third party | `third-party` | From an independent article or a vendor. |
| Research | `research` | From an academic paper. |
| Our reading | `inference` | A conclusion that we made. |

Product status shows as a second chip where it applies: **GA**, **Preview**, **Announced**, **Roadmap**, **Not available**.
Each status chip carries the date "as of 1 October 2026" in its tooltip and in the Markdown twin.

Rules:

- Do not turn a speaker statement into a fact. Write "The speaker showed…" or "The slide said…".
- Keep the speaker's own limits. If the claim has a `caveat`, show the caveat in "Go deeper".
- Fictional or synthetic numbers stay labelled as fictional or synthetic each time they appear.
- Nothing on the site was tested in our own tenant. The home page and the Open questions page say this.

## 5. Credit and quotation

- Credit a speaker by name where `content/sources.json` has the name. If it has no name, cite the session title and "FabCon Europe 2026".
- Do not write "Microsoft said" for a community speaker.
- Do not publish a slide image, a slide photo or a redrawn copy of a slide illustration. Draw new diagrams.
- A direct quote is 25 words maximum, in quotation marks, with an endnote.
- A diagram that follows a speaker's idea carries a credit line: "After <speaker>, <session>".

## 6. Endnotes

- Endnotes are numbers in the text. Each number links to an entry on the Sources page.
- The Sources entry links back to each place that cites it.
- An endnote for a session gives: speaker or session title, session code if known, date, and the slide number or "photo".

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
