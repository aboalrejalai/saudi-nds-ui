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

Use this mode if the directory is empty, or if the project lacks Tailwind/Shadcn setup.

1. **Initialize the App (if empty):**
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   ```
2. **Initialize Saudi NDS UI Registry:**
   Configure `components.json` to use our registry:
   ```json
   {
     "registry": "https://nds.aboalrejal.com/r"
   }
   ```
3. **Run Shadcn Init:**
   ```bash
   npx shadcn@latest init
   ```
4. **Apply Identity:**
   - Modify `globals.css` to use **IBM Plex Sans Arabic**.
   - Add `<html lang="ar" dir="rtl">` to `layout.tsx`.
5. **Install Icon Library:**
   Install the official custom Saudi NDS icons package:
   ```bash
   npm install @aboalrejal/nds-icons
   ```

---

## 🔄 MODE B: Safe Migration (Existing Compatible Project)

Use this mode if the Gatekeeper score is 8/10 or higher and the user wants to migrate an old design to the Saudi NDS UI.

1. **Do not blindly overwrite files.**
2. **Analyze and Replace:** For each visual element on the page (e.g., old buttons, old cards), use the `add` command to pull the official component:
   ```bash
   npx shadcn@latest add https://nds.aboalrejal.com/r/<component-name>.json
   ```
3. **Refactor:** Swap the old HTML/React components with the newly imported NDS components. Ensure you map the old props to the new component props.
4. **RTL Sanity Check:** Ensure all spacing utilities use logical properties (`ms-`, `pe-`, etc.) instead of directional ones (`ml-`, `pr-`).

---

## 🧩 MODE C: Single Component Addition

Use this mode if the user simply asks to "Add a Button" or "Add a Card" to an already compliant project.

1. **Direct Installation:**
   ```bash
   npx shadcn@latest add https://nds.aboalrejal.com/r/<component-name>.json
   ```
2. **Usage:** Import it and use it in the required file.

---

## 🎨 Design System Cheat Sheet

Ensure all customized UI elements match the official Saudi NDS guidelines:

### Typography
* Always use **IBM Plex Sans Arabic** for Arabic content.

### Color Palette (DGA Standards)
* **Primary Green (Saudi Identity):**
  * Main Primary (SA 600): `#1B8354`
  * Hover/Darker (SA 700): `#166A45`
* **Neutral Shades:**
  * Backgrounds: `#FCFCFD`, `#F9FAFB`
  * Text: `#0D121C`, `#1F2A37`

### 🌟 Saudi NDS Custom Icons
All components requiring icons must use the official custom Saudi NDS icons package `@aboalrejal/nds-icons`. 

* **Installation:**
  ```bash
  npm install @aboalrejal/nds-icons
  ```
* **Usage:** Import solid or stroke icons as needed:
  ```tsx
  import { ArrowUp01Stroke, QuotesSolid } from '@aboalrejal/nds-icons';
  ```

### Helper Scripts
* **Search Specs:** `node skills/saudi-nds-ui/scripts/lookup.js <component-name>`
* **Audit Codebase:** `node skills/saudi-nds-ui/scripts/audit-page.js <path-to-file.tsx>`
