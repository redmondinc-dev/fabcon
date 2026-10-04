# Site specification

## 1. Purpose

A public, static website that reports what two attendees learned at FabCon Europe 2026 (Barcelona, 28 September to 1 October 2026). The site name is "FabCon Europe 2026: AI, security and governance". The current content is from the notes of one attendee.

- **Readers:** a technical audience — CTO, developer leads, data leads, IT.
- **Use 1:** the attendee presents it live.
- **Use 2:** a reader explores it alone, with or without a guide.
- **Use 3:** a reader points an AI agent at it.

The site reports and connects ideas. It does not ask the readers for a decision.

## 2. Hard rules

1. The site is public. Do not put company-internal information on it.
2. Do not commit `private/`. It holds speaker decks, photos, raw notes and an internal brief.
3. Do not publish slide images, slide photos or copies of speaker illustrations. Draw new diagrams. Credit the speaker.
4. Each statement traces to a claim in `content/claims.json`. In the HTML, an unmarked statement is from a speaker's slide, and each other statement shows its evidence label. The Markdown twins, `claims.json` and the All findings page give a label for each claim.
5. Each claim is public on the All findings page with its label, sources and caveat. A thread page shows the main points only.
6. All content is readable without JavaScript.
7. Follow `plan/02-style-guide.md`.

## 3. Pages

| # | Path | Page | Content |
|---|---|---|---|
| 0 | `/` | Home | The message. The thread map. Our reading in 6 points. Where to start, by role. About this site. |
| 1 | `/context/` | Context | Thread 1 |
| 2 | `/access/` | Access and identity | Thread 2 |
| 3 | `/untrusted-input/` | Untrusted input | Thread 3 |
| 4 | `/governance/` | Evidence and governance | Thread 4 |
| 5 | `/production/` | Production reality | Thread 5 |
| 6 | `/concentration/` | Concentration | Thread 6 |
| 7 | `/signals/` | Where Fabric goes next | Status table of announcements |
| 8 | `/open-questions/` | Open questions | What is not confirmed, and the first tests |
| 9 | `/findings/` | All findings | Each claim with its label, sources and caveat. Generated from `claims.json`. |
| 10 | `/sessions/` | Sessions and focus | Sessions attended, the focus, what was not covered |
| 11 | `/sources/` | Sources | Bibliography with back-links |
| 12 | `/for-agents/` | For agents | How an AI agent reads this site |

The first version had eight threads. Identity joined Access, and Evidence joined Governance. The paths `/identity/` and `/evidence/` are redirect stubs to `/access/` and `/governance/`. They are in `redirects` in `content/site.json`. Each stub has a meta refresh, a visible link, `noindex`, and a script that keeps the `#` fragment.

The outline for each page is in `plan/03-outline.md`.

## 4. Navigation

- **Home is a hub.** The thread map is the main navigation. It is a diagram, and each node is a link.
- **Each thread page stands alone.** A reader who opens one page from a link understands it.
- **Linear path for presentation.** Left and right arrow keys go to the previous and next page in the order of the table above. Show "Previous" and "Next" links at the foot of each page. Only the six thread pages have a number in these links.
- **Top bar:** site name, the thread list, Sources, For agents.
- **Deep links:** each section heading and each claim has a stable `id`. Each claim has the anchor `#C###` on All findings and on each page that cites it. If a page does not cite the claim, a script sends the anchor to All findings.
- **Sources at the foot of a page:** a collapsed "Sessions on this page" block (numbers 1, 2, 3) and a visible "Documentation links" list (letters a, b, c). Each marker in the text links to its line. Each line links to `/sources/#<source-id>`.
- **Go deeper** sections use `<details>`. A link with a fragment opens the applicable `<details>`.
- No scroll-jacking. No autoplay. Honour `prefers-reduced-motion`.

## 5. Interaction

Interaction has one job: show more depth on request.

- Expand and collapse "Go deeper".
- Hover or focus on an evidence label shows its meaning.
- One interactive diagram on the Access and identity page: select a path from a user to data, and the page states why the user has access. It has a static fallback that shows all paths.
- A filter on the Signals page: by status (GA, Preview, Announced, Roadmap, Not available).

Do not add more. Simple wins.

## 6. Agent-friendly features

The human pages and the agent files come from the same source. They must not drift.

| Feature | Detail |
|---|---|
| `/llms.txt` | An index of all pages. One line each: title, URL of the Markdown twin, one-sentence description. Start with a 3-sentence summary of the site and the evidence rules. |
| `/llms-full.txt` | The full site as one Markdown file, in page order, with the numbered notes of each page. |
| Markdown twin | Each page is also at the same path with `.md` (for example `/access/index.md`). The twin includes the collapsed content and the text alternative of each diagram. |
| `<link rel="alternate" type="text/markdown">` | In the `<head>` of each page, pointing to its twin. |
| `/claims.json` and `/sources.json` | Published copies of `content/claims.json` and `content/sources.json`. |
| `/findings/` page | The claims register as a page, for people. Each claim has the anchor `#C###`. |
| "Copy page as Markdown" button | On each page. It copies the twin to the clipboard. This is the dependable control. |
| "Copy prompt" button | Copies a short prompt: "Read <URL of llms-full.txt>. Then answer my questions about this FabCon Europe 2026 site. Keep the evidence labels." |
| "Open in an assistant" links | Optional. Link formats differ by assistant and change. If you add them, keep them in one config file and test each one. |
| Semantic HTML | One `<h1>`. Ordered headings. `<main>`, `<nav>`, `<article>`, `<details>`. Tables are real tables. |
| Stable anchors | Do not change an `id` after publication. |
| `/for-agents/` page | States what the files are, the evidence labels, the date of the information, and the limits (speaker statements, not tested facts). |
| `robots.txt` | Allow all. |

## 7. Content source and build

- Write each page as a Markdown file with front matter in `content/pages/`.
- A small build step makes the HTML pages, the Markdown twins, `llms.txt`, `llms-full.txt` and the published JSON.
- Use a static generator with no client framework. A short Node script or Eleventy is enough. Choose the smaller option.
- Client code is plain HTML, CSS and JavaScript. No bundler is needed for the client.
- The build must fail if:
  - a page cites a claim id that is not in `content/claims.json`;
  - a claim cites a source id that is not in `content/sources.json`;
  - any path under `private/` is tracked by Git;
  - a sentence in a page message is longer than 12 words;
  - a redirect goes to a path that is not a page, or the thread of a claim has no page.
- The build reports sentences longer than 25 words as warnings.
- `scripts/check-dist` checks the built site: links and anchors, the redirect stubs, removed strings, that each claim is on All findings, the number of Go deeper blocks and diagrams for each thread page, and that the twins match the pages. Run it after each build.
- `scripts/source-share` reports, for each page, the share of the notes from each source.

## 8. Hosting

- GitHub Pages from the organization repository, built by a GitHub Actions workflow.
- The repository is public. Check that `.gitignore` excludes `private/` before the first commit.
- Use relative links so that the site works under a repository sub-path.

## 9. Design direction

- A reader sees one idea on each screen.
- Large type for the message. Plenty of space. A small number of colours.
- A light theme and a dark theme. Follow `prefers-color-scheme` and give a toggle.
- The thread map and the diagrams carry the visual identity. Do not use stock images or generated illustrations.
- Works at phone width.
- Meets WCAG 2.2 AA for contrast and keyboard use.

## 10. Before publication

- [ ] Check each web link in `content/sources.json`. The links were found on 4 October 2026 and were not all opened.
- [ ] Check each product status against Microsoft Learn on the day of publication. Update the "as of" date.
- [ ] Confirm that no page names the attendee's employer's systems or data.
- [ ] Confirm that `git ls-files private` returns nothing.
- [ ] Read each page aloud against the style guide.
- [ ] Open `llms-full.txt` in an assistant and ask three questions. Check that the answers keep the evidence labels.
