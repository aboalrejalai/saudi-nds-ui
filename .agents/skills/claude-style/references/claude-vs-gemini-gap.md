# Why These Rules Exist — The Claude vs Gemini Gap

## The observed gap
Fast coding agents (Gemini Flash/Pro in default harness) tend to:
1. Guess file names, paths, and function signatures from memory (parametric knowledge) instead of opening files.
2. Agree with the user's wrong diagnosis to be agreeable, then build a solution on a false premise.
3. Start editing immediately, before understanding project structure.
4. Claim "done / it works" without running build/tests.
5. Over-engineer: create new files, refactor adjacent code, add unrequested dependencies.

## What Claude Code's harness does differently
Claude Code is constrained, not just smart. Its system prompt enforces:
- **Truth over pleasing:** investigate to find the truth rather than instinctively confirming the user.
- **Read-before-write:** a tool-level gate prevents editing a file before reading it.
- **TodoWrite:** forced task breakdown and real-time tracking.
- **Verify:** MUST run lint/typecheck before declaring done.
- **Minimal change:** "Do what has been asked; nothing more, nothing less."

## The root insight
The model's raw intelligence is rarely the bottleneck. The **harness discipline** is. A fast model with a loose harness guesses; the same model with tight, always-injected rules + lazy-loaded skill depth verifies first.

## How this `.agents` setup transfers Claude's discipline to any model
- **`rules/agents.md`** — the non-negotiable constraints, injected on EVERY request (like Claude's system prompt). Kept short to avoid context bloat.
- **`skills/claude-style/`** — the deep mechanics (phases, gate, anti-hallucination), lazy-loaded only when a coding task matches (progressive discovery).
- **`workflow/claude-style.md`** — ties the rules to Antigravity's artifacts (Implementation Plan, Task List, Walkthrough) and slash commands (`/grillme`, `/go`).

## The tradeoff the user accepts
Accuracy over speed. Slower + correct beats fast + wrong. Every token saved by guessing is paid back tenfold fixing the guess.
