import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@mdx-js/rollup"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const plugins = [
  react(),
  tailwindcss(),
  mdx({ providerImportSource: "@mdx-js/react" }),
]

// https://vite.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: [
      // Order matters: the more specific "@/registry" must come before "@".
      { find: "@/registry", replacement: path.resolve(__dirname, "registry") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
})
