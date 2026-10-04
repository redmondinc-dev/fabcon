#!/usr/bin/env node
// Build the debrief site: content/ -> dist/.
//   node build.mjs            run the checks, then build
//   node build.mjs --check    run the checks only (needs no dependency)
//   node build.mjs --root <dir>   use <dir>/content and <dir>/dist (for tests)

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const rootArg = args.indexOf('--root');
const root = rootArg >= 0 ? resolve(args[rootArg + 1]) : here;
const content = join(root, 'content');
const dist = join(root, 'dist');

const MESSAGE_MAX = 12;
const SENTENCE_WARN = 25;

// Labels and meanings: plan/02-style-guide.md, section 4.
const EVIDENCE = {
  slide: ['Slide', 'A speaker showed it. It is the speaker\'s statement.'],
  notes: ['Notes', 'From the attendee\'s notes. No slide is held.'],
  docs: ['Microsoft', 'From Microsoft documentation or a Microsoft blog.'],
  'third-party': ['Third party', 'From an independent article or a vendor.'],
  research: ['Research', 'From an academic paper.'],
  inference: ['Our reading', 'A conclusion that we made.'],
};
const STATUS = {
  ga: 'GA',
  preview: 'Preview',
  announced: 'Announced',
  roadmap: 'Roadmap',
  'not-available': 'Not available',
};

const errors = [];
const warnings = [];

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const site = readJson(join(content, 'site.json'));
const claimsFile = readJson(join(content, 'claims.json'));
const sourcesFile = readJson(join(content, 'sources.json'));
const claims = new Map(claimsFile.claims.map((c) => [c.id, c]));
const sources = new Map([
  ...sourcesFile.sessions.map((s) => [s.id, { ...s, type: 'session' }]),
  ...sourcesFile.web.map((s) => [s.id, { ...s, type: 'web' }]),
]);

// ---------- pages ----------

const CITE = /\[(C\d{3}(?:\s*,\s*C\d{3})*)\](?!\()/g;
const citeIds = (group) => group.split(',').map((s) => s.trim());

function loadPages() {
  const dir = join(content, 'pages');
  const bySlug = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
    const raw = readFileSync(join(dir, file), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) { errors.push(`${file}: no front matter`); continue; }
    const fm = {};
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    const entry = site.pages.find((p) => p.slug === fm.page);
    if (!entry) { errors.push(`${file}: page "${fm.page}" is not in content/site.json`); continue; }
    if (!fm.description) errors.push(`${file}: no description`);
    bySlug.set(fm.page, { ...entry, file, description: fm.description || '', body: m[2].trim() });
  }
  // Keep the order of site.json.
  return site.pages.filter((p) => bySlug.has(p.slug)).map((p) => bySlug.get(p.slug));
}

const pages = loadPages();
const built = new Set(pages.map((p) => p.slug));
const pageByPath = new Map(site.pages.map((p) => [p.path, p]));

// ---------- checks ----------

const plain = (s) => s.replace(CITE, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
const wordCount = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const splitSentences = (s) => s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);

// Body text as sentences. Headings, tables, directives and raw HTML are not sentences.
function sentencesOf(mdText) {
  const units = [];
  for (const block of mdText.split(/\n\s*\n/)) {
    let cur = null;
    for (const line of block.split('\n')) {
      if (/^\s*(#|::|\||<)/.test(line)) { cur = null; continue; }
      const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
      if (item || cur === null) cur = units.push(item ? item[1] : line.trim()) - 1;
      else units[cur] += ' ' + line.trim();
    }
  }
  return units.flatMap((u) => splitSentences(plain(u)));
}

function runChecks() {
  for (const c of claims.values()) {
    for (const ref of c.sources) {
      if (!sources.has(ref.id)) errors.push(`claim ${c.id}: source "${ref.id}" is not in content/sources.json`);
    }
    if (!EVIDENCE[c.evidence]) errors.push(`claim ${c.id}: evidence "${c.evidence}" has no label`);
    if (c.product_status && !STATUS[c.product_status]) errors.push(`claim ${c.id}: product status "${c.product_status}" has no label`);
  }

  for (const p of site.pages) {
    for (const s of splitSentences(p.message || '')) {
      const n = wordCount(s);
      if (n > MESSAGE_MAX) errors.push(`site.json, page "${p.slug}": the message has ${n} words (maximum ${MESSAGE_MAX}): "${s}"`);
    }
    if (p.group && !site.groups.some((g) => g.id === p.group)) errors.push(`site.json, page "${p.slug}": group "${p.group}" does not exist`);
  }

  for (const p of pages) {
    for (const m of p.body.matchAll(CITE)) {
      for (const id of citeIds(m[1])) {
        if (!claims.has(id)) errors.push(`${p.file}: claim "${id}" is not in content/claims.json`);
      }
    }
    for (const s of sentencesOf(p.body)) {
      const n = wordCount(s);
      if (n > SENTENCE_WARN) warnings.push(`${p.file}: a sentence has ${n} words (more than ${SENTENCE_WARN}): "${s}"`);
    }
    for (const m of p.body.matchAll(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g)) {
      const target = pageByPath.get(m[1]);
      if (!target) errors.push(`${p.file}: link to "${m[1]}", which is not a page in content/site.json`);
      else if (!built.has(target.slug)) warnings.push(`${p.file}: link to "${m[1]}", which is not written yet`);
    }
  }
  for (const s of site.summary) {
    if (wordCount(s) > SENTENCE_WARN) warnings.push(`site.json: a summary sentence has ${wordCount(s)} words`);
  }

  try {
    const tracked = execFileSync('git', ['-C', root, 'ls-files', '--', 'private'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    if (tracked) errors.push(`Git tracks paths under private/:\n    ${tracked.split('\n').join('\n    ')}`);
  } catch (e) {
    errors.push(`cannot confirm that private/ is not tracked: git ls-files failed (${String(e.stderr || e.message).trim()})`);
  }
}

function report() {
  for (const w of warnings) console.warn(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  if (errors.length) {
    console.error(`\n${errors.length} error(s). The build stops.`);
    process.exit(1);
  }
}

runChecks();
report();
if (checkOnly) {
  console.log(`Checks passed: ${claims.size} claims, ${sources.size} sources, ${pages.length} of ${site.pages.length} pages written, ${warnings.length} warning(s).`);
  process.exit(0);
}

// ---------- render helpers ----------

let MarkdownIt;
try {
  ({ default: MarkdownIt } = await import('markdown-it'));
} catch {
  console.error('error: markdown-it is not installed. Run: npm install');
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
const fmtDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const joinNames = (a) => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a.at(-1)}` : a[0]);

const md = new MarkdownIt({ html: true, typographer: false });
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  let id = slugify(tokens[idx + 1].content);
  env.ids ??= new Map();
  const seen = env.ids.get(id) || 0;
  env.ids.set(id, seen + 1);
  if (seen) id += `-${seen + 1}`;
  tokens[idx].attrSet('id', id);
  return self.renderToken(tokens, idx, options);
};

const depth = (page) => (page.path === '/' ? 0 : 1);
const relOf = (page) => '../'.repeat(depth(page));
// Relative link from a page to a site path such as "/sessions/".
const href = (from, path) => (relOf(from) + path.slice(1)) || './';
const twinHref = (from, path) => `${relOf(from)}${path.slice(1)}index.md`;
// Link from a file at the site root (llms.txt, llms-full.txt).
const base = site.baseUrl ? site.baseUrl.replace(/\/?$/, '/') : '';
const rootTwinHref = (path) => `${base}${path.slice(1)}index.md`;

// One note for each source and location that a page cites, in the order of first use.
function collectNotes(body) {
  const notes = new Map();
  for (const m of body.matchAll(CITE)) {
    for (const id of citeIds(m[1])) {
      for (const ref of claims.get(id).sources) {
        const key = `${ref.id}|${ref.loc || ''}`;
        if (!notes.has(key)) notes.set(key, { n: notes.size + 1, ref });
      }
    }
  }
  return notes;
}
const noteOf = (notes, ref) => notes.get(`${ref.id}|${ref.loc || ''}`);

function sourceText(ref) {
  const s = sources.get(ref.id);
  const loc = ref.loc ? `, ${ref.loc}` : '';
  if (s.type === 'session') {
    const who = s.speakers?.length ? `${joinNames(s.speakers)}, ` : '';
    const code = s.session_code ? ` (${s.session_code})` : '';
    return `${who}"${s.title}"${code}, ${site.event}, ${fmtDate(s.date)}${loc}.`;
  }
  return `${s.publisher}, "${s.title}"${loc}.`;
}

const chip = (label, tip, cls) => `<span class="chip ${cls}" tabindex="0">${esc(label)}<span class="tip" role="tooltip">${esc(tip)}</span></span>`;

function citeHtml(group, notes, seen) {
  return citeIds(group).map((id) => {
    const c = claims.get(id);
    const [label, meaning] = EVIDENCE[c.evidence];
    const first = !seen.has(id);
    seen.add(id);
    let h = `<span class="cite"${first ? ` id="${id}"` : ''} data-claim="${id}">${chip(label, meaning, `ev-${c.evidence}`)}`;
    if (c.product_status) h += chip(STATUS[c.product_status], `Product status as of ${site.statusAsOf}.`, `st-${c.product_status}`);
    for (const ref of c.sources) {
      const n = noteOf(notes, ref).n;
      h += `<sup><a href="#note-${n}" aria-label="Note ${n}">${n}</a></sup>`;
    }
    return `${h}</span>`;
  }).join(' ');
}

function citeMd(group, notes) {
  return citeIds(group).map((id) => {
    const c = claims.get(id);
    let t = `*(${EVIDENCE[c.evidence][0]})*`;
    if (c.product_status) t += ` *(${STATUS[c.product_status]}, as of ${site.statusAsOf})*`;
    for (const ref of c.sources) t += ` [${noteOf(notes, ref).n}]`;
    return t;
  }).join(' ');
}

// ---------- thread map ----------

const threads = site.pages.filter((p) => p.group);
const threadNo = (p) => threads.indexOf(p) + 1;

function threadMapHtml(from) {
  const group = (g) => {
    const cards = threads.filter((p) => p.group === g.id).map((p) => {
      const inner = `<span class="card-title">${threadNo(p)}. ${esc(p.title)}</span><span class="card-msg">${esc(p.message)}</span>`;
      return built.has(p.slug)
        ? `<li><a class="card" href="${href(from, p.path)}">${inner}</a></li>`
        : `<li><span class="card pending">${inner}<span class="card-note">Not written yet.</span></span></li>`;
    }).join('');
    return `<section class="group g-${g.id}"><h3>${esc(g.title)}</h3><p class="gloss">${esc(g.gloss)}</p><ul>${cards}</ul></section>`;
  };
  const top = site.groups.filter((g) => g.id !== 'reality').map(group).join('');
  const reality = group(site.groups.find((g) => g.id === 'reality'));
  return `<figure class="map" id="thread-map">
<div class="map-agent">Agent</div>
<svg class="map-lines" viewBox="0 0 900 90" aria-hidden="true" focusable="false">
<defs><marker id="map-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
<path d="M150 88C150 40 385 60 400 6" marker-end="url(#map-arrow)"/>
<path d="M450 88V6" stroke-dasharray="9 6" marker-end="url(#map-arrow)"/>
<path d="M750 88C750 40 515 60 500 6" stroke-dasharray="1 7" stroke-linecap="round" marker-end="url(#map-arrow)"/>
</svg>
<div class="map-groups">${top}</div>
<div class="map-band">${reality}</div>
<figcaption>${esc(site.threadMapText)}</figcaption>
</figure>`;
}

function threadMapMd(link) {
  const lines = [`**Diagram: thread map.** ${site.threadMapText}`, ''];
  for (const g of site.groups) {
    lines.push(`- **${g.title}.** ${g.gloss}.`);
    for (const p of threads.filter((t) => t.group === g.id)) {
      const title = built.has(p.slug) ? `[${threadNo(p)}. ${p.title}](${link(p.path)})` : `${threadNo(p)}\\. ${p.title} (not written yet)`;
      lines.push(`  - ${title}: ${p.message}`);
    }
  }
  return lines.join('\n');
}

function diagramParts(name) {
  const svg = readFileSync(join(content, 'diagrams', `${name}.svg`), 'utf8').trim();
  const text = readFileSync(join(content, 'diagrams', `${name}.txt`), 'utf8').trim();
  return { svg, text };
}

// ---------- page render ----------

const DIRECTIVE = /^::(thread-map|diagram[ \t]+([\w-]+))[ \t]*$/m;

function bodyHtml(page, notes) {
  const seen = new Set();
  const env = {};
  const parts = page.body.split(new RegExp(DIRECTIVE.source, 'm'));
  // split gives: text, directive, diagram name, text, ...
  let out = '';
  for (let i = 0; i < parts.length; i += 3) {
    const text = parts[i]
      .replace(CITE, (_, g) => citeHtml(g, notes, seen))
      .replace(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g, (_, path, frag = '') => `](${href(page, path)}${frag})`);
    out += md.render(text, env);
    const directive = parts[i + 1];
    if (!directive) continue;
    if (directive === 'thread-map') out += threadMapHtml(page);
    else {
      const d = diagramParts(parts[i + 2]);
      out += `<figure class="diagram" id="diagram-${parts[i + 2]}">${d.svg}<figcaption>${esc(d.text)}</figcaption></figure>`;
    }
  }
  return out;
}

function notesHtml(page, notes) {
  if (!notes.size) return '';
  const items = [...notes.values()].map(({ n, ref }) => {
    const s = sources.get(ref.id);
    const link = s.type === 'web' ? ` <a href="${esc(s.url)}">${esc(s.url)}</a>` : '';
    const entry = built.has('sources') ? ` <a href="${href(page, '/sources/')}#${ref.id}">Sources entry</a>` : '';
    return `<li id="note-${n}">${esc(sourceText(ref))}${link}${entry}</li>`;
  }).join('\n');
  return `<section class="notes"><h2 id="notes">Notes</h2>\n<ol>\n${items}\n</ol></section>`;
}

// Markdown twin. `link` makes the link to the twin of a site path.
function twinMd(page, link) {
  const notes = collectNotes(page.body);
  const body = page.body
    .replace(CITE, (_, g) => citeMd(g, notes))
    .replace(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g, (_, path, frag = '') => `](${link(path)}${frag})`)
    .replace(new RegExp(DIRECTIVE.source, 'gm'), (_, directive, name) =>
      directive === 'thread-map' ? threadMapMd(link) : `**Diagram.** ${diagramParts(name).text}`);
  const out = [`# ${page.title}`, ''];
  if (page.message) out.push(`**${page.message}**`, '');
  out.push(body, '');
  if (notes.size) {
    out.push('## Notes', '');
    for (const { n, ref } of notes.values()) {
      const s = sources.get(ref.id);
      out.push(`${n}. ${sourceText(ref)}${s.type === 'web' ? ` ${s.url}` : ''}`);
    }
    out.push('');
  }
  return out.join('\n');
}

function navHtml(page) {
  const item = (p, label = p.title) => (built.has(p.slug)
    ? `<a href="${href(page, p.path)}"${p.slug === page.slug ? ' aria-current="page"' : ''}>${esc(label)}</a>`
    : `<span class="pending">${esc(label)}</span>`);
  const list = threads.map((p) => `<li>${item(p, `${threadNo(p)}. ${p.title}`)}</li>`).join('');
  const bySlug = (slug) => site.pages.find((p) => p.slug === slug);
  return `<details class="menu"><summary>Threads</summary><ol>${list}</ol></details>${item(bySlug('sources'))}${item(bySlug('for-agents'))}`;
}

function pagerHtml(page) {
  const i = pages.indexOf(page);
  const prev = pages[i - 1];
  const next = pages[i + 1];
  return (prev ? `<a rel="prev" href="${href(page, prev.path)}">Previous: ${esc(prev.title)}</a>` : '<span></span>')
    + (next ? `<a rel="next" href="${href(page, next.path)}">Next: ${esc(next.title)}</a>` : '<span></span>');
}

// ---------- write ----------

const write = (rel, text) => {
  const file = join(dist, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
};

rmSync(dist, { recursive: true, force: true });
const layout = readFileSync(join(here, 'site', 'layout.html'), 'utf8');

for (const page of pages) {
  const notes = collectNotes(page.body);
  const vars = {
    headTitle: esc(page.slug === 'home' ? site.name : `${page.title} - ${site.name}`),
    description: esc(page.description),
    rel: relOf(page),
    home: href(page, '/'),
    siteName: esc(site.name),
    nav: navHtml(page),
    title: esc(page.title),
    message: page.message ? `<p class="message">${esc(page.message)}</p>` : '',
    body: bodyHtml(page, notes),
    notes: notesHtml(page, notes),
    pager: pagerHtml(page),
    statusAsOf: esc(site.statusAsOf),
  };
  const dir = page.path.slice(1);
  write(`${dir}index.html`, layout.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? ''));
  write(`${dir}index.md`, twinMd(page, (path) => twinHref(page, path)));
}

const summary = site.summary.join(' ');
write('llms.txt', [
  `# ${site.name}`, '', `> ${summary}`, '',
  '## Pages', '',
  ...pages.map((p) => `- [${p.title}](${rootTwinHref(p.path)}): ${p.description}`),
  '', '## Data', '',
  `- [Full site as one file](${base}llms-full.txt): all pages in order, with notes.`,
  `- [Claims register](${base}claims.json): each claim with its evidence label, product status, sources and caveat.`,
  `- [Sources](${base}sources.json): the bibliography.`,
  '',
].join('\n'));

write('llms-full.txt', [
  `# ${site.name}`, '', `> ${summary}`, '',
  `Product status values are as of ${site.statusAsOf}.`, '',
  ...pages.flatMap((p) => ['---', '', twinMd(p, rootTwinHref)]),
].join('\n'));

write('claims.json', readFileSync(join(content, 'claims.json'), 'utf8'));
write('sources.json', readFileSync(join(content, 'sources.json'), 'utf8'));
write('robots.txt', 'User-agent: *\nAllow: /\n');
mkdirSync(join(dist, 'assets'), { recursive: true });
for (const f of ['site.css', 'site.js']) copyFileSync(join(here, 'site', f), join(dist, 'assets', f));

if (!site.baseUrl) console.warn('warning: site.json has no baseUrl. llms.txt uses relative links.');
console.log(`Built ${pages.length} of ${site.pages.length} pages to ${dist}. ${warnings.length} warning(s).`);
