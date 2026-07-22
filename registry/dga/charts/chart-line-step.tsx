"use client"

import { ChartIncreaseStroke } from "@aboalrejal/nds-icons"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/dga/ui/chart"

export const description = "A line chart with step"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


export interface ChartLineStepProps {
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

export function ChartLineStep({
  data = chartData,
  config = chartConfig,
  title = "Line Chart - Step",
  description: cardDescription = "January - June 2024",
  trendingText,
  footerText,
  className,
}: ChartLineStepProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="step"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month{" "}
          <ChartIncreaseStroke className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
