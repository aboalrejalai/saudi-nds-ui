# DGA & Saudi NDS Theme Customization (Tailwind CSS v4)

This guide describes how to configure **Tailwind CSS v4** and your CSS globals to match the Saudi National Design System (NDS) styling guidelines.

> **Tailwind v4 is CSS-first.** There is no `tailwind.config.ts` / `tailwind.config.js` to extend, and you no longer use the `@tailwind base; @tailwind components; @tailwind utilities;` directives. All theme configuration lives in CSS via `@import "tailwindcss"` and the `@theme` directive. The instructions below match the setup used by the real DGA components in this registry.

---

## 1. Bring in the DGA Design Tokens (`src/styles/tokens.css` / `styles/tokens.css`)

Every DGA component is styled against a single token file — `src/styles/tokens.css` (Vite) or `styles/tokens.css` (Next.js). It defines the full NDS color scale (`--colors-primary-s-a-flag*`, neutrals, reds, yellows, …), component-level tokens (`--button-*`, `--text-*`, `--border-*`, `--background-*`), and radii. Components resolve their styling through these CSS variables, so **the tokens file must be present** or the components will render unstyled.

When you add a DGA component, shadcn drops a copy of `tokens.css` at `src/styles/tokens.css` (or `styles/tokens.css`) in your project.

---

## 2. Wire Up `globals.css` (Tailwind v4 in Vite / Next.js)

In your `src/styles/globals.css` (Vite) or `app/globals.css` (Next.js), import the tokens file **before** Tailwind, then bootstrap v4:

```css
/* 1. DGA design tokens FIRST, then Tailwind v4 */
@import "./tokens.css";
@import "tailwindcss";
@import "tw-animate-css"; /* optional: animations used by sonner / dialog / drawer */

/* 2. Dark mode driven by a `.dark` class on <html> */
@custom-variant dark (&:is(.dark *));

/* 3. SHADCN TOKEN BRIDGE
   Map shadcn semantic names (bg-primary, text-foreground, border-border, …)
   to the DGA token variables consumed by the components. */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

/* 4. SYSTEM TOKENS
   Point the shadcn semantic vars above at the matching DGA component tokens. */
:root {
  --radius: var(--radius-radius8);

  --background: var(--background-background-body);
  --foreground: var(--text-text-default);

  --card: var(--background-background-card);
  --card-foreground: var(--text-text-default);

  --popover: var(--background-background-menu);
  --popover-foreground: var(--text-text-default);

  --primary: var(--button-button-background-primary-default);
  --primary-foreground: var(--text-text-oncolor-primary);

  --secondary: var(--button-button-background-neutral-default);
  --secondary-foreground: var(--text-text-default);

  --muted: var(--background-background-neutral100);
  --muted-foreground: var(--text-text-secondary-paragraph);

  --accent: var(--background-background-primary50);
  --accent-foreground: var(--text-text-primary);

  --destructive: var(--button-button-background-danger-primary-default);

  --border: var(--border-border-neutral-primary);
  --input: var(--border-border-neutral-secondary);
  --ring: var(--border-border-primary);
}

/* 5. BASE LAYER */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

> **Why `@theme inline`?** `inline` tells Tailwind to emit utilities that reference the variable _by name_ (e.g. `bg-primary` → `background-color: var(--primary)`) instead of copying the variable's value at build time. This keeps the DGA tokens (`--button-*`, `--text-*`, …) authoritative and lets dark mode / theming override them at runtime.

---

## 3. Migrating From a v3 / `tailwind.config.ts` Project

If your project currently uses Tailwind v3 with a `tailwind.config.ts`:

1. **Upgrade to Tailwind v4** (`tailwindcss@^4`) and install the Vite/PostCSS plugin for v4, or the `@tailwindcss/postcss` package as appropriate for your framework.
2. **Delete** the `@tailwind base; @tailwind components; @tailwind utilities;` lines from `globals.css` and replace with the `@import "tailwindcss";` block above.
3. **Move any custom theme keys** (colors, fonts, radii) from `tailwind.config.ts` into a `@theme { … }` block in CSS. The DGA tokens already cover colors and radii, so most projects need no additional `@theme` keys beyond the bridge in step 2.
4. You can usually **delete `tailwind.config.ts`** entirely once the CSS config is in place. If you keep it for the `content` paths or plugins, that is still supported in v4, but it is no longer required for theming.

---

## 4. Typography — IBM Plex Sans Arabic

Always use **IBM Plex Sans Arabic** for Arabic content. Load it (Google Fonts is the quickest path) and wire it as the default sans family via a `@theme` block:

```css
@theme {
  --font-sans: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
}
```

```css
/* Google Fonts import — place at the very top of globals.css, above other imports */
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap");
```

For self-hosting, drop the font files in `public/fonts/` and declare `@font-face` rules (the DGA registry self-hosts `IBM Plex Sans Arabic`).

And set the document direction in your root layout:

```tsx
// app/layout.tsx
return (
  <html lang="ar" dir="rtl">
    <body>{children}</body>
  </html>
);
```

---

## 5. DGA Color Palette (Reference)

The canonical source of truth is `styles/tokens.css`. These hex values are provided for manual / design reference only — prefer the CSS variables (`var(--color-primary)`, `bg-primary`, …) in code.

| Token                                  | Hex       | Usage                          |
| -------------------------------------- | --------- | ------------------------------ |
| `--colors-primary-s-a-flag600-primary` | `#1B8354` | Primary green (Saudi identity) |
| `--colors-primary-s-a-flag700`         | `#166A45` | Primary hover / darker         |
| `--colors-primary-s-a-flag500`         | `#25935F` | Primary lighter                |
| `--colors-neutral25`                   | `#FCFCFD` | App background                 |
| `--colors-neutral50`                   | `#F9FAFB` | Subtle background              |
| `--colors-neutral900`                  | `#111927` | Primary text                   |
| `--colors-neutral800`                  | `#1F2A37` | Body text                      |
| `--colors-neutral950`                  | `#0C111B` | Strong text                    |
| `--colors-red600`                      | `#D92C20` | Destructive / error            |
| `--colors-yellow600`                   | `#DC6803` | Warning                        |
| `--colors-green600`                    | `#069454` | Success                        |
| `--colors-blue600`                     | `#156FEE` | Info                           |

Semantic shadcn tokens map onto these (e.g. `--primary` → `--button-button-background-primary-default` → `#1B8354`).

---

## 6. RTL & Logical Properties

NDS components are RTL-first. When composing layouts, always prefer **logical** utilities so the same markup works for both `rtl` and `ltr`:

- **Margin:** `ms-*` (margin-start) / `me-*` (margin-end) instead of `ml-*` / `mr-*`.
- **Padding:** `ps-*` (padding-start) / `pe-*` (padding-end) instead of `pl-*` / `pr-*`.
- **Position:** `start-*` / `end-*` instead of `left-*` / `right-*`.
- **Flip directional icons** with Tailwind's `rtl:` variant:
  ```html
  <span class="inline-block transition-transform duration-200 rtl:rotate-180">→</span>
  ```

Set the document direction with `<html lang="ar" dir="rtl">` (or toggle `dir` dynamically for bilingual apps).
