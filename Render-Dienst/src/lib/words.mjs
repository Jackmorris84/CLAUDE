// Reine Funktionen für Wortlisten und Schnittlisten. Keine Datei-, Netz- oder Prozess-Zugriffe,
// damit alles ohne Video testbar ist.
//
// Ein Wort: { text, start, end, clip }  (Sekunden, bezogen auf das Rohvideo `clip`)

export const FUELLER = new Set(["äh", "ähm", "öh", "öhm", "ehm", "hm", "hmm", "ähh", "ähhm", "eh", "mhm"]);

const norm = (t) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

/** Lücken zwischen Wörtern (inkl. Anfang und Ende), länger als `min` Sekunden. */
export function findePausen(words, duration, min = 0.4) {
  const out = [];
  let prev = 0;
  for (const w of words) {
    if (w.start - prev > min) out.push({ von: prev, bis: w.start });
    prev = Math.max(prev, w.end);
  }
  if (duration - prev > min) out.push({ von: prev, bis: duration });
  return out;
}

/** Füllwörter, die nur aus einem "äh" bestehen. */
export function findeFueller(words, liste = FUELLER) {
  return words.map((w, i) => (liste.has(norm(w.text)) ? i : -1)).filter((i) => i >= 0);
}

/**
 * Wiederholungen: dasselbe Wort oder dieselbe 2-3-Wort-Folge direkt hintereinander.
 * Entfernt wird der FRÜHERE Versuch, der spätere bleibt.
 * Liefert Indizes der zu entfernenden Wörter.
 */
export function findeWiederholungen(words) {
  const n = words.map((w) => norm(w.text));
  const remove = new Set();
  for (let len = 3; len >= 1; len--) {
    for (let i = 0; i + 2 * len <= n.length; i++) {
      let gleich = true;
      for (let k = 0; k < len; k++) if (!n[i + k] || n[i + k] !== n[i + len + k]) gleich = false;
      // Bei Einzelwörtern nur kurze Lücke zulassen, sonst ist es eine echte Wiederholung zur Betonung
      if (gleich && len === 1 && words[i + 1].start - words[i].end > 1.0) gleich = false;
      if (gleich) for (let k = 0; k < len; k++) remove.add(i + k);
    }
  }
  return [...remove].sort((a, b) => a - b);
}

/**
 * Baut die Schnittliste für EIN Rohvideo.
 * Regel: Zwischen zwei behaltenen Wörtern wird die Lücke auf `halteLuecke` gekürzt, aus der MITTE
 * heraus (so bleibt auf beiden Seiten Luft). Das gilt, wenn die Lücke länger als `pauseMin` ist
 * oder ein entferntes Wort darin liegt. Nie bündig an der Sprache schneiden.
 *
 * @returns {{ behalten: {von,bis}[], schnitte: {von,bis,grund}[], woerter: object[] }}
 */
export function baueSchnittliste(words, duration, opt = {}) {
  const {
    pauseMin = 0.4,
    halteLuecke = 0.2,
    anfangsLuft = 0.1,
    endLuft = 0.25,
    fuellerEntfernen = true,
    wiederholungenEntfernen = true,
    startSek = null, // optional: alles davor abschneiden
    endSek = null, // optional: alles danach abschneiden
    entferne = [], // Indizes, die der Nutzer zusätzlich entfernen will
    behalte = [], // Indizes, die der Nutzer ausdrücklich behalten will
  } = opt;

  const grund = new Map();
  if (fuellerEntfernen) for (const i of findeFueller(words)) grund.set(i, "fueller");
  if (wiederholungenEntfernen) for (const i of findeWiederholungen(words)) grund.set(i, "wiederholung");
  for (const i of entferne) grund.set(i, "manuell");
  for (const i of behalte) grund.delete(i);

  const lo = startSek ?? 0;
  const hi = endSek ?? duration;
  const idx = words.map((w, i) => i).filter((i) => words[i].start >= lo - 1e-6 && words[i].end <= hi + 1e-6);
  const behaltenIdx = idx.filter((i) => !grund.has(i));
  const kept = behaltenIdx.map((i) => words[i]);

  const schnitte = [];
  const entfernt = []; // Intervalle, die rausfliegen
  const add = (von, bis, g) => {
    if (bis - von > 1e-3) {
      schnitte.push({ von: round(von), bis: round(bis), grund: g });
      entfernt.push([von, bis]);
    }
  };

  if (kept.length === 0) return { behalten: [{ von: lo, bis: hi }], schnitte: [], woerter: [] };

  // Anfang
  const first = kept[0];
  if (first.start - lo > anfangsLuft) add(lo, first.start - anfangsLuft, lo > 0 ? "start" : "pause");
  // Zwischen behaltenen Wörtern
  for (let k = 0; k + 1 < kept.length; k++) {
    const a = kept[k];
    const b = kept[k + 1];
    const gap = b.start - a.end;
    const dazwischenEntfernt = behaltenIdx[k + 1] - behaltenIdx[k] > 1;
    if (gap > pauseMin || (dazwischenEntfernt && gap > halteLuecke)) {
      const ziel = halteLuecke;
      if (gap > ziel) add(a.end + ziel / 2, b.start - ziel / 2, dazwischenEntfernt ? grundVon(grund, behaltenIdx[k], behaltenIdx[k + 1]) : "pause");
    }
  }
  // Ende
  const last = kept[kept.length - 1];
  if (hi - last.end > endLuft) add(last.end + endLuft, hi, endSek != null ? "ende" : "pause");

  entfernt.sort((x, y) => x[0] - y[0]);
  const behalten = [];
  let cur = lo;
  for (const [von, bis] of entfernt) {
    if (von - cur > 1e-3) behalten.push({ von: round(cur), bis: round(von) });
    cur = Math.max(cur, bis);
  }
  if (hi - cur > 1e-3) behalten.push({ von: round(cur), bis: round(hi) });

  return { behalten, schnitte, woerter: kept };
}

function grundVon(grund, a, b) {
  for (let i = a + 1; i < b; i++) if (grund.has(i)) return grund.get(i);
  return "pause";
}

const round = (x) => Math.round(x * 1000) / 1000;

/**
 * Bildet eine Rohzeit auf die geschnittene Zeitachse ab.
 * @param segmente  [{ clip, von, bis, offset }]  offset = Start in der Ausgabe
 */
export function ausgabeZeit(segmente, clip, t) {
  for (const s of segmente) {
    if (s.clip === clip && t >= s.von - 1e-6 && t <= s.bis + 1e-6) return round(s.offset + (t - s.von));
  }
  return null;
}

/** Wortzeiten auf den geschnittenen Film übertragen. Wörter außerhalb der Segmente fallen weg. */
export function wortzeitenNeu(words, segmente) {
  const out = [];
  for (const w of words) {
    const s = segmente.find((x) => x.clip === w.clip && w.start >= x.von - 1e-6 && w.end <= x.bis + 1e-6);
    if (!s) continue;
    out.push({ ...w, start: round(s.offset + (w.start - s.von)), end: round(s.offset + (w.end - s.von)) });
  }
  return out;
}

/** Segmente über mehrere Clips hintereinander legen und `offset` berechnen. */
export function segmenteMitOffset(proClip) {
  const out = [];
  let offset = 0;
  for (const { clip, behalten } of proClip) {
    for (const s of behalten) {
      out.push({ clip, von: s.von, bis: s.bis, offset: round(offset) });
      offset += s.bis - s.von;
    }
  }
  return { segmente: out, dauer: round(offset) };
}

/** Wörter, die Whisper über Stille erfindet ("Vielen Dank."), erkennen: Wort beginnt in einer Stille. */
export function erfundeneWoerter(words, stillen) {
  return words.filter((w) => stillen.some((s) => w.start >= s.von && w.start < s.bis && w.end <= s.bis + 0.2));
}
