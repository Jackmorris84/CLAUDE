// Ende-zu-Ende-Test der HTTP-Schnittstelle (dauert einige Minuten wegen des Renders).
// Voraussetzung: test-output/material/roh1.mp4 (scripts/testmaterial.sh). Aufruf: npm run test:e2e
import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const KEY = "testschluessel";
const API = "http://127.0.0.1:8788";
const FILES = "http://127.0.0.1:8899";
const JOBS = resolve("test-output/serverjobs");
await rm(JOBS, { recursive: true, force: true });

const files = spawn("python3", ["-m", "http.server", "8899", "--bind", "127.0.0.1", "--directory", "test-output/material"], { stdio: "ignore" });
const server = spawn("node", ["src/server.mjs"], { env: { ...process.env, ANTHROPIC_API_KEY: "", RENDER_API_KEY: KEY, RENDER_ENTWICKLUNG: "1", PORT: "8788", JOBS_DIR: JOBS }, stdio: "inherit" });
const ende = () => { files.kill(); server.kill(); };
process.on("exit", ende);
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const q = (pfad, opt = {}, key = KEY) => fetch(API + pfad, { ...opt, headers: { authorization: `Bearer ${key}`, "content-type": "application/json", ...(opt.headers ?? {}) } });

try {
  for (let i = 0; i < 50; i++) { try { if ((await fetch(API + "/gesundheit")).ok) break; } catch {} await warte(200); }
  // Zugriffsschutz
  assert.equal((await q("/jobs/x", {}, "falsch")).status, 401, "falscher Schlüssel muss abgelehnt werden");
  assert.equal((await fetch(API + "/jobs/x")).status, 401, "ohne Schlüssel muss abgelehnt werden");
  // Ungültige Eingaben
  assert.equal((await q("/jobs", { method: "POST", body: JSON.stringify({ id: "../x", clips: [{ id: "a", url: FILES + "/roh1.mp4" }] }) })).status, 400);
  assert.equal((await q("/jobs", { method: "POST", body: JSON.stringify({ id: "ok1", clips: [{ id: "a", url: "file:///etc/passwd" }] }) })).status, 400);
  // Auftrag anlegen
  const text = "Richtig Sturm und Hitze von 40 Grad. in meinem Studio verkrochen und hier beginnen die Aufnahmen für ein Projekt, was ich noch nicht verraten möchte, aber es kommt demnächst ans Licht. Ich freue mich riesig, in diesen stürmischen Zeiten was ganz Zartes zu spielen.";
  const r = await q("/jobs", { method: "POST", body: JSON.stringify({ id: "api1", tuer: 1, clips: [{ id: "roh1", url: FILES + "/roh1.mp4", text }], thumbnailText: "Seid bereit" }) });
  assert.equal(r.status, 202);
  assert.equal((await q("/jobs", { method: "POST", body: JSON.stringify({ id: "api1", clips: [{ id: "a", url: FILES + "/roh1.mp4" }] }) })).status, 409, "doppelte id");
  // Warten bis fertig
  let st;
  for (let i = 0; i < 400; i++) {
    st = await (await q("/jobs/api1")).json();
    if (["fertig", "pruefen", "fehler"].includes(st.status)) break;
    await warte(2000);
  }
  console.log("Status:", st.status, st.fehler ?? "", "Runden:", JSON.stringify(st.runden));
  assert.equal(st.status, "fertig", JSON.stringify(st));
  // Dateien
  const d = await (await q("/jobs/api1/dateien")).json();
  const namen = d.dateien.map((x) => x.pfad);
  for (const n of ["06-export/final.mp4", "08-paket/thumbnail.jpg", "06-export/untertitel.srt"]) assert.ok(namen.includes(n), `fehlt: ${n}`);
  const v = await q("/jobs/api1/datei/06-export/final.mp4");
  assert.equal(v.status, 200);
  assert.equal(v.headers.get("content-type"), "video/mp4");
  assert.ok((await v.arrayBuffer()).byteLength > 1e6);
  // Pfad-Tricks
  assert.equal((await q("/jobs/api1/datei/..%2F00-auftrag.json")).status, 404);
  assert.equal((await q("/jobs/api1/datei/clips/roh1.mp4")).status, 404, "Rohmaterial wird nicht ausgeliefert");
  assert.equal((await q("/jobs/api1/datei/00-auftrag.json")).status, 404);
  // Transkript und Neuberechnung ab Export (schnell)
  const t = await (await q("/jobs/api1/transkript")).json();
  assert.ok(t.clips[0].woerter.length > 10);
  const n = await q("/jobs/api1/neu", { method: "POST", body: JSON.stringify({ ab: "export", thumbnailText: "Neu" }) });
  assert.equal(n.status, 202);
  for (let i = 0; i < 200; i++) { st = await (await q("/jobs/api1")).json(); if (!st.laeuftGerade && ["fertig", "pruefen", "fehler"].includes(st.status)) break; await warte(1500); }
  assert.equal(st.status, "fertig", JSON.stringify(st));
  console.log("E2E OK");
} finally {
  ende();
}
