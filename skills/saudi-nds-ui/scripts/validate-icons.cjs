/**
 * validate-icons.cjs
 * Validates every NDS icon import in the project against the actual library exports.
 * Reports missing icons and suggests the closest match.
 */
const fs = require("fs");
const path = require("path");

// 1. Build the full list of actual exports from the library
const indexPath = path.resolve(
  process.cwd(),
  "node_modules",
  "@aboalrejal",
  "nds-icons",
  "dist",
  "index.js",
);
const indexContent = fs.readFileSync(indexPath, "utf-8");

const exportRegex = /export\s*\{\s*default\s+as\s+(\w+)\s*\}/g;
const allExports = new Set();
let m;
while ((m = exportRegex.exec(indexContent)) !== null) {
  allExports.add(m[1]);
}
console.log(`📦 Library has ${allExports.size} total exports.\n`);

// 2. Scan all .tsx/.ts files in src/ for imports from @aboalrejal/nds-icons
function getFiles(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getFiles(fp, list);
    else if (fp.endsWith(".tsx") || fp.endsWith(".ts")) list.push(fp);
  }
  return list;
}

const srcDir = path.resolve(process.cwd(), "src");
const files = getFiles(srcDir);

const missing = []; // { file, iconName, suggestions }
const valid = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*["']@aboalrejal\/nds-icons["']/g;
  let im;
  while ((im = importRegex.exec(content)) !== null) {
    const names = im[1]
      .split(",")
      .map((n) => {
        // handle "Foo as Bar" -> we need "Foo"
        const parts = n.trim().split(/\s+as\s+/);
        return parts[0].trim();
      })
      .filter(Boolean);

    for (const name of names) {
      if (allExports.has(name)) {
        valid.push({ file: path.relative(process.cwd(), file), iconName: name });
      } else {
        // Find closest matches
        const baseName = name.replace(/(Stroke|Solid)$/, "").toLowerCase();
        const suggestions = [...allExports]
          .filter((e) => {
            const eBase = e.replace(/(Stroke|Solid)$/, "").toLowerCase();
            return eBase.includes(baseName) || baseName.includes(eBase);
          })
          .slice(0, 5);

        // If no fuzzy match, try keyword-based
        if (suggestions.length === 0) {
          // Split camelCase into words and search
          const words = name
            .replace(/(Stroke|Solid)$/, "")
            .split(/(?=[A-Z])/)
            .filter((w) => w.length > 2)
            .map((w) => w.toLowerCase());
          for (const word of words) {
            [...allExports].forEach((e) => {
              if (e.toLowerCase().includes(word) && !suggestions.includes(e)) {
                suggestions.push(e);
              }
            });
            if (suggestions.length >= 10) break;
          }
        }

        missing.push({
          file: path.relative(process.cwd(), file),
          iconName: name,
          suggestions: suggestions.slice(0, 8),
        });
      }
    }
  }
});

console.log(`✅ Valid icons: ${valid.length}`);
console.log(`❌ Missing icons: ${missing.length}\n`);

if (missing.length > 0) {
  console.log("======= MISSING ICONS REPORT =======\n");
  missing.forEach(({ file, iconName, suggestions }) => {
    console.log(`📄 ${file}`);
    console.log(`   ❌ "${iconName}" does NOT exist in @aboalrejal/nds-icons`);
    if (suggestions.length > 0) {
      console.log(`   💡 Did you mean one of:`);
      suggestions.forEach((s) => console.log(`      - ${s}`));
    } else {
      console.log(
        `   ⚠️ No close match found. Run: node .agents/skills/saudi-nds-ui/scripts/find-icons.cjs <keyword>`,
      );
    }
    console.log("");
  });
}

// 3. Guard: detect leftover @hugeicons imports or dangling Hugeicons* JSX references.
// These are the silent regressions the auto-replace script produced (used-but-not-imported
// HugeiconsStroke), which crash SSR but slip past the named-import check above.
const leftoverRegex = /(@hugeicons\/|\bHugeicons(?:Icon|Stroke|Solid)\b|<Hugeicons\w*)/;
const leftover = [];
files.forEach((file) => {
  const lines = fs.readFileSync(file, "utf-8").split(/\r?\n/);
  const matches = [];
  lines.forEach((line, i) => {
    if (leftoverRegex.test(line)) matches.push({ line: i + 1, text: line.trim() });
  });
  if (matches.length) leftover.push({ file: path.relative(process.cwd(), file), matches });
});

console.log(`🚫 Leftover @hugeicons / dangling Hugeicons* refs: ${leftover.length}\n`);
if (leftover.length) {
  console.log("======= LEFTOVER HUGEICONS REPORT =======");
  console.log(
    "These are banned imports or used-but-undefined references that crash SSR. Remove/replace them.\n",
  );
  leftover.forEach(({ file, matches }) => {
    console.log(`📄 ${file}`);
    matches.forEach(({ line, text }) => console.log(`   L${line}: ${text}`));
    console.log("");
  });
}
