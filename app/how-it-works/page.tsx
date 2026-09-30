import type { Metadata } from "next"
import { HowItWorks } from "@/components/site/how-it-works"
import { PolicyTree } from "@/components/site/policy-tree"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Connect your hospitality stack, configure Genie’s policies, and move from Observe to Copilot to Autopilot without giving up the exception.",
}

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pb-0">
        <Eyebrow>How it works</Eyebrow>
        <Display as="h1" className="mt-4 max-w-4xl">
          You write the rules. Genie runs inside them.
        </Display>
        <Lede className="mt-5">
          A safe path into autonomy: watch, draft, then execute. The mode can differ by company, department, workflow, or a single policy.
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
