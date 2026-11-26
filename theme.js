'use strict';

(() => {
  const storageKey = 'toursim-theme';
  const documentRoot = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const barColors = { light: '#F4F7FC', dark: '#0D1626' };
  const labels = {
    en: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
    ru: { light: 'Включить светлую тему', dark: 'Включить тёмную тему' },
    uz: { light: 'Yorug‘ mavzuga o‘tish', dark: 'Qorong‘i mavzuga o‘tish' }
  };
  const icons = {
    light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    dark: '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a.55.55 0 0 1 .57.77 7 7 0 0 0 8.91 8.91.55.55 0 0 1 .77.57Z"/>'
  };
  let preference = readPreference();
  let toggles = [];

  function readPreference() {
    try {
      const value = localStorage.getItem(storageKey);
      if (value === 'light' || value === 'dark') return value;
    } catch {}
    return null;
  }

  function updateToggles() {
    const nextTheme = documentRoot.dataset.theme === 'dark' ? 'light' : 'dark';
    const label = (labels[documentRoot.lang] ?? labels.en)[nextTheme];
    for (const toggle of toggles) {
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      toggle.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[nextTheme]}</svg>${toggle.hasAttribute('data-theme-label') ? `<span>${label}</span>` : ''}`;
    }
  }

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? 'dark' : 'light');
    documentRoot.dataset.theme = theme;
    if (themeColor) themeColor.content = barColors[theme];
    updateToggles();
  }

  applyTheme();
  systemTheme.addEventListener('change', () => {
    if (!preference) applyTheme();
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = readPreference();
    applyTheme();
  });

  document.addEventListener('DOMContentLoaded', () => {
    toggles = document.querySelectorAll('[data-theme-toggle]');
    updateToggles();
    for (const toggle of toggles) {
      toggle.addEventListener('click', () => {
        preference = documentRoot.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(storageKey, preference); } catch {}
        applyTheme();
      });
    }
    new MutationObserver(updateToggles).observe(documentRoot, {
      attributes: true,
      attributeFilter: ['lang']
    });
  });
})();
