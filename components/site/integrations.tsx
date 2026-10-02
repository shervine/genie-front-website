"use client"

import { useState } from "react"
import { Display, Eyebrow, Lede, Section } from "@/components/site/section"
import { cn } from "@/lib/utils"

const ACCESS_LEVELS = [
  {
    id: "super-admin",
    name: "Super Admins",
    system: "Genie Admin",
    summary: "The view above every account. They see who is allowed in, and the rules the product itself is running.",
    sees: ["Every company on Genie", "Roles and permissions", "Platform rules"],
  },
  {
    id: "manager",
    name: "Managers",
    system: "Client Admin",
    summary: "The client’s own admins. Their portfolio’s messages, tasks, and money sit in one place, and they decide who on the team can open what.",
    sees: ["Company-wide threads", "Tasks and exceptions", "Who has access"],
  },
  {
    id: "operator",
    name: "Operators",
    system: "Genie Support",
    summary: "Genie staff helping that client. They see the live operation they are supporting, so an answer does not wait on an export.",
    sees: ["The account they support", "Live conversations", "The context of the request"],
  },
  {
    id: "guest",
    name: "Guests",
    system: "Client Guest",
    summary: "Only their stay. The guide, their requests, and the conversation with Genie. The next guest and the owner stay out of it.",
    sees: ["Their reservation", "Property guide", "Their own thread"],
  },
  {
    id: "cleaner",
    name: "Cleaners",
    system: "Client Cleaner",
    summary: "The turnovers assigned to them. The unit, how to get in, the checklist, and a place to report what they found.",
    sees: ["Assigned turnovers", "Access for that job", "Checklist and photos"],
  },
  {
    id: "handyman",
    name: "Handymen",
    system: "Client Handyman",
    summary: "The repair in front of them. What broke, which unit, how urgent, and the notes already collected.",
    sees: ["Their work orders", "Property context", "Priority and notes"],
  },
  {
    id: "support",
    name: "Support",
    system: "Client Support",
    summary: "The client’s own desk. The threads they are assigned, and the reservation facts they need to answer.",
    sees: ["Assigned conversations", "Stay details", "What Genie already did"],
  },
  {
    id: "vendor",
    name: "Vendors",
    system: "Marketplace and client",
    summary: "One job at a time, from the Genie marketplace or assigned by the client. The address, the window, and the work. Not the rest of the company.",
    sees: ["That job only", "Arrival window", "Notes required to finish"],
  },
  {
    id: "owner",
    name: "Home Owners",
    system: "Client home owner",
    summary: "Their homes. How the month went, what guests said, and the money and maintenance that concern those listings.",
    sees: ["Their properties", "Guest feedback", "Money and maintenance"],
  },
] as const

export function Integrations({
  showIntro = true,
  titleAs = "h2",
}: {
  showIntro?: boolean
  titleAs?: "h1" | "h2"
}) {
  const [id, setId] = useState<(typeof ACCESS_LEVELS)[number]["id"]>(ACCESS_LEVELS[0].id)
  const level = ACCESS_LEVELS.find((item) => item.id === id) ?? ACCESS_LEVELS[0]

  return (
    <Section id="access">
      {showIntro ? (
        <>
          <Eyebrow>Apps</Eyebrow>
          <Display as={titleAs} className="mt-4 max-w-3xl">Keep your stack. Add Genie.</Display>
          <Lede className="mt-5">
            Genie has an app store with hundreds of apps for the tools an operator already runs. The names below are connection targets in that store, not a partner roster, and not a claim that every connector is live.
          </Lede>
        </>
      ) : null}

      <div className={showIntro ? "mt-16" : ""}>
        <Eyebrow>Access levels</Eyebrow>
        <Display as={showIntro ? "h3" : "h2"} className="mt-4 max-w-3xl">
          One person. One view.
        </Display>
        <Lede className="mt-5">
          Genie recognizes the access level and opens the communication and the data that belong to that person. Choose a level. The others stay closed.
        </Lede>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Access levels">
          {ACCESS_LEVELS.map((item) => {
            const selected = item.id === level.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setId(item.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm",
                  selected ? "bg-[#e8c56a] text-[#123848]" : "border border-[#2eafd0]/30 text-mist",
                )}
              >
                {item.name}
              </button>
            )
          })}
        </div>

        <article className="panel mt-4 rounded-[28px] p-6 sm:p-8" role="tabpanel" aria-live="polite">
          <p className="text-xs tracking-[0.16em] text-glow uppercase">{level.system}</p>
          <h3 className="mt-2 font-display text-4xl text-ink">{level.name}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">{level.summary}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {level.sees.map((item) => (
              <li key={item} className="rounded-2xl border border-[#d4af37]/35 bg-white/80 px-4 py-4 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  )
}
