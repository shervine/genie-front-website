import type { Metadata } from "next"
import { HowItWorks } from "@/components/site/how-it-works"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Guarantee",
  description:
    "Genie only acts on patterns people have already defined. Every company adopts our standard policy, customizes it in onboarding, and can keep fine-tuning it. If nothing matches, Genie does not act.",
}

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pb-0">
        <Eyebrow>Guarantee</Eyebrow>
        <Display as="h1" className="mt-4 max-w-4xl">
          Every Interaction Human-Defined & Human-Reviewed
        </Display>
        <Lede className="mt-5">
          Genie only detects patterns a person has already written. It does not invent a next step. If an inbound message matches none of those patterns, Genie does not act. Every new company adopts our standard policy, fully defined by us, then customizes it in onboarding and keeps fine-tuning it later, so the behavior is precisely theirs. That is how Genie can resolve the great majority of inquiries and still stay predictable: hundreds of distinct patterns, each one human-defined, each one adjustable for that company.
        </Lede>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-[24px] border border-[#d4af37]/35 p-5 text-center">
            <h2 className="text-lg text-ink">If it isn’t written, it doesn’t happen</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Genie has no move outside the policy. Unmatched messages wait for a person. People keep exceptions, approvals over the line, and anything that still needs judgment.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#d4af37]/35 p-5 text-center">
            <h2 className="text-lg text-ink">Personalize & Adopt our Policy Tree</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              This is what we have been building. It gives Genie full driving capabilities while ensuring every interaction stays human controlled.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#d4af37]/35 p-5 text-center">
            <h2 className="text-lg text-ink">Yours to rewrite</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              The starting policy is ours. Onboarding makes it yours, and later fine-tuning keeps it yours. Tone, resolution, and the action on each pattern are instructions you set.
            </p>
          </article>
        </div>
      </Section>
      <HowItWorks intro={false} />
    </>
  )
}
