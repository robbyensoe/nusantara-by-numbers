// Nusantara by Numbers — the pages. Each function returns the HTML for one
// route, built from data.js through charts.js. mount functions wire the
// controls a page carries (the province filter, the compare pickers) after
// the router puts the HTML on screen.

import {
  CENSUS, GENERATIONS, GDP_GROWTH, HEADLINE, INFLATION, ISLANDS, LABOUR,
  NATIONAL_POP_2020, PEOPLE_FACTS, POVERTY, PROVINCES, RANKS, TRADE,
  WORLD_GDP_PC, WORLD_LIFE, WORLD_POPULATION,
} from './data.js';
import { barChart, barRow, donut, esc, lineChart } from './charts.js';

const fmtM = (v) => `${v.toFixed(2)} M`;
const share = (pop) => ((pop / NATIONAL_POP_2020) * 100).toFixed(1);

function kpiCard(k) {
  return `<article class="kpi">
  <div class="kpi-label">${esc(k.label)}</div>
  <div class="kpi-value">${esc(k.value)}<span class="kpi-unit">${esc(k.unit)}</span></div>
  <div class="kpi-note">${esc(k.note)}</div>
  <div class="src">${esc(k.source)}</div>
</article>`;
}

function panel(title, source, body, cls = '') {
  return `<section class="panel ${cls}">
  <header class="panel-head"><h2>${esc(title)}</h2>${source ? `<span class="src">${esc(source)}</span>` : ''}</header>
  ${body}
</section>`;
}

function factCard(f) {
  return `<article class="fact">
  <div class="fact-value">${esc(f.value)}</div>
  <div class="fact-label">${esc(f.label)}</div>
  <p>${esc(f.note)}</p>
  <div class="src">${esc(f.source)}</div>
</article>`;
}

/* ---------------- Overview ---------------- */

export function overviewPage() {
  const topProvinces = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const ranks = RANKS.map(
    (r) => `<article class="rank-card"><div class="rank-num">${esc(r.rank)}</div>
  <div class="rank-what">${esc(r.what)}</div><p>${esc(r.detail)}</p></article>`,
  ).join('');
  return `
<section class="hero">
  <p class="eyebrow">Indonesia &middot; official figures, explained</p>
  <h1>A country of 284.7 million people, in numbers.</h1>
  <p class="lede">Nusantara by Numbers is a field guide to Indonesia's statistics: how many
  people live here, what the economy makes, where everyone lives, and how the country
  compares with the world. Every figure carries its source and year.</p>
</section>
<section class="kpi-grid">${HEADLINE.map(kpiCard).join('')}</section>
<div class="cols">
  ${panel('Population at each census', 'BPS, censuses & SUPAS', lineChart(CENSUS.map((c) => ({ year: c.year, v: c.pop })), { unit: ' M' }) + '<p class="note">Indonesia has added about 47 million people since 2010. Growth is slowing: about 1.08% a year in the five years to 2025, down from 1.43% in the 2000s.</p>')}
  ${panel('The generations', 'BPS, SUPAS 2025', barChart(GENERATIONS.map((g) => ({ name: g.name, sub: g.born, value: g.pop })), fmtM) + '<p class="note">Gen Z is the largest generation, just ahead of the Millennials. Six in ten Indonesians are under 40.</p>')}
</div>
<div class="cols">
  ${panel('Where people live', 'BPS, 2020 Census', donut(ISLANDS.map((i) => ({ name: i.name, value: i.pop })), '270.2') + '<p class="note">More than half the country lives on Java, on 6.6% of the land. By SUPAS 2025 Java held 158.4 million people, 55.65% of the total.</p>')}
  ${panel('Most populous provinces', 'BPS, 2020 Census', barChart(topProvinces.map((p) => ({ name: p.name, value: p.pop })), fmtM) + '<p class="more"><a href="#/provinces">All provinces, searchable &rarr;</a></p>')}
</div>
<section class="rank-strip">${ranks}</section>
<p class="fineprint">Figures are the latest published by BPS (Statistics Indonesia) and the World Bank at November 2026. Where a series has several vintages, the page names the one it uses.</p>`;
}

/* ---------------- People ---------------- */

export function peoplePage() {
  const ageing = `<div class="bars">
    ${barRow({ label: '2010', value: 7.59, max: 11.97, display: '7.59%' })}
    ${barRow({ label: '2025', value: 11.97, max: 11.97, display: '11.97%', highlight: true })}
  </div>
  <p class="note">Share of the population aged 65 and over. Indonesia is still young -
  69.3% are of working age - but the elderly share has risen by more than half in fifteen years.</p>`;
  return `
<section class="page-head">
  <p class="eyebrow">People</p>
  <h1>284.7 million people, and who they are</h1>
  <p class="lede">The 2025 intercensal survey (SUPAS) counted 284.67 million Indonesians.
  The census line below runs from 119 million in 1971 to today.</p>
</section>
${panel('Population, 1971 to 2025', 'BPS, censuses & SUPAS', lineChart(CENSUS.map((c) => ({ year: c.year, v: c.pop })), { unit: ' M', height: 230 }))}
<section class="fact-grid">${PEOPLE_FACTS.map(factCard).join('')}</section>
<div class="cols">
  ${panel('The generations', 'BPS, SUPAS 2025', barChart(GENERATIONS.map((g) => ({ name: g.name, sub: g.born, value: g.pop })), fmtM))}
  ${panel('An ageing country', 'BPS, SUPAS 2025', ageing)}
</div>
<p class="fineprint">SUPAS is BPS's intercensal population survey, run between the ten-yearly censuses. Generation bands are the ones BPS published with SUPAS 2025.</p>`;
}

/* ---------------- Economy ---------------- */

export function economyPage() {
  const econKpis = [
    { label: 'GDP', value: 'US$1.40', unit: 'trillion', note: 'Nominal, 2024', source: 'World Bank, 2024' },
    { label: 'GDP per capita', value: 'US$4,925', unit: '', note: 'US$16,448 at purchasing power parity', source: 'World Bank, 2024' },
    { label: 'Growth', value: '5.03', unit: '%', note: '2024; household consumption grew 4.94%', source: 'BPS, February 2025' },
    { label: 'Poverty line', value: 'Rp641,443', unit: '', note: 'per person a month, September 2025', source: 'BPS, Susenas Sep 2025' },
  ];
  const tradeBars = `<div class="bars">
    ${barRow({ label: 'Exports', value: TRADE.exports, max: TRADE.exports, display: `US$${TRADE.exports} B`, highlight: true })}
    ${barRow({ label: 'Imports', value: TRADE.imports, max: TRADE.exports, display: `US$${TRADE.imports} B` })}
  </div>
  <p class="note">Merchandise trade in ${TRADE.year}. Indonesia has run a goods surplus every year since 2020, powered by coal, palm oil and nickel.</p>`;
  return `
<section class="page-head">
  <p class="eyebrow">Economy</p>
  <h1>A US$1.4 trillion economy growing at five percent</h1>
  <p class="lede">Indonesia's economy is Southeast Asia's largest. Growth held near 5% for a
  decade, dipped once for the pandemic, and inflation is back inside Bank Indonesia's target band.</p>
</section>
<section class="kpi-grid kpi-grid-4">${econKpis.map(kpiCard).join('')}</section>
<div class="cols">
  ${panel('GDP growth, % a year', 'BPS', lineChart(GDP_GROWTH, { unit: '%' }) + '<p class="note">The 2020 dip, -2.07%, is the only contraction in the series: the pandemic year. Growth returned to its 5% groove by 2022.</p>')}
  ${panel('Inflation, December year on year', 'BPS', lineChart(INFLATION, { unit: '%', color: 'var(--teal)' }) + '<p class="note">The 2022 spike to 5.51% followed the subsidised fuel price rise. By December 2024 inflation was 1.57%, the softest in the series.</p>')}
</div>
<div class="cols">
  ${panel('Poverty rate, March, % of population', 'BPS, Susenas', lineChart(POVERTY, { unit: '%', color: 'var(--teal)' }) + '<p class="note">Poverty fell from 11.22% in 2015 to 8.47% in March 2025, and 8.25% by September 2025 - the lowest readings in two decades.</p>')}
  ${panel('Exports and imports', 'BPS, 2024', tradeBars)}
</div>
<section class="fact-grid">${LABOUR.map(factCard).join('')}</section>
<p class="fineprint">The poverty line is BPS's cost-of-basic-needs line: Rp609,160 per person a month in March 2025, Rp641,443 in September 2025. Labour figures are from Sakernas, the national labour force survey.</p>`;
}

/* ---------------- Provinces ---------------- */

export function provinceRows(list) {
  return list
    .map(
      (p, i) => `<tr>
  <td class="num">${i + 1}</td>
  <td class="prov">${esc(p.name)}</td>
  <td>${esc(p.capital)}</td>
  <td class="num">${p.pop.toFixed(2)}</td>
  <td class="num">${share(p.pop)}%</td>
  <td><div class="mini-track"><div class="mini-fill" style="width:${Math.max(1, (p.pop / 48.27) * 100).toFixed(1)}%"></div></div></td>
</tr>`,
    )
    .join('');
}

export function provincesPage() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  const top10 = sorted.slice(0, 10);
  return `
<section class="page-head">
  <p class="eyebrow">Provinces</p>
  <h1>38 provinces, one very crowded island</h1>
  <p class="lede">Indonesia has 38 provinces today. The table counts them as the 2020 Census
  found them - 34 provinces, before Papua split into four - because that is the last full
  count of every province. West Java alone holds more people than Canada.</p>
</section>
${panel('The ten largest provinces', 'BPS, 2020 Census', barChart(top10.map((p) => ({ name: p.name, value: p.pop })), fmtM))}
<section class="panel">
  <header class="panel-head"><h2>Every province</h2><span class="src">BPS, 2020 Census</span></header>
  <div class="controls">
    <label class="ctl">Search <input id="prov-search" type="search" placeholder="Province or capital" autocomplete="off"></label>
    <label class="ctl">Sort by
      <select id="prov-sort">
        <option value="pop-desc">Population, largest first</option>
        <option value="pop-asc">Population, smallest first</option>
        <option value="name">Name, A to Z</option>
      </select>
    </label>
    <span class="ctl-count" id="prov-count"></span>
  </div>
  <div class="table-wrap"><table class="prov-table">
    <thead><tr><th class="num">#</th><th>Province</th><th>Capital</th><th class="num">Population (M)</th><th class="num">Share</th><th></th></tr></thead>
    <tbody id="prov-body">${provinceRows(sorted)}</tbody>
  </table></div>
  <p class="note">Shares are of the 2020 Census total, 270.2 million. Papua is shown in its 2020
  boundaries; since 2022 it has been four provinces (Papua, Central Papua, Highland Papua, South Papua),
  and West Papua has split off Southwest Papua.</p>
</section>`;
}

export function mountProvinces() {
  const search = document.getElementById('prov-search');
  const sort = document.getElementById('prov-sort');
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  if (!search || !sort || !body) return;
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let list = PROVINCES.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q),
    );
    if (sort.value === 'pop-desc') list = [...list].sort((a, b) => b.pop - a.pop);
    if (sort.value === 'pop-asc') list = [...list].sort((a, b) => a.pop - b.pop);
    if (sort.value === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    body.innerHTML = list.length
      ? provinceRows(list)
      : '<tr><td colspan="6" class="empty">No province matches that search.</td></tr>';
    count.textContent = `${list.length} of ${PROVINCES.length} provinces`;
  };
  search.addEventListener('input', apply);
  sort.addEventListener('change', apply);
  apply();
}

/* ---------------- World ---------------- */

export function worldPage() {
  const popRows = WORLD_POPULATION.map((c, i) => ({
    name: `${i + 1}. ${c.name}`,
    value: c.pop,
  }));
  return `
<section class="page-head">
  <p class="eyebrow">Indonesia and the world</p>
  <h1>Fourth in people, sixteenth in output</h1>
  <p class="lede">Indonesia is a giant by population and a middleweight by income per person.
  Both facts are on this page, from the World Bank's 2024 tables.</p>
</section>
<section class="rank-strip">${RANKS.map(
    (r) => `<article class="rank-card"><div class="rank-num">${esc(r.rank)}</div>
  <div class="rank-what">${esc(r.what)}</div><p>${esc(r.detail)}</p></article>`,
  ).join('')}</section>
<div class="cols">
  ${panel('Most populous countries, millions', 'World Bank, 2024', barChart(popRows, (v) => `${v.toFixed(1)} M`, '4. Indonesia'))}
  ${panel('Life expectancy at birth, years', 'World Bank, 2024', barChart(WORLD_LIFE.map((c) => ({ name: c.name, value: c.v })), (v) => `${v} yrs`, 'Indonesia'))}
</div>
${panel('GDP per person, US$', 'World Bank, 2024', barChart(WORLD_GDP_PC.map((c) => ({ name: c.name, value: c.v })), (v) => `US$${v.toLocaleString('en-US')}`, 'Indonesia') + '<p class="note">An average Indonesian produces about US$4,925 of output a year - a twelfth of a Singaporean, but ahead of Vietnam, the Philippines and India. At purchasing power parity the figure is US$16,448.</p>')}
<p class="fineprint">World Bank figures are the 2024 World Development Indicators. Regional GDP-per-person figures marked in the data as rounded are shown to the nearest hundred dollars.</p>`;
}

/* ---------------- Compare ---------------- */

function compareHTML(a, b) {
  const max = Math.max(a.pop, b.pop);
  const bigger = a.pop >= b.pop ? a : b;
  const smaller = a.pop >= b.pop ? b : a;
  const ratio = (bigger.pop / smaller.pop).toFixed(1);
  const side = (p) => `<article class="cmp-card">
  <div class="cmp-name">${esc(p.name)}</div>
  <div class="cmp-pop">${p.pop.toFixed(2)}<span> M</span></div>
  <div class="bar-track"><div class="bar-fill" style="width:${Math.max(2, (p.pop / max) * 100).toFixed(1)}%"></div></div>
  <dl>
    <dt>Capital</dt><dd>${esc(p.capital)}</dd>
    <dt>Share of Indonesia</dt><dd>${share(p.pop)}% - about 1 in ${Math.round(100 / Number(share(p.pop)))} Indonesians</dd>
  </dl>
</article>`;
  return `${side(a)}${side(b)}
  <p class="cmp-verdict">${esc(bigger.name)} holds ${ratio}x the people of ${esc(smaller.name)}.
  Together they account for ${share(a.pop + b.pop)}% of the country the 2020 Census counted.</p>`;
}

export function comparePage() {
  const options = (sel) =>
    PROVINCES.map((p) => `<option value="${esc(p.name)}"${p.name === sel ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
  return `
<section class="page-head">
  <p class="eyebrow">Compare</p>
  <h1>Put two provinces side by side</h1>
  <p class="lede">Pick any two provinces and compare their 2020 Census populations,
  capitals and shares of the nation.</p>
</section>
<section class="panel">
  <div class="controls">
    <label class="ctl">First province <select id="cmp-a">${options('West Java')}</select></label>
    <label class="ctl">Second province <select id="cmp-b">${options('Jakarta')}</select></label>
  </div>
  <div class="cmp-grid" id="cmp-out"></div>
</section>
<p class="fineprint">Populations are BPS 2020 Census counts, in the boundaries of 2020. Try West Java against
your own province, or Jakarta against Yogyakarta: the capital holds nearly three times Yogyakarta's people
on a fraction of the land.</p>`;
}

export function mountCompare() {
  const a = document.getElementById('cmp-a');
  const b = document.getElementById('cmp-b');
  const out = document.getElementById('cmp-out');
  if (!a || !b || !out) return;
  const apply = () => {
    const pa = PROVINCES.find((p) => p.name === a.value) ?? PROVINCES[0];
    const pb = PROVINCES.find((p) => p.name === b.value) ?? PROVINCES[1];
    out.innerHTML = compareHTML(pa, pb);
  };
  a.addEventListener('change', apply);
  b.addEventListener('change', apply);
  apply();
}

/* ---------------- Missing ---------------- */

export function missingPage() {
  return `<section class="page-head">
  <h1>Not found</h1>
  <p class="lede">There is no page at this address. <a href="#/">Back to the overview</a>.</p>
</section>`;
}
