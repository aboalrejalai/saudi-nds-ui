---
name: nds-vanilla
description: Unified skill to develop, document, audit, and use the Saudi National Design System (NDS) Vanilla implementation. Directs the agent to components, layout systems, typography, design tokens, templates, scripts, and specialized guides to build NDS-compliant web pages.
---

# National Design System (NDS) Finals

You are utilizing the **NDS Finals** skill. This skill provides the complete, framework-free implementation of the Saudi National Design System (NDS) based on Vanilla HTML, CSS, and JavaScript. It contains ready-to-use assets, comprehensive references, automation scripts, and sub-guides.

## Skill Folder Structure
All files are organized relative to this skill's root directory:
- **`references/`** - Markdown-based guides containing documentation, token specifications, and canonical structures.
  - **Components:** [references/components/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/components/) (75+ interactive HTML components including accordions, buttons, forms, tables, etc.)
  - **UI Shell:** [references/ui-shell/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/ui-shell/) (Headers, footers, stamps, and layout shell chrome)
  - **Layout & Grid:** [references/layout/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/layout/) (Page sections and responsive grid guidelines)
  - **Utilities Guide:** [references/utilities-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/utilities-guide.md) (Consolidated guide for layout, formatting, sharing, copy, and text truncation helpers)
  - **Templates:** [references/templates/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/templates/) (Standardized full-page HTML/Markdown templates)
  - **Examples:** [references/examples/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/examples/) (Real-world layout examples like dashboard, registration, etc.)
  - **Design Tokens:** [references/tokens/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/tokens/) (Primitive, semantic, and component-level design variables)
- **`assets/`** - The compiled library assets ready to be installed or copied to a user's target project.
  - **CSS:** `assets/css/nds-main.min.css`, `assets/css/nds-delegated.min.css` (The style sheets)
  - **JavaScript:** `assets/js/nds-main.min.js`, `assets/js/nds-delegated.min.js`, `assets/js/nds-loader.js` (The dynamic behavioral controllers)
  - **Fonts:** `assets/fonts/` (Contains only the official IBM Plex Sans Arabic fonts and HGI stroke rounded icons woff2 file)
  - **Images & Marks:** `assets/img/` (Official marks like DGA logo, Vision 2030, etc.)
- **`scripts/`** - Utility scripts for automation and compliance.
  - `audit-css.js` - Audits SCSS/CSS files for over-qualified selectors, duplicate properties, logical properties usage, and hardcoded values
  - `lookup.js` - Look up NDS components and documentation
  - `audit-page.js` - Verify a webpage against NDS CSS/JS compliance rules
  - `analyze-migration.js` - Check legacy files and recommend path to migrate to NDS

---

## Merged Reference Guides
The following specialized developer guides are available under `references/`:

1. **`grill-me-checklist`**: [references/grill-me-checklist.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/grill-me-checklist.md)
   - *Purpose:* Alignment checklist and interview workflow to clarify layout design intent before building.
2. **`add-icon-guide`**: [references/add-icon-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/add-icon-guide.md)
   - *Purpose:* Guidelines on how to add/map new icons to the NDS system.
3. **`documentation-guide`**: [references/documentation-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/documentation-guide.md)
   - *Purpose:* Process to document newly built NDS components cleanly.
4. **`font-update-guide`**: [references/font-update-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/font-update-guide.md)
   - *Purpose:* Process for updating HGI font assets and icon maps.
5. **`performance-guide`**: [references/performance-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/performance-guide.md)
   - *Purpose:* Auditing bundle size, FOUC/CLS preventions, and core-bundle optimization.
6. **`js-audit`**: [references/js-audit/instructions.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/js-audit/instructions.md)
   - *Purpose:* JavaScript audit checklist, controller design rules, event listener teardowns, and lifecycle rules. Supporting guidelines are located in [references/js-audit/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/js-audit/).

*When performing tasks related to these domains, read their corresponding guide inside the references folder.*

---

## Core Guidelines for Using NDS

### 1. Retrieve Canonical Markup
**NEVER guess or invent a component's markup.** Before inserting any NDS component, find its reference documentation in [references/components/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/components/) and copy the canonical HTML from the code blocks. Class names, nesting structure, state attributes, and ARIA roles must match the reference documentation exactly.

### 2. Spacing & Typography Rules
- Use logical CSS properties (`margin-inline-start`, `padding-inline`, `inset-inline-start`, etc.) to support both Right-To-Left (RTL) and Left-To-Right (LTR) layouts automatically. RTL is the system default.
- Always use the predefined utility classes from [references/utilities-guide.md](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/utilities-guide.md) for typography, margins, and padding.

### 3. CSS Token Hierarchy
Always adhere to the three-tier token system documented in [references/tokens/](file:///c:/Users/Abo%20Alrejal/Desktop/Beta/skills/nds-finals/references/tokens/):
1. **Component Tokens:** `--{component}-{property}-{variant}-{state}` (e.g. `--button-background-primary-default`).
2. **Semantic Tokens:** `--background-{variant}-{shade}`, `--border-{variant}`, `--text-{variant}`.
3. **Color Tokens:** `--colors-*` (primitives).
*NEVER reference raw color hex values or raw color tokens directly inside custom styles; alias them through semantic or component tokens.*

### 4. Deploying NDS to a Project
To set up NDS in a project:
1. Copy the contents of the `assets/` directory (containing `css/`, `js/`, `fonts/`, and `img/`) into the target project's assets folders.
2. Link the core CSS (`assets/css/nds-main.min.css`) and defer the loading of scripts (`assets/js/nds-loader.js`) in the `<head>` of your HTML document.
3. Apply the class `nds-rtl` (default) or `nds-ltr` to the `<html>` or `<body>` element.
