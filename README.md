# Saudi NDS UI (مكتبة تصميم الهيئة الدائمة)

**Saudi NDS UI** is the definitive, production-ready React component library for the Saudi National Design System (NDS) by the Digital Government Authority (DGA).

Built on top of **Tailwind CSS** and heavily inspired by the architecture of **shadcn/ui**, this library provides 73 fully accessible, highly customizable, and RTL-first components designed exclusively for Saudi government digital products.

> **Status:** 100% Complete (73/73 Baseline & Advanced Components)

---

## 🌟 Features

- **73 Production-Ready Components:** From basic Buttons and Inputs to complex DataTables, TreeViews, and Rich Text Editors.
- **RTL-First by Design:** Perfect Arabic typography (IBM Plex Sans Arabic) and seamless Right-to-Left logic out of the box.
- **Tailwind CSS Native:** No hidden CSS files. Every component is styled purely with utility classes and DGA design tokens.
- **Copy/Paste Architecture:** You own the code. Install components directly into your project via the CLI.
- **Fully Accessible (a11y):** Built on Radix UI primitives ensuring screen reader compatibility and keyboard navigation.

---

## 🚀 How to Use (Installation)

Because this library follows the `shadcn/ui` architecture, you **do not** install it as a heavy, bloated NPM package. 
Instead, you add exactly the components you need directly to your codebase.

### 1. Initialize your project
Run the standard shadcn initialization in your Next.js/React project:
```bash
npx shadcn@latest init
```

### 2. Add Components from Saudi NDS UI
To install a component from our exclusive registry, simply point the CLI to our hosted Vercel URL.
For example, to install the `Button` and `DataTable` components:

```bash
npx shadcn@latest add "https://nds.aboalrejal.com/r/button.json"
npx shadcn@latest add "https://nds.aboalrejal.com/r/data-table.json"
```

The CLI will download the component code (`.tsx`) directly into your `components/ui` folder, where you can customize it freely!

---

## 📦 What's Included?

The registry includes 73 baseline and advanced components:

**Basic UI:**
`Button`, `Card`, `Checkbox`, `Input`, `Select`, `Dialog`, `Popover`, `Tabs`, `Accordion`, `Tooltip`, etc.

**Advanced Composites:**
- 📊 **Advanced Data Table:** Built with `@tanstack/react-table`.
- 🌳 **Tree View:** Recursive file/folder and org-chart rendering.
- 🏷️ **Multi-Select:** Command-based tagging system.
- ☁️ **Advanced Dropzone:** Drag-and-drop file uploads with previews.
- ✍️ **Rich Text Editor:** WYSIWYG editor powered by `@tiptap/react`.

---

## 🛠️ Development (For Maintainers)

If you are a maintainer and want to add or modify components in the registry:

1. Clone this repository (`nds-ui`).
2. Run the development server to view the component showcase:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to see the components in action.
4. Add new components to the `registry/dga/ui` folder.
5. Build the registry JSON files before deployment:
   ```bash
   npm run registry:build
   ```
6. The `public/r` folder will be generated and served publicly.

---

## 📜 License

This project is tailored for the digital products under the Saudi Digital Government Authority (DGA). All design tokens and identity guidelines are intellectual property of DGA.
