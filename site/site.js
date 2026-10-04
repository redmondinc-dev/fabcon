// All content is in the HTML. This script adds: theme toggle, arrow keys,
// copy buttons, and "open the <details> that holds the link target".
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
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    const rel = e.key === 'ArrowLeft' ? 'prev' : e.key === 'ArrowRight' ? 'next' : null;
    const link = rel && document.querySelector(`a[rel="${rel}"]`);
    if (link) location.href = link.href;
  });

  const openTarget = () => {
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* keep the raw id */ }
    const target = id && document.getElementById(id);
    if (!target) return;
    let opened = false;
    for (let d = target.closest('details'); d; d = d.parentElement.closest('details')) {
      if (!d.open) { d.open = true; opened = true; }
    }
    if (opened) target.scrollIntoView();
  };
  addEventListener('hashchange', openTarget);
  openTarget();

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
      copy(`Read ${url}. Then answer my questions about the FabCon Europe 2026 debrief. Keep the evidence labels.`);
    });
  }
})();
