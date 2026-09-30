"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

const INCIDENTS = [
  {
    channel: "Airbnb",
    who: "Maya Chen · Villa Sol",
    message: "The AC isn’t working.",
    resolution:
      "Checked the property policy, walked the reset, then opened maintenance and updated Maya.",
    meta: "Task opened · Guest updated",
  },
  {
    channel: "SMS",
    who: "Noah Patel · Unit 214",
    message: "Can we check in early?",
    resolution: "Unit is free from 1 PM. Offered early check-in for $45 and waited for a yes.",
    meta: "Upsell offered · No charge yet",
  },
  {
    channel: "Booking.com",
    who: "Finance · BK-1902",
    message: "Expected payout is short.",
    resolution: "Matched commission and refunds. Flagged a $650 gap instead of guessing.",
    meta: "Exception surfaced",
  },
  {
    channel: "WhatsApp",
    who: "Imani · Loft 9",
    message: "The sofa is stained.",
    resolution: "Started the damage workflow, asked for photos, and notified the owner.",
    meta: "Workflow started",
  },
]

const POLICIES = [
  "Refunds under $100 · Autopilot",
  "Late checkout · Autopilot",
  "Furniture damage · Owner notified",
  "Occupied AC · Same-day vendor",
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const [policy, setPolicy] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      if (!paused) setIndex((value) => (value + 1) % INCIDENTS.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [paused])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      setPolicy((value) => (value + 1) % POLICIES.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  const incident = INCIDENTS[index]

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">
            The AI operating system for hospitality
          </p>
          <h1 className="mt-5 font-display text-[clamp(3.3rem,7vw,6.1rem)] leading-[0.9] tracking-[-0.045em] text-white">
            Hospitality.
            <span className="text-shimmer mt-1 block italic">On Autopilot.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Connect your hospitality stack, define your policies, and let Genie handle guest communication, operations, tasks, upsells, and reservation reconciliation — automatically.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/meet" className={buttonVariants({ className: "h-12 rounded-full px-6 text-sm" })}>
              Meet Genie
            </Link>
            <Link
              href="/meet?intent=demo"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 rounded-full border-white/15 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white",
              })}
            >
              Book a Demo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-[#d5def3]">
            {["Connect your stack", "Set your policies", "Genie does the work"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-mist">
            For professional operators managing 20 to 2,000+ listings.{" "}
            <span className="text-white">{POLICIES[policy]}</span>
          </p>
        </div>

        <div
          className="panel relative rounded-[28px] p-4 shadow-[0_30px_120px_rgba(40,90,255,0.18)] sm:p-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#7ee0c6]" />
              <p className="text-sm text-white">Genie · operating layer</p>
            </div>
            <SimBadge />
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#070b14]/70 p-4">
            <div className="flex items-center justify-between gap-3 text-xs text-mist">
              <span>{incident.channel}</span>
              <span>{incident.who}</span>
            </div>
            <p className="mt-4 text-lg text-white">“{incident.message}”</p>
            <p className="mt-3 min-h-16 text-sm leading-relaxed text-mist">{incident.resolution}</p>
            <p className="mt-4 inline-flex rounded-full bg-[#16324a] px-3 py-1 text-xs text-[#c7f3ff]">
              {incident.meta}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {INCIDENTS.map((item, itemIndex) => (
              <button
                key={item.channel}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  "rounded-xl border px-2 py-2 text-center text-[11px] tracking-wide uppercase",
                  itemIndex === index
                    ? "border-[#8ec8ff]/50 bg-[#8ec8ff]/10 text-white"
                    : "border-white/10 text-mist hover:border-white/25",
                )}
                aria-pressed={itemIndex === index}
              >
                {item.channel}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#8ea0c3]">
            Traditional hospitality software gives you more dashboards. Genie does the work.
          </p>
        </div>
      </div>
    </section>
  )
}
