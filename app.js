'use strict';

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('.page-nav a')];
let scheduled = false;

function updateNavigation() {
  scheduled = false;
  const threshold = Math.min(180, window.innerHeight * 0.28);
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
    current = sections[sections.length - 1];
  }
  for (const link of links) {
    if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('pageshow', updateNavigation);
updateNavigation();
