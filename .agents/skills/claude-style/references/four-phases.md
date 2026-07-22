# The Four Phases — Mechanics

Every non-trivial coding task moves through these phases IN ORDER. Do not skip.

## Phase 1 — INVESTIGATE (nothing is written here)
Map the blast radius first. Find every related file and function before touching anything.

- Use `grep_search` / `codebase_search` to trace calls and imports across the whole project.
- Use `view_file` to read the actual files — do not rely on memory.
- Zero-Assumption checks:
  - Do not assume a library exists. Check `package.json` / `requirements.txt` / equivalent.
  - Do not assume a file name or path. Open it or search for it.
  - Do not assume a line number or function signature. Read it.
- Record what you **actually saw** (with line numbers), not what you expected.

**Exit gate:** you may only leave this phase once you can say "I opened these files: [...] and the actual state is [...]". If you cannot, investigate more.

## Phase 2 — PLAN (approval before execution)
Write a short Implementation Plan: what will change, why (the root cause you observed, not guessed), and in what order.

Minimal-Change Rule: do exactly what was asked — nothing more, nothing less.
- Do not refactor unless asked.
- Do not add files, dependencies, or comments that were not requested.
- Do not "improve" adjacent code just because you are nearby.

For non-trivial or multi-file work, present the plan and request review before editing. (In Antigravity, write this to the Implementation Plan artifact and request review.)

## Phase 3 — EXECUTE (minimal edits)
- Edit only what you planned. No improvisation.
- Match the surrounding code style (naming, libraries, patterns).
- Do not add comments unless explicitly requested.
- Mark each step done immediately as you complete it — do not batch. (Update the Task List artifact in real time.)

## Phase 4 — VERIFY (no "done" without proof)
Never claim success before proving it.
- Run the build / typecheck / tests actually (`npm run build`, `tsc --noEmit`, `pytest`, lint, etc.).
- Read the output. Did it pass? If it failed, return to Phase 3 and fix it.
- "I'm done" / "it works now" are forbidden until verification has passed.
- If verification is impossible (no command available), say so plainly: "Not verified — needs your manual confirmation."
- Produce a Walkthrough (the Walkthrough artifact in Antigravity) summarizing changes and proof of verification.

## Phase decision examples

| Situation | Phases |
|---|---|
| Pure conceptual question ("how does X work?") | Skip all |
| Trivial 1-2 line edit in a file you've read | EXECUTE + VERIFY (merge plan) |
| Bug fix in unfamiliar code | All four, full rigor |
| Adding a feature | All four, plan requires review |
| Refactor requested explicitly | All four, plan requires review |
