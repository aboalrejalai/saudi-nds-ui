"use client";

import React, { useRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge, type badgeVariants } from "@/registry/dga/ui/badge"
import { Cancel01Stroke } from "@/components/icons"

const tagInputVariants = cva(
  "flex flex-wrap items-center gap-1.5 border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-colors",
  {
    variants: {
      size: {
        sm: "min-h-9 px-3 py-1.5",
        md: "min-h-10 px-3 py-2",
        lg: "min-h-12 px-4 py-3 text-base",
      },
      error: {
        true: "border-destructive focus-within:ring-destructive",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type NativeInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "size">

export interface TagInputProps extends NativeInputProps, Omit<VariantProps<typeof tagInputVariants>, "error"> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: React.ReactNode
  error?: boolean
  max?: number
  allowDuplicates?: boolean
  caseSensitive?: boolean
  validate?: (tag: string, tags: string[]) => boolean
  delimiters?: string[]
  chipVariant?: VariantProps<typeof badgeVariants>["variant"]
  removeLabel?: (tag: string) => string
}

export function TagInput({
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  errorMessage,
  error,
  size,
  disabled,
  required,
  placeholder,
  max,
  allowDuplicates = false,
  caseSensitive = false,
  validate,
  delimiters = [","],
  chipVariant = "secondary",
  removeLabel = (tag) => `Remove ${tag}`,
  className,
  id,
  ...props
}: TagInputProps) {
  const isControlled = value !== undefined
  const [uncontrolledTags, setUncontrolledTags] = useState<string[]>(defaultValue ?? [])
  const tags = isControlled ? value : uncontrolledTags

  const [draft, setDraft] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const commit = (next: string[]) => {
    if (!isControlled) setUncontrolledTags(next)
    onChange?.(next)
  }

  const norm = (t: string) => (caseSensitive ? t : t.toLowerCase())

  const accept = (raw: string[], current: string[]): string[] => {
    let next = current
    for (const fragment of raw) {
      const trimmed = fragment.trim()
      if (!trimmed) continue
      if (max !== undefined && next.length >= max) break
      if (!allowDuplicates && next.some((t) => norm(t) === norm(trimmed))) continue
      if (validate && !validate(trimmed, next)) continue
      next = [...next, trimmed]
    }
    return next
  }

  const commitDraft = () => {
    const next = accept([draft], tags)
    if (next.length > tags.length) {
      commit(next)
      setDraft("")
    }
  }

  const splitPaste = (text: string): string[] => {
    const escaped = delimiters.map((d) => d.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&"))
    const pattern = new RegExp(`[${escaped.join("")}\\n\\r]`)
    return text.split(pattern)
  }

  const removeTag = (index: number) => {
    commit(tags.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (event.key === "Enter") {
      event.preventDefault()
      if (draft.trim()) commitDraft()
    } else if (delimiters.includes(event.key)) {
      event.preventDefault()
      if (draft.trim()) commitDraft()
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault()
      removeTag(tags.length - 1)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return
    const text = event.clipboardData.getData("text")
    const fragments = splitPaste(text)
    if (fragments.length <= 1) return
    event.preventDefault()
    const next = accept(fragments, tags)
    if (next.length > tags.length) {
      commit(next)
      setDraft("")
    }
  }

  const handleBoxMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target === inputRef.current || target.closest("button")) return
    event.preventDefault()
    inputRef.current?.focus()
  }

  const chipSize = size === "lg" ? "md" : "sm"

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div
        className={cn(tagInputVariants({ size, error }), disabled && "opacity-50 cursor-not-allowed")}
        onMouseDown={disabled ? undefined : handleBoxMouseDown}
      >
        {tags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-1.5 m-0 p-0 list-none" role="list">
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`} role="listitem">
                <Badge variant={chipVariant} size={chipSize} className="flex items-center pr-1 rtl:pr-2 rtl:pl-1">
                  <span>{tag}</span>
                  {!disabled && (
                    <button
                      type="button"
                      aria-label={removeLabel(tag)}
                      onClick={() => removeTag(index)}
                      className="ml-1 rtl:mr-1 rtl:ml-0 rounded-full outline-none focus:ring-2 focus:ring-ring hover:bg-black/10 dark:hover:bg-white/20 p-0.5 transition-colors"
                    >
                      <Cancel01Stroke className="w-3 h-3" aria-hidden="true" />
                    </button>
                  )}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <input
          {...props}
          ref={inputRef}
          type="text"
          value={draft}
          disabled={disabled}
          aria-required={required || undefined}
          placeholder={tags.length === 0 ? placeholder : undefined}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="flex-1 bg-transparent border-none outline-none min-w-[120px] text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>

      {error && errorMessage && (
        <p className="text-[0.8rem] font-medium text-destructive">{errorMessage}</p>
      )}
      {!error && helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}
