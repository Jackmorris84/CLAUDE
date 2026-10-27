// Agent 8: Paket. Meine yt-Skills als Agents: Hook, Titel+Thumbnail, Captions (SEO), angepinnter Kommentar,
// Viral-Check (ehrlich, ohne Vorhersage). Mit ANTHROPIC_API_KEY ruft der Dienst Claude auf.
// Ohne Schlüssel schreibt er Briefing-Dateien, die man in Claude einfügen kann (nichts geht verloren).
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { leseJson, schreibeJson, schreibeText, run, probe } from "../util.mjs";
import { frageClaude, hatClaude } from "../lib/claude.mjs";
import { titelPruefen, captionsPruefen, kommentarPruefen, kennzahlen } from "../lib/paket.mjs";
import { HYPERFRAMES } from "./05-render.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const AGENTS = join(HIER, "../../agents");
const WURZEL = join(HIER, "../..");

export const name = "paket";
export const ordner = "08-paket";

const lies = async (p, fallback = "") => (existsSync(p) ? readFile(p, "utf8") : fallback);

async function systemPrompt(skill, aufgabe, schema) {
  const [regeln, stil, stimme, skillText] = await Promise.all([
    lies(join(AGENTS, "gemeinsame-regeln.md")),
    lies(join(AGENTS, "stil-leitfaden.md")),
    lies(join(AGENTS, "stimme.md"), "(Kein Stimmprofil hinterlegt. Schreibe im Ton des Stil-Leitfadens und weise darauf hin.)"),
    skill ? lies(join(AGENTS, "skills", skill)) : "",
  ]);
  return [
    "Du bist ein Agent in einer Video-Produktionsstraße. Deine Regeln:",
    regeln,
    "## Stil-Leitfaden",
    stil,
    "## Stimmprofil",
    stimme,
    skillText ? `## Dein Skill (Anleitung des Besitzers, auf Reels/Shorts übertragen)\n${skillText}` : "",
    "## Deine Aufgabe jetzt",
    aufgabe,
    "## Ausgabeformat (nur dieses JSON)",
    schema,
  ].join("\n\n");
}

export async function laufe(ctx) {
  const { auftrag, stil, pfad, log } = ctx;
  const llm = ctx.llm ?? (hatClaude() ? frageClaude : null);
  const bericht = { warnungen: [], agents: {} };
  const woerter = await leseJson2(pfad("02-schnitt", "words.cut.json"));
  const untertitel = await leseJson2(pfad("03-untertitel", "untertitel.json"));
  const schnitt = await leseJson2(pfad("02-schnitt", "schnittliste.json"));
  const transkript = woerter.map((w) => w.text).join(" ");
  const k = kennzahlen({ woerter, untertitel, dauer: schnitt.dauer, schnitte: schnitt.clips.reduce((s, c) => s + c.schnitte.length, 0) });
  const grund = { tuer: auftrag.tuer ?? null, wunsch: auftrag.wunsch ?? null, idee: auftrag.idee ?? null, cta: auftrag.cta ?? null, absender: auftrag.absender ?? null, transkript, dauerSek: k.dauerSek };
  await mkdir(pfad(ordner), { recursive: true });

  const agents = [
    {
      id: "hook",
      skill: "yt-script.md",
      aufgabe:
        "Schreibe FÜNF Hook-Optionen (erste 15 Sekunden bzw. erste Zeile) für dieses Video nach den 21 Formeln aus hooks.json. Jeder Hook auf Deutsch UND eine treue englische Übersetzung DERSELBEN Struktur (für die Bewertung mit hookscore.py, das nur Englisch misst). Nenne die Formel. Erfinde keine Zahl, kein Ergebnis. Der Hook muss zum tatsächlichen Videoinhalt (Transkript) passen.",
      schema: '{"hooks":[{"de":"...","en":"...","formel":"id aus hooks.json"}]}',
    },
    {
      id: "titel",
      skill: "yt-package.md",
      aufgabe:
        "Schreibe ZEHN Titel und für den besten das Thumbnail-Briefing. Titel und Thumbnail sind ein Paar: Thumbnail höchstens 3 Wörter und darf den Titel nicht wiederholen. Titel höchstens 60 Zeichen, Kern in den ersten 40. Eine Zahl, ein Name oder ein Datum nur, wenn es im Transkript/Auftrag steht.",
      schema: '{"titel":["..."],"gewinner":0,"thumbnailText":"max 3 Wörter","thumbnailBriefing":{"ausdruck":"...","ausschnitt":"...","hintergrund":"..."}}',
    },
    {
      id: "captions",
      skill: "yt-seo.md",
      aufgabe:
        "Schreibe die Texte für alle vier Plattformen im Stil-Leitfaden. Instagram: Caption (Hook in der ersten Zeile) + 8 bis 10 Hashtags. TikTok: Caption höchstens 150 Zeichen + 6 bis 8 Hashtags. YouTube Shorts: 3 Titelvarianten (≤ 70 Zeichen, mit #Shorts), Beschreibung (erste zwei Zeilen = Suchtext), höchstens 15 Tags, dazu die 3 Suchanfragen, die das Video gewinnen soll. Facebook: etwas längere Caption, höchstens 5 Hashtags. Kein Call-to-Action, außer der Auftrag nennt einen.",
      schema:
        '{"instagram":{"caption":"...","hashtags":["..."]},"tiktok":{"caption":"...","hashtags":["..."]},"youtube":{"titel":["..."],"beschreibung":"...","tags":["..."],"suchanfragen":["..."]},"facebook":{"caption":"...","hashtags":["..."]}}',
    },
    {
      id: "kommentar",
      skill: "yt-comment.md",
      aufgabe:
        "Schreibe EINEN Vorschlag für einen angepinnten Kommentar (unter 30 Wörter): eine echte Frage oder ein Satz, der Antworten auslöst, in meiner Stimme. Keine Versprechen, keine Videos ankündigen, die nicht abgesprochen sind. Optional zwei Alternativen.",
      schema: '{"angepinnt":"...","alternativen":["..."]}',
    },
    {
      id: "viral",
      skill: "yt-viral.md",
      aufgabe:
        "Bewerte ehrlich in höchstens 3 Sätzen, was an diesem Video die Schwachstelle für Reichweite ist (Hook, Tempo, Länge, Titel). Nutze die Kennzahlen. Sage NIE, dass ein Video viral wird. Es gibt keine Konkurrenzdaten, also kein Vergleich mit anderen Kanälen.",
      schema: '{"schwachstelle":"...","staerke":"...","naechsterSchritt":"..."}',
    },
  ];

  const ergebnis = {};
  for (const a of agents) {
    const system = await systemPrompt(a.skill, a.aufgabe, a.schema);
    const user = JSON.stringify({ ...grund, kennzahlen: k, bisherigeErgebnisse: ergebnis }, null, 2);
    if (!llm) {
      await schreibeText(pfad(ordner, `briefing-${a.id}.md`), `# Briefing Agent „${a.id}“\n\nIn Claude einfügen: System-Teil als Anweisung, Benutzer-Teil als Nachricht.\n\n## System\n\n${system}\n\n## Benutzer\n\n\`\`\`json\n${user}\n\`\`\`\n`);
      bericht.agents[a.id] = "briefing geschrieben (kein ANTHROPIC_API_KEY)";
      continue;
    }
    try {
      log(`Agent ${a.id} …`);
      const antwort = await llm({ system, user, json: true, maxTokens: 4000 });
      ergebnis[a.id] = antwort;
      bericht.agents[a.id] = "ok";
    } catch (e) {
      bericht.agents[a.id] = `Fehler: ${e.message}`;
      bericht.warnungen.push(`Agent ${a.id}: ${e.message}`);
    }
  }

  // Lokale Prüfungen und Bewertungen (Skripte des Besitzers)
  if (ergebnis.hook?.hooks?.length) {
    const lines = ergebnis.hook.hooks.map((h) => h.en).join("\n");
    await writeFile(pfad(ordner, "hooks-en.txt"), lines + "\n", "utf8");
    const r = await run("python3", [join(AGENTS, "hookscore.py"), "--json", pfad(ordner, "hooks-en.txt")], { ok: true });
    let scores = [];
    try {
      scores = JSON.parse(r.stdout);
    } catch {
      bericht.warnungen.push("hookscore.py lieferte kein JSON.");
    }
    ergebnis.hook.bewertet = ergebnis.hook.hooks
      .map((h) => ({ ...h, bewertung: scores.find((s) => s.hook === h.en.trim()) ?? null }))
      .sort((x, y) => (y.bewertung?.verdict ?? 0) - (x.bewertung?.verdict ?? 0));
    ergebnis.hook.hinweis = "hookscore.py misst nur Englisch: Bewertet wurde die englische Übersetzung derselben Struktur. Die Zahlen beschreiben die Struktur, nicht den deutschen Wortlaut.";
    await schreibeJson(pfad(ordner, "hook.json"), ergebnis.hook);
  }
  if (ergebnis.titel?.titel?.length) {
    const th = ergebnis.titel.thumbnailText ?? "";
    ergebnis.titel.geprueft = ergebnis.titel.titel.map((t) => titelPruefen(t, th)).sort((x, y) => y.wert - x.wert);
    await schreibeJson(pfad(ordner, "titel.json"), ergebnis.titel);
  }
  if (ergebnis.captions) {
    const { paket, probleme } = captionsPruefen(ergebnis.captions);
    ergebnis.captions = paket;
    if (probleme.length) bericht.warnungen.push(...probleme.map((p) => `Caption-Prüfung: ${p}`));
    await schreibeJson(pfad(ordner, "captions.json"), { ...paket, probleme });
  }
  if (ergebnis.kommentar?.angepinnt) {
    ergebnis.kommentar.geprueft = kommentarPruefen(ergebnis.kommentar.angepinnt);
    await schreibeJson(pfad(ordner, "kommentar.json"), ergebnis.kommentar);
  }
  if (ergebnis.viral) await schreibeJson(pfad(ordner, "viral.json"), { ...ergebnis.viral, kennzahlen: k });

  // Thumbnail (immer, auch ohne Claude)
  const text = auftrag.thumbnailText ?? ergebnis.titel?.thumbnailText ?? "Seid bereit";
  try {
    bericht.thumbnail = await baueThumbnail(ctx, { text, label: auftrag.tuer ? `TÜR ${auftrag.tuer}` : null, sek: auftrag.thumbnailSek });
  } catch (e) {
    bericht.warnungen.push(`Thumbnail: ${e.message}`);
  }

  await schreibeText(pfad(ordner, "paket.md"), paketMarkdown(auftrag, ergebnis, k, bericht));
  log(`Paket: ${Object.entries(bericht.agents).map(([a, s]) => `${a}=${s.slice(0, 8)}`).join(" ")}`);
  return bericht;
}

const leseJson2 = (p) => leseJson(p);

/** Thumbnail: Standbild aus dem Schnitt, Text im Stil, als HTML mit HyperFrames gerendert (gleiche Schrift wie das Video). */
export async function baueThumbnail(ctx, { text, label, sek }) {
  const { stil, pfad } = ctx;
  const proj = pfad(ordner, "thumbnail");
  await mkdir(join(proj, "assets/fonts"), { recursive: true });
  const dauer = (await probe(pfad("02-schnitt", "geschnitten.mp4"))).dauer;
  const t = Math.min(sek ?? stil.intro.dauer + 0.3, Math.max(0.2, dauer - 0.3));
  await run("ffmpeg", ["-y", "-v", "error", "-ss", String(t), "-i", pfad("02-schnitt", "geschnitten.mp4"), "-frames:v", "1", "-q:v", "2", join(proj, "assets/standbild.jpg")]);
  await copyFile(join(WURZEL, "node_modules/gsap/dist/gsap.min.js"), join(proj, "assets/gsap.min.js"));
  for (const s of ["700-italic", "700-normal"]) await copyFile(join(WURZEL, `node_modules/@fontsource/playfair-display/files/playfair-display-latin-${s}.woff2`), join(proj, `assets/fonts/pf-${s}.woff2`));
  const { breite: B, hoehe: H } = stil.canvas;
  const c = stil.farben;
  const esc = (s) => String(s).replace(/[&<>]/g, (x) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[x]);
  const html = `<!doctype html><html lang="de"><head><meta charset="UTF-8" /><meta name="viewport" content="width=${B}, height=${H}" />
<script src="assets/gsap.min.js"></script>
<style>
@font-face{font-family:"${stil.schrift.familie}";src:url("assets/fonts/pf-700-italic.woff2") format("woff2");font-weight:700;font-style:italic}
@font-face{font-family:"${stil.schrift.familie}";src:url("assets/fonts/pf-700-normal.woff2") format("woff2");font-weight:700;font-style:normal}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${B}px;height:${H}px;overflow:hidden;background:#000}
#root{position:absolute;left:0;top:0;width:${B}px;height:${H}px;font-family:"${stil.schrift.familie}",serif}
#bild{position:absolute;left:0;top:0;width:${B}px;height:${H}px;object-fit:cover}
#band{position:absolute;left:0;top:1010px;width:${B}px;height:310px;background:linear-gradient(180deg,rgba(11,5,4,0) 0%,rgba(11,5,4,.86) 28%,rgba(11,5,4,.9) 100%)}
#txt{position:absolute;left:0;top:1090px;width:${B}px;text-align:center;font-size:132px;line-height:1.05;font-style:italic;font-weight:700;color:${c.gold}}
#lab{position:absolute;left:0;top:1040px;width:${B}px;text-align:center;font-size:30px;letter-spacing:.24em;font-weight:700;color:${c.text}}
</style></head><body>
<div id="root" data-composition-id="thumb" data-start="0" data-duration="1" data-width="${B}" data-height="${H}">
<img id="bild" src="assets/standbild.jpg" />
<div id="band"></div>
${label ? `<div id="lab">${esc(label)}</div>` : ""}
<div id="txt">${esc(text)}</div>
</div>
<script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});window.__timelines["thumb"]=tl;tl.seek(0);</script>
</body></html>`;
  await writeFile(join(proj, "index.html"), html, "utf8");
  await schreibeJson(join(proj, "hyperframes.json"), { paths: { blocks: "compositions", components: "compositions/components", assets: "assets" }, media: { autoProxy: true } });
  await schreibeJson(join(proj, "meta.json"), { id: "thumbnail", name: "thumbnail" });
  const r = await run("node", [HYPERFRAMES, "snapshot", "--at", "0.2"], { cwd: proj });
  const png = (r.stdout.match(/\S+frame-00[^\s]*\.png/) ?? [])[0];
  if (!png) throw new Error("Snapshot lieferte kein Bild.");
  const ziel = pfad(ordner, "thumbnail.jpg");
  await run("ffmpeg", ["-y", "-v", "error", "-i", png, "-vf", `scale=${B}:${H}`, "-q:v", "2", ziel]);
  return { datei: ziel, text, sekunde: t };
}

function paketMarkdown(auftrag, e, k, bericht) {
  const z = [`# Paket für Tür ${auftrag.tuer ?? "?"}`, "", `Kennzahlen: ${JSON.stringify(k)}`, ""];
  if (e.hook?.bewertet) {
    z.push("## Hooks (mit Bewertung der englischen Struktur)");
    for (const h of e.hook.bewertet.slice(0, 5)) z.push(`- **${h.bewertung?.verdict ?? "?"} ${h.bewertung?.band ?? ""}** ${h.de}  \n  _EN: ${h.en} · Formel: ${h.formel}_`);
    z.push("");
  }
  if (e.titel?.geprueft) {
    z.push("## Titel (beste zuerst)");
    for (const t of e.titel.geprueft.slice(0, 3)) z.push(`- ${t.titel} (${t.laenge} Zeichen, Wert ${t.wert})${t.probleme.length ? " ⚠ " + t.probleme.join("; ") : ""}`);
    z.push(`\nThumbnail-Text: **${e.titel.thumbnailText ?? ""}**`, "");
  }
  const c = e.captions;
  if (c) {
    z.push("## Instagram", "```", `${c.instagram?.caption}\n\n${(c.instagram?.hashtags ?? []).join(" ")}`, "```");
    z.push("## TikTok", "```", `${c.tiktok?.caption}\n\n${(c.tiktok?.hashtags ?? []).join(" ")}`, "```");
    z.push("## YouTube Shorts", "```", `Titel: ${(c.youtube?.titel ?? [])[0]}\n\n${c.youtube?.beschreibung}\n\nTags: ${(c.youtube?.tags ?? []).join(", ")}`, "```");
    z.push("## Facebook", "```", `${c.facebook?.caption}\n\n${(c.facebook?.hashtags ?? []).join(" ")}`, "```", "");
  }
  if (e.kommentar?.angepinnt) z.push("## Angepinnter Kommentar", "```", e.kommentar.angepinnt, "```", "");
  if (e.viral) z.push("## Viral-Check (ehrlich)", `- Schwachstelle: ${e.viral.schwachstelle}`, `- Stärke: ${e.viral.staerke}`, `- Nächster Schritt: ${e.viral.naechsterSchritt}`, "");
  if (!Object.keys(e).length) z.push("_Kein ANTHROPIC_API_KEY gesetzt: Die Agents haben Briefing-Dateien (`briefing-*.md`) geschrieben. In Claude einfügen, dann die Antworten hier nachtragen._", "");
  if (bericht.warnungen.length) z.push("## Warnungen", ...bericht.warnungen.map((w) => `- ${w}`), "");
  z.push("**Rausschicken oder ändern?**");
  return z.join("\n") + "\n";
}
