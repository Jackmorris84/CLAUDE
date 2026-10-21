---
titel: "Skill: i-have-adhd"
typ: wissen
thema: []
quelle: "https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md"
erstellt: 2026-10-21
status: roh
entscheidung: offen
tags: []
---
## Kernaussage
Der Skill `i-have-adhd` formt Antworten für Leser mit ADHD: zuerst die nächste Handlung, nummerierte Schritte, Status in jeder Antwort wiederholen, Abschweifungen unterdrücken, konkrete Zeitangaben, sichtbare Fortschritte. Aufruf mit `/i-have-adhd`, beendet mit „stop adhd mode".

## Details
- Installiert nach `/root/.claude/skills/i-have-adhd/` (SKILL.md plus `agents/`-Ordner mit `gemini.toml` und `openai.yaml`).
- `disable-model-invocation: true`: Der Skill wird nur durch `/i-have-adhd` aktiviert, nicht automatisch.
- Gilt für die ganze Session, bis der Nutzer „stop adhd mode" oder „normal mode" sagt.
- Regeln 1 bis 10: nächste Aktion zuerst; nummerierte Schritte; eine konkrete nächste Aktion am Ende; Tangenten unterdrücken; Status jede Runde wiederholen; konkrete Zeitschätzungen; Fortschritt sichtbar machen; sachliche Fehlermeldungen; Listen auf 5 Punkte begrenzen; keine Floskeln.
- Ausnahmen: bei „erkläre" lang antworten, bei destruktiven Aktionen vorher bestätigen, bei echter Mehrdeutigkeit eine Rückfrage stellen.
- Vor dem Senden: Einleitungssatz, Schlusssatz mit „Fragen?" und „by the way"-Abschnitte streichen.

## Wann brauche ich das?
- Wenn ich bei Aufgaben mit mehreren Schritten schnell eine klare nächste Aktion brauche.
- Wenn lange Antworten mit Nebenbemerkungen und Floskeln das Arbeiten erschweren.

## Verknüpft mit
- [[KI-Regeln]]
