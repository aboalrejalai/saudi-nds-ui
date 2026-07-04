"use client";

import React, { useState } from "react"
import { Rating } from "@/registry/dga/ui/rating"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/dga/ui/card"
import { Label } from "@/registry/dga/ui/label"

export default function RatingTestPage() {
  const [rating, setRating] = useState(3)
  const [halfRating, setHalfRating] = useState(2.5)

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rating Component (التقييم)</h1>
        <p className="text-muted-foreground">
          Reverse engineered from dev-dga-main and converted completely to Tailwind CSS.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>Test out the different sizes and features of the Rating component.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Basic Usage */}
          <div className="space-y-3">
            <Label className="text-base">Standard Rating</Label>
            <div className="flex items-center gap-4">
              <Rating 
                value={rating} 
                onValueChange={setRating} 
              />
              <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                Value: {rating}
              </span>
            </div>
          </div>

          {/* Half Stars */}
          <div className="space-y-3">
            <Label className="text-base">Allow Half Stars</Label>
            <div className="flex items-center gap-4">
              <Rating 
                allowHalf 
                value={halfRating} 
                onValueChange={setHalfRating} 
              />
              <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                Value: {halfRating}
              </span>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <Label className="text-base">Sizes</Label>
            <div className="flex items-center gap-6">
              <Rating size="sm" defaultValue={2} />
              <Rating size="md" defaultValue={3} />
              <Rating size="lg" defaultValue={4} />
            </div>
          </div>

          {/* Read Only & Disabled */}
          <div className="space-y-3">
            <Label className="text-base">Read Only vs Disabled</Label>
            <div className="flex items-center gap-8">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Read Only</p>
                <Rating readOnly value={4} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Disabled</p>
                <Rating disabled value={3} />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
