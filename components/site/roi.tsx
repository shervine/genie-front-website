"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { rateForListings, usd } from "@/lib/pricing"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export function Roi() {
  const [listings, setListings] = useState("120")
  const [reservations, setReservations] = useState("800")
  const [employees, setEmployees] = useState("6")
  const [labor, setLabor] = useState("28")
  const [upsell, setUpsell] = useState("4000")
  const [minutes, setMinutes] = useState(12)
  const [share, setShare] = useState(35)
  const [lift, setLift] = useState(8)

  const model = useMemo(() => {
    const listingCount = num(listings)
    const reservationCount = num(reservations)
    const employeeCount = num(employees)
    const hourly = num(labor)
    const upsellRevenue = num(upsell)
    const hours = (reservationCount * minutes) / 60
    const shifted = hours * (share / 100)
    const laborValue = shifted * hourly
    const upsellValue = upsellRevenue * (lift / 100)
    const rate = rateForListings(listingCount)
    const subscription = rate ? listingCount * rate : null
    const teamHours = employeeCount * 160
    return {
      listingCount,
      reservationCount,
      employeeCount,
      hourly,
      upsellRevenue,
      hours,
      shifted,
      laborValue,
      upsellValue,
      subscription,
      rate,
      teamShare: teamHours > 0 ? shifted / teamHours : null,
    }
  }, [employees, labor, lift, listings, minutes, reservations, share, upsell])

  return (
    <Section id="scenario" className="pt-0">
      <Eyebrow>Illustrated scenario</Eyebrow>
      <Display className="mt-4 max-w-3xl">A model you can argue with.</Display>
      <Lede className="mt-5">
        Change the inputs. The figures move with the assumptions printed underneath them. This is not a forecast, a guarantee, or a customer result.
      </Lede>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <NumberField id="roi-listings" label="Number of listings" value={listings} onChange={setListings} />
          <NumberField id="roi-reservations" label="Reservations / month" value={reservations} onChange={setReservations} />
          <NumberField id="roi-employees" label="Operations employees" value={employees} onChange={setEmployees} />
          <NumberField id="roi-labor" label="Average hourly labor cost (USD)" value={labor} onChange={setLabor} />
          <NumberField id="roi-upsell" label="Current upsell revenue / month (USD)" value={upsell} onChange={setUpsell} />
          <Slider id="roi-minutes" label={`Repetitive minutes per reservation · ${minutes}`} min={1} max={45} value={minutes} onChange={setMinutes} />
          <Slider id="roi-share" label={`Share of that work in this scenario · ${share}%`} min={0} max={70} value={share} onChange={setShare} />
          <Slider id="roi-lift" label={`Upsell lift in this scenario · ${lift}%`} min={0} max={25} value={lift} onChange={setLift} />
        </div>
        <div className="panel h-fit rounded-[28px] p-6">
          <p className="text-xs tracking-[0.18em] text-glow uppercase">If these assumptions held</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Metric label="Illustrated labor capacity" value={usd(model.laborValue)} detail={`${model.shifted.toFixed(1)} hours × ${usd(model.hourly)}`} />
            <Metric label="Illustrated upsell lift" value={usd(model.upsellValue)} detail={`${lift}% of ${usd(model.upsellRevenue)}`} />
          </div>
          <div className="mt-4 rounded-2xl bg-white/80 p-4">
            <p className="text-sm text-mist">Combined illustration / month</p>
            <p className="mt-1 font-display text-4xl text-ink">{usd(model.laborValue + model.upsellValue)}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-[#d4af37]/35 p-4">
            <p className="text-sm text-mist">Published subscription at this listing count</p>
            <p className="mt-1 text-2xl text-ink">
              {model.subscription && model.rate
                ? `${usd(model.subscription)} / month`
                : "Enter a listing count"}
            </p>
            {model.rate ? (
              <p className="mt-1 text-xs text-mist">
                {model.listingCount.toLocaleString("en-US")} × {usd(model.rate)}. These two numbers are not a net-savings claim.
              </p>
            ) : null}
          </div>
          {model.teamShare !== null && model.employeeCount > 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-mist">
              The illustrated hours are {(model.teamShare * 100).toFixed(0)}% of this team’s monthly capacity, counting 160 hours per person. That is context, not a hiring plan.
            </p>
          ) : null}
          <ul className="mt-4 space-y-2 text-xs leading-relaxed text-mist">
            <li>Minutes, share, and lift are scenario assumptions. Sliders are capped so the illustration stays bounded.</li>
            <li>Labor value prices those hours. It does not mean payroll falls by that amount.</li>
            <li>Upsell lift assumes the extra revenue clears. It is not a measured conversion rate.</li>
            <li>Portfolios of 2,000+ listings still need an enterprise conversation. The subscription line uses the published 101+ rate.</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

function num(value: string) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return 0
  return parsed
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/[^\d.]/g, "").slice(0, 9))}
        className="h-11"
      />
    </div>
  )
}

function Slider({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string
  label: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#e0b15a]"
      />
    </div>
  )
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div>
      <p className="text-sm text-mist">{label}</p>
      <p className="mt-1 text-2xl text-ink">{value}</p>
      <p className="text-xs text-mist">{detail}</p>
    </div>
  )
}
