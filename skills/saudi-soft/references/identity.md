# Soft identity (from mu-ai)

Source: mu-ai `docs/DESIGN.md` + `docs/design-package/tokens.css` + `src/index.css` dark block.

## Colors

| Role | Light | Notes |
|:---|:---|:---|
| Primary | `#1B8354` | SA-600 |
| Primary hover | `#166A45` | SA-700 |
| Primary active | `#14573A` | SA-800 |
| Primary subtle | `#F3FCF6` | SA-50 — nav active fill |
| Canvas / background | `#FCFCFD` | |
| Surface / card | `#FFFFFF` | |
| Border | `#E5E7EB` | Dividers often at 30% opacity |
| Text | `#0D121C` | |
| Muted text | `#4D5761` | |
| Destructive | `#D92D20` | |
| Success | `#079455` | |
| Warning | `#DC6803` | |
| Info | `#1570EF` | |
| Charts 1–5 | `#1B8354` `#54C08A` `#14573A` `#88D8AD` `#25935F` | All SA-derived |

Prefer bridged utilities: `bg-primary`, `text-foreground`, `border-border`, `bg-success/10`. Never `bg-green-600` or raw hex in className.

Dark mode: apply class `.dark` on the root. Soft bridge lifts SA greens and inverts gray ladder (see [`theme-bridge.css`](theme-bridge.css)).

## Radius

| Token | Size | Use |
|:---|:---|:---|
| sm | 8px | Small chips |
| md | 10px | Buttons, inputs, selects |
| lg / xl | 12px | Cards, dialogs, nav items |
| full | 9999px | Pills, badges |

shadcn `--radius` in the bridge is **12px (lg)**; `@theme` maps `rounded-md` → 10px and `rounded-sm` → 8px.

## Typography

- **Sans (required):** IBM Plex Sans Arabic 400 / 500 / 600 / 700
- Optional: Work Sans (Latin fallback), Inconsolata (mono), Cairo (seasonal `.font-saudi` only)

Load fonts once (Google Fonts or `@fontsource`), set `--font-sans-soft` / body `font-sans`.

## Icons

- Library: **`lucide-react`** only under Soft
- `components.json` → `"iconLibrary": "lucide"`
- Import icons as components; follow [`../rules/icons.md`](../rules/icons.md) (`data-icon`, no sizing classes inside Button/etc.)

## RTL

- Arabic: `lang="ar"` `dir="rtl"`
- Spacing: `ms`/`me`/`ps`/`pe`/`start`/`end` — never physical `ml`/`mr`/`left`/`right`
- Directional chevrons/arrows: `rtl:rotate-180` when they encode direction

## Dark mode wiring

```tsx
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

Vite/SPA apps may use the same class toggle without Next. Soft does not use per-utility `dark:bg-*` for brand colors — tokens roll over.
