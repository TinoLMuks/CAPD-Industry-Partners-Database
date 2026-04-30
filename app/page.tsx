"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { supabase } from "@/lib/supabase"
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
  SECTORS,
  ENGAGEMENT_TYPES,
  STATUSES,
  CONTACT_METHODS,
  RELATIONSHIP_STRENGTHS,
} from "@/lib/capd-data"
import { Download, Search, X, Database, List, BookOpen, Users, UserCheck, UserX } from "lucide-react"

export default function CAPDDatabase() {
  const [data, setData] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    sector: "",
    engagementType: "",
    status: "",
    search: "",
  })

  useEffect(() => {
    async function loadPartners() {
      const { data: rows, error } = await supabase
        .from("partners")
        .select("*")
        .order("company")

      if (!error && rows) setData(rows as Partner[])
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

    mainSheet["!cols"] = [
      { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
      { wch: 20 }, { wch: 30 }, { wch: 18 }, { wch: 22 },
      { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 12 }, { wch: 40 },
    ]

    XLSX.utils.book_append_sheet(workbook, mainSheet, "Main_Database")

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
    XLSX.utils.book_append_sheet(workbook, dropdownSheet, "Dropdown_Lists")

    XLSX.writeFile(workbook, "CAPD_Industry_Partners_Database_2026.xlsx")
  }

  const activeCount = data.filter((p) => p.status === "Active").length
  const dormantCount = data.filter((p) => p.status === "Dormant").length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading partners...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-primary">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-white">
            CAPD Industry Partners Database
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <DatabaseTable data={data} onDataChange={setData} filters={filters} />
      </main>
    </div>
  )
}