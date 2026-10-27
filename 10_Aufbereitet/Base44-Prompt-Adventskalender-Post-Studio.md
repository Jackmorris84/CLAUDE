---
titel: "Base44-Prompt: Adventskalender Post-Studio"
typ: prompt
thema: [Adventskalender, Base44, Social Media]
quelle: "Teaser Werbung_v3.mp4, Notiz Post-Werbung-v3-Teaser, 12 yt-Skills (00_Inbox/yt-skills)"
erstellt: 2026-10-27
status: roh
entscheidung: offen
tags: [base44, prompt, app, adventskalender]
---
## Kernaussage
Ein Prompt, den du komplett in Base44 einfügst. Er baut eine kleine App („Post-Studio“): Video und Idee reinziehen, mit dem Bot chatten, am Ende liegen Captions, Titel, Hashtags, Thumbnail und Upload-Checkliste für Instagram, TikTok, YouTube Shorts und Facebook fertig bereit. Alle 24+ Türen sehen im gleichen Stil aus.

## So benutzt du ihn
1. In Base44 ein neues Projekt starten und den Block „PROMPT“ unten komplett einfügen.
2. Nach dem Bauen unter **Einstellungen → Stil** die Werte prüfen (Name, Farben, Hashtags) und ein bis zwei fertige Beispiele hinterlegen, z. B. den Teaser (siehe [[Post-Werbung-v3-Teaser]]).
3. Pro Tür: Video reinziehen, Idee eintippen, mit dem Bot abstimmen, Paket kopieren und hochladen.

## PROMPT (in Base44 einfügen)

````text
Baue mir eine schlanke Web-App namens „Adventskalender Post-Studio“. Sie ist nur für EINEN Zweck da: Aus einem Video und einer Idee entsteht für jede Tür meines Adventskalenders (mindestens 24 Türen) ein einheitliches, fertiges Social-Media-Paket. Sprache der ganzen App und aller Ausgaben: Deutsch. Mobil und Desktop nutzbar, einfach, aufgeräumt, keine überflüssigen Funktionen.

# 1. Aufbau (nur 4 Bereiche)
1. **Kalender**: Raster mit Türen 1 bis 24 (Anzahl änderbar, „+ Tür“). Jede Kachel zeigt Nummer, Status (Idee / Video da / Paket fertig / Hochgeladen) und Mini-Thumbnail. Klick öffnet die Tür.
2. **Tür-Arbeitsbereich** (Hauptseite, links Chat, rechts Ergebnis):
   - Oben große Drop-Zone: Video reinziehen (MP4/MOV, hochkant 9:16 bevorzugt) plus Textfeld „Idee zur Tür“ (darf auch nur Stichworte oder eine Sprachnachricht-Abschrift sein).
   - Links: Chat mit dem Bot. Ich schreibe z. B. „Mach es kürzer“, „anderer Ton“, „Thumbnail aus Sekunde 12“, der Bot passt das Paket an.
   - Rechts: das Ergebnis in Tabs (Instagram, TikTok, YouTube Shorts, Facebook, Thumbnail, Upload-Checkliste). Jeder Block hat einen großen Button „Kopieren“.
3. **Stil** (Einstellungen): der zentrale Stil-Leitfaden, den der Bot bei jeder Tür verwendet (siehe Abschnitt 3). Ich kann alles bearbeiten.
4. **Export**: alle fertigen Pakete einer Tür oder des ganzen Kalenders als Textdatei/ZIP herunterladen.

# 2. Was pro Tür automatisch entsteht („Paket“)
Sobald Video und Idee da sind, startet der Bot und liefert:
1. **Video-Auswertung**: Länge, Format (Prüfung auf 9:16, 3–60 s ideal, Warnung wenn abweichend), Transkript des gesprochenen Textes (Deutsch), kurze Beschreibung der Szene. Wenn Transkription oder Bildanalyse nicht sicher ist, markiert er die Stelle mit „❓ unklar:“ und fragt mich im Chat, statt zu raten.
2. **Instagram Reels**: Caption (max. 2200 Zeichen, Hook in der ersten Zeile, Emojis sparsam) und 8 bis 10 Hashtags.
3. **TikTok**: kurze Caption (max. 150 Zeichen, Hook vorne) und 6 bis 8 Hashtags.
4. **YouTube Shorts**: 3 Titelvarianten (max. 70 Zeichen, mit #Shorts), Beschreibung, Tags (kommagetrennt), Hinweis „nicht für Kinder“ und Kategorie „Musik“, Empfehlung für eine der Varianten.
5. **Facebook**: etwas längere Caption, wenige Hashtags.
6. **Thumbnail/Cover (9:16, 1080×1920)**: aus einem passenden Standbild des Videos, im Stil des Leitfadens (siehe Abschnitt 3), mit Türnummer und kurzem Text. Ich kann im Chat eine andere Sekunde oder einen anderen Text wählen. Download als JPG.
7. **Upload-Checkliste**: pro Plattform kurze Schritte und die Reihenfolge (TikTok, Instagram, YouTube Shorts, Facebook), plus Hinweis, nicht ins untere Drittel der Videos zu schreiben (Untertitel liegen dort).
8. **Untertitel (optional)**: auf Wunsch eine SRT-Datei aus dem Transkript. Stil der eingebrannten Untertitel siehe Abschnitt 3.

# 2b. Die Agents (meine bestehenden YouTube-Skills, auf Reels/Shorts übertragen)
Baue für jeden Schritt einen eigenen Agent mit eigenem Prompt. Im Chat sage ich z. B. „/hook“, „/shorts“ oder „/titel“, oder der Bot ruft sie selbst in dieser Reihenfolge auf. Jeder Agent schreibt sein Ergebnis in ein eigenes Feld der Tür (Dateien-Prinzip: der nächste Agent liest das Feld des vorherigen, nichts hängt nur im Chat).

Reihenfolge je Tür: **Hook → Skript/Beats → Shorts-Schnitt → Titel & Thumbnail → SEO/Caption → Kommentare (nach dem Posten)**

| Agent | Befehl | Aufgabe (aus meinem Skill) | Wichtigste Regeln |
|---|---|---|---|
| Hook-Agent | /hook | Aus der Idee 5 Hooks nach den 21 Formeln (Datenbank „Hook-Formeln“) schreiben, mit dem Hook-Score bewerten, die besten 2 mit Wertung zeigen. Nie nur einen Hook abgeben. | Die ersten 15 Sekunden müssen 3 Dinge tun: den Titel bestätigen, eine Frage öffnen, die Auszahlung beweisen. Kein „Hallo, ich bin…“, kein Abo-Aufruf im Hook. |
| Skript-Agent | /skript | Hook, Wendepunkt (Sek. 15–45), Beats, Auszahlung, Schluss. Pro Beat „[ON SCREEN: …]“, Laufzeit bei 150 Wörtern/Minute. | Pro Beat eine Idee. Genau eine Bitte am Schluss (bei den Türen standardmäßig keine, siehe Stil). |
| Shorts-Agent | /shorts | Aus einem längeren Video (z. B. Konzert, Making-of) die Momente finden, die ohne Kontext funktionieren: 20–55 s, vollständiger Gedanke am Anfang, Wendung, Schluss mit einer Zeile. Top 5 mit Zeitcode und erster Zeile. | Pro Short NEUE erste Zeile (durch Hook-Score), Text im Bild für die ersten 2 Sekunden in anderen Worten als gesprochen, Loop-Punkt, Hinweis zum Zuschnitt auf 9:16. |
| Paket-Agent | /titel | Titel und Thumbnail als EIN Paar. 10 Titel schreiben, prüfen, die besten 3 mit Wertung zeigen, für den Sieger das Thumbnail-Briefing. | Titel max. 60 Zeichen (Suche), 40 (Handy-Feed), beides melden. Thumbnail max. 3 Wörter und darf den Titel nicht wiederholen. Zahl, Name oder Datum schlägt Adjektive. Höchstens 2 Wörter in Großbuchstaben. |
| SEO-Agent | /seo | Beschreibung, Tags, Caption für Instagram/TikTok/Facebook/YouTube. | Die ersten zwei Zeilen sind das Einzige, was gelesen wird. Maximal 15 Tags, nur zur Eindeutigkeit. Vorher 3 Suchanfragen formulieren, die das Video gewinnen soll, und prüfen, dass Titel und erste Zeilen deren Wörter enthalten. |
| Kapitel-Agent (nur bei längeren Videos) | /kapitel | Kapitel aus dem Transkript. | Erster Eintrag 00:00, mindestens 3, je mindestens 10 s, Titel mit 3–5 Wörtern als Versprechen. Ungültige Listen melden. |
| Kommentar-Agent | /kommentar | Eingefügte Kommentare sortieren: Fragen, Korrekturen, Lob, Köder (nicht antworten). Antworten unter 30 Wörtern, Antwort im ersten Satz, eine Rückfrage nur wenn echt. Einen Kommentar zum Anpinnen vorschlagen. | Keine Videos versprechen, die nicht abgesprochen sind. Wiederkehrende Fragen als Ideen für spätere Türen merken. |
| Plan-Agent | /plan | Plan für Wochen bis 24. Dezember: wie viele Stunden habe ich, was ist halb fertig. Tabelle mit Tag, Format, Arbeitstitel, Ein-Satz-Versprechen, was schon da ist, Stundenaufwand und was zuerst gestrichen wird. | Lieber wenige Uploads, die ich schaffe. Wochentag nur nennen, wenn ich ihn aus meinen Analytics gebe, nie annehmen. |
| Schnitt-Agent | /schnitt | Aus einem Transkript mit Zeitcodes die Schnittliste (Pausen, Füllwörter, Wiederholungen). Fasst kein Video an. | Zeitcodes nie raten. Pausen aus der Mitte kürzen, damit beide Seiten Luft behalten. |
| Retention-Agent | /retention | Retention-Export (CSV aus YouTube Studio) lesen: Hook-Leck (unter 25 % in 30 s ist gesund), Klippen, Rutsche. Nur das größte Leck + EINE Änderung nennen. | Ist alles gesund, sagen, dass das Video passt und das Paket das Problem ist. |
| Audit-Agent | /audit | Kanal prüfen: letzte 10 Titel als Menge, Thumbnails in Feed-Größe, erste 15 Sekunden, Rhythmus. | Endet mit EINEM Fix, drei Dingen, die schon funktionieren, und was ich noch NICHT tun soll. Kein Lob, das nicht stimmt. |
| Viral-Agent (später) | /viral | Erfolgreiche Videos der Nische nach Vielfachem des Kanal-Medians ranken (mindestens 4 Videos je Kanal, nur öffentliche Listen, nie ein eingeloggter Zugang). | Die Formel-Zuordnung ist ein Urteil über den Titel, keine Erklärung, warum das Video lief. Das sagen. |

**Gemeinsame Regeln für ALLE Agents (stehen in jedem Agent-Prompt):**
1. **Stimme zuerst:** Vor dem Schreiben das „Stimmprofil“ lesen (Einstellungen → Stimme: wie ich auf der Kamera spreche, Wörter, die ich nie benutze, wen ich anspreche, was ich nie behaupte). Gibt es keins, den Agent drei meiner Videos/Texte anfordern lassen, das Profil ableiten und zur Bestätigung speichern. Ein Text in falscher Stimme ist schlechter als keiner.
2. **Nichts erfinden:** keine Zahl, kein Ergebnis, keine Quelle ohne Beleg. Fehlt eine Zahl, nachfragen oder die Zeile ohne sie schreiben. Fehlende Werte als „Annahme“ kennzeichnen, nie als Tatsache.
3. **Das Tor:** Nichts wird veröffentlicht. Die App schreibt, ich veröffentliche. Jede Ausgabe endet mit einem kopierbaren Block und der Frage: **„Rausschicken oder ändern?“**
4. **Keine Überschreibung:** Gibt es für einen Schritt schon ein Ergebnis, fragen: wiederverwenden, neu machen oder überspringen?
5. **Ein Schritt übersprungen = Lücke sagen:** Wird ein Schritt ausgelassen (z. B. Viral ohne Daten), das oben in der Zusammenfassung der Tür nennen, nicht still weglassen.

**Hook-Score (im Hook-Agent und im Shorts-Agent einbauen):**
Fünf Eigenschaften je 0–100: Konkretheit (Zahlen, Namen, Daten, keine Füllwörter), Ansprache („du/dein“ in den ersten 6 Wörtern), Einsatz (was kostet es, so weiterzumachen), Neugier (offene Frage, nichts, was sich selbst beantwortet), Kürze (9–24 Wörter ideal). Gesamtwert = 60 % Mittelwert + 40 % schwächster Wert. Bewertung: ab 72 STARK, ab 55 BRAUCHBAR, darunter SCHWACH. Der Agent nennt immer die schwächste Eigenschaft und die Korrektur dazu. Ein hoher Wert ist nie ein Versprechen, ein niedriger ein Grund, nochmal hinzusehen.
**Wichtig:** Mein Original-Skript `hookscore.py` misst nur ENGLISCH. Deutsche Hooks deshalb nicht direkt bewerten (sonst Unsinnszahlen), sondern: Hook auf Deutsch schreiben, eine treue englische Übersetzung derselben Struktur bewerten lassen, dann den finalen Satz auf Deutsch bauen und beide Fassungen zeigen. Die Zahlen beschreiben die Struktur, nicht den Wortlaut. Bei ruhiger Weihnachts-/Entspannungsmusik ist „Einsatz“ kaum erreichbar: ein erstes SCHWACH ist normal. Nie eine Behauptung erfinden oder ein „Einsatz“-Wort einbauen, nur um die Zahl zu heben. Ehrlich und schwach ist besser als stark auf einer Lüge.
Lege eine Tabelle „Hook-Formeln“ an und befülle sie mit den 21 Formeln aus meiner hochgeladenen Datei `hooks.json` (id, Name, Form, Beispiel, wann sie scheitert, Erkennungsmuster). Die 5 Hook-Regeln daraus gelten fest: Titel im ersten Satz bestätigen; eine Idee; konkret schlägt groß; angekündigtes Material innerhalb von 20 Sekunden zeigen; nie mit „Wer bin ich“ beginnen.

# 3. Stil-Leitfaden (Standardwerte, in „Stil“ änderbar)
Ableitung aus meinem ersten Teaser-Video, gilt für ALLE Türen und die Promotion:
- Format: 1080×1920, hochkant 9:16, ca. 20 bis 40 Sekunden pro Tür-Video.
- Optik: Weihnachtliches Wohnzimmer-/Studio-Setting mit warmem Holz, Weihnachtsbaum mit Lichtern, rotes Hemd, Panflöte im Arm. Warme Gold-, Rot- und Dunkeltöne.
- Farben: Gold #E8C675 für Hervorhebungen, Weiß für Fließtext, fast schwarzer Hintergrund bei Texttafeln.
- Schrift: Serifenschrift (kursiv/fett), Untertitel in dunklen, abgerundeten Boxen im unteren Drittel, wichtige Wörter in Gold hervorgehoben.
- Kopfzeile oben im Video: kleines Label „MEIN PROJEKT“ in Gold über der Zeile „Eine Überraschung für euch“ (bei Türen: „TÜR [Nummer]“ statt „MEIN PROJEKT“).
- Schluss: schwarze Endkarte in Gold-Serif mit „Seid bereit…“ (bei Türen: Hinweis auf die nächste Tür, z. B. „Morgen: Tür [Nummer+1]“).
- Ton der Texte: persönlich, warm, ruhig, Ich-Form, ein Hauch Geheimnis, kein Verkaufsdeutsch.
- Call-to-Action: standardmäßig KEINER (kein Link, kein „Jetzt kaufen“). Nur wenn ich im Chat einen Link/CTA nenne, wird er eingebaut.
- Absendername: Feld in den Einstellungen (leer lassen = Ich-Form ohne Namen).
- Wiederkehrende Hashtags (änderbar): #weihnachten #panflöte #weihnachtsmusik #adventskalender #adventszeit #überraschung
- Pro Tür kommen 2 bis 4 themenbezogene Hashtags dazu.

**Beispiel für den Tonfall (Instagram, Teaser):**
„Draußen Sturm, 40 Grad Hitze, und ich bin im Studio verkrochen. 🌪️🔥 Hier beginnen gerade die Aufnahmen für etwas, das ich noch nicht verraten darf. Nur so viel: Es wird ganz zart. 🎄✨ Seid bereit… 🤍“

# 4. Verhalten des Bots (feste Regeln)
- Nichts erfinden: keine Fakten, Namen, Termine, Preise, Orte oder Versprechen, die nicht in Video, Idee oder Chat stehen. Fehlendes als „❓ unklar:“ markieren und gezielt nachfragen (kurz, eine Frage nach der anderen).
- Immer erst fragen, bevor etwas verraten wird, das als Überraschung gedacht ist (z. B. Projektname, Datum, Musikstück).
- Jede Antwort enthält am Ende das aktualisierte Paket, nicht nur eine Beschreibung der Änderung.
- Versionen speichern: jede Änderung als neue Version der Tür, ich kann zurückspringen. Nichts endgültig löschen, nur archivieren.
- Konsistenz: Bevor er schreibt, liest er den Stil-Leitfaden und die zwei zuletzt fertigen Türen, damit alle Türen gleich klingen und aussehen. Wiederholungen bei Hooks und Hashtags vermeiden.
- Keine automatische Veröffentlichung. Hochgeladen wird von mir manuell. (Optional später: direkte Anbindung, siehe Abschnitt 6.)

# 5. Technische Umsetzung (bitte so bauen)
- Datenmodell: Tür (Nummer, Status, Idee, Videodatei, Transkript, Pakete als Versionen, Thumbnail), Stil (Leitfaden-Felder aus Abschnitt 3), Chat-Nachricht (Tür, Rolle, Text).
- KI-Funktionen über Base44-Integrationen: Textgenerierung für Captions/Titel/Chat (mit Zugriff auf Stil, Transkript, Idee, letzte Türen), Bildanalyse für Standbilder.
- Standbilder werden im Browser aus dem Video erzeugt (Canvas, ein Bild pro 2 Sekunden, Vorschau zur Auswahl). Das Thumbnail wird im Browser aus dem gewählten Standbild gerendert (Farbbalken unten, Schrift und Farben aus dem Stil).
- Transkription: nutze eine verfügbare Speech-to-Text-Integration auf Deutsch. Falls Base44 keine hat, baue ein Textfeld „Gesprochenen Text einfügen“ als Ersatz und sag mir das klar. Rate nie den Text.
- Dateien: Videos in Base44-Dateispeicher, maximale Größe anzeigen.
- Nur ich als Nutzer, einfache Anmeldung genügt.

# 5b. Hochladen in die App (von mir, nach dem Bauen)
Ich lade `hooks.json` hoch (Datenquelle „Hook-Formeln“) und füge mein Stimmprofil (`voice.md`) in Einstellungen → Stimme ein. Die übrigen Regeln stehen schon in den Agent-Prompts oben.

# 6. Später (noch NICHT bauen, nur Platz dafür lassen)
- Viral-Agent mit eigener Konkurrenz-Liste.
- Direktes Posten zu TikTok, Instagram, YouTube über verbundene Konten.
- Kalender mit Veröffentlichungsdatum pro Tür und Erinnerung.
- Zusätzliche Promo-Typen (Countdown, Rückblick, Story-Ankündigung) im gleichen Stil.

# 7. Fertig, wenn
Ich ein Video und eine Idee in Tür 1 ziehe, mit dem Bot zwei bis drei Mal abstimme und danach für alle vier Plattformen kopierbare Texte, ein Thumbnail und eine Checkliste habe, im Stil des Leitfadens und ohne erfundene Angaben.
````

## Details
- Bewusst klein gehalten („nur dieser Zweck“), damit Base44 die App stabil baut. Erweiterungen kommen in einem zweiten Schritt.
- Die Stil-Werte stammen aus dem Teaser-Video (Gold #E8C675, Serifenschrift, „MEIN PROJEKT“-Label, Endkarte „Seid bereit…“) und der Notiz [[Post-Werbung-v3-Teaser]].
- ❓ unklar: Ob Base44 Video-Transkription eingebaut hat. Der Prompt hat deshalb eine Rückfalllösung (Text einfügen).
- ❓ unklar: Gewünschte Videolänge pro Tür und der echte Absendername. Im Prompt als Platzhalter/Standard gesetzt (20–40 s, Ich-Form).
- ❓ unklar: Der Teaser enthielt kein „Tür“-Label. Die Türnummer-Variante ist ein Vorschlag von mir.

## Wann brauche ich das?
- Beim Anlegen der App in Base44.
- Wenn sich der Stil ändert: erst hier und in der App unter „Stil“ anpassen, damit alle Türen gleich bleiben.

## Verknüpft mit
- [[Post-Werbung-v3-Teaser]]
- [[YT-Skills-Uebersicht]]
- [[Adventskalender]] (❓ unklar: Notiz existiert noch nicht im Vault)
