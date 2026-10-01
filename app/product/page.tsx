import type { Metadata } from "next"
import { AskGenie } from "@/components/site/ask-genie"
import { Differentiators } from "@/components/site/differentiators"
import { Modules } from "@/components/site/modules"
import { Stakeholders } from "@/components/site/stakeholders"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Product",
  description:
    "Genie is the autonomous operating layer for hospitality: policy-controlled execution across communication, tasks, upsells, reconciliation, and the people who run the stay.",
}

export default function ProductPage() {
  return (
    <>
      <Section className="pb-0">
        <Eyebrow>Product</Eyebrow>
        <Display as="h1" className="mt-4 max-w-4xl">
          One AI brand for the whole operation.
        </Display>
        <Lede className="mt-5">
          Plug in the stack you already run. Genie takes guest communication, task coordination, and reservation money, inside an intent tree you can rewrite. Human support sits over the automation.
        </Lede>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
          Built for vacation-rental managers, serviced apartments, aparthotels, boutique groups, and multi-market operators, roughly 20 to 2,000+ listings. The job is not more software. The job is one layer that can see the stay, decide inside policy, and finish the action.
        </p>
      </Section>
      <Differentiators />
      <Modules />
      <Stakeholders />
      <AskGenie heading="Don’t search through dashboards. Ask Genie." />
    </>
  )
}
