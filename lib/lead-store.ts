import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import type { LeadInput } from "@/lib/lead-schema"

export const LEAD_INBOX_PATH = "/ops/inbox/r7k2m9qx4w"

export type StoredLead = LeadInput & {
  id: string
  createdAt: string
}

function openStore() {
  const candidates = [
    path.join(process.cwd(), "data", "leads.json"),
    path.join("/tmp", "talktogenie", "leads.json"),
  ]
  let lastError: unknown
  for (const file of candidates) {
    try {
      mkdirSync(path.dirname(file), { recursive: true })
      if (!existsSync(file)) writeFileSync(file, "[]")
      return { file, ephemeral: file.startsWith("/tmp") }
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

function readOrEmpty(file: string) {
  try {
    return readFileSync(file, "utf8")
  } catch {
    return "[]"
  }
}

let cached: ReturnType<typeof openStore> | null = null

function store() {
  if (!cached) cached = openStore()
  return cached
}

function readLeads(): StoredLead[] {
  const raw = readOrEmpty(store().file)
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isLead)
  } catch {
    return []
  }
}

function isLead(value: unknown): value is StoredLead {
  if (!value || typeof value !== "object") return false
  const row = value as Partial<StoredLead>
  return typeof row.id === "string" && typeof row.createdAt === "string" && typeof row.email === "string"
}

export function storeLead(lead: StoredLead) {
  const rows = readLeads()
  rows.push(lead)
  writeFileSync(store().file, JSON.stringify(rows, null, 2))
  return { ephemeral: store().ephemeral }
}

export function listLeads(): StoredLead[] {
  return readLeads().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function leadStoreIsEphemeral() {
  return store().ephemeral
}
