import type { Metadata } from "next"
import { Lamp } from "@/components/site/lamp"
import { Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Genie Lamp",
  description:
    "The Genie Lamp is a physical voice concierge for the property. Guests say Hey Genie. No extra app.",
}

export default function LampPage() {
  return (
    <>
      <Lamp
        titleAs="h1"
        heading="The front desk, reimagined."
        lede="Just say, “Hey Genie.” The lamp is a modern 3D-printed object with a smart speaker and voice interface, so a guest can reach the same operating layer without downloading another app or finding a phone number."
      />
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["In the room", "Wi-Fi, parking, the hot tub, a restaurant, a late checkout. The property guide, out loud."],
            ["Same rules", "A voice request is meant to follow the same policies as a text. “Send maintenance” should become a task, not a novelty."],
            ["No second product", "The lamp is the physical edge of the operating layer. It is not a separate chatbot with a different brain."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-white/10 p-5">
              <h2 className="text-lg text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-mist">
          Hardware pricing, shipping, and a certified device list are not published here. The lamp on this page is a product visualization, not a live unit you can order from the site.
        </p>
      </Section>
    </>
  )
}
