// CAPD Industry Partners Database Types and Constants

export interface Partner {
  id: string
  company: string
  sector: string
  location: string
  contactName: string
  role: string
  email: string
  phone: string
  engagementType: string
  lastContactDate: string
  preferredContactMethod: string
  status: string
  relationshipStrength: string
  notes: string
}

// Dropdown Lists (Data Standardization Engine)
export const SECTORS = [
  "ICT / Technology",
  "Banking & Finance",
  "NGO / Development",
  "Government",
  "Education",
  "Health",
  "Manufacturing",
  "Consulting",
  "Media & Communications",
  "Agriculture",
]

export const ENGAGEMENT_TYPES = [
  "Internship Placement",
  "Recruitment Drive",
  "Career Fair",
  "Mentorship",
  "Guest Lecture",
  "Partnership / MoU",
  "Research Collaboration",
  "Potential Partner",
]

export const CONTACT_METHODS = ["Email", "Phone", "LinkedIn"]

export const STATUSES = ["Active", "Dormant"]

export const RELATIONSHIP_STRENGTHS = ["Strong", "Medium", "Weak"]

// Example starter data
export const INITIAL_DATA: Partner[] = [
  {
    id: "1",
    company: "Econet Wireless Zimbabwe",
    sector: "ICT / Technology",
    location: "Zimbabwe – Harare",
    contactName: "John Doe",
    role: "HR Manager",
    email: "john@econet.co.zw",
    phone: "+263 77 123 4567",
    engagementType: "Internship Placement",
    lastContactDate: "2025-03-10",
    preferredContactMethod: "Email",
    status: "Active",
    relationshipStrength: "Strong",
    notes: "Participated in career expo",
  },
  {
    id: "2",
    company: "Delta Corporation Zimbabwe",
    sector: "Manufacturing",
    location: "Zimbabwe – Harare",
    contactName: "Jane Smith",
    role: "Talent Acquisition Lead",
    email: "jane.smith@delta.co.zw",
    phone: "+263 71 987 6543",
    engagementType: "Recruitment Drive",
    lastContactDate: "2025-01-15",
    preferredContactMethod: "Email",
    status: "Active",
    relationshipStrength: "Medium",
    notes: "Annual graduate recruitment partner",
  },
  {
    id: "3",
    company: "CBZ Bank",
    sector: "Banking & Finance",
    location: "Zimbabwe – Harare",
    contactName: "Peter Moyo",
    role: "HR Director",
    email: "p.moyo@cbz.co.zw",
    phone: "+263 78 555 1234",
    engagementType: "Career Fair",
    lastContactDate: "2024-11-20",
    preferredContactMethod: "Phone",
    status: "Active",
    relationshipStrength: "Strong",
    notes: "Long-term partner since 2020",
  },
  {
    id: "4",
    company: "USAID Zimbabwe",
    sector: "NGO / Development",
    location: "Zimbabwe – Harare",
    contactName: "Sarah Williams",
    role: "Program Officer",
    email: "swilliams@usaid.gov",
    phone: "+263 24 250 4000",
    engagementType: "Research Collaboration",
    lastContactDate: "2024-08-05",
    preferredContactMethod: "Email",
    status: "Dormant",
    relationshipStrength: "Weak",
    notes: "Email bounced - needs update",
  },
  {
    id: "5",
    company: "TelOne",
    sector: "ICT / Technology",
    location: "Zimbabwe – Harare",
    contactName: "Michael Chikwava",
    role: "Training Manager",
    email: "m.chikwava@telone.co.zw",
    phone: "+263 77 888 9999",
    engagementType: "Mentorship",
    lastContactDate: "2025-02-28",
    preferredContactMethod: "LinkedIn",
    status: "Active",
    relationshipStrength: "Medium",
    notes: "Interested in mentorship program",
  },
]

// Helper function to check if contact is outdated (> 6 months)
export function isContactOutdated(dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  return date < sixMonthsAgo
}

// Helper function to generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
