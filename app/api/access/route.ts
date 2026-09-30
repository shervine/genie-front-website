import { sendInboxEmail, storeRow } from "@/lib/lead-store"

export const runtime = "nodejs"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, message: "That request could not be read." }, { status: 400 })
  }

  const email = body && typeof body === "object" && "email" in body ? String((body as { email?: unknown }).email || "") : ""
  const clean = email.trim().toLowerCase().slice(0, 160)
  if (!EMAIL.test(clean)) {
    return Response.json({ ok: false, message: "Add a work email." }, { status: 400 })
  }

  const createdAt = new Date().toISOString()
  const text = [`Access request`, `Email: ${clean}`, `Submitted: ${createdAt}`].join("\n")
  let emailed = false
  try {
    emailed = await sendInboxEmail({
      replyTo: clean,
      subject: `Sign-in request: ${clean}`,
      text,
    })
  } catch {
    emailed = false
  }
  const row = { id: crypto.randomUUID(), type: "sign-in", email: clean, createdAt, emailed }
  try {
    await storeRow(row)
  } catch {
    return Response.json(
      { ok: false, emailed, message: "We couldn’t store that. Email support@superhost.management." },
      { status: 500 },
    )
  }

  console.info(`access request emailed=${emailed}`)
  return Response.json({ ok: true, emailed })
}
