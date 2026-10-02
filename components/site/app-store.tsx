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
      <Display as={titleAs} className="mt-4 max-w-3xl">Hundreds of apps. The tools you already run.</Display>
      <Lede className="mt-5">
        Genie has an app store with hundreds of apps for the popular tools and websites an operator uses. Connect the PMS, the channels, the inbox, the task board, and the services a guest can ask for. Genie works across that set.
      </Lede>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {APPS.map((app) => (
          <li
            key={app.name}
            className="flex flex-col items-center gap-3 rounded-[22px] border border-[#d4af37]/35 bg-white/85 px-3 py-4"
          >
            <AppGlyph app={app} />
            <span className="text-center text-sm text-ink">{app.name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-mist">
        These are a sample of the shelf: property systems, guest channels, mail and phone, task tools, and the services behind “Hey Genie.” Marks belong to their owners. A tile is a connection Genie is built to offer, not a partnership badge.
      </p>
    </Section>
  )
}

function AppGlyph({ app }: { app: (typeof APPS)[number] }) {
  if (app.logo) {
    return (
      <span className="flex size-14 items-center justify-center rounded-2xl bg-[#f4fbfe]">
        <Image src={app.logo} alt="" width={40} height={40} className="size-10 object-contain" />
      </span>
    )
  }

  if (app.mark) {
    const brand = BRAND_MARKS[app.mark]
    return (
      <span className="flex size-14 items-center justify-center rounded-2xl bg-[#f4fbfe]">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
          <path d={brand.path} fill={`#${brand.hex}`} />
        </svg>
      </span>
    )
  }

  return (
    <span
      className="flex size-14 items-center justify-center rounded-2xl text-xs font-semibold tracking-tight text-white"
      style={{ backgroundColor: app.color }}
      aria-hidden="true"
    >
      {app.initials}
    </span>
  )
}
