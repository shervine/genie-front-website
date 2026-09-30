"use client"

import { useState } from "react"
import { SimBadge } from "@/components/site/section"
import { cn } from "@/lib/utils"

const APPS = [
  {
    id: "integrations",
    label: "Integrations",
    note: "The connected stack. Ask what is linked, or tell Genie to use it.",
  },
  {
    id: "properties",
    label: "Properties",
    note: "Listings, access, and house rules. Ask about a property instead of opening another tool.",
  },
  {
    id: "calendar",
    label: "Calendar",
    note: "Arrivals, turnovers, and gaps. Ask Genie to act on tomorrow’s stays.",
  },
  {
    id: "reservations",
    label: "Reservations",
    note: "The stay, the guest, and the money. Ask which reservations are still open.",
  },
] as const

const CHATS = [
  {
    id: "guest",
    role: "Guest",
    title: "Maya · Villa Sol",
    ask: "The AC isn’t working.",
    reply: "I matched Villa Sol and the AC policy, walked the reset, then opened maintenance and told Maya the vendor is on the way.",
    meta: "Task opened · Guest updated",
  },
  {
    id: "finance",
    role: "Finance",
    title: "Booking.com payout",
    ask: "Why is BK-1902 short?",
    reply: "Matched commission and refunds. The sample gap is $650. I flagged it instead of guessing.",
    meta: "Exception surfaced",
  },
  {
    id: "owner",
    role: "Owner",
    title: "Villa Sol · this month",
    ask: "How did my villa do?",
    reply: "Answered with this owner’s property only: accommodation, one early check-in, and a refund the policy allowed.",
    meta: "Scoped to their listing",
  },
  {
    id: "cleaner",
    role: "Cleaner",
    title: "Imani · next turnover",
    ask: "What’s my next job?",
    reply: "Loft 9 at 11:30. Access notes are on the task. The guest reported low towels, so restock is on the checklist.",
    meta: "Assignment only",
  },
] as const

const SUGGESTIONS = [
  "Which properties had maintenance issues this week?",
  "Offer late checkout tomorrow to every eligible guest.",
  "Which reservations haven’t been reconciled?",
]

export function GenieWorkspace() {
  const [app, setApp] = useState<(typeof APPS)[number]["id"]>("reservations")
  const [chatId, setChatId] = useState<string>("guest")
  const [draft, setDraft] = useState("")
  const [fresh, setFresh] = useState<{ ask: string; reply: string } | null>(null)
  const activeApp = APPS.find((item) => item.id === app) ?? APPS[0]
  const saved = CHATS.find((item) => item.id === chatId)
  const isNew = chatId === "new"

  function startNew() {
    setChatId("new")
    setFresh(null)
    setDraft("")
  }

  function ask(text: string) {
    const askText = text.trim()
    if (!askText) return
    setChatId("new")
    setFresh({
      ask: askText,
      reply: "In this sample I’d use your role, the open reservation, and the policies you already adopted — then do the work or show the exception. Nothing was sent from this website.",
    })
    setDraft("")
  }

  return (
    <div className="panel overflow-hidden rounded-[28px] shadow-[0_30px_120px_rgba(40,90,255,0.18)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-3 sm:px-4">
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5" role="tablist" aria-label="Fixed apps">
          {APPS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={app === item.id}
              onClick={() => setApp(item.id)}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-xs sm:text-[13px]",
                app === item.id ? "bg-white text-[#08111f]" : "text-mist hover:bg-white/8 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={startNew}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white hover:bg-white/8"
        >
          New chat
        </button>
        <SimBadge />
      </div>
      <p className="border-b border-white/10 px-4 py-2 text-xs text-[#c5d4ee]">{activeApp.note}</p>
      <div className="grid min-h-[420px] md:grid-cols-[168px_1fr]">
        <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-2 md:flex-col md:border-r md:border-b-0">
          {CHATS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setChatId(item.id)
                setFresh(null)
              }}
              className={cn(
                "min-w-36 rounded-xl px-3 py-2 text-left md:min-w-0",
                chatId === item.id ? "bg-white/10" : "hover:bg-white/5",
              )}
              aria-pressed={chatId === item.id}
            >
              <span className="block text-[10px] tracking-[0.14em] text-glow uppercase">{item.role}</span>
              <span className="mt-0.5 block truncate text-xs text-white">{item.title}</span>
            </button>
          ))}
        </div>
        <div className="flex min-h-[320px] flex-col p-4">
          {isNew && !fresh ? (
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-sm text-white">New chat</p>
              <p className="mt-1 text-sm text-mist">
                Any stakeholder can start one. Ask Genie to do something, or ask what happened.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => ask(item)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-[#d5def3] hover:border-white/25"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col justify-end gap-3">
              <p className="ml-auto max-w-[90%] rounded-2xl bg-white px-3 py-2 text-sm text-[#08111f]">
                {fresh?.ask ?? saved?.ask}
              </p>
              <div className="max-w-[95%] rounded-2xl bg-[#123049] px-3 py-3 text-sm leading-relaxed text-white">
                {fresh?.reply ?? saved?.reply}
                {saved && !fresh ? (
                  <span className="mt-3 block text-xs text-[#c7f3ff]">{saved.meta}</span>
                ) : null}
              </div>
            </div>
          )}
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              ask(draft)
            }}
          >
            <label className="sr-only" htmlFor="genie-ask">
              Ask Genie
            </label>
            <input
              id="genie-ask"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask Genie"
              className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-[#070b14] px-3 text-sm text-white outline-none placeholder:text-[#8ea0c3] focus:border-[#8ec8ff]"
            />
            <button type="submit" className="h-11 rounded-xl bg-white px-4 text-sm text-[#08111f]">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
