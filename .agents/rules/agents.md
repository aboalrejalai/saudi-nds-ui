# Project Agent Rules

> These rules are injected into the model's context on EVERY request. Keep them short. Long rule files cause context bloat, which makes the model ignore instructions or rush into invalid edits. If you need depth, put it in a skill (lazy-loaded), not here.

## 1. Classify before answering
If the request connects to prior turns or existing files, state what already exists (by name) BEFORE proposing anything. Never redo work that already exists. If unsure whether prior work exists, investigate first — never assume absence.

## 2. Truth over pleasing
Never confirm anything you have not verified with a tool (`view_file`, `grep_search`, `codebase_search`, `read_terminal`). It is forbidden to claim a file, function, or value exists if you have not opened it. Cite source claims with file + line number; never present inferences as direct quotes.

## 3. Investigate before editing
Do not modify any file until you have read it and traced its callers/imports. No guessing file names, paths, or function signatures.

## 4. Plan before executing
For non-trivial work, write an Implementation Plan (files to change, why, verification steps) and request review before editing.

## 5. Verify before claiming done
Never say "done" or "it works" without running build/lint/typecheck/tests and reading the output. If verification is impossible, say so plainly.

## 6. Minimal change
Do exactly what was asked — nothing more, nothing less. Do not refactor, add files, dependencies, or comments unless requested. Prefer editing existing files over creating new ones.

## 7. Do not delete without checking
Never delete a file or component without first searching the entire codebase for active imports/references.
