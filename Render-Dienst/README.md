# Render-Dienst (Adventskalender Post-Studio)

Rohvideos rein, fertiges Reel raus. Die Arbeit wandert von Agent zu Agent über Dateien im Auftragsordner. Am Ende prüft ein Prüfer das Video, ein Überarbeiter korrigiert automatisch, und zum Schluss entstehen Thumbnail, Captions und angepinnter Kommentar.

```
Rohvideos → 01 Transkript → 02 Schnitt → 03 Untertitel → 04 Ton → 05 Bild (HyperFrames) → 06 Export
                                                                                              ↓
                                       Überarbeiter ← 07 Prüfer (bis zu 3 Runden) ──────────┘
                                                                                              ↓
                                                         08 Paket: Hook, Titel, Thumbnail, Captions, Kommentar
```

Nichts wird veröffentlicht. Der Dienst schreibt, du lädst hoch.

## Was jeder Agent tut

| Stufe | Aufgabe | Werkzeug |
|---|---|---|
| 01 Transkript | Wortgenaue Zeiten (`words.json`), Tabelle zum Korrigieren. Whisper-Erfindungen über Stille werden entfernt. | faster-whisper (Python) |
| 02 Schnitt | Pausen über 0,4 s auf 0,2 s kürzen (aus der Mitte, nie bündig), „äh“ und Wiederholungen raus, mehrere Clips in deiner Reihenfolge, 8 ms Blenden gegen Knacken, Wortzeiten neu berechnen | FFmpeg |
| 03 Untertitel | 1 bis 3 Wörter, mindestens 0,4 s sichtbar, ein Schlüsselwort pro Einblendung (gold, kursiv) | eigene Logik |
| 04 Ton | Rumpeln und Rauschen raus, auf −14 LUFS mastern (zwei Durchgänge), Spitze unter −1 dB, optional Musik unter der Stimme | FFmpeg |
| 05 Bild | Intro im Rahmen mit rotem Schimmer, Kopfkarte, Untertitel-Pille, Endkarte, Bild für Bild gerendert | HyperFrames |
| 06 Export | `final.mp4` (Bild aus dem Render, Ton aus dem Master), SRT, Wortliste, Schnittliste | FFmpeg |
| 07 Prüfer | 14 messbare Prüfungen + Kontaktbogen (1 Bild/s) + optional Sichtprüfung durch Claude | FFmpeg, ffprobe |
| 08 Paket | Hook (5 Optionen, bewertet), 10 Titel + Thumbnail-Text, Captions für 4 Plattformen, angepinnter Kommentar, ehrlicher Viral-Check, Thumbnail-Bild | Claude-API + deine yt-Skills |

### Was der Prüfer misst
Format 1080×1920 / 30 fps / H.264 + AAC · Dauer · Bild/Ton-Sync · Lautheit (−14 ± 1 LUFS) · Spitzenpegel · keine Stille über 0,45 s im Inhalt · kein Schwarzbild außer der Endkarte · Untertitel-Regeln · jedes Wort liegt in einer Einblendung · Sicherheitsband der Plattform-Oberfläche (168 bis 1330 px) · erste Einblendung innerhalb 1,5 s · Länge ≤ 90 s · Dateigröße ≤ 100 MB · Herkunft der Wortzeiten.

### Was der Überarbeiter automatisch korrigiert
Zu viel Stille → engerer Schnitt und alles danach neu. Lautheit daneben → Ton neu mit angepasstem Ziel. Untertitel verletzen Regeln → ruhigere Gruppen. Höchstens 3 Runden. Bleibt etwas offen, steht der Status auf `pruefen` und `99-zusammenfassung.md` nennt genau, was.

**Was nur ein Mensch beurteilen kann** (steht in der Zusammenfassung): Kontaktbogen ansehen, zweimal am Handy ansehen (mit und ohne Ton), klingt die Stimme gut.

## Voraussetzungen (lokal, z. B. Windows-PC)
- Node.js 22 oder neuer
- FFmpeg im PATH (`ffmpeg -version`)
- Python 3 mit `pip install faster-whisper` (für echte Wortzeiten; das Modell lädt beim ersten Lauf)
- `npm install` in diesem Ordner (lädt HyperFrames, GSAP und die Schrift Playfair Display). Beim ersten Render lädt HyperFrames einen Chrome (`npx hyperframes browser ensure`).
- Optional `ANTHROPIC_API_KEY` für die Paket-Agents und die Sichtprüfung. Ohne Schlüssel schreibt der Dienst `briefing-*.md`, die du in Claude einfügst.

## Schnellstart

```bash
npm install
npm test                      # 28 Tests der Logik
node src/cli.mjs anlegen jobs/tuer-01 pfad/zu/roh1.mp4 pfad/zu/roh2.mp4 --tuer 1 --wunsch "Teaser, ruhig"
node src/cli.mjs lauf jobs/tuer-01
```

Ergebnis in `jobs/tuer-01/`: `06-export/final.mp4`, `08-paket/thumbnail.jpg`, `08-paket/paket.md`, `99-zusammenfassung.md`.
Ein Lauf braucht etwa 2 Minuten Render pro 20 Sekunden Video auf 4 Kernen.

Ohne Spracherkennung (`faster-whisper` fehlt) kann ein Text mitgegeben werden (`--text "…"`). Dann sind die Wortzeiten eine **Näherung** (der Prüfer weist darauf hin). Mit `"optionen": {"asr": "keins"}` wird nur nach Stille geschnitten, ohne Untertitel.

Nach Korrekturen neu rechnen: `node src/cli.mjs lauf jobs/tuer-01 --ab untertitel` (ab einer Stufe), `--neu` (alles).

## Auftrag (`00-auftrag.json`)

```json
{
  "id": "tuer-01", "tuer": 1, "wunsch": "Teaser, ruhig", "idee": "…", "cta": null, "absender": null,
  "clips": [{ "id": "clip1", "datei": "roh1.mp4", "startSek": 3.0, "endSek": null }],
  "optionen": {
    "schnitt": { "pauseMin": 0.4, "halteLuecke": 0.2 },
    "untertitel": { "maxWoerter": 3 },
    "schluesselwoerter": ["Sturm", "Hitze"],
    "ton": { "zielLufs": -14 },
    "musik": "musik.mp3", "musikPegelDb": -22,
    "entferne": { "clip1": [4, 5] }, "behalte": { "clip1": [7] }
  },
  "kopfkarte": { "label": "TÜR 1", "zeile": "Eine Überraschung für euch" },
  "endkarte": { "text": "Morgen: Tür 2" },
  "thumbnailText": "Seid bereit", "thumbnailSek": 6,
  "stil": { "farben": { "gold": "#D8B878" } }
}
```
Der Stil (Farben, Schrift, Positionen, Dauern) steht in `src/style.default.json` und lässt sich pro Auftrag überschreiben.

## HTTP-Schnittstelle (für Base44)

```bash
RENDER_API_KEY=geheim PORT=8787 node src/server.mjs
```
Ohne `RENDER_API_KEY` startet der Server nicht. Alle Aufrufe außer `/gesundheit` brauchen `Authorization: Bearer <RENDER_API_KEY>`.

| Aufruf | Zweck |
|---|---|
| `POST /jobs` | Auftrag + Clips (https-URL, je bis 300 MB) anlegen, startet im Hintergrund, Antwort 202 |
| `GET /jobs/:id` | Status: `wartet`, `laeuft` (mit Stufe), `fertig`, `pruefen`, `fehler`, Ergebnisdateien, Prüfrunden |
| `GET /jobs/:id/transkript` | Wörter zum Korrigieren |
| `POST /jobs/:id/neu` | `{ "korrekturen": {"clip1": {"3": "Zartes"}}, "schluesselwoerter": [...], "ab": "untertitel", "optionen": {...} }` |
| `GET /jobs/:id/dateien` | Ergebnisdateien auflisten |
| `GET /jobs/:id/datei/06-export/final.mp4` | Datei laden |
| `GET /gesundheit` | Lebenszeichen |

Beispiel:
```bash
curl -X POST localhost:8787/jobs -H "Authorization: Bearer geheim" -H "content-type: application/json" \
  -d '{"id":"tuer-01","tuer":1,"clips":[{"id":"clip1","url":"https://…/roh1.mp4"}],"webhook":{"url":"https://…","schluessel":"…"}}'
```
Schutz: nur https-Downloads, keine internen Adressen, Größenlimit, Pfad- und ID-Prüfung, Aufträge laufen nacheinander. Mit `webhook` meldet der Dienst am Ende `fertig`/`pruefen`/`fehler`.

Docker: `docker build -t render-dienst .` und `docker run -p 8787:8787 -e RENDER_API_KEY=… -v $PWD/daten:/daten render-dienst` (nicht in der Entwicklungsumgebung getestet).

## Ordner eines Auftrags
`00-auftrag.json` · `clips/` (Originale, bleiben unverändert) · `01-transkript/` · `02-schnitt/` (Schnittliste, geschnitten.mp4, Stimme) · `03-untertitel/` · `04-ton/` · `05-render/` (HyperFrames-Projekt, kann in der HyperFrames-Oberfläche weiterbearbeitet werden) · `06-export/` · `07-pruefung/` (Befunde je Runde, Kontaktbögen) · `08-paket/` · `99-zusammenfassung.md` · `status.json` · `lauf.log`

## Deine yt-Skills
Die Skills liegen in `agents/skills/` (Kopien aus dem Vault, `00_Inbox/yt-skills/`), dazu `agents/hooks.json` (21 Hook-Formeln) und `agents/hookscore.py`. Die Agents bekommen sie als Anleitung. `hookscore.py` misst nur Englisch: Der Dienst bewertet deshalb eine englische Übersetzung derselben Struktur und sagt das im Ergebnis.
Stimmprofil: Datei `agents/stimme.md` anlegen (wie du auf der Kamera sprichst, Wörter, die du nie benutzt, wen du ansprichst). Ohne Datei schreiben die Agents im Ton des Stil-Leitfadens (`agents/stil-leitfaden.md`) und sagen es.

## Grenzen (ehrlich)
- **Getestet (hier):** Schnitt, Ton, Untertitel, HyperFrames-Render, Export, Prüfer, Überarbeitungsschleife, Thumbnail, Sicherheitsfunktionen, 28 Tests. Mit Testmaterial aus dem Referenzvideo.
- **Nicht getestet:** faster-whisper (Modell-Downloads sind in der Entwicklungsumgebung gesperrt), Claude-API-Aufrufe (kein Schlüssel), Docker, Server mit echten Downloads über das Internet, Musik-Option.
- **Gekannte Näherungen:** Kopfkarten-Position, Intro-Dauer, Gold und Schrift sind aus Standbildern geschätzt (`src/style.default.json`). Schlüsselwörter werden regelbasiert gewählt (Nomen, Zahlen, Länge) und sind vor dem Rendern zum Tauschen in `03-untertitel/schluesselwoerter.json`.
- Kein Freisteller („Text hinter dem Kopf“) und keine Motion-Szenen aus deinem 5-Pass-Kit; im Referenzvideo kommen sie nicht vor.
- Das Rohmaterial wird nie verändert. Nichts wird gelöscht.
