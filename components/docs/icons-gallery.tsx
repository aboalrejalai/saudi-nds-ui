"use client"

import React, { useState, useMemo, useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import { ALL_ICON_NAMES } from "@/lib/icon-names"
import { Input } from "@/registry/dga/ui/input"
import { Button } from "@/registry/dga/ui/button"
import { IconSearch } from "@tabler/icons-react"
import { toast } from "sonner"

export function IconsGallery() {
  const locale = useLocale()
  const isAr = locale === "ar"

  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(50)
  const [filterType, setFilterType] = useState<"all" | "solid" | "stroke">("all")
  const [iconsModule, setIconsModule] = useState<Record<string, React.ComponentType<any>> | null>(null)
  
  const loaderRef = useRef<HTMLDivElement>(null)

  // Asynchronously load the icon components module in the background after page mount
  useEffect(() => {
    let isMounted = true
    import("@aboalrejal/nds-icons").then((mod) => {
      if (isMounted) {
        setIconsModule(mod)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  // Fast in-memory text filtering across 8,753 icon names (< 1ms)
  const filteredIcons = useMemo(() => {
    let keys = ALL_ICON_NAMES

    // Filter by type
    if (filterType === "solid") {
      keys = keys.filter((key) => key.endsWith("Solid"))
    } else if (filterType === "stroke") {
      keys = keys.filter((key) => key.endsWith("Stroke"))
    }

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase()
      keys = keys.filter((key) => key.toLowerCase().includes(lowerQuery))
    }
    return keys
  }, [query, filterType])

  // Only slice the active visible 50 icons
  const visibleIcons = useMemo(() => {
    return filteredIcons.slice(0, visibleCount)
  }, [filteredIcons, visibleCount])

  useEffect(() => {
    setVisibleCount(50)
  }, [query, filterType])

  // Progressive infinite scroll: load 50 more icons as user scrolls down
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 50, filteredIcons.length))
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [filteredIcons.length])

  const copyIconName = (name: string) => {
    const importCode = `import { ${name} } from "@aboalrejal/nds-icons"\n\n<${name} />`
    navigator.clipboard.writeText(importCode)
    toast.success(
      isAr
        ? `تم نسخ كود استيراد ${name} إلى الحافظة!`
        : `Copied ${name} import code to clipboard!`
    )
  }

  // Texts
  const placeholderText = isAr ? "ابحث في أكثر من 8,753 أيقونة..." : "Search 8,753+ icons..."
  const textAll = isAr ? "الكل" : "All"
  const textSolid = isAr ? "مصمت (Solid)" : "Solid"
  const textStroke = isAr ? "مفرغ (Stroke)" : "Stroke"
  const textShowing = isAr
    ? `عرض ${visibleIcons.length} من أصل ${filteredIcons.length}`
    : `Showing ${visibleIcons.length} of ${filteredIcons.length}`

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Search and Filters Header Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative w-full md:max-w-md">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder={placeholderText}
            className="pl-10 h-12 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            {textAll}
          </Button>
          <Button
            variant={filterType === "solid" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("solid")}
          >
            {textSolid}
          </Button>
          <Button
            variant={filterType === "stroke" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("stroke")}
          >
            {textStroke}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground w-full md:w-auto text-end">
          {textShowing}
        </p>
      </div>

      {/* Grid of Visible 50 Icons (Lazy Loaded) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {visibleIcons.map((name) => {
          const IconComp = iconsModule ? iconsModule[name] : null

          return (
            <button
              key={name}
              onClick={() => copyIconName(name)}
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/80 bg-card hover:border-[#1b8354] hover:bg-muted/50 transition-all hover:shadow-xs text-center gap-2"
            >
              <div className="size-8 flex items-center justify-center text-[#1b8354] dark:text-[#54c08a] group-hover:scale-110 transition-transform">
                {IconComp ? (
                  <IconComp className="size-6" />
                ) : (
                  <div className="size-6 rounded-md bg-muted animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground line-clamp-1 w-full break-all">
                {name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Infinite Scroll Sentinel / Loader */}
      {visibleIcons.length < filteredIcons.length && (
        <div ref={loaderRef} className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="size-4 border-2 border-[#1b8354] border-t-transparent rounded-full animate-spin" />
            <span>{isAr ? "جاري تحميل المزيد من الأيقونات..." : "Loading more icons..."}</span>
          </div>
        </div>
      )}
    </div>
  )
}
