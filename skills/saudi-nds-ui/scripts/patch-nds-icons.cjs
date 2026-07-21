const fs = require("fs");
const path = require("path");

const packageDir = path.resolve(process.cwd(), "node_modules", "@aboalrejal", "nds-icons", "dist");

if (!fs.existsSync(packageDir)) {
  console.error(`Error: Could not find nds-icons at ${packageDir}`);
  process.exit(1);
}

["index.js", "index.d.ts"].forEach((fileName) => {
  const filePath = path.join(packageDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf-8");

    // Replace `from './IconName'` or `from "./IconName"` with `from './IconName.js'`
    // Regex matches: from './Word' or from "./Word" (but ensures it doesn't already have .js)
    const regex = /from\s+['"]\.\/([^'"]+)(?<!\.js)['"]/g;

    const newContent = content.replace(regex, "from './$1.js'");

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      console.log(`✅ Patched ${fileName}`);
    } else {
      console.log(`ℹ️ ${fileName} was already patched or regex did not match.`);
    }
  }
});

console.log("🎉 Patch complete! NDS Icons ESM resolution fixed locally.");
