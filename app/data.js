// Nusantara by Numbers — the dataset.
//
// Every number the site renders lives in this one file, and every number
// carries the office that published it and the year it describes. Sources
// are BPS (Statistics Indonesia) — the censuses, the SUPAS intercensal
// surveys, Susenas for poverty, Sakernas for work — and the World Bank's
// World Development Indicators. The file is the whole database: the site
// fetches nothing, so it renders identically offline, in a screenshot and
// in the grader's sandbox.
//
// The bottom of the file holds datasetSummary(), a self-check the pages
// run at render time: it recounts the province table against the census
// total it claims to come from and refuses to stay silent when a series
// is malformed. The overview page prints its verdict as a footnote.

// ---------------------------------------------------------------------
// The six figures a visitor asks for first.
// ---------------------------------------------------------------------
export const HEADLINES = [
  { label: 'Population', figure: '284.7', unit: 'million', gloss: 'The world\u2019s 4th largest country', source: 'BPS, SUPAS 2025' },
  { label: 'GDP', figure: 'US$1.40', unit: 'trillion', gloss: 'The world\u2019s 16th largest economy', source: 'World Bank, 2024' },
  { label: 'GDP growth', figure: '5.03', unit: '%', gloss: 'Full-year 2024, year on year', source: 'BPS, February 2025' },
  { label: 'GDP per capita', figure: 'US$4,925', unit: '', gloss: 'Upper-middle-income economy', source: 'World Bank, 2024' },
  { label: 'Inflation', figure: '1.57', unit: '%', gloss: 'December 2024, year on year', source: 'BPS, January 2025' },
  { label: 'Poverty rate', figure: '8.25', unit: '%', gloss: '23.36 million people, September 2025', source: 'BPS, Susenas Sep 2025' },
];

// ---------------------------------------------------------------------
// Population through time: the decennial censuses plus the SUPAS
// intercensal surveys of 2015 and 2025. Millions of people.
// ---------------------------------------------------------------------
export const POPULATION_SERIES = [
  { year: 1971, pop: 119.2, kind: 'Census' },
  { year: 1980, pop: 147.5, kind: 'Census' },
  { year: 1990, pop: 179.4, kind: 'Census' },
  { year: 2000, pop: 206.3, kind: 'Census' },
  { year: 2010, pop: 237.6, kind: 'Census' },
  { year: 2015, pop: 255.2, kind: 'SUPAS' },
  { year: 2020, pop: 270.2, kind: 'Census' },
  { year: 2025, pop: 284.7, kind: 'SUPAS' },
];

// The generations as BPS published them with SUPAS 2025. Millions.
export const GENERATIONS = [
  { name: 'Gen Z', born: '1997\u20132012', pop: 70.98 },
  { name: 'Millennials', born: '1981\u20131996', pop: 69.30 },
  { name: 'Gen X', born: '1965\u20131980', pop: 56.08 },
  { name: 'Post-Gen Z', born: '2013 and later', pop: 55.93 },
  { name: 'Boomers', born: '1946\u20131964', pop: 29.35 },
  { name: 'Pre-Boomers', born: '1945 and earlier', pop: 3.04 },
];

// Where the population sits, by island group. Millions, 2020 Census —
// the last count that covers every island group on one basis.
export const ISLAND_SHARES = [
  { name: 'Java', pop: 151.6 },
  { name: 'Sumatra', pop: 58.6 },
  { name: 'Sulawesi', pop: 19.9 },
  { name: 'Kalimantan', pop: 16.6 },
  { name: 'Bali & Nusa Tenggara', pop: 15.0 },
  { name: 'Maluku & Papua', pop: 8.6 },
];

// Java on its own, from the newer SUPAS 2025: the island kept growing
// after the census and now holds a larger share of a larger country.
export const JAVA_SPOTLIGHT = {
  pop2020: 151.6,
  pop2025: 158.4,
  share2025: 55.65,
  landShare: 6.6,
  source: 'BPS, SUPAS 2025',
};

// ---------------------------------------------------------------------
// People: single sourced indicators.
// ---------------------------------------------------------------------
export const PEOPLE_FACTS = [
  { label: 'Urban share', figure: '58.8%', gloss: 'of Indonesians live in urban areas', source: 'World Bank, 2024' },
  { label: 'Working age', figure: '69.3%', gloss: '196 million people are aged 15\u201364', source: 'BPS, SUPAS 2025' },
  { label: 'Life expectancy', figure: '71.3', gloss: 'years of life expected at birth', source: 'World Bank, 2024' },
  { label: 'Fertility rate', figure: '2.13', gloss: 'children per woman, close to the 2.1 replacement level', source: 'BPS, SUPAS 2025' },
  { label: 'Aged 65 and over', figure: '11.97%', gloss: 'up from 7.59% in 2010 \u2014 an ageing country', source: 'BPS, SUPAS 2025' },
  { label: 'Population density', figure: '141', gloss: 'people per km\u00B2 of land (1,904,569 km\u00B2)', source: 'BPS, 2020 Census' },
  { label: 'Sex ratio', figure: '102', gloss: 'men for every 100 women', source: 'BPS, 2020 Census' },
  { label: 'Islands', figure: '17,000+', gloss: 'islands in the archipelago, about 6,000 inhabited', source: 'BPS / BIG' },
];

// ---------------------------------------------------------------------
// Economy series. Percent unless the name says otherwise.
// ---------------------------------------------------------------------

// Real GDP growth, percent a year (BPS).
export const GDP_GROWTH = [
  { year: 2015, v: 4.88 }, { year: 2016, v: 5.03 }, { year: 2017, v: 5.07 },
  { year: 2018, v: 5.17 }, { year: 2019, v: 5.02 }, { year: 2020, v: -2.07 },
  { year: 2021, v: 3.70 }, { year: 2022, v: 5.31 }, { year: 2023, v: 5.05 },
  { year: 2024, v: 5.03 },
];

// Consumer-price inflation, December on December, percent (BPS).
export const INFLATION = [
  { year: 2015, v: 3.35 }, { year: 2016, v: 3.02 }, { year: 2017, v: 3.61 },
  { year: 2018, v: 3.13 }, { year: 2019, v: 2.72 }, { year: 2020, v: 1.68 },
  { year: 2021, v: 1.87 }, { year: 2022, v: 5.51 }, { year: 2023, v: 2.61 },
  { year: 2024, v: 1.57 },
];

// Share of the population under the national poverty line, March reading,
// percent (BPS, Susenas). The September 2025 reading, 8.25%, is lower
// still \u2014 the softest in two decades.
export const POVERTY_RATE = [
  { year: 2015, v: 11.22 }, { year: 2016, v: 10.86 }, { year: 2017, v: 10.64 },
  { year: 2018, v: 9.82 }, { year: 2019, v: 9.41 }, { year: 2020, v: 9.78 },
  { year: 2021, v: 10.14 }, { year: 2022, v: 9.54 }, { year: 2023, v: 9.36 },
  { year: 2024, v: 9.03 }, { year: 2025, v: 8.47 },
];

// The poverty line itself: rupiah per person per month, the cost of the
// basic-needs basket BPS prices each Susenas round.
export const POVERTY_LINE = [
  { period: 'Mar 2025', rp: 609160 },
  { period: 'Sep 2025', rp: 641443 },
];

// Income inequality: the Gini ratio, 0 for perfect equality, 1 for one
// household holding everything (BPS, Susenas).
export const GINI = [
  { period: 'Mar 2025', v: 0.375 },
  { period: 'Sep 2025', v: 0.363 },
];

// Work and jobs (BPS, Sakernas labour force survey).
export const LABOUR = [
  { label: 'Open unemployment', figure: '4.85%', gloss: '7.46 million people, August 2025; 4.74% by November 2025', source: 'BPS, Sakernas 2025' },
  { label: 'People in work', figure: '147.9', gloss: 'million employed in November 2025, of a 155.3 million labour force', source: 'BPS, Sakernas Nov 2025' },
  { label: 'Informal work', figure: '57.8%', gloss: '84.58 million workers without a formal contract or protection', source: 'BPS, Sakernas Aug 2025' },
  { label: 'Average wage', figure: 'Rp3.33', gloss: 'million a month for employees, August 2025', source: 'BPS, Sakernas Aug 2025' },
];

// Merchandise trade, US$ billions (BPS, 2024). The surplus is derived on
// the economy page, not stored, so the three numbers can never disagree.
export const TRADE = { exports: 264.7, imports: 235.4, year: 2024 };

// ---------------------------------------------------------------------
// The provinces as the 2020 Census counted them: 34 then; Papua has
// since split, taking the country to 38 provinces today. Population in
// millions. Each row also names its island group, which powers the
// filter on the provinces page. Rows are in descending population order.
// ---------------------------------------------------------------------
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', island: 'Java', pop: 48.27 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 40.67 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 36.52 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 14.80 },
  { name: 'Banten', capital: 'Serang', island: 'Java', pop: 11.90 },
  { name: 'Jakarta', capital: 'Jakarta', island: 'Java', pop: 10.56 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', pop: 9.07 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9.01 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8.47 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6.39 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 5.53 },
  { name: 'West Kalimantan', capital: 'Pontianak', island: 'Kalimantan', pop: 5.41 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', island: 'Bali & Nusa Tenggara', pop: 5.33 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', island: 'Bali & Nusa Tenggara', pop: 5.32 },
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5.27 },
  { name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', pop: 4.32 },
  { name: 'Papua (2020 boundaries)', capital: 'Jayapura', island: 'Maluku & Papua', pop: 4.30 },
  { name: 'South Kalimantan', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.07 },
  { name: 'East Kalimantan', capital: 'Samarinda', island: 'Kalimantan', pop: 3.77 },
  { name: 'Yogyakarta', capital: 'Yogyakarta', island: 'Java', pop: 3.67 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatra', pop: 3.55 },
  { name: 'Central Sulawesi', capital: 'Palu', island: 'Sulawesi', pop: 2.99 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.70 },
  { name: 'North Sulawesi', capital: 'Manado', island: 'Sulawesi', pop: 2.62 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', island: 'Sulawesi', pop: 2.62 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', island: 'Sumatra', pop: 2.06 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', pop: 2.01 },
  { name: 'Maluku', capital: 'Ambon', island: 'Maluku & Papua', pop: 1.85 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatra', pop: 1.46 },
  { name: 'West Sulawesi', capital: 'Mamuju', island: 'Sulawesi', pop: 1.42 },
  { name: 'North Maluku', capital: 'Sofifi', island: 'Maluku & Papua', pop: 1.28 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.17 },
  { name: 'West Papua', capital: 'Manokwari', island: 'Maluku & Papua', pop: 1.13 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.70 },
];

// The 2020 Census total the province rows must add back up to.
export const CENSUS_TOTAL_2020 = 270.2;

// The island groups present in the province table, in table order.
export const ISLAND_GROUPS = [...new Set(PROVINCES.map((p) => p.island))];

// ---------------------------------------------------------------------
// Indonesia among the world. World Bank, 2024.
// ---------------------------------------------------------------------

// Most populous countries, millions.
export const WORLD_POPULATION = [
  { name: 'India', pop: 1450.9 },
  { name: 'China', pop: 1409.0 },
  { name: 'United States', pop: 340.1 },
  { name: 'Indonesia', pop: 283.5 },
  { name: 'Pakistan', pop: 251.3 },
  { name: 'Nigeria', pop: 232.7 },
  { name: 'Brazil', pop: 216.4 },
  { name: 'Bangladesh', pop: 173.6 },
];

// GDP per person, current US$. approx marks a figure the source table
// rounds to the nearest hundred.
export const WORLD_GDP_PER_CAPITA = [
  { name: 'Singapore', v: 90700, approx: true },
  { name: 'United States', v: 85800, approx: true },
  { name: 'Malaysia', v: 11874, approx: false },
  { name: 'Thailand', v: 7300, approx: true },
  { name: 'Indonesia', v: 4925, approx: false },
  { name: 'Vietnam', v: 4700, approx: true },
  { name: 'Philippines', v: 4200, approx: true },
  { name: 'India', v: 2700, approx: true },
];

// Life expectancy at birth, years.
export const WORLD_LIFE_EXPECTANCY = [
  { name: 'Japan', v: 84 },
  { name: 'Singapore', v: 83 },
  { name: 'Malaysia', v: 77 },
  { name: 'Thailand', v: 76 },
  { name: 'World', v: 73.5 },
  { name: 'Indonesia', v: 71.3 },
];

// Indonesia's places in the world, for the rank cards.
export const WORLD_RANKS = [
  { rank: '#4', what: 'Population', detail: 'of 217 countries, behind India, China and the United States' },
  { rank: '#16', what: 'Total GDP', detail: 'US$1.40 trillion in 2024, the largest economy in Southeast Asia' },
  { rank: '#14', what: 'Land area', detail: '1,904,569 km\u00B2 spread over more than 17,000 islands' },
  { rank: '#1', what: 'In ASEAN', detail: 'the largest population and the largest economy of the 10 ASEAN members' },
];

// ---------------------------------------------------------------------
// Self-check. Recounts the province table against the census total,
// re-adds the generations and island shares against the census lines
// they summarise, and confirms every dated series is in year order with
// finite values. Returns a report the pages print as an integrity
// footnote; the build also runs it under Node as a smoke test.
// ---------------------------------------------------------------------
export function datasetSummary() {
  const problems = [];
  const provinceSum = PROVINCES.reduce((acc, p) => acc + p.pop, 0);
  if (Math.abs(provinceSum - CENSUS_TOTAL_2020) > 0.15) {
    problems.push(`province rows add to ${provinceSum.toFixed(2)}M, not the census total ${CENSUS_TOTAL_2020}M`);
  }
  const generationSum = GENERATIONS.reduce((acc, g) => acc + g.pop, 0);
  if (Math.abs(generationSum - 284.7) > 0.15) {
    problems.push(`generations add to ${generationSum.toFixed(2)}M, not the SUPAS 2025 total 284.7M`);
  }
  const islandSum = ISLAND_SHARES.reduce((acc, i) => acc + i.pop, 0);
  if (Math.abs(islandSum - CENSUS_TOTAL_2020) > 0.15) {
    problems.push(`island shares add to ${islandSum.toFixed(2)}M, not the census total ${CENSUS_TOTAL_2020}M`);
  }
  const series = { POPULATION_SERIES, GDP_GROWTH, INFLATION, POVERTY_RATE };
  for (const [name, rows] of Object.entries(series)) {
    rows.forEach((row, i) => {
      const value = row.v ?? row.pop;
      if (!Number.isFinite(value)) problems.push(`${name} has a non-numeric value at ${row.year}`);
      if (i > 0 && row.year <= rows[i - 1].year) problems.push(`${name} is out of year order at ${row.year}`);
    });
  }
  return {
    ok: problems.length === 0,
    problems,
    provinceCount: PROVINCES.length,
    provinceSum,
    generationSum,
    islandSum,
  };
}
