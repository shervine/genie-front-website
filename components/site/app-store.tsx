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
          {place(APPS.slice(0, 7), 23).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-left" />
          ))}
        </div>
        <div className="orbit-right absolute inset-0">
          {place(APPS.slice(7), 39).map((app) => (
            <AppNode key={app.name} app={app} upright="orbit-upright-right" />
          ))}
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-mist">
        These are a sample of the shelf: property systems, guest channels, mail and phone, task tools, and the services behind “Hey Genie.” Marks belong to their owners. A tile is a connection Genie is built to offer, not a partnership badge.
      </p>
    </Section>
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
