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
  icon?: "user"
}> = [
  { name: "Guesty", logo: "/brands/guesty.png" },
  { name: "Hostaway", logo: "/brands/hostaway.png" },
  { name: "PriceLabs", logo: "/brands/pricelabs.png" },
  { name: "TaskRabbit", logo: "/brands/taskrabbit.png" },
  { name: "Amazon", logo: "/brands/amazon.png" },
  { name: "Instacart", mark: "instacart" },
  { name: "Manager", icon: "user" },
  { name: "DoorDash", mark: "doordash" },
  { name: "Uber", mark: "uber" },
  { name: "Airbnb", mark: "airbnb" },
  { name: "Booking.com", mark: "bookingdotcom" },
  { name: "Vrbo", logo: "/brands/vrbo.png" },
  { name: "Gmail", mark: "gmail" },
  { name: "Dialpad", logo: "/brands/dialpad.png" },
  { name: "Twilio", logo: "/brands/twilio.png" },
  { name: "Plaid", logo: "/brands/plaid.png" },
  { name: "WhatsApp", mark: "whatsapp" },
  { name: "Monday.com", logo: "/brands/monday.png" },
  { name: "Asana", mark: "asana" },
  { name: "Jira", mark: "jira" },
  { name: "Turno", logo: "/brands/turno.png" },
  { name: "Stripe", logo: "/brands/stripe.png" },
  { name: "Slack", logo: "/brands/slack.png" },
  { name: "QuickBooks", logo: "/brands/quickbooks.png" },
  { name: "Zapier", logo: "/brands/zapier.png" },
]

const MONEY = new Set(["Plaid", "Stripe", "QuickBooks"])
const MONEY_SOMETIMES = new Set([
  "PriceLabs",
  "Airbnb",
  "DoorDash",
  "Amazon",
  "Booking.com",
  "Uber",
  "Instacart",
  "Vrbo",
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
  "Vrbo",
  "Airbnb",
  "Hostaway",
  "Guesty",
])
const TASK_TO = new Set(["Jira", "Asana", "Monday.com"])
const RATING_FROM = new Set(["Guesty", "Hostaway", "Airbnb", "Booking.com", "Vrbo"])
const PERMISSION_TO = new Set(["Airbnb", "Booking.com", "Vrbo", "TaskRabbit", "Guesty", "Hostaway", "Amazon"])

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
    if (to !== index && name !== "Plaid" && name !== "Manager") return to
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
    if (app.name === "Manager") return managerFlow(index, offset)
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

function managerFlow(index: number, offset: number): Signal[] {
  const inbound: Array<Mark> = ["message", "task", "permission"]
  const outbound: Array<Mark> = ["message", "rating", "money"]
  return [
    ...inbound.map((mark, step) => ({
      from: index,
      kind: "absorb" as const,
      mark,
      delay: `${(offset + 0.4 + step * 1.35).toFixed(2)}s`,
      duration: "4.5s",
    })),
    ...outbound.map((mark, step) => ({
      from: index,
      kind: "outbound" as const,
      mark,
      delay: `${(offset + 0.9 + step * 1.35).toFixed(2)}s`,
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
  return (
    <div className="min-w-0">
      <OrbitStage>
        <div className="orbit-right absolute inset-0">
          <Signals apps={apps} radius={44} signals={ORBIT_SIGNALS} upright="orbit-upright-right" />
          {apps.map((app) => (
            <AppIcon key={app.name} app={app} upright="orbit-upright-right" />
          ))}
          {apps.map((app) => (
            <AppLabel key={app.name} app={app} upright="orbit-upright-right" />
          ))}
        </div>
      </OrbitStage>
      <ul className="mx-auto mt-3 flex w-full max-w-full flex-nowrap items-center justify-center gap-x-2 overflow-x-auto text-[11px] leading-none text-ink sm:gap-x-4 sm:text-sm [&_svg]:size-3.5">
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

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path fill="#1a73e8" d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
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
}: {
  app: (typeof APPS)[number] & { left: string; top: string }
  upright: string
}) {
  return (
    <div className="absolute z-10 size-0" style={{ left: app.left, top: app.top }}>
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <div className={upright}>
          <AppGlyph app={app} />
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
    const ring = item.name === "Manager" ? 36 : radius
    const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2
    return {
      ...item,
      radius: ring,
      angle: (angle * 180) / Math.PI,
      left: `${50 + Math.cos(angle) * ring}%`,
      top: `${50 + Math.sin(angle) * ring}%`,
    }
  })
}

function AppGlyph({ app }: { app: (typeof APPS)[number] }) {
  if (app.icon === "user") {
    return (
      <span className="flex size-10 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-white shadow-sm sm:size-14">
        <UserIcon className="size-5 sm:size-7" />
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
