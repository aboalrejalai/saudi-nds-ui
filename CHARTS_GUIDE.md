# Saudi NDS UI Charts Architecture & Implementation Guide 📊

This technical guide outlines the 100% standardized specification for constructing, styling, registering, and showcasing Chart component families within **Saudi NDS UI**. Any AI agent or developer following this guide will reproduce the exact same visual design, Saudi Green brand identity, strict 2-layer clean layout, slide-over code viewer, and 100% locale isolation.

---

## 🎨 1. Design System & Brand Identity Rules

### A. Official Saudi Green Color Palette
- **Primary Icon & Accent Color**: `#1b8354` (`text-[#1b8354] dark:text-[#54c08a]`)
- **Hover Transition Color**: `#25935f` (`hover:text-[#25935f]`)
- **Chart CSS Variables (in `app/globals.css`)**:
  ```css
  --chart-1: #1b8354; /* Saudi Green Primary */
  --chart-2: #25935f; /* Saudi Green Light */
  --chart-3: #166a45; /* Saudi Green Dark */
  --chart-4: #54c08a; /* Saudi Green Soft Accent */
  --chart-5: #384250; /* Neutral Dark Parallel */
  ```

### B. Strict 2-Layer Layout System (Zero Visual Distortion)
- **Layer 1 (Page Background)**: Main page background canvas (`bg-background`).
- **Layer 2 (Chart Card)**: Live chart component `<Card>` with native clean border (`border bg-card`).
- ⚠️ **CRITICAL RULE**: NEVER add an outer wrapper `div` with `border`, `bg-card`, or `p-1` around `{children}` in `ChartShowcaseCard`. This prevents double borders and 3rd layer visual distortion.

---

## 📐 2. Layout & Grid Architecture

1. **Featured Interactive Chart (Full Width Top)**:
   - Positioned at the top of the showcase family in a full-width container (`w-full col-span-full`).
2. **3-Column Grid System**:
   - All remaining charts in the family must be arranged in a clean **3-column responsive grid**:
     ```tsx
     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
       {/* Family Charts */}
     </div>
     ```

---

## 🛠️ 3. Standardized Component: `ChartShowcaseCard`

Location: [components/docs/chart-showcase-card.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/components/docs/chart-showcase-card.tsx)

### Props Signature:
- `name`: String (e.g. `"chart-bar-default"`).
- `category`: String (e.g. `"Bar Chart"` or `"رسم بياني شريطي"`).
- `title`: Functional title of the chart.
- `code`: Raw TSX source code string.
- `children`: The live React chart component instance (e.g. `<ChartBarDefault />`).
- `fullWidth`: Boolean flag for full-width placement.

### Interactive Controls:
- **Category Icon**: Uses `Chart01Stroke` styled with `#1b8354` and smooth hover transition to `#25935f`.
- **Quick Copy Button**: One-click clipboard copy (`Copy01Stroke`) with animated checkmark feedback (`CheckmarkBadge01Solid`).
- **View Code Button**: Opens a right-side Slide-Over Sheet (`Sheet`) displaying syntax-formatted TSX source code with line numbers on a clean light/dark container.

---

## 🌐 4. Strict 100% Locale Isolation Rules

- Retrieve current locale via `const locale = useLocale()` and `const isAr = locale === "ar"`.
- **English Locale (`en`)**: 100% pure English text ("Charts Showcase", "Bar Chart", "View Code", "Copy code", "Copied").
- **Arabic Locale (`ar`)**: 100% pure Arabic text ("معرض الرسوم البيانية", "رسم بياني شريطي", "عرض الكود", "نسخ الكود", "تم النسخ").
- ⚠️ **CRITICAL RULE**: NEVER mix English and Arabic words on the same title or UI element.

---

## 🚀 5. Step-by-Step Implementation Guide for New Chart Families

To implement any new chart family (e.g., **Bar Charts**, **Line Charts**, **Pie Charts**, **Radar Charts**, **Radial Charts**, **Tooltip Charts**):

### Step 1: Ensure Registry Components Exist
Ensure all chart files in `registry/dga/charts/chart-<family>-<variant>.tsx` use:
- Icons from `@aboalrejal/nds-icons`.
- CSS variables `--chart-1` through `--chart-5`.
- Dynamic props interfaces (`data`, `config`, `title`, `description`, `trendingText`, `className`).

### Step 2: Generate Showcase Component
Create `app/[locale]/chart/<family>-charts-showcase.tsx`:
- Place `Chart<Family>Interactive` at the top with `fullWidth`.
- Place the remaining 9 charts in `<div className="grid grid-cols-1 gap-6 md:grid-cols-3">`.
- Wrap each chart with `<ChartShowcaseCard>` passing localized `category` and `title`.

### Step 3: Register & Update MDX Page
- Ensure chart components are registered in `registry/dga/registry.ts`.
- Import and render `<FamilyChartsShowcase />` inside `app/[locale]/chart/page.mdx`.

### Step 4: Verification & Git Auto-Push
- Run `npm run build` to verify clean TypeScript compilation with 0 errors.
- Run `git add .`, `git commit -m "feat(charts): add <Family> Charts showcase"`, and `git push`.
