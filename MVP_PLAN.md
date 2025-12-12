# Newsletter MVP Backend & Database Implementation Plan

This plan outlines the steps to build the Backend (NestJS) and Database (PostgreSQL) for the "Newsletter Premium" MVP. The architecture follows a Modular Monolith approach with Clean Architecture and Event-Driven communication using the Outbox Pattern.

## Phase 1: Project Initialization & Core Infrastructure

### 1.1 Project Setup
- [ ] **Initialize NestJS Project**: Create a new NestJS project.
- [ ] **Configure Environment**: Set up `ConfigModule` and `.env` for database credentials and app settings.
- [ ] **Database Connection**: Configure `TypeORM` with PostgreSQL.
- [ ] **Folder Structure**: Establish the directory structure based on the Skeleton (modules, core, shared).

### 1.2 Core Modules (Shared Kernel)
- [ ] **Event Bus**: Implement the internal `EventBus` interface and an In-Memory implementation (as per Skeleton).
- [ ] **Outbox Pattern**:
    - [ ] Create `Outbox` entity (id, type, payload, status, created_at).
    - [ ] Implement `OutboxRepository` (save, findPending, markProcessed).
    - [ ] Implement `OutboxProcessor` (cron/scheduler to dispatch events from Outbox to EventBus).

## Phase 2: Domain Modules Implementation

### 2.1 Users Module
*Responsibility: User management and authentication basics.*
- [ ] **Domain**: Define `User` entity (id, email, name).
- [ ] **Infrastructure**: Create `UserRepository` (TypeORM).
- [ ] **Application**: Implement `CreateUser` use case.
    - *Logic*: Persist User -> Save `UserCreated` event to Outbox (atomic transaction).
- [ ] **API**: Create `UsersController` with `POST /users` endpoint.

### 2.2 Subscriptions Module
*Responsibility: Manage subscription lifecycle (Pending -> Active -> Cancelled).*
- [ ] **Domain**: Define `Subscription` and `Plan` entities.
    - *Note*: Seed a default "Premium Plan".
- [ ] **Infrastructure**: Create `SubscriptionRepository`.
- [ ] **Application**:
    - [ ] **Listener**: Handle `UserCreated` event -> Create Subscription in `PENDING_PAYMENT` state -> Save `SubscriptionCreated` event to Outbox.
    - [ ] **Listener**: Handle `InvoicePaid` event -> Activate Subscription -> Save `SubscriptionActivated` event to Outbox.
    - [ ] **Listener**: Handle `PaymentFailed` event -> (Optional) Notify or Log.

### 2.3 Billing Module
*Responsibility: Invoicing and Payment processing.*
- [ ] **Domain**: Define `Invoice` and `PaymentAttempt` entities.
- [ ] **Infrastructure**: Create `InvoiceRepository`.
- [ ] **Application**:
    - [ ] **Listener**: Handle `SubscriptionCreated` event -> Generate Invoice (PENDING) -> Attempt Payment.
    - [ ] **Payment Logic**: Implement a "Fake Payment Gateway" (random success/failure).
    - [ ] **Process**: On success -> Update Invoice to `PAID` -> Save `InvoicePaid` event to Outbox.
    - [ ] **Process**: On failure -> Update Invoice/Attempt to `FAILED` -> Save `PaymentFailed` event to Outbox.

### 2.4 Notifications Module
*Responsibility: Send emails/notifications.*
- [ ] **Application**:
    - [ ] **Listener**: Handle `InvoicePaid` -> Log "Sending Welcome Email".
    - [ ] **Listener**: Handle `PaymentFailed` -> Log "Sending Payment Retry Warning".
    - [ ] **Listener**: Handle `NewsletterDeliveryRequested` -> Log "Sending Weekly Newsletter".

## Phase 3: Operational Features & Cron Jobs

### 3.1 Cron Jobs (Scheduling)
- [ ] **Outbox Dispatcher**: Ensure the `OutboxProcessor` runs frequently (e.g., every 5-10 seconds or via robust loop) to process pending events.
- [ ] **Newsletter Delivery**: Create a Cron Job to simulate weekly delivery -> Emit `NewsletterDeliveryRequested`.
- [ ] **Subscription Renewal**: Create a Cron Job to check for expiring subscriptions -> Emit `SubscriptionRenewalDue` (or trigger Billing directly depending on flow refinement).

## Phase 4: Verification & Database

### 4.1 Database Setup
- [ ] **Docker**: (Optional) Create `docker-compose.yml` for PostgreSQL.
- [ ] **Migrations/Sync**: Ensure entities are synchronized with the DB schema.

### 4.2 Testing Flow
- [ ] **Manual Test**: Create a User via API -> Verify User in DB -> Verify `UserCreated` in Outbox -> Verify `SubscriptionCreated` in Outbox (after dispatch) -> Verify Invoice created -> Verify final state (Active Subscription).

