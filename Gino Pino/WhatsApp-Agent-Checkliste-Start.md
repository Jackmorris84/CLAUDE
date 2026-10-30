---
titel: "Checkliste: Was braucht der WhatsApp-Agent, um beim Salon zu laufen?"
typ: wissen
thema: [whatsapp, codewords, salon]
quelle: "CodeWords-Doku (Cost/Limits, WhatsApp-Integration), Chat 2026-10-30"
erstellt: 2026-10-30
status: roh
entscheidung: offen
tags: [checkliste]
---
## Kernaussage
Für den Betrieb braucht der Salon: ein CodeWords-Abo, eine WhatsApp-Nummer, eine Info-Datei mit seinem Wissen und einen Weg, Terminanfragen zu sehen.

## Details
1. **Abo:** Pro = **39 $/Monat** (darin 60 $ Credits, also nicht 60 € Gebühr). Start-Empfehlung. Business 100 $ bei viel Verkehr. Free reicht nicht.
2. **Nummer:** Eigene Salon-Nummer verbinden (Personal Device, Kopplung per Code unter WhatsApp → Verknüpfte Geräte, einmalig am Salon-Handy). ❓ unklar: Umbau noch nicht gemacht; Kopplung ist laut Doku Beta.
3. **Info-Datei:** siehe [[WhatsApp-Agent-Info-Fragebogen]]. Ersetzt "Training": Der Agent wird nicht trainiert, er bekommt diese Infos als Anweisung.
4. **Terminanfragen:** Aktuell nur Liste über `GET /bookings`. Besser: Benachrichtigung an den Inhaber (WhatsApp/E-Mail) oder Google-Kalender. ❓ unklar: Wunsch des Salons.
5. **Eigene Nummer = alle Chats:** Agent würde sonst auch private Chats beantworten → Filter nötig (nur unbekannte Kontakte, Übergabe an Mensch, Stichwort wie "Mensch").
6. **Rechtliches:** KI-Hinweis im ersten Satz, Datenschutz (Namen/Telefonnummern werden gespeichert). ❓ unklar: ob Salon Datenschutzerklärung anpassen muss.
7. **Test vor Start:** 1–2 Wochen mit Salonpersonal testen.

## Wann brauche ich das?
- Vor dem Gespräch mit dem Salon und beim Umbau auf die eigene Nummer.

## Verknüpft mit
- [[WhatsApp-Agent-Haarstudio-Gino-Pino]]
- [[WhatsApp-Agent-Pitch]]
