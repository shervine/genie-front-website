"use client"

import { useState } from "react"
import Image from "next/image"
import { BRAND_MARKS } from "@/lib/brand-marks"
import { GenieWorkspace } from "@/components/site/workspace"
import { OrbitStage } from "@/components/site/orbit-stage"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const APPS: Array<{
  name: string
  mark?: keyof typeof BRAND_MARKS
  logo?: string
  initials?: string
  color?: string
  icon?: "guest" | "manager" | "homeowner" | "cleaners" | "handymen"
}> = [
  { name: "Airbnb", mark: "airbnb" },
  { name: "Booking.com", mark: "bookingdotcom" },
  { name: "Guesty", logo: "/brands/guesty.png" },
  { name: "Hostaway", logo: "/brands/hostaway.png" },
  { name: "WhatsApp", mark: "whatsapp" },
  { name: "Slack", logo: "/brands/slack.png" },
  { name: "Gmail", mark: "gmail" },
  { name: "Dialpad", logo: "/brands/dialpad.png" },
  { name: "Twilio", logo: "/brands/twilio.png" },
  { name: "Managers", icon: "manager" },
  { name: "Homeowners", icon: "homeowner" },
  { name: "Users", icon: "guest" },
  { name: "Cleaners", icon: "cleaners" },
  { name: "Handymen", icon: "handymen" },
  { name: "TaskRabbit", logo: "/brands/taskrabbit.png" },
  { name: "Monday.com", logo: "/brands/monday.png" },
  { name: "Asana", mark: "asana" },
  { name: "Jira", mark: "jira" },
  { name: "Zapier", logo: "/brands/zapier.png" },
  { name: "Amazon", logo: "/brands/amazon.png" },
  { name: "Instacart", mark: "instacart" },
  { name: "PriceLabs", logo: "/brands/pricelabs.png" },
  { name: "Stripe", logo: "/brands/stripe.png" },
  { name: "Plaid", logo: "/brands/plaid.png" },
  { name: "QuickBooks", logo: "/brands/quickbooks.png" },
]

const APP_USE: Record<string, string> = {
  Airbnb: "Genie reads guest messages and ratings, writes the reply, and can send a permission unlock so the stay can move forward.",
  "Booking.com": "Genie reads inquiries and ratings, answers inside the thread, and can push a permission unlock back to the booking.",
  Guesty: "Genie reads the inbox, tasks, and ratings, then writes the reply or the task. A permission unlock can go back out to the listing.",
  Hostaway: "Genie reads guest threads, tasks, and ratings, and writes the update back. Permission unlocks can be sent to the property.",
  WhatsApp: "Genie reads and answers WhatsApp threads, turns a request into a task, and can deliver a rating update on the same chat.",
  Slack: "Genie reads team requests, posts the update, and can open a task or share a rating with the people on the channel.",
  Gmail: "Genie reads the email, replies in thread, and can send a task, a rating, or a financial note to the right person.",
  Dialpad: "Genie takes the call or text, answers from policy, and can open a task or pass a rating to the operator.",
  Twilio: "Genie sends and receives texts, follows the same policy as the other channels, and can deliver a rating by message.",
  Managers: "Managers send communications, tasks, and permissions in. Genie sends communications, ratings, and financials back.",
  Homeowners: "Homeowners send communications, tasks, and permissions in. Genie sends communications, ratings, and financials back, limited to their homes.",
  Users: "Users exchange communications, tasks, and ratings with Genie. The chat stays on the stay, the job, and the score.",
  Cleaners: "Genie assigns the turnover, sends the notes, and closes the task when the cleaner marks the work done.",
  Handymen: "Genie opens the maintenance task, sends the access notes, and watches it until the fix is finished.",
  TaskRabbit: "When the work has to leave the team, Genie can dispatch a TaskRabbit job and read the result back.",
  "Monday.com": "Genie writes the task onto the board and reads the status so the guest thread closes only when the work is done.",
  Asana: "Genie creates the task, follows it, and writes the outcome back to the person who asked.",
  Jira: "Genie files the issue, tracks it, and reports the resolution instead of leaving it in another tool.",
  Zapier: "Genie triggers and receives zaps so the rest of the stack stays in the same loop.",
  Amazon: "A granted wish can become an Amazon order. Genie reads the order and the spend.",
  Instacart: "A granted wish can become an Instacart run. Genie reads the order and the spend.",
  PriceLabs: "Genie reads pricing signals and can send rate context back when the policy allows a change.",
  Stripe: "Genie reads card payouts and later disputes so a missing or reversed payment is flagged.",
  Plaid: "Bank transactions come in only. Genie checks that reservation money arrived, and does not write back to the bank.",
  QuickBooks: "Genie reads the books and writes the stay’s money so the ledger matches what the bank shows.",
}

const MONEY = new Set(["Plaid", "Stripe", "QuickBooks"])
const MONEY_SOMETIMES = new Set([
  "PriceLabs",
  "Airbnb",
  "Amazon",
  "Booking.com",
  "Instacart",
])

const CHATTY = new Set([
  "Guesty",
  "Hostaway",
  "Airbnb",
  "Booking.com",
  "Gmail",
  "WhatsApp",
  "Slack",
])

const TASK_FROM = new Set([
  "Gmail",
  "Dialpad",
  "WhatsApp",
  "Slack",
  "Booking.com",
  "Airbnb",
  "Hostaway",
  "Guesty",
])
const TASK_TO = new Set(["Jira", "Asana", "Monday.com"])
const RATING_FROM = new Set(["Guesty", "Hostaway", "Airbnb", "Booking.com"])
const PERMISSION_TO = new Set(["Airbnb", "Booking.com", "TaskRabbit", "Guesty", "Hostaway", "Amazon"])
const INNER_RING = new Set(["Managers", "Users", "Homeowners"])

const ORBIT_SIGNALS = signalsFor(APPS, 0)

type Mark = "message" | "task" | "money" | "rating" | "permission"

type Signal = {
  from: number
  to?: number
  kind: "absorb" | "return" | "redirect" | "outbound"
  delay: string
  duration: string
  moneyIn?: boolean
  moneyOut?: boolean
  mark?: Mark
}

function nextTarget(apps: Array<{ name: string }>, index: number, step: number) {
  let to = (index + step) % apps.length
  for (let guard = 0; guard < apps.length; guard += 1) {
    const name = apps[to]?.name
    if (to !== index && name !== "Plaid" && !INNER_RING.has(name ?? "")) return to
    to = (to + 1) % apps.length
  }
  return to
}

function signalsFor(apps: Array<{ name: string }>, offset: number): Signal[] {
  return apps.flatMap((app, index) => {
    const outboundTarget = nextTarget(apps, index, 2 + (index % 3))
    const alwaysMoney = MONEY.has(app.name)
    const occasionalMoney = MONEY_SOMETIMES.has(app.name) || index % 6 === 0
    const inbound: Signal = {
      from: index,
      kind: "absorb",
      delay: `${(offset + index * 0.38).toFixed(2)}s`,
      duration: `${4.4 + (index % 3) * 0.4}s`,
      moneyIn: alwaysMoney,
    }
    if (app.name === "Managers" || app.name === "Homeowners") {
      return roleFlow(index, offset, ["message", "task", "permission"], ["message", "rating", "money"])
    }
    if (app.name === "Users") {
      return roleFlow(index, offset, ["message", "task", "rating"], ["message", "task", "rating"])
    }
    if (app.name === "Plaid") {
      return [
        inbound,
        {
          ...inbound,
          delay: `${(offset + index * 0.38 + 1.7).toFixed(2)}s`,
          duration: "3.8s",
        },
      ]
    }
    const outbound: Signal = {
      from: index,
      to: index % 2 === 0 ? outboundTarget : undefined,
      kind: index % 2 === 0 ? "redirect" : "return",
      delay: `${(offset + 0.7 + index * 0.33).toFixed(2)}s`,
      duration: `${4.6 + (index % 3) * 0.35}s`,
      moneyIn: alwaysMoney,
      moneyOut: alwaysMoney || occasionalMoney,
    }
    if (!CHATTY.has(app.name)) {
      return [inbound, outbound, ...taskFlow(app.name, index, offset), ...ratingFlow(app.name, index, offset), ...permissionFlow(app.name, index, offset)]
    }
    const extraInbound = [1.1, 2.2].map((step, stepIndex) => ({
      from: index,
      kind: "absorb" as const,
      delay: `${(offset + index * 0.15 + step).toFixed(2)}s`,
      duration: `${3.4 + stepIndex * 0.3}s`,
      moneyIn: alwaysMoney,
    }))
    const extraOutbound: Signal[] = [1.4, 2.6].map((step, stepIndex) => ({
      from: index,
      to: nextTarget(apps, index, 1 + stepIndex),
      kind: "redirect" as const,
      delay: `${(offset + index * 0.15 + step).toFixed(2)}s`,
      duration: `${3.6 + stepIndex * 0.25}s`,
      moneyIn: alwaysMoney,
      moneyOut: alwaysMoney || (occasionalMoney && stepIndex === 0),
    }))
    return [
      inbound,
      outbound,
      ...extraInbound,
      ...extraOutbound,
      ...taskFlow(app.name, index, offset),
      ...ratingFlow(app.name, index, offset),
      ...permissionFlow(app.name, index, offset),
    ]
  })
}

function taskFlow(name: string, index: number, offset: number): Signal[] {
  const signals: Signal[] = []
  if (TASK_FROM.has(name)) {
    signals.push({
      from: index,
      kind: "absorb",
      mark: "task",
      delay: `${(offset + 0.35 + (index % 5) * 0.55).toFixed(2)}s`,
      duration: "4.4s",
    })
    signals.push({
      from: index,
      kind: "outbound",
      mark: "message",
      delay: `${(offset + 2.5 + (index % 5) * 0.55).toFixed(2)}s`,
      duration: "4.2s",
    })
  }
  if (TASK_TO.has(name)) {
    signals.push({
      from: index,
      kind: "outbound",
      mark: "task",
      delay: `${(offset + 1.15 + index * 0.2).toFixed(2)}s`,
      duration: "4.3s",
    })
    signals.push({
      from: index,
      kind: "outbound",
      mark: "task",
      delay: `${(offset + 3.05 + index * 0.2).toFixed(2)}s`,
      duration: "4s",
    })
    signals.push({
      from: index,
      kind: "absorb",
      mark: "message",
      delay: `${(offset + 2.15 + index * 0.2).toFixed(2)}s`,
      duration: "4.1s",
    })
  }
  return signals
}

function roleFlow(index: number, offset: number, inbound: Mark[], outbound: Mark[]): Signal[] {
  return [
    ...inbound.map((mark, step) => ({
      from: index,
      kind: "absorb" as const,
      mark,
      delay: `${(offset + 0.4 + step * 1.35 + index * 0.05).toFixed(2)}s`,
      duration: "4.5s",
    })),
    ...outbound.map((mark, step) => ({
      from: index,
      kind: "outbound" as const,
      mark,
      delay: `${(offset + 0.9 + step * 1.35 + index * 0.05).toFixed(2)}s`,
      duration: "4.4s",
    })),
  ]
}

function permissionFlow(name: string, index: number, offset: number): Signal[] {
  if (!PERMISSION_TO.has(name)) return []
  return [
    {
      from: index,
      kind: "outbound",
      mark: "permission",
      delay: `${(offset + 1.2 + (index % 5) * 0.4).toFixed(2)}s`,
      duration: "4.4s",
    },
    {
      from: index,
      kind: "outbound",
      mark: "permission",
      delay: `${(offset + 3.05 + (index % 5) * 0.4).toFixed(2)}s`,
      duration: "4.1s",
    },
  ]
}

function ratingFlow(name: string, index: number, offset: number): Signal[] {
  if (!RATING_FROM.has(name)) return []
  return [
    {
      from: index,
      kind: "absorb",
      mark: "rating",
      delay: `${(offset + 0.55 + (index % 4) * 0.4).toFixed(2)}s`,
      duration: "4.6s",
    },
    {
      from: index,
      kind: "absorb",
      mark: "rating",
      delay: `${(offset + 2.4 + (index % 4) * 0.4).toFixed(2)}s`,
      duration: "4.3s",
    },
  ]
}

export function GenieGraph() {
  const apps = place(APPS, 44)
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const activeName = pinned ?? hovered
  const active = activeName ? apps.find((app) => app.name === activeName) : null
  return (
    <div className="min-w-0">
      <OrbitStage>
        <div className="orbit-right absolute inset-0">
          <Signals apps={apps} radius={44} signals={ORBIT_SIGNALS} upright="orbit-upright-right" />
          {apps.map((app) => (
            <AppIcon
              key={app.name}
              app={app}
              upright="orbit-upright-right"
              active={activeName === app.name}
              onHover={setHovered}
              onToggle={(name) => setPinned((current) => (current === name ? null : name))}
            />
          ))}
          {apps.map((app) => (
            <AppLabel key={app.name} app={app} upright="orbit-upright-right" />
          ))}
        </div>
      </OrbitStage>
      <ul className="mx-auto mt-[33px] flex w-full max-w-full flex-nowrap items-center justify-center gap-x-2 overflow-x-auto text-[11px] leading-none text-ink sm:gap-x-4 sm:text-sm [&_svg]:size-3.5">
        <li className="flex items-center gap-1 whitespace-nowrap">
          <CommentIcon />
          Communications
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap">
          <LockOpenIcon />
          Permissions
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap">
          <WrenchIcon />
          Tasks
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap">
          <StarIcon />
          Ratings
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-[13px] leading-none font-bold text-[#0f7a4a] sm:text-base">$</span>
          Financials
        </li>
      </ul>
      <div className="mx-auto mt-4 min-h-16 max-w-xl text-center" aria-live="polite">
        {active ? (
          <>
            <p className="text-sm font-medium text-ink">{active.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-mist">{APP_USE[active.name]}</p>
          </>
        ) : (
          <p className="text-sm text-mist">Hover or tap an app to see how Genie uses it.</p>
        )}
      </div>
    </div>
  )
}

export function AppStore({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  return (
    <Section id="app-store" className="py-16 md:py-24">
      <Eyebrow>App store</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-4xl">Genie Handles Them All</Display>
      <Lede className="mt-5">
        About 85% of inbound inquiries are auto-resolved by a predefined human policy. Genie communicates with each app in two directions: it reads what came in, and it writes the reply, the task, or the update back.
      </Lede>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        <GenieWorkspace />
      </div>
    </Section>
  )
}

function Signals({
  apps,
  radius,
  signals,
  upright,
}: {
  apps: Array<(typeof APPS)[number] & { angle: number; radius?: number }>
  radius: number
  signals: Signal[]
  upright: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {apps.map((app) => (
        <Spoke key={app.name} angle={app.angle} radius={app.radius ?? radius} />
      ))}
      {signals.map((signal, index) => {
        const source = apps[signal.from]
        const target = signal.to === undefined ? source : apps[signal.to]
        if (!source || !target) return null
        const inboundMark: Mark = signal.mark ?? (signal.moneyIn ? "money" : "message")
        const outboundMark: Mark = signal.mark ?? (signal.moneyOut ? "money" : "message")
        if (signal.kind === "outbound") {
          return (
            <Travel
              key={`${signal.kind}-${signal.from}-${signal.delay}-${index}`}
              angle={source.angle}
              radius={source.radius ?? radius}
              className="signal-out"
              delay={signal.delay}
              duration={signal.duration}
              mark={outboundMark}
              upright={upright}
            />
          )
        }
        return (
          <span key={`${signal.kind}-${signal.from}-${signal.delay}-${index}`}>
            <Travel
              angle={source.angle}
              radius={source.radius ?? radius}
              className={signal.kind === "return" ? "signal-return" : "signal-absorb"}
              delay={signal.delay}
              duration={signal.duration}
              mark={signal.kind === "return" && signal.moneyOut ? "money" : inboundMark}
              upright={upright}
            />
            {signal.kind === "redirect" ? (
              <Travel
                angle={target.angle}
                radius={target.radius ?? radius}
                className="signal-out"
                delay={`calc(${signal.delay} + ${signal.duration} * 0.46)`}
                duration={signal.duration}
                mark={outboundMark}
                upright={upright}
              />
            ) : null}
          </span>
        )
      })}
    </div>
  )
}

function Spoke({ angle, radius }: { angle: number; radius: number }) {
  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${angle + 90}deg)` }}>
      <div
        className="absolute bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-black"
        style={{ height: `${radius}%` }}
      />
    </div>
  )
}

function Travel({
  angle,
  radius,
  className,
  delay,
  duration,
  mark,
  upright,
}: {
  angle: number
  radius: number
  className: string
  delay: string
  duration: string
  mark: Mark
  upright: string
}) {
  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${angle + 90}deg)` }}>
      <div className="absolute bottom-1/2 left-1/2 w-2 -translate-x-1/2" style={{ height: `${radius}%` }}>
        <span
          className={`signal-money absolute left-0 ${className}`}
          style={{ animationDelay: delay, animationDuration: duration }}
        >
          <span className={`${upright} block`}>
            <span className="block" style={{ transform: `rotate(${-(angle + 90)}deg)` }}>
              <SignalMark mark={mark} />
            </span>
          </span>
        </span>
      </div>
    </div>
  )
}

function SignalMark({ mark }: { mark: Mark }) {
  if (mark === "money") {
    return <span className="block text-[13px] leading-none font-bold text-[#0f7a4a]">$</span>
  }
  if (mark === "task") return <WrenchIcon />
  if (mark === "rating") return <StarIcon />
  if (mark === "permission") return <LockOpenIcon />
  return <CommentIcon />
}

function LockOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#d21f1f"
        d="M8 11V7.6a4 4 0 0 1 7.7-1.5l1.7-1.5A6 6 0 0 0 6 7.6V11H5.2A2.2 2.2 0 0 0 3 13.2v6.6A2.2 2.2 0 0 0 5.2 22h11.6a2.2 2.2 0 0 0 2.2-2.2v-6.6a2.2 2.2 0 0 0-2.2-2.2H8Z"
      />
      <path fill="#fff" d="M11.1 14.4a1.15 1.15 0 0 1 1.8 0c.15.25.2.45.2.7V18h-2.2v-2.9c0-.25.05-.45.2-.7Z" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" fill="#123848" />
      <path fill="#123848" d="M5.2 19.4c.7-3.4 3.3-5.3 6.8-5.3s6.1 1.9 6.8 5.3c.15.7-.4 1.3-1.1 1.3H6.3c-.7 0-1.25-.6-1.1-1.3Z" />
    </svg>
  )
}

function ManagerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="6.6" r="3.15" fill="#123848" />
      <path fill="#123848" d="M5.1 20.7c.55-3.5 2.7-5.5 4.9-6.1L12 17.2l2-2.6c2.2.6 4.35 2.6 4.9 6.1.12.6-.38 1.1-1 1.1H6.1c-.62 0-1.12-.5-1-1.1Z" />
      <path fill="#fff" d="M12 13.6 9.4 20.6h5.2L12 13.6Z" />
      <path fill="#123848" d="m12 14.2-1 3.2L12 20.8l1-3.4-1-3.2Z" />
    </svg>
  )
}

function BroomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#123848" d="M15.2 2.2a1.2 1.2 0 0 1 1.7 1.7L9.4 11.4 7.7 9.7 15.2 2.2Z" />
      <path fill="#123848" d="M6.1 11.6h8.2c.5 0 .8.5.7.9l-1.4 7.4c-.1.5-.5.8-1 .8H7.8c-.5 0-.9-.3-1-.8L5.4 12.5c-.1-.4.2-.9.7-.9Z" />
      <path fill="#fff" d="M8.1 13.4h.8v5.6h-.8zM10.5 13.4h.8v5.6h-.8zM12.9 13.4h.8v5.6h-.8z" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#123848" d="M12 3.2 3 11.2h2.2V20.4h5.2v-5.1h3.2v5.1h5.2V11.2H21L12 3.2Z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path fill="#1a73e8" d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function WrenchIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#111"
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#e0b15a" d="M12 2.4 14.9 8.6l6.7.8-5 4.6 1.4 6.6L12 17.7 6 20.6l1.4-6.6-5-4.6 6.7-.8L12 2.4z" />
    </svg>
  )
}

function AppIcon({
  app,
  upright,
  active,
  onHover,
  onToggle,
}: {
  app: (typeof APPS)[number] & { left: string; top: string }
  upright: string
  active: boolean
  onHover: (name: string | null) => void
  onToggle: (name: string) => void
}) {
  return (
    <div className="absolute z-10 size-0" style={{ left: app.left, top: app.top }}>
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <div className={upright}>
          <button
            type="button"
            className={`rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#e0b15a] ${active ? "ring-2 ring-[#e0b15a]" : ""}`}
            aria-pressed={active}
            aria-label={`${app.name}. How Genie uses it.`}
            onMouseEnter={() => onHover(app.name)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(app.name)}
            onBlur={() => onHover(null)}
            onClick={() => onToggle(app.name)}
          >
            <AppGlyph app={app} />
          </button>
        </div>
      </div>
    </div>
  )
}

function AppLabel({
  app,
  upright,
}: {
  app: (typeof APPS)[number] & { left: string; top: string }
  upright: string
}) {
  return (
    <div className="pointer-events-none absolute z-30 size-0" style={{ left: app.left, top: app.top }}>
      <div className="absolute top-6 left-0 -translate-x-1/2 sm:top-8">
        <div className={upright}>
          <span className="block max-w-24 bg-[#e7f6fb] px-1 text-center text-[10px] leading-tight text-ink sm:text-[11px]">
            {app.name}
          </span>
        </div>
      </div>
    </div>
  )
}

function place<T extends { name: string }>(items: T[], radius: number) {
  return items.map((item, index) => {
    const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2
    return {
      ...item,
      radius,
      angle: (angle * 180) / Math.PI,
      left: `${50 + Math.cos(angle) * radius}%`,
      top: `${50 + Math.sin(angle) * radius}%`,
    }
  })
}

function AppGlyph({ app }: { app: (typeof APPS)[number] }) {
  if (app.icon) {
    return (
      <span className="flex size-10 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-white shadow-sm sm:size-14">
        {app.icon === "guest" ? <UserIcon className="size-5 sm:size-7" /> : null}
        {app.icon === "manager" ? <ManagerIcon className="size-5 sm:size-7" /> : null}
        {app.icon === "homeowner" ? <HomeIcon className="size-5 sm:size-7" /> : null}
        {app.icon === "cleaners" ? <BroomIcon className="size-5 sm:size-7" /> : null}
        {app.icon === "handymen" ? <WrenchIcon className="size-5 text-[#111] sm:size-7" /> : null}
      </span>
    )
  }

  if (app.logo) {
    return (
      <span className="flex size-10 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-white shadow-sm sm:size-14">
        <Image src={app.logo} alt="" width={36} height={36} className="size-6 object-contain sm:size-8" />
      </span>
    )
  }

  if (app.mark) {
    const brand = BRAND_MARKS[app.mark]
    return (
      <span className="flex size-10 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-white shadow-sm sm:size-14">
        <svg viewBox="0 0 24 24" className="size-5 sm:size-7" aria-hidden="true">
          <path d={brand.path} fill={`#${brand.hex}`} />
        </svg>
      </span>
    )
  }

  return (
    <span
      className="flex size-10 items-center justify-center rounded-2xl text-[10px] font-semibold tracking-tight text-white shadow-sm sm:size-14 sm:text-xs"
      style={{ backgroundColor: app.color }}
      aria-hidden="true"
    >
      {app.initials}
    </span>
  )
}
