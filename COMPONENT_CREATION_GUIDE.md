# AI Component Creation Guide

This document is the **core specification and primary reference** for any AI agent tasked with adding a new component to the `saudi-nds-ui` library.
Adhering strictly to these guidelines ensures that all components conform to the Digital Government Authority (DGA) visual identity and Saudi National Design System (NDS) standards.

---

## 🎯 Goal
Convert any generic UI component (e.g., from Shadcn UI or other libraries) into a component that is 100% compliant with the Saudi National Design System in terms of design, code structure, and RTL (Right-to-Left) Arabic support.

---

## 📋 Mandatory Steps for Adding a Component

When tasked with adding a new component, you must follow this sequence precisely:

### 1. Code Analysis & Cleanup
* Read the component documentation to understand its behaviors, props, and API surface.
* Ensure the component is built using **React** and **Tailwind CSS**.
* Clean the code of any external CSS file imports; rely entirely on Tailwind CSS utility classes.

### 2. Visual Identity (Colors & Typography)
Adjust the colors and fonts to align with the official DGA styling:
* **Typography:** Use the `IBM Plex Sans Arabic` font family for all text elements.
* **Primary Colors (Saudi Identity):**
  * Replace the component's default primary colors (e.g., blue, black, indigo) with the official Saudi Green:
    * Background/text color: `bg-[#1B8354]` or `text-[#1B8354]` (equivalent to SA 600).
    * Hover state: `bg-[#166A45]` (equivalent to SA 700).
* **Neutral Colors:**
  * Light backgrounds: `bg-[#FCFCFD]` or `bg-[#F9FAFB]`.
  * Standard body text: `text-[#1F2A37]`.

### 3. RTL & Direction Support (Right-to-Left First)
Since this library is RTL-first, you must use logical Tailwind utilities instead of directional ones:
* **Spacing & Padding:**
  * Replace `ml-` (margin-left) with `ms-` (margin-start).
  * Replace `mr-` (margin-right) with `me-` (margin-end).
  * Replace `pl-` (padding-left) with `ps-` (padding-start).
  * Replace `pr-` (padding-right) with `pe-` (padding-end).
* **Directional Icons:**
  * Any icon representing direction (e.g., arrows) must be mirrored in RTL mode using the Tailwind utility: `rtl:rotate-180` or `rtl:-scale-x-100`.

### 4. Component Placement
* Once customized, create the component file at the mandatory path:
  `registry/dga/ui/<component-name>.tsx`
* Do **not** place component source files in any external directories. The only destination is `registry/dga/ui/`.

### 5. Registry Registration & Build
To expose the component for external CLI download:
1. Register the component in `registry.json` (or let scripts do it).
2. Export the component for local testing.
3. Build the registry by running:
   ```bash
   npm run registry:build
   ```

### 6. Verification & Staging
* Create a temporary testing page (e.g., `app/components/<component-name>/page.tsx`) to showcase the component and verify layout rendering in both LTR and RTL directions.
* Once verified and approved by the user, the component becomes an official part of `Saudi NDS UI`.

---

> **Note for AI Agents:** Adhere to these instructions strictly. Do not change approved icon libraries or add large NPM packages without explicit permission. Precision in colors, borders, and margins is what makes this library professional.
