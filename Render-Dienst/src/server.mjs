#!/usr/bin/env node
// HTTP-Schnittstelle für die Base44-App (oder jedes andere Programm).
//   POST /jobs                 Auftrag anlegen (Clips per https-URL) und starten
//   GET  /jobs/:id             Status
//   GET  /jobs/:id/transkript  Wörter zum Korrigieren
//   POST /jobs/:id/neu         Korrekturen/Optionen übernehmen und ab einer Stufe neu rechnen
//   GET  /jobs/:id/dateien     Ergebnisdateien auflisten
//   GET  /jobs/:id/datei/<pfad> Datei laden
// Zugriff nur mit `Authorization: Bearer <RENDER_API_KEY>`. Ohne gesetzten Schlüssel startet der Server nicht.
import http from "node:http";
import { mkdir, readdir, stat, writeFile, readFile } from "node:fs/promises";
import { createWriteStream, createReadStream, existsSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { join, extname, resolve } from "node:path";
import { laufeAuftrag, STUFEN } from "./orchestrator.mjs";
import { leseJson } from "./util.mjs";
import { gueltigeId, sichereUrl, schluesselOk, sicherUnter, FREIGEGEBENE_ORDNER } from "./lib/sicherheit.mjs";

const PORT = Number(process.env.PORT ?? 8787);
const JOBS = resolve(process.env.JOBS_DIR ?? "jobs");
const ENTW = process.env.RENDER_ENTWICKLUNG === "1";
const SCHLUESSEL = process.env.RENDER_API_KEY;
const MAX_CLIP_BYTES = Number(process.env.MAX_CLIP_MB ?? 300) * 1024 * 1024;
const MIME = { ".mp4": "video/mp4", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".srt": "text/plain; charset=utf-8", ".wav": "audio/wav" };

if (!SCHLUESSEL && !ENTW) {
  console.error("RENDER_API_KEY ist nicht gesetzt. Der Server startet nicht ohne Zugriffsschutz. (Nur zum Testen: RENDER_ENTWICKLUNG=1 und RENDER_API_KEY setzen.)");
  process.exit(1);
}

// Aufträge nacheinander abarbeiten: ein Render nutzt alle Kerne
let warteschlange = Promise.resolve();
const laufend = new Set();
function einreihen(id, opt) {
  laufend.add(id);
  warteschlange = warteschlange
    .then(() => laufeAuftrag(join(JOBS, id), { log: (z) => console.log(`[${id}] ${z}`), ...opt }))
    .then((st) => melde(id, st))
    .catch((e) => melde(id, { status: "fehler", fehler: e.message }))
    .finally(() => laufend.delete(id));
}

async function melde(id, st) {
  try {
    const auftrag = await leseJson(join(JOBS, id, "00-auftrag.json"));
    const url = auftrag.webhook?.url;
    if (!url || !sichereUrl(url, { entwicklung: ENTW }).ok) return;
    await fetch(url, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${auftrag.webhook.schluessel ?? ""}` }, body: JSON.stringify({ id, status: st.status, ergebnis: st.ergebnis ?? null, fehler: st.fehler ?? null, offen: st.offen ?? [] }) });
  } catch (e) {
    console.error(`[${id}] Webhook fehlgeschlagen: ${e.message}`);
  }
}

async function ladeClip(url, ziel) {
  const s = sichereUrl(url, { entwicklung: ENTW });
  if (!s.ok) throw new Error(`Clip-URL abgelehnt (${s.grund})`);
  const r = await fetch(s.url, { redirect: "error" });
  if (!r.ok) throw new Error(`Download fehlgeschlagen: HTTP ${r.status}`);
  const art = r.headers.get("content-type") ?? "";
  if (!/^(video\/|application\/octet-stream)/.test(art)) throw new Error(`Kein Video (Content-Type ${art})`);
  const len = Number(r.headers.get("content-length") ?? 0);
  if (len > MAX_CLIP_BYTES) throw new Error(`Datei zu groß (${Math.round(len / 1e6)} MB, erlaubt ${MAX_CLIP_BYTES / 1024 / 1024} MB)`);
  let n = 0;
  const begrenzer = new TransformStream({
    transform(chunk, c) {
      n += chunk.byteLength;
      if (n > MAX_CLIP_BYTES) c.error(new Error("Datei zu groß"));
      else c.enqueue(chunk);
    },
  });
  await pipeline(Readable.fromWeb(r.body.pipeThrough(begrenzer)), createWriteStream(ziel));
}

const json = (res, code, obj) => {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
};
const lesen = (req, max = 2_000_000) =>
  new Promise((ok, fail) => {
    let d = "";
    req.on("data", (c) => {
      d += c;
      if (d.length > max) {
        fail(new Error("Anfrage zu groß"));
        req.destroy();
      }
    });
    req.on("end", () => ok(d));
    req.on("error", fail);
  });

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    const teile = url.pathname.split("/").filter(Boolean);
    if (req.method === "GET" && url.pathname === "/gesundheit") return json(res, 200, { ok: true, stufen: STUFEN.map((s) => s.name), laufend: [...laufend] });
    if (!schluesselOk(req.headers.authorization, SCHLUESSEL)) return json(res, 401, { fehler: "Zugriff verweigert" });

    if (req.method === "POST" && url.pathname === "/jobs") {
      const body = JSON.parse(await lesen(req));
      const id = body.id ?? `auftrag-${Date.now().toString(36)}`;
      if (!gueltigeId(id)) return json(res, 400, { fehler: "Ungültige id (nur Buchstaben, Ziffern, - und _, höchstens 63 Zeichen)" });
      if (existsSync(join(JOBS, id))) return json(res, 409, { fehler: `Auftrag ${id} existiert schon. Mit POST /jobs/${id}/neu neu rechnen.` });
      if (!Array.isArray(body.clips) || !body.clips.length || body.clips.length > 20) return json(res, 400, { fehler: "clips: 1 bis 20 Einträge nötig" });
      const ids = new Set();
      for (const c of body.clips) {
        if (!gueltigeId(c.id) || ids.has(c.id)) return json(res, 400, { fehler: `Clip-id ungültig oder doppelt: ${c.id}` });
        ids.add(c.id);
        if (!c.url) return json(res, 400, { fehler: `Clip ${c.id}: url fehlt` });
        const s = sichereUrl(c.url, { entwicklung: ENTW });
        if (!s.ok) return json(res, 400, { fehler: `Clip ${c.id}: ${s.grund}` });
      }
      await mkdir(join(JOBS, id, "clips"), { recursive: true });
      const auftrag = { ...body, id, clips: body.clips.map(({ url: _u, ...c }) => ({ ...c, datei: `${c.id}.mp4` })) };
      await writeFile(join(JOBS, id, "00-auftrag.json"), JSON.stringify(auftrag, null, 2));
      await writeFile(join(JOBS, id, "status.json"), JSON.stringify({ id, status: "wartet", stufe: "download" }));
      json(res, 202, { id, status: "wartet" });
      // Download und Lauf im Hintergrund
      warteschlange = warteschlange.then(async () => {
        try {
          for (const c of body.clips) await ladeClip(c.url, join(JOBS, id, "clips", `${c.id}.mp4`));
        } catch (e) {
          await writeFile(join(JOBS, id, "status.json"), JSON.stringify({ id, status: "fehler", stufe: "download", fehler: e.message }));
          return melde(id, { status: "fehler", fehler: e.message });
        }
        einreihen(id, {});
      });
      return;
    }

    if (teile[0] === "jobs" && teile[1] && gueltigeId(teile[1])) {
      const id = teile[1];
      const dir = join(JOBS, id);
      if (!existsSync(dir)) return json(res, 404, { fehler: "Auftrag unbekannt" });

      if (req.method === "GET" && teile.length === 2) {
        const st = existsSync(join(dir, "status.json")) ? await leseJson(join(dir, "status.json")) : { status: "unbekannt" };
        return json(res, 200, { ...st, laeuftGerade: laufend.has(id) });
      }
      if (req.method === "GET" && teile[2] === "transkript") {
        const auftrag = await leseJson(join(dir, "00-auftrag.json"));
        const out = [];
        for (const c of auftrag.clips) {
          const f = join(dir, "01-transkript", `${c.id}.words.json`);
          if (existsSync(f)) out.push({ clip: c.id, ...(await leseJson(f)) });
        }
        return json(res, 200, { clips: out });
      }
      if (req.method === "GET" && teile[2] === "dateien") {
        const liste = [];
        for (const o of FREIGEGEBENE_ORDNER) {
          const d = join(dir, o);
          if (!existsSync(d)) continue;
          for (const f of await readdir(d)) {
            const s = await stat(join(d, f));
            if (s.isFile() && !f.startsWith(".")) liste.push({ pfad: `${o}/${f}`, groesse: s.size });
          }
        }
        return json(res, 200, { dateien: liste });
      }
      if (req.method === "GET" && teile[2] === "datei") {
        const rel = decodeURIComponent(teile.slice(3).join("/"));
        const erlaubt = FREIGEGEBENE_ORDNER.some((o) => rel.startsWith(o + "/"));
        const ziel = sicherUnter(dir, rel);
        if (!erlaubt || !ziel || !existsSync(ziel) || !(await stat(ziel)).isFile()) return json(res, 404, { fehler: "Datei nicht gefunden" });
        const s = await stat(ziel);
        res.writeHead(200, { "content-type": MIME[extname(ziel)] ?? "application/octet-stream", "content-length": s.size });
        return createReadStream(ziel).pipe(res);
      }
      if (req.method === "POST" && teile[2] === "neu") {
        if (laufend.has(id)) return json(res, 409, { fehler: "Auftrag läuft gerade" });
        const body = JSON.parse((await lesen(req)) || "{}");
        const auftragDatei = join(dir, "00-auftrag.json");
        const auftrag = await leseJson(auftragDatei);
        if (body.korrekturen) {
          // { "<clip>": { "<index>": "Zartes" } }, wird beim Transkript angewandt
          const f = join(dir, "korrekturen.json");
          const alt = existsSync(f) ? await leseJson(f) : {};
          for (const [clip, m] of Object.entries(body.korrekturen)) alt[clip] = { ...(alt[clip] ?? {}), ...m };
          await writeFile(f, JSON.stringify(alt, null, 2));
        }
        for (const k of ["optionen", "stil", "kopfkarte", "endkarte", "thumbnailText", "thumbnailSek", "idee", "wunsch", "cta"]) if (body[k] !== undefined) auftrag[k] = typeof body[k] === "object" && !Array.isArray(body[k]) && typeof auftrag[k] === "object" ? { ...auftrag[k], ...body[k] } : body[k];
        if (Array.isArray(body.schluesselwoerter)) auftrag.optionen = { ...(auftrag.optionen ?? {}), schluesselwoerter: body.schluesselwoerter };
        await writeFile(auftragDatei, JSON.stringify(auftrag, null, 2));
        const ab = body.ab ?? (body.korrekturen ? "transkript" : "untertitel");
        if (!STUFEN.some((s) => s.name === ab)) return json(res, 400, { fehler: `Unbekannte Stufe ${ab}` });
        einreihen(id, { ab });
        return json(res, 202, { id, ab, status: "wartet" });
      }
    }
    json(res, 404, { fehler: "Unbekannter Pfad" });
  } catch (e) {
    json(res, 500, { fehler: e.message });
  }
});

await mkdir(JOBS, { recursive: true });
server.listen(PORT, () => console.log(`Render-Dienst auf Port ${PORT}, Aufträge in ${JOBS}`));
export { server };
