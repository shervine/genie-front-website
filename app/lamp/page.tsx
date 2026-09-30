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
        heading="The hotel telephone, replaced."
        lede="The glossy white lamp from the print bed, on the nightstand where the room phone used to sit. A Nest Mini is inside. Guests say “Hey Genie.” They don’t pick up a handset or download an app."
      />
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["On the nightstand", "It occupies the spot reserved for the hotel telephone. Wi-Fi, parking, the hot tub, a restaurant, a late checkout — out loud."],
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
          Hardware pricing, shipping, and a certified device list are not published here. The drawing is a white printed lamp with a Nest Mini inside. It is not a Google partnership, and it is not a unit you can order from this page.
        </p>
      </Section>
    </>
  )
}
