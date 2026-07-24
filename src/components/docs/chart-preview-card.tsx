"use client"

import { useState } from "react"
import { Copy01Stroke, CheckmarkBadge01Solid, CodeStroke, EyeStroke } from "@aboalrejal/nds-icons"

interface ChartPreviewCardProps {
  title: string
  description?: string
  component: React.ReactNode
  code: string
}

export function ChartPreviewCard({
  title,
  description,
  component,
  code,
}: ChartPreviewCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-muted p-1 text-xs">
            <button
              onClick={() => setTab("preview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                tab === "preview"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <EyeStroke className="size-3.5" />
              <span>المعاينة (Preview)</span>
            </button>
            <button
              onClick={() => setTab("code")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
                tab === "code"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CodeStroke className="size-3.5" />
              <span>الكود (Code)</span>
            </button>
          </div>

          {/* Copy Button */}
          {tab === "code" && (
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              {copied ? (
                <>
                  <CheckmarkBadge01Solid className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy01Stroke className="size-3.5" />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {tab === "preview" ? (
          <div className="flex min-h-[350px] w-full items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/50 p-2 sm:p-6">
            <div className="w-full max-w-2xl">{component}</div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
            <pre className="max-h-[450px] overflow-auto text-xs sm:text-sm font-mono leading-relaxed">
              <code>{code.trim()}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
