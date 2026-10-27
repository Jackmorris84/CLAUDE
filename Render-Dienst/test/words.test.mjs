import test from "node:test";
import assert from "node:assert/strict";
import { findePausen, findeFueller, findeWiederholungen, baueSchnittliste, segmenteMitOffset, wortzeitenNeu, ausgabeZeit } from "../src/lib/words.mjs";

const w = (text, start, end, clip = "a") => ({ text, start, end, clip });

test("Pausen über 0,4 s werden gefunden, inkl. Anfang und Ende", () => {
  const words = [w("Hallo", 1.0, 1.4), w("Welt", 1.5, 1.9), w("Ende", 3.0, 3.4)];
  const p = findePausen(words, 5, 0.4);
  assert.deepEqual(p, [
    { von: 0, bis: 1.0 },
    { von: 1.9, bis: 3.0 },
    { von: 3.4, bis: 5 },
  ]);
});

test("Füllwörter und Wiederholungen", () => {
  const words = [w("Ich", 0, 0.2), w("ähm", 0.3, 0.6), w("ich", 0.7, 0.9), w("gehe", 1.0, 1.3), w("das", 1.4, 1.6), w("ist", 1.6, 1.8), w("das", 1.9, 2.1), w("ist", 2.1, 2.3), w("gut", 2.4, 2.6)];
  assert.deepEqual(findeFueller(words), [1]);
  // "das ist das ist": der frühere Versuch (Index 4,5) fliegt raus
  assert.deepEqual(findeWiederholungen(words), [4, 5]);
});

test("Lücke wird auf 0,2 s gekürzt, aus der Mitte, nie bündig", () => {
  const words = [w("Eins", 0.1, 0.5), w("Zwei", 1.5, 1.9)];
  const r = baueSchnittliste(words, 2.2, { pauseMin: 0.4, halteLuecke: 0.2 });
  const s = r.schnitte.find((x) => x.grund === "pause");
  assert.ok(s, "es gibt einen Pausen-Schnitt");
  // Lücke 0,5 .. 1,5 (1,0 s) -> behalten 0,2 s: Schnitt von 0,6 bis 1,4
  assert.equal(s.von, 0.6);
  assert.equal(s.bis, 1.4);
  // Nach den Schnitten bleiben die Wörter vollständig in den behaltenen Segmenten
  for (const k of r.woerter) assert.ok(r.behalten.some((b) => k.start >= b.von && k.end <= b.bis));
});

test("Kleine natürliche Lücken bleiben unverändert", () => {
  const words = [w("Eins", 0.1, 0.5), w("Zwei", 0.7, 1.1)];
  const r = baueSchnittliste(words, 1.3, {});
  assert.equal(r.schnitte.length, 0);
});

test("Füllwort wird entfernt, ohne an der Sprache zu kleben", () => {
  const words = [w("Also", 0, 0.3), w("ähm", 0.45, 0.8), w("los", 0.95, 1.3)];
  const r = baueSchnittliste(words, 1.4, {});
  const s = r.schnitte.find((x) => x.grund === "fueller");
  assert.ok(s);
  assert.ok(s.von > 0.3 && s.bis < 0.95, "Rand bleibt als Atem stehen");
  assert.deepEqual(r.woerter.map((x) => x.text), ["Also", "los"]);
});

test("Nutzer kann Wörter behalten oder zusätzlich entfernen", () => {
  const words = [w("Also", 0, 0.3), w("ähm", 0.45, 0.8), w("los", 0.95, 1.3)];
  assert.equal(baueSchnittliste(words, 1.4, { behalte: [1] }).woerter.length, 3);
  assert.deepEqual(baueSchnittliste(words, 1.4, { entferne: [0] }).woerter.map((x) => x.text), ["ähm", "los"].filter((t) => t !== "ähm"));
});

test("Wortzeiten werden auf die geschnittene Zeitachse übertragen, mehrere Clips", () => {
  const a = baueSchnittliste([w("Eins", 0.1, 0.5, "a"), w("Zwei", 1.5, 1.9, "a")], 2.0, {});
  const b = baueSchnittliste([w("Drei", 0.2, 0.6, "b")], 1.0, {});
  const { segmente, dauer } = segmenteMitOffset([
    { clip: "a", behalten: a.behalten },
    { clip: "b", behalten: b.behalten },
  ]);
  const neu = wortzeitenNeu([...a.woerter, ...b.woerter], segmente);
  assert.equal(neu.length, 3);
  // Reihenfolge und keine Überlappung
  for (let i = 1; i < neu.length; i++) assert.ok(neu[i].start >= neu[i - 1].end - 1e-6);
  // Dauer = Summe der behaltenen Segmente
  const summe = segmente.reduce((s, x) => s + (x.bis - x.von), 0);
  assert.ok(Math.abs(summe - dauer) < 1e-3);
  assert.equal(ausgabeZeit(segmente, "b", 0.2) !== null, true);
});

test("Anfang und Ende: Start wird getrimmt, Rest bleibt", () => {
  const words = [w("Hey", 3.0, 3.3), w("Leute", 3.4, 3.8)];
  const r = baueSchnittliste(words, 6.0, { anfangsLuft: 0.1, endLuft: 0.25 });
  assert.equal(r.behalten.length, 1);
  assert.ok(Math.abs(r.behalten[0].von - 2.9) < 1e-6);
  assert.ok(Math.abs(r.behalten[0].bis - 4.05) < 1e-6);
});
