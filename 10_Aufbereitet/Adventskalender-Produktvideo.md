---
titel: "Produktvideo Musikalische Adventszeit (3D-Animation, 9:16)"
typ: projekt
thema: [adventskalender, produktvideo]
quelle: "Claude-Code-Session vom 2026-11-12; Shop-Produktbild, Kalender-Screenshot, Video-Übersicht und Bildschirmaufnahme aus dem Chat"
erstellt: 2026-11-12
status: roh
entscheidung: offen
tags: [video, reel, fable, three-js]
---
## Kernaussage
Für den digitalen Adventskalender „Musikalische Adventszeit" gibt es ein 23-Sekunden-Produktvideo im Hochformat (1080x1920, 30 fps, ohne Ton), das aus Code gerendert ist. Es liegt mit allen Quelldateien in `Projekte/Adventskalender-Produktvideo/`.

## Details
- Ablauf: Kalender fliegt ins Bild (0–2,4 s) → dreht sich einmal, Seitenlicht warm von links und kühl von rechts (2,4–6,6 s) → Kamerafahrt auf Türchen 1, Türchen öffnet sich, Standbild kommt heraus (6,6–11,6 s) → Schnitt: die sechs Videos als Wand mit dem Satz aus dem Kalender (11,6–15,6 s) → Schnitt: der echte Kalender aus dem Screenshot (15,6–18 s) → Schnitt: Kalender als Schlussbild mit dem Satz „Bis zum 13. in die Warteliste eintragen und Gutscheincode sichern." (18–23 s).
- Die Fotos sind unverändert. Einzige Bearbeitung: Die Vorderseite des Shop-Bildes wurde perspektivisch entzerrt, damit sie auf dem 3D-Körper liegt. Rückseite und Seiten des Körpers sind einfarbig kupferbraun, weil es davon kein Bild gibt.
- Eingeblendete Texte: „24 Türchen voller Panflötenmusik und persönlicher Geschichten" (aus dem Kalender-Screenshot) und der Schlusssatz zur Warteliste (von mir vorgegeben). Kein Preis, kein Link.
- In der Video-Wand wurden Bild 1 und 3 auf meinen Wunsch durch „Maria durch ein Dornwald" und „Süßer die Glocken nie klingen" ersetzt.
- Die Standbilder stammen aus der Video-Übersicht (je 400x224 Pixel, mit Laufzeit-Marke) und wirken groß gezeigt leicht unscharf.
- Neu rendern: im Projektordner einen lokalen Webserver auf Port 8765 starten, dann `render.js` mit Playwright ausführen und die Einzelbilder mit ffmpeg zusammensetzen. `reel.html` zeichnet über `window.seek(t)` für jede Sekunde t immer dasselbe Bild.
- Koreanische Fassung: `produktvideo-ko.mp4` (ohne Ton) und `produktvideo-ko-mit-musik.mp4`. Übersetzt sind nur die beiden eingeblendeten Sätze: „팬플루트 음악과 개인적인 이야기가 가득한 24개의 문" und „13일까지 대기자 명단에 등록하고 쿠폰 코드를 받으세요." Kalenderbild und Screenshot bleiben deutsch. Rendern mit `reel.html?lang=ko`.
- ❓ unklar: Die koreanischen Sätze sind von Claude übersetzt und nicht von einer Muttersprachlerin oder einem Muttersprachler geprüft.

## Wann brauche ich das?
- Wenn ich das Video posten oder im Shop einsetzen will.
- Wenn ich Ablauf, Text, Türchen oder Standbilder ändern lassen will.

## Offene Punkte
- Fassung mit Musik: `produktvideo-mit-musik.mp4`, unterlegt mit der von mir gelieferten Datei „Jingle Bells - Instrumental Christmas Music (Orchestra)" (erste 23 Sekunden, Ausblende am Ende). `produktvideo.mp4` bleibt die Fassung ohne Ton.
- ❓ unklar: Nutzungsrechte an der Musikdatei für Veröffentlichung und Werbung.
- ❓ unklar: Der Schlusssatz nennt „13." ohne Monat und keinen Link zur Warteliste.
- Schärfere Standbilder möglich, wenn ich die Originalvideos oder Einzelbilder daraus bereitstelle.

## Verknüpft mit
- [[Fable-5.2-Guide-Setup-Stand]]
