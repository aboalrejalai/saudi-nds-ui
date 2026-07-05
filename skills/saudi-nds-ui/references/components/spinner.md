## Component: SPINNER

DGA-approved **Spinner** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/spinner.json
```

**NPM dependencies:** `class-variance-authority`, `@hugeicons/react`, `@hugeicons/core-free-icons`

### Exports

`Spinner`

### Usage

```tsx
import { Spinner } from "@/components/ui/spinner";

<Spinner>Spinner</Spinner>
```

### Source (`registry/dga/ui/spinner.tsx`)

```tsx
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

function Spinner({ className }: React.ComponentProps<"svg">) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
    />
  )
}

export { Spinner }
```

---
