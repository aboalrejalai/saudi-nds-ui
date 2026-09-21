# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

**Saudi NDS UI** is a copy/paste component registry for the Saudi National Design System (NDS) by the Digital Government Authority (DGA), built on the **shadcn/ui** architecture over **Tailwind CSS v4**. The repo serves two purposes simultaneously:

1. **The component registry (source of truth)** — all installable components live in [registry/dga/](registry/dga/). Consumers install them via `npx shadcn@latest add @dga/<name>` (or `https://nds.aboalrejal.com/r/<name>.json`), which copies the `.tsx` into their own project.
2. **The docs/showcase site** — a Next.js 16 (App Router) app that renders a live demo page per component and serves the built registry JSON at `/r/<name>.json`.

Components are **RTL-first**, use **IBM Plex Sans Arabic**, and are styled exclusively with Tailwind utilities + DGA design tokens (no external CSS files).

## Commands

```bash
npm run dev            # Next.js dev server (uses --webpack, NOT turbopack). Showcases at localhost:3000
npm run build          # Runs registry:build, then next build
npm run registry:build # shadcn build — compiles registry/dga/registry.ts → public/r/<name>.json (gitignored output)
npm run lint           # next lint
npm run format         # prettier --write .
npm run format:check   # prettier --check .
```

There is no test framework configured. Don't invent test commands.

### Node helper scripts
- `scripts/update-registry-missing.js` — detects new `.tsx` in `registry/dga/ui/` not yet in `registry.json` / `_registry.ts`, scans imports to infer `dependencies`/`registryDependencies`, and patches both files. Run after adding components.
- `skills/saudi-nds-ui/scripts/lookup.js <component>` — print a component's API/variants/dependencies before using it. Prefer this over guessing.
- `skills/saudi-nds-ui/scripts/audit-page.js <file>` — audit a file for NDS compliance.
- `skills/saudi-nds-ui/scripts/generate-guide.js` — regenerate component docs after registry changes.

## Architecture

### The registry pipeline
```
registry/dga/ui/*.tsx  ──┐
registry/dga/hooks/*   ──┤   each subdir has a _registry.ts aggregator
registry/dga/lib/*     ──┼──> registry/dga/registry.ts  ──npm run registry:build──>  public/r/<name>.json
registry/dga/internal/*┤
registry/dga/charts/*  ──┘
```
- `registry/dga/registry.ts` is the root definition. It merges `ui`, `lib`, `hooks`, `internal`, strips a `DEPRECATED_ITEMS` blocklist, and validates everything against `shadcn/schema`'s `registryItemSchema`.
- Each item declares `files` (relative paths under the registry root), npm `dependencies`, and `registryDependencies` (other DGA components it needs).
- `components.json` declares the `@dga` namespace (`https://nds.aboalrejal.com/r/{name}.json`), `style: "dga"`, `rtl: true`, `iconLibrary: "hugeicons"`. The `registries` key must stay plural (object with `{name}` template) — the singular form breaks `@dga/` installs.
- Root [registry.json](registry.json) is a **committed index** (not the build output) kept in sync with `_registry.ts` by `update-registry-missing.js`. The `public/r/` directory is generated and gitignored.

### The docs site
- Routes are localized via the `[locale]` segment: locales `en` and `ar`, default `en` ([i18n/routing.ts](i18n/routing.ts)). `next-intl` middleware ([middleware.ts](middleware.ts)) handles locale routing; messages live in [messages/ar.json](messages/ar.json) / [messages/en.json](messages/en.json).
- **Each component's docs page is `app/[locale]/<component>/page.mdx`**, optionally paired with a `demos.tsx` exporting named React demo components. The MDX wraps its content in `<DocsLayout>` (server component that reads the sidebar cookie) → `<DocsShell>` ([components/docs/docs-shell.tsx](components/docs/docs-shell.tsx)) which renders the sidebar, command menu, and toaster.
- `lib/get-components.ts` auto-discovers the sidebar component list by intersecting `registry/dga/ui/<name>.tsx` with `app/[locale]/<name>/page.mdx` (a component appears in the sidebar only if **both** exist). It excludes `_registry`, `sidebar`, `sheet`, `direction`, `utils`. **Keep this contract in sync** when adding/removing components.
- MDX is compiled with `@next/mdx` + the Rust `mdxRs` GFM compiler (no JS remark plugins) — see [next.config.ts](next.config.ts). `pageExtensions` includes `md`/`mdx`.

### Design tokens & theming (Tailwind v4)
- **`styles/tokens.css` is the single source of truth** for all DGA design tokens (raw system variables like `--colors-primary-s-a-flag600-primary`).
- [app/globals.css](app/globals.css) bridges those raw tokens into the shadcn semantic layer (`--background`, `--primary`, `--border`, etc.) via `:root` mappings, then exposes them to Tailwind via `@theme inline`. **Prefer bridged Tailwind classes** (`bg-primary`, `text-foreground`, `border-border`) over raw hex.
- There is **no `tailwind.config.ts`** (Tailwind v4). Do not use legacy `@tailwind base/components/utilities` directives. Theme customization lives entirely in CSS.
- Key DGA identity values: primary green `#1B8354` (hover `#166A45`), neutrals `#FCFCFD`/`#F9FAFB` (bg) and `#1F2A37`/`#111927` (text). Dark mode via `@custom-variant dark (&:is(.dark *))`.

### RTL & direction
- `dir` is set from locale in [app/[locale]/layout.tsx](app/[locale]/layout.tsx) (`rtl` for `ar`, `ltr` for `en`). `AppDirectionProvider` ([components/direction-context.tsx](components/direction-context.tsx)) enables runtime RTL/LTR toggling on demo pages.
- **Always use logical Tailwind properties**: `ms-`/`me-`/`ps-`/`pe-`/`start-*`/`end-*`, never `ml-`/`mr-`/`pl-`/`pr-`/`left-*`/`right-*`. Directional icons (arrows, chevrons) must flip with `rtl:rotate-180` or `rtl:-scale-x-100`.

### Icons (do not mix these up)
- **Inside registry components**: `@hugeicons/react` (the configured `iconLibrary`, bundled as a dependency). Don't swap this out.
- **App-level custom Saudi iconography**: `@aboalrejal/nds-icons` (also vendored locally at [packages/icons/](packages/icons/)). There are several other icon libraries in `package.json` (phosphor, tabler, remixicon) — match whatever the surrounding code uses rather than introducing a new one.

## Conventions

### Adding a component (follow [COMPONENT_CREATION_GUIDE.md](COMPONENT_CREATION_GUIDE.md) literally)
1. The component's home is **always** `registry/dga/ui/<component-name>.tsx`. Do not place components elsewhere.
2. Strip any external CSS; style purely with Tailwind utilities + bridged tokens.
3. Apply DGA identity (green primary `#1B8354`, IBM Plex Sans Arabic) and RTL logical properties.
4. Register it: add an entry to `registry/dga/ui/_registry.ts` (or run `scripts/update-registry-missing.js`, which also infers deps from imports), then to the root `registry.json`.
5. Create the docs page `app/[locale]/<component>/page.mdx` (so it shows in the sidebar and is buildable).
6. Run `npm run registry:build` to generate the installable JSON.

### Code style (enforced by Prettier — [package.json](package.json) config)
- **No semicolons**, **double quotes**, 2-space indent, trailing comma `es5`, LF line endings.
- Imports are auto-sorted by `@ianvs/prettier-plugin-sort-imports` — the order is react → next → third-party → `@/` aliases (config/lib/hooks/components/ui/components/registry/styles/app/www) → relative. Don't fight the sort order manually.
- `cn()` from [lib/utils.ts](lib/utils.ts) merges Tailwind classes (clsx + tailwind-merge) — use it for conditional class composition.

### Workspace git rule
Per [.agents/AGENTS.md](.agents/AGENTS.md): after any task that modifies code or files, run `git add . && git commit -m "<message>" && git push` automatically — do not wait to be asked. (Branch first if working on the default branch per normal workflow.)

## Key references
- [INSTALL.md](INSTALL.md) — `npx skills add aboalrejal-ai/saudi-nds-ui` (skills.sh install for `saudi-nds-ui`)
- [COMPONENT_CREATION_GUIDE.md](COMPONENT_CREATION_GUIDE.md) — the authoritative (Arabic) rules for turning any UI component into an NDS-compliant one.
- [skills/saudi-nds-ui/SKILL.md](skills/saudi-nds-ui/SKILL.md) + `skills/saudi-nds-ui/references/` — the consumer-facing skill ( Modes A/B/C for installing into other projects, component API docs, theme-customization reference). Soft (studio) lives in a separate repo: [aboalrejalai/saudi-soft](https://github.com/aboalrejalai/saudi-soft).
- [DGA Compliance Details.md](DGA%20Compliance%20Details.md) — compliance/accessibility context.
