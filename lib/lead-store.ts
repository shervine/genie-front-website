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
const tmpRoot = path.join("/tmp", "talktogenie")

export type StoreDurability = "durable" | "ephemeral"

async function persist(table: string, jsonl: string, row: Record<string, unknown>) {
  await mkdir(path.dirname(table), { recursive: true })
  let rows: Record<string, unknown>[] = []
  try {
    const raw = await readFile(table, "utf8")
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) rows = parsed as Record<string, unknown>[]
  } catch {
    rows = []
  }
  rows.push(row)
  await writeFile(table, JSON.stringify(rows, null, 2))
  await appendFile(jsonl, `${JSON.stringify(row)}\n`, "utf8")
}

export async function storeRow(row: Record<string, unknown>): Promise<StoreDurability> {
  try {
    await persist(tablePath, filePath, row)
    return "durable"
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : ""
    if (code === "EROFS" || code === "EACCES" || code === "EPERM" || code === "ROFS") {
      await persist(
        path.join(tmpRoot, "submissions.json"),
        path.join(tmpRoot, "leads.jsonl"),
        row,
      )
      return "ephemeral"
    }
    throw error
  }
}

export function formatLead(lead: StoredLead) {
  return [
    `Intent: Request Demo`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
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
  return storeRow(lead)
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
    subject: `Request Demo: ${lead.company} (${lead.listings} listings)`,
    text: formatLead(lead),
  })
}
