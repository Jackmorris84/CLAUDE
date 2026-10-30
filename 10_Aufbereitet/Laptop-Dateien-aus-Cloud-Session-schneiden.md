---
titel: "Laptop-Dateien aus Cloud-Session bearbeiten (schneiden)"
typ: wissen
thema: [Claude Code, Remote Control, Workflow]
quelle: "Claude-Session 2026-10-30, Ergebnis von list_computer_folders"
erstellt: 2026-10-30
status: roh
entscheidung: offen
tags: [claude-code, laptop, remote-control]
---
## Kernaussage
Eine Cloud-Session kann nur dann auf Laptop-Dateien zugreifen, wenn der Ordner per Remote Control freigegeben ist und für Cloud-Sessions zulässig ist. Aktuell ist das nicht der Fall: Der Ordner „Jarvis Claude" auf DESKTOP-1T6HMVM wird nicht angeboten.

## Details
- Prüfergebnis heute: `folders` leer; „Jarvis Claude" (DESKTOP-1T6HMVM) steht unter `cannot_be_used`, Grund `not_available`.
- Mögliche Ursachen laut Tool: Ordner ist nicht das Root eines Git-Repos, liegt in einem versteckten Verzeichnis, der Rechner läuft unter Windows, oder die Claude-App muss aktualisiert werden. ❓ unklar: Welche davon zutrifft. DESKTOP-… deutet auf Windows hin.
- „Schneiden" (Video/Audio/Text?) geht in der Cloud-Session nur mit installierten Tools wie ffmpeg. ❓ unklar: Was genau geschnitten werden soll.
- Alternative: Dateien ins Repo (z. B. 00_Inbox) legen oder hochladen, dann in der Session bearbeiten. Ergebnis kommt per Git zurück.
- Alternative: Claude Code lokal auf dem Laptop starten, dort direkter Dateizugriff.

## Wann brauche ich das?
- Wenn ich Dateien vom Laptop in einer Cloud-Session bearbeiten lassen will.

## Verknüpft mit
- [[Second-Brain-Guide]]
