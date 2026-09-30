"use client"

import { useRef, useState } from "react"
import { LAMP_LINES } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Lamp({
  heading = "Meet the concierge guests already know how to use.",
  lede = "Just say, “Hey Genie.” A white 3D-printed lamp, in the shape you already know, with a Google Nest Mini inside. No extra app, and no phone number to hunt down.",
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
            className="relative w-[min(100%,520px)] transition-transform duration-200 ease-out"
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
  const shell =
    "M250 150c18-28 70-32 96-8 8 8 10 14 6 22-18 6-46 14-62 28 36 8 92 18 132 8 48-12 92-48 132-78 18-14 42-8 40 16-4 36-28 78-70 104 22 18 34 48 28 82-10 52-58 92-118 100-78 10-168-8-196-62-22-42-8-78 18-104-16-22-22-52-6-78 10-16 8-22 0-30z"
  return (
    <svg viewBox="0 0 640 460" className="w-full overflow-visible" role="img" aria-label="A white 3D-printed genie lamp with a Nest Mini inside">
      <defs>
        <linearGradient id="white-shell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#f3f5f8" />
          <stop offset="1" stopColor="#d5dbe6" />
        </linearGradient>
        <linearGradient id="nest-fabric" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c5c9d1" />
          <stop offset="1" stopColor="#8d939c" />
        </linearGradient>
        <clipPath id="shell-clip">
          <path d={shell} />
        </clipPath>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse cx="330" cy="400" rx="170" ry="16" fill="#02040a" opacity="0.55" filter="url(#soft-shadow)" />
      <path
        d="M188 214c-62 8-78 78-28 112"
        fill="none"
        stroke="#f7f8fb"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M196 226c-42 8-50 52-16 74"
        fill="none"
        stroke="#e7ebf2"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d={shell} fill="url(#white-shell)" />
      <path d={shell} fill="none" stroke="#ffffff" strokeWidth="2" />
      <g clipPath="url(#shell-clip)" opacity="0.28">
        {Array.from({ length: 14 }).map((_, index) => (
          <line
            key={index}
            x1="140"
            x2="620"
            y1={170 + index * 14}
            y2={170 + index * 14}
            stroke="#8ea0b8"
            strokeWidth="1"
          />
        ))}
      </g>
      <path
        d="M430 168c48-28 110-62 148-86 16-10 28 8 18 22-28 36-78 72-140 96"
        fill="none"
        stroke="#f7f8fb"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d="M560 92c28-22 48-6 36 16"
        fill="none"
        stroke="#f4f6fa"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <ellipse cx="300" cy="268" rx="78" ry="48" fill="#121820" />
      <ellipse cx="300" cy="274" rx="58" ry="28" fill="#e8eaee" />
      <ellipse cx="300" cy="266" rx="50" ry="22" fill="url(#nest-fabric)" />
      {Array.from({ length: 4 }).map((_, index) => {
        const angle = (index / 4) * Math.PI * 2 - Math.PI / 2
        return (
          <circle
            key={index}
            cx={300 + Math.cos(angle) * 28}
            cy={266 + Math.sin(angle) * 12}
            r={speaking ? 3.2 : 2.4}
            fill={speaking ? "#8fd7ff" : "#f4fbff"}
            className={speaking ? "pulse-glow" : undefined}
          />
        )
      })}
      <ellipse cx="292" cy="258" rx="16" ry="6" fill="#ffffff" opacity="0.35" />
      <ellipse cx="292" cy="168" rx="54" ry="16" fill="#f7f8fb" />
      <ellipse cx="292" cy="154" rx="12" ry="10" fill="#ffffff" />
    </svg>
  )
}
