export const NAV = [
  { href: "/product", label: "Product" },
  { href: "/#features", label: "Features" },
  { href: "/how-it-works", label: "Guarantee" },
  { href: "/apps", label: "Apps" },
  { href: "/lamp", label: "Lamp" },
  { href: "/pricing", label: "Pricing" },
] as const

export const TRUST_CATEGORIES = [
  "PMS",
  "Channel managers",
  "Airbnb",
  "Booking.com",
  "Vrbo",
  "Email",
  "SMS",
  "WhatsApp",
  "Payments",
  "Payouts",
  "Smart locks",
  "Tasks",
  "Cleaning",
  "Maintenance",
  "Accounting",
  "Voice",
]

export const FRAGMENTS = [
  "PMS",
  "Airbnb",
  "Booking.com",
  "Vrbo",
  "Email",
  "SMS",
  "Payments",
  "Locks",
  "Accounting",
  "Tasks",
  "Cleaners",
  "Owners",
]

export const BEFORE = [
  "20+ systems",
  "Thousands of messages",
  "Manual task creation",
  "Constant human monitoring",
  "Missed upsells",
  "Disconnected departments",
  "Manual reservation reconciliation",
  "Know-how trapped in people’s heads",
  "Managers jumping between dashboards",
]

export const AFTER = [
  "One intelligence layer",
  "One policy system",
  "One operational memory",
  "One conversational interface",
  "Automated execution across the stack",
]

export const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Connect your PMS or channel manager and the operational systems around it. Genie sits above the stack you already pay for.",
  },
  {
    n: "02",
    title: "Adopt the policy",
    body: "Every company starts from our standard policy, written by people across hundreds of hospitality patterns. During onboarding, and anytime after, you rewrite the branches so Genie behaves the way your company would.",
  },
  {
    n: "03",
    title: "Genie acts only on a match",
    body: "Genie detects the patterns you already defined. If a message matches one, it follows that policy. If it matches none, Genie does not act. No match, no abrakadabra.",
  },
]

export const MODES = [
  {
    id: "observe",
    label: "Observe",
    body: "Genie watches the operation and learns the patterns. It does not take actions.",
  },
  {
    id: "copilot",
    label: "Copilot",
    body: "Genie drafts the message, the task, or the charge. A person approves it.",
  },
  {
    id: "autopilot",
    label: "Autopilot",
    body: "Genie executes inside the policies you configured. Exceptions still come to a human.",
  },
] as const

export const SCOPES = ["Company", "Department", "Workflow", "Policy"] as const

export const SIM_EVENTS = [
  {
    id: "guest",
    kind: "Guest message",
    source: "Airbnb · Villa Sol",
    title: "The AC isn’t working.",
    steps: [
      "Matched the guest, reservation, and property",
      "Retrieved the AC troubleshooting policy",
      "Walked the guest through the approved steps",
      "Issue remained, so a maintenance task was opened",
      "Vendor notified, guest updated, task watched",
    ],
    outcome: "Resolved inside policy. A refund was not invented.",
  },
  {
    id: "payment",
    kind: "Payment failure",
    source: "Card · Loft 9",
    title: "Early check-in charge declined.",
    steps: [
      "Held the reservation change",
      "Told the guest the charge did not clear",
      "Offered the same approved price again",
      "Left the calendar untouched until payment succeeds",
    ],
    outcome: "No silent failure. Finance can see the attempt.",
  },
  {
    id: "maintenance",
    kind: "Maintenance request",
    source: "Web chat · Pier House",
    title: "Hot tub will not heat.",
    steps: [
      "Pulled the property guide and open tasks",
      "Sent the approved restart steps",
      "Guest confirmed it was still cold",
      "Routed a priority task to maintenance",
    ],
    outcome: "Escalation followed the property’s rule, not a generic script.",
  },
  {
    id: "late",
    kind: "Late checkout",
    source: "SMS · Unit 214",
    title: "Can we leave at 1?",
    steps: [
      "Checked the next arrival",
      "Confirmed the unit can stay open",
      "Offered the policy price",
      "On yes: collect payment, update the stay, tell the cleaner",
    ],
    outcome: "A service request became tracked revenue.",
  },
  {
    id: "cleaner",
    kind: "Cleaner issue",
    source: "Staff · Cottage 12",
    title: "The sofa is stained.",
    steps: [
      "Opened the damage workflow",
      "Requested photos before anyone guessed a cost",
      "Owner notice is on for furniture damage, so it sent",
      "Maintenance task created with the context attached",
    ],
    outcome: "The report did not die in a group chat.",
  },
  {
    id: "owner",
    kind: "Owner question",
    source: "Owner · Villa Sol",
    title: "Why was last month softer?",
    steps: [
      "Checked this owner’s permission scope",
      "Answered with their property only",
      "Pointed at occupancy, a refund cluster, and two maintenance nights",
      "Left other owners’ numbers out of the reply",
    ],
    outcome: "Same intelligence layer. Narrower view.",
  },
]

export const MODULES = [
  {
    id: "communication",
    label: "Unified inbox",
    kicker: "Every channel lands in one thread, with sentiment on the message. The greater share of these inquiries is meant to finish without a person.",
    lines: [
      { from: "Guest", text: "The AC isn’t working." },
      {
        from: "Genie",
        text: "I found Villa Sol and your AC policy. I’ll walk you through the reset. If it’s still down, I’ll send maintenance.",
      },
      {
        from: "System",
        text: "Troubleshooting failed · Task opened · Vendor notified · Guest updated · Escalation clock started",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    kicker: "Events become the next piece of work, without a manager translating them.",
    lines: [
      { from: "System", text: "Checkout completed at Loft 9." },
      {
        from: "Genie",
        text: "Turnover policy applies. Cleaning starts now. Imani is assigned. Owners are not pinged for a routine clean.",
      },
      {
        from: "System",
        text: "Cleaner assigned · Access notes sent · Checklist attached",
      },
    ],
  },
  {
    id: "tasks",
    label: "Task coordination",
    kicker: "When the fix has to happen in the physical world, Genie opens a task, assigns it, and keeps the guest inquiry alive until the work is done.",
    lines: [
      { from: "Cleaner", text: "The sofa at Cottage 12 is stained." },
      {
        from: "Genie",
        text: "Damage workflow started. I asked for photos. Furniture damage notifies the owner, so that note is sent.",
      },
      {
        from: "System",
        text: "Photos requested · Owner notified · Maintenance task open",
      },
    ],
  },
  {
    id: "upsells",
    label: "Upsells",
    kicker: "Every guest interaction can become an approved offer.",
    lines: [
      { from: "Guest", text: "Can we check in early?" },
      {
        from: "Genie",
        text: "Absolutely. The property is available from 1 PM. Early check-in is available for $45. Would you like me to add it?",
      },
      { from: "Guest", text: "Yes." },
      {
        from: "System",
        text: "Payment collected · Reservation updated · Team notified · Revenue tracked",
      },
    ],
  },
  {
    id: "reconciliation",
    label: "Financial tracker",
    kicker: "Expected reservation revenue is checked against bank transactions and card payouts, including a Stripe dispute that shows up later.",
    lines: [
      { from: "Finance", text: "Which reservations haven’t been fully reconciled?" },
      {
        from: "Genie",
        text: "In the Harbor & Co. sample, 14 match and 3 do not. The largest gap is Airbnb stay AB-2291, $370 short.",
      },
      {
        from: "System",
        text: "Expected $2,480 · Received $2,110 · Exception queued",
      },
    ],
  },
  {
    id: "analytics",
    label: "Intent analytics",
    kicker: "More than a thousand intents. The report says which unit had access issues and which had furniture complaints.",
    lines: [
      { from: "Operator", text: "Why did Property 214 receive three bad reviews?" },
      {
        from: "Genie",
        text: "In the sample, all three mention a late cleaner and a slow first reply. Two turns belonged to the same cleaner. That week missed the response target.",
      },
      {
        from: "System",
        text: "Pattern isolated · Portfolio → property → reservation → conversation",
      },
    ],
  },
  {
    id: "concierge",
    label: "Concierge",
    kicker: "The same policies, available out loud in the property.",
    lines: [
      { from: "Guest", text: "Hey Genie, how do I turn on the hot tub?" },
      {
        from: "Genie",
        text: "The breaker is in the utility closet, left of the door. Heat takes about twenty minutes. If it stays cold, say send maintenance.",
      },
      { from: "System", text: "Property guide used · No task opened" },
    ],
  },
] as const

export const PROMPTS = [
  {
    id: "yesterday",
    prompt: "How much did we make yesterday?",
    role: "Regional manager",
    summary: "Sample net guest receipts were $48,260 across 37 arrivals.",
    rows: [
      ["Accommodation", "$41,200"],
      ["Cleaning fees", "$4,860"],
      ["Approved upsells", "$2,200"],
      ["Refunds already excluded", "$1,140"],
    ],
    note: "Sum of the three receipt lines is $48,260. Refunds are shown so the day is explainable, not double-counted.",
  },
  {
    id: "attention",
    prompt: "Which guests need attention?",
    role: "Operator",
    summary: "Three stays are outside a calm path in this sample.",
    rows: [
      ["Maya Chen · Villa Sol", "AC open 42 min · vendor en route"],
      ["Noah Patel · Unit 214", "Waiting 18 min · reply drafting in policy"],
      ["Alvarez party · Loft 9", "Early check-in waiting on payment"],
    ],
    note: "Everyone else in the sample is inside the response target.",
  },
  {
    id: "reconcile",
    prompt: "What hasn’t been reconciled?",
    role: "Finance",
    summary: "14 sample reservations match. 3 do not.",
    rows: [
      ["AB-2291 · Airbnb", "Expected $2,480 · received $2,110 · gap $370"],
      ["BK-1888 · Booking.com", "Tax line of $96 not in the payout"],
      ["VR-0441 · Vrbo", "Deposit held, not yet released"],
    ],
    note: "Genie is matching reservation activity, not closing your books.",
  },
  {
    id: "maintenance",
    prompt: "Which properties have maintenance issues?",
    role: "Maintenance lead",
    summary: "Three open issues in the sample portfolio.",
    rows: [
      ["Villa Sol", "AC · vendor window 4–6"],
      ["Cottage 12", "Blinds · open 2 days · escalation due today"],
      ["Pier House", "Hot tub heater · waiting on a part"],
    ],
    note: "Priorities come from the operator’s escalation rules.",
  },
  {
    id: "checkout",
    prompt: "Offer late checkout tomorrow.",
    role: "Manager",
    summary: "6 stays are eligible at the sample policy price of $45. 2 are blocked by a same-day turnover.",
    rows: [
      ["Eligible", "6 stays"],
      ["Excluded", "2 same-day turnovers"],
      ["Price", "$45, already in policy"],
      ["Mode in this sample", "Copilot until you confirm"],
    ],
    note: "This website cannot send those offers. In the product, Autopilot would send them only if that workflow is set to execute.",
    action: "Simulate send",
  },
  {
    id: "payout",
    prompt: "Why was our Booking.com payout $3,200 lower than expected?",
    role: "Finance",
    summary: "The sample gap splits into three explainable pieces. $1,840 + $710 + $650 = $3,200.",
    rows: [
      ["Free-window cancellations", "$1,840"],
      ["Commission restatement", "$710"],
      ["Payout missing for BK-1902", "$650"],
    ],
    note: "A lower payout is investigated, not shrugged at.",
  },
]

export const STAKEHOLDERS = [
  {
    id: "guests",
    label: "Guests",
    line: "Ask, solve, upgrade, request.",
    ask: "Can I check out at noon?",
    answer:
      "The next guest arrives at 4. Late checkout is $45 under this property’s policy. I can add it if you want.",
    sees: "Their stay, the property guide, and offers you have allowed.",
  },
  {
    id: "owners",
    label: "Homeowners",
    line: "Performance, without the whole company attached.",
    ask: "How did my villa do this month?",
    answer:
      "Villa Sol netted the sample month’s accommodation, one $45 early check-in, and a $80 AC refund that policy allowed.",
    sees: "Only their properties, and only the fields you expose.",
  },
  {
    id: "cleaners",
    label: "Cleaners",
    line: "Assignments, access, and a place to report.",
    ask: "What’s my next turnover?",
    answer:
      "Loft 9 at 11:30. Lock code is in the task. The guest reported low towels — restock is on the checklist.",
    sees: "Their jobs and property notes. Not payouts or owner statements.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    line: "The issue, the context, and the priority.",
    ask: "Send me the AC issue at Villa Sol.",
    answer:
      "Guest tried the approved reset. Still down. Reservation is in-house through Sunday. Policy marks occupied-AC as same-day.",
    sees: "Work orders and property context. Not the guest’s payment method.",
  },
  {
    id: "managers",
    label: "Managers",
    line: "Exceptions, approvals, SLAs, quality.",
    ask: "What needs me?",
    answer:
      "One refund over the $100 line, one cleaner past the complaint threshold, and six late checkouts waiting because that workflow is still on Copilot.",
    sees: "The exception queue for their scope. Routine work stays off their screen.",
  },
]

export const INTEGRATIONS = [
  {
    id: "pms",
    short: "PMS",
    category: "PMS / channel managers",
    ring: "inner",
    detail:
      "Reservations, listings, and availability stay in the system you already run. Genie is designed to read that system of record, not replace it.",
    examples: ["Your current PMS", "Your channel manager"],
    access: "Operators and managers. Owners see only their own listings.",
  },
  {
    id: "channels",
    short: "Channels",
    category: "Booking channels",
    ring: "outer",
    detail:
      "Guest conversations and stay events from the channels you sell on, plus direct bookings.",
    examples: ["Airbnb", "Booking.com", "Vrbo", "Direct"],
    access: "Operators and managers. Guests reach Genie through the channel. They do not open the connector.",
  },
  {
    id: "payments",
    short: "Payments",
    category: "Payments",
    ring: "inner",
    detail:
      "Collect an approved upsell or see whether a charge succeeded. Stripe is an example of a processor a connector can target where it is supported.",
    examples: ["Stripe", "The processor you use"],
    access: "Finance, managers, and operators collecting an approved charge. Guests pay. They do not see the processor.",
  },
  {
    id: "banking",
    short: "Banking",
    category: "Banking / financial data",
    ring: "outer",
    detail:
      "Compare what a reservation should have paid with what arrived. Plaid is an example of a financial-data source where a connection is supported.",
    examples: ["Plaid", "Payout reports"],
    access: "Finance and managers.",
  },
  {
    id: "email",
    short: "Email",
    category: "Email",
    ring: "outer",
    detail: "Guest and owner email in the same operational context as the channel messages.",
    examples: ["Guest email", "Owner email"],
    access: "Operators and managers. Owners see threads about their properties. Guests see only their own thread.",
  },
  {
    id: "sms",
    short: "SMS",
    category: "SMS",
    ring: "outer",
    detail: "Text messages treated as part of the stay, not a separate inbox to babysit.",
    examples: ["Guest SMS", "Staff SMS"],
    access: "Operators and managers. Cleaners and maintenance receive assignment texts. Guests see only their own thread.",
  },
  {
    id: "whatsapp",
    short: "WhatsApp",
    category: "WhatsApp",
    ring: "outer",
    detail: "WhatsApp conversations, with the same policies as every other channel.",
    examples: ["Guest WhatsApp"],
    access: "Operators and managers. Guests see only their own conversation.",
  },
  {
    id: "locks",
    short: "Locks",
    category: "Smart locks",
    ring: "inner",
    detail: "Access codes and lock events can inform arrival, departure, and vendor entry.",
    examples: ["The locks already on the doors"],
    access: "Operators and managers. Cleaners and maintenance get the code for the job in front of them. Guests receive only their own code.",
  },
  {
    id: "tasks",
    short: "Tasks",
    category: "Task management",
    ring: "inner",
    detail: "Create, assign, and chase work in the task system your team already opens.",
    examples: ["Your task tool"],
    access: "Operators, managers, cleaners, and maintenance. Each person sees the work assigned to them.",
  },
  {
    id: "accounting",
    short: "Accounting",
    category: "Accounting",
    ring: "inner",
    detail:
      "Genie reconciles reservation and guest-transaction activity. It is not a replacement for the general ledger.",
    examples: ["Your accounting system"],
    access: "Finance and managers.",
  },
  {
    id: "guest",
    short: "Guest exp.",
    category: "Guest experience",
    ring: "outer",
    detail: "Guides, arrival info, and service requests, shared with the operational brain instead of living in a PDF.",
    examples: ["Property guides", "Arrival instructions"],
    access: "Guests for their stay. Operators and managers for the portfolio.",
  },
  {
    id: "pricing",
    short: "Pricing",
    category: "Pricing",
    ring: "outer",
    detail: "Approved add-on prices and stay rules. Genie should quote what you configured.",
    examples: ["Your rate and fee rules"],
    access: "Operators and managers set the rules. Finance can read them. Guests see an approved price, not the rule set.",
  },
  {
    id: "maintenance",
    short: "Maintenance",
    category: "Maintenance",
    ring: "outer",
    detail: "Issues arrive with property context, priority, and the escalation path you wrote.",
    examples: ["In-house techs", "Vendors"],
    access: "Maintenance, operators, and managers.",
  },
  {
    id: "cleaning",
    short: "Cleaning",
    category: "Cleaning",
    ring: "outer",
    detail: "Turnovers, inspections, and quality complaints routed to the right cleaner.",
    examples: ["Cleaning teams", "Inspection notes"],
    access: "Cleaners, operators, and managers.",
  },
  {
    id: "voice",
    short: "Voice",
    category: "Voice",
    ring: "inner",
    detail: "The white Genie Lamp, with a Nest Mini inside, and other voice endpoints you choose to connect, using the same policies.",
    examples: ["Genie Lamp", "Google Nest Mini"],
    access: "Guests in the room. Operators and managers.",
  },
  {
    id: "api",
    short: "APIs",
    category: "APIs / webhooks",
    ring: "outer",
    detail:
      "Where a packaged connector is not the right path, Genie is designed to take events through APIs and webhooks.",
    examples: ["Your internal tools"],
    access: "Operators and managers.",
  },
] as const

export const DIFFERENTIATORS = [
  {
    n: "01",
    title: "PMS-agnostic",
    body: "Genie works above the stack you already run. It does not ask you to migrate into a closed ecosystem to get automation.",
  },
  {
    n: "02",
    title: "An intent tree you can rewrite",
    body: "Onboarding starts from a template of hospitality patterns. You decide the tone, the resolution, and what Genie must ask a person. Human support sits over that tree.",
  },
  {
    n: "03",
    title: "Execution, not just answers",
    body: "A reply is the smallest outcome. The point is the task, the charge, the update, the escalation, and the record.",
  },
  {
    n: "04",
    title: "Cross-department intelligence",
    body: "Communication, operations, tasks, upsells, analytics, and reservation reconciliation share one context.",
  },
  {
    n: "05",
    title: "Multi-stakeholder intelligence",
    body: "Guests, staff, cleaners, owners, managers, and finance talk to the same layer. Permissions change the view.",
  },
  {
    n: "06",
    title: "Conversational operations",
    body: "Don’t search through dashboards. Ask Genie, in the scope of your role.",
  },
  {
    n: "07",
    title: "Physical and digital concierge",
    body: "The Genie Lamp puts the same operating layer in the room. Guests talk. They don’t download another app.",
  },
  {
    n: "08",
    title: "Exception-based management",
    body: "The aim is not faster clicking. Routine work runs. People keep exceptions, relationships, and judgment.",
  },
]

export const LAMP_LINES = [
  {
    ask: "Hey Genie, what’s the Wi-Fi password?",
    reply: "Network is Harbor-Guest. The password is on the card beside me — I can read it if you want.",
  },
  {
    ask: "Hey Genie, where can I park?",
    reply: "Spot 12, behind the building. The gate code is the last four of your phone number.",
  },
  {
    ask: "Hey Genie, can I check out at noon?",
    reply: "The next arrival is at 4. Late checkout is $45 on this property. I can add it.",
  },
  {
    ask: "Hey Genie, how do I turn on the hot tub?",
    reply: "Utility closet, left of the door, breaker labeled spa. Give it about twenty minutes.",
  },
  {
    ask: "Hey Genie, send maintenance.",
    reply: "I’m opening a task for Pier House and marking it occupied. Someone will follow the on-site escalation rule.",
  },
  {
    ask: "Hey Genie, recommend a great restaurant nearby.",
    reply: "If you want a ten-minute walk, the sample guide points to Salt & Rye. I can text the address.",
  },
]

export const ANALYTICS_QUESTIONS = [
  {
    id: "ratings",
    q: "Is the average rating moving?",
    a: "Average rating is the scoreboard. In this sample the portfolio moved from 4.61 to 4.74 as replies, task close rate, and cleaner notes tightened. The other tools exist to move this number, and nightly rates can follow.",
    points: [
      ["Portfolio average", "4.74"],
      ["90 days earlier", "4.61"],
      ["Units above 4.8", "19"],
      ["Units under 4.5", "3"],
    ],
  },
  {
    id: "intents",
    q: "Which intents fired most?",
    a: "In this sample, access issues clustered at Unit 214 and furniture complaints clustered at Cottage 12. The tree holds more than a thousand intents. Each trigger is counted so the report is specific, not a vague mood score.",
    points: [
      ["Access issues · Unit 214", "22"],
      ["Furniture · Cottage 12", "9"],
      ["Late checkout offers", "41"],
      ["Intents in the tree", "1,000+"],
    ],
  },
  {
    id: "refunds",
    q: "Why did refunds increase 14% this month?",
    a: "In this illustrative month, the increase sits in two places: six AC complaints at Harbor Lofts, and a cleaning-quality cluster on one route. Policy auto-approved 11 refunds under $100. Four larger ones waited for a manager.",
    points: [
      ["AC cluster", "6 stays"],
      ["Cleaning cluster", "1 route"],
      ["Auto-approved", "11 under $100"],
      ["Waiting", "4 above the line"],
    ],
  },
  {
    id: "response",
    q: "Which properties have the slowest first response?",
    a: "The sample’s slow tail is Unit 214 and Cottage 12. Both had issues that left the channel inbox and waited on a person who was in another tool.",
    points: [
      ["Unit 214", "18 min median"],
      ["Cottage 12", "16 min median"],
      ["Portfolio target", "5 min"],
      ["Inside target", "The other 28"],
    ],
  },
  {
    id: "repeat",
    q: "Where does maintenance repeat?",
    a: "Pier House has three hot-tub tickets in the sample month. Genie would group them as one asset problem instead of three guest moods.",
    points: [
      ["Pier House spa", "3 tickets"],
      ["Villa Sol AC", "2 tickets"],
      ["Everything else", "Single incidents"],
    ],
  },
  {
    id: "upsell",
    q: "Which upsell converts most often?",
    a: "In the sample, early check-in converts more often than late checkout, because the unit is usually empty and the offer happens before arrival.",
    points: [
      ["Early check-in", "Highest conversion"],
      ["Late checkout", "Second"],
      ["Pet fee", "Rare, high value"],
    ],
  },
]

export const RECON_LINES = [
  ["Accommodation", "$1,840"],
  ["Cleaning fee", "$185"],
  ["Taxes", "$162"],
  ["OTA commission", "−$276"],
  ["Refund", "$0"],
  ["Upsell · late checkout", "$45"],
  ["Expected payout", "$1,956"],
  ["Actual payout", "$1,956"],
]

export const UPSELL_STEPS = [
  "Payment collected",
  "Reservation updated",
  "Team notified",
  "Revenue tracked",
]

export const CONTRAST = [
  ["More dashboards", "One conversation"],
  ["Rules you still babysit", "Policies Genie executes"],
  ["Another inbox", "Resolution across channels"],
  ["Replace the stack", "Keep the stack"],
  ["Answers", "Actions"],
  ["One department’s tool", "One context for the company"],
]
