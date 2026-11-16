# Meeting-KI (Notion-AI-Nachbau für Meetings)

Aus Aufnahmen werden Transkript, Zusammenfassung, Bericht, Aufgaben und Mermaid-Diagramme als Obsidian-Notizen.

```
Audio/Video ──faster-whisper (lokal)──▶ Transkript ──Claude (JSON-Schema)──▶ 4 Notizen
                                          ▲ .txt/.vtt geht auch direkt
```

## Start
```bash
pip install -r requirements.txt      # ffmpeg muss installiert sein
export ANTHROPIC_API_KEY=...         # oder: ant auth login
python meeting_ki.py aufnahme.mp3 --titel "Kickoff" --sprache de
```
Ergebnis in `10_Aufbereitet/Meetings/<datum>_<titel>/`: `zusammenfassung.md`, `bericht.md`, `diagramme.md`, `transkript.md` (alle `status: roh`, `entscheidung: offen`, Quelle gesetzt).

## Optionen
- `--whisper-modell tiny|base|small|medium|large-v3` (Standard `small`; größer = genauer, langsamer)
- `--sprache de|en` (Standard: automatisch)
- `--kein-fallback` schaltet den Server-Side-Fallback bei Refusals ab
- `MEETING_KI_MODEL` (Env) wechselt das Claude-Modell, Standard `claude-opus-5-5`
- `--analyse-json datei.json` rendert ohne API-Aufruf (zum Testen)

## Bekannte Grenzen
- Keine Sprechererkennung: Namen kommen nur, wenn sie im Gespräch fallen (sonst „❓ unklar").
- Mermaid-Syntax wird nicht automatisch validiert; bei Renderfehler in Obsidian den Block manuell korrigieren.
- Nicht live gegen die API getestet (kein Schlüssel in der Cloud-Umgebung); Parser und Renderer sind getestet.
