---
titel: "YouTube-Skills (yt-*) Übersicht"
typ: wissen
thema: [YouTube, Skills, Base44, Adventskalender]
quelle: "Hochgeladene SKILL.md-Dateien vom 2026-10-27, Originale in 00_Inbox/yt-skills/"
erstellt: 2026-10-27
status: roh
entscheidung: offen
tags: [yt-skills, skills, youtube]
---
## Kernaussage
Die selbst erstellten yt-Skills bilden einen Ablauf von Recherche über Plan und Skript bis zum Titel/Thumbnail, dazu Werkzeuge für nach dem Dreh. Bisher geliefert: 5 von 11. Weitere folgen. `/yt-caption` ist noch nicht dabei.

## Details
| Skill | Aufgabe | Hilfsdatei(en) |
|---|---|---|
| yt-viral | Erfolgreiche Videos der Nische nach Vielfachem des Kanal-Medians ranken, Formel benennen | `swipe.py`, `collected.json`, `../yt-script/hooks.json` (21 Formeln) |
| yt-pipeline | Kettet yt-viral → yt-plan → yt-script → yt-package über Dateien im Wochenordner | `voice.md`, `pipeline/standard.md` |
| yt-package | Titel und Thumbnail als Paar schreiben und prüfen (60/40 Zeichen, max. 3 Wörter Thumbnail, nichts doppeln) | `title.py`, `voice.md` |
| yt-edit | Aus Transkript Schnittliste (Pausen, Füllwörter, Wiederholungen) | `deadair.py` |
| yt-retention | Studio-Retention-Export lesen, größtes Leck finden | `retention.py` |

Gemeinsame Regeln (aus den Skills):
- Nichts wird veröffentlicht: Der Skill schreibt, du veröffentlichst. Jede Ausgabe endet mit der Frage „ship it, or change it?“.
- Nichts erfinden: keine Zahlen, Ergebnisse oder Quellen ohne Beleg. Annahmen heißen „Annahme“.
- Stimme aus `~/Documents/Panfloete-Kanal/voice.md`.
- Wochenordner `woche-YYYY-WW/` mit `00-brief.md` bis `99-zusammenfassung.md`. Pro Woche genau 3 Videos: 1 Langvideo, 2 Shorts.
- Nach dem Dreh von Hand: yt-edit, yt-chapters, yt-shorts, yt-seo, später yt-retention, yt-comment, yt-audit.

Namen aller bislang bekannten Skills: yt-viral, yt-plan, yt-script, yt-package, yt-pipeline, yt-edit, yt-chapters, yt-shorts, yt-seo, yt-retention, yt-comment, yt-audit (12 Namen, davon 5 vorhanden; ❓ unklar: die Zählung „11“ und ob `yt-caption` dazugehört).

## Wann brauche ich das?
- Beim Einbauen in das Post-Studio ([[Base44-Prompt-Adventskalender-Post-Studio]]): `yt-package` (Titel/Thumbnail), `yt-shorts` und `yt-seo` (Captions) sind für den Adventskalender am wichtigsten.
- ❓ unklar: Die Python-Skripte (`swipe.py`, `title.py`, `deadair.py`, `retention.py`, `hookscore.py`) wurden nicht mitgeliefert. In Base44 müssten ihre Regeln neu umgesetzt werden.
- ❓ unklar: Die Skills sind für Langvideos auf dem Panflöten-Kanal geschrieben. Für Adventskalender-Türen (Shorts/Reels, 9:16) braucht es vermutlich Anpassungen.

## Verknüpft mit
- [[Verfuegbare-Tools-fuer-Instagram-Posts]]
- [[Base44-Prompt-Adventskalender-Post-Studio]]
