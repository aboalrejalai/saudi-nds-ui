import fs from 'fs'
import path from 'path'

const CHARTS_DIR = path.resolve(process.cwd(), 'registry/dga/charts')

const areaChartFiles = [
  { file: 'chart-area-default.tsx', name: 'ChartAreaDefault', title: 'Area Chart - Default (رسم بياني مساحي افتراضي)' },
  { file: 'chart-area-linear.tsx', name: 'ChartAreaLinear', title: 'Area Chart - Linear (رسم بياني مساحي خطي)' },
  { file: 'chart-area-step.tsx', name: 'ChartAreaStep', title: 'Area Chart - Step (رسم بياني مساحي درجي)' },
  { file: 'chart-area-stacked.tsx', name: 'ChartAreaStacked', title: 'Area Chart - Stacked (رسم بياني مساحي مكدس)' },
  { file: 'chart-area-stacked-expand.tsx', name: 'ChartAreaStackedExpand', title: 'Area Chart - Stacked Expanded (رسم بياني مساحي مكدس موسع)' },
  { file: 'chart-area-legend.tsx', name: 'ChartAreaLegend', title: 'Area Chart - Legend (رسم بياني مساحي مع مفتاح توضيح)' },
  { file: 'chart-area-icons.tsx', name: 'ChartAreaIcons', title: 'Area Chart - Icons (رسم بياني مساحي مع أيقونات)' },
  { file: 'chart-area-gradient.tsx', name: 'ChartAreaGradient', title: 'Area Chart - Gradient (رسم بياني مساحي متدرج الألوان)' },
  { file: 'chart-area-axes.tsx', name: 'ChartAreaAxes', title: 'Area Chart - Axes (رسم بياني مساحي مع محاور أفقية ورأسية)' },
  { file: 'chart-area-interactive.tsx', name: 'ChartAreaInteractive', title: 'Area Chart - Interactive (رسم بياني مساحي متفاعل)' },
]

let importsStr = `"use client"\n\nimport { ChartPreviewCard } from "@/components/docs/chart-preview-card"\n`
let sourceCodesObj = `\nconst SOURCE_CODES: Record<string, string> = {\n`

for (const item of areaChartFiles) {
  const filePath = path.join(CHARTS_DIR, item.file)
  const codeContent = fs.readFileSync(filePath, 'utf-8')
  
  importsStr += `import { ${item.name} } from "@/registry/dga/charts/${item.file.replace('.tsx', '')}"\n`
  sourceCodesObj += `  "${item.name}": ${JSON.stringify(codeContent)},\n`
}

sourceCodesObj += `}\n\n`

let showcaseComponent = `export function AreaChartsShowcase() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-muted/40 p-4 border border-border">
        <h2 className="text-lg font-bold text-foreground">عائلة Area Charts (10 مكونات رسم بياني مساحي)</h2>
        <p className="text-xs text-muted-foreground mt-1">
          يمكنك التنقل بين تبويب المعاينة الكاتملة وتصفح/نسخ الكود البرمجي المباشر لكل مكون.
        </p>
      </div>

`

for (const item of areaChartFiles) {
  showcaseComponent += `      <ChartPreviewCard
        title="${item.title}"
        description="المكون الرسمي المعتمد للهوية السعودية @dga/${item.file.replace('.tsx', '')}"
        component={<${item.name} />}
        code={SOURCE_CODES["${item.name}"]}
      />\n`
}

showcaseComponent += `    </div>
  )
}
`

const finalCode = importsStr + sourceCodesObj + showcaseComponent
const targetFile = path.resolve(process.cwd(), 'app/[locale]/chart/area-charts-showcase.tsx')

fs.writeFileSync(targetFile, finalCode, 'utf-8')
console.log(`Successfully generated area-charts-showcase.tsx with ${areaChartFiles.length} Area Chart previews and code blocks.`)
