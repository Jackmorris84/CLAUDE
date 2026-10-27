// Agent 3: Untertitel. 1 bis 3 Wörter, mindestens 0,4 s sichtbar, ein Schlüsselwort pro Einblendung.
import { leseJson, schreibeJson, schreibeText } from "../util.mjs";
import { planeUntertitel, pruefeUntertitel, alsSrt } from "../lib/captions.mjs";

export const name = "untertitel";
export const ordner = "03-untertitel";

export async function laufe(ctx) {
  const { auftrag, stil, pfad, log } = ctx;
  const woerter = await leseJson(pfad("02-schnitt", "words.cut.json"));
  const schnitt = await leseJson(pfad("02-schnitt", "schnittliste.json"));
  const u = { ...stil.untertitel, ...(auftrag.optionen?.untertitel ?? {}), ...(ctx.untertitelUeberschreiben ?? {}) };
  const freigegeben = new Set((auftrag.optionen?.schluesselwoerter ?? []).map((s) => s.toLowerCase()));
  const bericht = { warnungen: [] };

  if (!woerter.length) {
    await schreibeJson(pfad(ordner, "untertitel.json"), []);
    await schreibeText(pfad(ordner, "untertitel.srt"), "");
    bericht.warnungen.push("Keine Wörter, daher keine Untertitel.");
    bericht.einblendungen = 0;
    return bericht;
  }
  const liste = planeUntertitel(woerter, { maxWoerter: u.maxWoerter, minSichtbar: u.minSichtbar, luecke: u.luecke, nachlauf: u.nachlauf, freigegeben, dauer: schnitt.dauer });
  const fehler = pruefeUntertitel(liste, { minSichtbar: u.minSichtbar, maxWoerter: u.maxWoerter, dauer: schnitt.dauer });
  await schreibeJson(pfad(ordner, "untertitel.json"), liste);
  await schreibeText(pfad(ordner, "untertitel.srt"), alsSrt(liste));
  // Liste der Schlüsselwörter zum Freigeben/Tauschen (die App zeigt sie vor dem Rendern)
  await schreibeJson(
    pfad(ordner, "schluesselwoerter.json"),
    liste.map((g, i) => ({ nr: i, text: g.text, schluesselwort: g.tokens.find((t) => t.schluessel)?.t })),
  );
  for (const g of liste) for (const w of g.warnungen) bericht.warnungen.push(`Einblendung "${g.text}": ${w}`);
  if (fehler.length) bericht.warnungen.push(`${fehler.length} Regelverstöße bei Untertiteln: ${fehler.map((f) => f.regel).join(", ")}`);
  bericht.einblendungen = liste.length;
  bericht.regelverstoesse = fehler;
  log(`Untertitel: ${liste.length} Einblendungen, ${fehler.length} Regelverstöße`);
  return bericht;
}
