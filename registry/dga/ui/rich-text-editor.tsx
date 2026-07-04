"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/dga/ui/button"
import {
  TextBoldStroke,
  TextItalicStroke,
  TextStrikethroughStroke,
  LeftToRightListBulletStroke,
  LeftToRightListNumberStroke,
  QuotesStroke,
  UndoStroke,
  RedoStroke,
} from "@/components/icons"

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something amazing...",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md rounded-t-none border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-muted-foreground",
      },
    },
  })

  // Set up an effect to sync the external value with the editor content
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const { from, to } = editor.state.selection
      editor.commands.setContent(value, { emitUpdate: false })
      editor.commands.setTextSelection({ from, to })
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 border-input bg-muted/50 p-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bold") && "bg-muted text-foreground font-bold"
          )}
        >
          <TextBoldStroke className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("italic") && "bg-muted text-foreground font-bold"
          )}
        >
          <TextItalicStroke className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("strike") && "bg-muted text-foreground font-bold"
          )}
        >
          <TextStrikethroughStroke className="h-4 w-4" />
        </Button>

        <div className="w-[1px] h-4 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "h-8 px-2 text-xs font-semibold",
            editor.isActive("heading", { level: 1 }) && "bg-muted text-foreground"
          )}
        >
          H1
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "h-8 px-2 text-xs font-semibold",
            editor.isActive("heading", { level: 2 }) && "bg-muted text-foreground"
          )}
        >
          H2
        </Button>

        <div className="w-[1px] h-4 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bulletList") && "bg-muted text-foreground"
          )}
        >
          <LeftToRightListBulletStroke className="h-4 w-4 rtl:rotate-180" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("orderedList") && "bg-muted text-foreground"
          )}
        >
          <LeftToRightListNumberStroke className="h-4 w-4 rtl:rotate-180" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("blockquote") && "bg-muted text-foreground"
          )}
        >
          <QuotesStroke className="h-4 w-4 rtl:rotate-180" />
        </Button>

        <div className="w-[1px] h-4 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
        >
          <UndoStroke className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
        >
          <RedoStroke className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
