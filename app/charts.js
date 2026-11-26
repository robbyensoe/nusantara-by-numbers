// Nusantara by Numbers — the chart builders.
//
// Every chart is a string of plain SVG or HTML computed from the rows in
// data.js. No charting library, no canvas, no network: a chart is the
// same string in a desktop browser, on a phone, and in the maker's
// screenshot. Builders never format numbers themselves beyond what the
// caller hands them — callers pass a formatter, so each chart shows the
// units its page promised.

// Escape a string for HTML text or attribute content.
export function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

// ---------------------------------------------------------------------
// Horizontal bars. One row: a label, a track whose fill is scaled to
// the largest value in the set, and the printed figure. The row the
// page is about (usually Indonesia) is highlighted in amber.
// ---------------------------------------------------------------------
export function barRow({ label, sub = '', value, max, display, highlight = false }) {
  const width = Math.max(1.5, (value / max) * 100);
  const subHtml = sub ? ` <span>${esc(sub)}</span>` : '';
  return `<div class="bar-row${highlight ? ' is-key' : ''}">
  <div class="bar-label">${esc(label)}${subHtml}</div>
  <div class="bar-track"><div class="bar-fill" style="width:${width.toFixed(1)}%"></div></div>
  <div class="bar-value">${esc(display)}</div>
</div>`;
}

export function barChart(rows, format, keyName = '') {
  const max = Math.max(...rows.map((r) => r.value));
  const body = rows
    .map((r) => barRow({
      label: r.name,
      sub: r.sub || '',
      value: r.value,
      max,
      display: format(r.value),
      highlight: r.name === keyName,
    }))
    .join('');
  return `<div class="bars">${body}</div>`;
}

// ---------------------------------------------------------------------
// Vertical columns, for a short series of totals (the census line).
// Each column carries its year underneath and its value on top; the
// newest column is amber.
// ---------------------------------------------------------------------
export function columnChart(points, { unit = '', height = 200 } = {}) {
  const w = 640;
  const h = height;
  const max = Math.max(...points.map((p) => p.v)) * 1.12;
  const slot = (w - 16) / points.length;
  const barW = Math.min(52, slot * 0.58);
  const base = h - 24;
  const cols = points
    .map((p, i) => {
      const bh = Math.max(2, (p.v / max) * (base - 30));
      const x = 8 + i * slot + (slot - barW) / 2;
      const y = base - bh;
      const last = i === points.length - 1;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" class="col${last ? ' is-last' : ''}"><title>${p.year}: ${p.v}${unit}</title></rect>
  <text x="${(x + barW / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" class="col-value" text-anchor="middle">${p.v}</text>
  <text x="${(x + barW / 2).toFixed(1)}" y="${h - 6}" class="axis" text-anchor="middle">${p.year}</text>`;
    })
    .join('');
  return `<svg class="col-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Column chart, ${points[0].year} to ${points[points.length - 1].year}">
  <line x1="8" x2="${w - 8}" y1="${base}" y2="${base}" class="baseline"/>
  ${cols}
</svg>`;
}

// ---------------------------------------------------------------------
// Line chart as inline SVG over points of {year, v}. Draws faint
// horizontal gridlines with the scale's top and bottom values, a soft
// area under the line, a dot per point (hovering shows year and value),
// and a labelled final point. When the range crosses zero the zero
// line is drawn dashed so a contraction reads as one.
// ---------------------------------------------------------------------
export function lineChart(points, { unit = '', color = 'var(--amber)', height = 190 } = {}) {
  const w = 640;
  const h = height;
  const pad = 8;
  const top = 22;
  const bottom = h - 26;
  const values = points.map((p) => p.v);
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (lo > 0) lo = Math.max(0, lo - (hi - lo) * 0.25);
  hi += (hi - lo) * 0.12;
  const x = (i) => pad + (i / (points.length - 1)) * (w - pad * 2);
  const y = (v) => bottom - ((v - lo) / (hi - lo)) * (bottom - top);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${bottom} L${x(0).toFixed(1)},${bottom} Z`;
  const last = points[points.length - 1];
  const grid = [0, 0.5, 1]
    .map((f) => {
      const gy = bottom - f * (bottom - top);
      const gv = lo + f * (hi - lo);
      return `<line x1="${pad}" x2="${w - pad}" y1="${gy.toFixed(1)}" y2="${gy.toFixed(1)}" class="grid"/>
  <text x="${pad}" y="${(gy - 4).toFixed(1)}" class="axis">${gv.toFixed(gv % 1 === 0 ? 0 : 1)}${unit}</text>`;
    })
    .join('');
  const dots = points
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="3" class="dot"><title>${p.year}: ${p.v}${unit}</title></circle>`)
    .join('');
  const zero = lo < 0
    ? `<line x1="${pad}" x2="${w - pad}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}" class="zero"/>`
    : '';
  return `<svg class="line-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart, ${points[0].year} to ${last.year}">
  ${grid}
  ${zero}
  <path d="${area}" class="area" style="--c:${color}"/>
  <path d="${path}" class="line" style="--c:${color}"/>
  ${dots}
  <circle cx="${x(points.length - 1).toFixed(1)}" cy="${y(last.v).toFixed(1)}" r="5" class="last-dot" style="--c:${color}"/>
  <text x="${x(points.length - 1).toFixed(1)}" y="${(y(last.v) - 12).toFixed(1)}" class="last-label" text-anchor="end">${last.v}${unit}</text>
  <text x="${pad}" y="${h - 6}" class="axis">${points[0].year}</text>
  <text x="${w - pad}" y="${h - 6}" class="axis" text-anchor="end">${last.year}</text>
</svg>`;
}

// ---------------------------------------------------------------------
// A single stacked bar that always sums to the whole: each part's
// share of the total as a segment, with a legend underneath. Used for
// splits like urban/rural or one island against the rest.
// ---------------------------------------------------------------------
export function shareBar(parts) {
  const total = parts.reduce((acc, p) => acc + p.value, 0);
  const segs = parts
    .map((p, i) => {
      const pct = (p.value / total) * 100;
      return `<div class="share-seg seg-${i % 6}" style="width:${pct.toFixed(2)}%"><span>${pct >= 12 ? `${pct.toFixed(1)}%` : ''}</span></div>`;
    })
    .join('');
  const legend = parts
    .map((p, i) => `<li><span class="swatch seg-bg-${i % 6}"></span>${esc(p.name)}<b>${((p.value / total) * 100).toFixed(1)}%</b></li>`)
    .join('');
  return `<div class="share-bar">${segs}</div><ul class="legend share-legend">${legend}</ul>`;
}

// ---------------------------------------------------------------------
// Donut as inline SVG: parts of {name, value}, a palette that cycles,
// the total in the middle and a legend with each share.
// ---------------------------------------------------------------------
const PALETTE = ['#f2b33d', '#38bfa8', '#5b8dd9', '#e4572e', '#9a7fd4', '#7fb069'];

export function donut(parts, centerValue, centerCaption = 'million people') {
  const total = parts.reduce((acc, p) => acc + p.value, 0);
  const R = 84;
  const C = 2 * Math.PI * R;
  let walked = 0;
  const segs = parts
    .map((p, i) => {
      const frac = p.value / total;
      const seg = `<circle cx="110" cy="110" r="${R}" class="donut-seg" stroke="${PALETTE[i % PALETTE.length]}" stroke-dasharray="${(frac * C).toFixed(1)} ${C.toFixed(1)}" stroke-dashoffset="${(-walked * C).toFixed(1)}"><title>${esc(p.name)}: ${(frac * 100).toFixed(1)}%</title></circle>`;
      walked += frac;
      return seg;
    })
    .join('');
  const legend = parts
    .map((p, i) => `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(p.name)}<b>${((p.value / total) * 100).toFixed(1)}%</b></li>`)
    .join('');
  return `<div class="donut-wrap">
  <svg class="donut" viewBox="0 0 220 220" role="img" aria-label="Donut chart">
    ${segs}
    <text x="110" y="104" class="donut-total">${esc(centerValue)}</text>
    <text x="110" y="126" class="donut-sub">${esc(centerCaption)}</text>
  </svg>
  <ul class="legend">${legend}</ul>
</div>`;
}
