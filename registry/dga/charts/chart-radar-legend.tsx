"use client"

import { ChartIncreaseStroke } from "@aboalrejal/nds-icons"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/dga/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/dga/ui/chart"

export const description = "A radar chart with a legend"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


export interface ChartRadarLegendProps {
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

export function ChartRadarLegend({
  data = chartData,
  config = chartConfig,
  title = "Radar Chart - Legend",
  description: cardDescription = "Showing total visitors for the last 6 months",
  trendingText,
  footerText,
  className,
}: ChartRadarLegendProps) {
  return (
    <Card className={className}>
      <CardHeader className="items-center">
        {title && <CardTitle>{title}</CardTitle>}
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square h-[250px] max-h-[250px] w-full"
        >
          <RadarChart
            data={data}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month{" "}
          <ChartIncreaseStroke className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
