## Component: MULTI-SELECT

DGA-approved **Multi Select** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/multi-select.json
```

**NPM dependencies:** `@aboalrejal/nds-icons`
**Registry dependencies:** `command` (`https://nds.aboalrejal.com/r/command.json`), `badge` (`https://nds.aboalrejal.com/r/badge.json`), `popover` (`https://nds.aboalrejal.com/r/popover.json`), `button` (`https://nds.aboalrejal.com/r/button.json`)

### Exports

`MultiSelect`

### Usage

```tsx
import { MultiSelect } from "@/components/ui/multi-select";

<MultiSelect>Multi Select</MultiSelect>
```

### Source (`registry/dga/ui/multi-select.tsx`)

```tsx
"use client"

import * as React from "react"
import { Cancel01Stroke, CheckmarkBadge01Solid } from "@aboalrejal/nds-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/dga/ui/command"
import { Badge } from "@/registry/dga/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/dga/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/dga/ui/button"

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-start min-h-10 h-auto p-1", className)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => {
                const option = options.find((o) => o.value === item)
                return (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="mr-1 mb-1 items-center gap-1 hover:bg-secondary"
                  >
                    {option?.label}
                    <div
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => handleUnselect(item)}
                    >
                      <Cancel01Stroke className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </div>
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground p-1 px-2 font-normal">
                {placeholder}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(
                        isSelected
                          ? selected.filter((item) => item !== option.value)
                          : [...selected, option.value]
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckmarkBadge01Solid className={cn("h-3 w-3")} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

---
