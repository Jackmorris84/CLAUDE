---
titel: "claude-mem: läuft es im Hintergrund?"
typ: wissen
thema: []
quelle: "Installierte Plugin-Version 15.0.1 (thedotmack/claude-mem), hooks/hooks.json im Plugin-Cache"
erstellt: 2026-10-21
status: roh
entscheidung: offen
tags: [claude-code, plugin, claude-mem]
---
## Kernaussage
claude-mem braucht keinen manuellen Start. Seine Hooks laufen automatisch bei Session-Ereignissen. Wirksam wird es in neuen Sessions, nicht in der laufenden.

## Details
- Hooks laut `hooks/hooks.json`: `Setup`, `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `PostToolUseFailure`, `PreToolUse` (Read, Bash, Grep, Glob, memory-Suche), `Stop`, `SessionEnd`.
- Die meisten Hooks laufen asynchron (`async: true`), beeinflussen also die Antwortzeit kaum.
- Die Installation war erfolgreich: `claude plugin list` zeigt `claude-mem@thedotmack` als aktiv.
- Ungeprüft: ob der Hintergrund-Worker in dieser Umgebung tatsächlich startet. Laut Suchergebnis gibt es eine lokale Web-Ansicht auf localhost:37777.
- Die Daten liegen laut Suchergebnis lokal in SQLite, nicht auf einem externen Server.

## Wann brauche ich das?
- Wenn ich prüfen will, ob claude-mem in einer neuen Session Erinnerungen lädt.
- Vor dem Einsatz mit sensiblen Daten: Speicherort und Privacy-Tags (`<private>`) prüfen.

## Verknüpft mit
- [[Skills-Installation-Instagram-Reel]]
