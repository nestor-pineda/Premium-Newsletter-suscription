import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { PlanRepository } from '../../infrastructure/plan.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class UserCreatedListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly planRepo: PlanRepository,
    private readonly outboxRepo: OutboxRepository,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'UserCreated';
  }

  async handle(event: Event): Promise<void> {
    const { userId, email } = event.payload; // Corrected: payload.userId is directly available based on CreateUserHandler
    console.log(`[Subscriptions] Handling UserCreated for ${email}`);

    // 1. Get Default Plan (ensure it exists)
    const plan = await this.planRepo.createDefaultPlan();

    // 2. Create Pending Subscription
    const subscription = await this.subscriptionRepo.create(userId, plan.id);

    // 3. Emit SubscriptionCreated event
    await this.outboxRepo.save({
      type: 'SubscriptionCreated',
      payload: {
        subscriptionId: subscription.id,
        userId: userId,
        planId: plan.id,
        price: plan.price,
      },
      aggregateId: subscription.id,
      aggregateType: 'Subscription',
      occurredAt: new Date().toISOString(),
    });

    console.log(
      `[Subscriptions] Created pending subscription ${subscription.id}`,
    );
  }
}
