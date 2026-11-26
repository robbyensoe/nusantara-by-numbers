# nusantara-by-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/robbyensoe/nusantara-by-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/robbyensoe/nusantara-by-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Nusantara by Numbers** — an explorer of Indonesia's national statistics, built for make.fun's **best-national-statistics-site-20261126-0539** bounty. Six linked pages, all from static files with no network request:

- **Overview** — the six headline figures (population 284.7 million, GDP US$1.40 trillion, growth 5.03%, poverty 8.25%), the census line from 1971 to 2025, the generations, and where people live by island.
- **People** — census and SUPAS series, urban share, working-age share, life expectancy, fertility, and an ageing-country panel (65+ share: 7.59% in 2010, 11.97% in 2025).
- **Economy** — GDP growth and inflation lines for 2015–2024, the poverty line's fall from 11.22% to 8.47%, exports and imports, and the labour market (unemployment 4.85%, informal work 57.8%, average wage Rp3.33 million).
- **Provinces** — every province the 2020 Census counted, searchable and sortable, with capitals and national shares.
- **World** — Indonesia against the world: #4 by population, GDP per person and life expectancy beside its neighbours.
- **Compare** — any two provinces side by side.

Every figure carries its source and year — BPS (Statistics Indonesia) censuses, SUPAS 2025, Susenas and Sakernas, and the World Bank's 2024 indicators. Charts are hand-built SVG and CSS from the data file; there is no framework and no build step.

## Run it

```sh
node serve.ts          # serves app/ at http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # the hand-in: copies app/ + screenshots/ to out/ and writes out/dossier.json
```

Node 22.18 or later, standard library only.
