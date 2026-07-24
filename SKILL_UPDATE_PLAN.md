# Comprehensive Implementation Plan: Updating `saudi-nds-ui` Skill

This document provides an exhaustive, step-by-step, phased plan to update the `saudi-nds-ui` skill (`skills/saudi-nds-ui/`). It resolves all identified gaps, synchronizes component counts, documents all 7 chart showcase categories, updates framework guidance to **Vite 8 + React 19 + Tailwind v4**, updates helper scripts, and establishes quantitative evals.

---

## Executive Summary

- **Scope**: Modernizing and synchronizing `skills/saudi-nds-ui/` with the current codebase state.
- **Key Deliverables**:
  - Update component catalog count to **82 UI components** (including `saudi-riyal-symbol`).
  - Document all **7 chart showcase categories** (`area`, `bar`, `line`, `pie`, `radar`, `radial`, `tooltip`) with Recharts 2.x and DGA theme colors.
  - Update skill setup guidance to **Vite 8 + React 19 + Tailwind v4** as the primary framework option.
  - Update file path references to `src/styles/globals.css` and `src/styles/tokens.css`.
  - Update `evaluate-project.js` to score Vite 8 projects 10/10.
  - Re-run `generate-guide.js` to update `scratch_exports.json` and `components-guide.md`.
  - Create `evals/evals.json` test cases for skill validation.

---

## Phase 1: Component Catalog & Registry Export Synchronization

- [x] **Task 1.1: Update Component Count in `SKILL.md`**
  - File: `skills/saudi-nds-ui/SKILL.md`
  - Action: Update component count from `81 main UI components` to `82 main UI components`.
  - Action: Verify `saudi-riyal-symbol` is listed under the **Data Display** section.

- [x] **Task 1.2: Audit and Validate `references/components/saudi-riyal-symbol.md`**
  - File: `skills/saudi-nds-ui/references/components/saudi-riyal-symbol.md`
  - Action: Verify component props, export signature (`import { SaudiRiyalSymbol } from "@/components/ui/saudi-riyal-symbol"`), usage examples, and NDS currency guidelines are documented completely.

- [x] **Task 1.3: Re-run Component Guide Generator**
  - Script: `skills/saudi-nds-ui/scripts/generate-guide.js`
  - Command: `node skills/saudi-nds-ui/scripts/generate-guide.js`
  - Target Outputs:
    - `skills/saudi-nds-ui/scratch_exports.json`
    - `skills/saudi-nds-ui/references/components-guide.md`
  - Action: Verify `saudi-riyal-symbol` exports are indexed in `scratch_exports.json` and `components-guide.md`.

---

## Phase 2: Comprehensive Chart Documentation & Sub-Showcases Integration

- [x] **Task 2.1: Expand Chart References in `SKILL.md`**
  - File: `skills/saudi-nds-ui/SKILL.md`
  - Action: Replace generic chart listing with detailed sub-links:
    - Area Charts (`/chart/area`)
    - Bar Charts (`/chart/bar`)
    - Line Charts (`/chart/line`)
    - Pie Charts (`/chart/pie`)
    - Radar Charts (`/chart/radar`)
    - Radial Charts (`/chart/radial`)
    - Tooltip Charts (`/chart/tooltip`)

- [x] **Task 2.2: Rewrite `references/components/chart.md`**
  - File: `skills/saudi-nds-ui/references/components/chart.md`
  - Action: Add explicit usage sections for all 7 chart types.
  - Action: Document the DGA Saudi Green chart color palette CSS variables:
    - `--chart-1: #1b8354` (Saudi Flag Green)
    - `--chart-2: #25935f`
    - `--chart-3: #166a45`
    - `--chart-4: #54c08a`
    - `--chart-5: #384250`
  - Action: Document key components: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`.
  - Action: Provide code examples for `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialBarChart`, and custom `ChartTooltip`.

---

## Phase 3: Vite 8 Framework Architecture & Modernized Installation Guidance

- [x] **Task 3.1: Update Mode A (New Project Setup) in `SKILL.md`**
  - File: `skills/saudi-nds-ui/SKILL.md`
  - Action: Provide Vite 8 as the primary recommended initialization command:
    ```bash
    npx -y create-vite@latest my-app --template react-ts
    ```
  - Action: Document `@tailwindcss/vite` plugin setup in `vite.config.ts`.

- [x] **Task 3.2: Update CSS Token & Bridge Paths**
  - File: `skills/saudi-nds-ui/SKILL.md`
  - Action: Update file path references from legacy `app/globals.css` / `styles/tokens.css` to Vite paths:
    - `src/styles/globals.css`
    - `src/styles/tokens.css`
  - Action: Update `components.json` example to reflect Vite path structure:
    - `"css": "src/styles/globals.css"`

- [x] **Task 3.3: Update `references/theme-customization.md`**
  - File: `skills/saudi-nds-ui/references/theme-customization.md`
  - Action: Add explicit Vite 8 `@tailwindcss/vite` integration guide alongside Next.js instructions.
  - Action: Document CSS `@import` paths for both Next.js (`app/globals.css`) and Vite (`src/styles/globals.css`).

---

## Phase 4: Helper Scripts Modernization & Gatekeeper Updates

- [x] **Task 4.1: Update `scripts/evaluate-project.js`**
  - File: `skills/saudi-nds-ui/scripts/evaluate-project.js`
  - Action: Add recognition for `vite.config.ts`, `src/App.tsx`, and `src/main.tsx`.
  - Action: Award full compatibility points (10/10) for Vite 8 + Tailwind v4 setups.

- [x] **Task 4.2: Verify Lookup and Audit Scripts**
  - Files:
    - `skills/saudi-nds-ui/scripts/lookup.js`
    - `skills/saudi-nds-ui/scripts/audit-page.js`
  - Action: Test resolving `saudi-riyal-symbol` and chart showcase components.

---

## Phase 5: Evaluation Suite, Verification & Skill Packaging

- [x] **Task 5.1: Create Test Cases (`evals/evals.json`)**
  - File: `skills/saudi-nds-ui/evals/evals.json`
  - Action: Add test prompts covering:
    1. Vite 8 + Tailwind v4 Saudi NDS initialization.
    2. Adding `SaudiRiyalSymbol` to a pricing table.
    3. Creating a custom Area Chart using DGA green theme tokens.
    4. Swapping legacy currency text (`ر.س`) to `<SaudiRiyalSymbol />`.

- [x] **Task 5.2: Execute End-to-End Skill Validation**
  - Command: `node skills/saudi-nds-ui/scripts/generate-guide.js`
  - Command: `node skills/saudi-nds-ui/scripts/lookup.js saudi-riyal-symbol`
  - Command: `node skills/saudi-nds-ui/scripts/lookup.js chart`
  - Action: Verify `SKILL.md` total line count remains under 500 lines.

---

## Definition of Done

1. `skills/saudi-nds-ui/SKILL.md` lists **82 UI components** and details all 7 chart types.
2. Vite 8 + React 19 + Tailwind v4 is fully documented as the primary framework option.
3. `scratch_exports.json` and `references/components-guide.md` include `saudi-riyal-symbol`.
4. `evaluate-project.js` awards 10/10 for Vite 8 projects.
5. All test commands run cleanly with exit code 0.
