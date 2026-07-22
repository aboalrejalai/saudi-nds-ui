## Component: TYPOGRAPHY

DGA-approved **Typography** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/typography.json
```

**NPM dependencies:** `class-variance-authority`

### Variants

- **variant:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `blockquote`, `list`, `inlineCode`, `lead`, `large`, `small`, `muted`

### Exports

`Typography`, `typographyVariants`

### Usage

```tsx
import { Typography } from "@/components/ui/typography";

<Typography variant="default">Typography</Typography>
```

### Source (`registry/dga/ui/typography.tsx`)

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva(
  "font-sans leading-relaxed tracking-tight text-[#1F2A37] dark:text-[#FCFCFD] rtl:text-right ltr:text-left",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl text-[#111927] dark:text-[#FCFCFD]",
        h2: "scroll-m-20 border-b border-border pb-2 text-3xl font-bold first:mt-0 text-[#111927] dark:text-[#FCFCFD]",
        h3: "scroll-m-20 text-2xl font-semibold text-[#111927] dark:text-[#FCFCFD]",
        h4: "scroll-m-20 text-xl font-semibold text-[#111927] dark:text-[#FCFCFD]",
        h5: "scroll-m-20 text-lg font-medium text-[#111927] dark:text-[#FCFCFD]",
        h6: "scroll-m-20 text-base font-medium text-[#111927] dark:text-[#FCFCFD]",
        p: "leading-7 [&:not(:first-child)]:mt-4 text-[#374151] dark:text-[#D1D5DB]",
        blockquote: "mt-6 border-s-4 border-[#1B8354] ps-4 italic text-[#4B5563] dark:text-[#9CA3AF] bg-muted/20 py-2 rounded-r-lg",
        list: "my-4 ms-6 list-disc [&>li]:mt-2 text-[#374151] dark:text-[#D1D5DB]",
        inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-[#1B8354] dark:text-[#ECFDF5]",
        lead: "text-lg md:text-xl font-normal text-muted-foreground",
        large: "text-base md:text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-xs md:text-sm text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "p",
    },
  }
)

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const variantElementMap: Record<string, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  list: "ul",
  inlineCode: "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "span",
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    const Component = as || variantElementMap[variant || "p"] || "p"

    return (
      <Component
        ref={ref}
        data-slot="typography"
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }
export type { TypographyProps }
```

---
