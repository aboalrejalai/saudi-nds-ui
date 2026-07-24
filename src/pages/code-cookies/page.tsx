"use client";

import React, { useState } from "react"
import { Code } from "@/registry/dga/ui/code"
import { CookiesPopup } from "@/registry/dga/ui/cookies"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"
import { Button } from "@/registry/dga/ui/button"

export default function CodeCookiesTestPage() {
  const [showCookies, setShowCookies] = useState(false)

  const sampleCode = `async function handleFormSubmit(form) {
    const response = await submitForm(form);

    if (response.success) {
        console.log('Success!');
    } else {
        console.error('Failed');
    }
}`

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vanilla Components</h1>
        <p className="text-muted-foreground">
          Code and Cookies components reverse engineered from NDS-vanilla-main.
        </p>
      </div>

      {/* --- CODE COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Code (مقتطفات الكود)</CardTitle>
          <CardDescription>Display code blocks with syntax styling and copy functionality.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Basic Block (No lines)</h3>
            <Code code="npm install @dga/components" language="bash" />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">With Line Numbers</h3>
            <Code 
              code={sampleCode} 
              language="javascript" 
              showLineNumbers 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Inline Code</h3>
            <p className="text-muted-foreground">
              You can use <Code variant="inline" code="NDS.Cookies.show()" /> to programmatically open the cookies dialog anytime.
            </p>
          </div>

        </CardContent>
      </Card>

      {/* --- COOKIES COMPONENT --- */}
      <Card>
        <CardHeader>
          <CardTitle>Cookies Banner (شريط ملفات تعريف الارتباط)</CardTitle>
          <CardDescription>Consent banner for privacy compliance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The cookies banner is usually fixed to the bottom of the screen. 
              Click the button below to preview it.
            </p>
            <Button onClick={() => setShowCookies(true)}>
              Show Cookies Banner
            </Button>
          </div>

          {/* Render the actual fixed banner */}
          <CookiesPopup 
            open={showCookies} 
            onOpenChange={setShowCookies}
            variant="compact" // Use compact for testing so it doesn't span full width unnecessarily
            onAccept={() => {
              alert("Accepted!")
              setShowCookies(false)
            }}
            onDecline={() => {
              alert("Rejected Non-Essential!")
              setShowCookies(false)
            }}
          />

        </CardContent>
      </Card>

    </div>
  )
}
