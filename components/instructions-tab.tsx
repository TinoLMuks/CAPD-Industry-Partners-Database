"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function InstructionsTab() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="text-primary">Purpose</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This database tracks CAPD&apos;s industry partners and engagement history. It serves as a 
            structured, standardized, searchable relationship database for managing all partner 
            communications and collaboration activities.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="text-primary">How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Searching & Filtering</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use the search box to find partners by company name, contact name, or email</li>
              <li>Use dropdown filters to narrow by Sector, Engagement Type, or Status</li>
              <li>Click &quot;Clear Filters&quot; to reset all filters</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Adding New Partners</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Click the &quot;Add Partner&quot; button in the Main Database tab</li>
              <li>Fill in required fields marked with *</li>
              <li>Use full official company names (e.g., &quot;Delta Corporation Zimbabwe&quot; not &quot;Delta&quot;)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Editing & Deleting</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Click the pencil icon to edit a row inline</li>
              <li>Click Save to confirm changes or Cancel to discard</li>
              <li>Click the trash icon to delete a partner (cannot be undone)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Exporting Data</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Click &quot;Export to Excel&quot; to download the complete database</li>
              <li>The export includes all 3 sheets: Main Database, Dropdown Lists, and Instructions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="text-primary">Data Entry Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Company Names</h4>
              <div className="space-y-1 text-sm">
                <p className="text-green-600">Correct: Delta Corporation Zimbabwe</p>
                <p className="text-primary">Incorrect: Delta</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Dates</h4>
              <div className="space-y-1 text-sm">
                <p className="text-green-600">Format: YYYY-MM-DD</p>
                <p className="text-muted-foreground">Example: 2025-03-10</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Phone Numbers</h4>
              <div className="space-y-1 text-sm">
                <p className="text-green-600">Always include country code</p>
                <p className="text-muted-foreground">Example: +263 77 123 4567</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Emails</h4>
              <div className="space-y-1 text-sm">
                <p className="text-green-600">Must be valid format</p>
                <p className="text-muted-foreground">No spaces allowed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="text-primary">Visual Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="w-8 h-8 bg-amber-200 border-2 border-amber-400 rounded-md flex-shrink-0" />
              <span className="text-sm">Yellow highlight = Last contact was more than 6 months ago (needs follow-up)</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <div className="w-8 h-8 bg-red-200 border-2 border-red-400 rounded-md flex-shrink-0" />
              <span className="text-sm">Red highlight = Missing email address (needs update)</span>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="font-semibold mb-3">Status Badges</h4>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Active</Badge>
                <span className="text-sm text-muted-foreground">Currently engaged</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-400 text-white">Dormant</Badge>
                <span className="text-sm text-muted-foreground">Inactive relationship</span>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="font-semibold mb-3">Relationship Strength</h4>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Strong</Badge>
                <span className="text-sm text-muted-foreground">Regular engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500 text-white">Medium</Badge>
                <span className="text-sm text-muted-foreground">Occasional contact</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-white">Weak</Badge>
                <span className="text-sm text-muted-foreground">Minimal interaction</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="text-primary">Notes Column Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-4">
            Use the Notes column to add intelligence and context:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-primary font-medium">Example:</span>
              <span className="text-sm">&quot;Met at 2025 Career Expo&quot;</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-primary font-medium">Example:</span>
              <span className="text-sm">&quot;Contact via LinkedIn&quot;</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-primary font-medium">Example:</span>
              <span className="text-sm">&quot;Interested in internship placements&quot;</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-primary font-medium">Example:</span>
              <span className="text-sm">&quot;Email bounced - needs update&quot;</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
