---
name: vite-migration-progress
description: "Status of the Next.js→Vite migration on branch feat/vite-migration — ~95% done, one routing bug left"
metadata: 
  node_type: memory
  type: project
  originSessionId: b6a91652-0b5c-4592-9244-af7c68dd258d
  modified: 2026-07-24T03:10:00.954Z
---

The Next.js → Vite migration is **~95% complete** on branch `feat/vite-migration` (NOT yet committed — 195 changed files staged in working tree, as of 2026-07-24).

**What's DONE and working:**
- Vite 8 + `@vitejs/plugin-react` v5 + `@tailwindcss/vite` + `@mdx-js/rollup` installed; `next`/`next-intl`/`@next/mdx`/`next-mdx-remote`/`eslint-config-next`/`server-only`/`fumadocs-*`/`nuqs` removed.
- New files: `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/i18n/{messages.ts,I18nProvider.tsx,routing.tsx}`, `src/mdx-components.tsx`.
- `registry/dga/` **untouched**. `components/`→`src/components/`, `lib/`+`hooks/`→`src/`, `styles/`→`src/styles/`, `app/globals.css`→`src/styles/globals.css`, `app/[locale]/**`→`src/pages/**`. Next files deleted (`app/`, `next.config.ts`, `middleware.ts`, root `i18n/`, `mdx-components.tsx`, `next-env.d.ts`, `postcss.config.mjs`).
- i18n shim at `src/i18n/routing.tsx` re-exports `Link`/`usePathname`/`useRouter`/`useLocale`/`useTranslations` with next-intl-compatible signatures (wraps react-router-dom). Consumers only swapped import source.
- `getUIComponents()` rewritten with `import.meta.glob` (returns 78 components correctly).
- `tsc --noEmit` passes for migrated code. Vite dev server starts; modules transform (HTTP 200). React mounts to `#root`.

**THE ONE REMAINING BUG (must fix first):**
In `src/App.tsx`, the `toPath()` function does NOT map `/src/pages/page.mdx` (the homepage file at the root of `src/pages/`) to route path `/`. Result: React Router shows the `*` "not found" fallback instead of the homepage. The homepage MDX exists and imports fine (verified via Playwright direct import). Fix `toPath` so a bare `page.mdx`/`page.tsx` at `src/pages/` root → path `/`. Current logic: `rel === "page" || rel === ""` returns `/` — but `rel` ends up empty after the regex strips `/page.mdx`, and the check may not fire. Debug with `python scripts/debug-text.py` (should show homepage HTML, not "not found").

**To finish (handoff checklist):**
1. Fix `toPath` in `src/App.tsx` (homepage route = `/`).
2. Re-run `python scripts/debug-text.py` → expect homepage content.
3. Run `python scripts/verify-migration.py` (tests: homepage, `/button`, `/chart/area`, RTL toggle, Cmd+K command menu). Server was on **port 5174** (5173 was occupied); update the script's port if needed, or kill stray processes.
4. `npm run registry:build` must still emit `public/r/*.json` (registry pipeline is framework-independent).
5. `npm run build` → `dist/`.
6. Commit all + push on `feat/vite-migration`.
7. Note: a pre-existing `tsc` error in `registry/dga/ui/_registry.ts` (line 529, TS1136) exists on `main` too — NOT caused by this migration.

**Dev server:** background task IDs were `bs46b54wv` (killed) then `b7zksk3tb` (on 5174). Playwright installed (chromium). Debug scripts in `scripts/`: verify-migration.py, debug-migration.py, debug-text.py, debug-import.py, debug-network.py, debug-script.py, debug-app.py, debug-render.py, debug-full.py, debug-5174.py.

Related: [[vite-migration-decision]], [[english-only-for-file-artifacts]].
