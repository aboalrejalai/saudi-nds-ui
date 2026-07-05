---
name: saudi-nds-ui
description: >
  Use this skill to build, design, modify, migrate, or audit React & Next.js websites
  based on the Saudi National Design System (NDS) by the Digital Government Authority (DGA).
  Make sure to use this skill WHENEVER the user mentions building a Saudi government UI, 
  "DGA", "NDS UI", "Saudi Design System", "RTL components", or wants to install UI components.
  Even if they don't explicitly ask for the 'registry', trigger this skill to ensure all UI matches Saudi standards.
  CRITICAL: Do not begin any project migration or setup without reading these instructions entirely.
---

# Saudi NDS UI & DGA Components Skill

This skill guides AI agents in establishing, migrating, and installing UI components from the Saudi NDS UI Registry (`https://nds.aboalrejal.com/`).

> **Stack:** React + Next.js (App Router) + **Tailwind CSS v4** + shadcn. Components are RTL-first and styled with DGA design tokens. See [`references/theme-customization.md`](references/theme-customization.md) for the full theming setup.

---

## 🚨 THE GATEKEEPER (MANDATORY FIRST STEP)
**AI AGENT INSTRUCTION:** You are STRICTLY FORBIDDEN from modifying any existing project files, rewriting HTML, or installing components until you evaluate the project's environment.

**If you are working in an existing codebase, run this command immediately:**
```bash
node skills/saudi-nds-ui/scripts/evaluate-project.js
```
Read the output score and recommendation. Based on the output, select one of the following Modes (A, B, or C). If the script returns "ABORT", you must stop, do not touch the code, and inform the user that the environment is incompatible.

---

## 🏗️ MODE A: New Project / Start from Scratch

Use this mode if the directory is empty, or if the project lacks Tailwind/shadcn setup.

1. **Initialize the App (if empty):**
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   ```
   `create-next-app` now ships **Tailwind CSS v4** — there is no `tailwind.config.ts` and you use `@import "tailwindcss"` in CSS (see step 4).

2. **Initialize shadcn:**
   ```bash
   npx shadcn@latest init
   ```
   This generates a `components.json`. Accept the defaults.

3. **Register the Saudi NDS UI Registry (CRITICAL):**
   `shadcn init` does **not** know about the DGA registry. You must add a `registries` entry (an object mapping a namespace alias to the registry URL template) so you can install components as `@dga/<name>`. Edit `components.json` to match:

   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "new-york",
     "rsc": true,
     "tsx": true,
     "rtl": true,
     "tailwind": {
       "config": "",
       "css": "app/globals.css",
       "baseColor": "neutral",
       "cssVariables": true,
       "prefix": ""
     },
     "registries": {
       "@dga": "https://nds.aboalrejal.com/r/{name}.json"
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui",
       "lib": "@/lib",
       "hooks": "@/hooks",
       "styles": "@/styles"
     },
     "iconLibrary": "hugeicons"
   }
   ```

   The only field you **must** add is `registries`. The other values above are what the DGA registry is built against (`"rtl": true`, `"iconLibrary": "hugeicons"`); if `shadcn init` produced different defaults (e.g. `lucide`), that's fine — just merge in the `registries` block.

   > ⚠️ Use `registries` (plural object with a `{name}` template), **not** the singular `"registry"` key. The singular form is invalid for namespace installs and `npx shadcn@latest add @dga/...` will fail.

4. **Wire up Tailwind v4 + DGA Tokens (`globals.css`):**
   DGA components are styled through a single token file, `styles/tokens.css`. When you add your first component, shadcn drops it at `styles/tokens.css`. Then make sure `app/globals.css` imports it **before** Tailwind and bridges the shadcn semantic tokens via `@theme inline`:
   ```css
   @import "../styles/tokens.css";
   @import "tailwindcss";

   @custom-variant dark (&:is(.dark *));

   @theme inline {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
     --color-primary: var(--primary);
     --color-primary-foreground: var(--primary-foreground);
     /* …card, popover, secondary, muted, accent, destructive, border, input, ring, radii… */
   }

   :root {
     --radius: var(--radius-radius8);
     --background: var(--background-background-body);
     --foreground: var(--text-text-default);
     --primary: var(--button-button-background-primary-default);
     --primary-foreground: var(--text-text-oncolor-primary);
     /* …full system-token mapping… */
   }

   @layer base {
     * { @apply border-border outline-ring/50; }
     body { @apply bg-background text-foreground; }
   }
   ```
   Copy the **complete** bridge (`@theme inline` + `:root` mappings) from [`references/theme-customization.md`](references/theme-customization.md). Do **not** use the legacy v3 `@tailwind base; @tailwind components; @tailwind utilities;` directives or a `tailwind.config.ts` theme block — they are not used under Tailwind v4.

5. **Apply Identity:**
   - Load **IBM Plex Sans Arabic** and set it as `--font-sans` in a `@theme` block.
   - Set `<html lang="ar" dir="rtl">` in `app/layout.tsx`.

6. **Icons:**
   Registry components that need icons (e.g. `spinner`, `sonner`, `sidebar`) bundle **`@hugeicons/react`** internally — installed automatically as a dependency. For your **app-level** Saudi iconography (custom marks, brand glyphs), use the official custom icon package:
   ```bash
   npm install @aboalrejal/nds-icons
   ```
   ```tsx
   import { ArrowUp01Stroke, QuotesSolid } from '@aboalrejal/nds-icons';
   ```

---

## 🔄 MODE B: Safe Migration (Existing Compatible Project)

Use this mode if the Gatekeeper score is 8/10 or higher and the user wants to migrate an old design to the Saudi NDS UI.

1. **Do not blindly overwrite files.**
2. **Ensure Tailwind v4 + tokens are in place** — confirm `globals.css` imports `styles/tokens.css` and bridges tokens via `@theme inline` (see Mode A step 4 / [theme-customization.md](references/theme-customization.md)). If the project is still on Tailwind v3, upgrade first.
3. **Analyze and Replace:** For each visual element on the page (old buttons, old cards), pull the official component:
   ```bash
   npx shadcn@latest add @dga/<component-name>
   # or, without the namespace configured:
   npx shadcn@latest add https://nds.aboalrejal.com/r/<component-name>.json
   ```
4. **Refactor:** Swap the old HTML/React components with the newly imported NDS components. Map old props to the new component props — query the exact API with `node skills/saudi-nds-ui/scripts/lookup.js <component>`.
5. **RTL Sanity Check:** Ensure all spacing utilities use logical properties (`ms-`, `pe-`, `ps-`, `me-`, `start-*`, `end-*`) instead of directional ones (`ml-`, `pr-`, `left-*`, `right-*`).

---

## 🧩 MODE C: Single Component Addition

Use this mode if the user simply asks to "Add a Button" or "Add a Card" to an already compliant project.

1. **Direct Installation:**
   ```bash
   npx shadcn@latest add @dga/<component-name>
   ```
2. **Usage:** Import it and use it in the required file. Look up variants, sizes, and exports first:
   ```bash
   node skills/saudi-nds-ui/scripts/lookup.js <component-name>
   ```

---

## 📦 Available Components

The registry publishes **55 components**. Full, searchable documentation (variants, exports, dependencies, source) lives in [`references/components-guide.md`](references/components-guide.md) — query it with `lookup.js`. Summarized catalog:

- **Inputs & Forms:** `button`, `button-group`, `input`, `input-group`, `input-otp`, `textarea`, `label`, `checkbox`, `radio-group`, `select`, `native-select`, `switch`, `slider`, `toggle`, `toggle-group`, `calendar`, `field`, `form`
- **Feedback & Status:** `alert`, `progress`, `spinner`, `skeleton`, `sonner` (toasts), `empty`
- **Overlays & Dialogs:** `alert-dialog`, `dialog`, `drawer`, `sheet`, `popover`, `hover-card`, `tooltip`, `command`
- **Navigation:** `breadcrumb`, `pagination`, `menubar`, `navigation-menu`, `context-menu`, `dropdown-menu`, `tabs`, `sidebar`
- **Layout & Structure:** `card`, `separator`, `accordion`, `collapsible`, `resizable`, `scroll-area`, `aspect-ratio`, `carousel`
- **Data Display:** `table`, `badge`, `avatar`, `kbd`, `item`, `chart`
- **Utility:** `direction` (RTL/LTR switcher)

---

## 📚 Examples

Reference compositions live in [`examples/`](examples/):

- [`login-form-example.tsx`](examples/login-form-example.tsx) — combines NDS `Button`, `Input`, `Label`, and `Card` into a complete Arabic RTL login form.

---

## 🎨 Design System Cheat Sheet

Ensure all customized UI elements match the official Saudi NDS guidelines:

### Typography
* Always use **IBM Plex Sans Arabic** for Arabic content.

### Color Palette (DGA Standards)
The canonical source is `styles/tokens.css`. Key values:
* **Primary Green (Saudi Identity):** `#1B8354` (`--colors-primary-s-a-flag600-primary`), hover `#166A45`
* **Neutrals:** background `#FCFCFD` / `#F9FAFB`; text `#111927` / `#1F2A37`
* **Semantic:** success `#069454`, error `#D92C20`, warning `#DC6803`, info `#156FEE`

Prefer the bridged Tailwind tokens (`bg-primary`, `text-foreground`, `border-border`, …) over raw hex in code.

### 🌟 Saudi NDS Custom Icons
* **Inside registry components:** `@hugeicons/react` (bundled automatically).
* **Your app's custom Saudi icons:** `@aboalrejal/nds-icons`.

### Helper Scripts
* **Evaluate environment:** `node skills/saudi-nds-ui/scripts/evaluate-project.js`
* **Search component docs:** `node skills/saudi-nds-ui/scripts/lookup.js <component-name>`
* **Audit a file:** `node skills/saudi-nds-ui/scripts/audit-page.js <path-to-file.tsx>`

### Maintenance (registry authors)
* **Regenerate the components guide** after the registry changes: `node skills/saudi-nds-ui/scripts/generate-guide.js`
