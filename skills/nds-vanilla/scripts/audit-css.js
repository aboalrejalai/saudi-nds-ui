/**
 * NDS CSS Audit Tool
 * Audits NDS SCSS files for dead code, duplication, selector performance, and token compliance.
 * Usage: node scripts/audit-css.js <path-to-scss-file>
 */

const fs = require('fs');
const path = require('path');

// Extract file path from arguments
const filePath = process.argv[2];
if (!filePath) {
  console.error('Error: Please provide a file path to audit.');
  console.log('Usage: node scripts/audit-css.js <path-to-scss-file>');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found at ${filePath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf8');

// Load tokens to verify fallbacks and hardcoded values
const tokensDir = path.resolve(__dirname, '../references/tokens');
const globalTokens = new Map(); // tokenName -> value

function loadTokens() {
  if (!fs.existsSync(tokensDir)) return;
  const tokenFiles = ['_primitives.scss', '_semantic.scss', '_components.scss'];
  for (const file of tokenFiles) {
    const fullPath = path.join(tokensDir, file);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    // Extract top-level variable definitions
    const matches = content.matchAll(/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g);
    for (const match of matches) {
      const name = `--${match[1]}`;
      const val = match[2].trim();
      globalTokens.set(name, val);
    }
  }
}
loadTokens();

// Helper shorthand groups for DEAD-01
const shorthandGroups = {
  'margin': ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'margin-inline', 'margin-block', 'margin-inline-start', 'margin-inline-end', 'margin-block-start', 'margin-block-end'],
  'padding': ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'padding-inline', 'padding-block', 'padding-inline-start', 'padding-inline-end', 'padding-block-start', 'padding-block-end'],
  'border': ['border-top', 'border-right', 'border-bottom', 'border-left', 'border-width', 'border-style', 'border-color', 'border-inline-start', 'border-inline-end'],
  'background': ['background-color', 'background-image', 'background-position', 'background-size', 'background-repeat', 'background-attachment', 'background-origin', 'background-clip'],
  'font': ['font-family', 'font-size', 'font-weight', 'font-style', 'font-variant', 'font-stretch', 'line-height'],
  'flex': ['flex-grow', 'flex-shrink', 'flex-basis']
};

// Parse SCSS file into blocks
const lines = fileContent.split('\n');
const findings = [];

// Helper to add findings
function addFinding(id, lineNum, description, severity, snippet, rewrite) {
  findings.push({ id, lineNum, description, severity, snippet, rewrite });
}

// 1. Line-by-line checks
let inCommentBlock = false;
lines.forEach((line, index) => {
  const lineNum = index + 1;
  const trimmed = line.trim();

  // Skip comments and comment blocks
  if (trimmed.startsWith('/*')) inCommentBlock = true;
  if (inCommentBlock) {
    if (trimmed.endsWith('*/') || trimmed.includes('*/')) inCommentBlock = false;
    return;
  }
  if (trimmed.startsWith('//')) return;

  // TOK-01 / TOK-07: Hardcoded colors/spacing or variables checking
  // Check for hex colors
  const hexMatch = trimmed.match(/#([a-fA-F0-9]{3,6})\b/);
  if (hexMatch && !trimmed.includes('// TOK-01 literal') && !trimmed.includes('$') && !trimmed.includes('@use') && !trimmed.includes('url(')) {
    addFinding(
      'TOK-01',
      lineNum,
      `Hardcoded hex color '${hexMatch[0]}' found. Use a design token instead.`,
      'HIGH',
      trimmed,
      `color: var(--text-default); // or other matching token`
    );
  }

  // Check for hardcoded px values (excluding 0, 1px, 2px)
  const pxMatches = trimmed.match(/\b([3-9]|\d{2,})px\b/g);
  if (pxMatches && !trimmed.includes('// TOK-01 literal') && !trimmed.includes('$') && !trimmed.includes('border') && !trimmed.includes('outline')) {
    pxMatches.forEach(px => {
      addFinding(
        'TOK-01',
        lineNum,
        `Hardcoded size '${px}' found. Use a spacing token instead.`,
        'HIGH',
        trimmed,
        `padding: var(--spacing-md); // or other spacing token`
      );
    });
  }

  // DEAD-05: Redundant fallbacks on unconditionally defined global tokens
  const varMatches = trimmed.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*,\s*([^)]+)\)/g);
  for (const vMatch of varMatches) {
    const tokenName = vMatch[1];
    const fallback = vMatch[2].trim();
    if (globalTokens.has(tokenName) && !fallback.startsWith('var(') && !trimmed.includes('// DEAD-05')) {
      // The token is unconditionally defined in primitive/semantic/components
      addFinding(
        'DEAD-05',
        lineNum,
        `Redundant fallback '${fallback}' for unconditionally defined token '${tokenName}'.`,
        'MEDIUM',
        trimmed,
        trimmed.replace(vMatch[0], `var(${tokenName})`)
      );
    }
  }

  // PERF-03: ID Selector in components
  if (trimmed.includes('#') && !trimmed.includes('var(') && !trimmed.includes('#{') && !trimmed.match(/#([a-fA-F0-9]{3,6})\b/) && (trimmed.endsWith('{') || trimmed.includes(','))) {
    // Looks like a selector definition containing an ID
    const idSelector = trimmed.match(/#([a-zA-Z0-9_-]+)/);
    if (idSelector) {
      addFinding(
        'PERF-03',
        lineNum,
        `Avoid using ID selector '${idSelector[0]}' in component styles. Use classes instead.`,
        'HIGH',
        trimmed,
        `.nds-component-class { ... }`
      );
    }
  }

  // PERF-01: Unscoped universal selector *
  if (trimmed.startsWith('*') && trimmed.includes('{') && !trimmed.includes('box-sizing')) {
    addFinding(
      'PERF-01',
      lineNum,
      `Unscoped universal selector '*' found. Anchor it to a component root to prevent style-matching overhead.`,
      'HIGH',
      trimmed,
      `.nds-component-root * { ... }`
    );
  }

  // PERF-02: Unanchored attribute selector
  if (trimmed.startsWith('[') && trimmed.includes('{')) {
    addFinding(
      'PERF-02',
      lineNum,
      `Unanchored attribute selector '${trimmed.split('{')[0].trim()}' found. Anchor it to a class.`,
      'MEDIUM',
      trimmed,
      `.nds-component-root${trimmed.split('{')[0].trim()} { ... }`
    );
  }
});

// 2. Parse block structures to check nesting, overrides, and duplications
let currentNesting = 0;
let currentBlockDeclarations = [];
let blockStartLine = 0;
let inLtrBlock = false;
let ltrBlockStartLine = 0;
let inCommentBlock2 = false;

lines.forEach((line, index) => {
  const lineNum = index + 1;
  const trimmed = line.trim();

  // Skip comments and comment blocks
  if (trimmed.startsWith('/*')) inCommentBlock2 = true;
  if (inCommentBlock2) {
    if (trimmed.endsWith('*/') || trimmed.includes('*/')) inCommentBlock2 = false;
    return;
  }
  if (trimmed.startsWith('//')) return;

  if (trimmed.includes('@include ltr')) {
    inLtrBlock = true;
    ltrBlockStartLine = lineNum;
  }

  if (trimmed.includes('{')) {
    currentNesting++;
    if (currentNesting === 1) {
      blockStartLine = lineNum;
    }
  }

  // Collect declarations inside rule blocks
  if (currentNesting > 0 && trimmed.includes(':') && !trimmed.startsWith('@') && !trimmed.includes('{') && !trimmed.endsWith(',')) {
    const parts = trimmed.split(':');
    const prop = parts[0].trim();
    const val = parts[1].split(';')[0].trim();
    currentBlockDeclarations.push({ prop, val, lineNum, fullLine: trimmed });
  }

  if (trimmed.includes('}')) {
    currentNesting--;
    if (currentNesting === 0 || trimmed.startsWith('}')) {
      // Analyze the completed block
      analyzeBlockDeclarations(currentBlockDeclarations, blockStartLine);
      currentBlockDeclarations = [];
    }
    if (inLtrBlock && currentNesting <= 1) {
      inLtrBlock = false;
    }
  }

  // DEAD-04: Logical properties inside @include ltr
  if (inLtrBlock && trimmed.includes(':') && !trimmed.includes('{')) {
    const prop = trimmed.split(':')[0].trim();
    const logicalProps = ['text-align', 'margin-inline', 'margin-inline-start', 'margin-inline-end', 'padding-inline', 'padding-inline-start', 'padding-inline-end', 'inset-inline-start', 'inset-inline-end', 'border-inline-start', 'border-inline-end'];
    if (logicalProps.some(lp => prop === lp || prop.startsWith(lp))) {
      addFinding(
        'DEAD-04',
        lineNum,
        `Logical property '${prop}' found inside '@include ltr'. Logical properties are already direction-aware.`,
        'HIGH',
        trimmed,
        `Remove this line from @include ltr block.`
      );
    }
  }
});

function analyzeBlockDeclarations(decls, startLine) {
  const seenProps = new Map(); // propName -> declaration object

  decls.forEach((decl) => {
    // DEAD-02: Same property declared twice in same block
    if (seenProps.has(decl.prop)) {
      const prevDecl = seenProps.get(decl.prop);
      // Ensure it is not a fallback pattern (literal followed by var fallback)
      if (!decl.val.includes('var(') && !decl.val.includes('clamp(')) {
        addFinding(
          'DEAD-02',
          prevDecl.lineNum,
          `Duplicate declaration of property '${decl.prop}'. The earlier declaration is overridden and dead.`,
          'HIGH',
          prevDecl.fullLine,
          `Remove this line.`
        );
      }
    }
    seenProps.set(decl.prop, decl);

    // DEAD-03: Same custom property declared twice in same block
    if (decl.prop.startsWith('--') && seenProps.has(decl.prop)) {
      const prevDecl = seenProps.get(decl.prop);
      if (prevDecl.lineNum !== decl.lineNum) {
        addFinding(
          'DEAD-03',
          prevDecl.lineNum,
          `Duplicate custom property definition for '${decl.prop}'. The earlier definition is dead.`,
          'HIGH',
          prevDecl.fullLine,
          `Remove this line.`
        );
      }
    }

    // DEAD-01: Shorthand overriding longhand
    for (const [shorthand, longhands] of Object.entries(shorthandGroups)) {
      if (decl.prop === shorthand) {
        // If a longhand of this group was declared BEFORE this shorthand, it is dead
        longhands.forEach(lh => {
          if (seenProps.has(lh)) {
            const lhDecl = seenProps.get(lh);
            // Ensure no fallback override
            if (!lhDecl.fullLine.includes('// DEAD-01')) {
              addFinding(
                'DEAD-01',
                lhDecl.lineNum,
                `Longhand property '${lh}' is overridden by shorthand '${shorthand}' declared later on line ${decl.lineNum}.`,
                'HIGH',
                lhDecl.fullLine,
                `Delete this line or reorder after shorthand.`
              );
            }
          }
        });
      }
    }
  });
}

// 3. Output results
console.log(`\nNDS CSS Audit Report for: ${filePath}`);
console.log('='.repeat(filePath.length + 26));

if (findings.length === 0) {
  console.log('\n🟢 Clean! No CSS findings found.');
} else {
  console.log(`\nFound ${findings.length} findings:\n`);
  findings.forEach((f, i) => {
    console.log(`[${i + 1}] [${f.id}] Line ${f.lineNum} (${f.severity} severity)`);
    console.log(`    Description: ${f.description}`);
    console.log(`    Snippet:     ${f.snippet}`);
    console.log(`    Proposed:    ${f.rewrite}\n`);
  });
}
