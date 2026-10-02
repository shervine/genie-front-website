import { INTEGRATIONS } from "@/lib/content"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"
import { cn } from "@/lib/utils"

export function Integrations({
  showIntro = true,
  titleAs = "h2",
}: {
  showIntro?: boolean
  titleAs?: "h1" | "h2"
}) {
  return (
    <Section id="apps">
      {showIntro ? (
        <>
          <Eyebrow>Apps</Eyebrow>
          <Display as={titleAs} className="mt-4 max-w-3xl">Keep your stack. Add intelligence.</Display>
          <Lede className="mt-5">
            Genie has an app store with hundreds of apps for the tools an operator already runs. The names below are connection targets in that store, not a partner roster, and not a claim that every connector is live.
          </Lede>
        </>
      ) : null}

      <div className={cn("overflow-x-auto rounded-[24px] border border-[#d4af37]/35", showIntro ? "mt-10" : "mt-4")}>
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">Access level for each connection Genie is designed to sit across</caption>
          <thead className="text-xs tracking-[0.16em] text-mist uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Examples</th>
              <th className="px-4 py-3 font-medium">Access level</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((item) => (
              <tr key={item.id} className="border-t border-[#2eafd0]/20 align-top">
                <td className="px-4 py-3 text-ink">{item.category}</td>
                <td className="px-4 py-3 text-mist">{item.examples.join(", ")}</td>
                <td className="px-4 py-3 text-[#0e6f86]">{item.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mist">
        Access level is the role Genie is designed to recognize. A person should only see the slice that role allows.
      </p>
    </Section>
  )
}
