---
titel: "Token-Kosten in Claude Code: Kontext wird bei jeder Nachricht neu gelesen"
typ: wissen
thema: [claude-code, tokens]
quelle: "Claude Code Club: 4 Things Quietly Costing You Money in Claude Code (Okt 2026)"
erstellt: 2026-10-30
status: roh
entscheidung: offen
tags: [claude-code, kosten]
---
## Kernaussage
Bei jeder Nachricht liest Claude den gesamten Chat neu. Der Cache macht das billig (ca. 1/10 Preis), läuft aber ab (ca. 1 Std. im Abo, 5 Min. per API) und gilt pro Modell.

## Details
- /compact ist eine zusätzliche Lese-Anfrage und eher zum Platzschaffen gedacht. Bei fertigem Job /clear, bei Fehlabzweigung /rewind, sonst Übergabedatei.
- Cache-Brecher: Modellwechsel mitten im Chat, lange Pause, dann kleine Frage.
- CLAUDE.md unter 200 Zeilen als Index; Wiederholjobs als Skills; ungenutzte MCP-Connectors abschalten; Testausgaben per Hook kürzen.
- Standard ist Opus mit Thinking. Sonnet und niedriger /effort für einfache Jobs; konkret statt vage prompten.
- Erfolg messen: /usage heute und in einer Woche.

## Wann brauche ich das?
- Bei langen Sitzungen oder wenn das Abo-Limit knapp wird.

## Verknüpft mit
- [[KI-Regeln]]
