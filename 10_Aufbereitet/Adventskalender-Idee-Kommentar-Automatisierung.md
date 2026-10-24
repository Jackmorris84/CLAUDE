---
titel: "Adventskalender – Idee: Kommentar-Stichwort löst automatische Nachricht mit Link aus"
typ: wissen
thema: [Adventskalender, Werbung, Automatisierung, Warteliste]
quelle: "Jannik, Chat 2026-10-24 (Idee); Einschätzung Claude"
erstellt: 2026-10-24
status: roh
entscheidung: offen
tags: [adventskalender, werbung, instagram, automatisierung, warteliste]
---
## Kernaussage
Jannik-Idee: In Reels steht „Kommentiere ADVENT“. Eine Automatisierung erkennt das Stichwort und schickt dem Kommentierenden automatisch eine Direktnachricht mit dem Link zur Warteliste bzw. zum Kalender. Das ist technisch machbar (Instagram und Facebook), auf YouTube nicht, auf TikTok ❓ unklar. Empfehlung: umsetzen, aber den Link zur Landingpage schicken (Kaufen **und** „Erinnere mich“), nur Name und E-Mail abfragen, keine Adresse.

## Wie es funktioniert
- Tools für „Comment-to-DM“ (Beispiele: ManyChat, ähnliche Anbieter). Sie nutzen die offizielle Meta-Schnittstelle. ❓ Aktuelle Preise und Funktionen vor Anmeldung auf der Anbieterseite prüfen, Claude hat sie nicht geprüft.
- Voraussetzungen Instagram: Konto @daviddoering_ als Business- oder Creator-Konto, mit einer Facebook-Seite verbunden (❓ Ist das bei Davids Konto schon so?). Facebook-Seite DavidsPanfloete kann dasselbe für Facebook-Kommentare.
- Ablauf (Flow): Auslöser = Kommentar mit Stichwort unter bestimmten Reels → automatische Antwort unter dem Kommentar („Ich schicke dir den Link per Nachricht“) → Direktnachricht mit Text und Button zum Link.
- Aufbauzeit grob 1–2 Stunden, plus Test mit einem privaten Konto.

## Regeln und Grenzen
- Meta erlaubt die Antwort per Direktnachricht auf einen Kommentar, solange der Kommentar noch frisch ist (nach meinem Kenntnisstand wenige Tage, eine Nachricht pro Kommentar) ❓ in den Meta-Regeln prüfen.
- Danach keine werbliche Nachfass-Nachricht schicken. Nur der Link, den die Person selbst angefordert hat.
- Die Person muss im Reel klar sehen, was sie bekommt („Kommentiere ADVENT, ich schicke dir den Link zum Adventskalender“).
- **YouTube:** keine Direktnachrichten möglich. Dort nur Link in Beschreibung und angepinntem Kommentar (steht schon im Plan).
- **TikTok:** ❓ unklar, ob Auto-Nachrichten für Davids Konto möglich sind. Dort bleibt der Bio-Link.
- Kommentar-Stichwort ist **keine Gewinnspiel-Teilnahme**. Nicht mit dem Gewinnspiel (Kommentar am 1. Advent) vermischen, sonst wird die Rechtsprüfung komplizierter.

## Was ich anders machen würde als im Vorschlag
1. **Link zur Landingpage, nicht nur zur Warteliste.** Ab Do 29.10. ist der Kalender kaufbar. Die Landingpage hat dann Kaufen-Button und „Erinnere mich“.
2. **Keine Adresse abfragen.** Name und E-Mail reichen für die Warteliste (Datensparsamkeit, mehr Anmeldungen). Die Adresse wird nur bei Kauf oder bei einem Gewinn gebraucht.
3. E-Mail weiter mit Double-Opt-In in Brevo (ist aktiv). Die Direktnachricht-Daten nicht ohne Einwilligung in die Mailingliste übernehmen.
4. Hinweis auf Datenschutz in der Nachricht oder auf der Landingpage verlinken.

## Offene Entscheidungen (Jannik)
- Stichwort: z. B. ADVENT. ❓
- Welche Reels bekommen den Aufruf (neue Teaser, Behind-the-Scenes)? ❓
- Tool wählen und Konto verbinden. ❓
- Soll Claude die Texte schreiben (Reel-Aufruf, öffentliche Antwort, Direktnachricht, DE/EN/KO)? Vorschlag: ja.

## Verknüpft mit
- [[Adventskalender-Warteliste-Prinzip]]
- [[Adventskalender-Landingpage-und-Brevo-Mails-DE]]
- [[Adventskalender-Gesamtplan]]
- [[Kanaele-Links-und-Impressum]]

## Entscheidungen und Antworten (Jannik, 2026-10-24)
- Stichwort: **Advent oder Adventskalender**, eines von beiden. Claude-Vorschlag: im Reel „Adventskalender“ sagen und im Tool beide Wörter als Auslöser eintragen (Tools erkennen mehrere Stichwörter). ❓ Jannik wählt.
- Davids Instagram ist ein **Creator-Konto**, mit **Facebook verbunden**. Voraussetzung ist damit nach Janniks Angabe erfüllt (❓ im Tool prüfen).
- Texte schreibt Claude, zuerst Deutsch. Englisch: ❓ offen, Frage von Jannik, ob ein eigenes englisches Reel oder KI-Übersetzung.
- Aufgaben Nr. 157–161 stehen im Google Sheet (Reel-Texte, Hook-Variante, Tool einrichten, Reel drehen, Reel posten).

## Wie die Automatisierung ohne Laptop läuft
- Das Tool läuft in der Cloud des Anbieters, rund um die Uhr. Es ist mit Davids Instagram-Konto über die offizielle Meta-Anmeldung verbunden. Weder David noch Jannik müssen online sein.
- Einmal einrichten: Konto verbinden → Flow bauen (Auslöser: Kommentar mit Stichwort unter ausgewählten Reels; Aktion 1: öffentliche Antwort; Aktion 2: Direktnachricht mit Link-Button) → mit einem Testkonto prüfen → scharf schalten.
- Ab dann antwortet das Tool innerhalb von Sekunden auf jeden passenden Kommentar. Jannik schaut nur gelegentlich in die Statistik und beantwortet Rückfragen von Menschen selbst.
- ❓ Zu klären: Nachrichten von Nicht-Followern landen oft bei den „Anfragen“. Deshalb unter dem Kommentar der Hinweis „Schau auch bei den Anfragen“.
- Beschluss Jannik (2026-10-24, später): Ziel der Direktnachricht ist die **Warteliste**. Verkauft wird per Mail, die zweite Mail enthält den Kaufen-Button, sobald der Verkauf läuft. Texte: [[Adventskalender-Kommentar-Automatisierung-Texte]].
