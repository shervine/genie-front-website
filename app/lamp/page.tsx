import type { Metadata } from "next"
import { Lamp } from "@/components/site/lamp"
import { Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Genie Lamp",
  description:
    "Your wish is my command. The Genie Lamp is an on-demand concierge in the property. Guests say Hey Genie, any hour, and can keep asking.",
}

export default function LampPage() {
  return (
    <>
      <Lamp
        titleAs="h1"
        heading="Bye Phone. Hey Genie."
        lede="Your wish is my command. Say “Hey Genie.” The lamp is an on-demand concierge, awake 24/7. Guests can ask three million wishes, and Genie grants them with a high speed and consistency. With the guest’s card on file and their say-so, a prompt can order from DoorDash, Amazon, or Instacart."
      />
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Two kinds of stay", "Between two queen beds in a hotel, or on the kitchen counter of a house. Say “Hey Genie,” and the same concierge answers."],
            ["Same rules", "A voice request is meant to follow the same policies as a text. “Send maintenance” should become a task, not a novelty."],
            ["No second product", "The lamp is the physical edge of the operating layer. It is not a separate chatbot with a different brain."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-[#d4af37]/35 p-5">
              <h2 className="text-lg text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-mist">
          Hardware pricing and shipping are not published here. The room shown is a visualization of the lamp on a hotel nightstand, not a unit you can order from this page.
        </p>
      </Section>
    </>
  )
}
