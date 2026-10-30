---
titel: "WhatsApp-Agent Haarstudio Gino + Pino (CodeWords)"
typ: wissen
thema: [whatsapp, codewords, automatisierung]
quelle: "Chat-Auftrag 2026-10-30; CodeWords-Template whatsapp_business_receptionist"
erstellt: 2026-10-30
status: roh
entscheidung: offen
tags: [agent, buchung]
---
## Kernaussage
WhatsApp-Agent für das Haarstudio Gino + Pino (Marktstraße 11, 51643 Gummersbach) auf CodeWords deployt: beantwortet Kundenfragen und nimmt Terminanfragen auf.

## Details
- Service-ID: `haarstudio_whatsapp_agent_2cd4968f` (private), Projekt: https://codewords.agemo.ai/projects/haarstudio_whatsapp_agent_2cd4968f
- Basis: Template `whatsapp_business_receptionist`, Absendernummer +447424366129 (Tageslimit je Plan beachten).
- Kundennummer wird über `POST /` registriert (nur `phone_number` nötig, Salon-Infos als Defaults).
- Buchungen (Name, Leistung, Datum, Uhrzeit, Telefon, Status pending) landen in Redis, abrufbar über `GET /bookings`.
- Bekannt: Tel. 02261 27440, www.haarstudio-pino.de, 4,6 Sterne (150), heute bis 18:00.
- ❓ unklar: Öffnungszeiten, Leistungen, Preise – Agent verweist darauf ans Telefon/Website.
- ❓ unklar: Nicht end-to-end mit echter WhatsApp-Nachricht getestet.

## Wann brauche ich das?
- Bei Anpassung oder Erweiterung des Agenten (Preise, Zeiten, Kalender-Anbindung).

## Verknüpft mit
- [[Second-Brain-Guide]]
