// Untertitel-Planung: 1 bis 3 Wörter pro Einblendung, mindestens `minSichtbar` Sekunden,
// pro Einblendung ein Schlüsselwort (gold, kursiv). Reine Funktionen.

const STOPP = new Set(
  ("der die das den dem des ein eine einen einem einer eines und oder aber doch denn weil dass ob wie als wenn " +
    "ich du er sie es wir ihr mich dich uns euch mir dir ihm ihn ihnen mein dein sein unser euer " +
    "ist sind war waren bin bist hat haben hatte habe wird werden wurde kann können mag mal " +
    "in im am an auf aus bei mit nach von vor zu zum zur für über unter um durch gegen ohne bis " +
    "nicht noch schon nur auch so da hier dort dann nun ja nein hey und").split(/\s+/),
);

const bereinige = (t) => t.replace(/[^\p{L}\p{N}]+/gu, "");
const istZahl = (t) => /\d/.test(t);
const istSatzende = (t) => /[.!?…]$/.test(t.trim());

/** Wortwert für die Schlüsselwort-Wahl. Deutsche Nomen sind großgeschrieben. */
export function wortWert(token, istErstesImSatz) {
  const b = bereinige(token);
  if (!b) return -99;
  const klein = b.toLowerCase();
  let s = 0;
  if (STOPP.has(klein)) s -= 5;
  if (istZahl(b)) s += 4;
  if (!istErstesImSatz && /^\p{Lu}/u.test(b) && b.length > 2) s += 3; // Nomen mitten im Satz
  if (istErstesImSatz && /^\p{Lu}/u.test(b) && b.length > 6) s += 1;
  if (b.length >= 6) s += 1;
  if (b.length >= 9) s += 1;
  return s;
}

/**
 * Gruppiert Wörter zu Einblendungen.
 * @param words  [{ text, start, end }] auf der geschnittenen Zeitachse
 * @param opt    { maxWoerter, minSichtbar, luecke, nachlauf, freigegeben:Set<string>, ersteSekunde }
 */
export function planeUntertitel(words, opt = {}) {
  const { maxWoerter = 3, minSichtbar = 0.4, luecke = 0.3, nachlauf = 0.2, freigegeben = new Set(), ersteSekunde = 0.15, dauer = Infinity } = opt;
  // 1. Phrasen: Bruch bei Satzende, Komma oder Sprechpause
  const phrasen = [];
  let cur = [];
  const abschliessen = () => {
    if (cur.length) phrasen.push(cur);
    cur = [];
  };
  for (const w of words) {
    const prev = cur[cur.length - 1];
    if (prev && (w.start - prev.end > luecke || istSatzende(prev.text) || /,$/.test(prev.text.trim()))) abschliessen();
    cur.push(w);
  }
  abschliessen();
  // 2. Jede Phrase gleichmäßig in Einblendungen von höchstens `maxWoerter` Wörtern teilen
  //    (4 Wörter -> 2+2, nicht 3+1; wie im Referenzvideo: "wir haben | draußen Sturm.")
  const gruppen = [];
  for (const p of phrasen) {
    const k = Math.ceil(p.length / maxWoerter);
    let pos = 0;
    for (let j = 0; j < k; j++) {
      const rest = p.length - pos;
      const n = Math.ceil(rest / (k - j));
      gruppen.push(p.slice(pos, pos + n));
      pos += n;
    }
  }

  // Zu kurze Gruppen mit der nächsten verschmelzen, solange maxWoerter reicht
  const merged = [];
  for (let i = 0; i < gruppen.length; i++) {
    let g = gruppen[i];
    const dauer = g[g.length - 1].end + nachlauf - g[0].start;
    const next = gruppen[i + 1];
    if (dauer < minSichtbar && next && g.length + next.length <= maxWoerter && !istSatzende(g[g.length - 1].text)) {
      g = [...g, ...next];
      i++;
    }
    merged.push(g);
  }

  const out = merged.map((g, i) => {
    const naechsterStart = merged[i + 1]?.[0].start ?? Infinity;
    let start = Math.max(g[0].start, i === 0 ? ersteSekunde : 0);
    let end = g[g.length - 1].end + nachlauf;
    const warnungen = [];
    if (end - start < minSichtbar) {
      end = start + minSichtbar;
      if (end > naechsterStart) {
        end = naechsterStart;
        warnungen.push("kuerzer_als_mindestdauer");
      }
    }
    if (end > naechsterStart) end = naechsterStart; // nie überlappen
    end = Math.min(end, dauer);
    // fast nahtlos: kleine Lücken schließen, damit nichts flackert
    if (naechsterStart - end < 0.12) end = naechsterStart;
    const tokens = g.map((w, k) => ({ t: w.text, wert: wortWert(w.text, k === 0 && (i === 0 || istSatzende(merged[i - 1]?.at(-1)?.text ?? "."))) }));
    let schluessel = -1;
    const manuell = tokens.findIndex((x) => freigegeben.has(bereinige(x.t).toLowerCase()));
    if (manuell >= 0) schluessel = manuell;
    else {
      let best = -Infinity;
      tokens.forEach((x, k) => {
        if (x.wert >= best) {
          best = x.wert;
          schluessel = k; // bei Gleichstand gewinnt das spätere Wort
        }
      });
    }
    return { text: g.map((w) => w.text).join(" "), start: round(start), end: round(end), tokens: tokens.map((x, k) => ({ t: x.t, schluessel: k === schluessel })), warnungen };
  });
  return out;
}

const round = (x) => Math.round(x * 1000) / 1000;

/** Prüft die Regeln aus dem Stil. Liefert eine Liste von Verstößen (leer = in Ordnung). */
export function pruefeUntertitel(untertitel, opt = {}) {
  const { minSichtbar = 0.4, maxWoerter = 3, dauer = Infinity } = opt;
  const fehler = [];
  untertitel.forEach((u, i) => {
    if (u.end - u.start < minSichtbar - 0.01) fehler.push({ index: i, regel: "mindestdauer", ist: round(u.end - u.start), soll: minSichtbar });
    if (u.tokens.length > maxWoerter) fehler.push({ index: i, regel: "zu_viele_woerter", ist: u.tokens.length, soll: maxWoerter });
    if (u.tokens.filter((t) => t.schluessel).length > 1) fehler.push({ index: i, regel: "mehr_als_ein_schluesselwort" });
    if (i > 0 && u.start < untertitel[i - 1].end - 1e-6) fehler.push({ index: i, regel: "ueberlappung" });
    if (u.end > dauer + 1e-6) fehler.push({ index: i, regel: "nach_filmende" });
  });
  return fehler;
}

/** SRT-Datei aus den Einblendungen. */
export function alsSrt(untertitel) {
  const f = (s) => {
    const ms = Math.round(s * 1000);
    const p = (n, l = 2) => String(n).padStart(l, "0");
    return `${p(Math.floor(ms / 3600000))}:${p(Math.floor((ms % 3600000) / 60000))}:${p(Math.floor((ms % 60000) / 1000))},${p(ms % 1000, 3)}`;
  };
  return untertitel.map((u, i) => `${i + 1}\n${f(u.start)} --> ${f(u.end)}\n${u.text}\n`).join("\n");
}
