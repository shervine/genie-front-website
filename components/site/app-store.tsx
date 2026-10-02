import Image from "next/image"
import { BRAND_MARKS } from "@/lib/brand-marks"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const APPS: Array<{
  name: string
  mark?: keyof typeof BRAND_MARKS
  logo?: string
  initials?: string
  color?: string
}> = [
  { name: "Guesty", logo: "/brands/guesty.png" },
  { name: "Hostaway", logo: "/brands/hostaway.png" },
  { name: "PriceLabs", logo: "/brands/pricelabs.png" },
  { name: "TaskRabbit", logo: "/brands/taskrabbit.png" },
  { name: "Amazon", logo: "/brands/amazon.png" },
  { name: "Instacart", mark: "instacart" },
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
  { name: "Hospitable", logo: "/brands/hospitable.png" },
  { name: "Breezeway", logo: "/brands/breezeway.png" },
  { name: "Turno", logo: "/brands/turno.png" },
  { name: "Expedia", logo: "/brands/expedia.png" },
  { name: "Stripe", logo: "/brands/stripe.png" },
  { name: "Slack", logo: "/brands/slack.png" },
  { name: "QuickBooks", logo: "/brands/quickbooks.png" },
  { name: "RemoteLock", logo: "/brands/remotelock.png" },
]

const MONEY = new Set(["Plaid", "Stripe", "QuickBooks"])
const MONEY_SOMETIMES = new Set([
  "PriceLabs",
  "Airbnb",
  "DoorDash",
  "Amazon",
  "Expedia",
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
  "Hospitable",
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

const INNER_APPS = APPS.slice(0, 9)
const OUTER_APPS = APPS.slice(9)
const INNER_SIGNALS = signalsFor(INNER_APPS, 0)
const OUTER_SIGNALS = signalsFor(OUTER_APPS, 0.35)

type Mark = "message" | "task" | "money"

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
  if (to === index || apps[to]?.name === "Plaid") to = (to + 1) % apps.length
  if (to === index || apps[to]?.name === "Plaid") to = (to + 1) % apps.length
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
    if (!CHATTY.has(app.name)) return [inbound, outbound, ...taskFlow(app.name, index, offset)]
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
    return [inbound, outbound, ...extraInbound, ...extraOutbound, ...taskFlow(app.name, index, offset)]
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

export function AppStore({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  return (
    <Section id="app-store" className="py-16 md:py-24">
      <Eyebrow>App store</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-4xl">Genie Handles Them All</Display>
      <Lede className="mt-5">
        About 85% of inbound inquiries are auto-resolved by a predefined human policy. Genie communicates with each app in two directions: it reads what came in, and it writes the reply, the task, or the update back.
      </Lede>
      <div className="orbit-stage relative mx-auto mt-6 aspect-square w-full max-w-[760px]">
        <div className="absolute top-1/2 left-[calc(50%+18px)] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="text-[4.5rem] leading-none drop-shadow-[0_0_28px_rgba(143,215,255,0.45)] sm:text-[6.5rem]" aria-hidden="true">
            🧞‍♂️
          </span>
          <span className="sr-only">Genie, at the center of the apps</span>
        </div>
        <div className="orbit-left absolute inset-0">
          <Signals apps={place(INNER_APPS, 24)} radius={24} signals={INNER_SIGNALS} upright="orbit-upright-left" />
          {place(INNER_APPS, 24).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-left" />
          ))}
        </div>
        <div className="orbit-right absolute inset-0">
          <Signals apps={place(OUTER_APPS, 42)} radius={42} signals={OUTER_SIGNALS} upright="orbit-upright-right" />
          {place(OUTER_APPS, 42).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-right" />
          ))}
        </div>
      </div>
      <ul className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink">
        <li className="flex items-center gap-2">
          <CommentIcon />
          Communication
        </li>
        <li className="flex items-center gap-2">
          <WrenchIcon />
          Tasks
        </li>
        <li className="flex items-center gap-2">
          <span className="text-base leading-none font-bold text-[#0f7a4a]">$</span>
          Financials
        </li>
      </ul>
    </Section>
  )
}

function Signals({
  apps,
  radius,
  signals,
  upright,
}: {
  apps: Array<(typeof APPS)[number] & { angle: number }>
  radius: number
  signals: Signal[]
  upright: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {apps.map((app) => (
        <Spoke key={app.name} angle={app.angle} radius={radius} />
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
              radius={radius}
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
              radius={radius}
              className={signal.kind === "return" ? "signal-return" : "signal-absorb"}
              delay={signal.delay}
              duration={signal.duration}
              mark={signal.kind === "return" && signal.moneyOut ? "money" : inboundMark}
              upright={upright}
            />
            {signal.kind === "redirect" ? (
              <Travel
                angle={target.angle}
                radius={radius}
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
  return <CommentIcon />
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
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path
        fill="#e24a2b"
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  )
}

function AppNode({
  app,
  upright,
}: {
  app: (typeof APPS)[number] & { left: string; top: string }
  upright: string
}) {
  return (
    <div className="absolute" style={{ left: app.left, top: app.top }}>
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className={`${upright} flex flex-col items-center`}>
          <AppGlyph app={app} />
          <span className="sr-only sm:not-sr-only sm:mt-1 sm:block sm:max-w-20 sm:text-center sm:text-[11px] sm:leading-tight sm:text-ink">
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
      angle: (angle * 180) / Math.PI,
      left: `${50 + Math.cos(angle) * radius}%`,
      top: `${50 + Math.sin(angle) * radius}%`,
    }
  })
}

function AppGlyph({ app }: { app: (typeof APPS)[number] }) {
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
