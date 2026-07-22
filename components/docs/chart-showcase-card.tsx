"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import {
  Copy01Stroke,
  CheckmarkBadge01Solid,
  Chart01Stroke,
  CodeStroke,
} from "@aboalrejal/nds-icons"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/registry/dga/ui/sheet"

interface ChartShowcaseCardProps {
  /** اسم مكون الشارت المسجل في السجل (مثل chart-area-linear) */
  name: string
  /** اسم الفئة المظللة في الأعلى (مثل Area Chart) */
  category?: string
  /** العنوان الوظيفي للشارت داخل الكارت */
  title?: string
  /** كود المصدر المباشر المكتوب */
  code: string
  /** المكون البرمجي الحي */
  children: React.ReactNode
  /** هل يأخذ العرض الكامل للمكان (Full Width) */
  fullWidth?: boolean
}

export function ChartShowcaseCard({
  name,
  category = "Area Chart",
  code,
  children,
  fullWidth = false,
}: ChartShowcaseCardProps) {
  const locale = useLocale()
  const isAr = locale === "ar"

  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [sheetCopied, setSheetCopied] = React.useState(false)

  const copyCode = async (isSheet = false) => {
    await navigator.clipboard.writeText(code.trim())
    if (isSheet) {
      setSheetCopied(true)
      setTimeout(() => setSheetCopied(false), 2000)
    } else {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const lines = code.trim().split("\n")

  const displayCategory = category || "Chart Component"
  const textViewCode = "View Code"
  const textCopyCode = "Copy code"
  const textCopied = "Copied"

  return (
    <div className={`group flex flex-col gap-2 ${fullWidth ? "w-full col-span-full" : "w-full"}`}>
      {/* Upper Control Bar (Icon + Category Title + Copy Button + View Code Button) */}
      <div className="flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <Chart01Stroke className="size-4 shrink-0 text-[#1b8354] dark:text-[#54c08a] transition-colors duration-200 group-hover:text-[#25935f]" />
          <span>{displayCategory}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Copy Button */}
          <button
            onClick={() => copyCode(false)}
            aria-label={textCopyCode}
            title={textCopyCode}
            className="flex size-7 items-center justify-center rounded-md border border-border/80 bg-background text-muted-foreground transition-colors hover:border-[#1b8354]/40 hover:bg-muted hover:text-[#1b8354] dark:hover:text-[#54c08a]"
          >
            {copied ? (
              <CheckmarkBadge01Solid className="size-4 text-[#1b8354] dark:text-[#54c08a]" />
            ) : (
              <Copy01Stroke className="size-3.5 transition-colors duration-200 hover:text-[#25935f]" />
            )}
          </button>

          {/* View Code Button */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-[#1b8354]/40 hover:bg-muted shadow-2xs"
          >
            <CodeStroke className="size-3.5 text-[#1b8354] dark:text-[#54c08a] transition-colors duration-200 hover:text-[#25935f]" />
            <span>{textViewCode}</span>
          </button>
        </div>
      </div>

      {/* Main Chart Live Preview Component (Sits Directly on Background, Layer 2) */}
      <div className="w-full">
        {children}
      </div>

      {/* Slide-Over Right Sheet Drawer for Code Display */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side={isAr ? "left" : "right"} className="w-full sm:max-w-2xl p-0 flex flex-col bg-background">
          {/* Sheet Header */}
          <SheetHeader className="flex flex-row items-center justify-between border-b px-6 py-4 space-y-0">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-[#1b8354]/10 text-[10px] font-mono font-bold text-[#1b8354]">
                TS
              </span>
              <SheetTitle className="text-sm font-semibold font-mono text-foreground">
                {name}
              </SheetTitle>
            </div>

            <div className="flex items-center gap-2 me-6">
              <button
                onClick={() => copyCode(true)}
                className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted shadow-2xs"
              >
                {sheetCopied ? (
                  <>
                    <CheckmarkBadge01Solid className="size-3.5 text-[#1b8354]" />
                    <span className="text-[#1b8354]">{textCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy01Stroke className="size-3.5 text-[#1b8354]" />
                    <span>{textCopyCode}</span>
                  </>
                )}
              </button>
            </div>
          </SheetHeader>

          {/* Sheet Code Content Container (Clean Light/Dark Code View with Line Numbers) */}
          <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-zinc-950/50">
            <div className="rounded-xl border border-border/80 bg-background p-4 text-xs sm:text-sm font-mono shadow-2xs">
              <pre className="overflow-x-auto leading-relaxed">
                <code>
                  {lines.map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pe-4 text-end select-none text-muted-foreground/50 text-xs">
                        {i + 1}
                      </span>
                      <span className="table-cell whitespace-pre text-foreground">
                        {line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
