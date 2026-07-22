"use client"

import { ChartAreaDefault } from "@/registry/dga/charts/chart-area-default"
import { ChartBarDefault } from "@/registry/dga/charts/chart-bar-default"
import { ChartLineDefault } from "@/registry/dga/charts/chart-line-default"
import { ChartPieSimple } from "@/registry/dga/charts/chart-pie-simple"
import { ChartRadarDefault } from "@/registry/dga/charts/chart-radar-default"
import { ChartRadialSimple } from "@/registry/dga/charts/chart-radial-simple"
import { ChartTooltipFormatter } from "@/registry/dga/charts/chart-tooltip-formatter"

export function AreaChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartAreaDefault />
    </div>
  )
}

export function BarChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartBarDefault />
    </div>
  )
}

export function LineChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartLineDefault />
    </div>
  )
}

export function PieChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartPieSimple />
    </div>
  )
}

export function RadarChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartRadarDefault />
    </div>
  )
}

export function RadialChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartRadialSimple />
    </div>
  )
}

export function TooltipChartDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <ChartTooltipFormatter />
    </div>
  )
}
