"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckmarkBadge01Solid } from "@aboalrejal/nds-icons"

const stepsVariants = cva("flex w-full", {
  variants: {
    size: {
      sm: "gap-2 text-sm",
      md: "gap-4 text-base",
    },
    orientation: {
      horizontal: "flex-row items-start",
      vertical: "flex-col items-start gap-8",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
})

export type StepState = "completed" | "current" | "upcoming"

const stepVariants = cva("relative flex flex-1 flex-col items-center text-center", {
  variants: {
    state: {
      completed: "text-foreground",
      current: "text-foreground font-semibold",
      upcoming: "text-muted-foreground",
    },
  },
  defaultVariants: {
    state: "upcoming",
  },
})

interface StepsProps extends React.ComponentProps<"ol">, VariantProps<typeof stepsVariants> {}
interface StepProps extends Omit<React.ComponentProps<"li">, "aria-current">, VariantProps<typeof stepVariants> {}
interface StepIndicatorProps extends React.ComponentProps<"span"> {
  step?: number | string
}

function Steps({ size, orientation, className, ...props }: StepsProps) {
  return (
    <ol
      data-orientation={orientation ?? "horizontal"}
      className={cn(
        stepsVariants({ size, orientation }),
        orientation === "horizontal"
          ? "[&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:top-5 [&>li:not(:last-child)]:after:w-[calc(100%-2.5rem)] [&>li:not(:last-child)]:after:h-[2px] [&>li:not(:last-child)]:after:bg-border [&>li:not(:last-child)]:after:left-[calc(50%+1.25rem)] rtl:[&>li:not(:last-child)]:after:right-[calc(50%+1.25rem)] rtl:[&>li:not(:last-child)]:after:left-auto"
          : "[&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:top-[2.5rem] [&>li:not(:last-child)]:after:h-[calc(100%-1rem)] [&>li:not(:last-child)]:after:w-[2px] [&>li:not(:last-child)]:after:bg-border [&>li:not(:last-child)]:after:left-5 rtl:[&>li:not(:last-child)]:after:right-5 rtl:[&>li:not(:last-child)]:after:left-auto",
        className
      )}
      {...props}
    />
  )
}

function Step({ state, className, ...props }: StepProps) {
  // Pass state to children implicitly through data attribute if needed, but here we just rely on parent class structure
  return (
    <li
      aria-current={state === "current" ? "step" : undefined}
      data-state={state ?? "upcoming"}
      className={cn(stepVariants({ state }), className)}
      {...props}
    />
  )
}

function StepIndicator({ step, className, ...props }: StepIndicatorProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold bg-background transition-colors",
        "group-data-[state=completed]:bg-primary group-data-[state=completed]:border-primary group-data-[state=completed]:text-primary-foreground",
        "group-data-[state=current]:border-primary group-data-[state=current]:text-primary",
        "group-data-[state=upcoming]:border-muted-foreground/30 group-data-[state=upcoming]:text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="hidden group-data-[state=completed]:block">
        <CheckmarkBadge01Solid className="h-5 w-5" />
      </span>
      <span className="group-data-[state=completed]:hidden">{step}</span>
    </span>
  )
}

function StepTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("mt-4 block text-sm font-bold", className)} {...props} />
}

function StepDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("mt-1 block text-sm text-muted-foreground/80", className)} {...props} />
  )
}

export { Steps, Step, StepIndicator, StepTitle, StepDescription, stepsVariants, stepVariants }
export type { StepsProps, StepProps, StepIndicatorProps }
