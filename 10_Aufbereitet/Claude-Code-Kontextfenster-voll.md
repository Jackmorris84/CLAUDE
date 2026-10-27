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
