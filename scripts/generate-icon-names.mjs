import fs from "fs"
import path from "path"

// Read icon names from ALL_ICONS.md
const mdPath = path.resolve(process.cwd(), "skills/saudi-nds-ui/references/ALL_ICONS.md")
const content = fs.readFileSync(mdPath, "utf-8")

const lines = content.split("\n")
const iconNames = []

for (const line of lines) {
  const trimmed = line.trim()
  if (trimmed.startsWith("- ")) {
    const name = trimmed.replace("- ", "").trim()
    if (name) {
      iconNames.push(name)
    }
  }
}

const targetPath = path.resolve(process.cwd(), "lib/icon-names.ts")
const fileContent = `// Automatically generated array of lightweight icon names
export const ALL_ICON_NAMES: string[] = ${JSON.stringify(iconNames, null, 2)}
`

fs.writeFileSync(targetPath, fileContent, "utf-8")
console.log(`Successfully generated lib/icon-names.ts with ${iconNames.length} icon names.`)
