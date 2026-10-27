import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/** Prozess starten, Ausgabe sammeln. Wirft bei Fehlercode (außer `ok: true`). */
export function run(cmd, args, { cwd, input, ok = false, env, onLine } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, env: { ...process.env, ...env }, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const lines = (buf, cb) => cb && String(buf).split(/\r?\n/).filter(Boolean).forEach(cb);
    p.stdout.on("data", (d) => {
      stdout += d;
      lines(d, onLine);
    });
    p.stderr.on("data", (d) => {
      stderr += d;
      lines(d, onLine);
    });
    p.on("error", (e) => reject(new Error(`${cmd} konnte nicht gestartet werden: ${e.message}`)));
    p.on("close", (code) => {
      if (code !== 0 && !ok) reject(new Error(`${cmd} ${args.slice(0, 6).join(" ")} … endete mit Code ${code}\n${stderr.slice(-1500)}`));
      else resolve({ code, stdout, stderr });
    });
    if (input) p.stdin.end(input);
    else p.stdin.end();
  });
}

export const leseJson = async (p) => JSON.parse(await readFile(p, "utf8"));
export async function schreibeJson(p, obj) {
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}
export async function schreibeText(p, text) {
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, text, "utf8");
}

/** ffprobe: Dauer, Maße, fps, Codecs, Audio ja/nein. */
export async function probe(file) {
  const { stdout } = await run("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", file]);
  const j = JSON.parse(stdout);
  const v = j.streams.find((s) => s.codec_type === "video");
  const a = j.streams.find((s) => s.codec_type === "audio");
  const [n, d] = (v?.r_frame_rate ?? "0/1").split("/").map(Number);
  return {
    dauer: Number(j.format.duration),
    breite: v?.width ?? null,
    hoehe: v?.height ?? null,
    fps: d ? n / d : null,
    videoCodec: v?.codec_name ?? null,
    audioCodec: a?.codec_name ?? null,
    hatAudio: !!a,
    audioDauer: a ? Number(a.duration ?? j.format.duration) : null,
    groesseMB: Number(j.format.size) / 1e6,
  };
}

/** Stille-Abschnitte (silencedetect). */
export async function stillen(file, { rauschen = -35, mindest = 0.25 } = {}) {
  const { stderr } = await run("ffmpeg", ["-nostats", "-v", "info", "-i", file, "-vn", "-af", `silencedetect=n=${rauschen}dB:d=${mindest}`, "-f", "null", "-"], { ok: true });
  const out = [];
  let von = null;
  for (const m of stderr.matchAll(/silence_(start|end): (-?[\d.]+)/g)) {
    if (m[1] === "start") von = Math.max(0, Number(m[2]));
    else if (von != null) {
      out.push({ von, bis: Number(m[2]) });
      von = null;
    }
  }
  if (von != null) out.push({ von, bis: Infinity });
  return out;
}

/** Schwarzbild-Abschnitte (blackdetect). */
export async function schwarzbilder(file, { mindest = 0.3, pixel = 0.1 } = {}) {
  const { stderr } = await run("ffmpeg", ["-nostats", "-v", "info", "-i", file, "-an", "-vf", `blackdetect=d=${mindest}:pix_th=${pixel}`, "-f", "null", "-"], { ok: true });
  return [...stderr.matchAll(/black_start:([\d.]+) black_end:([\d.]+)/g)].map((m) => ({ von: Number(m[1]), bis: Number(m[2]) }));
}

/** Lautheit nach EBU R128: integriert (LUFS), Spitze (dBTP), Lautstärkebereich (LU). */
export async function lautheit(file) {
  const { stderr } = await run("ffmpeg", ["-nostats", "-v", "info", "-i", file, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], { ok: true });
  const teil = stderr.slice(stderr.lastIndexOf("Summary:"));
  const zahl = (re) => {
    const m = teil.match(re);
    return m ? Number(m[1]) : null;
  };
  return { lufs: zahl(/I:\s+(-?[\d.]+) LUFS/), lra: zahl(/LRA:\s+(-?[\d.]+) LU/), spitzeDb: zahl(/Peak:\s+(-?[\d.]+) dBFS/) };
}

export const runde = (x, n = 3) => Math.round(x * 10 ** n) / 10 ** n;

/** Kleine Fortschritts-Hilfe: schreibt Zeilen mit Zeitstempel. */
export function logger(ziel) {
  return (...teile) => {
    const z = `[${new Date().toISOString().slice(11, 19)}] ${teile.join(" ")}`;
    ziel?.(z);
    return z;
  };
}
