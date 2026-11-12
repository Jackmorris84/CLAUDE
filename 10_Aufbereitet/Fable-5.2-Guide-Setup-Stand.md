---
titel: "Fable-5.2-Guide: Setup-Stand und offene Schritte"
typ: anleitung
thema: [claude-code, fable-5-2]
quelle: "00_Inbox/Fable-5.2-Guide.md; Claude-Code-Session vom 2026-11-12"
erstellt: 2026-11-12
status: roh
entscheidung: offen
tags: [setup, fable, claude-code]
---
## Kernaussage
Von den fünf Builds des Fable-5.2-Guides sind Build 2 (3D-Produktseite) und Schritt 1 von Build 5 (Skill `fable-playbook`) fertig und liegen im Vault. Die Builds 1, 3 und 4 brauchen Eingaben von mir und sind noch offen; die Frist laut Guide ist der 16. November 2026, 23:59 PT.

## Details
- Die Session lief in einem Cloud-Container, nicht auf meinem Rechner. Installationen dort (Vercel CLI 65.14.0, faster-whisper 1.2.1) gelten nicht für meinen Rechner und nicht für neue Sessions.
- Im Container vorhanden und geprüft: Claude Code 2.1.322, Node 22.23.4, npm 10.9.9, Python 3.13.18, ffmpeg 6.1.1, git 2.43.0.
- Build 2: `Projekte/Fable-5.2-Builds/2-produktseite-3d/index.html`. In Headless-Chrome geprüft: lädt ohne Konsolenfehler, Drehteller dreht, Preis 129 → 137 (Premium-Farbe) → 167 (Leder) → 179 (Initialen), Ziehen dreht die Kamera, „Add to bag" animiert den Schuh, Zähler springt auf 1. Three.js kam im Test aus einer lokalen Kopie derselben Version 0.160.0, weil unpkg.com im Container gesperrt ist.
- Build 5: `.claude/skills/fable-playbook/SKILL.md` (Projekt-Skill dieses Vaults). ❓ unklar: ob `/advisor fable` in meiner lokalen Claude-Code-Version verfügbar ist; im Container nicht prüfbar, weil Slash-Befehle nur ich tippen kann.
- Gesperrt im Container: unpkg.com, huggingface.co, charliehills.ai. Folge: Das Whisper-Sprachmodell für Build 3 lässt sich dort nicht laden.

## Wann brauche ich das?
- Wenn ich die restlichen Builds vor dem 16. November angehe.
- Wenn ich wissen will, was schon erledigt ist und was noch an mir hängt.

## Offene Schritte (nur ich)
- Build 2 ansehen: index.html in Chrome öffnen (braucht Internet für Three.js).
- Build 5: in Claude Code `/model opus`, dann `/advisor fable`, dann eine Aufgabe mit „Use the fable-playbook skill for this task" starten. Für alle Projekte den Ordner `fable-playbook` nach `~/.claude/skills/` kopieren.
- Build 1: CONTEXT.md in Claude Chat erstellen, ca. fünf DESIGN.md von styles.refero.design laden, Markenfarben und Schrift bereitlegen. Vercel-Anmeldung (`vercel login`) und Domain-Einstellungen mache ich selbst.
- Build 3: eigene Aufnahme als raw.mp4 bereitstellen. Auf dem eigenen Rechner oder in einer Umgebung mit Zugriff auf huggingface.co ausführen.
- Build 4: in der Claude-App Fable 5.2 wählen und den Interview-Prompt einfügen.

## Verknüpft mit
- [[Fable-5.2-Guide]]
