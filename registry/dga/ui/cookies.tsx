"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CookieSolid, Cancel01Stroke } from "@aboalrejal/nds-icons"
import { Button } from "@/registry/dga/ui/button"

const cookiesPopupVariants = cva(
  "fixed z-50 flex flex-col bg-background shadow-lg border",
  {
    variants: {
      variant: {
        default: "bottom-0 left-0 right-0 rounded-t-xl border-x-0 border-b-0 sm:border-x sm:border-b sm:rounded-xl sm:left-4 sm:bottom-4 sm:right-auto sm:max-w-[400px]",
        compact: "bottom-4 left-4 right-4 sm:right-auto sm:max-w-[400px] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CookiesPopupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cookiesPopupVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onAccept?: () => void
  onDecline?: () => void
  title?: string
  description?: React.ReactNode
  termsLink?: string
  privacyLink?: string
}

export function CookiesPopup({
  open = true,
  onOpenChange,
  onAccept,
  onDecline,
  variant,
  title = "Cookies",
  description = "This website uses cookies to ensure ease of use and provide an enhanced browsing experience. By continuing to browse this site, you acknowledge and accept the use of cookies.",
  termsLink = "/terms-and-conditions",
  privacyLink = "/privacy-policy",
  className,
  ...props
}: CookiesPopupProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }

  const handleAccept = () => {
    onAccept?.()
    handleClose()
  }

  const handleDecline = () => {
    onDecline?.()
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        cookiesPopupVariants({ variant }),
        "animate-in slide-in-from-bottom-10 fade-in-50 duration-500",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between p-6 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CookieSolid className="h-6 w-6 text-primary" />
        </div>
        <button
          onClick={handleClose}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close"
        >
          <Cancel01Stroke className="h-4 w-4" />
        </button>
      </div>

      <div className="px-6 py-4 flex-1">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <a href={termsLink} className="hover:text-foreground underline underline-offset-4 transition-colors">
            Terms & Conditions
          </a>
          <span>|</span>
          <a href={privacyLink} className="hover:text-foreground underline underline-offset-4 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col gap-2 sm:flex-row">
        <Button onClick={handleAccept} className="w-full sm:flex-1">
          Accept
        </Button>
        <Button onClick={handleDecline} variant="outline" className="w-full sm:flex-1">
          Reject Non-Essential
        </Button>
      </div>
    </div>
  )
}
