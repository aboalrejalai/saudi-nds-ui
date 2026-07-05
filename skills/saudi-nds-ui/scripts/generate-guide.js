/**
 * generate-guide.js
 *
 * Regenerates `references/components-guide.md` from the published DGA registry.
 *
 * Source of truth:
 *   - `<repoRoot>/registry.json`        -> canonical list of items + npm/registry deps
 *   - `<repoRoot>/public/r/<name>.json` -> published artifact with real file content
 *
 * Output format is the strict `## Component: <NAME>` (uppercased) header shape that
 * `lookup.js` parses. Each section includes install command, dependencies, extracted
 * variants/sizes, exported symbols, and the full component source so an agent has the
 * ground-truth API without round-tripping to the network.
 *
 * Usage:
 *   node skills/saudi-nds-ui/scripts/generate-guide.js
 */
const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
// skills/saudi-nds-ui/scripts  ->  up three levels = repo root
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..', '..');
const INDEX_PATH = path.join(REPO_ROOT, 'registry.json');
const PUB_R_DIR = path.join(REPO_ROOT, 'public', 'r');
const GUIDE_PATH = path.join(SCRIPT_DIR, '..', 'references', 'components-guide.md');
const COMPONENTS_DIR = path.join(SCRIPT_DIR, '..', 'references', 'components');

const REGISTRY_BASE_URL = 'https://nds.aboalrejal.com/r';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Quote/comment-aware brace matcher. Returns {start,end,text} for the block
 *  starting at the `{` located at `openIdx`, or null if unbalanced. */
function matchBraces(src, openIdx) {
  if (src[openIdx] !== '{') return null;
  let depth = 0;
  let i = openIdx;
  let inStr = null; // ' " `
  let inBlockComment = false;
  let inLineComment = false;
  while (i < src.length) {
    const ch = src[i];
    const next = src[i + 1];
    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      i++; continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') { inBlockComment = false; i += 2; continue; }
      i++; continue;
    }
    if (inStr) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === inStr) inStr = null;
      i++; continue;
    }
    if (ch === '/' && next === '/') { inLineComment = true; i += 2; continue; }
    if (ch === '/' && next === '*') { inBlockComment = true; i += 2; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; i++; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return { start: openIdx, end: i, text: src.slice(openIdx, i + 1) };
    }
    i++;
  }
  return null;
}

/** Pull the `variants: { variant: {...}, size: {...}, ... }` axes from a cva source. */
function extractVariants(src) {
  const out = {};
  const m = src.match(/variants\s*:\s*\{/);
  if (!m) return out;
  const openIdx = src.indexOf('{', m.index);
  const block = matchBraces(src, openIdx);
  if (!block) return out;
  // Remove string literals so class-name pseudo-states (hover:, dark:, _svg:) inside
  // the variant *values* are not mistaken for variant *keys*.
  const text = block.text
    .replace(/`(?:\\.|[^`\\])*`/g, '""')
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])*'/g, '""');
  // Each axis is `axisName: { key: "", ... }` at the top level of the variants object.
  const axisRegex = /([A-Za-z_$][\w$]*)\s*:\s*\{/g;
  let am;
  while ((am = axisRegex.exec(text)) !== null) {
    const axisName = am[1];
    const aOpen = text.indexOf('{', am.index);
    const aBlock = matchBraces(text, aOpen);
    if (!aBlock) continue;
    const keys = [];
    let km;
    const keyRegex = /([A-Za-z_$][\w$-]*)\s*:/g;
    while ((km = keyRegex.exec(aBlock.text)) !== null) {
      if (km[1] === axisName && km.index < 2) continue; // skip axis name token
      keys.push(km[1]);
    }
    if (keys.length) out[axisName] = [...new Set(keys)];
  }
  return out;
}

/** Best-effort list of symbols exported by the component source. Only honors
 *  actual `export` statements so local consts (e.g. `const Comp = ...`) are
 *  excluded. Includes both PascalCase components and `*Variants` helpers. */
function extractExports(src) {
  const symbols = new Set();
  let m;
  // export const/function/class X
  const re1 = /export\s+(?:const|function|class)\s+([A-Za-z_$][\w$]*)/g;
  while ((m = re1.exec(src)) !== null) symbols.add(m[1]);
  // export { A, B as C }
  const re3 = /export\s*\{([^}]+)\}/g;
  while ((m = re3.exec(src)) !== null) {
    for (const part of m[1].split(',')) {
      const name = part.split(/\s+as\s+/)[0].trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name)) symbols.add(name);
    }
  }
  return [...symbols].sort();
}

/** Build a fenced code block whose fence is longer than any backtick run inside. */
function fence(content, lang) {
  const runs = content.match(/`+/g) || [];
  const longest = runs.reduce((max, r) => Math.max(max, r.length), 0);
  const ticks = '`'.repeat(Math.max(3, longest + 1));
  return `${ticks}${lang}\n${content.replace(/\s+$/, '')}\n${ticks}`;
}

function humanize(name) {
  return name
    .split(/[-_]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function loadPublished(name) {
  const p = path.join(PUB_R_DIR, `${name}.json`);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function build() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error(`Error: registry index not found at ${INDEX_PATH}`);
    process.exit(1);
  }
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  const items = Array.isArray(index.items) ? index.items : [];

  const uiItems = items.filter((it) => it.type === 'registry:ui');
  const hookItems = items.filter((it) => it.type === 'registry:hook');
  const libItems = items.filter((it) => it.type === 'registry:lib');
  const themeItems = items.filter((it) => it.type === 'registry:theme');

  // Merge index metadata with published content (index has empty `content`).
  const components = uiItems.map((it) => {
    const pub = loadPublished(it.name) || {};
    const files = Array.isArray(pub.files) ? pub.files : [];
    const sourceFile =
      files.find((f) => (f.path || '').endsWith('.tsx')) ||
      files.find((f) => (f.content || '').length > 0) ||
      {};
    const source = sourceFile.content || '';
    return {
      name: it.name,
      npmDeps: it.dependencies || pub.dependencies || [],
      registryDeps: it.registryDependencies || pub.registryDependencies || [],
      sourcePath: sourceFile.path || `registry/dga/ui/${it.name}.tsx`,
      source,
    };
  });

  const lines = [];

  // ---- Header --------------------------------------------------------------
  lines.push('# DGA & Saudi NDS UI — Components Guide');
  lines.push('');
  lines.push(
    'Auto-generated reference of every component published by the Saudi NDS UI registry'
  );
  lines.push(`(\`${REGISTRY_BASE_URL}\`). Generated from \`registry.json\` — do not edit by hand.`);
  lines.push('');
  lines.push('> To regenerate: `node skills/saudi-nds-ui/scripts/generate-guide.js`');
  lines.push('');
  lines.push('Each component has its own file in `references/components/<name>.md`. `lookup.js`');
  lines.push('extracts the specific file on demand. Query a component with:');
  lines.push('');
  lines.push('```bash');
  lines.push('node skills/saudi-nds-ui/scripts/lookup.js <component-name>');
  lines.push('```');
  lines.push('');

  // ---- Quick install (all) -------------------------------------------------
  lines.push('## Installation');
  lines.push('');
  lines.push('Add any component individually:');
  lines.push('');
  lines.push('```bash');
  lines.push(`npx shadcn@latest add ${REGISTRY_BASE_URL}/<component-name>.json`);
  lines.push('```');
  lines.push('');
  lines.push('Or register the namespace once in `components.json` and add by name:');
  lines.push('');
  lines.push('```bash');
  lines.push(`npx shadcn@latest add @dga/<component-name>`);
  lines.push('```');
  lines.push('');

  // ---- Catalog index -------------------------------------------------------
  lines.push('## Component Catalog');
  lines.push('');
  lines.push(`Total: **${components.length}** components.`);
  lines.push('');
  for (const c of components) {
    lines.push(`- [${humanize(c.name)}](#${c.name}) — \`${REGISTRY_BASE_URL}/${c.name}.json\``);
  }
  lines.push('');

  // ---- Non-component registry items ---------------------------------------
  if (hookItems.length || libItems.length || themeItems.length) {
    lines.push('## Registry Utilities (non-component)');
    lines.push('');
    lines.push('These are installable registry items pulled in automatically as dependencies where needed:');
    lines.push('');
    for (const it of hookItems) lines.push(`- **${it.name}** (hook) — \`${REGISTRY_BASE_URL}/${it.name}.json\``);
    for (const it of libItems) lines.push(`- **${it.name}** (lib) — \`${REGISTRY_BASE_URL}/${it.name}.json\``);
    for (const it of themeItems) lines.push(`- **${it.name}** (theme) — \`${REGISTRY_BASE_URL}/${it.name}.json\``);
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // ---- Per-component sections ---------------------------------------------
  if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
  }

  for (const c of components) {
    const upper = c.name.toUpperCase();
    const variants = extractVariants(c.source);
    const exports = extractExports(c.source);
    
    const cLines = [];
    cLines.push(`## Component: ${upper}`);
    cLines.push('');
    cLines.push(`DGA-approved **${humanize(c.name)}** component — built on Radix UI / shadcn primitives, styled with NDS design tokens, and optimized for RTL layouts.`);
    cLines.push('');
    cLines.push('### Install');
    cLines.push('');
    cLines.push('```bash');
    cLines.push(`npx shadcn@latest add ${REGISTRY_BASE_URL}/${c.name}.json`);
    cLines.push('```');
    cLines.push('');

    // Dependencies
    if (c.npmDeps.length) {
      cLines.push(`**NPM dependencies:** ${c.npmDeps.map((d) => `\`${d}\``).join(', ')}`);
    }
    if (c.registryDeps.length) {
      cLines.push(
        `**Registry dependencies:** ${c.registryDeps
          .map((d) => `\`${d}\` (\`${REGISTRY_BASE_URL}/${d}.json\`)`)
          .join(', ')}`
      );
    }
    if (c.npmDeps.length || c.registryDeps.length) cLines.push('');

    // Variants / sizes
    if (Object.keys(variants).length) {
      cLines.push('### Variants');
      cLines.push('');
      for (const [axis, keys] of Object.entries(variants)) {
        cLines.push(`- **${axis}:** ${keys.map((k) => `\`${k}\``).join(', ')}`);
      }
      cLines.push('');
    }

    // Exports
    if (exports.length) {
      cLines.push(`### Exports`);
      cLines.push('');
      cLines.push(exports.map((e) => `\`${e}\``).join(', '));
      cLines.push('');
    }

    // Usage hint
    const mainExport = exports[0] || humanize(c.name).replace(/\s+/g, '');
    if (mainExport) {
      cLines.push('### Usage');
      cLines.push('');
      cLines.push('```tsx');
      cLines.push(`import { ${mainExport} } from "@/components/ui/${c.name}";`);
      cLines.push('');
      cLines.push(`<${mainExport}${variants.variant ? ` variant="default"` : ''}>${humanize(c.name)}</${mainExport}>`);
      cLines.push('```');
      cLines.push('');
    }

    // Full source
    if (c.source.trim()) {
      cLines.push(`### Source (\`${c.sourcePath}\`)`);
      cLines.push('');
      cLines.push(fence(c.source, 'tsx'));
      cLines.push('');
    } else {
      cLines.push(`> Source not bundled in local registry artifact (\`${c.sourcePath}\`). Fetch it via the install command above.`);
      cLines.push('');
    }

    cLines.push('---');
    cLines.push('');
    
    // Write individual file
    const compPath = path.join(COMPONENTS_DIR, `${c.name}.md`);
    fs.writeFileSync(compPath, cLines.join('\n'), 'utf8');
  }

  // Also write the main index guide for utilities and full list
  fs.writeFileSync(GUIDE_PATH, lines.join('\n'), 'utf8');

  console.log(`✓ Wrote ${GUIDE_PATH}`);
  console.log(`  ${components.length} components documented.`);
  if (hookItems.length) console.log(`  ${hookItems.length} hooks indexed.`);
  if (libItems.length) console.log(`  ${libItems.length} libs indexed.`);
  if (themeItems.length) console.log(`  ${themeItems.length} themes indexed.`);
}

build();
