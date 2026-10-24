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
- Beschluss Jannik (2026-10-24): **Ein deutsches Reel und ein Reel mit englischen Untertiteln** (gleiche Aufnahmen). Koreanisch: ein Reel mit koreanischer Übersetzung (Untertitel) kommt dazu, sobald Jannik mit seiner Mutter den Stand bei Herrn Lee geklärt hat. Sheet Nr. 162–164.

## Technik einfach erklärt (Frage von Jannik, 2026-10-24)
1. David (oder Jannik) erlaubt dem Tool einmalig den Zugriff auf Davids Instagram-Konto über die offizielle Meta-Anmeldung („Mit Instagram verbinden“). Das Tool bekommt dabei einen Schlüssel (Token). Das Passwort bekommt es nicht.
2. Instagram meldet jeden neuen Kommentar sofort an das Tool (Webhook, wie eine automatische Benachrichtigung).
3. Das Tool prüft: Steht das Stichwort drin, und gehört der Kommentar zu einem Reel, das im Ablauf eingetragen ist?
4. Wenn ja, schickt das Tool über die offizielle Instagram-Schnittstelle eine „private Antwort“ auf diesen Kommentar. Die Nachricht kommt vom Konto @daviddoering_, so als hätte David sie geschickt. Zusätzlich schreibt es die öffentliche Antwort unter den Kommentar.
5. Das passiert auf den Servern des Tools, nicht auf Davids Handy oder Laptop. Es ist erlaubt, weil die Person durch ihren Kommentar um die Nachricht gebeten hat.
- Grenzen: nur auf Kommentare, nach meinem Kenntnisstand eine Nachricht je Kommentar und nur kurz nach dem Kommentar. ❓ Regeln von Meta und Tool prüfen. Die Verbindung kann ablaufen, dann muss man sich im Tool neu anmelden.

## Welche Tools gibt es? (Websuche 2026-10-24, nicht beim Anbieter geprüft)
- **ManyChat**: bekanntestes Tool, US-Firma, Preis laut Ratgeber ab ca. 15 $/Monat, Abrechnung nach Anzahl der Kontakte. Quelle: https://ki-spot.de/manychat-alternative/
- **LinkDM, InstantDM**: reine Kommentar-zu-Direktnachricht-Tools. **Chatfuel, Inrō**: mehr Funktionen für Instagram. **DM Champ**: ab ca. 59 $ einmalig, laut Ratgeber. Quelle: https://www.inro.social/blog/manychat-competitors-alternatives
- **Chatarmin, Superchat**: nach einem Ratgeber mit Servern in der EU, Superchat ab ca. 89 €/Monat. ❓ nur eine Quelle, beim Anbieter bestätigen.
- Datenschutz: Bei US-Tools Auftragsverarbeitungsvertrag (AVV) abschließen und die Datenschutzerklärung anpassen. ❓ Rechtsprüfung (Nr. 41/42 im Sheet) soll das mit abdecken.
- Meta-Einschränkung: Außerhalb eines offenen Gesprächsfensters sind Nachrichten begrenzt, kein Tool kann Zustellung garantieren.
- Empfehlung Claude: Mit einem günstigen Kommentar-zu-DM-Tool starten (ManyChat oder LinkDM), AVV prüfen, Testlauf mit einem privaten Konto. ❓ Entscheidung Jannik.

## Geht es kostenlos? (Websuche 2026-10-24, nicht beim Anbieter geprüft)
- ManyChat hat einen Gratisplan. Quellen widersprechen sich: Ältere Angaben nennen 1.000 Kontakte, neuere (Preisumstellung März 2026) nur **25 aktive Kontakte**. Jeder Kommentar, der den Auslöser trifft, zählt als Kontakt. Bei Erreichen des Limits stoppt der Versand. Quellen: https://www.replyrush.com/post/manychat-free-plan-changes-explained, https://www.jupiter.co/blog/manychat-for-food-bloggers-worth-it-2026, https://chatarmin.com/blog/manychat-preise
- Konsequenz: Gratis reicht nur zum Testen. Für die Aktion (mehrere hundert Kommentare) ist ein bezahlter Monat nötig, Größenordnung ab ca. 15 $/Monat. ❓ Aktuellen Preis im Konto unter Settings > Billing prüfen.
- Kostenlose Handarbeit als Notlösung: Link in der Bio, angepinnter Kommentar mit Hinweis, Kommentare von Hand mit gespeicherten Antworten beantworten (❓ Funktion im Instagram-Postfach prüfen). Das kostet Zeit, die Jannik nicht hat.
- Empfehlung Claude: Nur einen Monat bezahlen, solange die Reels laufen (Ende Oktober bis Mitte November), danach kündigen. ❓ Entscheidung Jannik.

## Empfehlung Tool (Claude, 2026-10-24) – ❓ Entscheidung Jannik offen
**ManyChat für einen Monat.** Gründe: verbreitet (viele Anleitungen), Instagram und Facebook in einem Tool, AVV wird angeboten, monatlich kündbar, keine Programmierung. Wechsel auf ein EU-Tool (Chatarmin, Superchat) nur, wenn die Rechtsprüfung die US-Übermittlung als Problem sieht. LinkDM/InstantDM nur, wenn ManyChat im Test nicht funktioniert oder zu teuer ist. Vor dem Zahlen: Gratis-Testlauf, Preis im Konto prüfen.
