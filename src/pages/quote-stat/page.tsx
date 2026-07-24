"use client";

import React from "react"
import { Stat } from "@/registry/dga/ui/stat"
import { Quote } from "@/registry/dga/ui/quote"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/dga/ui/avatar"
import { Building01Solid } from "@aboalrejal/nds-icons"

export default function QuoteStatTestPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Stat & Quote Components</h1>
        <p className="text-muted-foreground">
          Reverse engineered from dev-dga-main and converted completely to Tailwind CSS.
        </p>
      </div>

      {/* --- STAT COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Stat (الإحصائيات)</CardTitle>
          <CardDescription>Different variants and sizes for KPIs and Metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Flat Variant */}
            <Stat
              variant="flat"
              label="Total Users"
              value="3,204"
              trend="up"
              change="12.5%"
              changeLabel="vs last month"
              icon={<Building01Solid />}
            />

            {/* Elevated Variant */}
            <Stat
              variant="elevated"
              label="Revenue"
              value="SAR 1.2M"
              trend="down"
              change="-2.1%"
              changeLabel="vs last month"
            />

            {/* Accent Variant */}
            <Stat
              variant="accent"
              label="Active Projects"
              value="45"
              trend="flat"
              change="No change"
              changeVariant="chip"
            />

            {/* Gradient Variant */}
            <Stat
              variant="gradient"
              label="New Subscriptions"
              value="+210"
              trend="up"
              change="+15%"
              changeVariant="chip"
              className="col-span-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- QUOTE COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Quote (الاقتباس)</CardTitle>
          <CardDescription>Blockquotes, Pullquotes, and Testimonials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-12">
          
          {/* Default Quote */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Default Variant</h3>
            <Quote 
              quoteMark 
              author="Ahmad Al-Ghamdi" 
              byline="Director of Digital Services, DGA"
            >
              The digital transformation journey is not just about technology; it is about 
              reshaping how government services interact with citizens to provide seamless 
              and efficient experiences.
            </Quote>
          </div>

          {/* Testimonial Quote */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Testimonial Variant</h3>
            <div className="max-w-md">
              <Quote 
                variant="testimonial"
                quoteMark
                author="Sarah Otaibi"
                byline="Product Manager"
                avatar={
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SO</AvatarFallback>
                  </Avatar>
                }
              >
                Using the new DGA design system has drastically reduced our time-to-market. 
                The components are accessible out-of-the-box and perfectly align with our branding.
              </Quote>
            </div>
          </div>

          {/* Pullquote */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Pullquote Variant</h3>
            <Quote 
              variant="pullquote"
              quoteMark
              author="Vision 2030"
              source="Digital Economy Report"
            >
              "We will expand the variety of digital services to reduce delays and cut tedious processes."
            </Quote>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
