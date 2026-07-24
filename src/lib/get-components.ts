/**
 * Discovers the list of UI components shown in the sidebar.
 *
 * A component appears iff BOTH exist:
 *   - `registry/dga/ui/<slug>.tsx`
 *   - a docs page at `src/pages/<slug>/page.{mdx,tsx}`
 * and `<slug>` is not in the `ignored` list.
 *
 * Vite replacement for the previous Node `fs` version. Uses `import.meta.glob`
 * with no `eager` flag, so only the file KEYS are read — module bodies are not
 * loaded. This stays cheap and runs at module-eval time.
 */
const ignored = ["_registry", "sidebar", "sheet", "direction", "utils"]

const registrySlugs = Object.keys(
  import.meta.glob("/registry/dga/ui/*.tsx")
).map((file) => file.split("/").pop()!.replace(".tsx", ""))

const pageSlugs = new Set(
  Object.keys(import.meta.glob("/src/pages/**/page.{mdx,tsx}"))
    .map((file) => file.replace("/src/pages/", "").split("/")[0])
)

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export function getUIComponents() {
  return registrySlugs
    .filter((slug) => !ignored.includes(slug) && pageSlugs.has(slug))
    .map((slug) => ({ slug, name: titleCase(slug) }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
