import Image from "next/image"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const TOOLS = [
  {
    title: "Ultra unified inbox",
    body: "Every touchpoint on every guest is tracked in one place, with sentiment on the thread. Workflows are built so the greater majority of inbound inquiries can be resolved without a person.",
  },
  {
    title: "Task management for every stakeholder",
    body: "Guests, cleaners, homeowners, and operators share one coordinator. When the fix has to happen in the physical world, Genie opens a task, watches it, and closes the guest inquiry only when the work is done.",
  },
  {
    title: "Financial tracker",
    body: "Expected reservation revenue is matched to bank transactions, through a connection such as Plaid, and to card payouts such as Stripe. A later dispute is flagged so the money is not quietly lost.",
  },
  {
    title: "Intent analytics",
    body: "A decision tree of more than 1,000 hospitality intents. Genie counts every trigger, so the report can say which unit had access issues and which had furniture complaints.",
  },
  {
    title: "Full human in the loop",
    body: "The common patterns are predefined. Onboarding starts from the template that fits, and every branch can be rewritten. Each new message is matched to that tree. Tone and resolution stay inside what the operator would decide. If an intent is missing, our team expands the tree.",
  },
  {
    title: "Live translation, up to 50 languages",
    body: "Every stakeholder reads the same chat in their own language. The translation happens on its own, so a cleaner, an owner, and a guest can stay in one thread.",
  },
  {
    title: "One coordinator",
    body: "Genie keeps each person on their responsibilities and tells the others what changed. Maintenance, cleaning, and the physical teams do the work. Genie collects the tips and the feedback and puts them where the next person can use them.",
  },
  {
    title: "Ratings, as the scoreboard",
    body: "Average rating is the metric Genie is built to move with the operator. As communication tightens, guest satisfaction rises, and higher nightly rates become available on the same homes.",
  },
]

export function ValueProps() {
  return (
    <Section id="tools">
      <Eyebrow>The tools</Eyebrow>
      <Display className="mt-4 max-w-3xl">The set that makes the wish operational.</Display>
      <Lede className="mt-5">
        Used together, and followed in the direction Genie sets, these are how an operator runs the company. Human support sits over the automation, so the AI stays controlled and doing what was decided.
      </Lede>

      <figure className="mt-10 overflow-hidden rounded-[28px] border border-[#d4af37]/35 bg-white shadow-[0_24px_80px_rgba(18,56,72,0.08)]">
        <Image
          src="/unified-inbox.jpg"
          alt="A unified inbox with Airbnb, Booking.com, Vrbo, email, WhatsApp, and SMS in one list. Most threads are marked resolved by Genie. The open thread shows a guest AC issue, Genie’s reply, a same-day maintenance task, and sentiment moving from frustrated to calm."
          width={1280}
          height={720}
          className="h-auto w-full"
          priority
        />
        <figcaption className="border-t border-[#d4af37]/35 px-5 py-4 text-sm leading-relaxed text-mist">
          <span className="text-ink">Ultra unified inbox. </span>
          Every channel in one place. Sentiment on the guest. A task when someone has to go to the property. Harbor & Co. is a sample, not a live portfolio.
        </figcaption>
      </figure>

      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.title} className="rounded-[24px] border border-[#d4af37]/35 p-5">
            <h3 className="text-lg text-ink">{tool.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{tool.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
