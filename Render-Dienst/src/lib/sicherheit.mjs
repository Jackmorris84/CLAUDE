// Kleine Schutzfunktionen für die HTTP-Schnittstelle (reine Funktionen, getestet).
import { timingSafeEqual } from "node:crypto";
import { resolve, sep } from "node:path";

export const gueltigeId = (id) => typeof id === "string" && /^[a-z0-9][a-z0-9_-]{0,62}$/i.test(id);

/** Nur https (http nur im Entwicklungsmodus) und keine internen Adressen (Schutz vor Zugriffen auf das eigene Netz). */
export function sichereUrl(u, { entwicklung = false } = {}) {
  let url;
  try {
    url = new URL(u);
  } catch {
    return { ok: false, grund: "keine gültige URL" };
  }
  if (url.protocol !== "https:" && !(entwicklung && url.protocol === "http:")) return { ok: false, grund: "nur https erlaubt" };
  const h = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (!entwicklung) {
    if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return { ok: false, grund: "interner Name" };
    if (/^(127\.|10\.|0\.|169\.254\.|192\.168\.)/.test(h)) return { ok: false, grund: "interne Adresse" };
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return { ok: false, grund: "interne Adresse" };
    if (h === "::1" || h.startsWith("fc") || h.startsWith("fd") || h.startsWith("fe80")) return { ok: false, grund: "interne Adresse" };
  }
  return { ok: true, url };
}

/** Zugriffsschlüssel zeitkonstant vergleichen. Ohne gesetzten Schlüssel wird NIE etwas erlaubt. */
export function schluesselOk(header, erwartet) {
  if (!erwartet) return false;
  const m = /^Bearer\s+(.+)$/.exec(header ?? "");
  if (!m) return false;
  const a = Buffer.from(m[1]);
  const b = Buffer.from(erwartet);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Pfad innerhalb eines Ordners auflösen, sonst null (Schutz vor ../). */
export function sicherUnter(basis, relativ) {
  const ziel = resolve(basis, relativ);
  const b = resolve(basis) + sep;
  return ziel.startsWith(b) ? ziel : null;
}

export const FREIGEGEBENE_ORDNER = ["03-untertitel", "06-export", "07-pruefung", "08-paket", "01-transkript", "02-schnitt"];
