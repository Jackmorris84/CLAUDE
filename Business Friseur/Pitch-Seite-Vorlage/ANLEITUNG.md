# Pitch-Seite für einen neuen Friseursalon

Aus der Gino-+-Pino-Seite gemacht. Eine HTML-Datei, die man per Link oder Datei über WhatsApp schicken kann.

## Dateien
- `vorlage.html` – Seite mit Platzhaltern (nicht anfassen, außer für Design-Änderungen)
- `build.py` – setzt config + Bilder zur fertigen Seite zusammen (braucht Python + Pillow)
- `beispiel-gino-pino/` – komplettes Beispiel (config.json + Website-Screenshots)

## Ablauf pro Salon
1. Ordner `beispiel-gino-pino` kopieren, z. B. `salon-mustermann/`.
2. Screenshots von der Salon-Website ablegen: Footer mit Logo/Kontakt/Zeiten (`website-footer.png`), Preislisten (`preise-1.png`, …).
3. `config.json` anpassen:
   - `salon`, `short`, `initials`, `domain`, `author`
   - `days_per_week` + `days_label` (Öffnungstage, z. B. 5 und "Di–Sa")
   - `images.logo.crop` = [links, oben, rechts, unten] um das Logo im Footer-Screenshot
   - `facts` (Zeiten, Telefon, Adresse, Preise)
   - `chats`: drei Beispiel-Chats. **Echte Antworten** des Agenten einsetzen (vorher mit den Daten des Salons testen), nichts erfinden.
4. Bauen: `python3 build.py salon-mustermann/config.json salon-mustermann/seite.html`
5. Seite ansehen, auf Handy-Breite prüfen. Veröffentlichen (Artifact/Link) und für den Salon freigeben.

## Vorher klären (gleiche Punkte wie bei Gino + Pino)
- Preisliste vollständig? Welche Haarlänge heißt Kurz/Mittel/Lang?
- Du oder Sie in den Antworten? Welche eigene WhatsApp-Nummer?
- Kontakt-Button/Angebot: bewusst nicht in der Vorlage, selbst ergänzen.
- Formulierung beachten: "nimmt Terminanfragen auf, Salon bestätigt", nicht "bucht".
