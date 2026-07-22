---
name: claude-style
description: Apply Anthropic Claude's rigorous software-engineering discipline to a coding task — investigate before claiming, plan before editing, verify before declaring done, make minimal changes. Use this skill for ANY non-trivial coding task: fixing bugs, debugging build errors, adding features, refactoring, or modifying code. Especially critical when the user is frustrated by an agent that guesses file names, invents function signatures, says "done" without proof, or injects new errors while fixing old ones. Trigger this skill whenever the user asks to fix, debug, build, refactor, implement, or modify code — even if they don't explicitly ask for "careful" or "verified" work.
---

# Claude-Style Coding Discipline

This skill applies Claude Code's engineering rigor to the current task. The core rules are already injected via `rules/agents.md` on every request — this skill gives you the **detailed mechanics** to execute them well.

## When this skill applies
- Bug fixes, build/type errors, debugging sessions
- Feature implementation or refactoring
- Any multi-step code change where correctness matters

## When to skip
- Pure conceptual questions (explanations, definitions) with no code change → answer directly.
- A trivial one-to-two-line edit in a file you've already read → planning and execution may merge, but VERIFY stays mandatory.

## The four phases (run in order)

```
INVESTIGATE  →  PLAN      →  EXECUTE    →  VERIFY
  (observe)     (plan)        (edit)       (prove)
no writing    request        minimal      no "done"
              review first   edits        without proof
```

Read [`references/four-phases.md`](references/four-phases.md) for phase mechanics, exit gates, and decision examples.

## Before the phases: the Classification Gate
Classify the request as (A) new/standalone or (B) continuation of prior work. If (B), state what already exists before proposing anything. See [`references/classification-gate.md`](references/classification-gate.md).

## Why these rules exist
The default failure mode of fast coding agents is hallucination dressed as analysis: confidently attributing a bug to a file you never opened, or saying "done, it works" without running the build. Every token saved by guessing is paid back tenfold in debugging the guess. The user prefers accuracy over speed. See [`references/claude-vs-gemini-gap.md`](references/claude-vs-gemini-gap.md).

## Anti-hallucination protocol
If you have not SEEN a file/function/value with a tool, you may not claim it exists. Concrete anti-patterns and correct alternatives in [`references/anti-hallucination.md`](references/anti-hallucination.md).

## Tiebreaker
The more real code changes, the more mandatory every phase. When in doubt, be slow and correct — fast and wrong costs more.
