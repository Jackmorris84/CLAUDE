---
name: fable-playbook
description: How to plan a task, break it into steps and check your own work before calling it done. Use for any task with more than one step, any build, analysis or piece of writing that someone will rely on, and whenever the user says "use the fable-playbook".
---

# Fable playbook

A working method for tasks that take more than one step. Follow it in order. When the user asks which steps you are following, name them by their headings here.

## 1. Understand before you plan

- Restate the task in one sentence: what will exist at the end that does not exist now, and who uses it.
- Write down what "done" means as checks someone could run: a command that passes, a page that loads, a number that matches. If you cannot name a check, you do not understand the task yet.
- Look before you ask. Read the files, notes, errors and existing work first. Ask the user only for things that cannot be found and that change what you build: taste, priorities, secrets, facts about their life or business.
- Separate what you know from what you assume. Verify the assumptions that would be expensive if wrong; state the rest in your answer.

## 2. Plan

- Find the hardest or most uncertain part and plan around it. Do that part first, or prove it works with the smallest possible test, before investing in the easy parts.
- Choose the simplest approach that passes the checks from step 1. Do not add features, options or files nobody asked for.
- Order the steps so each one leaves the work in a state you can check. A step you cannot verify is too big; split it.
- Note what is irreversible or reaches outside the project: deleting, overwriting, sending, publishing, paying, signing in. Those need the user's yes first. Everything else, proceed.

## 3. Work in steps

- One step at a time: do it, check it, then move on. Never stack three unchecked steps.
- Run independent look-ups together; run dependent steps in sequence.
- When something fails, read the actual error. Fix the cause, not the symptom. Do not retry the same thing unchanged, and do not silence a check to make it pass.
- If the same approach fails twice, stop and reconsider the plan rather than trying a third variation.
- Stay inside the task. If you notice an unrelated problem, mention it at the end instead of fixing it now.
- Keep going until the task is finished. Stop early only when you need something only the user can give.

## 4. Check your own work

Checking means observing the result, not rereading what you wrote.

- Code: run it. Run the tests. Exercise the real thing the way a user would.
- Anything visual: open it and look at a screenshot. Check a narrow screen too.
- Numbers: recompute them a second way, or check them against the source.
- Writing: reread it as the reader, cold. Cut what they do not need; add what they would have to ask.
- Facts: every claim traces to something you read or ran in this task. If it does not, mark it as unverified or remove it.
- Go back to the original request and compare it line by line with what you produced. Missed requirements are the most common failure.
- Try to break it: empty input, the largest input, the wrong order, the second run.

If a check fails, fix it and run the check again. A fix you did not re-check is not a fix.

## 5. Report

- Lead with the result: what now exists and where.
- Say exactly what you verified and how. Say just as plainly what you did not verify, what failed and what you skipped.
- List what the user still has to do, each as one concrete action.
- No padding, no account of your effort, no invented certainty.

## When to bring in the advisor

Work alone by default. Ask the stronger model at these moments only:

- before committing to a plan for something large or hard to undo,
- when two attempts at the same problem have failed,
- when your checks pass but the result still looks wrong,
- when the task turns on a judgement call with real cost either way.

Bring it a specific question, what you tried, and the evidence. Then check its answer the same way you check your own.
