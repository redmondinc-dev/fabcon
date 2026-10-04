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

Each page also has a "Copy page as Markdown" button and a "Copy prompt" button.

## The evidence labels

Each statement on the site shows one label. Keep the label when you repeat a statement.

| Label | Value in claims.json | Meaning |
|---|---|---|
| Slide | `slide` | A speaker showed it. It is the speaker's statement. |
| Notes | `notes` | From the attendee's notes. No slide is held. |
| Microsoft | `docs` | From Microsoft documentation or a Microsoft blog. |
| Third party | `third-party` | From an independent article or a vendor. |
| Research | `research` | From an academic paper. |
| Our reading | `inference` | A conclusion that we made. |

A second label gives the product status where it applies: GA, Preview, Announced, Roadmap or Not available.

## The limits

- Speaker statements are not tested facts. Nothing here was tested in our own tenant. [C957]
- Each product status is as of 1 October 2026. Check it against Microsoft Learn before you use it.
- The web sources were found on 4 October 2026.
- Fictional and synthetic numbers are labelled. Keep that label.
- If a claim has a caveat, give the caveat with the claim.

## Anchors

Each claim has a stable anchor on the page that cites it, for example `#C201`. Each source has an anchor on the [Sources](/sources/) page, for example `#W03`.
