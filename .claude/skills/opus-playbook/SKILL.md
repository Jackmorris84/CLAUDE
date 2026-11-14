---
name: opus-playbook
description: Arbeitsmethode für Claude Opus ohne Fable – Aufgabe verstehen, planen, in Schritten arbeiten, das eigene Ergebnis prüfen und ehrlich berichten. Verwenden bei jeder Aufgabe mit mehr als einem Schritt, bei jedem Build, jeder Analyse und jedem Text, auf den sich jemand verlässt, und immer wenn der Nutzer „nutze das Opus-Playbook" sagt.
---

# Opus-Playbook

Eine Arbeitsmethode für Aufgaben mit mehr als einem Schritt. Sie kommt ohne stärkeres Modell im Hintergrund aus: Wo du nicht weiterkommst, hilfst du dir mit den Schritten unter „Wenn du feststeckst" selbst. Arbeite die Abschnitte der Reihe nach ab. Fragt der Nutzer, welchen Schritten du folgst, nenne sie bei ihren Überschriften.

## 1. Erst verstehen

- Fasse die Aufgabe in einem Satz zusammen: Was gibt es am Ende, das es jetzt nicht gibt, und wer nutzt es?
- Schreibe auf, woran man „fertig" erkennt, als Prüfungen, die jemand ausführen kann: ein Befehl läuft durch, eine Seite lädt, eine Zahl stimmt. Fällt dir keine Prüfung ein, hast du die Aufgabe noch nicht verstanden.
- Erst nachsehen, dann fragen. Lies Dateien, Notizen, Fehlermeldungen und vorhandene Arbeit. Frage den Nutzer nur nach dem, was sich nicht finden lässt und das Ergebnis verändert: Geschmack, Prioritäten, Zugangsdaten, Fakten über sein Leben oder Geschäft.
- Trenne Wissen von Annahmen. Prüfe die Annahmen, die teuer wären, wenn sie falsch sind. Nenne die übrigen in deiner Antwort.

## 2. Planen

- Finde den schwierigsten oder unsichersten Teil und plane um ihn herum. Erledige ihn zuerst oder beweise mit dem kleinsten möglichen Test, dass er geht, bevor du Zeit in die leichten Teile steckst.
- Wähle den einfachsten Weg, der die Prüfungen aus Schritt 1 besteht. Keine Funktionen, Optionen oder Dateien, um die niemand gebeten hat.
- Ordne die Schritte so, dass nach jedem ein prüfbarer Zustand steht. Ein Schritt, den du nicht prüfen kannst, ist zu groß; teile ihn.
- Bei großen oder schwer umkehrbaren Aufgaben: Schreibe den Plan in drei bis sechs Zeilen auf und suche gezielt nach dem Punkt, an dem er scheitern könnte, bevor du anfängst.
- Merke dir, was sich nicht rückgängig machen lässt oder nach außen wirkt: löschen, überschreiben, senden, veröffentlichen, bezahlen, anmelden. Dafür brauchst du vorher das Ja des Nutzers. Alles andere machst du ohne Rückfrage.

## 3. In Schritten arbeiten

- Ein Schritt nach dem anderen: ausführen, prüfen, weiter. Nie drei ungeprüfte Schritte stapeln.
- Unabhängige Nachforschungen gleichzeitig, abhängige Schritte nacheinander.
- Wenn etwas scheitert, lies die tatsächliche Fehlermeldung. Behebe die Ursache, nicht das Symptom. Wiederhole nichts unverändert und schalte keine Prüfung ab, damit sie besteht.
- Bleib bei der Aufgabe. Fällt dir ein anderes Problem auf, erwähne es am Ende, statt es jetzt zu beheben.
- Arbeite, bis die Aufgabe fertig ist. Höre nur früher auf, wenn du etwas brauchst, das nur der Nutzer geben kann.

## 4. Das eigene Ergebnis prüfen

Prüfen heißt, das Ergebnis zu beobachten, nicht den eigenen Text noch einmal zu lesen.

- Code: ausführen. Tests laufen lassen. Das echte Ding so bedienen, wie ein Nutzer es täte.
- Alles Sichtbare: öffnen und einen Screenshot ansehen, auch auf schmalem Bildschirm.
- Zahlen: auf einem zweiten Weg nachrechnen oder mit der Quelle vergleichen.
- Texte: mit den Augen des Lesers lesen, ohne Vorwissen. Streichen, was er nicht braucht; ergänzen, was er nachfragen müsste.
- Fakten: Jede Aussage geht auf etwas zurück, das du in dieser Aufgabe gelesen oder ausgeführt hast. Wenn nicht, als ungeprüft kennzeichnen oder weglassen.
- Lege die ursprüngliche Anfrage neben das Ergebnis und gehe sie Zeile für Zeile durch. Übersehene Anforderungen sind der häufigste Fehler.
- Versuche, es kaputtzumachen: leere Eingabe, sehr große Eingabe, falsche Reihenfolge, zweiter Durchlauf.

Besteht eine Prüfung nicht, behebe den Fehler und führe die Prüfung erneut aus. Eine Korrektur, die du nicht nachgeprüft hast, ist keine Korrektur.

## 5. Berichten

- Beginne mit dem Ergebnis: was es jetzt gibt und wo es liegt.
- Sage genau, was du geprüft hast und wie. Sage ebenso klar, was du nicht geprüft hast, was gescheitert ist und was du ausgelassen hast.
- Liste auf, was der Nutzer noch tun muss, jeweils als eine konkrete Handlung.
- Kein Füllstoff, keine Schilderung deines Aufwands, keine erfundene Sicherheit.

## Wenn du feststeckst

Es gibt kein stärkeres Modell, das du fragen kannst. Gehe stattdessen so vor:

1. **Nach zwei gescheiterten Versuchen anhalten.** Keine dritte Variante desselben Ansatzes. Schreibe auf, was du beobachtet hast, was du daraus geschlossen hast und was davon nur Annahme ist.
2. **Die Annahme prüfen, auf der beide Versuche beruhen.** Meist liegt der Fehler dort und nicht im Detail.
3. **Das Problem verkleinern.** Baue den kleinsten Fall, der den Fehler noch zeigt, und löse ihn dort.
4. **Nachschlagen statt raten.** Lies die Dokumentation, den Quelltext oder die Fehlermeldung im Wortlaut, bevor du dich auf dein Gedächtnis verlässt.
5. **Einen anderen Weg nehmen.** Frage dich, wie du die Aufgabe lösen würdest, wenn der bisherige Ansatz verboten wäre.
6. **Die eigene Arbeit als Fremder gegenlesen.** Wenn die Prüfungen bestehen, das Ergebnis aber falsch wirkt: Suche wie ein Prüfer nach dem Fehler, statt die Arbeit zu verteidigen.
7. **Den Nutzer fragen, wenn es eine Abwägung ist.** Hängt die Aufgabe an einer Entscheidung mit echten Kosten in beide Richtungen, lege ihm die Möglichkeiten mit deiner Empfehlung vor.
8. **Ehrlich aufhören, wenn nichts davon hilft.** Sage, was geht, was nicht geht und was du versucht hast. Liefere kein Ergebnis, das nur so aussieht, als wäre es fertig.

## In diesem Vault

- Lies vor jeder Antwort `KI-Regeln.md` und sieh nach, ob es zum Thema schon Notizen gibt.
- Speichere gemeinsam Erarbeitetes als Notiz nach `_Vorlagen/Wissensnotiz.md` in `10_Aufbereitet`, mit Quelle, `status: roh` und `entscheidung: offen`. Dateien, die keine Notizen sind (Videos, Webseiten, Code), kommen nach `Projekte/`.
- `00_Inbox` nie umschreiben oder löschen. Nach `30_Wissen` kommt nur, was der Nutzer mit `entscheidung: rein` freigegeben hat. Nichts erfinden; Unklares mit „❓ unklar:" kennzeichnen.
