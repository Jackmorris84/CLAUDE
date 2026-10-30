---
name: wochenreview
description: Wöchentlicher Review des Second Brain. Nutzen, wenn der Nutzer "Wochenreview", "weekly review" oder "Review machen" sagt. Zählt Notizen pro Ordner, zeigt Stau und Freigaben und legt einen Bericht in 20_Review ab.
---

# Wochenreview

Halte dich an KI-Regeln.md. Du bereitest vor, du entscheidest nicht. Lies keine ganzen Notizen, nur Frontmatter.

## Ablauf
1. **Bestand zählen:** Pro Ordner (00_Inbox, 10_Aufbereitet, 20_Review, 30_Wissen, 90_Archiv) Dateien auflisten, mit `ls` oder `find`. Keinen Inhalt lesen.
2. **Frontmatter prüfen:** Mit `grep -rE "^(status|entscheidung):" <Ordner>` nur diese Zeilen holen. Daraus ermitteln:
   - Inbox-Notizen mit `status: roh`, die älter als 7 Tage sind (Stau, per `find -mtime +7`)
   - Notizen in 20_Review, die noch auf eine Entscheidung warten (`entscheidung: offen`)
   - Notizen mit `entscheidung: rein`, die noch nicht in 30_Wissen liegen
3. **Freigaben ausführen:** Nur Notizen mit `entscheidung: rein` nach 30_Wissen verschieben (`git mv`). Nichts anderes ohne Freigabe verschieben. Nichts löschen, Aussortiertes mit `entscheidung: raus` nach 90_Archiv.
4. **Bericht schreiben:** `20_Review/Wochenreview-<JJJJ-MM-TT>.md` mit Frontmatter (`typ: review`, `erstellt`, `status: roh`, `entscheidung: offen`) und diesen Abschnitten:
   - **Zahlen:** Tabelle Ordner / Anzahl / Veränderung zum letzten Wochenreview (falls einer existiert, sonst "erster Review")
   - **Verschoben:** Liste der in diesem Lauf verschobenen Notizen
   - **Wartet auf dich:** Notizen mit `entscheidung: offen` und Empfehlung (nur Titel und Empfehlung, falls im Kopf der Notiz vorhanden)
   - **Stau:** Inbox-Notizen älter als 7 Tage
   - **Vorschlag für die nächste Woche:** höchstens 3 Punkte
5. **Antwort im Chat:** Maximal 5 Zeilen plus Link auf die Berichtsdatei.

## Regeln
- Unklares mit "❓ unklar:" markieren, nichts erfinden.
- Kein Inhalt aus 00_Inbox wird verändert.
- Wenn ein Ordner leer ist, einfach "0" eintragen und weitermachen.
