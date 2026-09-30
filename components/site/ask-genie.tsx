"use client"

import { useState } from "react"
import { PROMPTS } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function AskGenie({ heading = "Don’t learn another dashboard. Just ask Genie." }: { heading?: string }) {
  const [id, setId] = useState(PROMPTS[0].id)
  const [sent, setSent] = useState(false)
  const prompt = PROMPTS.find((item) => item.id === id) ?? PROMPTS[0]

  return (
    <Section id="ask">
      <Eyebrow>Agentic interface</Eyebrow>
      <Display className="mt-4 max-w-3xl">{heading}</Display>
      <Lede className="mt-5">
        The same chat is how every stakeholder works. Open a new chat, ask Genie to act or to explain, and it answers inside that person’s permissions. Integrations, properties, calendar, and reservations stay available beside the conversation.
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
                item.id === prompt.id ? "border-[#8ec8ff]/50 bg-[#10203a] text-white" : "border-white/10 text-mist hover:border-white/25 hover:text-white",
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
          <div className="mt-5 ml-auto max-w-md rounded-2xl bg-white px-4 py-3 text-sm text-[#08111f]">
            {prompt.prompt}
          </div>
          <div className="mt-3 max-w-xl rounded-2xl bg-[#123049] px-4 py-4 text-sm leading-relaxed text-white">
            {prompt.summary}
            <dl className="mt-4 space-y-2">
              {prompt.rows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-t border-white/10 pt-2">
                  <dt className="text-[#d5e8ff]">{label}</dt>
                  <dd className="text-right text-white">{value}</dd>
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
                className="rounded-full bg-white px-4 py-2 text-sm text-[#08111f]"
              >
                {prompt.action}
              </button>
              {sent ? (
                <p className="mt-3 text-sm text-white">
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
