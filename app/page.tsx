import { Analytics } from "@/components/site/analytics"
import { AppStore } from "@/components/site/app-store"
import { AskGenie } from "@/components/site/ask-genie"
import { Hero } from "@/components/site/hero"
import { HowItWorks } from "@/components/site/how-it-works"
import { Lamp } from "@/components/site/lamp"
import { LeadForm } from "@/components/site/lead-form"
import { Modules } from "@/components/site/modules"
import { Outcomes } from "@/components/site/outcomes"
import { Pricing } from "@/components/site/pricing"
import { Problem } from "@/components/site/problem"
import { Proof } from "@/components/site/proof"
import { Reconciliation } from "@/components/site/reconciliation"
import { Stakeholders } from "@/components/site/stakeholders"
import { Upsell } from "@/components/site/upsell"
import { ValueProps } from "@/components/site/value-props"

export default function Home() {
  return (
    <>
      <Hero />
      <Outcomes />
      <AppStore />
      <Problem />
      <ValueProps />
      <HowItWorks />
      <Modules />
      <AskGenie />
      <Stakeholders />
      <Lamp />
      <Reconciliation />
      <Upsell />
      <Analytics />
      <Proof />
      <Pricing />
      <LeadForm />
    </>
  )
}
