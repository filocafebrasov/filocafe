(() => {
  'use strict';
  document.documentElement.classList.add('enhanced');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMenu = () => {
    header?.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.firstElementChild.textContent = '☰';
  };
  menuToggle?.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.firstElementChild.textContent = open ? '×' : '☰';
  });
  document.querySelectorAll('#main-menu a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header?.classList.contains('menu-open')) {
      closeMenu(); menuToggle.focus();
    }
  });
  const themeToggle = document.querySelector('.theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const updateThemeButton = () => themeToggle?.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && systemDark.matches)));
  try {
    const saved = localStorage.getItem('filo-theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
  } catch { /* Storage restrictions do not prevent theme switching. */ }
  updateThemeButton();
  systemDark.addEventListener('change', updateThemeButton);
  themeToggle?.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && systemDark.matches);
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('filo-theme', theme); } catch { /* Use session theme. */ }
    updateThemeButton();
  });
  const tabs = [...document.querySelectorAll('[data-category]')];
  const panels = [...document.querySelectorAll('.menu-panel')];
  if (tabs.length) {
    document.querySelector('.menu-tabs').setAttribute('role', 'tablist');
    const selectTab = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panels[i].id);
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].setAttribute('role', 'tabpanel');
        panels[i].setAttribute('aria-labelledby', tab.id);
        panels[i].tabIndex = 0;
        panels[i].hidden = i !== index;
        panels[i].classList.remove('is-entering');
      });
      panels[index].classList.add('is-entering');
      if (focus) tabs[index].focus({ preventScroll: true });
    };
    tabs.forEach((tab,index) => {
      tab.addEventListener('click', () => selectTab(index));
      tab.addEventListener('keydown', event => {
        const directions = { ArrowRight: (index+1)%tabs.length, ArrowLeft: (index+tabs.length-1)%tabs.length, Home: 0, End: tabs.length-1 };
        if (event.key in directions) { event.preventDefault(); selectTab(directions[event.key], true); tabs[directions[event.key]].scrollIntoView({ block:'nearest',inline:'nearest',behavior:reduce.matches?'instant':'smooth' }); }
      });
    });
    selectTab(0);
  }
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reduce.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => { el.classList.add('is-observed'); revealObserver.observe(el); });
    reduce.addEventListener('change', () => { if (reduce.matches) { revealObserver.disconnect(); reveals.forEach(el => el.classList.add('is-visible')); } });
  }
  if ('IntersectionObserver' in window && header) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('#main-menu a').forEach(a => {
            if (a.hash === '#'+entry.target.id) a.setAttribute('aria-current','location');
            else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin:'-15% 0px -55% 0px', threshold:0 });
    document.querySelectorAll('main > section[id]').forEach(section => navObserver.observe(section));
  }
  const track = document.querySelector('.gallery-track');
  const prev = document.querySelector('.gallery-prev');
  const next = document.querySelector('.gallery-next');
  const updateGallery = () => { if (track) { prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8; } };
  prev?.addEventListener('click', () => track.scrollBy({left:-track.clientWidth*.7,behavior:reduce.matches?'instant':'smooth'}));
  next?.addEventListener('click', () => track.scrollBy({left:track.clientWidth*.7,behavior:reduce.matches?'instant':'smooth'}));
  track?.addEventListener('scroll', updateGallery, {passive:true});
  if (track && 'ResizeObserver' in window) new ResizeObserver(updateGallery).observe(track);
  updateGallery();
  const dialog = document.querySelector('.lightbox');
  const photos = [...document.querySelectorAll('.gallery-item')];
  let photoIndex = 0;
  let returnFocus = null;
  const showPhoto = index => {
    photoIndex = (index+photos.length)%photos.length;
    const button = photos[photoIndex], thumbnail = button.querySelector('img');
    const image = dialog.querySelector('img');
    image.src = `/assets/gallery${button.dataset.photo}-1200.webp`;
    image.alt = thumbnail.alt;
    dialog.querySelector('.lightbox-caption').textContent = thumbnail.alt;
  };
  photos.forEach((button,index) => button.addEventListener('click', () => {
    if (!dialog?.showModal) { window.open(`/assets/gallery${button.dataset.photo}-1200.webp`, '_blank', 'noopener'); return; }
    returnFocus = button;
    showPhoto(index);
    dialog.showModal();
    dialog.querySelector('.lightbox-close').focus();
  }));
  dialog?.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog?.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(photoIndex-1));
  dialog?.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(photoIndex+1));
  dialog?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex+1); }
  });
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => returnFocus?.focus({preventScroll:true}));
})();
