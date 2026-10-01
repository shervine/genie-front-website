export const LISTING_BANDS = [
  "1–20",
  "21–50",
  "51–100",
  "101–250",
  "251–500",
  "501–1,000",
  "1,001–2,000",
  "2,000+",
] as const

export const AUTOMATION_OPTIONS = [
  "Guest Messaging",
  "Operations",
  "Task Management",
  "Upsells",
  "Financial Reconciliation",
  "Owner Communication",
  "Voice Concierge",
  "Analytics",
  "Everything",
] as const

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "Ireland",
  "United Arab Emirates",
  "France",
  "Spain",
  "Italy",
  "Portugal",
  "Germany",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Greece",
  "Croatia",
  "Mexico",
  "Costa Rica",
  "Brazil",
  "Colombia",
  "Thailand",
  "Indonesia",
  "Japan",
  "Singapore",
  "South Africa",
  "Morocco",
  "Turkey",
  "Other",
] as const

export type LeadInput = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  website: string
  country: string
  listings: string
  pms: string
  automate: string[]
  notes: string
  intent: "meet" | "demo"
}

export type FieldErrors = Partial<Record<keyof LeadInput, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanPhone(value: unknown) {
  if (typeof value !== "string") return ""
  return value
    .replace(/[^\d+\-().\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32)
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return ""
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max)
}

function cleanNote(value: unknown, max: number) {
  if (typeof value !== "string") return ""
  return value
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max)
}

export function validateLead(input: unknown):
  | { ok: true; value: LeadInput }
  | { ok: false; message: string; fieldErrors: FieldErrors } {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {}
  const fieldErrors: FieldErrors = {}

  const value: LeadInput = {
    firstName: clean(source.firstName, 80),
    lastName: clean(source.lastName, 80),
    email: clean(source.email, 160).toLowerCase(),
    phone: cleanPhone(source.phone),
    company: clean(source.company, 120),
    website: clean(source.website, 200),
    country: clean(source.country, 80),
    listings: clean(source.listings, 20),
    pms: clean(source.pms, 120),
    automate: [],
    notes: cleanNote(source.notes, 2000),
    intent: source.intent === "demo" ? "demo" : "meet",
  }

  if (value.firstName.length < 1) fieldErrors.firstName = "Add a first name."
  if (value.lastName.length < 1) fieldErrors.lastName = "Add a last name."
  if (!EMAIL.test(value.email)) fieldErrors.email = "Add a work email."
  if (value.phone.replace(/\D/g, "").length < 7) fieldErrors.phone = "Add a telephone number."
  if (value.company.length < 2) fieldErrors.company = "Add your company name."
  if (value.website.length < 3) fieldErrors.website = "Add your company website."
  if (!COUNTRIES.includes(value.country as (typeof COUNTRIES)[number])) {
    fieldErrors.country = "Choose a country."
  }
  if (!LISTING_BANDS.includes(value.listings as (typeof LISTING_BANDS)[number])) {
    fieldErrors.listings = "Choose a listing range."
  }
  if (value.pms.length < 2) fieldErrors.pms = "Tell us the PMS or channel manager you use."

  const requested = Array.isArray(source.automate) ? source.automate : []
  const allowed = new Set<string>(AUTOMATION_OPTIONS)
  value.automate = [...new Set(requested.map((item) => clean(item, 40)))].filter((item) =>
    allowed.has(item),
  )

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    }
  }

  return { ok: true, value }
}
