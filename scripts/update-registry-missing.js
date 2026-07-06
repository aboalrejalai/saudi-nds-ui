const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, '../registry/dga/ui');
const registryJsonPath = path.join(__dirname, '../registry.json');
const registryTsPath = path.join(__dirname, '../registry/dga/ui/_registry.ts');

const index = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
const existing = new Set(index.items.filter(i => i.type === 'registry:ui').map(i => i.name));

const allFiles = fs.readdirSync(uiDir)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('_'))
  .map(f => f.replace('.tsx', ''));

const missing = allFiles.filter(f => !existing.has(f));
console.log('Missing components:', missing);

const newItems = missing.map(comp => {
  const content = fs.readFileSync(path.join(uiDir, comp + '.tsx'), 'utf8');
  const deps = new Set();
  const regDeps = new Set();
  
  const importRegex = /import\s+(?:[^"']+)\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const imp = match[1];
    if (imp.startsWith('@/registry/dga/ui/')) {
      regDeps.add(imp.split('/').pop());
    } else if (!imp.startsWith('@/') && !imp.startsWith('.') && imp !== 'react' && imp !== 'react-dom') {
      let pkgName = imp;
      if (imp.startsWith('@')) {
        pkgName = imp.split('/').slice(0, 2).join('/');
      } else {
        pkgName = imp.split('/')[0];
      }
      deps.add(pkgName);
    }
  }
  
  // `registry.json` is read by `shadcn build` with cwd = project root, so it
  // needs root-relative paths. `_registry.ts` lives under `registry/dga/` and
  // uses short paths relative to that folder. Emit one item per target so we
  // never write a short path into registry.json (which breaks the build).
  const buildItem = (filePath) => {
    const item = {
      name: comp,
      type: 'registry:ui',
      files: [{ path: filePath, type: 'registry:ui' }]
    };
    if (deps.size) item.dependencies = [...deps];
    if (regDeps.size) item.registryDependencies = [...regDeps];
    return item;
  };
  return {
    json: buildItem(`registry/dga/ui/${comp}.tsx`),
    ts: buildItem(`ui/${comp}.tsx`),
  };
});

// Update registry.json
for (const { json } of newItems) {
  index.items.push(json);
}
fs.writeFileSync(registryJsonPath, JSON.stringify(index, null, 2));
console.log('Updated registry.json');

// Update _registry.ts
let tsContent = fs.readFileSync(registryTsPath, 'utf8');
const lastBracket = tsContent.lastIndexOf(']');
if (lastBracket !== -1) {
  const newItemsString = newItems.map(({ ts }) => JSON.stringify(ts, null, 2)).join(',\n  ') + ',';
  tsContent = tsContent.slice(0, lastBracket) + '  ' + newItemsString + '\n' + tsContent.slice(lastBracket);
  fs.writeFileSync(registryTsPath, tsContent);
  console.log('Updated _registry.ts');
}
