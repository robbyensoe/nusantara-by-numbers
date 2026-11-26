// Nusantara by Numbers — the pages.
//
// One exported function per route returns that page's HTML, assembled
// from data.js through the builders in charts.js. Pages with controls
// also export a mount function; the router calls it after the HTML is
// on screen. Nothing here fetches: every figure on every page was in
// data.js when the page loaded.

import {
  CENSUS_TOTAL_2020, GINI, GDP_GROWTH, GENERATIONS, HEADLINES, INFLATION,
  ISLAND_GROUPS, ISLAND_SHARES, JAVA_SPOTLIGHT, LABOUR, PEOPLE_FACTS,
  POPULATION_SERIES, POVERTY_LINE, POVERTY_RATE, PROVINCES, TRADE,
  WORLD_GDP_PER_CAPITA, WORLD_LIFE_EXPECTANCY, WORLD_POPULATION,
  WORLD_RANKS, datasetSummary,
} from './data.js';
import { barChart, barRow, columnChart, donut, esc, lineChart, shareBar } from './charts.js';

const fmtM = (v) => `${v.toFixed(2)} M`;
const shareOf2020 = (pop) => ((pop / CENSUS_TOTAL_2020) * 100).toFixed(1);
const fmtRp = (rp) => `Rp${rp.toLocaleString('en-US')}`;

/* ---------------- shared pieces ---------------- */

function kpiCard(k) {
  return `<article class="kpi">
  <div class="kpi-label">${esc(k.label)}</div>
  <div class="kpi-value">${esc(k.figure)}<span class="kpi-unit">${esc(k.unit)}</span></div>
  <div class="kpi-note">${esc(k.gloss)}</div>
  <div class="src">${esc(k.source)}</div>
</article>`;
}

function panel(title, source, body, cls = '') {
  const src = source ? `<span class="src">${esc(source)}</span>` : '';
  return `<section class="panel ${cls}">
  <header class="panel-head"><h2>${esc(title)}</h2>${src}</header>
  ${body}
</section>`;
}

function factCard(f) {
  return `<article class="fact">
  <div class="fact-value">${esc(f.figure)}</div>
  <div class="fact-label">${esc(f.label)}</div>
  <p>${esc(f.gloss)}</p>
  <div class="src">${esc(f.source)}</div>
</article>`;
}

function rankCards() {
  return WORLD_RANKS.map(
    (r) => `<article class="rank-card"><div class="rank-num">${esc(r.rank)}</div>
  <div class="rank-what">${esc(r.what)}</div><p>${esc(r.detail)}</p></article>`,
  ).join('');
}

// The self-check from data.js, printed where a careful reader looks for
// it: proof on the page that the tables re-add to the totals they cite.
function integrityNote() {
  const s = datasetSummary();
  if (!s.ok) {
    return `<p class="fineprint warn">Data check failed: ${s.problems.map(esc).join('; ')}.</p>`;
  }
  return `<p class="fineprint">Data integrity, checked in your browser just now: the ${s.provinceCount}
  province rows re-add to ${s.provinceSum.toFixed(2)} million, the generations to ${s.generationSum.toFixed(2)}
  million and the island shares to ${s.islandSum.toFixed(2)} million \u2014 each matching its published total
  (2020 Census ${CENSUS_TOTAL_2020} million; SUPAS 2025, 284.7 million) to within the source tables'
  rounding. Every dated series is in year order. The dataset is data.js, shipped with the site.</p>`;
}

/* ---------------- Overview ---------------- */

export function overviewPage() {
  const topProvinces = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const rest2025 = 284.7 - JAVA_SPOTLIGHT.pop2025;
  const javaSplit = shareBar([
    { name: `Java (${JAVA_SPOTLIGHT.source})`, value: JAVA_SPOTLIGHT.pop2025 },
    { name: 'Every other island group', value: rest2025 },
  ]);
  return `
<section class="hero">
  <p class="eyebrow">Indonesia &middot; official figures, explained</p>
  <h1>A country of 284.7 million people, in numbers.</h1>
  <p class="lede">Nusantara by Numbers is a field guide to Indonesia's statistics: how many
  people live here, what the economy makes, where everyone lives, and how the country
  compares with the world. Every figure carries its source and year.</p>
</section>
<section class="kpi-grid">${HEADLINES.map(kpiCard).join('')}</section>
<div class="cols">
  ${panel('Population at each census', 'BPS, censuses & SUPAS', columnChart(POPULATION_SERIES.map((c) => ({ year: c.year, v: c.pop })), { unit: ' M' }) + '<p class="note">Indonesia has added about 47 million people since 2010. Growth is slowing: about 1.08% a year in the five years to 2025, down from 1.43% a year in the 2000s.</p>')}
  ${panel('The generations', 'BPS, SUPAS 2025', barChart(GENERATIONS.map((g) => ({ name: g.name, sub: g.born, value: g.pop })), fmtM) + '<p class="note">Gen Z is the largest generation, just ahead of the Millennials. Six in ten Indonesians are under 40.</p>')}
</div>
<div class="cols">
  ${panel('Where people live', 'BPS, 2020 Census', donut(ISLAND_SHARES.map((i) => ({ name: i.name, value: i.pop })), '270.2') + '<p class="note">More than half the country lives on Java, on 6.6% of the land.</p>')}
  ${panel('Most populous provinces', 'BPS, 2020 Census', barChart(topProvinces.map((p) => ({ name: p.name, value: p.pop })), fmtM) + '<p class="more"><a href="#/provinces">All provinces, searchable &rarr;</a></p>')}
</div>
${panel('Java, five years on', JAVA_SPOTLIGHT.source, javaSplit + `<p class="note">By SUPAS 2025 Java held ${JAVA_SPOTLIGHT.pop2025} million people \u2014 ${JAVA_SPOTLIGHT.share2025}% of the country, up from 151.6 million at the 2020 Census \u2014 on ${JAVA_SPOTLIGHT.landShare}% of Indonesia's land area.</p>`)}
<section class="rank-strip">${rankCards()}</section>
${integrityNote()}`;
}

/* ---------------- People ---------------- */

export function peoplePage() {
  const ageing = `<div class="bars">
    ${barRow({ label: '2010', value: 7.59, max: 11.97, display: '7.59%' })}
    ${barRow({ label: '2025', value: 11.97, max: 11.97, display: '11.97%', highlight: true })}
  </div>
  <p class="note">Share of the population aged 65 and over. Indonesia is still young \u2014
  69.3% are of working age \u2014 but the elderly share has risen by more than half in fifteen years.</p>`;
  const urbanSplit = shareBar([
    { name: 'Urban', value: 58.8 },
    { name: 'Rural', value: 41.2 },
  ]);
  return `
<section class="page-head">
  <p class="eyebrow">People</p>
  <h1>284.7 million people, and who they are</h1>
  <p class="lede">The 2025 intercensal survey (SUPAS) counted 284.67 million Indonesians.
  The line below runs from 119 million in 1971 to today, census by census.</p>
</section>
${panel('Population, 1971 to 2025', 'BPS, censuses & SUPAS', lineChart(POPULATION_SERIES.map((c) => ({ year: c.year, v: c.pop })), { unit: ' M', height: 230 }))}
<section class="fact-grid">${PEOPLE_FACTS.map(factCard).join('')}</section>
<div class="cols">
  ${panel('The generations', 'BPS, SUPAS 2025', barChart(GENERATIONS.map((g) => ({ name: g.name, sub: g.born, value: g.pop })), fmtM))}
  ${panel('An ageing country', 'BPS, SUPAS 2025', ageing)}
</div>
${panel('Town and country', 'World Bank, 2024', urbanSplit + '<p class="note">58.8% of Indonesians lived in urban areas in 2024 \u2014 a majority the country only crossed in the early 2010s, and one that keeps climbing as work concentrates in the cities.</p>')}
<p class="fineprint">SUPAS is BPS's intercensal population survey, run between the ten-yearly censuses. Generation bands are the ones BPS published with SUPAS 2025.</p>`;
}

/* ---------------- Economy ---------------- */

export function economyPage() {
  const econKpis = [
    { label: 'GDP', figure: 'US$1.40', unit: 'trillion', gloss: 'Nominal GDP, 2024', source: 'World Bank, 2024' },
    { label: 'GDP per capita', figure: 'US$4,925', unit: '', gloss: 'US$16,448 at purchasing power parity', source: 'World Bank, 2024' },
    { label: 'Growth', figure: '5.03', unit: '%', gloss: '2024; household consumption grew 4.94%', source: 'BPS, February 2025' },
    { label: 'Poverty line', figure: 'Rp641,443', unit: '', gloss: 'per person a month, September 2025', source: 'BPS, Susenas Sep 2025' },
  ];
  const surplus = TRADE.exports - TRADE.imports;
  const tradeBody = `<div class="bars">
    ${barRow({ label: 'Exports', value: TRADE.exports, max: TRADE.exports, display: `US$${TRADE.exports} B`, highlight: true })}
    ${barRow({ label: 'Imports', value: TRADE.imports, max: TRADE.exports, display: `US$${TRADE.imports} B` })}
  </div>
  <p class="note">Merchandise trade in ${TRADE.year}: a goods surplus of US$${surplus.toFixed(1)} billion.
  Indonesia has run a surplus every year since 2020, powered by coal, palm oil and nickel.</p>`;
  const lineBody = `<div class="bars">
    ${POVERTY_LINE.map((p) => barRow({ label: p.period, value: p.rp, max: POVERTY_LINE[POVERTY_LINE.length - 1].rp, display: fmtRp(p.rp) })).join('')}
  </div>
  <p class="note">The poverty line is the monthly cost of BPS's basic-needs basket per person.
  It rises with prices even as the share of people under it falls.</p>`;
  const giniBody = `<div class="bars">
    ${GINI.map((g) => barRow({ label: g.period, value: g.v, max: 0.4, display: g.v.toFixed(3), highlight: g.period.startsWith('Sep') })).join('')}
  </div>
  <p class="note">The Gini ratio runs from 0 (everyone equal) to 1 (one household takes all).
  At 0.363 in September 2025 it is drifting down: growth is reaching lower incomes a little faster.</p>`;
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
  ${panel('Inflation, December year on year', 'BPS', lineChart(INFLATION, { unit: '%', color: 'var(--teal)' }) + '<p class="note">The 2022 spike to 5.51% followed the subsidised fuel price rise. By December 2024 inflation was 1.57%, the softest reading in the series.</p>')}
</div>
<div class="cols">
  ${panel('Poverty rate, March, % of population', 'BPS, Susenas', lineChart(POVERTY_RATE, { unit: '%', color: 'var(--teal)' }) + '<p class="note">Poverty fell from 11.22% in 2015 to 8.47% in March 2025, and 8.25% by September 2025 \u2014 the lowest readings in two decades.</p>')}
  ${panel('Exports and imports', 'BPS, 2024', tradeBody)}
</div>
<div class="cols">
  ${panel('The poverty line, rupiah a month', 'BPS, Susenas', lineBody)}
  ${panel('Inequality, the Gini ratio', 'BPS, Susenas', giniBody)}
</div>
<section class="fact-grid">${LABOUR.map(factCard).join('')}</section>
<p class="fineprint">Labour figures are from Sakernas, the national labour force survey. Poverty and
inequality are from Susenas, the national socio-economic survey; the two 2025 rounds are March and September.</p>`;
}

/* ---------------- Provinces ---------------- */

export function provinceRows(list) {
  return list
    .map(
      (p, i) => `<tr>
  <td class="num">${i + 1}</td>
  <td class="prov">${esc(p.name)}</td>
  <td>${esc(p.capital)}</td>
  <td>${esc(p.island)}</td>
  <td class="num">${p.pop.toFixed(2)}</td>
  <td class="num">${shareOf2020(p.pop)}%</td>
  <td><div class="mini-track"><div class="mini-fill" style="width:${Math.max(1, (p.pop / 48.27) * 100).toFixed(1)}%"></div></div></td>
</tr>`,
    )
    .join('');
}

export function provincesPage() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  const chips = ['All islands', ...ISLAND_GROUPS]
    .map((g, i) => `<button type="button" class="chip${i === 0 ? ' is-on' : ''}" data-island="${esc(g)}">${esc(g)}</button>`)
    .join('');
  return `
<section class="page-head">
  <p class="eyebrow">Provinces</p>
  <h1>38 provinces, one very crowded island</h1>
  <p class="lede">Indonesia has 38 provinces today. The table counts them as the 2020 Census
  found them \u2014 34 provinces, before Papua split into four \u2014 because that is the last full
  count of every province. West Java alone holds more people than Canada. Filter by island
  group, search, or sort.</p>
</section>
${panel('The ten largest provinces', 'BPS, 2020 Census', barChart(sorted.slice(0, 10).map((p) => ({ name: p.name, value: p.pop })), fmtM))}
<section class="panel">
  <header class="panel-head"><h2>Every province</h2><span class="src">BPS, 2020 Census</span></header>
  <div class="chips" id="prov-chips" role="group" aria-label="Filter by island group">${chips}</div>
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
    <thead><tr><th class="num">#</th><th>Province</th><th>Capital</th><th>Island group</th><th class="num">Population (M)</th><th class="num">Share</th><th></th></tr></thead>
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
  const chips = document.getElementById('prov-chips');
  if (!search || !sort || !body || !count) return;
  let island = 'All islands';
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let list = PROVINCES.filter(
      (p) =>
        (island === 'All islands' || p.island === island) &&
        (!q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)),
    );
    if (sort.value === 'pop-desc') list = [...list].sort((a, b) => b.pop - a.pop);
    if (sort.value === 'pop-asc') list = [...list].sort((a, b) => a.pop - b.pop);
    if (sort.value === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    body.innerHTML = list.length
      ? provinceRows(list)
      : '<tr><td colspan="7" class="empty">No province matches that search.</td></tr>';
    const sum = list.reduce((acc, p) => acc + p.pop, 0);
    count.textContent = `${list.length} of ${PROVINCES.length} provinces \u00B7 ${sum.toFixed(2)} M people`;
  };
  search.addEventListener('input', apply);
  sort.addEventListener('change', apply);
  if (chips) {
    chips.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-island]');
      if (!btn) return;
      island = btn.dataset.island;
      chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-on', c === btn));
      apply();
    });
  }
  apply();
}

/* ---------------- World ---------------- */

export function worldPage() {
  const popRows = WORLD_POPULATION.map((c, i) => ({ name: `${i + 1}. ${c.name}`, value: c.pop }));
  return `
<section class="page-head">
  <p class="eyebrow">Indonesia and the world</p>
  <h1>Fourth in people, sixteenth in output</h1>
  <p class="lede">Indonesia is a giant by population and a middleweight by income per person.
  Both facts are on this page, from the World Bank's 2024 tables.</p>
</section>
<section class="rank-strip">${rankCards()}</section>
<div class="cols">
  ${panel('Most populous countries, millions', 'World Bank, 2024', barChart(popRows, (v) => `${v.toFixed(1)} M`, '4. Indonesia'))}
  ${panel('Life expectancy at birth, years', 'World Bank, 2024', barChart(WORLD_LIFE_EXPECTANCY.map((c) => ({ name: c.name, value: c.v })), (v) => `${v} yrs`, 'Indonesia'))}
</div>
${panel('GDP per person, US$', 'World Bank, 2024', barChart(WORLD_GDP_PER_CAPITA.map((c) => ({ name: c.name, value: c.v })), (v) => `US$${v.toLocaleString('en-US')}`, 'Indonesia') + '<p class="note">An average Indonesian produces about US$4,925 of output a year \u2014 a twelfth of a Singaporean, but ahead of Vietnam, the Philippines and India. At purchasing power parity the figure is US$16,448.</p>')}
<p class="fineprint">World Bank figures are the 2024 World Development Indicators. GDP-per-person
figures the source table rounds are shown to the nearest hundred dollars.</p>`;
}

/* ---------------- Compare ---------------- */

function compareHTML(a, b) {
  const max = Math.max(a.pop, b.pop);
  const bigger = a.pop >= b.pop ? a : b;
  const smaller = a.pop >= b.pop ? b : a;
  const ratio = (bigger.pop / smaller.pop).toFixed(1);
  const gap = (bigger.pop - smaller.pop).toFixed(2);
  const side = (p) => `<article class="cmp-card">
  <div class="cmp-name">${esc(p.name)}</div>
  <div class="cmp-pop">${p.pop.toFixed(2)}<span> M</span></div>
  <div class="bar-track"><div class="bar-fill" style="width:${Math.max(2, (p.pop / max) * 100).toFixed(1)}%"></div></div>
  <dl>
    <dt>Capital</dt><dd>${esc(p.capital)}</dd>
    <dt>Island group</dt><dd>${esc(p.island)}</dd>
    <dt>Share of Indonesia</dt><dd>${shareOf2020(p.pop)}% \u2014 about 1 in ${Math.round(100 / Number(shareOf2020(p.pop)))} Indonesians</dd>
  </dl>
</article>`;
  return `${side(a)}${side(b)}
  <p class="cmp-verdict">${esc(bigger.name)} holds ${ratio}&times; the people of ${esc(smaller.name)} \u2014
  a gap of ${gap} million, itself more than the population of most provinces.
  Together they account for ${shareOf2020(a.pop + b.pop)}% of the country the 2020 Census counted.</p>`;
}

export function comparePage() {
  const options = (sel) =>
    PROVINCES.map((p) => `<option value="${esc(p.name)}"${p.name === sel ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
  return `
<section class="page-head">
  <p class="eyebrow">Compare</p>
  <h1>Put two provinces side by side</h1>
  <p class="lede">Pick any two provinces and compare their 2020 Census populations,
  capitals, island groups and shares of the nation.</p>
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
