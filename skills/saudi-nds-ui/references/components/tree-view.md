## Component: TREE-VIEW

DGA-approved **Tree View** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/tree-view.json
```

**NPM dependencies:** `@aboalrejal/nds-icons`

### Exports

`TreeView`

### Usage

```tsx
import { TreeView } from "@/components/ui/tree-view";

<TreeView>Tree View</TreeView>
```

### Source (`registry/dga/ui/tree-view.tsx`)

```tsx
"use client"

import * as React from "react"
import { Folder01Solid, File01Solid, ArrowRight01Stroke } from "@aboalrejal/nds-icons"
import { cn } from "@/lib/utils"

export interface TreeDataItem {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeDataItem[]
}

export interface TreeViewProps {
  data: TreeDataItem[]
  className?: string
  defaultExpandedIds?: string[]
}

export function TreeView({ data, className, defaultExpandedIds = [] }: TreeViewProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(defaultExpandedIds)
  )

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const renderTree = (items: TreeDataItem[], level = 0) => {
    return (
      <ul className={cn("flex flex-col gap-1", level > 0 && "ltr:ml-4 rtl:mr-4 ltr:border-l rtl:border-r border-border")}>
        {items.map((item) => {
          const isExpanded = expandedIds.has(item.id)
          const hasChildren = item.children && item.children.length > 0

          return (
            <li key={item.id} className="relative">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/50 transition-colors",
                  hasChildren ? "cursor-pointer" : "cursor-default"
                )}
                onClick={() => hasChildren && toggleExpand(item.id)}
              >
                {hasChildren ? (
                  <ArrowRight01Stroke
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isExpanded ? "rotate-90" : "rtl:rotate-180"
                    )}
                  />
                ) : (
                  <div className="h-4 w-4 shrink-0" />
                )}
                
                <span className="shrink-0 text-muted-foreground">
                  {item.icon ? (
                    item.icon
                  ) : hasChildren ? (
                    <Folder01Solid className="h-4 w-4 text-blue-500" />
                  ) : (
                    <File01Solid className="h-4 w-4" />
                  )}
                </span>
                
                <span className="truncate">{item.name}</span>
              </div>
              
              {hasChildren && isExpanded && (
                <div className="mt-1">{renderTree(item.children!, level + 1)}</div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={cn("overflow-hidden rounded-md border bg-card p-2", className)}>
      {renderTree(data)}
    </div>
  )
}
```

---
