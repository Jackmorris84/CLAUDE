---
titel: "Base44-Prompt: Adventskalender Post-Studio"
typ: prompt
thema: [Adventskalender, Base44, Social Media]
quelle: "Teaser Werbung_v3.mp4 und Notiz Post-Werbung-v3-Teaser"
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

# 6. Später (noch NICHT bauen, nur Platz dafür lassen)
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
- [[Adventskalender]] (❓ unklar: Notiz existiert noch nicht im Vault)
