const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const localeDir = path.join(appDir, '[locale]');

// Create [locale] directory
if (!fs.existsSync(localeDir)) {
  fs.mkdirSync(localeDir);
}

// Files and folders to NOT move (Next.js special root files)
const keepAtRoot = [
  '[locale]',
  'robots.ts',
  'sitemap.ts',
  'manifest.ts',
  'apple-icon.tsx',
  'icon.tsx',
  'twitter-image.tsx',
  'opengraph-image.tsx',
  'globals.css', // We can keep globals.css at root and import it in [locale]/layout.tsx
  'api' // If there was an api folder
];

const items = fs.readdirSync(appDir);

items.forEach(item => {
  if (keepAtRoot.includes(item)) return;
  
  const oldPath = path.join(appDir, item);
  const newPath = path.join(localeDir, item);
  
  fs.renameSync(oldPath, newPath);
  console.log(`Moved ${item} to [locale]`);
});

console.log('Restructure complete!');
