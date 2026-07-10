## Component: TOASTER

Layout provider wrapper that actively maps hook states into the DOM tree.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/toaster.json
```

### Exports

`Toaster`

### Usage

Add `<Toaster />` at the root layout of your application to automatically render active toast notifications.

```tsx
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
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
