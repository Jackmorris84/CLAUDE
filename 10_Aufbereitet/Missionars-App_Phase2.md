---
titel: "Missionars-App – Phase 2 (Tiefe)"
typ: projekt
thema: [Missionars-App, Roadmap, Phase 2]
quelle: "Eigene Planung im Chat auf Basis des Konzepts und der Entscheidungen in [[Missionars-App_Expertenreview]]"
erstellt: 2026-11-12
status: roh
entscheidung: offen
tags: [app, roadmap, phase2]
---
## Kernaussage
Phase 1 stellt sicher, dass kein Schüler verloren geht. Phase 2 macht die Betreuung tiefer: Entwicklung (Direction), nachverfolgte Vereinbarungen, automatische Gesprächsvorbereitung und Google Calendar in eine Richtung. Voraussetzung: Phase 1 läuft im Alltag und die Ampel/Erinnerungen haben sich bewährt.

## Umfang (Reihenfolge = Empfehlung)
1. **Vereinbarungen nachverfolgen** (klein, hoher Nutzen)
   - Eigene Einträge mit Text, Datum, Status (offen / erledigt / nicht weiterverfolgt), entstehen aus dem Bericht.
   - Hinweis „Vereinbarung seit X Treffen offen" auf Übersicht und Vorbereitung. Nur Hinweis, keine Wertung.
2. **Treffen-Vorbereitung automatisch**
   - Eine Karte vor dem Treffen: letzter Bericht, „Vorbereitung fürs nächste Gespräch", „Beim nächsten Mal ansprechen", offene Vereinbarungen, aktuelle Gebetsanliegen, Ziel zum Reflektieren, Anrufe seit dem letzten Treffen.
   - Rein regelbasiert, kein KI-Dienst.
3. **Direction komplett**
   - Ziele mit Status, nächstem Schritt, Reflexionsdatum.
   - Beobachtungen als datierte Einträge (nie überschreiben), optional einem Ziel zugeordnet.
   - Fördermaßnahmen und Fortschritt/Verlauf als Timeline.
   - Hinweis „Ziel beim nächsten Gespräch reflektieren" (alle n Wochen, einstellbar).
   - Sprache bewusst ohne Etiketten (keine Noten, keine Typen).
4. **Gebets-Modus**: durch die aktuellen Gebetsanliegen aller Schüler wischen; Status „weiterhin aktuell / erhört / erledigt".
5. **Weitere Push-Typen**: Erinnerung vor einem Treffen, Tagesabschluss mit offenen Aufgaben, Erinnerung an die Wochenplanung (falls aktiviert). Alle mit Ruhezeiten und Tageslimit.
6. **Google Calendar – ein Weg**
   - Verbinden (Testmodus, Missionare als Testnutzer eintragen).
   - Termine aus der App eintragen, **nur nach Bestätigung**; Zuordnung über App-ID im Termin (nicht über den Titel); neutrale Titel ohne Details.
   - Belegte/freie Zeiten lesen (Free/Busy), um Konflikte anzuzeigen.
   - Noch **nicht**: Änderungen/Absagen aus Google zurückspielen (Phase 3).
7. **Neutraler Muster-Hinweis** (optional): z. B. Speech 3 Wochen ohne Haken – nur als Hinweis an den Missionar.

## Nicht in Phase 2
Sonntags-Autoplanung, Zwei-Wege-Sync, Zusammenarbeit/Übergabe, KI-Funktionen.

## Fertig, wenn
- Bericht → Vereinbarung/Aufgabe/Gebet entsteht automatisch und erscheint in der Vorbereitung.
- Vor jedem geplanten Treffen gibt es eine Vorbereitungskarte ohne manuelles Zusammensuchen.
- Ein Termin lässt sich aus der App nach Bestätigung in Google eintragen und wird dem richtigen Schüler zugeordnet.
- Isolationstests für alle neuen Tabellen laufen (Missionar A sieht nie Daten von Missionar B).
- Phase-1-Funktionen sind nicht langsamer oder aufwendiger geworden.

## Risiken
- Google-Testmodus: Token laufen im Testmodus ca. nach 7 Tagen ab → erneutes Verbinden nötig; bei wachsender Nutzerzahl Verifizierung nötig.
- Zu viele Hinweise ergeben Alarmmüdigkeit → Limit für „Jetzt dran" bleibt bei 5.
- Direction wird nicht gepflegt, wenn die Eingabe aufwendig ist → Beobachtungen als Ein-Zeilen-Eingabe aus dem Bericht.

## ❓ Offen vor Start
- Wie oft sollen Ziele reflektiert werden (Vorschlag: alle 4 Wochen)?
- Termindauer-Standard für Schülertreffen (Vorschlag: 60 Min.)?
- Sollen Termine in einem eigenen Google-Kalender oder im Hauptkalender landen (Vorschlag: eigener Kalender, weniger Risiko)?
- Hat die Phase-1-Nutzung neue Wünsche gezeigt, die Vorrang haben?

## Verknüpft mit
- [[Missionars-App_Expertenreview]]
