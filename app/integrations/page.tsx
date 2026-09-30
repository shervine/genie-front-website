import type { Metadata } from "next"
import { Integrations } from "@/components/site/integrations"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Genie is designed to sit above the hospitality stack you already use. Categories here are connection targets, not a claim that every connector is live.",
}

export default function IntegrationsPage() {
  return <Integrations titleAs="h1" />
}
