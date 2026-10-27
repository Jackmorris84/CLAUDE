---
name: yt-pipeline
description: >-
  Run the YouTube pre-production pipeline in one go - niche research, weekly plan,
  script and title/thumbnail package - passing each result to the next step through
  files in a week folder. Use for "run the pipeline", "plan and write my week",
  "bereite die Woche vor", "mach alles von Plan bis Skript", or when the user wants
  several yt-* skills chained instead of called one by one.
---

# yt-pipeline

Chains four existing skills so each one reads the previous one's result:

`yt-viral` -> `yt-plan` -> `yt-script` -> `yt-package`

The skills do not talk to each other. **Files do.** Every step writes its result into the week
folder, and the next step reads that file first. Nothing is held only in the conversation.

## The week folder

Default base: `~/Documents/Panfloete-Kanal/pipeline/` (the user may name another). This sits beside
`~/Documents/Panfloete-Kanal/voice.md`, which step 1 reads, and `~/Documents/Panfloete-Kanal/scripts/`, where finished
scripts are kept.
Per run create `woche-YYYY-WW/` (ISO week number) with these files:

| file | written by | read by |
| --- | --- | --- |
| `00-brief.md` | this skill | all steps |
| `01-viral.md` | yt-viral | yt-plan |
| `02-plan.md` | yt-plan | yt-script, yt-package |
| `03-script.md` | yt-script | yt-package, human |
| `04-package.md` | yt-package | human |
| `99-zusammenfassung.md` | this skill | human |

Create the folder with the shell if it does not exist. Never overwrite an existing file silently:
if `0X-*.md` exists, ask whether to reuse it, redo it, or skip the step.

## Before step 1: the brief (ask once, not per step)

1. Read `~/Documents/Panfloete-Kanal/voice.md`. If missing, stop and tell the user to run `/yt-script` once
   first so the voice profile gets written. A pipeline in the wrong voice is worse than none.
2. Read `~/Documents/Panfloete-Kanal/pipeline/standard.md` - the standing answers that do not change weekly
   (hours, upload day, base folder, recurring material). It is the reason this pipeline does not
   re-ask the same two questions every week. If it is missing, create it from the template at the
   bottom of this file and fill what the user tells you.
3. Ask only what is **still** missing after `standard.md`, in one message, and write the answers to
   `00-brief.md`:
   - **Hours available this week** (needed by yt-plan)
   - **Anything half-made** that exists already (clips, ideas, open drafts)
   - **Best upload day** from the channel's own analytics (do not assume)
   - **Idea for the anchor video**, if the user already has one
   - **Real numbers allowed in the script.** Never invent a figure; leave the line out instead.
4. Language of all outputs follows `voice.md`.

### A value you do not have is not a value you may invent

If hours or upload day stay unanswered, you may plan on a stated fallback, but then **all three** of
these must happen or the gap disappears from view:

- write it in `00-brief.md` as **"Annahme"**, with the number, never as a given;
- repeat it in the open-points list at the top of `99-zusammenfassung.md`;
- say it in the closing chat line.

Never carry an assumption into `02-plan.md` as if it were an answer. Fallback for hours: 5-8 h.
There is **no fallback for the upload day** - plan the order of the slots and leave the weekday open.
Both live in the user's own YouTube Studio, which this pipeline cannot read: ask them to look, do not
guess from past publish times. Past publish dates describe what the channel did, not when its
viewers are there, and must never be presented as an analytics answer.

## Steps

Run in order. After each step, save its output to its file, then tell the user in ONE line what was
written. Do not paste the whole result into the chat.

1. **yt-viral** (optional). Needs `collected.json` with at least four videos per channel. If the
   user has none, skip it, note "Schritt 1 übersprungen, keine Daten" in `01-viral.md`, and continue.
   Public listings only, never a logged-in session.

   **A skipped step 1 is a hole in the plan, not a formality - say so every time.** Without swipe
   data the plan rests on the channel's own back catalogue and knows nothing about what is currently
   overperforming elsewhere in the niche. So on a skip: name it in the first open-point line of
   `99-zusammenfassung.md`, state in `02-plan.md` that the plan ran without a niche comparison, and
   mention it in the closing chat line. Also say concretely how to fix it next run (populate
   `swipe.py` in `~/.claude/skills/yt-viral/`, four or more videos per comparison channel, public
   listings only). Never let a skip pass silently - headless it would otherwise vanish entirely, and
   nobody learns that the plan was flying blind.
2. **yt-plan.** Input: `00-brief.md` and `01-viral.md` if present. Output: **exactly three
   videos for the week - one long-form and two Shorts** - sized to the stated hours.

   **Three, not more.** A fourth idea goes in a "nicht diese Woche" list with one line on why,
   never into a fourth slot. Three is a commitment; a longer list is a wish list, and a week
   with eight slots has no shape at all.

   **One long-form, two Shorts.** Decided 2026-10-01 with the channel manager, against three
   long-form, and the reason is worth keeping: the channel published about once a month through
   2026 - seven uploads in six months by its own feed - so three full music videos a week would
   be roughly ten times its real rate. One long-form carries the week; the two Shorts come from
   footage that already exists, so they cost no second shoot. If a week genuinely has no
   long-form, say so and plan two Shorts, rather than inventing a third to reach the number.

   **A long-form tied to a fixed date** (an anniversary, a season) **is produced in the week
   before it, not published in it.** Name both dates in the plan - when it is shot, when it goes
   out - or the week reads as though the piece were due that week.

   **Carry-over is allowed, never silent.** A slot taken from an unfinished item of the previous
   week keeps its place and is marked `ÜBERTRAG aus W<n-1>` in the plan table, with one line on
   why it did not go out. But two carried slots in one week, or the same item carried twice, goes
   into the first open-point line of `99-zusammenfassung.md`: a backlog that drifts quietly from
   week to week is exactly what a weekly plan exists to prevent.

   Costs still get a real number, and an unknown production state still gets two sums rather than
   one guessed one.
3. **yt-script.** Input: the ANCHOR row of `02-plan.md` plus `voice.md`. Run `hookscore.py` on five
   hooks and keep the top two with their scores. Output: beat-by-beat script with `[ON SCREEN: ...]`
   on every beat and the runtime estimate. For music-led videos keep spoken text short and put the
   weight on title, first frame and one-line opening.

   **`hookscore.py` only measures English.** Its `words()` regex drops umlauts, and `YOU`, `STAKE`,
   `CURIOSITY`, `FILLER` and `VAGUE` all match English words. A German hook scored directly gets a
   junk number. So for a non-English channel: write the hook in the channel's language, score a
   faithful English rendering of the **same** structure, then build the final line in the channel's
   language. Report both - the figures describe the structure, not the wording that ships. This is a
   manual step; headless it does not happen by itself, so do it explicitly.

   **Do not game the scorer.** On a calm music or relaxation channel, STAKES ("what it costs the
   viewer to carry on as before") is close to structurally unreachable: nothing is at stake for a
   listener, and a first round landing at WEAK across all five hooks is the expected result, not a
   writing failure. The fix is a real, verifiable gap in the subject - a documented fact about the
   piece or the artist - never an invented claim, an invented number, or a stakes word bolted on to
   move the figure. A hook that scores well on a falsehood is worse than a weak honest one.

   If the anchor already has an approved script (check `~/Documents/Panfloete-Kanal/scripts/`), do not rewrite
   it. Point `03-script.md` at the file and carry over the hooks and their scores.
4. **yt-package.** Input: `03-script.md`. Write ten titles, run `title.py`, keep the top three, then
   the thumbnail brief for the winner (at most three words, must not repeat the title).

If a tool exits with an error, report the error text, keep the files written so far, and stop
instead of guessing.

## Final step

Write `99-zusammenfassung.md`: the plan table, the winning hook with its score, the winning title,
the thumbnail brief, and the hours this week costs. End the chat with the folder path and the gate
question: **ship it, or change it?**

## The gate

Nothing here publishes and nothing is uploaded. This pipeline writes, the user publishes. Never
claim a result is final; it is a draft until the user says so.

## After the shoot (not part of this pipeline)

These need material that only exists after recording, so the user triggers them by hand with a
transcript or export: `yt-edit`, `yt-chapters`, `yt-shorts`, `yt-seo` (from the transcript), then
`yt-retention`, `yt-comment` and `yt-audit` after the upload. Put their results in the same week
folder as `05-...`, `06-...` so the whole week stays in one place.

## Running it unattended

Headless, for example from the Windows Task Scheduler:

```
claude -p "Führe /yt-pipeline für diese Woche aus. Nutze die Antworten aus 00-brief.md, falls vorhanden, und frage nichts, sondern notiere offene Fragen in 99-zusammenfassung.md."
```

In headless mode ask no questions: take the most reasonable reading, list open points at the top of
`99-zusammenfassung.md`, and still stop before anything is published.

Three failures are specific to unattended runs, because nobody is watching the chat line:

1. **A silently skipped step 1.** Put it in the very first line of `99-zusammenfassung.md`, not
   buried in `01-viral.md`.
2. **A fallback hardening into a fact.** Without `standard.md`, every week plans on the same 5-8 h
   assumption and it stops reading as an assumption. Keep the word "Annahme" on it, every run.
3. **A German hook scored directly.** The figure will be meaningless. Either score an English
   rendering as described in step 3, or write no figure at all - never a number you do not trust.

If `standard.md` is missing entirely in headless mode, still run, but make its absence the first
open point: an unattended pipeline with no standing answers repeats the same gaps weekly.

## Template: `~/Documents/Panfloete-Kanal/pipeline/standard.md`

The standing answers, so the weekly brief only has to ask what actually changed. Create it on first
run if absent; keep every unknown explicitly marked as unknown rather than filled with a guess.

```markdown
# Standard - <channel>

## Stunden pro Woche
<number, or "unbekannt">     # unknown -> fallback 5-8 h, always labelled "Annahme"

## Bester Upload-Tag
<weekday, or "unbekannt">    # from Studio -> Analytics -> when your viewers are on YouTube.
                             # NO fallback. Unknown -> plan the order, leave the weekday open.
Quelle: <"Studio, abgerufen YYYY-MM-DD" | "nicht abgerufen">

## Basisordner
~/Documents/Panfloete-Kanal/pipeline/

## Wiederkehrendes Material
<e.g. concert recordings, raw footage from the last shoot - what Shorts can be cut from
 without a new shoot>

## Dauerhafte Grenzen
<what must never be planned - see voice.md for the channel's own limits>
```
