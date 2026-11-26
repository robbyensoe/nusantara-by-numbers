// Nusantara by Numbers — the hand-in program.
//
// The entry is the static site in app/ beside this file: plain files a
// browser opens with no build step and no network. This program is the
// courier, not the site. It checks the parcel before sealing it — the
// front page exists, the screenshots are present and inside the
// scorer's size limits, and the app/ inventory fits the scorer's caps —
// then copies app/ and screenshots/ into the output directory and
// writes dossier.json there with the vendored library in
// vendor/makefun-frontend.ts.
//
// That library file stays byte for byte the kit's copy, on purpose: the
// scorer rebuilds the dossier with its own copy and compares the two,
// so a hand-in written by any other code would fail the comparison.
//
// Node 22, standard library only. Run it the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// (MAKEFUN_OUTPUT_DIR stands in for the grader's /output.)
// Serve the site itself with `node serve.ts`.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const root = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps, named once and used for both the preflight checks
// below and the buildDossier call, so the two can never drift apart.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function refuse(message: string): never {
  console.error(`nusantara by numbers: ${message}`);
  process.exit(2);
}

// --- Preflight: the front page --------------------------------------
if (!existsSync(join(root, 'app', 'index.html'))) {
  refuse('app/index.html is missing — the site has no front page');
}

// --- Preflight: the screenshots --------------------------------------
const shotDir = join(root, 'screenshots');
const shotNames = existsSync(shotDir)
  ? readdirSync(shotDir).filter((name) => !name.startsWith('.'))
  : [];
if (shotNames.length < 3 || shotNames.length > CAPS.screenshots.max) {
  refuse(`screenshots/ must hold 3 or ${CAPS.screenshots.max} images, found ${shotNames.length}`);
}
for (const name of shotNames) {
  const { size } = statSync(join(shotDir, name));
  if (size > CAPS.screenshots.max_bytes) {
    refuse(`screenshots/${name} is ${size} bytes, over the ${CAPS.screenshots.max_bytes}-byte limit`);
  }
}

// --- Preflight: the app/ inventory ------------------------------------
// Walk app/ once, counting entries and bytes the way the scorer will.
function inventory(dir: string): { entries: number; bytes: number } {
  let entries = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stats = statSync(path);
    entries += 1;
    if (stats.isDirectory()) {
      const inner = inventory(path);
      entries += inner.entries;
      bytes += inner.bytes;
    } else {
      bytes += stats.size;
    }
  }
  return { entries, bytes };
}
const appStats = inventory(join(root, 'app'));
if (appStats.entries > CAPS.app_max_files) {
  refuse(`app/ holds ${appStats.entries} files and directories, over the ${CAPS.app_max_files} cap`);
}
if (appStats.bytes > CAPS.app_max_bytes) {
  refuse(`app/ totals ${appStats.bytes} bytes, over the ${CAPS.app_max_bytes}-byte cap`);
}

// --- The hand-in -------------------------------------------------------
mkdirSync(outDir, { recursive: true });
cpSync(join(root, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
cpSync(shotDir, join(outDir, 'screenshots'), { recursive: true });

const dossier = buildDossier(outDir, CAPS);
writeFileSync(join(outDir, 'dossier.json'), dossier);

// --- Verify the sealed parcel -----------------------------------------
// Read the dossier back and check it against the scorer's own rules: it
// must fit the 1.5 MiB dossier cap, parse, name the first screenshot as
// the cover, and carry one image entry per screenshot file. A mismatch
// here means the library and the parcel disagree, and the entry is
// better refused by us than by the scorer.
const dossierBytes = statSync(join(outDir, 'dossier.json')).size;
if (dossierBytes > 1572864) {
  refuse(`dossier.json is ${dossierBytes} bytes, over the scorer's 1.5 MiB dossier cap`);
}
const written = JSON.parse(readFileSync(join(outDir, 'dossier.json'), 'utf8'));
if (written.cover !== 0 || !Array.isArray(written.images) || written.images.length !== shotNames.length) {
  refuse(`dossier.json does not describe the ${shotNames.length} screenshots handed in`);
}

console.log(
  `nusantara by numbers: handed in app/ (${appStats.entries} entries, ${appStats.bytes} bytes) ` +
  `and ${shotNames.length} screenshots; dossier.json written to ${outDir}`,
);
