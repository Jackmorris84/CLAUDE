---
titel: "Adventskalender – Verkauf und Zugang über den eigenen Shop"
typ: wissen
thema: [Adventskalender, Shop, Zahlung]
quelle: "Jannik, Chat 2026-10-22"
erstellt: 2026-10-22
status: roh
entscheidung: offen
tags: [adventskalender, shop, zahlung]
---
## Kernaussage
Der Adventskalender wird über den Shop verkauft, nicht über Digistore (Entscheidung Jannik, 2026-10-22). Die Digistore-Recherche ist nach `90_Archiv/` verschoben. Welches Shop-System der Shop nutzt, ist noch ❓ unklar.

## Entschieden
- Zahlung und Verkauf: eigener Shop (https://shop.davids-panparadies.de, laut Notion).
- Preis: 25 € Early Bird bis 15.11., danach 29 €. Zugang per Mail-Link (unverändert).

## Was sich dadurch ändert
- Die geplante Anbindung über Digistore-Aufrufe (IPN) entfällt. Stattdessen braucht der kleine Server die Bestellungen aus dem Shop (Webhook oder Export).
- Gebühren, Auszahlung und Umsatzsteuer hängen vom Zahlungsanbieter des Shops ab, nicht mehr von Digistore. Die frühere Rechnung (ca. 18 €/21 € pro Verkauf) gilt nicht mehr.
- Vorteil: Der 40-%-CD-Rabatt am 20.12. und die Käuferliste für Gewinnspiele liegen im selben System.
- Digistore-Hinweise zu Widerruf/Lieferung entfallen. Eigene Shop-Bedingungen für digitale Inhalte mit späterer Freischaltung müssen den Verkauf vor dem 1.12. abdecken.

## Offen / ❓ unklar
- Shop-System: **WooCommerce** (Jannik, 24.10.). Zu klären: Bestellungen per Webhook/Plugin abrufbar? Brevo-Anbindung für WooCommerce prüfen (❓ nicht nachgeprüft). Der Shop ist unter shop.davids-panparadies.de erreichbar. Jannik: Der Shop kann nach dem Kauf auch eine Mail versenden (22.10.).
- Kann der Shop digitale Produkte verkaufen und nach dem Kauf eine Mail mit Link senden? Webhook/Export der Käufer?
- Welche Zahlungsarten und Gebühren, weltweiter Verkauf (Korea)?
- Early-Bird-Preis zeitgesteuert bis 15.11. (Aktion/Gutschein) möglich?
- Rückerstattungen: Zugang sperren, wer macht das?
- Umsatzsteuer für digitale Produkte ins Ausland (Steuerberatung).

## Verknüpft mit
- [[Adventskalender-Planung]]
- [[Adventskalender-Seite-Prototyp]]
- [[Adventskalender-Recherche-Digistore]] (archiviert in 90_Archiv)
