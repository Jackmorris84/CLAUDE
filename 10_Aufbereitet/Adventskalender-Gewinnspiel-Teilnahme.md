---
titel: "Adventskalender – Gewinnspiel: Teilnahme, Gewichtung, Bedingungen (Entwurf)"
typ: wissen
thema: [Adventskalender, Gewinnspiel]
quelle: "[[2026-10-17_Adventskalender-Frage-Teilnahmebedingungen]], [[Adventskalender-Planung]]"
erstellt: 2026-10-17
status: roh
entscheidung: offen
tags: [adventskalender, gewinnspiel, recht]
---
## Kernaussage
Teilnahme am besten über ein Formular auf der Kalender-Seite mit E-Mail und Bestätigungslink (Double-Opt-In). Käufer bekommen automatisch mehr Lose (2× oder 3×). Gezogen wird live aus einer Liste mit Gewichtung. Das ist ein Vorschlag, kein Rechtsrat: Bedingungen vor dem Start von einer Rechtsperson prüfen lassen.

## Teilnahme: Kommentar oder E-Mail?
- **Kommentar** (Instagram/TikTok/YouTube): einfach für Fans, aber Kommentare lassen sich schlecht gewichten, nicht sicher einem Käufer zuordnen und bringen keine Adressen für den Funnel. Plattformregeln (Hinweis, dass das Gewinnspiel nicht von der Plattform stammt) beachten.
- **E-Mail-Formular mit Bestätigungslink** (Empfehlung): Name + E-Mail + Haken bei Teilnahmebedingungen. Teilnahme zählt erst nach Klick auf den Link in der Bestätigungsmail. Das verhindert Fake-Adressen und Mehrfach-Teilnahmen, und die Liste ist zugleich die Basis für die Mailingliste/den Funnel.
- Kommentar nur als Zusatz („Kommentiere, um uns zu zeigen, wer dabei ist“), ohne dass er für die Ziehung zählt.
- Newsletter-Einwilligung getrennt und freiwillig anbieten, nicht als Pflicht zur Teilnahme (Datenschutz, DSGVO).

## Gewichtung (2× oder 3×)
Jede bestätigte Person hat 1 Los. Käufer des Kalenders bekommen 2 Lose.
1. Der Shop schickt Käufer (per Export oder Anbindung) ins Mailtool und setzt dort das Etikett „Käufer“ (Mailtool ist Brevo; Anbindung an den Shop vorher prüfen).
2. Vor der Ziehung: Liste exportieren (E-Mail, bestätigt ja/nein, Käufer ja/nein). Dubletten pro E-Mail zusammenführen.
3. Lose = 1 für Nicht-Käufer, 2 oder 3 für Käufer. Rückerstattete Käufe zählen nicht als Käufer.
4. Ziehung live per Skript oder Tabellen-Zufallsfunktion, Bildschirm geteilt, Ergebnis wird protokolliert (Datum, Teilnehmerzahl, Lose, Gewinner). Ich kann das Skript schreiben und testen.
5. Pro Person nur ein Gewinn. Erster gezogener Gewinner, dann weiterziehen, bis 3 Gewinner feststehen.

## Bausteine der Teilnahmebedingungen
- Veranstalter (Name, Anschrift, Kontakt, Impressum).
- Zeitraum und Ziehungstermine (29.11., 6.12., 13.12., 20.12., 24.12.).
- Wer darf mitmachen (Alter, Wohnsitz; da weltweit versandt wird: Länderliste, Zoll, ggf. Ausschlüsse). ❓ Mindestalter und Länder klären.
- Wie man teilnimmt, Bestätigungslink, Frist.
- Käufer-Bonus offen und verständlich erklären („Käufer des Adventskalenders erhalten 2 Lose statt 1“).
- Gewinne: 3× CD-Paket (6 CDs), CD „Ewigkeit“ (3 pro Advent), Konzertgutschein (1 Jahr gültig, nur einmal einlösbar, gültig für ein beliebiges Konzert).
- Ziehung (Zufall, live, Gewichtung), Benachrichtigung per E-Mail, Frist zur Antwort (z. B. 7 Tage), sonst Nachrücker.
- Versand (weltweit, wer trägt Zoll/Steuern) und Gutscheineinlösung.
- Datenschutz (Zweck, Speicherdauer, Widerruf), Ausschluss von Mitarbeitern und Fake-Teilnehmern, Haftung, Plattformhinweis, Änderung/Abbruch, salvatorische Klausel.

## Rechtliche Punkte zum Klären
- Bonuslose für Käufer: Da die Teilnahme für alle kostenlos bleibt, ist das deutlich unkritischer als „nur Käufer“. Trotzdem prüfen lassen (Glücksspielrecht).
- Weltweite Teilnahme: Gewinnspielregeln anderer Länder (z. B. Korea) prüfen.
- Gutschein: Codes eindeutig, nicht übertragbar? Einlösung am Einlass.

## Offen / ❓ unklar
- Gilt die Gewichtung für alle Ziehungen? Oder sind 6.12./13.12./20.12. nur für Käufer (wie früher gesagt) und die Gewichtung gilt nur am 29.11. und 24.12.?
- Faktor 2× oder 3×?
- Muss man Follower sein? (Lässt sich per Formular nicht prüfen; Empfehlung: nicht verlangen.)
- Mindestalter und erlaubte Länder.
- Wer prüft die Bedingungen rechtlich?

## Beschluss 2026-10-24 (Endfassung): Lose
- **Alle Ziehungen** (29.11., 6.12., 13.12., 20.12., 24.12.) für alle: 1 Los, 2 Lose mit Kalenderkauf.
- **Kein Bonus** für Warteliste, CD-Kauf oder Newsletter (Jannik, 24.10.: Warteliste fällt beim Gewinnspiel weg).
- Umsetzung: Brevo/WooCommerce-Etikett „Käufer“, Skript `Gewinnspiel-Tool/ziehung.py` (Standard: Käufer 2, sonst 1), Spalten `email, bestaetigt, kaeufer`.
- Offen für die Kanzlei: Zweites Los für Käufer als Kaufanreiz (Glücksspielrecht). Der DSGVO-Punkt zum Wartelisten-Bonus entfällt.

## Variante B: Kommentar-Verlosung (Erfahrung der Eltern, 2026-10-22)
Quelle: [[2026-10-22_Adventskalender-Nachricht-Mutter-Gewinnspiel]]
- Früher lief es so: Aufruf unter einem YouTube-Video („kommentiert, am Tag X wird verlost, unter allen, die kommentiert und abonniert haben“). Bei der Ziehung wurde die Video-Adresse in ein Kommentar-Auswahl-Tool eingegeben, das einen Kommentar zufällig zog, und alles lief live im Stream.
- Vorteil: bekannt, einfach, keine E-Mail-Adressen vorab nötig. Kontaktdaten (Anschrift) braucht man erst vom Gewinner.
- Einschränkung: Kommentare lassen sich nicht den Käufern zuordnen (der Shop kennt die E-Mail, YouTube nur den Anzeigenamen). Eine Gewichtung für Käufer geht damit nicht.
- Richtig ist der Hinweis zum Datenschutz: E-Mail-Adressen aus dem Gewinnspiel dürfen nur dafür genutzt werden. Für Newsletter/Funnel braucht es eine eigene, freiwillige Einwilligung.
- Vorschlag (noch nicht entschieden): **29.11. öffentlich per Kommentar**, **6./13./20.12. nur Käufer**: Teilnahme per Button im Kalender (der Zugang kennt den Käufer schon, keine neuen Daten, Ziehung aus der Käuferliste). Dann braucht es keine Gewichtung. Gewichtung nur, falls die Ziehung am 24.12. für alle offen sein soll.
- Offen: Welches Tool nutzten die Eltern? Wurde das Abonnement geprüft und wie? Welche Plattform für die Dezember-Ziehungen?

## Verknüpft mit
- [[Adventskalender-Planung]]
- [[2026-10-22_Adventskalender-Nachricht-Mutter-Gewinnspiel]]
- [[Adventskalender-Zeitplan]]
