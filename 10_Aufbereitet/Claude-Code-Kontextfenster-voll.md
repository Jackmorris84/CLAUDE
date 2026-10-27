---
titel: "Claude Code: Kontext voll nach einer Nachricht"
typ: wissen
thema: [claude-code, tokens, kontext]
quelle: "Chat 2026-10-27 (Frage des Nutzers, Antwort von Claude, nicht an der Laptop-Installation geprüft)"
erstellt: 2026-10-27
status: roh
entscheidung: offen
tags: [claude-code, limit, kontext, mcp]
---
## Kernaussage
Das Chat-Limit (Kontextfenster) und das Wochenlimit sind zwei verschiedene Dinge. Ein Chat kann nach einer Nachricht „voll" sein, weil schon vor der Nachricht viel im Kontext liegt (Connector-Tools, Skills, CLAUDE.md, gelesene Dateien).

## Details
- Wochenlimit = Nutzungskontingent pro Zeitraum. Kontextfenster = Gedächtnis eines einzelnen Chats. Ist es voll, wird komprimiert („compact"), auch wenn das Wochenlimit frei ist.
- Vorbelegt vor der ersten Nachricht: System-Prompt, Tool-Definitionen aller Connectors/MCP-Server (z. B. Notion, Gmail, Drive, Canva, vidIQ, Higgsfield, Fish Audio), Skills-Liste, CLAUDE.md, Memory.
- Kommt dazu: Dateien, die Claude liest (PDFs, Bilder, Videos, viele Notizen).
- Vermutung ❓ unklar: Die Vorgabe „vor jeder Antwort im Vault nachsehen" kann pro Nachricht viele Notizen laden.
- Diagnose: `/context` zeigt, was wie viel Platz belegt.
- Gegenmaßnahmen: `/clear` pro neuer Aufgabe; `/compact`; nicht benötigte Connectors/MCP-Server und Plugins abschalten (`/mcp`); Claude Code im Projektordner statt im ganzen Vault oder Home starten; CLAUDE.md kurz halten; große Dateien nicht anhängen, sondern nur per Pfad nennen; „im Vault nachsehen" auf gezielte Suche beschränken.

## Wann brauche ich das?
- Wenn Claude Code früh „Limit ausgeschöpft / Chat wird geschrumpft" meldet.

## Verknüpft mit
- [[KI-Regeln]]

## Tokens sparen mit dem Vault (Ergänzung 2026-10-27)
- Der Vault spart nur Tokens, wenn Claude wenig davon liest: erst ein Index, dann nur die passende Notiz.
- Index-Datei mit einer Zeile pro Notiz (Titel, Stichwort, Pfad) anlegen und in `KI-Regeln.md` verlinken.
- Suche per Stichwort statt Ordner komplett lesen; `Prompts/` und `00_Inbox` nur auf Anweisung lesen.
- Pro Aufgabe ein frischer Chat: Ergebnis als Notiz in den Vault, dann `/clear`. Der Vault ist das Gedächtnis, nicht der Chat.
- Fixe Kosten senken: Connectors pro Projekt nur die nötigen aktivieren; `CLAUDE.md` kurz halten.
- Modell für Routine (Notizen, Umformulieren) kleiner wählen (`/model`).
- Videoschnitt lokal: Skripte in Dateien speichern und ausführen, Videos nicht in den Chat laden, nur einzelne Standbilder ansehen.

## Beobachtung aus Screenshot (2026-10-27)
- In einem Auftrag (Whisper-Transkription, Skill `/instagram-agent:ig-caption`, Upload-Ordner, 4 Caption-Dateien, Lint, Cover.jpg lesen) wurde der Chat dreimal komprimiert (88k, 87,8k, 89,4k gespart), danach „Kontextfenster war voll".
- Heißt: Nach jeder Komprimierung füllt sich der Chat sofort wieder. ❓ unklar: Ursache (Skill-Anweisungen, Connectors, Transkript-Ausgabe, Modus „Hoch"), nur mit `/context` prüfbar.
- Der Hintergrund-Task „Lint the Instagram caption" schlug fehl und kann durch Wiederholungen weitere Tokens kosten.
- Maßnahmen: Aufgabe in getrennte Chats teilen (Transkript, Captions, Upload); Aufwand von „Hoch" auf Mittel stellen; Skill-/Plugin-Größe mit `/context` prüfen; Caption-Regeln als Vault-Notiz statt jedes Mal im Chat.

## /context-Auswertung (Screenshot, 2026-10-27)
Fenster 128k, belegt 108,6k (85 %).
| Posten | Tokens |
|---|---|
| Messages | 41,2k |
| MCP tools (geladen) | 22k |
| System tools | 21,1k |
| Skills | 10k |
| System prompt | 9,7k |
| MCP server instructions | 2,3k |
| Memory files | 2,3k |
| Autocompact buffer (reserviert) | 33k |
| MCP tools deferred (kostet nichts) | 469,9k, 603 Tools |

- Fester Block vor der ersten Nachricht: ca. 67k (MCP 22k, System tools 21k, Skills 10k, Prompt 9,7k, Rest 4,6k). Dazu 33k Puffer. Nutzbar für den eigentlichen Chat bleiben ca. 28k von 128k.
- Deshalb komprimiert der Chat nach kurzer Arbeit, obwohl das Wochenlimit frei ist.
- Stellschrauben: geladene MCP-Tools (22k) und Skills (10k) senken; System tools und Prompt sind fest.
- ❓ unklar: ob sich die 22k MCP-Tools nach `/clear` verringern (evtl. nur im Chat geladene Tools). Nach `/clear` erneut `/context` prüfen.
