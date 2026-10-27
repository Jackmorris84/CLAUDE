#!/usr/bin/env bash
# Baut aus einem fertigen Referenzvideo einen "Rohclip" zum Testen:
#  - nimmt die Stellen ohne Kopfkarte (ab 4,0 s bis 19,9 s)
#  - übermalt das eingebrannte Untertitelband (delogo), damit unsere Untertitel nicht doppelt liegen
#  - fügt zwei künstliche Pausen (1,0 s und 0,7 s Standbild + Stille) ein, damit der Schnitt etwas zu tun hat
# Aufruf: scripts/testmaterial.sh <referenz.mp4> <ausgabe-ordner>
set -euo pipefail
REF="$1"; OUT="$2"; mkdir -p "$OUT"
VF="delogo=x=20:y=985:w=1040:h=190"
seg() { # start end gapdauer name
  ffmpeg -y -v error -ss "$1" -to "$2" -i "$REF" -vf "$VF,tpad=stop_mode=clone:stop_duration=$3,fps=30" \
    -af "apad=pad_dur=$3,aresample=48000" -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p -c:a aac -b:a 192k "$OUT/$4.mp4"
}
seg 4.0 8.0 1.0 p1
seg 8.0 13.0 0.7 p2
seg 13.0 19.9 0.0 p3
printf "file 'p1.mp4'\nfile 'p2.mp4'\nfile 'p3.mp4'\n" > "$OUT/liste.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/liste.txt" -c:v libx264 -crf 14 -preset fast -g 30 -pix_fmt yuv420p -c:a aac -b:a 192k "$OUT/roh1.mp4"
rm -f "$OUT"/p?.mp4 "$OUT/liste.txt"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/roh1.mp4"
