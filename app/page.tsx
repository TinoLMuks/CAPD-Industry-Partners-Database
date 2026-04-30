"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { DatabaseTable } from "@/components/database-table"
import { InstructionsTab } from "@/components/instructions-tab"
import { DropdownListsTab } from "@/components/dropdown-lists-tab"
import {
  type Partner,
  // INITIAL_DATA,  // No longer needed
  SECTORS,
  ENGAGEMENT_TYPES,
  STATUSES,
  CONTACT_METHODS,
  RELATIONSHIP_STRENGTHS,
} from "@/lib/capd-data"
import { supabase } from '@/lib/supabase'  // Added Supabase import
import { Download, Search, X, Database, List, BookOpen, Users, UserCheck, UserX } from "lucide-react"

export default function CAPDDatabase() {
  const [data, setData] = useState<Partner[]>([])  // Changed from INITIAL_DATA to []
  const [loading, setLoading] = useState(true)    // Added loading state
  const [filters, setFilters] = useState({
    sector: "",
    engagementType: "",
    status: "",
    search: "",
  })

  // Added useEffect to load data from Supabase on startup
  useEffect(() => {
    async function loadPartners() {
      const { data: rows, error } = await supabase
        .from('partners')
        .select('*')
        .order('company')
      
      if (!error && rows) {
        setData(rows as Partner[])
      }
      setLoading(false)
    }
    loadPartners()
  }, [])

  const clearFilters = () => {
    setFilters({
      sector: "",
      engagementType: "",
      status: "",
      search: "",
    })
  }

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new()

    // Main Database Sheet
    const mainData = data.map((p) => ({
      "Company/Organisation": p.company,
      Sector: p.sector,
      "Country/City": p.location,
      "Primary Contact Name": p.contactName,
      "Role/Title": p.role,
      Email: p.email,
      Phone: p.phone,
      "Type of Engagement": p.engagementType,
      "Last Contact Date": p.lastContactDate,
      "Preferred Contact Method": p.preferredContactMethod,
      Status: p.status,
      "Relationship Strength": p.relationshipStrength,
      Notes: p.notes,
    }))
    const mainSheet = XLSX.utils.json_to_sheet(mainData)
    
    // Set column widths
    mainSheet["!cols"] = [
      { wch: 30 }, // Company
      { wch: 20 }, // Sector
      { wch: 20 }, // Location
      { wch: 20 }, // Contact Name
      { wch: 20 }, // Role
      { wch: 30 }, // Email
      { wch: 18 }, // Phone
      { wch: 22 }, // Engagement
      { wch: 15 }, // Last Contact
      { wch: 15 }, // Method
      { wch: 10 }, // Status
      { wch: 12 }, // Strength
      { wch: 40 }, // Notes
    ]
    XLSX.utils.book_append_sheet(workbook, mainSheet, "Main_Database")

    // Dropdown Lists Sheet
    const maxLength = Math.max(
      SECTORS.length,
      ENGAGEMENT_TYPES.length,
      CONTACT_METHODS.length,
      STATUSES.length,
      RELATIONSHIP_STRENGTHS.length
    )
    const dropdownData = []
    for (let i = 0; i < maxLength; i++) {
      dropdownData.push({
        Sector: SECTORS[i] || "",
        "Engagement Type": ENGAGEMENT_TYPES[i] || "",
        "Contact Method": CONTACT_METHODS[i] || "",
        Status: STATUSES[i] || "",
        "Relationship Strength": RELATIONSHIP_STRENGTHS[i] || "",
      })
    }
    const dropdownSheet = XLSX.utils.json_to_sheet(dropdownData)
    dropdownSheet["!cols"] = [
      { wch: 25 },
      { wch: 25 },
      { wch: 18 },
      { wch: 12 },
      { wch: 22 },
    ]
    XLSX.utils.book_append_sheet(workbook, dropdownSheet, "Dropdown_Lists")

    // Instructions Sheet
    const instructionsData = [
      { Section: "PURPOSE", Content: "" },
      { Section: "", Content: "This database tracks CAPD's industry partners and engagement history." },
      { Section: "", Content: "" },
      { Section: "HOW TO USE", Content: "" },
      { Section: "", Content: "- Use filters to search by sector, engagement type, or status" },
      { Section: "", Content: "- Do not change dropdown values directly" },
      { Section: "", Content: "- Keep formatting consistent" },
      { Section: "", Content: "" },
      { Section: "DATA ENTRY RULES", Content: "" },
      { Section: "", Content: "- Use dropdowns for controlled fields" },
      { Section: "", Content: "- Follow date format: YYYY-MM-DD" },
      { Section: "", Content: "- Avoid duplicates" },
      { Section: "", Content: "- Use full official company names" },
      { Section: "", Content: "- Always include country code in phone numbers (+263...)" },
      { Section: "", Content: "" },
      { Section: "VISUAL INDICATORS", Content: "" },
      { Section: "", Content: "- Yellow rows = Last contact > 6 months (needs follow-up)" },
      { Section: "", Content: "- Red rows = Missing email address (needs update)" },
    ]
    const instructionsSheet = XLSX.utils.json_to_sheet(instructionsData)
    instructionsSheet["!cols"] = [{ wch: 20 }, { wch: 60 }]
    XLSX.utils.book_append_sheet(workbook, instructionsSheet, "Instructions")

    // Download
    XLSX.writeFile(workbook, "CAPD_Industry_Partners_Database_2026.xlsx")
  }

  const activeCount = data.filter((p) => p.status === "Active").length
  const dormantCount = data.filter((p) => p.status === "Dormant").length

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading partners from database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <Database className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  CAPD Industry Partners Database
                </h1>
                <p className="text-white/80 text-sm md:text-base mt-0.5">
                  2026 Edition - Relationship Management System
                </p>
              </div>
            </div>
            <Button
              onClick={exportToExcel}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold"
            >
              <Download className="mr-2 h-5 w-5" />
              Export to Excel
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Partners
                  </p>
                  <p className="text-4xl font-bold text-foreground mt-1">{data.length}</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-green-50 dark:to-green-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Active Partners
                  </p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-1">{activeCount}</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <UserCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-gray-50 dark:to-gray-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Dormant Partners
                  </p>
                  <p className="text-4xl font-bold text-gray-500 mt-1">{dormantCount}</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <UserX className="h-7 w-7 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="main" className="space-y-6">
          <TabsList className="bg-card border shadow-sm p-1 h-auto">
            <TabsTrigger 
              value="main" 
              className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Database className="h-4 w-4" />
              <span className="font-medium">Main Database</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dropdowns" 
              className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <List className="h-4 w-4" />
              <span className="font-medium">Dropdown Lists</span>
            </TabsTrigger>
            <TabsTrigger 
              value="instructions" 
              className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Instructions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-6">
            {/* Filters Card */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Filter Partners</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative lg:col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search company, contact, email..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10 bg-background border-input"
                    />
                  </div>
                  <Select
                    value={filters.sector}
                    onValueChange={(v) => setFilters({ ...filters, sector: v })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.engagementType}
                    onValueChange={(v) => setFilters({ ...filters, engagementType: v })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Engagement Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Engagement Types</SelectItem>
                      {ENGAGEMENT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.status}
                    onValueChange={(v) => setFilters({ ...filters, status: v })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="border-primary/30 hover:bg-primary/5 hover:border-primary"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <DatabaseTable data={data} onDataChange={setData} filters={filters} />
          </TabsContent>

          <TabsContent value="dropdowns">
            <DropdownListsTab />
          </TabsContent>

          <TabsContent value="instructions">
            <InstructionsTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Database className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                CAPD Industry Partners Database
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              A structured, standardized, searchable relationship database
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}