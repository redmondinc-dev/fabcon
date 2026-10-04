// All content is in the HTML. This script adds: theme toggle, arrow keys,
// copy buttons, "open the <details> that holds the link target", and the move
// of a claim anchor that is not on the page to the findings page.
(() => {
  const root = document.documentElement;

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const dark = root.dataset.theme
        ? root.dataset.theme === 'dark'
        : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* no storage */ }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const rel = e.key === 'ArrowLeft' ? 'prev' : e.key === 'ArrowRight' ? 'next' : null;
    const link = rel && document.querySelector(`a[rel="${rel}"]`);
    if (link) location.href = link.href;
  });

  // A claim that left this page is on the findings page. Old deep links go there.
  const findings = document.body.dataset.findings;
  const openTarget = () => {
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* keep the raw id */ }
    const target = id && document.getElementById(id);
    if (!target) {
      const to = findings && new URL(findings, location.href);
      if (to && /^C\d{3}$/.test(id) && to.pathname !== location.pathname) location.replace(to.href.split('#')[0] + location.hash);
      return;
    }
    let opened = false;
    for (let d = target.closest('details'); d; d = d.parentElement.closest('details')) {
      if (!d.open) { d.open = true; opened = true; }
    }
    if (opened) target.scrollIntoView();
  };
  addEventListener('hashchange', openTarget);
  openTarget();
  // A second click on the same marker gives no hashchange.
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (a && a.hash === location.hash) openTarget();
  });

  // Print the content of each closed <details>, then close it again.
  let printOpened = [];
  addEventListener('beforeprint', () => {
    printOpened = [...document.querySelectorAll('details:not(.menu):not([open])')];
    for (const d of printOpened) d.open = true;
  });
  addEventListener('afterprint', () => {
    for (const d of printOpened) d.open = false;
    printOpened = [];
  });

  const status = document.getElementById('copy-status');
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Copied.';
    } catch (e) {
      status.textContent = 'The copy did not work. Use the Markdown link.';
    }
  };
  if (navigator.clipboard) {
    const copyMd = document.getElementById('copy-md');
    copyMd.hidden = false;
    copyMd.addEventListener('click', async () => {
      try {
        const res = await fetch(copyMd.dataset.src);
        if (!res.ok) throw new Error(res.status);
        await copy(await res.text());
      } catch (e) {
        status.textContent = 'The copy did not work. Use the Markdown link.';
      }
    });
    const copyPrompt = document.getElementById('copy-prompt');
    copyPrompt.hidden = false;
    copyPrompt.addEventListener('click', () => {
      const url = new URL(copyPrompt.dataset.full, location.href).href;
      copy(`Read ${url}. Then answer my questions about this FabCon Europe 2026 site. Keep the evidence labels.`);
    });
  }
})();
