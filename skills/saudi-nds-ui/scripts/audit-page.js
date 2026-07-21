import fs from "fs";
import path from "path";

const filePathArg = process.argv[2];

if (!filePathArg) {
  console.log("Please specify a file to audit. Example:");
  console.log("node audit-page.js components/my-form.tsx");
  process.exit(1);
}

const resolvedPath = path.resolve(filePathArg);

if (!fs.existsSync(resolvedPath)) {
  console.error(`Error: File not found at path: ${resolvedPath}`);
  process.exit(1);
}

const content = fs.readFileSync(resolvedPath, "utf-8");
const lines = content.split("\n");

const issues = [];

// 1. Check LTR spacing classes (margins, paddings)
const ltrSpacingRegex = /\b(ml|mr|pl|pr|left|right)-(\d+|auto|full|px)\b/g;
let ltrMatches = [];
let match;
while ((match = ltrSpacingRegex.exec(content)) !== null) {
  ltrMatches.push({ class: match[0], prop: match[1], line: 0 });
}

// Find lines for LTR matches
lines.forEach((lineText, idx) => {
  ltrMatches.forEach((m) => {
    if (lineText.includes(m.class)) {
      m.line = idx + 1;
    }
  });
});

// Filter unique line/class combinations
const uniqueLtr = [];
const seenLtr = new Set();
ltrMatches.forEach((m) => {
  const key = `${m.line}:${m.class}`;
  if (!seenLtr.has(key) && m.line > 0) {
    seenLtr.add(key);
    uniqueLtr.push(m);
  }
});

uniqueLtr.forEach((m) => {
  let suggestion = "";
  if (m.prop === "ml") suggestion = m.class.replace("ml-", "ms-");
  else if (m.prop === "mr") suggestion = m.class.replace("mr-", "me-");
  else if (m.prop === "pl") suggestion = m.class.replace("pl-", "ps-");
  else if (m.prop === "pr") suggestion = m.class.replace("pr-", "pe-");

  issues.push({
    type: "RTL Directions",
    line: m.line,
    description: `Detected static directional spacing class "${m.class}". Use logical spacing for RTL compatibility.`,
    fix: `Replace "${m.class}" with "${suggestion}"`,
  });
});

// 2. Check font-family usage
const hasArabicText = /[\u0600-\u06FF]/.test(content);
const hasIbmFont =
  content.includes("IBM Plex Sans Arabic") ||
  content.includes("font-sans") ||
  content.includes("font-ibm");

if (hasArabicText && !hasIbmFont) {
  issues.push({
    type: "Fonts & Styling",
    line: 1,
    description:
      'File contains Arabic text but the approved typeface "IBM Plex Sans Arabic" was not declared/used.',
    fix: "Configure font-family in CSS or use Tailwind's font-sans utility class.",
  });
}

// 3. Check for HTML raw interactive elements that should be NDS components
const rawElements = [
  { tag: "<button", name: "Button", dgaName: "Button", importPath: "@/components/ui/button" },
  { tag: "<input", name: "Input", dgaName: "Input", importPath: "@/components/ui/input" },
  { tag: "<select", name: "Select", dgaName: "Select", importPath: "@/components/ui/select" },
  { tag: "<table", name: "Table", dgaName: "Table", importPath: "@/components/ui/table" },
];

lines.forEach((lineText, idx) => {
  rawElements.forEach((el) => {
    if (lineText.includes(el.tag) && !lineText.includes("//") && !lineText.includes("import")) {
      issues.push({
        type: "DGA Components Replacement",
        line: idx + 1,
        description: `Raw HTML element "${el.tag}..." detected. It is highly recommended to use the DGA component: <${el.dgaName}>.`,
        fix: `Import { ${el.dgaName} } from "${el.importPath}" and replace the raw HTML element.`,
      });
    }
  });
});

// 4. Accessibility checks (Image Alt, Input labels)
lines.forEach((lineText, idx) => {
  // Check image tags for alt properties
  if (lineText.includes("<img") && !lineText.includes("alt=") && !lineText.includes("//")) {
    issues.push({
      type: "Accessibility (WCAG)",
      line: idx + 1,
      description:
        'Image element <img> is missing the descriptive "alt" attribute required for screen readers.',
      fix: 'Add alt="image description" or alt="" if the image is purely decorative.',
    });
  }

  // Check custom divs with click handlers missing interactive attributes
  if (
    lineText.includes("onClick") &&
    (lineText.includes("<div") || lineText.includes("<span")) &&
    !lineText.includes("tabIndex") &&
    !lineText.includes("role=") &&
    !lineText.includes("//")
  ) {
    issues.push({
      type: "Accessibility (WCAG)",
      line: idx + 1,
      description:
        "Non-interactive element (div/span) has an onClick event handler but lacks a role and focusability (tabIndex).",
      fix: 'Add role="button", tabIndex={0}, and support Enter/Space key triggers.',
    });
  }
});

// 5. Output Report
console.log(`\n==========================================`);
console.log(`NDS & Accessibility Audit Report:`);
console.log(`File: ${path.basename(resolvedPath)}`);
console.log(`==========================================\n`);

if (issues.length === 0) {
  console.log("✅ File is fully compatible! No styling, direction, or accessibility issues found.");
} else {
  console.log(`⚠️ Found (${issues.length}) issue(s) that require review:\n`);

  issues.forEach((issue, index) => {
    console.log(`[${index + 1}] [Section: ${issue.type}] | Line: ${issue.line}`);
    console.log(`    Issue: ${issue.description}`);
    console.log(`    Suggested Fix: ${issue.fix}\n`);
  });
}
