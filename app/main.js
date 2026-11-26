// Nusantara by Numbers — the router. Hash routes keep the whole explorer in
// one page that works from static files, online or off:
//
//   #/            overview    #/economy     economy
//   #/people      people      #/provinces   provinces (searchable)
//   #/world       world       #/compare     two provinces side by side
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  comparePage, economyPage, missingPage, mountCompare, mountProvinces,
  overviewPage, peoplePage, provincesPage, worldPage,
} from './views.js';

const SITE = 'Nusantara by Numbers';
const ROUTES = {
  '/': { title: `${SITE} - Indonesia Statistics Explorer`, page: overviewPage },
  '/people': { title: `People | ${SITE}`, page: peoplePage },
  '/economy': { title: `Economy | ${SITE}`, page: economyPage },
  '/provinces': { title: `Provinces | ${SITE}`, page: provincesPage, mount: mountProvinces },
  '/world': { title: `Indonesia and the World | ${SITE}`, page: worldPage },
  '/compare': { title: `Compare Provinces | ${SITE}`, page: comparePage, mount: mountCompare },
};

const app = document.getElementById('app');

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '').split('?')[0] || '/';
  const route = ROUTES[path];
  document.title = route ? route.title : `Not found | ${SITE}`;
  app.innerHTML = route ? route.page() : missingPage();
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${path}`);
  });
  if (route && route.mount) route.mount();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
