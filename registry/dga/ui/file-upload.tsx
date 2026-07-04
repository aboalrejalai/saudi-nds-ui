"use client";

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/dga/ui/button"
import { Progress } from "@/registry/dga/ui/progress"
import { Upload01Stroke, CheckmarkBadge01Solid, Alert01Solid, Cancel01Stroke } from "@/components/icons"

type FileStatus = "pending" | "uploading" | "success" | "error"
type RejectionCode = "file-too-large" | "file-invalid-type" | "too-many-files"

export interface UploadFile {
  id: string
  file: File
  status?: FileStatus
  progress?: number
  error?: string
}

export interface FileRejection {
  file: File
  errors: RejectionCode[]
}

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  files: UploadFile[]
  onFilesAdded: (accepted: File[]) => void
  onFilesRejected?: (rejections: FileRejection[]) => void
  onRemove?: (id: string) => void
  accept?: string
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: React.ReactNode
  error?: boolean
  hint?: React.ReactNode
  removeLabel?: string
}

function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()

  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token)
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, token.indexOf("/") + 1))
    return type === token
  })
}

function splitFiles(
  incoming: File[],
  config: { accept?: string; maxSize?: number; maxFiles?: number; currentCount: number }
) {
  const { accept, maxSize, maxFiles, currentCount } = config
  const accepted: File[] = []
  const rejections: FileRejection[] = []

  for (const file of incoming) {
    const errors: RejectionCode[] = []
    if (!matchesAccept(file, accept)) errors.push("file-invalid-type")
    if (maxSize != null && file.size > maxSize) errors.push("file-too-large")

    if (errors.length > 0) {
      rejections.push({ file, errors })
      continue
    }

    if (maxFiles != null && currentCount + accepted.length >= maxFiles) {
      rejections.push({ file, errors: ["too-many-files"] })
      continue
    }
    accepted.push(file)
  }

  return { accepted, rejections }
}

const UNITS = ["B", "KB", "MB", "GB", "TB"] as const
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1)
  const value = bytes / 1024 ** exponent
  return `${exponent === 0 ? value : value.toFixed(1)} ${UNITS[exponent]}`
}

export function FileUpload({
  files,
  onFilesAdded,
  onFilesRejected,
  onRemove,
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled = false,
  required,
  label,
  helperText,
  errorMessage,
  error,
  hint = "Drag files here, or click to browse",
  removeLabel = "Remove",
  className,
  id,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const effectiveMaxFiles = multiple ? maxFiles : 1

  function process(incoming: File[]) {
    if (disabled || incoming.length === 0) return
    const { accepted, rejections } = splitFiles(incoming, {
      accept,
      maxSize,
      maxFiles: effectiveMaxFiles,
      currentCount: files.length,
    })
    if (accepted.length > 0) onFilesAdded(accepted)
    if (rejections.length > 0) onFilesRejected?.(rejections)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    process(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return
    process(Array.from(event.dataTransfer.files))
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false)
    }
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div
        data-dragging={isDragging || undefined}
        aria-disabled={disabled || undefined}
        onClick={() => {
          if (!disabled) inputRef.current?.click()
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors relative bg-muted/20 hover:bg-muted/50",
          error && "border-destructive/50 bg-destructive/5",
          isDragging && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed hover:bg-muted/20"
        )}
      >
        <Upload01Stroke className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm text-muted-foreground text-center font-medium">{hint}</span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          onChange={handleInputChange}
          onClick={(event) => event.stopPropagation()}
        />
      </div>

      {error && errorMessage && (
        <p className="text-[0.8rem] font-medium text-destructive">{errorMessage}</p>
      )}
      {!error && helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {files.map((item) => {
            const status = item.status ?? "pending"
            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-4 p-4 border rounded-lg bg-card text-sm relative overflow-hidden",
                  status === "error" && "border-destructive/50 bg-destructive/5"
                )}
              >
                <span className="flex-shrink-0" aria-hidden="true">
                  {status === "success" ? (
                    <CheckmarkBadge01Solid className="w-6 h-6 text-emerald-500" />
                  ) : status === "error" ? (
                    <Alert01Solid className="w-6 h-6 text-destructive" />
                  ) : (
                    <Upload01Stroke className="w-6 h-6 text-muted-foreground" />
                  )}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium truncate" title={item.file.name}>
                      {item.file.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                      {formatBytes(item.file.size)}
                    </span>
                  </div>

                  {status === "uploading" && (
                    <Progress
                      value={item.progress ?? 0}
                      className="h-1.5 mt-2"
                    />
                  )}

                  {status === "error" && item.error && (
                    <span role="alert" className="text-xs text-destructive mt-1 block font-medium">
                      {item.error}
                    </span>
                  )}
                </div>

                {onRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 w-8 h-8 rounded-full"
                    aria-label={`${removeLabel}: ${item.file.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    <Cancel01Stroke className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
