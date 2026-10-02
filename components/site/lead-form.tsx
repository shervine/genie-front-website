"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AUTOMATION_OPTIONS,
  COUNTRIES,
  LISTING_BANDS,
  type FieldErrors,
  validateLead,
} from "@/lib/lead-schema"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export function LeadForm({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [country, setCountry] = useState("")
  const [listings, setListings] = useState("")
  const [pms, setPms] = useState("")
  const [automate, setAutomate] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [faxNumber, setFaxNumber] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [emailed, setEmailed] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setMessage("")
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      company,
      website,
      country,
      listings,
      pms,
      automate,
      notes,
      faxNumber,
    }
    const local = validateLead(payload)
    if (!local.ok) {
      setErrors(local.fieldErrors)
      setMessage(local.message)
      return
    }
    setErrors({})
    setPending(true)
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as {
        ok?: boolean
        emailed?: boolean
        message?: string
        fieldErrors?: FieldErrors
      }
      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {})
        setMessage(data.message || "We couldn’t send that. Email support@talktogenie.ai.")
        return
      }
      setEmailed(Boolean(data.emailed))
      setDone(true)
    } catch {
      setMessage("We couldn’t reach the server. Email support@talktogenie.ai and include your portfolio size.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Section id="meet">
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow>Onboarding</Eyebrow>
          <Display as={titleAs} className="mt-4">
            Tell me the wish.
          </Display>
          <Lede className="mt-5">
            Tell me the shape of the company. I’ll take the wish to the team, and onboarding starts from there.
          </Lede>
          <ol className="mt-8 space-y-4 text-sm text-mist">
            <li className="text-ink">1. I read how you operate.</li>
            <li>2. The team replies to your work email.</li>
            <li>3. You connect the stack, and I start granting the work you allow.</li>
          </ol>
        </div>

        {done ? (
          <div className="panel rounded-[28px] p-8">
            <p className="font-display text-4xl text-ink">Your wish has been received. 🧞‍♂️</p>
            <p className="mt-4 text-mist">
              We’ll reply to {email} about {company}.
            </p>
            <p className="mt-3 text-sm text-mist">
              {emailed
                ? "Sent to support@talktogenie.ai."
                : "Email delivery is not configured on this server yet. Write support@talktogenie.ai directly so the wish is not waiting on a missing mail key."}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="panel rounded-[28px] p-5 sm:p-7" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="first-name" label="First name" error={errors.firstName}>
                <Input id="first-name" autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="h-11" aria-invalid={Boolean(errors.firstName)} />
              </Field>
              <Field id="last-name" label="Last name" error={errors.lastName}>
                <Input id="last-name" autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} className="h-11" aria-invalid={Boolean(errors.lastName)} />
              </Field>
              <Field id="work-email" label="Work email" error={errors.email}>
                <Input id="work-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11" aria-invalid={Boolean(errors.email)} />
              </Field>
              <Field id="phone" label="Telephone" error={errors.phone}>
                <Input id="phone" type="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} className="h-11" aria-invalid={Boolean(errors.phone)} />
              </Field>
              <Field id="company" label="Company name" error={errors.company}>
                <Input id="company" autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} className="h-11" aria-invalid={Boolean(errors.company)} />
              </Field>
              <Field id="website" label="Website" error={errors.website}>
                <Input id="website" autoComplete="url" placeholder="company.com" value={website} onChange={(event) => setWebsite(event.target.value)} className="h-11" aria-invalid={Boolean(errors.website)} />
              </Field>
              <Field id="country" label="Country" error={errors.country}>
                <Select
                  value={country || null}
                  onValueChange={(value) => {
                    if (typeof value === "string") setCountry(value)
                  }}
                  items={COUNTRIES.map((item) => ({ value: item, label: item }))}
                >
                  <SelectTrigger id="country" className="h-11 w-full" aria-invalid={Boolean(errors.country)}>
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field id="listings" label="Number of listings" error={errors.listings}>
                <Select
                  value={listings || null}
                  onValueChange={(value) => {
                    if (typeof value === "string") setListings(value)
                  }}
                  items={LISTING_BANDS.map((item) => ({ value: item, label: item }))}
                >
                  <SelectTrigger id="listings" className="h-11 w-full" aria-invalid={Boolean(errors.listings)}>
                    <SelectValue placeholder="Choose a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTING_BANDS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field id="pms" label="PMS / channel manager" error={errors.pms}>
                <Input id="pms" value={pms} onChange={(event) => setPms(event.target.value)} placeholder="The system you use today" className="h-11" aria-invalid={Boolean(errors.pms)} />
              </Field>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink">What would you most like Genie to automate?</legend>
              <p className="mt-1 text-xs text-mist">Optional.</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {AUTOMATION_OPTIONS.map((option) => {
                  const checked = automate.includes(option)
                  return (
                    <label key={option} className="flex items-center gap-3 rounded-xl border border-[#d4af37]/35 px-3 py-2 text-sm text-ink">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(next) => {
                          setAutomate((current) =>
                            next ? [...current, option] : current.filter((item) => item !== option),
                          )
                        }}
                      />
                      {option}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-2">
              <Label htmlFor="notes">Anything else you want Genie to do?</Label>
              <p className="text-xs text-mist">Optional.</p>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Write the wish in your own words."
                className="min-h-28"
              />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="fax-number">Fax</label>
              <input id="fax-number" tabIndex={-1} autoComplete="off" value={faxNumber} onChange={(event) => setFaxNumber(event.target.value)} />
            </div>

            {message ? <p className="mt-4 text-sm text-[#a33b32]">{message}</p> : null}
            <Button type="submit" disabled={pending} className="mt-6 h-12 rounded-full px-6">
              {pending ? "Sending…" : "Meet Genie"}
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-mist">
              This sends your wish to support@talktogenie.ai so the team can follow up. It does not create an account.
            </p>
          </form>
        )}
      </div>
    </Section>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-[#a33b32]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
