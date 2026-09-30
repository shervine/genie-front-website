"use client"

import { useRef, useState } from "react"
import { LAMP_LINES } from "@/lib/content"
import { Display, Eyebrow, Lede, SampleNote } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Lamp({
  heading = "The hotel telephone, replaced.",
  lede = "A glossy white 3D-printed genie lamp sits on the nightstand, with a Google Nest Mini inside. Guests say “Hey Genie” instead of picking up a handset. No extra app.",
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
          <p className="mt-4 text-sm text-white">It takes the place of the room phone. Put one in every room.</p>
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
          className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#1c140f]"
          style={{ perspective: "1200px" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_42%,rgba(255,214,170,0.28),transparent_58%)]" />
          <div className="absolute top-0 bottom-[28%] left-0 w-[34%] bg-[#3a2a1e]" />
          <div className="absolute bottom-0 left-0 h-[42%] w-[38%] rounded-tr-[28px] bg-[#f4efe8]" />
          <div className="absolute bottom-[30%] left-[7%] h-14 w-[24%] rounded-xl bg-[#e7d7c6]" />
          <div className="absolute right-0 bottom-0 left-[30%] h-[30%] bg-gradient-to-b from-[#a56b3d] to-[#4e3018]" />
          <div className="absolute right-[8%] bottom-[31%] left-[36%] h-px bg-[#e7c39a]/40" />
          <div className="absolute bottom-[46%] left-[6%] hidden max-w-[8.5rem] rounded-md bg-[#f7f1e8] px-2 py-1 text-[10px] leading-snug text-[#3a2a1e] shadow-sm sm:block">
            No phone. Say Hey Genie.
          </div>
          <div
            className="absolute bottom-[22%] left-[54%] w-[min(52%,230px)] transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(-50%) rotateX(${(-tilt.y * 8).toFixed(2)}deg) rotateY(${(tilt.x * 10).toFixed(2)}deg)`,
            }}
          >
            <LampArt speaking={phase === "reply"} />
          </div>
          <p className="absolute right-4 bottom-3 left-4 text-center text-xs text-[#f6e7d4]">
            The nightstand, where the hotel telephone used to sit.
          </p>
        </div>
      </div>
    </section>
  )
}

export function LampArt({ speaking = false }: { speaking?: boolean }) {
  return (
    <svg viewBox="0 0 360 480" className="w-full overflow-visible" role="img" aria-label="A glossy white genie lamp with a footed base, a handled body, a pointed spout, and a vented lid">
      <defs>
        <linearGradient id="glaze" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#f4f6fa" />
          <stop offset="1" stopColor="#c9d2e0" />
        </linearGradient>
        <radialGradient id="glint" cx="30%" cy="28%" r="55%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="168" cy="452" rx="78" ry="14" fill="url(#glaze)" stroke="#d5dce8" />
      <path d="M118 446c-2-52 16-86 50-92 34 6 52 40 50 92" fill="url(#glaze)" stroke="#d5dce8" />
      {Array.from({ length: 6 }).map((_, index) => (
        <line key={index} x1={132 + index * 12} y1="440" x2={146 + index * 8} y2="368" stroke="#ffffff" strokeOpacity="0.7" />
      ))}
      <ellipse cx="168" cy="300" rx="108" ry="78" fill="url(#glaze)" stroke="#d7deea" />
      <ellipse cx="140" cy="276" rx="42" ry="26" fill="url(#glint)" />
      <path d="M78 286c-42 4-52 62-8 84" fill="none" stroke="url(#glaze)" strokeWidth="16" strokeLinecap="round" />
      <path d="M82 298c-24 6-28 36-4 48" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 268c40-6 78 10 96 36 8 12-4 20-16 14-22-18-52-30-84-32z" fill="url(#glaze)" stroke="#d7deea" />
      <path d="M330 292c22-36 40-78 28-118-4-10 8-16 16-8 18 36 8 96-20 140-8 12-22 6-24-14z" fill="url(#glaze)" stroke="#e7edf5" />
      <ellipse cx="168" cy="214" rx="78" ry="36" fill="url(#glaze)" stroke="#d7deea" />
      {[
        [118, 214],
        [143, 206],
        [168, 202],
        [193, 206],
        [218, 214],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="9" ry="14" fill="#24180f" />
      ))}
      <ellipse cx="168" cy="204" rx="7" ry="5" fill="#b7bcc6" />
      <circle cx="165" cy="203" r={speaking ? 2 : 1.4} fill={speaking ? "#9adfff" : "#f7fbff"} className={speaking ? "pulse-glow" : undefined} />
      <circle cx="171" cy="203" r={speaking ? 2 : 1.4} fill={speaking ? "#9adfff" : "#f7fbff"} className={speaking ? "pulse-glow" : undefined} />
      <path d="M168 168c-14 0-22 22-10 48h20c12-26 4-48-10-48z" fill="url(#glaze)" stroke="#e7edf5" />
      <path d="M164 146c0 8 2 16 4 20 2-6 4-14 4-22-2-4-8-2-8 2z" fill="#ffffff" />
    </svg>
  )
}
