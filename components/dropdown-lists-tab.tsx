"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SECTORS,
  ENGAGEMENT_TYPES,
  CONTACT_METHODS,
  STATUSES,
  RELATIONSHIP_STRENGTHS,
} from "@/lib/capd-data"

export function DropdownListsTab() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            These standardized values are used for data validation in the Main Database. 
            They ensure consistency and prevent messy, inconsistent data entry.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b">
            <CardTitle className="text-lg text-primary">Sectors</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {SECTORS.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50 transition-colors text-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b">
            <CardTitle className="text-lg text-primary">Engagement Types</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {ENGAGEMENT_TYPES.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50 transition-colors text-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b">
            <CardTitle className="text-lg text-primary">Contact Methods</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {CONTACT_METHODS.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50 transition-colors text-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b">
            <CardTitle className="text-lg text-primary">Status Values</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {STATUSES.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50 transition-colors text-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-3 bg-primary/5 border-b">
            <CardTitle className="text-lg text-primary">Relationship Strength</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {RELATIONSHIP_STRENGTHS.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50 transition-colors text-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
