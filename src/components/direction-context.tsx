"use client"

import * as React from "react"

import { DirectionProvider } from "@/registry/dga/ui/direction"

type Dir = "rtl" | "ltr"

interface DirectionContextValue {
  direction: Dir
  setDirection: (dir: Dir) => void
}

const DirectionContext = React.createContext<DirectionContextValue>({
  direction: "rtl",
  setDirection: () => {},
})

function AppDirectionProvider({
  defaultDirection,
  children,
}: {
  defaultDirection?: Dir
  children: React.ReactNode
}) {
  const [direction, setDirection] = React.useState<Dir>(() => {
    if (defaultDirection) return defaultDirection
    // Derive from the <html> dir the I18nProvider already set, else default rtl.
    if (typeof document !== "undefined") {
      return document.documentElement.dir === "ltr" ? "ltr" : "rtl"
    }
    return "rtl"
  })

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction)
    document.documentElement.setAttribute(
      "lang",
      direction === "rtl" ? "ar" : "en"
    )
  }, [direction])

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      <DirectionProvider dir={direction} direction={direction}>
        {children}
      </DirectionProvider>
    </DirectionContext.Provider>
  )
}

function useAppDirection() {
  const ctx = React.useContext(DirectionContext)
  if (!ctx) {
    throw new Error("useAppDirection must be used within AppDirectionProvider")
  }
  return ctx
}

export { AppDirectionProvider, useAppDirection }
