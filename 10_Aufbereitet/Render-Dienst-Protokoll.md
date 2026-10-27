---
titel: "Render-Dienst: Protokoll der Nachtschicht (Stand 2026-10-27)"
typ: wissen
thema: [Adventskalender, Render-Dienst, Videoschnitt, HyperFrames, FFmpeg]
quelle: "Code in Render-Dienst/ (Repository), Tests vom 2026-10-27, Referenz Werbung_v3.mp4"
erstellt: 2026-10-27
status: roh
entscheidung: offen
tags: [render-dienst, protokoll, automatisierung]
---
## Kernaussage
Der Render-Dienst steht und läuft Ende zu Ende: Rohvideo rein, geschnittenes Reel im Stil von `Werbung_v3.mp4` raus, geprüft und bei Bedarf automatisch überarbeitet, dazu Thumbnail und Textpaket. Ordner: `Render-Dienst/` im Repository, Anleitung dort in `README.md`. Die Base44-App spricht ihn über eine HTTP-Schnittstelle an (siehe [[Base44-Prompt-Teil2-Video-Schnitt-Maschine]]).

## Details
**Gebaut (8 Agents nacheinander, jeder liest die Dateien des vorigen)**
1. Transkript: Wortzeiten, Korrekturtabelle (faster-whisper; Näherung aus Text als Notbehelf)
2. Schnitt: Pausen auf 0,2 s, „äh“ und Wiederholungen raus, mehrere Clips, 8-ms-Blenden
3. Untertitel: 1 bis 3 Wörter, mindestens 0,4 s, ein Schlüsselwort gold/kursiv
4. Ton: −14 LUFS, Spitze unter −1 dB, Rumpeln/Rauschen raus, optional Musik
5. Bild: HyperFrames (Intro im Rahmen, Kopfkarte, Untertitel-Pille, Endkarte)
6. Export: `final.mp4`, SRT, Wortliste, Schnittliste
7. Prüfer: 14 messbare Prüfungen, Kontaktbogen, optional Sichtprüfung durch Claude; **Überarbeiter** korrigiert bis zu 3 Runden (Schnitt enger, Ton neu, ruhigere Untertitel)
8. Paket: Hook (bewertet), Titel + Thumbnail-Text, Captions für 4 Plattformen, angepinnter Kommentar, ehrlicher Viral-Check, Thumbnail-Bild. Nutzt deine yt-Skills (Kopien in `Render-Dienst/agents/skills/`).

**Getestet (hier, mit Testmaterial aus dem Referenzvideo)**
- 28 Unit-Tests bestehen (Schnittlogik, Untertitel, Paket-Prüfungen, Orchestrator, Sicherheit).
- Voller Lauf: 17,6 s Rohclip mit zwei eingefügten Pausen (1,0 s und 0,7 s) → 18,6 s fertiges Reel (inkl. 2,4 s Endkarte), 1080×1920, 30 fps, H.264/AAC, −14,3 LUFS.
- Überarbeitungsschleife: Test mit absichtlich zu lascher Pausengrenze. Runde 1 meldete „Stille 9,21–9,92 s“, der Überarbeiter schnitt enger und renderte neu, Runde 2 bestanden (`10_Aufbereitet/Render-Dienst-Test/qa-runde-1.json` und `-2.json`).
- HTTP-Schnittstelle Ende zu Ende: falscher/fehlender Schlüssel → 401, Pfad-Tricks und Rohmaterial → 404, `file://`-URL und `../`-ID → 400, doppelte ID → 409, Download, Lauf, Dateiabruf, Neuberechnung.
- Ansichtsmaterial: `10_Aufbereitet/Render-Dienst-Test/` (Vorschau-Video 540×960, Kontaktbogen, Thumbnail, Zusammenfassung).
- Renderzeit: etwa 1,5 Minuten für 18,6 s Video auf 4 Kernen.

**Nicht getestet**
- faster-whisper (Modell-Downloads sind in der Cloud-Umgebung gesperrt). Der Code ist fertig, aber nie gelaufen. Auf deinem PC prüfen.
- Aufrufe der Claude-API (kein Schlüssel hier). Ohne Schlüssel schreibt der Dienst `briefing-*.md` zum Einfügen in Claude.
- Docker (kein Docker hier), Musik-Option, Webhook an eine echte Gegenstelle.
- Mit echtem Rohmaterial ohne eingebrannte Untertitel: Mein Testmaterial stammt aus dem fertigen Video (Untertitelband übermalt), deshalb sieht man im Test Streifen im Untertitelband und eine doppelte Kopfzeile in den ersten Sekunden. Das liegt am Testmaterial, nicht am Dienst.

**Geschätzte Stilwerte (bitte prüfen, `Render-Dienst/src/style.default.json`)**
- Gold `#E8C675` (V1-Notiz nennt `#D8B878`), Schrift Playfair Display, Position der Kopfkarte, Dauer des Intros (3 s), Ton −14 LUFS (Referenz misst −15,3).

**Offene Entscheidungen für dich**
1. Wo läuft der Render-Dienst? Zum Start auf deinem Windows-PC (Node 22, FFmpeg, `pip install faster-whisper`), später auf einem kleinen Server mit Docker. Die Base44-App braucht eine erreichbare https-Adresse.
2. `ANTHROPIC_API_KEY` für die Paket-Agents und die Sichtprüfung eintragen (Kosten pro Video: wenige Cent bis ca. 1 Euro, ❓ unklar: genau).
3. Stimmprofil: Datei `Render-Dienst/agents/stimme.md` anlegen (dein `voice.md` fehlt mir noch).
4. Fehlt etwas aus deinem 5-Pass-Kit? Freisteller („Text hinter dem Kopf“) und Motion-Szenen sind nicht eingebaut, weil das Referenzvideo sie nicht hat.

## Wann brauche ich das?
- Beim Starten des Dienstes, beim Anbinden an Base44 und beim Prüfen, was der Dienst kann und was nicht.

## Verknüpft mit
- [[Base44-Prompt-Teil2-Video-Schnitt-Maschine]]
- [[Base44-Prompt-Adventskalender-Post-Studio]]
- [[YT-Skills-Uebersicht]]
- [[5-Pass-Reel-Edit-Kit]] (Branch ccr-9ffd4d23-m2cogq)
