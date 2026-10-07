/* in vivo bootstrap. Cargo loads this file; keep it stable, because browsers cache it for a week.
   It loads the current build (app.js, app.css) with a per-minute cache key so pushes show up without touching Cargo. */
(function () {
  if (window.__ivBoot) return;
  window.__ivBoot = 1;
  var d = document, h = d.documentElement;
  h.classList.add('iv-loaded');
  var base = 'https://cdn.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/', t = '?t=' + Math.floor(Date.now() / 60000);
  var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = base + 'app.css' + t; d.head.appendChild(l);
  var s = d.createElement('script'); s.src = base + 'app.js' + t; d.head.appendChild(s);
  /* if the build fails to start, give Cargo's own page back */
  setTimeout(function () { if (!(window.inVivo && window.inVivo.booted)) h.classList.remove('iv-loaded'); }, 8000);
})();
