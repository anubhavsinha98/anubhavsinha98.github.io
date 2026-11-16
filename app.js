'use strict';

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const experienceCounter = document.querySelector('#experience-duration');
const experienceCalendar = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'numeric',
});

function formatProfessionalExperience(now = new Date()) {
  const fallback = 'Full-time engineering experience';
  if (!experienceCounter) return fallback;

  const startYear = Number(experienceCounter.dataset.startYear);
  const startMonth = Number(experienceCounter.dataset.startMonth);
  if (!Number.isInteger(startYear) || !Number.isInteger(startMonth) || startMonth < 1 || startMonth > 12) return fallback;

  const calendar = experienceCalendar.formatToParts(now);
  const currentYear = Number(calendar.find(part => part.type === 'year').value);
  const currentMonth = Number(calendar.find(part => part.type === 'month').value);
  const totalMonths = (currentYear - startYear) * 12 + currentMonth - startMonth;
  if (totalMonths < 0) return fallback;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const duration = [];
  if (years) duration.push(years + (years === 1 ? ' year' : ' years'));
  if (months) duration.push(months + (months === 1 ? ' month' : ' months'));
  return duration.length ? duration.join(', ') + ' of full-time experience' : 'Less than a month of full-time experience';
}

function updateProfessionalExperience() {
  if (experienceCounter) experienceCounter.textContent = formatProfessionalExperience();
}

updateProfessionalExperience();
window.setInterval(updateProfessionalExperience, 60 * 60 * 1000);
window.addEventListener('pageshow', updateProfessionalExperience);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateProfessionalExperience();
});

const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('.page-nav a')];
let scheduled = false;
let anchorSection = null;
let anchorReleaseTimer;

function releaseAnchorSection() {
  anchorSection = null;
  window.clearTimeout(anchorReleaseTimer);
}

function scheduleAnchorRelease() {
  window.clearTimeout(anchorReleaseTimer);
  anchorReleaseTimer = window.setTimeout(releaseAnchorSection, 160);
}

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
  // Keep the clicked section selected when short final sections share a scroll destination.
  if (anchorSection) current = anchorSection;
  for (const link of links) {
    if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.getElementById(anchor.hash.slice(1));
  anchorSection = target?.closest('main > section[id]') || (target?.id === 'top' || target?.id === 'main' ? sections[0] : null);
  if (anchorSection) {
    updateNavigation();
    scheduleAnchorRelease();
  }
});

// Manual input returns the highlight to the section reached by scrolling.
for (const eventName of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
  window.addEventListener(eventName, releaseAnchorSection, { passive: true });
}

window.addEventListener('scroll', () => {
  if (anchorSection) scheduleAnchorRelease();
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('pageshow', updateNavigation);
updateNavigation();
