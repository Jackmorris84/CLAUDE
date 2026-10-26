---
titel: "Adventskalender – Nachtplan: Arbeitspakete, die Claude über Nacht erledigt (Plan vor dem Goal-Befehl)"
typ: wissen
thema: [Adventskalender, Planung, Arbeitspakete, Automatisierung]
quelle: "Jannik, Chat 2026-10-26 (Auftrag: schnellster Weg durch die Excel-Liste); Google Sheet Gesamtplan"
erstellt: 2026-10-26
status: roh
entscheidung: offen
tags: [adventskalender, nachtplan, goal, arbeitspakete]
---
## Kernaussage
Claude kann über Nacht den **Schreib-, Skript- und Vorbereitungsteil** der Liste erledigen (Texte, Mails, Posts, SEO, Skripte, Storyboards, Tabellen, Code). Das Ergebnis sind **fertige Entwürfe im Vault**, die Jannik morgens in einer Stunde prüft, freigibt und veröffentlicht. Claude veröffentlicht, sendet und kauft nichts. **Videoschnitt** ist nur möglich, wenn die Rohvideos in Claudes Umgebung gelangen (❓ Test nötig). Der Verkaufsstart am Do 29.10. hat Vorrang: Alles dafür muss bis **Di 27.10. früh** als Entwurf vorliegen.

## Was Claude über Nacht kann und was nicht
| Kann (ohne Mensch) | Kann nur mit Material von Jannik | Kann nicht |
|---|---|---|
| Texte, Mails, SEO, Posts, Skripte, Storyboards, Anzeigentexte, Pressemitteilung, Checklisten | Newsletter Altliste (Konzerttext), Teilnahmebedingungen (Länder, Zeit), Geschichten-Skripte (Davids Inhalte), Songtabelle fertigstellen (Liedliste) | Auf Konten einloggen, posten, Mails versenden, kaufen, bezahlen |
| Code: Kalenderseite, Käufer-Export, Ziehungs-Skript, Gutschein-Vorlage | Bilder/Clips mit Higgsfield (Guthaben und Budget freigeben ❓) | Rechtsberatung (nur Briefing, Checklisten) |
| Entwürfe in Gmail ablegen (nur Entwürfe), Kalendereinträge | Videoschnitt mit ffmpeg: nur, wenn Rohvideos erreichbar sind ❓ (ffmpeg ist installiert) | Homepage öffnen (Netzwerk blockiert), Davids Stimme/Sätze erfinden |

## Ablauf in 4 Schritten
1. **Heute Abend, ca. 30 Min: Übergabe-Paket** (siehe unten). Jannik schickt alles in einer Nachricht.
2. **Goal-Befehl:** Jannik gibt ihn, danach arbeitet Claude die Pakete in der Reihenfolge unten ab (parallel in mehreren Arbeitssträngen, wo möglich).
3. **Über Nacht:** Jedes Paket landet als Notiz im Vault (`10_Aufbereitet/Adventskalender-Paket-…`), Status im Sheet auf „in Arbeit“ mit Notiz „Entwurf fertig, prüfen“. Fällt die Sheets-Verbindung aus, trägt Claude den Stand morgens nach. Ein Protokoll `Adventskalender-Nachtprotokoll-2026-10-27` listet alles Erledigte, offene ❓ und Fehler.
4. **Morgen, ca. 60 Min: Prüfen und freigeben.** Jannik liest, korrigiert, gibt frei und veröffentlicht (Brevo, Shop, Social). Claude arbeitet Korrekturen ein.

## Übergabe-Paket (Jannik liefert, damit Claude nichts raten muss)
1. **Liedliste** (alle Lieder, Reihenfolge, Playback eigen oder Dritte). Sheet Nr. 11, 25.
2. **Konzertseiten-Text 2027** (Daten, Orte), kopiert in den Chat. Nr. 12, 14.
3. **Stichwort** für die Kommentare: Advent oder Adventskalender. Nr. 157.
4. **Link zur Datenschutzerklärung** und Impressum-Link.
5. **Brevo-Absender** (Name, Adresse). Nr. 19.
6. **Shop-Angaben:** Produkt-URL (oder geplante), Zahlarten (PayPal), Widerrufs-/AGB-Seite. Nr. 26, 27.
7. **Entscheidungen:** ManyChat gekauft? (Nr. 166); Zugangssystem Plugin oder Server (Nr. 17: was?); Budget für Werbung und Higgsfield. Nr. 24, 30.
8. **Davids Eckdaten für Geschichten** (je 2–3 Stichworte zu den 10 Themen, auch als Sprachnachricht-Text). Nr. 33. Ohne sie schreibt Claude nur Vorlagen mit ❓.
9. **Rohvideos (nur wenn Schnitt gewünscht):** 1 kurzer Testclip (unter ca. 50 MB) in Google Drive und den Link schicken. Claude testet damit, ob Download und Schnitt klappen. Dazu: welche Clips sind für Teaser freigegeben (Nr. 29).
10. **Korea:** Antwort der Mutter zu Herrn Lee (Nr. 163), Name/Kontakt der Übersetzerin falls vorhanden (Nr. 64).

## Arbeitspakete in Reihenfolge (Priorität: alles für Do 29.10. zuerst)
| # | Paket | Sheet-Nr. | Ergebnis (morgens im Vault) | braucht aus Übergabe |
|---|---|---|---|---|
| 1 | **Verkaufsstart-Paket** | 35, 36, 37, 47, 49, 46 | Produkttext Shop, Shop-Hinweise (Start 1.12., später Käufer), Bestellmail mit Zugangslink, Mail 2 in zwei Fassungen, Mail 3 Verkaufsstart, Testkauf-Checkliste, Landingpage-Text mit Kaufen-Button | 5, 6 |
| 2 | **Reel- und Launch-Posts** | 40, 51, 60, 62, 63, 157 | Reel-Beschreibung final, Ankündigungs- und Launch-Posts für Instagram, TikTok, Facebook, YouTube-Community, YouTube-Beschreibung und angepinnter Kommentar, WhatsApp-Text, jeweils DE und EN | 3, 4 |
| 3 | **Newsletter Altliste** | 48, 57 | Fertiger Newsletter mit Konzerten 2027 und Kalender, Betreff-Varianten | 2, 5 |
| 4 | **SEO und Landingpage** | 37 | SEO-Texte (Titel, Beschreibung, Überschriften, FAQ, Schema-Markup-Vorschlag) für Warteliste- und Kalenderseite, Keyword-Liste (Weihnachtsmusik, Panflöte, Adventskalender digital), ❓ Recherche mit vidIQ | – |
| 5 | **Mail-Serie bis Weihnachten** | 90, 98, 107, 124, 125, 130, 152 | Alle Brevo-Mails mit Betreff, Vorschautext, Versandtag; Türchen-Hinweise wöchentlich | 5 |
| 6 | **Werbung** | 61, 99, 100, 105, 123, 132, 133, 141, 150, 79 | 10 Anzeigentexte DE (Meta, YouTube), Countdown-Posts, Dezember-Content-Kalender mit 24 Tagesposts, Pressemitteilung, Hashtag-Listen | 7 |
| 7 | **Produktion** | 53, 54, 94, 33 | Skript „Brief an die Zuschauer“, Storyboards und Prompts für die 4 Musikvideos, Skriptvorlagen für 10 Geschichten, 3 neue Formate | 1, 8 |
| 8 | **Video-Vorbereitung** | 50, 80, 91, 96, 162 | Schnittlisten (Timecodes) für 10 Teaser-Clips und Reels, Untertitel-Texte Deutsch/Englisch, Thumbnail-Konzepte; **Schnitt mit ffmpeg, wenn Test mit dem Clip klappt** | 9 |
| 9 | **Technik** | 81, 116, 110, 93, 121 | Kalenderseite (echte Version aus dem Prototyp), Käufer-Export und Ziehungs-Skript fertig getestet, Teilnahmeformular-Text, Konzert-Gutschein-Vorlage, Ziehungsprotokoll-Vorlage | 6, 7 |
| 10 | **Recht-Vorbereitung** | 41, 42, 52, 59, 70, 165 | Briefing für Kanzlei final, Datenschutz-Textbausteine (ManyChat, Brevo, Pixel), AGB-/Widerrufs-Checkliste, Teilnahmebedingungen mit allen Platzhaltern | 4, 7 |
| 11 | **Korea und USA** | 72, 89, 114, 134, 135 | Englische Landingpage und Mails, koreanischer Entwurf (Übersetzerin prüft), Anzeigentexte EN/KO | 10 |
| 12 | **Songtabelle und GEMA** | 20, 21, 25, 69 | Songtabelle mit Liedliste, Mail-Entwürfe an GEMA und Labels (als Gmail-Entwurf) | 1 |

## Arbeitsregeln für die Nacht
- Nichts veröffentlichen, versenden, kaufen oder löschen. Gmail nur als Entwurf.
- Nichts erfinden: Persönliches zu David nur aus Quellen, sonst ❓. Preise, Rechtliches, Zahlen immer prüfbar kennzeichnen.
- Jede Notiz nach Vorlage (Frontmatter, ❓ unklar, Verknüpft mit). Sheet bleibt Maßstab. Nach jedem Paket Commit und Push auf `ccr-496f7d69-4yrxxr`.
- Reihenfolge einhalten, Pakete 1–3 vor allen anderen. Blockiert ein Paket (fehlende Eingabe), Platzhalter setzen, im Nachtprotokoll vermerken, weitermachen.
- Kosten: Higgsfield-Guthaben nur nach Janniks Freigabe, mit Obergrenze ❓.

## Risiken
- Verbindungen (Sheets, Gmail) können nachts abbrechen. Der Vault ist die Quelle, das Sheet wird morgens nachgezogen.
- Ohne Übergabe-Paket entstehen Platzhalter statt fertiger Texte.
- Videoschnitt ist unsicher (Dateizugang, Größe). Fallback: Schnittlisten für Videoagent.
- Rechtliches bleibt Entwurf. Veröffentlichung erst nach Prüfung.

## Goal-Befehl (Vorschlag für Jannik)
„Arbeite die Pakete 1–12 aus `Adventskalender-Nachtplan-Arbeitspakete` der Reihe nach ab, speichere jedes Ergebnis im Vault, trage den Stand ins Sheet ein und schreibe am Ende `Adventskalender-Nachtprotokoll-2026-10-27`. Veröffentliche und versende nichts.“

## Verknüpft mit
- [[Adventskalender-Gesamtplan]]
- [[Adventskalender-Tagesplan]]
- [[Adventskalender-Status-und-ToDos]]
- [[Adventskalender-Reel-Skript-Hook]]
