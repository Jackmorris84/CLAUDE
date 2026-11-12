---
titel: "Missionars-App – Expertenreview und Zielbild"
typ: projekt
thema: [Missionars-App, Produktkonzept, Architektur, Datenschutz]
quelle: "Eigene Analyse im Chat (Expertenreview) auf Basis des Konzepts von Jannik; kein externes Material. Preis-/Rechtsangaben vor Entscheidung prüfen."
erstellt: 2026-11-11
status: roh
entscheidung: offen
tags: [app, konzept, review, dsgvo, mvp]
---

## Kernaussage
Das Konzept ist fachlich stark und hat eine klare Haltung (Mensch vor Datensatz, Vorschläge statt Automatismen). Es ist aber für eine erste Version zu groß und hat drei echte Schwachstellen: eine vermischte Ampel-Logik, eine hohe tägliche Eingabelast und einen Datenschutz-Rahmen, der vor dem Start geklärt sein muss (Gebet/Glaube = besondere Datenkategorie).

---

## 1. Ehrliche Gesamtbewertung

**Note: Vision 9/10 – Konzept 7/10 – MVP-Reife 4/10.**

**Stark:**
- Klare Haltung: Mensch im Mittelpunkt, keine Diagnosen, Missionar entscheidet.
- Ampel als „Kontakt-Aktualität" ist ein guter, einfacher Kern.
- Prioritäten-Stern ist eine elegante Ein-Schalter-Lösung für unterschiedliche Regeln.
- „Keine Termine ohne Zustimmung" ist die richtige Grundregel.
- Trennung Missionar/Daten ist als Anforderung von Anfang an gesetzt.
- Report → Vereinbarungen → Aufgaben ist der eigentliche Wert der App.

**Schwach:**
- Zu viele Konzepte laufen parallel (Erinnerungen, Aufgaben, Berichte, Vereinbarungen, Ampel-Hinweise, Betreuungshilfe). Für den Nutzer ist das alles „offene Punkte", im Datenmodell aber getrennt gedacht.
- Tägliche Eingabelast bei 12 Schülern: 2 Tracker × 7 Tage × 12 = 168 Felder pro Woche plus Berichte.
- Google-Sync (zweiseitig) und Sonntags-Autoplanung sind die teuersten Funktionen, aber nicht der Kern.
- Datenschutz ist nur als Frage am Ende genannt; er bestimmt aber Architektur und Funktionsumfang.

---

## 2. Kritische Analyse

### 2.1 Widersprüche und Lücken in den Regeln

| # | Problem | Empfehlung |
|---|---|---|
| 1 | **Gelb vermischt zwei Dinge.** Du schreibst, Betreuungs- und Berichtsstatus müssen getrennt sein, aber Gelb = „Treffen war, Bericht fehlt" macht genau das. Was gilt bei Treffen vor 10 Tagen + fehlendem Bericht: Rot oder Gelb? | **Zwei getrennte Anzeigen:** Kontakt-Ampel (nur Tage seit Treffen) + Bericht-Badge („Bericht fehlt"). Ein Schüler kann grün sein und trotzdem ein Berichts-Badge haben. |
| 2 | **Orange ist nur 1 Tag breit** (Tag 8; ab Tag 9 rot). Als Warnstufe kaum nutzbar. | Schwellen konfigurierbar machen; Default so lassen oder Orange = Tag 7–8 prüfen. ❓ unklar: ob das so gewollt ist. |
| 3 | **Prioritätenschüler haben keine orange Stufe** (Grün/Gelb/Rot). Dashboard-Zähler „grün/gelb/orange/rot" wird dadurch uneinheitlich. | Gleiche vier Stufen, andere Schwellen (z. B. Grün ≤4, Gelb 5, Orange ab 6, Rot ab 7) – oder bewusst 3 Stufen und das im Zähler erklären. |
| 4 | **„Mindestens 1× pro Woche" vs. 7-Tage-Rolling.** Treffen am Montag der einen und Sonntag der nächsten Woche = 13 Tage Abstand, wöchentlich erfüllt, aber Ampel rot. | Entscheiden: Ampel = Rolling-Tage (Betreuungsqualität) und Wochenfortschritt = Kalenderwoche. Beides getrennt zeigen. |
| 5 | **Was ist ein „Treffen"?** Nur persönlich? Zählt Anruf/Videocall? Zählt ein geplanter Termin oder erst „hat stattgefunden"? | Treffen hat Status: geplant / hat stattgefunden / abgesagt / nicht erschienen. Nur „hat stattgefunden" setzt die Ampel zurück. Art des Treffens (persönlich / Anruf) als Feld, Ampel-Regel konfigurierbar. |
| 6 | **„Bericht vollständig"** ist undefiniert. Wenn alle Felder Pflicht sind, bleibt Gelb ewig. | Mindestdefinition: 1 Notiz + (optional) nächster Schritt. Alle anderen Felder freiwillig. „Kein Bericht nötig" als Option. |
| 7 | **Ampel ohne Kontext erzeugt unnötigen Druck.** Ein Schüler ist rot, obwohl morgen ein Treffen geplant ist. Oder im Urlaub/krank. | Anzeige „Treffen geplant: Do 18:00" dämpft die Warnung. Schülerstatus „pausiert" nimmt ihn aus der Ampel. |
| 8 | **Sprache der Ampel.** „Roter Schüler" etikettiert Menschen – das widerspricht deinem eigenen Grundsatz. Die Ampel misst *meinen* Kontakt, nicht den Schüler. | UI-Sprache: „Kontakt überfällig", „Letztes Treffen vor 9 Tagen". Profilbild-Ring dezent einfärben, kein Alarm-Rot-Overkill. |
| 9 | **„Erinnerungen verschwinden bzw. als erledigt markiert"** – das sind zwei verschiedene Verhalten. | Push ist flüchtig; in der App gibt es eine Liste „Impulse" mit Erledigt / Später (Snooze). |
| 10 | **Zufalls-Erinnerung „Kontakt aufnehmen"** kommt evtl. nachdem man den Schüler schon getroffen hat. | Unterdrücken, wenn in dieser Woche bereits Kontakt/Treffen stattfand (für Gebets-Erinnerung nicht). |
| 11 | **Zufallszeit bis 23:59** ist als Push für „jetzt Kontakt aufnehmen" unpraktisch und stört. | Fenster konfigurierbar, Default 08:00–21:30; Ruhezeiten. |
| 12 | **„Am Abend" bei Prioritäten-Bericht** ist keine Uhrzeit. | Konfigurierbare Zeit, Default 20:30. |
| 13 | **Zwei Kalender (Gesamt + je Schüler)** sind kein zweites System, nur ein gefilterter Blick. | Eine Datenquelle, Schülerkalender = Filter. |
| 14 | **Historie ist keine eigene Datenebene**, sondern eine Ansicht über Berichte, Beobachtungen, Ziele, Vereinbarungen. | Nicht doppelt speichern. Ereignisse tragen einen Typ und werden als Timeline angezeigt. |
| 15 | **Überschneidungen:** „Stärken/Herausforderungen" im Steckbrief *und* in Direction; „Herausforderungen" auch im Gebet. | Einmal definieren: Steckbrief = zeitlose Fakten; Direction = zeitliche Entwicklung; Gebet = Anliegen mit Status. |

### 2.2 Tägliche Bedienung – wo es zu aufwendig wird
- **Tracker pro Tag/Schüler eintragen** ist die größte Eingabelast. → Statt Tageseingabe ein **„Wochen-Check"**: eine Seite, alle Schüler untereinander, Tippen schaltet leer → ✓ → ✕ → „–" (entfällt). Wird typischerweise im/nach dem Treffen ausgefüllt, nicht täglich.
- **Berichte mit 8 Feldern** werden nicht geschrieben, wenn sie nach einem langen Tag nur Arbeit sind. → Ein einziges Pflichtfeld, Rest optional (siehe 5.3).
- **Prioritätenstern ohne Limit** verliert Bedeutung. → Sanfter Hinweis ab >3 Prioritätenschülern (kein Verbot).
- **Vier Push-Typen pro Prioritätenschüler pro Woche** × mehrere Schüler können sich zu viel addieren. → Tageslimit (z. B. max. 3 Zufalls-Impulse/Tag), Verteilung über die Woche.

### 2.3 Was gehört wirklich aufs Dashboard
Nicht alle 8 Infos als eigene Blöcke. Siehe Abschnitt 5.

---

## 3. Fehlende oder problematische Funktionen

### Fehlend (mit echtem Mehrwert)
1. **Treffen-Vorbereitung (Prep-Screen)** – automatisch zusammengestellt: letzter Bericht, „Vorbereitung fürs nächste Gespräch", offene Vereinbarungen, aktuelle Gebetsanliegen, Ziel zum Reflektieren. *Das ist wahrscheinlich die wertvollste Funktion der ganzen App und kostet wenig.*
2. **Vereinbarungen als eigene Einheit** (Text, Datum, Status: offen/erledigt/nicht weiterverfolgt). Ohne sie ist „Vereinbarung über mehrere Treffen nicht nachverfolgt" nicht berechenbar.
3. **Treffen-Status** geplant / hat stattgefunden / abgesagt / nicht erschienen. (Ohne das ist die Ampel nicht korrekt berechenbar.)
4. **Schüler-Lebenszyklus:** aktiv / pausiert / abgeschlossen (Archiv). Mit „pausiert" fällt er aus Ampel und Pushes.
5. **Schnellerfassung (+)** überall: Treffen protokollieren, Aufgabe, Gebetsanliegen, Notiz.
6. **Gebets-Modus:** Durchwischen der aktuellen Gebetsanliegen aller Schüler (täglich nutzbar, passt zur Vision).
7. **„Beim nächsten Mal ansprechen"-Merkliste** pro Schüler – wird automatisch in die Vorbereitung übernommen.
8. **Verfügbarkeiten / Arbeitszeiten** (nötig für die Wochenplanung und für Ruhezeiten).
9. **Offline-Fähigkeit für Berichte** (Entwurf lokal speichern, später synchronisieren).
10. **Datenexport / Backup** (auch Datenschutz: Auskunftsrecht, Übergabe).
11. **Globale Suche** (Name, Stichwort in Berichten).
12. **App-Sperre** (PIN/Biometrie) auf dem Smartphone – bei so sensiblen Notizen sinnvoll.
13. **Übergabe/Vertretung** (später): Missionare wechseln Orte. Datenmodell von Anfang an so bauen, dass Besitz später teilbar ist.

### Problematisch / zurückstellen
- **Zweiseitige Google-Kalender-Synchronisation** (Änderungen/Absagen in beide Richtungen): hoher Aufwand, viele Randfälle. Siehe Roadmap.
- **Sonntags-Autoplanung**: sehr wertvoll, aber braucht verlässliche Kalenderdaten. Nicht in V1.
- **„Persönlichkeit" und „Kommunikationsstil" als Felder**: laden zu Etikettierung ein. Besser als Frage formulieren: „Was hilft im Gespräch mit ihm/ihr?" (freier Text, keine Typologie).
- **KI-Zusammenfassungen** der Entwicklung: sendet sensible Daten an einen Dritten. Erst später, nur Opt-in, siehe 6.

---

## 4. Die 10 wichtigsten Verbesserungsvorschläge

1. **Ampel trennen:** Kontakt-Ampel und Bericht-Badge getrennt; Schwellen konfigurierbar; „Treffen geplant" und „pausiert" berücksichtigen.
2. **Eine Quelle für „offene Punkte":** Bericht fehlt, Aufgabe, Erinnerung, Vereinbarung – technisch getrennt, im UI **eine** Liste („Jetzt dran").
3. **Bericht = Eingangstor:** Aus dem Bericht entstehen direkt Aufgaben, Gebetsanliegen und Vereinbarungen. Nur 1 Pflichtfeld.
4. **Treffen-Vorbereitung** automatisch erzeugen.
5. **Wochen-Check statt Tagesfelder** für Hausaufgaben/Speech (Datenmodell bleibt 7 Tage, Eingabe bündelt).
6. **Datenschutz zuerst klären** (besondere Kategorie, Minderjährige?, Verantwortlicher) und Kalender/Push datensparsam gestalten.
7. **Push-Realität testen, bevor gebaut wird** (iOS-PWA-Spike) und Push-Inhalte neutral halten.
8. **Roadmap kürzen:** V1 ohne Google-Zwei-Wege-Sync und ohne Sonntags-Autoplanung.
9. **Regeln als Konfiguration, nicht als Code-Konstanten:** Schwellen, Zeitfenster, Erinnerungsanzahl pro Schüler-Typ.
10. **Sprache und Design entlasten:** „Kontakt überfällig" statt „roter Schüler"; Ampel dezent; Fortschritt der Woche positiv formulieren.

---

## 5. Optimierte Seiten- und Navigationsstruktur

### 5.1 Hauptnavigation (Smartphone: Tab-Leiste unten; Desktop: Seitenleiste)
Start · Kalender · Schüler · Aufgaben · Mehr — plus **zentrale „+"-Schnellaktion** (Treffen protokollieren / Aufgabe / Gebetsanliegen / Notiz).

- **Start:** „Jetzt dran" (siehe 5.2)
- **Kalender:** Woche (Default), Tag, Liste; Filter nach Kategorie und Schüler
- **Schüler:** Gesichter-Raster, sortiert nach Dringlichkeit, Suche; Filter Priorität/pausiert
- **Aufgaben:** Liste mit Filtern (heute, überfällig, pro Schüler); enthält auch automatisch erzeugte Punkte (Bericht fehlt etc.)
- **Mehr:** Wochen-Check, Gebets-Modus, Wochenplanung (später), Archiv, Einstellungen (Ampelschwellen, Ruhezeiten, Google, Datenschutz/Export)

### 5.2 Startseite (nur das, was Handeln auslöst)
1. **Begrüßung + Wochenfortschritt** (z. B. „5 von 9 Schülern diese Woche getroffen").
2. **„Jetzt dran"** – max. 5 Karten, gemischt und sortiert: überfälliger Bericht (Prio zuerst), Treffen heute (mit Vorbereitung), überfälliger Kontakt, fällige Aufgabe, Impuls.
3. **Heute** – Mini-Zeitleiste der Termine.
4. **Ampel-Zähler** als kleine Leiste (4 Zahlen); Tipp darauf filtert die Schülerliste.
5. **Schüler-Gesichter** (Raster, nach Dringlichkeit; goldener Stern; dezenter Statusring; „vor 3 Tagen").
- Alles andere (volle Aufgabenliste, alle Erinnerungen, Details) nur über Klick.

### 5.3 Schülerprofil
**Kopf (immer sichtbar):** Foto groß, Name, Stern, „Letztes Treffen vor X Tagen · Nächstes: Do 18:00", Schnellaktionen: *Bericht schreiben · Treffen planen · Nachricht/Anruf · Beten*.

**Tabs:** Übersicht · Direction · Gebet · Persönliches · **Verlauf** (= Historie, über Kopf-Link auch aus jedem Tab erreichbar)

- **Übersicht:** Nächstes Treffen + Vorbereitung · offene Punkte (Bericht, Aufgaben, Vereinbarungen) · Wochenkarte Hausaufgaben/Speech · 2–3 aktuelle Gebetsanliegen · aktuelles Ziel + nächster Schritt
- **Direction:** Ziele mit Status und nächstem Schritt; Beobachtungen als datierte Einträge (nie überschreiben, nie „Bewertung"); Reflexionsdatum
- **Gebet:** aktuell / dankbar / erhört, Status „weiterhin aktuell"
- **Persönliches:** Steckbrief (Kontakt, Beginn, Klasse, Ansprechpartner, Interessen, „Was hilft im Gespräch?", Stärken, Herausforderungen)
- **Verlauf:** Timeline aller Treffen/Berichte/Vereinbarungen/Ziel-Ereignisse; Filter nach Typ

**Erst nach Klick:** Berichtsdetails, ältere Wochen der Tracker, Kontaktdaten, erledigte Gebete.

### 5.4 Bericht in unter einer Minute
- Einstieg: „+" oder Termin im Kalender → Datum/Uhrzeit/Dauer sind **vorbelegt**.
- **Eine Seite, ein Pflichtfeld** (Kernnotiz; Diktierfunktion der Tastatur reicht).
- Optionale Abschnitte als aufklappbare Zeilen: Erkenntnisse · Veränderungen · neue Gebetsanliegen · Vereinbarungen · Aufgaben bis zum nächsten Mal · Vorbereitung nächstes Gespräch.
- Gebetsanliegen/Vereinbarung/Aufgabe werden **direkt** als Einträge angelegt.
- Automatisches Zwischenspeichern; Abschluss = ein Tipp („Bericht abschließen" → Badge verschwindet).
- Pro Schüler: *Zuletzt verwendete Themen* als Chips.

### 5.5 Smartphone
- Einhandbedienung: Aktionen unten, Tab-Leiste unten, große Tippflächen.
- Wischgesten (Aufgabe erledigen, Impuls später).
- Profilbilder dienen als schnelle Navigation.
- Entwurf lokal speichern (Offline).
- Desktop: Zwei-Spalten (Liste links, Detail rechts) statt Navigation durch Seiten.

### 5.6 Design (Bestätigung + Ergänzung)
Deine Richtung (Creme/Beige, sanftes Blau, Pastell, runde Karten, ruhige Typografie) passt. Ergänzungen: Kontrast prüfen (WCAG AA, Beige + Pastell kippt schnell in schlechte Lesbarkeit), Statusfarben nie *nur* über Farbe (Icon/Text zusätzlich), Dark Mode optional später.

---

## 6. Intelligente Funktionen – Nutzen und Komplexität

| Funktion | Nutzen | Komplexität | Empfehlung |
|---|---|---|---|
| „Jetzt dran"-Liste (regelbasiert) | sehr hoch | niedrig | V1 |
| Treffen-Vorbereitung (automatisch) | sehr hoch | niedrig | V1/V2 |
| Aufgaben/Gebet/Vereinbarung aus Bericht erzeugen | hoch | niedrig | V1 |
| Erinnerungsplaner mit Unterdrückung | hoch | mittel | V1 (einfach) |
| Hinweis „Ziel reflektieren" (alle n Wochen) | mittel | niedrig | V2 |
| Vereinbarung über mehrere Treffen offen | mittel | niedrig | V2 |
| Neutraler Muster-Hinweis (z. B. Speech 3 Wochen ✕) | mittel | niedrig | V2, nur Hinweis ohne Wertung |
| Sonntags-Wochenvorschlag (regelbasiert, kein LLM) | hoch | hoch | V3 |
| KI-Zusammenfassung der Entwicklung | mittel | mittel + Datenschutz | Später, nur Opt-in |
| Sprach-zu-Bericht mit KI | mittel | hoch + Datenschutz | Nicht planen; Diktat der Tastatur nutzen |

**Grundsatz:** Wo eine Regel reicht, keine KI. Die Wochenplanung ist ein Planungsproblem (freie Zeitfenster, Priorität, Dringlichkeit), kein Sprachmodell-Problem.

---

## 7. Technische Architektur

### Bewertung des bisherigen Stacks
**Gut und vertretbar:** Next.js/React, Supabase (Postgres, Auth, RLS), PWA, Web Push, Vercel. Für ein kleines Team ist das ein pragmatischer Standard.

**Kritische Punkte:**
1. **Web Push auf iOS:** funktioniert nur, wenn die PWA zum Home-Bildschirm hinzugefügt wurde (ab iOS 16.4) und ist weniger zuverlässig als native Pushes. Da Push dein wichtigster Kanal ist: **früh ein kleiner Test (Spike) mit echten Geräten**. Falls unzuverlässig: nativer Wrapper (z. B. Capacitor) oder native App. ❓ unklar: Welche Smartphones nutzen die Missionare?
2. **Zeitgesteuerte Pushes brauchen einen Server-Scheduler.** Vercel-Cron im kostenlosen Plan ist stark begrenzt; Supabase `pg_cron` + Edge Function oder bezahlter Plan ist realistisch. Vorab-Planung der Wochenerinnerungen (Zeitpunkte werden in einer Tabelle erzeugt, ein Dispatcher sendet alle paar Minuten fällige).
3. **Supabase Free pausiert Projekte bei Inaktivität** – für eine App mit Erinnerungen ungeeignet. Bezahlplan (ca. 25 USD/Monat, Stand prüfen).
4. **Vercel Hobby ist für nicht-kommerzielle Nutzung gedacht**; bei Veröffentlichung/Gebühren Pro-Plan. Wenn die App nur eine Single-Page-App hinter Login ist, ginge auch ein statisches Hosting (z. B. Cloudflare Pages) + Supabase – weniger bewegliche Teile. Next.js ist trotzdem okay, wenn du es kennst.
5. **Google Calendar API:** Kalender-Scopes gelten als „sensibel"; im Testmodus laufen Refresh-Tokens nach ca. 7 Tagen ab, öffentliche Nutzung braucht Google-Verifizierung. Für ein paar bekannte Nutzer ist „Testmodus" nutzbar, aber ungeeignet für viele. Zuordnung über `extendedProperties.private` (App-Schüler-ID) im Termin, nicht über den Titel. Wichtig: **keine Klarnamen/Details im Termintitel** nötig machen (Datenschutz, Kalender ist oft geteilt oder auf Sperrbildschirm). Für Änderungen: Sync-Tokens und Webhook-Kanäle (laufen ab, Erneuerung nötig) → deshalb stufenweise.
6. **Zeitzonen:** Wochenwechsel „Montag" und Zufallsfenster müssen pro Nutzer-Zeitzone laufen (✱ Umzug von Missionaren möglich).

### Empfohlene Architektur (kurz)
- Frontend: Next.js (App Router) oder Vite+React als PWA; Service Worker; lokale Entwürfe (IndexedDB).
- Backend: Supabase **EU-Region (Frankfurt)**; Auth mit E-Mail + **Passkey/MFA**; Postgres mit **RLS auf jeder Tabelle**.
- Scheduler: `pg_cron`/Edge Function oder Vercel Pro Cron → Dispatcher für Push.
- Push: Web Push (VAPID) mit generischem Inhalt (siehe 8).
- Bilder: **privater** Storage-Bucket, Zugriff nur über signierte, kurzlebige URLs, Policies nach Besitzer.
- Service-Role-Key **niemals** im Browser.

### Zentrale Sicherheits-Entscheidung: RLS
- Jede Tabelle hat `owner_id` (oder wird über den Schüler dem Besitzer zugeordnet); Policies prüfen `auth.uid()`.
- **Automatisierte Tests** (z. B. pgTAP): Nutzer A darf nie Daten von Nutzer B lesen/schreiben – in jeder Tabelle, auch Storage.
- Besitz als eigene Beziehung modellieren (statt nur Spalte), damit Vertretung/Übergabe später möglich wird, ohne Umbau.
- Keine Edge-Funktion darf mit Service-Role Daten ausliefern, ohne den Besitzer zu prüfen.

### Konzeptionelles Datenmodell (nur Entitäten, kein Code)
Missionar (Profil/Einstellungen) · Schüler (Status, Priorität, Steckbrief) · Treffen (Status, Art, Zeit, Kalender-ID) · Bericht (zu Treffen) · Vereinbarung · Aufgabe · Gebetsanliegen · Ziel · Beobachtung · Tracker-Woche (Schüler, Woche, 7+7 Zustände) · Impuls/Erinnerung (geplanter Zeitpunkt, Status) · Push-Abo · Kalender-Verbindung · Audit-Log (optional).

### Kosten (grob, vor Entscheidung prüfen)
Supabase Pro + Domain + ggf. Vercel Pro ≈ 45–50 USD/Monat. Ohne Skalierungsproblem für kleine Nutzerzahl. Für nur dich selbst: Free-Tiers mit Einschränkungen (Pausierung).

---

## 8. Datenschutz und Verantwortung

**Einordnung (keine Rechtsberatung – vor Veröffentlichung klären lassen):**
- Gebetsanliegen, Glaubensinformationen und Entwicklungsbeobachtungen können **besondere Kategorien personenbezogener Daten** sein (Art. 9 DSGVO: u. a. religiöse Überzeugungen; je nach Inhalt auch Gesundheit/Persönlichkeit). Höhere Anforderungen, i. d. R. ausdrückliche Einwilligung und ggf. eine Datenschutz-Folgenabschätzung.
- **Minderjährige?** ❓ unklar: Alter der Schüler. Falls <18: Eltern-Einwilligung, deutlich strengere Maßstäbe.
- **Verantwortlicher?** Ist es der einzelne Missionar oder die Organisation/Gemeinschaft hinter ihm? Das bestimmt Verträge, Einwilligungen und Haftung. Die „private Tätigkeit"-Ausnahme gilt hier wahrscheinlich *nicht*.

**Was nicht speichern (Datenminimierung):** Gesundheitsdaten, Diagnosen, Persönlichkeitstypologien, Aussagen Dritter ohne Notwendigkeit, genaue Wohnadressen (nur wenn nötig), Audioaufnahmen (schon ausgeschlossen – gut).

**Besonders sensibel:** Gebetsanliegen, „Herausforderungen", Beobachtungen, Familien- und Gesundheitsbezüge in Freitext.

**Zugriffsschutz:** RLS + MFA/Passkey; Sitzungsdauer; App-Sperre; Push-Inhalt neutral („Erinnerung: Zeit für ein kurzes Gebet 🙏" – Name optional, einstellbar; nie Inhalte); keine Details in Google-Terminen; Backups verschlüsselt, ebenfalls in der EU.

**Verschlüsselung:** Transport + Ruhezustand durch Supabase; **Ende-zu-Ende-/Feldverschlüsselung** nur für Gebet/Beobachtungen erwägen – würde Suche und Zusammenfassungen verhindern. Empfehlung: erst Standard (+ RLS + MFA), E2E nur, wenn rechtlich/organisatorisch gefordert.

**Auftragsverarbeitung:** AV-Verträge mit Supabase, Hosting-Anbieter, Google (Kalender); EU-Regionen; Drittlandübertragung dokumentieren; Verzeichnis der Verarbeitungstätigkeiten.

**Aufbewahrung/Löschung (Vorschlag):** Schüler „abgeschlossen" → Frist (z. B. 12 Monate, einstellbar) mit Hinweis → Löschung oder Export; „Löschen" immer als echtes Löschen anbieten (nicht nur Archiv); Betroffenenrechte (Auskunft/Export/Löschung) technisch vorbereiten; Gebete „erhört" nicht ewig behalten, sondern in Löschkonzept aufnehmen.

**Transparenz:** Schüler sollten wissen, dass Notizen über sie geführt werden und was darin steht. Ein verständlicher Informationstext + Einwilligung. Und: Notizen so schreiben, dass sie dem Schüler gezeigt werden könnten.

**KI/LLM:** Keine Übermittlung sensibler Inhalte an Dritte ohne eigene Rechtsgrundlage. Wenn je, dann Opt-in, EU-Verarbeitung, Hinweis im Datenschutztext.

**Offen vor Veröffentlichung:** Rechtsgrundlage, Verantwortlicher, Minderjährige, DSFA ja/nein, Einwilligungstext, Datenschutzerklärung, Impressum, Löschkonzept, Verfahren bei Datenpanne, Rolle der Organisation.

---

## 9. MVP-Roadmap

**Phase 0 – Klärung und Spikes (kurz, vor Bau)**
Entscheidungen (Abschnitt 10), iOS-Web-Push-Test mit echten Geräten, RLS-Gerüst mit Isolationstests, Datenschutz-Grundlagen, Ampel-Regeln final definieren.

**Phase 1 – MVP: „Kein Schüler geht verloren"**
- Login (E-Mail + Passkey/MFA), Mandantentrennung getestet
- Schüler anlegen/bearbeiten mit Foto, Status (aktiv/pausiert), Stern
- Treffen (planen / hat stattgefunden) + **Schnellbericht** (1 Pflichtfeld) + „Vorbereitung nächstes Mal"
- Zwei Anzeigen: Kontakt-Ampel (mit Prio-Regeln) + Bericht-Badge
- Startseite „Jetzt dran" + Wochenfortschritt + Gesichter-Raster
- Schülerprofil: Übersicht, Gebet, Persönliches, Verlauf; Direction-Light (Ziel + nächster Schritt)
- Wochen-Check für Hausaufgaben/Speech (mit Wochenhistorie)
- Aufgaben (global/je Schüler)
- Push: wöchentliche Zufallsimpulse (Kontakt/Gebet) mit Regeln, Bericht-Erinnerung, Prio-Abendhinweis
- Interner Kalender (Wochenansicht), **ohne** Google
- Datenexport (einfach)

**Phase 2 – Tiefe**
Vollständiges Direction (Beobachtungen, Ziele, Reflexion), Vereinbarungen mit Nachverfolgung, automatische Vorbereitung, Gebets-Modus, Tagesabschluss-Push, Erinnerung vor Treffen, Google-Kalender **ein Weg**: Termine aus der App eintragen (mit Bestätigung) + freie/belegte Zeiten lesen.

**Phase 3 – Planung**
Sonntags-Wochenvorschlag (regelbasiert), Wochenrückblick, Google zweiseitig (Änderungen/Absagen), Offline-Verbesserungen.

**Phase 4 – Erweiterung**
Zusammenarbeit/Übergabe/Vertretung, optionale KI-Funktionen (Opt-in), statistischer Verlauf.

---

## 10. Wichtigste offene Entscheidungen

Priorisiert (Top 8, zuerst klären):
1. **Wer nutzt die App?** Nur du, ein kleiner bekannter Kreis oder viele fremde Missionare? (bestimmt Google-Verifizierung, Datenschutz, Kosten)
2. **Verantwortlicher:** Du persönlich oder eine Organisation? Gibt es Vorgaben dieser Organisation?
3. **Alter der Schüler:** auch Minderjährige?
4. **Definition „Treffen":** nur persönlich oder auch Anruf/Video? Gilt ein Treffen erst mit Status „hat stattgefunden"?
5. **Wochenregel:** Ampel nach Rolling-Tagen *und* Wochenfortschritt nach Kalenderwoche – okay?
6. **Berichtsdefinition:** 1 Pflichtfeld okay oder bestehst du auf mehr Pflicht (v. a. bei Prioritätenschülern)?
7. **Smartphones:** iPhone, Android, gemischt? (entscheidet über PWA vs. Wrapper)
8. **Google Calendar in V1:** darf es erst in Phase 2 kommen (empfohlen)?

Weitere (später):
- Genaue Ampel-Schwellen und ob Orange 1 Tag breit sein soll
- Zufallsfenster (Default 08:00–21:30?) und Tageslimit
- Sprache/Mehrsprachigkeit der App
- Zeitzonen / Umzüge
- App-Sperre und Push-Inhalt (Name ja/nein)
- Aufbewahrungsfristen
- Zusammenarbeit/Übergabe: ja/nein, wann
- Name und Branding der App

## Verknüpft mit
- [[Second-Brain-Guide]]

---

## 11. Entscheidungen (Stand 2026-11-11)

| # | Frage | Entscheidung | Folge |
|---|---|---|---|
| 1 | Nutzerkreis | Nur ein paar Missionare | Google-Testmodus reicht (max. 100 Nutzer, Nutzer als Testnutzer eintragen); Kosten klein; kein Verifizierungsaufwand |
| 2 | Verantwortlicher | Jannik ist nicht der Verantwortliche der Organisation | ❓ unklar: Wer ist es dann (Organisation oder jeder Missionar selbst)? Vor echten Schülerdaten klären |
| 3 | Minderjährige | Nein | Keine Eltern-Einwilligung nötig; Einwilligung der Schüler selbst bleibt (Art. 9) |
| 4 | Treffen vs. Anruf | Anruf zählt nicht als Treffen, wird aber vermerkt; zählt „0.5" | Kontaktart als Feld (Treffen / Anruf). ❓ unklar: Wie wirkt 0.5 auf die Ampel? (siehe unten) |
| 5 | Ampel Rolling-Tage + Wochenfortschritt Kalenderwoche | Ja | wie empfohlen |
| 6 | Bericht: 1 Pflichtfeld | Ja | wie empfohlen |
| 7 | Smartphones | Beides (iPhone + Android) | iOS-Push-Spike in Phase 0 Pflicht; PWA muss zum Home-Bildschirm hinzugefügt werden |
| 8 | Google Calendar | Erst Phase 2 | Phase 1 mit internem Kalender |

### Offen aus Entscheidung 4 (Vorschlag)
- Variante A: Ein Anruf setzt die Ampel **nicht** zurück, zeigt aber „Kontakt per Anruf vor X Tagen"; zwei Anrufe in einer Woche zählen als ein Treffen für den Wochenfortschritt (0.5 + 0.5).
- Variante B: Ein Anruf verschiebt die Ampel um einen halben Schritt (z. B. Rot → Orange), nie auf Grün.
- Empfehlung: A mit Wochenfortschritt „x,5 von n". Einfach, nachvollziehbar.
- Offen: Gilt das auch für Prioritätenschüler? Zählen Textnachrichten (vermutlich nein)?

### Nachtrag Entscheidungen (2026-11-11)
- **Verantwortlicher:** Jeder Missionar für seine eigenen Schüler. Folgen: Einwilligung und Information der Schüler liegen beim jeweiligen Missionar; App liefert Mustertext, Export und Löschfunktion; Datentrennung pro Missionar bleibt zentral. ❓ unklar: Ob die Organisation trotzdem Vorgaben hat – kurz nachfragen.
- **Anruf:** Wird vermerkt (Kontaktart „Anruf"), im Wochenbericht zusätzlich angezeigt, **zählt nicht als Treffen** (nicht im Wochenfortschritt). Wirkung auf die Ampel: **eine halbe Stufe besser, nie bis Grün** (z. B. Rot → Orange). Gilt für Anrufe seit dem letzten Treffen; nach dem nächsten Treffen zurückgesetzt.
- **Textnachrichten:** zählen nicht.
- ❓ unklar: Prioritätenschüler haben kein Orange (Grün/Gelb/Rot). Vorschlag: Rot → Gelb bei Anruf, oder Prio bekommt ebenfalls vier Stufen (siehe 2.1 Punkt 3).
- ❓ unklar: Hält die Halbstufe unbegrenzt oder nur z. B. 7 Tage nach dem Anruf? Vorschlag: einmalig, danach läuft die Ampel normal weiter.
- **Entscheidung Prio-Ampel:** Prioritätenschüler bekommen ebenfalls vier Stufen (Grün/Gelb/Orange/Rot). Damit ersetzt dies die Frage oben. Vorschlag Schwellen: Grün bis 4 Tage, Gelb 5, Orange 6, Rot ab 7 – ❓ unklar: bitte bestätigen (ursprünglich: Gelb ab 5, Rot ab 6). Anruf-Regel gilt gleich (eine halbe Stufe besser, nie Grün).
- **Entscheidung Anruf-Verbesserung:** einmalig. Die halbe Stufe gilt einmal, danach läuft die Ampel normal weiter; nach dem nächsten Treffen ist alles zurückgesetzt.
- **Bestätigt (2026-11-12):** Prio-Schwellen Grün bis 4 Tage, Gelb 5, Orange 6, Rot ab 7.
- **Bestätigt (als Defaults, einstellbar):** Zufallsfenster für Erinnerungen 08:00–21:30; Abendhinweis für fehlenden Prio-Bericht 20:30. Tageslimit für Zufallsimpulse: Vorschlag max. 3 pro Tag – ❓ unklar: noch nicht ausdrücklich bestätigt.
- **Bestätigt (2026-11-12):** Tageslimit 3 Zufallsimpulse pro Tag. Weitere Entscheidungen siehe [[Missionars-App_Phase2]].
