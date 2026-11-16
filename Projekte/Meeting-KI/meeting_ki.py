#!/usr/bin/env python3
"""Meeting-KI: Aufnahme -> Transkript -> Zusammenfassung, Bericht, Aufgaben, Diagramme.

Nutzung:
    python meeting_ki.py aufnahme.mp3                 # Audio (lokal via faster-whisper)
    python meeting_ki.py transkript.txt               # fertiges Transkript (.txt/.md/.vtt)
    python meeting_ki.py aufnahme.mp3 --titel "Kickoff" --sprache de

Ergebnis: Ordner 10_Aufbereitet/Meetings/<datum>_<slug>/ mit
    transkript.md, zusammenfassung.md, bericht.md, diagramme.md
Alle Notizen folgen den Vault-Regeln (status: roh, entscheidung: offen, Quelle angegeben).
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

VAULT = Path(__file__).resolve().parents[2]
OUT_ROOT = VAULT / "10_Aufbereitet" / "Meetings"
MODEL = os.environ.get("MEETING_KI_MODEL", "claude-opus-5-5")
AUDIO_EXT = {".mp3", ".wav", ".m4a", ".mp4", ".mkv", ".webm", ".ogg", ".flac", ".aac"}

SYSTEM = """Du bist die Meeting-KI für mein Second Brain. Du bekommst das Transkript eines Meetings.
Regeln:
- Nutze ausschließlich Informationen aus dem Transkript. Erfinde nichts.
- Unklares (Name, Frist, Zuständigkeit) schreibst du als "❓ unklar: ..." statt zu raten.
- Antworte auf Deutsch, knapp und konkret.
- Diagramme sind gültiges Mermaid (ohne Code-Fence). Setze alle Knotentexte in doppelte
  Anführungszeichen, vermeide Sonderzeichen in IDs. Wähle nur Diagramme, die der Inhalt trägt
  (Ablauf/Prozess -> flowchart TD, zeitliche Abfolge -> timeline, Zusammenhänge -> mindmap,
  Abstimmung zwischen Personen -> sequenceDiagram). 1-3 Diagramme, keines erzwingen.
- bericht_markdown: strukturierter Bericht mit ## Überschriften (Ausgangslage, Diskussion,
  Ergebnisse, Nächste Schritte). Keine H1-Überschrift."""

SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["titel", "teilnehmer", "tldr", "kernpunkte", "entscheidungen",
                 "aufgaben", "offene_fragen", "bericht_markdown", "diagramme"],
    "properties": {
        "titel": {"type": "string"},
        "teilnehmer": {"type": "array", "items": {"type": "string"}},
        "tldr": {"type": "string", "description": "2-4 Sätze Zusammenfassung"},
        "kernpunkte": {"type": "array", "items": {"type": "string"}},
        "entscheidungen": {"type": "array", "items": {
            "type": "object", "additionalProperties": False,
            "required": ["entscheidung", "begruendung"],
            "properties": {"entscheidung": {"type": "string"}, "begruendung": {"type": "string"}}}},
        "aufgaben": {"type": "array", "items": {
            "type": "object", "additionalProperties": False,
            "required": ["aufgabe", "verantwortlich", "faelligkeit"],
            "properties": {"aufgabe": {"type": "string"}, "verantwortlich": {"type": "string"},
                           "faelligkeit": {"type": "string"}}}},
        "offene_fragen": {"type": "array", "items": {"type": "string"}},
        "bericht_markdown": {"type": "string"},
        "diagramme": {"type": "array", "items": {
            "type": "object", "additionalProperties": False,
            "required": ["titel", "typ", "mermaid"],
            "properties": {"titel": {"type": "string"},
                           "typ": {"type": "string",
                                   "enum": ["flowchart", "timeline", "mindmap", "sequenceDiagram"]},
                           "mermaid": {"type": "string"}}}},
    },
}


# ---------- 1. Transkription ----------

def fmt_ts(sec: float) -> str:
    s = int(sec)
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def transcribe_audio(path: Path, sprache: str | None, modell: str) -> str:
    from faster_whisper import WhisperModel  # lokal, kein Audio verlässt den Rechner

    model = WhisperModel(modell, compute_type="int8")
    segments, info = model.transcribe(str(path), language=sprache, vad_filter=True)
    print(f"Sprache: {info.language} ({info.probability:.0%}), Dauer: {fmt_ts(info.duration)}",
          file=sys.stderr)
    return "\n".join(f"[{fmt_ts(s.start)}] {s.text.strip()}" for s in segments)


def read_transcript(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".vtt":  # WEBVTT: Kopf und Cue-Nummern entfernen, Zeiten kürzen
        out, ts = [], None
        for line in text.splitlines():
            m = re.match(r"(\d{2}:\d{2}:\d{2})[.,]\d+ --> ", line)
            if m:
                ts = m.group(1)
            elif line.strip() and not line.startswith(("WEBVTT", "NOTE")) and not line.strip().isdigit():
                out.append(f"[{ts}] {line.strip()}" if ts else line.strip())
                ts = None
        return "\n".join(out)
    return text


# ---------- 2. Analyse mit Claude ----------

def analyse(transcript: str, titel_hint: str | None, fallback: bool = True) -> dict:
    import anthropic

    client = anthropic.Anthropic()  # ANTHROPIC_API_KEY oder `ant auth login`
    user = (f"Titel-Vorgabe: {titel_hint}\n\n" if titel_hint else "") + \
           f"<transkript>\n{transcript}\n</transkript>"
    extra = {"betas": ["server-side-fallback-2026-07-01"], "fallbacks": "default"} if fallback else {}
    try:
        with client.beta.messages.stream(
            model=MODEL,
            max_tokens=32000,
            system=SYSTEM,
            output_config={"effort": "medium", "format": {"type": "json_schema", "schema": SCHEMA}},
            messages=[{"role": "user", "content": user}],
            **extra,
        ) as stream:
            msg = stream.get_final_message()
    except anthropic.RateLimitError as e:
        sys.exit(f"Rate-Limit, bitte später erneut versuchen ({e.message})")
    except anthropic.APIStatusError as e:
        sys.exit(f"API-Fehler {e.status_code}: {e.message}")
    except anthropic.APIConnectionError:
        sys.exit("Netzwerkfehler beim Aufruf der Claude-API")

    if msg.stop_reason == "refusal":
        sys.exit(f"Anfrage abgelehnt: {getattr(msg.stop_details, 'explanation', '')}")
    if msg.stop_reason == "max_tokens":
        sys.exit("Antwort abgeschnitten (max_tokens). Transkript kürzen oder max_tokens erhöhen.")
    text = next(b.text for b in msg.content if b.type == "text")
    return json.loads(text)


# ---------- 3. Notizen schreiben ----------

def slug(s: str) -> str:
    s = s.lower().translate(str.maketrans("äöüß", "aous"))
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:50] or "meeting"


def frontmatter(titel: str, quelle: str, typ: str, datum: str) -> str:
    return (f'---\ntitel: "{titel.replace(chr(34), chr(39))}"\ntyp: {typ}\nthema: [meeting]\n'
            f'quelle: "{quelle}"\nerstellt: {datum}\nstatus: roh\nentscheidung: offen\n'
            f'tags: [meeting]\n---\n')


def bullets(items: list[str]) -> str:
    return "\n".join(f"- {i}" for i in items) or "- –"


def clean_mermaid(code: str) -> str:
    return re.sub(r"^```(?:mermaid)?\s*|\s*```$", "", code.strip())


def render(a: dict, transcript: str, quelle: str, datum: str) -> dict[str, str]:
    t = a["titel"]
    fm = lambda typ: frontmatter(t, quelle, typ, datum)  # noqa: E731
    tasks = "\n".join(
        f"- [ ] {x['aufgabe']} — **{x['verantwortlich']}**, bis {x['faelligkeit']}" for x in a["aufgaben"]
    ) or "- –"
    decisions = "\n".join(f"- **{d['entscheidung']}** — {d['begruendung']}" for d in a["entscheidungen"]) or "- –"
    zus = (f"{fm('meeting-zusammenfassung')}## Kernaussage\n{a['tldr']}\n\n"
           f"## Teilnehmer\n{bullets(a['teilnehmer'])}\n\n## Kernpunkte\n{bullets(a['kernpunkte'])}\n\n"
           f"## Entscheidungen\n{decisions}\n\n## Aufgaben\n{tasks}\n\n"
           f"## Offene Fragen\n{bullets(a['offene_fragen'])}\n\n## Verknüpft mit\n"
           f"- [[bericht]] · [[diagramme]] · [[transkript]]\n")
    bericht = f"{fm('meeting-bericht')}# {t}\n\n{a['bericht_markdown']}\n\n## Verknüpft mit\n- [[zusammenfassung]] · [[transkript]]\n"
    diag = fm("meeting-diagramme") + f"# Diagramme: {t}\n\n" + "\n\n".join(
        f"## {d['titel']}\n```mermaid\n{clean_mermaid(d['mermaid'])}\n```" for d in a["diagramme"]
    ) + "\n"
    trans = f"{fm('meeting-transkript')}# Transkript: {t}\n\n{transcript}\n"
    return {"zusammenfassung.md": zus, "bericht.md": bericht,
            "diagramme.md": diag if a["diagramme"] else diag + "_Keine Diagramme sinnvoll._\n",
            "transkript.md": trans}


def write_notes(files: dict[str, str], titel: str, datum: str) -> Path:
    folder = OUT_ROOT / f"{datum}_{slug(titel)}"
    folder.mkdir(parents=True, exist_ok=True)
    for name, content in files.items():
        (folder / name).write_text(content, encoding="utf-8")  # nie stillschweigend löschen
    return folder


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("datei", type=Path, help="Audio/Video oder Transkript (.txt/.md/.vtt)")
    p.add_argument("--titel", help="Titel-Vorgabe")
    p.add_argument("--sprache", default=None, help="z.B. de, en (Standard: automatisch)")
    p.add_argument("--whisper-modell", default="small", help="tiny|base|small|medium|large-v3")
    p.add_argument("--analyse-json", type=Path, help="Analyse aus Datei laden (Test, kein API-Aufruf)")
    p.add_argument("--kein-fallback", action="store_true", help="Server-Side-Fallback abschalten")
    args = p.parse_args()

    if not args.datei.exists():
        sys.exit(f"Datei nicht gefunden: {args.datei}")
    transcript = (transcribe_audio(args.datei, args.sprache, args.whisper_modell)
                  if args.datei.suffix.lower() in AUDIO_EXT else read_transcript(args.datei))
    if not transcript.strip():
        sys.exit("Leeres Transkript.")

    a = (json.loads(args.analyse_json.read_text(encoding="utf-8")) if args.analyse_json
         else analyse(transcript, args.titel, fallback=not args.kein_fallback))
    datum = dt.date.today().isoformat()
    folder = write_notes(render(a, transcript, args.datei.name, datum), a["titel"], datum)
    print(f"Fertig: {folder.relative_to(VAULT)}")


if __name__ == "__main__":
    main()
