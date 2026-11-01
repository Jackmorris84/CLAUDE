---
titel: "Skill-Doctor Bericht 2026-11-01"
typ: wissen
thema: [claude-code, skills, tokens]
quelle: "Ausgabe von /skill-doctor in dieser Sitzung (2026-11-01)"
erstellt: 2026-11-01
status: roh
entscheidung: offen
tags: [claude-code, skills, kosten]
---
## Kernaussage
15 Skills sind geladen und keiner wurde je benutzt. Ihre Kurzbeschreibungen kosten zusammen ca. 3.340 Tokens in jedem Zug.

## Details
| Skill | Quelle | Kontext | Nutzung |
|---|---|---|---|
| session-start-hook | userSettings | ~100 | 0× |
| wochenreview | projectSettings | ~80 | 0× (neu) |
| built-in-browser | claude.ai | ~290 | 0× |
| chrome-browser | claude.ai | ~260 | 0× |
| computer-use | claude.ai | ~320 | 0× |
| deep-research | claude.ai | ~200 | 0× |
| docs | claude.ai | ~340 | 0× |
| docx | claude.ai | ~320 | 0× |
| google-workspace | claude.ai | ~330 | 0× |
| import-memory | claude.ai | ~60 | 0× |
| morning | claude.ai | ~120 | 0× |
| pdf | claude.ai | ~150 | 0× |
| pptx | claude.ai | ~330 | 0× |
| skill-creator | claude.ai | ~120 | 0× |
| xlsx | claude.ai | ~320 | 0× |

- Summe: ca. 3.340 Tokens pro Zug. Davon 13 synchronisierte claude.ai-Skills: ca. 3.160, projekteigene und eigene Skills: ca. 180.
- Spalte "7d tokens" ist überall leer (kein Verbrauch in 7 Tagen erfasst).
- Der Doctor meldet: 2 lokale und 13 synchronisierte Skills nie benutzt.
- Abschalten: lokale Skills in /skills oder Ordner aus .claude/skills entfernen. Synchronisierte Skills in /skills oder auf claude.ai ausschalten. Ein gelöschter synchronisierter Skill wird beim nächsten Sync neu geladen.

## Empfehlung (nicht entschieden)
- Behalten: wochenreview (eigener Ablauf), docs, pdf, skill-creator.
- Kandidaten zum Abschalten (kein Bezug zum Second Brain, zusammen ca. 2.170 Tokens): built-in-browser, chrome-browser, computer-use, google-workspace, docx, pptx, xlsx, deep-research, morning.
- ❓ unklar: import-memory und session-start-hook, hängt davon ab, ob du sie brauchst.

## Wann brauche ich das?
- Beim nächsten Wochenreview, um Skill-Kosten mit /usage zu vergleichen.

## Verknüpft mit
- [[Token-Kosten-Claude-Code]]
