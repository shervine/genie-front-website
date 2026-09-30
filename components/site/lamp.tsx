"use client"

import { useRef, useState } from "react"
import { LAMP_LINES } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Lamp({
  heading = "Meet the concierge guests already know how to use.",
  lede = "Just say, “Hey Genie.” A modern 3D-printed lamp with a voice interface becomes the front desk, reimagined — no extra app, no phone number to hunt down.",
  titleAs = "h2",
}: {
  heading?: string
  lede?: string
  titleAs?: "h1" | "h2"
}) {
  const stage = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "ask" | "reply">("idle")
  const line = LAMP_LINES[index]

  function move(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = stage.current?.getBoundingClientRect()
    if (!bounds) return
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setTilt({ x, y })
  }

  function heyGenie(next = (index + 1) % LAMP_LINES.length) {
    setIndex(next)
    setPhase("ask")
    window.setTimeout(() => setPhase("reply"), 700)
  }

  return (
    <section id="lamp" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,150,255,0.16),transparent_62%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>The Genie Lamp</Eyebrow>
          <Display as={titleAs} className="mt-4">{heading}</Display>
          <Lede className="mt-5">{lede}</Lede>
          <p className="mt-4 text-sm text-white">Put Genie in every room.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {LAMP_LINES.map((item, itemIndex) => (
              <button
                key={item.ask}
                type="button"
                onClick={() => heyGenie(itemIndex)}
                className={cn(
                  "rounded-full border px-3 py-2 text-left text-xs sm:text-sm",
                  itemIndex === index && phase !== "idle"
                    ? "border-[#8ec8ff]/60 bg-[#10203a] text-white"
                    : "border-white/12 text-mist hover:border-white/30 hover:text-white",
                )}
              >
                {item.ask.replace("Hey Genie, ", "")}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => heyGenie()}
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm text-[#08111f]"
          >
            Hey Genie
          </button>
          <div className="mt-6 min-h-24">
            {phase === "idle" ? (
              <p className="text-sm text-mist">Click Hey Genie. The lamp answers from the property guide and the same policies as the rest of the operation.</p>
            ) : (
              <div>
                <p className="text-sm text-[#d7ecff]">“{line.ask}”</p>
                {phase === "reply" ? <p className="mt-2 text-sm leading-relaxed text-white">{line.reply}</p> : null}
              </div>
            )}
          </div>
          <SampleNote className="mt-4" />
        </div>

        <div
          ref={stage}
          onMouseMove={move}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          className="flex min-h-[520px] items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-[min(100%,380px)] transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${(-tilt.y * 10).toFixed(2)}deg) rotateY(${(tilt.x * 14).toFixed(2)}deg)`,
            }}
          >
            <LampArt speaking={phase === "reply"} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function LampArt({ speaking = false }: { speaking?: boolean }) {
  return (
    <svg viewBox="0 0 360 500" className="w-full overflow-visible" role="img" aria-label="A sculptural Genie lamp with light at the opening">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#314066" />
          <stop offset="0.42" stopColor="#161d31" />
          <stop offset="1" stopColor="#090d16" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f4fbff" />
          <stop offset="0.35" stopColor="#7fd4ff" />
          <stop offset="1" stopColor="#7fd4ff" stopOpacity="0" />
        </radialGradient>
        <pattern id="print" width="6" height="7" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6" x2="6" y2="6" stroke="#d7e7ff" strokeOpacity="0.22" strokeWidth="0.6" />
        </pattern>
        <clipPath id="vessel">
          <path d="M180 118c46 0 62 38 52 82-10 46 18 78 8 128-10 48-32 78-60 78s-50-30-60-78c-10-50 18-82 8-128-10-44 6-82 52-82Z" />
        </clipPath>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="180" cy="430" rx="108" ry="18" fill="#04070f" opacity="0.85" />
      <ellipse
        cx="180"
        cy="70"
        rx={speaking ? 92 : 78}
        ry={speaking ? 36 : 28}
        fill="url(#bloom)"
        className={speaking ? "pulse-glow" : undefined}
        filter="url(#soft)"
      />
      <path
        d="M180 118c46 0 62 38 52 82-10 46 18 78 8 128-10 48-32 78-60 78s-50-30-60-78c-10-50 18-82 8-128-10-44 6-82 52-82Z"
        fill="url(#body)"
      />
      <g clipPath="url(#vessel)">
        <rect x="90" y="110" width="180" height="300" fill="url(#print)" />
        <path d="M128 150c18 80 10 180-8 250" stroke="url(#sheen)" strokeWidth="18" fill="none" />
      </g>
      <ellipse cx="180" cy="392" rx="78" ry="16" fill="#0c1322" />
      <ellipse cx="180" cy="386" rx="70" ry="12" fill="#1a2438" />
      <g fill="#9fd7ff" opacity="0.85">
        {Array.from({ length: 14 }).map((_, index) => {
          const angle = (index / 14) * Math.PI * 2
          const cx = 180 + Math.cos(angle) * 48
          const cy = 336 + Math.sin(angle) * 10
          return <circle key={index} cx={cx} cy={cy} r="1.6" />
        })}
      </g>
      <ellipse cx="180" cy="124" rx="54" ry="14" fill="#0a101c" />
      <ellipse cx="180" cy="120" rx="40" ry="10" fill="#123044" />
      <ellipse cx="180" cy="116" rx="22" ry="6" fill="#d9f6ff" className={speaking ? "pulse-glow" : undefined} />
      <ellipse cx="180" cy="132" rx="58" ry="12" fill="none" stroke="#8fd7ff" strokeOpacity="0.8" strokeWidth="2" />
      {speaking ? (
        <g fill="#d9f6ff">
          {Array.from({ length: 5 }).map((_, index) => (
            <rect
              key={index}
              className="speak-bar"
              x={158 + index * 8}
              y="78"
              width="3"
              height="18"
              rx="1.5"
              style={{ animationDelay: `${index * 0.12}s` }}
            />
          ))}
        </g>
      ) : null}
    </svg>
  )
}
