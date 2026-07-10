## Component: MARKER

System dividers and border status marks used to group logs, message timelines, or national system notifications.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/marker.json
```

### Variants

- **variant:** `default`, `separator`, `border`
- **side:** `start`, `center`, `end`

### Exports

`Marker`, `MarkerIcon`, `MarkerContent`, `markerVariants`

### Usage

```tsx
import { Marker, MarkerIcon, MarkerContent } from "@/components/ui/marker";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

<Marker variant="separator">
  <MarkerIcon>
    <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
  </MarkerIcon>
  <MarkerContent>اليوم، 10 يوليو 2026</MarkerContent>
</Marker>
```

### Source (`registry/dga/ui/marker.tsx`)

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-xs font-sans text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5 [a]:underline [a]:underline-offset-3 [a]:hover:text-[#1B8354] transition-colors",
  {
    variants: {
      side: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
      variant: {
        default: "",
        separator:
          "before:me-2 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ms-2 after:h-px after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b border-border pb-2",
      },
    },
    defaultVariants: {
      side: "center",
      variant: "separator",
    },
  }
)

function Marker({
  className,
  variant = "separator",
  side = "center",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof markerVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="marker"
      data-variant={variant}
      data-side={side}
      className={cn(markerVariants({ variant, side, className }))}
      {...props}
    />
  )
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 flex items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word font-medium text-xs text-[#4B5563] dark:text-[#9CA3AF] group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-[#1B8354]",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
```
