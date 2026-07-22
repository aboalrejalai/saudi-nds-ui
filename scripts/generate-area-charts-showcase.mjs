import fs from 'fs'
import path from 'path'

const CHARTS_DIR = path.resolve(process.cwd(), 'registry/dga/charts')

const featuredChart = {
  file: 'chart-area-interactive.tsx',
  name: 'ChartAreaInteractive',
  titleEn: 'Area Chart - Interactive',
  titleAr: 'رسم بياني مساحي - متفاعل',
  categoryEn: 'Area Chart',
  categoryAr: 'رسم بياني مساحي'
}

const gridCharts = [
  { file: 'chart-area-default.tsx', name: 'ChartAreaDefault', titleEn: 'Area Chart', titleAr: 'رسم بياني مساحي', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-linear.tsx', name: 'ChartAreaLinear', titleEn: 'Area Chart - Linear', titleAr: 'رسم بياني مساحي - خطي', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-step.tsx', name: 'ChartAreaStep', titleEn: 'Area Chart - Step', titleAr: 'رسم بياني مساحي - درجي', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-stacked.tsx', name: 'ChartAreaStacked', titleEn: 'Area Chart - Stacked', titleAr: 'رسم بياني مساحي - مكدس', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-stacked-expand.tsx', name: 'ChartAreaStackedExpand', titleEn: 'Area Chart - Stacked Expanded', titleAr: 'رسم بياني مساحي - مكدس موسع', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-legend.tsx', name: 'ChartAreaLegend', titleEn: 'Area Chart - Legend', titleAr: 'رسم بياني مساحي - دليل البيانات', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-icons.tsx', name: 'ChartAreaIcons', titleEn: 'Area Chart - Icons', titleAr: 'رسم بياني مساحي - أيقونات', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-gradient.tsx', name: 'ChartAreaGradient', titleEn: 'Area Chart - Gradient', titleAr: 'رسم بياني مساحي - تدرج ألوان', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
  { file: 'chart-area-axes.tsx', name: 'ChartAreaAxes', titleEn: 'Area Chart - Axes', titleAr: 'رسم بياني مساحي - محاور', categoryEn: 'Area Chart', categoryAr: 'رسم بياني مساحي' },
]

let importsStr = `"use client"\n\nimport { useLocale } from "next-intl"\nimport { ChartShowcaseCard } from "@/components/docs/chart-showcase-card"\n`
let sourceCodesObj = `\nconst SOURCE_CODES: Record<string, string> = {\n`

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
  const locale = useLocale()
  const isAr = locale === "ar"

  return (
    <div className="w-full space-y-6 py-2">
      {/* 1. Top Featured Interactive Chart (Full Width, Direct Layer 2) */}
      <div className="w-full">
        <ChartShowcaseCard
          name="chart-area-interactive"
          category={isAr ? "${featuredChart.categoryAr}" : "${featuredChart.categoryEn}"}
          title={isAr ? "${featuredChart.titleAr}" : "${featuredChart.titleEn}"}
          code={SOURCE_CODES["${featuredChart.name}"]}
          fullWidth
        >
          <${featuredChart.name} />
        </ChartShowcaseCard>
      </div>

      {/* 2. 3-Column Grid Layout directly on bg-background (Layer 2) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
`

gridCharts.forEach(item => {
  showcaseComponent += `        <ChartShowcaseCard
          name="${item.file.replace('.tsx', '')}"
          category={isAr ? "${item.categoryAr}" : "${item.categoryEn}"}
          title={isAr ? "${item.titleAr}" : "${item.titleEn}"}
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
console.log(`Successfully regenerated area-charts-showcase.tsx with locale-aware category and titles.`)
