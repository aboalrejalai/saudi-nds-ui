import * as React from "react"
import { Search01Stroke as Search, Cancel01Stroke as X, FilterStroke as FilterIcon } from "@aboalrejal/nds-icons"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Badge } from "./badge"

/* 
  =========================================
  FILTER BAR COMPONENT
  =========================================
*/
const FilterBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full", className)}
    {...props}
  />
))
FilterBar.displayName = "FilterBar"

/* 
  =========================================
  FILTER SEARCH
  =========================================
*/
interface FilterSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  onSearch?: () => void
}

const FilterSearch = React.forwardRef<HTMLInputElement, FilterSearchProps>(
  ({ className, onClear, onSearch, value, ...props }, ref) => {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={ref}
            value={value}
            className={cn("pl-9 pr-9 h-11", className)}
            {...props}
          />
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={onSearch} className="h-11 px-6">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    )
  }
)
FilterSearch.displayName = "FilterSearch"

/* 
  =========================================
  FILTER MENU
  =========================================
*/
interface FilterMenuProps {
  triggerLabel?: string
  children?: React.ReactNode
  onApply?: () => void
  onReset?: () => void
}

const FilterMenu = ({
  triggerLabel = "Filter",
  children,
  onApply,
  onReset,
}: FilterMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-11">
          <FilterIcon className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[260px] p-0">
        <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
          {children}
        </div>
        <div className="border-t p-4 flex justify-between gap-2">
          <Button variant="secondary" onClick={onReset} className="w-full">
            Reset
          </Button>
          <Button onClick={onApply} className="w-full">
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* 
  =========================================
  FILTER APPLIED (CHIPS)
  =========================================
*/
const FilterApplied = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  if (!children || React.Children.count(children) === 0) return null

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 mt-4 text-sm", className)}
      {...props}
    >
      <span className="font-medium text-muted-foreground">Applied Filters:</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
})
FilterApplied.displayName = "FilterApplied"

interface FilterChipProps extends React.ComponentProps<typeof Badge> {
  onRemove?: () => void
}

const FilterChip = ({ className, children, onRemove, ...props }: FilterChipProps) => (
  <Badge
    variant="secondary"
    className={cn("flex items-center gap-1 rounded-md px-2 py-1 text-sm font-normal", className)}
    {...props}
  >
    {children}
    <button
      onClick={onRemove}
      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
    >
      <X className="h-3 w-3" />
    </button>
  </Badge>
)

export {
  FilterBar,
  FilterSearch,
  FilterMenu,
  FilterApplied,
  FilterChip,
}
