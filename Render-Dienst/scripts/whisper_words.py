#!/usr/bin/env python3
"""Wortgenaues Transkript mit faster-whisper.

Aufruf:  python3 whisper_words.py <audio-oder-video> <ausgabe.json> [--model small] [--language de]

Schreibt eine Liste: [{"text": "Hallo", "start": 0.12, "end": 0.48}, ...]
Installation (auf dem Rechner des Dienstes): pip install faster-whisper
Das Modell wird beim ersten Lauf automatisch geladen (Internet nötig, einige 100 MB bis 3 GB).

Hinweis: Whisper erfindet gern Sätze über Stille ("Vielen Dank."). vad_filter=True entfernt die
meisten davon; der Dienst prüft zusätzlich gegen die Stille-Erkennung von FFmpeg.
"""
import json
import sys


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print(__doc__)
        sys.exit(2)
    src, dst = args[0], args[1]
    model_name = args[args.index("--model") + 1] if "--model" in args else "small"
    language = args[args.index("--language") + 1] if "--language" in args else "de"
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("faster-whisper ist nicht installiert: pip install faster-whisper", file=sys.stderr)
        sys.exit(3)
    model = WhisperModel(model_name, device="auto", compute_type="int8")
    segments, _ = model.transcribe(
        src,
        language=language,
        word_timestamps=True,
        vad_filter=True,
        beam_size=5,
        condition_on_previous_text=False,
    )
    words = []
    for seg in segments:
        for w in seg.words or []:
            text = w.word.strip()
            if text:
                words.append({"text": text, "start": round(w.start, 3), "end": round(w.end, 3)})
    with open(dst, "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=1)
    print(f"{len(words)} Wörter geschrieben: {dst}")


if __name__ == "__main__":
    main()
