# TalkToGenie.ai

Marketing site for Genie, the autonomous operating layer for hospitality.

Genie is positioned above an operator’s existing stack. Operators connect the systems they already use, set policies and escalation boundaries, and Genie executes inside those boundaries: guest communication, tasks, upsells, reservation reconciliation, and a physical voice concierge.

Simulated product screens use a fictional portfolio, Harbor & Co. They are not customer results. Integration names are connection targets, not a claim that every connector is live.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run lint
npm run build
```

## Lead form

Meet Genie submissions are validated and appended to `data/leads.jsonl` (gitignored).

Meet Genie and sign-in requests are addressed to `support@superhost.management`. To actually send them, set these in `.env.local` on the host:

```bash
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM="TalkToGenie <onboarding@your-verified-domain>"
LEAD_INBOX=support@superhost.management
```

`RESEND_FROM` must be a sender Resend has verified. If the key or sender is missing, the Meet Genie lead is still stored and the visitor still sees a confirmation, but no email goes out. The form does not invent a calendar booking. Sign-in never sends the password.

## Pricing shown on the site

Monthly per listing, USD, one rate for the whole portfolio:

- Up to 20 listings: $25
- 21–100 listings: $20
- 101+ listings: $18
- 2,000+ listings: enterprise conversation

The scenario calculator is an illustration with its assumptions printed beside it. It is not a savings guarantee.
