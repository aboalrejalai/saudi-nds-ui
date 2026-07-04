"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const timelineVariants = cva("flex w-full", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
    },
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
})

export type TimelineStatus = "default" | "success" | "error" | "warning" | "info"

const timelineMarkerVariants = cva(
  "absolute flex items-center justify-center bg-background",
  {
    variants: {
      status: {
        default: "text-muted-foreground",
        success: "text-emerald-500",
        error: "text-destructive",
        warning: "text-amber-500",
        info: "text-blue-500",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

interface TimelineProps extends React.ComponentProps<"ol">, VariantProps<typeof timelineVariants> {}
type TimelineItemProps = React.ComponentProps<"li">
interface TimelineMarkerProps extends React.ComponentProps<"span">, VariantProps<typeof timelineMarkerVariants> {}

function Timeline({ size, orientation, className, ...props }: TimelineProps) {
  return (
    <ol
      data-orientation={orientation ?? "vertical"}
      className={cn(
        timelineVariants({ size, orientation }),
        orientation === "vertical"
          ? "[&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:bottom-[-2rem] [&>li:not(:last-child)]:after:top-6 [&>li:not(:last-child)]:after:left-[0.6875rem] rtl:[&>li:not(:last-child)]:after:right-[0.6875rem] rtl:[&>li:not(:last-child)]:after:left-auto [&>li:not(:last-child)]:after:w-px [&>li:not(:last-child)]:after:bg-border"
          : "[&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:right-[-2rem] rtl:[&>li:not(:last-child)]:after:left-[-2rem] rtl:[&>li:not(:last-child)]:after:right-auto [&>li:not(:last-child)]:after:left-6 rtl:[&>li:not(:last-child)]:after:left-auto [&>li:not(:last-child)]:after:top-[0.6875rem] [&>li:not(:last-child)]:after:h-px [&>li:not(:last-child)]:after:bg-border",
        className
      )}
      {...props}
    />
  )
}

function TimelineItem({ className, ...props }: TimelineItemProps) {
  return (
    <li
      className={cn(
        "relative flex flex-col gap-1 pb-8 last:pb-0 group pl-10 rtl:pl-0 rtl:pr-10",
        className
      )}
      {...props}
    />
  )
}

function TimelineMarker({ status, className, children, ...props }: TimelineMarkerProps) {
  const resolved = status ?? "default"
  return (
    <span
      aria-hidden="true"
      data-status={resolved}
      className={cn(
        timelineMarkerVariants({ status: resolved }),
        "left-0 top-1.5 rtl:left-auto rtl:right-0 w-6 h-6 rounded-full border-2 border-background",
        className
      )}
      {...props}
    >
      {children ?? (
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            resolved === "default" && "bg-muted-foreground/30",
            resolved === "success" && "bg-emerald-500",
            resolved === "error" && "bg-destructive",
            resolved === "warning" && "bg-amber-500",
            resolved === "info" && "bg-blue-500"
          )}
        />
      )}
    </span>
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 pt-1", className)} {...props} />
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-sm font-semibold text-foreground", className)} {...props} />
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time className={cn("text-xs font-mono text-muted-foreground mt-1", className)} {...props} />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineVariants,
  timelineMarkerVariants,
}
export type { TimelineProps, TimelineItemProps, TimelineMarkerProps }
