import { Component, Suspense, lazy, useEffect, type ReactNode } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { MDXProvider } from "@mdx-js/react"

import { useMDXComponents } from "@/mdx-components"

const mdxPages = import.meta.glob("/src/pages/**/page.mdx")
const tsxPages = import.meta.glob("/src/pages/**/page.tsx")

type PageModule = {
  default: React.ComponentType
  metadata?: { title?: string }
}

function toPath(key: string): string {
  let rel = key.replace(/^\/src\/pages\//, "")
  rel = rel.replace(/(^|\/)page\.(mdx|tsx)$/, "")
  return rel === "" ? "/" : `/${rel}`
}

class PageError extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 16, color: "red", whiteSpace: "pre-wrap" }}>
          {String(this.state.error?.message || this.state.error)}
          {"\n\n"}
          {String((this.state.error as Error)?.stack || "")}
        </pre>
      )
    }
    return this.props.children
  }
}

function buildRoutes() {
  const list: { path: string; element: ReactNode }[] = []
  const make = (loader: () => Promise<PageModule>) => {
    const Lazy = lazy(async () => {
      const mod = await loader()
      const Inner = mod.default
      const Titled = function TitledPage() {
        const { pathname } = useLocation()
        useEffect(() => {
          document.title = mod.metadata?.title
            ? `${mod.metadata.title} — Saudi NDS UI`
            : "Saudi NDS UI — DGA Components"
        }, [pathname])
        return (
          <PageError key="inner">
            <Inner />
          </PageError>
        )
      }
      return { default: Titled }
    })
    return (
      <PageError>
        <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
          <Lazy />
        </Suspense>
      </PageError>
    )
  }

  for (const [key, loader] of Object.entries(mdxPages)) {
    list.push({ path: toPath(key), element: make(loader as () => Promise<PageModule>) })
  }
  for (const [key, loader] of Object.entries(tsxPages)) {
    list.push({ path: toPath(key), element: make(loader as () => Promise<PageModule>) })
  }
  list.sort((a, b) => b.path.length - a.path.length)
  return list
}

const routes = buildRoutes()

export default function App() {
  return (
    <MDXProvider components={useMDXComponents({})}>
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </MDXProvider>
  )
}
