"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { StarSolid, StarStroke } from "@aboalrejal/nds-icons"

const ratingVariants = cva(
  "inline-flex items-center gap-1",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
  allowHalf?: boolean
  readOnly?: boolean
  disabled?: boolean
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function fillFor(index: number, value: number, allowHalf: boolean): "full" | "half" | "empty" {
  if (value >= index + 1) return "full"
  if (allowHalf && value >= index + 0.5) return "half"
  return "empty"
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value,
      defaultValue = 0,
      onValueChange,
      max = 5,
      allowHalf = false,
      readOnly = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<number>(defaultValue)
    const currentValue = isControlled ? value : internal

    const [hover, setHover] = React.useState<number | null>(null)
    const interactive = !readOnly && !disabled
    const stepSize = allowHalf ? 0.5 : 1

    const displayValue = hover ?? currentValue

    function commit(next: number) {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    }

    function pointerValue(event: React.PointerEvent | React.MouseEvent, index: number): number {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      // For LTR standard. If RTL is needed, we should check direction, but for now simple LTR/RTL assumption:
      // If we are in RTL, we reverse the fraction. (Next.js dir="rtl" or similar)
      const isRtl = typeof window !== 'undefined' && window.getComputedStyle(event.currentTarget as HTMLElement).direction === 'rtl'
      
      let fraction = rect.width ? (event.clientX - rect.left) / rect.width : 1
      if (isRtl) fraction = 1 - fraction

      if (allowHalf) return index + (fraction <= 0.5 ? 0.5 : 1)
      return index + 1
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (!interactive) return
      
      const isRtl = typeof window !== 'undefined' && window.getComputedStyle(event.currentTarget as HTMLElement).direction === 'rtl'
      
      let next: number | null = null
      switch (event.key) {
        case "ArrowUp":
          next = currentValue + stepSize
          break
        case "ArrowDown":
          next = currentValue - stepSize
          break
        case "ArrowRight":
          next = currentValue + (isRtl ? -stepSize : stepSize)
          break
        case "ArrowLeft":
          next = currentValue + (isRtl ? stepSize : -stepSize)
          break
        case "Home":
          next = 0
          break
        case "End":
          next = max
          break
        default:
          return
      }
      event.preventDefault()
      commit(clamp(next, 0, max))
    }

    const stars = Array.from({ length: max }, (_, index) => {
      const level = fillFor(index, displayValue, allowHalf)
      
      // Determine size classes for stars
      let starSize = "w-5 h-5"
      if (size === "sm") starSize = "w-4 h-4"
      if (size === "lg") starSize = "w-6 h-6"

      return (
        <span
          key={index}
          className={cn(
            "relative inline-block select-none",
            interactive ? "cursor-pointer" : "cursor-default",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onPointerMove={interactive ? (event) => setHover(pointerValue(event, index)) : undefined}
          onClick={interactive ? (event) => commit(pointerValue(event, index)) : undefined}
        >
          {/* Background Star (Empty) */}
          <StarStroke className={cn("text-muted-foreground", starSize)} aria-hidden="true" />
          
          {/* Foreground Star (Filled) - Overlays the background */}
          <span 
            className={cn(
              "absolute top-0 left-0 overflow-hidden rtl:right-0 rtl:left-auto",
              level === "full" ? "w-full" : level === "half" ? "w-1/2" : "w-0"
            )}
            aria-hidden="true"
          >
            <StarSolid className={cn("text-primary", starSize)} />
          </span>
        </span>
      )
    })

    return (
      <div
        ref={ref}
        className={cn(ratingVariants({ size }), className)}
        role={readOnly ? "img" : "slider"}
        tabIndex={disabled || readOnly ? -1 : 0}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onPointerLeave={interactive ? () => setHover(null) : undefined}
        {...props}
      >
        {stars}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating, ratingVariants }
