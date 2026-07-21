import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirArg = process.argv[2];

if (!targetDirArg) {
  console.log("Error: Please specify the target directory to analyze.");
  console.log("Usage: node analyze-migration.js <path-to-project>");
  process.exit(1);
}

const targetPath = path.resolve(targetDirArg);
if (!fs.existsSync(targetPath)) {
  console.error(`Error: Target directory does not exist: ${targetPath}`);
  process.exit(1);
}

const guidePath = path.join(__dirname, "../references/components-guide.md");
if (!fs.existsSync(guidePath)) {
  console.error(`Error: Components guide not found at: ${guidePath}`);
  process.exit(1);
}

// 1. Load the 56 DGA components from guide
const guideContent = fs.readFileSync(guidePath, "utf-8");
const dgaComponents = new Set();
const headerRegex = /## Component:\s*([A-Z0-9_-]+)/g;
let headerMatch;
while ((headerMatch = headerRegex.exec(guideContent)) !== null) {
  dgaComponents.add(headerMatch[1].toLowerCase());
}

console.log(`Loaded ${dgaComponents.size} DGA components from registry mapping.`);

// 2. Scan project files recursively
const walkDir = (dir, callback) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip common dependencies and build folders
      if (["node_modules", ".git", ".next", "dist", "build", "out", "skills"].includes(file)) {
        continue;
      }
      walkDir(filePath, callback);
    } else if (stat.isFile() && /\.(tsx|jsx|ts|js)$/.test(file)) {
      callback(filePath);
    }
  }
};

const scanResults = {
  typeA: [], // Matches DGA
  typeB: [], // Non-NDS with DGA replacement available
  typeC: [], // Custom component (no DGA equivalent)
};

// Tracks unique components found per category
const detectedDga = new Map(); // name -> occurrences
const detectedNonDgaWithRepl = new Map(); // name -> suggestions
const detectedCustom = new Set();

const rawHtmlReplacements = {
  button: "button",
  input: "input",
  select: "select",
  table: "table",
  textarea: "textarea",
};

const fileCount = { total: 0, scanned: 0 };

walkDir(targetPath, (filePath) => {
  fileCount.scanned++;
  const code = fs.readFileSync(filePath, "utf-8");
  const lines = code.split("\n");

  // Detect imports
  const importLines = lines.filter((l) => l.includes("import ") && l.includes("from "));

  // Simple JSX Tag Extractor (finds capitalised JSX elements like <Button or <Tabs)
  const jsxTagRegex = /<([A-Z][a-zA-Z0-9]*)\b/g;
  let match;
  const tagsInFile = new Set();
  while ((match = jsxTagRegex.exec(code)) !== null) {
    tagsInFile.add(match[1]);
  }

  // Detect raw HTML tags
  for (const [tag, comp] of Object.entries(rawHtmlReplacements)) {
    const rawTagRegex = new RegExp(`<${tag}\\b`, "g");
    if (rawTagRegex.test(code)) {
      const key = `Raw HTML <${tag}>`;
      detectedNonDgaWithRepl.set(key, comp);
      scanResults.typeB.push({
        file: path.relative(targetPath, filePath),
        component: key,
        suggestion: `Replace with DGA component: <${comp.charAt(0).toUpperCase() + comp.slice(1)}>`,
      });
    }
  }

  // Analyze JSX tags
  tagsInFile.forEach((tag) => {
    const lowercaseTag = tag.toLowerCase();

    // Check if tag matches a DGA component name
    if (dgaComponents.has(lowercaseTag)) {
      // Check if it is imported from DGA registry or UI components
      const isDgaImport = importLines.some(
        (line) =>
          line.includes(tag) &&
          (line.includes("@/components/ui") ||
            line.includes("@dga") ||
            line.includes("platformscode-new-react")),
      );

      if (isDgaImport) {
        detectedDga.set(tag, (detectedDga.get(tag) || 0) + 1);
        scanResults.typeA.push({
          file: path.relative(targetPath, filePath),
          component: tag,
          path: `@/components/ui/${lowercaseTag}`,
        });
      } else {
        detectedNonDgaWithRepl.set(tag, lowercaseTag);
        scanResults.typeB.push({
          file: path.relative(targetPath, filePath),
          component: tag,
          suggestion: `Migrate to DGA Registry: Run \`npx shadcn@latest add https://nds.aboalrejal.com/r/${lowercaseTag}.json\``,
        });
      }
    } else {
      // It's a custom/specialized component (like Chart, Layout, or custom business logic)
      // Check if it is a local helper or third party library components (skip typical React router / context / icons)
      if (
        ![
          "Fragment",
          "Suspense",
          "Link",
          "Route",
          "Routes",
          "Provider",
          "Icon",
          "HugeiconsIcon",
          "Image",
        ].includes(tag) &&
        !tag.endsWith("Provider") &&
        !tag.endsWith("Context")
      ) {
        detectedCustom.add(tag);
        scanResults.typeC.push({
          file: path.relative(targetPath, filePath),
          component: tag,
        });
      }
    }
  });
});

// 3. Generate Markdown Report
const reportPath = path.join(targetPath, "migration-report.md");
let reportContent = `# Saudi DGA Registry Migration & Compatibility Report

This report analyzes the UI components used in your codebase and identifies DGA registry replacements to assist with your migration to the Saudi National Design System (NDS).

* **Scan Location:** \`${targetPath}\`
* **Scanned Files:** ${fileCount.scanned} files (.tsx, .jsx, .ts, .js)
* **DGA Registry Coverage:** ${dgaComponents.size} available components

---

## Migration Summary

| Component Classification | Unique Count | Action Required |
| --- | --- | --- |
| **Type A: Compatible DGA Components** | ${detectedDga.size} | No action. Already matches NDS registry standards. |
| **Type B: DGA Replacements Available** | ${detectedNonDgaWithRepl.size} | Replace with NDS equivalents. |
| **Type C: Custom/Specialized Components** | ${detectedCustom.size} | Review. No direct DGA equivalent exists. |

---

## Detailed Findings

### Type B: DGA Replacements Available (${detectedNonDgaWithRepl.size})
These components are currently implemented using standard elements or other libraries, but can be easily replaced with DGA Registry components:

| Current Element/Component | DGA Registry Equivalent | Recommended Command / Action |
| --- | --- | --- |
`;

if (detectedNonDgaWithRepl.size === 0) {
  reportContent += `| None | - | No replacements needed! |\n`;
} else {
  detectedNonDgaWithRepl.forEach((dgaName, current) => {
    if (current.startsWith("Raw HTML")) {
      const cleanHtml = current.replace("Raw HTML <", "").replace(">", "");
      reportContent += `| \`<${cleanHtml}>\` (Raw HTML) | \`${dgaName.toUpperCase()}\` | Install and replace with DGA Component: \`npx shadcn@latest add https://nds.aboalrejal.com/r/${dgaName}.json\` |\n`;
    } else {
      reportContent += `| \`<${current}>\` | \`${dgaName.toUpperCase()}\` | Run: \`npx shadcn@latest add https://nds.aboalrejal.com/r/${dgaName}.json\` |\n`;
    }
  });
}

reportContent += `
---

### Type A: Active DGA Components (${detectedDga.size})
These components are already successfully configured and using the DGA Registry:

| DGA Component | Scanned Occurrences | Resolved Path |
| --- | --- | --- |
`;

if (detectedDga.size === 0) {
  reportContent += `| None | 0 | - |\n`;
} else {
  detectedDga.forEach((count, name) => {
    reportContent += `| \`${name}\` | ${count} | \`@/components/ui/${name.toLowerCase()}\` |\n`;
  });
}

reportContent += `
---

### Type C: Custom/Specialized Components (${detectedCustom.size})
These elements have no direct equivalents in the 56 DGA components. Review if they require custom wrappers or custom styles to match the Saudi NDS theme:

| Custom Component Tag | Found in Files |
| --- | --- |
`;

if (detectedCustom.size === 0) {
  reportContent += `| None | - |\n`;
} else {
  detectedCustom.forEach((tag) => {
    const filesUsing = scanResults.typeC.filter((r) => r.component === tag).map((r) => r.file);
    const uniqueFiles = [...new Set(filesUsing)].slice(0, 3).join(", ");
    const countText = filesUsing.length > 3 ? ` (+${filesUsing.length - 3} more)` : "";
    reportContent += `| \`<${tag}>\` | \`${uniqueFiles}${countText}\` |\n`;
  });
}

reportContent += `
---

## Next Steps for Migration
1. Set up DGA registry settings in your project's \`components.json\` (refer to the dga-registry skill \`SKILL.md\`).
2. Run the recommended \`npx\` installation commands listed in the **Type B** section.
3. Replace the old import declarations with DGA imports (e.g. \`import { Button } from "@/components/ui/button"\`).
4. Run \`node skills/saudi-nds-ui/scripts/audit-page.js <filename>\` to verify alignment and accessibility of your updated pages.
`;

fs.writeFileSync(reportPath, reportContent, "utf-8");

console.log(`\n==========================================`);
console.log(`Migration analysis completed successfully!`);
console.log(`Report generated at: ${reportPath}`);
console.log(`==========================================\n`);
console.log(`Stats:`);
console.log(`- Type A (NDS Compliant): ${detectedDga.size} components`);
console.log(`- Type B (DGA Replacements Available): ${detectedNonDgaWithRepl.size} components`);
console.log(`- Type C (Custom components): ${detectedCustom.size} components`);
console.log(`- Scanned files: ${fileCount.scanned}`);
