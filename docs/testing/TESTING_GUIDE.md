# WedConnect Testing & Verification Guide

This guide details the testing architecture, suites, and procedures for verifying **WedConnect** across unit, integration, and browser end-to-end levels.

---

## 1. Testing Architecture Overview

WedConnect employs a dual-tier testing strategy:
1. **Vitest (Unit & Integration Layer)**: Blazing-fast native ESM test runner executing 26 tests across 6 domain suites with complete mock isolation in sub-second duration (<1s).
2. **Playwright (Browser E2E Layer)**: Headless and headed Chromium browser verification testing complete critical user journeys across all 4 platform roles.

---

## 2. Test Commands Reference

```bash
# Run full Vitest integration suite once
npm test

# Run Vitest in interactive watch mode for active TDD development
npm run test:watch

# Run Playwright end-to-end browser tests
npm run test:e2e

# Run Playwright tests with visual UI inspector
npx playwright test --ui

# Run strict TypeScript static typecheck
npm run typecheck
```

---

## 3. Integration & Domain Test Suites (`tests/`)

### 1. `tests/auth-rbac.test.ts` (Role-Based Access Control)
- **Validates**:
  - Unauthenticated visitor access to public marketing routes (`/`, `/about`, `/vendors`, `/faq`, `/contact`).
  - Strict route barrier denial for unauthenticated visitors attempting to enter `/customer/*`, `/vendor/*`, `/admin/*`.
  - Customer role confinement to `/customer/*` and `/checkout/*` (rejection from vendor and admin areas).
  - Vendor role confinement to `/vendor/*` (rejection from customer and admin areas).
  - Admin access to operational console (`/admin/*`) and strict blockage from super-admin root suites (`/super-admin/*`).
  - Super Admin root privileges across all administrative and security suites.

### 2. `tests/event-matching.test.ts` (Smart Matching Engine)
- **Validates**:
  - Scoring weight distribution:
    - Specialist Category Match: 35 points
    - Location / City Match: 30 points
    - Budget Range Overlap: 20 points
    - Guest Capacity Fit: 10 points
    - Verified Specialist Badge: 5 points
  - Scoring penalties for geographic mismatch and out-of-budget criteria.
  - Sorting and ranking of recommendations by descending match score.
  - Filtering candidates falling below the minimum 50-point compatibility threshold.

### 3. `tests/quotation-escrow.test.ts` (Financials & State Machine)
- **Validates**:
  - Mathematical precision on line items subtotal, 5% platform commission rake, and 18% GST calculation.
  - Non-leaking milestone tranche segmentation:
    - 25% Initial Booking Escrow Deposit
    - 50% Mid-Planning Progress Checkpoint
    - 25% Final Handover & Sign-Off
  - Strict validation of the 9-step booking lifecycle state machine (`draft` -> `pending_customer_review` -> `accepted` -> `deposit_escrowed` -> `in_progress` -> `vendor_delivered` -> `customer_approved` -> `completed`).
  - Prevention of unauthorized skipping of escrow deposit steps.

### 4. `tests/realtime-chat.test.ts` (Chat Message Engine)
- **Validates**:
  - Text message validation with whitespace sanitization.
  - Audio memo payload validation: requires valid media URL and enforces duration between 1s and 300s (5-minute ceiling).
  - Interactive quotation embed cards: requires non-empty quotation ID reference.

### 5. `tests/notification-email.test.ts` (Resend & State Store)
- **Validates**:
  - HTML luxury template generation for Welcome, Enquiry Alert, Proposal, and Booking Confirmation emails.
  - Safe fallback behavior in test/offline environments when `RESEND_API_KEY` is not present.
  - Zustand notification state store: unread badge count tracking, optimistic mark-as-read, and mark-all-as-read state mutations.

### 6. `tests/audit-security.test.ts` (Audit Logs & Sanitization)
- **Validates**:
  - Completeness of audit log entries: actor ID, action identifier, resource target, client IP address, and ISO8601 timestamp.
  - Input sanitization against XSS injection attacks in review and message fields.

---

## 4. End-to-End Browser Test Suites (`e2e/`)

Configured via [`playwright.config.ts`](file:///e:/wedConnect/playwright.config.ts):

1. **`e2e/landing-page.spec.ts`**:
   - Tests luxury branding, navigation links, hero CTA buttons, and legal pages (`/terms`, `/privacy`).
2. **`e2e/vendor-directory.spec.ts`**:
   - Tests specialist directory search input, city filters, category tabs, and vendor detail routing.
3. **`e2e/customer-flow.spec.ts`**:
   - Tests couple authentication login form, multi-step event creation wizard, dashboard widgets, and chat view.
4. **`e2e/vendor-studio.spec.ts`**:
   - Tests vendor studio dashboard, package manager, visual availability calendar, and quotations creator.
5. **`e2e/checkout-escrow.spec.ts`**:
   - Tests escrow checkout page load, deliverable checklist review, milestone tracker, and escrow protection badge.

---

## 5. Continuous Integration (GitHub Actions)

Add this workflow in `.github/workflows/ci.yml` for automated validation on every pull request:

```yaml
name: WedConnect CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"

      - name: Install Dependencies
        run: npm ci

      - name: Type Check (TypeScript)
        run: npm run typecheck

      - name: Run Unit & Integration Tests (Vitest)
        run: npm test

      - name: Run Production Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: "http://localhost:3000"
          NEXT_PUBLIC_SUPABASE_URL: "https://mock.supabase.co"
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "mock-anon-key"
          SUPABASE_SERVICE_ROLE_KEY: "mock-service-key"
```

