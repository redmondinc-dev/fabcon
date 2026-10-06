---
page: for-agents
description: How an AI agent reads this site: the Markdown files, the claims register, the evidence labels and the limits of the information.
---

This site is for people and for AI agents. Both get the same content from the same source.

## The files

- [llms.txt](/llms.txt) is an index of all pages. Each line gives the title, the Markdown file and a description.
- [llms-full.txt](/llms-full.txt) is the full site as one Markdown file, in page order, with the notes of each page.
- Each page has a Markdown twin at the same path: `index.md`. The twin includes the collapsed sections and the text of each diagram.
- [claims.json](/claims.json) is the claims register. Each claim has an evidence label, a product status, its sources and a caveat.
- [sources.json](/sources.json) is the bibliography.
- [All findings](/findings/) shows the claims register as a page. The thread pages show the main points only.

Each page also has a "Copy page as Markdown" button and a "Copy prompt" button.

## The evidence labels

In the HTML pages, an unmarked statement is from a speaker's slide. Each other statement shows its label: Microsoft, Third party, Research, Notes, Attendee account or Our reading. The Markdown twins, claims.json and the All findings page give a label for each claim. Keep the label when you repeat a statement.

| Label | Value in claims.json | Meaning |
|---|---|---|
| Slide | `slide` | A speaker showed it. It is the speaker's statement. |
| Notes | `notes` | From the attendee's notes. No slide is held. |
| Microsoft | `docs` | From Microsoft documentation or a Microsoft blog. |
| Third party | `third-party` | From an independent article or a vendor. |
| Research | `research` | From an academic paper. |
| Attendee account | `account` | The second attendee's report of a session. Not checked against a slide. |
| Our reading | `inference` | A conclusion that we made. |

A second label gives the product status where it applies: GA, Preview, Announced, Roadmap or Not available.

## The sources

Each HTML page ends with 2 source blocks:

- "Sessions on this page" is collapsed. It gives one line for each session, with a link to the [Sources](/sources/) page.
- "Documentation links" is visible. It lists the public web links on that page.

The Markdown twin keeps the full numbered notes for each claim.

## The limits

- Product status as of 1 October 2026. Web sources checked 4 October 2026. Speaker statements are not tested facts.
- Nothing here was tested in our own tenant. [C957]
- Check each product status against Microsoft Learn before you use it.
- Fictional and synthetic numbers are labelled. Keep that label.
- If a claim has a caveat, give the caveat with the claim.

## Anchors

Each claim has a stable anchor on the All findings page, for example `/findings/#C201`. A thread page that cites the claim has the same anchor. Each source has an anchor on the [Sources](/sources/) page, for example `#W03`.

The old paths `/identity/` and `/evidence/` now redirect to `/access/` and `/governance/`. Claim anchors such as `#C201` still work through the redirect. If a thread page does not cite the claim, the anchor goes to the All findings page.
