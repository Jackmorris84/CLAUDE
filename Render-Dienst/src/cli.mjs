#!/usr/bin/env node
// Kommandozeile: Auftrag anlegen und ausführen.
//   node src/cli.mjs anlegen <ordner> <clip.mp4>... [--tuer 3] [--wunsch "..."] [--text "gesprochener Text"]
//   node src/cli.mjs lauf <ordner> [--neu] [--ab schnitt] [--ohne-claude]
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { basename, resolve, join } from "node:path";
import { existsSync } from "node:fs";
import { laufeAuftrag, STUFEN } from "./orchestrator.mjs";

const [, , befehl, ordnerArg, ...rest] = process.argv;
const flag = (n) => {
  const i = rest.indexOf(n);
  return i >= 0 ? rest[i + 1] : null;
};
const hat = (n) => rest.includes(n);

function hilfe() {
  console.log(`Render-Dienst
  node src/cli.mjs anlegen <ordner> <clip.mp4>... [--tuer N] [--wunsch "..."] [--text "gesprochener Text"]
  node src/cli.mjs lauf <ordner> [--neu] [--ab ${STUFEN.map((s) => s.name).join("|")}] [--ohne-claude]
Ohne Spracherkennung (faster-whisper) kann ein Text mitgegeben werden (--text), dann sind die Wortzeiten eine Näherung.`);
}

if (!befehl || !ordnerArg) {
  hilfe();
  process.exit(befehl ? 1 : 0);
}
const dir = resolve(ordnerArg);

if (befehl === "anlegen") {
  const clips = rest.filter((a, i) => !a.startsWith("--") && !["--tuer", "--wunsch", "--text"].includes(rest[i - 1]));
  if (!clips.length) {
    console.error("Mindestens ein Rohvideo angeben.");
    process.exit(1);
  }
  await mkdir(join(dir, "clips"), { recursive: true });
  const eintraege = [];
  for (const [i, c] of clips.entries()) {
    if (!existsSync(c)) throw new Error(`Datei nicht gefunden: ${c}`);
    const datei = basename(c);
    await copyFile(c, join(dir, "clips", datei));
    eintraege.push({ id: `clip${i + 1}`, datei, ...(i === 0 && flag("--text") ? { text: flag("--text") } : {}) });
  }
  const auftrag = { id: basename(dir), tuer: flag("--tuer") ? Number(flag("--tuer")) : null, wunsch: flag("--wunsch"), clips: eintraege, optionen: {} };
  await writeFile(join(dir, "00-auftrag.json"), JSON.stringify(auftrag, null, 2) + "\n", "utf8");
  console.log(`Auftrag angelegt: ${join(dir, "00-auftrag.json")}`);
} else if (befehl === "lauf") {
  const status = await laufeAuftrag(dir, { log: console.log, neu: hat("--neu"), ab: flag("--ab"), ohneClaude: hat("--ohne-claude") });
  console.log(`\nStatus: ${status.status}\nErgebnis: ${join(dir, status.ergebnis.video)}\nZusammenfassung: ${join(dir, status.ergebnis.zusammenfassung)}`);
} else {
  hilfe();
  process.exit(1);
}
