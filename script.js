'use strict';

// Navigation remains visible and anchors work when JavaScript is unavailable.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 540px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  closeMenu();
  // Preserve a useful keyboard focus location after the navigation collapses.
  const target = document.querySelector(link.hash);
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
mobile.addEventListener('change', () => closeMenu());

// One-shot, modest section reveals. No animation library or perpetual render loop.
let revealObserver;
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.06 });
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('reveal-ready');
      revealObserver.observe(element);
    }
  });
}

// A maximum 14px portrait shift, only while the hero is in view on desktop.
const portrait = document.querySelector('.hero-portrait');
const hero = document.querySelector('.hero');
const desktop = window.matchMedia('(min-width: 761px)');
let scheduled = false;
function updatePortrait() {
  scheduled = false;
  const offset = !reducedMotion.matches && desktop.matches ? Math.min(window.scrollY * 0.035, 14) : 0;
  portrait.style.setProperty('--portrait-shift', `${offset}px`);
}
window.addEventListener('scroll', () => {
  if (!scheduled && !reducedMotion.matches && desktop.matches && window.scrollY < hero.offsetHeight + 100) {
    scheduled = true;
    window.requestAnimationFrame(updatePortrait);
  }
}, { passive: true });
desktop.addEventListener('change', updatePortrait);
reducedMotion.addEventListener('change', () => {
  updatePortrait();
  if (reducedMotion.matches) {
    revealObserver?.disconnect();
    document.querySelectorAll('.reveal-ready').forEach((element) => element.classList.add('is-visible'));
  }
});
