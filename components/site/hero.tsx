"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { GenieWorkspace } from "@/components/site/workspace"

const POLICIES = [
  "Refunds under $100 · Autopilot",
  "Late checkout · Autopilot",
  "Furniture damage · Owner notified",
  "Occupied AC · Same-day vendor",
]

export function Hero() {
  const [policy, setPolicy] = useState(0)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      setPolicy((value) => (value + 1) % POLICIES.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-12">
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">
            Your wish is my command
          </p>
          <h1 className="mt-5 font-display text-[clamp(3.3rem,7vw,6.1rem)] leading-[0.9] font-bold tracking-[-0.045em] text-ink">
            Hospitality.
            <span className="text-shimmer mt-1 block italic">On Autopilot.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Genie is the on-demand concierge. Each guest can ask three million wishes, and Genie grants them 24/7, with the same speed and the same consistency, across messages, tasks, and the money on every stay. Abracadabra, and it’s done.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/meet" className={buttonVariants({ className: "h-12 rounded-full px-6 text-sm" })}>
              Request Demo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-ink">
            {["Happier guests", "Higher ratings", "Higher income", "Operational excellence"].map((item) => (
              <span key={item} className="rounded-full border border-[#d4af37]/35 bg-white/80 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-mist">
            For professional operators managing 20 to 2,000+ listings.{" "}
            <span className="text-ink">{POLICIES[policy]}</span>
          </p>
        </div>

        <GenieWorkspace />
      </div>
    </section>
  )
}
