# DGA & Saudi NDS UI — Components Guide

Auto-generated reference of every component published by the Saudi NDS UI registry
(`https://nds.aboalrejal.com/r`). Generated from `registry.json` — do not edit by hand.

> To regenerate: `node skills/saudi-nds-ui/scripts/generate-guide.js`

Each component has its own file in `references/components/<name>.md`. `lookup.js`
extracts the specific file on demand. Query a component with:

```bash
node skills/saudi-nds-ui/scripts/lookup.js <component-name>
```

## Installation

Add any component individually:

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/<component-name>.json
```

Or register the namespace once in `components.json` and add by name:

```bash
npx shadcn@latest add @dga/<component-name>
```

## Component Catalog

Total: **82** components.

- [Accordion](#accordion) — `https://nds.aboalrejal.com/r/accordion.json`
- [Alert](#alert) — `https://nds.aboalrejal.com/r/alert.json`
- [Alert Dialog](#alert-dialog) — `https://nds.aboalrejal.com/r/alert-dialog.json`
- [Aspect Ratio](#aspect-ratio) — `https://nds.aboalrejal.com/r/aspect-ratio.json`
- [Avatar](#avatar) — `https://nds.aboalrejal.com/r/avatar.json`
- [Badge](#badge) — `https://nds.aboalrejal.com/r/badge.json`
- [Breadcrumb](#breadcrumb) — `https://nds.aboalrejal.com/r/breadcrumb.json`
- [Button](#button) — `https://nds.aboalrejal.com/r/button.json`
- [Button Group](#button-group) — `https://nds.aboalrejal.com/r/button-group.json`
- [Calendar](#calendar) — `https://nds.aboalrejal.com/r/calendar.json`
- [Card](#card) — `https://nds.aboalrejal.com/r/card.json`
- [Carousel](#carousel) — `https://nds.aboalrejal.com/r/carousel.json`
- [Chart](#chart) — `https://nds.aboalrejal.com/r/chart.json`
- [Checkbox](#checkbox) — `https://nds.aboalrejal.com/r/checkbox.json`
- [Collapsible](#collapsible) — `https://nds.aboalrejal.com/r/collapsible.json`
- [Command](#command) — `https://nds.aboalrejal.com/r/command.json`
- [Context Menu](#context-menu) — `https://nds.aboalrejal.com/r/context-menu.json`
- [Dialog](#dialog) — `https://nds.aboalrejal.com/r/dialog.json`
- [Drawer](#drawer) — `https://nds.aboalrejal.com/r/drawer.json`
- [Dropdown Menu](#dropdown-menu) — `https://nds.aboalrejal.com/r/dropdown-menu.json`
- [Empty](#empty) — `https://nds.aboalrejal.com/r/empty.json`
- [Field](#field) — `https://nds.aboalrejal.com/r/field.json`
- [Form](#form) — `https://nds.aboalrejal.com/r/form.json`
- [Hover Card](#hover-card) — `https://nds.aboalrejal.com/r/hover-card.json`
- [Input](#input) — `https://nds.aboalrejal.com/r/input.json`
- [Input Group](#input-group) — `https://nds.aboalrejal.com/r/input-group.json`
- [Input Otp](#input-otp) — `https://nds.aboalrejal.com/r/input-otp.json`
- [Item](#item) — `https://nds.aboalrejal.com/r/item.json`
- [Label](#label) — `https://nds.aboalrejal.com/r/label.json`
- [Menubar](#menubar) — `https://nds.aboalrejal.com/r/menubar.json`
- [Navigation Menu](#navigation-menu) — `https://nds.aboalrejal.com/r/navigation-menu.json`
- [Pagination](#pagination) — `https://nds.aboalrejal.com/r/pagination.json`
- [Popover](#popover) — `https://nds.aboalrejal.com/r/popover.json`
- [Progress](#progress) — `https://nds.aboalrejal.com/r/progress.json`
- [Radio Group](#radio-group) — `https://nds.aboalrejal.com/r/radio-group.json`
- [Resizable](#resizable) — `https://nds.aboalrejal.com/r/resizable.json`
- [Scroll Area](#scroll-area) — `https://nds.aboalrejal.com/r/scroll-area.json`
- [Select](#select) — `https://nds.aboalrejal.com/r/select.json`
- [Separator](#separator) — `https://nds.aboalrejal.com/r/separator.json`
- [Sheet](#sheet) — `https://nds.aboalrejal.com/r/sheet.json`
- [Sidebar](#sidebar) — `https://nds.aboalrejal.com/r/sidebar.json`
- [Skeleton](#skeleton) — `https://nds.aboalrejal.com/r/skeleton.json`
- [Slider](#slider) — `https://nds.aboalrejal.com/r/slider.json`
- [Sonner](#sonner) — `https://nds.aboalrejal.com/r/sonner.json`
- [Spinner](#spinner) — `https://nds.aboalrejal.com/r/spinner.json`
- [Switch](#switch) — `https://nds.aboalrejal.com/r/switch.json`
- [Table](#table) — `https://nds.aboalrejal.com/r/table.json`
- [Tabs](#tabs) — `https://nds.aboalrejal.com/r/tabs.json`
- [Textarea](#textarea) — `https://nds.aboalrejal.com/r/textarea.json`
- [Toggle](#toggle) — `https://nds.aboalrejal.com/r/toggle.json`
- [Toggle Group](#toggle-group) — `https://nds.aboalrejal.com/r/toggle-group.json`
- [Tooltip](#tooltip) — `https://nds.aboalrejal.com/r/tooltip.json`
- [Kbd](#kbd) — `https://nds.aboalrejal.com/r/kbd.json`
- [Native Select](#native-select) — `https://nds.aboalrejal.com/r/native-select.json`
- [Direction](#direction) — `https://nds.aboalrejal.com/r/direction.json`
- [Code](#code) — `https://nds.aboalrejal.com/r/code.json`
- [Combobox](#combobox) — `https://nds.aboalrejal.com/r/combobox.json`
- [Cookies](#cookies) — `https://nds.aboalrejal.com/r/cookies.json`
- [Data Table](#data-table) — `https://nds.aboalrejal.com/r/data-table.json`
- [Date Picker](#date-picker) — `https://nds.aboalrejal.com/r/date-picker.json`
- [Description List](#description-list) — `https://nds.aboalrejal.com/r/description-list.json`
- [File Dropzone](#file-dropzone) — `https://nds.aboalrejal.com/r/file-dropzone.json`
- [File Upload](#file-upload) — `https://nds.aboalrejal.com/r/file-upload.json`
- [Filter](#filter) — `https://nds.aboalrejal.com/r/filter.json`
- [Multi Select](#multi-select) — `https://nds.aboalrejal.com/r/multi-select.json`
- [Quote](#quote) — `https://nds.aboalrejal.com/r/quote.json`
- [Rating](#rating) — `https://nds.aboalrejal.com/r/rating.json`
- [Rich Text Editor](#rich-text-editor) — `https://nds.aboalrejal.com/r/rich-text-editor.json`
- [Stat](#stat) — `https://nds.aboalrejal.com/r/stat.json`
- [Steps](#steps) — `https://nds.aboalrejal.com/r/steps.json`
- [Tag Input](#tag-input) — `https://nds.aboalrejal.com/r/tag-input.json`
- [Timeline](#timeline) — `https://nds.aboalrejal.com/r/timeline.json`
- [Tree View](#tree-view) — `https://nds.aboalrejal.com/r/tree-view.json`
- [Attachment](#attachment) — `https://nds.aboalrejal.com/r/attachment.json`
- [Bubble](#bubble) — `https://nds.aboalrejal.com/r/bubble.json`
- [Marker](#marker) — `https://nds.aboalrejal.com/r/marker.json`
- [Message Scroller](#message-scroller) — `https://nds.aboalrejal.com/r/message-scroller.json`
- [Message](#message) — `https://nds.aboalrejal.com/r/message.json`
- [Toast](#toast) — `https://nds.aboalrejal.com/r/toast.json`
- [Use Toast](#use-toast) — `https://nds.aboalrejal.com/r/use-toast.json`
- [Toaster](#toaster) — `https://nds.aboalrejal.com/r/toaster.json`
- [Typography](#typography) — `https://nds.aboalrejal.com/r/typography.json`

## Registry Utilities (non-component)

These are installable registry items pulled in automatically as dependencies where needed:

- **use-mobile** (hook) — `https://nds.aboalrejal.com/r/use-mobile.json`
- **utils** (lib) — `https://nds.aboalrejal.com/r/utils.json`
- **theme-stone** (theme) — `https://nds.aboalrejal.com/r/theme-stone.json`
- **theme-zinc** (theme) — `https://nds.aboalrejal.com/r/theme-zinc.json`
- **theme-neutral** (theme) — `https://nds.aboalrejal.com/r/theme-neutral.json`
- **theme-gray** (theme) — `https://nds.aboalrejal.com/r/theme-gray.json`
- **theme-slate** (theme) — `https://nds.aboalrejal.com/r/theme-slate.json`

---
