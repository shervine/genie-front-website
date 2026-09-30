import type { Metadata } from "next"
import { HowItWorks } from "@/components/site/how-it-works"
import { PolicyTree } from "@/components/site/policy-tree"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Adopt Genie’s standard hospitality rules, customize them in a few minutes during onboarding, and let Genie drive the operation from there.",
}

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pb-0">
        <Eyebrow>How it works</Eyebrow>
        <Display as="h1" className="mt-4 max-w-4xl">
          Standard rules, tuned in minutes. Then Genie drives.
        </Display>
        <Lede className="mt-5">
          You don’t build the rulebook from scratch. Onboarding starts from a standard set of hospitality rules. You customize what your company does differently, usually in a few minutes. After that, the operation is self-driving. People stay on the exceptions.
        </Lede>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] border border-white/10 p-5">
            <h2 className="text-lg text-white">What people keep</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Exceptions, approvals over the line, owner relationships, guest recovery that needs judgment, and the strategy of the portfolio.
            </p>
          </article>
          <article className="rounded-[24px] border border-white/10 p-5">
            <h2 className="text-lg text-white">What Genie is for</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              The repetitive middle: understanding a message, applying the rule, creating the task, offering the approved upsell, and explaining the reservation money.
            </p>
          </article>
        </div>
      </Section>
      <HowItWorks intro={false} />
      <PolicyTree />
    </>
  )
}
