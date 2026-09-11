# Saudi NDS UI

[![skills.sh](https://skills.sh/b/aboalrejal-ai/saudi-nds-ui)](https://skills.sh/aboalrejal-ai/saudi-nds-ui)

مكتبة مكوّنات React لنظام التصميم الوطني السعودي (NDS) — هيئة الحكومة الرقمية (DGA)، على أسلوب **shadcn/ui** + **Tailwind CSS**.

يشمل المشروع أيضاً **مهارتي وكيل (Agent Skills)** قابلتين للتثبيت عبر [skills.sh](https://skills.sh) من مجلد [`skills/`](skills/) على GitHub.

> **Status:** 100% Complete — 81 UI + 70 Chart presets · Skills: `saudi-nds-ui` + `saudi-soft`

---

## Agent Skills — اختر ما تحتاجه

مهارتان منفصلتان. **ثبّت واحدة أو الاثنتين حسب مشروعك** — مو لازم الاثنتين معاً.

| المهارة | متى تستخدمها | ماذا تثبّت |
| --- | --- | --- |
| **`saudi-nds-ui`** | بوابة حكومية / التزام NDS رسمي | مكوّنات `@dga` من الريجستري |
| **`saudi-soft`** | ستوديو، بورتفوليو، SaaS، مواقع مرنة | shadcn upstream + ثيم Soft (أخضر SA، lucide، RTL، دارك) |

> مسار واحد لكل مشروع عادةً. لا تخلط `@dga` مع Soft في نفس التطبيق إلا بقرار صريح.

المصدر بعد الـ push: **[aboalrejal-ai/saudi-nds-ui](https://github.com/aboalrejal-ai/saudi-nds-ui)** · الصفحة: [skills.sh/aboalrejal-ai/saudi-nds-ui](https://skills.sh/aboalrejal-ai/saudi-nds-ui)

### تثبيت مهارة NDS فقط (حكومي)

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-nds-ui -a cursor
```

### تثبيت مهارة Soft فقط (ستوديو)

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-soft -a cursor
```

### اختيار تفاعلي (NDS و/أو Soft)

```bash
npx skills add aboalrejal-ai/saudi-nds-ui -a cursor
```

### الاثنتين معاً (وكيل واحد)

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill '*' -a cursor -y
```

### وكلاء آخرين / تحديث

```bash
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-soft -a claude-code
npx skills add aboalrejal-ai/saudi-nds-ui --skill saudi-nds-ui -a agents

npx skills update
```

> لا تستخدم `--all` في Skills CLI — يثبّت على كل الوكلاء ويفتح مجلدات زائدة. حدّد وكيلاً بـ `-a`.

دليل أوفى: [`INSTALL.md`](INSTALL.md)

---

## Features

- **81 UI components & 70 chart presets** — من Button/Input إلى DataTable و TreeView و Rich Text Editor
- **8,753+ icons** عبر `@aboalrejal/nds-icons` (مسار NDS)
- **RTL-first** — IBM Plex Sans Arabic + خصائص منطقية
- **Tailwind utilities + DGA tokens** — بدون CSS خارجي لكل مكوّن
- **Copy/paste registry** — تملك الكود في مشروعك عبر shadcn CLI
- **a11y** — Radix / Base UI primitives

---

## Component registry (NDS)

لا تثبّت المكتبة كحزمة NPM ثقيلة. أضف المكوّنات التي تحتاجها:

```bash
npx shadcn@latest init
npx shadcn@latest add @dga/button
# أو
npx shadcn@latest add "https://nds.aboalrejal.com/r/button.json"
```

يتطلب تسجيل الـ namespace في `components.json`:

```json
"registries": {
  "@dga": "https://nds.aboalrejal.com/r/{name}.json"
}
```

---

## What's included

**Basic UI:** Button, Card, Checkbox, Input, Select, Dialog, Popover, Tabs, Accordion, Tooltip, …

**Advanced:** Data Table (`@tanstack/react-table`), Tree View, Multi-Select, File Dropzone, Rich Text Editor (`@tiptap/react`), Charts (Recharts).

---

## Development (maintainers)

```bash
npm run dev              # Vite showcase
npm run registry:build   # → public/r/*.json
npm run build
```

مكوّنات الريجستري: `registry/dga/ui/` · مهارات الوكيل: `skills/saudi-nds-ui/` و `skills/saudi-soft/`.

---

## License

مخصّص للمنتجات الرقمية تحت هيئة الحكومة الرقمية (DGA). توكنات الهوية وإرشادات التصميم ملكية فكرية للهيئة.
