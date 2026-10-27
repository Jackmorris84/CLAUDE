// Agent 2: Schnitt. Lücken, Füllwörter und Wiederholungen raus, mehrere Clips zusammensetzen,
// Wortzeiten auf den geschnittenen Film übertragen. Das Rohmaterial wird nie verändert.
import { writeFile } from "node:fs/promises";
import { leseJson, schreibeJson, run, probe, stillen, runde } from "../util.mjs";
import { baueSchnittliste, segmenteMitOffset, wortzeitenNeu } from "../lib/words.mjs";

export const name = "schnitt";
export const ordner = "02-schnitt";

export async function laufe(ctx) {
  const { auftrag, stil, pfad, log } = ctx;
  const o = { ...stil.schnitt, ...(auftrag.optionen?.schnitt ?? {}), ...(ctx.schnittUeberschreiben ?? {}) };
  const { breite, hoehe, fps } = stil.canvas;
  const bericht = { warnungen: [], clips: [] };

  const proClip = [];
  let alleWoerter = [];
  for (const clip of auftrag.clips) {
    const datei = pfad("clips", clip.datei);
    const info = await probe(datei);
    if (!info.hatAudio) throw new Error(`Clip ${clip.id}: keine Tonspur. Ohne Ton kann nicht nach Sprache geschnitten werden.`);
    if (info.breite && info.hoehe && Math.abs(info.breite / info.hoehe - breite / hoehe) > 0.02) {
      bericht.warnungen.push(`Clip ${clip.id}: ${info.breite}×${info.hoehe} ist nicht 9:16. Wird mittig zugeschnitten.`);
    }
    if (info.breite && info.breite < breite) bericht.warnungen.push(`Clip ${clip.id}: Auflösung ${info.breite}×${info.hoehe} wird auf ${breite}×${hoehe} hochskaliert (leicht weich).`);

    const t = await leseJson(pfad("01-transkript", `${clip.id}.words.json`));
    let schnitt;
    if (t.woerter.length) {
      const worte = t.woerter.map((w) => ({ ...w, clip: clip.id }));
      schnitt = baueSchnittliste(worte, info.dauer, {
        pauseMin: o.pauseMin,
        halteLuecke: o.halteLuecke,
        anfangsLuft: o.anfangsLuft,
        endLuft: o.endLuft,
        startSek: clip.startSek ?? null,
        endSek: clip.endSek ?? null,
        fuellerEntfernen: o.fuellerEntfernen ?? true,
        wiederholungenEntfernen: o.wiederholungenEntfernen ?? true,
        entferne: (auftrag.optionen?.entferne?.[clip.id]) ?? [],
        behalte: (auftrag.optionen?.behalte?.[clip.id]) ?? [],
      });
    } else {
      // Ohne Transkript: nur nach Stille schneiden
      const st = await stillen(datei, { rauschen: -35, mindest: o.pauseMin });
      const behalten = [];
      let cur = 0;
      const schnitte = [];
      for (const s of st) {
        const bis = Math.min(s.bis, info.dauer);
        if (bis - s.von > o.halteLuecke + 0.02) {
          const von = s.von + o.halteLuecke / 2;
          const bi = bis - o.halteLuecke / 2;
          if (von - cur > 0.02) behalten.push({ von: runde(cur), bis: runde(von) });
          schnitte.push({ von: runde(von), bis: runde(bi), grund: "pause" });
          cur = bi;
        }
      }
      if (info.dauer - cur > 0.02) behalten.push({ von: runde(cur), bis: runde(info.dauer) });
      schnitt = { behalten, schnitte, woerter: [] };
    }
    proClip.push({ clip: clip.id, datei, info, ...schnitt });
    alleWoerter = alleWoerter.concat(schnitt.woerter);
    const gespart = schnitt.schnitte.reduce((s, x) => s + (x.bis - x.von), 0);
    bericht.clips.push({ clip: clip.id, dauerRoh: runde(info.dauer), schnitte: schnitt.schnitte.length, gespart: runde(gespart) });
    log(`Schnitt ${clip.id}: ${schnitt.schnitte.length} Schnitte, ${runde(gespart, 2)} s gespart`);
  }

  const { segmente, dauer } = segmenteMitOffset(proClip.map((p) => ({ clip: p.clip, behalten: p.behalten.filter((b) => b.bis - b.von > 0.05) })));
  const woerterNeu = wortzeitenNeu(alleWoerter, segmente);
  await schreibeJson(pfad(ordner, "schnittliste.json"), {
    parameter: o,
    clips: proClip.map((p) => ({ clip: p.clip, dauerRoh: p.info.dauer, behalten: p.behalten, schnitte: p.schnitte })),
    segmente,
    dauer,
  });
  await schreibeJson(pfad(ordner, "words.cut.json"), woerterNeu);

  // FFmpeg: ein Filtergraph für alle Segmente. Bild und Ton getrennt ausgeben.
  const eingaben = [];
  const idx = new Map();
  for (const p of proClip) {
    idx.set(p.clip, eingaben.length);
    eingaben.push(p.datei);
  }
  const teile = [];
  const FADE = 0.008; // 8 ms Ein-/Ausblendung an jedem Schnitt gegen Knacken
  segmente.forEach((s, i) => {
    const n = idx.get(s.clip);
    const len = s.bis - s.von;
    teile.push(
      `[${n}:v]trim=start=${s.von}:end=${s.bis},setpts=PTS-STARTPTS,scale=${breite}:${hoehe}:force_original_aspect_ratio=increase,crop=${breite}:${hoehe},fps=${fps},setsar=1,format=yuv420p[v${i}]`,
    );
    teile.push(
      `[${n}:a]atrim=start=${s.von}:end=${s.bis},asetpts=PTS-STARTPTS,aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,afade=t=in:d=${FADE},afade=t=out:st=${Math.max(0, len - FADE).toFixed(4)}:d=${FADE}[a${i}]`,
    );
  });
  teile.push(segmente.map((_, i) => `[v${i}][a${i}]`).join("") + `concat=n=${segmente.length}:v=1:a=1[v][a]`);
  const skript = pfad(ordner, "filter.txt");
  await writeFile(skript, teile.join(";\n"), "utf8");
  const args = ["-y", "-v", "error"];
  for (const e of eingaben) args.push("-i", e);
  args.push(
    "-filter_complex_script", skript,
    "-map", "[v]", "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-g", String(fps), "-pix_fmt", "yuv420p", "-an", pfad(ordner, "geschnitten.mp4"),
    "-map", "[a]", "-c:a", "pcm_s24le", "-ar", "48000", pfad(ordner, "stimme.wav"),
  );
  log(`Schnitt: ${segmente.length} Segmente zusammensetzen …`);
  await run("ffmpeg", args);
  const aus = await probe(pfad(ordner, "geschnitten.mp4"));
  if (Math.abs(aus.dauer - dauer) > 0.15) bericht.warnungen.push(`Geschnittene Dauer ${runde(aus.dauer, 2)} s weicht vom Plan (${runde(dauer, 2)} s) ab.`);
  bericht.dauer = runde(aus.dauer, 2);
  bericht.segmente = segmente.length;
  bericht.woerter = woerterNeu.length;
  return bericht;
}
