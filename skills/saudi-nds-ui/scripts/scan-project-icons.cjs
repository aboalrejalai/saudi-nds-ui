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

const report = [];
let totalHugeicons = 0;
let totalNdsIcons = 0;

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const fileRelativePath = path.relative(process.cwd(), file);

  const hugeiconsMatches = [];
  const ndsIconsMatches = [];

  // Match import { ... } from "@hugeicons/core-free-icons" or "@hugeicons/react"
  const hugeiconsImportRegex =
    /import\s+\{([^}]+)\}\s+from\s+['"]@hugeicons\/(core-free-icons|react)['"]/g;
  let match;
  while ((match = hugeiconsImportRegex.exec(content)) !== null) {
    const imports = match[1]
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i && i !== "HugeiconsIcon" && i !== "type IconSvgElement");
    hugeiconsMatches.push(...imports);
  }

  // Match import { ... } from "@aboalrejal/nds-icons"
  const ndsIconsImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@aboalrejal\/nds-icons['"]/g;
  while ((match = ndsIconsImportRegex.exec(content)) !== null) {
    const imports = match[1]
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    ndsIconsMatches.push(...imports);
  }

  if (hugeiconsMatches.length > 0 || ndsIconsMatches.length > 0) {
    totalHugeicons += hugeiconsMatches.length;
    totalNdsIcons += ndsIconsMatches.length;

    report.push({
      file: fileRelativePath,
      hugeicons: hugeiconsMatches,
      ndsIcons: ndsIconsMatches,
    });
  }
});

console.log("\n======================================================");
console.log("                 ICON USAGE AUDIT REPORT                ");
console.log("======================================================\n");

if (report.length === 0) {
  console.log("No icons found from either library.");
} else {
  report.forEach((item) => {
    console.log(`📄 ${item.file}`);
    if (item.hugeicons.length > 0) {
      console.log(`   ❌ Hugeicons (${item.hugeicons.length}): ${item.hugeicons.join(", ")}`);
    }
    if (item.ndsIcons.length > 0) {
      console.log(`   ✅ NDS Icons (${item.ndsIcons.length}): ${item.ndsIcons.join(", ")}`);
    }
    console.log("");
  });
}

console.log("------------------------------------------------------");
console.log(`📊 TOTAL SUMMARY:`);
console.log(`   ❌ Total Hugeicons used: ${totalHugeicons} (Needs replacement)`);
console.log(`   ✅ Total NDS Icons used: ${totalNdsIcons}`);
console.log("------------------------------------------------------\n");
console.log(
  "💡 To replace Hugeicons, use: node .agents/skills/saudi-nds-ui/scripts/find-icons.cjs <keyword>",
);
