---
titel: "5-Pass Reel Edit Kit (Setup & Ablauf)"
typ: wissen
thema: [reels, video, claude]
quelle: "f8b79868-5-Pass-Reel-Edit-Kit.pdf (Zeeshan, @zeeuiux)"
erstellt: 2026-10-18
status: roh
entscheidung: offen
tags: [reel, videoschnitt, prompt]
---
## Kernaussage
Ein Talking-Head-Reel wird in Claude in 5 aufeinanderfolgenden Prompts geschnitten (Transkript → Freisteller → Captions → Motion → Sound). Es ist keine Software, die man installiert, sondern ein Prompt-Ablauf in einem einzigen Chat.

## Details
**Vorbereitung (5 Punkte)**
- Ein Chat für den ganzen Schnitt, jeder Pass baut auf dem letzten auf.
- Claude: Einstellungen → Capabilities → *Code execution and file creation* einschalten.
- Rohclip in 1080p exportieren, unter 30 MB, Leerlauf am Anfang und Ende trimmen.
- Beim Dreh etwas Platz über dem Kopf lassen (dort kommt Text in Pass 02).
- Style Rules direkt nach dem Setup-Prompt einfügen, sonst rät Claude den Look.

**Ablauf**
1. Clip hochladen + Setup-Prompt + Style Rules senden.
2. Pass 01 Transkript: `words.json` mit Wort-Timestamps, Pausen >0,4 s und Stolperer listen; danach „Tighten the cut" (0,1 s Atem je Schnitt).
3. Pass 02 Cut-out: Matte pro Frame, weiche Kanten, kein weißer Umriss, Löcher in Händen füllen. Falls kantig: RobustVideoMatting (ONNX), 2× Größe.
4. Pass 03 Captions: 1–3 Wörter, ein Keyword groß pro Satz, mind. 0,4 s Haltezeit, nie übers Gesicht.
5. Pass 04 Motion: Szenenplan als Tabelle freigeben lassen, dann pro Idee eine HTML/CSS-Szene auf dem Triggerwort.
6. Pass 05 Sound: Hit auf Hook, Tap bei Klicks, Whoosh bei Szenenwechsel, Chime am Ende; Stimme oben, −14 LUFS, Peaks unter −1 dB; Export 1080×1920, 30 fps, H.264 + Cover-Frame.
7. Nach jedem Pass „next" tippen. Danach Feedback wie ein Regisseur geben.

**Beispiel-Notizen an Claude**
- „Der Umriss um mich sieht fake aus. Nur weiche Kanten, leichter Wrap."
- „Zu viel auf dem Screen. Eine Idee nach der anderen."
- „Die Captions sind zu schnell. Mind. 0,4 s halten."
- „Nur 00:04 bis 00:07 neu rendern. Rest lassen."

**Hängt Whisper/Download?** Whisper oder Parakeet aus den sherpa-onnx-Releases auf GitHub nutzen.

**Check vor dem Posten:** zweimal am Handy ansehen (mit und ohne Ton), nichts unter Instagram-Buttons, Cover mit einem großen Wort, −14 LUFS.

## Setup-Prompt (zum Kopieren)
```
You're my reel editor. I've uploaded a raw talking-head clip. We'll edit it in 5 passes, one at a time. After each pass, render a preview and wait for my notes.

01 Transcribe: word-level timestamps → words.json
02 Cut-out: separate me from the background, soft edges, light wrap, no outline
03 Captions: 1–3 words, key word big, rest small
04 Motion: one scene per idea, fired on its word
05 Sound: hits, taps, chime, voice on top
Export: 1080×1920, 30 fps, H.264, -14 LUFS

How to work:
- Do it all in code: Python and ffmpeg for video and audio, HTML/CSS/JS for graphics, rendered frame by frame in a headless browser, so every graphic is timed to the frame.
- Keep a project folder with words.json, the cut-out matte, each layer and every render, so a change to one pass doesn't break the others.
- Keep text and graphics inside Instagram's safe area: nothing important in the top 220px, bottom 380px or right 140px.
- Follow my style rules below. If they don't cover something, pick the cleanest option and tell me what you chose.

Start with pass 01. Don't move on until I say "next".

My style rules:
[Reel Style Rules hier einfügen]
```

## Pass-Prompts (zum Kopieren)
**Pass 01**
```
Pass 01: Transcribe.
- Transcribe my clip word by word, with a start and end time for every word. Save it as words.json.
- List every pause longer than 0.4s and every stumble or repeated take, with timestamps. Don't cut anything yet.
- Show me the transcript as a table so I can fix any misheard words.
```
**Then**
```
Cut the pauses and stumbles you listed. Keep about 0.1s of breath on each side of every cut. Re-time words.json to the new cut and render a rough preview.
```
**Pass 02**
```
Pass 02: Cut-out.
- Separate me from the background on every frame and save it as a matte I can reuse in later passes.
- Soft edges with a light edge blur and light wrap. No white outline, no glow.
- Fill any holes in my body and hands, and keep the hair detail.
- Render a check: me over a checkerboard, then me over a dark backdrop with one big word behind my head.
```
**Pass 03**
```
Pass 03: Captions.
- Use words.json. Show 1–3 words at a time, each one appearing the moment it's said.
- Pick one key word per sentence and set it big in my key-word style. Everything else stays small.
- Hold each caption at least 0.4s and never put one over my face.
- List the key words you picked before you render so I can swap them.
```
**Pass 04**
```
Pass 04: Motion.
- Read words.json and plan one scene per idea: the trigger word, its time, what appears on screen and why.
- Show me the plan as a table and wait for my OK.
- Build each scene in HTML/CSS, fire it on its word, and composite it with the cut-out so graphics can sit behind me or in front of me.
- One idea on screen at a time. Fast in, hold, clean out.
```
**Pass 05**
```
Pass 05: Sound.
- Add SFX on the cues from pass 04: a hit on the hook, a tap on every click, a whoosh on every scene change, a chime to close.
- Keep my voice on top. If you add music, duck it under my voice.
- Clean my voice (cut rumble and hiss), then master to -14 LUFS with peaks under -1 dB.
- Render the final 1080×1920, 30 fps, H.264 MP4 plus a cover frame.
```
Eigene SFX: WAV-Dateien hochladen und Claude bitten, diese statt generierter Sounds zu nutzen.

## Reel Style Rules (Vorlage, Schrift/Farben an eigene Marke anpassen)
```
# Reel Style Rules

## Canvas
- 1080×1920, 30 fps.
- Safe area: keep text out of the top 220px, the bottom 380px and the right 140px.

## Type
- Key words: a serif italic (e.g. Instrument Serif Italic), big, one per sentence.
- Support words: a clean sans (e.g. Google Sans or Inter), semibold, small.
- Labels and UI text: a mono (e.g. Google Sans Code), uppercase, wide tracking.
- Max 3 words on screen. Never over my face.

## Color
- Background: near-black #09090A with a soft warm glow.
- Accent gradient: #FFDCCC → #F6BDD8 → #C9B9FF.
- Text: #F5F5F4. Muted text: #A3A3AB.

## Motion
- Fast in (0.2–0.35s), hold, clean out. Ease-out on entrances.
- One idea per scene. Each scene fires on its trigger word.
- Use text behind me (cut-out) for hooks and big words.
- Subtle push-ins (max 6%) on emphasis. No shaky zooms.

## Sound
- Hit on the hook, tap on clicks, whoosh on scene changes, chime to close.
- Voice always on top. Master to -14 LUFS, peaks under -1 dB.

## Don't
- No white sticker outline around me.
- No emoji captions, no rainbow colors, max 2 fonts on screen.
```

## Wann brauche ich das?
- Immer wenn ich ein Talking-Head-Reel (Instagram, 9:16) mit Claude schneiden will.

## Verknüpft mit
- [[Second-Brain-Guide]]
