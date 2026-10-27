import test from "node:test";
import assert from "node:assert/strict";
import { wendeKorrekturenAn, ladeStil, STUFEN } from "../src/orchestrator.mjs";

const stil = await ladeStil({});

test("Stufen laufen in der vereinbarten Reihenfolge", () => {
  assert.deepEqual(STUFEN.map((s) => s.name), ["transkript", "schnitt", "untertitel", "ton", "render", "export"]);
});

test("Prüfer-Korrektur 'schnitt_enger' schneidet beim nächsten Lauf enger, nie unter die Grenzen", () => {
  const ctx = {};
  let r = wendeKorrekturenAn(ctx, [{ art: "schnitt_enger" }], stil);
  assert.equal(r.frueheste, 1);
  assert.ok(ctx.schnittUeberschreiben.pauseMin < stil.schnitt.pauseMin);
  for (let i = 0; i < 10; i++) wendeKorrekturenAn(ctx, [{ art: "schnitt_enger" }], stil);
  assert.ok(ctx.schnittUeberschreiben.pauseMin >= 0.25);
  assert.ok(ctx.schnittUeberschreiben.halteLuecke >= 0.12);
});

test("Prüfer-Korrektur 'ton' gleicht die Abweichung aus und senkt die Spitze", () => {
  const ctx = {};
  const r = wendeKorrekturenAn(ctx, [{ art: "ton", abweichung: -1.5, extraSenken: 1 }], stil);
  assert.equal(r.frueheste, 3);
  assert.ok(ctx.tonUeberschreiben.zielLufs > stil.ton.zielLufs, "war zu leise: Ziel höher setzen");
  assert.ok(ctx.tonUeberschreiben.spitzeDb < stil.ton.spitzeDb);
});

test("Mehrere Korrekturen: die früheste Stufe entscheidet, was neu läuft", () => {
  const ctx = {};
  const r = wendeKorrekturenAn(ctx, [{ art: "untertitel_ruhiger" }, { art: "ton", abweichung: 1 }], stil);
  assert.equal(r.frueheste, 2);
  assert.equal(ctx.untertitelUeberschreiben.maxWoerter, 2);
});

test("Stil lässt sich pro Auftrag überschreiben, ohne den Rest zu verlieren", async () => {
  const s = await ladeStil({ stil: { farben: { gold: "#D8B878" }, endkarte: { text: "Morgen: Tür 2" } } });
  assert.equal(s.farben.gold, "#D8B878");
  assert.equal(s.farben.text, "#FFFFFF");
  assert.equal(s.endkarte.text, "Morgen: Tür 2");
  assert.equal(s.endkarte.dauer, 2.4);
});
