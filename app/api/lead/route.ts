import { validateLead } from "@/lib/lead-schema"
import { storeLead, type StoredLead } from "@/lib/lead-store"

export const runtime = "nodejs"

const hits = new Map<string, number[]>()

function tooMany(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 15 * 60 * 1000)
  if (recent.length >= 8) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  if (tooMany(ip)) {
    return Response.json(
      {
        ok: false,
        message: "Please wait a few minutes, or email support@talktogenie.ai.",
      },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, message: "That submission could not be read." }, { status: 400 })
  }

  if (body && typeof body === "object" && "faxNumber" in body) {
    const fax = (body as { faxNumber?: unknown }).faxNumber
    if (typeof fax === "string" && fax.trim()) {
      return Response.json({ ok: true })
    }
  }

  const parsed = validateLead(body)
  if (!parsed.ok) {
    return Response.json(
      { ok: false, message: parsed.message, fieldErrors: parsed.fieldErrors },
      { status: 400 },
    )
  }

  const lead: StoredLead = {
    ...parsed.value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  try {
    storeLead(lead)
  } catch (error) {
    console.error("demo store failed", error)
    return Response.json(
      {
        ok: false,
        message: "We couldn’t save that. Email support@talktogenie.ai and we’ll take it from there.",
      },
      { status: 500 },
    )
  }

  console.info(`demo stored ${lead.id} company=${lead.company}`)
  return Response.json({ ok: true })
}
