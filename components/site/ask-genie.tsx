"use client"

import { useState } from "react"
import { PROMPTS } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function AskGenie({ heading = "Skip the dashboard. Ask Genie." }: { heading?: string }) {
  const [id, setId] = useState(PROMPTS[0].id)
  const [sent, setSent] = useState(false)
  const prompt = PROMPTS.find((item) => item.id === id) ?? PROMPTS[0]

  return (
    <Section id="ask">
      <Eyebrow>Agentic interface</Eyebrow>
      <Display className="mt-4 max-w-3xl">{heading}</Display>
      <Lede className="mt-5">
        Whoever is speaking is the master of that chat. Ask Genie to act or to explain. The answer stays inside that person’s permissions, with apps, properties, calendar, and reservations beside the conversation.
      </Lede>
      <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-2">
          {PROMPTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setId(item.id)
                setSent(false)
              }}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left text-sm",
                item.id === prompt.id ? "border-[#e0b15a] bg-[#e7f4fa] text-ink" : "border-[#d4af37]/35 text-mist hover:border-[#2eafd0]/50 hover:text-[#123848]",
              )}
              aria-pressed={item.id === prompt.id}
            >
              {item.prompt}
            </button>
          ))}
        </div>
        <div className="panel rounded-[28px] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.16em] text-glow uppercase">{prompt.role} · sample permissions</p>
            <SimBadge />
          </div>
          <div className="mt-5 ml-auto max-w-md rounded-2xl bg-[#fff1c9] px-4 py-3 text-sm text-[#123848]">
            {prompt.prompt}
          </div>
          <div className="mt-3 max-w-xl rounded-2xl bg-[#e5f6fb] px-4 py-4 text-sm leading-relaxed text-ink">
            {prompt.summary}
            <dl className="mt-4 space-y-2">
              {prompt.rows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-t border-[#d4af37]/35 pt-2">
                  <dt className="text-[#0e6f86]">{label}</dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-sm text-mist">{prompt.note}</p>
          {prompt.action ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSent(true)}
                className="rounded-full bg-[#e8c56a] px-4 py-2 text-sm text-[#123848]"
              >
                {prompt.action}
              </button>
              {sent ? (
                <p className="mt-3 text-sm text-ink">
                  6 offers queued in this sample. No messages were sent from this website.
                </p>
              ) : null}
            </div>
          ) : null}
          <SampleNote className="mt-4" />
        </div>
      </div>
    </Section>
  )
}
