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

## Investor briefing

A ten-slide deck is at [/pitch](http://127.0.0.1:43123/pitch), with downloads at `public/pitch-deck.pptx` and `public/pitch-deck.pdf`. The same page includes the San Francisco outreach note. A plain-text copy is `public/outreach-email.txt`.

Rebuild the deck files with:

```bash
npm run pitch
```

## Lead form

Meet Genie submissions require a telephone number. They are validated and appended to `data/leads.jsonl` (gitignored).

On Vercel the project disk is read-only, so the row is only durable when it is emailed. Set the Amazon SES variables below on the Vercel project. A successful email is not blocked by the file save.

Every Meet Genie and sign-in submission is stored as a row in `data/submissions.json` (and appended to `data/leads.jsonl`). Both files are gitignored.

A copy is also emailed to `support@talktogenie.ai` through Amazon SES, from `support@mench.com`, when these are set in `.env.local`:

```bash
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-west-2
SES_FROM=support@mench.com
LEAD_INBOX=support@talktogenie.ai
```

The sender must be verified in that SES region. Sign-in never sends the password. If mail credentials are missing, the row is still stored and the visitor is told to write the inbox directly.

## Pricing shown on the site

Monthly per listing, USD, one rate for the whole portfolio:

- Up to 20 listings: $25
- 21–100 listings: $20
- 101+ listings: $18
- 2,000+ listings: enterprise conversation

The scenario calculator is an illustration with its assumptions printed beside it. It is not a savings guarantee.
