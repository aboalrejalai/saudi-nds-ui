"use client"

import React from "react"
import { 
  IconCopy, 
  IconMarkdown, 
  IconBrandOpenai, 
  IconSparkles, 
  IconCode, 
  IconExternalLink, 
  IconChevronDown,
  IconRobot,
  IconDownload
} from "@tabler/icons-react"
import { Button } from "@/registry/dga/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/dga/ui/dropdown-menu"
import { toast } from "sonner"

const markdownInstruction = `## Saudi NDS UI - AI Context

**System Role**: You are an AI agent operating within a codebase that uses the **Saudi NDS UI** component system (built on top of shadcn/ui and DGA Platforms Code).

**Primary Directives**:
1. **Never guess the API**: Always look up the component markdown file first (e.g., \`references/components/button.md\`).
2. **Follow Strict RTL**: Ensure all designs are fully RTL (Right-to-Left) compliant.
3. **Use Official Green**: Adhere strictly to the NDS green color tokens.
4. **Navigation Menu**: Always use \`<NavigationMenuTrigger>\` for top-level links to preserve the official bottom-border hover effect.

**Actions**: 
To view a component's documentation, read its specific file in the \`references/components/\` directory.`

export function SkillExportButtons() {
  const handleCopy = () => {
    navigator.clipboard.writeText(markdownInstruction)
    toast.success("Markdown instructions copied to clipboard!")
  }

  const handleOpenAi = (platform: string, url: string) => {
    handleCopy()
    toast.info(`Opening ${platform}... You can now Paste (Ctrl+V) the instructions in the chat.`)
    setTimeout(() => {
      window.open(url, "_blank")
    }, 1200)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handleCopy} className="gap-2 bg-background font-medium">
        <IconCopy size={16} />
        Copy Markdown
      </Button>

      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-muted/50 font-medium px-3">
            Open <IconChevronDown size={14} className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => {
             const blob = new Blob([markdownInstruction], { type: 'text/markdown' })
             const url = URL.createObjectURL(blob)
             window.open(url, "_blank")
          }} className="flex items-center gap-2 cursor-pointer">
            <IconMarkdown size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">View as Markdown</span>
            <IconExternalLink size={14} className="opacity-50" />
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleOpenAi('Gemini', 'https://gemini.google.com/app')} className="flex items-center gap-2 cursor-pointer">
            <IconSparkles size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">Open in Gemini</span>
            <IconExternalLink size={14} className="opacity-50" />
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleOpenAi('ChatGPT', 'https://chatgpt.com/')} className="flex items-center gap-2 cursor-pointer">
            <IconBrandOpenai size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">Open in ChatGPT</span>
            <IconExternalLink size={14} className="opacity-50" />
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleOpenAi('Claude', 'https://claude.ai/new')} className="flex items-center gap-2 cursor-pointer">
            <IconRobot size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">Open in Claude</span>
            <IconExternalLink size={14} className="opacity-50" />
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleOpenAi('Cursor', 'https://cursor.sh/')} className="flex items-center gap-2 cursor-pointer">
            <IconCode size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">Open in Cursor</span>
            <IconExternalLink size={14} className="opacity-50" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function SkillDownloadButton() {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 font-medium" variant="default">
          <IconDownload size={16} />
          Download
          <IconChevronDown size={14} className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
          <a href="/saudi-nds-ui.skill" download>
            <IconCode size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">.skill File</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
          <a href="/saudi-nds-ui-skill.zip" download>
            <IconDownload size={16} className="opacity-70" />
            <span className="flex-1 leading-none mt-0.5">.zip Archive</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
