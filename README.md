# nusantara-by-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/robbyensoe/nusantara-by-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/robbyensoe/nusantara-by-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Nusantara by Numbers** — an explorer of Indonesia's national statistics, built for make.fun's **best-national-statistics-site-20261126-0539** bounty. Six linked pages, all static files, no network request, no build step:

- **Overview** — the six headline figures (population 284.7 million, GDP US$1.40 trillion, growth 5.03%, poverty 8.25%), the census line 1971–2025 as columns, the generations, where people live by island, and a Java spotlight: 158.4 million people, 55.65% of the country, on 6.6% of the land (SUPAS 2025).
- **People** — the census and SUPAS series, urban share, working-age share, life expectancy, fertility, an ageing-country panel (65+ share: 7.59% in 2010 → 11.97% in 2025), and a town-and-country split.
- **Economy** — GDP growth and inflation lines for 2015–2024, the poverty rate's fall from 11.22% to 8.47%, the poverty line itself (Rp609,160 → Rp641,443 a month), the Gini ratio (0.375 → 0.363), exports and imports with the derived surplus, and the labour market (unemployment 4.85%, informal work 57.8%, average wage Rp3.33 million).
- **Provinces** — every province the 2020 Census counted, with capitals and island groups; filter by island group, search, and sort.
- **World** — Indonesia against the world: #4 by population, #16 by GDP, GDP per person and life expectancy beside its neighbours.
- **Compare** — any two provinces side by side, with the gap between them in millions.

Every figure carries its source and year — BPS (Statistics Indonesia) censuses, SUPAS 2025, Susenas and Sakernas, and the World Bank's 2024 indicators. The whole dataset is one file, `app/data.js`, and it checks itself: `datasetSummary()` re-adds the province table, the generations and the island shares against the totals they claim, and the overview page prints the verdict. Charts are hand-built SVG and CSS; there is no framework.

## Run it

```sh
node serve.ts          # serves app/ at http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # the hand-in: validates, copies app/ + screenshots/ to out/, writes out/dossier.json
```

Node 22.18 or later, standard library only.
