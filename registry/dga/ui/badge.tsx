import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90",
        outline:
          "border border-[var(--border-border-neutral-primary)] text-[var(--text-text-default)] bg-background [a&]:hover:bg-accent",
        ghost:
          "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 [a&]:hover:underline",
        "chip-primary":
          "bg-[var(--colors-primary-s-a-flag50)] text-[var(--colors-primary-s-a-flag800)] border border-[var(--colors-primary-s-a-flag200)]",
        "chip-primary-selected":
          "bg-[var(--colors-primary-s-a-flag600-primary)] text-white",
        "chip-neutral":
          "bg-[var(--colors-neutral50)] text-[var(--colors-neutral800)] border border-[var(--colors-neutral200)]",
        "chip-neutral-selected":
          "bg-[var(--colors-neutral700)] text-white",
      },
      size: {
        default: "px-2.5 py-1 text-xs gap-1.5",
        sm: "h-6 px-2.5 py-0.5 text-xs gap-1",
        md: "h-7 px-3 py-1 text-xs gap-1.5",
        lg: "h-8 px-4 py-1.5 text-sm gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
