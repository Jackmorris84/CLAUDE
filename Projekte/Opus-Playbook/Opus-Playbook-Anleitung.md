# Opus-Playbook: Anleitung zum Installieren und Benutzen

Diese Datei enthält alles, was du brauchst: was das Opus-Playbook ist, wie du es installierst, wie du es einsetzt und wie du im Alltag damit umgehst. Das Playbook selbst steht ganz unten in dieser Datei.

## Was das ist

Das Opus-Playbook ist ein „Skill" für Claude Code, also eine Textdatei mit einer festen Arbeitsmethode. Wenn Claude sie benutzt, geht es bei jeder größeren Aufgabe gleich vor:

1. **Erst verstehen:** Was soll am Ende da sein, und woran erkennt man, dass es fertig ist?
2. **Planen:** Den schwierigsten Teil zuerst, den einfachsten Weg wählen.
3. **In Schritten arbeiten:** Jeden Schritt prüfen, bevor der nächste kommt.
4. **Das eigene Ergebnis prüfen:** Ausführen und ansehen, nicht nur behaupten.
5. **Berichten:** Was fertig ist, was geprüft wurde, was nicht, und was du noch tun musst.

Dazu kommt ein Abschnitt „Wenn du feststeckst" für den Fall, dass Claude nicht weiterkommt.

Der Nutzen: Claude Opus arbeitet damit gründlicher und sagt ehrlicher, was es wirklich geprüft hat. Es ist für das Modell Opus geschrieben und braucht kein teureres Modell.

## Was du brauchst

- Ein Claude-Abo, in dem Claude Code enthalten ist.
- Claude Code auf deinem Rechner (als Desktop-App oder im Terminal).

## Installieren

Es gibt zwei Wege. Weg A ist der bequemere.

### Weg A: Claude installiert es für dich

1. Lege diese Datei in einen beliebigen Ordner, zum Beispiel auf den Schreibtisch in einen neuen Ordner `playbook`.
2. Öffne Claude Code in diesem Ordner.
3. Füge diesen Text ein und schicke ihn ab:

```
Lies die Datei Opus-Playbook-Anleitung.md in diesem Ordner. Ganz unten steht zwischen den Markierungen "ANFANG SKILL" und "ENDE SKILL" der Inhalt eines Skills. Lege ihn unverändert als Datei SKILL.md im Ordner .claude/skills/opus-playbook/ in meinem Benutzerordner an, damit er in allen Projekten gilt. Zeig mir danach den Pfad der Datei und die ersten fünf Zeilen.
```

4. Claude fragt dich, ob es die Datei anlegen darf. Bestätige das.
5. Beende Claude Code und starte es neu.

### Weg B: Von Hand

1. Öffne deinen Benutzerordner.
   - **Mac:** Im Finder „Gehe zu" → „Gehe zum Ordner…" wählen und `~/.claude` eingeben.
   - **Windows:** Im Explorer in die Adresszeile `%USERPROFILE%\.claude` eingeben.
2. Lege dort den Ordner `skills` an, falls es ihn nicht gibt, und darin den Ordner `opus-playbook`.
3. Erstelle in `opus-playbook` eine Textdatei mit dem Namen `SKILL.md` (genau so geschrieben, ohne `.txt` am Ende).
4. Kopiere den Text zwischen „ANFANG SKILL" und „ENDE SKILL" vom Ende dieser Datei hinein. Die erste Zeile der Datei muss `---` sein.
5. Speichern, Claude Code beenden und neu starten.

Am Ende muss die Datei hier liegen:

- Mac und Linux: `~/.claude/skills/opus-playbook/SKILL.md`
- Windows: `%USERPROFILE%\.claude\skills\opus-playbook\SKILL.md`

### Prüfen, ob es geklappt hat

Öffne Claude Code in irgendeinem Ordner und schreibe:

```
Welche Skills hast du zur Verfügung? Ist opus-playbook dabei?
```

Nennt Claude den Skill `opus-playbook`, ist er installiert.

## Einsetzen: die Prompts

Stelle zuerst auf Opus um. Tippe dazu in Claude Code:

```
/model opus
```

**Aufgabe mit Playbook starten:**

```
Nutze das Opus-Playbook für diese Aufgabe: <deine Aufgabe>
```

**Zum Testen, ob es wirklich benutzt wird:**

```
Nutze das Opus-Playbook für diese Aufgabe: <deine Aufgabe>. Sag mir vorher, welchen Schritten du folgst.
```

Claude nennt dann die Überschriften aus dem Playbook, zum Beispiel „Erst verstehen" und „Planen".

**Wenn die Arbeit mittendrin stehen bleibt:**

```
Mach weiter, bis es fertig ist und funktioniert.
```

**Wenn du wissen willst, was wirklich geprüft wurde:**

```
Was davon hast du selbst ausgeführt oder angesehen, und was nicht?
```

## Wie du damit umgehst

- **Sag, woran du „fertig" erkennst.** Je klarer das Ziel, desto besser das Ergebnis. „Bau mir eine Seite" ist schwach. „Bau mir eine Seite mit Anmeldeformular, die auf dem Handy gut aussieht" ist stark.
- **Gib Claude das Material.** Dateien, Bilder, Texte und Fehlermeldungen in den Ordner legen oder einfügen. Das Playbook lässt Claude erst nachsehen und nur das fragen, was es nicht finden kann.
- **Rechne mit Rückfragen an den richtigen Stellen.** Vor allem, was sich nicht rückgängig machen lässt (löschen, senden, veröffentlichen, bezahlen, anmelden), fragt Claude nach deinem Ja. Das ist so gewollt.
- **Lies den Schlussbericht.** Dort steht, was geprüft wurde, was nicht, und was du noch selbst tun musst. Der Teil „nicht geprüft" ist der wichtigste.
- **Für Kleinigkeiten brauchst du es nicht.** Eine kurze Frage oder eine Ein-Zeilen-Änderung geht ohne Playbook schneller.
- **Du darfst es anpassen.** Die Datei `SKILL.md` ist normaler Text. Wenn dir eine Regel fehlt oder eine stört, ändere sie und starte Claude Code neu.
- **Eigene Regeln ergänzen.** Wenn du in einem Projekt feste Regeln hast (zum Beispiel wo Dateien abgelegt werden), schreibe sie als eigenen Abschnitt ans Ende der Datei.

## Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| Claude kennt den Skill nicht | Prüfe Ordnername (`opus-playbook`) und Dateiname (`SKILL.md`). Die Datei muss mit `---` beginnen. Danach Claude Code neu starten. |
| Die Datei heißt `SKILL.md.txt` | Dateiendungen im Explorer oder Finder einblenden und `.txt` entfernen. |
| Claude benutzt das Playbook nicht von selbst | Schreibe es ausdrücklich dazu: „Nutze das Opus-Playbook für diese Aufgabe: …" |
| Opus ist nicht in der Modellliste | Im Terminal `claude update` ausführen und Claude Code neu starten. |
| Der Skill soll nur in einem Projekt gelten | Lege den Ordner `.claude/skills/opus-playbook/` im Projektordner an statt im Benutzerordner. |

## Das Playbook

Alles zwischen den beiden Markierungen gehört in die Datei `SKILL.md`. Die Markierungszeilen selbst nicht mitkopieren.

**ANFANG SKILL**

````
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
````

**ENDE SKILL**
