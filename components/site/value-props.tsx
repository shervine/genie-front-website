import Image from "next/image"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const FEATURES = [
  {
    title: "Unified inbox",
    body: "Every channel in one thread, with sentiment on the guest.",
    icon: InboxIcon,
  },
  {
    title: "Task management",
    body: "Opens the job, watches it, and closes the inquiry when the work is done.",
    icon: WrenchIcon,
  },
  {
    title: "Financial tracker",
    body: "Matches reservation money to the bank and flags a later dispute.",
    icon: DollarIcon,
  },
  {
    title: "Intent analytics",
    body: "More than 1,000 hospitality intents, counted so the report names the unit.",
    icon: ChartIcon,
  },
  {
    title: "Human in the loop",
    body: "Genie acts only on a policy a person already wrote.",
    icon: LoopIcon,
  },
  {
    title: "Live translation",
    body: "Up to 50 languages, so each person reads the same chat in their own.",
    icon: TranslateIcon,
  },
  {
    title: "One coordinator",
    body: "Each role hears what changed, and only what is theirs.",
    icon: NodesIcon,
  },
  {
    title: "Ratings scoreboard",
    body: "Average rating is the number Genie is built to move.",
    icon: StarIcon,
  },
  {
    title: "Upsell income",
    body: "A granted wish can become an order, and the extra revenue is tracked.",
    icon: UpsellIcon,
  },
]

export function ValueProps() {
  return (
    <Section id="features">
      <Eyebrow>Features</Eyebrow>
      <Display className="mt-4 md:whitespace-nowrap">Tools that grant the wish.</Display>
      <Lede className="mt-5">
        Used together, and followed in the direction Genie sets, these are how an operator runs the company. Human support sits over the automation, so the AI stays controlled and doing what was decided.
      </Lede>

      <figure className="mt-10 overflow-hidden rounded-[28px] border border-[#d4af37]/35 bg-white shadow-[0_24px_80px_rgba(18,56,72,0.08)]">
        <Image
          src="/unified-inbox.jpg"
          alt="The Genie inbox for Superhost, with guest threads on the left, an open conversation with Alexandra Maclean Kelly about a refund and check-in form, and a recap marked Satisfied beside her booking."
          width={1920}
          height={974}
          className="h-auto w-full"
          priority
        />
        <figcaption className="border-t border-[#d4af37]/35 px-5 py-4 text-center text-sm leading-relaxed text-mist">
          <span className="text-ink">Ultra unified inbox. </span>
          Every channel in one place. The open thread, the task, and the guest recap sit side by side.
        </figcaption>
      </figure>

      <ol className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="flex aspect-square flex-col items-center justify-center rounded-[20px] border border-[#d4af37]/35 bg-white/70 p-1.5 text-center sm:p-3"
          >
            <feature.icon />
            <h3 className="mt-1 text-sm leading-tight font-bold text-ink sm:mt-2 sm:text-xl">{feature.title}</h3>
            <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-mist sm:text-xs">{feature.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111">$</text>
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M4 19h16v2H4zM6 17V10h3v7H6zm5 0V6h3v11h-3zm5 0v-6h3v6h-3z" />
    </svg>
  )
}

function LoopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <circle cx="12" cy="8" r="3" fill="#111" />
      <path fill="#111" d="M7.2 18.5c.5-2.4 2.3-3.7 4.8-3.7s4.3 1.3 4.8 3.7c.1.5-.3.9-.8.9H8c-.5 0-.9-.4-.8-.9z" />
      <path fill="#111" d="M16.2 4.2 18.6 6.6 16.2 9l-1.1-1.1 1.1-1.1h-1.6c-.8 0-1.4.6-1.4 1.4v.6h-1.6v-.6c0-1.7 1.3-3 3-3h1.6l-1.1-1.1 1.1-1.1z" />
    </svg>
  )
}

function TranslateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M4 4h9v2H9.2c-.3 1.4-.9 2.6-1.8 3.6 1.2.6 2.6.9 4.1.9v2c-2.1 0-4-.5-5.6-1.4C4.6 12.4 3.6 13.6 3 15H1c.8-2 2.1-3.6 3.8-4.8C3.6 8.8 2.8 7.2 2.5 5.4H4.6C4.8 6.6 5.2 7.7 5.8 8.6 6.6 7.4 7.1 6 7.4 4.4H4V4zm11.2 6H22v2h-2.1l.1.6c.2 1.2.1 2.3-.4 3.2-.6 1.1-1.6 1.9-2.8 2.4l-1.1-1.7c.8-.3 1.4-.8 1.8-1.5.3-.6.4-1.2.3-1.9l-.1-.7H13.2v-2h2z" />
      <path fill="#111" d="M13 16.2h8l-4 5.2-4-5.2z" />
    </svg>
  )
}

function NodesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path stroke="#111" strokeWidth="1.6" d="M12 8v4M8.2 16.2 12 12l3.8 4.2" />
      <circle cx="12" cy="6" r="2.2" fill="#111" />
      <circle cx="6.5" cy="17.5" r="2.2" fill="#111" />
      <circle cx="17.5" cy="17.5" r="2.2" fill="#111" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M12 2.6 14.8 8.7l6.6.8-4.9 4.5 1.3 6.5L12 17.4 6.2 20.5l1.3-6.5L2.6 9.5l6.6-.8L12 2.6z" />
    </svg>
  )
}

function UpsellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-14 sm:size-18" aria-hidden="true">
      <path fill="#111" d="M4 16.5 10 10l3.2 3.2L20 6.2V11h2V3h-8v2h4.6l-5.4 5.6L10 7.4 2.6 15.1 4 16.5z" />
    </svg>
  )
}
