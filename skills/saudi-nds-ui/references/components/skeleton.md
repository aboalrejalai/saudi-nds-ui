## Component: SKELETON

DGA-approved **Skeleton** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/skeleton.json
```

### Exports

`Skeleton`

### Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton>Skeleton</Skeleton>
```

### Source (`registry/dga/ui/skeleton.tsx`)

```tsx
import { cn } from "@/lib/utils"

import "./skeleton.css"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-(--radius-radius8)",
        "bg-linear-to-r from-(--background-background-neutral200) via-(--background-background-neutral300) to-(--background-background-neutral200)",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite]",
        "before:bg-linear-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
```

---
