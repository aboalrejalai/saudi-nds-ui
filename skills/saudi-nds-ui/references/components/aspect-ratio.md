## Component: ASPECT-RATIO

DGA-approved **Aspect Ratio** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/aspect-ratio.json
```

**NPM dependencies:** `@radix-ui/react-aspect-ratio`

### Exports

`AspectRatio`

### Usage

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio>Aspect Ratio</AspectRatio>
```

### Source (`registry/dga/ui/aspect-ratio.tsx`)

```tsx
"use client"

import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
```

---
