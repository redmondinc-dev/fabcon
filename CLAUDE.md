# FabCon Europe 2026 debrief site

A public static website. It reports what one attendee learned at FabCon Europe 2026 (Barcelona, 28 September to 1 October 2026) about applied AI, security and governance in Microsoft Fabric.

Readers are a technical audience: CTO, developer leads, data leads, IT. The attendee presents the site live. Readers also explore it alone, and point AI agents at it.

## Read first

1. `plan/01-site-spec.md` — pages, navigation, agent features, build rules.
2. `plan/02-style-guide.md` — writing rules (STE-inspired), glossary, evidence labels.
3. `plan/03-outline.md` — message, diagram and claims for each page.
4. `plan/04-design.md` — visual design: colours, type, chips, page layout. Token values are in `plan/design-tokens.css`.
5. `content/claims.json` — the claims register. Every statement on the site traces to a claim.
6. `content/sources.json` — the bibliography.

If the folder `private/` exists on this machine, read `private/README.md` at the start of a session. It is local context only.

## Rules that do not change

- **Public repository.** Do not commit anything under `private/`. Do not copy text from `private/` into a tracked file, except facts that are already in `content/claims.json`.
- **No speaker images.** Do not publish slide images, slide photos or copies of speaker illustrations. Draw new diagrams as inline SVG. Credit the speaker.
- **Credit.** Use the speaker's name where `content/sources.json` has it. If not, cite the session title and "FabCon Europe 2026". Do not write "Microsoft said" for a community speaker.
- **Evidence.** Show the evidence label of each claim. Keep each `caveat`. Speaker statements are not tested facts. Fictional and synthetic numbers stay labelled.
- **New facts.** To add a statement, add a claim first, with a source. If the source is a deck or photo, read the transcript in `private/sources/transcripts/`. If the transcript is not enough, read the original in `private/sources/decks/` or `private/sources/photos/`.
- **Simple wins.** One message for each page, 12 words maximum. A reader must understand the page from the message and the diagram.
- **No JavaScript dependency for content.** All text, including collapsed sections, is in the HTML.
- **Product status has a date.** The status values in the claims are "as of 1 October 2026". Check them again before publication.

## Working method

- Write page content as Markdown in `content/pages/`. The build makes HTML, Markdown twins, `llms.txt` and `llms-full.txt` from the same source.
- Keep the build small. No client framework.
- After each content change, run the build checks (claim ids, source ids, sentence length, nothing tracked under `private/`).
- Commit in small steps. Use a branch for each page.

## What is not decided

- The static generator (a short Node script or Eleventy).
- The final wording of each message. The outline gives a first version.
