# Updated Migration Plan: Next.js → Vite + NPM Package Publishing

> **Version V2** — a leaner, cleaner alternative to the original `VITE_MIGRATION_PLAN.md`.
> **Chosen goals:** (1) Speed only — eliminate Next.js slowness, (2) Publish `@saudi-nds/ui` to NPM.
> **Approach:** A single flat project (no monorepo), keeping `registry/dga/` in place as the single source of truth.

---

## Why this plan instead of the original?

The original plan (V1) bundles three decisions into one. The reality:

| Decision in V1 | Solves slowness? | Cost | Verdict |
|:---|:---:|:---:|:---|
| Drop SSR + `next-intl` + move Docs to Vite SPA | ✅ | Medium | **Required** |
| Monorepo `packages/` + `apps/` + relocate 152 files | ❌ | Very high | **Rejected — wasteful** |
| Publish `@saudi-nds/ui` to NPM | ❌ (not for speed) | Medium | **Required, but separate** |

### The real source of slowness (not SSR, as V1 claims)
Your 91 pages are effectively static. The slowness comes from:
1. The **`next-intl` middleware** running on every request.
2. **Indexing 91 routes** in the dev server.
3. **App Router overhead** on a project that is inherently an SPA.

→ The direct fix: **Vite SPA**. Nothing more.

### Why keep `registry/dga/` in place?
- The components are **100% clean of Next.js** (zero `next/*` imports, zero `'use client'` — verified).
- Relocating paths would break: `components.json`, [scripts/update-registry-missing.js](scripts/update-registry-missing.js), [lib/get-components.ts](lib/get-components.ts), and thousands of imports across 91 MDX pages and every `_registry.ts`.
- **Rule: components stay where they are because they are the source of truth.**

---

## Actual figures (corrected from V1)

| Item | V1 said | Actual |
|:---|:---:|:---:|
| UI components (`registry/dga/ui/`) | 81 | **82** |
| Chart components (`registry/dga/charts/`) | 70 | **70** ✓ |
| Docs MDX pages | 89 | **91** |

---

## Target structure (single flat project — no radical change)

```
saudi-nds-ui/                       # same root, no monorepo
├── registry/dga/                   # ★ unchanged — single source of truth (do not touch)
│   ├── ui/                         #   82 components
│   ├── charts/                     #   70 charts
│   ├── registry.ts                 #   registry root
│   └── ...
├── src/                            # ★ new — Vite SPA app (replaces app/)
│   ├── main.tsx                    #   Vite + React 19 entry point
│   ├── App.tsx                     #   React Router + Layout
│   ├── pages/                      #   91 pages converted from MDX
│   │   ├── components/
│   │   └── charts/
│   ├── components/                 #   sidebar/header/command-menu (from old components/)
│   ├── i18n/                       #   lightweight i18n context (replaces next-intl)
│   └── styles/                     #   tokens + globals (from styles/ and app/globals.css)
├── index.html                      # ★ new — SPA root
├── vite.config.ts                  # ★ new — React + Tailwind v4 + MDX
├── tsup.config.ts                  # ★ new (Phase 2) — to build @saudi-nds/ui
├── package.json                    # ★ modified
└── messages/                       # kept (read by the new i18n context)
```

> **What changes:** `app/`, `next.config.ts`, `middleware.ts` are deleted. **What does NOT change:** the entire `registry/`.

---

## Phase 1 — Vite SPA (solves slowness on its own)

### 1.1 Vite setup
- `npm i -D vite @vitejs/plugin-react @tailwindcss/vite @mdx-js/rollup`
- `npm i react-router-dom`
- Create [vite.config.ts](vite.config.ts): plugins (react, tailwind, mdx), aliases `@/` → `./src` and `@registry/` → `./registry/dga`.
- Create [index.html](index.html) with fonts (IBM Plex Sans Arabic) and RTL/LTR support.

### 1.2 Entry point and routing
- [src/main.tsx](src/main.tsx) + [src/App.tsx](src/App.tsx): React Router v7, routes from `/[locale]/[component]` → `/[component]` (keep language via context, not via URL segment — optional).
- Auto-generate routes from the same `get-components.ts` contract (intersection between `registry/dga/ui/*.tsx` and the pages).

### 1.3 Lightweight i18n without next-intl
- A simple React context reading the existing `messages/ar.json` / `messages/en.json` (do not rewrite translations).
- Delete [middleware.ts](middleware.ts) and [i18n/routing.ts](i18n/routing.ts).

### 1.4 Move layout and components
- `components/sidebar/*` and `components/docs/*` → `src/components/`.
- Replace `next/link` and `usePathname` with `react-router-dom` (`NavLink`, `useLocation`).
- Replace `next/image` with plain `<img>` (not present in registry anyway, only at app-level).

### 1.5 Convert 91 MDX pages
- Move `app/[locale]/*/page.mdx` → `src/pages/components/*/page.tsx` (MDX imported as a React component via `@mdx-js/rollup`).
- Convert the accompanying `demos.tsx` the same way.
- The 7 chart pages the same way → `src/pages/charts/`.

### 1.6 Deletion and cleanup
- Delete: `app/`, `next.config.ts`, `middleware.ts`, `i18n/`.
- From `package.json`: remove `next`, `next-intl`, `@next/mdx`, `next-mdx-remote`, the `next` scripts.
- Keep: `npm run registry:build` (runs independently of Vite).

### ✅ Phase 1 success criteria
- `npm run dev` starts in < 300ms, HMR < 20ms.
- All 91 pages open, RTL/LTR toggling works, search (command menu) works.

---

## Phase 2 — Publish `@saudi-nds/ui` to NPM (separate)

> Goal: `npm install @saudi-nds/ui` instead of relying only on `npx shadcn add`.
> **Important note:** this does NOT remove the shadcn mechanism — it adds an alternative install method.

### 2.1 Build the package with tsup
- `npm i -D tsup`
- Create [tsup.config.ts](tsup.config.ts): ESM + CJS + `.d.ts`, building directly from `registry/dga/` (no file relocation).
- New entry file `registry/dga/index.ts` that re-exports all `ui/*` and `charts/*`.

### 2.2 The package's package.json (`exports` field or a separate package)
- Option A (simplest): the root `package.json` also serves the package; we add `exports`, `files`, and `types`.
- Option B: a separate package.json in a copied build folder.
- Declare `peerDependencies`: `react`, `react-dom`, `recharts`, `@radix-ui/*`.

### 2.3 Test locally, then publish
- `npm pack` to verify the contents.
- `npm publish --access public`.

### ✅ Phase 2 success criteria
- `npm install @saudi-nds/ui` works in an empty project and `import { Button }` works.

---

## What we rejected from V1 and why
1. **monorepo `packages/` + `apps/`** — complexity with no benefit for a project this size.
2. **Relocating 152 files to new paths** — breaks the shadcn contract and hundreds of imports.
3. **The claim that slowness comes from SSR** — inaccurate; slowness comes from middleware + route count.
4. **pnpm-workspace.yaml** — unnecessary in a flat project.

---

## Estimated overall size
- **Phase 1:** medium (~1 work week) — converting 91 pages + Vite setup.
- **Phase 2:** small (1–2 days) — tsup + publish.
- **Compared to V1:** ~40% of its size, because we dropped the monorepo and file relocation.

---

## Suggested execution order
1. **Start with Phase 1 only** — you test the speed immediately and decide whether you need Phase 2.
2. Once Vite is stable, run Phase 2 if you want npm-based installation.
3. Theme Studio (Phase 3 in V1) — **deferred** as a separate feature with its own schedule.
