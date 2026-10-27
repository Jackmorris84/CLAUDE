// Notbehelf ohne Spracherkennung: Ein vorhandener Text (Skript, Korrekturtabelle) wird über die
// gesprochenen Abschnitte des Audios verteilt. Das ist eine NÄHERUNG (proportional zur Wortlänge),
// keine echte Wortzeit. Der Dienst markiert solche Transkripte als "naeherung" und der Prüf-Agent
// weist darauf hin. Mit faster-whisper entstehen echte Wortzeiten.

/** Gesprochene Abschnitte = Gegenstück der Stille-Abschnitte. */
export function sprechAbschnitte(stillenListe, dauer) {
  const out = [];
  let cur = 0;
  for (const s of [...stillenListe].sort((a, b) => a.von - b.von)) {
    if (s.von - cur > 0.05) out.push({ von: cur, bis: Math.min(s.von, dauer) });
    cur = Math.max(cur, s.bis);
  }
  if (dauer - cur > 0.05) out.push({ von: cur, bis: dauer });
  return out;
}

export function naeherungsWoerter(text, abschnitte, clip) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length || !abschnitte.length) return [];
  const gewicht = tokens.map((t) => t.replace(/[^\p{L}\p{N}]/gu, "").length + 1.5);
  const gesamtGewicht = gewicht.reduce((a, b) => a + b, 0);
  const gesamtSprech = abschnitte.reduce((s, a) => s + (a.bis - a.von), 0);
  // Position auf der "Sprechzeit"-Achse -> echte Zeit
  const zuZeit = (p) => {
    let rest = p;
    for (const a of abschnitte) {
      const len = a.bis - a.von;
      if (rest <= len + 1e-9) return a.von + rest;
      rest -= len;
    }
    return abschnitte.at(-1).bis;
  };
  const out = [];
  let kum = 0;
  const intervallVon = (p) => {
    let rest = p;
    for (const a of abschnitte) {
      const len = a.bis - a.von;
      if (rest <= len + 1e-9) return a;
      rest -= len;
    }
    return abschnitte.at(-1);
  };
  for (let i = 0; i < tokens.length; i++) {
    const p0 = (kum / gesamtGewicht) * gesamtSprech;
    kum += gewicht[i];
    const p1 = (kum / gesamtGewicht) * gesamtSprech;
    // Jedes Wort gehört GANZ in einen Abschnitt (der, in dem seine Mitte liegt), damit
    // Wörter nie über eine Pause hinweg gezogen werden und der Schnitt die Pause findet.
    const a = intervallVon((p0 + p1) / 2);
    const start = Math.min(Math.max(zuZeit(p0), a.von), a.bis - 0.05);
    const end = Math.min(Math.max(zuZeit(p1), start + 0.05), a.bis);
    out.push({ text: tokens[i], start: Math.round(start * 1000) / 1000, end: Math.round(end * 1000) / 1000, clip });
  }
  return out;
}
