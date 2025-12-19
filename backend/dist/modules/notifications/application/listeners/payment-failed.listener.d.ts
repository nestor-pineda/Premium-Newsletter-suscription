import { OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { NotificationService } from '../services/notification.service';
export declare class PaymentFailedListener implements EventHandler, OnModuleInit {
    private readonly eventBus;
    private readonly notificationService;
    constructor(eventBus: InMemoryEventBus, notificationService: NotificationService);
    onModuleInit(): void;
    supports(event: Event): boolean;
    handle(event: Event): Promise<void>;
}
