"use client"

import { useState } from "react"
import { MODULES } from "@/lib/content"
import { Display, Eyebrow, Lede, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Modules() {
  const [active, setActive] = useState<(typeof MODULES)[number]["id"]>("communication")
  const activeModule = MODULES.find((item) => item.id === active) ?? MODULES[0]

  return (
    <Section id="runs">
      <Eyebrow>What Genie runs</Eyebrow>
      <Display className="mt-4 max-w-3xl">One layer. The work your stack used to leave for people.</Display>
      <Lede className="mt-5">
        Choose a module. Each example is a simulated stay from Harbor & Co., shown so the behavior is concrete.
      </Lede>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {MODULES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm whitespace-nowrap",
              active === item.id ? "bg-white text-[#08111f]" : "border border-white/15 text-mist",
            )}
            aria-pressed={active === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="panel mt-4 rounded-[28px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-2xl text-lg text-white">{activeModule.kicker}</p>
          <SimBadge />
        </div>
        <div key={activeModule.id} className="mt-6 space-y-3">
          {activeModule.lines.map((line, index) => (
            <div
              key={line.text}
              className={cn(
                "rise max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed",
                line.from === "Genie"
                  ? "bg-[#123049] text-white"
                  : line.from === "System"
                    ? "border border-[#8ec8ff]/30 text-[#d7f4ff]"
                    : "bg-white/6 text-[#e7eefc]",
              )}
              style={{ animationDelay: `${index * 220}ms` }}
            >
              <span className="mb-1 block text-[10px] tracking-[0.16em] text-glow uppercase">{line.from}</span>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
