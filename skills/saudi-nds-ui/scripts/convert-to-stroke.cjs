const fs = require("fs");
const path = require("path");

// Load the live exports of the icon library to verify matching Stroke icons
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

console.log("Scanning directory to revert to Stroke icons:", srcDir);

walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");

  // Find imports from @aboalrejal/nds-icons
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']@aboalrejal\/nds-icons["']/g;

  let match;
  let replacements = [];

  while ((match = importRegex.exec(content)) !== null) {
    const importedText = match[1];
    const imports = importedText
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    for (const imp of imports) {
      const parts = imp.split(/\s+as\s+/i);
      const iconName = parts[0].trim();

      if (iconName.endsWith("Solid")) {
        const strokeName = iconName.slice(0, -5) + "Stroke";
        if (validIcons.has(strokeName)) {
          replacements.push({ solid: iconName, stroke: strokeName });
        } else {
          console.warn(
            `[WARN] Corresponding Stroke icon not found for "${iconName}" in ${path.relative(srcDir, filePath)}`,
          );
        }
      }
    }
  }

  if (replacements.length > 0) {
    let fileChanged = false;
    // Sort replacements by length descending
    replacements.sort((a, b) => b.solid.length - a.solid.length);

    // De-duplicate replacements
    const uniqueReplacements = [];
    const seen = new Set();
    for (const r of replacements) {
      if (!seen.has(r.solid)) {
        seen.add(r.solid);
        uniqueReplacements.push(r);
      }
    }

    for (const r of uniqueReplacements) {
      // Replaces all exact word matches of the icon name (import and usage)
      const escapedSolid = r.solid.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const solidRegex = new RegExp(`\\b${escapedSolid}\\b`, "g");

      const count = (content.match(solidRegex) || []).length;
      if (count > 0) {
        content = content.replace(solidRegex, r.stroke);
        console.log(`  [REPLACE] ${r.solid} -> ${r.stroke} (${count} occurrences)`);
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
console.log(`Reversion to Stroke completed:`);
console.log(`- Files updated: ${filesUpdated}`);
console.log(`- Total icons replaced: ${totalReplacements}`);
console.log(`======================================`);
