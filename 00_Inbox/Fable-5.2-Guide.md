---
verarbeitet: false
quelle: "https://charliehills.ai/guides/5-things-to-build-with-fable-5-2 (Charlie Hills, im Chat eingefügt am 2026-11-12)"
---
# 5 things to build with Fable 5.2 before Nov 16 – Guide (Rohmaterial)

**Frist:** Fable 5.2 ist laut Guide bis 16. November, 23:59 PT in Claude Pro und Team enthalten, danach über Usage Credits.

**Hinweis:** Zusammenfassung des im Chat eingefügten Guides. Die vollständigen Prompts zum Einfügen stehen auf der Guide-Seite (Link oben); sie sind hier nicht wörtlich kopiert.

## Die fünf Builds

| Build | Ergebnis | Dauer laut Guide |
|---|---|---|
| 1. Website | Live-Seite im Look von fünf Lieblingsseiten | ca. 2 Stunden |
| 2. 3D-Produktseite | Produkt dreht sich, wechselt Farbe und Preis | ca. 10 Minuten |
| 3. Claude schneidet Reels | Fertiges Reel aus einer Rohaufnahme | ca. 30 Minuten |
| 4. 2027-Plan | Interview, dann Plan wie ein Produkt-Launch | ca. 40 Minuten |
| 5. Opus-Playbook | Gespeicherter Skill, damit Opus wie Fable plant und prüft | ca. 10 Minuten |

## Ablauf je Build

1. **Website:** CONTEXT.md in Claude Chat per Interview erstellen → in neuem Ordner mit Claude Code (`/model fable`) Seitenliste und COPY.md per Interview → auf styles.refero.design ca. fünf DESIGN.md laden, mit Markenfarben und Schrift zu einer DESIGN.md zusammenführen → bauen, lokal starten, Screenshots gegen DESIGN.md prüfen → mit Vercel CLI live stellen (Hobby-Tarif kostenlos), Domain verbinden → Link zurückgeben und die 5 größten Anmelde-Hürden beheben lassen.
2. **3D-Produktseite:** Leerer Ordner, `/model fable`, Prompt einfügen. Eine einzelne index.html mit Three.js (unpkg, Version 0.160.0, Import Map): Laufschuh auf Drehteller, Studiolicht, weiche Schatten, Seitenpanel für Farbe von Obermaterial, Sohle und Schnürsenkeln, Mesh oder Leder, Initialen an der Ferse, Preis ändert sich mit jeder Wahl, „Add to bag" animiert den Schuh, Maus ziehen dreht die Kamera.
3. **Reels:** raw.mp4 in leeren Ordner → Pausen über 0,25 s und Versprecher schneiden → cut.mp4, Wort-Zeitstempel nach words.json → `/model fable`, Schnitt-Briefing: reel.html (1080x1920, `window.seek(t)` als reine Funktion), gerendert zu reel.mp4 mit 30 fps.
4. **2027-Plan:** In Claude Fable 5.2 wählen, „Interview me, then plan my whole 2027 like a product launch." Lange Version: ca. 25 Fragen in 5 Phasen, am Ende „My 2027 PRD" mit 11 Abschnitten.
5. **Opus-Playbook:** Fable schreibt den Skill `fable-playbook` → `/model opus`, dann `/advisor fable` → Aufgabe mit „Use the fable-playbook skill for this task" starten.

## Wenn etwas nicht klappt

- Fable 5.2 fehlt in der Modellliste: `claude update`, Claude Code neu starten.
- Seite bleibt leer: Chrome-Konsole öffnen (Cmd+Option+J), roten Fehler an Claude Code zurückgeben.
- `/advisor` ist kein Befehl: Claude Code zu alt, `claude update`.
- Es verlangt erst den Wechsel zu Fable: einmal `/model fable`, dann wieder `/model opus`.
- Build bricht ab: „keep going until it is finished and works".
- Wochenlimit sinkt schnell: Builds 1 und 3 zuerst, kleine Korrekturen mit `/model opus`.

## Empfohlene Reihenfolge laut Guide

Build 2 sofort, Build 1 heute Abend mit der Faktendatei beginnen, Build 5 vor dem 16. November.
