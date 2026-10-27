// Agent 7: Prüfer. Misst das fertige Video gegen den Stil und die Regeln. Liefert Befunde und, wo möglich,
// eine Korrektur, die der Überarbeiter (Orchestrator) automatisch anwendet. Prüft nur, was messbar ist,
// und sagt ausdrücklich, was ein Mensch ansehen muss (Kontaktbogen).
import { leseJson, schreibeJson, run, probe, stillen, schwarzbilder, lautheit, runde } from "../util.mjs";
import { pruefeUntertitel } from "../lib/captions.mjs";
import { frageClaude, hatClaude } from "../lib/claude.mjs";

export const name = "pruefung";
export const ordner = "07-pruefung";

export async function laufe(ctx) {
  const { stil, auftrag, pfad, log } = ctx;
  const runde_ = ctx.runde ?? 1;
  const final = pfad("06-export", "final.mp4");
  const schnitt = await leseJson(pfad("02-schnitt", "schnittliste.json"));
  const untertitel = await leseJson(pfad("03-untertitel", "untertitel.json"));
  const woerter = await leseJson(pfad("02-schnitt", "words.cut.json"));
  const tonBericht = await leseJson(pfad("04-ton", "ton-bericht.json"));
  const info = await probe(final);
  const inhalt = schnitt.dauer;
  const ende = { ...stil.endkarte, ...(auftrag.endkarte ?? {}) };
  const erwartet = inhalt + ende.dauer;
  const t = { ...stil.ton, ...(auftrag.optionen?.ton ?? {}) };
  const befunde = [];
  const b = (id, ok, wert, soll, opt = {}) => befunde.push({ id, ok, wert, soll, schwere: opt.schwere ?? "fehler", hinweis: opt.hinweis ?? null, korrektur: ok ? null : opt.korrektur ?? null });

  // 1. Format
  b("format", info.breite === stil.canvas.breite && info.hoehe === stil.canvas.hoehe && Math.abs(info.fps - stil.canvas.fps) < 0.5 && info.videoCodec === "h264" && info.audioCodec === "aac",
    `${info.breite}×${info.hoehe} ${runde(info.fps, 1)} fps ${info.videoCodec}/${info.audioCodec}`, `${stil.canvas.breite}×${stil.canvas.hoehe} ${stil.canvas.fps} fps h264/aac`);
  // 2. Dauer und Synchronität
  b("dauer", Math.abs(info.dauer - erwartet) <= 0.25, runde(info.dauer, 2), runde(erwartet, 2));
  b("av_synchron", info.audioDauer != null && Math.abs(info.audioDauer - info.dauer) <= 0.15, runde(info.audioDauer ?? 0, 2), runde(info.dauer, 2), { hinweis: "Bild- und Tondauer weichen ab" });
  // 3. Lautheit
  const l = await lautheit(final);
  const lufsOk = l.lufs != null && Math.abs(l.lufs - t.zielLufs) <= (t.toleranzLu ?? 1);
  b("lautheit", lufsOk, `${l.lufs} LUFS`, `${t.zielLufs} ± ${t.toleranzLu ?? 1}`, { korrektur: { art: "ton", abweichung: l.lufs == null ? 0 : l.lufs - t.zielLufs } });
  b("spitzenpegel", l.spitzeDb != null && l.spitzeDb <= t.spitzeDb + 0.15, `${l.spitzeDb} dBFS`, `≤ ${t.spitzeDb}`, { korrektur: { art: "ton", abweichung: 0, extraSenken: 1 } });
  // 4. Stille im Inhalt (nie Lücken über 0,45 s übrig lassen)
  const st = (await stillen(final, { rauschen: -35, mindest: 0.45 })).filter((s) => s.von < inhalt - 0.05);
  b("keine_luecken", st.length === 0, st.length ? st.map((s) => `${runde(s.von, 2)}–${runde(Math.min(s.bis, inhalt), 2)} s`).join(", ") : "keine", "keine Stille über 0,45 s", { korrektur: { art: "schnitt_enger" } });
  // 5. Schwarzbild: nur die Endkarte darf schwarz sein
  const sw = (await schwarzbilder(final, { mindest: 0.25 })).filter((x) => x.von < inhalt - 0.1);
  b("kein_schwarzbild", sw.length === 0, sw.length ? sw.map((s) => `${runde(s.von, 2)}–${runde(s.bis, 2)} s`).join(", ") : "keins", "nur Endkarte schwarz", { hinweis: "Schwarzbild im Inhalt (z. B. am Anfang des Rohvideos)" });
  // 6. Untertitel-Regeln
  const uf = pruefeUntertitel(untertitel, { minSichtbar: stil.untertitel.minSichtbar, maxWoerter: stil.untertitel.maxWoerter, dauer: inhalt });
  b("untertitel_regeln", uf.length === 0, uf.length ? uf.map((f) => f.regel).join(", ") : "ok", "Regeln aus Stil", { korrektur: { art: "untertitel_ruhiger" } });
  // 7. Jedes Wort liegt in einer Einblendung
  if (woerter.length) {
    const unbedeckt = woerter.filter((w) => !untertitel.some((u) => w.start >= u.start - 0.05 && w.end <= u.end + 0.25));
    b("woerter_gedeckt", unbedeckt.length / woerter.length <= 0.03, `${woerter.length - unbedeckt.length}/${woerter.length}`, "≥ 97 %", { schwere: "warnung", hinweis: unbedeckt.slice(0, 5).map((w) => w.text).join(" ") });
  }
  // 8. Sicherheitsband (Plattform-Oberfläche)
  const pilleUnten = stil.untertitel.oben + stil.untertitel.groesse * 2.2;
  b("sicherheitsband", stil.untertitel.oben >= stil.sicherheitsband.oben && pilleUnten <= stil.sicherheitsband.unten, `${stil.untertitel.oben}–${Math.round(pilleUnten)} px`, `${stil.sicherheitsband.oben}–${stil.sicherheitsband.unten} px`);
  // 9. Hook früh: erste Einblendung innerhalb 1,5 s
  if (untertitel.length) b("hook_frueh", untertitel[0].start <= 1.5, `${untertitel[0].start} s`, "≤ 1,5 s", { schwere: "warnung" });
  // 10. Länge und Dateigröße
  b("laenge_reel", info.dauer <= 90, `${runde(info.dauer, 1)} s`, "≤ 90 s", { schwere: "warnung" });
  b("dateigroesse", info.groesseMB <= 100, `${runde(info.groesseMB, 1)} MB`, "≤ 100 MB", { schwere: "warnung" });
  // 11. Herkunft der Wortzeiten
  const quellen = (await Promise.all(auftrag.clips.map((c) => leseJson(pfad("01-transkript", `${c.id}.words.json`)).then((x) => x.quelle)))).filter((q) => q === "naeherung");
  if (quellen.length) b("wortzeiten_echt", false, "Näherung aus Text", "echte Wortzeiten (Spracherkennung)", { schwere: "warnung", hinweis: "Untertitel können leicht versetzt sein. Mit faster-whisper neu transkribieren." });

  // Kontaktbogen: 1 Bild pro Sekunde, für die Sichtprüfung durch einen Menschen
  const bogen = pfad(ordner, `kontaktbogen-${runde_}.jpg`);
  const n = Math.ceil(info.dauer);
  await run("ffmpeg", ["-y", "-v", "error", "-i", final, "-vf", `fps=1,scale=216:-1,tile=${Math.min(10, n)}x${Math.ceil(n / 10)}`, "-frames:v", "1", "-q:v", "3", bogen]);

  // Optional: Sichtprüfung durch Claude (nur mit API-Schlüssel). Findet, was Messungen nicht sehen.
  let sicht = null;
  if (hatClaude() && !ctx.ohneClaude) {
    try {
      sicht = await frageClaude({
        system: "Du bist Qualitätsprüfer für kurze Hochkant-Videos (Reels). Du siehst einen Kontaktbogen (1 Bild pro Sekunde). Prüfe nur, was du WIRKLICH siehst. Erfinde nichts. Antworte mit JSON: {\"probleme\":[{\"sekunde\":Zahl,\"problem\":\"...\"}],\"gesamt\":\"ok|pruefen\"}.",
        user: "Achte auf: Untertitel über dem Gesicht, abgeschnittener oder unleserlicher Text, doppelte Texte, Bildfehler, Schwarzbild im Inhalt, doppelte Untertitel.",
        bilder: [bogen],
        json: true,
      });
      for (const p of sicht.probleme ?? []) b(`sicht_${p.sekunde}`, false, p.problem, "keine sichtbaren Fehler", { schwere: "warnung", hinweis: `Sekunde ${p.sekunde}` });
    } catch (e) {
      log(`Sichtprüfung nicht möglich: ${e.message}`);
    }
  }

  const fehler = befunde.filter((x) => !x.ok && x.schwere === "fehler");
  const korrekturen = [...new Map(fehler.filter((x) => x.korrektur).map((x) => [x.korrektur.art, x.korrektur])).values()];
  const ergebnis = {
    runde: runde_,
    bestanden: fehler.length === 0,
    befunde,
    korrekturen,
    offen: fehler.filter((x) => !x.korrektur).map((x) => x.id),
    menschlichePruefung: [`Kontaktbogen ansehen: ${bogen}`, "Zweimal am Handy ansehen, mit und ohne Ton.", "Passt der Ton (Stimme klar, nichts schneidet Wörter an)?"],
    sichtpruefung: sicht ?? "nicht durchgeführt (kein ANTHROPIC_API_KEY)",
  };
  await schreibeJson(pfad(ordner, `qa-runde-${runde_}.json`), ergebnis);
  log(`Prüfung Runde ${runde_}: ${ergebnis.bestanden ? "bestanden" : `${fehler.length} Fehler`}, ${befunde.filter((x) => !x.ok && x.schwere === "warnung").length} Warnungen`);
  return ergebnis;
}
