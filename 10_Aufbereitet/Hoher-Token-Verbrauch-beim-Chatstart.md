---
titel: "Hoher Token-Verbrauch beim Chatstart (~70.000)"
typ: wissen
thema: [Claude, Tokens, Konnektoren]
quelle: "Eigene Analyse von Claude im Chat vom 2026-10-21 (Sitzungskontext), keine externe Quelle; Zahlen nicht gemessen"
erstellt: 2026-10-21
status: roh
entscheidung: offen
tags: [claude-code, mcp, kontext]
---
## Kernaussage
Schon vor deiner ersten Nachricht füllt Claude das Kontextfenster mit festen Bausteinen (Systemprompt, Tool-Definitionen, Skills, Konnektor-Anweisungen). Viele verbundene Konnektoren treiben diesen Grundverbrauch hoch. Das ist erwartbar, aber reduzierbar.

## Details
- In dieser Sitzung sichtbar geladen: Systemprompt, Kernwerkzeuge mit langen Beschreibungen, Anweisungen von MCP-Servern (Docs, Fish Audio, GitHub, Gmail, Kalender, Drive, Notion) und eine Liste von ca. 30 Skills mit Beschreibungen.
- Zusätzlich stehen die Namen von mehreren hundert weiteren Tools (Canva, Fish Audio, Gmail, Notion, vidIQ, GitHub usw.) im Kontext. Ihre Schemas werden erst bei Bedarf geladen.
- ❓ unklar: Die genaue Aufteilung der 70.000 Tokens ist nicht gemessen. Mit `/context` (Claude Code) siehst du die Aufschlüsselung.
- Hebel zum Senken:
  1. Nicht benötigte Konnektoren/MCP-Server trennen (Canva, vidIQ, Fish Audio, Notion, falls ungenutzt).
  2. Ungenutzte Skills/Plugins deaktivieren.
  3. Lange CLAUDE.md / Memory-Dateien kürzen.
  4. Für verschiedene Aufgaben getrennte Umgebungen/Projekte mit nur den nötigen Konnektoren nutzen.
- Der feste Block wird meist per Prompt-Caching wiederverwendet. Er ist daher oft günstiger, als die Zahl vermuten lässt. ❓ unklar: Wie dein Kontingent das genau zählt.

## Wann brauche ich das?
- Wenn Limits schnell erreicht sind oder neue Chats sich "teuer" anfühlen.
- Vor dem Aufräumen der verbundenen Konnektoren.

## Verknüpft mit
- [[Second-Brain-Guide]]
