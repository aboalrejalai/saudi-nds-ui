## Component: TOASTER

DGA-approved **Toaster** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/toaster.json
```

**Registry dependencies:** `toast` (`https://nds.aboalrejal.com/r/toast.json`), `use-toast` (`https://nds.aboalrejal.com/r/use-toast.json`)

### Exports

`Toaster`

### Usage

```tsx
import { Toaster } from "@/components/ui/toaster";

<Toaster>Toaster</Toaster>
```

### Source (`registry/dga/ui/toaster.tsx`)

```tsx
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/registry/dga/ui/toast"
import { useToast } from "@/registry/dga/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---
