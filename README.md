# TalkToGenie.ai

Marketing site for Genie, the autonomous operating layer for hospitality.

Genie is positioned above an operator’s existing stack. Operators connect the systems they already use, set policies and escalation boundaries, and Genie executes inside those boundaries: guest communication, tasks, upsells, reservation reconciliation, and a physical voice concierge.

Simulated product screens use a fictional portfolio, Harbor & Co. They are not customer results. App names are connection targets, not a claim that every connector is live.

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

The ten-slide deck is unlisted at `/investors`. It is not linked from the navigation, footer, or sitemap. Downloads are `public/pitch-deck.pptx` and `public/pitch-deck.pdf`. The same page includes the San Francisco outreach note. A plain-text copy is `public/outreach-email.txt`.

Rebuild the deck files with:

```bash
npm run pitch
```

## Lead form

Request Demo submissions require a telephone number. They are not written to a local database. Each request is emailed to `support@talktogenie.ai` through Amazon SES, from `support@mench.com`, when these are set in `.env.local`:

```bash
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-west-2
SES_FROM=support@mench.com
LEAD_INBOX=support@talktogenie.ai
```

The sender must be verified in that SES region. The message includes every field from the form. If mail credentials are missing, the visitor is told to write the inbox directly.

## Pricing shown on the site

Monthly per listing, USD, one rate for the whole portfolio:

- Up to 20 listings: $25
- 21–100 listings: $21
- 101+ listings: $18
- 2,000+ listings: enterprise conversation
- Genie Lamp (optional add-on): $85 per lamp, including the 3D-printed frame and a Google Nest Mini preprogrammed for “Hey Genie,” for any rental unit where guests should talk to Genie out loud

The scenario calculator is an illustration with its assumptions printed beside it. It is not a savings guarantee.
