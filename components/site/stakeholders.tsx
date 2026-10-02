"use client"

import { useState } from "react"
import { STAKEHOLDERS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section, SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Stakeholders() {
  const [id, setId] = useState(STAKEHOLDERS[0].id)
  const person = STAKEHOLDERS.find((item) => item.id === id) ?? STAKEHOLDERS[0]

  return (
    <Section id="stakeholders">
      <Eyebrow>One AI for every stakeholder</Eyebrow>
      <Display className="mt-4 max-w-3xl">One chat. Every role.</Display>
      <Lede className="mt-5">
        Genie coordinates guests, homeowners, cleaners, maintenance, and managers. The same chat is translated live into up to 50 languages, so each person reads it in their own. Permissions decide what comes back.
      </Lede>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STAKEHOLDERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "flex flex-col items-center rounded-[22px] border px-3 py-4 text-center",
              item.id === person.id ? "border-[#e0b15a] bg-[#e7f4fa]" : "border-[#d4af37]/35 hover:border-[#2eafd0]/50",
            )}
            aria-pressed={item.id === person.id}
          >
            <RoleIcon id={item.id} />
            <span className="mt-2 block text-base font-medium text-ink">{item.label}</span>
            <span className="mt-1 block text-sm text-mist">{item.line}</span>
          </button>
        ))}
      </div>
      <div className="panel mt-4 rounded-[28px] p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-glow">{person.label}</p>
          <SimBadge />
        </div>
        <p className="mt-4 max-w-xl rounded-2xl bg-[#fff1c9] px-4 py-3 text-sm text-[#123848]">{person.ask}</p>
        <p className="mt-3 max-w-2xl rounded-2xl bg-[#e5f6fb] px-4 py-3 text-sm leading-relaxed text-ink">
          {person.answer}
        </p>
        <p className="mt-4 text-sm text-mist">
          <span className="text-ink">Permissions. </span>
          {person.sees}
        </p>
      </div>
    </Section>
  )
}

function RoleIcon({ id }: { id: string }) {
  const className = "size-8"
  if (id === "guests") return <UserIcon className={className} />
  if (id === "owners") return <HomeIcon className={className} />
  if (id === "cleaners") return <BroomIcon className={className} />
  if (id === "maintenance") return <WrenchIcon className={className} />
  return <SuitIcon className={className} />
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" fill="#111" />
      <path fill="#111" d="M5.2 19.4c.7-3.4 3.3-5.3 6.8-5.3s6.1 1.9 6.8 5.3c.15.7-.4 1.3-1.1 1.3H6.3c-.7 0-1.25-.6-1.1-1.3Z" />
    </svg>
  )
}

function SuitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="6.6" r="3.15" fill="#111" />
      <path fill="#111" d="M5.1 20.7c.55-3.5 2.7-5.5 4.9-6.1L12 17.2l2-2.6c2.2.6 4.35 2.6 4.9 6.1.12.6-.38 1.1-1 1.1H6.1c-.62 0-1.12-.5-1-1.1Z" />
      <path fill="#fff" d="M12 13.6 9.4 20.6h5.2L12 13.6Z" />
      <path fill="#111" d="m12 14.2-1 3.2L12 20.8l1-3.4-1-3.2Z" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#111" d="M12 3.2 3 11.2h2.2V20.4h5.2v-5.1h3.2v5.1h5.2V11.2H21L12 3.2Z" />
    </svg>
  )
}

function BroomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#111" d="M15.2 2.2a1.2 1.2 0 0 1 1.7 1.7L9.4 11.4 7.7 9.7 15.2 2.2Z" />
      <path fill="#111" d="M6.1 11.6h8.2c.5 0 .8.5.7.9l-1.4 7.4c-.1.5-.5.8-1 .8H7.8c-.5 0-.9-.3-1-.8L5.4 12.5c-.1-.4.2-.9.7-.9Z" />
      <path fill="#fff" d="M8.1 13.4h.8v5.6h-.8zM10.5 13.4h.8v5.6h-.8zM12.9 13.4h.8v5.6h-.8z" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#111" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
