"use client"

import Image from "next/image"
import { useState } from "react"
import { LAMP_LINES } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Lamp({
  heading = "The hotel telephone, replaced.",
  lede = "A shiny genie lamp sits on the bedside table between two queen beds. Guests say “Hey Genie” instead of picking up a handset. No extra app.",
  titleAs = "h2",
}: {
  heading?: string
  lede?: string
  titleAs?: "h1" | "h2"
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "ask" | "reply">("idle")
  const line = LAMP_LINES[index]

  function heyGenie(next = (index + 1) % LAMP_LINES.length) {
    setIndex(next)
    setPhase("ask")
    window.setTimeout(() => setPhase("reply"), 700)
  }

  return (
    <section id="lamp" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,150,255,0.16),transparent_62%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>The Genie Lamp</Eyebrow>
          <Display as={titleAs} className="mt-4">{heading}</Display>
          <Lede className="mt-5">{lede}</Lede>
          <p className="mt-4 text-sm text-ink">Between the beds, where the room phone used to sit. Put one in every room.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {LAMP_LINES.map((item, itemIndex) => (
              <button
                key={item.ask}
                type="button"
                onClick={() => heyGenie(itemIndex)}
                className={cn(
                  "rounded-full border px-3 py-2 text-left text-xs sm:text-sm",
                  itemIndex === index && phase !== "idle"
                    ? "border-[#e0b15a] bg-[#e7f4fa] text-ink"
                    : "border-[#2eafd0]/30 text-mist hover:border-white/30 hover:text-[#123848]",
                )}
              >
                {item.ask.replace("Hey Genie, ", "")}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => heyGenie()}
            className="mt-6 rounded-full bg-[#e8c56a] px-5 py-3 text-sm text-[#123848]"
          >
            Hey Genie
          </button>
          <div className="mt-6 min-h-24">
            {phase === "idle" ? (
              <p className="text-sm text-mist">Click Hey Genie. The lamp answers from the property guide and the same policies as the rest of the operation.</p>
            ) : (
              <div>
                <p className="text-sm text-[#0e6f86]">“{line.ask}”</p>
                {phase === "reply" ? <p className="mt-2 text-sm leading-relaxed text-ink">{line.reply}</p> : null}
              </div>
            )}
          </div>
          <SampleNote className="mt-4" />
        </div>

        <figure className="relative overflow-hidden rounded-[28px] border border-[#d4af37]/35 shadow-[0_24px_60px_rgba(18,56,72,0.12)]">
          <Image
            src="/hotel-bedside-lamp.jpg"
            alt="A shiny genie lamp glowing on the nightstand between two queen beds in a hotel room"
            width={1280}
            height={720}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#123848]/75 to-transparent px-4 pt-16 pb-4 text-sm text-white">
            Between two queen beds, where the hotel telephone used to sit.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
