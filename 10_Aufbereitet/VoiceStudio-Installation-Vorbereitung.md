---
titel: "VoiceStudio installieren und vorbereiten"
typ: wissen
thema: [Stimme, Installation, VoiceStudio]
quelle: "https://github.com/debpalash/VoiceStudio: docs/install/windows.md, macos.md, linux.md, docs/setup/huggingface-token.md (Stand Commit c4740f4)"
erstellt: 2026-10-23
status: roh
entscheidung: offen
tags: [voicestudio, installation, checkliste]
---
## Kernaussage
VoiceStudio wird als Desktop-App installiert. Modelle und Python-Umgebung richtet die App beim ersten Start selbst ein. Vorab braucht es nur Speicherplatz, ein Hugging-Face-Token und die Hardware-Klärung.

## Details
- Speicher: ca. 10 GB frei (Windows/macOS/Linux). Ohne NVIDIA-GPU genügen ca. 5 GiB, da dann die CPU-Version von PyTorch installiert wird.
- Plattform: Windows 10/11 x64 (ARM experimentell), macOS 13.3+ auf Apple Silicon (Intel nur Oberfläche, kein lokales Backend), Linux x86_64 (AppImage oder .deb).
- Download: GitHub-Releases. Vor dem Start mit `SHA256SUMS.txt` prüfen.
- Hugging Face: Token mit Lese-Recht unter huggingface.co/settings/tokens anlegen und in der App unter Settings → API Keys speichern, dann „Test now“. Gebraucht für Diarisierung und größere TTS-Modelle.
- Modelle: Beim ersten Mal nachladen, und die App fragt vorher nach.
- Kein Installations-Vorgang nötig, bevor das Video kommt. Die App verarbeitet Video und Übersetzung danach selbst.
- ❓ unklar: Ob mein Gerät ausreicht (GPU/RAM) ist offen. Das hängt von der Hardware ab, die ich noch nicht kenne.

## Wann brauche ich das?
- Vor dem ersten Einsatz für Papas Aufnahme, damit Installation und Modell-Download schon fertig sind.

## Verknüpft mit
- [[VoiceStudio-Stimmklon-und-Uebersetzung]]
- [[Papas-Stimme-uebersetzen]]
