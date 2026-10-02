"use client"

import Link from "next/link"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { bandForListings, LAMP_PRICE, PRICING_BANDS, rateForListings, usd } from "@/lib/pricing"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export function Pricing({
  detailed = false,
  titleAs = "h2",
}: {
  detailed?: boolean
  titleAs?: "h1" | "h2"
}) {
  const [listings, setListings] = useState("120")
  const count = Math.floor(Number(listings))
  const rate = rateForListings(count)
  const band = bandForListings(count)
  const monthly = rate && count > 0 ? rate * count : null
  const enterprise = count >= 2000

  return (
    <Section id="pricing">
      <Eyebrow>Pricing</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-3xl">One price. Per listing.</Display>
      <Lede className="mt-5">
        Monthly, per listing, in USD. Every listing is billed at the rate for the portfolio band you fall into.
      </Lede>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PRICING_BANDS.map((item) => (
          <article key={item.id} className="panel flex flex-col rounded-[28px] p-6">
            <p className="text-sm text-mist">{item.label}</p>
            <p className="mt-6 font-display text-5xl text-ink">
              {usd(item.price)}
            </p>
            <p className="mt-2 text-sm text-[#0e6f86]">per listing / month</p>
            <p className="mt-4 text-sm leading-relaxed text-mist">{item.detail}</p>
          </article>
        ))}
      </div>
      <article className="mt-4 grid items-center gap-6 rounded-[28px] border border-[#d4af37]/35 bg-white/80 p-6 md:grid-cols-[16rem_1fr]">
        <div>
          <p className="flex items-center gap-2 text-sm text-mist">
            Genie Lamp
            <span className="rounded-full border border-[#d4af37]/50 bg-[#fff6dc] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#8a6508] uppercase">
              Optional
            </span>
          </p>
          <p className="mt-4 font-display text-5xl text-ink">{usd(LAMP_PRICE)}</p>
          <p className="mt-2 text-sm text-[#0e6f86]">per lamp, one-time</p>
        </div>
        <div>
          <p className="text-ink">
            Optional add-on, priced separately from the monthly software. Genie works fully without it; add a lamp to any rental unit where you want guests to talk to Genie out loud.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-mist">
            <li>The 3D-printed lamp frame.</li>
            <li>A Google Nest Mini inside, preprogrammed to wake when a guest says “Hey Genie.”</li>
          </ul>
        </div>
      </article>
      <div className="mt-4 rounded-[28px] border border-[#d4af37]/35 px-6 py-5">
        <p className="text-ink">2,000+ listings? Talk to us about enterprise pricing.</p>
        <Link href="/meet" className="mt-3 inline-flex text-sm text-[#b8860b] underline-offset-4 hover:underline">
          Start that conversation
        </Link>
      </div>

      {detailed ? (
        <div className="panel mt-8 rounded-[28px] p-6">
          <h3 className="text-xl text-ink">Estimate the published rate</h3>
          <div className="mt-4 grid gap-4 sm:max-w-xs">
            <Label htmlFor="listing-count">Number of listings</Label>
            <Input
              id="listing-count"
              inputMode="numeric"
              value={listings}
              onChange={(event) => setListings(event.target.value.replace(/[^\d]/g, "").slice(0, 6))}
              className="h-11"
            />
          </div>
          {monthly && band && rate ? (
            <div className="mt-5">
              <p className="font-display text-4xl text-ink">{usd(monthly)}<span className="text-lg text-mist"> / month</span></p>
              <p className="mt-2 text-sm text-mist">
                {count.toLocaleString("en-US")} listings in the {band.label.toLowerCase()} band at {usd(rate)} each.
              </p>
              {enterprise ? (
                <p className="mt-2 text-sm text-[#b8860b]">
                  Portfolios of 2,000 or more are priced in conversation. This figure uses the published 101+ rate and is not an enterprise quote.
                </p>
              ) : null}
            </div>
          ) : (
            <p className="mt-4 text-sm text-mist">Enter a listing count to see the published monthly total.</p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-mist">
          <Link href="/pricing" className="text-[#b8860b] underline-offset-4 hover:underline">
            Estimate a portfolio, or model an operating scenario
          </Link>
        </p>
      )}

      <div className="mt-8">
        <Link href="/meet" className={buttonVariants({ className: "h-12 rounded-full px-6" })}>
          Start with Genie
        </Link>
      </div>
    </Section>
  )
}
