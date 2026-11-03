# WedConnect Production Deployment Guide

This guide provides step-by-step instructions for deploying **WedConnect** to production on **Vercel** and **Supabase**, with **Resend** transactional email and **Mapbox** geolocation integration.

---

## 1. Architecture & Infrastructure Overview

- **Hosting Platform**: Vercel (Edge Network + Serverless Node.js 20/22 runtime)
- **Database & Identity**: Supabase Cloud (PostgreSQL 15 + Supabase Auth + Supabase Storage + Realtime WebSockets)
- **Transactional Mailer**: Resend (HTTP API)
- **Maps & Discovery**: Mapbox GL (CDN + Vector Tiles)

---

## 2. Supabase Production Database Setup

### Step 2.1: Create Production Project
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**, select your organization, specify a project name (e.g. `wedconnect-prod`), set a secure database password, and select your nearest geographic region (e.g. `ap-south-1` for Mumbai / India or `us-east-1`).
3. Note your **Project URL**, **anon key**, and **service_role key** from **Settings > API**.

### Step 2.2: Apply Schema Migration
1. In the Supabase Dashboard, navigate to the **SQL Editor**.
2. Create a new query and paste the complete contents of:
   ```
   supabase/migrations/20261103000000_wedconnect_initial_schema.sql
   ```
3. Click **Run**.
4. Confirm that all 18 tables, constraints, foreign keys, triggers, and Row Level Security (RLS) policies are created successfully in the **Table Editor**.

### Step 2.3: Configure Storage Buckets
In **Storage > Buckets**, ensure the following buckets are created:
1. `portfolios` (Public: **Yes**) — For vendor high-resolution photography and cinematic previews.
2. `avatars` (Public: **Yes**) — For customer and vendor profile photos.
3. `chat-attachments` (Public: **No**, Authenticated: **Yes**) — For contracts, floorplans, and private images.
4. `audio-notes` (Public: **Yes**) — For voice memo recordings sent in chat.

Set the maximum file upload limit to **25 MB** and allowed MIME types to `image/*`, `application/pdf`, and `audio/*`.

### Step 2.4: Enable Realtime Publications
1. Navigate to **Database > Publications**.
2. Select `supabase_realtime` and ensure the following tables are toggled **ON**:
   - `chat_messages`
   - `chat_conversations`
   - `notifications`
   - `bookings`

---

## 3. Resend Production Setup

1. Log in to [Resend](https://resend.com) and create an API Key with **Sending access** (e.g., `re_live_xxxxxxxxxxxx`).
2. Add and verify your custom sending domain (e.g., `wedconnect.app`):
   - **DKIM**: Add the `resend._domainkey` CNAME record in your DNS provider (Cloudflare, Route53, Namecheap).
   - **SPF**: Add the TXT record `v=spf1 include:amazonses.com ~all`.
   - **DMARC**: Add the TXT record `v=DMARC1; p=none; rua=mailto:dmarc-reports@wedconnect.app`.
3. Set your production sender address:
   ```env
   RESEND_FROM_EMAIL="WedConnect Concierge <concierge@wedconnect.app>"
   ```

---

## 4. Mapbox GL Setup

1. Log in to [Mapbox Account](https://account.mapbox.com).
2. Create an **Access Token** with URL restrictions matching your production domain:
   - `https://wedconnect.app`
   - `https://*.vercel.app`
3. Copy the token starting with `pk.eyJ...` for `NEXT_PUBLIC_MAPBOX_TOKEN`.

---

## 5. Vercel Deployment

### Step 5.1: Connect Git Repository
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New... > Project** and import your Git repository (`wedconnect`).
3. Set Project Settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 5.2: Configure Environment Variables in Vercel
Add the following variables in **Project Settings > Environment Variables** for **Production** and **Preview**:

| Variable Name | Example Value | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://wedconnect.app` | Base canonical application domain |
| `NODE_ENV` | `production` | Production environment flag |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase Cloud project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase public anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` | Supabase administrative secret key |
| `RESEND_API_KEY` | `re_live_xxxxxxxx` | Production Resend API key |
| `RESEND_FROM_EMAIL` | `WedConnect <concierge@wedconnect.app>` | Verified sender address |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | `pk.eyJ1...` | Restricted Mapbox public access token |

### Step 5.3: Deploy & Verify
1. Click **Deploy**. Vercel will clone the master branch, execute `npm install`, compile all 57 static and dynamic pages with zero errors, and output production edge bundles.
2. In **Settings > Domains**, attach your custom apex domain (e.g. `wedconnect.app`) and subdomain (e.g. `www.wedconnect.app`).
3. Vercel will automatically provision an SSL certificate via Let's Encrypt.

---

## 6. Post-Deployment Verification Checklist

Execute the following smoke tests on production to confirm total health:

- [ ] **Public Landing Page**: Visit `https://wedconnect.app/` — verify luxury hero visuals, categories, and fast First Contentful Paint (<0.8s).
- [ ] **Authentication**: Register a new Couple account and a new Vendor account. Verify email verification flow and session cookies.
- [ ] **Customer Flow**: Create a celebration event in `/customer/events/new`. Confirm recommendations load in `/customer/matched-vendors`.
- [ ] **Vendor Studio**: Open `/vendor/dashboard` with vendor credentials. Create a package and update calendar availability in `/vendor/availability`.
- [ ] **Escrow Checkout**: Open a quotation proposal and verify the `/checkout/[quotationId]` financial breakdown (5% platform commission + 18% GST + 3 milestone tranches).
- [ ] **Real-Time WebSockets**: Send a message from `/customer/chat` to `/vendor/chat` — confirm instant message appearance and unread bell badge increment.
- [ ] **Transactional Email**: Confirm Resend receives and delivers the HTML welcome and proposal alerts without bounce.
- [ ] **RBAC Isolation**: Verify that a customer cannot access `/admin/*` or `/vendor/*`, and regular admins cannot access `/super-admin/*`.

---

## 7. Troubleshooting & FAQ

### Issue: `useSearchParams() should be wrapped in a suspense boundary`
**Resolution**: In Next.js 15, any client component accessing URL search parameters during static generation must be contained in a `<React.Suspense>` boundary. WedConnect has wrapped all search parameter components (`/customer/chat`, `/vendor/chat`) in Suspense boundaries.

### Issue: Supabase Auth Session not persisting across routes
**Resolution**: Ensure `NEXT_PUBLIC_SITE_URL` matches the exact domain and that the Supabase Redirect URL whitelist includes `https://wedconnect.app/auth/callback` in **Supabase > Authentication > URL Configuration**.
