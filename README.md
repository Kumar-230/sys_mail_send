# System Design & Security Digest

A small Vercel app that creates a twice-daily learning habit from engineering/security RSS feeds and sends a digest by email.

## What it covers

1. System design
2. Backend & APIs
3. Databases
4. Cloud
5. Cybersecurity

The initial source set includes ByteByteGo, Martin Fowler, AWS Architecture Blog, Cloudflare, Stripe Engineering, PostgreSQL, Google Security Blog, Microsoft Security Blog, OWASP and InfoQ Architecture.

The app:
- runs on Vercel Cron at **08:00 and 20:00 IST** (02:30 and 14:30 UTC);
- pulls recent RSS/Atom entries;
- scores for freshness/source quality;
- balances categories;
- remembers sent articles in Upstash Redis for 60 days;
- optionally uses OpenAI for concise summaries and “why it matters” context;
- sends the result through Resend.

## Deploy

### 1. Put the project in GitHub
Create a repo and push this directory.

### 2. Import into Vercel
Import the GitHub repository into Vercel and deploy it.

Vercel will register the two cron entries from `vercel.json` on the production deployment.

### 3. Add Upstash Redis
In Vercel Marketplace, install/connect **Upstash for Redis**. It will provide:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 4. Add Resend
Create a Resend account/domain and add:
- `RESEND_API_KEY`
- `DIGEST_FROM`
- `DIGEST_TO`

For a custom sender address, verify the sending domain in Resend.

### 5. Add the cron secret
Set:
- `CRON_SECRET`

Use a long random value. Vercel Cron sends it as a Bearer token to the cron endpoint.

### 6. Optional AI summaries
Set:
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (defaults to `gpt-5-mini`)

Without this, the digest still works but uses the RSS description instead of generated summaries.

## Test locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

`http://localhost:3000/api/test`

To test email delivery, call `/api/cron` with the configured Bearer secret.

## Customizing sources

Edit `lib/sources.ts`. Add any RSS/Atom feed with a category and weight.

## Recommended habit design

Don't make the digest huge. The current design intentionally caps it at 8 new articles and at most 2 per category. The email also gives you one concrete study action: pick one article and record:
- one architectural decision;
- one failure mode;
- one security implication.

That makes the system a learning loop rather than a newsletter.
