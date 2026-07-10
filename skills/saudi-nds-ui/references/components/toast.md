## Component: TOAST

Radix-based classic alert and notification toasts with full layout support.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/toast.json
```

### Variants

- **variant:** `default`, `destructive`, `success`

### Exports

`Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`, `ToastProvider`, `ToastViewport`, `ToastProps`, `ToastActionElement`

### Usage

```tsx
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

<Toast variant="success">
  <ToastTitle>تم حفظ البيانات</ToastTitle>
  <ToastDescription>تمت مزامنة الملف مع الهوية الموحدة.</ToastDescription>
  <ToastClose />
</Toast>
```

### Source (`registry/dga/ui/toast.tsx`)

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Toast as ToastPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 end-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:end-0 md:max-w-[420px] font-sans rtl:left-0 rtl:right-auto",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 space-x-reverse overflow-hidden rounded-xl border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full md:data-[state=open]:slide-in-from-bottom-5 font-sans",
  {
    variants: {
      variant: {
        default: "border-border bg-white text-foreground dark:bg-[#1C2536] dark:text-white",
        destructive:
          "destructive group border-destructive/20 bg-[#FEF2F2] text-destructive dark:bg-destructive/20 dark:text-destructive-foreground",
        success:
          "border-[#079455]/20 bg-[#ECFDF5] text-[#067647] dark:bg-[#079455]/10 dark:text-[#ECFDF5]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-lg border bg-transparent px-3 text-xs font-semibold ring-offset-background transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
      "group-data-[variant=destructive]:border-destructive/30 group-data-[variant=destructive]:hover:bg-destructive group-data-[variant=destructive]:hover:text-white",
      "group-data-[variant=success]:border-[#079455]/30 group-data-[variant=success]:hover:bg-[#079455] group-data-[variant=success]:hover:text-white",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      "absolute top-3 end-3 rounded-lg p-1 text-muted-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      "group-data-[variant=destructive]:text-destructive/60 group-data-[variant=destructive]:hover:text-destructive",
      "group-data-[variant=success]:text-[#067647]/60 group-data-[variant=success]:hover:text-[#067647]",
      className
    )}
    toast-close=""
    {...props}
  >
    <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-none", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-xs leading-normal opacity-90 mt-1", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```
