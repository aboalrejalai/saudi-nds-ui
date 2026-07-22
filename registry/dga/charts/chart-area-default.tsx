"use client"

import { ChartIncreaseStroke } from "@aboalrejal/nds-icons"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A simple area chart"

const DEFAULT_DATA = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const DEFAULT_CONFIG = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export interface ChartAreaDefaultProps {
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

export function ChartAreaDefault({
  data = DEFAULT_DATA,
  config = DEFAULT_CONFIG,
  title = "Area Chart",
  description: cardDescription = "Showing total visitors for the last 6 months",
  trendingText = "Trending up by 5.2% this month",
  footerText = "January - June 2024",
  className,
}: ChartAreaDefaultProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
          <AreaChart
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
              tickFormatter={(value) => (typeof value === "string" ? value.slice(0, 3) : value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {(trendingText || footerText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {trendingText && (
                <div className="flex items-center gap-2 leading-none font-medium">
                  {trendingText} <ChartIncreaseStroke className="h-4 w-4" />
                </div>
              )}
              {footerText && (
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  {footerText}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

