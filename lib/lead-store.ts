import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { appendFile, mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import type { LeadInput } from "@/lib/lead-schema"

export type StoredLead = LeadInput & {
  id: string
  createdAt: string
  emailed: boolean
}

const filePath = path.join(process.cwd(), "data", "leads.jsonl")
const tablePath = path.join(process.cwd(), "data", "submissions.json")

export async function storeRow(row: Record<string, unknown>) {
  await mkdir(path.dirname(tablePath), { recursive: true })
  let rows: Record<string, unknown>[] = []
  try {
    const raw = await readFile(tablePath, "utf8")
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) rows = parsed as Record<string, unknown>[]
  } catch {
    rows = []
  }
  rows.push(row)
  await writeFile(tablePath, JSON.stringify(rows, null, 2))
  await appendFile(filePath, `${JSON.stringify(row)}\n`, "utf8")
}

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
    `Notes: ${lead.notes || "Not specified"}`,
    `Submitted: ${lead.createdAt}`,
    `Reference: ${lead.id}`,
  ].join("\n")
}

export async function storeLead(lead: StoredLead) {
  await storeRow(lead)
}

const inbox = () => process.env.LEAD_INBOX || "support@talktogenie.ai"
const fromAddress = () => process.env.SES_FROM || process.env.RESEND_FROM || "support@mench.com"

export async function sendInboxEmail(message: { subject: string; text: string; replyTo?: string }) {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if (accessKeyId && secretAccessKey) {
    const client = new SESClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: { accessKeyId, secretAccessKey },
    })
    await client.send(
      new SendEmailCommand({
        Source: fromAddress(),
        Destination: { ToAddresses: [inbox()] },
        ReplyToAddresses: message.replyTo ? [message.replyTo] : undefined,
        Message: {
          Subject: { Data: message.subject, Charset: "UTF-8" },
          Body: { Text: { Data: message.text, Charset: "UTF-8" } },
        },
      }),
    )
    return true
  }

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
      to: [inbox()],
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  })

  return response.ok
}

export async function emailLead(lead: StoredLead) {
  return sendInboxEmail({
    replyTo: lead.email,
    subject: `${lead.intent === "demo" ? "Demo request" : "Meet Genie"}: ${lead.company} (${lead.listings} listings)`,
    text: formatLead(lead),
  })
}
