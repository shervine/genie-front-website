"use client"

import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const APPS = [
  {
    id: "integrations",
    label: "Integrations",
    note: "The connected stack",
  },
  {
    id: "properties",
    label: "Properties",
    note: "Listings and house rules",
  },
  {
    id: "calendar",
    label: "Calendar",
    note: "Arrivals and turnovers",
  },
  {
    id: "reservations",
    label: "Reservations",
    note: "The stay and the money",
  },
] as const

const CHATS = [
  {
    id: "guest",
    role: "Guest",
    title: "Maya · Villa Sol",
    ask: "The AC isn’t working.",
    steps: ["Matched Villa Sol", "Applied the AC policy", "Opened maintenance"],
    reply: "As you wish. I walked Maya through the reset, then sent maintenance and told her the vendor is on the way.",
  },
  {
    id: "finance",
    role: "Finance",
    title: "Booking.com payout",
    ask: "Why is BK-1902 short?",
    steps: ["Opened the reservation", "Matched commission and refunds"],
    reply: "Granted. The sample gap is $650. I set it aside for you instead of guessing.",
  },
  {
    id: "owner",
    role: "Owner",
    title: "Villa Sol · this month",
    ask: "How did my villa do?",
    steps: ["Checked this owner’s permission", "Read only Villa Sol"],
    reply: "Your wish, limited to your villa: accommodation, one early check-in, and a refund your policy allowed.",
  },
  {
    id: "cleaner",
    role: "Cleaner",
    title: "Imani · next turnover",
    ask: "What’s my next job?",
    steps: ["Looked up Imani’s assignments"],
    reply: "Loft 9 at 11:30. The access notes are on the task, and towels are on the checklist.",
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
      reply: "As you wish. I would take this to the right stay, follow the rules you set, and either finish it or bring you the exception. Nothing left this page.",
    })
    setDraft("")
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e13] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" role="tablist" aria-label="Fixed apps">
          {APPS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={app === item.id}
              onClick={() => setApp(item.id)}
              className={cn(
                "shrink-0 rounded-md px-2 py-1 text-[13px]",
                app === item.id ? "text-white" : "text-[#8b95a8] hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={startNew} className="shrink-0 text-[13px] text-[#c5cedf] hover:text-white">
          New chat
        </button>
      </div>

      <div className="grid md:grid-cols-[148px_1fr]">
        <div className="flex gap-1 overflow-x-auto border-t border-white/8 px-2 py-2 md:flex-col md:border-t-0 md:border-r md:px-2 md:py-3">
          {CHATS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setChatId(item.id)
                setFresh(null)
              }}
              className={cn(
                "min-w-32 rounded-lg px-2.5 py-2 text-left md:min-w-0",
                chatId === item.id ? "bg-white/8" : "hover:bg-white/5",
              )}
              aria-pressed={chatId === item.id}
            >
              <span className="block truncate text-[13px] text-[#e8edf7]">{item.title}</span>
              <span className="block truncate text-[11px] text-[#8b95a8]">{item.role}</span>
            </button>
          ))}
        </div>

        <div className="flex min-h-[430px] flex-col border-t border-white/8 md:border-t-0">
          <div className="flex flex-1 flex-col justify-end px-4 py-6 sm:px-8">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
              {isNew && !fresh ? (
                <div>
                  <p className="font-display text-3xl font-bold text-white">What is your wish?</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#9aa6bd]">
                    You are the master of this chat. Ask me to do the work, or ask me what happened.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    {SUGGESTIONS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => ask(item)}
                        className="rounded-2xl px-1 py-1.5 text-left text-sm text-[#d5def3] hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="ml-auto max-w-[85%] rounded-3xl bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white">
                    {fresh?.ask ?? saved?.ask}
                  </p>
                  <div>
                    <p className="text-[13px] text-[#9ec9ff]">Genie · {activeApp.note}</p>
                    {saved && !fresh ? (
                      <ul className="mt-2 space-y-1">
                        {saved.steps.map((step) => (
                          <li key={step} className="text-xs text-[#8b95a8]">
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs text-[#8b95a8]">Read the wish · Checked your rules</p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-[#f4f7ff]">{fresh?.reply ?? saved?.reply}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <form
            className="px-4 pb-4 sm:px-8"
            onSubmit={(event) => {
              event.preventDefault()
              ask(draft)
            }}
          >
            <div className="mx-auto flex w-full max-w-lg items-end gap-2 rounded-3xl border border-white/10 bg-[#141820] px-4 py-2.5">
              <label className="sr-only" htmlFor="genie-ask">
                Message Genie
              </label>
              <textarea
                id="genie-ask"
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    ask(draft)
                  }
                }}
                placeholder="Message Genie"
                className="max-h-28 min-h-7 w-full resize-none bg-transparent py-1 text-sm text-white outline-none placeholder:text-[#8b95a8]"
              />
              <button
                type="submit"
                aria-label="Send"
                className="mb-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#08111f]"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
