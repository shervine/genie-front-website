import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const OUTCOMES = [
  {
    title: "Guests who are satisfied",
    body: "The greater share of inbound inquiries is built to resolve on its own, in the tone the operator already chose.",
  },
  {
    title: "Ratings that rise",
    body: "Average rating is the scoreboard. As the loop between guest, cleaner, owner, and operator tightens, that number is what Genie is here to move.",
  },
  {
    title: "Higher income",
    body: "A tighter operation, fewer missed stays, and recovered revenue are how the same portfolio earns more.",
  },
  {
    title: "Operational excellence",
    body: "Messages, tasks, and money move as one operation, instead of a day spent jumping between tools. That is what the portfolio arrives at.",
  },
]

export function Outcomes() {
  return (
    <Section id="outcomes" className="py-16 md:py-20">
      <Eyebrow>What the operator unlocks</Eyebrow>
      <Display className="mt-4 max-w-3xl">Follow Genie. Ratings rise.</Display>
      <Lede className="mt-5">
        The tools matter because they are used together. Guests leave satisfied, ratings rise, income grows, and operational excellence is what the portfolio arrives at.
      </Lede>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {OUTCOMES.map((item, index) => (
          <li key={item.title} className="rounded-[24px] border border-[#d4af37]/35 bg-white/70 p-5">
            <p className="font-display text-2xl text-[#b8860b]">0{index + 1}</p>
            <h3 className="mt-2 text-lg text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
