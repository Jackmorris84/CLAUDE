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

## Vorschau, Training, Kosten (2026-10-30)
Quelle: Testlauf mit dem echten System-Prompt (gpt-4o-mini) + CodeWords-Doku "Cost, Pricing & Limits".
- Dialog "Wo seid ihr / offen?" → Adresse + "heute bis 18:00".
- Dialog "Preis schneiden+färben?" → keine Preise erfunden, Verweis auf Tel./Website.
- Dialog Termin → fragt Name/Leistung/Datum/Zeit ab, speichert Anfrage (Freitag 15:00, Damenschnitt), Salon bestätigt noch.
- Training: kein Training, nur System-Prompt (Salon-Infos) + Gesprächsverlauf pro Kunde (1 Std. Kontext, 2 Std. Speicher). Wissen erweitern = Defaults in `POST /` ändern.
- Credits: ja. 1 Credit = 1 USD. Compute ca. $0.00046/Sek. + LLM-Tokens. Grobe Schätzung ❓ unklar: ca. 0,2–0,5 Cent pro Kundennachricht, nicht gemessen.
- Pläne: FREE 5 Credits einmalig/100 Runs; PRO $39/Monat; Business $100/Monat.
- Limit: Absendernummer +447424366129 hat Tageslimit für Antworten (FREE 5, PRO 20, MAX 50 pro Tag). Für echten Salonbetrieb eher eigene Nummer (Personal Device, kein Limit) nötig – noch nicht umgesetzt.
