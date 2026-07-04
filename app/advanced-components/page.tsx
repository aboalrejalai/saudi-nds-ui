"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"

// Import our 5 new advanced components
import { DataTable } from "@/registry/dga/ui/data-table"
import { TreeView, TreeDataItem } from "@/registry/dga/ui/tree-view"
import { MultiSelect, MultiSelectOption } from "@/registry/dga/ui/multi-select"
import { FileDropzone } from "@/registry/dga/ui/file-dropzone"
import { RichTextEditor } from "@/registry/dga/ui/rich-text-editor"

// --- Dummy Data for DataTable ---
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
const tableColumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "amount", header: "Amount" },
]
const tableData: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@gmail.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@gmail.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@gmail.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com" },
]

// --- Dummy Data for TreeView ---
const treeData: TreeDataItem[] = [
  {
    id: "1",
    name: "src",
    children: [
      { id: "2", name: "app", children: [{ id: "3", name: "page.tsx" }, { id: "4", name: "layout.tsx" }] },
      { id: "5", name: "components", children: [{ id: "6", name: "ui" }, { id: "7", name: "icons.tsx" }] },
    ],
  },
  {
    id: "8",
    name: "public",
    children: [{ id: "9", name: "favicon.ico" }, { id: "10", name: "vercel.svg" }],
  },
  { id: "11", name: "package.json" },
]

// --- Dummy Data for MultiSelect ---
const selectOptions: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "typescript", label: "TypeScript" },
  { value: "node", label: "Node.js" },
]

export default function AdvancedComponentsTestPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["react", "tailwind"])
  const [files, setFiles] = useState<File[]>([])
  const [richText, setRichText] = useState("<h2>Hello World!</h2><p>This is a <strong>rich text editor</strong> built with Tiptap.</p>")

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Phase 2: Advanced Composite Components</h1>
        <p className="text-muted-foreground">
          The final 5 components making our NDS UI library complete for any dashboard.
        </p>
      </div>

      {/* 1. DataTable */}
      <Card>
        <CardHeader>
          <CardTitle>1. Advanced Data Table</CardTitle>
          <CardDescription>Powered by @tanstack/react-table</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={tableColumns} data={tableData} />
        </CardContent>
      </Card>

      {/* 2. TreeView */}
      <Card>
        <CardHeader>
          <CardTitle>2. Tree View</CardTitle>
          <CardDescription>Recursive hierarchical list</CardDescription>
        </CardHeader>
        <CardContent>
          <TreeView data={treeData} defaultExpandedIds={["1", "2", "5"]} className="max-w-sm" />
        </CardContent>
      </Card>

      {/* 3. MultiSelect */}
      <Card>
        <CardHeader>
          <CardTitle>3. Multi-Select Combobox</CardTitle>
          <CardDescription>Combining Command and Badge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm">
            <MultiSelect
              options={selectOptions}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select frameworks..."
            />
          </div>
        </CardContent>
      </Card>

      {/* 4. Advanced Dropzone */}
      <Card>
        <CardHeader>
          <CardTitle>4. Advanced File Dropzone</CardTitle>
          <CardDescription>Powered by react-dropzone with preview states</CardDescription>
        </CardHeader>
        <CardContent>
          <FileDropzone value={files} onChange={setFiles} maxFiles={5} />
        </CardContent>
      </Card>

      {/* 5. Rich Text Editor */}
      <Card>
        <CardHeader>
          <CardTitle>5. Rich Text Editor</CardTitle>
          <CardDescription>Powered by @tiptap/react</CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor value={richText} onChange={setRichText} />
          
          <div className="mt-4 p-4 bg-muted/50 rounded-md border text-xs font-mono overflow-auto max-h-32">
            <strong>Output HTML:</strong>
            <br />
            {richText}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
