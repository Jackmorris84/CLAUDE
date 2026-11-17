---
titel: "Instagram-Leadgenerator mit Telegram-Bot (Machbarkeit & rechtlich sauberer Weg)"
typ: projekt
thema: [Leadgenerierung, Telegram, Instagram, München]
quelle: "Chat-Anfrage vom 2026-11-17 (Vault vorher geprüft: keine bestehenden Notizen zum Thema)"
erstellt: 2026-11-17
status: roh
entscheidung: offen
tags: [leadgen, telegram, instagram, datenschutz]
---
## Kernaussage
Der Wunsch: Täglich 10 Instagram-Profile per Telegram, gefiltert nach Ü18, München + 1h Umkreis, christlich, Profilbild, Konto >2 Jahre. Als vollautomatischer Scraper/Profiler ist das **nicht umsetzbar bzw. nicht sauber machbar**. Ein halbautomatischer Weg mit freiwilligen Kontakten ist möglich.

## Details
**Warum der Automat so nicht geht**
- ❓ unklar / technisch nicht verfügbar: Alter, Kontoalter und Wohnort stehen bei Instagram nicht öffentlich im Profil. Die offizielle Instagram-API erlaubt keine Suche nach beliebigen Profilen nach Ort/Alter.
- Scraping von Instagram verstößt gegen die Nutzungsbedingungen (Konten-/IP-Sperren, teils Abmahnrisiko).
- **Religion ist eine besondere Kategorie personenbezogener Daten (DSGVO Art. 9).** Private Personen systematisch nach Glauben zu filtern und zu erfassen ist ohne ausdrückliche Einwilligung unzulässig. Dazu kommt: Kalt-Ansprache von Privatpersonen ohne Einwilligung ist nach UWG/DSGVO heikel.

**Sauberer Alternativ-Aufbau (Vorschlag)**
1. Telegram-Bot, der täglich 10 Einträge aus einer **eigenen Lead-Liste** (CSV/Google Sheet) schickt, mit Status (neu / kontaktiert / Treffen / kein Interesse).
2. Quellen der Leads nur **opt-in**: z. B. Kontaktformular/Link in Bio, Instagram-Story-Antworten, Gewinnspiel/Event-Anmeldung, Anfragen über Gemeinden/Kirchen-Kooperationen, Empfehlungen von Bestandskunden.
3. Zielgruppe nur anhand **selbst angegebener** Angaben (Alter, PLZ/Stadt) im Formular filtern; Religion nur, wenn Person sie freiwillig und ausdrücklich angibt (Einwilligung speichern).
4. Treffen am Wochenende: Terminvergabe über Link (z. B. Calendly), Einwilligung dokumentieren.

## Wann brauche ich das?
- Wenn die Entscheidung ansteht, wie die Lead-Quelle aussehen soll, bevor der Bot gebaut wird.

## Verknüpft mit
- [[Second-Brain-Guide]]
