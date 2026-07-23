## Component: SAUDI_RIYAL_SYMBOL

Official DGA / NDS **Saudi Riyal Symbol** component (`<SaudiRiyalSymbol />`) — used to render the official Saudi Riyal currency symbol natively in React web applications.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/saudi-riyal-symbol.json
```

### Usage

```tsx
import { SaudiRiyalSymbol } from "@/components/ui/saudi-riyal-symbol"

// Standard Usage with Amount
<div className="flex items-center gap-1.5 text-lg font-semibold">
  <span>150</span>
  <SaudiRiyalSymbol className="size-4 text-primary" />
</div>
```

### Mandate & Usage Rules

- **Strict Requirement:** Do NOT write text representations such as `ر.س` or `SAR` in UI components when displaying amounts or prices in Saudi Riyals.
- **Icon Component:** Always use `<SaudiRiyalSymbol />` next to monetary values.
- **Color Inheritance:** The icon uses `fill: currentColor` by default, so it automatically inherits text colors (`text-primary`, `text-muted-foreground`, etc.).

### Source (`registry/dga/ui/saudi-riyal-symbol.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface SaudiRiyalSymbolProps
  extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

function SaudiRiyalSymbol({
  className,
  size = "1em",
  ...props
}: SaudiRiyalSymbolProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1124.14 1256.39"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      data-slot="saudi-riyal-symbol"
      className={cn("inline-block shrink-0 align-middle", className)}
      {...props}
    >
      <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
      <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4-143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
    </svg>
  )
}

export { SaudiRiyalSymbol }
```
