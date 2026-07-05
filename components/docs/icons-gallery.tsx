"use client"

import React, { useState, useMemo, useEffect, useRef } from "react"
import * as NdsIcons from "@aboalrejal/nds-icons"
import { Input } from "@/registry/dga/ui/input"
import { Button } from "@/registry/dga/ui/button"
import { IconSearch } from "@tabler/icons-react"
import { toast } from "sonner"

const allIconKeys = Object.keys(NdsIcons)

export function IconsGallery() {
  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(50)
  const [filterType, setFilterType] = useState<"all" | "solid" | "stroke">("all")
  const loaderRef = useRef<HTMLDivElement>(null)

  const filteredIcons = useMemo(() => {
    let keys = allIconKeys
    
    // Filter by type
    if (filterType === "solid") {
      keys = keys.filter(key => key.endsWith("Solid"))
    } else if (filterType === "stroke") {
      keys = keys.filter(key => key.endsWith("Stroke"))
    }

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase()
      keys = keys.filter(key => key.toLowerCase().includes(lowerQuery))
    }
    return keys
  }, [query, filterType])

  const visibleIcons = filteredIcons.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(50)
  }, [query, filterType])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 20, filteredIcons.length))
      }
    }, { threshold: 0.5, rootMargin: "200px" })

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [filteredIcons.length])

  const copyIconName = (name: string) => {
    const importCode = `import { ${name} } from "@aboalrejal/nds-icons"\n\n<${name} />`
    navigator.clipboard.writeText(importCode)
    toast.success(`Copied ${name} import to clipboard!`)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search 8,900+ icons..." 
            className="pl-10 h-12"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={filterType === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button 
            variant={filterType === "solid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("solid")}
          >
            Solid
          </Button>
          <Button 
            variant={filterType === "stroke" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("stroke")}
          >
            Stroke
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground w-full md:w-auto text-right">
          Showing {visibleIcons.length} of {filteredIcons.length}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-12">
        {visibleIcons.map((key) => {
          const IconComponent = (NdsIcons as any)[key]
          if (!IconComponent) return null
          
          return (
            <div 
              key={key} 
              className="flex flex-col items-center justify-center p-6 border rounded-xl hover:bg-muted hover:border-primary/50 cursor-pointer transition-all hover:scale-105 active:scale-95"
              onClick={() => copyIconName(key)}
            >
              <IconComponent width={32} height={32} className="mb-4 text-foreground" />
              <span className="text-[11px] text-muted-foreground text-center break-all w-full leading-tight font-medium select-all">
                {key}
              </span>
            </div>
          )
        })}
      </div>

      {visibleCount < filteredIcons.length && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {filteredIcons.length === 0 && (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground gap-2">
          <IconSearch size={32} className="opacity-20" />
          <p>No icons found matching "{query}"</p>
        </div>
      )}
    </div>
  )
}
