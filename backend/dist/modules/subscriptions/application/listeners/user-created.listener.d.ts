import { OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { PlanRepository } from '../../infrastructure/plan.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class UserCreatedListener implements EventHandler, OnModuleInit {
    private readonly eventBus;
    private readonly subscriptionRepo;
    private readonly planRepo;
    private readonly outboxRepo;
    constructor(eventBus: InMemoryEventBus, subscriptionRepo: SubscriptionRepository, planRepo: PlanRepository, outboxRepo: OutboxRepository);
    onModuleInit(): void;
    supports(event: Event): boolean;
    handle(event: Event): Promise<void>;
}
