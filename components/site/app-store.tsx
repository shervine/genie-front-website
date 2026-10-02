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
]

const INNER_SIGNALS: Signal[] = [
  { from: 0, kind: "absorb", delay: "0s", duration: "4.6s" },
  { from: 2, kind: "return", delay: "1.1s", duration: "6.2s" },
  { from: 4, to: 6, kind: "redirect", delay: "0.4s", duration: "7s" },
  { from: 5, kind: "absorb", delay: "2.2s", duration: "5s" },
  { from: 1, kind: "return", delay: "2.8s", duration: "6.4s" },
]

const OUTER_SIGNALS: Signal[] = [
  { from: 0, kind: "absorb", delay: "0.6s", duration: "5.4s" },
  { from: 3, kind: "return", delay: "1.5s", duration: "6.6s" },
  { from: 5, to: 9, kind: "redirect", delay: "0.2s", duration: "7.2s" },
  { from: 8, kind: "absorb", delay: "2.4s", duration: "4.8s" },
  { from: 11, kind: "return", delay: "3.1s", duration: "6s" },
]

type Signal = {
  from: number
  to?: number
  kind: "absorb" | "return" | "redirect"
  delay: string
  duration: string
}

export function AppStore({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  return (
    <Section id="app-store" className="py-16 md:py-24">
      <Eyebrow>App store</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-4xl">Genie Resolves 85%+ of all Inbound Inquiries</Display>
      <Lede className="mt-5">
        Genie has an app store with hundreds of apps for the popular tools and websites an operator uses. Connect the PMS, the channels, the inbox, the task board, and the services a guest can ask for. Genie works across that set.
      </Lede>
      <div className="orbit-stage relative mx-auto mt-6 aspect-square w-full max-w-[760px]">
        <div className="absolute top-1/2 left-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/40" />
        <div className="absolute top-1/2 left-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2eafd0]/25" />
        <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="text-[4.5rem] leading-none drop-shadow-[0_0_28px_rgba(143,215,255,0.45)] sm:text-[6.5rem]" aria-hidden="true">
            🧞‍♂️
          </span>
          <span className="sr-only">Genie, at the center of the apps</span>
        </div>
        <div className="orbit-left absolute inset-0">
          <Signals apps={place(APPS.slice(0, 7), 23)} radius={23} signals={INNER_SIGNALS} />
          {place(APPS.slice(0, 7), 23).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-left" />
          ))}
        </div>
        <div className="orbit-right absolute inset-0">
          <Signals apps={place(APPS.slice(7), 39)} radius={39} signals={OUTER_SIGNALS} />
          {place(APPS.slice(7), 39).map((app) => (
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
      {signals.map((signal) => {
        const source = apps[signal.from]
        const target = signal.to === undefined ? source : apps[signal.to]
        if (!source || !target) return null
        return (
          <span key={`${signal.kind}-${signal.from}-${signal.to ?? "same"}`}>
            <Spoke angle={source.angle} radius={radius} />
            {signal.kind === "redirect" ? <Spoke angle={target.angle} radius={radius} /> : null}
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
        className="absolute bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-[#2eafd0]/55 via-[#2eafd0]/20 to-transparent"
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
