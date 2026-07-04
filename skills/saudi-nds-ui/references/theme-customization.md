# DGA & Saudi NDS Theme Customization

This guide describes how to configure your local Tailwind CSS and CSS globals to match the Saudi National Design System (NDS) styling guidelines.

---

## 1. Tailwind Configuration (`tailwind.config.ts` or `tailwind.config.js`)

Extend your theme's colors and fonts in your Tailwind configuration:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // DGA Standard Color Palette
        dga: {
          green: {
            50: "#EAF6EF",
            100: "#D1ECDC",
            200: "#A5DAB9",
            300: "#70C290",
            400: "#44A86C",
            500: "#25935F", // Lighter Green
            600: "#1B8354", // Primary Green (Saudi Identity)
            700: "#166A45", // Darker Green
            800: "#105234",
            900: "#0A3B24",
          },
          neutral: {
            25: "#FCFCFD",
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2A37",
            900: "#111927",
            950: "#0D121C",
          },
          semantic: {
            success: "#079455",
            error: "#D92D20",
            warning: "#DC6803",
            info: "#1570EF",
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans-arabic)", "IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
};

export default config;
```

---

## 2. CSS Configuration (`app/globals.css` or `styles/globals.css`)

Ensure you load the **IBM Plex Sans Arabic** Google Font and apply standard variables and direction styles:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif;
    background-color: #FCFCFD; /* dga-neutral-25 */
    color: #111927; /* dga-neutral-900 */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* RTL Helper Utilities */
[dir="rtl"] .rtl-flip {
  transform: scaleX(-1);
}
```

---

## 3. Direction Utilities

When building RTL/LTR switchable layouts, use the following patterns:
* Use logical margin: `me-*` (margin-end) instead of `mr-*` (margin-right), and `ms-*` (margin-start) instead of `ml-*` (margin-left).
* Use logical padding: `pe-*` (padding-end) instead of `pr-*` (padding-right), and `ps-*` (padding-start) instead of `pl-*` (padding-left).
* To dynamically flip directional elements in RTL, use Tailwind's `rtl:` modifier:
  ```html
  <span class="inline-block transition-transform duration-200 rtl:rotate-180">→</span>
  ```
