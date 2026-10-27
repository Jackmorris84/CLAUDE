// Orchestrator: gibt die Arbeit von Agent zu Agent weiter und schließt eine Prüf-/Überarbeitungsschleife an.
// Jeder Schritt schreibt in seinen Ordner im Auftragsordner, der nächste liest diese Dateien (nichts hängt nur im Speicher).
// Wiederaufnahme: Ein Schritt mit Marker `.fertig.json` wird übersprungen, außer er ist von einer Korrektur betroffen.
import { mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { leseJson, schreibeJson, schreibeText } from "./util.mjs";
import * as transkript from "./stages/01-transkript.mjs";
import * as schnitt from "./stages/02-schnitt.mjs";
import * as untertitel from "./stages/03-untertitel.mjs";
import * as ton from "./stages/04-ton.mjs";
import * as render from "./stages/05-render.mjs";
import * as exportStufe from "./stages/06-export.mjs";
import * as pruefung from "./stages/07-pruefung.mjs";
import * as paket from "./stages/08-paket.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
export const STUFEN = [transkript, schnitt, untertitel, ton, render, exportStufe];
const NAMEN = STUFEN.map((s) => s.name);
export const MAX_RUNDEN = 3;

const tief = (a, b) => {
  if (b == null || typeof b !== "object" || Array.isArray(b)) return b === undefined ? a : b;
  const out = { ...(a ?? {}) };
  for (const k of Object.keys(b)) out[k] = tief(out[k], b[k]);
  return out;
};

export async function ladeStil(auftrag) {
  const basis = await leseJson(join(HIER, "style.default.json"));
  return tief(basis, auftrag.stil ?? {});
}

async function status(pfad, patch) {
  const datei = pfad("status.json");
  const alt = existsSync(datei) ? await leseJson(datei) : {};
  const neu = { ...alt, ...patch, aktualisiert: new Date().toISOString() };
  await schreibeJson(datei, neu);
  return neu;
}

/** Korrekturen des Prüfers in Überschreibungen für die Stufen übersetzen. Liefert die früheste betroffene Stufe. */
export function wendeKorrekturenAn(ctx, korrekturen, stil) {
  const angewandt = [];
  let frueheste = Infinity;
  const markiere = (stufe, beschreibung) => {
    frueheste = Math.min(frueheste, NAMEN.indexOf(stufe));
    angewandt.push(beschreibung);
  };
  for (const k of korrekturen) {
    if (k.art === "schnitt_enger") {
      const alt = { ...stil.schnitt, ...(ctx.schnittUeberschreiben ?? {}) };
      ctx.schnittUeberschreiben = { pauseMin: Math.max(0.25, +(alt.pauseMin * 0.75).toFixed(2)), halteLuecke: Math.max(0.12, +(alt.halteLuecke * 0.8).toFixed(2)) };
      markiere("schnitt", `Schnitt enger: Pausen ab ${ctx.schnittUeberschreiben.pauseMin} s kürzen, Luft ${ctx.schnittUeberschreiben.halteLuecke} s`);
    } else if (k.art === "ton") {
      const alt = { ...stil.ton, ...(ctx.tonUeberschreiben ?? {}) };
      const aus = { ...alt };
      if (k.abweichung) aus.zielLufs = +(alt.zielLufs - Math.max(-2, Math.min(2, k.abweichung * 0.9))).toFixed(2);
      if (k.extraSenken) aus.spitzeDb = +(alt.spitzeDb - 0.5).toFixed(2);
      ctx.tonUeberschreiben = { zielLufs: aus.zielLufs, spitzeDb: aus.spitzeDb };
      markiere("ton", `Ton neu: Ziel ${aus.zielLufs} LUFS, Spitze ${aus.spitzeDb} dB`);
    } else if (k.art === "untertitel_ruhiger") {
      const alt = { ...stil.untertitel, ...(ctx.untertitelUeberschreiben ?? {}) };
      ctx.untertitelUeberschreiben = { maxWoerter: Math.max(2, alt.maxWoerter - 1), luecke: 0.25 };
      markiere("untertitel", `Untertitel ruhiger: höchstens ${ctx.untertitelUeberschreiben.maxWoerter} Wörter`);
    }
  }
  return { frueheste: frueheste === Infinity ? null : frueheste, angewandt };
}

/**
 * @param dir  Auftragsordner mit 00-auftrag.json und clips/
 * @param opt  { log, neu, ab:"schnitt"|…, ohneClaude, llm }
 */
export async function laufeAuftrag(dir, opt = {}) {
  const pfad = (...p) => join(dir, ...p);
  const logZeilen = [];
  const log = (...a) => {
    const z = `[${new Date().toISOString().slice(11, 19)}] ${a.join(" ")}`;
    logZeilen.push(z);
    opt.log?.(z);
  };
  const auftrag = await leseJson(pfad("00-auftrag.json"));
  const stil = await ladeStil(auftrag);
  const ctx = { dir, auftrag, stil, pfad, log, neu: !!opt.neu, ohneClaude: !!opt.ohneClaude, llm: opt.llm };
  // Überschreibungen aus einem früheren Lauf (z. B. nach Korrekturen) wieder laden
  const ueb = pfad("ueberschreibungen.json");
  if (existsSync(ueb) && !opt.neu) Object.assign(ctx, await leseJson(ueb));

  const begonnen = new Date().toISOString();
  await status(pfad, { id: auftrag.id ?? null, status: "laeuft", stufe: null, begonnen, fehler: null, runden: [] });
  const abIdx = opt.ab ? NAMEN.indexOf(opt.ab) : -1;
  if (opt.ab && abIdx < 0) throw new Error(`Unbekannte Stufe "${opt.ab}". Gültig: ${NAMEN.join(", ")}`);

  const berichte = {};
  const rundenInfo = [];
  try {
    // Eine Stufe ausführen. `erzwingen`: auch dann, wenn ein Marker sie als fertig ausweist.
    const laufeStufe = async (i, erzwingen) => {
      const s = STUFEN[i];
      const marker = pfad(s.ordner, ".fertig.json");
      if (!erzwingen && existsSync(marker)) {
        berichte[s.name] = await leseJson(marker);
        log(`${s.name}: vorhanden, übersprungen`);
        return;
      }
      await mkdir(pfad(s.ordner), { recursive: true });
      await status(pfad, { stufe: s.name, fortschritt: `${i + 1}/${STUFEN.length}` });
      log(`▶ ${s.name}`);
      ctx.neu = erzwingen; // Stufe 1 liest sonst ein vorhandenes Transkript
      const b = await s.laufe(ctx);
      berichte[s.name] = b;
      await schreibeJson(marker, b);
    };
    for (let i = 0; i < STUFEN.length; i++) await laufeStufe(i, !!opt.neu || (abIdx >= 0 && i >= abIdx));

    // Prüfen und überarbeiten, höchstens MAX_RUNDEN Runden
    let qa;
    for (let runde = 1; runde <= MAX_RUNDEN; runde++) {
      await status(pfad, { stufe: "pruefung", runden: rundenInfo });
      ctx.runde = runde;
      qa = await pruefung.laufe(ctx);
      rundenInfo.push({ runde, bestanden: qa.bestanden, fehler: qa.befunde.filter((b) => !b.ok && b.schwere === "fehler").map((b) => b.id), angewandt: [] });
      if (qa.bestanden || !qa.korrekturen.length || runde === MAX_RUNDEN) break;
      const { frueheste, angewandt } = wendeKorrekturenAn(ctx, qa.korrekturen, stil);
      rundenInfo.at(-1).angewandt = angewandt;
      if (frueheste == null) break;
      await schreibeJson(ueb, { schnittUeberschreiben: ctx.schnittUeberschreiben, tonUeberschreiben: ctx.tonUeberschreiben, untertitelUeberschreiben: ctx.untertitelUeberschreiben });
      log(`↻ Überarbeitung: ${angewandt.join("; ")}`);
      for (let i = frueheste; i < STUFEN.length; i++) await laufeStufe(i, true);
    }

    await status(pfad, { stufe: "paket" });
    log("▶ paket");
    await mkdir(pfad(paket.ordner), { recursive: true });
    berichte.paket = await paket.laufe(ctx);

    const warnungen = Object.entries(berichte).flatMap(([k, v]) => (v?.warnungen ?? []).map((w) => `${k}: ${w}`));
    const fertig = qa.bestanden;
    await schreibeText(pfad("99-zusammenfassung.md"), zusammenfassung({ auftrag, qa, rundenInfo, warnungen, berichte, pfad, dir }));
    const endStatus = await status(pfad, {
      status: fertig ? "fertig" : "pruefen",
      stufe: "fertig",
      beendet: new Date().toISOString(),
      ergebnis: { video: "06-export/final.mp4", thumbnail: "08-paket/thumbnail.jpg", paket: "08-paket/paket.md", untertitel: "06-export/untertitel.srt", zusammenfassung: "99-zusammenfassung.md" },
      runden: rundenInfo,
      offen: qa.offen,
      warnungen,
    });
    log(fertig ? "✔ fertig" : "⚠ fertig, aber Prüfer meldet offene Punkte (siehe 99-zusammenfassung.md)");
    return endStatus;
  } catch (e) {
    log(`✖ Fehler: ${e.message}`);
    await status(pfad, { status: "fehler", beendet: new Date().toISOString(), fehler: e.message });
    await writeFile(pfad("fehler.log"), logZeilen.join("\n") + "\n" + (e.stack ?? ""), "utf8");
    throw e;
  } finally {
    await writeFile(pfad("lauf.log"), logZeilen.join("\n") + "\n", "utf8");
  }
}

function zusammenfassung({ auftrag, qa, rundenInfo, warnungen, berichte, dir }) {
  const z = [`# Zusammenfassung Tür ${auftrag.tuer ?? "?"} (${auftrag.id ?? ""})`, ""];
  if (!qa.bestanden) z.push("> ⚠ **Prüfer meldet offene Punkte.** Bitte ansehen, bevor du hochlädst:", ...qa.befunde.filter((b) => !b.ok && b.schwere === "fehler").map((b) => `> - ${b.id}: ${b.wert} (soll ${b.soll})`), "");
  else z.push("✔ Alle messbaren Prüfungen bestanden.", "");
  z.push("## Ergebnis", "- Video: `06-export/final.mp4`", "- Thumbnail: `08-paket/thumbnail.jpg`", "- Texte: `08-paket/paket.md`", "- Untertitel: `06-export/untertitel.srt`", "");
  const s = berichte.schnitt;
  if (s) z.push("## Was geschnitten wurde", ...s.clips.map((c) => `- Clip ${c.clip}: ${c.dauerRoh} s Roh, ${c.schnitte} Schnitte, ${c.gespart} s gespart`), `- Ergebnis ${s.dauer} s`, "");
  if (berichte.ton) z.push("## Ton", `- ${berichte.ton.vorher.lufs} → ${berichte.ton.nachher.lufs} LUFS, Spitze ${berichte.ton.nachher.spitzeDb} dBFS`, "");
  z.push("## Prüfrunden", ...rundenInfo.map((r) => `- Runde ${r.runde}: ${r.bestanden ? "bestanden" : "Fehler: " + r.fehler.join(", ")}${r.angewandt.length ? " → " + r.angewandt.join("; ") : ""}`), "");
  z.push("## Muss ein Mensch ansehen", ...qa.menschlichePruefung.map((m) => `- ${m}`), "");
  if (warnungen.length) z.push("## Warnungen", ...warnungen.map((w) => `- ${w}`), "");
  z.push("**Rausschicken oder ändern?**");
  return z.join("\n") + "\n";
}
