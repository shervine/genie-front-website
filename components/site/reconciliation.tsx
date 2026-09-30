"use client"

import { useEffect, useRef, useState } from "react"
import { RECON_LINES } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote, Section, SimBadge } from "@/components/site/section"

export function Reconciliation() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(RECON_LINES.length)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const node = ref.current
    if (!node || media.matches) return
    let interval = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        let step = 0
        setCount(0)
        interval = window.setInterval(() => {
          step += 1
          setCount(step)
          if (step >= RECON_LINES.length) window.clearInterval(interval)
        }, 280)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <Section id="reconciliation">
      <Eyebrow>Reservation financial reconciliation</Eyebrow>
      <Display className="mt-4 max-w-3xl">Every reservation accounted for.</Display>
      <Lede className="mt-5">
        Genie reconciles financial activity tied to reservations and guest transactions. It is not a replacement for your accounting system. The questions it should answer are simple: What should we have received? What did we receive? What’s missing? Why? Which stays are still open?
      </Lede>
      <div ref={ref} className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="panel rounded-[28px] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.16em] text-glow uppercase">Matched</p>
              <h3 className="mt-1 text-lg text-white">BK-10482 · Villa Sol · Booking.com</h3>
            </div>
            <SimBadge />
          </div>
          <dl className="mt-5 space-y-2">
            {RECON_LINES.slice(0, count).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-white/8 pb-2 text-sm">
                <dt className="text-mist">{label}</dt>
                <dd className="text-white">{value}</dd>
              </div>
            ))}
          </dl>
          {count >= RECON_LINES.length ? (
            <p className="mt-4 text-sm text-[#9be7cf]">Reconciled</p>
          ) : null}
        </article>
        <article className="rounded-[28px] border border-[#d5ccff]/30 bg-[#141226] p-6">
          <p className="text-xs tracking-[0.16em] text-[#d5ccff] uppercase">Exception</p>
          <h3 className="mt-1 text-lg text-white">AB-2291 · Unit 214 · Airbnb</h3>
          <dl className="mt-5 space-y-2 text-sm">
            <Row label="Expected payout" value="$2,480" />
            <Row label="Actual payout" value="$2,110" />
            <Row label="Missing" value="$370" />
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            A resolution credit in the sample does not match a payout line. Genie surfaces it for finance instead of burying it in a spreadsheet.
          </p>
        </article>
      </div>
      <p className="mt-4 text-sm text-mist">
        Sources this layer is designed to read include PMS and channel-manager reservations, channel payouts, direct bookings, card charges such as Stripe where connected, refunds, fees, deposits, taxes where available, upsells, and adjustments.
      </p>
      <SampleNote className="mt-3" />
    </Section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
      <dt className="text-mist">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  )
}
