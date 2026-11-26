// Nusantara by Numbers — main.ts, the hand-in program (Node 22, standard
// library only). The site itself is the app/ folder beside this file: plain
// static files (index.html, ES modules, one stylesheet) that a browser opens
// with no build step and no network request, its figures held in app/data.js.
//
// This program copies app/ and screenshots/ to the output directory and
// writes dossier.json — the summary the judge reads (the screenshots, the
// first load's files and bytes, and the source) — with the vendored make.fun
// library. vendor/makefun-frontend.ts stays exactly as the kit shipped it:
// the scorer requires dossier.json to be byte for byte what its own copy
// writes.
//
// Run it locally the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site itself with `node serve.ts`, then open http://localhost:8080.

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The hand-in is only worth making if the site and its pictures are here.
if (!existsSync(join(here, 'app', 'index.html'))) {
  console.error('app/index.html is missing — the site has no front page');
  process.exit(2);
}
const shots = existsSync(join(here, 'screenshots'))
  ? readdirSync(join(here, 'screenshots')).filter((n) => !n.startsWith('.'))
  : [];
if (shots.length < 3 || shots.length > 4) {
  console.error(`screenshots/ must hold 3 or 4 images, found ${shots.length}`);
  process.exit(2);
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps, as the starter's main.ts passes them: only
// text_max_bytes shapes the bytes; the others refuse an entry the scorer
// would refuse (more than 4 screenshots or one over 256 KiB; more than 993
// files and directories in app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

console.log(`nusantara by numbers: app/ and ${shots.length} screenshots handed in, dossier.json written to ${out}`);
