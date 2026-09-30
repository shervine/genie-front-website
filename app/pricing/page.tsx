import type { Metadata } from "next"
import { Pricing } from "@/components/site/pricing"
import { Roi } from "@/components/site/roi"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple monthly per-listing pricing for TalkToGenie.ai. $25 up to 20 listings, $20 from 21 to 100, and $18 from 101 up.",
}

export default function PricingPage() {
  return (
    <>
      <Pricing detailed titleAs="h1" />
      <Roi />
    </>
  )
}
