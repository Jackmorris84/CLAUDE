#!/usr/bin/env python3
"""Baut aus vorlage.html + config.json eine einzelne, in sich geschlossene HTML-Seite.
Aufruf: python3 build.py config.json ausgabe.html   (Bildpfade in der config relativ zur config-Datei)"""
import base64, html, io, json, sys
from pathlib import Path
from PIL import Image, ImageOps

E = html.escape
cfg_path = Path(sys.argv[1]); out_path = Path(sys.argv[2]); base = cfg_path.parent
cfg = json.loads(cfg_path.read_text(encoding="utf-8"))

def uri(im, fmt, **kw):
    b = io.BytesIO(); im.save(b, fmt, **kw)
    return f"data:image/{'jpeg' if fmt == 'JPEG' else 'png'};base64," + base64.b64encode(b.getvalue()).decode()

def photo(path, w):
    im = Image.open(base / path).convert("RGB")
    return uri(im.resize((w, int(im.height * w / im.width)), Image.LANCZOS), "JPEG", quality=82)

def logo(spec):
    im = Image.open(base / spec["file"]).convert("RGB")
    if spec.get("crop"): im = im.crop(tuple(spec["crop"]))
    if spec.get("alpha_from_light", True):   # helles Logo auf dunklem Grund -> transparent
        a = ImageOps.autocontrast(im.convert("L"), cutoff=2)
        im = Image.new("RGBA", im.size, (255, 255, 255, 0)); im.putalpha(a)
    return uri(im, "PNG", optimize=True)

def chats(items, ini):
    out = []
    for c in items:
        msgs = ""
        for who, text, ts in c["msgs"]:
            cls, tick = ("o", f' <i>✓✓</i>') if who == "c" else ("i", "")
            msgs += f'<p class="m {cls}">{E(text)}<span class="t">{ts}{tick}</span></p>\n'
        out.append(f'''    <div class="phone">
      <div class="chat"><div class="chat-h"><span class="av">{E(ini)}</span>{E(cfg["salon"])}</div>
        <div class="chat-b">
{msgs}        </div></div>
      <h3>{E(c["title"])}</h3><p class="cap">{E(c["caption"])}</p>
    </div>''')
    return "\n".join(out)

facts = "\n".join(f'      <li><b>{E(f["label"])}</b><span>{"<br>".join(E(x) for x in f["value"])}</span></li>' for f in cfg["facts"])
prices = "\n".join(f'      <figure><img src="{photo(p, 1000)}" alt="Preisliste von {E(cfg["domain"])}, Teil {i+1}"></figure>' for i, p in enumerate(cfg["images"]["prices"]))
rep = {
  "SALON": E(cfg["salon"]), "SHORT": E(cfg["short"]), "DOMAIN": E(cfg["domain"]), "AUTHOR": E(cfg["author"]),
  "DAYS": str(cfg["days_per_week"]), "DAYS_LABEL": E(cfg["days_label"]),
  "LOGO": logo(cfg["images"]["logo"]), "FOOTER": photo(cfg["images"]["website"], 1100),
  "CHATS_HTML": chats(cfg["chats"], cfg["initials"]), "FACTS_HTML": facts, "PRICES_HTML": prices,
}
t = (Path(__file__).parent / "vorlage.html").read_text(encoding="utf-8")
for k, v in rep.items(): t = t.replace("{{" + k + "}}", v)
assert "{{" not in t, "unersetzte Platzhalter"
out_path.write_text(t, encoding="utf-8"); print(f"OK {out_path} ({len(t)//1024} KB)")
