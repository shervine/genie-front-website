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
  const body =
    "M200 168c58 0 78 46 66 102-12 54 22 92 10 150-12 56-38 86-76 86s-64-30-76-86c-12-58 22-96 10-150-12-56 8-102 66-102Z"
  return (
    <svg viewBox="0 0 400 540" className="w-full overflow-visible" role="img" aria-label="A sculptural Genie lamp with light at the opening">
      <defs>
        <linearGradient id="lamp-body" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f7fbff" />
          <stop offset="0.18" stopColor="#b7c7e4" />
          <stop offset="0.48" stopColor="#5d7098" />
          <stop offset="0.78" stopColor="#2a3858" />
          <stop offset="1" stopColor="#141c2e" />
        </linearGradient>
        <linearGradient id="lamp-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lamp-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#b9ecff" />
          <stop offset="0.55" stopColor="#49bfff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#49bfff" stopOpacity="0" />
        </radialGradient>
        <filter id="lamp-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <clipPath id="lamp-clip">
          <path d={body} />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="478" rx="118" ry="18" fill="#02040a" opacity="0.75" />
      <ellipse
        cx="200"
        cy="118"
        rx={speaking ? 130 : 108}
        ry={speaking ? 52 : 42}
        fill="url(#lamp-bloom)"
        filter="url(#lamp-blur)"
        className={speaking ? "pulse-glow" : undefined}
      />
      <path d={body} fill="url(#lamp-body)" />
      <path d={body} fill="none" stroke="#d5e6ff" strokeOpacity="0.35" strokeWidth="1.5" />
      <g clipPath="url(#lamp-clip)">
        <path d="M148 188c24 96 14 190-8 280" stroke="url(#lamp-sheen)" strokeWidth="36" fill="none" />
      </g>
      <ellipse cx="200" cy="430" rx="86" ry="16" fill="#10182a" />
      <g fill="#c9f4ff">
        {Array.from({ length: 16 }).map((_, index) => {
          const angle = (index / 16) * Math.PI * 2
          return (
            <circle
              key={index}
              cx={200 + Math.cos(angle) * 52}
              cy={360 + Math.sin(angle) * 11}
              r="2.1"
              opacity={0.55 + (index % 3) * 0.15}
            />
          )
        })}
      </g>
      <ellipse cx="200" cy="176" rx="64" ry="15" fill="#070b14" />
      <ellipse cx="200" cy="186" rx="70" ry="13" fill="none" stroke="#9fe7ff" strokeWidth="3" />
      <ellipse
        cx="200"
        cy="170"
        rx="28"
        ry="8"
        fill="#f4fcff"
        className={speaking ? "pulse-glow" : undefined}
      />
      {speaking ? (
        <g fill="#e9f8ff">
          {Array.from({ length: 5 }).map((_, index) => (
            <rect
              key={index}
              className="speak-bar"
              x={176 + index * 10}
              y="96"
              width="4"
              height="22"
              rx="2"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </g>
      ) : null}
    </svg>
  )
}
