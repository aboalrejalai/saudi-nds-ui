## Component: FILE-DROPZONE

DGA-approved **File Dropzone** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.

### Install

```bash
npx shadcn@latest add https://nds.aboalrejal.com/r/file-dropzone.json
```

**NPM dependencies:** `react-dropzone`, `@aboalrejal/nds-icons`

### Exports

`FileDropzone`

### Usage

```tsx
import { FileDropzone } from "@/components/ui/file-dropzone";

<FileDropzone>File Dropzone</FileDropzone>
```

### Source (`registry/dga/ui/file-dropzone.tsx`)

```tsx
"use client"

import * as React from "react"
import { useDropzone, DropzoneOptions } from "react-dropzone"
import { Upload01Stroke, File01Solid, Cancel01Stroke } from "@aboalrejal/nds-icons"
import { cn } from "@/lib/utils"

export interface FileDropzoneProps extends DropzoneOptions {
  className?: string
  value?: File[]
  onChange?: (files: File[]) => void
}

export function FileDropzone({
  className,
  value = [],
  onChange,
  ...dropzoneProps
}: FileDropzoneProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      onChange?.([...value, ...acceptedFiles])
    },
    [value, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...dropzoneProps,
  })

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:bg-muted/50 hover:border-muted-foreground/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Upload01Stroke className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag & drop files here, or click to select"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports any file format up to 10MB
        </p>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <File01Solid className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-[400px]">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-destructive"
              >
                <Cancel01Stroke className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---
