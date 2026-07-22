# Architectural Transition Plan: Next.js to Vite + React 19 + Tailwind CSS v4 & NPM Package Distribution (`@saudi-nds/ui`) 🚀

This document outlines the end-to-end technical specification, architectural strategy, file-by-file audit, and phase-by-phase execution plan for transitioning **Saudi NDS UI** from a Next.js App Router setup into a high-performance **Vite + React 19 + Tailwind CSS v4 Monorepo** featuring dual distribution: an **NPM Component Package (`@saudi-nds/ui`)** and a **Vite Documentation & Multi-Theme Studio Web Application**.

---

##  EXECUTIVE SUMMARY & ARCHITECTURAL MOTIVATION

### Current Pain Points in Next.js Setup
1. **Local Development Latency**: Next.js 16 App Router performs on-demand Server-Side Rendering (SSR) evaluation, Next-Intl routing checks, and per-page MDX compilation. Modifying chart components or navigating across 80+ component showcase routes incurs 3–5s compilation delays per page request.
2. **Monolithic Boundary**: Components currently reside strictly inside an internal Next.js application structure (`registry/dga/`), preventing external React projects (Vite, Remix, Astro, Laravel, CRA) from importing `@saudi-nds/ui` directly via `npm install`.
3. **Deployment & Server Overhead**: Next.js requires node server execution or complex edge adapters for full SSR features, whereas a design system showcase is fundamentally static and interactive client-side content.

### Target Architecture Benefits
1. **Instant HMR & Build Performance**: Vite 6 utilizes Native ES Modules (ESM) during development, dropping Hot Module Replacement (HMR) to **<20ms** and accelerating production builds by **10x**.
2. **Dual Distribution Model**:
   - **NPM Package Library (`@saudi-nds/ui`)**: Tree-shakeable, pre-compiled React 19 components with TypeScript definitions, CSS design tokens, and icon bindings.
   - **Vite Documentation & Theme Studio (`apps/docs`)**: Pure static SPA deployed on static CDNs (Cloudflare Pages, GitHub Pages, Vercel Static) with zero server overhead.
3. **Multi-Theme Open Source Ecosystem**: Clean separation allowing dozens of open-source contributors to add themes, color palettes, and component variants effortlessly.

---

## 🏛️ CURRENT SYSTEM AUDIT & ARCHITECTURE

### Current Tech Stack
- **Framework**: Next.js 16.1.4 (App Router)
- **UI Engine**: React 19.2.3 / React-DOM 19.2.3
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss` 4.0.0), `tw-animate-css`
- **Charts Library**: Recharts 2.15.4
- **Primitives**: Radix UI Primitives (`@radix-ui/react-*`), Base UI 1.1.0, Command (cmdk)
- **Icons**: `@aboalrejal/nds-icons`, Hugeicons, Tabler, Phosphor
- **Internationalization**: `next-intl` 4.13.1 (App Router locale routing `/ar` and `/en`)
- **Documentation**: Next.js MDX (`@next/mdx`, `next-mdx-remote`, `@mdx-js/react`)

### Component & File Distribution Summary
- **UI Components (`registry/dga/ui/`)**: 63 components
- **Chart Components (`registry/dga/charts/`)**: 71 components (Area, Bar, Line, Pie, Radar, Radial, Tooltip)
- **Showcase Views (`app/[locale]/chart/`)**: 7 showcase wrappers + 7 dedicated MDX pages
- **Documentation Component Pages (`app/[locale]/`)**: 89 route directories (`button`, `card`, `dialog`, etc.)
- **Layout & Docs Components (`components/`)**: 14 layout, header, sidebar, and showcase components
- **Utilities & Logic (`lib/`, `i18n/`)**: 4 utility & routing files

---

## 🎯 TARGET MONOREPO STRUCTURE

```
saudi-nds-ui/
├── packages/
│   └── ui/                          # NPM Package (@saudi-nds/ui)
│       ├── src/
│       │   ├── components/          # Re-usable UI Components (Button, Card, Dialog...)
│       │   ├── charts/              # Standardized Saudi NDS Recharts Components
│       │   ├── tokens/              # Saudi Green CSS Tokens & Theme Palettes
│       │   └── index.ts             # Main Package Export Entrypoint
│       ├── tsup.config.ts           # Tsup Package Bundler (ESM + CJS + d.ts)
│       └── package.json             # NPM Publish Specification
├── apps/
│   └── docs/                        # Vite Documentation & Multi-Theme Studio
│       ├── src/
│       │   ├── pages/               # Interactive Component & Chart Documentation Pages
│       │   ├── components/          # Sidebar, Header, Code Viewer, Theme Customizer
│       │   ├── main.tsx             # Vite React 19 Entrypoint
│       │   └── App.tsx              # Client-Side Router & Layout
│       ├── index.html               # Single Page App Root HTML
│       ├── vite.config.ts           # Vite + React 19 + Tailwind v4 + MDX Plugin Config
│       └── package.json             # Docs Web App Specification
├── pnpm-workspace.yaml              # Monorepo Workspace Manager
├── package.json                     # Root Monorepo Configuration
└── README.md
```

---

## 📋 EXHAUSTIVE FILE MODIFICATION, CREATION & DELETION BREAKDOWN

### 1. Configuration & Root Build Files

| Action | File Path | Scope & Modifications |
| :--- | :--- | :--- |
| **[MODIFY]** | `package.json` | Convert to pnpm/npm workspace root. Remove Next.js scripts, add workspace scripts (`dev`, `build`, `build:ui`, `build:docs`, `publish:ui`). |
| **[NEW]** | `pnpm-workspace.yaml` | Define workspace packages: `packages/*` and `apps/*`. |
| **[MODIFY]** | `tsconfig.json` | Update path aliases (`@saudi-nds/ui` -> `./packages/ui/src`, `@/` -> `./apps/docs/src`). Add `jsx: "react-jsx"`, `moduleResolution: "bundler"`. |
| **[DELETE]** | `next.config.mjs` | Removed (Next.js replaced by Vite). |
| **[NEW]** | `apps/docs/vite.config.ts` | Configure Vite 6, `@vitejs/plugin-react`, `@tailwindcss/vite`, `@mdx-js/rollup`, and path aliases. |
| **[NEW]** | `apps/docs/index.html` | Root HTML entry for Vite Single Page Application with RTL/LTR support and Inter / IBM Plex Sans Arabic fonts. |
| **[NEW]** | `packages/ui/tsup.config.ts` | Configure tsup library bundler producing clean ESM/CJS outputs, type declarations (`.d.ts`), and CSS token bundles. |
| **[NEW]** | `packages/ui/package.json` | Package metadata for publishing `@saudi-nds/ui` to NPM. |

---

### 2. UI Components Migration (`registry/dga/ui/` -> `packages/ui/src/components/`)

All **63 UI components** will be relocated to `packages/ui/src/components/` and exported via `packages/ui/src/index.ts`. All Next.js specific imports (`next/image`, `next/link`, `next/headers`) will be replaced with standard React 19 props or client router hooks.

#### Files to Move & Standardize (63 Files):
1. [accordion.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/accordion.tsx)
2. [alert.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/alert.tsx)
3. [alert-dialog.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/alert-dialog.tsx)
4. [aspect-ratio.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/aspect-ratio.tsx)
5. [attachment.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/attachment.tsx)
6. [avatar.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/avatar.tsx)
7. [badge.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/badge.tsx)
8. [breadcrumb.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/breadcrumb.tsx)
9. [bubble.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/bubble.tsx)
10. [button.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/button.tsx)
11. [button-group.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/button-group.tsx)
12. [calendar.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/calendar.tsx)
13. [card.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/card.tsx)
14. [carousel.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/carousel.tsx)
15. [chart.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/chart.tsx)
16. [checkbox.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/checkbox.tsx)
17. [code.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/code.tsx)
18. [collapsible.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/collapsible.tsx)
19. [combobox.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/combobox.tsx)
20. [command.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/command.tsx)
21. [context-menu.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/context-menu.tsx)
22. [cookies.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/cookies.tsx)
23. [data-table.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/data-table.tsx)
24. [date-picker.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/date-picker.tsx)
25. [description-list.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/description-list.tsx)
26. [dialog.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/dialog.tsx)
27. [direction.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/direction.tsx)
28. [drawer.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/drawer.tsx)
29. [dropdown-menu.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/dropdown-menu.tsx)
30. [empty.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/empty.tsx)
31. [field.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/field.tsx)
32. [file-dropzone.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/file-dropzone.tsx)
33. [file-upload.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/file-upload.tsx)
34. [filter.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/filter.tsx)
35. [form.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/form.tsx)
36. [hover-card.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/hover-card.tsx)
37. [input.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/input.tsx)
38. [input-group.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/input-group.tsx)
39. [input-otp.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/input-otp.tsx)
40. [item.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/item.tsx)
41. [kbd.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/kbd.tsx)
42. [label.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/label.tsx)
43. [marker.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/marker.tsx)
44. [menubar.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/menubar.tsx)
45. [message.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/message.tsx)
46. [message-scroller.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/message-scroller.tsx)
47. [multi-select.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/multi-select.tsx)
48. [native-select.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/native-select.tsx)
49. [navigation-menu.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/navigation-menu.tsx)
50. [pagination.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/pagination.tsx)
51. [popover.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/popover.tsx)
52. [progress.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/progress.tsx)
53. [quote.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/quote.tsx)
54. [radio-group.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/radio-group.tsx)
55. [rating.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/rating.tsx)
56. [resizable.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/resizable.tsx)
57. [rich-text-editor.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/rich-text-editor.tsx)
58. [scroll-area.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/scroll-area.tsx)
59. [select.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/select.tsx)
60. [separator.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/separator.tsx)
61. [sheet.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/sheet.tsx)
62. [sidebar.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/sidebar.tsx)
63. [skeleton.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/registry/dga/ui/skeleton.tsx)

---

### 3. Chart Components Migration (`registry/dga/charts/` -> `packages/ui/src/charts/`)

All **70 Chart components** across 7 families will be relocated to `packages/ui/src/charts/`, exported via `packages/ui/src/index.ts`, and bundled with explicit container height rules (`className="aspect-auto h-[250px] w-full"`).

#### Files to Move & Standardize (70 Files):
- **Area Family (10 files)**: `chart-area-interactive.tsx`, `chart-area-default.tsx`, `chart-area-linear.tsx`, `chart-area-step.tsx`, `chart-area-stacked.tsx`, `chart-area-stacked-expand.tsx`, `chart-area-legend.tsx`, `chart-area-icons.tsx`, `chart-area-gradient.tsx`, `chart-area-axes.tsx`.
- **Bar Family (10 files)**: `chart-bar-interactive.tsx`, `chart-bar-default.tsx`, `chart-bar-horizontal.tsx`, `chart-bar-multiple.tsx`, `chart-bar-stacked.tsx`, `chart-bar-negative.tsx`, `chart-bar-mixed.tsx`, `chart-bar-label.tsx`, `chart-bar-label-custom.tsx`, `chart-bar-active.tsx`.
- **Line Family (10 files)**: `chart-line-interactive.tsx`, `chart-line-default.tsx`, `chart-line-linear.tsx`, `chart-line-step.tsx`, `chart-line-multiple.tsx`, `chart-line-dots.tsx`, `chart-line-dots-colors.tsx`, `chart-line-dots-custom.tsx`, `chart-line-label.tsx`, `chart-line-label-custom.tsx`.
- **Pie Family (11 files)**: `chart-pie-interactive.tsx`, `chart-pie-simple.tsx`, `chart-pie-donut.tsx`, `chart-pie-donut-active.tsx`, `chart-pie-donut-text.tsx`, `chart-pie-stacked.tsx`, `chart-pie-legend.tsx`, `chart-pie-label.tsx`, `chart-pie-label-custom.tsx`, `chart-pie-label-list.tsx`, `chart-pie-separator-none.tsx`.
- **Radar Family (14 files)**: `chart-radar-default.tsx`, `chart-radar-dots.tsx`, `chart-radar-lines-only.tsx`, `chart-radar-multiple.tsx`, `chart-radar-radius.tsx`, `chart-radar-grid-circle.tsx`, `chart-radar-grid-circle-fill.tsx`, `chart-radar-grid-circle-no-lines.tsx`, `chart-radar-grid-custom.tsx`, `chart-radar-grid-fill.tsx`, `chart-radar-grid-none.tsx`, `chart-radar-icons.tsx`, `chart-radar-label-custom.tsx`, `chart-radar-legend.tsx`.
- **Radial Family (6 files)**: `chart-radial-simple.tsx`, `chart-radial-label.tsx`, `chart-radial-grid.tsx`, `chart-radial-text.tsx`, `chart-radial-shape.tsx`, `chart-radial-stacked.tsx`.
- **Tooltip Family (9 files)**: `chart-tooltip-default.tsx`, `chart-tooltip-advanced.tsx`, `chart-tooltip-formatter.tsx`, `chart-tooltip-icons.tsx`, `chart-tooltip-indicator-line.tsx`, `chart-tooltip-indicator-none.tsx`, `chart-tooltip-label-custom.tsx`, `chart-tooltip-label-formatter.tsx`, `chart-tooltip-label-none.tsx`.

---

### 4. Docs App Layout & Navigation Migration (`components/` & `app/[locale]/` -> `apps/docs/src/`)

| File Path (Source) | Destination Path (Vite Docs) | Modification Details |
| :--- | :--- | :--- |
| `components/sidebar/app-sidebar.tsx` | `apps/docs/src/components/app-sidebar.tsx` | Replace `@/i18n/routing` `Link` and `usePathname` with `react-router-dom` `NavLink` / `useLocation`. |
| `components/sidebar/app-header.tsx` | `apps/docs/src/components/app-header.tsx` | Connect theme customizer modal and RTL/LTR switcher using React state. |
| `components/sidebar/command-menu.tsx` | `apps/docs/src/components/command-menu.tsx` | Fast client-side search across all components and chart routes. |
| `components/docs/chart-showcase-card.tsx` | `apps/docs/src/components/chart-showcase-card.tsx` | Retain Slide-Over Sheet code viewer and clipboard copy feedback. |
| `components/docs/docs-layout.tsx` | `apps/docs/src/components/docs-layout.tsx` | Wrap page contents with AppHeader, AppSidebar, and Theme Studio Provider. |
| `app/[locale]/chart/*-showcase.tsx` (7 files) | `apps/docs/src/pages/charts/*-showcase.tsx` | Update component imports to consume `@saudi-nds/ui` package exports directly. |
| `app/[locale]/chart/*/page.mdx` (7 files) | `apps/docs/src/pages/charts/*/page.tsx` | Convert MDX showcase pages to Vite React MDX routes. |

---

## 🛠️ PHASE-BY-PHASE EXECUTION STRATEGY

### 📦 PHASE 1: Monorepo & NPM Package Architecture Setup
- **Task 1.1**: Initialize `pnpm-workspace.yaml` and create root monorepo scripts in `package.json`.
- **Task 1.2**: Create `packages/ui` workspace with `package.json`, `tsconfig.json`, and `tsup.config.ts`.
- **Task 1.3**: Migrate CSS design tokens from `styles/tokens.css` and `app/globals.css` into `packages/ui/src/tokens/`.

### 🎨 PHASE 2: Core UI Components & Charts Packaging (`packages/ui`)
- **Task 2.1**: Move all 63 UI components into `packages/ui/src/components/`.
- **Task 2.2**: Move all 70 Chart components into `packages/ui/src/charts/`.
- **Task 2.3**: Create `packages/ui/src/index.ts` exporting all components, charts, and props interfaces.
- **Task 2.4**: Run `pnpm --filter @saudi-nds/ui build` and verify clean ESM, CJS, and `.d.ts` type bundle generation.

### ⚡ PHASE 3: Vite Documentation App Initialization (`apps/docs`)
- **Task 3.1**: Create `apps/docs` with `vite.config.ts` leveraging `@vitejs/plugin-react`, `@tailwindcss/vite`, and `@mdx-js/rollup`.
- **Task 3.2**: Create `index.html` root entry and `apps/docs/src/main.tsx`.
- **Task 3.3**: Install and configure `react-router-dom` v7 for fast client-side SPA routing (`/chart/area`, `/chart/bar`, etc.).

### 🌐 PHASE 4: Navigation, Routing & Lightweight i18n
- **Task 4.1**: Refactor `app-sidebar.tsx` and `app-header.tsx` to use `react-router-dom` hooks.
- **Task 4.2**: Implement lightweight React i18n context replacing Next-Intl App Router overhead.
- **Task 4.3**: Integrate `ChartShowcaseCard` with Slide-Over Sheet code viewer inside the Vite SPA layout.

### 📊 PHASE 5: Chart & Component Documentation Pages Migration
- **Task 5.1**: Migrate all 7 Chart Showcase pages (`Area`, `Bar`, `Line`, `Pie`, `Radar`, `Radial`, `Tooltip`) to `apps/docs/src/pages/charts/`.
- **Task 5.2**: Migrate UI component documentation pages to `apps/docs/src/pages/components/`.
- **Task 5.3**: Verify that all chart components render visually at `250px` height with full interactivity.

### 🎨 PHASE 6: Multi-Theme Studio & Open-Source NPM Publishing
- **Task 6.1**: Build interactive Theme Studio Customizer in `apps/docs` for real-time Saudi Green palette customization.
- **Task 6.2**: Execute production static build `pnpm build:docs` for instant CDN hosting (Cloudflare Pages / GitHub Pages).
- **Task 6.3**: Publish `@saudi-nds/ui` package to NPM registry (`npm publish --access public`).

---

## 🧪 VERIFICATION & CI/CD PIPELINE

1. **Package Type Check & Build Validation**:
   ```bash
   pnpm --filter @saudi-nds/ui build
   ```
2. **Docs App Production Static Build**:
   ```bash
   pnpm --filter docs build
   ```
3. **Instant Vite Dev Server Benchmark**:
   ```bash
   pnpm dev
   ```
   *Target: Server startup <300ms, HMR updates <20ms.*
