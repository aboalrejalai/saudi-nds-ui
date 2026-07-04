import fs from 'fs';
import path from 'path';

// ANSI escape codes for coloring output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function evaluateProject() {
  const projectRoot = process.cwd();
  console.log(`${colors.cyan}${colors.bold}🔍 Saudi NDS UI - Project Environment Evaluator${colors.reset}\n`);

  let score = 0;
  const checks = [];
  const warnings = [];

  // 1. Check for package.json
  const packagePath = path.join(projectRoot, 'package.json');
  let hasPackageJson = false;
  let packageData = {};

  if (fs.existsSync(packagePath)) {
    hasPackageJson = true;
    score += 2;
    checks.push(`${colors.green}✔ package.json found${colors.reset}`);
    try {
      packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    } catch (e) {
      warnings.push("package.json is malformed.");
    }
  } else {
    checks.push(`${colors.red}✖ package.json missing${colors.reset}`);
  }

  // Check Dependencies
  const allDeps = { ...packageData.dependencies, ...packageData.devDependencies };
  
  if (allDeps['react']) {
    score += 2;
    checks.push(`${colors.green}✔ React found${colors.reset}`);
  } else {
    checks.push(`${colors.red}✖ React missing${colors.reset}`);
    warnings.push("This project does not seem to use React. NDS UI strictly requires React.");
  }

  if (allDeps['next']) {
    score += 2;
    checks.push(`${colors.green}✔ Next.js found${colors.reset}`);
  } else {
    checks.push(`${colors.yellow}⚠ Next.js not found (Other React frameworks might work, but Next.js is recommended)${colors.reset}`);
  }

  if (allDeps['tailwindcss']) {
    score += 2;
    checks.push(`${colors.green}✔ Tailwind CSS found${colors.reset}`);
  } else {
    checks.push(`${colors.red}✖ Tailwind CSS missing${colors.reset}`);
    warnings.push("Tailwind CSS is required for NDS UI styling.");
  }

  // Check components.json (Shadcn)
  const componentsJsonPath = path.join(projectRoot, 'components.json');
  if (fs.existsSync(componentsJsonPath)) {
    score += 2;
    checks.push(`${colors.green}✔ components.json (shadcn) found${colors.reset}`);
  } else {
    checks.push(`${colors.yellow}⚠ components.json missing (Needs initialization)${colors.reset}`);
  }

  console.log(`${colors.bold}--- Audit Results ---${colors.reset}`);
  checks.forEach(c => console.log(c));
  
  console.log(`\n${colors.bold}Final Score: ${score}/10${colors.reset}\n`);

  console.log(`${colors.cyan}${colors.bold}=== AI AGENT ACTION REQUIRED ===${colors.reset}`);
  
  if (!hasPackageJson) {
    console.log(`> ${colors.bold}RECOMMENDED MODE: MODE A (Start from Scratch)${colors.reset}`);
    console.log("This is an empty directory. Follow the 'Mode A' instructions in SKILL.md to initialize a new project.");
  } else if (score >= 8) {
    console.log(`> ${colors.bold}RECOMMENDED MODE: MODE B / MODE C (Migration or Component Addition)${colors.reset}`);
    console.log("This is a highly compatible Next.js/React environment with Tailwind. You may safely add components or migrate existing ones. Follow 'Mode B' or 'Mode C' in SKILL.md.");
  } else if (score >= 4 && score < 8) {
    console.log(`> ${colors.bold}RECOMMENDED MODE: MODE A (Setup Required)${colors.reset}`);
    console.log("This is a React project but missing critical dependencies like Tailwind or shadcn configuration. You MUST set up Tailwind and components.json first before adding UI components.");
  } else {
    console.log(`> ${colors.bold}${colors.red}RECOMMENDED MODE: ABORT (Incompatible Environment)${colors.reset}`);
    console.log("CRITICAL WARNING TO AI AGENT: This project is fundamentally incompatible with Saudi NDS UI (No React found). Do NOT attempt to migrate files or replace HTML manually. Stop and warn the user.");
  }
}

evaluateProject();
