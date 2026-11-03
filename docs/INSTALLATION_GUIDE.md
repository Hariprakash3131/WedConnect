# WedConnect Local Development Installation Guide

This guide walks you through setting up **WedConnect** on your local machine for development and testing.

---

## 1. System Requirements

Ensure your environment satisfies the following minimum prerequisites:
- **Node.js**: v20.10.0 or v22.0.0+ (`node -v`)
- **npm**: v10.0.0+ (`npm -v`)
- **Git**: v2.30+ (`git -v`)
- **Supabase Account**: (Free tier at [supabase.com](https://supabase.com)) or local Docker Supabase CLI

---

## 2. Step-by-Step Installation

### Step 2.1: Clone the Codebase
```bash
git clone https://github.com/your-username/wedconnect.git
cd wedconnect
```

### Step 2.2: Install NPM Dependencies
```bash
npm install
```

### Step 2.3: Configure Local Environment Variables
Create your local environment configuration file:
```bash
cp .env.example .env.local
```

Open `.env.local` in your editor and configure the keys:

```ini
# Application Base URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Supabase (Database, Auth, Storage, Realtime)
# Found in Supabase Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Email Service (Optional for local testing; mock fallback is automated)
RESEND_API_KEY=re_test_key
RESEND_FROM_EMAIL="WedConnect Concierge <concierge@wedconnect.app>"

# Mapbox GL Public Token (For maps rendering on vendor profiles)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token
```

### Step 2.4: Initialize Database & Run Migrations
1. In your Supabase Project Dashboard, go to **SQL Editor**.
2. Open and run the migration file:
   ```
   supabase/migrations/20261103000000_wedconnect_initial_schema.sql
   ```
3. This creates all 18 tables, triggers, indexes, and Row Level Security (RLS) rules.

---

## 3. Seed Accounts & Role Verification

Once the schema migration is applied, you can test each of the four role-based platform experiences:

| Role | Target Route | Purpose |
|---|---|---|
| **Couple / Customer** | `/customer/dashboard` | Event creation, vendor matching, quotation review, escrow payments, real-time chat |
| **Specialist / Vendor** | `/vendor/dashboard` | Studio operations, package management, availability calendar, quotation dispatch |
| **Admin** | `/admin/dashboard` | Vendor verification desk, global bookings, dispute mediation, audit logs |
| **Super Admin** | `/super-admin/dashboard` | Root platform governance, role permission matrix, security logs |

---

## 4. Running the Development Server

Start the Next.js development server:
```bash
npm run dev
```

The application will be live at:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Vendor Directory**: [http://localhost:3000/vendors](http://localhost:3000/vendors)
- **Couple Portal**: [http://localhost:3000/customer/dashboard](http://localhost:3000/customer/dashboard)
- **Vendor Studio**: [http://localhost:3000/vendor/dashboard](http://localhost:3000/vendor/dashboard)
- **Admin Command**: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

---

## 5. Local Quality Verification

Before committing changes, run the validation commands:

```bash
# 1. Type check
npm run typecheck

# 2. Run unit & integration test suites
npm test

# 3. Test production build compilation
npm run build
```
