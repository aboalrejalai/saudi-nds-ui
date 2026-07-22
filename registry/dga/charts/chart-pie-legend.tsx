"use client"
import { cn } from "@/lib/utils"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/dga/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/registry/dga/ui/chart"

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


export interface ChartPieLegendProps {
  /** بيانات الرسم البياني (Chart Data) */
  data?: any[]
  /** إعدادات الشارت (Chart Configuration) */
  config?: ChartConfig
  /** عنوان البطاقة */
  title?: React.ReactNode
  /** وصف البطاقة */
  description?: React.ReactNode
  /** نص اتجاه الصعود/الهبوط */
  trendingText?: React.ReactNode
  /** نص التذييل المساعد */
  footerText?: React.ReactNode
  /** كلاسات Tailwind إضافية للبطاقة */
  className?: string
}

export function ChartPieLegend({
  data = chartData,
  config = chartConfig,
  title = "Pie Chart - Legend",
  description: cardDescription = "January - June 2024",
  trendingText,
  footerText,
  className,
}: ChartPieLegendProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        {title && <CardTitle>{title}</CardTitle>}
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={data} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
