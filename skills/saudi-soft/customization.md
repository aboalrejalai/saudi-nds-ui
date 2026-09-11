# Customization & Theming (Saudi Soft)

Components reference semantic CSS variable tokens. Soft supplies those tokens via
[`references/theme-bridge.css`](./references/theme-bridge.css) (Saudi green SA-600
`#1B8354`, 10/12px radius ladder, light + `.dark` rollover, IBM Plex Sans Arabic).

## Contents

- Soft theme is mandatory
- How it works
- Dark mode
- Applying / updating the Soft bridge
- Adding custom colors (status extras)
- Border radius
- Customizing components
- Checking for updates

---

## Soft Theme Is Mandatory

1. After `npx shadcn@latest init`, always inject Soft theme:

   ```bash
   node path/to/saudi-soft/scripts/apply-theme.js
   ```

   Or paste the marked block from [`references/theme-bridge.css`](./references/theme-bridge.css)
   into the project's global CSS (`tailwindCssFile` from `npx shadcn@latest info`).

2. Do **not** replace Soft primary with arbitrary shadcn color presets (`blue`,
   `zinc`, random `--preset` themes) unless the user explicitly asks to leave Soft.
3. Do **not** change `--primary` away from SA green (`#1B8354` / Soft dark lift)
   without an explicit user request.
4. Keep `iconLibrary: lucide` in `components.json`.

Identity tables: [`references/identity.md`](./references/identity.md).

---

## How It Works

1. CSS variables in `:root` (light) and `.dark` (dark mode).
2. Tailwind maps them to utilities: `bg-primary`, `text-muted-foreground`, etc.
3. Components use these utilities — changing a Soft variable changes every component.

Prefer semantic utilities (`bg-primary`, `text-foreground`) — never `bg-green-600`
or raw hex in `className`.

---

## Color Variables

| Variable | Soft meaning |
| --- | --- |
| `--background` / `--foreground` | Canvas `#FCFCFD` / text `#0D121C` |
| `--primary` / `--primary-foreground` | SA-600 `#1B8354` / white |
| `--secondary` | SA-700 `#166A45` |
| `--muted` / `--muted-foreground` | Gray-100 / gray-600 |
| `--destructive` | `#D92D20` |
| `--border` / `--input` / `--ring` | Gray-200 / SA ring |
| `--chart-1` … `--chart-5` | SA-derived chart palette |
| `--sidebar-*` | Soft sidebar tokens |
| `--success` / `--warning` / `--info` | Status extras in the Soft bridge |

---

## Dark Mode

Class-based toggle via `.dark` on the root. Soft bridge includes a full `.dark`
block (SA lift + gray invert). Wire a toggle:

```tsx
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

Vite/SPA apps may toggle `document.documentElement.classList` the same way.
**Do not** invent per-utility `dark:bg-*` brand colors — tokens roll over.

---

## Applying / Updating the Soft Bridge

```bash
# From the consumer project root — pass the path where this skill folder lives:
node path/to/saudi-soft/scripts/apply-theme.js
node path/to/saudi-soft/scripts/apply-theme.js src/styles/globals.css
```

The script replaces the marked block between:

```css
/* # saudi-soft-theme:start */
/* # saudi-soft-theme:end */
```

Also load **IBM Plex Sans Arabic** (400–700) once (Google Fonts or `@fontsource`).

---

## Adding Custom Colors

Add extras only in the global CSS file from `tailwindCssFile` — never a new
orphan CSS file for a single color. Soft already defines `--success`,
`--warning`, `--info`. Example for a one-off:

```css
:root {
  --data-purple: #7c3aed;
}
.dark {
  --data-purple: #a78bfa;
}
@theme inline {
  --color-data-purple: var(--data-purple);
}
```

---

## Border Radius

Soft ladder (see bridge `@theme inline`):

| Token | Size | Use |
| --- | --- | --- |
| `rounded-sm` | 8px | Small chips |
| `rounded-md` | 10px | Buttons, inputs |
| `rounded-lg` / `xl` | 12px | Cards, dialogs |

`--radius` in Soft is **12px (lg)**. Do not flatten Soft to sharp government
chrome unless the user asks.

---

## Customizing Components

See [rules/styling.md](./rules/styling.md). Prefer in order:

1. Built-in variants (`variant="outline"`, `size="sm"`)
2. Layout `className` only (never override component brand colors)
3. New `cva` variant in the component source
4. Wrapper components composing primitives

---

## Checking for Updates

```bash
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx
```

See [Updating Components in SKILL.md](./SKILL.md#updating-components).
