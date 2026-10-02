"use client"

import { useEffect, useState } from "react"
import { MODES, SCOPES, SIM_EVENTS, STEPS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function HowItWorks({ intro = true }: { intro?: boolean }) {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("autopilot")
  const [scope, setScope] = useState<(typeof SCOPES)[number]>("Policy")
  const [eventId, setEventId] = useState(SIM_EVENTS[0].id)
  const [paused, setPaused] = useState(false)
  const event = SIM_EVENTS.find((item) => item.id === eventId) ?? SIM_EVENTS[0]
  const activeMode = MODES.find((item) => item.id === mode) ?? MODES[2]

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches || paused) return
    const id = window.setInterval(() => {
      setEventId((current) => {
        const index = SIM_EVENTS.findIndex((item) => item.id === current)
        return SIM_EVENTS[(index + 1) % SIM_EVENTS.length].id
      })
    }, 4600)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <Section id="how-it-works">
      {intro ? (
        <>
          <Eyebrow>Guarantee</Eyebrow>
          <Display className="mt-4 max-w-4xl">All Interactions Humans-Defined & Human-Reviewed</Display>
          <Lede className="mt-5">
            Genie only acts when a message matches a pattern a person already defined. If nothing matches, it does not act. You start from our policy, customize it in onboarding, and keep fine-tuning it so the behavior stays yours.
          </Lede>
        </>
      ) : null}

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.n} className="panel rounded-[24px] p-6">
            <p className="font-display text-3xl text-[#b8860b]">{step.n}</p>
            <h3 className="mt-4 text-xl text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-ink sm:text-4xl">Observe → Copilot → Autopilot</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
              Enterprise teams don’t have to flip the whole company to autonomous on day one. Set the mode at the company, a department, a workflow, or a single policy.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm",
                mode === item.id ? "bg-[#e8c56a] text-[#123848]" : "border border-[#2eafd0]/30 text-mist",
              )}
              aria-pressed={mode === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {SCOPES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setScope(item)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs tracking-wide uppercase",
                scope === item ? "bg-[#d7f0f8] text-ink" : "text-mist hover:text-[#123848]",
              )}
              aria-pressed={scope === item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="panel mt-4 rounded-[24px] p-6">
          <p className="text-xs tracking-[0.18em] text-glow uppercase">
            {scope} · {activeMode.label}
          </p>
          <p className="mt-3 max-w-2xl text-lg text-ink">{activeMode.body}</p>
          <p className="mt-3 text-sm text-mist">
            {scope === "Policy" && mode === "autopilot"
              ? "Example: refunds under $100 execute. Refunds over $100 stay on Copilot."
              : scope === "Workflow" && mode === "copilot"
                ? "Example: late-checkout offers are drafted for a manager, while Wi-Fi replies already run on Autopilot."
                : "Humans define the mode. Genie does not promote itself."}
          </p>
        </div>
      </div>

      <div className="mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-3xl text-ink sm:text-4xl">A night on Autopilot</h3>
          <SimBadge />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col">
            {SIM_EVENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEventId(item.id)}
                className={cn(
                  "min-w-44 rounded-2xl border px-4 py-3 text-left lg:min-w-0",
                  event.id === item.id ? "border-[#e0b15a] bg-[#e7f4fa]" : "border-[#d4af37]/35 hover:border-[#2eafd0]/50",
                )}
                aria-pressed={event.id === item.id}
              >
                <span className="block text-[11px] tracking-[0.16em] text-glow uppercase">{item.kind}</span>
                <span className="mt-1 block text-sm text-ink">{item.title}</span>
              </button>
            ))}
          </div>
          <div className="panel rounded-[24px] p-6">
            <p className="text-sm text-mist">{event.source}</p>
            <p className="mt-2 text-2xl text-ink">{event.title}</p>
            <ol className="mt-5 space-y-3">
              {event.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-ink">
                  <span className="font-display text-[#0e7f9c]">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-2xl bg-white/80 px-4 py-3 text-sm text-ink">{event.outcome}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
