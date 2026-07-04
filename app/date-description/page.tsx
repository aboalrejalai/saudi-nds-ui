"use client";

import React, { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

import { DatePicker, DateRangePicker } from "@/registry/dga/ui/date-picker"
import {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
} from "@/registry/dga/ui/description-list"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"

export default function DateDescriptionTestPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">The Final Two Components! 🎉</h1>
        <p className="text-muted-foreground">
          DatePicker / DateRangePicker and DescriptionList.
        </p>
      </div>

      {/* --- DATE PICKER --- */}
      <Card>
        <CardHeader>
          <CardTitle>Date Picker (منتقي التاريخ)</CardTitle>
          <CardDescription>Interactive date and date-range selection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Single Date</h3>
            <DatePicker 
              date={date} 
              onDateChange={setDate} 
              label="Select your birth date" 
            />
            <p className="text-sm text-muted-foreground">Selected: {date?.toDateString()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Date Range</h3>
            <DateRangePicker 
              dateRange={dateRange} 
              onDateRangeChange={setDateRange} 
              label="Select your travel dates" 
            />
            <p className="text-sm text-muted-foreground">
              Selected: {dateRange?.from?.toDateString()} to {dateRange?.to?.toDateString()}
            </p>
          </div>

        </CardContent>
      </Card>

      {/* --- DESCRIPTION LIST --- */}
      <Card>
        <CardHeader>
          <CardTitle>Description List (قائمة الوصف)</CardTitle>
          <CardDescription>Display key-value data beautifully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Horizontal (Divided)</h3>
            <div className="border rounded-xl p-6 bg-card">
              <DescriptionList orientation="horizontal" divided>
                <DescriptionItem>
                  <DescriptionTerm>Full name</DescriptionTerm>
                  <DescriptionDetails>Abo Alrejal</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>Application status</DescriptionTerm>
                  <DescriptionDetails>Approved</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>Email address</DescriptionTerm>
                  <DescriptionDetails>abo.alrejal@example.com</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>Salary expectation</DescriptionTerm>
                  <DescriptionDetails>$120,000</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>About</DescriptionTerm>
                  <DescriptionDetails>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. 
                    Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident.
                  </DescriptionDetails>
                </DescriptionItem>
              </DescriptionList>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Vertical (No Dividers)</h3>
            <div className="border rounded-xl p-6 bg-muted/20">
              <DescriptionList orientation="vertical">
                <DescriptionItem>
                  <DescriptionTerm>System</DescriptionTerm>
                  <DescriptionDetails>National Design System (NDS)</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>Version</DescriptionTerm>
                  <DescriptionDetails>v2.0.0 (Tailwind React)</DescriptionDetails>
                </DescriptionItem>
                <DescriptionItem>
                  <DescriptionTerm>Status</DescriptionTerm>
                  <DescriptionDetails>100% Completed! 🏆</DescriptionDetails>
                </DescriptionItem>
              </DescriptionList>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
