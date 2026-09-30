"use client"

import { useState } from "react"
import { STAKEHOLDERS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Stakeholders() {
  const [id, setId] = useState(STAKEHOLDERS[0].id)
  const person = STAKEHOLDERS.find((item) => item.id === id) ?? STAKEHOLDERS[0]

  return (
    <Section id="stakeholders">
      <Eyebrow>One AI for every stakeholder</Eyebrow>
      <Display className="mt-4 max-w-3xl">Everyone talks to Genie. Genie understands who they are.</Display>
      <Lede className="mt-5">
        Guests, operators, owners, cleaners, maintenance, managers, and finance share one intelligence layer. Role-based permissions decide what comes back.
      </Lede>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAKEHOLDERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "rounded-[22px] border px-4 py-4 text-left",
              item.id === person.id ? "border-[#8ec8ff]/50 bg-[#10203a]" : "border-white/10 hover:border-white/25",
            )}
            aria-pressed={item.id === person.id}
          >
            <span className="block text-base text-white">{item.label}</span>
            <span className="mt-1 block text-sm text-mist">{item.line}</span>
          </button>
        ))}
      </div>
      <div className="panel mt-4 rounded-[28px] p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-glow">{person.label}</p>
          <SimBadge />
        </div>
        <p className="mt-4 max-w-xl rounded-2xl bg-white px-4 py-3 text-sm text-[#08111f]">{person.ask}</p>
        <p className="mt-3 max-w-2xl rounded-2xl bg-[#123049] px-4 py-3 text-sm leading-relaxed text-white">
          {person.answer}
        </p>
        <p className="mt-4 text-sm text-mist">
          <span className="text-white">Permissions. </span>
          {person.sees}
        </p>
      </div>
    </Section>
  )
}
