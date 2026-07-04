const fs = require('fs');
const path = require('path');

const uiDir = path.join(process.cwd(), 'registry/dga/ui');
const appDir = path.join(process.cwd(), 'app/[locale]');

const ignored = ['_registry', 'sidebar', 'sheet', 'direction', 'utils'];

const files = fs.readdirSync(uiDir);

let count = 0;

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const name = file.replace('.tsx', '');
  if (ignored.includes(name)) return;

  const componentDir = path.join(appDir, name);
  const routePath = path.join(componentDir, 'page.mdx');

  if (!fs.existsSync(routePath)) {
    // Generate boilerplate MDX
    const title = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const content = `import { DocsLayout } from "@/components/docs/docs-layout"
import { InstallCommand } from "@/components/docs/install-command"
import { DirectionToggle } from "@/components/docs/direction-toggle"

export const metadata = {
  title: "${title}",
  description: "DGA ${title} component for React & Next.js. Accessible, RTL-ready component from the Digital Government Authority Saudi Arabia design system.",
}

<DocsLayout>

# ${title}

Displays a ${title.toLowerCase()} component.

<DirectionToggle />

## Installation

<InstallCommand componentName="${name}" />

## Usage

This component is generated automatically. To see advanced interactive demos, please refer to the original source code.

\`\`\`tsx
import { ${title.replace(/\s/g, '')} } from "@/components/ui/${name}"

export default function Example() {
  return (
    <${title.replace(/\s/g, '')}>
      Example
    </${title.replace(/\s/g, '')}>
  )
}
\`\`\`

</DocsLayout>
`;

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
    
    fs.writeFileSync(routePath, content, 'utf8');
    console.log(`Generated docs for ${name}`);
    count++;
  }
});

console.log(`Successfully generated ${count} missing documentation pages.`);
