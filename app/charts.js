// Nusantara by Numbers — the chart builders. Every chart is plain SVG or HTML
// generated from the data in data.js: no library, no canvas, no network, so a
// chart looks the same in a browser, a screenshot and a printout.

// Escape a value for HTML text.
export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// A horizontal bar row: label, a bar scaled to the largest value, and the
// value itself. highlight marks the row the page is about (Indonesia).
export function barRow({ label, sub = '', value, max, display, highlight = false }) {
  const pct = Math.max(1.5, (value / max) * 100);
  return `<div class="bar-row${highlight ? ' is-key' : ''}">
  <div class="bar-label">${esc(label)}${sub ? ` <span>${esc(sub)}</span>` : ''}</div>
  <div class="bar-track"><div class="bar-fill" style="width:${pct.toFixed(1)}%"></div></div>
  <div class="bar-value">${esc(display)}</div>
</div>`;
}

// A set of horizontal bars from rows of {name, value}, with a formatter for
// the printed value.
export function barChart(rows, format, keyName = '') {
  const max = Math.max(...rows.map((r) => r.value));
  return `<div class="bars">${rows
    .map((r) =>
      barRow({
        label: r.name,
        sub: r.sub || '',
        value: r.value,
        max,
        display: format(r.value),
        highlight: r.name === keyName,
      }),
    )
    .join('')}</div>`;
}

// A line chart as inline SVG. points: [{year, v}]. Draws a soft area fill, the
// line, a dot and value on the last point, dots on request, and min/max/first
// axis labels. Zero line is drawn when the range crosses zero.
export function lineChart(points, { unit = '', color = 'var(--amber)', height = 190, pad = 8 } = {}) {
  const w = 640;
  const h = height;
  const vs = points.map((p) => p.v);
  let min = Math.min(...vs);
  let max = Math.max(...vs);
  if (min > 0) min = Math.max(0, min - (max - min) * 0.25);
  max = max + (max - min) * 0.12;
  const x = (i) => pad + (i / (points.length - 1)) * (w - pad * 2);
  const y = (v) => h - 26 - ((v - min) / (max - min)) * (h - 52);
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${h - 26} L${x(0).toFixed(1)},${h - 26} Z`;
  const last = points[points.length - 1];
  const zeroY = min < 0 ? y(0) : null;
  const dots = points
    .map(
      (p, i) =>
        `<circle cx="${x(i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="3" class="dot"><title>${p.year}: ${p.v}${unit}</title></circle>`,
    )
    .join('');
  return `<svg class="line-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart, ${points[0].year} to ${last.year}">
  ${zeroY !== null ? `<line x1="${pad}" x2="${w - pad}" y1="${zeroY.toFixed(1)}" y2="${zeroY.toFixed(1)}" class="zero"/>` : ''}
  <path d="${area}" class="area" style="--c:${color}"/>
  <path d="${line}" class="line" style="--c:${color}"/>
  ${dots}
  <circle cx="${x(points.length - 1).toFixed(1)}" cy="${y(last.v).toFixed(1)}" r="5" class="last-dot" style="--c:${color}"/>
  <text x="${x(points.length - 1).toFixed(1)}" y="${(y(last.v) - 12).toFixed(1)}" class="last-label" text-anchor="end">${last.v}${unit}</text>
  <text x="${pad}" y="${h - 6}" class="axis">${points[0].year}</text>
  <text x="${(w - pad).toFixed(1)}" y="${h - 6}" class="axis" text-anchor="end">${last.year}</text>
  <text x="${pad}" y="14" class="axis">max ${Math.max(...vs)}${unit}</text>
</svg>`;
}

// A donut chart as inline SVG: parts of {name, value} with a palette, the
// total written in the middle. Returns the svg plus a legend list.
const PALETTE = ['#f2b33d', '#38bfa8', '#5b8dd9', '#e4572e', '#9a7fd4', '#7fb069'];
export function donut(parts, centerLabel) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const R = 84;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const segs = parts
    .map((p, i) => {
      const frac = p.value / total;
      const seg = `<circle cx="110" cy="110" r="${R}" class="donut-seg" stroke="${PALETTE[i % PALETTE.length]}" stroke-dasharray="${(frac * C).toFixed(1)} ${C.toFixed(1)}" stroke-dashoffset="${(-offset * C).toFixed(1)}"><title>${esc(p.name)}: ${frac * 100 >= 10 ? (frac * 100).toFixed(0) : (frac * 100).toFixed(1)}%</title></circle>`;
      offset += frac;
      return seg;
    })
    .join('');
  const legend = parts
    .map(
      (p, i) =>
        `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(p.name)}<b>${((p.value / total) * 100).toFixed(1)}%</b></li>`,
    )
    .join('');
  return `<div class="donut-wrap">
  <svg class="donut" viewBox="0 0 220 220" role="img" aria-label="Donut chart">${segs}
    <text x="110" y="104" class="donut-total">${esc(centerLabel)}</text>
    <text x="110" y="126" class="donut-sub">million people</text>
  </svg>
  <ul class="legend">${legend}</ul>
</div>`;
}
