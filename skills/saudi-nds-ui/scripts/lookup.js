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

const componentsDir = path.join(__dirname, '../references/components');
const searchName = componentNameArg.toLowerCase();
const compPath = path.join(componentsDir, `${searchName}.md`);

if (fs.existsSync(compPath)) {
  const body = fs.readFileSync(compPath, 'utf-8');
  console.log(`\n==========================================`);
  console.log(`  Component Documentation: ${searchName.toUpperCase()}`);
  console.log(`==========================================\n`);
  console.log(body.trim());
} else {
  console.log(`❌ Documentation not found for component: "${searchName}"`);
  console.log('Available components are:');
  
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    const available = files
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
    console.log(available.join(', '));
  } else {
    console.log('No components found. Run generate-guide.js first.');
  }
}

