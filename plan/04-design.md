# Visual design

This file settles the look. It was written after the first skeleton existed (`site/site.css`, `site/layout.html`, the home page).
The skeleton is good. **Keep its structure.** This file changes values and adds a small number of rules.

Token values: `plan/design-tokens.css`. Merge them into `site/site.css`. Do not add a second stylesheet.

## 1. The direction

**A field report from a Fabric conference.** Clean, quiet, technical. One message on each screen.

- The site must feel like it belongs to the Fabric world: a cool white ground, a deep green signature colour, one yellow highlight.
- The site must not look like an official Microsoft or conference site. See section 9.
- The site must not look like a default AI-generated page: no cream paper ground, no serif headline, no orange accent, no gradients, no shadows.

## 2. What to keep from the skeleton

- The variable names `--bg`, `--ink`, `--muted`, `--line`, `--accent`, `--raise`.
- The system font stack. It shows Segoe UI on Windows, which is the typeface of the Microsoft products. It needs no download.
- The large bold `.message`.
- The line styles on the four groups (solid, dashed, dotted, double). Keep them as the second signal beside colour.
- The theme toggle, the skip link, the reduced-motion rule.
- The page width (`68rem`) and the text column (`42rem`).

## 3. What to change

| Now | Change to | Why |
|---|---|---|
| `--bg: #fbfaf7` (warm) | `#f6f8f6` (cool, green-tinted) | The warm ground reads as a default AI look. |
| `--accent: #0b5d5a` | `#0b6b57` | A little greener. Closer to the Fabric feel. |
| Groups differ by line style only | Line style **and** a group colour (`--g-context`, `--g-limits`, `--g-proof`, `--g-reality`) | A reader sees the group at a glance. Line style keeps it readable without colour. |
| Chips are pills (`border-radius: 999px`) | `--radius-sm` (2px), mono font, uppercase | A label, not a button. |
| Each status chip is dashed | One line style for each status. See section 5. | The status must be readable without the text. |
| Chip border uses `--muted` | `--border` | One token for lines that carry meaning. |
| `button` border uses `--line` | `--border` | `--line` is below 3:1. A control needs 3:1. |
| `:focus-visible` 3px | 2px solid `--accent`, 2px offset | Matches the token rule. Either is acceptable; use one. |
| `.map-agent` on `--raise` | `--mark` fill with `--on-mark` text | The one place the highlight is used on the home page. |
| No `--sunk`, `--border`, `--mark` | Add them | Needed for the thread pages. |

## 4. Colour rules

1. Text is `--ink`. Secondary text is `--muted`.
2. Links and the focus ring are `--accent`.
3. A group colour shows which group a thread belongs to. Use it for: the top border of a group, the group label, the group marker on a thread page, and the one part of a diagram that the page is about. Do not use a group colour for emphasis, status or decoration.
4. Text on a group colour fill is `--on-group`.
5. `--mark` is a fill only. Put `--on-mark` text on it. Use it for one thing on a page at most: the agent node on the thread map, or one highlighted cell in a diagram.
6. `--line` is for decorative hairlines. `--border` is for any line that carries meaning.
7. No gradients. No shadows. Separate surfaces with a hairline or a change of ground.

## 5. Evidence labels and status chips

These are monochrome. Colour does not carry their meaning.

**Evidence label** (`SLIDE`, `NOTES`, `MICROSOFT`, `THIRD PARTY`, `RESEARCH`, `OUR READING`):
`--font-mono`, 0.75rem, weight 500, uppercase, `letter-spacing: 0.08em`, `--muted` text, 1px solid `--border`, `--radius-sm`, padding `0 0.5rem`.

**Status chip**: same type and shape. The line style gives the status.

| Status | Style |
|---|---|
| `GA` | `--ink` fill, `--bg` text, 1px solid `--ink` |
| `PREVIEW` | 1px **dashed** `--border`, `--ink` text |
| `ANNOUNCED`, `ROADMAP` | 1px **dotted** `--border`, `--muted` text |
| `NOT AVAILABLE` | 1px solid `--border`, `--muted` text, `text-decoration: line-through` |

Put the date beside a status chip the first time it appears on a page: "as of 1 Oct 2026", in the label style, `--muted`.

## 6. Type

One family for text, one for labels. No web fonts.

| Use | Family | Size | Line height | Weight |
|---|---|---|---|---|
| Message, home page | `--font-sans` | `clamp(2.25rem, 7vw, 4.75rem)` | 1.04 | 700 |
| Message, other pages | `--font-sans` | `clamp(2rem, 5vw, 3.5rem)` | 1.08 | 700 |
| Why it matters (the paragraph after the message) | `--font-sans` | 1.3125rem | 1.45 | 400 |
| Section heading (`h2`) | `--font-sans` | 1.375rem | 1.25 | 650 |
| Body | `--font-sans` | 1.0625rem | 1.6 | 400 |
| Small: captions, credit lines, table cells | `--font-sans` | 0.9375rem | 1.45 | 400 |
| Label: chips, group names, thread numbers, the page kicker | `--font-mono` | 0.75rem | 1.35 | 500, uppercase, `letter-spacing: 0.08em` |
| Code, identifiers, claim ids | `--font-mono` | 0.9375rem | 1.6 | 400 |

- Sentence case everywhere except the label style.
- Body lines: 68 characters maximum (the `42rem` column does this).
- Message: `letter-spacing: -0.02em`, `text-wrap: balance`.

## 7. Layout of a thread page

Top to bottom. Each part is already in the page pattern of `plan/02-style-guide.md`.

1. **Kicker.** A 1rem square in the group colour, then a label: `LIMITS · THREAD 02 OF 08` in the group colour.
2. **Message** (`h1` content), then **Why it matters**.
3. **Diagram** in a frame: `--raise` ground, 1px `--border`, `--radius-md`, padding `--space-3`. A title above. A caption below with the credit line on the left and "AS OF 1 OCT 2026" on the right when the diagram shows a status.
4. **What the sessions said.** A list. Each row: the statement with its endnote number, then the evidence label at the right. A `--line` hairline between rows.
5. **Go deeper.** A stack of `<details>`. A 1px `--border` line between them. The `summary` is 44px high at minimum and weight 650.
6. **For practice.** A band on `--sunk` with `--radius-md` and padding `--space-3`.
7. **Not confirmed.** Plain text and one link to Open questions.
8. **Previous and next.** A 2px `--ink` line above. Each link has a label (`← PREVIOUS · 01`) and the page title.

On the home page the thread list reads as four rows, one for each group: the group marker and gloss on the left, the thread messages on the right as large links with their numbers. The current card grid under the agent node is also acceptable. Choose the one that reads better at phone width.

## 8. Diagrams

- Inline SVG. `currentColor` for lines and labels so that both themes work.
- Lines 1.5px to 2px. A dashed line means "does not reach" or "not confirmed".
- One group colour for the part that the page is about. All other parts are `--ink` on `--raise`.
- 7 labelled parts maximum. Labels use the small or the label style.
- A table is a valid diagram when the idea is a comparison (for example the four routes on the Identity page).
- Each diagram has a text alternative and a credit line: "After <speaker>, <session>".

## 9. What not to do

- Do not use the Microsoft logo, the Fabric logo, the conference logo or the conference checker pattern.
- Do not load Segoe UI as a web font. The system stack shows it where the reader has it.
- Do not copy the look of a speaker slide.
- Do not add an icon set, illustrations or stock images.
- Do not add a third accent, a gradient or a shadow.
- Do not centre body text.

## 10. Motion

None, except the open and close of a "Go deeper" section (150ms). Honour `prefers-reduced-motion`.
