import test from "node:test";
import assert from "node:assert/strict";
import { planeUntertitel, pruefeUntertitel, alsSrt } from "../src/lib/captions.mjs";

const w = (text, start, end) => ({ text, start, end });

// Text aus dem Referenzvideo mit geschätzten Zeiten
const referenz = [
  w("Wir", 1.0, 1.15), w("haben", 1.15, 1.45), w("draußen", 1.5, 1.9), w("Sturm.", 1.9, 2.4),
  w("Richtig", 2.6, 2.95), w("Sturm", 2.95, 3.3), w("und", 3.35, 3.5), w("Hitze", 3.5, 3.85), w("von", 3.85, 4.0), w("40", 4.0, 4.4), w("Grad.", 4.4, 4.9),
];

test("1 bis 3 Wörter, kein Überlappen, Mindestdauer eingehalten", () => {
  const u = planeUntertitel(referenz);
  assert.ok(u.length >= 4);
  assert.deepEqual(pruefeUntertitel(u, { minSichtbar: 0.4, maxWoerter: 3, dauer: 6 }), []);
});

test("Satzende trennt Einblendungen", () => {
  const u = planeUntertitel(referenz);
  for (const g of u) {
    const satzEnden = g.tokens.filter((t) => /[.!?]$/.test(t.t)).length;
    if (satzEnden) assert.ok(/[.!?]$/.test(g.tokens.at(-1).t), "Satzende steht am Ende der Einblendung");
  }
});

test("Genau ein Schlüsselwort pro Einblendung, Nomen und Zahlen gewinnen", () => {
  const u = planeUntertitel(referenz);
  for (const g of u) assert.equal(g.tokens.filter((t) => t.schluessel).length, 1);
  const sturm = u.find((g) => g.text.includes("draußen") || g.text.includes("Sturm."));
  const key = sturm.tokens.find((t) => t.schluessel).t;
  assert.ok(/Sturm/.test(key), `Schlüsselwort war ${key}`);
  const grad = u.find((g) => g.text.includes("Grad"));
  assert.ok(/40|Grad/.test(grad.tokens.find((t) => t.schluessel).t));
});

test("Freigegebene Schlüsselwörter haben Vorrang", () => {
  const u = planeUntertitel(referenz, { freigegeben: new Set(["richtig"]) });
  const g = u.find((x) => x.text.startsWith("Richtig"));
  assert.equal(g.tokens.find((t) => t.schluessel).t, "Richtig");
});

test("Die erste Einblendung startet nicht bei exakt 0", () => {
  const u = planeUntertitel([w("Hallo", 0, 0.3), w("Welt", 0.3, 0.7)]);
  assert.ok(u[0].start >= 0.1);
});

test("Zu schnelle Rede: verschmelzen statt unter 0,4 s", () => {
  const schnell = [w("a", 0, 0.1), w("b", 0.1, 0.2), w("c", 0.2, 0.3), w("d", 0.3, 0.4)];
  const u = planeUntertitel(schnell, { maxWoerter: 2 });
  assert.deepEqual(pruefeUntertitel(u, { minSichtbar: 0.4, maxWoerter: 2 }).filter((f) => f.regel !== "mindestdauer"), []);
});

test("SRT-Format", () => {
  const srt = alsSrt([{ text: "Hallo Welt", start: 1.5, end: 2.25, tokens: [] }]);
  assert.match(srt, /^1\n00:00:01,500 --> 00:00:02,250\nHallo Welt/);
});
