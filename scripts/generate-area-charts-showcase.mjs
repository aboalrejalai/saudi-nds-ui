import fs from 'fs'
import path from 'path'

const CHARTS_DIR = path.resolve(process.cwd(), 'registry/dga/charts')

const featuredChart = {
  file: 'chart-area-interactive.tsx',
  name: 'ChartAreaInteractive',
  title: 'Area Chart - Interactive',
  category: 'Area Chart'
}

const gridCharts = [
  { file: 'chart-area-default.tsx', name: 'ChartAreaDefault', title: 'Area Chart', category: 'Area Chart' },
  { file: 'chart-area-linear.tsx', name: 'ChartAreaLinear', title: 'Area Chart - Linear', category: 'Area Chart' },
  { file: 'chart-area-step.tsx', name: 'ChartAreaStep', title: 'Area Chart - Step', category: 'Area Chart' },
  { file: 'chart-area-stacked.tsx', name: 'ChartAreaStacked', title: 'Area Chart - Stacked', category: 'Area Chart' },
  { file: 'chart-area-stacked-expand.tsx', name: 'ChartAreaStackedExpand', title: 'Area Chart - Stacked Expanded', category: 'Area Chart' },
  { file: 'chart-area-legend.tsx', name: 'ChartAreaLegend', title: 'Area Chart - Legend', category: 'Area Chart' },
  { file: 'chart-area-icons.tsx', name: 'ChartAreaIcons', title: 'Area Chart - Icons', category: 'Area Chart' },
  { file: 'chart-area-gradient.tsx', name: 'ChartAreaGradient', title: 'Area Chart - Gradient', category: 'Area Chart' },
  { file: 'chart-area-axes.tsx', name: 'ChartAreaAxes', title: 'Area Chart - Axes', category: 'Area Chart' },
]

let importsStr = `"use client"\n\nimport { ChartShowcaseCard } from "@/components/docs/chart-showcase-card"\n`
let sourceCodesObj = `\nconst SOURCE_CODES: Record<string, string> = {\n`

// Helper to add chart source code
function processChart(item) {
  const filePath = path.join(CHARTS_DIR, item.file)
  const codeContent = fs.readFileSync(filePath, 'utf-8')
  importsStr += `import { ${item.name} } from "@/registry/dga/charts/${item.file.replace('.tsx', '')}"\n`
  sourceCodesObj += `  "${item.name}": ${JSON.stringify(codeContent)},\n`
}

processChart(featuredChart)
gridCharts.forEach(processChart)

sourceCodesObj += `}\n\n`

let showcaseComponent = `export function AreaChartsShowcase() {
  return (
    <div className="w-full space-y-8 py-4">
      {/* 1. Top Featured Interactive Chart (Full Width) */}
      <div className="w-full">
        <ChartShowcaseCard
          name="chart-area-interactive"
          category="${featuredChart.category}"
          title="${featuredChart.title}"
          code={SOURCE_CODES["${featuredChart.name}"]}
          fullWidth
        >
          <${featuredChart.name} />
        </ChartShowcaseCard>
      </div>

      {/* 2. 3-Column Grid Layout for Remaining Area Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
`

gridCharts.forEach(item => {
  showcaseComponent += `        <ChartShowcaseCard
          name="${item.file.replace('.tsx', '')}"
          category="${item.category}"
          title="${item.title}"
          code={SOURCE_CODES["${item.name}"]}
        >
          <${item.name} />
        </ChartShowcaseCard>\n`
})

showcaseComponent += `      </div>
    </div>
  )
}
`

const finalCode = importsStr + sourceCodesObj + showcaseComponent
const targetFile = path.resolve(process.cwd(), 'app/[locale]/chart/area-charts-showcase.tsx')

fs.writeFileSync(targetFile, finalCode, 'utf-8')
console.log(`Successfully generated area-charts-showcase.tsx with top interactive chart and 3-column grid layout.`)
