// Agent 1: Transkript. Liefert pro Rohvideo wortgenaue Zeiten (words.json) und eine Korrekturtabelle.
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { leseJson, schreibeJson, schreibeText, run, probe, stillen } from "../util.mjs";
import { sprechAbschnitte, naeherungsWoerter } from "../lib/align.mjs";
import { erfundeneWoerter } from "../lib/words.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const SKRIPT = join(HIER, "../../scripts/whisper_words.py");

export const name = "transkript";
export const ordner = "01-transkript";

export async function laufe(ctx) {
  const { auftrag, pfad, log } = ctx;
  const opt = auftrag.optionen ?? {};
  const bericht = { clips: [], warnungen: [] };
  const alle = [];

  // Korrekturen aus der App: { "<clip>": { "<index>": "Zartes" } }
  const korrFile = pfad("korrekturen.json");
  const korrekturen = existsSync(korrFile) ? await leseJson(korrFile) : {};

  for (const clip of auftrag.clips) {
    const datei = pfad("clips", clip.datei);
    const info = await probe(datei);
    const ziel = pfad(ordner, `${clip.id}.words.json`);
    let woerter;
    let quelle;

    if (Array.isArray(clip.woerter) && clip.woerter.length) {
      woerter = clip.woerter.map((w) => ({ text: w.text, start: w.start, end: w.end }));
      quelle = "vorgegeben";
    } else if (existsSync(ziel) && !ctx.neu) {
      const alt = await leseJson(ziel);
      woerter = alt.woerter;
      quelle = alt.quelle;
      log(`Transkript ${clip.id}: vorhandenes verwendet (${quelle})`);
    } else if (opt.asr !== "keins" && (await hatFasterWhisper())) {
      const tmp = pfad(ordner, `${clip.id}.asr.json`);
      log(`Transkript ${clip.id}: faster-whisper (${opt.whisperModell ?? "small"}) …`);
      await run("python3", [SKRIPT, datei, tmp, "--model", opt.whisperModell ?? "small", "--language", opt.sprache ?? "de"], { onLine: (l) => log(l) });
      woerter = await leseJson(tmp);
      quelle = "faster-whisper";
    } else if (clip.text) {
      const st = await stillen(datei, { rauschen: -35, mindest: 0.25 });
      woerter = naeherungsWoerter(clip.text, sprechAbschnitte(st, info.dauer), clip.id).map(({ text, start, end }) => ({ text, start, end }));
      quelle = "naeherung";
      bericht.warnungen.push(`Clip ${clip.id}: Wortzeiten sind eine Näherung aus dem Text (keine Spracherkennung). Untertitel können leicht versetzt sein.`);
    } else if (opt.asr === "keins") {
      woerter = [];
      quelle = "keins";
      bericht.warnungen.push(`Clip ${clip.id}: ohne Transkript. Es wird nur nach Stille geschnitten, es gibt keine Untertitel.`);
    } else {
      throw new Error(
        `Clip ${clip.id}: kein Transkript möglich. faster-whisper ist nicht installiert (pip install faster-whisper) und es wurde weder 'woerter' noch 'text' mitgegeben. ` +
          `Mit optionen.asr = "keins" wird nur nach Stille geschnitten.`,
      );
    }

    // Whisper erfindet Sätze über Stille: Wörter, die komplett in einer langen Stille beginnen, entfernen
    if (quelle === "faster-whisper") {
      const st = await stillen(datei, { rauschen: -35, mindest: 0.6 });
      const fake = erfundeneWoerter(woerter, st);
      if (fake.length) {
        woerter = woerter.filter((w) => !fake.includes(w));
        bericht.warnungen.push(`Clip ${clip.id}: ${fake.length} Wort/Wörter über Stille entfernt (${fake.map((w) => w.text).join(" ")}).`);
      }
    }

    // Korrekturen anwenden (nur den Text, nie die Zeiten)
    const k = korrekturen[clip.id] ?? {};
    woerter = woerter.map((w, i) => (k[i] != null ? { ...w, text: k[i], korrigiert: true } : w));
    await schreibeJson(ziel, { clip: clip.id, quelle, dauer: info.dauer, woerter });

    woerter.forEach((w) => alle.push({ ...w, clip: clip.id }));
    bericht.clips.push({ clip: clip.id, quelle, woerter: woerter.length, dauer: info.dauer });
  }

  // Tabelle zum Korrigieren (die App zeigt sie an)
  const zeilen = ["| Clip | Nr | Start | Ende | Wort |", "|---|---|---|---|---|"];
  for (const c of auftrag.clips) {
    const w = alle.filter((x) => x.clip === c.id);
    w.forEach((x, i) => zeilen.push(`| ${c.id} | ${i} | ${x.start.toFixed(2)} | ${x.end.toFixed(2)} | ${x.text} |`));
  }
  await schreibeText(pfad(ordner, "transkript.md"), zeilen.join("\n") + "\n");
  return bericht;
}

let _fw;
async function hatFasterWhisper() {
  if (_fw !== undefined) return _fw;
  const r = await run("python3", ["-c", "import faster_whisper"], { ok: true });
  _fw = r.code === 0;
  return _fw;
}
