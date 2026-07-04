"use client"

import React, { useState } from "react"
import { 
  FilterBar, 
  FilterSearch, 
  FilterMenu, 
  FilterApplied, 
  FilterChip 
} from "@/registry/dga/ui/filter"
import { Checkbox } from "@/registry/dga/ui/checkbox"
import { Label } from "@/registry/dga/ui/label"
import { Card, CardContent } from "@/registry/dga/ui/card"
import { Badge } from "@/registry/dga/ui/badge"

const DUMMY_DATA = [
  { id: 1, name: "Task A", status: "Active", department: "Engineering" },
  { id: 2, name: "Task B", status: "Pending", department: "Design" },
  { id: 3, name: "Task C", status: "Complete", department: "Engineering" },
  { id: 4, name: "Task D", status: "Active", department: "Marketing" },
  { id: 5, name: "Task E", status: "Pending", department: "Engineering" },
]

export default function FilterTestPage() {
  const [search, setSearch] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  
  // Handlers
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    )
  }

  const handleReset = () => {
    setSelectedStatuses([])
    setSearch("")
  }

  // Filter Logic
  const filteredData = DUMMY_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">NDS Vanilla Filter - Reverse Engineered</h1>
        <p className="text-muted-foreground">This is the locally tested Shadcn equivalent of the NDS Vanilla Filter.</p>
      </div>

      {/* FILTER COMPONENT */}
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <FilterBar>
          <FilterSearch 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />
          
          <FilterMenu 
            onReset={() => setSelectedStatuses([])}
            onApply={() => console.log("Filters applied!")}
          >
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Status</h4>
              <div className="space-y-2">
                {["Active", "Pending", "Complete"].map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                    />
                    <Label htmlFor={`status-${status}`} className="font-normal cursor-pointer">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </FilterMenu>
        </FilterBar>

        <FilterApplied>
          {selectedStatuses.map(status => (
            <FilterChip key={status} onRemove={() => toggleStatus(status)}>
              Status: {status}
            </FilterChip>
          ))}
          {search && (
            <FilterChip onRemove={() => setSearch("")}>
              Search: "{search}"
            </FilterChip>
          )}
        </FilterApplied>
      </div>

      {/* RENDERED CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <div className="flex gap-2">
                  <Badge variant={item.status === 'Active' ? 'default' : item.status === 'Complete' ? 'secondary' : 'outline'}>
                    {item.status}
                  </Badge>
                  <Badge variant="outline">{item.department}</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            No tasks found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}
