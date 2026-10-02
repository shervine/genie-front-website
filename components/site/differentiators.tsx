import { CONTRAST, DIFFERENTIATORS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export function Differentiators() {
  return (
    <Section>
      <Eyebrow>Why this is a layer, not another tool</Eyebrow>
      <Display className="mt-4 max-w-3xl">Abracadabra. Genie does the work.</Display>
      <Lede className="mt-5">
        Existing systems stay connected underneath. Genie becomes the intelligence and orchestration across them.
      </Lede>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {CONTRAST.map(([left, right]) => (
          <div key={left} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#d4af37]/35 text-sm">
            <p className="bg-white/70 px-4 py-4 text-mist">{left}</p>
            <p className="bg-[#e7f4fa] px-4 py-4 text-ink">{right}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {DIFFERENTIATORS.map((item) => (
          <article key={item.n} className="rounded-[24px] border border-[#d4af37]/35 p-5">
            <p className="font-display text-2xl text-[#b8860b]">{item.n}</p>
            <h3 className="mt-2 text-lg text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
