// Agent 4: Ton. Stimme säubern (Rumpeln, Rauschen), auf Ziel-Lautheit mastern (zwei Durchgänge),
// Spitzen unter dem Grenzwert. Optional Musik, die unter der Stimme abgesenkt wird.
import { run, probe, lautheit, schreibeJson, runde } from "../util.mjs";

export const name = "ton";
export const ordner = "04-ton";

const KETTE = (nr) => `highpass=f=80,afftdn=nr=${nr}:nf=-35`;

export async function laufe(ctx) {
  const { auftrag, stil, pfad, log } = ctx;
  const ziel = { ...stil.ton, ...(auftrag.optionen?.ton ?? {}), ...(ctx.tonUeberschreiben ?? {}) };
  const quelle = pfad("02-schnitt", "stimme.wav");
  const ausgabe = pfad(ordner, "master.wav");
  const nr = ziel.entrauschen ?? 10;
  const bericht = { warnungen: [] };

  const vorher = await lautheit(quelle);
  // Durchgang 1: messen
  const m1 = await run("ffmpeg", [
    "-nostats", "-v", "info", "-i", quelle, "-af",
    `${KETTE(nr)},loudnorm=I=${ziel.zielLufs}:TP=${ziel.spitzeDb - 0.5}:LRA=11:print_format=json`,
    "-f", "null", "-",
  ]);
  const json = m1.stderr.slice(m1.stderr.lastIndexOf("{"), m1.stderr.lastIndexOf("}") + 1);
  const g = JSON.parse(json);
  // Durchgang 2: mit den Messwerten linear anwenden (verändert die Dynamik nicht)
  const filter = [
    KETTE(nr),
    `loudnorm=I=${ziel.zielLufs}:TP=${ziel.spitzeDb - 0.5}:LRA=11:measured_I=${g.input_i}:measured_TP=${g.input_tp}:measured_LRA=${g.input_lra}:measured_thresh=${g.input_thresh}:offset=${g.target_offset}:linear=true`,
    "aresample=48000",
  ].join(",");
  let eingaben = ["-i", quelle];
  let filterArgs = ["-af", filter];
  if (auftrag.optionen?.musik) {
    // Musik leise unter die Stimme legen und bei Sprache absenken (Sidechain)
    eingaben = ["-i", quelle, "-stream_loop", "-1", "-i", pfad("clips", auftrag.optionen.musik)];
    const pegel = auftrag.optionen.musikPegelDb ?? -22;
    filterArgs = [
      "-filter_complex",
      `[0:a]${filter},asplit=2[v][sc];[1:a]volume=${pegel}dB[m];[m][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[md];[v][md]amix=inputs=2:duration=first:normalize=0[o]`,
      "-map", "[o]",
    ];
  }
  await run("ffmpeg", ["-y", "-v", "error", ...eingaben, ...filterArgs, "-c:a", "pcm_s24le", "-ar", "48000", ausgabe]);

  const nachher = await lautheit(ausgabe);
  const dauer = (await probe(ausgabe)).dauer;
  Object.assign(bericht, { ziel, vorher, nachher: { ...nachher, dauer: runde(dauer, 2) }, loudnorm: g });
  if (nachher.lufs != null && Math.abs(nachher.lufs - ziel.zielLufs) > (ziel.toleranzLu ?? 1)) {
    bericht.warnungen.push(`Lautheit ${nachher.lufs} LUFS liegt außerhalb ${ziel.zielLufs} ± ${ziel.toleranzLu ?? 1}.`);
  }
  if (nachher.spitzeDb != null && nachher.spitzeDb > ziel.spitzeDb + 0.1) {
    bericht.warnungen.push(`Spitze ${nachher.spitzeDb} dBFS liegt über ${ziel.spitzeDb} dB.`);
  }
  log(`Ton: ${vorher.lufs} → ${nachher.lufs} LUFS, Spitze ${nachher.spitzeDb} dBFS`);
  await schreibeJson(pfad(ordner, "ton-bericht.json"), bericht);
  return bericht;
}
