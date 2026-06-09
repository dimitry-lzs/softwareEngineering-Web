# MedIQ Doctor Subscription Feature

## Overview

This document describes the subscription model implemented for doctors on the MedIQ platform. Doctors are required to maintain an active subscription to access all platform features. The system supports two subscription tiers (Monthly and Yearly), each with different pricing and commission rates.

> **Note**: This is a demo/mock system. No real payment processing is integrated. Clicking "Subscribe" instantly activates the subscription.

---

## Subscription Plans

| Feature | Monthly Plan | Yearly Plan |
|---|---|---|
| **Price** | €29.99/month | €249.99/year (~30% savings) |
| **Commission Rate** | 5% per appointment | 3% per appointment |
| **Auto-Renewal** | Yes (can be cancelled) | Yes (can be cancelled) |
| **Full Feature Access** | ✅ | ✅ |
| **Featured Doctor Badge** | ❌ | ✅ |
| **Annual Analytics** | ❌ | ✅ |

---

## Commission Policy

In addition to the subscription fee, a commission is charged for each completed appointment. The rate depends on the active subscription plan:

- **Monthly subscribers**: 5% commission per completed appointment
- **Yearly subscribers**: 3% commission per completed appointment (lower rate as a reward for annual commitment)

> In this demo, commissions are displayed as informational policy — no actual deductions occur.

---

## Feature Gating

When a doctor logs in **without** an active subscription, they are automatically redirected to the subscription page. The following routes are gated behind the subscription:

- `/doctor-home` — Doctor dashboard
- `/doctor-home/:id` — Individual appointment view
- `/availabilities` — Set appointment availabilities
- `/doctor-appointments` — Appointment history
- `/doctor-appointments/:id` — Appointment detail view
- `/doctor-ratings` — View patient ratings/reviews

**Unaffected routes** (accessible without subscription):
- `/doctor-profile` — Doctor profile management
- `/doctor-subscription` — Subscription management page

**Patient routes** are completely unaffected by the subscription system.

---

## Changes Made

### Backend (seBackend)

#### New Files

1. **`sql/subscriptions.sql`** — SQL schema for the `subscriptions` table with columns: `id`, `doctorID`, `plan`, `status`, `autoRenew`, `startDate`, `endDate`, `createdAt`, `updatedAt`.

2. **`models/enums/SubscriptionPlan.java`** — Enum with values `MONTHLY`, `YEARLY`.

3. **`models/enums/SubscriptionStatus.java`** — Enum with values `ACTIVE`, `CANCELLED`, `EXPIRED`.

4. **`models/Subscription.java`** — ActiveJDBC model for the `subscriptions` table with typed getters/setters using the plan and status enums.

5. **`dto/SubscriptionBody.java`** — DTO for subscription creation requests containing the plan type.

6. **`services/SubscriptionService.java`** — Business logic layer with methods:
   - `getActiveSubscription(int doctorId)` — Find active subscription for a doctor
   - `hasActiveSubscription(int doctorId)` — Boolean check for active subscription
   - `subscribe(int doctorId, SubscriptionPlan plan)` — Create a new mock subscription
   - `cancelAutoRenew(int doctorId)` — Set auto-renew to false (subscription stays active until end date)
   - `toMap(Subscription)` — Convert model to JSON-friendly map

7. **`controllers/SubscriptionController.java`** — REST controller with endpoints:
   - `GET /subscription` — Get current doctor's active subscription (or 404)
   - `POST /subscription` — Create a new subscription (mock purchase)
   - `PATCH /subscription/cancel-renewal` — Cancel auto-renewal
   - `GET /subscription/status` — Check if doctor has an active subscription

#### Modified Files

8. **`Main.java`** — Added import and registration of `SubscriptionController`.

9. **`Db.java`** — Added PostgreSQL migration to create the `subscriptions` table if it doesn't exist.

---

### Frontend (softwareEngineering-Web)

#### New Files

1. **`src/api/subscription.ts`** — API client functions for the subscription endpoints (`getSubscription`, `subscribe`, `cancelRenewal`, `getStatus`).

2. **`src/stores/SubscriptionStore.tsx`** — MobX store managing subscription state:
   - `subscription` — Current subscription data
   - `isSubscribed` — Computed boolean
   - `isStatusChecked` — Whether the initial check has been done
   - `fetchSubscription()` — Fetch active subscription from API
   - `subscribe(plan)` — Create a new subscription
   - `cancelRenewal()` — Cancel auto-renewal
   - `reset()` — Clear state (for logout)

3. **`src/components/SubscriptionGuard/index.tsx`** — Wrapper component that:
   - Checks if the logged-in doctor has an active subscription
   - Redirects to `/doctor-subscription` if not
   - Shows a loading state while checking
   - Passes patients through without any checks

4. **`src/pages/DoctorPages/DoctorSubscription/index.tsx`** — Full subscription management page with:
   - **Active Subscription Card**: Shows plan type, start/end dates, auto-renewal status, commission rate, and a cancel auto-renewal button
   - **Policy Section**: Explains the subscription model, commission rates, and auto-renewal behavior
   - **Pricing Cards**: Two side-by-side cards for Monthly and Yearly plans with features list, pricing, and subscribe buttons
   - **Confirmation Modals**: For both subscribing and cancelling renewal

#### Modified Files

5. **`src/types.ts`** — Added `SubscriptionPlan` enum, `SubscriptionStatus` enum, and `Subscription` type.

6. **`src/stores/index.tsx`** — Added import and export of `subscriptionStore`.

7. **`src/index.tsx`** (Router) — Added:
   - Import for `DoctorSubscription` page and `SubscriptionGuard` component
   - Route `/doctor-subscription` (unguarded)
   - Wrapped all doctor feature routes with `<SubscriptionGuard>`

8. **`src/components/Sidebar/index.tsx`** — Added:
   - Import for `CardMembershipIcon`
   - "Subscription" nav item in the doctor sidebar (between "My Reviews" and "Profile")

---

## Architecture Decisions

1. **Subscription state is stored in the database**, not in the user session, so it persists across sessions and can be queried independently.

2. **The SubscriptionGuard uses a MobX store** with an `isStatusChecked` flag to avoid repeated API calls. The subscription is fetched once on first guard encounter and cached.

3. **Doctor profile is NOT gated** — doctors can always access their profile even without a subscription. This prevents lockout scenarios.

4. **Auto-renewal cancellation** doesn't immediately end the subscription. It remains active until the `endDate`, then simply won't renew.

5. **The frontend uses `SubscriptionGuard` at the route level** rather than middleware, which is the React Router idiomatic approach and consistent with the existing `CheckAuth` pattern.
