import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class InvoicePaidListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'InvoicePaid';
  }

  async handle(event: Event): Promise<void> {
    const { userId, subscriptionId } = event.payload;
    await this.notificationService.sendWelcomeEmail(userId, subscriptionId);
  }
}

