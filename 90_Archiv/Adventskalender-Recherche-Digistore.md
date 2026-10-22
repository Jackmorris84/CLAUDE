---
titel: "Adventskalender – Recherche Digistore24 (Zugang, Gebühren, Anbindung)"
typ: wissen
thema: [Adventskalender, Digistore, Technik]
quelle: "Websuche 2026-10-17 (Digistore24-Hilfe/Dev-Seiten über Suchergebnisse; die Seiten selbst waren aus der Umgebung nicht abrufbar)"
erstellt: 2026-10-17
status: archiviert
entscheidung: verworfen
tags: [adventskalender, digistore, recherche]
---
> ⚠️ Archiviert 2026-10-22: Der Verkauf läuft über den eigenen Shop, nicht über Digistore. Diese Recherche gilt nicht mehr. Nur zur Nachvollziehbarkeit aufbewahrt.

## Kernaussage
Digistore24 kann nach jeder Zahlung einen Aufruf (IPN/Webhook) an einen eigenen Server schicken. Damit lässt sich pro Käufer ein persönlicher Zugangslink erzeugen und bei Rückerstattung wieder sperren. Gebühren: 7,9 % + 1 € pro Verkauf auf den Bruttopreis. Alles hier ist aus Suchergebnissen, nicht aus dem Konto geprüft.

## Details
- **Gebühr:** 7,9 % + 1 € pro Transaktion, berechnet auf den Bruttopreis ([Hilfe](https://help.digistore24.com/hc/en-us/articles/23694504392721), [Rechner](https://www.digistore24.com/extern/calculator/iframe/de)).
  - 25 € Early Bird: ca. 2,98 € Gebühr. 29 €: ca. 3,29 €.
  - Danach zieht Digistore laut Hilfebeispiel die Umsatzsteuer ab (19 % auf 25 € = ca. 3,99 €; auf 29 € = ca. 4,63 €). Dann bleiben ca. **18 €** (bei 25 €) bzw. ca. **21 €** (bei 29 €) pro Verkauf. ❓ Rechnung gilt nur bei normaler Umsatzsteuer; Steuerberater fragen.
- **Auszahlung:** Quellen widersprechen sich (10 % Sicherheitseinbehalt, Auszahlung frühestens nach ca. 14 Tagen; anderes Beispiel nennt 60 Tage). ❓ Im Verkäuferkonto prüfen. Wichtig für das Budget vor Dezember.
- **IPN/Webhook:** Einstellungen → Integrationen (IPN) → neue Verbindung → „Webhook“ oder „Generic“ ([Hilfe](https://help.digistore24.com/hc/en-us/articles/23823900323601), [Dev](https://dev.digistore24.com/hc/en-us/articles/32480217565969)).
  - Jede Transaktion löst einen eigenen Aufruf aus.
  - Aufrufe sind mit einer Passphrase signiert (SHA512). Der Server muss die Signatur prüfen und mit „OK“ antworten.
  - Ereignisse: payment, refund, chargeback, payment_missed u. a. Wichtig für uns: Zahlung = freischalten, Rückerstattung/Chargeback = sperren.
  - Genaue Feldnamen: im offiziellen [IPN-Guide (PDF)](https://www.digistore24.com/download/ipn/examples/ipn/digistore_ipn.pdf) nachlesen, bevor wir bauen.
- **Danke-Seite:** Digistore kann nach dem Kauf auf eine eigene Seite weiterleiten und hängt dabei Parameter an (order_id, buyer_email, product_id und eine Signatur).
- **Lieferung:** Digistore verschickt die Bestellbestätigung per E-Mail. Dateien lassen sich über den „Download-Tresor“ ausliefern. Für Online-Kurse ist eine IPN-Anbindung an ein Mitgliederbereich-Tool vorgesehen.
- **Mailtool-Anbindung:** z. B. KlickTipp über IPN. Kontakte kommen mit Tags für Zahlung, Rückbuchung, Chargeback. Bei KlickTipp hängt die Zahl verknüpfbarer Produkte vom Tarif ab ([KlickTipp](https://www.klicktipp.com/support/knowledge-base/digistore24-integration/) laut Suche).
- **Käufer-AGB:** § 7 Widerrufsrecht, § 8 Lieferung. Wurden nicht gelesen. ❓ Prüfen, wie Digistore Vorverkauf/späte Lieferung digitaler Inhalte behandelt (Freischaltung erst ab 1.12.).

## Vorschlag Umsetzung
1. Digistore-Produkt „Adventskalender 2026“ mit Preis 25 € (Early Bird bis 15.11.), danach 29 €.
2. IPN → kleiner Server (z. B. serverless Funktion): bei Zahlung Token erzeugen, Käufer in der Zugangsliste speichern, Mail mit persönlichem Link senden; bei Rückerstattung Token sperren.
3. Kalender-Seite prüft Token serverseitig und liefert nur die bis heute freigeschalteten Videos aus.
4. Käufer zusätzlich ins Mailtool (Tag „Käufer“) für Funnel und Gewinnspiel-Gewichtung.
Die Seite im Ordner `Adventskalender-Seite/` hat die Freischaltung bisher nur auf Browser-Seite. Das ist nur ein Prototyp und nicht sicher.

## Offen / ❓ unklar
- Digistore-Konto vorhanden und freigeschaltet (Prüfung der Verkäufer-Identität dauert)?
- Wer baut den kleinen Server (Zugangsliste, Mail)?
- Einbehalt/Auszahlung, Umsatzsteuer, Early-Bird-Vorverkauf.

## Verknüpft mit
- [[Adventskalender-Planung]]
- [[Adventskalender-Seite-Prototyp]]
- [[Adventskalender-Shop-Zahlung]]
