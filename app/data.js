// Nusantara by Numbers — every figure the site shows, each with its source and year.
// Sources: BPS (Statistics Indonesia) censuses, SUPAS 2025, Susenas and Sakernas
// releases; World Bank World Development Indicators. Nothing here is fetched:
// the file is the dataset, so the site works fully offline.

// The six numbers a visitor comes for first.
export const HEADLINE = [
  { label: 'Population', value: '284.7', unit: 'million', note: '4th largest country in the world', source: 'BPS, SUPAS 2025' },
  { label: 'GDP', value: 'US$1.40', unit: 'trillion', note: '16th largest economy', source: 'World Bank, 2024' },
  { label: 'GDP growth', value: '5.03', unit: '%', note: 'Full year 2024', source: 'BPS, February 2025' },
  { label: 'GDP per capita', value: 'US$4,925', unit: '', note: 'Upper-middle-income economy', source: 'World Bank, 2024' },
  { label: 'Inflation', value: '1.57', unit: '%', note: 'December 2024, year on year', source: 'BPS, January 2025' },
  { label: 'Poverty rate', value: '8.25', unit: '%', note: '23.36 million people, September 2025', source: 'BPS, Susenas Sep 2025' },
];

// Population at each census and intercensal survey (SUPAS), millions.
// BPS: censuses 1971-2020, SUPAS 2015 and 2025 (284.67 million).
export const CENSUS = [
  { year: 1971, pop: 119.2, kind: 'Census' },
  { year: 1980, pop: 147.5, kind: 'Census' },
  { year: 1990, pop: 179.4, kind: 'Census' },
  { year: 2000, pop: 206.3, kind: 'Census' },
  { year: 2010, pop: 237.6, kind: 'Census' },
  { year: 2015, pop: 255.2, kind: 'SUPAS' },
  { year: 2020, pop: 270.2, kind: 'Census' },
  { year: 2025, pop: 284.7, kind: 'SUPAS' },
];

// The population by generation, millions (BPS, SUPAS 2025).
export const GENERATIONS = [
  { name: 'Gen Z', born: '1997-2012', pop: 70.98 },
  { name: 'Millennials', born: '1981-1996', pop: 69.30 },
  { name: 'Gen X', born: '1965-1980', pop: 56.08 },
  { name: 'Post-Gen Z', born: '2013 and later', pop: 55.93 },
  { name: 'Boomers', born: '1946-1964', pop: 29.35 },
  { name: 'Pre-Boomers', born: '1945 and earlier', pop: 3.04 },
];

// Where Indonesians live, by island group, millions (BPS, 2020 Census).
// Java in SUPAS 2025: 158.4 million, 55.65% of the country.
export const ISLANDS = [
  { name: 'Java', pop: 151.6 },
  { name: 'Sumatra', pop: 58.6 },
  { name: 'Sulawesi', pop: 19.9 },
  { name: 'Kalimantan', pop: 16.6 },
  { name: 'Bali & Nusa Tenggara', pop: 15.0 },
  { name: 'Maluku & Papua', pop: 8.6 },
];

// People indicators, each a single sourced figure.
export const PEOPLE_FACTS = [
  { label: 'Urban share', value: '58.8%', note: 'of the population lives in urban areas', source: 'World Bank, 2024' },
  { label: 'Working age', value: '69.3%', note: '196 million people aged 15-64', source: 'BPS, SUPAS 2025' },
  { label: 'Life expectancy', value: '71.3', note: 'years at birth', source: 'World Bank, 2024' },
  { label: 'Fertility rate', value: '2.13', note: 'children per woman, near the 2.1 replacement level', source: 'BPS, SUPAS 2025' },
  { label: 'Aged 65 and over', value: '11.97%', note: 'up from 7.59% in 2010 - an ageing country', source: 'BPS, SUPAS 2025' },
  { label: 'Population density', value: '141', note: 'people per km2 of land (1,904,569 km2)', source: 'BPS, 2020 Census' },
  { label: 'Sex ratio', value: '102', note: 'men per 100 women', source: 'BPS, 2020 Census' },
  { label: 'Islands', value: '17,000+', note: 'islands, 6,000 of them inhabited', source: 'BPS / BIG' },
];

// Annual real GDP growth, percent (BPS).
export const GDP_GROWTH = [
  { year: 2015, v: 4.88 }, { year: 2016, v: 5.03 }, { year: 2017, v: 5.07 },
  { year: 2018, v: 5.17 }, { year: 2019, v: 5.02 }, { year: 2020, v: -2.07 },
  { year: 2021, v: 3.70 }, { year: 2022, v: 5.31 }, { year: 2023, v: 5.05 },
  { year: 2024, v: 5.03 },
];

// Consumer-price inflation, December year on year, percent (BPS).
export const INFLATION = [
  { year: 2015, v: 3.35 }, { year: 2016, v: 3.02 }, { year: 2017, v: 3.61 },
  { year: 2018, v: 3.13 }, { year: 2019, v: 2.72 }, { year: 2020, v: 1.68 },
  { year: 2021, v: 1.87 }, { year: 2022, v: 5.51 }, { year: 2023, v: 2.61 },
  { year: 2024, v: 1.57 },
];

// Share of the population below the national poverty line, March, percent
// (BPS, Susenas). September 2025 read 8.25%, the lowest in two decades.
export const POVERTY = [
  { year: 2015, v: 11.22 }, { year: 2016, v: 10.86 }, { year: 2017, v: 10.64 },
  { year: 2018, v: 9.82 }, { year: 2019, v: 9.41 }, { year: 2020, v: 9.78 },
  { year: 2021, v: 10.14 }, { year: 2022, v: 9.54 }, { year: 2023, v: 9.36 },
  { year: 2024, v: 9.03 }, { year: 2025, v: 8.47 },
];

// Work and jobs (BPS, Sakernas labour force survey).
export const LABOUR = [
  { label: 'Open unemployment', value: '4.85%', note: '7.46 million people, August 2025; 4.74% by November 2025', source: 'BPS, Sakernas 2025' },
  { label: 'People in work', value: '147.9', note: 'million employed, November 2025, of a 155.3 million labour force', source: 'BPS, Sakernas Nov 2025' },
  { label: 'Informal work', value: '57.8%', note: '84.58 million workers have no formal contract or protection', source: 'BPS, Sakernas Aug 2025' },
  { label: 'Average wage', value: 'Rp3.33', note: 'million a month for employees, August 2025', source: 'BPS, Sakernas Aug 2025' },
];

// Merchandise trade, US$ billions (BPS, 2024).
export const TRADE = { exports: 264.7, imports: 235.4, year: 2024 };

// The provinces as the 2020 Census counted them (34 provinces then; Papua has
// since split, taking the country to 38). Population in millions.
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', pop: 48.27 },
  { name: 'East Java', capital: 'Surabaya', pop: 40.67 },
  { name: 'Central Java', capital: 'Semarang', pop: 36.52 },
  { name: 'North Sumatra', capital: 'Medan', pop: 14.80 },
  { name: 'Banten', capital: 'Serang', pop: 11.90 },
  { name: 'Jakarta', capital: 'Jakarta', pop: 10.56 },
  { name: 'South Sulawesi', capital: 'Makassar', pop: 9.07 },
  { name: 'Lampung', capital: 'Bandar Lampung', pop: 9.01 },
  { name: 'South Sumatra', capital: 'Palembang', pop: 8.47 },
  { name: 'Riau', capital: 'Pekanbaru', pop: 6.39 },
  { name: 'West Sumatra', capital: 'Padang', pop: 5.53 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', pop: 5.32 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', pop: 5.33 },
  { name: 'Aceh', capital: 'Banda Aceh', pop: 5.27 },
  { name: 'West Kalimantan', capital: 'Pontianak', pop: 5.41 },
  { name: 'Bali', capital: 'Denpasar', pop: 4.32 },
  { name: 'Papua (2020 boundaries)', capital: 'Jayapura', pop: 4.30 },
  { name: 'South Kalimantan', capital: 'Banjarmasin', pop: 4.07 },
  { name: 'East Kalimantan', capital: 'Samarinda', pop: 3.77 },
  { name: 'Yogyakarta', capital: 'Yogyakarta', pop: 3.67 },
  { name: 'Jambi', capital: 'Jambi', pop: 3.55 },
  { name: 'Central Sulawesi', capital: 'Palu', pop: 2.99 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', pop: 2.70 },
  { name: 'North Sulawesi', capital: 'Manado', pop: 2.62 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', pop: 2.62 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', pop: 2.06 },
  { name: 'Bengkulu', capital: 'Bengkulu', pop: 2.01 },
  { name: 'Maluku', capital: 'Ambon', pop: 1.85 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', pop: 1.46 },
  { name: 'West Sulawesi', capital: 'Mamuju', pop: 1.42 },
  { name: 'North Maluku', capital: 'Sofifi', pop: 1.28 },
  { name: 'Gorontalo', capital: 'Gorontalo', pop: 1.17 },
  { name: 'West Papua', capital: 'Manokwari', pop: 1.13 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', pop: 0.70 },
];

export const NATIONAL_POP_2020 = 270.2;

// The world's most populous countries, millions (World Bank, 2024).
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

// GDP per person, US$ (World Bank, 2024). Figures marked approx are rounded
// to the nearest hundred.
export const WORLD_GDP_PC = [
  { name: 'Singapore', v: 90700, approx: true },
  { name: 'United States', v: 85800, approx: true },
  { name: 'Malaysia', v: 11874, approx: false },
  { name: 'Thailand', v: 7300, approx: true },
  { name: 'Indonesia', v: 4925, approx: false },
  { name: 'Vietnam', v: 4700, approx: true },
  { name: 'Philippines', v: 4200, approx: true },
  { name: 'India', v: 2700, approx: true },
];

// Life expectancy at birth, years (World Bank, 2024).
export const WORLD_LIFE = [
  { name: 'Japan', v: 84 },
  { name: 'Singapore', v: 83 },
  { name: 'Malaysia', v: 77 },
  { name: 'Thailand', v: 76 },
  { name: 'World', v: 73.5 },
  { name: 'Indonesia', v: 71.3 },
];

// Indonesia's places in the world, for the rank cards.
export const RANKS = [
  { rank: '#4', what: 'Population', detail: 'of 217 countries, behind India, China and the United States' },
  { rank: '#16', what: 'Total GDP', detail: 'US$1.40 trillion in 2024, the largest economy in Southeast Asia' },
  { rank: '#14', what: 'Land area', detail: '1,904,569 km2 across more than 17,000 islands' },
  { rank: '#1', what: 'In ASEAN', detail: 'largest population and largest economy of the 10 ASEAN members' },
];
