(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'agenda.html', label: 'Agenda' },
    { href: 'galeria.html', label: 'Galeria' },
    { href: 'sobre.html', label: 'Sobre' },
    { href: 'repertorio.html', label: 'Repertório' },
    { href: 'contato.html', label: 'Contato' },
  ];

  const SOCIAL_LINKS = [
    { href: '#', label: 'Instagram', icon: 'instagram' },
    { href: '#', label: 'YouTube', icon: 'youtube' },
    { href: '#', label: 'Spotify', icon: 'spotify' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    return currentPage === href || (currentPage === '' && href === 'index.html');
  }

  function socialIcon(icon) {
    const icons = {
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31.4 31.4 0 0 0 2 12a31.4 31.4 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 22 12a31.4 31.4 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>',
      spotify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.3a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.3-1.2a.8.8 0 0 1-.4-1.5c4.9-1.1 9.1-.6 12.5 1.4.4.2.5.7.3 1zm1.5-3.4a1 1 0 0 1-1.3.4c-3.4-2-8.6-2.6-12.6-1.4a1 1 0 0 1-.5-1.9c4.6-1.3 10.4-.6 14.3 1.7.5.3.7 1 .2 1.2zm.2-3.6a1.2 1.2 0 0 1-1.6.5C13.7 8.2 8.2 8 4.6 9a1.2 1.2 0 0 1-.7-2.3c4.1-1.1 10.2-.9 14.5 1.3.6.3.8 1.1.2 1.7z"/></svg>',
    };
    return icons[icon] || '';
  }

  function renderNav(className) {
    return NAV_LINKS.map(
      (link) =>
        `<a href="${link.href}" class="${className}${isActive(link.href) ? ' is-active' : ''}">${link.label}</a>`
    ).join('');
  }

  function renderSocial(className) {
    return SOCIAL_LINKS.map(
      (link) =>
        `<a href="${link.href}" class="${className}" aria-label="${link.label}" target="_blank" rel="noopener noreferrer">${socialIcon(link.icon)}</a>`
    ).join('');
  }

  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner container">
          <a href="index.html" class="site-logo">
            <img src="assets/imgs/escudo.png" alt="Nostalgic Route" width="48" height="48">
            <span>Nostalgic Route</span>
          </a>
          <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-nav">
            <span></span><span></span><span></span>
          </button>
          <nav id="site-nav" class="site-nav">${renderNav('site-nav__link')}</nav>
        </div>
      </header>
    `;

    const toggle = headerEl.querySelector('.nav-toggle');
    const nav = headerEl.querySelector('.site-nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <img src="assets/imgs/escudo.png" alt="" width="40" height="40">
            <span>Nostalgic Route</span>
          </div>
          <nav class="site-footer__nav">${renderNav('site-footer__link')}</nav>
          <div class="site-footer__social">${renderSocial('site-footer__social-link')}</div>
          <p class="site-footer__copy">&copy; ${new Date().getFullYear()} Nostalgic Route. Todos os direitos reservados.</p>
        </div>
      </footer>
    `;
  }
})();
