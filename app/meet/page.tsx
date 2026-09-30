import type { Metadata } from "next"
import { LeadForm } from "@/components/site/lead-form"

export const metadata: Metadata = {
  title: "Meet Genie",
  description: "Tell TalkToGenie about your portfolio and the work you want Genie to run.",
}

export default async function MeetPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>
}) {
  const params = await searchParams
  const intent = params.intent === "demo" ? "demo" : "meet"
  return <LeadForm intent={intent} titleAs="h1" />
}
