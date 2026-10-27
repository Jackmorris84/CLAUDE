// Erzeugt die HyperFrames-Komposition (HTML + GSAP) für ein Reel im Stil von Werbung_v3.
// Jede Zeit ist eine Funktion der Timeline (kein Date.now, kein Zufall), damit jeder Lauf gleich ist.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const f = (x) => Math.round(x * 1000) / 1000;

export function baueKomposition({ stil, dauerInhalt, untertitel, kopf = {}, ende = {} }) {
  const { breite: B, hoehe: H, fps } = stil.canvas;
  const c = stil.farben;
  const u = stil.untertitel;
  const kopfKarte = { ...stil.kopfkarte, ...kopf };
  const endKarte = { ...stil.endkarte, ...ende };
  const total = f(dauerInhalt + endKarte.dauer);
  const introDauer = Math.min(stil.intro.dauer, dauerInhalt);
  const fam = stil.schrift.familie;

  const kopfVon = f(Math.min(kopfKarte.von, dauerInhalt));
  const kopfBis = f(Math.min(kopfKarte.bis, dauerInhalt));

  const caps = untertitel
    .map((g, i) => {
      const dur = f(g.end - g.start);
      const klein = g.text.length > 22;
      const woerter = g.tokens.map((t) => `<span class="w${t.schluessel ? " k" : ""}">${esc(t.t)}</span>`).join(" ");
      return `    <div id="cap${i}" class="cap clip" data-start="${f(g.start)}" data-duration="${dur}"><div class="pille${klein ? " klein" : ""}" id="p${i}">${woerter}</div></div>`;
    })
    .join("\n");

  const tweens = untertitel
    .map((g, i) => {
      const dur = g.end - g.start;
      const rein = Math.min(0.18, dur / 3);
      const raus = Math.min(0.12, dur / 3);
      return `      tl.fromTo("#p${i}", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: ${f(rein)}, ease: "power2.out" }, ${f(g.start)});
      tl.to("#p${i}", { opacity: 0, duration: ${f(raus)}, ease: "power2.in" }, ${f(g.end - raus)});
      tl.set("#p${i}", { opacity: 0 }, ${f(g.end)});`;
    })
    .join("\n");

  const variablen = JSON.stringify([
    { id: "kopfLabel", type: "string", label: "Kopfkarte: Label", default: kopfKarte.label },
    { id: "kopfZeile", type: "string", label: "Kopfkarte: Zeile", default: kopfKarte.zeile },
    { id: "endText", type: "string", label: "Endkarte: Text", default: endKarte.text },
  ]);

  return `<!doctype html>
<html lang="de" data-composition-variables='${esc(variablen).replace(/&quot;/g, '"').replace(/'/g, "&#39;")}'>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${B}, height=${H}" />
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "${fam}"; src: url("assets/fonts/pf-400-normal.woff2") format("woff2"); font-weight: 400; font-style: normal; }
      @font-face { font-family: "${fam}"; src: url("assets/fonts/pf-400-italic.woff2") format("woff2"); font-weight: 400; font-style: italic; }
      @font-face { font-family: "${fam}"; src: url("assets/fonts/pf-700-normal.woff2") format("woff2"); font-weight: 700; font-style: normal; }
      @font-face { font-family: "${fam}"; src: url("assets/fonts/pf-700-italic.woff2") format("woff2"); font-weight: 700; font-style: italic; }
      :root { --gold: ${c.gold}; --text: ${c.text}; --pille: ${c.pille}; --karte: ${c.karte}; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${B}px; height: ${H}px; overflow: hidden; background: ${c.hintergrund}; }
      #root { position: absolute; left: 0; top: 0; width: ${B}px; height: ${H}px; font-family: "${fam}", serif; overflow: hidden; }
      #bg { position: absolute; left: 0; top: 0; width: ${B}px; height: ${H}px; background: radial-gradient(ellipse at 50% 50%, ${c.hintergrund} 52%, ${c.schimmer} 100%); }
      #stage { position: absolute; left: 0; top: 0; width: ${B}px; height: ${H}px; z-index: 1; }
      #clip { position: absolute; left: 0; top: 0; width: ${B}px; height: ${H}px; object-fit: cover; }
      .cap { position: absolute; left: 0; top: ${u.oben}px; width: ${B}px; text-align: center; z-index: 5; }
      .pille { display: inline-block; max-width: ${B - 120}px; padding: 16px 34px 18px; border-radius: 26px; background: var(--pille); color: var(--text); font-size: ${u.groesse}px; font-weight: 700; line-height: 1.15; white-space: nowrap; }
      .pille.klein { font-size: ${Math.round(u.groesse * 0.86)}px; }
      .w.k { color: var(--gold); font-style: italic; }
      #kopf { position: absolute; left: ${kopfKarte.links}px; top: ${kopfKarte.oben}px; z-index: 6; }
      .karte { display: inline-block; padding: 22px 34px 26px; border-radius: 22px; background: var(--karte); }
      .karte .linie { height: 3px; background: var(--gold); margin-bottom: 14px; }
      .karte .label { font-size: 28px; letter-spacing: 0.22em; color: var(--gold); font-weight: 700; text-transform: uppercase; }
      .karte .zeile { font-size: 52px; font-style: italic; font-weight: 700; color: var(--text); line-height: 1.12; margin-top: 8px; white-space: pre-line; }
      #ende { position: absolute; left: 0; top: 0; width: ${B}px; height: ${H}px; background: #000; z-index: 9; }
      #ende .t { position: absolute; left: 0; top: ${Math.round(H / 2 - 60)}px; width: ${B}px; text-align: center; font-size: 76px; font-style: italic; font-weight: 700; color: var(--gold); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="${B}" data-height="${H}" data-fps="${fps}">
      <div id="bg"></div>
      <div id="stage">
        <video id="clip" class="clip" src="assets/video.mp4" data-start="0" data-duration="${f(dauerInhalt)}" muted playsinline></video>
      </div>
      <audio id="stimme" src="assets/master.wav" data-start="0" data-duration="${f(dauerInhalt)}" data-volume="1"></audio>
${caps}
      <div id="kopf" class="clip" data-start="${kopfVon}" data-duration="${f(kopfBis - kopfVon)}"><div class="karte" id="karte"><div class="linie"></div><div class="label" data-var-text="kopfLabel">${esc(kopfKarte.label)}</div><div class="zeile" data-var-text="kopfZeile">${esc(kopfKarte.zeile)}</div></div></div>
      <div id="ende" class="clip" data-start="${f(dauerInhalt)}" data-duration="${endKarte.dauer}"><div class="t" id="endtext" data-var-text="endText">${esc(endKarte.text)}</div></div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      // Intro: Bild leicht verkleinert im dunklen Rahmen mit rotem Schimmer, dann Vollbild
      tl.fromTo("#stage", { scale: ${stil.intro.startSkalierung} }, { scale: 1, duration: ${f(introDauer)}, ease: "power2.inOut" }, 0);
      // Kopfkarte
      tl.fromTo("#karte", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, ${kopfVon});
      tl.to("#karte", { opacity: 0, duration: 0.3, ease: "power2.in" }, ${f(Math.max(kopfVon, kopfBis - 0.3))});
      // Untertitel
${tweens}
      // Endkarte
      tl.fromTo("#endtext", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ${f(dauerInhalt + 0.15)});
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
}
