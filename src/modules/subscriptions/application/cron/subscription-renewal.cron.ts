import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class SubscriptionRenewalCron {
  private readonly logger = new Logger(SubscriptionRenewalCron.name);

  constructor(
    private readonly subRepo: SubscriptionRepository,
    private readonly outboxRepo: OutboxRepository,
  ) {}

  // Run every minute for demo (checking for expired subs)
  @Cron('0 * * * * *')
  async checkExpiringSubscriptions() {
    this.logger.log('Checking for expired subscriptions...');

    const now = new Date();
    const expiredSubs = await this.subRepo.findExpiring(now);

    for (const sub of expiredSubs) {
      this.logger.log(
        `Found expired subscription ${sub.id}. Triggering renewal...`,
      );

      // Update local state to avoid double processing if needed, or rely on idempotency.
      // For MVP, we'll just emit an event. Ideally we mark it as "RENEWING" or similar.

      // Emit SubscriptionRenewalDue
      // Ideally this goes to Billing to create a new Invoice
      await this.outboxRepo.save({
        // Let's use SubscriptionCreated as if it's a new cycle, but pointing to existing sub?
        // Or better: SubscriptionRenewalDue -> Billing listens -> Creates Invoice

        // Given our listeners:
        // SubscriptionCreated -> Invoice Created -> Payment

        // If we emit SubscriptionCreated with the same ID, it might be confusing.
        // Let's create a new 'SubscriptionRenewalDue' and handle it or reuse logic.
        // For MVP simplicity: Emit SubscriptionCreated but we need to be careful about state.

        // Let's emit 'SubscriptionRenewalDue' and add a listener in Billing or Subscriptions
        // to handle it.
        // Wait, plan says: "Emit SubscriptionRenewalDue (or trigger Billing directly)".
        // Let's reuse SubscriptionCreated logic for simplicity but maybe with a flag?
        // Actually, let's stick to the cleanest way:
        // Emit 'SubscriptionCreated' effectively starts a billing cycle in our current flow.
        type: 'SubscriptionCreated',
        payload: {
          subscriptionId: sub.id,
          userId: sub.userId,
          planId: sub.planId,
          price: sub.plan.price,
          isRenewal: true,
        },
        aggregateId: sub.id,
        aggregateType: 'Subscription',
        occurredAt: new Date().toISOString(),
      });
    }
  }
}
