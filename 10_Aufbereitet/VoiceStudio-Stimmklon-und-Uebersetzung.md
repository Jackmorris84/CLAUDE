---
titel: "VoiceStudio: Stimmklon plus Übersetzung"
typ: wissen
thema: [Stimme, Voice-Cloning, Dubbing, Open-Source]
quelle: "https://github.com/debpalash/VoiceStudio (Stand Commit c4740f4, v0.5.7-beta.3); docs/dubbing/translation-engines.md, backend/services/speaker_clone.py"
erstellt: 2026-10-23
status: roh
entscheidung: offen
tags: [voicestudio, tts, dubbing]
---
## Kernaussage
VoiceStudio ist ein Open-Source-Tool, das eine Stimme klonen und Sprache in eine andere Sprache übersetzen kann, mit der geklonten Stimme neu gesprochen. Die Pipeline lautet: transkribieren → übersetzen → mit der Stimme des Sprechers neu sprechen.

## Details
- Voice-Cloning, Voice-Design, Video-Dubbing und Transkription laufen lokal auf eigener Hardware; Remote-Dienste sind optional (README).
- Dubbing-Pipeline laut Doku: transkribieren → übersetzen → sprechen (`docs/dubbing/translation-engines.md`).
- Übersetzungs-Engines: Argos und NLLB-200 offline; Google, DeepL, Microsoft, MyMemory und LLM online (DeepL/Microsoft brauchen API-Key).
- Die Sprecher-Stimme wird aus dem Audio gewonnen: die längste saubere Passage pro Sprecher, 5–15 s, Vocals aus Demucs (`backend/services/speaker_clone.py`).
- Eingabe: Audio- oder Videodateien per Upload, außerdem Video-URL.
- Hardware: NVIDIA (Windows/Linux), Apple Silicon (Metal), oder CPU (langsamer, ca. 5 GB frei für PyTorch).
- Benötigte Modelle werden bei der ersten Nutzung nachinstalliert.

## Wann brauche ich das?
- Wenn ich eine Aufnahme einer Stimme in eine andere Sprache übertragen will und dabei die Stimme erhalten bleiben soll.

## Verknüpft mit
- [[Papas-Stimme-uebersetzen]]
