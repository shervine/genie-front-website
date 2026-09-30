import { UPSELL_STEPS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section, SimBadge } from "@/components/site/section"

const LINES = [
  { from: "Guest", text: "Can we check in early?" },
  {
    from: "Genie",
    text: "Absolutely. The property is available from 1 PM. Early check-in is available for $45. Would you like me to add it?",
  },
  { from: "Guest", text: "Yes." },
]

export function Upsell() {

  return (
    <Section id="upsells">
      <Eyebrow>Automated upsell engine</Eyebrow>
      <Display className="mt-4 max-w-3xl">Turn service into revenue — automatically.</Display>
      <Lede className="mt-5">
        Early check-in, late checkout, extensions, extra cleaning, pets, parking, extra guests, experiences, transportation, and the add-ons you define. Genie offers them when the stay and your policy say it is appropriate.
      </Lede>
      <div className="panel mt-10 grid gap-6 rounded-[28px] p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink">Early check-in · Unit 214</p>
            <SimBadge />
          </div>
          <div className="mt-4 space-y-3">
            {LINES.map((line, index) => (
              <p
                key={line.text}
                className={`rise max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  line.from === "Genie" ? "bg-[#e5f6fb] text-ink" : "bg-[#e8c56a] text-[#123848]"
                }`}
                style={{ animationDelay: `${index * 450}ms` }}
              >
                <span className="mb-1 block text-[10px] tracking-[0.16em] uppercase opacity-70">{line.from}</span>
                {line.text}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] text-glow uppercase">After the yes</p>
          <ol className="mt-4 space-y-3">
            {UPSELL_STEPS.map((item, index) => (
              <li
                key={item}
                className="rise rounded-2xl border border-[#2eafd0] px-4 py-3 text-sm text-ink"
                style={{ animationDelay: `${(LINES.length + index) * 450}ms` }}
              >
                ✓ {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
