## Component: CHECKBOX

DGA-approved **Checkbox** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/checkbox.json
```

**NPM dependencies:** `@radix-ui/react-checkbox`, `@hugeicons/react`, `@hugeicons/core-free-icons`

### Exports

`Checkbox`

### Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox>Checkbox</Checkbox>;
```

### Source (`registry/dga/ui/checkbox.tsx`)

```tsx
"use client";

import * as React from "react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-xs,2px)] border border-[var(--Controls-control-border,#6C737F)] shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <HugeiconsIcon icon={Tick02Icon} className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
```

---
