---
titel: "Meeting-KI: Notion-AI-Nachbau für aufgezeichnete Meetings"
typ: wissen
thema: [meeting, ki, projekt]
quelle: "Chat 2026-11-16, Projekt Projekte/Meeting-KI"
erstellt: 2026-11-16
status: roh
entscheidung: offen
tags: [projekt, meeting]
---
## Kernaussage
Notion AI Meeting Notes lässt sich als dreistufige Pipeline nachbauen: lokale Transkription (faster-whisper), eine Claude-Analyse mit festem JSON-Schema, Ausgabe als Obsidian-Notizen inkl. Mermaid-Diagrammen.

## Details
- Umsetzung: `Projekte/Meeting-KI/meeting_ki.py` (Anleitung dort im README).
- Ausgabe pro Meeting: Zusammenfassung (TL;DR, Kernpunkte, Entscheidungen, Aufgaben, offene Fragen), Bericht, Diagramme, Transkript.
- Ein einziger strukturierter Claude-Aufruf statt mehrerer Prompts: konsistent und billiger; `bericht_markdown` und `diagramme` kommen im selben Schema.
- Regeltreue: Nichts erfinden, Unklares als „❓ unklar:", neue Notizen immer `status: roh`.
- Nicht verifiziert: Live-Lauf gegen die Claude-API und echtes Audio (Cloud-Umgebung ohne Schlüssel/Modell-Download).

## Nächste Ausbaustufen (Ideen, nicht beschlossen)
- Sprechererkennung (pyannote) für echte Zuordnung von Aufgaben.
- Mermaid-Validierung per `mermaid-cli`, bei Fehler automatischer Korrekturlauf.
- Web-Oberfläche (Upload → Ergebnis) oder Obsidian-Plugin; Kalender-Anbindung für Titel und Teilnehmer.
- Mehrere Meetings zu Projektberichten verdichten (Kuratoren-Prompt).

## Wann brauche ich das?
- Nach jedem aufgezeichneten Meeting, um Protokoll und Aufgaben ohne Handarbeit zu bekommen.

## Verknüpft mit
- [[Second-Brain-Guide]]
