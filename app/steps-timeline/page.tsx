"use client";

import React, { useState } from "react"
import { Steps, Step, StepIndicator, StepTitle, StepDescription } from "@/registry/dga/ui/steps"
import { Timeline, TimelineItem, TimelineMarker, TimelineContent, TimelineTitle, TimelineDescription, TimelineTime } from "@/registry/dga/ui/timeline"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"
import { Button } from "@/registry/dga/ui/button"

export default function StepsTimelineTestPage() {
  const [currentStep, setCurrentStep] = useState(2)

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sequential Components</h1>
        <p className="text-muted-foreground">
          Steps and Timeline components reverse engineered from dev-dga-main.
        </p>
      </div>

      {/* --- STEPS COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Steps (الخطوات)</CardTitle>
          <CardDescription>Horizontal stepper with state management.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <Steps size="md" orientation="horizontal">
            <Step state={currentStep > 1 ? "completed" : currentStep === 1 ? "current" : "upcoming"}>
              <StepIndicator step={1} />
              <StepTitle>Personal Info</StepTitle>
              <StepDescription>Provide your details</StepDescription>
            </Step>
            
            <Step state={currentStep > 2 ? "completed" : currentStep === 2 ? "current" : "upcoming"}>
              <StepIndicator step={2} />
              <StepTitle>Upload Documents</StepTitle>
              <StepDescription>ID and Certificates</StepDescription>
            </Step>
            
            <Step state={currentStep > 3 ? "completed" : currentStep === 3 ? "current" : "upcoming"}>
              <StepIndicator step={3} />
              <StepTitle>Review</StepTitle>
              <StepDescription>Check your application</StepDescription>
            </Step>
            
            <Step state={currentStep > 4 ? "completed" : currentStep === 4 ? "current" : "upcoming"}>
              <StepIndicator step={4} />
              <StepTitle>Submit</StepTitle>
              <StepDescription>Final approval</StepDescription>
            </Step>
          </Steps>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
              Previous Step
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 5}>
              {currentStep === 4 ? "Finish" : "Next Step"}
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* --- TIMELINE COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline (الجدول الزمني)</CardTitle>
          <CardDescription>Vertical chronological activity feed with status markers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="max-w-md">
            <Timeline>
              <TimelineItem>
                <TimelineMarker status="success" />
                <TimelineContent>
                  <TimelineTitle>Application Approved</TimelineTitle>
                  <TimelineDescription>Your commercial registration has been issued.</TimelineDescription>
                  <TimelineTime dateTime="2023-10-15T10:00:00">Oct 15, 2023 - 10:00 AM</TimelineTime>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineMarker status="default" />
                <TimelineContent>
                  <TimelineTitle>Under Review</TimelineTitle>
                  <TimelineDescription>The committee is reviewing your documents.</TimelineDescription>
                  <TimelineTime dateTime="2023-10-12T14:30:00">Oct 12, 2023 - 02:30 PM</TimelineTime>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineMarker status="warning" />
                <TimelineContent>
                  <TimelineTitle>Missing Information</TimelineTitle>
                  <TimelineDescription>Please upload a clearer copy of your ID.</TimelineDescription>
                  <TimelineTime dateTime="2023-10-10T09:15:00">Oct 10, 2023 - 09:15 AM</TimelineTime>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineMarker status="info" />
                <TimelineContent>
                  <TimelineTitle>Application Submitted</TimelineTitle>
                  <TimelineDescription>Your initial application was received.</TimelineDescription>
                  <TimelineTime dateTime="2023-10-01T11:00:00">Oct 01, 2023 - 11:00 AM</TimelineTime>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
