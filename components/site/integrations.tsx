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
    <Section id="integrations">
      {showIntro ? (
        <>
          <Eyebrow>Integration-first</Eyebrow>
          <Display as={titleAs} className="mt-4 max-w-3xl">Keep your stack. Add intelligence.</Display>
          <Lede className="mt-5">
            Genie is designed to complement the systems an operator already runs. Names below are examples of those systems, not a partner roster, and not a list of live connectors.
          </Lede>
        </>
      ) : null}

      <div className={cn("grid items-center gap-8 lg:grid-cols-2", showIntro ? "mt-10" : "")}>
        <div className="panel rounded-[28px] p-6">
          <p className="text-xs tracking-[0.18em] text-glow uppercase">Connection target</p>
          <h3 className="mt-2 text-2xl text-white">{active.category}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">{active.detail}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {active.examples.map((example) => (
              <li key={example} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#d5def3]">
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto hidden h-[520px] w-full max-w-[520px] md:block">
          <div className="absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#8ec8ff]/40 bg-[#10203a] text-center shadow-[0_0_80px_rgba(80,150,255,0.25)]">
            <span className="font-display text-3xl text-white">Genie</span>
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
                  ? "border-[#8ec8ff] bg-[#16324a] text-white"
                  : "border-white/15 bg-[#0c1322]/90 text-mist",
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
              item.id === active.id ? "border-[#8ec8ff]/50 text-white" : "border-white/10 text-mist",
            )}
            aria-pressed={item.id === active.id}
          >
            {item.category}
          </button>
        ))}
      </div>

      <div className="mt-8 hidden overflow-hidden rounded-[24px] border border-white/10 md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Connection targets Genie is designed to sit across</caption>
          <thead className="text-xs tracking-[0.16em] text-[#8ea0c3] uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Examples</th>
              <th className="px-4 py-3 font-medium">Status on this site</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((item) => (
              <tr key={item.id} className="border-t border-white/8">
                <td className="px-4 py-3 text-white">{item.category}</td>
                <td className="px-4 py-3 text-mist">{item.examples.join(", ")}</td>
                <td className="px-4 py-3 text-[#d7ecff]">Connection target</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
