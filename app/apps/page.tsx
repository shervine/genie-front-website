import type { Metadata } from "next"
import { AppStore } from "@/components/site/app-store"
import { Integrations } from "@/components/site/integrations"

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Genie has an app store with hundreds of apps for the hospitality tools operators already use, from Guesty and Hostaway to Airbnb, WhatsApp, and the task boards the team runs.",
}

export default function AppsPage() {
  return (
    <>
      <AppStore titleAs="h1" />
      <Integrations showIntro={false} />
    </>
  )
}
