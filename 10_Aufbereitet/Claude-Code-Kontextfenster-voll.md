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

## Messung im neuen Chat (2026-10-27, ersetzt die Unsicherheit oben)
Neuer Chat, Messages 10 Tokens: belegt 70,3k von 128k (55 %).
| Posten | Tokens |
|---|---|
| MCP tools (geladen) | 22,1k |
| System tools | 21,1k |
| Skills | 10k |
| System prompt | 9,7k |
| MCP server instructions | 5,1k |
| Memory files | 2,3k |
| Autocompact buffer | 33k |
| Frei | 24,8k |

- Die 22k MCP-Tools sind also Grundlast und nicht erst im Chat geladen. Vor der ersten Nachricht sind 70,3k belegt, dazu 33k Puffer, frei bleiben nur 24,8k.
- Eine einzelne Nachricht mit größerer Tool-Ausgabe (Dateien lesen, Vault durchsuchen, Transkript, PDF) füllt das und löst die Komprimierung aus.
- Hebel: MCP tools + Instructions = 27,2k und Skills = 10k, zusammen 37,2k. Ohne sie wären ca. 62k frei. System tools und Prompt (30,8k) sind fest.
- Nächster Schritt: In `/context` die Zeile „MCP-Tools" aufklappen (578 Tools) und sehen, welche Server die 22k belegen; diese abschalten.

## MCP-Tool-Liste (Auswertung, 2026-10-27)
Die aufgeklappte Liste zeigt alle 578 Tools (ca. 485k Tokens), geladene und deferred gemischt. Welche davon die 22,1k geladenen sind, steht nicht darin.
- Größte Server (Summe grob geschätzt, nicht exakt gerechnet): Higgsfield (ca. 150 Tools, >100k), Notion (ca. 70 Tools, ca. 85k), vidIQ (ca. 90 Tools, ca. 95k), danach Gmail, ccd_*, computer-use, firecrawl, Fish Audio, Kalender, Chrome.
- Größte Einzeltools: vidIQ „Generate Motion Graphic Video" 26,1k, Notion „Query data sources" 12,3k, vidIQ „Channel Search" 8,1k, Notion „Query meeting notes" 5,8k.
- Vorgehen: unnötige Server ganz abschalten (Higgsfield, vidIQ, Fish Audio, Notion, Sheets, firecrawl, Browser/computer-use, wenn nicht gebraucht), danach `/context` prüfen, bis „MCP tools" und „MCP server instructions" klein sind.
- ❓ unklar: Ob jeder abgeschaltete Server die geladenen 22,1k senkt, zeigt nur die Messung nach dem Abschalten.
