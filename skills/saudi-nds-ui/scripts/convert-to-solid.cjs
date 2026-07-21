const fs = require("fs");
const path = require("path");

// Load the live exports of the icon library to verify matching Solid icons
let ndsIcons;
try {
  // Use resolve from the workspace root node_modules
  const workspaceRoot = path.resolve(__dirname, "../../../..");
  const ndsIconsPath = require.resolve("@aboalrejal/nds-icons", { paths: [workspaceRoot] });
  ndsIcons = require(ndsIconsPath);
} catch (e) {
  console.error("Error loading @aboalrejal/nds-icons package:", e.message);
  process.exit(1);
}

const validIcons = new Set(Object.keys(ndsIcons));
const srcDir = path.resolve(__dirname, "../../../../src");

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (stat.isFile() && (file.endsWith(".tsx") || file.endsWith(".ts"))) {
      callback(filePath);
    }
  }
}

let filesUpdated = 0;
let totalReplacements = 0;

console.log("Scanning directory:", srcDir);

walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");

  // Find imports from @aboalrejal/nds-icons
  // RegEx matches: import { ... } from "@aboalrejal/nds-icons"
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']@aboalrejal\/nds-icons["']/g;

  let match;
  let replacements = [];

  while ((match = importRegex.exec(content)) !== null) {
    const importedText = match[1];
    // Split by comma and clean whitespace and aliases (e.g. Search01Stroke as Search)
    const imports = importedText
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    for (const imp of imports) {
      // Handle imports with alias: e.g. "Search01Stroke as Search"
      const parts = imp.split(/\s+as\s+/i);
      const iconName = parts[0].trim();

      if (iconName.endsWith("Stroke")) {
        const solidName = iconName.slice(0, -6) + "Solid";
        if (validIcons.has(solidName)) {
          replacements.push({ stroke: iconName, solid: solidName });
        } else {
          console.warn(
            `[WARN] Corresponding Solid icon not found for "${iconName}" in ${path.relative(srcDir, filePath)}`,
          );
        }
      } else if (iconName.endsWith("Stroke'")) {
        // Cleaning potential trailing characters
        const cleanName = iconName.replace(/['"]+/g, "");
        if (cleanName.endsWith("Stroke")) {
          const solidName = cleanName.slice(0, -6) + "Solid";
          if (validIcons.has(solidName)) {
            replacements.push({ stroke: cleanName, solid: solidName });
          }
        }
      }
    }
  }

  if (replacements.length > 0) {
    let fileChanged = false;
    // Sort replacements by length descending to prevent substring collisions (e.g., replacement of longer names first)
    replacements.sort((a, b) => b.stroke.length - a.stroke.length);

    // De-duplicate replacements
    const uniqueReplacements = [];
    const seen = new Set();
    for (const r of replacements) {
      if (!seen.has(r.stroke)) {
        seen.add(r.stroke);
        uniqueReplacements.push(r);
      }
    }

    for (const r of uniqueReplacements) {
      // Replaces all exact word matches of the icon name (import and usage)
      // We use a regex word boundary \b to prevent partial matching
      const escapedStroke = r.stroke.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const strokeRegex = new RegExp(`\\b${escapedStroke}\\b`, "g");

      const count = (content.match(strokeRegex) || []).length;
      if (count > 0) {
        content = content.replace(strokeRegex, r.solid);
        console.log(`  [REPLACE] ${r.stroke} -> ${r.solid} (${count} occurrences)`);
        totalReplacements += count;
        fileChanged = true;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content, "utf-8");
      filesUpdated++;
      console.log(`[UPDATED] ${path.relative(srcDir, filePath)}`);
    }
  }
});

console.log(`\n======================================`);
console.log(`Scan completed:`);
console.log(`- Files updated: ${filesUpdated}`);
console.log(`- Total icons replaced: ${totalReplacements}`);
console.log(`======================================`);
