export type PitchSlide = {
  id: string
  variant: "cover" | "content" | "close"
  kicker: string
  title: string
  lede?: string
  bullets?: string[]
  note?: string
  image?: boolean
}

export const PITCH_SLIDES: PitchSlide[] = [
  {
    id: "cover",
    variant: "cover",
    kicker: "Investor briefing",
    title: "Hospitality, on autopilot.",
    lede: "TalkToGenie.ai is the AI operating layer that runs guest communication, task coordination, and reservation money for professional operators.",
    note: "Shervin Enayati · CEO & Co-founder",
  },
  {
    id: "problem",
    variant: "content",
    kicker: "The problem",
    title: "The stack is full. The work still sits with people.",
    bullets: [
      "Messages arrive on Airbnb, Booking.com, Vrbo, email, SMS, and WhatsApp, and someone still has to answer them.",
      "When the fix is physical, the request dies in a thread instead of becoming a task someone owns.",
      "Expected reservation revenue and the money that hits the bank are reconciled by hand.",
      "Ratings slip when guests, cleaners, owners, and operators are not in the same loop.",
    ],
  },
  {
    id: "outcomes",
    variant: "content",
    kicker: "The outcome",
    title: "Four results, when the tools are used together.",
    lede: "Genie is the direction those tools run in. Follow it, and the operation is built to produce:",
    bullets: [
      "Guests who feel looked after, not queued.",
      "Average ratings that rise as the loop gets tighter.",
      "Higher income from the listings the operator already has.",
      "Operational excellence across the portfolio, once the rest is in place.",
    ],
  },
  {
    id: "product",
    variant: "content",
    kicker: "The product",
    title: "Plug the operation into one AI brand.",
    lede: "Genie sits above the PMS, the channels, and the bank. It automates support, communication, and task management across every stakeholder.",
    bullets: [
      "End to end: the inbound message, the task, the charge, and the record.",
      "Human support sits over the automation.",
      "Operators stay confident the AI is controlled, tuned, and doing what they decided.",
    ],
    note: "Not a chatbot. Not a replacement PMS.",
  },
  {
    id: "inbox",
    variant: "content",
    kicker: "Ultra unified inbox",
    title: "Every touchpoint. One thread.",
    lede: "Every guest interaction is tracked, including sentiment. The workflows are built so the greater majority of inbound inquiries can be resolved without a person.",
    bullets: [
      "Airbnb, Booking.com, Vrbo, email, SMS, WhatsApp, and the lamp in the property.",
      "Sentiment sits on the thread.",
      "When Genie can finish it, it finishes it. When it cannot, it opens the task.",
    ],
    image: true,
  },
  {
    id: "tasks",
    variant: "content",
    kicker: "Task coordination",
    title: "Genie runs the physical world, too.",
    lede: "Guests, cleaners, homeowners, and operators share one coordinator.",
    bullets: [
      "If the inquiry needs someone on site, Genie creates the task and watches it.",
      "The guest inquiry stays open until the physical work is done.",
      "Maintenance and cleaning do the job. Genie keeps everyone else in the loop.",
      "The same standard covers a hotel room and a vacation home.",
    ],
  },
  {
    id: "finance",
    variant: "content",
    kicker: "Financial tracker",
    title: "Expected revenue, checked against the bank.",
    bullets: [
      "Every reservation has an expected amount.",
      "Bank transactions, through a connection such as Plaid, confirm the money arrived.",
      "Stripe card payouts are watched for later disputes, then flagged and chased.",
      "Finance sees what should have landed, what landed, and what is still open.",
    ],
  },
  {
    id: "analytics",
    variant: "content",
    kicker: "Intent analytics",
    title: "A thousand intents. One rating.",
    lede: "Genie counts how often each intent in a tree of more than 1,000 hospitality intents is triggered.",
    bullets: [
      "Which unit has access issues. Which unit has furniture complaints.",
      "Live translation in up to 50 languages, so each stakeholder reads the same chat in their own language.",
      "The scoreboard is average rating. As collaboration tightens, that number moves, and nightly rates can follow.",
    ],
  },
  {
    id: "control",
    variant: "content",
    kicker: "Human in the loop",
    title: "The operator decides the tree. Genie stays inside it.",
    lede: "Common hospitality patterns are predefined. Onboarding selects the template that fits. Every branch can be rewritten.",
    bullets: [
      "A new message is read for its intent, then matched to the tree.",
      "Tone, resolution, and action are the ones the operator already chose.",
      "If an intent is missing, our team expands the tree. That tree is the driving software.",
      "Human support stays available over the automated layer.",
    ],
  },
  {
    id: "close",
    variant: "close",
    kicker: "The company",
    title: "An AI brand operators can plug into.",
    lede: "For professional operators, from 20 to 2,000+ listings. $25, $20, or $18 per listing each month, by portfolio size.",
    bullets: [
      "Early operator, as reported by Superhost Management: 120 listings in Vancouver and Los Angeles. Response completion moved from 35% to over 85% in 35 days. Average rating moved from 4.55 to 4.83 in the first 100 days. 87% of suggested tasks were completed.",
    ],
    note: "Shervin Enayati · CEO & Co-founder\nsupport@talktogenie.ai · talktogenie.ai",
  },
]

export const OUTREACH_SUBJECT = "20 minutes on the future of hospitality AI"

export const OUTREACH_BODY = `Hi [Name],

I’m Shervin Enayati, CEO and co-founder of TalkToGenie.ai.

Genie is an AI operating layer for hospitality. Operators plug in the systems they already run, and Genie takes on guest communication, task coordination across cleaners, owners, and staff, and the money on each reservation. The intent tree is predefined and fully editable, so the AI stays inside decisions the operator would make. Human support sits over the automation.

We’re building in the same world as the teams in San Francisco. We have some challenges, and we’d love to get to know each other. Would you have 20 minutes to exchange ideas on hospitality, and to introduce me to the founding and technical people on your side?

If someone else on the team is the better person, I’m glad to write them instead.

Shervin Enayati
CEO & Co-founder, TalkToGenie.ai
support@talktogenie.ai
https://talktogenie.ai`
