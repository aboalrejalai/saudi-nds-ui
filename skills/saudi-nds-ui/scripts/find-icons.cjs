const fs = require("fs");
const path = require("path");

const searchTerm = process.argv[2];

if (!searchTerm) {
  console.error("Usage: node find-icons.js <search-term>");
  console.error("Example: node find-icons.js arrow");
  process.exit(1);
}

// Find the index.d.ts file of the nds-icons package
// Assume the script is run from anywhere inside the workspace, so we resolve relative to cwd
const packagePath = path.resolve(
  process.cwd(),
  "node_modules",
  "@aboalrejal",
  "nds-icons",
  "dist",
  "index.d.ts",
);

if (!fs.existsSync(packagePath)) {
  console.error(`Error: Could not find @aboalrejal/nds-icons at ${packagePath}`);
  console.error("Make sure the package is installed.");
  process.exit(1);
}

const content = fs.readFileSync(packagePath, "utf-8");
const exportRegex = /export \{ default as ([a-zA-Z0-9_]+) \}/g;

const icons = [];
let match;
while ((match = exportRegex.exec(content)) !== null) {
  icons.push(match[1]);
}

if (icons.length === 0) {
  console.error("No icons found in the package index. The regex might need to be adjusted.");
  process.exit(1);
}

// Filter icons by search term
const searchRegex = new RegExp(searchTerm, "i");
const results = icons.filter((icon) => searchRegex.test(icon));

console.log(
  `\n🔍 Searching for "${searchTerm}" in @aboalrejal/nds-icons (${icons.length} total icons)...\n`,
);

if (results.length === 0) {
  console.log(`❌ No icons found matching "${searchTerm}". Try a different keyword.`);
} else {
  console.log(`✅ Found ${results.length} matching icons:\n`);
  results.forEach((icon) => console.log(`  - ${icon}`));
  console.log("\n💡 Tip: Use this exact name in your imports:");
  console.log(`    import { ${results[0]} } from '@aboalrejal/nds-icons';`);
}
