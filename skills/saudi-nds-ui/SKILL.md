---
name: saudi-nds-ui
description: >
  Build websites and web applications following the Saudi National Design System (NDS) by the Digital Government Authority (DGA). Use this skill whenever building or designing a Saudi government website, implementing NDS components (buttons, forms, navigation, cards, etc.), applying the NDS color system or typography, using the platforms code library, or when the user mentions "NDS", "national design system", "DGA design", "Saudi design system", or "Digital Government Authority".
---

# Saudi NDS UI & DGA Components Skill

This skill guides AI agents in establishing, migrating, and installing UI components from the Saudi NDS UI Registry (`https://nds.aboalrejal.com/`).

> **Stack:** React + Next.js (App Router) + **Tailwind CSS v4** + shadcn. Components are RTL-first and styled with DGA design tokens. See [`references/theme-customization.md`](references/theme-customization.md) for the full theming setup.

---

## 🚨 Evaluate the Environment First

Before modifying any existing project files, rewriting HTML, or installing components, it's highly recommended to understand the project's current state so we don't break anything.

**If you are working in an existing codebase, please run this command first:**
```bash
node skills/saudi-nds-ui/scripts/evaluate-project.js
```
Read the output score and recommendation. Based on the output, select one of the following Modes (A, B, or C). If the script returns "ABORT", inform the user that the environment is incompatible.

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

## 📦 Available Components

The registry publishes **73 main components** and over **345 ready-to-use sub-components**. 
To get the actual API, variants, dependencies, and source code of a specific component, **simply read its markdown file** by following the links below. Do not guess the API; always refer to the specific component file.

Summarized catalog:

- **Inputs & Forms:** [`button`](references/components/button.md), [`button-group`](references/components/button-group.md), [`input`](references/components/input.md), [`input-group`](references/components/input-group.md), [`input-otp`](references/components/input-otp.md), [`textarea`](references/components/textarea.md), [`label`](references/components/label.md), [`checkbox`](references/components/checkbox.md), [`radio-group`](references/components/radio-group.md), [`select`](references/components/select.md), [`native-select`](references/components/native-select.md), [`switch`](references/components/switch.md), [`slider`](references/components/slider.md), [`toggle`](references/components/toggle.md), [`toggle-group`](references/components/toggle-group.md), [`calendar`](references/components/calendar.md), [`field`](references/components/field.md), [`form`](references/components/form.md), [`combobox`](references/components/combobox.md), [`date-picker`](references/components/date-picker.md), [`file-dropzone`](references/components/file-dropzone.md), [`file-upload`](references/components/file-upload.md), [`multi-select`](references/components/multi-select.md), [`rating`](references/components/rating.md), [`rich-text-editor`](references/components/rich-text-editor.md), [`tag-input`](references/components/tag-input.md)
- **Feedback & Status:** [`alert`](references/components/alert.md), [`progress`](references/components/progress.md), [`spinner`](references/components/spinner.md), [`skeleton`](references/components/skeleton.md), [`sonner`](references/components/sonner.md) (toasts), [`empty`](references/components/empty.md)
- **Overlays & Dialogs:** [`alert-dialog`](references/components/alert-dialog.md), [`dialog`](references/components/dialog.md), [`drawer`](references/components/drawer.md), [`sheet`](references/components/sheet.md), [`popover`](references/components/popover.md), [`hover-card`](references/components/hover-card.md), [`tooltip`](references/components/tooltip.md), [`command`](references/components/command.md)
- **Navigation:** [`breadcrumb`](references/components/breadcrumb.md), [`pagination`](references/components/pagination.md), [`menubar`](references/components/menubar.md), [`navigation-menu`](references/components/navigation-menu.md), [`context-menu`](references/components/context-menu.md), [`dropdown-menu`](references/components/dropdown-menu.md), [`tabs`](references/components/tabs.md), [`sidebar`](references/components/sidebar.md), [`steps`](references/components/steps.md), [`tree-view`](references/components/tree-view.md)
- **Layout & Structure:** [`card`](references/components/card.md), [`separator`](references/components/separator.md), [`accordion`](references/components/accordion.md), [`collapsible`](references/components/collapsible.md), [`resizable`](references/components/resizable.md), [`scroll-area`](references/components/scroll-area.md), [`aspect-ratio`](references/components/aspect-ratio.md), [`carousel`](references/components/carousel.md), [`timeline`](references/components/timeline.md)
- **Data Display:** [`table`](references/components/table.md), [`badge`](references/components/badge.md), [`avatar`](references/components/avatar.md), [`kbd`](references/components/kbd.md), [`item`](references/components/item.md), [`chart`](references/components/chart.md), [`code`](references/components/code.md), [`data-table`](references/components/data-table.md), [`description-list`](references/components/description-list.md), [`filter`](references/components/filter.md), [`quote`](references/components/quote.md), [`stat`](references/components/stat.md)
- **Utility:** [`direction`](references/components/direction.md) (RTL/LTR switcher), [`cookies`](references/components/cookies.md)

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

### 🚨 Navigation Menu
* **Top-Level Header Links:** When building a `Header` or `Navbar`, wrap top-level items in `<NavigationMenuTrigger>` instead of `<NavigationMenuLink>`. This ensures we preserve the official NDS green hover and bottom-border effect which is central to the design system's identity.

### Helper Scripts
* **Evaluate environment:** `node skills/saudi-nds-ui/scripts/evaluate-project.js`
* **Search component docs:** `node skills/saudi-nds-ui/scripts/lookup.js <component-name>`
* **Audit a file:** `node skills/saudi-nds-ui/scripts/audit-page.js <path-to-file.tsx>`

### Maintenance (registry authors)
* **Regenerate the components guide** after the registry changes: `node skills/saudi-nds-ui/scripts/generate-guide.js`
