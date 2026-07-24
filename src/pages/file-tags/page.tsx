"use client";

import React, { useState } from "react"
import { FileUpload, type UploadFile } from "@/registry/dga/ui/file-upload"
import { TagInput } from "@/registry/dga/ui/tag-input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"

export default function FileUploadAndTagInputTestPage() {
  // File Upload State
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: "1",
      file: new File(["hello"], "document.pdf", { type: "application/pdf" }),
      status: "success",
    },
    {
      id: "2",
      file: new File(["hello"], "image.png", { type: "image/png" }),
      status: "error",
      error: "File is too large",
    },
  ])

  // Tag Input State
  const [tags, setTags] = useState<string[]>(["React", "Next.js", "Tailwind CSS"])

  // Handlers for File Upload
  const handleFilesAdded = (acceptedFiles: File[]) => {
    const newUploads: UploadFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading",
      progress: 0,
    }))
    
    setFiles((prev) => [...prev, ...newUploads])

    // Simulate upload progress
    newUploads.forEach((upload) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setFiles((prev) =>
          prev.map((f) =>
            f.id === upload.id ? { ...f, progress } : f
          )
        )
        if (progress >= 100) {
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) =>
              f.id === upload.id ? { ...f, status: "success" } : f
            )
          )
        }
      }, 300)
    })
  }

  const handleFilesRejected = (rejections: any[]) => {
    console.error("Rejected files:", rejections)
  }

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Form Controls</h1>
        <p className="text-muted-foreground">
          FileUpload and TagInput components reverse engineered from dev-dga-main.
        </p>
      </div>

      {/* --- FILE UPLOAD COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload (رفع الملفات)</CardTitle>
          <CardDescription>Drag and drop functionality with progress and status tracking.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <FileUpload
            label="Upload your documents"
            helperText="Maximum size 5MB. Allowed formats: PDF, PNG, JPG"
            files={files}
            onFilesAdded={handleFilesAdded}
            onFilesRejected={handleFilesRejected}
            onRemove={handleRemoveFile}
            accept=".pdf,image/*"
            maxSize={5 * 1024 * 1024}
            maxFiles={5}
            multiple
          />

        </CardContent>
      </Card>

      {/* --- TAG INPUT COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Tag Input (إدخال الوسوم)</CardTitle>
          <CardDescription>Type a tag and press Enter or Comma to add it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="max-w-md">
            <TagInput
              label="Technologies"
              placeholder="e.g. JavaScript, Python..."
              helperText="Press Enter to add a tag. Duplicates are not allowed."
              value={tags}
              onChange={setTags}
              allowDuplicates={false}
              max={10}
            />
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
