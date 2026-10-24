---
titel: "Adventskalender – Launch: Warteliste und Verkauf (Checkliste)"
typ: wissen
thema: [Adventskalender, Launch, Shop, Warteliste]
quelle: "[[2026-10-24_Adventskalender-Beschluss-Verkauf-und-Warteliste]], [[Adventskalender-Warteliste-Prinzip]], [[Adventskalender-Shop-Zahlung]]"
erstellt: 2026-10-24
status: roh
entscheidung: offen
tags: [adventskalender, launch, shop, warteliste, checkliste]
---
## Kernaussage
Verkauf und Warteliste starten **sofort bzw. nächste Woche**, nicht erst Anfang November. Der Kalender wird schon vor Fertigstellung verkauft (Vorverkauf, Start der Türchen am 1.12.). Die Warteliste bleibt als „Erinnere mich“-Option. Early Bird 25 € bis 15.11., ab 16.11. 29,99 € (bestätigt).

## Beschluss (Jannik, 2026-10-24)
- Anfang November als Verkaufsstart ist zu spät.
- Warteliste bleibt. Gekauft wird direkt im Shop.
- Early Bird bis 15.11., ab 16.11. 29,99 €.

## Vorschlag Termine
- **Jetzt bis Mi 28.10.:** Landingpage + Warteliste öffentlich, Teaser-Posts.
- **Spätestens Do 29.10.:** Kaufen-Button im Shop live (dann 17 Tage Early Bird).
- **Fr 30.10.:** Newsletter an die Altliste mit Konzerten 2027 und Hinweis auf den Kalender.
- **Mi 11.11. / Fr 13.11. / So 15.11.:** Erinnerungs-Mails „Early Bird endet“.
- **Mo 16.11.:** Preis 29,99 €.

## Was für die Warteliste nötig ist
Schon da: Seite freigeschaltet, Brevo-Liste (laut Jannik 24.10.).
- [ ] Anmeldeformular mit **Bestätigungslink** (Double-Opt-In) in Brevo prüfen
- [ ] Einwilligungstext und Link zur Datenschutzerklärung am Formular (mit Hinweis auf Brevo)
- [ ] Bestätigungsmail und Willkommensmail (Inhalt: was ist der Kalender, Termine, Preis, Early-Bird-Frist)
- [ ] Landingpage-Text (Titel, Nutzen, Ablauf, Preis, Start 1.12., 24 Videos, Sprachen, Gewinnspiel in einem Satz, FAQ)
- [ ] Teaser-Material (Foto, Ausschnitt eines der gedrehten Videos)
- [ ] Impressum/Datenschutz auf der Seite (Impressum liegt vor)

## Was für den Verkauf im Shop (WooCommerce) nötig ist
- [ ] Produkt „Adventskalender 2026“ (digital/virtuell), Beschreibung, Bild
- [ ] Preis 25 € bis 15.11., danach 29,99 € (WooCommerce kann Aktionspreise zeitlich planen, ❓ bitte im Shop prüfen)
- [ ] Zahlungsarten und Steuer einstellen (❓ welche Zahlungsarten, weltweit?)
- [ ] Hinweis im Shop: Videos starten am 1.12., täglich ein Türchen, spätere Käufer sehen alles rückwirkend
- [ ] AGB, Widerruf und Datenschutz für digitale Inhalte mit späterer Freischaltung (❓ Kanzlei/Händlerbund prüfen lassen)
- [ ] Bestellbestätigungs-Mail mit **persönlichem Zugangslink**
- [ ] Zugangssystem: Wer prüft den Link und schaltet Türchen nach Datum frei? ❓ Plugin (z. B. Mitgliederbereich mit zeitgesteuerten Inhalten) oder eigener kleiner Server (Token). Entscheidung und Umsetzer offen.
- [ ] Rückerstattung: Zugang sperren, Käufer-Los entfällt (Gewinnspiel)
- [ ] Käufer in Brevo (Etikett „Käufer“) für Erinnerungen und Gewinnspiel

## Brevo-Mails (Vorschlag, Claude schreibt die Texte)
1. Bestätigung (Double-Opt-In)
2. Willkommen + was kommt
3. Verkaufsstart: „Der Kalender ist da, Early Bird 25 €“
4. Erinnerung: „Noch 5 Tage Early Bird“
5. Letzter Tag Early Bird
6. Nach dem Kauf: Danke + Zugangslink + Start 1.12.
7. Vor dem Start: „Morgen öffnet sich Türchen 1“ (Cron-Job auf der Website möglich, noch nicht aktiv)

## Was Claude von Jannik braucht
1. **Verkaufsstart-Datum** bestätigen (Vorschlag: Kaufen-Button spätestens Do 29.10.).
3. **Zugang:** Gibt es schon ein Plugin für Mitgliederbereich/Zeitfreischaltung im WordPress/WooCommerce? Wer hat Admin-Zugang und baut es?
4. **Zahlungsarten** im Shop (PayPal, Karte, …) und ob weltweit verkauft wird.
5. **Landingpage:** Link oder Text der jetzigen Warteliste-Seite, damit ich Texte anpasse.
6. **Brevo:** Ist Double-Opt-In aktiv, welcher Absender?
7. **Sprachen** der Landingpage: erst nur Deutsch, Englisch und Koreanisch später?
8. **Teaser:** Welcher Ausschnitt darf öffentlich? Bei geschützten Liedern („I will follow him“, „Fill my cup, Lord“) erst Rechte klären. „Herbei, oh ihr Gläubigen“ ist vermutlich unkritischer, aber ungeprüft.
9. **Konzert-Daten 2027** für den Newsletter an die Altliste.

## Verknüpft mit
- [[Adventskalender-Planung]]
- [[Adventskalender-Status-und-ToDos]]
- [[Adventskalender-Warteliste-Prinzip]]
