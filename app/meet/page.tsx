import type { Metadata } from "next"
import { LeadForm } from "@/components/site/lead-form"

export const metadata: Metadata = {
  title: "Meet Genie",
  description: "Tell TalkToGenie about your portfolio and the work you want Genie to run.",
}

export default function MeetPage() {
  return <LeadForm titleAs="h1" />
}
