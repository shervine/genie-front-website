import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

const METRICS = [
  "Conversations resolved inside policy",
  "Hours returned per 100 reservations",
  "Tasks closed without a chase",
  "Reconciliation exceptions caught",
  "Upsell revenue that cleared",
]

export function Proof() {
  return (
    <Section id="proof">
      <Eyebrow>Proof, when it’s real</Eyebrow>
      <Display className="mt-4 max-w-3xl">We won’t invent an automation rate.</Display>
      <Lede className="mt-5">
        When operators are live, this is where verified results belong. Not before.
      </Lede>
      <ul className="mt-8 divide-y divide-white/10 rounded-[28px] border border-[#d4af37]/35">
        {METRICS.map((metric) => (
          <li key={metric} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-ink">{metric}</span>
            <span className="text-sm text-mist">Published with the operator</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
