---
titel: "Vercel (Free) als Hosting für den WhatsApp-Agenten?"
typ: wissen
thema: [vercel, hosting, kosten, whatsapp]
quelle: "Vercel Fair-Use-Doku (https://vercel.com/docs/limits/fair-use-guidelines), Meta-Preisseite (https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing), respond.io (https://respond.io/blog/whatsapp-pricing-change-2026); Websuche 2026-10-30"
erstellt: 2026-10-30
status: roh
entscheidung: offen
tags: [kosten, hosting]
---
## Kernaussage
Technisch geht der Agent auf Vercel, aber "gratis" stimmt nicht: Hobby ist nur für nicht-kommerzielle Nutzung, und WhatsApp-Anbindung, KI und Speicher brauchen weitere Bausteine.

## Details
- Vercel Hobby (kostenlos) = laut Fair-Use-Regeln nur persönlich/nicht-kommerziell. Ein Agent für einen zahlenden Salon ist kommerziell → Pro, ca. 20 $/Monat pro Nutzer.
- Vercel hostet nur den Code (Webhook-Funktion). Zusätzlich nötig: WhatsApp Business Platform (Meta Cloud API, eigener Meta-Business-Account pro Salon), KI-API (Kosten pro Nutzung, Cent-Bereich), Speicher für Gesprächsverlauf und Terminanfragen.
- WhatsApp-Preise: Antworten im 24-Stunden-Fenster waren bisher frei; für 1.10.2026 wird eine Änderung berichtet, Quellen widersprechen sich. ❓ unklar: aktuelle Meta-Preise direkt bei Meta prüfen.
- ❓ unklar: ob die Salon-Nummer gleichzeitig in der normalen WhatsApp-App weiterlaufen kann (muss bei Meta geklärt werden).
- Aktueller Agent läuft auf CodeWords (Pro 39 $/Monat, nicht 60 €; enthält 60 $ Credits). Umbau auf Vercel = Neuentwicklung, nicht Umzug.
- Vergleich Kosten Einzelsalon: CodeWords Pro 39 $ vs. Vercel Pro 20 $ + KI + ggf. WhatsApp-Gebühren → kaum Ersparnis. Lohnt sich eher bei mehreren Salons.
- Empfehlung: Pilot mit Gino auf CodeWords, Vercel erst prüfen, wenn mehrere Salons laufen.

## Wann brauche ich das?
- Bei der Entscheidung über Hosting und Preisgestaltung gegenüber Salons.

## Verknüpft mit
- [[WhatsApp-Agent-Checkliste-Start]]
- [[WhatsApp-Agent-Pitch-Seite]]
