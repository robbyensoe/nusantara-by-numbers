// Nusantara by Numbers — the router.
//
// The whole explorer is one page with hash routes, so it works from
// static files with no server logic, online or off:
//
//   #/            overview    #/economy     economy
//   #/people      people      #/provinces   provinces (searchable)
//   #/world       world       #/compare     two provinces side by side
//
// Rendering is synchronous: a route's HTML is built from data.js and put
// on screen in the same tick, then its mount function wires any controls.
// window.__shotReady is false while a page renders and true once it is
// on screen, so the maker's screenshot script knows when to capture.

import {
  comparePage, economyPage, missingPage, mountCompare, mountProvinces,
  overviewPage, peoplePage, provincesPage, worldPage,
} from './views.js';

const SITE = 'Nusantara by Numbers';

const ROUTES = new Map([
  ['/', { title: `${SITE} \u2014 Indonesia Statistics Explorer`, page: overviewPage }],
  ['/people', { title: `People | ${SITE}`, page: peoplePage }],
  ['/economy', { title: `Economy | ${SITE}`, page: economyPage }],
  ['/provinces', { title: `Provinces | ${SITE}`, page: provincesPage, mount: mountProvinces }],
  ['/world', { title: `Indonesia and the World | ${SITE}`, page: worldPage }],
  ['/compare', { title: `Compare Provinces | ${SITE}`, page: comparePage, mount: mountCompare }],
]);

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];

function currentPath() {
  const raw = location.hash.replace(/^#/, '').split('?')[0];
  return raw === '' ? '/' : raw;
}

function render() {
  window.__shotReady = false;
  const path = currentPath();
  const route = ROUTES.get(path);
  document.title = route ? route.title : `Not found | ${SITE}`;
  app.innerHTML = route ? route.page() : missingPage();
  for (const link of navLinks) {
    const isHere = link.getAttribute('href') === `#${path}`;
    link.classList.toggle('active', isHere);
    if (isHere) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (route && route.mount) route.mount();
  window.scrollTo(0, 0);
  // Move focus to the page heading so keyboard and screen-reader users
  // land on the new page, not wherever the last page left them.
  const heading = app.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
