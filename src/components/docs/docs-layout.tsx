"use client"

import { useEffect, useState } from "react"

import { getUIComponents } from "@/lib/get-components"
import { DocsShell } from "@/components/docs/docs-shell"

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const components = getUIComponents()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const match = document.cookie.match(/sidebar:open=([^;]+)/)
    setSidebarOpen(match?.[1] !== "false")
  }, [])

  return (
    <DocsShell components={components} sidebarDefaultOpen={sidebarOpen}>
      {children}
    </DocsShell>
  )
}
