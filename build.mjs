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

// Published files that a page can link to.
const FILES = new Set(['/llms.txt', '/llms-full.txt', '/claims.json', '/sources.json']);

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
    for (const m of p.body.matchAll(/^::diagram[ \t]+([\w-]+)[ \t]*$/gm)) {
      const dir = join(content, 'diagrams');
      if (!existsSync(join(dir, `${m[1]}.svg`)) && !existsSync(join(dir, `${m[1]}.html`))) errors.push(`${p.file}: content/diagrams/${m[1]}.svg (or .html) does not exist`);
      if (!existsSync(join(dir, `${m[1]}.txt`))) errors.push(`${p.file}: content/diagrams/${m[1]}.txt does not exist`);
    }
    for (const s of sentencesOf(p.body)) {
      const n = wordCount(s);
      if (n > SENTENCE_WARN) warnings.push(`${p.file}: a sentence has ${n} words (more than ${SENTENCE_WARN}): "${s}"`);
    }
    for (const m of p.body.matchAll(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g)) {
      const target = pageByPath.get(m[1]);
      if (FILES.has(m[1])) continue;
      if (!target) errors.push(`${p.file}: link to "${m[1]}", which is not a page in content/site.json`);
      else if (!built.has(target.slug)) warnings.push(`${p.file}: link to "${m[1]}", which is not written yet`);
    }
  }
  for (const s of site.summary) {
    if (wordCount(s) > SENTENCE_WARN) warnings.push(`site.json: a summary sentence has ${wordCount(s)} words`);
  }

  // No claim lost: each claim is cited on a page.
  const cited = new Set(pages.flatMap((p) => [...p.body.matchAll(CITE)].flatMap((m) => citeIds(m[1]))));
  for (const id of claims.keys()) {
    if (!cited.has(id)) errors.push(`claim ${id}: no page cites it`);
  }

  // A redirect goes from a retired path to a page.
  for (const r of site.redirects || []) {
    if (!pageByPath.has(r.to)) errors.push(`site.json, redirect "${r.from}": "${r.to}" is not a page in content/site.json`);
    if (pageByPath.has(r.from)) errors.push(`site.json, redirect "${r.from}": "${r.from}" is still a page in content/site.json`);
  }

  try {
    const tracked = execFileSync('git', ['-C', root, 'ls-files', '--', 'private'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    if (tracked) errors.push(`Git tracks paths under private/:\n    ${tracked.split('\n').join('\n    ')}`);
  } catch (e) {
    const msg = `cannot confirm that private/ is not tracked: git ls-files failed (${String(e.stderr || e.message).trim()})`;
    // A test root (--root) need not be a repository. The real root must be.
    if (root !== here) warnings.push(msg);
    else errors.push(msg);
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
const twinHref = (from, path) => `${relOf(from)}${path.slice(1)}${FILES.has(path) ? '' : 'index.md'}`;
// Link from a file at the site root (llms.txt, llms-full.txt).
const base = site.baseUrl ? site.baseUrl.replace(/\/?$/, '/') : '';
const rootTwinHref = (path) => `${base}${path.slice(1)}${FILES.has(path) ? '' : 'index.md'}`;

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

// HTML only: one number for each source that a page cites, in the order of first use,
// with the distinct locations of that source on the page. The twin keeps collectNotes.
function collectSources(body) {
  const srcs = new Map();
  for (const m of body.matchAll(CITE)) {
    for (const id of citeIds(m[1])) {
      for (const ref of claims.get(id).sources) {
        if (!srcs.has(ref.id)) srcs.set(ref.id, { n: srcs.size + 1, locs: [] });
        const e = srcs.get(ref.id);
        if (ref.loc && !e.locs.includes(ref.loc)) e.locs.push(ref.loc);
      }
    }
  }
  return srcs;
}

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

const shortDate = site.statusAsOf.replace(/([A-Za-z]{3})[a-z]+/, '$1');

// Source numbers first, then the labels. `state` is for one page.
function citeHtml(group, srcs, state) {
  const shown = new Set();
  let sups = '';
  let labels = '';
  for (const id of citeIds(group)) {
    const c = claims.get(id);
    const first = !state.claims.has(id);
    state.claims.add(id);
    let s = '';
    for (const ref of c.sources) {
      const n = srcs.get(ref.id).n;
      if (shown.has(n)) continue;
      shown.add(n);
      s += `<sup><a href="#src-${ref.id}" aria-label="Source ${n}">${n}</a></sup>`;
    }
    sups += `<span class="claim"${first ? ` id="${id}"` : ''} data-claim="${id}">${s}</span>`;
    const [label, meaning] = EVIDENCE[c.evidence];
    // The HTML leaves a slide statement unmarked (see unmarkedHtml). The twin labels it.
    if (c.evidence !== 'slide' && !shown.has(label)) {
      shown.add(label);
      labels += chip(label, meaning, `ev-${c.evidence}`);
    }
    if (c.product_status && !shown.has(c.product_status)) {
      shown.add(c.product_status);
      labels += chip(STATUS[c.product_status], `Product status as of ${site.statusAsOf}.`, `st-${c.product_status}`);
      if (!state.dated) {
        state.dated = true;
        labels += `<span class="chip-date">as of ${shortDate}</span>`;
      }
    }
  }
  return `<span class="cite">${sups}<span class="labels">${labels}</span></span>`;
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

// ---------- sessions table and sources list ----------

// The thread of a claim gives the page that uses it.
const THREAD_PAGE = { signals: 'signals', open: 'open-questions' };

function sessionRows() {
  return sourcesFile.sessions.map((s) => {
    const slugs = new Set(claimsFile.claims
      .filter((c) => c.sources.some((r) => r.id === s.id))
      .map((c) => THREAD_PAGE[c.thread] || c.thread));
    return { s, fed: site.pages.filter((p) => slugs.has(p.slug) && p.slug !== 'home') };
  });
}
const sessionWho = (s) => (s.speakers?.length ? joinNames(s.speakers) : 'Not recorded');
const sessionName = (s) => `${s.title}${s.session_code ? ` (${s.session_code})` : ''}`;

function sessionsHtml(from) {
  const rows = sessionRows().map(({ s, fed }) => {
    const links = fed.map((p) => (built.has(p.slug) ? `<a href="${href(from, p.path)}">${esc(p.title)}</a>` : esc(p.title))).join(', ');
    return `<tr><td>${esc(sessionName(s))}</td><td>${esc(sessionWho(s))}</td><td>${fmtDate(s.date)}</td><td>${links}</td></tr>`;
  }).join('\n');
  return `<table class="sessions">\n<thead><tr><th scope="col">Session</th><th scope="col">Speaker</th><th scope="col">Date</th><th scope="col">Pages that use it</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n`;
}

function sessionsMd(link) {
  const rows = sessionRows().map(({ s, fed }) =>
    `| ${sessionName(s)} | ${sessionWho(s)} | ${fmtDate(s.date)} | ${fed.map((p) => (built.has(p.slug) ? `[${p.title}](${link(p.path)})` : p.title)).join(', ')} |`);
  return ['| Session | Speaker | Date | Pages that use it |', '|---|---|---|---|', ...rows].join('\n');
}

// Source id -> the pages and the claims that cite it.
function citations() {
  const map = new Map();
  for (const p of pages) {
    for (const m of p.body.matchAll(CITE)) {
      for (const id of citeIds(m[1])) {
        for (const ref of claims.get(id).sources) {
          if (!map.has(ref.id)) map.set(ref.id, new Map());
          const byPage = map.get(ref.id);
          if (!byPage.has(p.slug)) byPage.set(p.slug, new Set());
          byPage.get(p.slug).add(id);
        }
      }
    }
  }
  return map;
}

const SOURCE_GROUPS = [
  ['Sessions', (s) => s.type === 'session'],
  ['Microsoft', (s) => s.kind === 'microsoft'],
  ['Third party', (s) => ['third-party', 'community', 'press'].includes(s.kind)],
  ['Research', (s) => s.kind === 'research'],
];

function sourceEntryText(s) {
  if (s.type === 'session') {
    return `${s.speakers?.length ? `${joinNames(s.speakers)}, ` : ''}"${s.title}"${s.session_code ? ` (${s.session_code})` : ''}, ${site.event}, ${fmtDate(s.date)}. Basis: ${s.basis.replace(/\.$/, '')}.`;
  }
  return `${s.publisher}, "${s.title}".`;
}

function sourcesHtml(from) {
  const cited = citations();
  return SOURCE_GROUPS.map(([title, test]) => {
    const items = [...sources.values()].filter(test).map((s) => {
      const url = s.type === 'web' ? ` <a href="${esc(s.url)}">${esc(s.url)}</a>` : '';
      const back = [...(cited.get(s.id) || [])].map(([slug, ids]) => {
        const p = pages.find((x) => x.slug === slug);
        return `${esc(p.title)} (${[...ids].map((id) => `<a href="${href(from, p.path)}#${id}">${id}</a>`).join(', ')})`;
      }).join('; ');
      return `<li id="${s.id}">${esc(sourceEntryText(s))}${url}<br><span class="cited">${back ? `Cited on: ${back}` : 'Not cited on a page.'}</span></li>`;
    }).join('\n');
    return `<h2 id="${slugify(title)}">${title}</h2>\n<ul class="sources">\n${items}\n</ul>\n`;
  }).join('');
}

function sourcesMd(link) {
  const cited = citations();
  return SOURCE_GROUPS.map(([title, test]) => {
    const items = [...sources.values()].filter(test).map((s) => {
      const back = [...(cited.get(s.id) || [])].map(([slug, ids]) => {
        const p = pages.find((x) => x.slug === slug);
        return `[${p.title}](${link(p.path)}) (${[...ids].join(', ')})`;
      }).join('; ');
      return `- **${s.id}.** ${sourceEntryText(s)}${s.type === 'web' ? ` ${s.url}` : ''} ${back ? `Cited on: ${back}.` : 'Not cited on a page.'}`;
    });
    return [`## ${title}`, '', ...items].join('\n');
  }).join('\n\n');
}

// A diagram is <name>.svg and <name>.txt. The .txt file has "title:", "text:" and "credit:" lines.
// <name>.html in place of <name>.svg is for a diagram that has controls around its SVG.
const diagramFile = (name) => ['html', 'svg'].map((ext) => join(content, 'diagrams', `${name}.${ext}`)).find(existsSync);

function diagramParts(name) {
  const svg = readFileSync(diagramFile(name), 'utf8').trim();
  const meta = {};
  for (const line of readFileSync(join(content, 'diagrams', `${name}.txt`), 'utf8').split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { svg, ...meta };
}

// ---------- page render ----------

const DIRECTIVE = /^::(thread-map|sessions-table|sources-list|diagram[ \t]+([\w-]+))[ \t]*$/m;

// One evidence label for each paragraph or list (all items of the outer list): a repeat of the
// same label is dropped. Table rows keep each label. Status chips are not touched.
function collapseLabels(html) {
  let depth = 0;
  let inTable = 0;
  let seen = null;
  return html.replace(/<(\/?)(p|ul|ol|table)\b[^>]*>|<span class="chip (ev-[\w-]+)" tabindex="0">[\s\S]*?<\/span><\/span>/g, (m, close, tag, ev) => {
    if (ev) {
      if (!seen || inTable) return m;
      if (seen.has(ev)) return '';
      seen.add(ev);
      return m;
    }
    if (tag === 'table') { inTable += close ? -1 : 1; return m; }
    if (inTable) return m;
    if (close) { if (--depth === 0) seen = null; } else if (depth++ === 0) seen = new Set();
    return m;
  });
}

// Said once at the top of a page that has unmarked (slide) statements.
function unmarkedHtml(page) {
  const slide = [...page.body.matchAll(CITE)].some((m) => citeIds(m[1]).some((id) => claims.get(id).evidence === 'slide'));
  return slide ? '<p class="unmarked">Unmarked statements are from a speaker\'s slide. Speaker statements are not tested facts.</p>' : '';
}

function bodyHtml(page, srcs) {
  const state = { claims: new Set(), dated: false };
  const env = {};
  const parts = page.body.split(new RegExp(DIRECTIVE.source, 'm'));
  // split gives: text, directive, diagram name, text, ...
  let out = '';
  for (let i = 0; i < parts.length; i += 3) {
    const text = parts[i]
      .replace(new RegExp(`[ \\t]*${CITE.source}`, 'g'), (_, g) => citeHtml(g, srcs, state))
      .replace(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g, (_, path, frag = '') => `](${href(page, path)}${frag})`);
    out += md.render(text, env);
    const directive = parts[i + 1];
    if (!directive) continue;
    if (directive === 'thread-map') out += threadMapHtml(page);
    else if (directive === 'sessions-table') out += sessionsHtml(page);
    else if (directive === 'sources-list') out += sourcesHtml(page);
    else {
      const d = diagramParts(parts[i + 2]);
      const credit = d.credit ? `<span class="credit">${esc(d.credit)}</span>` : '';
      out += `<figure class="diagram" id="diagram-${parts[i + 2]}"><p class="diagram-title">${esc(d.title)}</p>${d.svg}<figcaption><span>${esc(d.text)}</span>${credit}</figcaption></figure>`;
    }
  }
  out = collapseLabels(out).replace(/<span class="labels"><\/span>/g, '');
  // A table row gets the status of its first status chip, for the status filter.
  out = out.replace(/<tr>(?=((?:(?!<\/tr>)[\s\S])*?)<\/tr>)/g, (tr, row) => {
    const st = row.match(/class="chip st-([\w-]+)"/);
    return st ? `<tr data-status="${st[1]}">` : tr;
  });
  // "For practice" is a band: the heading and all that follows it, to the next heading.
  return out.replace(/<h2 id="for-practice">[\s\S]*?(?=<h2|$)/, (m) => `<section class="practice">${m}</section>\n`);
}

// The locations of one source on a page: slide numbers and photos merged, other locations as given.
function locText(locs) {
  const parts = new Map();
  const add = (key, items) => {
    if (!parts.has(key)) parts.set(key, []);
    for (const x of items) if (!parts.get(key).includes(x)) parts.get(key).push(x);
  };
  for (const part of locs.flatMap((l) => l.split(/;\s*/))) {
    const slides = part.match(/^slides? (\d+(?:, \d+)*)$/);
    const photos = part.match(/^(?:photos? )?(IMG_\d+(?:, IMG_\d+)*)$/);
    if (slides) add('slide', slides[1].split(', '));
    else if (photos) add('photo', photos[1].split(', '));
    else if (/^attendee notes\b/.test(part)) add('attendee notes', []);
    else add(part, []);
  }
  return [...parts].map(([key, items]) => (items.length ? `${key}${items.length > 1 ? 's' : ''} ${items.join(', ')}` : key)).join('; ');
}

// A session has a speaker, a code, or only a title. The Sessions page says "Not recorded".
function sessionLabel(s) {
  const code = s.session_code ? ` (${s.session_code})` : '';
  if (s.speakers?.length) return `${joinNames(s.speakers)}${code}`;
  return s.session_code ? `Speaker not recorded${code}` : `${s.title} (speaker not recorded)`;
}

// The foot of a page: sessions (collapsed) and documentation links (open). Each line is a marker target.
function notesHtml(page, srcs) {
  if (!srcs.size) return '';
  const entry = (id) => (built.has('sources') ? `${href(page, '/sources/')}#${id}` : '');
  const num = (n) => `<span class="src-n">${n}</span> `;
  const sessionLines = [];
  const webLines = [];
  for (const [id, { n, locs }] of srcs) {
    const s = sources.get(id);
    const where = locs.length ? `: ${esc(locText(locs))}` : '';
    if (s.type === 'session') {
      const name = entry(id) ? `<a href="${entry(id)}">${esc(sessionLabel(s))}</a>` : esc(sessionLabel(s));
      sessionLines.push(`<li id="src-${id}">${num(n)}${name}${where}.</li>`);
    } else {
      const more = entry(id) ? ` <a class="src-entry" href="${entry(id)}">Sources entry</a>` : '';
      webLines.push(`<li id="src-${id}">${num(n)}${esc(s.publisher)}: <a href="${esc(s.url)}">${esc(s.title)}</a>${where}.${more}</li>`);
    }
  }
  const sessionsBlock = sessionLines.length
    ? `<details id="sessions-on-this-page"><summary>Sessions on this page</summary>\n<ul class="sources page-sources">\n${sessionLines.join('\n')}\n</ul>\n</details>\n`
    : '';
  const docsBlock = webLines.length
    ? `<h2 id="documentation-links">Documentation links</h2>\n<ul class="sources page-sources">\n${webLines.join('\n')}\n</ul>\n`
    : '';
  return `<section class="notes" aria-label="Sources on this page">\n${sessionsBlock}${docsBlock}</section>`;
}

const diagramMd = (d) => `**Diagram: ${d.title}.** ${d.text}${d.credit ? ` *${d.credit}.*` : ''}`;

// Markdown twin. `link` makes the link to the twin of a site path.
function twinMd(page, link) {
  const notes = collectNotes(page.body);
  const body = page.body
    .replace(CITE, (_, g) => citeMd(g, notes))
    .replace(/\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g, (_, path, frag = '') => `](${link(path)}${frag})`)
    .replace(new RegExp(DIRECTIVE.source, 'gm'), (_, directive, name) =>
      directive === 'thread-map' ? threadMapMd(link)
        : directive === 'sessions-table' ? sessionsMd(link)
          : directive === 'sources-list' ? sourcesMd(link)
            : diagramMd(diagramParts(name)))
    // A filter control has no meaning in the twin.
    .replace(/<fieldset[\s\S]*?<\/fieldset>\n?/g, '')
    // A "Go deeper" section is a heading in the twin.
    .replace(/<details[^>]*>\s*<summary>(.*?)<\/summary>/g, '### $1')
    .replace(/<\/details>\n?/g, '')
    .replace(/\n{3,}/g, '\n\n');
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

const two = (n) => String(n).padStart(2, '0');

function pagerHtml(page) {
  const i = pages.indexOf(page);
  const link = (p, rel, label) => {
    const no = two(site.pages.findIndex((x) => x.slug === p.slug));
    const text = rel === 'prev' ? `\u2190 ${label} \u00b7 ${no}` : `${label} \u00b7 ${no} \u2192`;
    return `<a rel="${rel}" href="${href(page, p.path)}"><span class="pager-label">${text}</span><span class="pager-title">${esc(p.title)}</span></a>`;
  };
  return (pages[i - 1] ? link(pages[i - 1], 'prev', 'Previous') : '<span></span>')
    + (pages[i + 1] ? link(pages[i + 1], 'next', 'Next') : '<span></span>');
}

function kickerHtml(page) {
  if (!page.group) return '';
  const g = site.groups.find((x) => x.id === page.group);
  const n = threads.findIndex((t) => t.slug === page.slug) + 1;
  return `<p class="kicker g-${g.id}"><span class="marker" aria-hidden="true"></span>${esc(g.title)} \u00b7 Thread ${two(n)} of ${two(threads.length)}</p>`;
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
  const srcs = collectSources(page.body);
  const vars = {
    headTitle: esc(page.slug === 'home' ? site.name : `${page.title} - ${site.name}`),
    description: esc(page.description),
    rel: relOf(page),
    home: href(page, '/'),
    siteName: esc(site.name),
    nav: navHtml(page),
    bodyClass: page.slug === 'home' ? 'page-home' : page.group ? 'page-thread' : 'page-plain',
    kicker: kickerHtml(page),
    title: esc(page.title),
    // A word with a hyphen stays on one line.
    message: page.message ? `<p class="message">${esc(page.message).replace(/\S+-\S+/g, '<span class="nb">$&</span>')}</p>` : '',
    unmarked: unmarkedHtml(page),
    body: bodyHtml(page, srcs),
    notes: notesHtml(page, srcs),
    pager: pagerHtml(page),
    statusAsOf: esc(site.statusAsOf),
  };
  const dir = page.path.slice(1);
  write(`${dir}index.html`, layout.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? ''));
  write(`${dir}index.md`, twinMd(page, (path) => twinHref(page, path)));
}

// A retired path forwards to its new page, with the claim anchor (#C123) kept by the script.
// Without JavaScript, the meta refresh and the link still work, but the anchor is lost.
for (const r of site.redirects || []) {
  const to = pageByPath.get(r.to);
  const from = { path: r.from };
  const target = href(from, r.to);
  const canonical = base ? `${base}${r.to.slice(1)}` : target;
  const title = esc(`${to.title} - ${site.name}`);
  write(`${r.from.slice(1)}index.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="stylesheet" href="${relOf(from)}assets/site.css">
<script>location.replace(${JSON.stringify(target)} + location.hash);</script>
</head>
<body class="page-plain">
<main id="main"><p>This page moved to <a href="${target}">${esc(to.title)}</a>.</p></main>
</body>
</html>
`);
  write(`${r.from.slice(1)}index.md`, `# Moved\n\nThis page moved to [${to.title}](${twinHref(from, r.to)}).\n`);
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
