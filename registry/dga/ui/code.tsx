"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Copy01Stroke, CheckmarkBadge01Solid } from "@aboalrejal/nds-icons"

const codeVariants = cva(
  "relative overflow-hidden rounded-xl border bg-muted/30 font-mono text-sm",
  {
    variants: {
      variant: {
        default: "block",
        inline: "inline-block px-1.5 py-0.5 rounded-md text-primary font-semibold text-[0.85em]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CodeProps extends React.HTMLAttributes<HTMLPreElement>, VariantProps<typeof codeVariants> {
  code: string
  language?: string
  showLineNumbers?: boolean
  withCopyButton?: boolean
}

export function Code({
  code,
  language = "text",
  showLineNumbers = false,
  withCopyButton = true,
  variant = "default",
  className,
  ...props
}: CodeProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [code])

  if (variant === "inline") {
    return (
      <code className={cn(codeVariants({ variant }), className)} {...(props as any)}>
        {code}
      </code>
    )
  }

  const lines = code.trimEnd().split("\n")

  return (
    <div className={cn("group relative", className)}>
      {withCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 hover:bg-muted"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <CheckmarkBadge01Solid className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy01Stroke className="h-4 w-4" />
          )}
        </button>
      )}
      
      <div className={cn(codeVariants({ variant }))}>
        {language && language !== "text" && (
          <div className="flex items-center px-4 py-2 border-b bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
            {language}
          </div>
        )}
        <pre className="overflow-x-auto p-4" {...props}>
          <code className="grid">
            {lines.map((line, i) => (
              <span key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell select-none pr-4 text-right text-muted-foreground/50">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">{line || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
