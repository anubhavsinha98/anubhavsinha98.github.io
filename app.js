'use strict';

document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu(restoreFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('span').textContent = isOpen ? '−' : '+';
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu(true);
  }
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-row')) closeMenu();
});

const desktopLayout = window.matchMedia('(min-width: 561px)');
desktopLayout.addEventListener('change', () => closeMenu());
document.querySelector('#year').textContent = String(new Date().getFullYear());

if ('IntersectionObserver' in window) {
  const navigationLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    const visibleSection = entries.find(entry => entry.isIntersecting);
    if (!visibleSection) return;
    navigationLinks.forEach(link => {
      if (link.hash === '#' + visibleSection.target.id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
