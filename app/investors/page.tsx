import type { Metadata } from "next"
import Link from "next/link"
import { PitchDeck } from "@/components/site/pitch-deck"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Investor pitch",
  description:
    "A ten-slide briefing on TalkToGenie.ai: the AI operating layer that runs hospitality communication, tasks, and reservation money, with human support over the automation.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function InvestorsPage() {
  return (
    <Section>
      <Eyebrow>For investors</Eyebrow>
      <Display as="h1" className="mt-4 max-w-4xl">
        Ten slides. One operating layer.
      </Display>
      <Lede className="mt-5">
        Genie is the AI brand a hospitality operator plugs into. It handles support, communication, and task management across every stakeholder, with human support over the automation.
      </Lede>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="/pitch-deck.pptx"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#e8c56a] px-5 text-sm text-[#123848]"
        >
          Download PowerPoint
        </a>
        <a
          href="/pitch-deck.pdf"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#2eafd0]/30 bg-white/80 px-5 text-sm text-ink"
        >
          Download PDF
        </a>
        <Link
          href="/investors#outreach"
          className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm text-mist"
        >
          Outreach note
        </Link>
      </div>
      <div className="mt-10">
        <PitchDeck />
      </div>
    </Section>
  )
}
