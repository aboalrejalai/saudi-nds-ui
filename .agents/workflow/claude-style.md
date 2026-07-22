# Workflow: Claude-Style Rigorous Execution

This workflow governs how to execute complex, multi-step coding tasks with discipline — using Antigravity's native artifacts and slash commands rather than rushing straight to edits.

---
description: How to execute a non-trivial coding task with investigate-plan-execute-verify discipline, using Antigravity artifacts and slash commands to prevent over-hastiness.
---

## When to use this workflow
Any task that involves modifying code across one or more files where correctness matters: bug fixes, features, refactors, build-error debugging. For a trivial single-line edit in a file you've already read, you may skip directly to execute + verify.

## Environment prerequisites (check once, then trust)
For this workflow to work, the project should be in **Planning Mode** with **High Thinking**. Fast Mode + Low Thinking is the leading cause of over-hastiness — the model skips dependency checks. If you notice rushing behavior, advise the user to switch to Planning + High Thinking.

## The execution loop

### Step 1 — Classify (gate)
Determine if the request is (A) new/standalone or (B) continuation. If (B), state what already exists before proposing anything. See the `claude-style` skill's `references/classification-gate.md`.

### Step 2 — Investigate (no edits)
- Trace calls/imports with `grep_search` / `codebase_search`.
- Read actual files with `view_file`.
- Record what you saw, with line numbers. No assumptions about names/paths/signatures.

### Step 3 — Plan (artifact: Implementation Plan)
Write an **Implementation Plan** covering:
- Files to modify (and why — the root cause you observed, not guessed)
- External dependencies needed
- Verification steps
Request review before editing. If the task is ambiguous or high-risk, run `/grillme` first to interview the user about requirements, edge cases, and architectural dependencies — do NOT start coding.

### Step 4 — Execute (artifact: Task List)
- Maintain a **Task List** and update it in real time as you complete subtasks (mark done immediately — do not batch).
- Edit only what you planned. Match surrounding code style. No unrequested comments, refactors, or new files.

### Step 5 — Verify (artifact: Walkthrough)
- Run build / typecheck / lint / tests actually. Read the output.
- If it fails, return to Step 4 and fix — do not claim done.
- Produce a **Walkthrough** summarizing changes made + proof of verification (terminal output, test results, screenshots).

## Slash commands (use them)
- **`/grillme`** — when requirements are unclear or the task is complex. Forces the agent to stop and interview you about edge cases and dependencies BEFORE coding. Use this whenever you'd otherwise guess.
- **`/go`** — once the plan is approved, gives green-light autonomy to execute, run tests, and verify until complete.
- **`/btw`** — ask a side question without halting execution.
- **`/fork`** — branch the conversation to test an alternative approach safely.

## Minimal-change reminder
Do exactly what was asked — nothing more, nothing less. Do not delete files/components without searching the entire codebase for active imports first.

## Failure recovery
- If you discover unexpected complexity mid-execution → return to Plan, update the Implementation Plan, request review again.
- If verification repeatedly fails → re-investigate; the root cause may be different than assumed.
