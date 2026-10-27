// Agent 6: Export. Bild aus dem Render, Ton aus dem Master (genau die gemessene Lautheit),
// Faststart für Plattformen. Legt alle Dateien, die der Nutzer braucht, in einen Ordner.
import { copyFile } from "node:fs/promises";
import { run, probe, schreibeJson, runde } from "../util.mjs";

export const name = "export";
export const ordner = "06-export";

export async function laufe(ctx) {
  const { stil, pfad, log } = ctx;
  const video = pfad("05-render", "out/video.mp4");
  const master = pfad("04-ton", "master.wav");
  const ziel = pfad(ordner, "final.mp4");
  const v = await probe(video);
  // Ton über das Ende der Endkarte hinaus mit Stille auffüllen, Bild unverändert übernehmen
  await run("ffmpeg", [
    "-y", "-v", "error", "-i", video, "-i", master,
    "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
    "-af", "apad", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-t", String(v.dauer), "-movflags", "+faststart", ziel,
  ]);
  await copyFile(pfad("03-untertitel", "untertitel.srt"), pfad(ordner, "untertitel.srt"));
  await copyFile(pfad("02-schnitt", "words.cut.json"), pfad(ordner, "words.json"));
  await copyFile(pfad("02-schnitt", "schnittliste.json"), pfad(ordner, "schnittliste.json"));
  const info = await probe(ziel);
  const bericht = { datei: ziel, ...info, dauer: runde(info.dauer, 2), groesseMB: runde(info.groesseMB, 1), warnungen: [] };
  if (info.breite !== stil.canvas.breite || info.hoehe !== stil.canvas.hoehe) bericht.warnungen.push(`Format ${info.breite}×${info.hoehe} statt ${stil.canvas.breite}×${stil.canvas.hoehe}.`);
  log(`Export: final.mp4 ${info.breite}×${info.hoehe}, ${bericht.dauer} s, ${bericht.groesseMB} MB`);
  await schreibeJson(pfad(ordner, "export-bericht.json"), bericht);
  return bericht;
}
