import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiDir = 'c:/Users/Abo Alrejal/Desktop/Beta/dga-registry-main/registry/dga/ui';
const guidePath = path.join(__dirname, '../references/components-guide.md');

if (!fs.existsSync(uiDir)) {
  console.error(`Error: UI directory not found: ${uiDir}`);
  process.exit(1);
}

if (!fs.existsSync(guidePath)) {
  console.error(`Error: Guide file not found: ${guidePath}`);
  process.exit(1);
}

// 1. Read current guide content to see what's documented
let guideContent = fs.readFileSync(guidePath, 'utf-8');

// 2. Scan UI directory for .tsx components
const files = fs.readdirSync(uiDir)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('_'));

console.log(`Found ${files.length} UI source components in registry.`);

let addedCount = 0;

for (const file of files) {
  const componentName = path.basename(file, '.tsx');
  const upperName = componentName.toUpperCase();
  
  // Check if already documented in guideContent (either English "Component:" or Arabic "المكون:")
  const searchPattern = new RegExp(`## (Component|المكون):\\s*${upperName}\\b`, 'i');
  if (!searchPattern.test(guideContent)) {
    console.log(`Adding undocumented component: ${componentName}`);
    
    const docSection = `
## Component: ${upperName}

DGA approved ${componentName} component, optimized for RTL layouts and Saudi NDS styling guidelines.

## Installation

* **Installation:** \`npx shadcn@latest add https://dga-registry.vercel.app/r/${componentName}.json\`

## Description
Interactive user interface component built on Radix UI primitives and styled with DGA branding design tokens.

## Props
Please refer to the standard Radix UI / Shadcn API properties.

---
`;
    guideContent += docSection;
    addedCount++;
  }
}

if (addedCount > 0) {
  fs.writeFileSync(guidePath, guideContent, 'utf-8');
  console.log(`Successfully added ${addedCount} missing components to the guide.`);
} else {
  console.log('All components are already documented.');
}
