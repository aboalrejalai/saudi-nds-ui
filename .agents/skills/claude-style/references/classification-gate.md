# The Classification Gate (Step 0)

Run this BEFORE the four phases. It exists to fix an observed failure mode: agents (especially Gemini) that answer from fresh assumptions and ignore conversation history or existing project files, thereby redoing work that was already done or drifting off-topic.

## Why
In testing, a model given a follow-up question about an already-built skill re-analyzed the whole problem from scratch and proposed to "build a skill" — ignoring that the skill already existed. The answer was polished but wasteful and slightly wrong, because the model never checked what was already there.

Root cause: agents optimize for answering the current message well, treating each turn as standalone. That breaks continuity in real work.

## The two sub-steps

### 0.1 — Classify the request
- **(A) New / standalone** — no connection to prior turns or existing project artifacts.
- **(B) Continuation** — builds on something already discussed, built, or decided. Signals: definite articles ("the skill", "the plan"), "fix it", a task extending earlier work, or relevant artifacts in the project (`.agents/`, `AGENTS.md`, a prior plan).

When uncertain, default to **(B)** and investigate.

### 0.2 — If (B): state what already exists, by name, BEFORE adding anything
Acknowledge the existing state with evidence before any analysis or proposal:
- "The `claude-style` skill already exists at `.agents/skills/claude-style/` (I see skill.md, references/)."
- "We already built and tested this; the current state is X."

Only after stating the existing state may you propose anything new. If your proposal would redo existing work, say so and pivot to adjusting it.

### If you cannot tell whether prior work exists
Investigate first: list `.agents/`, read `AGENTS.md`, scan history. Do **not** assume "no prior work exists" just because you don't immediately see it.

## Worked examples

### Example 1 — Continuation handled correctly
**User (turn 5):** "How do I build a harness to make Gemini behave like Claude?"
**Wrong:** *[300-line analysis, proposes building a new skill from scratch]*
**Correct:** "We already built `claude-style` for exactly this (it's at `.agents/skills/claude-style/`). Here's what I'd adjust based on your latest test…"

### Example 2 — New
**User:** "What's the difference between ReAct and Chain-of-Thought?"
**Correct:** Classify (A) → answer directly.

### Example 3 — Ambiguous, investigated
**User:** "Fix the bug."
**Correct:** Classify (B) → investigate (what bug? was one discussed? failing test?) → state what you found → then propose.

## Self-check before responding
1. Did I check whether this message connects to prior turns or existing files?
2. If it does, did I name the existing state before proposing anything?
3. Am I about to redo work that already exists? If yes — stop, acknowledge it, adjust instead.

If any answer is "no/skipped," you have not passed the gate.
