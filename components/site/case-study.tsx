import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const RESULTS = [
  {
    value: "35% → 85%+",
    label: "Response completion",
    detail: "In 35 days",
  },
  {
    value: "4.55 → 4.83",
    label: "Average rating",
    detail: "In the first 100 days",
  },
  {
    value: "87%",
    label: "Suggested tasks completed",
    detail: "Across the portfolio",
  },
]

export function CaseStudy({
  titleAs = "h2",
  detailed = false,
}: {
  titleAs?: "h1" | "h2"
  detailed?: boolean
}) {
  return (
    <Section id="superhost">
      <Eyebrow>Case study · Superhost Management</Eyebrow>
      <Display as={titleAs} className="mt-4 max-w-4xl">
        What Superhost reported.
      </Display>
      <Lede className="mt-5">
        120 listings in Vancouver and Los Angeles. These figures were reported by Superhost Management. TalkToGenie did not invent them.
      </Lede>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {RESULTS.map((item) => (
          <li key={item.label} className="rounded-[28px] border border-[#d4af37]/35 bg-white/75 p-6">
            <p className="font-display text-4xl leading-none text-ink sm:text-5xl">{item.value}</p>
            <p className="mt-4 text-ink">{item.label}</p>
            <p className="mt-1 text-sm text-mist">{item.detail}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-[28px] border border-[#d4af37]/35 p-6">
          <h3 className="text-lg text-ink">The operation</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Superhost Management runs stays on both sides of the border. Guest messages, turnover tasks, and the money on each reservation were already split across the tools the team paid for. Genie sat on that stack and acted only where a person had already defined the pattern.
          </p>
        </article>
        <article className="rounded-[28px] border border-[#d4af37]/35 p-6">
          <h3 className="text-lg text-ink">What moved</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Replies that used to stall started closing. Suggested tasks were finished instead of chased. The scoreboard they watched was the average rating, and that number rose in the first hundred days.
          </p>
        </article>
      </div>
      {detailed ? (
        <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-mist">
          <p>
            Response completion is the share of inbound inquiries that reached a finished reply. Superhost reported that share moving from 35% to over 85% within 35 days of running Genie.
          </p>
          <p>
            Average rating is the public score across the portfolio. Superhost reported it moving from 4.55 to 4.83 in the first 100 days.
          </p>
          <p>
            Of the tasks Genie suggested, Superhost reported that 87% were completed. The rest stayed with a person, which is the point of the guarantee: no match, no action.
          </p>
        </div>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {detailed ? null : (
          <Link href="/superhost" className={buttonVariants({ className: "h-12 rounded-full px-6" })}>
            Read the case study
          </Link>
        )}
        <a
          href="/superhost-case-study.pdf"
          className={buttonVariants({
            variant: "outline",
            className: "h-12 rounded-full border-[#d4af37]/50 bg-white/70 px-6 text-ink hover:bg-[#fff4d6]",
          })}
        >
          Download the PDF
        </a>
      </div>
    </Section>
  )
}
