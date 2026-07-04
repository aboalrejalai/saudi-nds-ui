---
name: saudi-nds-ui
description: >
  Use this skill to build, design, modify, and audit React & Next.js websites
  based on the Saudi National Design System (NDS) by the Digital Government Authority (DGA)
  using the Saudi NDS UI Component Registry. Make sure to use this skill WHENEVER the user
  mentions building a Saudi government UI, "DGA", "NDS UI", "Saudi Design System", "RTL components",
  "DGA styling", or wants to install components like DGA Badge, Button, Data Table, etc. Even if they
  don't explicitly ask for the 'registry', trigger this skill to ensure all UI matches Saudi standards.
---

# Saudi NDS UI & DGA Components Skill

This skill guides AI agents in installing, styling, adapting for RTL, and verifying accessibility of 73 production-ready components from the Saudi NDS UI Registry (`https://nds.aboalrejal.com/`).

---

## 1. Installation & Registry Management

### Add the Saudi NDS UI Registry
Before installing any component, configure the project's `components.json` to allow resolving registry references:

```json
{
  "registry": "https://nds.aboalrejal.com/r"
}
```

### Install a Component
Always use `npx` to install components from the Registry. Never use `pnpm`, `yarn`, or `bun` commands. The standard command template is:

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/<component-name>.json
```

*Example for Button and DataTable:*
```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/button.json
npx shadcn@latest add https://nds.aboalrejal.com/r/data-table.json
```

---

## 2. Saudi NDS Visual Design & Styling

Ensure all customized UI elements match the official Saudi National Design System (NDS) guidelines:

### Typography
* Always use **IBM Plex Sans Arabic** for Arabic content:
  ```css
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  ```

### Color Palette (DGA Standards)
* **Primary Green (Saudi Identity):**
  * Main Primary (SA 600): `#1B8354` / `HSL(152, 66%, 31%)`
  * Lighter Primary (SA 500): `#25935F` / `HSL(152, 60%, 36%)`
  * Darker Primary (SA 700): `#166A45` / `HSL(153, 65%, 25%)`
* **Neutral Shades:**
  * Light Backgrounds: Gray 25 (`#FCFCFD`), Gray 50 (`#F9FAFB`), Gray 100 (`#F3F4F6`)
  * Dark Text / Dark Mode Elements: Gray 950 (`#0D121C`), Gray 900 (`#111927`), Gray 800 (`#1F2A37`)
* **Semantic Signals:**
  * Success: `#079455` (Green)
  * Error: `#D92D20` (Red)
  * Warning: `#DC6803` (Orange)
  * Info: `#1570EF` (Blue)

---

## 3. RTL Layout & Arabic Language Flow

Saudi NDS UI components are designed RTL-first for Arabic localizations. Follow these layout instructions:

* **Document Direction:** Set the container or document direction explicitly: `<html lang="ar" dir="rtl">` or `<div dir="rtl">`.
* **Logical Properties:** Use Tailwind's logical properties to respect direction (e.g., use `ms-*` instead of `ml-*`, `pe-*` instead of `pr-*`).
* **Icon Flipping:** Automatically mirror directional icons (like arrows, chevrons, and pagination buttons) when switching from LTR to RTL:
  * In CSS: `transform: scaleX(-1);` or Tailwind `rtl:rotate-180`.

---

## 4. Web Accessibility (WCAG 2.1 AA & DGA Access Standards)

Ensure all generated interfaces conform to DGA accessibility standards:

* **Keyboard Navigation:** Components must be fully functional using only the keyboard:
  * `Tab` and `Shift+Tab` to focus interactive items in logical DOM order.
  * `Enter` or `Space` to activate buttons/inputs.
  * Arrow keys to navigate options (such as tabs, radio groups, and menu items).
* **ARIA Roles & Attributes:** Ensure correct attributes are injected:
  * Interactive elements must have proper labels (`aria-label` or `aria-labelledby`).
  * Expanded/collapsed states must use `aria-expanded="true/false"`.
  * Selected states must use `aria-selected="true/false"`.
* **Contrast and Sizing:** Touch targets must be at least `44x44px` or equivalent spacing. Contrast ratios must meet WCAG AA requirements (4.5:1 for regular text, 3:1 for large text).

---

## 5. Scripts and References Map

This skill contains local helper scripts and documents to speed up development tasks:

### Helper Scripts
* **Search Component Specs:** Run `node skills/saudi-nds-ui/scripts/lookup.js <component-name>` to get installation, variants, props, and code examples.
* **Audit Codebase Page:** Run `node skills/saudi-nds-ui/scripts/audit-page.js <path-to-file.tsx>` to inspect and fix styling, fonts, RTL directions, and accessibility issues.

### Reference Files
* Detailed component properties and codes: [`references/components-guide.md`](references/components-guide.md)
* Theme and Tailwind custom configuration: [`references/theme-customization.md`](references/theme-customization.md)
