# Site specification

## 1. Purpose

A public, static website that reports what one attendee learned at FabCon Europe 2026 (Barcelona, 28 September to 1 October 2026).

- **Readers:** a technical audience — CTO, developer leads, data leads, IT.
- **Use 1:** the attendee presents it live.
- **Use 2:** a reader explores it alone, with or without a guide.
- **Use 3:** a reader points an AI agent at it.

The site reports and connects ideas. It does not ask the readers for a decision.

## 2. Hard rules

1. The site is public. Do not put company-internal information on it.
2. Do not commit `private/`. It holds speaker decks, photos, raw notes and an internal brief.
3. Do not publish slide images, slide photos or copies of speaker illustrations. Draw new diagrams. Credit the speaker.
4. Each statement traces to a claim in `content/claims.json`, and shows its evidence label.
5. All content is readable without JavaScript.
6. Follow `plan/02-style-guide.md`.

## 3. Pages

| # | Path | Page | Content |
|---|---|---|---|
| 0 | `/` | Home | The main message. The thread map. The attendee's focus. "Nothing here was tested in our tenant." |
| 1 | `/context/` | Context | Thread 1 |
| 2 | `/identity/` | Identity | Thread 2 |
| 3 | `/access/` | Access | Thread 3 |
| 4 | `/untrusted-input/` | Untrusted input | Thread 4 |
| 5 | `/evidence/` | Evidence | Thread 5 |
| 6 | `/governance/` | Governance in the loop | Thread 6 |
| 7 | `/production/` | Production reality | Thread 7 |
| 8 | `/concentration/` | Concentration | Thread 8 |
| 9 | `/signals/` | Where Fabric goes next | Status table of announcements |
| 10 | `/open-questions/` | Open questions | What is not confirmed |
| 11 | `/sessions/` | Sessions and focus | Sessions attended, the attendee's focus, what was not covered |
| 12 | `/sources/` | Sources | Bibliography with back-links |
| 13 | `/for-agents/` | For agents | How an AI agent reads this site |

The outline for each page is in `plan/03-outline.md`.

## 4. Navigation

- **Home is a hub.** The thread map is the main navigation. It is a diagram, and each node is a link.
- **Each thread page stands alone.** A reader who opens one page from a link understands it.
- **Linear path for presentation.** Left and right arrow keys go to the previous and next page in the order of the table above. Show "Previous" and "Next" links at the foot of each page.
- **Top bar:** site name, the thread list, Sources, For agents.
- **Deep links:** each section heading and each claim has a stable `id`. An endnote links to `/sources/#<source-id>`.
- **Go deeper** sections use `<details>`. A link with a fragment opens the applicable `<details>`.
- No scroll-jacking. No autoplay. Honour `prefers-reduced-motion`.

## 5. Interaction

Interaction has one job: show more depth on request.

- Expand and collapse "Go deeper".
- Hover or focus on an evidence label shows its meaning.
- One interactive diagram on the Access page: select a path from a user to data, and the page states why the user has access. It needs a static fallback that shows all paths.
- An optional second interactive element on the Identity page: select a route, and the page shows the identity that the route uses.
- A filter on the Signals page: by status (GA, Preview, Roadmap).

Do not add more. Simple wins.

## 6. Agent-friendly features

The human pages and the agent files come from the same source. They must not drift.

| Feature | Detail |
|---|---|
| `/llms.txt` | An index of all pages. One line each: title, URL of the Markdown twin, one-sentence description. Start with a 3-sentence summary of the site and the evidence rules. |
| `/llms-full.txt` | The full site as one Markdown file, in page order, with endnotes resolved to source entries. |
| Markdown twin | Each page is also at the same path with `.md` (for example `/identity/index.md`). The twin includes the collapsed content and the text alternative of each diagram. |
| `<link rel="alternate" type="text/markdown">` | In the `<head>` of each page, pointing to its twin. |
| `/claims.json` and `/sources.json` | Published copies of `content/claims.json` and `content/sources.json`. |
| "Copy page as Markdown" button | On each page. It copies the twin to the clipboard. This is the dependable control. |
| "Copy prompt" button | Copies a short prompt: "Read <URL of llms-full.txt>. Then answer my questions about the FabCon Europe 2026 debrief. Keep the evidence labels." |
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
  - a body sentence in "Message" is longer than 12 words.
- Add a check that reports sentences longer than 25 words as warnings.

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
