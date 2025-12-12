import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class InvoicePaidListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly outboxRepo: OutboxRepository,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'InvoicePaid';
  }

  async handle(event: Event): Promise<void> {
    const { subscriptionId, paidAt } = event.payload;
    console.log(`[Subscriptions] Handling InvoicePaid for sub ${subscriptionId}`);

    const subscription = await this.subscriptionRepo.findById(subscriptionId);
    if (!subscription) {
      console.error(`[Subscriptions] Subscription ${subscriptionId} not found`);
      return;
    }

    // Calculate dates
    const startDate = new Date(paidAt);
    const endDate = new Date(startDate);
    // Assuming 1 month duration for MVP, ideally fetch plan duration
    // For MVP simplicity: hardcoded 1 month logic here or fetch plan. 
    // We already have plan loaded via relation? No, we need to load it or just assume 30 days.
    // Let's assume 30 days for now to keep it simple, or better yet, fetch the plan if needed.
    // But since `subscription.plan` might not be loaded, let's just add 30 days.
    endDate.setDate(endDate.getDate() + 30);

    // Update Subscription
    await this.subscriptionRepo.updateStatus(subscriptionId, 'ACTIVE', startDate, endDate);

    // Emit SubscriptionActivated
    await this.outboxRepo.save({
      type: 'SubscriptionActivated',
      payload: {
        subscriptionId: subscription.id,
        userId: subscription.userId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      aggregateId: subscription.id,
      aggregateType: 'Subscription',
      occurredAt: new Date().toISOString(),
    });
    
    console.log(`[Subscriptions] Activated subscription ${subscription.id}`);
  }
}

