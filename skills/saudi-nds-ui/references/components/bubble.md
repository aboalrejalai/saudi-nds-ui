## Component: BUBBLE

DGA-approved **Bubble** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/bubble.json
```

**NPM dependencies:** `class-variance-authority`, `radix-ui`

### Variants

- **variant:** `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, `destructive`

### Exports

`Bubble`, `BubbleContent`, `BubbleGroup`, `BubbleReactions`

### Usage

```tsx
import { Bubble } from "@/components/ui/bubble";

<Bubble variant="default">Bubble</Bubble>
```

### Source (`registry/dga/ui/bubble.tsx`)

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2 font-sans", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-[#1B8354] *:data-[slot=bubble-content]:text-white [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#166A45]",
        secondary:
          "*:data-[slot=bubble-content]:bg-[#F3F4F6] *:data-[slot=bubble-content]:text-[#1F2A37] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#E5E7EB] dark:*:data-[slot=bubble-content]:bg-[#374151] dark:*:data-[slot=bubble-content]:text-[#F9FAFB]",
        muted:
          "*:data-[slot=bubble-content]:bg-[#F9FAFB] *:data-[slot=bubble-content]:text-[#4B5563] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#F3F4F6]",
        tinted:
          "*:data-[slot=bubble-content]:bg-[#E8F5E9] *:data-[slot=bubble-content]:text-[#1B8354] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#C8E6C9]",
        outline:
          "*:data-[slot=bubble-content]:border-[#E5E7EB] *:data-[slot=bubble-content]:bg-white *:data-[slot=bubble-content]:text-[#1F2A37] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#F9FAFB] dark:*:data-[slot=bubble-content]:border-[#374151] dark:*:data-[slot=bubble-content]:bg-transparent",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground",
        destructive:
          "*:data-[slot=bubble-content]:bg-[#FEF2F2] *:data-[slot=bubble-content]:text-[#D92C20] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#FEE2E2]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-4 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-[#F3F4F6] px-1.5 py-0.5 text-sm ring-3 ring-white dark:bg-[#374151] dark:ring-[#1F2A37] has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "start-3",
        end: "end-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
```

---
