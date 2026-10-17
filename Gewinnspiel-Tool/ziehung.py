#!/usr/bin/env python3
"""Gewichtete Verlosung. Jede E-Mail zaehlt einmal; Kaeufer bekommen mehr Lose.

CSV-Spalten (Kopfzeile noetig): email, bestaetigt (ja/nein), kaeufer (ja/nein)
Beispiel: python3 ziehung.py teilnehmer.csv --gewinner 3 --faktor 3 --log ziehung_2026-12-06.json
Mit --nur-kaeufer werden nur Kaeufer gezogen. --seed macht die Ziehung nachvollziehbar.
"""
import argparse, csv, json, secrets, random, sys
from datetime import datetime, timezone

JA = {"ja", "j", "yes", "y", "true", "1"}

def lade(pfad, nur_kaeufer):
    personen = {}
    with open(pfad, newline="", encoding="utf-8-sig") as f:
        for z in csv.DictReader(f):
            mail = z["email"].strip().lower()
            if not mail or z["bestaetigt"].strip().lower() not in JA:
                continue
            kaeufer = z["kaeufer"].strip().lower() in JA
            alt = personen.get(mail, False)
            personen[mail] = alt or kaeufer      # Dubletten: einmal zaehlen, Kaeufer-Status bleibt
    if nur_kaeufer:
        personen = {m: k for m, k in personen.items() if k}
    return personen

def ziehe(personen, anzahl, faktor, seed):
    rng = random.Random(seed)
    rest = dict(personen)
    gewinner = []
    while rest and len(gewinner) < anzahl:
        mails = list(rest)
        gewichte = [faktor if rest[m] else 1 for m in mails]
        w = rng.choices(mails, weights=gewichte, k=1)[0]
        gewinner.append(w)
        del rest[w]                              # pro Person nur ein Gewinn
    return gewinner

def main():
    a = argparse.ArgumentParser()
    a.add_argument("csv"); a.add_argument("--gewinner", type=int, default=3)
    a.add_argument("--faktor", type=int, default=3, help="Lose pro Kaeufer (Nicht-Kaeufer: 1)")
    a.add_argument("--nur-kaeufer", action="store_true"); a.add_argument("--seed")
    a.add_argument("--log")
    o = a.parse_args()
    seed = o.seed or secrets.token_hex(8)
    p = lade(o.csv, o.nur_kaeufer)
    if not p:
        sys.exit("Keine gueltigen Teilnehmer.")
    g = ziehe(p, o.gewinner, o.faktor, seed)
    lose = sum(o.faktor if k else 1 for k in p.values())
    ergebnis = {"zeit_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"), "seed": seed,
                "teilnehmer": len(p), "kaeufer": sum(p.values()), "lose_gesamt": lose,
                "faktor": o.faktor, "nur_kaeufer": o.nur_kaeufer, "gewinner": g}
    print(json.dumps(ergebnis, ensure_ascii=False, indent=2))
    if o.log:
        with open(o.log, "w", encoding="utf-8") as f:
            json.dump(ergebnis, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
