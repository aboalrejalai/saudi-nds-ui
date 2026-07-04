import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentNameArg = process.argv[2];

if (!componentNameArg) {
  console.log('Please provide a component name as an argument. Example:');
  console.log('node lookup.js badge');
  process.exit(1);
}

const guidePath = path.join(__dirname, '../references/components-guide.md');

if (!fs.existsSync(guidePath)) {
  console.error(`Error: Reference guide not found at path:\n${guidePath}`);
  process.exit(1);
}

const guideContent = fs.readFileSync(guidePath, 'utf-8');
const searchName = componentNameArg.toUpperCase();

// Match headers like "## Component: BADGE"
const sections = guideContent.split(/## Component:\s*/i);

let foundSection = null;

for (let i = 1; i < sections.length; i++) {
  const section = sections[i];
  const firstLine = section.split('\n')[0].trim();
  if (firstLine === searchName) {
    foundSection = section;
    break;
  }
}

if (foundSection) {
  // Clean up any remaining demo imports block (e.g. from "./demos") if any
  let cleanedSection = foundSection.replace(/^[\s\S]*?\}\s*from\s*"[^"]+"\s*\n/i, '');
  // Print the section title and content
  console.log(`\n==========================================`);
  console.log(`  Component Documentation: ${searchName}`);
  console.log(`==========================================\n`);
  console.log(cleanedSection.trim());
} else {
  console.log(`❌ Documentation not found for component: "${componentNameArg}"`);
  console.log('Available components are:');
  
  const available = [];
  for (let i = 1; i < sections.length; i++) {
    available.push(sections[i].split('\n')[0].trim().toLowerCase());
  }
  console.log(available.join(', '));
}

