import { DocsLayout } from "@/components/docs/docs-layout"
import { IconsGallery } from "@/components/docs/icons-gallery"

export const metadata = {
  title: "Icons Gallery",
  description: "Browse and search through 8,753+ Hugeicons provided by Saudi NDS UI.",
}

export default function IconsPage() {
  return (
    <DocsLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight m-0">Icons Gallery</h1>
        <p className="text-lg text-muted-foreground m-0">
          Browse through 8,753+ premium SVG icons from Hugeicons. Click any icon to copy its React import code.
        </p>
      </div>

      <IconsGallery />
    </DocsLayout>
  )
}
