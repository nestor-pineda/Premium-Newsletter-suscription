# Testing Guide

## Prerequisites
1. Ensure Docker is running.
2. Ensure the database container is up:
   ```bash
   docker-compose up -d
   ```

## Running the E2E Test
We have created an automated E2E test that runs the full flow (User -> Subscription -> Payment -> Active).

Run the following command:

```bash
npm run test:e2e -- test/newsletter-flow.e2e-spec.ts
```

## Manual Testing
If you prefer to test manually:

1. **Start the App**:
   ```bash
   npm run start:dev
   ```

2. **Create a User** (in a separate terminal):
   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"email": "manual@test.com", "name": "Manual User"}'
   ```

3. **Observe Logs**:
   Look at the terminal running NestJS. You should see a sequence of logs:
   - `[Subscriptions] Handling UserCreated...`
   - `[Subscriptions] Created pending subscription...`
   - `[Billing] Handling SubscriptionCreated...`
   - `[Billing] Attempting payment...`
   - `[Billing] Payment Successful...` (or Failed)
   - `[Subscriptions] Handling InvoicePaid...`
   - `[Subscriptions] Activated subscription...`
   - `[EMAIL] Sending Welcome Email...`

4. **Verify Database**:
   Connect to PostgreSQL (`localhost:5432`, user: `postgres`, db: `newsletter_db`) and check the tables:
   - `users`
   - `subscriptions`
   - `invoices`
   - `outbox`

