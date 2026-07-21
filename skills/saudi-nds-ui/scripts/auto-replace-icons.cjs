const fs = require("fs");
const path = require("path");

// Helper to recursively get all .ts and .tsx files
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const srcDir = path.resolve(process.cwd(), "src");
if (!fs.existsSync(srcDir)) {
  console.error(`Error: Could not find src directory at ${srcDir}`);
  process.exit(1);
}

const files = getFiles(srcDir);

let filesModified = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  let originalContent = content;

  // 1. Find all HugeiconsIcon tags and replace them with <IconNameStroke />
  // Example: <HugeiconsIcon icon={Analytics01Icon} className="w-5" /> -> <Analytics01Stroke className="w-5" />
  // Example: <HugeiconsIcon icon={ArrowDown01Icon} /> -> <ArrowDown01Stroke />

  // Note: Some might be spread across multiple lines.
  const tagRegex = /<HugeiconsIcon\s+icon=\{([a-zA-Z0-9_]+)Icon\}([\s\S]*?)\/>/g;

  const extractedIcons = new Set();

  content = content.replace(tagRegex, (match, iconName, attributes) => {
    extractedIcons.add(`${iconName}Stroke`);
    return `<${iconName}Stroke${attributes}/>`;
  });

  // Also replace any standalone usages of the icons (e.g. in arrays or objects like in app-sidebar.tsx)
  // For example: icon: Analytics01Icon, -> icon: Analytics01Stroke,
  const standaloneRegex = /([a-zA-Z0-9_]+)Icon/g;
  content = content.replace(standaloneRegex, (match, iconName) => {
    // Only replace if it was imported from hugeicons (we'll check imports later, but let's just replace all *Icon if they match)
    // Wait, some might be Lucide icons or other stuff? We don't have lucide anymore.
    // Better to only replace if they were imported. Let's gather imports first.
    return `${iconName}Stroke`; // We'll just aggressively replace *Icon with *Stroke in the file if it's related to hugeicons.
  });

  // Let's refine the standalone replacement.
  // First, find all imports from hugeicons
  const hugeiconsImportRegex =
    /import\s+\{([^}]+)\}\s+from\s+['"]@hugeicons\/(core-free-icons|react)['"]/g;
  const importedIcons = new Set();
  let match;
  while ((match = hugeiconsImportRegex.exec(originalContent)) !== null) {
    const imports = match[1]
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i && i !== "HugeiconsIcon" && i !== "type IconSvgElement");
    imports.forEach((i) => {
      const baseName = i.replace(/Icon$/, "");
      importedIcons.add(baseName);
    });
  }

  if (importedIcons.size > 0 || extractedIcons.size > 0) {
    // Collect all unique icons to import from nds-icons
    const allNdsIcons = new Set([...extractedIcons]);
    importedIcons.forEach((baseName) => allNdsIcons.add(`${baseName}Stroke`));

    // Remove hugeicons imports
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]@hugeicons\/(core-free-icons|react)['"];?\n?/g,
      "",
    );

    // Add to nds-icons import
    const ndsImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@aboalrejal\/nds-icons['"]/g;
    let existingNdsImports = new Set();

    // Check if nds-icons already exists
    if (ndsImportRegex.test(content)) {
      content = content.replace(ndsImportRegex, (match, existingImportsStr) => {
        const existingImports = existingImportsStr
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
        existingImports.forEach((i) => existingNdsImports.add(i));
        return ""; // Remove it temporarily
      });
    }

    allNdsIcons.forEach((i) => existingNdsImports.add(i));

    if (existingNdsImports.size > 0) {
      const newImport = `import { ${Array.from(existingNdsImports).join(", ")} } from "@aboalrejal/nds-icons"\n`;
      // Insert at the top of the file after the first import or at line 1
      const firstImportIndex = content.indexOf("import ");
      if (firstImportIndex !== -1) {
        content = content.slice(0, firstImportIndex) + newImport + content.slice(firstImportIndex);
      } else {
        content = newImport + content;
      }
    }

    // Now safely replace standalone instances of the imported icons
    importedIcons.forEach((baseName) => {
      const regex = new RegExp(`\\b${baseName}Icon\\b`, "g");
      content = content.replace(regex, `${baseName}Stroke`);
    });

    if (content !== originalContent) {
      fs.writeFileSync(file, content, "utf-8");
      console.log(`✅ Updated ${path.relative(process.cwd(), file)}`);
      filesModified++;
    }
  }
});

console.log(`\n🎉 Successfully modified ${filesModified} files.`);
