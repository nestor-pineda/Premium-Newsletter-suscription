import { OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { InvoiceRepository } from '../../infrastructure/invoice.repository';
import { PaymentGateway } from '../services/payment.gateway';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class SubscriptionCreatedListener implements EventHandler, OnModuleInit {
    private readonly eventBus;
    private readonly invoiceRepo;
    private readonly paymentGateway;
    private readonly outboxRepo;
    constructor(eventBus: InMemoryEventBus, invoiceRepo: InvoiceRepository, paymentGateway: PaymentGateway, outboxRepo: OutboxRepository);
    onModuleInit(): void;
    supports(event: Event): boolean;
    handle(event: Event): Promise<void>;
}
