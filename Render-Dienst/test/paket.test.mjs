import test from "node:test";
import assert from "node:assert/strict";
import { titelPruefen, captionsPruefen, kommentarPruefen, kennzahlen } from "../src/lib/paket.mjs";

test("Titel: Länge, Großbuchstaben, Thumbnail darf Titel nicht wiederholen", () => {
  const a = titelPruefen("Ein Projekt, das ich noch nicht verraten darf", "Seid bereit");
  assert.ok(a.laenge > 40 && a.laenge <= 60);
  assert.ok(a.probleme.some((p) => p.includes("Handy-Feed")));
  assert.ok(!a.probleme.some((p) => p.includes("wiederholt")));
  const b = titelPruefen("Das Geheimnis im Studio", "Geheimnis im Studio heute");
  assert.ok(b.probleme.some((p) => p.includes("wiederholt")));
  assert.ok(b.probleme.some((p) => p.includes("4 Wörter") || p.includes("höchstens 3")));
  const c = titelPruefen("SO KLINGT DAS WIRKLICH SCHÖN", "Hör zu");
  assert.ok(c.probleme.some((p) => p.includes("Großbuchstaben")));
});

test("Captions: Hashtags normalisieren, Grenzen melden, auf 15 Tags kürzen", () => {
  const { paket, probleme } = captionsPruefen({
    instagram: { caption: "Hallo", hashtags: ["weihnachten", "#panflöte", "weihnachten"] },
    tiktok: { caption: "x".repeat(151), hashtags: ["a", "b", "c", "d", "e", "f"] },
    youtube: { titel: ["Kurz"], beschreibung: "Zeile 1\nZeile 2", tags: Array.from({ length: 20 }, (_, i) => `t${i}`) },
    facebook: { caption: "Hi", hashtags: ["a", "b", "c", "d", "e", "f"] },
  });
  assert.deepEqual(paket.instagram.hashtags, ["#weihnachten", "#panflöte"]);
  assert.equal(paket.youtube.tags.length, 15);
  assert.ok(probleme.some((p) => p.startsWith("Instagram")));
  assert.ok(probleme.some((p) => p.includes("TikTok: Caption")));
  assert.ok(probleme.some((p) => p.startsWith("Facebook")));
});

test("Angepinnter Kommentar: höchstens 30 Wörter, keine Versprechen", () => {
  assert.deepEqual(kommentarPruefen("Welche Melodie soll als Erstes erklingen?").probleme, []);
  assert.ok(kommentarPruefen("Morgen gibt es das Lied, versprochen!").probleme.length >= 1);
  assert.ok(kommentarPruefen(Array(31).fill("wort").join(" ")).probleme.length === 1);
});

test("Kennzahlen", () => {
  const k = kennzahlen({ woerter: Array(60), untertitel: Array(20), dauer: 30, schnitte: 5 });
  assert.equal(k.woerterProMinute, 120);
  assert.equal(k.einblendungenProMinute, 40);
  assert.equal(k.schnitteProMinute, 10);
});
