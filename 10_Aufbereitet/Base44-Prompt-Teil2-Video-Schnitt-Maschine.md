---
titel: "Base44-Prompt Teil 2: Video-Schnitt-Maschine"
typ: prompt
thema: [Adventskalender, Base44, Videoschnitt, FFmpeg, HyperFrames]
quelle: "Werbung_v3.mp4 (Look ausgemessen), 5-Pass-Reel-Edit-Kit und Reel-Werbung-Adventskalender-V1 (Branch ccr-9ffd4d23-m2cogq), yt-Skills (00_Inbox/yt-skills)"
erstellt: 2026-10-27
status: roh
entscheidung: offen
tags: [base44, prompt, video, schnitt, untertitel]
---
## Kernaussage
Zweiter Prompt für die schon gebaute Base44-App: Rohvideos (mehrere, je bis 300 MB) hochladen, Auftrag schreiben, und die App liefert ein fertiges Video im Stil von `Werbung_v3.mp4` plus Hook, Titel, Thumbnail, angepinntem Kommentar und Captions. Teil 1 siehe [[Base44-Prompt-Adventskalender-Post-Studio]].

## Entscheidung: FFmpeg + HyperFrames, aber nicht in Base44 selbst
- **Beides, mit klarer Aufgabenteilung:** FFmpeg schneidet, setzt zusammen und mastert den Ton. HyperFrames (HTML/CSS/GSAP, rendert Bild für Bild über Headless-Chromium und kodiert mit FFmpeg) zeichnet Untertitel, Kopfkarte, Endkarte und Intro. Das passt zu deinem 5-Pass-Kit („HTML/CSS Frame für Frame in einem Headless-Browser“) und liefert dasselbe Ergebnis bei jedem Lauf. Quelle: [HeyGen HyperFrames Doku](https://developers.heygen.com/hyperframes-overview), [Beschreibung](https://www.noqta.tn/en/blog/heygen-hyperframes-html-to-mp4-ai-agent-video-2026) (Apache 2.0, lokal oder in Docker nutzbar).
- **Warum außerhalb:** Base44 ist Oberfläche, Datenbank und Backend-Funktionen. ❓ unklar: ob dort FFmpeg/Chromium laufen, wie lang eine Funktion rechnen darf und wie groß Uploads sein dürfen. Ich habe dazu keine offizielle Doku gefunden (nur Hinweise auf frühere 50-MB-Grenzen, du hast 300 MB bestätigt). Ein 300-MB-Video lässt sich nicht sinnvoll durch eine kleine Funktion schicken.
- **Deshalb zwei Teile:**
  1. **Base44-App:** Upload, Auftrag, Chat, Agents, Vorschau, Download. Sie schickt einen „Schnittplan“ (JSON) an
  2. **Render-Dienst** (kleiner Server mit Docker: Node 22, FFmpeg, HyperFrames, Whisper für Transkription). Alternative für den Anfang: derselbe Dienst läuft auf deinem Windows-PC.
- ❓ unklar: Wo der Render-Dienst laufen soll (eigener PC, günstiger Cloud-Server). Kann ich als nächsten Schritt in diesem Repository bauen und hier testen.

## Look-Referenz: gemessen an Werbung_v3.mp4
- Format: 1080×1920 (9:16), 30 fps, H.264 (ca. 6 Mbit/s) + AAC Stereo (192 kbit/s), 23,4 s.
- Ton: gemessen −15,3 LUFS, Peak −1,3 dBFS. Dein Kit sagt −14 LUFS und Peaks unter −1 dB. Ziel in der App: −14 LUFS, Peak unter −1 dB.
- Schnitt: Pausen sind schon eng (keine Stille über 0,25 s). V1-Notiz: Pausen auf ca. 0,2 s gekürzt, Start bei „Hey Leute“.
- Intro (ca. 0 bis 3 s): Das Bild liegt etwas verkleinert in einem dunklen Rahmen mit warmem rotem Schimmer an den Rändern, danach füllt es das Bild. ❓ unklar: genaue Dauer und ob es ein Zoom ist. Ich habe nur Standbilder bei 0 bis 2,5 s gesehen. Bitte im Prompt als „sanfter Zoom von ca. 90 % auf 100 % in 3 s“ umsetzen und mir mit Vorschau bestätigen lassen.
- Kopfkarte (oben links, ca. 0 bis 3 s): dunkelbraune, halbtransparente Karte mit abgerundeten Ecken. Oben eine dünne goldene Linie, darunter „MEIN PROJEKT“ (klein, Großbuchstaben, weit gesperrt, Gold), darunter „Eine Überraschung für euch“ (Serif, kursiv, weiß). Bei Türen: „TÜR [Nr.]“ statt „MEIN PROJEKT“.
- Untertitel: unten in der Bildmitte (ca. 55 bis 60 % Höhe), dunkelbraune abgerundete Pille mit Transparenz. 1 bis 3 Wörter pro Einblendung, Serif fett. Normale Wörter weiß, das gerade betonte Wort Gold und kursiv (Beispiele: „wir **haben**“, „draußen **Sturm.**“, „Richtig **Sturm**“, „und **Hitze** von“). Betont wird nicht nur das gerade gesprochene Wort, sondern das Schlüsselwort der Einblendung. Regel: pro Einblendung höchstens ein Schlüsselwort, nach Bedeutung gewählt, Liste vor dem Rendern zur Freigabe zeigen.
- Endkarte (ab ca. 21 s): schwarzer Hintergrund, „Seid bereit…“ in Gold, Serif kursiv, mittig. Bei Türen: Hinweis auf die nächste Tür.
- Farben und Schrift: Gold ca. #E8C675 (aus dem Bild geschätzt), V1-Notiz nennt Gold #D8B878. ❓ unklar: Welcher Wert gilt und welche Schrift genau (sichtbar: Serif/kursiv, ähnlich Playfair Display; V1 nennt Cinzel für Schlagwörter und Inter für Hilfstext). In den App-Einstellungen als änderbare Werte anlegen, Standard: Gold #E8C675, Schrift „Playfair Display“ (kursiv/fett).

## PROMPT (nach Teil 1 in Base44 einfügen)

````text
Erweitere meine App „Adventskalender Post-Studio“ um eine Video-Schnitt-Maschine. Ziel: Ich lade Rohmaterial hoch, beschreibe kurz, was ich haben will, und bekomme ein fertig geschnittenes Video im festen Stil, dazu alle Texte (Hook, Titel, Thumbnail, angepinnter Kommentar, Captions). Sprache der App: Deutsch.

# 1. Upload
- Mehrere Videos pro Tür gleichzeitig hochladen (Drag & Drop), je bis 300 MB, MP4/MOV. Fortschrittsbalken pro Datei, Wiederaufnahme bei Abbruch, falls möglich.
- Jedes Video bekommt eine Nummer (Reihenfolge änderbar per Ziehen), eine Notiz-Zeile („Szene Wohnzimmer“) und eine Vorschau mit Länge/Format. Warnung, wenn nicht 9:16.
- Großes Textfeld „Was soll daraus werden?“ (Idee, Länge, Stimmung, Tür-Nummer). Ein Knopf „Schnitt starten“.

# 2. Zwei Teile (wichtig)
Base44 selbst rechnet kein Video. Baue deshalb eine saubere Schnittstelle zu einem externen Render-Dienst:
- Backend-Funktion `startRender`: schickt an die Render-URL (aus Einstellungen, Geheimnis „RENDER_API_KEY“) einen Auftrag: Liste der Rohvideo-URLs (signierte Download-Links), Schnittplan (JSON, siehe 4) und Stil (siehe 5).
- Backend-Funktion `renderStatus` / Webhook: Status (wartet, transkribiert, schneidet, zeichnet, mastert, fertig, Fehler) und Fortschritt in Prozent, am Ende URLs für `final.mp4`, `cover.jpg`, `words.json`, `schnittliste.json`.
- Zeige in der App einen Auftrags-Verlauf mit Status, Dauer und Fehlertext. Wenn die Render-URL fehlt, zeige einen klaren Hinweis „Render-Dienst nicht verbunden“ und erlaube trotzdem alles andere (Texte, Hooks, Pakete).
- Der Render-Dienst benutzt FFmpeg für Schnitt, Zusammensetzen und Ton und HyperFrames (HTML/CSS/GSAP, Frame für Frame) für Untertitel, Kopfkarte, Endkarte und Intro. Dafür baue ich ihn separat. Die App muss nur die Schnittstelle sauber sprechen.

# 3. Die Schritte (meine 5-Pass-Methode, jeder Schritt einzeln freigebbar)
Zeige pro Tür eine Leiste mit den Schritten. Nach jedem Schritt gibt es eine Vorschau und ich schreibe Notizen wie ein Regisseur („nur 00:04 bis 00:07 neu“). Mit „Weiter“ geht es zum nächsten Schritt. Mit „Alles automatisch“ laufen alle durch, mit Stopp vor dem Export.
1. **Transkript:** Wortgenau mit Start- und Endzeit je Wort (`words.json`), Deutsch. Pausen über 0,4 s und Stolperer/Wiederholungen werden aufgelistet, noch nichts geschnitten. Zeige das Transkript als Tabelle, in der ich falsch verstandene Wörter korrigieren kann (z. B. „Zartes“ statt „Satus“). Nie Zeiten raten oder Wörter gleichmäßig verteilen: echte Wortzeiten verwenden. Fehlen sie, melde das.
2. **Schnitt:** Lücken raus (Pausen über 0,4 s auf ca. 0,2 s kürzen, Füllwörter wie „äh“, „also ja“ und Wiederholungen markieren und nach meiner Freigabe entfernen). An jedem Schnitt etwa 0,1 s Atem lassen, nie bündig an der Sprache schneiden. Mehrere Rohvideos in meiner Reihenfolge zusammensetzen (harte Schnitte, optional 0,15 s Überblendung). Zeige die Schnittliste (Zeitcodes, Grund) und die gesparte Zeit. Wörter und Zeiten danach neu auf den geschnittenen Film beziehen.
3. **Untertitel:** 1 bis 3 Wörter pro Einblendung, mindestens 0,4 s sichtbar, jede erscheint, wenn das Wort gesprochen wird. Pro Einblendung ein Schlüsselwort in Gold und kursiv, der Rest weiß. Zeige vorher die Liste der Schlüsselwörter zum Tauschen. Nie über dem Gesicht, Sicherheitsabstand für Instagram (oben 220 px, unten 380 px, rechts 140 px freihalten; das Untertitelband darf trotzdem im unteren Mittelfeld liegen, wie im Referenzstil).
4. **Rahmen und Karten:** Intro (Bild minimal verkleinert in dunklem Rahmen mit warmem roten Schimmer, dann auf Vollbild), Kopfkarte oben links, Endkarte am Schluss. Texte kommen aus den Feldern der Tür (Label, Titelzeile, Endtext).
5. **Ton:** Stimme säubern (Rumpeln und Rauschen), auf −14 LUFS mastern, Spitzen unter −1 dB, Stimme immer oben. Optional leise Musik, die unter der Stimme abgesenkt wird. Keine Effekte, die ich nicht freigegeben habe.
6. **Export:** 1080×1920, 30 fps, H.264 + AAC, dazu `cover.jpg` (Bild mit einem großen Wort), `words.json`, `schnittliste.json` und eine SRT-Datei. Nach dem Export automatisch das Post-Paket (Abschnitt 6).

# 4. Schnittplan (JSON, so soll die App ihn speichern und senden)
Speichere pro Auftrag ein Feld `plan` mit: `clips` (id, url, reihenfolge), `schnitte` (clip, von, bis, grund: pause | fueller | wiederholung | manuell, freigegeben ja/nein), `woerter` (wort, start, ende, clip, korrigiert ja/nein), `untertitel` (text, start, ende, schluesselwort), `karten` (kopf: label + zeile + von/bis, ende: text + ab), `ton` (ziel_lufs: -14, spitze_db: -1, musik: aus/an), `export` (breite 1080, hoehe 1920, fps 30). Ich muss jeden Teil im Fenster ändern können, danach „Nur geänderte Stellen neu rendern“.

# 5. Stil (Referenz: mein Video Werbung_v3, alles in Einstellungen änderbar)
- Format 1080×1920, 30 fps, H.264, AAC.
- Untertitel: dunkelbraune, halbtransparente, abgerundete Pille in der unteren Bildmitte (ca. 55 bis 60 % Höhe), Serifenschrift fett (Standard: Playfair Display), weiß, Schlüsselwort gold (#E8C675) und kursiv.
- Kopfkarte oben links, ca. 0 bis 3 s: dünne goldene Linie, „MEIN PROJEKT“ (klein, Großbuchstaben, weit gesperrt, Gold), darunter „Eine Überraschung für euch“ (Serif kursiv, weiß), halbtransparente dunkelbraune Karte mit abgerundeten Ecken. Bei Türen „TÜR [Nummer]“.
- Intro ca. 0 bis 3 s: Bild leicht verkleinert im dunklen Rahmen mit roten Rändern, dann Vollbild.
- Endkarte ab ca. 21 s: schwarz, „Seid bereit…“ in Gold, Serif kursiv, mittig (bei Türen: nächste Tür).
- Bewegung: schnell hinein (0,2 bis 0,35 s), halten, sauber hinaus. Eine Idee pro Bild. Dezente Zooms höchstens 6 %, kein Wackeln.
- Nicht: keine Emojis in Untertiteln, keine bunten Regenbogenfarben, höchstens 2 Schriften, kein weißer Umriss um mich.
- Zeige mir nach dem ersten Lauf eine Gegenüberstellung „Referenz vs. neu“ (Standbilder bei 0, 1, 2, 5, 10 und letzter Sekunde), damit ich Abweichungen sofort sehe.

# 6. Das Post-Paket am Ende (alles in einem Rutsch, mit meinen Agents)
Sobald der Export steht, laufen automatisch (Abschnitt „Agents“ aus Teil 1, immer mit Stimmprofil und ohne Erfundenes):
1. **Hook-Agent** aus dem Transkript: 5 Hooks nach den 21 Formeln, Hook-Score, die besten 2. Der Gewinner-Satz wird als Kopfzeile des Videos vorgeschlagen.
2. **Shorts-Agent:** wenn ein Rohvideo über 60 s ist, die besten Ausschnitte (20 bis 55 s) vorschlagen.
3. **Paket-Agent:** 10 Titel, Top 3 mit Wertung, Thumbnail-Briefing (max. 3 Wörter, nicht der Titel). Das Thumbnail selbst als 9:16-JPG aus einem gewählten Standbild mit dem Stil (Balken, Gold-Schrift).
4. **SEO-Agent:** Captions für Instagram, TikTok, Facebook, YouTube (Titel, Beschreibung, Tags, Hashtags).
5. **Kommentar-Agent:** einen Vorschlag für einen **angepinnten Kommentar** (Frage oder Satz, der Antworten auslöst, unter 30 Wörter, ohne Versprechen). Nach dem Posten kann ich echte Kommentare einfügen, dann sortiert er sie und schlägt Antworten vor.
6. **Viral-Check (einfach):** Der Viral-Agent bewertet Hook, Länge, Schnitt-Tempo und Titel nach meinen Regeln und sagt in 3 Sätzen, was die Schwachstelle ist. Er behauptet nie, ein Video werde viral. (Ein Abgleich mit Konkurrenzdaten kommt später, siehe Teil 1.)
7. **Upload-Checkliste** pro Plattform.
Alles als Tabs im Tür-Arbeitsbereich mit „Kopieren“-Knöpfen, Ende jeder Ausgabe: „Rausschicken oder ändern?“. Nichts wird automatisch veröffentlicht.

# 7. Regeln
- Nichts erfinden: Wörter, Zeiten, Zahlen und Quellen nur aus dem Material. Unklares mit „❓ unklar:“ markieren und fragen.
- Originalvideos bleiben unverändert erhalten. Nichts endgültig löschen, nur archivieren. Jeder Export ist eine neue Version.
- Fehler im Render-Dienst: Fehlertext zeigen, bisherige Ergebnisse behalten, nicht raten, nicht stillschweigend neu starten.
- Datenschutz: Videos und Transkripte nur in meinem Konto, signierte Links mit Ablaufzeit.
````

## Details
- Dein 5-Pass-Kit enthält zusätzlich Pass 02 (Freisteller/Text hinter dem Kopf) und Pass 04 (Motion-Szenen mit Sounds). Im Referenzvideo gibt es das nicht, deshalb stehen sie hier nicht als Pflicht. Kann später als optionale Schritte dazu.
- V1 hatte Wortzeiten nur proportional geschätzt. Die App soll echte Wortzeiten verwenden (Whisper im Render-Dienst).
- Die Referenzwerte stammen aus Standbildern und Messungen. Alles Unsichere ist oben mit ❓ markiert.

## Wann brauche ich das?
- Wenn die App aus Rohmaterial fertige Tür-Videos machen soll. Reihenfolge: Teil 1 einfügen (erledigt), dann diesen Teil, dann den Render-Dienst bauen.

## Verknüpft mit
- [[Base44-Prompt-Adventskalender-Post-Studio]]
- [[YT-Skills-Uebersicht]]
- [[Post-Werbung-v3-Teaser]]
- [[5-Pass-Reel-Edit-Kit]] (liegt auf Branch ccr-9ffd4d23-m2cogq)
- [[Reel-Werbung-Adventskalender-V1]] (liegt auf Branch ccr-9ffd4d23-m2cogq)
