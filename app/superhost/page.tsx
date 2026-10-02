import type { Metadata } from "next"
import { CaseStudy } from "@/components/site/case-study"
import { LeadForm } from "@/components/site/lead-form"

export const metadata: Metadata = {
  title: "Superhost case study",
  description:
    "Superhost Management reported 120 listings in Vancouver and Los Angeles: response completion from 35% to over 85% in 35 days, average rating from 4.55 to 4.83 in 100 days, and 87% of suggested tasks completed.",
}

export default function SuperhostPage() {
  return (
    <>
      <CaseStudy titleAs="h1" detailed />
      <LeadForm />
    </>
  )
}
