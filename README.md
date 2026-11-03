# WedConnect

> **Every Event. Every Celebration. One Connection.**

WedConnect is a luxury, full-stack event and wedding connection marketplace built with Next.js 15 App Router, React 19, Supabase PostgreSQL, and an agentic Model Context Protocol (MCP) ecosystem.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Lucide Icons, React Hook Form, Zod, TanStack Query, React Table, React Hot Toast |
| **Backend** | Next.js Server Actions, Route Handlers, Supabase SSR |
| **Database** | Supabase PostgreSQL (18 Production Tables, UUIDs, RLS, Triggers, Indexes) |
| **Authentication** | Supabase Auth (Email + Google OAuth, Session Cookies, RBAC) |
| **Storage & Realtime** | Supabase Storage & Supabase Realtime Channels |
| **State & Visualization** | Zustand, Recharts |
| **Email & Maps** | Resend API, Mapbox GL |
| **Agentic Tooling** | 13 Model Context Protocol (MCP) Connectors |

---

## 📂 Feature-Based Project Structure

```
wedConnect/
├── docs/
│   ├── database/
│   │   └── ER_DIAGRAM.md        # Comprehensive Mermaid ER Diagram & documentation
│   └── mcp/
│       └── MCP_ARCHITECTURE.md  # 13 MCP Connectors architecture & specs
├── src/
│   ├── app/                     # Next.js App Router (Layouts, Pages, Error boundaries)
│   ├── components/
│   │   ├── ui/                  # Shadcn UI luxury primitives (Button, Card, Dialog, etc.)
│   │   └── providers.tsx        # React Query, Themes, and Toast providers
│   ├── constants/               # Global configs, brand colors, navigation
│   ├── features/                # Domain-driven feature modules
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── chat/
│   │   ├── customer/
│   │   ├── notification/
│   │   └── vendor/
│   ├── lib/
│   │   ├── mcp/                 # Model Context Protocol connector registry & 13 connectors
│   │   ├── supabase/            # Browser, Server, Admin, and Middleware Supabase clients
│   │   └── utils.ts             # Currency, Date, Slug, Classname helpers
│   ├── store/                   # Zustand stores (Auth, Search, UI)
│   ├── types/                   # Strict TypeScript domain interfaces & database schemas
│   └── middleware.ts            # Session refresh and route guard middleware
├── supabase/
│   ├── migrations/              # Production PostgreSQL migration SQL
│   └── seed.sql                 # Initial category, event type, and settings seed
├── .env.example                 # Environment variables specification
├── package.json
└── tailwind.config.ts           # Luxury Apple/Airbnb design system & glassmorphism
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase, Resend, and Mapbox credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Database Setup
Execute `supabase/migrations/20261103000000_wedconnect_initial_schema.sql` and `supabase/seed.sql` in your Supabase SQL editor or via Supabase CLI.

---

## 📋 Phased Development Roadmap

- [x] **Phase 1: Project Setup** *(Complete & Production Verified)*
- [ ] **Phase 2: Authentication** *(Ready to begin on approval)*
- [ ] **Phase 3: Landing Page**
- [ ] **Phase 4: Customer Module**
- [ ] **Phase 5: Vendor Module**
- [ ] **Phase 6: Admin Module**
- [ ] **Phase 7: Booking**
- [ ] **Phase 8: Chat**
- [ ] **Phase 9: Notification**
- [ ] **Phase 10: Testing**
- [ ] **Phase 11: Deployment**
