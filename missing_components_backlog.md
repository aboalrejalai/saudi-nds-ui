# Missing Components Backlog

This document serves as the master checklist and contextual memory for all UI components required by the Saudi National Design System (NDS) that are currently **missing** from our `nds-ui` registry.

**Total Missing Components to Implement:** 0 (All Completed! 🎉)

## Workflow & Instructions
1. Pick a component from this list.
2. Follow the specified `Source Reference` to find the original implementation.
3. If the source is `dev-dga-main`, copy the React logic/state management but **discard their CSS**.
4. If the source is `NDS-vanilla-main`, reverse engineer the HTML structure.
5. Translate all styling to pure **Tailwind CSS** utility classes inside the `Destination` file.
6. Test locally using a dedicated Next.js route (e.g., `app/test-<component>/page.tsx`).
7. Once fully tested, approved, and verified, **delete** its entry from this document.

---

> **Status:** All baseline components from the original NDS library have been successfully ported to our `nds-ui` registry.

---

## Phase 2: Advanced Composite Components (The Finale 🏆)

These 5 components are powerful composites designed to make the library 100% complete for enterprise dashboards.

### 1. Advanced Data Table (`data-table.tsx`)
- **Dependencies:** `@tanstack/react-table`
- **Instructions:** Build a generic DataGrid wrapper that handles pagination, sorting, and row selection using the existing Table component.

### 2. Tree View (`tree-view.tsx`)
- **Dependencies:** None
- **Instructions:** Build a hierarchical list for folders or org charts using recursive rendering.

### 3. Multi-Select (`multi-select.tsx`)
- **Dependencies:** `cmdk`
- **Instructions:** Combine `Command` and `Badge` to allow multiple tag selections in a combobox.

### 4. Advanced Dropzone (`file-dropzone.tsx`)
- **Dependencies:** `react-dropzone`
- **Instructions:** Build a drag-and-drop file upload area with preview states.

### 5. Rich Text Editor (`rich-text-editor.tsx`)
- **Dependencies:** `@tiptap/react`, `@tiptap/starter-kit`
- **Instructions:** Build a WYSIWYG editor with a custom NDS-styled toolbar.
