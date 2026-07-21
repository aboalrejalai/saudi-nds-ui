## Component: COLLAPSIBLE

DGA-approved **Collapsible** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/collapsible.json
```

**NPM dependencies:** `@radix-ui/react-collapsible`

### Exports

`Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`

### Usage

```tsx
import { Collapsible } from "@/components/ui/collapsible";

<Collapsible>Collapsible</Collapsible>;
```

### Source (`registry/dga/ui/collapsible.tsx`)

```tsx
"use client";

import { Collapsible as CollapsiblePrimitive } from "radix-ui";

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

---
