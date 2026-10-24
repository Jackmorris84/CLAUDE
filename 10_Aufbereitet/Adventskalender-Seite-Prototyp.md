---
titel: "Adventskalender – Seiten-Prototyp und Ziehungs-Skript (Stand 2026-10-17)"
typ: wissen
thema: [Adventskalender, Website, Technik]
quelle: "Eigenbau in dieser Sitzung"
erstellt: 2026-10-17
status: roh
entscheidung: offen
tags: [adventskalender, website, prototyp]
---
## Kernaussage
Im Repository liegen zwei Bausteine: eine statische Kalenderseite (`Adventskalender-Seite/index.html`) als Layout-Prototyp und ein Ziehungs-Skript (`Gewinnspiel-Tool/ziehung.py`). Beides ist Entwurf, nichts davon ist live.

## Kalenderseite
- 23 Türchen in fester, gemischter Reihenfolge wie beim Schokokalender, darunter Türchen 24 in dreifacher Breite, Höhe wie die anderen (Jannik 24.10.). Farben hellbraun/rot/grün (❓ mit Vater klären).
- Sprachen Deutsch, Englisch, Koreanisch per Schalter. Koreanische Texte sind von mir, ❓ von der Übersetzerin prüfen lassen.
- Türchen öffnen sich nach Datum (ab 1.12.2026). Zum Testen: `index.html?datum=2026-12-10` und `?lang=ko`.
- Videos: Platzhalter. Pro Türchen kann später eine Videodatei je Sprache eingetragen werden (Objekt `CONTENT`, Voice-Over DE/KO/EN).
- Mobil gleiche Ansicht in 4 Spalten, Desktop 6 Spalten. Per Playwright-Screenshot geprüft.
- ⚠️ Freischaltung läuft nur im Browser und ist **nicht sicher**: Wer die Datei oder die Video-Adresse kennt, sieht alles. Für den Start braucht es serverseitige Prüfung per Token (siehe [[Adventskalender-Shop-Zahlung]]).
- ⚠️ Die Verteilung Lied/Geschichte/Musikvideo auf die Türchen ist nur ein Platzhalter: Musikvideo an den drei Sonntagen 6./13./20.12., Türchen 24 = Finale.

## Ziehungs-Skript
- Eingabe: CSV mit `email, bestaetigt, kaeufer`. Dubletten werden zusammengeführt, unbestätigte Adressen ignoriert.
- Lose: Standard Käufer 2, alle anderen 1. Optionen: `--gewinner`, `--faktor-kaeufer`, `--nur-kaeufer`, `--ohne-gewichtung`, `--seed`, `--log`. CSV-Spalten `email, bestaetigt, kaeufer` (eine Spalte `warteliste` wird ignoriert, wenn `--faktor-warteliste` 1 bleibt).
- Pro Person nur ein Gewinn. Ergebnis (Seed, Teilnehmerzahl, Lose, Gewinner, Zeit) wird als JSON protokolliert.
- Test (30.000 Ziehungen, je ein Teilnehmer pro Stufe): Käufer 2,0-mal so oft wie normale Teilnehmer.
- Beispieldatei: `Gewinnspiel-Tool/beispiel_teilnehmer.csv`.

## Offen / ❓ unklar
- Türchen-Verteilung: 10 Lieder + 10 Geschichten + 4 Musikvideos = 24. Aber das 1. Musikvideo (29.11.) liegt vor dem Start und nur auf YouTube. Was ist dann das vierte Musikvideo im Kalender? (Vorschlag: 6.12., 13.12., 20.12. und 24.12.)
- Wer hostet die Videos (Bunny/Vimeo oder eigener Server)?
- Domain: Unterdomain von davids-panparadies.de.

## Verknüpft mit
- [[Adventskalender-Planung]]
- [[Adventskalender-Shop-Zahlung]]
- [[Adventskalender-Gewinnspiel-Teilnahme]]
