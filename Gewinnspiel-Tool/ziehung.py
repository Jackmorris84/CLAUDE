#!/usr/bin/env python3
"""Gewichtete Verlosung. Jede E-Mail zaehlt einmal.

Lose: Kaeufer des Kalenders 3, alle anderen 1; nur im Finale zaehlt die Warteliste 2 (--modus advent|finale, Faktoren einstellbar).
Wer beides ist, bekommt nur den hoechsten Wert (nicht addiert).

CSV-Spalten (Kopfzeile noetig): email, bestaetigt (ja/nein), kaeufer (ja/nein), warteliste (ja/nein, optional; alte Spalte 'newsletter' wird auch gelesen)
Advents-Ziehung (29.11., 6.12., 13.12., 20.12.): python3 ziehung.py teilnehmer.csv --gewinner 3 --modus advent --log ziehung_2026-12-06.json
  -> Kaeufer 3 Lose, alle anderen 1 (Warteliste zaehlt nicht).
Finale 24.12.: python3 ziehung.py teilnehmer.csv --gewinner 3 --modus finale --log ziehung_2026-12-24.json
  -> Kaeufer 3 Lose, Warteliste 2 Lose, alle anderen 1.
Mit --nur-kaeufer werden nur Kaeufer gezogen. --seed macht die Ziehung nachvollziehbar.
"""
import argparse, csv, json, secrets, random, sys
from datetime import datetime, timezone

JA = {"ja", "j", "yes", "y", "true", "1"}

def lade(pfad, nur_kaeufer):
    personen = {}                                  # email -> (kaeufer, warteliste)
    with open(pfad, newline="", encoding="utf-8-sig") as f:
        for z in csv.DictReader(f):
            mail = z["email"].strip().lower()
            if not mail or z["bestaetigt"].strip().lower() not in JA:
                continue
            k = z["kaeufer"].strip().lower() in JA
            n = (z.get("warteliste") or z.get("newsletter") or "").strip().lower() in JA
            alt_k, alt_n = personen.get(mail, (False, False))
            personen[mail] = (alt_k or k, alt_n or n)   # Dubletten: einmal zaehlen, hoechsten Status behalten
    if nur_kaeufer:
        personen = {m: s for m, s in personen.items() if s[0]}
    return personen

def lose(status, f_kaeufer, f_news):
    kaeufer, news = status
    return f_kaeufer if kaeufer else (f_news if news else 1)

def ziehe(personen, anzahl, f_kaeufer, f_news, seed):
    rng = random.Random(seed)
    rest = dict(personen)
    gewinner = []
    while rest and len(gewinner) < anzahl:
        mails = list(rest)
        gewichte = [lose(rest[m], f_kaeufer, f_news) for m in mails]
        w = rng.choices(mails, weights=gewichte, k=1)[0]
        gewinner.append(w)
        del rest[w]                                # pro Person nur ein Gewinn
    return gewinner

def main():
    a = argparse.ArgumentParser()
    a.add_argument("csv"); a.add_argument("--gewinner", type=int, default=3)
    a.add_argument("--faktor-kaeufer", type=int, default=3, help="Lose pro Kaeufer")
    a.add_argument("--faktor-warteliste", type=int, default=2, help="Lose pro Wartelisten-Mitglied")
    a.add_argument("--modus", choices=["advent", "finale"], help="advent: Kaeufer 3, Warteliste 1; finale: Kaeufer 3, Warteliste 2")
    a.add_argument("--ohne-gewichtung", action="store_true", help="alle haben 1 Los")
    a.add_argument("--nur-kaeufer", action="store_true"); a.add_argument("--seed")
    a.add_argument("--log")
    o = a.parse_args()
    if o.modus == "advent":
        o.faktor_kaeufer, o.faktor_warteliste = 3, 1
    elif o.modus == "finale":
        o.faktor_kaeufer, o.faktor_warteliste = 3, 2
    if o.ohne_gewichtung:
        o.faktor_kaeufer = o.faktor_warteliste = 1
    seed = o.seed or secrets.token_hex(8)
    p = lade(o.csv, o.nur_kaeufer)
    if not p:
        sys.exit("Keine gueltigen Teilnehmer.")
    g = ziehe(p, o.gewinner, o.faktor_kaeufer, o.faktor_warteliste, seed)
    gesamt = sum(lose(s, o.faktor_kaeufer, o.faktor_warteliste) for s in p.values())
    ergebnis = {"zeit_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"), "seed": seed,
                "teilnehmer": len(p), "kaeufer": sum(1 for s in p.values() if s[0]),
                "warteliste_ohne_kauf": sum(1 for s in p.values() if s[1] and not s[0]),
                "lose_gesamt": gesamt, "faktor_kaeufer": o.faktor_kaeufer,
                "faktor_warteliste": o.faktor_warteliste, "nur_kaeufer": o.nur_kaeufer, "gewinner": g}
    print(json.dumps(ergebnis, ensure_ascii=False, indent=2))
    if o.log:
        with open(o.log, "w", encoding="utf-8") as f:
            json.dump(ergebnis, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
