"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { OUTREACH_BODY, OUTREACH_SUBJECT, PITCH_SLIDES } from "@/lib/pitch"
import { cn } from "@/lib/utils"

export function PitchDeck() {
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState<"subject" | "body" | "all" | null>(null)
  const slide = PITCH_SLIDES[index]

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
      if (event.key === "ArrowRight") setIndex((value) => Math.min(PITCH_SLIDES.length - 1, value + 1))
      if (event.key === "ArrowLeft") setIndex((value) => Math.max(0, value - 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  async function copy(kind: "subject" | "body" | "all") {
    const text =
      kind === "subject"
        ? OUTREACH_SUBJECT
        : kind === "body"
          ? OUTREACH_BODY
          : `Subject: ${OUTREACH_SUBJECT}\n\n${OUTREACH_BODY}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(kind)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div>
      <article
        className={cn(
          "flex min-h-[34rem] flex-col rounded-[28px] border p-6 sm:p-10",
          slide.variant === "content"
            ? "border-[#d4af37]/35 bg-white/80"
            : "border-[#123848] bg-[#123848] text-white",
        )}
        aria-live="polite"
      >
        <p
          className={cn(
            "text-[0.72rem] font-medium tracking-[0.22em] uppercase",
            slide.variant === "content" ? "text-glow" : "text-[#e8c56a]",
          )}
        >
          {slide.kicker}
        </p>
        <h2
          className={cn(
            "mx-auto mt-4 w-full max-w-4xl text-center font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.035em]",
            slide.variant === "content" ? "text-ink" : "text-white",
          )}
        >
          {slide.title}
        </h2>
        {slide.lede ? (
          <p className={cn("mx-auto mt-5 w-full max-w-3xl text-center text-base leading-relaxed sm:text-lg", slide.variant === "content" ? "text-mist" : "text-[#d5eef6]")}>
            {slide.lede}
          </p>
        ) : null}
        {slide.image ? (
          <Image
            src="/unified-inbox.jpg"
            alt="Unified inbox sample with every guest channel in one list."
            width={1280}
            height={720}
            className="mt-6 h-auto w-full rounded-2xl border border-[#d4af37]/35"
          />
        ) : null}
        {slide.bullets ? (
          <ul className="mt-6 max-w-3xl space-y-3">
            {slide.bullets.map((item) => (
              <li key={item} className={cn("text-sm leading-relaxed sm:text-base", slide.variant === "content" ? "text-ink" : "text-[#e7f6fb]")}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {slide.note ? (
          <p className={cn("mt-auto pt-8 text-sm whitespace-pre-line", slide.variant === "content" ? "text-mist" : "text-[#e8c56a]")}>
            {slide.note}
          </p>
        ) : null}
      </article>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mist">
          Slide {index + 1} of {PITCH_SLIDES.length}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-[#2eafd0]/30 px-4 py-2 text-sm text-ink disabled:opacity-40"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-full bg-[#e8c56a] px-4 py-2 text-sm text-[#123848] disabled:opacity-40"
            onClick={() => setIndex((value) => Math.min(PITCH_SLIDES.length - 1, value + 1))}
            disabled={index === PITCH_SLIDES.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Slides">
        {PITCH_SLIDES.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className={cn(
              "h-2.5 rounded-full",
              itemIndex === index ? "w-8 bg-[#e8c56a]" : "w-2.5 bg-[#2eafd0]/35",
            )}
            aria-label={`Go to slide ${itemIndex + 1}: ${item.kicker}`}
            aria-current={itemIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      <section className="mt-16" id="outreach">
        <p className="text-center text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">Founder outreach</p>
        <h2 className="mx-auto mt-4 w-full max-w-3xl text-center font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-bold tracking-[-0.035em] text-ink">
          A note for hospitality teams in San Francisco.
        </h2>
        <p className="mx-auto mt-4 w-full max-w-2xl text-center text-base leading-relaxed text-mist">
          Replace the name, then send it to founding and technical teams. The note asks for 20 minutes to compare challenges and exchange ideas. It is not a sales sequence.
        </p>
        <div className="mt-6 rounded-[28px] border border-[#d4af37]/35 bg-white/80 p-5 sm:p-7">
          <p className="text-xs tracking-[0.16em] text-glow uppercase">Subject</p>
          <p className="mt-2 text-ink">{OUTREACH_SUBJECT}</p>
          <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{OUTREACH_BODY}</pre>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => copy("all")} className="rounded-full bg-[#e8c56a] px-4 py-2 text-sm text-[#123848]">
              {copied === "all" ? "Copied" : "Copy subject and note"}
            </button>
            <button type="button" onClick={() => copy("subject")} className="rounded-full border border-[#2eafd0]/30 px-4 py-2 text-sm text-ink">
              {copied === "subject" ? "Copied" : "Copy subject"}
            </button>
            <button type="button" onClick={() => copy("body")} className="rounded-full border border-[#2eafd0]/30 px-4 py-2 text-sm text-ink">
              {copied === "body" ? "Copied" : "Copy note"}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
