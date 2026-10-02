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
  { name: "SMS", initials: "SMS", color: "#2eafd0" },
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

const INNER_APPS = APPS.slice(0, 9)
const OUTER_APPS = APPS.slice(9)
const INNER_SIGNALS = signalsFor(INNER_APPS, 0)
const OUTER_SIGNALS = signalsFor(OUTER_APPS, 0.35)

type Signal = {
  from: number
  to?: number
  kind: "absorb" | "return" | "redirect"
  delay: string
  duration: string
}

function signalsFor(apps: Array<{ name: string }>, offset: number): Signal[] {
  return apps.flatMap((app, index) => {
    const outboundTarget = (index + 2 + (index % 3)) % apps.length
    const inbound: Signal = {
      from: index,
      kind: "absorb",
      delay: `${(offset + index * 0.38).toFixed(2)}s`,
      duration: `${4.4 + (index % 3) * 0.4}s`,
    }
    const outbound: Signal = {
      from: index,
      to: index % 2 === 0 ? outboundTarget : undefined,
      kind: index % 2 === 0 ? "redirect" : "return",
      delay: `${(offset + 0.7 + index * 0.33).toFixed(2)}s`,
      duration: `${4.6 + (index % 3) * 0.35}s`,
    }
    if (!CHATTY.has(app.name)) return [inbound, outbound]
    const extraInbound = [1.1, 2.2].map((step, stepIndex) => ({
      from: index,
      kind: "absorb" as const,
      delay: `${(offset + index * 0.15 + step).toFixed(2)}s`,
      duration: `${3.4 + stepIndex * 0.3}s`,
    }))
    const extraOutbound: Signal[] = [1.4, 2.6].map((step, stepIndex) => ({
      from: index,
      to: (index + 1 + stepIndex) % apps.length,
      kind: "redirect" as const,
      delay: `${(offset + index * 0.15 + step).toFixed(2)}s`,
      duration: `${3.6 + stepIndex * 0.25}s`,
    }))
    return [inbound, outbound, ...extraInbound, ...extraOutbound]
  })
}

export function AppStore({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  return (
    <Section id="app-store" className="py-16 md:py-24">
      <Eyebrow>App store</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-4xl">85% auto-resolved. 15% escalated to you.</Display>
      <Lede className="mt-5">
        Genie has an app store with hundreds of apps for the popular tools and websites an operator uses. Connect the PMS, the channels, the inbox, the task board, and the services a guest can ask for. Genie works across that set.
      </Lede>
      <div className="orbit-stage relative mx-auto mt-6 aspect-square w-full max-w-[760px]">
        <div className="absolute top-1/2 left-[calc(50%+18px)] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="text-[4.5rem] leading-none drop-shadow-[0_0_28px_rgba(143,215,255,0.45)] sm:text-[6.5rem]" aria-hidden="true">
            🧞‍♂️
          </span>
          <span className="sr-only">Genie, at the center of the apps</span>
        </div>
        <div className="orbit-left absolute inset-0">
          <Signals apps={place(INNER_APPS, 24)} radius={24} signals={INNER_SIGNALS} />
          {place(INNER_APPS, 24).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-left" />
          ))}
        </div>
        <div className="orbit-right absolute inset-0">
          <Signals apps={place(OUTER_APPS, 42)} radius={42} signals={OUTER_SIGNALS} />
          {place(OUTER_APPS, 42).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-right" />
          ))}
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-mist">
        Every signal comes to Genie first. Genie keeps some, sends some back to the same app, and redirects others to a different app. Marks belong to their owners. A tile is a connection Genie is built to offer, not a partnership badge.
      </p>
    </Section>
  )
}

function Signals({
  apps,
  radius,
  signals,
}: {
  apps: Array<(typeof APPS)[number] & { angle: number }>
  radius: number
  signals: Signal[]
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
        return (
          <span key={`${signal.kind}-${signal.from}-${signal.delay}-${index}`}>
            <Travel
              angle={source.angle}
              radius={radius}
              className={signal.kind === "return" ? "signal-return" : "signal-absorb"}
              delay={signal.delay}
              duration={signal.duration}
            />
            {signal.kind === "redirect" ? (
              <Travel
                angle={target.angle}
                radius={radius}
                className="signal-out"
                delay={`calc(${signal.delay} + ${signal.duration} * 0.46)`}
                duration={signal.duration}
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
}: {
  angle: number
  radius: number
  className: string
  delay: string
  duration: string
}) {
  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${angle + 90}deg)` }}>
      <div className="absolute bottom-1/2 left-1/2 w-2 -translate-x-1/2" style={{ height: `${radius}%` }}>
        <span
          className={`absolute left-0 size-[7px] rounded-full ${className}`}
          style={{ animationDelay: delay, animationDuration: duration }}
        />
      </div>
    </div>
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
