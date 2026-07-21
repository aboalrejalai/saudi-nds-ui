## Component: DIRECTION

DGA-approved **Direction** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/direction.json
```

**NPM dependencies:** `radix-ui`

### Exports

`DirectionProvider`, `useDirection`

### Usage

```tsx
import { DirectionProvider } from "@/components/ui/direction";

<DirectionProvider>Direction</DirectionProvider>;
```

### Source (`registry/dga/ui/direction.tsx`)

```tsx
"use client";

import * as React from "react";
import { Direction } from "radix-ui";

function DirectionProvider({
  dir,
  direction,
  children,
}: React.ComponentProps<typeof Direction.DirectionProvider> & {
  direction?: React.ComponentProps<typeof Direction.DirectionProvider>["dir"];
}) {
  return (
    <Direction.DirectionProvider dir={direction ?? dir}>{children}</Direction.DirectionProvider>
  );
}

const useDirection = Direction.useDirection;

export { DirectionProvider, useDirection };
```

---
