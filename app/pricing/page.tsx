import type { Metadata } from "next"
import { Pricing } from "@/components/site/pricing"
import { Roi } from "@/components/site/roi"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple monthly per-listing pricing for TalkToGenie.ai, plus the Genie Lamp at $99. The lamp includes the 3D-printed frame and a Google Nest Mini that wakes on Hey Genie.",
}

export default function PricingPage() {
  return (
    <>
      <Pricing detailed titleAs="h1" />
      <Roi />
    </>
  )
}
