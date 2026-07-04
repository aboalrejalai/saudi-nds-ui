import fs from 'fs/promises';
import path from 'path';
import { transform } from '@svgr/core';
import camelcase from 'camelcase';

const ICONS_DIR = path.resolve('../@platformscode/icons/dist/svg');
const OUTPUT_DIR = path.resolve('./components/icons');
const INDEX_FILE = path.resolve('./components/icons/index.ts');

async function buildIcons() {
  console.log('Starting SVG conversion...');
  
  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Read all SVGs
  const files = await fs.readdir(ICONS_DIR);
  const svgFiles = files.filter(f => f.endsWith('.svg'));
  
  console.log(`Found ${svgFiles.length} SVGs to process.`);

  let indexExports = [];
  
  let processedCount = 0;

  for (const file of svgFiles) {
    const svgPath = path.join(ICONS_DIR, file);
    const svgCode = await fs.readFile(svgPath, 'utf8');

    // Create a valid React component name
    let baseName = file.replace('.svg', '');
    
    // Replace special programming language symbols
    baseName = baseName.replace(/\+/g, 'Plus');
    baseName = baseName.replace(/#/g, 'Sharp');
    
    // Replace any remaining non-alphanumeric characters with hyphens so camelcase can handle them
    baseName = baseName.replace(/[^a-zA-Z0-9]/g, '-');
    
    // Prefix if starts with a number
    if (/^\d/.test(baseName)) {
      baseName = 'Icon' + baseName;
    }

    const componentName = camelcase(baseName, { pascalCase: true });

    // Transform SVG to React code using SVGR
    const jsCode = await transform(
      svgCode,
      {
        plugins: ['@svgr/plugin-jsx'],
        icon: true,
        typescript: true,
      },
      { componentName }
    );
    
    const outputFileName = `${componentName}.tsx`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    await fs.writeFile(outputPath, jsCode);

    indexExports.push(`export { default as ${componentName} } from './${componentName}';`);
    
    processedCount++;
    if (processedCount % 500 === 0) {
      console.log(`Processed ${processedCount} icons...`);
    }
  }

  // Write index.ts
  await fs.writeFile(INDEX_FILE, indexExports.join('\n'));
  
  console.log(`Successfully converted ${processedCount} icons!`);
}

buildIcons().catch(console.error);
