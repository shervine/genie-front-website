"use client"

import { useState } from "react"
import { ANALYTICS_QUESTIONS } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Analytics() {
  const [id, setId] = useState(ANALYTICS_QUESTIONS[0].id)
  const item = ANALYTICS_QUESTIONS.find((question) => question.id === id) ?? ANALYTICS_QUESTIONS[0]
  const max = item.points.length

  return (
    <Section id="analytics">
      <Eyebrow>Analytics and operational intelligence</Eyebrow>
      <Display className="mt-4 max-w-3xl">Ask your operation anything.</Display>
      <Lede className="mt-5">
        Genie should explain the operation, not only automate it. Move from portfolio to market, property, reservation, conversation, and transaction.
      </Lede>
      <div className="mt-8 flex flex-wrap gap-2">
        {ANALYTICS_QUESTIONS.map((question) => (
          <button
            key={question.id}
            type="button"
            onClick={() => setId(question.id)}
            className={cn(
              "rounded-full px-4 py-2 text-left text-sm",
              question.id === item.id ? "bg-[#e8c56a] text-[#123848]" : "border border-[#2eafd0]/30 text-mist",
            )}
            aria-pressed={question.id === item.id}
          >
            {question.q}
          </button>
        ))}
      </div>
      <div className="panel mt-4 rounded-[28px] p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg text-ink">{item.q}</p>
          <SimBadge />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mist">{item.a}</p>
        <div className="mt-6 space-y-3">
          {item.points.map(([label, value], index) => (
            <div key={label}>
              <div className="flex items-center justify-between text-sm text-ink">
                <span>{label}</span>
                <span className="text-mist">{value}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#e7f6fb]">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#6d8dff] to-[#8fd7ff]"
                  style={{ width: `${100 - index * (60 / max)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <SampleNote className="mt-5" />
      </div>
    </Section>
  )
}
