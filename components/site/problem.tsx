"use client"

import { useEffect, useState } from "react"
import { AFTER, BEFORE, FRAGMENTS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Problem() {
  const [layered, setLayered] = useState(false)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches || held) return
    const id = window.setInterval(() => setLayered((value) => !value), 5200)
    return () => window.clearInterval(id)
  }, [held])

  return (
    <Section id="problem">
      <Eyebrow>The problem</Eyebrow>
      <Display className="mt-4 max-w-4xl">
        Your hospitality business shouldn’t require 20 dashboards to operate.
      </Display>
      <Lede className="mt-5">
        The problem isn’t a lack of software. It is fragmentation. Data, teams, and money live in different places, and people spend the day moving them by hand.
      </Lede>

      <div className="mt-10 flex flex-wrap gap-2" onMouseEnter={() => setHeld(true)}>
        <button
          type="button"
          onClick={() => {
            setHeld(true)
            setLayered(false)
          }}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            !layered ? "bg-white text-[#08111f]" : "border border-white/15 text-mist",
          )}
          aria-pressed={!layered}
        >
          Without Genie
        </button>
        <button
          type="button"
          onClick={() => {
            setHeld(true)
            setLayered(true)
          }}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            layered ? "bg-white text-[#08111f]" : "border border-white/15 text-mist",
          )}
          aria-pressed={layered}
        >
          Systems → Genie → Actions
        </button>
      </div>

      <div className="panel mt-6 rounded-[28px] p-5 sm:p-8">
        {layered ? (
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div>
              <p className="text-xs tracking-[0.18em] text-glow uppercase">Systems</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FRAGMENTS.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#d5def3]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Arrow />
            <div className="rounded-3xl border border-[#8ec8ff]/40 bg-[#10203a] px-6 py-8 text-center">
              <p className="text-xs tracking-[0.18em] text-glow uppercase">Layer</p>
              <p className="mt-2 font-display text-4xl text-white">Genie</p>
              <p className="mt-2 text-sm text-mist">One policy. One memory. One conversation.</p>
            </div>
            <Arrow />
            <div>
              <p className="text-xs tracking-[0.18em] text-glow uppercase">Actions</p>
              <ul className="mt-3 space-y-2 text-sm text-white">
                {["Reply and resolve", "Create the task", "Collect the upsell", "Reconcile the stay", "Escalate the exception"].map((item) => (
                  <li key={item} className="rounded-xl bg-white/5 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FRAGMENTS.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-[#d5def3]">
                {item}
                <span className="mt-2 block text-xs text-[#8ea0c3]">Waiting on a person to copy it somewhere else</span>
              </div>
            ))}
            <div className="rounded-2xl border border-white/15 bg-[#10182b] px-4 py-4 sm:col-span-2 lg:col-span-4">
              <p className="text-sm text-white">Your team, in the middle of all of it.</p>
              <p className="mt-1 text-sm text-mist">
                Monitoring dashboards, retyping tasks, answering the same guest question, and investigating payouts by hand.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 p-6">
          <p className="text-xs tracking-[0.18em] text-[#8ea0c3] uppercase">Before Genie</p>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            {BEFORE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-[#8ec8ff]/30 bg-[#0d1b33] p-6">
          <p className="text-xs tracking-[0.18em] text-glow uppercase">After Genie</p>
          <ul className="mt-4 space-y-2 text-sm text-white">
            {AFTER.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function Arrow() {
  return (
    <div className="hidden text-2xl text-[#8ec8ff] lg:block" aria-hidden="true">
      →
    </div>
  )
}
