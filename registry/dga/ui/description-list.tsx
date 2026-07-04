import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const descriptionListVariants = cva("w-full text-sm", {
  variants: {
    orientation: {
      horizontal: "grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-4",
      vertical: "flex flex-col",
    },
    divided: {
      true: "[&>div:not(:last-child)]:border-b",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof descriptionListVariants> {}

function DescriptionList({
  orientation,
  divided,
  className,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      className={cn(descriptionListVariants({ orientation, divided }), className)}
      {...props}
    />
  )
}
DescriptionList.displayName = "DescriptionList"

const descriptionItemVariants = cva("py-3", {
  variants: {
    orientation: {
      horizontal: "md:contents md:py-0 [&>dt]:md:py-3 [&>dd]:md:py-3 block",
      vertical: "flex flex-col gap-1",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

interface DescriptionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof descriptionItemVariants> {}

function DescriptionItem({
  orientation,
  className,
  ...props
}: DescriptionItemProps) {
  return (
    <div
      className={cn(descriptionItemVariants({ orientation }), className)}
      {...props}
    />
  )
}
DescriptionItem.displayName = "DescriptionItem"

function DescriptionTerm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <dt
      className={cn("font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}
DescriptionTerm.displayName = "DescriptionTerm"

function DescriptionDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <dd
      className={cn("text-foreground", className)}
      {...props}
    />
  )
}
DescriptionDetails.displayName = "DescriptionDetails"

export {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
  descriptionListVariants,
}
