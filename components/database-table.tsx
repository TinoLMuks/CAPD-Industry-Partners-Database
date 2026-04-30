"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Pencil, Trash2, Plus, AlertCircle } from "lucide-react"
import {
  type Partner,
  SECTORS,
  ENGAGEMENT_TYPES,
  CONTACT_METHODS,
  STATUSES,
  RELATIONSHIP_STRENGTHS,
  isContactOutdated,
  generateId,
} from "@/lib/capd-data"
import { cn } from "@/lib/utils"

interface DatabaseTableProps {
  data: Partner[]
  onDataChange: (data: Partner[]) => void
  filters: {
    sector: string
    engagementType: string
    status: string
    search: string
  }
}

const emptyPartner: Omit<Partner, "id"> = {
  company: "",
  sector: "",
  location: "",
  contactName: "",
  role: "",
  email: "",
  phone: "",
  engagementType: "",
  lastContactDate: "",
  preferredContactMethod: "",
  status: "Active",
  relationshipStrength: "Medium",
  notes: "",
}

export function DatabaseTable({ data, onDataChange, filters }: DatabaseTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partner | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPartner, setNewPartner] = useState<Omit<Partner, "id">>(emptyPartner)

  const filteredData = data.filter((partner) => {
    const matchesSector = !filters.sector || filters.sector === "all" || partner.sector === filters.sector
    const matchesEngagement =
      !filters.engagementType || filters.engagementType === "all" || partner.engagementType === filters.engagementType
    const matchesStatus = !filters.status || filters.status === "all" || partner.status === filters.status
    const matchesSearch =
      !filters.search ||
      partner.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      partner.contactName.toLowerCase().includes(filters.search.toLowerCase()) ||
      partner.email.toLowerCase().includes(filters.search.toLowerCase())
    return matchesSector && matchesEngagement && matchesStatus && matchesSearch
  })

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id)
    setEditData({ ...partner })
  }

  const handleSave = () => {
    if (editData) {
      onDataChange(data.map((p) => (p.id === editData.id ? editData : p)))
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData(null)
  }

  const handleDelete = (id: string) => {
    onDataChange(data.filter((p) => p.id !== id))
  }

  const handleAddNew = () => {
    const partner: Partner = {
      ...newPartner,
      id: generateId(),
    }
    onDataChange([...data, partner])
    setNewPartner(emptyPartner)
    setIsAddDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "Active" ? "default" : "secondary"} className={cn(
        status === "Active" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 hover:bg-gray-500 text-white"
      )}>
        {status}
      </Badge>
    )
  }

  const getStrengthBadge = (strength: string) => {
    const colors = {
      Strong: "bg-green-600 hover:bg-green-700 text-white",
      Medium: "bg-amber-500 hover:bg-amber-600 text-white",
      Weak: "bg-primary hover:bg-primary/90 text-white",
    }
    return (
      <Badge className={colors[strength as keyof typeof colors] || "bg-gray-500 text-white"}>
        {strength}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {filteredData.length} of {data.length} partners
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Industry Partner</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company/Organisation *</label>
                <Input
                  value={newPartner.company}
                  onChange={(e) => setNewPartner({ ...newPartner, company: e.target.value })}
                  placeholder="Full official name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sector *</label>
                <Select
                  value={newPartner.sector}
                  onValueChange={(v) => setNewPartner({ ...newPartner, sector: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country/City</label>
                <Input
                  value={newPartner.location}
                  onChange={(e) => setNewPartner({ ...newPartner, location: e.target.value })}
                  placeholder="Country – City"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Contact Name</label>
                <Input
                  value={newPartner.contactName}
                  onChange={(e) => setNewPartner({ ...newPartner, contactName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role/Title</label>
                <Input
                  value={newPartner.role}
                  onChange={(e) => setNewPartner({ ...newPartner, role: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                  placeholder="+263 77 123 4567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type of Engagement *</label>
                <Select
                  value={newPartner.engagementType}
                  onValueChange={(v) => setNewPartner({ ...newPartner, engagementType: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ENGAGEMENT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Contact Date</label>
                <Input
                  type="date"
                  value={newPartner.lastContactDate}
                  onChange={(e) => setNewPartner({ ...newPartner, lastContactDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Contact Method</label>
                <Select
                  value={newPartner.preferredContactMethod}
                  onValueChange={(v) => setNewPartner({ ...newPartner, preferredContactMethod: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_METHODS.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={newPartner.status}
                  onValueChange={(v) => setNewPartner({ ...newPartner, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Relationship Strength</label>
                <Select
                  value={newPartner.relationshipStrength}
                  onValueChange={(v) => setNewPartner({ ...newPartner, relationshipStrength: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select strength" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_STRENGTHS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={newPartner.notes}
                  onChange={(e) => setNewPartner({ ...newPartner, notes: e.target.value })}
                  placeholder="Context, source, etc."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="px-6">
                Cancel
              </Button>
              <Button
                onClick={handleAddNew}
                disabled={!newPartner.company || !newPartner.sector || !newPartner.engagementType}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Add Partner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-lg border shadow-sm">
        <div className="min-w-[1800px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5 border-b-2 border-primary/20">
                <TableHead className="font-semibold w-[180px]">Company/Organisation</TableHead>
                <TableHead className="font-semibold w-[140px]">Sector</TableHead>
                <TableHead className="font-semibold w-[140px]">Country/City</TableHead>
                <TableHead className="font-semibold w-[140px]">Contact Name</TableHead>
                <TableHead className="font-semibold w-[120px]">Role/Title</TableHead>
                <TableHead className="font-semibold w-[180px]">Email</TableHead>
                <TableHead className="font-semibold w-[140px]">Phone</TableHead>
                <TableHead className="font-semibold w-[140px]">Engagement Type</TableHead>
                <TableHead className="font-semibold w-[120px]">Last Contact</TableHead>
                <TableHead className="font-semibold w-[100px]">Method</TableHead>
                <TableHead className="font-semibold w-[80px]">Status</TableHead>
                <TableHead className="font-semibold w-[90px]">Strength</TableHead>
                <TableHead className="font-semibold w-[200px]">Notes</TableHead>
                <TableHead className="font-semibold w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((partner) => {
                const isEditing = editingId === partner.id
                const outdated = isContactOutdated(partner.lastContactDate)
                const missingEmail = !partner.email

                return (
                  <TableRow
                    key={partner.id}
                    className={cn(
                      outdated && "bg-amber-50 dark:bg-amber-950/20",
                      missingEmail && "bg-red-50 dark:bg-red-950/20"
                    )}
                  >
                    {isEditing && editData ? (
                      <>
                        <TableCell>
                          <Input
                            value={editData.company}
                            onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editData.sector}
                            onValueChange={(v) => setEditData({ ...editData, sector: v })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SECTORS.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.location}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.contactName}
                            onChange={(e) => setEditData({ ...editData, contactName: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.role}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editData.engagementType}
                            onValueChange={(v) => setEditData({ ...editData, engagementType: v })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ENGAGEMENT_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={editData.lastContactDate}
                            onChange={(e) => setEditData({ ...editData, lastContactDate: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editData.preferredContactMethod}
                            onValueChange={(v) => setEditData({ ...editData, preferredContactMethod: v })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTACT_METHODS.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editData.status}
                            onValueChange={(v) => setEditData({ ...editData, status: v })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editData.relationshipStrength}
                            onValueChange={(v) => setEditData({ ...editData, relationshipStrength: v })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {RELATIONSHIP_STRENGTHS.map((r) => (
                                <SelectItem key={r} value={r}>{r}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editData.notes}
                            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" onClick={handleSave} className="h-7 bg-primary hover:bg-primary/90 text-primary-foreground">
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel} className="h-7">
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium">
                          {partner.company}
                          {missingEmail && (
                            <AlertCircle className="inline ml-1 h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>{partner.sector}</TableCell>
                        <TableCell>{partner.location}</TableCell>
                        <TableCell>{partner.contactName}</TableCell>
                        <TableCell>{partner.role}</TableCell>
                        <TableCell className={cn(missingEmail && "text-red-500")}>
                          {partner.email || "Missing"}
                        </TableCell>
                        <TableCell>{partner.phone}</TableCell>
                        <TableCell>{partner.engagementType}</TableCell>
                        <TableCell className={cn(outdated && "text-amber-600 font-medium")}>
                          {partner.lastContactDate}
                          {outdated && " (outdated)"}
                        </TableCell>
                        <TableCell>{partner.preferredContactMethod}</TableCell>
                        <TableCell>{getStatusBadge(partner.status)}</TableCell>
                        <TableCell>{getStrengthBadge(partner.relationshipStrength)}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={partner.notes}>
                          {partner.notes}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(partner)}
                              className="h-7 w-7 p-0"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(partner.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                )
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8 text-muted-foreground">
                    No partners found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
