# DiscordStatusWebhookTranslator

## Prerequisites

- NodeJS v18+
- Discord Webhook URL
- Port on the server where Twitch sends the webhooks to
  - only matters for installation on your server; doesn't matter for deployments on Vercel
- Hostname or IP where Atlassian sends the webhooks to (`URL` environment variable or value in the `.env` file)

## Setup

### Hosted on your server

1. Clone this repo
2. Do `npm i` or `npm install` to install `dotenv`, `express` and `helmet`
3. Copy `example.env` to `.env` and fill out it's values
4. Run `node api/index.js` or `npm start` and let it run in the background (Twitch sends a verification request after creating the EventSub subscription)
5. Go to the status page and subscribe to the webhook
6. Atlassian Statuspage now sends a POST request on every Incident update

### Hosted on Vercel

1. Fork this repo
2. Import your Fork to Vercel
3. Create the environment variables from `example.env` on Vercel's settings page
4. Redeploy to make sure Vercel uses those environment variables
5. Go to the status page and subscribe to the webhook
6. Twitch now tries to send an verification request to your specified URL and if that succeeds will send you a POST request on each outgoing raid

### Webhook Documentation

https://support.atlassian.com/statuspage/docs/enable-webhook-notifications/
