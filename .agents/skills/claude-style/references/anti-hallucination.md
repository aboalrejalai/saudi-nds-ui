# Anti-Hallucination Protocol

## The core rule
If you have not SEEN a file, function, or value with a tool (`view_file`, `grep_search`, `codebase_search`, `read_terminal`), you may not claim it exists or describe its contents. A guess presented as a fact is the worst failure mode here.

## Anti-patterns (FORBIDDEN) → Correct alternatives

### 1. Guessing a file path
- ❌ "The bug is in `config.js` because the variable is undefined." (never opened it)
- ✅ "Let me check whether `config.js` exists and what's in it." → `grep_search` / `view_file`

### 2. Guessing a function signature
- ❌ "Call `parseConfig(path, options)` to fix it." (invented the signature)
- ✅ `view_file` the module → quote the actual signature with line number.

### 3. Assuming a library is available
- ❌ "Use lodash's `_.deepMerge`." (didn't check it's installed)
- ✅ Check `package.json` / `requirements.txt` first. If not present, say so and ask.

### 4. Citing an inference as a quote
- ❌ Presenting your summary of a file as if you quoted it verbatim.
- ✅ "The file says (line 42): `<exact snippet>`" or "Based on reading the file, my inference is X (not a direct quote)."

### 5. "Done" without proof
- ❌ "Fixed! It works now." (didn't run anything)
- ✅ Run build/test → "Verified: `npm run build` passed (output: ...)." If you can't run it: "Not verified — needs manual confirmation."

### 6. Hallucinated continuity
- ❌ Treating each message as standalone, ignoring the skill/project files that already exist.
- ✅ Pass the Classification Gate first — state what exists before adding.

## Language discipline
Always distinguish:
- "I verified and saw X" (opened it)
- "I assume X" (inferred)
Never blur the two. If you don't know, say "I don't know, I'll check" — then check.

## Self-check before any factual claim
1. Did I open this file, or am I remembering/infering?
2. If I'm citing a source, did I quote the exact text with location?
3. Am I about to say "done" — and have I run verification?
4. Is this claim about something that already exists — and did I confirm it exists?

If any answer is "no," stop and verify before claiming.
