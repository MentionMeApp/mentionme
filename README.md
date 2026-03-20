# MentionMe — GEO Platform

Get your brand mentioned inside 2.5 billion daily AI answers across ChatGPT, Gemini, Claude, Perplexity, Grok & Google AI Overviews.

## Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

1. Go to [github.com/new](https://github.com/new) and create a new repository called `mentionme`
2. Upload all these files to the repository (drag & drop works), or use the terminal:

```bash
cd mentionme
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mentionme.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"**
3. Import your `mentionme` repository
4. Click **Deploy** — no settings need to change
5. Wait ~60 seconds. You'll get a live URL like `mentionme-abc.vercel.app`

### Step 3: Connect your GoDaddy domain

**In Vercel:**
1. Go to your project → **Settings** → **Domains**
2. Type `mentionme.app` and click **Add**
3. Vercel will show you DNS records (an A record and a CNAME)

**In GoDaddy:**
1. Go to [dcc.godaddy.com](https://dcc.godaddy.com) → click your domain
2. Click **DNS** → **DNS Records**
3. **Option A (recommended):** Change nameservers to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. **Option B:** Add individual records:
   - Add **A Record**: Name = `@`, Value = `76.76.21.21`
   - Add **CNAME Record**: Name = `www`, Value = `cname.vercel-dns.com`
5. Wait 5-30 minutes for DNS to propagate
6. SSL certificate is automatic — Vercel handles it

### Step 4: Verify it works

- Visit `https://mentionme.app` — you should see the landing page
- Visit `https://mentionme.app/dashboard` — you should see the GEO dashboard
- The AI features (audit, generate, distribute) work through the Anthropic API

## Project Structure

```
mentionme/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.js            # Root layout with SEO metadata
│   ├── page.js              # Landing page (mentionme.app)
│   └── dashboard/
│       └── page.js          # GEO dashboard (mentionme.app/dashboard)
├── public/                  # Static assets (add logo, favicon here)
├── next.config.mjs          # Next.js config
├── package.json             # Dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Pages

| URL | What it is |
|-----|-----------|
| `/` | Landing page with hero, features, pricing, FAQ |
| `/dashboard` | Full GEO platform — audit, generate, distribute, campaigns |

## What works right now

- **Landing page** — Fully responsive, all sections, pricing toggle, FAQ accordion
- **GEO Audit** — Enter a brand, get real AI-powered visibility analysis
- **Content Generator** — Generate citation-optimized content packages
- **Distribution Planner** — Platform-adapted content for 8 authority sites
- **Campaign Tracker** — View and manage campaigns
- **Download** — Export content packages as JSON

## Next steps to make it a full SaaS

1. **Add authentication** — Supabase Auth (see backend files)
2. **Add billing** — Stripe subscriptions (see backend files)
3. **Add database** — Supabase PostgreSQL (see schema.sql)
4. **Move AI calls server-side** — API routes with your Anthropic key
5. **Add monitoring** — Weekly re-audits via Inngest cron jobs

The backend architecture files (schema.sql, routes.ts, services.ts, cron-jobs.ts) are ready for when you want to add these features.

## Tech Stack

- **Next.js 14** — React framework with App Router
- **Anthropic Claude API** — AI-powered content generation
- **Vercel** — Hosting (free tier is fine to start)
- **GoDaddy** — Domain registrar

## License

Private — All rights reserved.
