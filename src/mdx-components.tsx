import type { MDXComponents } from "mdx/types"

/**
 * MDX component overrides used by every page.
 *
 * NOTE: The previous `stripWhitespace` hack existed to work around the Rust
 * `mdxRs` compiler injecting whitespace text nodes between table elements
 * (a Next.js-specific quirk). Under `@mdx-js/rollup` (the standard JS
 * compiler) this does not happen, so the hack is removed. If tables ever
 * mis-render, re-introduce a Children.toArray filter on table/thead/tbody/tr.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ms-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ms-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-black/10 px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg border bg-zinc-950 p-4 text-sm text-zinc-50 dark:bg-zinc-900">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-border my-8" />,
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="border-border bg-muted/50 border px-4 py-2 text-start font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-border border px-4 py-2">{children}</td>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-border my-4 border-s-4 ps-4 italic">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-primary font-medium underline underline-offset-4"
      >
        {children}
      </a>
    ),
    ...components,
  }
}
