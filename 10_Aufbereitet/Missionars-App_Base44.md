---
titel: "Missionars-App – Umsetzung mit Base44"
typ: entscheidung
thema: [Missionars-App, Base44, Architektur, Datenschutz]
quelle: "Eigene Analyse im Chat; Web-Recherche 2026-11-12: docs.base44.com (Entity-Security, Privacy and security, Connectors), feedback.base44.com (EU-Data-Residency-Wünsche). Vor Entscheidung in aktuellen Base44-Docs prüfen."
erstellt: 2026-11-12
status: roh
entscheidung: offen
tags: [app, base44, architektur, dsgvo]
---
## Kernaussage
Ziel ist, die App am Ende mit Base44 zu bauen. Das ersetzt den Supabase/Next.js/Vercel-Stack aus [[Missionars-App_Expertenreview]]. Fachlich bleibt alles gleich (Ampel, Berichte, Phasen). Technisch ändern sich Sicherheit, Push, Zeitsteuerung und Datenschutz. Base44 ist machbar, aber nur nach einem kurzen Test der vier Risikopunkte unten.

## Was Base44 mitbringt (laut Docs)
- **Zugriffsschutz pro Datensatz (RLS) und pro Feld (FLS)** in der Entity-Definition. Wichtig: Ohne definierte Regeln sind **alle Datensätze für alle Nutzer sichtbar**. Backend-Funktionen mit Service-Rolle umgehen die Regeln.
- **Google-Calendar-Connector** (Builder-Plan oder höher), Termine lesen/schreiben und Automationen bei Terminänderungen.
- **Geplante Automationen/Backend-Funktionen** (fehlschlagende werden automatisch pausiert).

## Vier Risikopunkte (vor Start testen)
1. **Datentrennung:** Für jede Entity Regel „Besitzer = angemeldeter Missionar" (Lesen, Ändern, Löschen). Eigener Test mit zwei Testnutzern: A darf nie Daten von B sehen, auch nicht über Backend-Funktionen/Listen/Suche. Service-Rolle nur mit manueller Besitzerprüfung.
2. **Push-Nachrichten (iPhone + Android):** In den Docs keine eindeutige Web-Push-Unterstützung gefunden. ❓ unklar: ob PWA-Push direkt geht oder nur über Umweg (eigener Push-Dienst per Backend-Funktion, z. B. OneSignal) . Push ist der wichtigste Kanal → Spike in Phase 0 entscheidend.
3. **Zufalls-Erinnerungen:** Brauchen geplante Funktionen im Minutentakt (Wochenplan vorab erzeugen, Dispatcher sendet Fälliges). ❓ unklar: kleinstes Intervall und Zuverlässigkeit der Automationen.
4. **Datenschutz/Standort:** Nutzerwünsche nach EU-Hosting deuten darauf hin, dass Daten bisher in den USA liegen; in den Docs gibt es eine Datenresidenz-Einstellung auf Workspace-Ebene, Regionen unklar. Gebetsanliegen sind besondere Datenkategorie. → Vor echten Schülerdaten klären: EU-Region verfügbar? AV-Vertrag (DPA)? Unterauftragnehmerliste?

## Anpassungen am Konzept
- **Keine Klarnamen in Pushes**, neutrale Kalendertitel (gilt weiter).
- **Daten sparsam:** sensible Freitexte (Gebet, Beobachtungen) knapp halten, bis Datenstandort geklärt ist.
- **Offline-Entwurf** für Berichte vermutlich nicht verfügbar → Entwurf serverseitig sehr früh speichern, kurze Eingabe beibehalten.
- **Regeln als Einstellungen** (Ampel-Schwellen, Zeitfenster) in einer Settings-Entity.
- **Tests:** Isolation (2 Nutzer), Ampel-Berechnung (feste Datumsbeispiele), Erinnerungsplan (max. 3/Tag, nicht am selben Tag, Ruhezeiten).

## Vorgehen
1. **Phase 0 (Spike, klein):** Base44-App mit 2 Testnutzern, Entities Schüler + Treffen mit Besitzerregel, Push-Test auf iPhone und Android, eine geplante Funktion, Datenstandort/DPA anfragen.
2. Nur wenn Spike besteht: Phase 1 nach Spezifikation.
3. Fällt Push oder Datenschutz durch: Fallback Supabase-Stack oder Base44 nur fürs Frontend (❓ prüfen, ob eigene Datenbank anbindbar).

## Verknüpft mit
- [[Missionars-App_Expertenreview]]
- [[Missionars-App_Phase2]]
