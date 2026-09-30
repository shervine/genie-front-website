import { appendFile, mkdir } from "fs/promises"
import path from "path"
import type { LeadInput } from "@/lib/lead-schema"

export type StoredLead = LeadInput & {
  id: string
  createdAt: string
  emailed: boolean
}

const filePath = path.join(process.cwd(), "data", "leads.jsonl")

export function formatLead(lead: StoredLead) {
  return [
    `Intent: ${lead.intent === "demo" ? "Book a demo" : "Meet Genie"}`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Website: ${lead.website}`,
    `Country: ${lead.country}`,
    `Listings: ${lead.listings}`,
    `PMS / channel manager: ${lead.pms}`,
    `Automate: ${lead.automate.length ? lead.automate.join(", ") : "Not specified"}`,
    `Submitted: ${lead.createdAt}`,
    `Reference: ${lead.id}`,
  ].join("\n")
}

export async function storeLead(lead: StoredLead) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8")
}

export async function emailLead(lead: StoredLead) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) return false

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["support@talktogenie.ai"],
      replyTo: lead.email,
      subject: `${lead.intent === "demo" ? "Demo request" : "Meet Genie"}: ${lead.company} (${lead.listings} listings)`,
      text: formatLead(lead),
    }),
  })

  return response.ok
}
