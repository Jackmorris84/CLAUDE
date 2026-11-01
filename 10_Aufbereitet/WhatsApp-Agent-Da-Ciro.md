---
titel: "WhatsApp-Agent für Da Ciro (CodeWords)"
typ: wissen
thema: [whatsapp, codewords, friseur]
quelle: "Chat-Auftrag + CodeWords-Template whatsapp_business_receptionist; Salon-Daten aus Google-Eintrag (Screenshot)"
erstellt: 2026-11-01
status: roh
entscheidung: offen
tags: [agent, whatsapp]
---
## Kernaussage
WhatsApp-Agent für Da Ciro (Rheinstraße 8, St. Goarshausen) beantwortet Kundenfragen auf Deutsch und nimmt Buchungsanfragen auf. Deployt als CodeWords-Service `da_ciro_whatsapp_agent_17886f52` (public).

Link: https://codewords.agemo.ai/run/da_ciro_whatsapp_agent_17886f52

## Details
- Basis: Template `whatsapp_business_receptionist`, Modell gpt-4o-mini, 1h Gesprächsgedächtnis (Redis).
- Hinterlegt: Adresse, Telefon 06771 599850, Planity-Buchungslink, Öffnungszeiten nur "Di ab 09:00".
- Buchung: Agent sammelt Name, Leistung, Wunschtermin, Telefon und verweist auf Planity/Telefon; behauptet nie eine verbindliche Buchung.
- Aktivierung: Link öffnen, WhatsApp-Nummer eintragen (Format 491701234567); Kunden schreiben dann an +447424366129 (CodeWords-Nummer).
- ❓ unklar: Preise, Leistungen und vollständige Öffnungszeiten (nicht in den Quelldaten, bewusst nicht erfunden).
- ❓ unklar: Tageslimit je Plan (FREE 5 DMs/Tag), Personal-Device-Anbindung wäre unbegrenzt.

## Wann brauche ich das?
- Beim Anpassen/Erweitern des Agenten oder bei Fragen zur Aktivierung.

## Verknüpft mit
- [[Second-Brain-Guide]]
