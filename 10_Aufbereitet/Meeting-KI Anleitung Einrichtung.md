---
titel: "Meeting-KI: Einrichtung und Benutzung"
typ: wissen
thema: [meeting, ki, anleitung]
quelle: "Chat 2026-11-16, Projekte/Meeting-KI/README.md"
erstellt: 2026-11-16
status: roh
entscheidung: offen
tags: [anleitung, meeting]
---
## Kernaussage
Die Meeting-KI ist ein Python-Skript, das lokal auf dem eigenen Rechner läuft (kein Dienst, kein Schalter zum „Aktivieren"). Man startet es pro Aufnahme per Befehl.

## Details
1. Einmalig: Repo/Branch `ccr-35568495-q18wsx` auf den Rechner holen; Python 3.10+ und `ffmpeg` installieren.
2. Einmalig: `cd Projekte/Meeting-KI && pip install -r requirements.txt`.
3. Einmalig: Anthropic-API-Schlüssel (console.anthropic.com) als `ANTHROPIC_API_KEY` setzen. Hinweis: Das Claude-Abo (claude.ai) enthält keinen API-Zugang, die API wird separat nach Verbrauch abgerechnet.
4. Pro Meeting: `python meeting_ki.py aufnahme.mp3 --titel "…" --sprache de`.
5. Ergebnis erscheint in `10_Aufbereitet/Meetings/<datum>_<titel>/`; in Obsidian öffnen, prüfen, danach mit `entscheidung: rein` für 30_Wissen freigeben.
- Erster Lauf lädt das Whisper-Modell (ca. 0,5 GB bei `small`) herunter; danach läuft die Transkription offline.
- Das Audio verlässt den Rechner nicht; nur der Transkripttext geht an die Claude-API.

## Wann brauche ich das?
- Wenn ich ein Meeting aufgenommen habe und Protokoll, Aufgaben und Diagramme will.

## Verknüpft mit
- [[Meeting-KI Notion-Nachbau Konzept]]
