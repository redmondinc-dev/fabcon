# FabCon Europe 2026: AI, security and governance

A public static website, the debrief of a conference. It reports what two attendees learned at FabCon Europe 2026 (Barcelona, 28 September to 1 October 2026) about applied AI, security and governance in Microsoft Fabric.

Most of the content is from the slides and notes of one attendee. The second attendee (focus: data engineering) added statements from his summary deck. They carry the evidence value `account`.

Readers are a technical audience: CTO, developer leads, data leads, IT. The attendee presents the site live. Readers also explore it alone, and point AI agents at it.

## Read first

1. `plan/01-site-spec.md` — pages, navigation, agent features, build rules.
2. `plan/02-style-guide.md` — writing rules (STE-inspired), glossary, evidence labels.
3. `plan/03-outline.md` — message, diagram and claims for each page.
4. `plan/04-design.md` — visual design: colours, type, chips, page layout. Token values are in `plan/design-tokens.css`.
5. `content/claims.json` — the claims register. Every statement on the site traces to a claim.
6. `content/sources.json` — the bibliography.
7. `content/site.json` — the page order, titles, messages and redirects.

The site has six thread pages: Context, Access and identity, Untrusted input, Evidence and governance, Production reality, Concentration. The old paths `/identity/` and `/evidence/` are redirect stubs.

If the folder `private/` exists on this machine, read `private/README.md` at the start of a session. It is local context only.

## Rules that do not change

- **Public repository.** Do not commit anything under `private/`. Do not copy text from `private/` into a tracked file, except facts that are already in `content/claims.json`.
- **No speaker images.** Do not publish slide images, slide photos or copies of speaker illustrations. Draw new diagrams as inline SVG. Credit the speaker.
- **Credit.** Use the speaker's name where `content/sources.json` has it. If not, cite the session title and "FabCon Europe 2026". Do not write "Microsoft said" for a community speaker.
- **Evidence.** Follow the label rule in `plan/02-style-guide.md`, section 4. Keep each `caveat` that changes the meaning of a statement. Speaker statements are not tested facts. Fictional and synthetic numbers stay labelled.
- **All findings.** Each claim is public on `/findings/`. A thread page shows the main points only, so a claim can leave a thread page. A claim does not leave `claims.json`.
- **New facts.** To add or change a statement, check it against the source first: a public page that you open in that session, or the transcript. To add a statement, add a claim first, with a source. If the source is a deck or photo, read the transcript in `private/sources/transcripts/`. If the transcript is not enough, read the original in `private/sources/decks/` or `private/sources/photos/`. One exception, decided by the owner on 6 October 2026: a statement from the second attendee can rest on his summary deck alone. Give it the evidence value `account` ("Attendee account").
- **Simple wins.** One message for each page, 12 words maximum for each sentence. A reader must understand the page from the message and the diagram. A thread page has a fixed budget: see `plan/02-style-guide.md`, section 1.
- **No JavaScript dependency for content.** All text, including collapsed sections, is in the HTML.
- **Product status has a date.** The status values in the claims are "as of 1 October 2026". Check them again before publication.

## Working method

- Write page content as Markdown in `content/pages/`. The build makes HTML, Markdown twins, `llms.txt` and `llms-full.txt` from the same source.
- Keep the build small. No client framework.
- After each content change, run the build (`npm run build`) and then `scripts/check-dist`. The build checks claim ids, source ids, sentence length and that nothing under `private/` is tracked. `scripts/check-dist` checks links, anchors, the redirect stubs and the page budgets. `scripts/source-share` reports the share of each source on each page.
- Commit in small steps. Use a branch for each page.

## What is not decided

- Open items are in local notes on the owner's machine. They are not tracked.
