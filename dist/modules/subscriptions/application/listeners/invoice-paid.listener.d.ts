import { OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class InvoicePaidListener implements EventHandler, OnModuleInit {
    private readonly eventBus;
    private readonly subscriptionRepo;
    private readonly outboxRepo;
    constructor(eventBus: InMemoryEventBus, subscriptionRepo: SubscriptionRepository, outboxRepo: OutboxRepository);
    onModuleInit(): void;
    supports(event: Event): boolean;
    handle(event: Event): Promise<void>;
}
