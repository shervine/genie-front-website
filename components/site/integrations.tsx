"use client"

import { useMemo, useState } from "react"
import { INTEGRATIONS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Integrations({
  showIntro = true,
  titleAs = "h2",
}: {
  showIntro?: boolean
  titleAs?: "h1" | "h2"
}) {
  const [id, setId] = useState("pms")
  const active = INTEGRATIONS.find((item) => item.id === id) ?? INTEGRATIONS[0]
  const positioned = useMemo(() => layoutNodes(), [])

  return (
    <Section id="apps">
      {showIntro ? (
        <>
          <Eyebrow>Apps</Eyebrow>
          <Display as={titleAs} className="mt-4 max-w-3xl">Keep your stack. Add intelligence.</Display>
          <Lede className="mt-5">
            Genie has an app store with hundreds of apps for the tools an operator already runs. The names below are connection targets in that store, not a partner roster, and not a claim that every connector is live.
          </Lede>
        </>
      ) : null}

      <div className={cn("grid items-center gap-8 lg:grid-cols-2", showIntro ? "mt-10" : "")}>
        <div className="panel rounded-[28px] p-6">
          <p className="text-xs tracking-[0.18em] text-glow uppercase">Connection target</p>
          <h3 className="mt-2 text-2xl text-ink">{active.category}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">{active.detail}</p>
          <p className="mt-4 text-xs tracking-[0.16em] text-glow uppercase">Access level</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{active.access}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {active.examples.map((example) => (
              <li key={example} className="rounded-full border border-[#d4af37]/35 px-3 py-1 text-xs text-ink">
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto hidden h-[520px] w-full max-w-[520px] md:block">
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="text-[6.5rem] leading-none drop-shadow-[0_0_28px_rgba(143,215,255,0.45)]" aria-hidden="true">
              🧞‍♂️
            </span>
            <span className="sr-only">Genie</span>
          </div>
          {positioned.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setId(item.id)}
              onMouseEnter={() => setId(item.id)}
              onFocus={() => setId(item.id)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap",
                item.id === active.id
                  ? "border-[#e0b15a] bg-[#d7f0f8] text-ink"
                  : "border-[#2eafd0]/30 bg-white text-mist",
              )}
              style={{ left: item.left, top: item.top }}
              aria-pressed={item.id === active.id}
            >
              {item.short}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 md:hidden">
        {INTEGRATIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left text-sm",
              item.id === active.id ? "border-[#e0b15a] text-ink" : "border-[#d4af37]/35 text-mist",
            )}
            aria-pressed={item.id === active.id}
          >
            {item.category}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-[24px] border border-[#d4af37]/35">
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">Access level for each connection Genie is designed to sit across</caption>
          <thead className="text-xs tracking-[0.16em] text-mist uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Examples</th>
              <th className="px-4 py-3 font-medium">Access level</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((item) => (
              <tr key={item.id} className="border-t border-[#2eafd0]/20 align-top">
                <td className="px-4 py-3 text-ink">{item.category}</td>
                <td className="px-4 py-3 text-mist">{item.examples.join(", ")}</td>
                <td className="px-4 py-3 text-[#0e6f86]">{item.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mist">
        Access level is the role Genie is designed to recognize. A person should only see the slice that role allows.
      </p>
    </Section>
  )
}

function layoutNodes() {
  const inner = INTEGRATIONS.filter((item) => item.ring === "inner")
  const outer = INTEGRATIONS.filter((item) => item.ring === "outer")
  return [
    ...place(inner, 24),
    ...place(outer, 40),
  ]
}

function place(items: readonly { id: string; short: string }[], radius: number) {
  return items.map((item, index) => {
    const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2
    return {
      ...item,
      left: `${50 + Math.cos(angle) * radius}%`,
      top: `${50 + Math.sin(angle) * radius}%`,
    }
  })
}
