// CommonJS so the script runs in any target project regardless of package.json
// "type" setting (avoids "Cannot use import statement outside a module").
// `__dirname` is provided natively to CommonJS modules.
const fs = require('fs');
const path = require('path');

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
  // `foundSection` begins with the component name line (e.g. "BUTTON\n..."); drop it
  // since the banner below already names the component, then print the rest verbatim.
  const body = foundSection.replace(/^[^\n]*\n/, '');
  console.log(`\n==========================================`);
  console.log(`  Component Documentation: ${searchName}`);
  console.log(`==========================================\n`);
  console.log(body.trim());
} else {
  console.log(`❌ Documentation not found for component: "${componentNameArg}"`);
  console.log('Available components are:');
  
  const available = [];
  for (let i = 1; i < sections.length; i++) {
    const name = sections[i].split('\n')[0].trim().toLowerCase();
    // Only list real component names (lowercase kebab); ignore any prose that
    // happens to contain a "## Component:" token.
    if (/^[a-z0-9][a-z0-9-]*$/.test(name)) available.push(name);
  }
  console.log(available.join(', '));
}

