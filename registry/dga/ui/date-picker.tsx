"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar01Stroke as CalendarIcon } from "@/components/icons"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/dga/ui/button"
import { Calendar } from "@/registry/dga/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/dga/ui/popover"
import { Label } from "@/registry/dga/ui/label"

// ─── DatePicker ───

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date?: Date) => void
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  label,
  className,
  disabled = false,
}: DatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// ─── DateRangePicker ───

export interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (range?: DateRange) => void
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date range",
  label,
  className,
  disabled = false,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
