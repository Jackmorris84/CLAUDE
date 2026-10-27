// Prüfungen für die Texte des Pakets (Hook, Titel, Thumbnail, Captions, angepinnter Kommentar).
// Reine Funktionen. Sie setzen die Regeln aus den yt-Skills um, soweit sie sich messen lassen.

const woerterVon = (s) => String(s).toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

/** Titel und Thumbnail als EIN Paar prüfen (Regeln aus yt-package). */
export function titelPruefen(titel, thumbnail = "") {
  const probleme = [];
  const laenge = [...titel].length;
  if (laenge > 60) probleme.push(`Titel ${laenge} Zeichen: wird in der Desktop-Suche ab 60 abgeschnitten`);
  if (laenge > 40) probleme.push(`Titel ${laenge} Zeichen: im Handy-Feed ab ca. 40 abgeschnitten, Kern nach vorne`);
  const gross = (titel.match(/\b[\p{Lu}ÄÖÜ]{3,}\b/gu) ?? []).length;
  if (gross > 2) probleme.push(`${gross} Wörter in Großbuchstaben (höchstens 2)`);
  const tw = woerterVon(thumbnail);
  if (tw.length > 3) probleme.push(`Thumbnail hat ${tw.length} Wörter (höchstens 3)`);
  const tt = new Set(woerterVon(titel));
  const doppelt = tw.filter((w) => w.length > 3 && tt.has(w));
  if (doppelt.length) probleme.push(`Thumbnail wiederholt den Titel: ${doppelt.join(", ")}`);
  const konkret = /\d/.test(titel) || /\b\p{Lu}\p{L}{2,}\b/u.test(titel.replace(/^\S+\s/, ""));
  let wert = 100 - probleme.length * 18 - (konkret ? 0 : 8);
  return { titel, thumbnail, laenge, probleme, hatZahlOderName: konkret, wert: Math.max(0, wert) };
}

const hashtagsNormal = (liste) => [...new Set((liste ?? []).map((h) => "#" + String(h).replace(/^#+/, "").replace(/\s+/g, "")).filter((h) => h.length > 1))];

/** Plattform-Texte prüfen und glätten. Liefert { paket, probleme }. */
export function captionsPruefen(p) {
  const probleme = [];
  const out = JSON.parse(JSON.stringify(p));
  const ig = out.instagram;
  if (ig) {
    ig.hashtags = hashtagsNormal(ig.hashtags);
    if (ig.hashtags.length < 8 || ig.hashtags.length > 10) probleme.push(`Instagram: ${ig.hashtags.length} Hashtags (sinnvoll: 8 bis 10)`);
    const voll = [ig.caption, ig.hashtags.join(" ")].join("\n\n");
    if ([...voll].length > 2200) probleme.push(`Instagram: ${[...voll].length} Zeichen (höchstens 2200)`);
  }
  const tt = out.tiktok;
  if (tt) {
    tt.hashtags = hashtagsNormal(tt.hashtags);
    if ([...tt.caption].length > 150) probleme.push(`TikTok: Caption ${[...tt.caption].length} Zeichen (höchstens 150)`);
    if (tt.hashtags.length < 6 || tt.hashtags.length > 8) probleme.push(`TikTok: ${tt.hashtags.length} Hashtags (sinnvoll: 6 bis 8)`);
  }
  const yt = out.youtube;
  if (yt) {
    yt.tags = [...new Set((yt.tags ?? []).map((t) => String(t).replace(/^#/, "").trim()).filter(Boolean))];
    if (yt.tags.length > 15) {
      probleme.push(`YouTube: ${yt.tags.length} Tags, auf 15 gekürzt`);
      yt.tags = yt.tags.slice(0, 15);
    }
    for (const t of yt.titel ?? []) if ([...t].length > 70) probleme.push(`YouTube-Titel über 70 Zeichen: "${t}"`);
    const zeilen = String(yt.beschreibung ?? "").split("\n").filter((z) => z.trim());
    if (zeilen.length === 0) probleme.push("YouTube: Beschreibung fehlt");
  }
  const fb = out.facebook;
  if (fb) {
    fb.hashtags = hashtagsNormal(fb.hashtags);
    if (fb.hashtags.length > 5) probleme.push(`Facebook: ${fb.hashtags.length} Hashtags (wenige, höchstens 5)`);
  }
  return { paket: out, probleme };
}

/** Angepinnter Kommentar: unter 30 Wörter, keine Versprechen. */
export function kommentarPruefen(text) {
  const probleme = [];
  const n = woerterVon(text).length;
  if (n > 30) probleme.push(`${n} Wörter (höchstens 30)`);
  if (/\b(verspreche|versprochen|garantiert|nächste woche gibt es|morgen gibt es|bald gibt es)\b/i.test(text)) probleme.push("enthält ein Versprechen, das nicht abgesprochen ist");
  return { text, woerter: n, probleme };
}

/** Einfache Kennzahlen für den Viral-Check (keine Vorhersage!). */
export function kennzahlen({ woerter, untertitel, dauer, schnitte }) {
  const minuten = Math.max(dauer, 1) / 60;
  return {
    dauerSek: Math.round(dauer * 10) / 10,
    woerterProMinute: Math.round(woerter.length / minuten),
    einblendungenProMinute: Math.round(untertitel.length / minuten),
    schnitteProMinute: Math.round(schnitte / minuten),
    ersteEinblendungSek: untertitel[0]?.start ?? null,
  };
}
