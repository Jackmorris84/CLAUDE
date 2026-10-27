// Agent 5: Bild und Rahmen. Baut ein HyperFrames-Projekt (HTML + GSAP) und rendert es Bild für Bild.
import { mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { leseJson, schreibeJson, run, probe } from "../util.mjs";
import { baueKomposition } from "../lib/compose.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const WURZEL = join(HIER, "../..");
export const HYPERFRAMES = join(WURZEL, "node_modules/hyperframes/bin/hyperframes.mjs");

export const name = "render";
export const ordner = "05-render";

const SCHRIFTEN = ["400-normal", "400-italic", "700-normal", "700-italic"];

export async function legeProjektAn(ctx, { untertitel, dauerInhalt }) {
  const { stil, auftrag, pfad } = ctx;
  const proj = pfad(ordner);
  await mkdir(join(proj, "assets/fonts"), { recursive: true });
  await copyFile(join(WURZEL, "node_modules/gsap/dist/gsap.min.js"), join(proj, "assets/gsap.min.js"));
  for (const s of SCHRIFTEN) {
    await copyFile(join(WURZEL, `node_modules/@fontsource/playfair-display/files/playfair-display-latin-${s}.woff2`), join(proj, `assets/fonts/pf-${s}.woff2`));
  }
  await copyFile(pfad("02-schnitt", "geschnitten.mp4"), join(proj, "assets/video.mp4"));
  await copyFile(pfad("04-ton", "master.wav"), join(proj, "assets/master.wav"));
  const k = auftrag.kopfkarte ?? {};
  const html = baueKomposition({ stil, dauerInhalt, untertitel, kopf: { ...(k.label != null ? { label: k.label } : {}), ...(k.zeile != null ? { zeile: k.zeile } : {}) }, ende: auftrag.endkarte ?? {} });
  await writeFile(join(proj, "index.html"), html, "utf8");
  await schreibeJson(join(proj, "hyperframes.json"), {
    $schema: "https://hyperframes.heygen.com/schema/hyperframes.json",
    paths: { blocks: "compositions", components: "compositions/components", assets: "assets" },
    media: { autoProxy: true },
  });
  await schreibeJson(join(proj, "meta.json"), { id: auftrag.id ?? "reel", name: auftrag.id ?? "reel" });
  return proj;
}

export async function laufe(ctx) {
  const { stil, pfad, log } = ctx;
  const bericht = { warnungen: [] };
  const untertitel = await leseJson(pfad("03-untertitel", "untertitel.json"));
  const dauerInhalt = (await probe(pfad("02-schnitt", "geschnitten.mp4"))).dauer;
  const proj = await legeProjektAn(ctx, { untertitel, dauerInhalt });

  const hf = (args, opt = {}) => run("node", [HYPERFRAMES, ...args], { cwd: proj, env: { HYPERFRAMES_NO_UPDATE_CHECK: "1" }, ...opt });
  // Prüfung der Komposition (Lint, Laufzeit, Layout)
  const chk = await hf(["check", "--json"], { ok: true });
  let ergebnis = null;
  try {
    ergebnis = JSON.parse(chk.stdout.slice(chk.stdout.indexOf("{")));
  } catch {
    /* Ausgabe war kein JSON, Rohtext bleibt im Bericht */
  }
  bericht.check = ergebnis ?? { roh: (chk.stdout + chk.stderr).slice(-1500) };
  await schreibeJson(join(proj, "check.json"), bericht.check);
  if (chk.code !== 0) {
    bericht.warnungen.push("HyperFrames check meldet Befunde, siehe 05-render/check.json");
    log("HyperFrames check:", (chk.stdout + chk.stderr).slice(-600));
  }

  const out = join(proj, "out/video.mp4");
  await mkdir(dirname(out), { recursive: true });
  log("HyperFrames render …");
  await hf(["render", "-o", out, "-f", String(stil.canvas.fps), "-q", ctx.renderQualitaet ?? "high"], { onLine: (l) => log(l) });
  const info = await probe(out);
  bericht.video = info;
  if (!existsSync(out)) throw new Error("Render hat keine Datei erzeugt.");
  log(`Render fertig: ${info.breite}×${info.hoehe}, ${info.dauer.toFixed(2)} s, ${info.groesseMB.toFixed(1)} MB`);
  return bericht;
}
